// SPDX-FileCopyrightText: © 2025 Rob Hardy.
// SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-uk.ltd.TechAndSoftware-1.0

import resolve from '@rollup/plugin-node-resolve';
import terser from "@rollup/plugin-terser";

const PREAMBLE = `// SPDX${''}-FileCopyrightText: (c) 2025 Rob Hardy
// SPDX${''}-FileCopyrightText: (c) 2017 dosaygo
// SPDX${''}-License-Identifier: AGPL-3.0-only OR LicenseRef-uk.ltd.TechAndSoftware-1.0`;

export default {
  input: {
    "teletext-service": 'src/ModuleExports.js'
  },
  output: [
    {
      entryFileNames: '[name].min.js',
      dir: 'public/dist',
      format: 'es',
      sourcemap: true,
      compact: true,
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
      format: {
        preamble: PREAMBLE
      }
    }),
    resolve(),
  ]
};
