const fs = require('fs');

const COLUMN_ORDER = [
  { key: 'testName', label: 'Test Name' },
  { key: 'steps', label: 'Steps' },
  { key: 'tags', label: 'Tags' },
  { key: 'pipelines', label: 'Pipelines' },
  { key: 'functionalTestGroups', label: 'Functional Test Groups' },
  { key: 'featureName', label: 'Feature Name' },
  { key: 'filePath', label: 'File Path' },
  { key: 'skipped', label: 'Skipped' },
  { key: 'independentScenario', label: 'Independent Scenario' }
];

const DOUBLE_BREAK_FIELDS = new Set(['tags', 'pipelines', 'functionalTestGroups']);

function columnsFor(items) {
  const columns = [...COLUMN_ORDER];
  if (items.some(item => Object.prototype.hasOwnProperty.call(item, 'testFailed'))) {
    columns.splice(8, 0, { key: 'testFailed', label: 'Test Fail' });
  }
  return columns;
}

function safeValue(value, key) {
  if (value === null || value === undefined) {
    return '';
  }

  if (key === 'steps' && Array.isArray(value)) {
    if (!value.length) {
      return '';
    }
    return value.map((v, i) => `${i + 1}. ${safeValue(v)}`).join('<br/>');
  }

  if (Array.isArray(value)) {
    if (!value.length) {
      return '';
    }
    const separator = DOUBLE_BREAK_FIELDS.has(key) ? '<br/><br/>' : '<br/>';
    return value.map(v => safeValue(v)).join(separator);
  }

  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2).replace(/\n/g, '<br/>');
  }

  return String(value);
}

function generateMarkdownTable(jsonPath) {
  const items = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const columns = columnsFor(items);
  let markdown = '';
  markdown += `| ${columns.map(col => col.label).join(' | ')} |\n`;
  markdown += `| ${columns.map(() => '---').join(' | ')} |\n`;
  items.forEach(item => {
    const row = columns.map(({ key }) => safeValue(item[key], key));
    markdown += `| ${row.join(' | ')} |\n`;
  });
  return markdown.trim();
}

module.exports = { generateMarkdownTable };
