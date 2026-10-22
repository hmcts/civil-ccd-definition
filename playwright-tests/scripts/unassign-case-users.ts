// Unassigns every legal rep user the tests use (claimant solicitor, respondent 1 solicitor and respondent 2 solicitor)
// from one case, whatever case roles they hold on it:
//
//   ENV=aat yarn unassign:case-users 1792690738562907
//   ENV=preview PREVIEW_SERVICE=citizen-ui PR_NUMBER=8265 yarn unassign:case-users 1792-6907-3856-2907
//   ENV=aat yarn unassign:case-users 1792690738562907 --dry-run     (only show who is assigned)
//
// The case's roles are read from the role assignment service. Each test user with a role on the case is unassigned
// through civil-service's testing support, as the run teardown does, and the role assignment service is then checked
// to make sure their roles have gone. Anyone else with a role on the case (such as a citizen or a real solicitor) is
// listed but left alone, as a user can only be unassigned with their own login. Any record of the case left for a
// later teardown to unassign is removed.
import '../env.ts';
import { request } from '@playwright/test';
import { TokensHelper } from '../helpers/TokensHelper.ts';
import { TestingEndPointHelper } from '../helpers/TestingEndPointHelper.ts';
import { CaseUserKey, CaseUserRegistry, caseUsers } from '../helpers/CaseUserRegistry.ts';
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

function rolesOf(caseRoles: CaseRole[], actorId: string): string {
  return caseRoles.filter((caseRole) => caseRole.actorId === actorId).map((caseRole) => caseRole.roleName).join(' ');
}

(async () => {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const caseId = args.find((arg) => !arg.startsWith('--'))?.replace(/-/g, '');
  if (!CaseUserRegistry.isValidCaseId(caseId)) {
    throw new Error('Give the 16 digit case reference, e.g. yarn unassign:case-users 1792690738562907');
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
