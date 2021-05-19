// SPDX-FileCopyrightText: © 2021 Tech and Software Ltd.
// SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-uk.ltd.TechAndSoftware-1.0

import { Teletext, Level } from '@techandsoftware/teletext';

export class Service {
    constructor(options) {
        this._caster = null;
        if (typeof options == 'object') {
            if ('caster' in options) this._caster = options.caster;
        }
        this._ttx = Teletext();
        this._ttx.setDefaultG0Charset('g0_latin__english'); // TODO pass in
        this._ttx.setLevel(Level[1.5]);
        this._ttx.addTo('#teletextscreen'); // TODO pass in
        this._ttx.showTestPage();

        this._pageNumber = null;
        this._subPageNumber = 0;
        this._magazine = null;
        this._magazineData = null;
        this._fastext = null;

        this._header = new Header('TEEFAX %%#  %%a %e %%b \x1bC%H:%M/%S'); // TODO pass in

    }

    get teletextInstance() {
        return this._ttx;
    }

    async showPage(pageNumber) {
        // TODO - separate out page fetch
        const matches = pageNumber.match(/([1-8])[0-9A-Fa-f]{2}/);
        if (matches == null) {
            console.warn('W31 showPage: bad page number', pageNumber);
            return;
        }
        const magazine = matches[1];
        console.info(`showing page ${pageNumber} in mag ${magazine}`);

        if (this._magazine != magazine) {
            try {
                const res = await fetch(`${magazine}.json`);
                // TODO - check response.ok
                this._magazineData = await res.json();
                this._magazine = magazine;
            } catch (e) {
                console.warn(`W44 showPage: failed to load magazine data from ${magazine}.json :`, e.message);
            }
        }
        if (this._magazine == magazine && pageNumber in this._magazineData.pages) {
            this._pageNumber = pageNumber;
            this._subPageNumber = this._getFirstSubPage();
            if (this._subPageNumber != null) {
                this._update();
                const numSubpages = this._magazineData.pages[this._pageNumber].subpages.filter(s => s != null).length;
                return {
                    subPage: this._subPageNumber,
                    numSubPages: numSubpages,
                    fastext: this._fastext
                };
            } else {
                console.info('No subpages for page', pageNumber);
            }
        } else {
            console.info('No page', pageNumber);
        }
        return null;
    }

    _getFirstSubPage() {
        const subpages = this._magazineData.pages[this._pageNumber].subpages;
        for (let i = 0; i < subpages.length; i++) {
            if (subpages[i] != null) return i;
        }
        return null;
    }

    nextSubPage() {
        const subpages = this._magazineData.pages[this._pageNumber].subpages;
        let nextSub = this._subPageNumber;
        let gotSubPage = false;
        while (!gotSubPage) {
            nextSub++;
            if (nextSub == subpages.length) nextSub = 0;
            if (nextSub == this._subPageNumber) break;
            if (subpages[nextSub] != null) gotSubPage = true;
        }
        if (gotSubPage) {
            this._subPageNumber = nextSub;
            this._update();
        }
        return {
            subPage: this._subPageNumber,
            numSubPages: subpages.filter(s => s != null).length,
            fastext: this._fastext
        };
    }

    previousSubPage() {
        const subpages = this._magazineData.pages[this._pageNumber].subpages;
        let prevSub = this._subPageNumber;
        let gotSubPage = false;
        while (!gotSubPage) {
            prevSub--;
            if (prevSub == -1) prevSub = subpages.length - 1;
            if (prevSub == this._subPageNumber) break;
            if (subpages[prevSub] != null) gotSubPage = true;
        }
        if (gotSubPage) {
            this._subPageNumber = prevSub;
            this._update();
        }
        return {
            subPage: this._subPageNumber,
            numSubPages: subpages.filter(s => s != null).length,
            fastext: this._fastext
        };
    }

    _update() {
        const subpage = this._magazineData.pages[this._pageNumber].subpages[this._subPageNumber];
        const outputLines = subpage.outputLines.split("\n");
        const encoding = 'encoding' in subpage ? subpage.encoding : 'g0_latin';
        const header = this._header.generate(this._pageNumber);
        this._ttx.clearScreen(false);
        this._ttx.setDefaultG0Charset(encoding, false);
        this._ttx.setPageFromOutputLines(outputLines, header);
        if (this._caster) {
            this._caster.display({
                defaultG0Charset: encoding,
                header: header,
                outputLines: outputLines
            });
        }
        this._fastext = 'fastext' in subpage ? subpage.fastext : null;
    }

}


class Header {
    constructor(string) {
        this._template = string;
        this._days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this._months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    }

    _tokens () {
        const now = new Date();
        return {
            '%%a': this._days[now.getDay()],
            '%%b': this._months[now.getMonth()],
            '%d': String(now.getDate()).padStart(2, 0),
            '%e': String(now.getDate()).padStart(2, " "),
            '%m': String(now.getMonth() + 1).padStart(2, " "),
            "%y": String(now.getFullYear()).substring(2, 2),
            "%H": String(now.getHours()).padStart(2, 0),
            "%M": String(now.getMinutes()).padStart(2, 0),
            "%S": String(now.getSeconds()).padStart(2, 0)
        };
    }

    generate(pageNumber) {
        const tokens = this._tokens();
        let t = this._template;
        for (const token of Object.keys(tokens)) {
            t = t.replace(token, tokens[token]);
        }

        if (typeof pageNumber != 'undefined')
            t = t.replace("%%#", pageNumber);
        return t;
    }
}
