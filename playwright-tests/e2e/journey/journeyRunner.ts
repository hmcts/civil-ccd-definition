import { expect, Page, test } from '@playwright/test';
import { envUrl } from '../../civilConfig.ts';
import { PageHelper } from '../../helpers/PageHelper.ts';
import { ButtonHelper } from '../../helpers/ButtonHelper.ts';
import { TabsHelper } from '../../helpers/TabsHelper.ts';
import { TestingEndPointHelper } from '../../helpers/TestingEndPointHelper.ts';
import { CreateCasePage } from '../page-objects/pages/createCase_page.ts';
import { PaymentPage } from '../page-objects/pages/payment_page.ts';
import PaymentMethod from '../../enums/paymentMethod.ts';
import caseStates from '../../enums/caseStates.ts';
import GaCaseStates from '../../enums/gaCaseStates.ts';
import claimTypes from '../../enums/claim-types.ts';
import { SessionHelper, sessionUserFor, sessionUsers, SessionUserKey } from '../../helpers/SessionHelper.ts';
import { requirePlaywrightTestsEnv } from '../../env.ts';
import { Fact } from './claimFacts.ts';

export interface StepArgs {
  page: Page;
  storageState: unknown;
  // The user the step runs as (its JourneyStep user), for the steps that send the event through the API as them
  user: SessionUserKey;
}

// One step of a journey: an event done by one user, run as its own test. The UI steps of the event live in its class
// under flows/events/ui, so the same class can be used by any journey or branch.
export interface JourneyStep {
  // The step's name, which STOP_AFTER_TEST can use. Unlike a test number it does not change when steps are added.
  name: string;
  // Steps that are the same event done by several users, such as each solicitor's evidence upload, share a group name.
  // They sit next to each other in the list and run as one numbered test, which STOP_AFTER_TEST can also use.
  group?: string;
  title: string;
  // The user the step runs as, from their saved session
  user: SessionUserKey;
  // The facts about the claim the step needs (c.facts, see claimFacts.ts). withNeeds adds them to skipIf, so a step
  // whose claim does not have one is left out of the run with the fact's reason.
  needs?: Fact[];
  // Reasons the step does not apply to this journey, each a [condition, reason] pair. They are known before the
  // journey starts, so a step with one that holds is left out of the run (which also means beforeEach never opens the
  // case as a user who is not signed in for this claim type).
  skipIf?: Array<[boolean, string]>;
  // A step that closes the claim (settling or discontinuing it), which runs even once STOP_AT_STATE or STOP_AFTER_TEST
  // has stopped the journey, so the claim can be closed wherever the journey stops
  closesClaim?: boolean;
  // Settings the step cannot run with, each a [condition, problem] pair, given how the run is stopped. They are checked
  // before the journey starts, so an invalid combination of settings fails the run straight away, with every problem
  // listed, rather than being found part way through.
  invalidIf?: (stops: JourneyStops) => Array<[boolean, string]>;
  run: (args: StepArgs) => Promise<void>;
}

// An event for JourneyContext.submitEvent: its API and UI versions, and what to check once it is submitted
export interface SubmittedEvent<A, U> {
  // Submits the event through its API class (flows/events/api), for the steps before API_UNTIL
  api?: () => Promise<A>;
  // Submits the event through its UI class (flows/events/ui)
  ui: () => Promise<U>;
  // The page the UI version reopens if the user's session ends part way (the case by default)
  reopenUrl?: string;
  // The business process civil-service starts for the event, to wait for once it is submitted
  businessProcess?: string;
  // The state the claim should be in once the event (and its business process) is done
  expectState?: caseStates;
}

// A journey's steps with the facts each needs added to its skipIf, before anything reads or copies a step's skipIf (the
// steps put after another step take its skip reasons)
export function withNeeds(steps: JourneyStep[]): JourneyStep[] {
  return steps.map(({ needs, ...step }) => (needs === undefined ? step : { ...step, skipIf: [...needs.flat(), ...(step.skipIf ?? [])] }));
}

// Puts a set of steps after the step a setting names, such as REFUND_AFTER=CREATE_CLAIM:
//  - when the setting asks for them (on), the steps build gives go after that step
//  - when it does not, a placeholder step is listed there, skipped with the reason off gives, so the journey still
//    shows it as switched off
//  - when the named step is not one they can go after (not a step, one that closes the claim, one before earliest,
//    or one problem rejects), a placeholder is listed before the steps that close the claim, which fails the run
//    before it starts if the setting is on, and is left out of it if not
// rest replaces the steps after the named one, for steps that change the rest of the journey (a notice of change
// carries the claim on as another claim type).
export function insertAfterStep(steps: JourneyStep[], options: {
  // The setting that names the step, and the step it names, for the messages
  setting: string;
  after: string;
  // The first step they can go after (by default any step)
  earliest?: string;
  // The step listed in their place when they are switched off or cannot go after the named step
  placeholder: Pick<JourneyStep, 'name' | 'title' | 'user'>;
  // Whether the settings ask for the steps, and why they are switched off when they do not
  on: boolean;
  off: string;
  // Why the steps cannot go after the named step for another reason, or undefined when they can
  problem?: (anchorIndex: number) => string | undefined;
  build: (anchor: JourneyStep) => JourneyStep[];
  rest?: (anchor: JourneyStep) => JourneyStep[];
}): JourneyStep[] {
  const placeholder = (skipIf: Array<[boolean, string]>, invalidIf?: JourneyStep['invalidIf']): JourneyStep => ({
    ...options.placeholder, skipIf, invalidIf, run: async () => {},
  });
  const earliestIndex = options.earliest === undefined ? 0 : steps.findIndex((step) => step.name === options.earliest);
  const anchorIndex = steps.findIndex((step) => step.name === options.after);
  const anchor = steps[anchorIndex];
  const allowed = steps.slice(earliestIndex).filter((step) => !step.closesClaim).map((step) => step.name);

  const problem = anchor === undefined || anchorIndex < earliestIndex || anchor.closesClaim
    ? `Invalid ${options.setting} value: ${options.after}. It must be ${options.earliest === undefined ? 'a step' : `one of the steps from ${options.earliest} on`} that does not close the claim: ${allowed.join(', ')}.`
    : options.problem?.(anchorIndex);
  if (problem !== undefined) {
    const firstClosing = steps.findIndex((step) => step.closesClaim);
    const at = firstClosing === -1 ? steps.length : firstClosing;
    return [...steps.slice(0, at), placeholder([[true, problem]], () => [[options.on, problem]]), ...steps.slice(at)];
  }
  const before = steps.slice(0, anchorIndex + 1);
  const after = steps.slice(anchorIndex + 1);
  if (!options.on) {
    return [...before, placeholder([[true, options.off]]), ...after];
  }
  return [...before, ...options.build(anchor), ...(options.rest ? options.rest(anchor) : after)];
}

// How the run is stopped early, if it is (see defineJourney)
export interface JourneyStops {
  stopAtState?: caseStates;
  stopAfterTest?: string;
}

// What the steps of one journey share: the claim, the helpers for the test's page and the checks on the claim's state
export class JourneyContext {
  caseId = '';
  pageHelper: PageHelper;
  buttonHelper: ButtonHelper;
  tabsHelper: TabsHelper;
  createCasePage: CreateCasePage;
  testingEndpointHelper: TestingEndPointHelper;
  stopAtStateReached = false;
  apiUntilStateReached = false;
  lastStateReached: caseStates | undefined;
  // The defendants (1 and 2) whose solicitor was given the case by a notice of change, so is not assigned to it again
  defendantsGivenSolicitorByNoc = new Set<number>();
  // The journey's general application, which is a case of its own linked to the claim, once it has been made
  gaCaseId = '';

  // STOP_AT_STATE: the state at which the journey stops, and API_UNTIL: the state up to which the steps that have an
  // API version are done through the CCD API (see defineJourney)
  constructor(readonly stopAtState: caseStates | undefined, readonly apiUntilState?: caseStates) {}

  // Whether a step with an API version should use it: API_UNTIL is set and the claim has not reached that state yet
  useApi(): boolean {
    return this.apiUntilState !== undefined && !this.apiUntilStateReached;
  }

  caseUrl(): string {
    return envUrl + '/cases/case-details/' + this.caseId;
  }

  gaCaseUrl(): string {
    return `${envUrl}/cases/case-details/CIVIL/GENERALAPPLICATION/${this.gaCaseId}`;
  }

  // Sets up the helpers for a test's page
  usePage(page: Page) {
    this.pageHelper = new PageHelper(page);
    this.buttonHelper = new ButtonHelper(page);
    this.createCasePage = new CreateCasePage(page);
    this.tabsHelper = new TabsHelper(page);
    this.testingEndpointHelper = new TestingEndPointHelper();
  }

  // Runs the UI steps of an event as the test's user (from its storageState). If their XUI session ends before the
  // event is submitted, they are signed in again, reopenUrl (the case by default) is opened again and the steps are
  // run again from the start.
  async runEvent(page: Page, storageState: unknown, action: () => Promise<void>, reopenUrl: string = this.caseUrl()) {
    await new SessionHelper(page).runWithSessionRecovery(sessionUserFor(storageState), reopenUrl, action);
  }

  // Submits an event the way most steps do: through its API class while API_UNTIL has not been reached (useApi), and
  // otherwise through its UI class, as the test's user with their session recovered if it ends (runEvent). An event
  // with no API version leaves out api and always uses the UI. Then, where given, waits for the business process
  // civil-service starts for the event and checks the claim's state. Returns what the API or UI class returned.
  async submitEvent<A, U>(page: Page, storageState: unknown, event: SubmittedEvent<A, U>): Promise<A | U> {
    // Left unset where the session ended after the UI version was saved, as runEvent then does not run it again
    let result!: A | U;
    if (event.api !== undefined && this.useApi()) {
      result = await event.api();
    } else {
      await this.runEvent(page, storageState, async () => {
        result = await event.ui();
      }, event.reopenUrl);
    }
    if (event.businessProcess !== undefined) {
      await this.testingEndpointHelper.waitForCamundaProcessToFinish(this.caseId, event.businessProcess);
    }
    if (event.expectState !== undefined) {
      await this.assertCaseState(event.expectState);
    }
    return result;
  }

  // Pays a fee in the UI, from its row of the Service Request tab, by PBA or by card. pbaDetailsField is the case
  // field that holds the fee's service request (claimIssuedPBADetails or hearingFeePBADetails).
  async payFeeInUi(page: Page, storageState: unknown, pbaDetailsField: string, paymentMethod: PaymentMethod) {
    const serviceRequestReference = await this.testingEndpointHelper.waitForServiceRequestReference(this.caseId, pbaDetailsField);
    await this.runEvent(page, storageState, async () => {
      if (!page.url().includes(this.caseId)) {
        await this.pageHelper.gotoAndWaitForXui(this.caseUrl());
      }
      await new PaymentPage(page).makePayment(paymentMethod, serviceRequestReference);
    });
  }

  // Checks the general application is in the expected state. Its states are its own, so STOP_AT_STATE and API_UNTIL,
  // which are claim states, do not look at them.
  async assertGaCaseState(state: GaCaseStates) {
    expect(this.gaCaseId, 'No general application has been made yet').toBeTruthy();
    await this.testingEndpointHelper.assertCaseState(this.gaCaseId, state);
  }

  // When the run stops as the claim waits for the defendants (STOP_AT_STATE=AWAITING_RESPONDENT_ACKNOWLEDGEMENT), gives
  // the defendants' solicitors the case, as the steps that would have done so are skipped. The claim can then be carried
  // on by hand as them (with KEEP_CASE_ASSIGNMENTS=Yes, or the run's clean-up takes the case away again). A defendant
  // who is a litigant in person has no solicitor, so is not assigned.
  async assignDefendantSolicitorsIfStoppedAwaitingThem(claimType: claimTypes) {
    if (!this.stopAtStateReached || this.stopAtState !== caseStates.AWAITING_RESPONDENT_ACKNOWLEDGEMENT) {
      return;
    }
    console.log(`Assigning the defendants' solicitors to case ${this.caseId}, as the run stops awaiting their response (STOP_AT_STATE)`);
    await this.testingEndpointHelper.assignDefendantLegalRepToCase(this.caseId, claimType, [...this.defendantsGivenSolicitorByNoc]);
  }

  // Checks the claim is in the expected state, and notes when it has reached STOP_AT_STATE so the remaining tests are
  // skipped, or API_UNTIL so the remaining steps use the UI
  async assertCaseState(state: caseStates) {
    await this.testingEndpointHelper.assertCaseState(this.caseId, state);
    this.lastStateReached = state;
    if (state === this.apiUntilState && !this.apiUntilStateReached) {
      this.apiUntilStateReached = true;
      console.log(`Case ${this.caseId} has reached ${state}, so the remaining steps use the UI (API_UNTIL)`);
    }
    if (state === this.stopAtState && !this.stopAtStateReached) {
      this.stopAtStateReached = true;
      console.log(`Case ${this.caseId} has reached ${state}, so the remaining tests are skipped (STOP_AT_STATE)`);
    }
  }
}

// Defines a journey's steps as a serial group of tests, one per step, in order. The tests are numbered test1, test2 ...
// by their position in the list (a group of steps takes one number), so adding a step renumbers the ones after it.
//
// Stopping the run early, for example to carry on with the claim by hand (use KEEP_CASE_ASSIGNMENTS=Yes as well to
// keep the solicitors assigned to it):
//  - STOP_AT_STATE: stop as soon as the claim is confirmed to be in this state, e.g. CASE_PROGRESSION stops straight
//    after the Standard Direction Order
//  - STOP_AFTER_TEST: stop after this step or group, by name (e.g. CREATE_HEARING_NOTICE), or after a test number
//    (e.g. test12). A name always means the same step, while a number moves when steps are added before it.
// The remaining tests are skipped, except the steps that close the claim (closesClaim), such as settling it, which still
// run when their settings ask for them. Both can be set, in which case the run stops at whichever comes first.
//
// Steps the settings rule out before the run starts are left out of it, rather than reported as skipped: those whose
// skipIf conditions hold (a switched-off event, or one the claim type does not have), and those after STOP_AFTER_TEST.
// They keep their test numbers, so test12 is the same step whatever is left out. Steps that turn out not to apply while
// the journey runs (STOP_AT_STATE, or a claim that cannot be settled in its state) are still skipped.
//
// Getting the claim to a state quickly:
//  - API_UNTIL: the steps that have an API version (flows/events/api) are done through the CCD API until the claim is
//    confirmed to be in this state, and the steps after it through the UI. Steps with no API version yet always use the
//    UI. For example API_UNTIL=CASE_ISSUED creates the claim through the API.
export function defineJourney(
  context: JourneyContext,
  steps: JourneyStep[],
  options: { stopAfterTest: string | undefined; validate: () => void },
) {
  requirePlaywrightTestsEnv();
  // Each step's test number: the next number, unless it is in the same group as the step before it
  const numberedSteps = steps.reduce<Array<{ step: JourneyStep; testNumber: number }>>((numbered, step) => {
    const previous = numbered[numbered.length - 1];
    const sameGroup = previous !== undefined && step.group !== undefined && step.group === previous.step.group;
    const testNumber = previous === undefined ? 1 : sameGroup ? previous.testNumber : previous.testNumber + 1;
    return [...numbered, { step, testNumber }];
  }, []);
  // The tests that close the claim, which stopping the journey does not skip
  const closingTestNumbers = new Set(numberedSteps.filter(({ step }) => step.closesClaim).map(({ testNumber }) => testNumber));

  const { stopAfterTest } = options;
  const stopAfterNamed = stopAfterTest === undefined
    ? undefined
    : numberedSteps.find(({ step }) => step.name === stopAfterTest) ?? numberedSteps.find(({ step }) => step.group === stopAfterTest);
  const stopAfterTestNumber = stopAfterNamed
    ? stopAfterNamed.testNumber
    : stopAfterTest !== undefined && /^test\d+$/.test(stopAfterTest)
      ? Number(stopAfterTest.slice('test'.length))
      : undefined;
  // Where STOP_AFTER_TEST names one step of a group, such as GA_SEND_TO_OTHER_PARTY_JUDGE in GENERAL_APPLICATION, the
  // steps after it in the same group are skipped too, as they share its test number
  const stopAfterStepIndex = stopAfterNamed !== undefined && stopAfterNamed.step.name === stopAfterTest
    ? numberedSteps.indexOf(stopAfterNamed)
    : undefined;

  test.beforeAll(async ({}) => {
    options.validate();

    const stops: JourneyStops = { stopAtState: context.stopAtState, stopAfterTest };
    const problems = steps.flatMap((step) => (step.invalidIf?.(stops) ?? []).filter(([invalid]) => invalid).map(([, problem]) => problem));
    expect(problems, `Invalid combination of settings:\n  - ${problems.join('\n  - ')}`).toEqual([]);

    if (context.stopAtState !== undefined) {
      expect(
        Object.values(caseStates),
        `Invalid STOP_AT_STATE value: ${context.stopAtState}. It must be one of ${Object.values(caseStates).join(', ')}.`,
      ).toContain(context.stopAtState);
    }

    if (context.apiUntilState !== undefined) {
      expect(
        Object.values(caseStates),
        `Invalid API_UNTIL value: ${context.apiUntilState}. It must be one of ${Object.values(caseStates).join(', ')}.`,
      ).toContain(context.apiUntilState);
    }

    if (stopAfterTest !== undefined) {
      expect(
        stopAfterTestNumber,
        `Invalid STOP_AFTER_TEST value: ${stopAfterTest}. It must be one of the steps ${[...new Set(steps.flatMap((step) => [step.group, step.name]).filter(Boolean))].join(', ')}, or a test number such as test11.`,
      ).toBeDefined();
    }
  });

  test.beforeEach(async ({ page, storageState }, testInfo) => {
    // The last testN in the test's title path is its own (steps that share a number sit in a group inside it)
    const testNumber = Number(testInfo.titlePath.filter((title) => /^test\d+$/.test(title)).pop()?.slice('test'.length));
    if (!closingTestNumbers.has(testNumber)) {
      test.skip(context.stopAtStateReached, `Stopped: the claim has reached ${context.stopAtState} (STOP_AT_STATE)`);
    }

    context.usePage(page);
    // A saved session can have ended since the last test, in which case the user is signed in again
    await context.runEvent(page, storageState, async () => {
      await context.pageHelper.gotoAndWaitForXui(context.caseUrl());
      // XUI can redirect to the case list on the first load of a session, so open the case again if that happened
      if (context.caseId && !page.url().includes(context.caseId)) {
        await context.pageHelper.gotoAndWaitForXui(context.caseUrl());
      }
    });
  });

  test.afterAll(async () => {
    if (context.stopAtState !== undefined && !context.stopAtStateReached) {
      console.warn(`WARNING: STOP_AT_STATE ${context.stopAtState} was never reached. The last state checked was ${context.lastStateReached ?? 'none'}.`);
    }
    if (context.apiUntilState !== undefined && !context.apiUntilStateReached) {
      console.warn(`WARNING: API_UNTIL ${context.apiUntilState} was never reached. The last state checked was ${context.lastStateReached ?? 'none'}.`);
    }
  });

  test.describe.configure({ mode: 'serial' });
  // Whether the settings rule a step out before the run starts (see above)
  const leftOut = ({ step, testNumber }: { step: JourneyStep; testNumber: number }) => {
    const stepIndex = numberedSteps.findIndex((numbered) => numbered.step === step);
    const stoppedAfterStep = stopAfterStepIndex !== undefined && stepIndex > stopAfterStepIndex && !step.closesClaim;
    const stoppedAfterTest = stopAfterTestNumber !== undefined && testNumber > stopAfterTestNumber && !closingTestNumbers.has(testNumber);
    const switchedOff = (step.skipIf ?? []).some(([condition]) => condition);
    return stoppedAfterStep || stoppedAfterTest || switchedOff;
  };
  for (const testNumber of [...new Set(numberedSteps.map((numbered) => numbered.testNumber))]) {
    const stepsInTest = numberedSteps.filter((numbered) => numbered.testNumber === testNumber);
    const stepsToRun = stepsInTest.filter((numbered) => !leftOut(numbered));
    if (stepsToRun.length === 0) {
      continue;
    }
    test.describe(`test${testNumber}`, () => {
      // A group keeps its steps' names in the titles, however many of them run
      if (stepsInTest.length === 1) {
        defineStep(stepsToRun[0].step);
      } else {
        for (const numbered of stepsToRun) {
          test.describe(numbered.step.name, () => defineStep(numbered.step));
        }
      }
    });
  }
}

function defineStep(step: JourneyStep) {
  test.use({ storageState: sessionUsers[step.user].authFile });
  test(step.title, async ({ page, storageState }) => {
    await step.run({ page, storageState, user: step.user });
  });
}
