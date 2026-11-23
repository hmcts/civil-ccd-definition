import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import JSZip from 'jszip';
import { allSettings, Journey, Setting } from '../e2e/journey/settings.ts';
import { markdownToDocx } from './md2docx.ts';

// Keeps the playwright-tests guides up to date:
//  - the claim parameters table in each RUNNING guide is written from the settings registry (e2e/journey/settings.ts,
//    with the settings of the events in playwright-tests/events),
//    between the two marker comments, so a setting's values, default and notes are only written in the registry
//  - each guide's .docx is written from its .md, where its text has changed
// Run with: yarn guides:generate. With --check it writes nothing, lists what is out of date and fails if anything is.

const root = path.resolve(__dirname, '..');

const guides: Array<{ file: string; journey?: Journey }> = [
  { file: 'RUNNING_SPECIFIED_TESTS.md', journey: 'SPECIFIED' },
  { file: 'RUNNING_UNSPECIFIED_TESTS.md', journey: 'UNSPECIFIED' },
  { file: 'ADDING_AN_EVENT.md' },
];

const tableStart = '<!-- The claim parameters below are written from e2e/journey/settings.ts by yarn guides:generate: change them there, not here -->';
const tableEnd = '<!-- End of the claim parameters written from e2e/journey/settings.ts -->';

// Settings the guides describe with the run settings, which are written by hand, rather than as claim parameters
const runSettings = ['API_UNTIL', 'STOP_AT_STATE', 'STOP_AFTER_TEST'];

// A value given the same in both journeys, or for each journey
function forJourney(value: string | Partial<Record<Journey, string>> | undefined, journey: Journey): string | undefined {
  return typeof value === 'object' ? value[journey] : value;
}

function valuesText(setting: Setting, journey: Journey): string {
  const text = forJourney(setting.valuesText, journey);
  if (text !== undefined) {
    return text;
  }
  const values = Array.isArray(setting.values) ? setting.values : (setting.values as Partial<Record<Journey, readonly string[]>> | undefined)?.[journey];
  return values?.join(', ') ?? '';
}

function cell(text: string, name: string): string {
  if (text.includes('|')) {
    throw new Error(`${name}: a table cell cannot contain "|": ${text}`);
  }
  return text;
}

function claimParameters(journey: Journey): string {
  const rows = (Object.entries(allSettings) as Array<[string, Setting]>)
    .filter(([name, setting]) => setting.notes[journey] !== undefined && !runSettings.includes(name))
    .map(([name, setting]) => {
      const defaultText = forJourney(setting.defaultText, journey) ?? forJourney(setting.default, journey) ?? 'None';
      return `| \`${name}\` | ${cell(valuesText(setting, journey), name)} | ${cell(defaultText, name)} | ${cell(setting.notes[journey] as string, name)} |`;
    });
  return [
    tableStart,
    '',
    'Defaults apply when a parameter is not set. Every on/off parameter takes Yes or No. A value a parameter does not take stops the run before it starts, listing the values it does take.',
    '',
    '| Parameter | Values | Default | Notes |',
    '| --- | --- | --- | --- |',
    ...rows,
    '',
    tableEnd,
  ].join('\n');
}

// The guide's Markdown with its claim parameters table written from the registry
function withClaimParameters(markdown: string, journey: Journey, file: string): string {
  const start = markdown.indexOf(tableStart);
  const end = markdown.indexOf(tableEnd);
  if (start === -1 || end === -1 || end < start) {
    throw new Error(`${file} needs the claim parameters marker comments:\n${tableStart}\n${tableEnd}`);
  }
  return markdown.slice(0, start) + claimParameters(journey) + markdown.slice(end + tableEnd.length);
}

// The text of a .docx (its document.xml), which is all that changes with the Markdown: the file itself also holds the
// time it was written, so it differs every time
async function documentXml(docx: Buffer): Promise<string> {
  const zip = await JSZip.loadAsync(docx);
  return (await zip.file('word/document.xml')?.async('string')) ?? '';
}

async function main() {
  const check = process.argv.includes('--check');
  const outOfDate: string[] = [];
  for (const guide of guides) {
    const mdPath = path.join(root, guide.file);
    const current = readFileSync(mdPath, 'utf8');
    const markdown = guide.journey ? withClaimParameters(current, guide.journey, guide.file) : current;
    if (markdown !== current) {
      outOfDate.push(guide.file);
      if (!check) {
        writeFileSync(mdPath, markdown);
      }
    }

    const docxPath = mdPath.replace(/\.md$/, '.docx');
    const docx = await markdownToDocx(markdown);
    const docxChanged = !existsSync(docxPath) || (await documentXml(readFileSync(docxPath))) !== (await documentXml(docx));
    if (docxChanged) {
      outOfDate.push(path.basename(docxPath));
      if (!check) {
        writeFileSync(docxPath, docx);
      }
    }
  }

  if (outOfDate.length === 0) {
    console.log('The guides are up to date');
    return;
  }
  if (check) {
    console.error(`Out of date (run yarn guides:generate): ${outOfDate.join(', ')}`);
    process.exit(1);
  }
  console.log(`Written: ${outOfDate.join(', ')}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
