import { test } from '@playwright/test';
import type { EventDefinition } from './event.ts';
import { eventDefinitions } from './eventFiles.ts';
import { JourneyContext, JourneyStep } from './journeyRunner.ts';
import { journeySettings } from './settings.ts';
import { ClosingProblems } from './steps/closingSteps.ts';
import { JourneyConfig } from './steps/journeyConfig.ts';

// Turns the events in playwright-tests/events (see event.ts) into journey steps, and puts them in a journey's steps:
// each after the step it names for the journey, or, for one that closes the claim, at the end. Each journey adds them
// to its steps before anything else reads them, as it does with withNeeds.

// Whether the event belongs to the journey
function inJourney(definition: EventDefinition<unknown>, c: JourneyConfig): boolean {
  return definition.closesClaim !== undefined || definition.after?.[c.caseType] !== undefined;
}

// Why the step is not run, known before the journey starts: the facts it needs, then the setting being off
function skipReasons(definition: EventDefinition<unknown>, c: JourneyConfig, on: boolean): Array<[boolean, string]> {
  return [
    ...(definition.onlyWhen ?? []).flatMap((fact) => c.facts[fact]),
    [!on, `${definition.id} is switched off (set ${definition.id}=Yes to run it)`],
  ];
}

function eventStep(definition: EventDefinition<unknown>, c: JourneyConfig, ctx: JourneyContext, closingProblems: ClosingProblems): JourneyStep {
  const { id, closesClaim } = definition;
  const on = journeySettings(c.caseType, c.scenarioEnv).get(id) === 'Yes';
  const step: JourneyStep = {
    name: id,
    title: definition.title,
    user: definition.user,
    closesClaim: closesClaim !== undefined ? true : undefined,
    skipIf: skipReasons(definition, c, on),
    invalidIf: (stops) => {
      if (!on) {
        return [];
      }
      // The journey skips the step where the claim has default judgment, which replaces the steps after it
      const replacedByDefaultJudgment: Array<[boolean, string]> = c.facts.withoutDefaultJudgment.some(([holds]) => holds)
        && step.skipIf?.some(([holds, reason]) => holds && c.facts.withoutDefaultJudgment.some(([, judgmentReason]) => judgmentReason === reason))
        ? [[true, `DEFAULT_JUDGMENT=Yes cannot be used with ${id}=Yes: the claim has default judgment instead of the defendants responding`]]
        : [];
      const closing = closesClaim !== undefined ? closingProblems(`${id}=Yes`, stops, closesClaim.offeredIn, definition.user === 'claimantSolicitor') : [];
      return [...replacedByDefaultJudgment, ...closing];
    },
    run: async ({ page, storageState, user }) => {
      if (closesClaim !== undefined) {
        test.skip(!closesClaim.offeredIn.includes(ctx.lastStateReached), `Skipping as ${id} is not offered in ${ctx.lastStateReached}`);
      }
      const answers = definition.answers?.(c);
      const stateBefore = ctx.lastStateReached;
      const inUi = definition.api === undefined || !ctx.useApi();
      await ctx.submitEvent(page, storageState, {
        api: definition.api === undefined ? undefined : () => definition.api!({ caseId: ctx.caseId, user, answers, claim: c }),
        ui: () => definition.ui({ page, answers, claim: c }),
        businessProcess: definition.expect?.businessProcess,
      });
      if (definition.check !== undefined) {
        const caseData = await ctx.testingEndpointHelper.getCaseData(ctx.caseId);
        await definition.check({ caseData, page, inUi, answers, claim: c });
      }
      await ctx.assertCaseState(definition.expect?.state ?? stateBefore);
    },
  };
  return step;
}

// The journey's steps with the events from playwright-tests/events that belong to it
export function withEvents(c: JourneyConfig, ctx: JourneyContext, closingProblems: ClosingProblems, steps: JourneyStep[]): JourneyStep[] {
  const result = [...steps];
  for (const definition of eventDefinitions.filter((candidate) => inJourney(candidate, c))) {
    const step = eventStep(definition, c, ctx, closingProblems);
    if (definition.closesClaim !== undefined) {
      result.push(step);
      continue;
    }
    const after = definition.after![c.caseType]!;
    const anchorIndex = result.findIndex((candidate) => candidate.name === after);
    if (anchorIndex === -1) {
      throw new Error(`playwright-tests/events: ${definition.id} comes after ${after}, which is not a step of the ${c.caseType.toLowerCase()} journey`);
    }
    // After the named step and any events already put after it
    let index = anchorIndex + 1;
    while (index < result.length && eventDefinitions.some((other) => other.id === result[index].name && other.after?.[c.caseType] === after)) {
      index++;
    }
    result.splice(index, 0, step);
  }
  return result;
}
