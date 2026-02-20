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
      'playwright-allure-bootstrap-report/*',
      'playwright-allure-bootstrap-results/*',
      'playwright-allure-functional-report/*',
      'playwright-allure-functional-results/*',
      'plugins/*',
      'coverage',
      '**/*.min.js',
      '**/*.{mjs,cjs}',
    ],
  },
  ...[...tseslint.configs.recommended].map((config) => ({
    ...config,
    files: ['playwright-e2e/**/*.ts'],
  })),
  pluginJs.configs.recommended,
  {
    files: ['e2e/**/*.{js,jsx}'],
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
      },
    },
    rules: {
      'no-unused-vars': 'off',
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'no-constant-binary-expression': 'off',
      'no-prototype-builtins': 'off',
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
      '@typescript-eslint/no-unused-expressions': ['warn', { allowShortCircuit: true, allowTernary: true }],
      ...eslintConfigPrettier.rules,
    },
  },
  {
    files: [
      'playwright-e2e/pages/**/*page.ts',
      'playwright-e2e/pages/**/*fragment.ts',
      'playwright-e2e/steps/**/*steps.ts',
      'playwright-e2e/data-builders/**/*data-builder.ts',
      'playwright-e2e/data-builders/**/*actions.ts',
      'playwright-e2e/base/base-page.ts',
      'playwright-e2e/base/base-requests.ts',
      'playwright-e2e/base/base-api.ts',
      'playwright-e2e/base/base-exui.ts',
    ],
    rules: {
      'customEslintPlugin/prefer-step-decorator': 'warn',
    },
  },
  { languageOptions: { globals: globals.node } },
];
