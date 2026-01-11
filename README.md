<!-- SPDX-FileCopyrightText: © 2026 Rob Hardy
     SPDX-License-Identifier: AGPL-3.0-only -->

The package represents a teletext service, and is a wrapper for [@techandsoftware/teletext](https://www.npmjs.com/package/@techandsoftware/teletext). The package provides an HTML-based UI to view the service in a browser, and two classes. The package adds page numbers, subpage and fastext navigation (colour buttons). By default, pages are fetched as JSON over HTTP, but that can be overriden by your own page fetcher.

The package supports casting pages to Chromecast using [@techandsoftware/teletext-caster](https://www.npmjs.com/package/@techandsoftware/teletext-caster), and higher-resolution mosaic graphics using a pixel-art scaling algorithm via [@techandsoftware/teletext-plugin-smooth-mosaic](https://www.npmjs.com/package/@techandsoftware/teletext-plugin-smooth-mosaic).

# Live demo

* [Default user interface](https://teletext-for-javascript-docs.robdev.org.uk/modules/teletext-service-demo)
* [Full teletext service: Geefax](https://teletext-for-javascript-docs.robdev.org.uk/modules/teletext-service-demo-full-service)

# Documentation

See the [teletext-service module docs](https://teletext-for-javascript-docs.robdev.org.uk/modules/teletext-service)

# Credits

* Engineering test page in the example 1.json from Ceefax via https://www.teletextarchive.com/
