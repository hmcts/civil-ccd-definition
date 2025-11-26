#!/usr/bin/env node

const path = require('path');
const { generateDocs } = require('./support/codeceptjs-doc-gen');

const count = generateDocs({
  suiteType: 'ui',
  targetDir: 'e2e/tests/ui_tests',
  outputFile: path.join('e2e', 'codeceptjs-ui-tests.json')
});

console.log(`Wrote ${count} UI scenarios to e2e/codeceptjs-ui-tests.json`);
