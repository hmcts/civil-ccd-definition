#!/usr/bin/env node

const { generateDocs } = require('./playwright-e2e-data-gen');

const outputFile = 'e2e/e2e-documentation/results/playwright-e2e-data/playwright-e2e-api-data.json';

const count = generateDocs({
  suiteType: 'api',
  targetDir: 'playwright-e2e/tests/api-tests',
  outputFile: outputFile
});

console.log(`Wrote ${count} Playwright API tests to ${outputFile}`);
