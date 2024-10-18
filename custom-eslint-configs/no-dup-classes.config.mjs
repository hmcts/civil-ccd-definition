import customEslintPlugin from 'custom-eslint-plugin';
import tseslint from 'typescript-eslint';

//When updating file glob patterns here, also update glob patterns in ./.husky/pre-commit.sh

export default [
  {
    ignores: ['**/*.js', '**/*.cjs'],
  },
  {
    plugins: { customEslintPlugin },
    files: [
      'playwright-e2e/pages/**/*.ts',
      'playwright-e2e/base/**/*.ts',
      'playwright-e2e/steps/**/*.ts',
      'playwright-e2e/requests/**/*.ts',
    ],
    rules: {
      'customEslintPlugin/no-duplicate-class-names': 'error',
    },
  },
  { languageOptions: { parser: tseslint.parser } },
];