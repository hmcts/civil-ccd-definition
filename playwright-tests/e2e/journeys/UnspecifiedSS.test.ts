import { expect, Page, test } from '@playwright/test';
import { envUrl } from '../../civilConfig.ts';
import { PageHelper } from '../../helpers/PageHelper.ts';
import { ButtonHelper } from '../../helpers/ButtonHelper.ts';
import { CreateUnspecifiedCase } from '../flows/createUnspecifiedCase.ts';
import { CreateCasePage } from '../page-objects/pages/createCase_page.ts';
import yesNo from '../../enums/yesNo.ts';
import YesNo from '../../enums/yesNo.ts';
import claimTypes from '../../enums/claim-types.ts';
import unspecClaimTypes from '../../enums/unspecClaimTypes.ts';
import personalInjuryTypes from '../../enums/personalInjuryTypes.ts';
import claimTrack from '../../enums/track.ts';
import environment from '../../enums/environment.ts';
import { cleanEnv, enums } from '@opensourcesforge/envguard';
import { TabsHelper } from '../../helpers/TabsHelper.ts';
import { PaymentPage } from '../page-objects/pages/payment_page.ts';
import { TestingEndPointHelper } from '../../helpers/TestingEndPointHelper.ts';
import { NotifyClaim } from '../flows/events/NotifyClaim.ts';
import notifyClaimOptions from '../../enums/notifyClaimOptions.ts';
import { NotifyClaimDetails } from '../flows/events/NotifyClaimDetails.ts';
import responseIntentions from '../../enums/ResponseIntention.ts';
import { AcknowledgeClaim } from '../flows/events/AcknowledgeClaim.ts';
import respondentResponses from '../../enums/RespondentResponses.ts';
import { RespondToClaim } from '../flows/events/RespondToClaim.ts';
import { RespondToDefence } from '../flows/events/RespondToDefence.ts';
import { CreateSdo } from '../flows/events/CreateSdo.ts';
import { UploadEvidence } from '../flows/events/UploadEvidence.ts';
import { CreateHearingNotice } from '../flows/events/CreateHearingNotice.ts';
import { WaTaskHelper } from '../../helpers/WaTaskHelper.ts';
import { ConfirmTrialArrangements } from '../flows/events/ConfirmTrialArrangements.ts';
import { MakeFinalOrder } from '../flows/events/MakeFinalOrder.ts';
import { ConfirmOrderReview } from '../flows/events/ConfirmOrderReview.ts';
import FinalOrder, { finalOrdersForTrack } from '../../enums/finalOrders.ts';
import ClaimTypes from '../../enums/claim-types.ts';
import fixedRecoveryCostsBands from '../../enums/fixedRecoveryCostsBands.ts';
import languageSpokenAndDocuments from '../../enums/languageSpokenAndDocuments.ts';
import { CaseUserRegistry } from '../../helpers/CaseUserRegistry.ts';
import caseStates from '../../enums/caseStates.ts';
import { SessionHelper, sessionUserFor, sessionUsers } from '../../helpers/SessionHelper.ts';
import { selectedScenarios } from '../../scenarios/unspecifiedScenarios.ts';

// Each scenario's journey runs as its own serial group, tagged with the scenario's tags, so the pipeline can pick
// the scenarios it runs by tag. Different scenarios can run at the same time on separate workers.
test.describe.configure({ mode: 'parallel' });
for (const scenario of selectedScenarios()) {
  test.describe(scenario.name, { tag: scenario.tags }, () => {
    defineUnspecifiedJourney(scenario.env);
  });
}

function defineUnspecifiedJourney(scenarioEnv: Record<string, string | undefined>) {
  const env = cleanEnv({
    CLAIM_TYPE: enums({
      values: [
        claimTypes.ONE_VS_ONE_LIP,
        claimTypes.TWO_VS_ONE_LIP,
        claimTypes.ONE_VS_TWO_LIPS,
        claimTypes.ONE_VS_TWO_LR_LIP,
        claimTypes.ONE_VS_TWO_LIP_LR,
        claimTypes.ONE_VS_ONE,
        claimTypes.TWO_VS_ONE,
        claimTypes.ONE_VS_TWO_SAME_SOL,
        claimTypes.ONE_VS_TWO_DIFF_SOL,
      ] as const,
      default: claimTypes.ONE_VS_ONE,
    }),
    ENVIRONMENT: enums({
      values: [
        environment.AAT,
        environment.DEMO,
        environment.ITHC,
        environment.PREVIEW,
        environment.PERFTEST,
      ],
      default: environment.PREVIEW,
    }),
    DEFENDANTS_TO_NOTIFY_CLAIM: enums({
      values: [notifyClaimOptions.BOTH, notifyClaimOptions.DEFENDANT1, notifyClaimOptions.DEFENDANT2],
      default: notifyClaimOptions.BOTH,
    }),
    DEFENDANTS_TO_NOTIFY_CLAIM_DETAILS: enums({
      values: [notifyClaimOptions.BOTH, notifyClaimOptions.DEFENDANT1, notifyClaimOptions.DEFENDANT2],
      default: notifyClaimOptions.BOTH,
    }),
    RESPONDENT1_RESPONSE_INTENTION: enums({
      values: [
        responseIntentions.FULL_DEFENCE,
        responseIntentions.PART_DEFENCE,
        responseIntentions.CONTEST_JURISDICTION,
      ],
      default: responseIntentions.FULL_DEFENCE,
    }),
    RESPONDENT2_RESPONSE_INTENTION: enums({
      values: [
        responseIntentions.FULL_DEFENCE,
        responseIntentions.PART_DEFENCE,
        responseIntentions.CONTEST_JURISDICTION,
      ],
      default: responseIntentions.FULL_DEFENCE,
    }),
    RESPONDENT1_RESPONSE: enums({
      values: [
        respondentResponses.FULL_DEFENCE,
        respondentResponses.FULL_ADMISSION,
        respondentResponses.PART_ADMISSION,
        respondentResponses.COUNTER_CLAIM
      ],
      default: respondentResponses.FULL_DEFENCE
    }),
    RESPONDENT2_RESPONSE: enums({
      values: [
        respondentResponses.FULL_DEFENCE,
        respondentResponses.FULL_ADMISSION,
        respondentResponses.PART_ADMISSION,
        respondentResponses.COUNTER_CLAIM
      ],
      default: respondentResponses.FULL_DEFENCE
    }),
    // Whether the claimant proceeds with the claim when responding to the defence. 2v1 and 1v2 claims ask twice:
    //  - 1v1: CLAIMANT_PROCEED_1 is the claimant's answer (CLAIMANT_PROCEED_2 is not used)
    //  - 2v1: CLAIMANT_PROCEED_1 is Claimant 1's answer and CLAIMANT_PROCEED_2 is Claimant 2's
    //  - 1v2SS / 1v2DS: CLAIMANT_PROCEED_1 is against Defendant 1 and CLAIMANT_PROCEED_2 is against Defendant 2
    CLAIMANT_PROCEED_1: enums({
      values: [yesNo.YES, yesNo.NO],
      default: yesNo.YES
    }),
    CLAIMANT_PROCEED_2: enums({
      values: [yesNo.YES, yesNo.NO],
      default: yesNo.YES
    }),
    FIXED_RECOVERY_COSTS_BAND: enums({
      values: [
        fixedRecoveryCostsBands.BAND1,
        fixedRecoveryCostsBands.BAND2,
        fixedRecoveryCostsBands.BAND3,
        fixedRecoveryCostsBands.BAND4
      ],
      default: fixedRecoveryCostsBands.BAND1
    }),
  }, { env: scenarioEnv });


  let defendant1Journey : ClaimTypes[] = [
    claimTypes.ONE_VS_ONE,
    claimTypes.ONE_VS_TWO_SAME_SOL,
    claimTypes.ONE_VS_TWO_DIFF_SOL,
    claimTypes.TWO_VS_ONE,
    claimTypes.ONE_VS_TWO_LR_LIP
  ];
  const claimType: claimTypes = env.CLAIM_TYPE;
  const respondent1ResponseIntention: responseIntentions = env.RESPONDENT1_RESPONSE_INTENTION;
  const respondent2ResponseIntention: responseIntentions = env.RESPONDENT2_RESPONSE_INTENTION;
  const respondent1Response: respondentResponses = env.RESPONDENT1_RESPONSE;
  const respondent2Response: respondentResponses = env.RESPONDENT2_RESPONSE;
  const claimantProceed1: yesNo = env.CLAIMANT_PROCEED_1;
  const claimantProceed2: yesNo = env.CLAIMANT_PROCEED_2;
  const fixedRecoverableCosts: yesNo = ['Yes'].includes(scenarioEnv.FIXED_RECOVERABLE_COSTS)
    ? yesNo.YES
    : yesNo.NO;
  const fixedRecoveryCostsBand: fixedRecoveryCostsBands = env.FIXED_RECOVERY_COSTS_BAND;
  const caseType: string = 'UNSPECIFIED';
  const claimantType: string = ['INDIVIDUAL', 'COMPANY', 'ORGANISATION', 'SOLE_TRADER'].includes(
    scenarioEnv.CLAIMANT_TYPE,
  )
    ? scenarioEnv.CLAIMANT_TYPE
    : 'INDIVIDUAL';
  const defendantType: string = ['INDIVIDUAL', 'COMPANY', 'ORGANISATION', 'SOLE_TRADER'].includes(
    scenarioEnv.DEFENDANT_TYPE,
  )
    ? scenarioEnv.DEFENDANT_TYPE
    : 'INDIVIDUAL';
  const typeOfClaim = scenarioEnv.TYPE_OF_CLAIM;
  const typeOfClaimSubType: string = scenarioEnv.SUB_TYPE;
  const defendantsToNotifyClaim: notifyClaimOptions = env.DEFENDANTS_TO_NOTIFY_CLAIM;
  const defendantsToNotifyClaimDetails: notifyClaimOptions = env.DEFENDANTS_TO_NOTIFY_CLAIM_DETAILS;
  // Notifying only one defendant takes the claim offline, so no later events can be done online
  const claimOfflineAfterNotifyClaim = defendantsToNotifyClaim !== notifyClaimOptions.BOTH;
  const claimOfflineAfterNotifyClaimDetails =
    claimOfflineAfterNotifyClaim || defendantsToNotifyClaimDetails !== notifyClaimOptions.BOTH;
  // Once every defendant has responded, the claim moves on to the claimant's intention if all responses are a full
  // defence and goes offline otherwise.
  const responsesForClaimType = [claimTypes.ONE_VS_TWO_DIFF_SOL, claimTypes.ONE_VS_TWO_SAME_SOL, claimTypes.ONE_VS_TWO_LR_LIP, claimTypes.ONE_VS_TWO_LIP_LR, claimTypes.TWO_VS_ONE].includes(claimType)
    ? [respondent1Response, respondent2Response]
    : [respondent1Response];
  const stateAfterAllResponses = responsesForClaimType.every((response) => response === respondentResponses.FULL_DEFENCE)
    ? caseStates.AWAITING_APPLICANT_INTENTION
    : caseStates.PROCEEDS_IN_HERITAGE_SYSTEM;

  // In these claims the two defendants respond separately, in either order, and the claim waits in
  // AWAITING_RESPONDENT_ACKNOWLEDGEMENT until both have responded. Tracking who has responded keeps the expected
  // state right whichever defendant responds first.
  //  - 1v2DS: each defendant's solicitor responds.
  //  - 1v2LRLIP: Defendant 1's solicitor responds. Defendant 2 is a litigant in person, who cannot respond online in an
  //    unspecified claim, so the claim keeps waiting unless they appoint a solicitor who responds for them.
  //  - 1v2LIPLR: no defendant responds. Defendant 1 is a litigant in person, and Defendant 2's solicitor's response is
  //    skipped (see test7), so the claim stays in AWAITING_RESPONDENT_ACKNOWLEDGEMENT.
  const separateResponseClaimTypes = [claimTypes.ONE_VS_TWO_DIFF_SOL, claimTypes.ONE_VS_TWO_LR_LIP, claimTypes.ONE_VS_TWO_LIP_LR];
  // Claim types where Defendant 2 has their own solicitor, who acknowledges and responds separately
  const defendant2OwnSolicitorClaimTypes = [claimTypes.ONE_VS_TWO_DIFF_SOL, claimTypes.ONE_VS_TWO_LIP_LR];
  const defendantsResponded = new Set<number>();
  // Claim types with no litigant in person, where the claimant solicitor responds to the defence once every defendant
  // has entered a full defence. The claim moves to JUDICIAL_REFERRAL only if every claimant proceeds against every
  // defendant. Not proceeding, or proceeding against only some of them, takes the claim offline.
  const claimantResponseClaimTypes = [claimTypes.ONE_VS_ONE, claimTypes.TWO_VS_ONE, claimTypes.ONE_VS_TWO_SAME_SOL, claimTypes.ONE_VS_TWO_DIFF_SOL];
  const claimantProceedsWithWholeClaim = claimType === claimTypes.ONE_VS_ONE
    ? claimantProceed1 === yesNo.YES
    : claimantProceed1 === yesNo.YES && claimantProceed2 === yesNo.YES;
  const stateAfterClaimantResponse = claimantProceedsWithWholeClaim
    ? caseStates.JUDICIAL_REFERRAL
    : caseStates.PROCEEDS_IN_HERITAGE_SYSTEM;


  function expectedStateAfterResponse(defendantNumber: number): caseStates {
    defendantsResponded.add(defendantNumber);
    const waitingForOtherDefendant = separateResponseClaimTypes.includes(claimType) && defendantsResponded.size < 2;
    return waitingForOtherDefendant ? caseStates.AWAITING_RESPONDENT_ACKNOWLEDGEMENT : stateAfterAllResponses;
  }

  const claimant1LitigantFriend: yesNo = ['Yes'].includes(scenarioEnv.CLAIMANT1_LITIGANT_FRIEND)
    ? yesNo.YES
    : yesNo.NO;
  const claimant2LitigantFriend: yesNo = ['Yes'].includes(scenarioEnv.CLAIMANT2_LITIGANT_FRIEND)
    ? yesNo.YES
    : yesNo.NO;
  const defendant1LitigantFriend: yesNo = ['Yes'].includes(scenarioEnv.DEFENDANT1_LITIGANT_FRIEND)
    ? yesNo.YES
    : yesNo.NO;
  const defendant2LitigantFriend: yesNo = ['Yes'].includes(scenarioEnv.DEFENDANT2_LITIGANT_FRIEND)
    ? yesNo.YES
    : yesNo.NO;
  const determinationWithoutHearing: YesNo = ['Yes'].includes(scenarioEnv.DETERMINATION_WITHOUT_HEARING)
    ? yesNo.YES
    : yesNo.NO;
  const oneMonthStay: YesNo = ['Yes'].includes(scenarioEnv.ONE_MONTH_STAY)
    ? yesNo.YES
    : yesNo.NO;
  const preActionProtocol: YesNo = ['Yes'].includes(scenarioEnv.ONE_MONTH_STAY)
    ? yesNo.YES
    : yesNo.NO;

  let track: claimTrack = ['SMALL_CLAIM', 'FAST_CLAIM', 'INTERMEDIATE_CLAIM', 'MULTI_CLAIM'].includes(scenarioEnv.TRACK) ? (scenarioEnv.TRACK as claimTrack) : claimTrack.FAST;
  // Noise induced hearing loss claims get their own Standard Direction Order directions in test9, and their own work
  // allocation task for it
  const noiseInducedHearingLoss: boolean =
    typeOfClaim == unspecClaimTypes.PERSONAL_INJURY && typeOfClaimSubType == personalInjuryTypes.NOISE_INDUCED_HEARING_LOSS;
  const sdoTaskType: string = noiseInducedHearingLoss ? 'NIHLFastTrackDirections' : 'FastTrackDirections';
  // The judge's final order in test16 (FINAL_ORDER). If it is not set, the first order the track offers is made: a free
  // form order on the small and fast tracks, the blank after-hearing template on the intermediate and multi tracks.
  const finalOrder: FinalOrder = (scenarioEnv.FINAL_ORDER as FinalOrder) ?? finalOrdersForTrack[track][0];

  // Stopping the run early, for example to carry on with the claim by hand (use KEEP_CASE_ASSIGNMENTS=Yes as well to
  // keep the solicitors assigned to it):
  //  - STOP_AT_STATE: stop as soon as the claim is confirmed to be in this state, e.g. CASE_PROGRESSION stops straight
  //    after the Standard Direction Order
  //  - STOP_AFTER_TEST: stop after this test, e.g. test10 stops after the evidence uploads
  // The remaining tests are skipped. Both can be set, in which case the run stops at whichever comes first.
  const stopAtState = scenarioEnv.STOP_AT_STATE as caseStates | undefined;
  const stopAfterTest: string | undefined = scenarioEnv.STOP_AFTER_TEST;
  let stopAtStateReached = false;
  let lastStateReached: caseStates | undefined;
  const noOfExperts: string = scenarioEnv.EXPERTS ?? '0';
  const noOfWitnesses: string = scenarioEnv.WITNESSES ?? '0';
  const language: languageSpokenAndDocuments = ['WELSH', 'ENGLISH', 'BOTH'].includes(scenarioEnv.LANGUAGE) ? (scenarioEnv.LANGUAGE as languageSpokenAndDocuments) : languageSpokenAndDocuments.ENGLISH;
  const unavailableDatesRequired: YesNo = ['Yes'].includes(scenarioEnv.UNAVAILABLE_DATES)
    ? yesNo.YES
    : yesNo.NO;

  let caseId: string = '';
  let pageHelper: PageHelper;
  let buttonHelper: ButtonHelper;
  let tabsHelper: TabsHelper;
  let testingEndpointHelper: TestingEndPointHelper;
  let createCasePage: CreateCasePage;

  function caseUrl(): string {
    return envUrl + '/cases/case-details/' + caseId;
  }

  // Runs the UI steps of an event as the test's user (from its storageState). If their XUI session ends before the
  // event is submitted, they are signed in again, reopenUrl (the case by default) is opened again and the steps are
  // run again from the start.
  async function runEvent(page: Page, storageState: unknown, action: () => Promise<void>, reopenUrl: string = caseUrl()) {
    await new SessionHelper(page).runWithSessionRecovery(sessionUserFor(storageState), reopenUrl, action);
  }

  // Checks the claim is in the expected state, and notes when it has reached STOP_AT_STATE so the remaining tests are
  // skipped
  async function assertCaseState(state: caseStates) {
    await testingEndpointHelper.assertCaseState(caseId, state);
    lastStateReached = state;
    if (state === stopAtState && !stopAtStateReached) {
      stopAtStateReached = true;
      console.log(`Case ${caseId} has reached ${state}, so the remaining tests are skipped (STOP_AT_STATE)`);
    }
  }

  test.beforeAll(async ({}) => {
    if (
      typeOfClaim == unspecClaimTypes.PERSONAL_INJURY &&
      typeOfClaimSubType == personalInjuryTypes.NOISE_INDUCED_HEARING_LOSS
    ) {
      expect(
        track,
        `Invalid claim track: ${track} used for type: ${typeOfClaim} and sub type: ${typeOfClaimSubType} combination. Either do not specify a track or set the track to FAST_CLAIM.`,
      ).toEqual(claimTrack.FAST);
    }

    expect(
      noOfExperts,
      `Invalid EXPERTS value: ${noOfExperts}. It must be an integer.`,
    ).toMatch(/^\d+$/);

    expect(
      Number(noOfExperts),
      `Invalid EXPERTS value: ${noOfExperts}. It must be >= 0.`,
    ).toBeGreaterThanOrEqual(0);

    expect(
      noOfWitnesses,
      `Invalid WITNESSES value: ${noOfWitnesses}. It must be an integer.`,
    ).toMatch(/^\d+$/);

    expect(
      Number(noOfWitnesses),
      `Invalid WITNESSES value: ${noOfWitnesses}. It must be >= 0.`,
    ).toBeGreaterThanOrEqual(0);

    expect(
      Object.values(FinalOrder),
      `Invalid FINAL_ORDER value: ${finalOrder}. It must be one of ${Object.values(FinalOrder).join(', ')}.`,
    ).toContain(finalOrder);

    expect(
      finalOrdersForTrack[track],
      `Invalid FINAL_ORDER value: ${finalOrder} for track ${track}. The ${track} track offers ${finalOrdersForTrack[track].join(', ')}.`,
    ).toContain(finalOrder);

    if (stopAtState !== undefined) {
      expect(
        Object.values(caseStates),
        `Invalid STOP_AT_STATE value: ${stopAtState}. It must be one of ${Object.values(caseStates).join(', ')}.`,
      ).toContain(stopAtState);
    }

    if (stopAfterTest !== undefined) {
      expect(stopAfterTest, `Invalid STOP_AFTER_TEST value: ${stopAfterTest}. It must be a test name such as test10.`).toMatch(/^test\d+$/);
    }
  });

  test.beforeEach(async ({ page, storageState }, testInfo) => {
    // Every test sits inside the test1 group (test1 › test10 › ...), so the last testN in its title path is its own
    const testNumber = Number(testInfo.titlePath.filter((title) => /^test\d+$/.test(title)).pop()?.slice('test'.length));
    test.skip(stopAfterTest !== undefined && testNumber > Number(stopAfterTest.slice('test'.length)), `Stopped after ${stopAfterTest} (STOP_AFTER_TEST)`);
    test.skip(stopAtStateReached, `Stopped: the claim has reached ${stopAtState} (STOP_AT_STATE)`);

    pageHelper = new PageHelper(page);
    buttonHelper = new ButtonHelper(page);
    createCasePage = new CreateCasePage(page);
    tabsHelper = new TabsHelper(page);
    testingEndpointHelper = new TestingEndPointHelper();
    // A saved session can have ended since the last test, in which case the user is signed in again
    await runEvent(page, storageState, async () => {
      await pageHelper.gotoAndWaitForXui(caseUrl());
      // XUI can redirect to the case list on the first load of a session, so open the case again if that happened
      if (caseId && !page.url().includes(caseId)) {
        await pageHelper.gotoAndWaitForXui(caseUrl());
      }
    });
  });

  test.afterAll(async () => {
    if (stopAtState !== undefined && !stopAtStateReached) {
      console.warn(`WARNING: STOP_AT_STATE ${stopAtState} was never reached. The last state checked was ${lastStateReached ?? 'none'}.`);
    }
  });

  test.describe.configure({ mode: 'serial' });
  test.describe('test1', () => {
    test.use({ storageState: sessionUsers.claimantSolicitor.authFile });
    test('Claimant Solicitor creates ' + claimType + ' claim ', async ({ page, storageState }) => {
      // If the session ends before the claim is submitted, the claim is started again from the case list
      await runEvent(page, storageState, async () => {
        let createCase: CreateUnspecifiedCase = new CreateUnspecifiedCase(page);
        await createCasePage.createCase(caseType);
        await pageHelper.continueToNextPage(); //Summary
        await createCase.setReferences(claimType); // do not think we need to pass claimtype.....
        await createCase.setCourt();
        await createCase.setClaimantType(claimantType, 1);
        await createCase.setClaimantLitigantFriend(claimant1LitigantFriend, 1);
        await createCase.setClaimantNotifications();
        await pageHelper.continueToNextPage(); //ClaimantSolicitorOrganisation
        await createCase.setClaimantServiceAddress();

        switch (claimType) {
          case claimTypes.TWO_VS_ONE:
          case claimTypes.TWO_VS_ONE_LIP:
            await createCase.setAnotherClaimant(yesNo.YES, claimantType);
            await createCase.setClaimantType(claimantType, 2);
            await createCase.setClaimantLitigantFriend(claimant2LitigantFriend, 2);
            break;
          default:
            await createCase.setAnotherClaimant(yesNo.NO, claimantType);
        }

        await createCase.setDefendantType(defendantType, 1);

        if (
          claimType == claimTypes.ONE_VS_ONE_LIP ||
          claimType == claimTypes.TWO_VS_ONE_LIP ||
          claimType == claimTypes.ONE_VS_TWO_LIP_LR ||
          claimType == claimTypes.ONE_VS_TWO_LIPS
        ) {
          console.log('Defendant 1: NOT represented');
          await createCase.setDefendantLegallyRepresented(yesNo.NO, 1);
        } else {
          console.log('Defendant 1: REPRESENTED');
          await createCase.setDefendantLegallyRepresented(yesNo.YES, 1);
          await createCase.setSolicitorOrganisation('Civil - Organisation 2');
          await createCase.setDefendantLegalRepresentativeCorrespondenceAddress(yesNo.NO, 1);
          await createCase.setDefendantLegalRepresentativeEmail();
        }

        if (claimType == claimTypes.TWO_VS_ONE_LIP || claimType == claimTypes.TWO_VS_ONE) {
          // ignore these claim types as they cannot have a second defendant
        } else if (claimType == claimTypes.ONE_VS_ONE || claimType == claimTypes.ONE_VS_ONE_LIP) {
          await createCase.setAnotherDefendant(yesNo.NO);
        } else {
          await createCase.setAnotherDefendant(yesNo.YES);
          await createCase.setDefendantType(defendantType, 2);

          switch (claimType) {
            case claimTypes.ONE_VS_TWO_LIP_LR:
              console.log('Defendant 2: REPRESENTED');
              await createCase.setDefendantLegallyRepresented(yesNo.YES, 2);
              // Defendant 2's solicitor is the Respondent2 Solicitor user, who belongs to Organisation 3
              await createCase.setSolicitorOrganisation('Civil - Organisation 3');
              await createCase.setDefendantLegalRepresentativeCorrespondenceAddress(yesNo.NO, 2);
              await createCase.setDefendant2LegalRepresentativeReference();
              await createCase.setDefendantLegalRepresentativeEmail(2);
              break;
            case claimTypes.ONE_VS_TWO_SAME_SOL:
              console.log('Defendant 2: REPRESENTED - same sols');
              await createCase.setDefendantLegallyRepresented(yesNo.YES, 2);
              await createCase.setSameLegalRepresentative(yesNo.YES);
              break;
            case claimTypes.ONE_VS_TWO_DIFF_SOL:
              console.log('Defendant 2: REPRESENTED - diff sols');
              await createCase.setDefendantLegallyRepresented(yesNo.YES, 2);
              await createCase.setSameLegalRepresentative(yesNo.NO);
              await createCase.setSolicitorOrganisation('Civil - Organisation 3');
              await createCase.setDefendantLegalRepresentativeCorrespondenceAddress(yesNo.NO, 2);
              await createCase.setDefendant2LegalRepresentativeReference();
              await createCase.setDefendantLegalRepresentativeEmail(2);
              break;
            default:
              console.log('Defendant 2: NOT represented');
              await createCase.setDefendantLegallyRepresented(yesNo.NO, 2);
          }
        }

        await createCase.setTypeOfClaim(typeOfClaim); // use from parameters in package

        if (typeOfClaim == unspecClaimTypes.PERSONAL_INJURY) {
          await createCase.setSubClaimType(typeOfClaimSubType); // use from parameters in package
        }

        if (
          typeOfClaim == unspecClaimTypes.HOUSING_DISREPAIR ||
          typeOfClaim == unspecClaimTypes.DAMAGES_AND_OTHER_REMEDY
        ) {
          await createCase.setOtherRemedy();
          await createCase.setHumanRights();
        }

        await createCase.setDescriptionOfClaim();

        await createCase.setUploadParticularsOfClaim();

        //
        if (
          typeOfClaim == unspecClaimTypes.PERSONAL_INJURY &&
          typeOfClaimSubType == personalInjuryTypes.NOISE_INDUCED_HEARING_LOSS
        ) {
          track = claimTrack.FAST;
        }

        await createCase.setClaimValue(track, typeOfClaim); // use from parameters in package
        await pageHelper.continueToNextPage(); //Amount to pay - can do an assertion on amount by api to fee and pay to make sure fee is correct, if needed.
        await createCase.setStatementOfTruth(); //will be dependant upon case ie 1v1 etc
        await pageHelper.submitEvent(); //CYA
        await buttonHelper.closeAndReturnToCaseDetailsButton.click(); //Success
      }, envUrl);

      caseId = await pageHelper.grabCaseNumber();
      console.log('caseId>>>>>>>>>>>>>>>' + caseId + '<<<<<<<<<<<<<<<<<<<');
      CaseUserRegistry.record(caseId, 'claimantSolicitor');
      // Pay the claim fee
      await new PaymentPage(page).makePayment('PBA');
      // The payment service tells civil-service about the payment, which then issues the claim
      // (CREATE_CLAIM_AFTER_PAYMENT). Where the payment service cannot reach civil-service the test tells it instead.
      // Telling it both ways would make civil-service try to issue the claim twice, so the test only steps in if the
      // payment service has not done it within a minute.
      const recordedByPaymentService = await testingEndpointHelper.waitForFeePaid(caseId, 'claimIssuedPaymentDetails', 60);
      if (recordedByPaymentService) {
        await testingEndpointHelper.waitForCamundaProcessToFinish(caseId, 'CREATE_CLAIM_AFTER_PAYMENT');
      } else {
        console.log('The payment service did not record the claim fee payment, so the test does');
        await testingEndpointHelper.serviceRequestUpdateClaimIssued(caseId);
      }
      await assertCaseState(caseStates.CASE_ISSUED);
    });

    test.describe('test2', () => {
      test.use({ storageState: sessionUsers.claimantSolicitor.authFile });
      test('Claimant Solicitor undertakes event: Notify claim ', async ({ page, storageState }) => {
        await runEvent(page, storageState, async () => {
          await new NotifyClaim(page).notify(claimType, defendantsToNotifyClaim);
        });
        await testingEndpointHelper.waitForCamundaProcessToFinish(
          caseId,
          'NOTIFY_DEFENDANT_OF_CLAIM',
        );
        if (claimOfflineAfterNotifyClaim) {
          await assertCaseState(caseStates.PROCEEDS_IN_HERITAGE_SYSTEM);
          console.log('Notify claim -> claim went offline, later events are skipped');
        } else {
          await assertCaseState(caseStates.AWAITING_CASE_DETAILS_NOTIFICATION);
        }
      });
    });

    test.describe('test3', () => {
      test.skip(claimOfflineAfterNotifyClaim, 'Claim went offline at Notify claim');
      test.use({ storageState: sessionUsers.claimantSolicitor.authFile });
      test('Claimant Solicitor undertakes event: Notify claim details ', async ({ page, storageState }) => {
        await runEvent(page, storageState, async () => {
          await new NotifyClaimDetails(page).notify(claimType, defendantsToNotifyClaimDetails);
        });
        await testingEndpointHelper.waitForCamundaProcessToFinish(
          caseId,
          'NOTIFY_DEFENDANT_OF_CLAIM_DETAILS',
        );
        if (claimOfflineAfterNotifyClaimDetails) {
          await assertCaseState(caseStates.PROCEEDS_IN_HERITAGE_SYSTEM);
          console.log('Notify claim details -> claim went offline, later events are skipped');
        } else {
          await assertCaseState(caseStates.AWAITING_RESPONDENT_ACKNOWLEDGEMENT);
        }
      });
    });

    test.describe('test4', () => {
      test.skip(claimOfflineAfterNotifyClaimDetails, 'Claim went offline at Notify claim / Notify claim details');
      test.use({ storageState: sessionUsers.respondent1Solicitor.authFile });
      test('Defendant 1 Solicitor acknowledges claim.', async ({ page, storageState }) => {
        test.skip(!defendant1Journey.includes(claimType), 'Skipping as first defendant is a LiP');
          await testingEndpointHelper.assignDefendantLegalRepToCase(caseId, claimType);
          // The case page was opened before this solicitor was assigned to the case, so open it again now they can see it
          await pageHelper.gotoAndWaitForXui(envUrl + '/cases/case-details/' + caseId);
          await runEvent(page, storageState, async () => {
            await new AcknowledgeClaim(page).acknowledge(
              claimType,
              respondent1ResponseIntention,
              respondent2ResponseIntention,
              1,
            );
          });
          await assertCaseState(caseStates.AWAITING_RESPONDENT_ACKNOWLEDGEMENT);
      });
    });

    test.describe('test5', () => {
      test.skip(claimOfflineAfterNotifyClaimDetails, 'Claim went offline at Notify claim / Notify claim details');
      // Skipped here rather than in the test so beforeEach does not open the case as Defendant 2's solicitor, who is
      // only signed in for claim types where they have one
      test.skip(!defendant2OwnSolicitorClaimTypes.includes(claimType), 'Skipping test as Defendant 2 has no separate solicitor');
      test.use({ storageState: sessionUsers.respondent2Solicitor.authFile });
      test('Defendant 2 Solicitor acknowledges claim.', async ({ page, storageState }) => {
        if (claimType === claimTypes.ONE_VS_TWO_LIP_LR) {
          // test4 is skipped for this claim type (Defendant 1 is a LiP), so Defendant 2's solicitor is assigned here
          await testingEndpointHelper.assignDefendantLegalRepToCase(caseId, claimType);
          // The case page was opened before this solicitor was assigned to the case, so open it again now they can see it
          await pageHelper.gotoAndWaitForXui(envUrl + '/cases/case-details/' + caseId);
        }
        await runEvent(page, storageState, async () => {
          await new AcknowledgeClaim(page).acknowledge(
            claimType,
            respondent1ResponseIntention,
            respondent2ResponseIntention,
            2,
          );
        });
        await assertCaseState(caseStates.AWAITING_RESPONDENT_ACKNOWLEDGEMENT);
      });
    });

    test.describe('test6', () => {
      test.skip(claimOfflineAfterNotifyClaimDetails, 'Claim went offline at Notify claim / Notify claim details');
      test.use({ storageState: sessionUsers.respondent1Solicitor.authFile });
      test('Defendant 1 Solicitor responds to claim.', async ({ page, storageState }) => {
        test.skip(!defendant1Journey.includes(claimType), 'Skipping as first defendant is a LiP');
        await runEvent(page, storageState, async () => {
          await new RespondToClaim(page).submit(
            claimType,
            track,
            typeOfClaim as unspecClaimTypes,
            respondent1Response,
            respondent2Response,
            1,
            determinationWithoutHearing,
            oneMonthStay,
            preActionProtocol,
            fixedRecoverableCosts,
            fixedRecoveryCostsBand,
            yesNo.YES,
            Number(noOfExperts),
            Number(noOfWitnesses),
            language,
            unavailableDatesRequired,
          );
        });
        await assertCaseState(expectedStateAfterResponse(1));
      });
    });

    test.describe('test7', () => {
      test.skip(claimOfflineAfterNotifyClaimDetails, 'Claim went offline at Notify claim / Notify claim details');
      // Skipped here rather than in the test so beforeEach does not open the case as Defendant 2's solicitor, who is
      // only signed in for claim types where they have one
      test.skip(!defendant2OwnSolicitorClaimTypes.includes(claimType), 'Skipping test as Defendant 2 has no separate solicitor');
      test.use({ storageState: sessionUsers.respondent2Solicitor.authFile });
      test('Defendant 2 Solicitor responds to claim.', async ({ page, storageState }) => {
        if (claimType === claimTypes.ONE_VS_TWO_LIP_LR) {
          // civil-service only treats the defendants as having separate solicitors when both are represented, so in a
          // 1v2LIPLR claim it handles Defendant 2's solicitor as Defendant 1's. The response is saved against Defendant 1
          // (respondent1ResponseDate) and multiPartyResponseTypeFlags is NOT_FULL_DEFENCE even for a full defence. As a
          // result the directions questionnaire pages are not displayed to Defendant 2's solicitor (the response goes
          // is asked for. Until civil-service supports this, the response is skipped.
          console.warn(
            'WARNING: Defendant 2 Solicitor response NOT undertaken for 1v2LIPLR. civil-service records the response '
            + 'against Defendant 1 and skips the directions questionnaire and defence upload, so it cannot be tested.',
          );
          test.skip(true, '1v2LIPLR: civil-service does not support a response from Defendant 2 Solicitor when Defendant 1 is a LiP');
        }
        await runEvent(page, storageState, async () => {
          await new RespondToClaim(page).submit(
            claimType,
            track,
            typeOfClaim as unspecClaimTypes,
            respondent1Response,
            respondent2Response,
            2,
            determinationWithoutHearing,
            oneMonthStay,
            preActionProtocol,
            fixedRecoverableCosts,
            fixedRecoveryCostsBand,
            yesNo.YES,
            Number(noOfExperts),
            Number(noOfWitnesses),
            language,
            unavailableDatesRequired,
          );
        });
        await assertCaseState(expectedStateAfterResponse(2));
      });
    });

    test.describe('test8', () => {
      test.skip(claimOfflineAfterNotifyClaimDetails, 'Claim went offline at Notify claim / Notify claim details');
      test.skip(!claimantResponseClaimTypes.includes(claimType), 'Skipping as the claim has a litigant in person');
      test.skip(stateAfterAllResponses !== caseStates.AWAITING_APPLICANT_INTENTION, 'Skipping as not every defendant entered a full defence, so the claim went offline');
      test.use({ storageState: sessionUsers.claimantSolicitor.authFile });
      test('Claimant Solicitor responds to defence.', async ({ page, storageState }) => {
        await runEvent(page, storageState, async () => {
          await new RespondToDefence(page).submit(
            claimType,
            track,
            typeOfClaim as unspecClaimTypes,
            claimantProceed1,
            claimantProceed2,
            determinationWithoutHearing,
            oneMonthStay,
            preActionProtocol,
            fixedRecoverableCosts,
            fixedRecoveryCostsBand,
            yesNo.YES,
            Number(noOfExperts),
            Number(noOfWitnesses),
            language,
            unavailableDatesRequired,
          );
        });
        await assertCaseState(stateAfterClaimantResponse);
      });
    });

    test.describe('test9', () => {
      test.skip(claimOfflineAfterNotifyClaimDetails, 'Claim went offline at Notify claim / Notify claim details');
      test.skip(!claimantResponseClaimTypes.includes(claimType), 'Skipping as the claim has a litigant in person');
      test.skip(stateAfterAllResponses !== caseStates.AWAITING_APPLICANT_INTENTION, 'Skipping as not every defendant entered a full defence, so the claim went offline');
      test.skip(stateAfterClaimantResponse !== caseStates.JUDICIAL_REFERRAL, 'Skipping as the claimant did not proceed against every defendant, so the claim went offline');
      test.skip(track !== claimTrack.FAST, 'Skipping as the Standard Direction Order is only coded for the fast track');
      test.use({ storageState: sessionUsers.judge.authFile });
      test('Judge makes a Standard Direction Order.', async ({ page, storageState }) => {
        await runEvent(page, storageState, async () => {
          // Where work allocation is switched on, the judge needs the directions task to make the order. Noise induced
          // hearing loss claims get their own task.
          await new WaTaskHelper(page).assignTaskForEvent(caseId, 'CREATE_SDO', sdoTaskType);
          await new CreateSdo(page).submit(caseId, track, noiseInducedHearingLoss);
        });
        await assertCaseState(caseStates.CASE_PROGRESSION);
      });
    });

    // Each solicitor uploads evidence once the Standard Direction Order has moved the claim to CASE_PROGRESSION, so the
    // same claims as test9 run it
    test.describe('test10', () => {
      test.skip(claimOfflineAfterNotifyClaimDetails, 'Claim went offline at Notify claim / Notify claim details');
      test.skip(!claimantResponseClaimTypes.includes(claimType), 'Skipping as the claim has a litigant in person');
      test.skip(stateAfterAllResponses !== caseStates.AWAITING_APPLICANT_INTENTION, 'Skipping as not every defendant entered a full defence, so the claim went offline');
      test.skip(stateAfterClaimantResponse !== caseStates.JUDICIAL_REFERRAL, 'Skipping as the claimant did not proceed against every defendant, so the claim went offline');
      test.skip(track !== claimTrack.FAST, 'Skipping as the Standard Direction Order is only coded for the fast track');

      test.describe('Claimant Solicitor', () => {
        test.use({ storageState: sessionUsers.claimantSolicitor.authFile });
        test('Claimant Solicitor uploads evidence.', async ({ page, storageState }) => {
          await runEvent(page, storageState, async () => {
            await new UploadEvidence(page).submit();
          });
          await assertCaseState(caseStates.CASE_PROGRESSION);
        });
      });

      test.describe('Defendant 1 Solicitor', () => {
        test.use({ storageState: sessionUsers.respondent1Solicitor.authFile });
        test('Defendant 1 Solicitor uploads evidence.', async ({ page, storageState }) => {
          await runEvent(page, storageState, async () => {
            await new UploadEvidence(page).submit();
          });
          await assertCaseState(caseStates.CASE_PROGRESSION);
        });
      });

      test.describe('Defendant 2 Solicitor', () => {
        // Skipped here rather than in the test so beforeEach does not open the case as Defendant 2's solicitor
        test.skip(claimType !== claimTypes.ONE_VS_TWO_DIFF_SOL, 'Skipping as Defendant 2 has no separate solicitor');
        test.use({ storageState: sessionUsers.respondent2Solicitor.authFile });
        test('Defendant 2 Solicitor uploads evidence.', async ({ page, storageState }) => {
          await runEvent(page, storageState, async () => {
            await new UploadEvidence(page).submit();
          });
          await assertCaseState(caseStates.CASE_PROGRESSION);
        });
      });
    });

    // The hearing centre admin lists the trial once the evidence is in, so the same claims as test9 run it. This is done
    // in place of HMC returning a LISTED hearing, and moves the claim to HEARING_READINESS for the hearing fee.
    test.describe('test11', () => {
      test.skip(claimOfflineAfterNotifyClaimDetails, 'Claim went offline at Notify claim / Notify claim details');
      test.skip(!claimantResponseClaimTypes.includes(claimType), 'Skipping as the claim has a litigant in person');
      test.skip(stateAfterAllResponses !== caseStates.AWAITING_APPLICANT_INTENTION, 'Skipping as not every defendant entered a full defence, so the claim went offline');
      test.skip(stateAfterClaimantResponse !== caseStates.JUDICIAL_REFERRAL, 'Skipping as the claimant did not proceed against every defendant, so the claim went offline');
      test.skip(track !== claimTrack.FAST, 'Skipping as the Standard Direction Order is only coded for the fast track');
      test.use({ storageState: sessionUsers.hearingCentreAdmin.authFile });
      test('Hearing Centre Admin creates a hearing notice.', async ({ page, storageState }) => {
        await runEvent(page, storageState, async () => {
          await new CreateHearingNotice(page).submit(track);
        });
        await assertCaseState(caseStates.HEARING_READINESS);
      });
    });

    // Listing the trial in test11 set a hearing fee, which the claimant's solicitor pays from the Service Request tab.
    // Once it is paid, HEARING_FEE_PAID moves the claim to PREPARE_FOR_HEARING_CONDUCT_HEARING.
    test.describe('test12', () => {
      test.skip(claimOfflineAfterNotifyClaimDetails, 'Claim went offline at Notify claim / Notify claim details');
      test.skip(!claimantResponseClaimTypes.includes(claimType), 'Skipping as the claim has a litigant in person');
      test.skip(stateAfterAllResponses !== caseStates.AWAITING_APPLICANT_INTENTION, 'Skipping as not every defendant entered a full defence, so the claim went offline');
      test.skip(stateAfterClaimantResponse !== caseStates.JUDICIAL_REFERRAL, 'Skipping as the claimant did not proceed against every defendant, so the claim went offline');
      test.skip(track !== claimTrack.FAST, 'Skipping as the Standard Direction Order is only coded for the fast track');
      test.use({ storageState: sessionUsers.claimantSolicitor.authFile });
      test('Claimant Solicitor pays the hearing fee.', async ({ page, storageState }) => {
        await runEvent(page, storageState, async () => {
          await new PaymentPage(page).makePayment('PBA');
        });
        // The payment service tells civil-service about the payment, which can take a while. Where it cannot reach
        // civil-service the test tells it instead. Telling it both ways would update the case twice, and the late
        // update can clash with the next event (CCD rejects it with HTTP 409), so the test only steps in if the payment
        // service has not done it within a minute.
        const recordedByPaymentService = await testingEndpointHelper.waitForFeePaid(caseId, 'hearingFeePaymentDetails', 60);
        if (!recordedByPaymentService) {
          console.log('The payment service did not record the hearing fee payment, so the test does');
          await testingEndpointHelper.serviceRequestUpdateHearingFee(caseId);
        }
        // civil-service's scheduler would run HEARING_FEE_PAID later, so it is run now
        await testingEndpointHelper.triggerHearingFeePaid(caseId);
        await assertCaseState(caseStates.PREPARE_FOR_HEARING_CONDUCT_HEARING);
      });
    });

    // Each solicitor confirms the case is ready for trial. This is only offered on the fast track and must be done
    // more than 3 weeks before the hearing, which test11 lists about 8 weeks ahead. The claim stays in
    // PREPARE_FOR_HEARING_CONDUCT_HEARING.
    test.describe('test13', () => {
      test.skip(claimOfflineAfterNotifyClaimDetails, 'Claim went offline at Notify claim / Notify claim details');
      test.skip(!claimantResponseClaimTypes.includes(claimType), 'Skipping as the claim has a litigant in person');
      test.skip(stateAfterAllResponses !== caseStates.AWAITING_APPLICANT_INTENTION, 'Skipping as not every defendant entered a full defence, so the claim went offline');
      test.skip(stateAfterClaimantResponse !== caseStates.JUDICIAL_REFERRAL, 'Skipping as the claimant did not proceed against every defendant, so the claim went offline');
      test.skip(track !== claimTrack.FAST, 'Skipping as trial arrangements are only confirmed on the fast track');

      test.describe('Claimant Solicitor', () => {
        test.use({ storageState: sessionUsers.claimantSolicitor.authFile });
        test('Claimant Solicitor confirms trial arrangements.', async ({ page, storageState }) => {
          await runEvent(page, storageState, async () => {
            await new ConfirmTrialArrangements(page).submit();
          });
          await assertCaseState(caseStates.PREPARE_FOR_HEARING_CONDUCT_HEARING);
        });
      });

      test.describe('Defendant 1 Solicitor', () => {
        test.use({ storageState: sessionUsers.respondent1Solicitor.authFile });
        test('Defendant 1 Solicitor confirms trial arrangements.', async ({ page, storageState }) => {
          await runEvent(page, storageState, async () => {
            await new ConfirmTrialArrangements(page).submit();
          });
          await assertCaseState(caseStates.PREPARE_FOR_HEARING_CONDUCT_HEARING);
        });
      });

      test.describe('Defendant 2 Solicitor', () => {
        // Skipped here rather than in the test so beforeEach does not open the case as Defendant 2's solicitor
        test.skip(claimType !== claimTypes.ONE_VS_TWO_DIFF_SOL, 'Skipping as Defendant 2 has no separate solicitor');
        test.use({ storageState: sessionUsers.respondent2Solicitor.authFile });
        test('Defendant 2 Solicitor confirms trial arrangements.', async ({ page, storageState }) => {
          await runEvent(page, storageState, async () => {
            await new ConfirmTrialArrangements(page).submit();
          });
          await assertCaseState(caseStates.PREPARE_FOR_HEARING_CONDUCT_HEARING);
        });
      });
    });

    // The trial bundle, which a civil-service scheduler normally creates about 3 weeks before the hearing, is created
    // now. Once it has been stitched into one document it shows on the Bundles tab.
    test.describe('test14', () => {
      test.skip(claimOfflineAfterNotifyClaimDetails, 'Claim went offline at Notify claim / Notify claim details');
      test.skip(!claimantResponseClaimTypes.includes(claimType), 'Skipping as the claim has a litigant in person');
      test.skip(stateAfterAllResponses !== caseStates.AWAITING_APPLICANT_INTENTION, 'Skipping as not every defendant entered a full defence, so the claim went offline');
      test.skip(stateAfterClaimantResponse !== caseStates.JUDICIAL_REFERRAL, 'Skipping as the claimant did not proceed against every defendant, so the claim went offline');
      test.skip(track !== claimTrack.FAST, 'Skipping as the Standard Direction Order is only coded for the fast track');
      test.use({ storageState: sessionUsers.claimantSolicitor.authFile });
      test('Trial bundle is created and shown to the Claimant Solicitor.', async ({ page, storageState }) => {
        await testingEndpointHelper.triggerTrialBundle(caseId);
        const bundleTitle = await testingEndpointHelper.waitForBundleStitched(caseId);
        await runEvent(page, storageState, async () => {
          await pageHelper.gotoAndWaitForXui(caseUrl());
          await tabsHelper.selectTab('Bundles');
          await expect(page.getByText(bundleTitle).first()).toBeVisible();
        });
        await assertCaseState(caseStates.PREPARE_FOR_HEARING_CONDUCT_HEARING);
      });
    });

    // Civil has no record of the hearing itself taking place. Once the hearing date has passed, a civil-service scheduler
    // runs MOVE_TO_DECISION_OUTCOME, which moves the claim to DECISION_OUTCOME to wait for the judge's decision. The
    // hearing listed in test11 is weeks away, so the test runs that event itself.
    test.describe('test15', () => {
      test.skip(claimOfflineAfterNotifyClaimDetails, 'Claim went offline at Notify claim / Notify claim details');
      test.skip(!claimantResponseClaimTypes.includes(claimType), 'Skipping as the claim has a litigant in person');
      test.skip(stateAfterAllResponses !== caseStates.AWAITING_APPLICANT_INTENTION, 'Skipping as not every defendant entered a full defence, so the claim went offline');
      test.skip(stateAfterClaimantResponse !== caseStates.JUDICIAL_REFERRAL, 'Skipping as the claimant did not proceed against every defendant, so the claim went offline');
      test.skip(track !== claimTrack.FAST, 'Skipping as the Standard Direction Order is only coded for the fast track');
      test.use({ storageState: sessionUsers.judge.authFile });
      test('Hearing date passes and the claim moves to decision outcome.', async () => {
        await testingEndpointHelper.moveToDecisionOutcome(caseId);
        await assertCaseState(caseStates.DECISION_OUTCOME);
      });
    });

    // The judge's final order after the hearing, chosen with FINAL_ORDER. A free form order, or an assisted order with
    // no further hearing, does not change the claim's state. The order's notifications are sent by the
    // GENERATE_ORDER_NOTIFICATION business process.
    test.describe('test16', () => {
      test.skip(claimOfflineAfterNotifyClaimDetails, 'Claim went offline at Notify claim / Notify claim details');
      test.skip(!claimantResponseClaimTypes.includes(claimType), 'Skipping as the claim has a litigant in person');
      test.skip(stateAfterAllResponses !== caseStates.AWAITING_APPLICANT_INTENTION, 'Skipping as not every defendant entered a full defence, so the claim went offline');
      test.skip(stateAfterClaimantResponse !== caseStates.JUDICIAL_REFERRAL, 'Skipping as the claimant did not proceed against every defendant, so the claim went offline');
      test.skip(track !== claimTrack.FAST, 'Skipping as the Standard Direction Order is only coded for the fast track');
      test.use({ storageState: sessionUsers.judge.authFile });
      test(`Judge makes a final order (${finalOrder}).`, async ({ page, storageState }) => {
        const ordersBefore = await testingEndpointHelper.countFinalOrders(caseId);
        await runEvent(page, storageState, async () => {
          await new MakeFinalOrder(page).submit(finalOrder);
        });
        await testingEndpointHelper.waitForCamundaProcessToFinish(caseId, 'GENERATE_ORDER_NOTIFICATION');
        expect(await testingEndpointHelper.countFinalOrders(caseId), 'The final order was not added to the case').toBe(ordersBefore + 1);
        await assertCaseState(caseStates.DECISION_OUTCOME);
      });
    });

    // Court staff review the judge's order ("Order Made - Review case"). Confirming it is a final order, with no
    // obligation date and nothing left to do, closes the claim: it moves to All_FINAL_ORDERS_ISSUED and the
    // CONFIRM_ORDER_REVIEW_FINAL_ORDER business process runs.
    test.describe('test17', () => {
      test.skip(claimOfflineAfterNotifyClaimDetails, 'Claim went offline at Notify claim / Notify claim details');
      test.skip(!claimantResponseClaimTypes.includes(claimType), 'Skipping as the claim has a litigant in person');
      test.skip(stateAfterAllResponses !== caseStates.AWAITING_APPLICANT_INTENTION, 'Skipping as not every defendant entered a full defence, so the claim went offline');
      test.skip(stateAfterClaimantResponse !== caseStates.JUDICIAL_REFERRAL, 'Skipping as the claimant did not proceed against every defendant, so the claim went offline');
      test.skip(track !== claimTrack.FAST, 'Skipping as the Standard Direction Order is only coded for the fast track');
      test.use({ storageState: sessionUsers.hearingCentreAdmin.authFile });
      test('Hearing Centre Admin confirms the order review.', async ({ page, storageState }) => {
        await runEvent(page, storageState, async () => {
          await new ConfirmOrderReview(page).submit();
        });
        await testingEndpointHelper.waitForCamundaProcessToFinish(caseId, 'CONFIRM_ORDER_REVIEW_FINAL_ORDER');
        await assertCaseState(caseStates.All_FINAL_ORDERS_ISSUED);
      });
    });

  });
}
