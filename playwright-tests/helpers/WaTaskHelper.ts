import { expect, Page, request } from '@playwright/test';
import { authProviderApiBaseUrl, envUrl, workAllocation } from '../civilConfig.ts';
import CaseType from '../enums/caseType.ts';

// Some events can only be started by a user who has a work allocation (WA) task for them assigned, for example the
// judge's Standard Direction Order (CREATE_SDO) needs the FastTrackDirections task. Without one, XUI shows
// "No task available", even when the event is opened at its URL.
//
// XUI only asks WA about this where WA is switched on for CIVIL, such as a preview built with the
// pr-values:fullDeployment label. There, Camunda creates the task within seconds of the event that causes it, but
// the task only reaches WA task management (and so XUI) when a cron job runs, every 5 minutes. To save that wait,
// this helper runs the same job straight away and then claims the task for the signed-in user.
//
// The XUI calls use the page's own session, so they are made as the user signed in to the page. The tasks are on a
// claim (CIVIL) unless another case type is given, such as a general application's.
export class WaTaskHelper {
  constructor(public page: Page, private caseType: CaseType = CaseType.CIVIL) {}

  // Which of taskTypes Camunda has created for the case, waiting up to waitSeconds for one of them. For a case where
  // work allocation's rules decide who does the work, such as a general application, which a judge or a legal adviser
  // decides depending on the court and the application. Undefined if none of them is created.
  static async createdTaskType(caseId: string, taskTypes: string[], waitSeconds: number = workAllocation.waitSeconds): Promise<string | undefined> {
    const camunda = await request.newContext();
    let created: string | undefined;
    try {
      await expect.poll(async () => {
        const response = await camunda.get(`${workAllocation.camundaUrl}/task?processVariables=caseId_eq_${caseId}`);
        try {
          const tasks: Array<{ id: string }> = await response.json();
          for (const task of tasks) {
            const variables = await (await camunda.get(`${workAllocation.camundaUrl}/task/${task.id}/variables`)).json();
            if (taskTypes.includes(variables.taskId?.value)) {
              created = variables.taskId.value;
            }
          }
        } catch {
          // The environment's gateway sometimes answers with an error page instead of JSON, which counts as no task yet
        }
        return created;
      }, { intervals: [1000], timeout: waitSeconds * 1000 }).toBeDefined();
    } catch {
      console.log(`WA: Camunda created none of ${taskTypes.join(', ')} for case ${caseId} within ${waitSeconds}s`);
    } finally {
      await camunda.dispose();
    }
    if (created) {
      console.log(`WA: Camunda has created the ${created} task for case ${caseId}`);
    }
    return created;
  }

  // Makes sure the signed-in user has the taskType task assigned, so they can start eventId on the case, and returns
  // the task's ID. Does nothing, and returns undefined, where XUI does not need a task for the event.
  async assignTaskForEvent(caseId: string, eventId: string, taskType: string): Promise<string | undefined> {
    if (!(await this.isTaskRequired(caseId, eventId))) {
      console.log(`WA: ${eventId} does not need a task here, so no task is assigned`);
      return undefined;
    }

    // 1. Wait for Camunda to create the task
    await this.waitForCamundaTask(caseId, taskType);

    // 2. Remove the tasks Camunda has cancelled from WA task management, and send the new task to it, now rather
    // than waiting for the cron jobs. A cancelled task stays in task management until the TERMINATION job runs, and
    // XUI will not start an event that two active tasks could complete ("Multiple tasks exist"), as when lifting a
    // stay creates a new directions task while the one the stay cancelled is still there.
    await WaTaskHelper.runTaskMonitorJob('TERMINATION');
    await WaTaskHelper.runInitiationJob();

    // 3. Wait for the task to reach WA task management, then claim it for the signed-in user
    const task = await this.waitForXuiTask(caseId, eventId, taskType);
    if (task.task_state === 'assigned') {
      console.log(`WA: ${taskType} task ${task.id} is already assigned`);
      return task.id;
    }
    const response = await this.page.request.post(`${envUrl}/workallocation/task/${task.id}/claim`, {
      data: {},
      headers: await this.xsrfHeader(),
    });
    expect(response.ok(), `Claiming ${taskType} task ${task.id} returned ${response.status()}`).toBeTruthy();
    console.log(`WA: ${taskType} task ${task.id} claimed`);
    return task.id;
  }

  // Completes the signed-in user's task, as XUI does when an event started from the task is submitted. Needed where an
  // event is sent through the CCD API instead and work allocation does not complete the task itself, such as a query
  // response (queryManagementRespondQuery): its task would otherwise stay open beside the next one.
  async completeTask(taskId: string) {
    const response = await this.page.request.post(`${envUrl}/workallocation/task/${taskId}/complete`, {
      data: {},
      headers: await this.xsrfHeader(),
    });
    expect(response.ok(), `Completing task ${taskId} returned ${response.status()}`).toBeTruthy();
    console.log(`WA: task ${taskId} completed`);
  }

  // Asks XUI the same question it asks when an event is opened: does this event need a task?
  private async isTaskRequired(caseId: string, eventId: string): Promise<boolean> {
    const response = await this.page.request.get(
      `${envUrl}/workallocation/case/tasks/${caseId}/event/${eventId}/caseType/${this.caseType}/jurisdiction/CIVIL`,
      { headers: await this.xsrfHeader() },
    );
    expect(response.ok(), `Checking whether ${eventId} needs a task returned ${response.status()}`).toBeTruthy();
    const body = await response.json();
    return body.task_required_for_event === true;
  }

  // Camunda keeps the task type in the task's taskId variable
  private async waitForCamundaTask(caseId: string, taskType: string) {
    const camunda = await request.newContext();
    try {
      await expect.poll(async () => {
        const response = await camunda.get(
          `${workAllocation.camundaUrl}/task?processVariables=caseId_eq_${caseId},taskId_eq_${taskType}`,
        );
        // The environment's gateway sometimes answers with an error page instead of JSON, which counts as no task yet
        const body = await response.text();
        try {
          return JSON.parse(body).length;
        } catch {
          console.log(`WA: Camunda's task list answered with HTTP ${response.status()} that is not JSON, asking again: ${body.slice(0, 80).replace(/\s+/g, ' ')}`);
          return 0;
        }
      }, {
        intervals: [1000],
        timeout: workAllocation.waitSeconds * 1000,
        message: `Camunda did not create a ${taskType} task for case ${caseId}`,
      }).toBeGreaterThan(0);
      console.log(`WA: Camunda has created the ${taskType} task`);
    } finally {
      await camunda.dispose();
    }
  }

  // Runs the WA task monitor's INITIATION job, which the wa-task-batch-initiation cron job runs every 5 minutes
  static async runInitiationJob() {
    await WaTaskHelper.runTaskMonitorJob('INITIATION');
  }

  // Runs one of the WA task monitor's jobs now: INITIATION sends new Camunda tasks to task management, TERMINATION
  // removes the ones Camunda has cancelled or completed. The task monitor only accepts calls from the wa_task_monitor
  // service, so a token for it is leased from the test S2S service.
  static async runTaskMonitorJob(jobName: 'INITIATION' | 'TERMINATION') {
    const api = await request.newContext();
    try {
      const lease = await api.post(`${authProviderApiBaseUrl}/testing-support/lease`, {
        data: { microservice: 'wa_task_monitor' },
      });
      expect(lease.ok(), `Leasing a wa_task_monitor S2S token returned ${lease.status()}`).toBeTruthy();
      const s2sToken = await lease.text();

      const response = await api.post(`${workAllocation.taskMonitorUrl}/monitor/tasks/jobs`, {
        data: { job_details: { name: jobName } },
        headers: { ServiceAuthorization: `Bearer ${s2sToken}` },
      });
      expect(response.ok(), `Running the WA ${jobName} job returned ${response.status()}`).toBeTruthy();
      console.log(`WA: ${jobName} job run`);
    } finally {
      await api.dispose();
    }
  }

  // Waits for XUI to offer the task for the event, asking the same question XUI asks when the event is opened (the
  // tasks the signed-in user can do it with). The case's task list is not used, as some XUI versions return it empty.
  private async waitForXuiTask(caseId: string, eventId: string, taskType: string) {
    let task;
    await expect.poll(async () => {
      const response = await this.page.request.get(
        `${envUrl}/workallocation/case/tasks/${caseId}/event/${eventId}/caseType/${this.caseType}/jurisdiction/CIVIL`,
        { headers: await this.xsrfHeader() },
      );
      const tasks = response.ok() ? (await response.json()).tasks ?? [] : [];
      // Only once there is one task of the type, so a cancelled one still being removed is not claimed instead
      const ofType = tasks.filter((t) => t.type === taskType);
      task = ofType.length === 1 ? ofType[0] : undefined;
      return task !== undefined;
    }, {
      intervals: [1000],
      timeout: workAllocation.waitSeconds * 1000,
      message: `The ${taskType} task for case ${caseId} did not reach WA task management`,
    }).toBe(true);
    return task;
  }

  // XUI rejects POSTs without its XSRF token, which it keeps in a cookie
  private async xsrfHeader() {
    const cookies = await this.page.context().cookies();
    const xsrf = cookies.find((cookie) => cookie.name === 'XSRF-TOKEN');
    return { 'X-XSRF-TOKEN': xsrf?.value ?? '' };
  }
}
