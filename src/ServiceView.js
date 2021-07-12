// SPDX-FileCopyrightText: © 2021 Tech and Software Ltd.
// SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-uk.ltd.TechAndSoftware-1.0

const FONTS = ['sans-serif', 'Bedstead', 'native', 'serif', 'Unscii', 'monospace', 'cursive'];
const VIEWS = ['classic__graphic-for-mosaic', 'classic__font-for-mosaic'];

import { TeletextService } from './Service.js';
import { ttxcaster } from '@techandsoftware/teletext-caster';

const HELP_PAGE = "OoECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECA6RQIECBAgQYOHDhw4cOHDhw4cOHDhw4cOHBAgQIECBAgQIDo0igQIECBBqAy8vnFvw8siDHv3dOW_ZzI_2qBAgQIECBAgQIECBAgQIEHdAgQIECBAgQIECDjz9IECBAgQIECBAgQIECA6RQIECBAgQIl69evXr169evXr169evXr169KgQIECBAgQIDqBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgOhECCTmQed_VBow9sqDCg15fOLfh5ZFiDrzyoOmjKgQIECA6EQIN3Xbiy8kGvL55oMO7Ig6aMqDXl880GLLs390CBAgQIDoFAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgOlNSNGjRo0aNGjRo0aNGjRo0aNGjRo0aNGjRo0aNGjR_2iA6U1BECBA_QIECCll7ZcOxAgQIECBAgQIECBAUQIECBB_aoDpTUEQIEG1AgQIJunwgQIECBAgQIECBAgQIEBRAgQIEH9qgOlNQRAgQW0CBAgocsvbTv680HPri4Yc-VAgQFECBAgQf2qA6U1BECBBdQIECCdl8dEHPri4Yc-VAgQIECAogQIECBB_aoDpTUE5L86_yvxIIe_Zv68kGLr06b93NAgQIEBRAgQIEH9qgOlNQRAgQaUCBAgk7smXwgxdenTfuQIECBAgQFECBAgQf2qA6U1BECBB0QIECCpl5ctObTjQZ-WHho04-aDfuX782Yp_aoDpTUEQIEGZAgQII2_d0Qc--npj0IECBAgQIEBRAgQIEH9qgOlNQRAgQekCBAgtZdyDbvyZUG_cv35syBAgQFECBAgQf2qA6U1IECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBB_aoDpREvXr169evXr169evXr169evXr169evXr169evXr169KgOoECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECA6gQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIDqBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgOoECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECA";
const TELETEXT_PLUGIN_SMOOTH_MOSAIC_URL = "https://cdn.jsdelivr.net/npm/@techandsoftware/teletext-plugin-smooth-mosaic@latest/dist/teletext-plugin-smooth-mosaic.min.js";

export class TeletextServiceViewer {
    constructor(options) {
        const serviceOptions = {
            defaultG0Charset: 'g0_latin__english',
            header: 'FAXFAX %%#  %%a %e %%b \x1bC%H:%M/%S',
            caster: ttxcaster,
            DOMSelector: '#teletextscreen'
        };
        let frontPageNumber = "";
        let useSmoothMosaics = false;
        if (typeof options == 'object') {
            for (const prop of ['defaultG0Charset', 'header', 'DOMSelector']) {
                if (prop in options) serviceOptions[prop] = options[prop];
            }
            if ('frontPage' in options) {
                if (typeof options.frontPage == 'number') frontPageNumber = String(options.frontPage);
                else if (typeof options.frontPage == 'string') frontPageNumber = options.frontPage;
                else if (options.frontPage == null) frontPageNumber == "null";
            }
            if ('smoothMosaics' in options && options.smoothMosaics) useSmoothMosaics = true;
        }
        if (frontPageNumber == "") frontPageNumber = '100';

        this._service = new TeletextService(serviceOptions);

        this._pageNumber = frontPageNumber.length == 3 ? frontPageNumber : 'XXX';
        this._fontIndex = 0;
        this._viewIndex = 0;

        ttxcaster.available.attach(() => this._castAvailable.call(this));
        ttxcaster.castStateChanged.attach(() => this._castStateChanged.call(this));

        this._initEventListeners();
        if (useSmoothMosaics) this._toggleSmoothMosaics();
        this._newPage();
    }

    _castStateChanged() {
        const state = ttxcaster.getCastState();
        const castEl = document.querySelector('#castOuter');
        switch (state) {
            case 'NO_DEVICES_AVAILABLE':
                castEl.title = "Cast to Chromecast - no devices available";
                castEl.style.cursor = 'default';
                break;

            case 'NOT_CONNECTED':
                castEl.title = "Cast to Chromecast";
                castEl.style.cursor = 'pointer';
                break;

            case 'CONNECTING':
                break;

            case 'CONNECTED':
                this._newPage();
                if (this._smoothPluginIsLoaded) ttxcaster.setSmoothMosaics();
                break;
        }
    }

    _castAvailable() {
        document.querySelector('#castOuter').style.display = 'inline-block';
    }

    _initEventListeners() {
        window.addEventListener('keydown', e => handleKeyDown.call(this, e));

        window.addEventListener('DOMContentLoaded', () => {
            document.querySelector('#revealButton').addEventListener('click', () => this._reveal());
            document.querySelector('#mixButton').addEventListener('click', () => this._mix());
            for (const link of ['red', 'green', 'yellow', 'blue', 'index']) {
                document.querySelector(`#${link}`).addEventListener('click', () => this._handleFastext(link));
            }
            document.querySelectorAll('[data-num]').forEach(el => el.addEventListener('click', () => this._numberInput(el.dataset.num)));
            document.querySelector('#left').addEventListener('click', () => this._previousSubPage());
            document.querySelector('#right').addEventListener('click', () => this._nextSubPage());
            document.querySelector('#helpicon').addEventListener('click', () => this._showHelp());
        });
    }

    _reveal() {
        window.dispatchEvent(new Event('ttx.reveal'));
        ttxcaster.toggleReveal();
    }

    _mix() {
        window.dispatchEvent(new Event('ttx.mix'));
        ttxcaster.toggleMixMode();
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

    async _newPage() {
        const matches = this._pageNumber.match(/[1-8][0-9A-Fa-f]{2}/);
        if (matches != null) {
            const meta = await this._service.showPage(this._pageNumber);
            this._update(meta);
        }
    }

    _nextSubPage() {
        const meta = this._service.nextSubPage();
        this._update(meta);
    }

    _previousSubPage() {
        const meta = this._service.previousSubPage();
        this._update(meta);
    }

    _update(meta) {
        if (meta != null) {
            this._pageNumber = meta.pageNumber;
            this._updatePageNumber();
            this._updateSubpageNav(meta);
            this._updateButtonState(meta);
            this._updateWebLink(meta.webUrl);
            this._updateFocus();
        }
    }

    // FUDGE Firefox keeps focus on disabled element which blocks keyboard entry
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1712587
    _updateFocus() {
        if (document.activeElement.disabled) document.activeElement.blur();
    }

    _updateSubpageNav(meta) {
        const label = document.querySelector('#subpage');
        if (meta != null && meta.numSubPages > 1) {
            label.innerHTML = `${meta.subPage} of ${meta.numSubPages}`;
            label.style.visibility = 'visible';
            document.querySelectorAll('#lrnav button').forEach(b => b.disabled = false);
        } else {
            label.style.visibility = 'hidden';
            document.querySelectorAll('#lrnav button').forEach(b => b.disabled = true);
        }
    }

    _updateButtonState(meta) {
        const ft = meta != null ? meta.fastext : {};
        for (const link of ['red', 'green', 'yellow', 'blue', 'index']) {
            let disabled = true;
            if (ft != null && link in ft) disabled = false;
            document.querySelector(`#${link}`).disabled = disabled;
        }
    }

    _updateWebLink(url) {
        const link = document.querySelector('#webicon');
        if (url == null) {
            link.style.display = 'none';
            link.href = '';
        } else {
            link.href = url;
            link.style.display = '';
        }
    }

    async _handleFastext(link) {
        const meta = await this._service.showLink(link);
        this._update(meta);
    }

    _disableNav() {
        for (const link of ['red', 'green', 'yellow', 'blue', 'index', 'left', 'right']) {
            document.querySelector(`#${link}`).disabled = true;
        }
    }

    _showHelp() {
        this._clearPageNumber();
        this._disableNav();
        const ttx = this._service.teletextInstance;
        ttx.setDefaultG0Charset('g0_latin__english', false);
        ttx.loadPageFromEncodedString(HELP_PAGE);
    }

    _generateBackground() {
        const hue = Math.floor((Math.random() * 360));
        const deg = Math.floor((Math.random() * 360));
        const bg = `linear-gradient(${deg}deg, hsl(${hue} 100% 7%) 0%, hsl(${hue} 83% 52%) 86%, hsl(${hue} 100% 85%) 100%)`;
        document.body.style.background = bg;
    }

    async _toggleSmoothMosaics() {
        if (this._smoothPluginIsLoaded) {
            this._service.teletextInstance.setView(VIEWS[this._viewIndex]); // resetting the view removes the plugin
            this._smoothPluginIsLoaded = false;
            ttxcaster.setBlockMosaics();
        } else if (this._viewIndex == 0) {  // plugin works on the graphical mosaic view
            // Loading the plugin as a dynamic import as it's large
            // This also avoids having to bundle it with the application lib at build time
            try {
                const module = await import(TELETEXT_PLUGIN_SMOOTH_MOSAIC_URL);
                this._service.teletextInstance.registerViewPlugin(module.SmoothMosaicPlugin);
                this._smoothPluginIsLoaded = true;
                ttxcaster.setSmoothMosaics();
            } catch (e) {
                console.error('TeletextServiceViewer: Failed to use smooth mosaic plugin: import failed:', e.message);
            }
        }
    }

    _toggleZenMode() {
        document.body.classList.toggle('zen');
    }
}

function handleKeyDown(e) {
    if (e.altKey || e.metaKey || e.ctrlKey) return;
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

        case '?':
            this._reveal();
            break;

        case 'm':
            this._mix();
            break;

        case 'f': // rotate through fonts
            this._fontIndex++;
            if (this._fontIndex == FONTS.length) this._fontIndex = 0;
            console.debug('setting font to', FONTS[this._fontIndex]);
            this._service.teletextInstance.setFont(FONTS[this._fontIndex]);
            break;

        case 'w': // for wipe
            this._service.teletextInstance.clearScreen();
            break;

        case 'h':
            this._showHelp();
            break;

        case 'v': // switch views which changes the mosaic rendering method
            this._viewIndex++;
            if (this._viewIndex == VIEWS.length) this._viewIndex = 0;
            this._service.teletextInstance.setView(VIEWS[this._viewIndex]);
            this._smoothPluginIsLoaded = false;
            break;

        case 't': // 'terrific' graphics: pixel art upscaling
            this._toggleSmoothMosaics();
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
        case "ArrowRight":
            this._nextSubPage();
            break;

        case '-':
        case '<':
        case "ArrowLeft":
            this._previousSubPage();
            break;

        case 'c':
            this._generateBackground();
            break;

        case 'z':
            this._toggleZenMode();
            break;

        default:
    }
}
