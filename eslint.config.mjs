import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

/** @type {import('eslint').Linter[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    ignores: [
      "node_modules/",
      "dist/",
      "build/",
      "coverage/",
      "public/",
      "scripts/",
      ".next/",
    ],
  },
  {
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
    rules: {
      // Basic rules adapted from Google style
      curly: "error",
      eqeqeq: "error",
      "no-eval": "error",
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: ["error", 2],

      // Add Prettier-specific rules
      ...prettierConfig.rules,
      "prettier/prettier": "error", // Show Prettier issues as ESLint errors
    },
    plugins: {
      prettier: prettierPlugin,
    },
  },
];
