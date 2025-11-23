// SPDX-FileCopyrightText: © 2025 Rob Hardy
// SPDX-License-Identifier: AGPL-3.0-only

import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

const BANNER = `/*! @techandsoftware/teletext-service
    SPDX${''}-FileCopyrightText: (c) ${new Date().getUTCFullYear()} Rob Hardy
    SPDX${''}-License-Identifier: AGPL-3.0-only */`;

export default defineConfig({
  build: {
    sourcemap: true,
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'lib/ModuleExports.js'),
      name: '@techandsoftware/teletext-service',
      fileName: 'teletext-service',
      formats: ['es']
    },
    rollupOptions: {
      output: {
        banner: BANNER, /* not working https://github.com/vitejs/vite/issues/21076 */
      }
    }
  }
});
