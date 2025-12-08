#!/usr/bin/env node

const path = require('path');
const { updateConfluencePage } = require('./support/updatePage');

const jsonPathArg = process.argv[2];
const defaultPath = path.join(__dirname, '../results/codeceptjs-api-tests.json');
const jsonPath = jsonPathArg ? path.resolve(process.cwd(), jsonPathArg) : defaultPath;

updateConfluencePage({ jsonPath, targetHeadingText: 'API Tests' });
