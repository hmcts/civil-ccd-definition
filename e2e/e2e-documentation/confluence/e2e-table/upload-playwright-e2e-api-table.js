#!/usr/bin/env node

const path = require('path');
const { updateConfluencePage } = require('../support/update-page');
const { generateConfluenceTable } = require('./e2e-table-gen');

const jsonPathArg = process.argv[2];
const defaultPath = path.join(__dirname, '..', '..', 'results', 'playwright-e2e-data', 'playwright-e2e-api-data.json');
const jsonPath = jsonPathArg ? path.resolve(process.cwd(), jsonPathArg) : defaultPath;

updateConfluencePage({ jsonPath, targetHeadingText: 'Playwright API Tests', generateConfluenceTable });
