const fs = require('fs');

const TABLE_HEADERS = ['Test', 'Steps', 'Details'];
const DETAIL_FIELDS = [
  { key: 'tags', label: 'Tags' },
  { key: 'pipelines', label: 'Pipelines' },
  { key: 'functionalTestGroups', label: 'Functional Test Groups' },
  { key: 'featureName', label: 'Feature' },
  { key: 'filePath', label: 'File' },
  { key: 'skipped', label: 'Skipped' },
  { key: 'independentScenario', label: 'Independent Scenario' }
];

const DOUBLE_BREAK_FIELDS = new Set(['tags', 'pipelines', 'functionalTestGroups']);

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

function formatDetails(item) {
  const segments = DETAIL_FIELDS.map(({ key, label }) => {
    const value = safeValue(item[key], key);
    if (!value) {
      return null;
    }
    return `<strong>${label}:</strong> ${value}`;
  }).filter(Boolean);

  return segments.join('<br/><br/>');
}

function generateMarkdownTable(jsonPath) {
  const items = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  let markdown = '';
  markdown += `| ${TABLE_HEADERS.join(' | ')} |\n`;
  markdown += `| ${TABLE_HEADERS.map(() => '---').join(' | ')} |\n`;
  items.forEach(item => {
    const testName = safeValue(item.testName, 'testName');
    const steps = safeValue(item.steps, 'steps');
    const details = formatDetails(item);
    markdown += `| ${testName} | ${steps} | ${details} |\n`;
  });
  return markdown.trim();
}

module.exports = { generateMarkdownTable };
