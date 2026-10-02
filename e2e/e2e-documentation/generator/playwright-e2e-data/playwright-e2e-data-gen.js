#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {
  repoRoot,
  playwrightPipelineTagMap,
  walk,
  extractHelperStepsFromSource,
  isFunctionalTag
} = require('../support/data-gen-utils');

function boolToYesNo(value) {
  return value ? 'yes' : 'no';
}

function formatDisplayPath(posixPath) {
  return posixPath.split('/').join(' -> ');
}

function deriveTagMetadata(tags) {
  const pipelines = new Set();
  const functionalTags = [];
  const functionalGroups = new Set();

  tags.forEach(tag => {
    if (playwrightPipelineTagMap[tag]) {
      playwrightPipelineTagMap[tag].forEach(p => pipelines.add(p));
    } else if (isFunctionalTag(tag)) {
      functionalTags.push(tag);
      const match = /^@(ui|api)-(.+)$/.exec(tag);
      if (match) {
        const [, tagType, rawGroup] = match;
        const labelPrefix = tagType === 'ui' ? 'pr_ft_ui-' : 'pr_ft_api-';
        functionalGroups.add(`${labelPrefix}${rawGroup}`);
      }
    }
  });

  return {
    tags,
    pipelines: Array.from(pipelines),
    functionalTestGroupTags: functionalTags,
    functionalTestGroups: Array.from(functionalGroups)
  };
}

function formatIndependentScenario(scenario) {
  const tags = Array.from(scenario.tagsSet || []);
  const tagMeta = deriveTagMetadata(tags);
  const steps = scenario.collectedSteps || [];
  const decoratedSteps = steps.map(step => {
    if (!scenario.skipped) {
      return step;
    }
    return step.endsWith(' (skipped)') ? step : `${step} (skipped)`;
  });
  return {
    testName: scenario.testName,
    featureName: scenario.featureName,
    filePath: formatDisplayPath(scenario.filePath),
    independentScenario: boolToYesNo(true),
    ...tagMeta,
    steps: decoratedSteps,
    skipped: boolToYesNo(Boolean(scenario.skipped)),
    testFailed: boolToYesNo(Boolean(scenario.testFailed))
  };
}

function findClosingBracket(source, openIndex) {
  const pairs = { '(': ')', '[': ']', '{': '}' };
  const stack = [source[openIndex]];
  let quote = null;
  let escaped = false;

  for (let index = openIndex + 1; index < source.length; index++) {
    const char = source[index];
    const next = source[index + 1];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }
    if (char === '/' && next === '/') {
      index = source.indexOf('\n', index + 2);
      if (index === -1) {
        return -1;
      }
      continue;
    }
    if (char === '/' && next === '*') {
      index = source.indexOf('*/', index + 2);
      if (index === -1) {
        return -1;
      }
      index++;
      continue;
    }
    if (char === '\'' || char === '"' || char === '`') {
      quote = char;
    } else if (pairs[char]) {
      stack.push(char);
    } else if (Object.values(pairs).includes(char)) {
      if (char !== pairs[stack.pop()]) {
        return -1;
      }
      if (!stack.length) {
        return index;
      }
    }
  }
  return -1;
}

function splitArguments(source) {
  const argumentsList = [];
  let start = 0;
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let index = 0; index < source.length; index++) {
    const char = source[index];
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
    } else if (char === '\'' || char === '"' || char === '`') {
      quote = char;
    } else if ('([{'.includes(char)) {
      depth++;
    } else if (')]}'.includes(char)) {
      depth--;
    } else if (char === ',' && depth === 0) {
      argumentsList.push(source.slice(start, index).trim());
      start = index + 1;
    }
  }
  const finalArgument = source.slice(start).trim();
  if (finalArgument) {
    argumentsList.push(finalArgument);
  }
  return argumentsList;
}

function stringValue(value) {
  const match = /^(['"`])([\s\S]*)\1$/.exec(value.trim());
  return match ? match[2] : '';
}

function tagsFromOptions(options) {
  const tagMatch = /\btag\s*:\s*(\[[\s\S]*?\]|['"][^'"]*['"])/.exec(options || '');
  return tagMatch ? [...tagMatch[1].matchAll(/['"](@[\w-]+)['"]/g)].map(match => match[1]) : [];
}

function functionBody(source) {
  const arrowIndex = source.indexOf('=>');
  if (arrowIndex === -1) {
    return source;
  }
  const openIndex = source.indexOf('{', arrowIndex);
  if (openIndex === -1) {
    return source;
  }
  const closeIndex = findClosingBracket(source, openIndex);
  return closeIndex === -1 ? source : source.slice(openIndex + 1, closeIndex);
}

function collectScenarios(filePath, suiteType) {
  const absolute = path.resolve(filePath);
  const filePathRelative = path.relative(repoRoot, absolute).split(path.sep).join('/');
  const source = fs.readFileSync(absolute, 'utf8');
  const scenarios = [];
  const describes = [];
  const callRegex = /\btest(?:\.(describe|skip|only|fail))?\s*\(/g;
  let match;

  while ((match = callRegex.exec(source))) {
    const openIndex = source.indexOf('(', match.index);
    const closeIndex = findClosingBracket(source, openIndex);
    if (closeIndex === -1) {
      continue;
    }
    const args = splitArguments(source.slice(openIndex + 1, closeIndex));
    const callType = match[1];

    if (callType === 'describe') {
      describes.push({
        start: match.index,
        end: closeIndex,
        name: stringValue(args[0]),
        tags: tagsFromOptions(args[1]),
        skipped: false
      });
    } else if (!callType || callType === 'skip' || callType === 'only' || callType === 'fail') {
      const testName = stringValue(args[0]);
      if (!testName) {
        continue;
      }
      const parentDescribe = describes
        .filter(describe => describe.start < match.index && describe.end > closeIndex)
        .sort((a, b) => b.start - a.start)[0];
      const testOptions = args.length > 2 ? args[1] : '';
      const testBody = args[args.length - 1];
      scenarios.push({
        suiteType,
        filePath: filePathRelative,
        testName,
        featureName: parentDescribe ? parentDescribe.name : null,
        tagsSet: new Set([
          ...(parentDescribe ? parentDescribe.tags : []),
          ...tagsFromOptions(testOptions)
        ]),
        collectedSteps: extractHelperStepsFromSource(functionBody(testBody)),
        skipped: callType === 'skip' || Boolean(parentDescribe && parentDescribe.skipped),
        testFailed: callType === 'fail' || /\btest\.fail\s*\(/.test(functionBody(testBody))
      });
    }
  }
  return scenarios;
}

function generateDocs({ suiteType, targetDir, outputFile }) {
  const absoluteDir = path.join(repoRoot, targetDir);
  const files = walk(absoluteDir).filter(file => /(?:_tests?|\.test)\.ts$/i.test(file));
  const results = [];

  files.forEach(file => {
    collectScenarios(file, suiteType).forEach(scenario => {
      results.push(formatIndependentScenario(scenario));
    });
  });

  results.sort((a, b) => {
    if (a.filePath !== b.filePath) {
      return a.filePath.localeCompare(b.filePath);
    }
    return a.testName.localeCompare(b.testName);
  });

  const outputPath = path.join(repoRoot, outputFile);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  return results.length;
}

module.exports = {
  generateDocs
};
