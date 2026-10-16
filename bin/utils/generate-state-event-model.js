#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');

function resolveDefinitionRoot() {
  const civilRoot = path.join(ROOT, 'ccd-definition', 'civil');
  const legacyRoot = path.join(ROOT, 'ccd-definition');

  if (fs.existsSync(path.join(civilRoot, 'CaseEvent'))) {
    return civilRoot;
  }

  if (fs.existsSync(path.join(legacyRoot, 'CaseEvent'))) {
    return legacyRoot;
  }

  throw new Error(`Could not locate CCD definition root under ${ROOT}`);
}

const DEFINITION_ROOT = resolveDefinitionRoot();
const STATE_FILE = path.join(DEFINITION_ROOT, 'State', 'State.json');
const CASE_EVENT_DIR = path.join(DEFINITION_ROOT, 'CaseEvent');
const AUTH_DIR = path.join(DEFINITION_ROOT, 'AuthorisationCaseEvent');

const SOURCE_DIRS = fs.readdirSync(CASE_EVENT_DIR)
  .filter(d => fs.statSync(path.join(CASE_EVENT_DIR, d)).isDirectory())
  .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

function parseStates() {
  const raw = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  return raw.map(s => ({
    id: s.ID,
    name: s.Name,
    description: s.Description,
    displayOrder: s.DisplayOrder,
    titleDisplay: s.TitleDisplay,
    lane: null,
    kind: 'normal',
  }));
}

function sourceTypeFromDir(dir) {
  return dir.toLowerCase().replace('testingsupport', 'testing');
}

function readEventFiles() {
  const events = [];

  for (const dir of SOURCE_DIRS) {
    const dirPath = path.join(CASE_EVENT_DIR, dir);
    const files = fs.readdirSync(dirPath)
      .filter(f => f.endsWith('.json'))
      .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      const items = Array.isArray(content) ? content : null;
      if (!items) continue;

      const relPath = path.relative(ROOT, filePath);
      const sourceType = sourceTypeFromDir(dir);

      const fileEvents = items.map(item => {
        const preRaw = item['PreConditionState(s)'] || '*';
        const preStates = preRaw.split(';').map(s => s.trim()).filter(Boolean);
        const postState = item.PostConditionState || '*';

        const publish = (item.Publish || item.publish || '') === 'Y';
        const displayOrder = item.DisplayOrder != null ? item.DisplayOrder : null;
        const comment = (item.Comment || '').toString();
        const enablingCondition = (item.EventEnablingCondition || '').toString();

        return {
          id: item.ID,
          name: item.Name,
          description: item.Description || '',
          comment,
          sourceFile: relPath,
          sourceType,
          preStates,
          postState,
          enablingCondition,
          publish,
          displayOrder,
          dynamic: postState === '*',
        };
      });

      fileEvents.sort((a, b) => {
        if (a.displayOrder != null && b.displayOrder == null) return -1;
        if (a.displayOrder == null && b.displayOrder != null) return 1;
        if (a.displayOrder != null && b.displayOrder != null) {
          if (a.displayOrder !== b.displayOrder) return a.displayOrder - b.displayOrder;
        }
        return a.id.localeCompare(b.id);
      });

      events.push(...fileEvents);
    }
  }

  return events;
}

function parseAuthorisations() {
  const roleMap = {};
  const files = fs.readdirSync(AUTH_DIR).filter(f => f.endsWith('.json'));
  for (const file of files) {
    let content;
    try {
      content = JSON.parse(fs.readFileSync(path.join(AUTH_DIR, file), 'utf8'));
    } catch {
      continue;
    }
    const items = Array.isArray(content) ? content : [content];
    for (const item of items) {
      const eventId = item.CaseEventID;
      if (!eventId) continue;
      if (!roleMap[eventId]) roleMap[eventId] = new Set();

      if (item.AccessControl) {
        for (const ac of item.AccessControl) {
          if (ac.CRUD && ac.CRUD.includes('C')) {
            for (const role of ac.UserRoles) roleMap[eventId].add(role);
          }
        }
      } else if (item.UserRole && item.CRUD && item.CRUD.includes('C')) {
        roleMap[eventId].add(item.UserRole);
      }
    }
  }
  return roleMap;
}

function computeEdges(events) {
  const edges = [];

  for (const ev of events) {
    for (const fromState of ev.preStates) {
      edges.push({
        eventId: ev.id,
        fromState,
        toState: ev.postState,
        label: ev.name,
        dynamic: fromState === '*' || ev.postState === '*',
        sourceType: ev.sourceType,
        sourceFile: ev.sourceFile,
        enablingCondition: ev.enablingCondition,
      });
    }
  }

  return edges;
}

function computeSummary(states, events, edges) {
  const dynamicEventCount = events.filter(e => e.dynamic).length;
  const wildcardPreStateEventCount = events.filter(e => e.preStates.includes('*')).length;
  const wildcardPostStateEventCount = events.filter(e => e.postState === '*').length;
  const dynamicEdgeCount = edges.filter(e => e.dynamic).length;

  return {
    stateCount: states.length,
    eventCount: events.length,
    edgeCount: edges.length,
    dynamicEventCount,
    wildcardPreStateEventCount,
    wildcardPostStateEventCount,
    dynamicEdgeCount,
  };
}

function main() {
  const outputPath = process.argv[2]
    ? path.resolve(process.cwd(), process.argv[2])
    : path.join(ROOT, 'build', 'state-event-model.json');

  const states = parseStates();
  const events = readEventFiles();
  const authMap = parseAuthorisations();
  for (const ev of events) {
    const roles = authMap[ev.id];
    ev.createRoles = roles ? [...roles].sort() : [];
  }
  const edges = computeEdges(events);
  const summary = computeSummary(states, events, edges);

  const model = {
    generatedAt: new Date().toISOString(),
    source: {
      stateFile: path.relative(ROOT, STATE_FILE),
      caseEventDir: path.relative(ROOT, CASE_EVENT_DIR),
    },
    summary,
    states,
    events,
    edges,
  };

  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(outputPath, JSON.stringify(model, null, 2));

  console.log(`State-event model written to ${outputPath}`);
  console.log(`  States: ${summary.stateCount}`);
  console.log(`  Events: ${summary.eventCount}`);
  console.log(`  Edges:  ${summary.edgeCount}`);
}

main();
