#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');
const codeceptConfig = require(path.join(repoRoot, 'e2e/config.js'));
const dependentApiList = require('./dependent-api-features');
const dependentUiList = require('./dependent-ui-features');

const dependentApiFiles = new Set(
  dependentApiList.map(p => p.replace(/\\/g, '/'))
);
const dependentUiFiles = new Set(
  dependentUiList.map(p => p.replace(/\\/g, '/'))
);

const pipelineTagMap = {
  '@master-e2e-ft': ['civil-ccd-definition: master'],
  '@non-prod-e2e-ft': ['civil-ccd-definition: PR'],
  '@e2e-nightly-prod': ['civil-ccd-definition: nightly'],
  '@api-prod': ['civil-service: master', 'civil-camunda-bpmn-definition: master'],
  '@api-nonprod': ['civil-service: PR', 'civil-camunda-bpmn-definition: PR'],
  '@api-nightly-prod': ['civil-service: nightly'],
  '@wa-task': [
    'civil-wa-task-configuration: master',
    'civil-wa-task-configuration: PR',
    'civil-wa-task-configuration: nightly'
  ]
};

const pipelineTagSet = new Set(Object.keys(pipelineTagMap));
const actorStepObjects = [
  'I',
  'LRspec',
  'WA',
  'api',
  'api_spec',
  'api_spec_fast',
  'api_spec_small',
  'api_spec_cui',
  'noc',
  'hearings',
  'bulks',
  'qmSteps'
];
const ignoredStepMethods = new Set([
  'getCaseId',
  'login',
  'setCaseId',
  'signOut',
  'amOnPage',
  'waitForText',
  'wait',
  'navigateToCaseDetails'
]);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return walk(fullPath);
    }
    return [fullPath];
  });
}

function toPosix(relativePath) {
  return relativePath.split(path.sep).join('/');
}

function fileIsDependent(filePath, suiteType) {
  const relative = toPosix(path.relative(repoRoot, filePath));
  if (suiteType === 'api') {
    return dependentApiFiles.has(relative);
  }
  return dependentUiFiles.has(relative);
}

function normaliseTag(token) {
  if (!token) {
    return null;
  }
  let trimmed = token.trim();
  if (!trimmed) {
    return null;
  }
  trimmed = trimmed.replace(/[;,]+$/, '');
  if (!trimmed.startsWith('@')) {
    if (trimmed.startsWith('e2e-') || trimmed.startsWith('api-') || pipelineTagSet.has(`@${trimmed}`)) {
      trimmed = `@${trimmed}`;
    }
  }
  return trimmed;
}

function splitTags(str) {
  if (!str || typeof str !== 'string') {
    return [];
  }
  return str
    .split(/[\s,]+/)
    .map(normaliseTag)
    .filter(Boolean);
}

function extractNameAndInlineTags(rawName) {
  if (typeof rawName !== 'string') {
    return { name: '', tags: [] };
  }
  const inlineTags = [];
  const cleaned = rawName.replace(/@[\w-]+/g, match => {
    inlineTags.push(match);
    return '';
  });
  return {
    name: cleaned.replace(/\s+/g, ' ').trim(),
    tags: inlineTags
  };
}

function extractHelperSteps(fn) {
  if (typeof fn !== 'function') {
    return [];
  }
  const source = fn.toString();
  const matches = new Set();
  const stepsRegex = /(\w+Steps)\.([A-Za-z0-9_]+)\s*\(/g;
  let match;
  while ((match = stepsRegex.exec(source))) {
    if (!ignoredStepMethods.has(match[2])) {
      matches.add(`${match[1]}.${match[2]}`);
    }
  }

  const actorRegex = new RegExp(`\\b(${actorStepObjects.join('|')})\\.([A-Za-z0-9_]+)\\s*\\(`, 'g');
  while ((match = actorRegex.exec(source))) {
    if (!ignoredStepMethods.has(match[2])) {
      matches.add(`${match[1]}.${match[2]}`);
    }
  }

  return Array.from(matches);
}

function createChain(target) {
  const chain = {};
  const passthrough = () => chain;
  chain.tag = tags => {
    splitTags(tags).forEach(tag => {
      if (!target.tagsSet.has(tag)) {
        target.tagsSet.add(tag);
        target.tags.push(tag);
      }
    });
    return chain;
  };
  chain.retry = passthrough;
  chain.retries = passthrough;
  chain.config = passthrough;
  chain.timeout = passthrough;
  chain.workers = passthrough;
  chain.meta = passthrough;
  chain.severity = passthrough;
  return chain;
}

function collectScenarios(filePath, suiteType) {
  const absolute = path.resolve(filePath);
  const relative = toPosix(path.relative(repoRoot, absolute));
  delete require.cache[require.resolve(absolute)];

  const scenarios = [];
  let currentFeature = null;

  const previousGlobals = {
    Feature: global.Feature,
    Scenario: global.Scenario,
    xScenario: global.xScenario,
    Before: global.Before,
    After: global.After,
    BeforeSuite: global.BeforeSuite,
    AfterSuite: global.AfterSuite,
    Data: global.Data,
    DataTable: global.DataTable,
    inject: global.inject,
    config: global.config,
    actor: global.actor
  };

  function restoreGlobals() {
    Object.entries(previousGlobals).forEach(([key, value]) => {
      if (value === undefined) {
        delete global[key];
      } else {
        global[key] = value;
      }
    });
  }

  function registerFeature(rawName, { skip = false } = {}) {
    const { name, tags } = extractNameAndInlineTags(rawName);
    const feature = {
      name: name || rawName,
      rawName,
      tags: [],
      tagsSet: new Set(),
      skip
    };
    tags.forEach(tag => {
      if (!feature.tagsSet.has(tag)) {
        feature.tagsSet.add(tag);
        feature.tags.push(tag);
      }
    });
    currentFeature = feature;
    return createChain(feature);
  }

  function scenarioFactory({ skip = false } = {}) {
    return function defineScenario(rawName, maybeOpts, maybeFn) {
      const { name, tags } = extractNameAndInlineTags(rawName);
      let fn = maybeFn;
      if (typeof maybeOpts === 'function') {
        fn = maybeOpts;
      }
      const scenario = {
        suiteType,
        filePath: relative,
        rawName,
        testName: name || rawName,
        featureName: currentFeature ? currentFeature.name : null,
        tags: [],
        tagsSet: new Set(currentFeature ? currentFeature.tags : []),
        collectedSteps: extractHelperSteps(fn),
        skipped: skip || Boolean(currentFeature && currentFeature.skip)
      };
      splitTags(tags.join(' ')).forEach(tag => scenario.tagsSet.add(tag));
      scenario.tags = Array.from(scenario.tagsSet);
      scenarios.push(scenario);
      return createChain(scenario);
    };
  }

  const Feature = rawName => registerFeature(rawName);
  Feature.only = rawName => registerFeature(rawName);
  Feature.skip = rawName => registerFeature(rawName, { skip: true });

  const Scenario = scenarioFactory();
  Scenario.only = scenarioFactory();
  Scenario.skip = scenarioFactory({ skip: true });

  function noop() {}
  const Data = () => ({
    Scenario,
    xScenario: Scenario
  });

  global.Feature = Feature;
  global.Scenario = Scenario;
  global.xScenario = Scenario;
  global.Before = noop;
  global.After = noop;
  global.BeforeSuite = noop;
  global.AfterSuite = noop;
  global.Data = Data;
  global.DataTable = () => ({ Scenario });
  global.inject = () => ({});
  global.config = codeceptConfig;
  global.actor = () => ({});

  try {
    require(absolute);
  } catch (error) {
    restoreGlobals();
    throw error;
  }
  restoreGlobals();
  delete require.cache[require.resolve(absolute)];

  return scenarios;
}

function isFunctionalTag(tag) {
  if (!tag) {
    return false;
  }
  if (pipelineTagSet.has(tag)) {
    return false;
  }
  return tag.startsWith('@e2e-') || tag.startsWith('@api-');
}

function deriveTagMetadata(tags) {
  const pipelineTags = [];
  const pipelines = new Set();
  const functionalTags = [];
  const functionalGroups = [];

  tags.forEach(tag => {
    if (pipelineTagMap[tag]) {
      pipelineTags.push(tag);
      pipelineTagMap[tag].forEach(p => pipelines.add(p));
    } else if (isFunctionalTag(tag)) {
      functionalTags.push(tag);
      const rawGroup = tag.replace(/^@(e2e|api)-/, '');
      if (rawGroup) {
        functionalGroups.push(`pr_ft_${rawGroup}`);
      }
    }
  });

  return {
    tags,
    pipelineTags,
    pipelines: Array.from(pipelines),
    functionalTestGroupTags: functionalTags,
    functionalTestGroups: functionalGroups
  };
}

function formatDependentFeature(scenarios) {
  if (!scenarios.length) {
    return null;
  }
  const tags = Array.from(new Set(scenarios.flatMap(s => s.tags)));
  const tagMeta = deriveTagMetadata(tags);
  const featureName = scenarios[0].featureName;
  const filePath = scenarios[0].filePath;
  const flattenedSteps = [];
  scenarios.forEach(scenario => {
    const steps = scenario.collectedSteps || [];
    steps.forEach(step => flattenedSteps.push(step));
  });

  return {
    testName: featureName || path.basename(filePath),
    featureName,
    filePath,
    independentScenario: false,
    ...tagMeta,
    steps: flattenedSteps,
    skipped: scenarios.every(s => s.skipped)
  };
}

function formatIndependentScenario(scenario) {
  const tags = Array.from(scenario.tagsSet || []);
  const tagMeta = deriveTagMetadata(tags);
  return {
    testName: scenario.testName,
    featureName: scenario.featureName,
    filePath: scenario.filePath,
    independentScenario: true,
    ...tagMeta,
    steps: scenario.collectedSteps,
    skipped: scenario.skipped || false
  };
}

function generateDocs({ suiteType, targetDir, outputFile }) {
  const absoluteDir = path.join(repoRoot, targetDir);
  const files = walk(absoluteDir).filter(file => file.endsWith('_test.js'));
  const results = [];

  files.forEach(file => {
    const scenarios = collectScenarios(file, suiteType);
    if (fileIsDependent(file, suiteType)) {
      const record = formatDependentFeature(scenarios);
      if (record) {
        results.push(record);
      }
    } else {
      scenarios.forEach(s => {
        const record = formatIndependentScenario(s);
        results.push(record);
      });
    }
  });

  results.sort((a, b) => {
    if (a.filePath !== b.filePath) {
      return a.filePath.localeCompare(b.filePath);
    }
    return a.testName.localeCompare(b.testName);
  });

  fs.writeFileSync(path.join(repoRoot, outputFile), JSON.stringify(results, null, 2));
  return results.length;
}

module.exports = {
  generateDocs
};
