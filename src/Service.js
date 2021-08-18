// SPDX-FileCopyrightText: © 2021 Tech and Software Ltd.
// SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-uk.ltd.TechAndSoftware-1.0

import { Teletext, Level } from '@techandsoftware/teletext';
import { PageFetcher } from './PageFetcher.js';
import { Header } from './Header.js';

const DEFAULT_HEADER = '       %%#  %%a %e %%b \x1bC%H:%M/%S';

export class TeletextService {
    constructor(options) {
        if (typeof options != 'object') throw new Error("E8 Service.constructor: options object required");
        if (!('DOMSelector' in options)) throw new Error("E9 Service.constructor DOMSelector property required");

        this._caster = 'caster' in options ? options.caster : null;
        this._defaultG0Charset = 'defaultG0Charset' in options ? options.defaultG0Charset : 'g0_latin';
        this._header = 'header' in options ? new Header(options.header) : new Header(DEFAULT_HEADER);
        this._fetcher = 'fetcher' in options ? options.fetcher : new PageFetcher(options.baseURL);
        this._baseURL = 'baseURL' in options ? options.baseUrl : './';

        this._ttx = Teletext();
        this._ttx.setDefaultG0Charset(this._defaultG0Charset);
        this._ttx.setLevel(Level[1.5]);
        this._ttx.addTo(options.DOMSelector);

        this._page = null;
        this._pageNumber = null;
        this._subPageNumber = 0;
        this._fastext = null;
    }

    get teletextInstance() {
        return this._ttx;
    }

    async showPage(pageNumber) {
        if (typeof pageNumber == 'number') pageNumber = String(pageNumber);
        const matches = pageNumber.match(/^[1-8][0-9A-Fa-f]{2}$/);
        if (matches == null) {
            console.warn('W37 Service.showPage: bad page number', pageNumber);
            return null;
        }

        const page = await this._fetcher.fetchPage(pageNumber);
        if (page != null) {
            const firstSubPage = this._getFirstSubPage(page);
            if (firstSubPage != null) {
                this._page = page;
                this._pageNumber = pageNumber;
                this._subPageNumber = firstSubPage;

                this._update();
                return this._pageMetaObj();
            } else
                console.info('No subpages for page', pageNumber);
        } else
            console.info('No page', pageNumber);
        return null;
    }

    showLink(link) {
        if (this._fastext != null && link in this._fastext)
            return this.showPage(this._fastext[link]);

        return Promise.resolve(null);
    }

    _getFirstSubPage(page) {
        const subpages = page.subpages;
        for (let i = 0; i < subpages.length; i++) {
            if (subpages[i] != null) return i;
        }
        return null;
    }

    nextSubPage() {
        const subpages = this._page.subpages;
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
        return this._pageMetaObj();
    }

    previousSubPage() {
        const subpages = this._page.subpages;
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
        return this._pageMetaObj();
    }

    _pageMetaObj() {
        return {
            pageNumber: this._pageNumber,
            subPage: this._subPageNumber,
            numSubPages: this._page.subpages.filter(s => s != null).length,
            fastext: this._fastext,
            webUrl: 'webUrl' in this._page ? this._page.webUrl : null,
            image: 'image' in this._page ? this._baseURL + this._page.image : null
        };
    }

    _update() {
        const subpage = this._page.subpages[this._subPageNumber];
        const encoding = 'encoding' in subpage ? subpage.encoding : this._defaultG0Charset;
        const header = this._header.generate_(this._pageNumber);
        let casterDisplay = {
            defaultG0Charset: encoding,
            header: header,
        };
        this._ttx.clearScreen(false);
        this._ttx.setDefaultG0Charset(encoding, false);

        if ('outputLines' in subpage) {
            const outputLines = subpage.outputLines.split("\n");
            this._ttx.setPageFromOutputLines(outputLines, header);
            casterDisplay.outputLines = outputLines;
        } else if ('packed' in subpage) {
            const packed = subpage.packed;
            this._ttx.loadPageFromEncodedString(packed, header);
            casterDisplay.packed = packed;
        } else {
            console.error('E138 _update: outputLines or packed properties expected in subpage');
            casterDisplay = null;
        }

        if (casterDisplay && this._caster) this._caster.display(casterDisplay);

        this._fastext = 'fastext' in subpage ? subpage.fastext : null;
    }
}
