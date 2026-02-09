#!/usr/bin/env node

const path = require('path');
const { updateConfluencePage } = require('../support/update-page');
const { generateConfluenceTable } = require('./ft-group-table-gen');

const jsonPathArg = process.argv[2];
const defaultPath = path.join(__dirname, '../results/functional-test-groups-ui.json');
const jsonPath = jsonPathArg ? path.resolve(process.cwd(), jsonPathArg) : defaultPath;

updateConfluencePage({ jsonPath, targetHeadingText: 'UI Functional Test Groups', generateConfluenceTable });
