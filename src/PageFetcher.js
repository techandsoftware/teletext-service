// SPDX-FileCopyrightText: © 2021 Tech and Software Ltd.
// SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-uk.ltd.TechAndSoftware-1.0

export class PageFetcher {
    constructor() {
        this._magazine = null;
        this._magazineData = null;
    }

    async fetchPage(pageNumber) {
        const matches = pageNumber.match(/([1-8])[0-9A-Fa-f]{2}/);
        if (matches == null) return null;
        const magazine = matches[1];

        if (this._magazine != magazine) {
            try {
                const res = await fetch(`${magazine}.json`);
                if (res.ok) {
                    const data = await res.json();
                    if ('pages' in data) {
                        this._magazineData = data;
                        this._magazine = magazine;
                    } else console.warn(`W21 fetchPage: 'pages' property missing in ${magazine}.json`);
                } else console.warn(`W22 fetchPage: failed to load magazine data from ${magazine}.json : ${res.status} ${res.statusText}`);
            } catch (e) {
                console.warn(`W24 fetchPage: failed to load magazine data from ${magazine}.json :`, e.message);
            }
        }

        if (this._magazine == magazine && pageNumber in this._magazineData.pages) {
            return this._magazineData.pages[pageNumber];
        }
        return null;
    }
}
