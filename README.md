The package represents a teletext service, and is a wrapper for [@techandsoftware/teletext](https://www.npmjs.com/package/@techandsoftware/teletext) and [@techandsoftware/teletext-caster](https://www.npmjs.com/package/@techandsoftware/teletext-caster).  It adds subpage and fastext navigation (colour buttons). By default, pages are fetched as JSON over HTTP, but that can be overriden by your own page fetcher.

# Using



# Service API

## new Service(options)

Creates a teletext service instance. `options` is required, and has the following properties:

* `DOMSelector` : string (required).  This is a selector string for the teletext screen container, e.g. `#teletextscreen`
* `defaultG0Charset` : string (optional). Sets the default G0 character set on the teletext instance. If not passed in, the default character set is `g0_latin`. See `setDefaultG0Charset()` in [@techandsoftware/teletext](https://www.npmjs.com/package/@techandsoftware/teletext) for the available values
* `caster` : object (optional). Pass in a `ttxcaster` from [@techandsoftware/teletext-caster](https://www.npmjs.com/package/@techandsoftware/teletext-caster) and this will be used to show pages on the connected Chromecast
* `header`: string (optional). The string to use as the header row. If not passed in, a default header row is used. See below for tokens that can be used in the header.
* `fetcher`: object (optional). Pass in an object used to fetch teletext pages.  It not passed in, then pages are expected to be in JSON and retrieved from same directory of the web page containing the teletext instance.  See below for details. TODO

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

### `fetcher` object details

TODO

## service.showPage(pageNumber)

Shows the page with the number. The page number must be three characters, from 100 to 8FF.

If using the default fetcher, this will get the magazine JSON containing the page, and get the page data from that. The magazine filenames are derived from the page number, and named `1.json` to `8.json`. For example, page 100 will cause `1.json` to be fetched and page 100 used from that. The first non-null subpage in the page data is displayed.

Response is a promise. When resolved, the value is:
* `null` - if the page couldn't be retrieved for any reason. This could be because the page number is invalid, or the magazine JSON couldn't be retrieved, or the page isn't in the JSON, or the page has no subpages. TODO consider if promise should reject instead
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

# Default page data source

The default fetcher looks for files named `1.json` to `8.json` in the same location as the HTML  running your app.  Each file is a magazine, containing all the pages for that magazine. The magazine corresponds to the hundreds digit of the page number.

An example structure follows magazine 1. This has two pages. Page 100 has three subpages, but the first one is empty. Page 101 has one subpage with fastext links.

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
                }
            ]
        }
    }
}
```

where
* `subpages` is an array of 1 or more objects, each corresponding to a subpage.  Any of the subpages can be null
* `encoding` is the default G0 character set for the subpage.  It's optional. If not present, the character set passed in by `defaultG0Charset` in the `new Service()` call is used.
* `fastext` is optional. If present it can contain keys for `red`, `green`, `yellow`, `blue` and `index`. The values are the page numbers to link to.
* `outputLines` is the teletext data. The data is in the Output Line format used in MRG's .tti files. Each line has the format:

`OL,rowNum,line\n`

In this:

* `rowNum` is between 0 and 24
* `line` is the string to display. Attribute characters (character codes less than 0x20) are represented in three ways: 1) As they are with no translation, or 2) They have 0x80 added to translate them to characters with codes 128-159, or 3) they are replaced by escape (character 0x1b) then the character with 0x40 added.


# Credits

* The tokens used by the header were taken from vbit2's header config - https://github.com/peterkvt80/vbit2/
* The attribute character encoding used for the header and the page data is taken from the Output Line format in MRG's .tti file spec - https://zxnet.co.uk/teletext/documents/ttiformat.pdf


# TODO
Getting started examples
tti2json script
