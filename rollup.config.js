// SPDX-FileCopyrightText: © 2021 Tech and Software Ltd.
// SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-uk.ltd.TechAndSoftware-1.0

import resolve from '@rollup/plugin-node-resolve';
import browsersync from 'rollup-plugin-browsersync';

export default {
  input: {
    "teletext-service": 'src/ServiceView.js'
  },
  output: {
    entryFileNames: '[name].js',
    dir: 'dist',
    format: 'es',
  },
  plugins: [
    resolve(),
    browsersync({
      server: '.',
      startPath: "./public/viewer.html"
    }),
  ]
};
