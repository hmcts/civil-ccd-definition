import { expect, Page } from '@playwright/test';
import { envUrl } from '../../../civilConfig.ts';

// A flag type as reference data describes it, with the radio labels to choose, one page each, to reach it
export interface CaseFlagType {
  code: string;
  name: string;
  path: string[];
  commentRequired: boolean;
  hasListOfValues: boolean;
  defaultStatus: string;
}

interface RefDataFlag {
  name: string;
  flagCode: string;
  flagComment?: boolean;
  defaultStatus?: string;
  listOfValuesLength?: number;
  childFlags?: RefDataFlag[];
}

const cache = new Map<string, CaseFlagType[]>();

// Civil's flag types (service AAA7), from reference data. XUI serves them to the signed-in user, which is what the
// flag pages show, so the path to a flag is looked up rather than written into the tests. Case level and party level
// flags are separate lists.
export async function caseFlagTypes(page: Page, level: 'CASE' | 'PARTY'): Promise<CaseFlagType[]> {
  const cached = cache.get(level);
  if (cached) {
    return cached;
  }
  const response = await page.request.get(`${envUrl}/refdata/commondata/caseflags/service-id=AAA7?flag-type=${level}&welsh-required=N`);
  expect(response.ok(), `Reading the ${level} case flag types returned ${response.status()}`).toBeTruthy();
  const body = await response.json();
  const types: CaseFlagType[] = [];
  const walk = (flag: RefDataFlag, path: string[]) => {
    const children = flag.childFlags ?? [];
    if (children.length === 0) {
      types.push({
        code: flag.flagCode,
        name: flag.name,
        path,
        commentRequired: flag.flagComment === true,
        hasListOfValues: (flag.listOfValuesLength ?? 0) > 0,
        defaultStatus: flag.defaultStatus ?? 'Active',
      });
      return;
    }
    for (const child of children) {
      walk(child, [...path, child.name]);
    }
  };
  // The top of each list ("Case" or "Party") is not shown as a page
  for (const top of body.flags[0].FlagDetails as RefDataFlag[]) {
    for (const child of top.childFlags ?? []) {
      walk(child, [child.name]);
    }
  }
  cache.set(level, types);
  return types;
}

// The flag type with this code. "Other" (OT0001) is offered under many headings, so otherUnder names the headings
// above the one wanted (none = the "Other" on the first page).
export async function caseFlagType(page: Page, level: 'CASE' | 'PARTY', code: string, otherUnder: string[] = []): Promise<CaseFlagType> {
  const types = await caseFlagTypes(page, level);
  const matches = types.filter((type) => type.code === code
    && (code !== 'OT0001' || type.path.slice(0, -1).join(' > ') === otherUnder.join(' > ')));
  expect(matches.length, `No ${level} case flag type ${code}${otherUnder.length ? ` under ${otherUnder.join(' > ')}` : ''} in reference data`).toBe(1);
  return matches[0];
}
