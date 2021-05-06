import { readdirSync, readFileSync } from 'fs';
import * as path from 'path';

const DIR = 'public/teefax';

class Service {
    constructor() {
        this.pages = {};
    }

    setSubpage(page, subpage, outputLines) {
        if (!(page in this.pages)) {
            this.pages[page] = {
                subpages: []
            };
        }

        this.pages[page].subpages[subpage] = {
            outputLines: outputLines
        };

    }
}


const service = new Service();

// *.tti file format  https://zxnet.co.uk/teletext/documents/ttiformat.pdf
function getPagesFromTti(data) {
    const lines = data.split("\n");
    let pageNumber = 100;
    let subPage = 1;
    let outputLines = [];
    for (const line of [...lines]) {
        const matches = line.match(/([A-Z]{2}),(.+)/);
        if (matches != null) {
            const command = matches[1];
            const data = matches[2];
            if (command == 'PN') {
                const m = data.match(/(\d\d\d)(\d\d)/);
                if (m != null) {
                    if (outputLines.length) {
                        service.setSubpage(pageNumber, subPage, outputLines.join("\n"));
                    }
                    pageNumber = m[1];
                    subPage = parseInt(m[2]);
                    outputLines = [];
                }
            } else if (command == 'OL') {
                outputLines.push(matches[0]);
            }
        }
    }
    if (outputLines.length) service.setSubpage(pageNumber, subPage, outputLines.join("\n"));
}

function go() {
    let files = readdirSync(DIR);
    files = files.filter(f => f.match(/P1\d\d.*\.tti/));
    for (const file of files) {
        const data = readFileSync(path.join(DIR, file), { encoding: 'UTF-8' });
        getPagesFromTti(data);
    }
    console.log(JSON.stringify(service, null, 2));
}


go();
