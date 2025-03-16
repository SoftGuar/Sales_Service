import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ["node_modules/"], 
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "indent": ["error", 2],
      "max-len": ["error", { code: 120 }],
    },
  },
];
