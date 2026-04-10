#!/usr/bin/env node

/**
 * Enriches the state-event model by resolving dynamic (wildcard) post-states.
 *
 * Parses civil-service Java callback handlers to find which CaseState values
 * each event can transition to via .state() calls, replacing '*' with concrete state(s).
 *
 * Usage:
 *   node enrich-state-event-model.js <model.json> [civil-service-path]
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');

const VALID_STATES = new Set([
  'PENDING_CASE_ISSUED','CASE_ISSUED','AWAITING_CASE_DETAILS_NOTIFICATION',
  'AWAITING_RESPONDENT_ACKNOWLEDGEMENT','AWAITING_APPLICANT_INTENTION',
  'CASE_DISMISSED','PROCEEDS_IN_HERITAGE_SYSTEM','JUDICIAL_REFERRAL',
  'CASE_PROGRESSION','HEARING_READINESS','PREPARE_FOR_HEARING_CONDUCT_HEARING',
  'IN_MEDIATION','DECISION_OUTCOME','ALL_FINAL_ORDERS_ISSUED',
  'CASE_SETTLED','CASE_STAYED','CLOSED','CASE_DISCONTINUED',
]);

function walkJava(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walkJava(full));
    else if (entry.name.endsWith('.java')) results.push(full);
  }
  return results;
}

/**
 * Extract states ONLY from .state(...) call sites in a Java file.
 * Handles:
 *   .state(CaseState.X.name())
 *   .state(CaseState.X.toString())
 *   .state(IMPORTED_ENUM.name())
 *   .state("STATE_STRING")
 *   .state(variable) — traces variable assignment in same file
 */
function extractStatesFromStateCalls(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const states = new Set();

  // Build static import map: short name -> full enum value
  const imports = {};
  const importRe = /import static\s+.*CaseState\.([A-Z][A-Za-z_0-9]+)\s*;/g;
  let m;
  while ((m = importRe.exec(content)) !== null) {
    imports[m[1]] = m[1];
  }

  // Find all .state(...) call sites
  const stateCallRe = /\.state\(([^)]+)\)/g;
  while ((m = stateCallRe.exec(content)) !== null) {
    const arg = m[1].trim();

    // Case 1: .state(CaseState.ENUM.name()) or .state(CaseState.ENUM.toString())
    const enumDirect = arg.match(/CaseState\.([A-Z][A-Z_0-9]+)/);
    if (enumDirect && VALID_STATES.has(enumDirect[1])) {
      states.add(enumDirect[1]);
      continue;
    }

    // Case 2: .state("STATE_STRING")
    const stringLiteral = arg.match(/^"([A-Z][A-Z_0-9]+)"$/);
    if (stringLiteral && VALID_STATES.has(stringLiteral[1])) {
      states.add(stringLiteral[1]);
      continue;
    }

    // Case 3: .state(IMPORTED_ENUM.name()) — static imported CaseState
    const importedEnum = arg.match(/^([A-Z][A-Z_0-9]+)\.(?:name|toString)\(\)$/);
    if (importedEnum && imports[importedEnum[1]] && VALID_STATES.has(importedEnum[1])) {
      states.add(importedEnum[1]);
      continue;
    }

    // Case 4: .state(variable) — trace the variable assignment
    const varMatch = arg.match(/^([a-zA-Z_]\w*)$/);
    if (varMatch) {
      const varName = varMatch[1];
      traceVariable(content, varName, imports).forEach(s => states.add(s));
      continue;
    }

    // Case 5: Ternary or complex expression containing CaseState references
    const allEnums = arg.match(/CaseState\.([A-Z][A-Z_0-9]+)/g);
    if (allEnums) {
      allEnums.forEach(ref => {
        const s = ref.replace('CaseState.', '');
        if (VALID_STATES.has(s)) states.add(s);
      });
      continue;
    }

    // Case 6: Ternary with static imports
    for (const [shortName, fullName] of Object.entries(imports)) {
      if (arg.includes(shortName) && VALID_STATES.has(fullName)) {
        states.add(fullName);
      }
    }
  }

  return states;
}

/**
 * Trace a variable back to its CaseState assignment(s) within the same file.
 */
function traceVariable(content, varName, imports) {
  const states = new Set();
  const escaped = varName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Pattern: varName = CaseState.X.name()
  const assignRe = new RegExp(`${escaped}\\s*=\\s*([^;]+);`, 'g');
  let m;
  while ((m = assignRe.exec(content)) !== null) {
    const rhs = m[1].trim();

    // CaseState.X.name()
    const enumRef = rhs.match(/CaseState\.([A-Z][A-Z_0-9]+)/);
    if (enumRef && VALID_STATES.has(enumRef[1])) {
      states.add(enumRef[1]);
      continue;
    }

    // "STATE_STRING"
    const strRef = rhs.match(/^"([A-Z][A-Z_0-9]+)"$/);
    if (strRef && VALID_STATES.has(strRef[1])) {
      states.add(strRef[1]);
      continue;
    }

    // Static imported enum: CASE_SETTLED.name()
    const impRef = rhs.match(/^([A-Z][A-Z_0-9]+)\.(?:name|toString)\(\)$/);
    if (impRef && imports[impRef[1]] && VALID_STATES.has(impRef[1])) {
      states.add(impRef[1]);
      continue;
    }

    // Ternary with CaseState refs
    const ternaryRefs = rhs.match(/CaseState\.([A-Z][A-Z_0-9]+)/g);
    if (ternaryRefs) {
      ternaryRefs.forEach(ref => {
        const s = ref.replace('CaseState.', '');
        if (VALID_STATES.has(s)) states.add(s);
      });
    }

    // Ternary with imported enums
    for (const [shortName, fullName] of Object.entries(imports)) {
      if (rhs.includes(shortName) && VALID_STATES.has(fullName)) {
        states.add(fullName);
      }
    }

    // Method call — try to trace into same file
    const methodCall = rhs.match(/^(\w+)\(/);
    if (methodCall) {
      traceMethod(content, methodCall[1], imports).forEach(s => states.add(s));
    }
  }

  return states;
}

/**
 * Trace a method's return statements for CaseState references.
 */
function traceMethod(content, methodName, imports) {
  const states = new Set();
  // Find the method body (simplified — look for return statements after the method signature)
  const escaped = methodName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const methodRe = new RegExp(`\\b${escaped}\\s*\\([^)]*\\)\\s*\\{`, 'g');
  const match = methodRe.exec(content);
  if (!match) return states;

  // Extract a chunk after the method signature
  const bodyStart = match.index + match[0].length;
  const bodyChunk = content.substring(bodyStart, bodyStart + 2000);

  // Find return statements with CaseState
  const returnRe = /return\s+([^;]+);/g;
  let m;
  while ((m = returnRe.exec(bodyChunk)) !== null) {
    const ret = m[1];
    const refs = ret.match(/CaseState\.([A-Z][A-Z_0-9]+)/g);
    if (refs) refs.forEach(r => {
      const s = r.replace('CaseState.', '');
      if (VALID_STATES.has(s)) states.add(s);
    });
    // Static imported
    for (const [shortName, fullName] of Object.entries(imports)) {
      if (ret.includes(shortName + '.name') && VALID_STATES.has(fullName)) {
        states.add(fullName);
      }
    }
    // String literal
    const strRef = ret.match(/"([A-Z][A-Z_0-9]+)"/);
    if (strRef && VALID_STATES.has(strRef[1])) states.add(strRef[1]);
  }

  return states;
}

/**
 * Find handler files for a given event ID.
 * Verifies the event ID appears as a distinct enum constant (word-bounded),
 * not as a substring of another event name.
 */
function findHandlersForEvent(eventId, allFiles) {
  const handlers = [];
  const escaped = eventId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Match event ID as a standalone word: preceded by ( , . space, or start; followed by ) , . space, ; or end
  const eventRe = new RegExp(`(?:^|[\\s(,.]|CaseEvent\\.)${escaped}(?=[\\s),;.]|$)`, 'm');

  for (const file of allFiles) {
    const content = fs.readFileSync(file, 'utf8');
    if (!content.includes('handledEvents')) continue;
    if (eventRe.test(content)) {
      handlers.push(file);
    }
  }
  return handlers;
}

/**
 * Find task/delegate files associated with a handler by scanning its imports.
 * Looks for classes imported from the same handler package tree.
 */
function findTaskFiles(handlerFile, allFiles, serviceRoot) {
  const content = fs.readFileSync(handlerFile, 'utf8');
  const tasks = new Set();

  // Strategy 1: Find sibling task directories matching handler name
  const baseName = path.basename(handlerFile, '.java').toLowerCase();
  const taskDirPatterns = [
    baseName + 'tasks',
    baseName.replace('callbackhandler', '') + 'tasks',
    baseName.replace('handler', '') + 'tasks',
  ];
  for (const f of allFiles) {
    if (f === handlerFile) continue;
    const fDir = path.dirname(f).toLowerCase();
    if (taskDirPatterns.some(p => fDir.includes(p))) tasks.add(f);
  }

  // Strategy 2: Follow imports from the handler package to find task classes
  const importRe = /import\s+(uk\.gov\.hmcts\.reform\.civil\.handler\.[^;]+);/g;
  let m;
  while ((m = importRe.exec(content)) !== null) {
    const className = m[1];
    const filePath = path.join(
      serviceRoot, 'src/main/java',
      className.replace(/\./g, '/') + '.java'
    );
    if (fs.existsSync(filePath) && filePath !== handlerFile) {
      tasks.add(filePath);
    }
  }

  return [...tasks];
}

/**
 * Extract BusinessProcess.ready(CaseEvent.X) calls from a Java file.
 * Returns set of CaseEvent names that trigger BPMN workflows.
 */
function extractBusinessProcessEvents(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const events = new Set();
  const re = /BusinessProcess\.ready\(\s*(?:CaseEvent\.)?([A-Za-z_][A-Za-z_0-9]*)\s*\)/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    events.add(m[1]);
  }
  return events;
}

/**
 * Parse a BPMN XML file and extract all caseEvent parameter values.
 */
function extractBpmnCaseEvents(bpmnPath) {
  const content = fs.readFileSync(bpmnPath, 'utf8');
  const events = new Set();
  const re = /<camunda:inputParameter name="caseEvent">([^<]+)<\/camunda:inputParameter>/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    events.add(m[1].trim());
  }
  return events;
}

/**
 * Find BPMN file for a given CaseEvent name.
 * Searches by message name in BPMN XML files.
 */
function findBpmnForEvent(eventName, bpmnDir) {
  if (!fs.existsSync(bpmnDir)) return null;
  const files = fs.readdirSync(bpmnDir).filter(f => f.endsWith('.bpmn'));
  // Try filename match first (most BPMN files are named after their event)
  const normalised = eventName.toLowerCase();
  const exact = files.find(f => f.replace('.bpmn', '') === normalised);
  if (exact) return path.join(bpmnDir, exact);
  // Fall back to searching for message name inside BPMN XML
  for (const f of files) {
    const fp = path.join(bpmnDir, f);
    const content = fs.readFileSync(fp, 'utf8');
    if (content.includes(`name="${eventName}"`)) return fp;
  }
  return null;
}

/**
 * Follow the BPMN chain for a handler file:
 * 1. Find BusinessProcess.ready(EVENT) calls
 * 2. Find the BPMN file for that event
 * 3. Extract all caseEvent parameters from the BPMN
 * 4. Look up their PostConditionState in the model
 */
/**
 * Recursively follow BPMN chains to resolve state transitions.
 * For each BusinessProcess.ready() call:
 *   1. Find the BPMN process file
 *   2. Extract caseEvent parameters (downstream CCD events)
 *   3. If a downstream event has a concrete postState → collect it
 *   4. If a downstream event has postState=* → find its handler, extract .state() calls,
 *      and recursively follow its own BPMN chains
 *
 * Uses visited sets for cycle detection.
 */
function resolveViaBpmnChain(handlerFile, taskFiles, model, bpmnDir, allFiles, serviceRoot, visited) {
  const states = new Set();
  const eventMap = Object.fromEntries(model.events.map(e => [e.id, e]));
  if (!visited) visited = { bpmnFiles: new Set(), eventIds: new Set() };

  // Collect BusinessProcess.ready() calls from handler and its tasks
  const bpEvents = new Set();
  extractBusinessProcessEvents(handlerFile).forEach(e => bpEvents.add(e));
  for (const tf of taskFiles) {
    extractBusinessProcessEvents(tf).forEach(e => bpEvents.add(e));
  }

  for (const bpEvent of bpEvents) {
    const bpmnFile = findBpmnForEvent(bpEvent, bpmnDir);
    if (!bpmnFile || visited.bpmnFiles.has(bpmnFile)) continue;
    visited.bpmnFiles.add(bpmnFile);

    const caseEvents = extractBpmnCaseEvents(bpmnFile);
    for (const ce of caseEvents) {
      if (visited.eventIds.has(ce)) continue;
      visited.eventIds.add(ce);

      const ev = eventMap[ce];
      if (!ev) continue;

      // If the downstream event has a concrete postState, collect it
      if (ev.postState !== '*' && VALID_STATES.has(ev.postState)) {
        states.add(ev.postState);
        continue;
      }

      // If postState is *, find its handler and resolve deeper
      if (ev.postState === '*') {
        const downstreamHandlers = findHandlersForEvent(ce, allFiles);
        for (const dh of downstreamHandlers) {
          // Extract .state() calls from the downstream handler
          extractStatesFromStateCalls(dh).forEach(s => states.add(s));

          // Check its task files too
          const dTasks = findTaskFiles(dh, allFiles, serviceRoot);
          for (const dt of dTasks) {
            extractStatesFromStateCalls(dt).forEach(s => states.add(s));
          }

          // Recursively follow its BPMN chains
          resolveViaBpmnChain(dh, dTasks, model, bpmnDir, allFiles, serviceRoot, visited)
            .forEach(s => states.add(s));
        }
      }
    }
  }

  return states;
}

function main() {
  const modelPath = process.argv[2]
    ? path.resolve(process.cwd(), process.argv[2])
    : path.join(ROOT, 'build', 'state-event-model.json');

  const serviceRoot = process.argv[3]
    ? path.resolve(process.cwd(), process.argv[3])
    : path.join(ROOT, '..', 'civil-service');

  const camundaRoot = process.argv[4]
    ? path.resolve(process.cwd(), process.argv[4])
    : path.join(ROOT, '..', 'civil-camunda-bpmn-definition');

  if (!fs.existsSync(serviceRoot)) {
    console.error(`civil-service not found at: ${serviceRoot}`);
    process.exit(1);
  }

  const bpmnDir = path.join(camundaRoot, 'src/main/resources/camunda');
  const hasBpmn = fs.existsSync(bpmnDir);
  if (!hasBpmn) console.warn(`Warning: BPMN dir not found at ${bpmnDir}, skipping chain resolution`);

  const model = JSON.parse(fs.readFileSync(modelPath, 'utf8'));
  console.log(`Loaded model: ${model.events.length} events`);

  const handlerDir = path.join(serviceRoot, 'src/main/java/uk/gov/hmcts/reform/civil/handler');
  const allFiles = walkJava(handlerDir);
  console.log(`Found ${allFiles.length} handler files`);

  const globalIds = new Set(
    model.events
      .filter(e => e.preStates.length === 1 && e.preStates[0] === '*' && e.postState === '*')
      .map(e => e.id)
  );

  const dynamicEvents = model.events.filter(
    e => e.postState === '*' && !globalIds.has(e.id)
  );
  console.log(`Dynamic post-state events to resolve: ${dynamicEvents.length}`);

  let resolved = 0, noChange = 0, unresolved = 0;

  for (const ev of dynamicEvents) {
    const handlers = findHandlersForEvent(ev.id, allFiles);
    const allStates = new Set();

    for (const handlerFile of handlers) {
      // Extract states from .state() calls in handler
      extractStatesFromStateCalls(handlerFile).forEach(s => allStates.add(s));

      // Also check child task files
      const tasks = findTaskFiles(handlerFile, allFiles, serviceRoot);
      for (const tf of tasks) {
        extractStatesFromStateCalls(tf).forEach(s => allStates.add(s));
      }

      // Follow BusinessProcess.ready() → BPMN → CCD event chain (recursive)
      if (hasBpmn) {
        resolveViaBpmnChain(handlerFile, tasks, model, bpmnDir, allFiles, serviceRoot)
          .forEach(s => allStates.add(s));
      }
    }

    if (allStates.size > 0) {
      ev.resolvedPostStates = [...allStates].sort();
      resolved++;
    } else if (handlers.length > 0) {
      // Handler exists but has no .state() call — event doesn't change state
      ev.resolvedPostStates = ['NO_CHANGE'];
      noChange++;
    } else {
      ev.resolvedPostStates = [];
      unresolved++;
    }
  }

  model.summary.resolvedDynamicEvents = resolved;
  model.summary.noChangeDynamicEvents = noChange;
  model.summary.unresolvedDynamicEvents = unresolved;
  model.enrichedAt = new Date().toISOString();
  model.enrichmentSource = path.basename(serviceRoot);

  fs.writeFileSync(modelPath, JSON.stringify(model, null, 2));
  console.log(`\nEnrichment complete:`);
  console.log(`  Resolved (state change): ${resolved}`);
  console.log(`  No state change: ${noChange}`);
  console.log(`  Unresolved (no handler found): ${unresolved}`);
  console.log(`  Written to: ${modelPath}`);
}

main();
