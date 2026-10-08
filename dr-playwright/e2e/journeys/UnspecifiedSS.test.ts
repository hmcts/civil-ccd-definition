import { expect, test } from '@playwright/test';
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
import ClaimTypes from '../../enums/claim-types.ts';
import fixedRecoveryCostsBands from '../../enums/fixedRecoveryCostsBands.ts';
import languageSpokenAndDocuments from '../../enums/languageSpokenAndDocuments.ts';
import { CaseUserRegistry } from '../../helpers/CaseUserRegistry.ts';
import caseStates from '../../enums/caseStates.ts';

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
  FIXED_RECOVERY_COSTS_BAND: enums({
    values: [
      fixedRecoveryCostsBands.BAND1,
      fixedRecoveryCostsBands.BAND2,
      fixedRecoveryCostsBands.BAND3,
      fixedRecoveryCostsBands.BAND4
    ],
    default: fixedRecoveryCostsBands.BAND1
  }),
});


let defendant1Journey : ClaimTypes[] = [
  claimTypes.ONE_VS_ONE,
  claimTypes.ONE_VS_TWO_SAME_SOL,
  claimTypes.ONE_VS_TWO_DIFF_SOL,
  claimTypes.TWO_VS_ONE,
  claimTypes.ONE_VS_TWO_LR_LIP
];
const claimType: claimTypes = env.CLAIM_TYPE;
const runningEnvironment: environment = env.ENVIRONMENT;
const respondent1ResponseIntention: responseIntentions = env.RESPONDENT1_RESPONSE_INTENTION;
const respondent2ResponseIntention: responseIntentions = env.RESPONDENT2_RESPONSE_INTENTION;
const respondent1Response: respondentResponses = env.RESPONDENT1_RESPONSE;
const respondent2Response: respondentResponses = env.RESPONDENT2_RESPONSE;
const fixedRecoverableCosts: yesNo = ['Yes'].includes(process.env.CLAIMANT1_LITIGANT_FRIEND)
  ? yesNo.YES
  : yesNo.NO;
const fixedRecoveryCostsBand: fixedRecoveryCostsBands = env.FIXED_RECOVERY_COSTS_BAND;
const caseType: string = 'UNSPECIFIED';
const claimantType: string = ['INDIVIDUAL', 'COMPANY', 'ORGANISATION', 'SOLE_TRADER'].includes(
  process.env.CLAIMANT_TYPE,
)
  ? process.env.CLAIMANT_TYPE
  : 'INDIVIDUAL';
const defendantType: string = ['INDIVIDUAL', 'COMPANY', 'ORGANISATION', 'SOLE_TRADER'].includes(
  process.env.DEFENDANT_TYPE,
)
  ? process.env.DEFENDANT_TYPE
  : 'INDIVIDUAL';
const typeOfClaim = process.env.TYPE_OF_CLAIM;
const typeOfClaimSubType: string = process.env.SUB_TYPE;
const defendantsToNotifyClaim: notifyClaimOptions = env.DEFENDANTS_TO_NOTIFY_CLAIM;
const defendantsToNotifyClaimDetails: notifyClaimOptions = env.DEFENDANTS_TO_NOTIFY_CLAIM_DETAILS;
// Notifying only one defendant takes the claim offline, so no later events can be done online
const claimOfflineAfterNotifyClaim = defendantsToNotifyClaim !== notifyClaimOptions.BOTH;
const claimOfflineAfterNotifyClaimDetails =
  claimOfflineAfterNotifyClaim || defendantsToNotifyClaimDetails !== notifyClaimOptions.BOTH;
// Once every defendant has responded, the claim moves on to the claimant's intention if all responses are a full
// defence and goes offline otherwise.
const responsesForClaimType = [claimTypes.ONE_VS_TWO_DIFF_SOL, claimTypes.ONE_VS_TWO_SAME_SOL, claimTypes.TWO_VS_ONE].includes(claimType)
  ? [respondent1Response, respondent2Response]
  : [respondent1Response];
const stateAfterAllResponses = responsesForClaimType.every((response) => response === respondentResponses.FULL_DEFENCE)
  ? caseStates.AWAITING_APPLICANT_INTENTION
  : caseStates.PROCEEDS_IN_HERITAGE_SYSTEM;

// In a 1v2DS claim each defendant's solicitor responds separately, in either order, and the claim waits in
// AWAITING_RESPONDENT_ACKNOWLEDGEMENT until both have responded. Tracking who has responded keeps the expected
// state right whichever defendant responds first.
const defendantsResponded = new Set<number>();
function expectedStateAfterResponse(defendantNumber: number): caseStates {
  defendantsResponded.add(defendantNumber);
  const waitingForOtherDefendant = claimType === claimTypes.ONE_VS_TWO_DIFF_SOL && defendantsResponded.size < 2;
  return waitingForOtherDefendant ? caseStates.AWAITING_RESPONDENT_ACKNOWLEDGEMENT : stateAfterAllResponses;
}

const claimant1LitigantFriend: yesNo = ['Yes'].includes(process.env.CLAIMANT1_LITIGANT_FRIEND)
  ? yesNo.YES
  : yesNo.NO;
const claimant2LitigantFriend: yesNo = ['Yes'].includes(process.env.CLAIMANT2_LITIGANT_FRIEND)
  ? yesNo.YES
  : yesNo.NO;
const defendant1LitigantFriend: yesNo = ['Yes'].includes(process.env.DEFENDANT1_LITIGANT_FRIEND)
  ? yesNo.YES
  : yesNo.NO;
const defendant2LitigantFriend: yesNo = ['Yes'].includes(process.env.DEFENDANT2_LITIGANT_FRIEND)
  ? yesNo.YES
  : yesNo.NO;
const determinationWithoutHearing: YesNo = ['Yes'].includes(process.env.DETERMINATION_WITHOUT_HEARING)
  ? yesNo.YES
  : yesNo.NO;
const oneMonthStay: YesNo = ['Yes'].includes(process.env.ONE_MONTH_STAY)
  ? yesNo.YES
  : yesNo.NO;
const preActionProtocol: YesNo = ['Yes'].includes(process.env.ONE_MONTH_STAY)
  ? yesNo.YES
  : yesNo.NO;

let track: claimTrack = ['SMALL_CLAIM', 'FAST_CLAIM', 'INTERMEDIATE_CLAIM', 'MULTI_CLAIM'].includes(process.env.TRACK) ? (process.env.TRACK as claimTrack) : claimTrack.FAST;
const noOfExperts: string = process.env.EXPERTS ?? '0';
const noOfWitnesses: string = process.env.WITNESSES ?? '0';
const language: languageSpokenAndDocuments = ['WELSH', 'ENGLISH', 'BOTH'].includes(process.env.LANGUAGE) ? (process.env.LANGUAGE as languageSpokenAndDocuments) : languageSpokenAndDocuments.ENGLISH;
const unavailableDatesRequired: YesNo = ['Yes'].includes(process.env.UNAVAILABLE_DATES)
  ? yesNo.YES
  : yesNo.NO;

let caseId: string = '';
let pageHelper: PageHelper;
let buttonHelper: ButtonHelper;
let tabsHelper: TabsHelper;
let testingEndpointHelper: TestingEndPointHelper;
let createCasePage: CreateCasePage;

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
});

test.beforeEach(async ({ page }) => {
  pageHelper = new PageHelper(page);
  buttonHelper = new ButtonHelper(page);
  createCasePage = new CreateCasePage(page);
  tabsHelper = new TabsHelper(page);
  testingEndpointHelper = new TestingEndPointHelper();
  await pageHelper.gotoAndWaitForXui(envUrl + '/cases/case-details/' + caseId);
  // XUI can redirect to the case list on the first load of a session, so open the case again if that happened
  if (caseId && !page.url().includes(caseId)) {
    await pageHelper.gotoAndWaitForXui(envUrl + '/cases/case-details/' + caseId);
  }
});

test.describe.configure({ mode: 'serial' });
test.describe('test1', { tag: '@unspecified' }, () => {
  test.use({ storageState: './dr-playwright/e2e/.auth/ClaimantSolicitorUser.json' });
  test('Claimant Solicitor creates ' + claimType + ' claim ', async ({ page }) => {
    let createCase: CreateUnspecifiedCase = new CreateUnspecifiedCase(page);
    await createCasePage.createCase(caseType);
    await buttonHelper.continueButton.click(); //Summary
    await createCase.setReferences(claimType); // do not think we need to pass claimtype.....
    await createCase.setCourt();
    await createCase.setClaimantType(claimantType, 1);
    await createCase.setClaimantLitigantFriend(claimant1LitigantFriend, 1);
    await createCase.setClaimantNotifications();
    await buttonHelper.continueButton.click(); //ClaimantSolicitorOrganisation
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
    await buttonHelper.continueButton.click(); //Amount to pay - can do an assertion on amount by api to fee and pay to make sure fee is correct, if needed.
    await createCase.setStatementOfTruth(); //will be dependant upon case ie 1v1 etc
    await buttonHelper.submitButton.click(); //CYA
    await buttonHelper.closeAndReturnToCaseDetailsButton.click(); //Success

    caseId = await pageHelper.grabCaseNumber();
    console.log('caseId>>>>>>>>>>>>>>>' + caseId + '<<<<<<<<<<<<<<<<<<<');
    CaseUserRegistry.record(caseId, 'claimantSolicitor');
    // Pay the claim fee
    await new PaymentPage(page).makePayment('PBA');
    // When pay is called we send a callback url - pay should then use our callback url so that the next camunda process is kicked off which
    // sends the appropriate party emails and generates the claim certificate.  As this is not happening we will need to manually fire the
    // callback so the aforementioned camunda task completes and the test can continue

    if (![environment.PREVIEW, environment.DEMO].includes(runningEnvironment)) {
      await new TestingEndPointHelper().waitForCamundaProcessToFinish(
        caseId,
        'CREATE_CLAIM_AFTER_PAYMENT',
      );
    } else {
      await new TestingEndPointHelper().serviceRequestUpdateClaimIssued(caseId);
    }
    await testingEndpointHelper.assertCaseState(caseId, caseStates.CASE_ISSUED);
  });

  test.describe('test2', { tag: '@unspecified' }, () => {
    test.use({ storageState: './dr-playwright/e2e/.auth/ClaimantSolicitorUser.json' });
    test('Claimant Solicitor undertakes event: Notify claim ', async ({ page }) => {
      await new NotifyClaim(page).notify(claimType, defendantsToNotifyClaim);
      await testingEndpointHelper.waitForCamundaProcessToFinish(
        caseId,
        'NOTIFY_DEFENDANT_OF_CLAIM',
      );
      if (claimOfflineAfterNotifyClaim) {
        await testingEndpointHelper.assertCaseState(caseId, caseStates.PROCEEDS_IN_HERITAGE_SYSTEM);
        console.log('Notify claim -> claim went offline, later events are skipped');
      } else {
        await testingEndpointHelper.assertCaseState(caseId, caseStates.AWAITING_CASE_DETAILS_NOTIFICATION);
      }
    });
  });

  test.describe('test3', { tag: '@unspecified' }, () => {
    test.skip(claimOfflineAfterNotifyClaim, 'Claim went offline at Notify claim');
    test.use({ storageState: './dr-playwright/e2e/.auth/ClaimantSolicitorUser.json' });
    test('Claimant Solicitor undertakes event: Notify claim details ', async ({ page }) => {
      await new NotifyClaimDetails(page).notify(claimType, defendantsToNotifyClaimDetails);
      await testingEndpointHelper.waitForCamundaProcessToFinish(
        caseId,
        'NOTIFY_DEFENDANT_OF_CLAIM_DETAILS',
      );
      if (claimOfflineAfterNotifyClaimDetails) {
        await testingEndpointHelper.assertCaseState(caseId, caseStates.PROCEEDS_IN_HERITAGE_SYSTEM);
        console.log('Notify claim details -> claim went offline, later events are skipped');
      } else {
        await testingEndpointHelper.assertCaseState(caseId, caseStates.AWAITING_RESPONDENT_ACKNOWLEDGEMENT);
      }
    });
  });

  test.describe('test4', { tag: '@unspecified' }, () => {
    test.skip(claimOfflineAfterNotifyClaimDetails, 'Claim went offline at Notify claim / Notify claim details');
    test.use({ storageState: './dr-playwright/e2e/.auth/Respondent1SolicitorUser.json' });
    test('Defendant 1 Solicitor acknowledges claim.', async ({ page }) => {
      test.skip(!defendant1Journey.includes(claimType), 'Skipping as first defendant is a LiP');
        await testingEndpointHelper.assignDefendantLegalRepToCase(caseId, claimType);
        // The case page was opened before this solicitor was assigned to the case, so open it again now they can see it
        await pageHelper.gotoAndWaitForXui(envUrl + '/cases/case-details/' + caseId);
        await new AcknowledgeClaim(page).acknowledge(
          claimType,
          respondent1ResponseIntention,
          respondent2ResponseIntention,
          1,
        );
        await testingEndpointHelper.assertCaseState(caseId, caseStates.AWAITING_RESPONDENT_ACKNOWLEDGEMENT);
    });
  });

  test.describe('test5', { tag: '@unspecified' }, () => {
    test.skip(claimOfflineAfterNotifyClaimDetails, 'Claim went offline at Notify claim / Notify claim details');
    test.use({ storageState: './dr-playwright/e2e/.auth/Respondent2SolicitorUser.json' });
    test('Defendant 2 Solicitor acknowledges claim.', async ({ page }) => {
      test.skip(claimType !== claimTypes.ONE_VS_TWO_DIFF_SOL, 'Skipping test as not a 1v2DS claim');
      await new AcknowledgeClaim(page).acknowledge(
        claimType,
        respondent1ResponseIntention,
        respondent2ResponseIntention,
        2,
      );
      await testingEndpointHelper.assertCaseState(caseId, caseStates.AWAITING_RESPONDENT_ACKNOWLEDGEMENT);
    });
  });

  test.describe('test6', { tag: '@unspecified' }, () => {
    test.skip(claimOfflineAfterNotifyClaimDetails, 'Claim went offline at Notify claim / Notify claim details');
    test.use({ storageState: './dr-playwright/e2e/.auth/Respondent1SolicitorUser.json' });
    test('Defendant 1 Solicitor responds to claim.', async ({ page }) => {
      test.skip(!defendant1Journey.includes(claimType), 'Skipping as first defendant is a LiP');
      console.log('>>>> ', fixedRecoveryCostsBand);
      await new RespondToClaim(page).submit(
        claimType,
        track,
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
      await testingEndpointHelper.assertCaseState(caseId, expectedStateAfterResponse(1));
    });
  });

  test.describe('test7', { tag: '@unspecified' }, () => {
    test.skip(claimOfflineAfterNotifyClaimDetails, 'Claim went offline at Notify claim / Notify claim details');
    test.use({ storageState: './dr-playwright/e2e/.auth/Respondent2SolicitorUser.json' });
    test('Defendant 2 Solicitor responds to claim.', async ({ page }) => {
      test.skip(claimType !== claimTypes.ONE_VS_TWO_DIFF_SOL, 'Skipping test as not a 1v2DS claim');
      await new RespondToClaim(page).submit(
        claimType,
        track,
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
      await testingEndpointHelper.assertCaseState(caseId, expectedStateAfterResponse(2));
    });
  });

});
