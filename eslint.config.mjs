// eslint.config.mjs
import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    ignores: ["**/*.test.js", "vite.config.js"],
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
  },
  { languageOptions: { globals: globals.node } },
  // build-entry.js s'exécute dans le navigateur (Vite)
  {
    files: ["**/build-entry.js"],
    languageOptions: { globals: { ...globals.browser } },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-console": "error",
    },
  },
];
