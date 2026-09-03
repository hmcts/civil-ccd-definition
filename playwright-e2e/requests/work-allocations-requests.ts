import BaseRequest from '../base/base-request';
import urls from '../config/urls';
import { AllMethodsStep } from '../decorators/test-steps';
import RequestOptions from '../models/api/request-options';
import User from '../models/users/user';
import WATask from '../models/wa-task';
import ServiceAuthProviderRequests from './service-auth-provider-requests';

@AllMethodsStep()
export default class WorkAllocationsRequests extends ServiceAuthProviderRequests(BaseRequest) {
  async retrieveTask(user: User, validTask: WATask, caseId?: number): Promise<WATask> {
    console.log(`Retrieving task, caseId: ${caseId}, taskType: ${validTask.type}, user: ${user.name}`);
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
        await super.expectResponseJsonArrayToContain([{ type: validTask.type }], tasks, {
          message: `Ongoing task retrieval process, case id: ${caseId}, taskType: ${validTask.type}, user: ${user.name}`,
        });
      },
    });
    const task = responseJson.tasks.find((task: WATask) => 
      task.type === validTask.type && task.name === validTask.name);
    await super.expectResponseJsonToContain(validTask, task);
    console.log(`Successfully retrieved task, caseId: ${caseId}, taskType: ${validTask.type}, user: ${user.name}`);
    return task as WATask;
  }

  async assignTask(user: User, waTask: WATask) {
    console.log(`Assigning task, taskType: ${waTask.type}, taskId: ${waTask.id}, user: ${user.name}`);
    const url = `${urls.waTaskMgmtApi}/task/${waTask.id}/claim`;
    if (waTask.task_state !== 'assigned') {
      await super.retryRequest(
        url,
        { headers: await this.getRequestHeaders(user), method: 'POST' },
        { expectedStatus: 204 },
      );
      console.log(`Task ${waTask.id} assigned to user ${user.name}`);
    } else {
      await super.expectResponseJsonToHavePropertyValue('assignee', user.userId, waTask, {
        message: `Failed to assign taskType: ${waTask.type}, taskId: ${waTask.id}, to user: ${user.name}, task is already assigned to a user with a different userId: ${waTask.assignee}`,
      });
      console.log(`Task is already assigned to user: ${user.name}`);
    }
    console.log(`Successfully assigned Task, taskType: ${waTask.type}, taskId: ${waTask.id}, user: ${user.name}`);
  }

  async completeTask(user: User, waTask: WATask) {
    console.log(`Completing task, taskType: ${waTask.type}, taskId: ${waTask?.id}, user: ${user.name}`);
    const url = `${urls.waTaskMgmtApi}/task/${waTask.id}/complete`;
    await super.retryRequest(
      url,
      { headers: await this.getRequestHeaders(user), method: 'POST' },
      { expectedStatus: 204 },
    );
    console.log(`Successfully complete task, taskType: ${waTask.type}, taskId: ${waTask.id}, user: ${user.name}`);
  }
}
