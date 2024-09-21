import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintPluginCodecept from 'eslint-plugin-codeceptjs'
import customEslintPlugin from 'custom-eslint-plugin';

export default [
  {
    ignores: [
      'node_modules/*',
      'govuk/*',
      'public/*',
      'app/assets/javascripts/*.js',
      'allure-report/*',
      'allure-results/*',
      'allure-bootstrap-report/*',
      'allure-bootstrap-results/*',
      'allure-functional-report/*',
      'allure-functional-results/*',
      'coverage',
      '*.min.js',
      '**/*.js',
      '**/*.cjs',
    ],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["e2e/**/*.{js,mjs,cjs}"],  
    languageOptions: {sourceType: "commonjs"},
    plugins: {eslintPluginCodecept},
    env: {
      browser: true,
      commonjs: true,
      es2020: true,
      'codeceptjs/codeceptjs': true,
      node: true,
      mocha: true,
      jest: true,
    },
    parserOptions: {
      ecmaVersion: 11,
    },
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
    },
  },
  {
    files: ['playwright-e2e/**/*{.ts,.tsx}'],
    plugins: { customEslintPlugin },
    rules: {
      indent: ['error', 2, { SwitchCase: 1 }],
      'linebreak-style': ['error', 'unix'],
      'comma-dangle': ['error', 'always-multiline'],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      '@typescript-eslint/no-var-requires': 0,
      'no-empty-pattern': 0,
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'warn',
    },
  },
  {
    files: [
      'playwright/pages/**/*page.ts',
      'playwright/pages/**/*fragment.ts',
      'playwright/pages/**/*event.ts',
      'playwright/steps/**/*steps.ts',
      'playwright/base/base-page.ts',
      'playwright/base/base-requests.ts',
    ],
    rules: {
      'customEslintPlugin/prefer-step-decorator': 'warn',
    },
  },
  {languageOptions: { globals: globals.node }},
  eslintPluginPrettierRecommended
  
];