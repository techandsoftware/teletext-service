// SPDX-FileCopyrightText: © 2021 Tech and Software Ltd.
// SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-uk.ltd.TechAndSoftware-1.0

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export class Header {
    constructor(string) {
        this._template = string;
    }

    _tokens () {
        const now = new Date();
        return {
            '%%a': DAYS[now.getDay()],
            '%%b': MONTHS[now.getMonth()],
            '%d': String(now.getDate()).padStart(2, 0),
            '%e': String(now.getDate()).padStart(2, " "),
            '%m': String(now.getMonth() + 1).padStart(2, " "),
            "%y": String(now.getFullYear()).substring(2, 2),
            "%H": String(now.getHours()).padStart(2, 0),
            "%M": String(now.getMinutes()).padStart(2, 0),
            "%S": String(now.getSeconds()).padStart(2, 0)
        };
    }

    generate_(pageNumber) {
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
