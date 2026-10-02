#!/usr/bin/env node

const path = require('path');
const { updateReadmeSection } = require('../support/update-readme');
const { generateMarkdownTable } = require('./e2e-table-gen');

const repoRoot = path.resolve(__dirname, '..', '..', '..', '..');
const defaultJsonPath = path.join(repoRoot, 'e2e/e2e-documentation/results/playwright-e2e-data/playwright-e2e-api-data.json');
const markers = {
  start: '<!-- PLAYWRIGHT_API_TESTS_TABLE_START -->',
  end: '<!-- PLAYWRIGHT_API_TESTS_TABLE_END -->'
};

const jsonArg = process.argv[2];

updateReadmeSection({
  jsonPath: jsonArg,
  defaultJsonPath,
  startMarker: markers.start,
  endMarker: markers.end,
  generateMarkdownTable
});

console.log('README.md updated with latest Playwright API test table');
