// SPDX-FileCopyrightText: © 2021 Tech and Software Ltd.
// SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-uk.ltd.TechAndSoftware-1.0

const FONTS = ['sans-serif', 'Bedstead', 'native', 'serif', 'Unscii', 'monospace', 'cursive'];
const VIEWS = ['classic__graphic-for-mosaic', 'classic__font-for-mosaic'];

import { Teletext, Level } from '@techandsoftware/teletext';

export class App {
    constructor() {
        this._ttx = Teletext();
        this._ttx.setDefaultG0Charset('g0_latin__english');
        this._ttx.setLevel(Level[1.5]);
        this._ttx.addTo('#teletextscreen');
        this._ttx.setHeight(500);
        this._ttx.showTestPage();

        this._fontIndex = 0;
        this._viewIndex = 0;
        this._smoothPluginIsLoaded = false;

        this._pageNumber = "XXX";
        this._subPageNumber = 0;
        this._magazine = null;
        this._magazineData = null;
        this._fastext = null;

        this._header = new Header('TEEFAX %%#  %%a %e %%b \x1bC%H:%M/%S');

        this._initEventListeners();
    }

    _initEventListeners() {
        window.addEventListener('keypress', e => handleKeyPress.call(this, e));
        window.addEventListener('keydown', e => handleKeyDown.call(this, e));

        window.addEventListener('DOMContentLoaded', () => {
            document.querySelector('#revealButton').addEventListener('click', () => window.dispatchEvent(new Event('ttx.reveal')));
            document.querySelector('#mixButton').addEventListener('click', () => window.dispatchEvent(new Event('ttx.mix')));
            for (const link of ['red', 'green', 'yellow', 'blue', 'index']) {
                document.querySelector(`#${link}`).addEventListener('click', () => this._handleFastext(link));
            }
            document.querySelectorAll('[data-num]').forEach(el => el.addEventListener('click', () => this._numberInput(el.dataset.num)));
            document.querySelector('#left').addEventListener('click', () => this._previousSubPage());
            document.querySelector('#right').addEventListener('click', () => this._nextSubPage());
            document.querySelector('#helpicon').addEventListener('click', () => this._showHelp());
        });
    }

    _numberInput(number) {
        const pnLength = String(this._pageNumber).length;
        if (pnLength == 3) {
            this._pageNumber = number;
        } else {
            this._pageNumber = String(this._pageNumber) + number;
        }
        this._updatePageNumber();
        if (String(this._pageNumber).length == 3) this._newPage();
    }

    _updatePageNumber() {
        document.querySelector('#pageNumber').innerHTML = this._pageNumber;
    }

    _clearPageNumber() {
        this._pageNumber = 'XXX';
        document.querySelector('#pageNumber').innerHTML = '- - -';
        document.querySelector('#subpage').style.visibility = 'hidden';
    }

    _newPage() {
        const matches = this._pageNumber.match(/([12345678])[0-9A-Fa-f][0-9A-Fa-f]/);
        if (matches != null) {
            const magazine = matches[1];
            this._showPage(magazine);
        }
    }

    async _showPage(magazine) {
        console.info('showing page in mag', magazine, this._pageNumber);
        if (this._magazine != magazine) {
            try {
                const res = await fetch(`${magazine}.json`);
                // TODO - check response.ok
                this._magazineData = await res.json();
                this._magazine = magazine;
            } catch (e) {
                console.warn(`e75 _showPage: failed to load magazine data from ${magazine}.json :`, e.message);
            }
        }
        if (this._magazine == magazine && this._pageNumber in this._magazineData.pages) {
            this._subPageNumber = this._getFirstSubPage();
            if (this._subPageNumber != null) {
                this._update();
            }
        } else {
            console.info('No page', this._pageNumber);
        }
    }

    _getFirstSubPage() {
        const subpages = this._magazineData.pages[this._pageNumber].subpages;
        for (let i = 0; i < subpages.length; i++) {
            if (subpages[i] != null) return i;
        }
        return null;
    }

    _nextSubPage() {
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
    }

    _previousSubPage() {
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
    }

    _updateSubpageNav() {
        const numSubpages = this._magazineData.pages[this._pageNumber].subpages.length - 1;
        const label = document.querySelector('#subpage');
        if (numSubpages > 0) {
            label.innerHTML = `${this._subPageNumber} of ${numSubpages}`;
            label.style.visibility = 'visible';
            document.querySelectorAll('#lrnav button').forEach(b => b.disabled = false);
        } else {
            label.style.visibility = 'hidden';
            document.querySelectorAll('#lrnav button').forEach(b => b.disabled = true);
        }
    }

    _updateButtonState() {
        const ft = this._fastext;
        for (const link of ['red', 'green', 'yellow', 'blue', 'index']) {
            let disabled = true;
            if (ft != null && link in ft) disabled = false;
            document.querySelector(`#${link}`).disabled = disabled;
        }
    }

    _update() {
        const subpage = this._magazineData.pages[this._pageNumber].subpages[this._subPageNumber];
        const outputLines = subpage.outputLines.split("\n");
        const encoding = 'encoding' in subpage ? subpage.encoding : 'latin_g0';
        this._ttx.clearScreen(false);
        this._ttx.setDefaultG0Charset(encoding, false);
        this._ttx.setPageFromOutputLines(outputLines, this._header.generate(this._pageNumber));
        this._updateSubpageNav();
        this._fastext = 'fastext' in subpage ? subpage.fastext : null;
        this._updateButtonState();
    }

    _handleFastext(link) {
        if (this._fastext != null) {
            if (link in this._fastext) {
                this._pageNumber = this._fastext[link];
                this._updatePageNumber();
                this._newPage();
            }
        }
    }

    _disableNav() {
        for (const link of ['red', 'green', 'yellow', 'blue', 'index', 'left', 'right']) {
            document.querySelector(`#${link}`).disabled = true;
        }
    }

    _showHelp() {
        this._clearPageNumber();
        this._disableNav();
        this._ttx.setDefaultG0Charset('g0_latin__english', false);
        this._ttx.loadPageFromEncodedString("OoECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECA6RQIECBAgQYOHDhw4cOHDhw4cOHDhw4cOHBAgQIECBAgQIDo0igQIECBBqAy8vnFvw8siDHv3dOW_ZzI_2qBAgQIECBAgQIECBAgQIEHdAgQIECBAgQIECDjz9IECBAgQIECBAgQIECA6RQIECBAgQIl69evXr169evXr169evXr169KgQIECBAgQIDqBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgOhECCTmQed_VBow9sqDCg15fOLfh5ZFiDrzyoOmjKgQIECA6EQIN3Xbiy8kGvL55oMO7Ig6aMqDXl880GLLs390CBAgQIDoFAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgOlNSNGjRo0aNGjRo0aNGjRo0aNGjRo0aNGjRo0aNGjR_2iA6U1BECBA_QIECCll7ZcOxAgQIECBAgQIECBAUQIECBB_aoDpTUEQIEG1AgQIJunwgQIECBAgQIECBAgQIEBRAgQIEH9qgOlNQRAgQW0CBAgocsvbTv680HPri4Yc-VAgQFECBAgQf2qA6U1BECBBdQIECCdl8dEHPri4Yc-VAgQIECAogQIECBB_aoDpTUE5L86_yvxIIe_Zv68kGLr06b93NAgQIEBRAgQIEH9qgOlNQRAgQaUCBAgk7smXwgxdenTfuQIECBAgQFECBAgQf2qA6U1BECBB0QIECCpl5ctObTjQZ-WHho04-aDfuX782Yp_aoDpTUEQIEGZAgQII2_d0Qc--npj0IECBAgQIEBRAgQIEH9qgOlNSBAgQIECBAgQIECBAgQIECBAgQIECBAgQFECBAgQf2qA6URL169evXr169evXr169evXr169evXr169evXr169evSoDqBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgOoECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECA6gQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIDqBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgOoECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECA");
    }

    _generateBackground() {
        const hue = parseInt(Math.random() * 360);
        const deg = parseInt(Math.random() * 360);
        const bg = `linear-gradient(${deg}deg, hsl(${hue} 100% 7%) 0%, hsl(${hue} 83% 52%) 86%, hsl(${hue} 100% 85%) 100%)`;
        document.body.style.background = bg;
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



async function handleKeyPress(e) {
    switch (e.key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
            document.querySelector(`#b${e.key}`).focus({ preventScroll: true});
            this._numberInput(e.key);
            break;

        case '?': // reveal
            window.dispatchEvent(new Event("ttx.reveal"));
            break;

        case 'm': // mix
            window.dispatchEvent(new Event("ttx.mix"));
            break;

        case 'f': // rotate through fonts
            this._fontIndex++;
            if (this._fontIndex == FONTS.length) this._fontIndex = 0;
            console.debug('setting font to', FONTS[this._fontIndex]);
            this._ttx.setFont(FONTS[this._fontIndex]);
            break;

        case 'w': // for wipe
            this._ttx.clearScreen();
            break;

        case 'h':
            this._showHelp();
            break;

        case 'v': // switch views which changes the mosaic rendering method
            this._viewIndex++;
            if (this._viewIndex == VIEWS.length) this._viewIndex = 0;
            this._ttx.setView(VIEWS[this._viewIndex]);
            this._smoothPluginIsLoaded = false;
            break;

        case 't': // 'terrific' graphics: pixel art upscaling
            if (this._smoothPluginIsLoaded) {
                this._ttx.setView(VIEWS[this._viewIndex]); // resetting the view removes the plugin
                this._smoothPluginIsLoaded = false;
            } else if (this._viewIndex == 0) {  // plugin works on the graphical mosaic view
                // Loading the plugin as a dynamic import as it's large
                // This also avoids having to bundle it with the application lib at build time
                try {
                    const module = await import('@techandsoftware/teletext-plugin-smooth-mosaic');
                    this._ttx.registerViewPlugin(module.SmoothMosaicPlugin);
                    this._smoothPluginIsLoaded = true;
                } catch (e) {
                    console.error('App: Failed to use smooth mosaic plugin: import failed:', e.message);
                }
            }
            break;

        case 'r':
            this._handleFastext('red');
            break;

        case 'g':
            this._handleFastext('green');
            break;

        case 'y':
            this._handleFastext('yellow');
            break;

        case 'b':
            this._handleFastext('blue');
            break;

        case 'i':
            this._handleFastext('index');
            break;

        case '=':
        case '+':
        case '>':
            this._nextSubPage();
            break;

        case '-':
        case '<':
            this._previousSubPage();
            break;

        case 'c':
            this._generateBackground();
            break;

        default:
    }
    
}

function handleKeyDown(e) {
    switch (e.key) {
        case "ArrowLeft":
            this._previousSubPage();
            break;
        case "ArrowRight":
            this._nextSubPage();
            break;
        default:
    }
}
