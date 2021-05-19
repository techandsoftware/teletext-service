The package represents a teletext service, and is a wrapper for [@techandsoftware/teletext](https://www.npmjs.com/package/@techandsoftware/teletext) and [@techandsoftware/teletext-caster](https://www.npmjs.com/package/@techandsoftware/teletext-caster).  It adds subpage and fastext navigation (colour buttons). By default, pages are fetched as JSON over HTTP, but that can be overriden by your own page fetcher.

# Using



# Service API

## new Service(options)

Creates a teletext service instance. `options` is required, and has the following properties:

* `DOMSelector` : string (required).  This is a selector string for the teletext screen container, e.g. `#teletextscreen`
* `defaultG0Charset` : string (optional). Sets the default G0 character set on the teletext instance. If not passed in, the default character set is `g0_latin`. See `setDefaultG0Charset()` in [@techandsoftware/teletext](https://www.npmjs.com/package/@techandsoftware/teletext) for the available values
* `caster` : object (optional). Pass in a `ttxcaster` from [@techandsoftware/teletext-caster](https://www.npmjs.com/package/@techandsoftware/teletext-caster) and this will be used to show pages on the connected Chromecast
* `header`: string (optional). The string to use as the header row. If not passed in, a default header row is used. See below for tokens that can be used in the header. TODO
* `fetcher`: object (optional). Pass in an object used to fetch teletext pages.  It not passed in, then pages are expected to be in JSON and retrieved from same directory of the web page containing the teletext instance.  See below for details. TODO

### `header` format

The `header` string is 32 characters and can contain the following tokens:

! foo !! bar !
---
| bing || bong |



### `fetcher` object details

## service.showPage(pageNumber)

Shows the page with the number. The page number must be three characters, from 100 to 8FF.

If using the default fetcher, this will get the magazine JSON appropriate to the page, and get the page data from that. The magazines are named `1.json` to `8.json`. For example, page 100 will cause `1.json` to be fetched and page 100 used from that. The first non-null subpage in the page data is displayed.

Response is a promise. When resolved, the value is:
* `null` - if the page couldn't be retrieved for any reason. This could be because the page number is invalid, or the magazine JSON couldn't be retrieved, or the page isn't in the JSON, or the page has no subpages
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

Shows the page with the link on the current page. The link is a string with the value `red`, `green`, `yellow`, `blue` or `index`. (The link refers to.. TODO)

Response is a promise, and is the same as for `showPage()`.

If the page doesn't have the link, the promise resolves to `null`.

## service.teletextInstance property

Returns the teletext instance object (an instance of `@techandsoftware/teletext`), so you can call methods on this directly, for example to change the font, draw pages or any other API calls. See https://www.npmjs.com/package/@techandsoftware/teletext

# Data source


# Credits

* The tokens used by the header were borrowed from vbit-pi - see 
