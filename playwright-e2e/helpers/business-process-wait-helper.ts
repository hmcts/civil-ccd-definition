import businessProcessTaskCounts from '../constants/camunda/business-process-task-counts';
import { BusinessProcess } from '../models/ccd-case-data';

export enum BusinessProcessWaitState {
  // READY or DISPATCHED: the process has not been picked up by an external task worker yet.
  NOT_PICKED_UP = 'NOT_PICKED_UP',
  // STARTED and the last activity changed recently.
  PROGRESSING = 'PROGRESSING',
  // STARTED but the last activity has not changed for STALL_THRESHOLD_MS.
  STALLED = 'STALLED',
  // The response has no business process, or the business process has no status.
  NO_STATUS = 'NO_STATUS',
}

export default class BusinessProcessWaitTracker {
  static readonly DEFAULT_BUDGET_MS = 75_000;
  static readonly MAX_BUDGET_MS = 300_000;
  private static readonly BASE_BUDGET_MS = 30_000;
  private static readonly BUDGET_PER_TASK_MS = 8_000;
  private static readonly STALL_THRESHOLD_MS = 30_000;

  private readonly startedAt = Date.now();
  private lastChangeAt = this.startedAt;
  private lastSnapshot: string | undefined;
  private readonly activitiesSeen = new Set<string>();
  private camundaEvent: string | undefined;
  private eventBudgetMs = BusinessProcessWaitTracker.DEFAULT_BUDGET_MS;

  constructor(private readonly timeoutMs?: number) {}

  static budgetFor(camundaEvent?: string): number {
    const taskCount = camundaEvent ? businessProcessTaskCounts[camundaEvent] : undefined;
    if (taskCount === undefined) return BusinessProcessWaitTracker.DEFAULT_BUDGET_MS;
    const budget =
      BusinessProcessWaitTracker.BASE_BUDGET_MS +
      taskCount * BusinessProcessWaitTracker.BUDGET_PER_TASK_MS;
    return Math.min(
      Math.max(budget, BusinessProcessWaitTracker.DEFAULT_BUDGET_MS),
      BusinessProcessWaitTracker.MAX_BUDGET_MS,
    );
  }

  get budgetMs(): number {
    return this.timeoutMs ?? this.eventBudgetMs;
  }

  get elapsedMs(): number {
    return Date.now() - this.startedAt;
  }

  isOverBudget(): boolean {
    return this.elapsedMs >= this.budgetMs;
  }

  record(businessProcess?: BusinessProcess) {
    if (businessProcess?.camundaEvent && businessProcess.camundaEvent !== this.camundaEvent) {
      this.camundaEvent = businessProcess.camundaEvent;
      // A chained process can replace the one we started waiting on, so keep the larger budget.
      this.eventBudgetMs = Math.max(
        this.eventBudgetMs,
        BusinessProcessWaitTracker.budgetFor(this.camundaEvent),
      );
    }
    const snapshot = `${businessProcess?.status}:${businessProcess?.activityId}`;
    if (snapshot !== this.lastSnapshot) {
      this.lastSnapshot = snapshot;
      this.lastChangeAt = Date.now();
    }
    if (businessProcess?.status === 'STARTED' && businessProcess.activityId) {
      this.activitiesSeen.add(businessProcess.activityId);
    }
  }

  classify(businessProcess?: BusinessProcess): BusinessProcessWaitState {
    switch (businessProcess?.status) {
      case 'READY':
      case 'DISPATCHED':
        return BusinessProcessWaitState.NOT_PICKED_UP;
      case 'STARTED':
        return Date.now() - this.lastChangeAt < BusinessProcessWaitTracker.STALL_THRESHOLD_MS
          ? BusinessProcessWaitState.PROGRESSING
          : BusinessProcessWaitState.STALLED;
      default:
        return BusinessProcessWaitState.NO_STATUS;
    }
  }

  describe(
    businessProcess: BusinessProcess | undefined,
    caseId?: number,
    overBudget = this.isOverBudget(),
  ): string {
    const toSeconds = (ms: number) => Math.round(ms / 1000);
    const state = this.classify(businessProcess);
    const prefix = overBudget ? 'Business process timeout' : 'Business process ongoing';
    const event = businessProcess?.camundaEvent ?? this.camundaEvent;
    const taskCount = event ? businessProcessTaskCounts[event] : undefined;
    const unchangedFor = toSeconds(Date.now() - this.lastChangeAt);
    const details = [
      `${prefix} [${state}]: ${event ?? 'unknown event'}` +
        (taskCount ? ` (expected ~${taskCount} tasks)` : ''),
      `status: ${businessProcess?.status}`,
      `caseId: ${caseId}`,
      `waited ${toSeconds(this.elapsedMs)}s of ${toSeconds(this.budgetMs)}s budget`,
    ];
    if (state === BusinessProcessWaitState.NOT_PICKED_UP) {
      details.push(`not picked up for at least ${unchangedFor}s, readyOn: ${businessProcess?.readyOn}`);
    } else {
      details.push(
        `activities seen: ${this.activitiesSeen.size}`,
        `last activity: ${businessProcess?.activityId} unchanged for ${unchangedFor}s`,
      );
    }
    details.push(`process instance: ${businessProcess?.processInstanceId}`);
    return details.join(', ');
  }
}
