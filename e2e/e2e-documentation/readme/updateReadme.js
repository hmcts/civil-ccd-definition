#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { generateMarkdownTable } = require('./generateMarkdownTable');

const repoRoot = path.resolve(__dirname, '..', '..', '..');
const README_PATH = path.join(repoRoot, 'README.md');

const markers = {
  uiStart: '<!-- UI_TESTS_TABLE_START -->',
  uiEnd: '<!-- UI_TESTS_TABLE_END -->',
  apiStart: '<!-- API_TESTS_TABLE_START -->',
  apiEnd: '<!-- API_TESTS_TABLE_END -->'
};

function replaceSection(content, startMarker, endMarker, replacement) {
  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker);
  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    throw new Error(`Markers ${startMarker} / ${endMarker} not found in README.md`);
  }
  const before = content.slice(0, startIndex + startMarker.length);
  const after = content.slice(endIndex);
  return `${before}\n\n${replacement}\n\n${after}`;
}

function main() {
  const uiJson = process.argv[2] || path.join(repoRoot, 'e2e/e2e-documentation/results/codeceptjs-ui-tests.json');
  const apiJson = process.argv[3] || path.join(repoRoot, 'e2e/e2e-documentation/results/codeceptjs-api-tests.json');

  const uiTable = generateMarkdownTable(uiJson);
  const apiTable = generateMarkdownTable(apiJson);

  let readme = fs.readFileSync(README_PATH, 'utf8');
  readme = replaceSection(readme, markers.uiStart, markers.uiEnd, uiTable);
  readme = replaceSection(readme, markers.apiStart, markers.apiEnd, apiTable);

  fs.writeFileSync(README_PATH, readme);
  console.log('README.md updated with latest UI/API test tables');
}

main();
