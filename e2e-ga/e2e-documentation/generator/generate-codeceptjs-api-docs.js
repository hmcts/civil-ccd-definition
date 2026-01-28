#!/usr/bin/env node

const path = require('path');
const { generateDocs } = require('./support/codeceptjs-doc-gen');

const outputPath = path.join('e2e/e2e-documentation/results', 'codeceptjs-api-tests.json');

const count = generateDocs({
  suiteType: 'api',
  targetDir: 'e2e/tests/api_tests',
  outputFile: outputPath
});

console.log(`Wrote ${count} API scenarios to ${outputPath}`);
