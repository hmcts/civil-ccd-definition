import { expect, test } from '@playwright/test';
import { envUrl } from '../../../civilConfig.ts';
import { CreateSpecifiedCase } from '../../flows/createSpecifiedCase.ts';
import * as ui from '../../flows/events/ui/index.ts';
import * as api from '../../flows/events/api/index.ts';
import { sendAndReplySteps } from '../sendAndReplySteps.ts';
import { ReconsiderationDecision, RequestForReconsiderationBy } from '../../../enums/reconsideration.ts';
import { WaTaskHelper } from '../../../helpers/WaTaskHelper.ts';
import claimTrack from '../../../enums/track.ts';
import yesNo from '../../../enums/yesNo.ts';
import claimTypes from '../../../enums/claim-types.ts';
import caseStates from '../../../enums/caseStates.ts';
import PaymentMethod from '../../../enums/paymentMethod.ts';
import { CaseUserRegistry } from '../../../helpers/CaseUserRegistry.ts';
import { SessionUserKey } from '../../../helpers/SessionHelper.ts';
import { workingDayAfter } from '../../../helpers/WorkingDayHelper.ts';
import { JourneyContext, JourneyStep, JourneyStops, withNeeds } from '../journeyRunner.ts';
import { Fact, holds } from '../claimFacts.ts';
import { moveResponseDeadline } from '../steps/moveResponseDeadline.ts';
import { liftStay, manageStayRequestUpdate, stayCase } from '../steps/stayCaseSteps.ts';
import {
  caseProceedsInCaseman, closingProblemsFor, discontinueSteps, settleClaim, settleClaimMarkPaidFull,
} from '../steps/closingSteps.ts';
import { makeDirectionsOrder } from '../steps/makeDirectionsOrder.ts';
import { createHearingNotice } from '../steps/createHearingNotice.ts';
import { payHearingFee } from '../steps/payHearingFee.ts';
import { moveToDecisionOutcome } from '../steps/moveToDecisionOutcome.ts';
import { makeFinalOrder } from '../steps/makeFinalOrder.ts';
import { confirmOrderReview } from '../steps/confirmOrderReview.ts';
import { createSdo, sdoTask, sdoUser } from '../steps/createSdo.ts';
import { trialReadyCheck } from '../steps/trialReadyCheck.ts';
import { createTrialBundle } from '../steps/createTrialBundle.ts';
import { caseFlagSteps } from '../steps/caseFlagSteps.ts';
import { manageContactInformationSteps } from '../steps/manageContactInformationSteps.ts';
import { withNoticeOfChange } from '../noticeOfChangeSteps.ts';
import { withEvents } from '../eventSteps.ts';
import { withGeneralApplication } from '../generalApplicationSteps.ts';
import { withQueryManagement } from '../queryManagementSteps.ts';
import { addUnavailableDatesSteps } from '../addUnavailableDatesSteps.ts';
import { notSuitableSdoSteps, withNotSuitableSdo } from '../notSuitableSdoSteps.ts';
import { withDisputeResolutionHearing } from '../disputeResolutionHearing.ts';
import { expectFlightDelayClaim, expectFlightDelayCourt } from '../flightDelay.ts';
import { countMediationDocuments } from '../../flows/events/shared_api_ui/uploadMediationDocumentsSpecs.ts';
import NotSuitableSdo from '../../../enums/notSuitableSdo.ts';
import { withRefund } from '../refundSteps.ts';
import { specifiedConfig, SpecifiedConfig } from './specifiedConfig.ts';

// The steps of the specified journey, in the order they run. Each step that does not apply to the journey's claim
// (see skipIf) is skipped. The notices of change (NOTICE_OF_CHANGE) are added after the NOTICE_OF_CHANGE_AFTER step
// (see noticeOfChangeSteps.ts), and a general application (GENERAL_APPLICATION) after the GENERAL_APPLICATION_AFTER step
// (see generalApplicationSteps.ts), and the queries (QUERY_MANAGEMENT) after the QUERY_MANAGEMENT_AFTER step (see
// queryManagementSteps.ts).
export function specifiedSteps(c: SpecifiedConfig, ctx: JourneyContext): JourneyStep[] {
  const stepsFor = (config: SpecifiedConfig) =>
    withRefund(config, ctx, withQueryManagement(config, ctx, withGeneralApplication(config, ctx, journeySteps(config, ctx))));
  return withNoticeOfChange(c, ctx, stepsFor(c), (claimType) =>
    stepsFor(specifiedConfig({ ...c.scenarioEnv, CLAIM_TYPE: claimType, NOTICE_OF_CHANGE: undefined })));
}

function journeySteps(c: SpecifiedConfig, ctx: JourneyContext): JourneyStep[] {
  // Once the claim fee has been paid (through the UI or the API), the payment service tells civil-service, which then
  // issues the claim (CREATE_CLAIM_SPEC_AFTER_PAYMENT). Where the payment service cannot reach civil-service the test
  // tells it instead. Telling it both ways would make civil-service try to issue the claim twice, so the test only
  // steps in if the payment service has not done it within a minute.
  async function waitForClaimIssued() {
    const recordedByPaymentService = await ctx.testingEndpointHelper.waitForFeePaid(ctx.caseId, 'claimIssuedPaymentDetails', 60);
    if (recordedByPaymentService) {
      await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'CREATE_CLAIM_SPEC_AFTER_PAYMENT');
    } else {
      console.log('The payment service did not record the claim fee payment, so the test does');
      await ctx.testingEndpointHelper.serviceRequestUpdateClaimIssued(ctx.caseId, 'CREATE_CLAIM_SPEC_AFTER_PAYMENT');
    }
    await ctx.assertCaseState(caseStates.AWAITING_RESPONDENT_ACKNOWLEDGEMENT);
    // ASSIGN_DEFENDANT_SOLICITORS is skipped when the run stops here
    await ctx.assignDefendantSolicitorsIfStoppedAwaitingThem(c.claimType);
  }


  // Asking for the legal adviser's small claims order to be reconsidered (REQUEST_FOR_RECONSIDERATION), once the order
  // has moved the claim to CASE_PROGRESSION (c.facts.reachesCaseProgression), and the judge's decision on it
  const reconsiderationOff: Array<[boolean, string]> = [
    [c.requestForReconsideration === undefined, 'Reconsideration is switched off (set REQUEST_FOR_RECONSIDERATION=CLAIMANT, DEFENDANT_1 or DEFENDANT_2 to run it)'],
    [c.track !== claimTrack.SMALL, 'Skipping as only a legal adviser\'s small claims order can be reconsidered'],
  ];
  const reconsiderationRequesters: Record<RequestForReconsiderationBy, { label: string; user: SessionUserKey }> = {
    [RequestForReconsiderationBy.CLAIMANT]: { label: 'Claimant Solicitor', user: 'claimantSolicitor' },
    [RequestForReconsiderationBy.DEFENDANT_1]: { label: 'Defendant 1 Solicitor', user: 'respondent1Solicitor' },
    [RequestForReconsiderationBy.DEFENDANT_2]: { label: 'Defendant 2 Solicitor', user: 'respondent2Solicitor' },
  };
  const reconsiderationRequester = reconsiderationRequesters[c.requestForReconsideration ?? RequestForReconsiderationBy.CLAIMANT];


  // Default judgment (DEFAULT_JUDGMENT=Yes), and the steps it replaces: once judgment is asked for, the defendants'
  // steps and everything after them are skipped, apart from settling or discontinuing the claim
  const noDefaultJudgment: [boolean, string] = [c.defaultJudgment !== yesNo.YES, 'Default judgment is switched off (set DEFAULT_JUDGMENT=Yes to run it)'];

  // The problems with closing the claim where the journey ends (see ../steps/closingSteps.ts)
  const closingProblems = closingProblemsFor(c, journeyEndState);

  // The facts each step needs are added to its skipIf straight away (withNeeds), as later code reads and copies them,
  // and the events in playwright-tests/events are put in (withEvents)
  const steps: JourneyStep[] = withEvents(c, ctx, closingProblems, withNeeds([
    {
      name: 'CREATE_CLAIM',
      title: 'Claimant Solicitor creates ' + c.claimType + ' specified claim ',
      user: 'claimantSolicitor',
      run: async ({ page, storageState }) => {
        if (ctx.useApi()) {
          // One CCD API submit instead of the CREATE_CLAIM_SPEC pages (API_UNTIL), then the claim fee is paid through
          // the payment service, as the UI's "Pay now" does
          const createClaim = new api.CreateClaimSpec();
          ctx.caseId = await createClaim.create(c);
          CaseUserRegistry.record(ctx.caseId, 'claimantSolicitor');
          await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'CREATE_SERVICE_REQUEST_CLAIM');
          await ctx.assertCaseState(caseStates.PENDING_CASE_ISSUED);
          if (c.paymentMethod === PaymentMethod.CARD) {
            await ctx.payFeeInUi(page, storageState, 'claimIssuedPBADetails', c.paymentMethod);
          } else {
            await createClaim.payClaimFee(ctx.caseId);
          }
          await waitForClaimIssued();
          if (c.airlineClaim === yesNo.YES) {
            await expectFlightDelayClaim(ctx, c.otherAirline);
          }
          return;
        }
        const pageHelper = ctx.pageHelper;
        // If the session ends before the claim is submitted, the claim is started again from the case list
        await ctx.runEvent(page, storageState, async () => {
          const createCase = new CreateSpecifiedCase(page);
          await ctx.createCasePage.createCase(c.caseType);
          await pageHelper.continueToNextPage(); //Check list
          await pageHelper.continueToNextPage(); //Eligibility
          const { claimants, defendants } = c.claimShape;
          await createCase.setReferences(defendants[0].solicitor !== 'none');
          await createCase.setClaimantType(claimants[0].type, 1);

          if (claimants.length === 2) {
            await createCase.setAnotherClaimant(yesNo.YES);
            await createCase.setClaimantType(claimants[1].type, 2);
          } else {
            await createCase.setAnotherClaimant(yesNo.NO);
          }

          await createCase.setClaimantNotifications();
          await createCase.setSolicitorOrganisation('Civil - Organisation 1');
          await createCase.setClaimantCorrespondenceAddress();

          for (const [index, defendant] of defendants.entries()) {
            const defendantNumber = index + 1;
            if (defendantNumber === 2) {
              await createCase.setAnotherDefendant(yesNo.YES);
            }
            await createCase.setDefendantType(defendant.type, defendantNumber);

            if (defendant.solicitor === 'none') {
              console.log(`Defendant ${defendantNumber}: NOT represented`);
              await createCase.setDefendantLegallyRepresented(yesNo.NO, defendantNumber);
            } else if (defendant.solicitor === 'sameAsDefendant1') {
              console.log(`Defendant ${defendantNumber}: REPRESENTED - same sols`);
              await createCase.setDefendantLegallyRepresented(yesNo.YES, defendantNumber);
              await createCase.setSameLegalRepresentative(yesNo.YES);
            } else {
              console.log(`Defendant ${defendantNumber}: REPRESENTED`);
              await createCase.setDefendantLegallyRepresented(yesNo.YES, defendantNumber);
              // Defendant 2 is only asked whether they have the same solicitor when Defendant 1 has one
              if (defendantNumber === 2 && defendants[0].solicitor !== 'none') {
                await createCase.setSameLegalRepresentative(yesNo.NO);
              }
              await createCase.setDefendantSolicitorOrganisation(defendant.organisation.name, defendantNumber);
              await createCase.setDefendantLegalRepresentativeEmail(defendantNumber);
              await createCase.setDefendantLegalRepresentativeCorrespondenceAddress(defendantNumber);
            }
          }

          // A claim with two claimants cannot have a second defendant, so it is not asked for
          if (claimants.length === 1 && defendants.length === 1) {
            await createCase.setAnotherDefendant(yesNo.NO);
          }

          await createCase.setAirlineClaim(c.airlineClaim, c.otherAirline);
          await createCase.setDescriptionOfClaim();
          await createCase.setTimeline(c.timeline);
          await createCase.setEvidence();
          await createCase.setClaimAmount(c.track);
          await createCase.setInterest(c.interestRequired, c.interestType, c.interestRate, c.interestFrom, c.interestFromDate, c.interestUntil);
          await createCase.confirmTotalAndFee();
          await createCase.setFixedCommencementCosts(c.fixedCommencementCosts);
          await createCase.setStatementOfTruth();
          await pageHelper.submitEvent(); //CYA
          await ctx.buttonHelper.closeAndReturnToCaseDetailsButton.click(); //Success
        }, envUrl);

        ctx.caseId = await pageHelper.grabCaseNumber();
        console.log('caseId>>>>>>>>>>>>>>>' + ctx.caseId + '<<<<<<<<<<<<<<<<<<<');
        CaseUserRegistry.record(ctx.caseId, 'claimantSolicitor');
        // Pay the claim fee, in its row of the Service Request tab
        await ctx.payFeeInUi(page, storageState, 'claimIssuedPBADetails', c.paymentMethod);
        await waitForClaimIssued();
        if (c.airlineClaim === yesNo.YES) {
          await expectFlightDelayClaim(ctx, c.otherAirline);
        }
      },
    },



    moveResponseDeadline(c, ctx),

    // The claimant's solicitor asks for default judgment against every defendant, paid immediately. civil-service
    // records it through Judgments Online: where the judgment buffer applies the claim waits in JUDGMENT_REQUESTED for
    // the judgment to be issued (JUDGMENT_REQUESTED_SPEC), otherwise it is issued straight away and the claim moves to
    // All_FINAL_ORDERS_ISSUED (DEFAULT_JUDGEMENT_NON_DIVERGENT_SPEC). As in civil-service's DefaultJudgementSpecHandler,
    // the buffer only applies when the judgment-buffer flag is on and Defendant 1 has no solicitor: the flag is on in
    // previews and off on AAT, so a represented defendant's claim never waits.
    {
      name: 'DEFAULT_JUDGMENT',
      title: 'Claimant Solicitor requests default judgment.',
      user: 'claimantSolicitor',
      skipIf: [noDefaultJudgment],
      run: async ({ page, storageState, user }) => {
        await ctx.submitEvent(page, storageState, {
          api: () => new api.DefaultJudgmentSpec().submit(ctx.caseId, user),
          ui: () => new ui.DefaultJudgmentSpec(page).submit(c.claimShape.defendants.length === 2),
        });
        const judgmentBuffer = await ctx.testingEndpointHelper.isFeatureEnabled('judgment-buffer')
          && (await ctx.testingEndpointHelper.getCaseData(ctx.caseId)).respondent1Represented === yesNo.NO;
        await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, judgmentBuffer ? 'JUDGMENT_REQUESTED_SPEC' : 'DEFAULT_JUDGEMENT_NON_DIVERGENT_SPEC');
        await ctx.assertCaseState(judgmentBuffer ? caseStates.JUDGMENT_REQUESTED : caseStates.All_FINAL_ORDERS_ISSUED);
      },
    },

    // A specified claim has no Notify claim or Notify claim details: once it is issued it waits for the defendants'
    // responses. The defendants' solicitors are given access to it here, as the claimant's solicitor, so that their own
    // steps can open the case. Where no defendant has a solicitor no one is assigned, but the step still runs, as the
    // notices of change follow it by default (NOTICE_OF_CHANGE) and are skipped when the step they follow is.
    {
      name: 'ASSIGN_DEFENDANT_SOLICITORS',
      title: 'Defendant solicitors are assigned to the claim.',
      user: 'claimantSolicitor',
      run: async () => {
        await ctx.testingEndpointHelper.assignDefendantLegalRepToCase(ctx.caseId, c.claimType, [...ctx.defendantsGivenSolicitorByNoc]);
        await ctx.assertCaseState(caseStates.AWAITING_RESPONDENT_ACKNOWLEDGEMENT);
      },
    },


    // A specified claim is not acknowledged by a defendant's solicitor: the CCD definition only gives them read access
    // to ACKNOWLEDGEMENT_OF_SERVICE, so XUI does not offer it.

    // Each defendant's solicitor informs the court of an agreed extension to respond, which moves their response
    // deadline back. Only run with INFORM_AGREED_EXTENSION=Yes.
    ...informAgreedExtensionSteps(),

    // Each defendant's solicitor responds: a full defence, a full or part admission, or a counterclaim
    ...respondToClaimSteps(),

    // The claimant's solicitor responds to the defence or the admission: proceeding with the claim or not, or accepting
    // or rejecting what a defendant admits and when they will pay (CLAIMANT_PROCEED, CLAIMANT_ACCEPTS_AMOUNT,
    // CLAIMANT_ACCEPTS_PLAN, CLAIMANT_SUGGESTED_PAYMENT)
    {
      name: 'RESPOND_TO_DEFENCE',
      title: 'Claimant Solicitor responds to defence.',
      user: 'claimantSolicitor',
      needs: [c.facts.everyDefendantRepresented],
      skipIf: [
        [!c.claimantResponds, 'Skipping as the claim went offline once the defendants responded'],
      ],
      run: async ({ page, storageState, user }) => {
        await ctx.submitEvent(page, storageState, {
          api: () => new api.RespondToDefenceSpec().submit(c, ctx.caseId, user),
          ui: () => new ui.RespondToDefenceSpec(page).submit(c.claimType, c.claimantResponse),
          businessProcess: c.claimantOutcome.businessProcess,
          expectState: c.claimantOutcome.state,
        });
        if (c.flightDelaySmallClaim && [caseStates.JUDICIAL_REFERRAL, caseStates.IN_MEDIATION].includes(c.claimantOutcome.state)) {
          await expectFlightDelayCourt(ctx, c.otherAirline);
        }
      },
    },

    ...caseFlagSteps(c, ctx),
    ...manageContactInformationSteps(c, ctx),

    // Each solicitor adds unavailable dates for their parties, then the hearing centre admin adds some for a defendant,
    // in JUDICIAL_REFERRAL or IN_MEDIATION. Only run with ADD_UNAVAILABLE_DATES=Yes.
    ...addUnavailableDatesSteps(c, ctx, holds(c.facts.everyDefendantRepresented), c.claimantOutcome.state, [
      ...c.facts.everyDefendantRepresented,
      [!c.claimantResponds, 'Skipping as the claim went offline once the defendants responded'],
    ]),

    stayCase(c, ctx),

    manageStayRequestUpdate(c, ctx),

    // The hearing centre admin sends a district judge a message and the judge replies, while the case is stayed with
    // STAY_CASE=Yes, otherwise in JUDICIAL_REFERRAL. Only run with SEND_AND_REPLY=Yes.
    ...sendAndReplySteps(c, ctx, c.stayCase === yesNo.YES ? caseStates.CASE_STAYED : caseStates.JUDICIAL_REFERRAL, c.facts.reachesJudicialReferral),

    liftStay(c, ctx),

    // A small claim the claimant's response took to mediation: court staff record that mediation did not settle it,
    // which takes it to JUDICIAL_REFERRAL for the judge's directions. Where it settled (MEDIATION_SUCCESSFUL=Yes, an event
    // file) this is skipped.
    {
      name: 'MEDIATION_UNSUCCESSFUL',
      title: 'Hearing Centre Admin records that mediation was unsuccessful.',
      user: 'hearingCentreAdmin',
      needs: [c.facts.reachesMediation],
      skipIf: [
        [c.mediationSuccessful === yesNo.YES, 'Skipping as mediation was successful (MEDIATION_SUCCESSFUL=Yes)'],
      ],
      run: async ({ page, storageState }) => {
        await ctx.submitEvent(page, storageState, {
          api: () => new api.MediationUnsuccessful().submit(ctx.caseId),
          ui: () => new ui.MediationUnsuccessful(page).submit(),
          businessProcess: 'MEDIATION_UNSUCCESSFUL',
          expectState: caseStates.JUDICIAL_REFERRAL,
        });
      },
    },

    // Each solicitor uploads mediation documents once mediation has been unsuccessful (UPLOAD_MEDIATION_DOCUMENTS=Yes)
    ...uploadMediationDocumentsSteps(),

    // The judge (or, for a small claim, the legal adviser) decides the claim is not suitable for a Standard Direction
    // Order, and with CHANGE_LOCATION the hearing centre admin transfers it to another hearing centre, whose directions
    // task CREATE_SDO then uses (NOT_SUITABLE_SDO, see notSuitableSdoSteps.ts)
    ...notSuitableSdoSteps(c.notSuitableSdo, ctx, sdoUser(c), sdoTask(c)),

    createSdo(c, ctx),

    // A party's solicitor asks for the legal adviser's small claims order to be reconsidered
    // (REQUEST_FOR_RECONSIDERATION=CLAIMANT, DEFENDANT_1 or DEFENDANT_2), which civil-service allows within 7 days of the
    // order, and a judge decides it (RECONSIDERATION_DECISION, default UPHOLD). The claim stays in CASE_PROGRESSION, so
    // the journey carries on to the evidence.
    {
      name: 'REQUEST_FOR_RECONSIDERATION',
      title: `${reconsiderationRequester.label} asks for the order to be reconsidered.`,
      user: reconsiderationRequester.user,
      needs: [c.facts.reachesCaseProgression],
      skipIf: reconsiderationOff,
      run: async ({ page, storageState, user }) => {
        const by = c.requestForReconsideration as RequestForReconsiderationBy;
        await ctx.submitEvent(page, storageState, {
          api: () => new api.RequestForReconsideration().submit(ctx.caseId, by, user),
          ui: () => new ui.RequestForReconsideration(page).submit(by),
          expectState: caseStates.CASE_PROGRESSION,
        });
      },
    },
    {
      name: 'DECISION_ON_RECONSIDERATION_REQUEST',
      title: `Judge decides the request for reconsideration (${c.reconsiderationDecision}).`,
      user: 'judge',
      needs: [c.facts.reachesCaseProgression],
      skipIf: reconsiderationOff,
      run: async ({ page, storageState }) => {
        await ctx.runEvent(page, storageState, async () => {
          // The event is only opened from the judge's "Decision on Reconsideration Request" task. Where work allocation
          // is switched on the task is needed, so it is claimed through the API version too, as the UI would.
          await new WaTaskHelper(page).assignTaskForEvent(ctx.caseId, 'DECISION_ON_RECONSIDERATION_REQUEST', 'JudgeDecideOnReconsiderRequest');
          if (!ctx.useApi()) {
            await new ui.DecisionOnReconsiderationRequest(page).submit(ctx.caseId, c.reconsiderationDecision);
          }
        });
        if (ctx.useApi()) {
          await new api.DecisionOnReconsiderationRequest().submit(ctx.caseId, c.reconsiderationDecision);
        }
        if (c.reconsiderationDecision === ReconsiderationDecision.UPHOLD) {
          // Upholding the order issues the decision document to the parties
          await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'DECISION_ON_RECONSIDERATION_REQUEST');
        }
        await ctx.assertCaseState(caseStates.CASE_PROGRESSION);
      },
    },

    makeDirectionsOrder(c, ctx),

    // Each solicitor uploads evidence once the judge's order has moved the claim to CASE_PROGRESSION
    ...uploadEvidenceSteps(),

    createHearingNotice(c, ctx),

    payHearingFee(c, ctx),

    trialReadyCheck(c, ctx),

    // Each solicitor confirms the case is ready for trial. The CCD definition only offers this on the fast track, and
    // civil-service refuses it once the hearing is less than 3 weeks away; the hearing notice lists it about 8 weeks
    // ahead. The claim stays in PREPARE_FOR_HEARING_CONDUCT_HEARING.
    ...confirmTrialArrangementsSteps(),

    createTrialBundle(c, ctx),

    moveToDecisionOutcome(c, ctx),

    makeFinalOrder(c, ctx),

    confirmOrderReview(c, ctx),
    ...judgmentsOnlineSteps(),

    settleClaimMarkPaidFull(c, ctx, closingProblems),

    settleClaim(c, ctx, closingProblems),
    ...discontinueSteps(c, ctx, closingProblems),


    caseProceedsInCaseman(c, ctx, closingProblems),
  ]));

  // Where the journey ends: the state STOP_AT_STATE stops it at or, where it runs to the end, the state its last step
  // leaves the claim in, when that is known. With STOP_AFTER_TEST it is not known before the journey runs.
  function journeyEndState(stops: JourneyStops): caseStates | undefined {
    if (stops.stopAtState !== undefined) {
      return stops.stopAtState;
    }
    if (stops.stopAfterTest !== undefined) {
      return undefined;
    }
    if (c.defaultJudgment === yesNo.YES) {
      return undefined;
    }
    if (c.notSuitableSdo === NotSuitableSdo.OTHER_REASONS) {
      return caseStates.PROCEEDS_IN_HERITAGE_SYSTEM;
    }
    const orderReview = steps.find((step) => step.name === 'CONFIRM_ORDER_REVIEW');
    if (!orderReview?.skipIf?.some(([skipped]) => skipped)) {
      return caseStates.All_FINAL_ORDERS_ISSUED;
    }
    if (!holds(c.facts.notSettledInMediation)) {
      return caseStates.CASE_STAYED;
    }
    return undefined;
  }


  // Once default judgment is asked for, the defendants' steps and everything after them do not apply, apart from
  // settling or discontinuing the claim and the Judgments Online steps, which act on the default judgment
  const judgmentsOnlineStepNames = ['JUDGMENT_PAID_IN_FULL', 'REFER_JUDGE_DEFENCE_RECEIVED', 'SET_ASIDE_JUDGMENT'];
  const lastDefaultJudgmentStep = steps.map((step) => step.name).lastIndexOf('DEFAULT_JUDGMENT');
  steps.slice(lastDefaultJudgmentStep + 1)
    .filter((step) => !step.closesClaim && !judgmentsOnlineStepNames.includes(step.name))
    .forEach((step) => {
      step.skipIf = [...(step.skipIf ?? []), ...c.facts.withoutDefaultJudgment];
    });

  withNotSuitableSdo(steps, c.notSuitableSdo);
  withDisputeResolutionHearing(steps, c);

  return steps;

  // The Judgments Online events users reach from Next step (see the settings in specifiedConfig.ts). Each needs a live
  // judgment with the claim in All_FINAL_ORDERS_ISSUED, which the journey gives two ways: default judgment
  // (DEFAULT_JUDGMENT=Yes, unless the judgment buffer keeps the claim in JUDGMENT_REQUESTED, which is only known when it
  // runs) or a judgment by admission. Setting the judgment aside needs it to be a default judgment. None of them changes
  // the claim's state.
  //
  // "Record Judgment" (RECORD_JUDGMENT) and "Edit Judgment" (EDIT_JUDGMENT) are left out: the definition has hidden them
  // from every user since CIV-16299, and civil-service records judgments itself.
  function judgmentsOnlineSteps(): JourneyStep[] {
    const judgmentByAdmission = holds(c.facts.everyDefendantRepresented) && c.claimantResponds
      && c.claimantOutcome.businessProcess === 'JUDGEMENT_BY_ADMISSION_NON_DIVERGENT_SPEC';
    const defaultJudgment = c.defaultJudgment === yesNo.YES;
    const noLiveJudgment = (setting: string): Array<[boolean, string]> => [[
      !defaultJudgment && !judgmentByAdmission,
      `${setting} needs a live judgment: default judgment (DEFAULT_JUDGMENT=Yes) or a judgment by admission (a 1v1 claimant accepting the defendant's date or repayment plan)`,
    ]];
    // A default judgment with the judgment buffer switched on waits in JUDGMENT_REQUESTED, where none of the events is
    // offered
    const skipUnlessFinalOrdersIssued = () => test.skip(
      ctx.lastStateReached !== caseStates.All_FINAL_ORDERS_ISSUED,
      `Skipping as the claim is in ${ctx.lastStateReached}, not All_FINAL_ORDERS_ISSUED`,
    );
    // The live judgment saved on the claim, checked after each event
    const activeJudgment = async () => {
      const caseData = await ctx.testingEndpointHelper.getCaseData(ctx.caseId);
      return { live: caseData.joIsLiveJudgmentExists, judgment: caseData.activeJudgment ?? {} };
    };

    return [
      // The claimant's solicitor marks the live judgment as paid in full, today. civil-service marks it satisfied, or
      // cancelled where it was paid within a month of the judgment, and the JUDGMENT_PAID_IN_FULL business process
      // makes the certificate of satisfaction or cancellation.
      {
        name: 'JUDGMENT_PAID_IN_FULL',
        title: 'Claimant Solicitor marks the judgment as paid in full.',
        user: 'claimantSolicitor',
        invalidIf: () => c.judgmentPaidInFull === yesNo.YES ? noLiveJudgment('JUDGMENT_PAID_IN_FULL=Yes') : [],
        skipIf: [[c.judgmentPaidInFull !== yesNo.YES, 'Marking the judgment as paid in full is switched off (set JUDGMENT_PAID_IN_FULL=Yes to run it)']],
        run: async ({ page, storageState, user }) => {
          skipUnlessFinalOrdersIssued();
          await ctx.submitEvent(page, storageState, {
            api: () => new api.JudgmentPaidInFull().submit(ctx.caseId, user),
            ui: () => new ui.JudgmentPaidInFull(page).submit(),
            businessProcess: 'JUDGMENT_PAID_IN_FULL',
          });
          const { judgment: saved } = await activeJudgment();
          expect(['SATISFIED', 'CANCELLED'], 'The judgment was not marked as paid in full').toContain(saved.state);
          await ctx.assertCaseState(caseStates.All_FINAL_ORDERS_ISSUED);
        },
      },

      // Court staff refer the claim to a judge as a defence was received in time, after judgment. civil-service changes
      // nothing on the claim.
      {
        name: 'REFER_JUDGE_DEFENCE_RECEIVED',
        title: 'Hearing Centre Admin refers the defended claim to a judge.',
        user: 'hearingCentreAdmin',
        invalidIf: () => c.referJudgeDefenceReceived === yesNo.YES ? noLiveJudgment('REFER_JUDGE_DEFENCE_RECEIVED=Yes') : [],
        skipIf: [[c.referJudgeDefenceReceived !== yesNo.YES, 'Referring the defended claim to a judge is switched off (set REFER_JUDGE_DEFENCE_RECEIVED=Yes to run it)']],
        run: async ({ page, storageState }) => {
          skipUnlessFinalOrdersIssued();
          await ctx.submitEvent(page, storageState, {
            api: () => new api.ReferJudgeDefenceReceived().submit(ctx.caseId),
            ui: () => new ui.ReferJudgeDefenceReceived(page).submit(),
          });
          await ctx.testingEndpointHelper.waitForNoOngoingBusinessProcess(ctx.caseId);
          await ctx.assertCaseState(caseStates.All_FINAL_ORDERS_ISSUED);
        },
      },

      // Court staff set aside the default judgment. civil-service moves it to the claim's historic judgments, so there
      // is no longer a live judgment, and the SET_ASIDE_JUDGMENT business process tells the parties. The claim stays in
      // All_FINAL_ORDERS_ISSUED, from where it can be taken offline (CASE_PROCEEDS_IN_CASEMAN).
      {
        name: 'SET_ASIDE_JUDGMENT',
        title: `Hearing Centre Admin sets aside the default judgment (${c.setAsideJudgment}).`,
        user: 'hearingCentreAdmin',
        skipIf: [[c.setAsideJudgment === undefined, 'Setting aside the judgment is switched off (set SET_ASIDE_JUDGMENT=JUDGMENT_ERROR, ORDER_AFTER_APPLICATION or ORDER_AFTER_DEFENCE to run it)']],
        run: async ({ page, storageState }) => {
          skipUnlessFinalOrdersIssued();
          const setAside = c.setAsideJudgment!;
          await ctx.submitEvent(page, storageState, {
            api: () => new api.SetAsideJudgment().submit(ctx.caseId, setAside),
            ui: () => new ui.SetAsideJudgment(page).submit(setAside),
            businessProcess: 'SET_ASIDE_JUDGMENT',
          });
          const { live } = await activeJudgment();
          expect(live, 'The judgment is still live after being set aside').toBe('No');
          await ctx.assertCaseState(caseStates.All_FINAL_ORDERS_ISSUED);
        },
      },
    ];
  }

  function respondToClaimSteps(): JourneyStep[] {
    const solicitors: Array<{ defendantNumber: 1 | 2; user: SessionUserKey; skipIf: Array<[boolean, string]>; stateAfter: caseStates }> = [
      {
        defendantNumber: 1,
        user: 'respondent1Solicitor',
        skipIf: [...c.facts.everyDefendantRepresented],
        // With two solicitors the claim waits for both responses
        stateAfter: c.claimType === claimTypes.ONE_VS_TWO_DIFF_SOL ? caseStates.AWAITING_RESPONDENT_ACKNOWLEDGEMENT : c.stateAfterAllResponses,
      },
      {
        defendantNumber: 2,
        user: 'respondent2Solicitor',
        skipIf: [[c.claimType !== claimTypes.ONE_VS_TWO_DIFF_SOL, 'Skipping as Defendant 2 has no separate solicitor']],
        stateAfter: c.stateAfterAllResponses,
      },
    ];
    return solicitors.map((solicitor) => ({
      name: `RESPOND_TO_CLAIM_DEFENDANT${solicitor.defendantNumber}`,
      title: `Defendant ${solicitor.defendantNumber} Solicitor responds to claim.`,
      user: solicitor.user,
      skipIf: solicitor.skipIf,
      run: async ({ page, storageState, user }) => {
        await ctx.submitEvent(page, storageState, {
          api: () => new api.RespondToClaimSpec().submit(c, ctx.caseId, solicitor.defendantNumber, user),
          ui: () => new ui.RespondToClaimSpec(page).submit(solicitor.defendantNumber, {
            claimType: c.claimType,
            timeline: c.timeline,
            respondent1Response: c.respondent1Response,
            respondent2Response: c.respondent2Response,
            paymentRoute: c.admissionPaymentRoute,
            respondent1Employment: c.respondent1Employment,
            respondent2Employment: c.respondent2Employment,
          }),
        });
        // civil-service rejects the next event until the response's business process has finished
        await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'DEFENDANT_RESPONSE_SPEC');
        await ctx.assertCaseState(solicitor.stateAfter);
      },
    }));
  }

  function informAgreedExtensionSteps(): JourneyStep[] {
    const solicitors: Array<{ defendantNumber: 1 | 2; user: SessionUserKey; noSolicitor: Fact }> = [
      { defendantNumber: 1, user: 'respondent1Solicitor', noSolicitor: c.facts.defendant1HasSolicitor },
      {
        defendantNumber: 2,
        user: 'respondent2Solicitor',
        // Defendant 2's own solicitor. civil-service only treats them as separate from Defendant 1's when both
        // defendants are represented, as in the unspecified journey.
        noSolicitor: [[c.claimType !== claimTypes.ONE_VS_TWO_DIFF_SOL, 'Skipping as Defendant 2 has no separate solicitor']],
      },
    ];
    return solicitors.map((solicitor) => ({
      name: `INFORM_AGREED_EXTENSION_DEFENDANT${solicitor.defendantNumber}`,
      title: `Defendant ${solicitor.defendantNumber} Solicitor informs the court of an agreed extension.`,
      user: solicitor.user,
      skipIf: [
        ...solicitor.noSolicitor,
        [c.informAgreedExtension !== yesNo.YES, 'Informing of an agreed extension is switched off (set INFORM_AGREED_EXTENSION=Yes to run it)'],
      ],
      run: async ({ page, storageState, user }) => {
        const deadlineBefore = await ctx.testingEndpointHelper.getResponseDeadline(ctx.caseId, solicitor.defendantNumber);
        // civil-service accepts a working day after the current deadline and no more than 28 days after it
        const extensionDate = await workingDayAfter(deadlineBefore, 14);
        await ctx.submitEvent(page, storageState, {
          api: () => new api.InformAgreedExtensionDateSpec().submit(ctx.caseId, solicitor.defendantNumber, extensionDate, user),
          ui: () => new ui.InformAgreedExtensionDateSpec(page).submit(solicitor.defendantNumber, extensionDate),
          businessProcess: 'INFORM_AGREED_EXTENSION_DATE_SPEC',
        });
        const deadlineAfter = await ctx.testingEndpointHelper.getResponseDeadline(ctx.caseId, solicitor.defendantNumber);
        console.log(`Defendant ${solicitor.defendantNumber} response deadline moved from ${deadlineBefore} to ${deadlineAfter} (agreed ${extensionDate})`);
        expect(
          deadlineAfter?.slice(0, 10),
          `Defendant ${solicitor.defendantNumber}'s response deadline is not the agreed extension date (before ${deadlineBefore}, after ${deadlineAfter})`,
        ).toBe(extensionDate);
        // A solicitor representing both defendants extends Defendant 2's deadline to the same date
        if (c.claimType === claimTypes.ONE_VS_TWO_SAME_SOL) {
          const defendant2Deadline = await ctx.testingEndpointHelper.getResponseDeadline(ctx.caseId, 2);
          expect(defendant2Deadline?.slice(0, 10), `Defendant 2's response deadline ${defendant2Deadline} is not the agreed extension date`).toBe(extensionDate);
        }
        await ctx.assertCaseState(caseStates.AWAITING_RESPONDENT_ACKNOWLEDGEMENT);
      },
    }));
  }

  // UPLOAD_MEDIATION_DOCUMENTS=Yes, in group UPLOAD_MEDIATION_DOCUMENTS: once mediation on a small claim has been
  // unsuccessful, and the claim is back in JUDICIAL_REFERRAL, each solicitor uploads a non-attendance statement and a
  // document referred to in it with "Upload mediation documents" (Defendant 2's solicitor only for 1v2DS), for every
  // party they act for. Each party's documents are counted before and after. The event is only offered on a specified
  // small claim, from JUDICIAL_REFERRAL to the hearing.
  function uploadMediationDocumentsSteps(): JourneyStep[] {
    const off: [boolean, string] = [c.uploadMediationDocuments !== yesNo.YES, 'Uploading mediation documents is switched off (set UPLOAD_MEDIATION_DOCUMENTS=Yes to run it)'];
    if (c.uploadMediationDocuments !== yesNo.YES) {
      return [{ name: 'UPLOAD_MEDIATION_DOCUMENTS', title: 'Solicitors upload mediation documents.', user: 'claimantSolicitor', skipIf: [off], run: async () => {} }];
    }
    const solicitors = [
      { name: 'UPLOAD_MEDIATION_DOCUMENTS_CLAIMANT_SOLICITOR', label: 'Claimant Solicitor', user: 'claimantSolicitor' },
      { name: 'UPLOAD_MEDIATION_DOCUMENTS_DEFENDANT1_SOLICITOR', label: 'Defendant 1 Solicitor', user: 'respondent1Solicitor' },
      { name: 'UPLOAD_MEDIATION_DOCUMENTS_DEFENDANT2_SOLICITOR', label: 'Defendant 2 Solicitor', user: 'respondent2Solicitor', defendant2: true },
    ] as const;
    return solicitors.map((solicitor, index) => ({
      group: 'UPLOAD_MEDIATION_DOCUMENTS',
      name: solicitor.name,
      title: `${solicitor.label} uploads mediation documents.`,
      user: solicitor.user,
      invalidIf: index > 0 ? undefined : () => [
        [
          !holds(c.facts.reachesMediation),
          `UPLOAD_MEDIATION_DOCUMENTS=Yes needs the claimant's response to take the small claim to mediation, with every defendant represented: ${c.facts.reachesMediation.filter(([skipped]) => skipped).map(([, reason]) => reason).join('; ')}`,
        ],
      ],
      needs: [c.facts.reachesMediation],
      skipIf: [
        [c.mediationSuccessful === yesNo.YES, 'Skipping as mediation was successful (MEDIATION_SUCCESSFUL=Yes)'],
        ['defendant2' in solicitor && c.claimType !== claimTypes.ONE_VS_TWO_DIFF_SOL, 'Skipping as Defendant 2 has no separate solicitor'],
      ],
      run: async ({ page, storageState, user }) => {
        const before = await ctx.testingEndpointHelper.getCaseData(ctx.caseId);
        const chosen = await ctx.submitEvent(page, storageState, {
          api: () => new api.UploadMediationDocuments().submit(ctx.caseId, user),
          ui: () => new ui.UploadMediationDocuments(page).submit(),
        }) ?? '';
        const after = await ctx.testingEndpointHelper.getCaseData(ctx.caseId);
        expect(
          countMediationDocuments(after, chosen),
          `${solicitor.label}'s mediation documents were not added to ${chosen}`,
        ).toEqual(countMediationDocuments(before, chosen).map((count) => count + 1));
        await ctx.assertCaseState(caseStates.JUDICIAL_REFERRAL);
      },
    }));
  }

  function uploadEvidenceSteps(): JourneyStep[] {
    const solicitors = [
      { name: 'UPLOAD_EVIDENCE_CLAIMANT_SOLICITOR', label: 'Claimant Solicitor', user: 'claimantSolicitor' },
      { name: 'UPLOAD_EVIDENCE_DEFENDANT1_SOLICITOR', label: 'Defendant 1 Solicitor', user: 'respondent1Solicitor' },
      { name: 'UPLOAD_EVIDENCE_DEFENDANT2_SOLICITOR', label: 'Defendant 2 Solicitor', user: 'respondent2Solicitor', defendant2: true },
    ] as const;
    return solicitors.map((solicitor) => ({
      group: 'UPLOAD_EVIDENCE',
      name: solicitor.name,
      title: `${solicitor.label} uploads evidence.`,
      user: solicitor.user,
      needs: [c.facts.reachesCaseProgression],
      skipIf: [
        ['defendant2' in solicitor && c.claimType !== claimTypes.ONE_VS_TWO_DIFF_SOL, 'Skipping as Defendant 2 has no separate solicitor'],
      ],
      run: async ({ page, storageState, user }) => {
        await ctx.submitEvent(page, storageState, {
          api: () => new api.UploadEvidence().submit(ctx.caseId, user, c.sdoTrack),
          ui: () => new ui.UploadEvidence(page).submit(c.sdoTrack),
          expectState: caseStates.CASE_PROGRESSION,
        });
      },
    }));
  }

  function confirmTrialArrangementsSteps(): JourneyStep[] {
    const solicitors = [
      { name: 'CONFIRM_TRIAL_ARRANGEMENTS_CLAIMANT_SOLICITOR', label: 'Claimant Solicitor', user: 'claimantSolicitor' },
      { name: 'CONFIRM_TRIAL_ARRANGEMENTS_DEFENDANT1_SOLICITOR', label: 'Defendant 1 Solicitor', user: 'respondent1Solicitor' },
      { name: 'CONFIRM_TRIAL_ARRANGEMENTS_DEFENDANT2_SOLICITOR', label: 'Defendant 2 Solicitor', user: 'respondent2Solicitor', defendant2: true },
    ] as const;
    return solicitors.map((solicitor) => ({
      group: 'CONFIRM_TRIAL_ARRANGEMENTS',
      name: solicitor.name,
      title: `${solicitor.label} confirms trial arrangements.`,
      user: solicitor.user,
      needs: [c.facts.reachesCaseProgression],
      skipIf: [
        [c.sdoTrack !== claimTrack.FAST, 'Skipping as trial arrangements are only confirmed on the fast track'],
        ['defendant2' in solicitor && c.claimType !== claimTypes.ONE_VS_TWO_DIFF_SOL, 'Skipping as Defendant 2 has no separate solicitor'],
      ],
      run: async ({ page, storageState, user }) => {
        await ctx.submitEvent(page, storageState, {
          api: () => new api.ConfirmTrialArrangements().submit(ctx.caseId, user),
          ui: () => new ui.ConfirmTrialArrangements(page).submit(),
          expectState: caseStates.PREPARE_FOR_HEARING_CONDUCT_HEARING,
        });
      },
    }));
  }
}
