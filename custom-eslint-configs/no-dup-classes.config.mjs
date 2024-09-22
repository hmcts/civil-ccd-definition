import customEslintPlugin from 'custom-eslint-plugin';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['**/*.js', '**/*.cjs'],
  },
  {
    plugins: { customEslintPlugin },
    files: [
      'playwright-e2e/pages/**/*page.ts',
      'playwright-e2e/pages/**/*fragment.ts',
      'playwright-e2e/pages/**/*event.ts',
      'playwright-e2e/steps/**/*steps.ts',
      'playwright-e2e/base/base-page.ts',
      'playwright-e2e/base/base-requests.ts',
    ],
    rules: {
      'customEslintPlugin/no-duplicate-class-names': 'error',
    },
  },
  { languageOptions: { parser: tseslint.parser } },
];
