import customEslintPlugin from 'custom-eslint-plugin';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['**/*.js', '**/*.cjs'],
  },
  {
    plugins: { customEslintPlugin },
    files: [
      'playwright/pages/**/*page.ts',
      'playwright/pages/**/*fragment.ts',
      'playwright/pages/**/*event.ts',
      'playwright/steps/**/*steps.ts',
      'playwright/base/base-page.ts',
      'playwright/base/base-requests.ts',
    ],
    rules: {
      'customEslintPlugin/no-duplicate-class-names': 'error',
    },
  },
  { languageOptions: { parser: tseslint.parser } },
];
