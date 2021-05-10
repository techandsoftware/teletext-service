import { readdirSync, readFileSync, writeFileSync } from 'fs';
import * as path from 'path';

const DIR = 'public/teefax';

class Service {
    constructor() {
        this.pages = {};
    }

    setSubpage(page, subpage, outputLines, encoding, fastext) {
        if (!(page in this.pages)) {
            this.pages[page] = {
                subpages: []
            };
        }

        this.pages[page].subpages[subpage] = {
            outputLines: outputLines,
            encoding: encoding
        };
        if (fastext != null)
            this.pages[page].subpages[subpage].fastext = fastext.object();
    }

    clear() {
        this.pages = {};
    }
}

class PageStatus {
    constructor(code) {
        this._bits = Number(`0x${code}`).toString(2).padStart(16, 0).split('');

        // bits c12, c13, c14 from header row mapped to language in teletext spec
        this._languages = {
            "000": "g0_latin__english",
            "001": "g0_latin__german",
            "010": "g0_latin__swedish_finnish_hungarian",
            "011": "g0_latin__italian",
            "100": "g0_latin__french",
            "101": "g0_latin__portuguese_spanish",
            "110": "g0_latin__czech_slovak",
            "111": "g0_greek",
        };
    }

    encoding() {
        // bits 6, 7, 8 = c14, c13, c12
        const langBits = this._bits.slice(6, 9).reverse().join('');
        return this._languages[langBits];
    }

}

class Fastext {
    constructor(data) {
        const links = data.split(',');
        this.red = links[0];
        this.green = links[1];
        this.yellow = links[2];
        this.blue = links[3];
        this.link5 = links[4];
        this.index = links[5];

        this._obj = {};
        for (const link of ['red', 'green', 'yellow', 'blue', 'index']) {
            if (this[link] != 0) this._obj[link] = this[link];
        }
    }

    object() {
        return this._obj;
    }
}


const service = new Service();

// *.tti file format  https://zxnet.co.uk/teletext/documents/ttiformat.pdf
function getPagesFromTti(data) {
    const lines = data.split("\n");
    let pageNumber = 100;
    let subPage = 1;
    let outputLines = [];
    let encoding = null;
    let fastext = null;
    for (const line of [...lines]) {
        const matches = line.match(/([A-Z]{2}),(.+)/);
        if (matches != null) {
            const command = matches[1];
            const data = matches[2];
            if (command == 'PN') {
                const m = data.match(/(\d\d\d)(\d\d)/);
                if (m != null) {
                    if (outputLines.length) {
                        service.setSubpage(pageNumber, subPage, outputLines.join("\n"), encoding, fastext);
                    }
                    pageNumber = m[1];
                    subPage = parseInt(m[2]);
                    outputLines = [];
                    fastext = null;
                }
            } else if (command == 'OL') {
                outputLines.push(matches[0]);
            } else if (command == 'PS') {
                const ps = new PageStatus(data);
                encoding = ps.encoding();
            } else if (command == 'FL') {
                fastext = new Fastext(data);
            }
        }
    }
    if (outputLines.length)
        service.setSubpage(pageNumber, subPage, outputLines.join("\n"), encoding, fastext);
}

function go(outputDir) {
    const allFiles = readdirSync(DIR);
    for (const magazine of [1,2,3,4,5,6,7,8]) {
        const filesRegEx = `P${magazine}\\d\\d.*\\.tti`;
        let files = allFiles.filter(f => f.match(filesRegEx));
        for (const file of files) {
            const data = readFileSync(path.join(DIR, file), { encoding: 'UTF-8' });
            getPagesFromTti(data);
        }

        writeFileSync(path.join(outputDir, `${magazine}.json`), JSON.stringify(service, null, 2));
        service.clear();
    }
}


const outputDir = typeof process.argv[2] == 'undefined' ? '.' : process.argv[2];
go(outputDir);
