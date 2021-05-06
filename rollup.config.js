// SPDX-FileCopyrightText: © 2021 Tech and Software Ltd.
// SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-uk.ltd.TechAndSoftware-1.0

import resolve from '@rollup/plugin-node-resolve';
import browsersync from 'rollup-plugin-browsersync';

export default {
  input: {
    Viewer: 'src/Viewer.js',
  },
  output: {
    entryFileNames: '[name].js',
    dir: 'public/dist',
    format: 'es',
    sourcemap: true,
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  plugins: [
    resolve(),
    browsersync({
      server: 'public'
    }),
  ],
};
