import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { CcdEvent, EventPageField, eventPages, eventRoles, hiddenFromXui, userEvents } from './ccdDefinition.ts';

// What you need to know to add an event, from the CCD definition and the journeys, so you can copy an existing UI
// class, API class and event file (playwright-tests/events) and change them:
//   yarn event:info <EVENT_ID>   the event's Next step name, who can do it, the states it is offered in and moves the
//                                claim to, its pages and fields, and each journey's steps to choose "after" from
//   yarn event:info              the Next step events with no UI class yet
// It only reads; it changes nothing.

// The journeys are built to list their steps, which needs an environment; any will do
process.env.ENV = process.env.ENV ?? 'aat';

const root = path.resolve(__dirname, '..');

// Roles that don't use XUI's Next step: citizens (the citizen service), the system update user and the RPA robot
const nonXuiRoles = /^(citizen|CITIZEN-|caseworker-civil-systemupdate$|caseworker-civil-rparobot$|\[CREATOR\]$)/;

function tsFiles(folder: string): string[] {
  return readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(folder, entry.name);
    if (entry.isDirectory()) {
      return tsFiles(entryPath);
    }
    return entry.name.endsWith('.ts') ? [entryPath] : [];
  });
}

// What the framework already does: the Next step names its UI classes pick, the event IDs its classes, journeys and
// event files mention, and the events wired in by event files
function covered(): { names: Set<string>; mentioned: string; eventFiles: Set<string> } {
  const names = new Set<string>();
  for (const file of tsFiles(path.join(root, 'e2e/flows/events/ui'))) {
    for (const match of readFileSync(file, 'utf8').matchAll(/selectNextStep\(\s*['"`]([^'"`]+)['"`]/g)) {
      names.add(match[1]);
    }
  }
  const sources = [...tsFiles(path.join(root, 'e2e/flows')), ...tsFiles(path.join(root, 'e2e/journey')), ...tsFiles(path.join(root, 'events'))];
  const mentioned = sources.map((file) => readFileSync(file, 'utf8')).join('\n');
  const eventFiles = new Set(tsFiles(path.join(root, 'events'))
    .map((file) => /id:\s*'([A-Z0-9_]+)'/.exec(readFileSync(file, 'utf8'))?.[1])
    .filter((id): id is string => id !== undefined));
  return { names, mentioned, eventFiles };
}

function isCovered(event: CcdEvent, done: ReturnType<typeof covered>): boolean {
  return done.names.has(event.Name) || done.eventFiles.has(event.ID) || new RegExp(`['"\`]${event.ID}['"\`]`).test(done.mentioned);
}

// Each journey's steps, in order, from its default settings
function journeySteps(): Record<string, Array<{ name: string; title: string; closesClaim: boolean }>> {
  /* eslint-disable @typescript-eslint/no-require-imports */
  const { JourneyContext } = require('../e2e/journey/journeyRunner.ts');
  const { specifiedConfig } = require('../e2e/journey/specified/specifiedConfig.ts');
  const { specifiedSteps } = require('../e2e/journey/specified/specifiedSteps.ts');
  const { unspecifiedConfig } = require('../e2e/journey/unspecified/unspecifiedConfig.ts');
  const { unspecifiedSteps } = require('../e2e/journey/unspecified/unspecifiedSteps.ts');
  /* eslint-enable @typescript-eslint/no-require-imports */
  const list = (steps: Array<{ name: string; title: string; closesClaim?: boolean }>) => steps.map((step) => ({ name: step.name, title: step.title, closesClaim: !!step.closesClaim }));
  return {
    SPECIFIED: list(specifiedSteps(specifiedConfig({}), new JourneyContext(undefined, undefined))),
    UNSPECIFIED: list(unspecifiedSteps(unspecifiedConfig({}), new JourneyContext(undefined, undefined))),
  };
}

function states(text: string | undefined): string {
  if (text === undefined || text.trim() === '*') {
    return 'any state';
  }
  return text.split(';').map((state) => state.trim()).join(', ');
}

function listUncovered(events: CcdEvent[]) {
  const done = covered();
  const uncovered = events
    .filter((event) => !isCovered(event, done) && !hiddenFromXui(event))
    .map((event) => ({ event, roles: eventRoles(event.ID).filter((role) => !nonXuiRoles.test(role)) }))
    .filter(({ roles }) => roles.length > 0)
    .sort((a, b) => a.event.Name.localeCompare(b.event.Name));
  console.log(`Next step events XUI users can do that the journeys don't cover yet (${uncovered.length}). Run yarn event:info <EVENT_ID> for one.`);
  console.log('Events the definition hides from XUI are left out. "only when" is the condition XUI offers the event on.\n');
  for (const { event, roles } of uncovered) {
    console.log(`  ${event.ID.padEnd(40)} ${event.Name.padEnd(40)} ${roles.join(', ')}`);
    if (event.EventEnablingCondition) {
      console.log(`  ${''.padEnd(40)} only when: ${event.EventEnablingCondition}`);
    }
  }
}

function printField(field: EventPageField, indent: string) {
  const context = field.displayContext ? `, ${field.displayContext.toLowerCase()}` : '';
  const shown = field.showCondition ? ` [shown when ${field.showCondition}]` : '';
  console.log(`${indent}${field.id} (${field.type}${context})${field.label ? `: ${field.label}` : ''}${shown}`);
  if (field.element) {
    console.log(`${indent}    element: ${field.element}`);
  }
  if (field.values) {
    console.log(`${indent}    values: ${field.values.join(', ')}`);
  }
  (field.parts ?? []).forEach((part) => printField(part, `${indent}  - `.replace('- ', '  ')));
}

function describe(event: CcdEvent) {
  const done = covered();
  const steps = journeySteps();
  console.log(`\n${event.ID}: "${event.Name}"`);
  if (event.Description) {
    console.log(`  ${event.Description}`);
  }
  if (done.eventFiles.has(event.ID)) {
    console.log('  Already wired in by an event file in playwright-tests/events.');
  } else if (isCovered(event, done)) {
    console.log('  The journeys already do it (a class or step in e2e/flows or e2e/journey).');
  }

  console.log('\nWho can do it (roles with create access):');
  console.log(`  ${eventRoles(event.ID).join(', ') || 'none found'}`);

  console.log('\nStates:');
  console.log(`  Offered in: ${states(event['PreConditionState(s)'])}`);
  console.log(`  Moves the claim to: ${event.PostConditionState === undefined || event.PostConditionState.trim() === '*' ? 'no change (or set by civil-service)' : event.PostConditionState}`);
  console.log(`  Check your answers page: ${event.ShowSummary === 'Y' ? 'yes' : 'no (the last page submits)'}`);
  if (hiddenFromXui(event)) {
    console.log(`  NOT IN XUI: the definition hides it from Next step for everyone (${event.EventEnablingCondition}), so it can only be done through the API.`);
  } else if (event.EventEnablingCondition) {
    console.log(`  Next step only offers it when: ${event.EventEnablingCondition}`);
  }

  const pages = eventPages(event.ID);
  console.log(`\nPages (${pages.length}), with the fields XUI can show. In XUI a field's element is #<field ID>:`);
  pages.forEach((page, index) => {
    console.log(`\n  ${index + 1}. ${page.id}${page.label ? ` - ${page.label}` : ''}`);
    if (page.showCondition) {
      console.log(`     Shown when: ${page.showCondition}`);
    }
    page.fields.forEach((field) => printField(field, '     '));
  });

  for (const [journey, list] of Object.entries(steps)) {
    console.log(`\n${journey === 'SPECIFIED' ? 'Specified' : 'Unspecified'} journey steps, for "after" (steps that close the claim are left out):`);
    for (const step of list.filter((candidate) => !candidate.closesClaim)) {
      console.log(`  ${step.name.padEnd(48)} ${step.title}`);
    }
  }
}

const eventId = process.argv[2];
const events = userEvents();
if (eventId === undefined) {
  listUncovered(events);
} else {
  const event = events.find((candidate) => candidate.ID === eventId.toUpperCase());
  if (event === undefined) {
    const close = events.filter((candidate) => candidate.ID.includes(eventId.toUpperCase()) || candidate.Name.toLowerCase().includes(eventId.toLowerCase()));
    console.error(`${eventId} is not a Next step event in the CCD definition.${close.length ? ` Did you mean: ${close.slice(0, 10).map((candidate) => `${candidate.ID} ("${candidate.Name}")`).join(', ')}?` : ''}`);
    process.exit(1);
  }
  describe(event);
}
