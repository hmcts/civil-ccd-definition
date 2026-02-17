import BaseRequest from '../base/base-request';
import urls from '../config/urls';
import { AllMethodsStep } from '../decorators/test-steps';
import CaseRole from '../enums/case-role';
import RequestOptions from '../models/api/request-options';
import CCDCaseData, { UploadDocumentValue } from '../models/ccd/ccd-case-data';
import User from '../models/user';
import ServiceAuthProviderRequests from './service-auth-provider-requests';

@AllMethodsStep()
export default class WaRequests extends ServiceAuthProviderRequests(BaseRequest) {
  private waUrl = `${urls.waTaskMgmtApi}`;

  async retrieveWaTasks(user: User, caseId: number, taskType: string, expectedStatus = 200) {
    const url = `${this.waUrl}/task`;
    const body = {
      search_parameters: [
        { key: 'caseId', operator: 'IN', values: [caseId] },
        { key: 'jurisdiction', operator: 'IN', values: ['CIVIL'] },
        { key: 'state', operator: 'IN', values: ['assigned', 'unassigned'] },
      ],
      sorting_parameters: [{ sort_by: 'dueDate', sort_order: 'asc' }],
    };
    const requestOptions: RequestOptions = {
      headers: await this.getRequestHeaders(user),
      body,
      method: 'POST',
    };

    const allRetrievedTasks = await super.retryRequestJson(url, requestOptions, {
      expectedStatus,
      verifyResponse: async (json) => {
        const types = (json.tasks ?? []).map((t: any) => t.type);
        if (!types.includes(taskType)) {
          throw new Error(`Task ${taskType} not present yet.`);
        }
      },
    });
    console.log(`All associated tasks retrieved for caseId ${caseId}`);
    return allRetrievedTasks;
  }

  async actionTask(
    user: User,
    taskId: string,
    action: 'claim' | 'unclaim' | 'assign' | 'unassign ' | 'complete',
    expectedStatus = 204,
  ) {
    const url = `${this.waUrl}/task/${taskId}/${action}`;
    await super.retryRequest(
      url,
      { headers: await this.getRequestHeaders(user), method: 'POST' },
      { expectedStatus },
    );
    console.log(`Task ${taskId} assigned to user ${user.name} with '${action}'`);
  }
}
