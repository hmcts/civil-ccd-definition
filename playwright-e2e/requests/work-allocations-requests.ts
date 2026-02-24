import BaseRequest from '../base/base-request';
import urls from '../config/urls';
import { AllMethodsStep } from '../decorators/test-steps';
import RequestOptions from '../models/api/request-options';
import User from '../models/user';
import WATask from '../models/wa-task';
import ServiceAuthProviderRequests from './service-auth-provider-requests';

@AllMethodsStep()
export default class WorkAllocationsRequests extends ServiceAuthProviderRequests(BaseRequest) {

  async retrieveTask(user: User, caseId: number, validTask: WATask): Promise<WATask> {
    const url = `${urls.waTaskMgmtApi}/task`;
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

    const responseJson = await super.retryRequestJson(url, requestOptions, {
      expectedStatus: 200,
      retries: 20,
      verifyResponse: async (responseJson) => {
        await super.expectResponseJsonToHaveProperty('tasks', responseJson);
        const tasks = responseJson.tasks;
        await super.expectResponseJsonArrayToContain([{ type: validTask.type }], tasks);
      },
    });
    const task = responseJson.tasks.find((task: any) => task.type === validTask.type);
    await super.expectResponseJsonToContain(validTask, task);
    return task as WATask;
  }

  async actionTask(
    user: User,
    waTaskId: string,
    action: 'claim' | 'unclaim' | 'assign' | 'unassign ' | 'complete',
  ) {
    const url = `${urls.waTaskMgmtApi}/task/${waTaskId}/${action}`;
    await super.retryRequest(
      url,
      { headers: await this.getRequestHeaders(user), method: 'POST' },
      { expectedStatus: 204 },
    );
    console.log(`Task ${waTaskId} assigned to user ${user.name}`);
  }
}
