// Sends the work allocation (WA) tasks Camunda has created to WA task management straight away, so they show in XUI
// without waiting up to 5 minutes for the wa-task-batch-initiation cron job:
//
//   ENV=preview PREVIEW_SERVICE=citizen-ui PR_NUMBER=8408 yarn trigger:wa-initiation <case id>
//   ENV=preview PREVIEW_SERVICE=citizen-ui PR_NUMBER=8408 yarn trigger:wa-initiation      (no case: run the job now)
//
// Camunda creates a task within seconds of the event that causes it, but it only reaches task management when the
// task monitor's INITIATION job runs. Given a case id (a claim or a general application), the script waits up to
// WA_TASK_WAIT_SECONDS (default 60) for Camunda to have a task for the case, lists the case's tasks, then runs the
// job. Without one it just runs the job, which sends every waiting task on the environment.
//
// Only a preview built with the pr-values:fullDeployment label has its own Camunda and task monitor. AAT's are on
// the internal network, so need the VPN.
import '../env.ts';
import { expect, request } from '@playwright/test';
import { workAllocation } from '../civilConfig.ts';
import { WaTaskHelper } from '../helpers/WaTaskHelper.ts';

type CamundaTask = { id: string; name: string; created: string };

// The case's open tasks in Camunda, with each one's task type (its taskId variable)
async function camundaTasks(caseId: string): Promise<Array<CamundaTask & { taskType?: string }>> {
  const camunda = await request.newContext();
  try {
    const response = await camunda.get(`${workAllocation.camundaUrl}/task?processVariables=caseId_eq_${caseId}`);
    let tasks: CamundaTask[];
    try {
      tasks = await response.json();
    } catch {
      // The environment's gateway sometimes answers with an error page instead of JSON, which counts as no task yet
      return [];
    }
    return await Promise.all(tasks.map(async (task) => {
      const variables = await (await camunda.get(`${workAllocation.camundaUrl}/task/${task.id}/variables`)).json();
      return { ...task, taskType: variables.taskId?.value };
    }));
  } finally {
    await camunda.dispose();
  }
}

(async () => {
  const caseId = process.argv[2]?.replace(/-/g, '');
  if (caseId !== undefined && !/^\d{16}$/.test(caseId)) {
    throw new Error('Give the 16 digit case id, or none, e.g. yarn trigger:wa-initiation 1793612849320891');
  }

  if (caseId) {
    let tasks: Awaited<ReturnType<typeof camundaTasks>> = [];
    try {
      await expect.poll(async () => {
        tasks = await camundaTasks(caseId);
        return tasks.length;
      }, { intervals: [1000], timeout: workAllocation.waitSeconds * 1000 }).toBeGreaterThan(0);
    } catch {
      throw new Error(`Camunda (${workAllocation.camundaUrl}) has no task for case ${caseId} after ${workAllocation.waitSeconds}s,`
        + ' so there is nothing to send. Check the event that should create it has finished.');
    }
    for (const task of tasks) {
      console.log(`Camunda task for case ${caseId}: ${task.taskType ?? '(no task type)'} "${task.name}", created ${task.created}`);
    }
  }

  await WaTaskHelper.runInitiationJob();
  console.log(`INITIATION job run on ${workAllocation.taskMonitorUrl}. Refresh the case's Tasks tab.`);
})().catch((error) => {
  console.error(`ERROR ${error instanceof Error ? error.message : error}`);
  process.exit(1);
});
