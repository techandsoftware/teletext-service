import { Teletext, Level } from './teletext/dist/teletext.js';

// SPDX-FileCopyrightText: © 2021 Tech and Software Ltd.
// SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-uk.ltd.TechAndSoftware-1.0

const FONTS = ['sans-serif', 'Bedstead', 'native', 'serif', 'Unscii', 'monospace', 'cursive'];
const VIEWS = ['classic__graphic-for-mosaic', 'classic__font-for-mosaic'];

class App {
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

        this._pageNumber = "100";
        this._magazine = null;
        this._magazineData = null;

        this._initEventListeners();
    }

    _initEventListeners() {
        window.addEventListener('keypress', e => handleKeyPress.call(this, e));

        window.addEventListener('DOMContentLoaded', () => {
            document.querySelector('#revealButton').addEventListener('click', () => {
                window.dispatchEvent(new Event('ttx.reveal'));
            });
            document.querySelector('#mixButton').addEventListener('click', () => {
                window.dispatchEvent(new Event('ttx.mix'));
            });
            document.querySelector('#pageNumber').addEventListener('change', e => {
                if (e.target.value.length == 3) this._newPage();
            });
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
        document.querySelector('#pageNumber').value = this._pageNumber;
    }

    _newPage() {
        const matches = this._pageNumber.match(/([12345678])\d\d/);
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
                this._magazineData = await res.json();
                this._magazine = magazine;
            } catch (e) {
                console.warn(`e75 _showPage: failed to load magazine data from ${magazine}.json :`, e.message);
            }
        }
        if (this._magazine == magazine && this._pageNumber in this._magazineData.pages) {
            const outputLines = this._getFirstSubPage();
            if (outputLines != null) {
                this._ttx.clearScreen();
                this._ttx.setPageFromOutputLines(outputLines);
            }
        } else {
            console.info('No page', this._pageNumber);
        }
    }

    _getFirstSubPage() {
        for (const subpage of [...this._magazineData.pages[this._pageNumber].subpages]) {
            if (subpage != null) return subpage.outputLines.split("\n");
        }
        return null;
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
            if (!(document.querySelector('#pageNumber') == document.activeElement))
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
            this._ttx.setHeight(document.documentElement.clientHeight * 0.8);
            break;

        case 'v': // switch views which changes the mosaic rendering method
            this._viewIndex++;
            if (this._viewIndex == VIEWS.length) this._viewIndex = 0;
            this._ttx.setView(VIEWS[this._viewIndex]);
            this._smoothPluginIsLoaded = false;
            break;

        case 'p': // load or remove the plugin to smooth mosaic graphics
            if (this._smoothPluginIsLoaded) {
                this._ttx.setView(VIEWS[this._viewIndex]); // resetting the view removes the plugin
                this._smoothPluginIsLoaded = false;
            } else if (this._viewIndex == 0) {  // plugin works on the graphical mosaic view
                // Loading the plugin as a dynamic import as it's large
                // This also avoids having to bundle it with the application lib at build time
                try {
                    const module = await import('./teletext-viewer/node_modules/@techandsoftware/teletext-plugin-smooth-mosaic/dist/teletext-plugin-smooth-mosaic.min.js');
                    this._ttx.registerViewPlugin(module.SmoothMosaicPlugin);
                    this._smoothPluginIsLoaded = true;
                } catch (e) {
                    console.error('App: Failed to use smooth mosaic plugin: import failed:', e.message);
                }
            }
            break;
    }
}

export { App };
//# sourceMappingURL=Viewer.js.map
