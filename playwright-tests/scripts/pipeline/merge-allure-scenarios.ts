// Merges the Allure results of each scenario's journey steps into one Allure test per scenario, so the pipeline's Allure
// report counts scenarios, not journey steps:
//
//   npx ts-node --transpile-only playwright-tests/scripts/pipeline/merge-allure-scenarios.ts [results folder]
//
// (default folder playwright-allure-journeys-results). run-journeys.sh runs it after the journeys and before the report
// is generated. The runner and the Playwright report are not changed: each journey step is still its own Playwright test.
//
// allure-playwright writes one <uuid>-result.json per Playwright test, labelled with its titlePath
// (" > <project> > <file> > <scenario> > test<N>[ > <step>]"). Each scenario's results become one result:
//  - its name is the scenario (e.g. SPEC_1v1_SMALL) and its steps are the journey steps in order ("test3 › <title>"),
//    each with its own status, timings, steps and attachments (screenshots, videos, traces, logs)
//  - its status is the worst of its steps: failed, then broken, then passed; skipped only if every step was skipped
//    (steps a stop setting leaves out show as skipped steps of a passed scenario)
//  - its history ID is fixed by the project, file and scenario, so Allure's history and trends follow the scenario
// A step Playwright retried keeps only its last attempt. Setup and teardown (preflight, the sign-ins and the case
// unassignment) become one "Setup and teardown" test with each as a step. Containers are pointed at the merged results.
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

interface AllureResult {
  uuid: string;
  historyId?: string;
  testCaseId?: string;
  name: string;
  fullName?: string;
  status?: string;
  statusDetails?: Record<string, unknown>;
  stage?: string;
  start?: number;
  stop?: number;
  steps?: unknown[];
  attachments?: unknown[];
  parameters?: unknown[];
  labels?: Array<{ name: string; value: string }>;
  links?: unknown[];
}

const folder = path.resolve(process.argv[2] ?? 'playwright-allure-journeys-results');
// The Playwright projects that run before and after the journeys (playwright.config.ts)
const setupProjects = ['preflight', 'authentication', 'case-unassignment'];
const setupTestName = 'Setup and teardown';
const statusOrder = ['failed', 'broken', 'passed', 'skipped', 'unknown'];

const label = (result: AllureResult, name: string) => result.labels?.find((l) => l.name === name)?.value;
// " > chromium > ../../playwright-tests/e2e/journeys/SpecifiedSS.test.ts > SPEC_1v1_SMALL > test3" → its parts
const titleParts = (result: AllureResult) => (label(result, 'titlePath') ?? '').split(' > ').map((p) => p.trim()).filter(Boolean);
const testNumber = (parts: string[]) => Number(parts.find((p) => /^test\d+$/.test(p))?.slice(4) ?? Number.MAX_SAFE_INTEGER);
const hash = (text: string) => crypto.createHash('md5').update(text).digest('hex');

if (!fs.existsSync(folder)) {
  console.log(`merge-allure-scenarios: no ${folder}, nothing to merge`);
  process.exit(0);
}

const resultFiles = fs.readdirSync(folder).filter((f) => f.endsWith('-result.json'));
const byScenario = new Map<string, Array<{ file: string; result: AllureResult; parts: string[] }>>();
for (const file of resultFiles) {
  const result: AllureResult = JSON.parse(fs.readFileSync(path.join(folder, file), 'utf8'));
  const parts = titleParts(result);
  let key: string;
  if (parts.length >= 4 && parts.slice(3).some((p) => /^test\d+$/.test(p))) {
    // A journey step: project, file, scenario, then a testN
    key = parts.slice(0, 3).join(' > ');
  } else if (setupProjects.includes(parts[0])) {
    // Preflight, the sign-ins and the case unassignment: one "Setup and teardown" test, each as a step
    key = `setup > setup > ${setupTestName}`;
  } else {
    continue;
  }
  byScenario.set(key, [...(byScenario.get(key) ?? []), { file, result, parts }]);
}

const replacedBy = new Map<string, string>();
for (const [key, entries] of byScenario) {
  const [project, testFile, scenario] = key.split(' > ');
  // The last attempt of each step (Playwright retries write one result per attempt)
  const latest = new Map<string, { result: AllureResult; parts: string[] }>();
  for (const entry of entries) {
    const stepKey = `${entry.parts.slice(3).join(' > ')} > ${entry.result.name}`;
    const current = latest.get(stepKey);
    if (!current || (entry.result.stop ?? 0) >= (current.result.stop ?? 0)) {
      latest.set(stepKey, entry);
    }
  }
  const steps = [...latest.values()].sort((a, b) => testNumber(a.parts) - testNumber(b.parts) || (a.result.start ?? 0) - (b.result.start ?? 0));
  const statuses = steps.map(({ result }) => result.status ?? 'unknown');
  const status = statuses.every((s) => s === 'skipped')
    ? 'skipped'
    : statusOrder.find((s) => s !== 'skipped' && statuses.includes(s)) ?? 'unknown';
  const firstProblem = steps.find(({ result }) => result.status === 'failed' || result.status === 'broken')?.result;
  const starts = steps.map(({ result }) => result.start).filter((t): t is number => typeof t === 'number');
  const stops = steps.map(({ result }) => result.stop).filter((t): t is number => typeof t === 'number');
  const first = steps[0].result;
  const fullName = `${path.basename(testFile)}#${scenario}`;
  const tags = [...new Map(steps.flatMap(({ result }) => (result.labels ?? []).filter((l) => l.name === 'tag')).map((l) => [l.value, l])).values()];
  const merged: AllureResult = {
    uuid: crypto.randomUUID(),
    historyId: hash(`${project}|${fullName}`),
    testCaseId: hash(fullName),
    name: scenario,
    fullName,
    status,
    statusDetails: firstProblem?.statusDetails ?? {},
    stage: 'finished',
    start: starts.length ? Math.min(...starts) : undefined,
    stop: stops.length ? Math.max(...stops) : undefined,
    parameters: first.parameters ?? [],
    links: [],
    attachments: [],
    labels: [
      ...(first.labels ?? []).filter((l) => ['language', 'framework', 'host', 'thread'].includes(l.name)),
      { name: 'titlePath', value: ` > ${key}` },
      { name: 'parentSuite', value: project },
      { name: 'suite', value: path.basename(testFile) },
      ...tags,
    ],
    steps: steps.map(({ result, parts }) => ({
      name: parts.length > 3 ? `${parts.slice(3).join(' › ')} › ${result.name}` : result.name,
      status: result.status ?? 'unknown',
      statusDetails: result.statusDetails ?? {},
      stage: 'finished',
      start: result.start,
      stop: result.stop,
      steps: result.steps ?? [],
      attachments: result.attachments ?? [],
      parameters: [],
    })),
  };
  fs.writeFileSync(path.join(folder, `${merged.uuid}-result.json`), JSON.stringify(merged));
  for (const entry of entries) {
    replacedBy.set(entry.result.uuid, merged.uuid);
    fs.unlinkSync(path.join(folder, entry.file));
  }
  console.log(`merge-allure-scenarios: ${scenario} — ${steps.length} steps merged, ${status}`);
}

// Containers list the results they hold; point them at the merged results
for (const file of fs.readdirSync(folder).filter((f) => f.endsWith('-container.json'))) {
  const containerPath = path.join(folder, file);
  const container = JSON.parse(fs.readFileSync(containerPath, 'utf8'));
  if (!Array.isArray(container.children)) {
    continue;
  }
  const children = [...new Set(container.children.map((child: string) => replacedBy.get(child) ?? child))];
  if (children.length !== container.children.length || children.some((c, i) => c !== container.children[i])) {
    container.children = children;
    fs.writeFileSync(containerPath, JSON.stringify(container));
  }
}
console.log(`merge-allure-scenarios: ${byScenario.size} scenario(s) merged in ${folder}`);
