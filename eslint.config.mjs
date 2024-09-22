import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginCodecept from 'eslint-plugin-codeceptjs';
import customEslintPlugin from 'custom-eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: [
      'steps.d.ts',
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
      'plugins/*',
      'coverage',
      '**/*.min.js',
    ],
  },
  ...[...tseslint.configs.recommended].map((config) => ({
    ...config,
    files: ['playwright-e2e/**/*.ts'],
  })),
  {
    files: ['e2e/**/*.{js,mjs,cjs}'],
    languageOptions: {
      sourceType: 'commonjs',
      ecmaVersion: 11,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
        ...globals.mocha,
        ...globals.jest,
        ...eslintPluginCodecept.environments.codeceptjs.globals,
        'codeceptjs/codeceptjs': 'readonly',
      },
    },
    plugins: { eslintPluginCodecept },
    rules: {
      'no-unused-vars': 'off',
      'quotes': ['error', 'single'],
      'semi': ['error', 'always']
    },
  },
  {
    files: ['playwright-e2e/**/*.{ts,tsx}'],
    plugins: { customEslintPlugin },
    rules: {
      ...pluginJs.configs.recommended.rules,
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
      ...eslintConfigPrettier.rules,
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
  { languageOptions: { globals: globals.node } },
];
