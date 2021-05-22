// SPDX-FileCopyrightText: © 2021 Tech and Software Ltd.
// SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-uk.ltd.TechAndSoftware-1.0

import resolve from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

export default {
  input: {
    "teletext-service": 'src/ServiceView.js'
  },
  output: [
    {
      entryFileNames: '[name].min.js',
      dir: 'dist',
      format: 'es',
      sourcemap: true,
      sourcemapExcludeSources: true,
      compact: true,
      preferConst: true,
    }
  ],
  plugins: [
    terser({
      ecma: 2016,
      toplevel: true,
      compress: {
        drop_console: true,
        passes: 2,
        pure_getters: true,
        unsafe: true,
        unsafe_symbols: true,
        unsafe_arrows: true,
      },
      mangle: {
        properties: {
          regex: /^_.+|.+_$/, // ^_.+ for private methods, and .+_$ for internal methods
        },
      },
    }),
    resolve(),
  ]
};
