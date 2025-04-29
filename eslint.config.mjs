import eslintPluginNext from "@next/eslint-plugin-next";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import * as airbnbBestPracticesConfig from "eslint-config-airbnb-base/rules/best-practices";
import * as airbnbErrorsConfig from "eslint-config-airbnb-base/rules/errors";
import * as airbnbES6Config from "eslint-config-airbnb-base/rules/es6";
import * as airbnbNodeConfig from "eslint-config-airbnb-base/rules/node";
import * as airbnbStyleConfig from "eslint-config-airbnb-base/rules/style";
import * as airbnbVariablesConfig from "eslint-config-airbnb-base/rules/variables";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";

const MAX_COMPLEXITY = 20;
const MAX_LEN = 150;
const MAX_LINES = 300;
const MAX_LINES_PER_FUNCTION = 120;
const MAX_STATEMENTS = 15;
const CHAIN_CALL_DEPTH = 4;

export default [
  {
    ignores: ["node_modules/"],
  },
  {
    files: ["**/*.{mjs,ts,tsx}"],
    plugins: {
      "@typescript-eslint": typescriptEslint,
      next: eslintPluginNext,
    },
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.jest },
      parser: tsParser,
      ecmaVersion: 6,
      sourceType: "module",
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    rules: {
      ...airbnbBestPracticesConfig.default.rules,
      ...airbnbErrorsConfig.default.rules,
      ...airbnbES6Config.default.rules,
      ...airbnbNodeConfig.default.rules,
      ...airbnbStyleConfig.default.rules,
      ...airbnbVariablesConfig.default.rules,
      ...eslintConfigPrettier.rules,
      "arrow-body-style": ["error", "as-needed"],

      complexity: ["error", MAX_COMPLEXITY],
      "consistent-return": "error",
      eqeqeq: ["error", "always"],
      "max-len": ["error", { code: MAX_LEN }],
      "max-lines": [
        "error",
        { max: MAX_LINES, skipBlankLines: true, skipComments: true },
      ],
      "max-lines-per-function": [
        "error",
        {
          max: MAX_LINES_PER_FUNCTION,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      "max-statements": ["error", MAX_STATEMENTS],
      "newline-per-chained-call": [
        "error",
        { ignoreChainWithDepth: CHAIN_CALL_DEPTH },
      ],
      "no-console": "warn",
      "no-debugger": "error",
      "no-eval": "error",
      "@typescript-eslint/no-explicit-any": "warn", // DMS:  we can use this rule after fixing all the current violations
      "no-implicit-coercion": "error",
      "no-magic-numbers": "off",
      "@typescript-eslint/no-magic-numbers": ["error", { ignore: [-1, 0, 1] }],
      "no-plusplus": "error",
      "no-return-await": "error",
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "error",
      "no-underscore-dangle": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": [
        "error",
        { functions: false, classes: true },
      ],
      "no-var": "error",
      "object-curly-newline": "off",
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
      ],
    },
  },
];
