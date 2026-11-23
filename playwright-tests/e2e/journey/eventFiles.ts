import { readdirSync } from 'node:fs';
import path from 'node:path';
import type { EventDefinition } from './event.ts';

// Every event in playwright-tests/events, one per file (the file's default export), in file name order, so adding an
// event is adding its file

const eventsFolder = path.resolve(__dirname, '../../events');

function load(): Array<EventDefinition<unknown>> {
  const files = readdirSync(eventsFolder).filter((file) => file.endsWith('.ts')).sort();
  const definitions = files.map((file) => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const definition = require(path.join(eventsFolder, file)).default as EventDefinition<unknown> | undefined;
    if (definition?.id === undefined) {
      throw new Error(`playwright-tests/events/${file} must have an event as its default export: export default event({ id: ..., ... })`);
    }
    return definition;
  });
  const ids = definitions.map((definition) => definition.id);
  const repeated = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (repeated.length > 0) {
    throw new Error(`More than one file in playwright-tests/events is for ${repeated.join(', ')}`);
  }
  return definitions;
}

export const eventDefinitions: Array<EventDefinition<unknown>> = load();
