// SPDX-FileCopyrightText: © 2025 Rob Hardy.
// SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-uk.ltd.TechAndSoftware-1.0

import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["{src,scripts}/*.js"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["src/*.js"], languageOptions: { globals: globals.browser } },
  { files: ["scripts/*.js"], languageOptions: { globals: globals.node } },
]);
