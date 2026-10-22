import { APIRequestContext } from '@playwright/test';
import { ccdDataStoreApiBaseUrl } from '../civilConfig.ts';

// A preview has its own role assignment service, named like its CCD data store. Any other environment uses its own.
// Override with ROLE_ASSIGNMENT_URL.
export const roleAssignmentUrl = process.env.ROLE_ASSIGNMENT_URL
  ?? (ccdDataStoreApiBaseUrl.includes('.preview.platform.hmcts.net')
    ? ccdDataStoreApiBaseUrl.replace('ccd-data-store-api-', 'am-role-assignment-')
    : `http://am-role-assignment-service-${process.env.ENVIRONMENT}.service.core-compute-${process.env.ENVIRONMENT}.internal`);

// How many role assignments to ask for at a time
const pageSize = 1000;

export type CaseRole = {
  actorId: string;
  roleName: string;
  roleCategory: string;
  created: string;
  attributes: { caseId: string; caseType: string };
};

// Every case role matching the query (such as { actorId: [uid] } or { attributes: { caseId: [caseId] } }), a page at
// a time. Sorting by id keeps the pages from overlapping. headers carry a user's access token and an S2S token.
export async function queryCaseRoles(apiRequestContext: APIRequestContext, headers: Record<string, string>, query: Record<string, unknown>): Promise<CaseRole[]> {
  const caseRoles: CaseRole[] = [];
  for (let pageNumber = 0; ; pageNumber++) {
    const response = await apiRequestContext.post(`${roleAssignmentUrl}/am/role-assignments/query`, {
      headers: { ...headers, size: String(pageSize), pageNumber: String(pageNumber), sort: 'id', direction: 'ASC' },
      data: { ...query, roleType: ['CASE'] },
    });
    if (!response.ok()) {
      throw new Error(`Reading role assignments from ${roleAssignmentUrl} returned ${response.status()}: ${(await response.text()).slice(0, 500)}`);
    }
    const page: { roleAssignmentResponse: CaseRole[] } = await response.json();
    caseRoles.push(...page.roleAssignmentResponse);
    if (page.roleAssignmentResponse.length < pageSize) {
      return caseRoles;
    }
  }
}
