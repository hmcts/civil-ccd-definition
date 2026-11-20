// Lists the cases the legal rep users the tests use (claimant solicitor, respondent 1 solicitor and respondent 2
// solicitor) are assigned to, in every case type: claims (CIVIL), general applications (GENERALAPPLICATION) and any
// other, such as XUI's own test cases:
//
//   ENV=aat yarn list:assigned-cases
//   ENV=preview PREVIEW_SERVICE=citizen-ui PR_NUMBER=8265 yarn list:assigned-cases
//   ENV=aat yarn list:assigned-cases respondent2Solicitor          (only the users named)
//   ENV=aat yarn list:assigned-cases --summary                     (only how many cases each user has)
//   ENV=aat yarn list:assigned-cases --missing                     (also list assignments to cases that no longer exist)
//   ENV=aat yarn list:assigned-cases --csv assigned-cases.csv      (also saves one line per case to a CSV file)
//
// A user's assignments are their case roles in the role assignment service, which every environment has. Each case's
// state is then read from CCD, through its search where the environment has one (a preview does not) or else one case
// at a time. The role assignment service keeps assignments to cases CCD has since deleted; those are counted
// separately, as there is no case to see. Each line gives the case ID, case type, case role(s), state and when the
// user was assigned, oldest first.
import '../env.ts';
import fs from 'node:fs';
import { APIRequestContext, request } from '@playwright/test';
import { TokensHelper } from '../helpers/TokensHelper.ts';
import { CaseUserKey, caseUsers } from '../helpers/CaseUserRegistry.ts';
import { ccdDataStoreApiBaseUrl } from '../civilConfig.ts';
import { queryCaseRoles, roleAssignmentUrl } from '../helpers/RoleAssignmentHelper.ts';

// How many cases to ask CCD for at a time
const pageSize = 1000;
// How many cases to read at once where there is no search
const parallelReads = 10;

type AssignedCase = {
  caseId: string;
  caseType: string;
  roles: string[];
  assignedOn: string;
  state?: string;
};

// The state of each case found through CCD's search, by case ID. Returns undefined if the environment has no search.
async function searchStates(apiRequestContext: APIRequestContext, headers: Record<string, string>, cases: AssignedCase[]): Promise<Map<string, string> | undefined> {
  const states = new Map<string, string>();
  for (const caseType of [...new Set(cases.map((assigned) => assigned.caseType))]) {
    const caseIds = cases.filter((assigned) => assigned.caseType === caseType).map((assigned) => assigned.caseId);
    for (let start = 0; start < caseIds.length; start += pageSize) {
      const response = await apiRequestContext.post(`${ccdDataStoreApiBaseUrl}/searchCases?ctid=${caseType}`, {
        headers,
        data: {
          query: { terms: { 'reference.keyword': caseIds.slice(start, start + pageSize) } },
          _source: ['state'],
          size: pageSize,
        },
      });
      const body = await response.text();
      if (body.includes('index_not_found_exception')) {
        return undefined;
      }
      if (!response.ok()) {
        throw new Error(`Searching ${caseType} cases returned ${response.status()}: ${body.slice(0, 500)}`);
      }
      for (const found of (JSON.parse(body) as { cases: { id: number; state: string }[] }).cases) {
        states.set(String(found.id), found.state);
      }
    }
  }
  return states;
}

// The state of each case, read one case at a time, by case ID. A case CCD no longer has is left out.
async function readStates(apiRequestContext: APIRequestContext, headers: Record<string, string>, cases: AssignedCase[]): Promise<Map<string, string>> {
  const states = new Map<string, string>();
  for (let start = 0; start < cases.length; start += parallelReads) {
    await Promise.all(cases.slice(start, start + parallelReads).map(async ({ caseId }) => {
      const response = await apiRequestContext.get(`${ccdDataStoreApiBaseUrl}/cases/${caseId}`, {
        headers: { ...headers, experimental: 'true' },
      });
      if (response.status() === 404) {
        return;
      }
      if (!response.ok()) {
        throw new Error(`Reading case ${caseId} returned ${response.status()}: ${(await response.text()).slice(0, 500)}`);
      }
      states.set(caseId, (await response.json()).state);
    }));
  }
  return states;
}

async function listAssignedCases(userKey: CaseUserKey): Promise<AssignedCase[]> {
  const { accessToken, s2sToken, uid } = await new TokensHelper().getNonEventTokens(caseUsers[userKey]);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
    ServiceAuthorization: s2sToken,
  };
  const apiRequestContext = await request.newContext();
  try {
    // A user can hold more than one role on a case, such as on a general application
    const casesById = new Map<string, AssignedCase>();
    for (const { roleName, created, attributes } of await queryCaseRoles(apiRequestContext, headers, { actorId: [uid] })) {
      const assigned = casesById.get(attributes.caseId);
      if (assigned) {
        assigned.roles.push(roleName);
        assigned.assignedOn = assigned.assignedOn < created ? assigned.assignedOn : created;
      } else {
        casesById.set(attributes.caseId, { caseId: attributes.caseId, caseType: attributes.caseType, roles: [roleName], assignedOn: created });
      }
    }
    const cases = [...casesById.values()];
    const states = await searchStates(apiRequestContext, headers, cases) ?? await readStates(apiRequestContext, headers, cases);
    for (const assigned of cases) {
      assigned.state = states.get(assigned.caseId);
    }
    return cases.sort((a, b) => a.assignedOn.localeCompare(b.assignedOn));
  } finally {
    await apiRequestContext.dispose();
  }
}

function describe(assigned: AssignedCase): string {
  return `  ${assigned.caseId}  ${assigned.caseType.padEnd(18)}  ${assigned.roles.join(' ').padEnd(25)}  `
    + `${(assigned.state ?? 'NO LONGER EXISTS').padEnd(50)}  ${assigned.assignedOn}`;
}

(async () => {
  const args = process.argv.slice(2);
  const summaryOnly = args.includes('--summary');
  const listMissing = args.includes('--missing');
  const csvIndex = args.indexOf('--csv');
  const csvFile = csvIndex >= 0 ? args[csvIndex + 1] : undefined;
  if (csvIndex >= 0 && (!csvFile || csvFile.startsWith('--'))) {
    throw new Error('Give the file to save the CSV to, e.g. --csv assigned-cases.csv');
  }
  const userKeys = args.filter((arg, index) => !arg.startsWith('--') && (csvIndex < 0 || index !== csvIndex + 1));
  for (const userKey of userKeys) {
    if (!(userKey in caseUsers)) {
      throw new Error(`Unknown user "${userKey}". Choose from: ${Object.keys(caseUsers).join(', ')}`);
    }
  }
  const selected = (userKeys.length > 0 ? userKeys : Object.keys(caseUsers)) as CaseUserKey[];
  console.log(`Role assignments from ${roleAssignmentUrl}`);

  const csvLines = ['user,username,caseId,caseType,roles,state,assignedOn'];
  for (const userKey of selected) {
    const user = caseUsers[userKey];
    const cases = await listAssignedCases(userKey);
    const existing = cases.filter((assigned) => assigned.state);
    const missing = cases.filter((assigned) => !assigned.state);
    for (const assigned of listMissing ? cases : existing) {
      csvLines.push([userKey, user.username, assigned.caseId, assigned.caseType, assigned.roles.join(' '),
        assigned.state ?? 'NO LONGER EXISTS', assigned.assignedOn].join(','));
    }

    const counts = [...new Set(existing.map((assigned) => assigned.caseType))].sort()
      .map((caseType) => `${existing.filter((assigned) => assigned.caseType === caseType).length} ${caseType}`);
    console.log(`\n${user.name} (${user.username}): ${existing.length} case(s)${counts.length > 0 ? `, ${counts.join(', ')}` : ''}`
      + `, plus ${missing.length} assignment(s) to cases that no longer exist`);
    if (summaryOnly) {
      continue;
    }
    for (const assigned of listMissing ? cases : existing) {
      console.log(describe(assigned));
    }
  }
  if (csvFile) {
    fs.writeFileSync(csvFile, `${csvLines.join('\n')}\n`);
    console.log(`\nSaved ${csvLines.length - 1} case(s) to ${csvFile}`);
  }
})().catch((error) => {
  console.error(`ERROR ${error instanceof Error ? error.message : error}`);
  process.exit(1);
});
