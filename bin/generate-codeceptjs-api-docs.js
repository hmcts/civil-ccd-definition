#!/usr/bin/env node

const path = require('path');
const { generateDocs } = require('./support/codeceptjs-doc-gen');

const count = generateDocs({
  suiteType: 'api',
  targetDir: 'e2e/tests/api_tests',
  outputFile: path.join('e2e', 'codeceptjs-api-tests.json')
});

console.log(`Wrote ${count} API scenarios to e2e/codeceptjs-api-tests.json`);
