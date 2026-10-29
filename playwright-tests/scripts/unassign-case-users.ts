// Unassigns every legal rep user the tests use (claimant solicitor, respondent 1 solicitor and respondent 2 solicitor)
// from one case, whatever case roles they hold on it:
//
//   ENV=aat yarn unassign:case-users 1792690738562907
//   ENV=preview PREVIEW_SERVICE=citizen-ui PR_NUMBER=8265 yarn unassign:case-users 1792-6907-3856-2907
//   ENV=aat yarn unassign:case-users 1792690738562907 --dry-run     (only show who is assigned)
//   ENV=preview PREVIEW_SERVICE=citizen-ui PR_NUMBER=8265 yarn unassign:case-users --all   (every case on the preview)
//
// The case's roles are read from the role assignment service. Each test user with a role on the case is unassigned
// through civil-service's testing support, as the run teardown does, and the role assignment service is then checked
// to make sure their roles have gone. Anyone else with a role on the case (such as a citizen or a real solicitor) is
// listed but left alone, as a user can only be unassigned with their own login. Any record of the case left for a
// later teardown to unassign is removed.
//
// --all unassigns every test user from every case they are assigned to on a preview (ENV=preview), such as before a PR's
// preview is reused or torn down. It is refused anywhere else, where it would also unassign cases other runs are using,
// and on a preview of XUI itself (PREVIEW_SERVICE=webapp), whose services are AAT's.
import '../env.ts';
import { request } from '@playwright/test';
import { TokensHelper } from '../helpers/TokensHelper.ts';
import { TestingEndPointHelper } from '../helpers/TestingEndPointHelper.ts';
import { CaseUserKey, CaseUserRegistry, caseUsers } from '../helpers/CaseUserRegistry.ts';
import { caseUnassignment } from '../civilConfig.ts';
import { CaseRole, queryCaseRoles, roleAssignmentUrl } from '../helpers/RoleAssignmentHelper.ts';

// The case roles on the case, read with the user's own login
async function caseRolesOnCase(userKey: CaseUserKey, caseId: string): Promise<{ uid: string; caseRoles: CaseRole[] }> {
  const { accessToken, s2sToken, uid } = await new TokensHelper().getNonEventTokens(caseUsers[userKey]);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
    ServiceAuthorization: s2sToken,
  };
  const apiRequestContext = await request.newContext();
  try {
    return { uid, caseRoles: await queryCaseRoles(apiRequestContext, headers, { attributes: { caseId: [caseId] } }) };
  } finally {
    await apiRequestContext.dispose();
  }
}

// The case roles the user holds on any case, read with their own login
async function caseRolesOfUser(userKey: CaseUserKey): Promise<{ uid: string; caseRoles: CaseRole[] }> {
  const { accessToken, s2sToken, uid } = await new TokensHelper().getNonEventTokens(caseUsers[userKey]);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
    ServiceAuthorization: s2sToken,
  };
  const apiRequestContext = await request.newContext();
  try {
    return { uid, caseRoles: await queryCaseRoles(apiRequestContext, headers, { actorId: [uid] }) };
  } finally {
    await apiRequestContext.dispose();
  }
}

// Unassigns every test user from every case they are assigned to on the preview, a batch of cases at a time, checks
// their roles have gone, and removes the teardown records of the cases they no longer hold
async function unassignAllOnPreview(dryRun: boolean) {
  if (process.env.ENV !== 'preview' || process.env.PREVIEW_SERVICE === 'webapp') {
    throw new Error('--all only works on a preview of a civil PR (ENV=preview with PREVIEW_SERVICE ccd, service or citizen-ui, and PR_NUMBER): '
      + 'anywhere else it would also unassign cases other runs are using');
  }
  console.log(`${dryRun ? 'Listing' : 'Unassigning'} every test user ${dryRun ? 'on' : 'from'} every case on preview ${process.env.PREVIEW_SERVICE} PR ${process.env.PR_NUMBER}`);
  const testingEndPointHelper = new TestingEndPointHelper();
  const failures: string[] = [];
  const unassigned = new Map<CaseUserKey, string[]>();
  for (const userKey of Object.keys(caseUsers) as CaseUserKey[]) {
    const user = caseUsers[userKey];
    // Every case type the user has roles on: claims (CIVIL) and their general applications (GENERALAPPLICATION) alike
    const { caseRoles } = await caseRolesOfUser(userKey);
    const caseTypes = new Map(caseRoles.map((caseRole) => [caseRole.attributes.caseId, caseRole.attributes.caseType]));
    const caseIds = [...caseTypes.keys()];
    const byType = [...new Set(caseTypes.values())].sort()
      .map((caseType) => `${[...caseTypes.values()].filter((type) => type === caseType).length} ${caseType}`);
    console.log(`${user.name} (${user.username}) is assigned to ${caseIds.length} case(s)${byType.length > 0 ? ` (${byType.join(', ')})` : ''}`
      + `${caseIds.length > 0 ? `: ${caseIds.join(', ')}` : ''}`);
    if (dryRun || caseIds.length === 0) {
      continue;
    }
    for (let start = 0; start < caseIds.length; start += caseUnassignment.batchSize) {
      try {
        await testingEndPointHelper.unassignUserFromCases(user, caseIds.slice(start, start + caseUnassignment.batchSize));
      } catch (error) {
        failures.push(error instanceof Error ? error.message : String(error));
      }
    }
    const remaining = [...new Set((await caseRolesOfUser(userKey)).caseRoles.map((caseRole) => caseRole.attributes.caseId))];
    if (remaining.length > 0) {
      failures.push(`${user.name} is still assigned to ${remaining.length} case(s): ${remaining.join(', ')}`);
    }
    unassigned.set(userKey, caseIds.filter((caseId) => !remaining.includes(caseId)));
  }
  if (dryRun) {
    return;
  }

  // Records of these cases would otherwise send the unassignment again at the next teardown
  for (const record of CaseUserRegistry.readAll()) {
    if (unassigned.get(record.userKey)?.includes(record.caseId)) {
      CaseUserRegistry.remove(record);
    }
  }
  if (failures.length > 0) {
    throw new Error(`Not every test user could be unassigned:\n${failures.join('\n\n')}`);
  }
  const total = [...unassigned.values()].reduce((count, caseIds) => count + caseIds.length, 0);
  console.log(`All test users unassigned from every case on the preview (${total} assignment(s) removed)`);
}

function rolesOf(caseRoles: CaseRole[], actorId: string): string {
  return caseRoles.filter((caseRole) => caseRole.actorId === actorId).map((caseRole) => caseRole.roleName).join(' ');
}

(async () => {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  if (args.includes('--all')) {
    console.log(`Role assignments from ${roleAssignmentUrl}`);
    await unassignAllOnPreview(dryRun);
    return;
  }
  const caseId = args.find((arg) => !arg.startsWith('--'))?.replace(/-/g, '');
  if (!CaseUserRegistry.isValidCaseId(caseId)) {
    throw new Error('Give the 16 digit case reference, e.g. yarn unassign:case-users 1792690738562907, or --all on a preview');
  }
  console.log(`Role assignments from ${roleAssignmentUrl}`);

  // Every role on the case, whoever holds it, and each test user's IDAM ID to pick out theirs
  const userIds = new Map<CaseUserKey, string>();
  for (const userKey of Object.keys(caseUsers) as CaseUserKey[]) {
    userIds.set(userKey, (await new TokensHelper().getNonEventTokens(caseUsers[userKey])).uid);
  }
  const { caseRoles } = await caseRolesOnCase('claimantSolicitor', caseId);
  const testUserIds = [...userIds.values()];
  const assignedUsers = [...userIds].filter(([, uid]) => caseRoles.some((caseRole) => caseRole.actorId === uid));
  const otherUserIds = [...new Set(caseRoles.map((caseRole) => caseRole.actorId))].filter((actorId) => !testUserIds.includes(actorId));

  if (assignedUsers.length === 0) {
    console.log(`None of the test users is assigned to case ${caseId}`);
  }
  for (const [userKey, uid] of assignedUsers) {
    console.log(`${caseUsers[userKey].name} (${caseUsers[userKey].username}) is assigned to case ${caseId} as ${rolesOf(caseRoles, uid)}`);
  }
  for (const actorId of otherUserIds) {
    console.log(`Leaving user ${actorId} assigned as ${rolesOf(caseRoles, actorId)}: not a test user, so they can only be unassigned with their own login`);
  }
  if (dryRun) {
    return;
  }

  const testingEndPointHelper = new TestingEndPointHelper();
  const failures: string[] = [];
  for (const [userKey, uid] of assignedUsers) {
    try {
      await testingEndPointHelper.unassignUserFromCases(caseUsers[userKey], [caseId]);
      const remaining = rolesOf((await caseRolesOnCase(userKey, caseId)).caseRoles, uid);
      if (remaining) {
        failures.push(`${caseUsers[userKey].name} still holds ${remaining} on case ${caseId}`);
      }
    } catch (error) {
      failures.push(error instanceof Error ? error.message : String(error));
    }
  }

  // A record left by an earlier run would otherwise send the unassignment again at the next teardown
  const records = CaseUserRegistry.readAll()
    .filter((record) => record.caseId === caseId && !failures.some((failure) => failure.includes(caseUsers[record.userKey].name)));
  for (const record of records) {
    CaseUserRegistry.remove(record);
    console.log(`Removed the teardown record of ${caseUsers[record.userKey].name} on case ${caseId}`);
  }

  if (failures.length > 0) {
    throw new Error(`Not every test user could be unassigned:\n${failures.join('\n\n')}`);
  }
  if (assignedUsers.length > 0) {
    console.log(`All test users unassigned from case ${caseId}`);
  }
})().catch((error) => {
  console.error(`ERROR ${error instanceof Error ? error.message : error}`);
  process.exit(1);
});
