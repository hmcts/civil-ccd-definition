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
import { SessionHelper, sessionUserFor, sessionUsers, SessionUserKey } from '../../helpers/SessionHelper.ts';
import { requirePlaywrightTestsEnv } from '../../env.ts';

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
  // Reasons the step does not apply to this journey, each a [condition, reason] pair. They are known before the
  // journey starts, so the step's group is skipped rather than the test, which means beforeEach does not open the case
  // as a user who is not signed in for this claim type.
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
    : numberedSteps.find(({ step }) => step.name === stopAfterTest || step.group === stopAfterTest);
  const stopAfterTestNumber = stopAfterNamed
    ? stopAfterNamed.testNumber
    : stopAfterTest !== undefined && /^test\d+$/.test(stopAfterTest)
      ? Number(stopAfterTest.slice('test'.length))
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
      test.skip(stopAfterTestNumber !== undefined && testNumber > stopAfterTestNumber, `Stopped after ${stopAfterTest} (STOP_AFTER_TEST)`);
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
  for (const testNumber of [...new Set(numberedSteps.map((numbered) => numbered.testNumber))]) {
    const stepsInTest = numberedSteps.filter((numbered) => numbered.testNumber === testNumber).map((numbered) => numbered.step);
    test.describe(`test${testNumber}`, () => {
      if (stepsInTest.length === 1) {
        defineStep(stepsInTest[0]);
      } else {
        for (const step of stepsInTest) {
          test.describe(step.name, () => defineStep(step));
        }
      }
    });
  }
}

function defineStep(step: JourneyStep) {
  for (const [condition, reason] of step.skipIf ?? []) {
    test.skip(condition, reason);
  }
  test.use({ storageState: sessionUsers[step.user].authFile });
  test(step.title, async ({ page, storageState }) => {
    await step.run({ page, storageState, user: step.user });
  });
}
