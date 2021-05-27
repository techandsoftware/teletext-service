<!-- SPDX-FileCopyrightText: © 2021 Tech and Software Ltd. -->
<!-- SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-uk.ltd.TechAndSoftware-1.0 -->

The package represents a teletext service, and is a wrapper for [@techandsoftware/teletext](https://www.npmjs.com/package/@techandsoftware/teletext).  It adds page numbers, subpage and fastext navigation (colour buttons). By default, pages are fetched as JSON over HTTP, but that can be overriden by your own page fetcher. It supports casting pages to Chromecast using [@techandsoftware/teletext-caster](https://www.npmjs.com/package/@techandsoftware/teletext-caster), and higher-resolution mosaic graphics using a pixel-art scaling algorithm via [@techandsoftware/teletext-plugin-smooth-mosaic](https://www.npmjs.com/package/@techandsoftware/teletext-plugin-smooth-mosaic).

This implements the display portion of teletext and wraps it up as a web app.  It's not an emulator as it doesn't decode the VBI transmission part like a TV or teletext display adapter.

# Live demo

See https://teletext-service.netlify.app/

# Usage

`TeletextService` handles page retrieval and display. `TeletextServiceViewer` is higher level with support for page numbers, subpages and fastext (coloured button links).

## TeletextService module

Minimum code needed to use the `TeletextService` module:

```html
<div id="teletextscreen"></div>

<script type="module">
import { TeletextService } from './dist/teletext-service.min.js';

const service = new TeletextService({
    DOMSelector: '#teletextscreen'
});

service.showPage("100");
// Will fetch 1.json and get page 100 from that,
// and display in the HTML <div>
</script>
```

The JSON structure needed is described below.

## TeletextServiceViewer module

`TeletextServiceViewer` is a web app wrapper around `TeletextService`.  It handles page number entry, subpage nav, fastext button state changes and entry, reveal and mix, with control using the webapp UI or keyboard shortcuts. It's tightly-coupled to the HTML so it's not really an API but it does support some options.  It's most likely you'll use the code as it is or fork it. The module also incorporates [teletext-caster](https://www.npmjs.com/package/@techandsoftware/teletext-caster) so that pages can be viewed on a Chromecast in supporting browsers.

The Javascript code is invoked with:

```html
<div id="teletextscreen"></div>
<script type="module">
  import { TeletextServiceViewer } from './dist/teletext-service.min.js';
  new TeletextServiceViewer();
</script>
```

For the rest of HTML needed, see `public/index.html` in the repo.

To run locally, clone the project then run `npm install` and `npm start` .

Use `scripts/tti2json.js` to generate the JSON files needed as the page data source, or create your own.  The JSON structure needed is documented below in the 'Default page data source' section.

## tti2json script

`scripts/tti2json.js` is a Node.js script, which reads a directory containing multiple `.tti` files and converts to the JSON files and structure used by the default page fetcher.

Requirements: It needs node v16 as it uses ECMAScript modules.

Usage: 
```
node scripts/tti2json.js sourceDirectory targetDirectory
```

`sourceDirectory` is the directory containing the `.tti` files

`targetDirectory` is where to write the generated JSON files. They're named `1.json` to `8.json`, and will overwrite any existing files with the same name.  It defaults to the current directory.

You might need to modify the script to change the regex used for getting the list of `.tti` files. It's in the `go()` function near the bottom.

If you get the error `Error [ERR_REQUIRE_ESM]: Must use import to load ES Module` when you run, then check the node version, as you need v16.

If you're looking where to get the .tti files, then see https://zxnet.co.uk/teletext/emulators/ for some sources from various repositories, such as Teefax.

# Licensing

The core project is licensed under GNU Affero General Public License 3 ([AGPL-3.0-only](https://www.gnu.org/licenses/agpl-3.0.en.html)), or under a commercial software license ([LicenseRef-uk.ltd.TechAndSoftware-1.0](https://techandsoftware.robdev.org.uk/LICENSES/LicenseRef-uk.ltd.TechAndSoftware-1.0.txt)) if you have paid a licensing fee to Tech and Software Ltd. If you combine your own software with this package and distribute publically (whether via network access or not), the AGPL requires that your software is covered by AGPL; the commercial license does not have that requirement. In order to pay the fee for the commercial license, contact <techandsoftwareltd@outlook.com> for enquiries. The text of the licenses is in the `LICENSES` directory.

Dependencies:
* The fonts in @techandsoftware/teletext-fonts are public domain
* @techandsoftware/teletext-plugin-smooth-mosaic is loaded via cdn.jsdelivr.net, and uses [LGPL-2.1-or-later](https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html)
  * js-hqx uses [LGPL-2.1-or-later](https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html)

# TeletextService and TeletextServiceViewer API

## new TeletextService(options)

Creates a teletext service instance. `options` is required, and has the following properties:

```
{
    DOMSelector: string,
    defaultG0Charset?: string,
    caster?: object,
    header?: string,
    fetcher?: object
}
```

* `DOMSelector` is required, and is a selector string for the teletext screen container, e.g. `#teletextscreen`
* `defaultG0Charset` sets the default G0 character set on the teletext instance. If not passed in, the default character set is `g0_latin`. See `setDefaultG0Charset()` in [@techandsoftware/teletext](https://www.npmjs.com/package/@techandsoftware/teletext) for the available values
* `caster` - pass in a `ttxcaster` from [@techandsoftware/teletext-caster](https://www.npmjs.com/package/@techandsoftware/teletext-caster) and this will be used to show pages on the connected Chromecast
* `header` is the string to use as the header row. If not passed in, a default header row is used. See below for tokens that can be used in the header.
* `fetcher` - pass in an object used to fetch teletext pages. If this is not passed in, then pages are expected to be in JSON and retrieved from same directory of the web page containing the teletext instance.  See the 'Default page data source' section on the expected data format for the default fetcher. See the 'fetcher object' section below for details on passing in your own fetcher.

### `header` format

The `header` string is 32 characters and can contain the following tokens:

| Token | Used for    | Length                      |
|-------| ------------|-----------------------------|
| `%%#` | Page number | 3 characters                |
| `%%a` | Day         | 3 characters                |
| `%%b` | Month       | 3 characters                |
| `%d`  | Date        | 2 digits with leading 0     |
| `%e`  | Date        | 2 digits with leading space |
| `%m`  | Month       | 2 digits with leading space |
| `%y`  | Year        | 2 digits                    |
| `%H`  | Hour        | 2 digits with leading 0     |
| `%M`  | Minutes     | 2 digits with leading 0     |
| `%S`  | Seconds     | 2 digits with leading 0     |

Teletext character attributes (control codes) can also be used. They can be represented in three ways:  1) As they are with no translation, or 2) They have 0x80 added to translate them to characters with codes 128-159, or 3) they are replaced by escape (character 0x1b) then the character with 0x40 added.  This is taken from MRG's .tti Output Line format.

### `fetcher` object

You can supply your own object which fetches pages to override the default fetcher.  The interface it needs to implement is:

```javascript
{
    async function fetchPage(pageNumber)
    // pageNumber is a 3 character string, values 100 to 8FF
}
```

`fetchPage` returns a promise. The promise resolves to a `page` object or `null` if the page couldn't be fetched for any reason.  The `page` object is described below in the 'Default page data source' section.

## service.showPage(pageNumber)

Shows the page with the number. The page number must be three characters, from 100 to 8FF.

If using the default fetcher, this will get the magazine JSON containing the page, and get the page data from that. The magazine filenames are derived from the page number, and named `1.json` to `8.json`. For example, page 100 will cause `1.json` to be fetched and page 100 used from that. The first non-null subpage in the page data is displayed.

Response is a promise. When resolved, the value is:
* `null` - if the page couldn't be retrieved for any reason. This could be because the page number is invalid, or the magazine JSON couldn't be retrieved, or the page isn't in the JSON, or the page has no subpages.
* `meta`: object with the following properties:

  * `pageNumber`: string - the current page number (100 to 8FF)
  * `subPage`: number - the current subpage number
  * `numSubPages`: number - how many subpages in total for the page
  * `fastext`: object - if the current page has fastext (coloured) links, the object will have corresponding properties. The property names are `red`, `green`, `yellow`, `blue` and `index`. The values for each are the linked page numbers.

## service.nextSubPage()

Shows the next subpage for the current page. If there's only one subpage there's no change.

The response is the `meta` object - see the `showPage()` response.

## service.previousSubPage()

Shows the previous subpage for the current page. If there's only one subpage there's no change.

The response is the `meta` object - see the `showPage()` response.

## service.showLink(link)

Shows the page with the link on the current page. These are used for the colour buttons on a remote, or fastext buttons. The link is a string with the value `red`, `green`, `yellow`, `blue` or `index`. (The teletext spec calls this editorial linking, using packet X/27).

Response is a promise, and is the same as for `showPage()`.

If the page doesn't have the link, the promise resolves to `null`.

## service.teletextInstance property

Returns the teletext instance object (an instance of `@techandsoftware/teletext`), so you can call methods on this directly, for example to change the font, draw pages or any other API calls you need direct access to. For the API, see https://www.npmjs.com/package/@techandsoftware/teletext

## new TeletextServiceViewer(options)

Creates a teletext service viewer instance. `options` is optional and has the following properties:
```
{
    DOMSelector?: string,
    defaultG0Charset?: string,
    header?: string
    frontPage?: string | null,
    smoothMosaics?: boolean
}
```

* `DOMSelector` is a selector string for the teletext screen container. Default is `#teletextscreen`
* `defaultG0Charset` sets the default G0 character set on the teletext instance. Defaults to `g0_latin__english`. See `setDefaultG0Charset()` in [@techandsoftware/teletext](https://www.npmjs.com/package/@techandsoftware/teletext) for the available values
* `header` is the header row to replace the default header row. See the "`header` format" section above for the format
* `frontPage` is the front page number, which will be shown automatically. Defaults to page 100.  Pass in null to not show the front page automatically
* `smoothMosaics` - if true will use a pixel-art scaling algorithm to generate smoother mosaic graphics when the service starts. Default is false

# Default page data source

The default page fetcher looks for files named `1.json` to `8.json` in the same location as the HTML page running your app.  Each file is a magazine, containing all the pages for that magazine. The magazine corresponds to the hundreds digit of the page number.

An example structure follows for magazine 1. This has two pages. Page 100 has three subpages, but the first one is empty. Page 101 has two subpages with fastext links.

The subpages either supply `outputLines` or `packed` for the teletext data, described below.

```json
{
    "pages": {
        "100": {
            "subpages": [
                null,
                {
                    "outputLines": "....",
                    "encoding": "g0_latin__english"
                },
                {
                    "outputLines": "....",
                    "encoding": "g0_latin__english"
                }
            ]
        },
        "101": {
            "subpages": [
                {
                    "outputLines": "....",
                    "encoding": "g0_latin__english",
                    "fastext": {
                        "red": "199",
                        "green": "150",
                        "yellow": "800",
                        "blue": "200",
                        "index": "100"
                    }
                },
                {
                    "packed": "....",
                    "encoding": "g0_latin__english",
                    "fastext": {
                        "red": "199",
                        "green": "150",
                        "yellow": "800",
                        "blue": "200",
                        "index": "100"
                    }
                }
            ]
        }
    }
}
```

## Top level and `pages` object

The outermost object has a `pages` key.
* `pages` is required. Its value is an object, in which the keys are the page numbers and the values are a `page` object

## `page` object

Has one key:
* `subpages` key is required. Its value is an array of 1 or more `subpage` objects.  Any of the subpages can be `null`

## `subpage` object

Has the following keys:
* `encoding` is the default G0 character set for the subpage.  It's optional. If not present, the character set passed in by `defaultG0Charset` in the `new TeletextService()` call is used.
* `fastext` is optional. If present it can contain keys for `red`, `green`, `yellow`, `blue` and `index`. The values are the page numbers to link to. The numbers are actually strings to allow for 100 to 8FF.
* `outputLines` or `packed` strings are the teletext data. You can supply either of these. One is required.

### `outputLines` format

String. The contents is in the Output Line format used in MRG's .tti files. Each line has the format:

`OL,rowNum,line\n`

In this:

* `rowNum` is between 0 and 24
* `line` is the string to display. Attribute characters (character codes less than 0x20) are represented in three ways: 1) As they are with no translation, or 2) They have 0x80 added to translate them to characters with codes 128-159, or 3) they are replaced by escape (character 0x1b) then the character with 0x40 added.

### `packed` format

String. The contents is a base64-encoded string of 7-bit characters for the 25 rows x 40 characters concatenated together. The encoded string uses the character repertoire defined in the [base64url encoding](https://tools.ietf.org/html/rfc4648#section-5). This format is taken from the edit.tf editor URL hash fragment - see further details here: https://github.com/rawles/edit.tf

An example is in `public/1.json`, or see the URL hash at https://edit.tf (the part after the colon)

# Credits

* The tokens used by the header were taken from vbit2's header config - https://github.com/peterkvt80/vbit2/
  * Some example headers can be seen in https://github.com/peterkvt80/vbit2/blob/master/example-vbit.conf
* The attribute character encoding used for the header and the page data is taken from the Output Line format in MRG's .tti file spec - https://zxnet.co.uk/teletext/documents/ttiformat.pdf
* The packed page data format is taken from the hash format used by Simon Rawles online teletext editor - https://github.com/rawles/edit.tf
* Engineering test page in the example 1.json from Ceefax via Teletext Archeologist - https://archive.teletextarchaeologist.org/
