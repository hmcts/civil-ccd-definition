# Sending work allocation tasks to XUI straight away

`trigger-wa-initiation.ts` runs the WA task monitor's INITIATION job now, instead of waiting for the `wa-task-batch-initiation` cron job, which runs every 5 minutes.

Camunda creates a work allocation task within seconds of the event that causes it, such as making a general application. But the task only reaches WA task management, and so the case's Tasks tab in XUI, when the INITIATION job runs. Run every command from the repository root.

## Commands

Wait for Camunda to have a task for a case (a claim or a general application), then send it:

```
ENV=preview PREVIEW_SERVICE=citizen-ui PR_NUMBER=8408 yarn trigger:wa-initiation 1793612849320891
```

Just run the job, which sends every task waiting on the environment:

```
ENV=preview PREVIEW_SERVICE=citizen-ui PR_NUMBER=8408 yarn trigger:wa-initiation
```

The case reference can be given with or without dashes.

Only a preview built with the `pr-values:fullDeployment` label has its own Camunda and task monitor. On AAT both are on the internal network, so the VPN is needed.

## Settings

| Setting | What it does |
|---|---|
| `ENV` | aat, demo, ithc or preview. Required. |
| `PREVIEW_SERVICE`, `PR_NUMBER` | Needed with ENV=preview, as for a test run. |
| `WA_TASK_WAIT_SECONDS` | How long to wait for Camunda to create a task for the case. Default 60. |
| `CAMUNDA_URL`, `WA_TASK_MONITOR_URL` | Use this Camunda or task monitor instead of the environment's own. |

## Output

```
Camunda task for case 1793612849320891: JudgeDecideOnApplication "Application for multiple types - Small Claims", created 2026-11-02T10:11:52.889+0000
WA: INITIATION job run
INITIATION job run on https://wa-task-monitor-civil-citizen-ui-pr-8408.preview.platform.hmcts.net. Refresh the case's Tasks tab.
```

If Camunda has no task for the case after `WA_TASK_WAIT_SECONDS`, the script stops with an error and does not run the job. Check that the event that should create the task has finished.
