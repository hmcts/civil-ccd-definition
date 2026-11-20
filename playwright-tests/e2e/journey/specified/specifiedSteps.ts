import { expect, test } from '@playwright/test';
import { claimantSolicitorCredentials, envUrl, respondent1SolicitorCredentials } from '../../../civilConfig.ts';
import { CreateSpecifiedCase } from '../../flows/createSpecifiedCase.ts';
import * as ui from '../../flows/events/ui/index.ts';
import * as api from '../../flows/events/api/index.ts';
import { caseFlagType } from '../../flows/caseFlags/caseFlagTypes.ts';
import { holderFlagsField, holderLabel } from '../../flows/caseFlags/caseFlagHolders.ts';
import { CaseFlagSpec, caseFlagSpecs } from '../../flows/caseFlags/caseFlagSpecs.ts';
import {
  mciChange, mciChangeNotSavedReason, mciSessionUser, mciSpecs, mciStartsBusinessProcess, mciUserLabel,
} from '../../flows/events/shared_api_ui/manageContactInformationSpecs.ts';
import { runHearingNoticeScheduler } from '../hearingNoticeScheduler.ts';
import SettleClaimReason from '../../../enums/settleClaim.ts';
import DiscontinueClaimType from '../../../enums/discontinueClaim.ts';
import { sendAndReplySteps } from '../sendAndReplySteps.ts';
import CaseProceedsInCasemanReason from '../../../enums/caseProceedsInCaseman.ts';
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
import { JourneyContext, JourneyStep, JourneyStops } from '../journeyRunner.ts';
import { withNoticeOfChange } from '../noticeOfChangeSteps.ts';
import { withGeneralApplication } from '../generalApplicationSteps.ts';
import { withQueryManagement } from '../queryManagementSteps.ts';
import { addUnavailableDatesSteps } from '../addUnavailableDatesSteps.ts';
import { notSuitableSdoSteps, withNotSuitableSdo } from '../notSuitableSdoSteps.ts';
import { withDisputeResolutionHearing, expectDisputeResolutionHearing } from '../disputeResolutionHearing.ts';
import { expectFlightDelayClaim, expectFlightDelayCourt, expectFlightDelayDirections } from '../flightDelay.ts';
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

  const noDefendant1Solicitor: [boolean, string] = [c.claimShape.defendants[0].solicitor === 'none', 'Skipping as first defendant is a LiP'];
  // Claims where every defendant has a solicitor. A litigant in person responds through the citizen service instead.
  const allDefendantsRepresented = [claimTypes.ONE_VS_ONE, claimTypes.TWO_VS_ONE, claimTypes.ONE_VS_TWO_SAME_SOL, claimTypes.ONE_VS_TWO_DIFF_SOL].includes(c.claimType);
  const noLitigantInPerson: [boolean, string] = [!allDefendantsRepresented, 'Skipping as a defendant is a litigant in person, who responds through the citizen service'];
  // The steps from the judge's order on, which need the claimant's response to take the claim to JUDICIAL_REFERRAL
  const noJudicialReferral: Array<[boolean, string]> = [
    noLitigantInPerson,
    [!c.claimantResponds || c.claimantOutcome.state !== caseStates.JUDICIAL_REFERRAL, 'Skipping as the claimant\'s response did not take the claim to JUDICIAL_REFERRAL'],
  ];
  // The stay steps, which need the claim to reach JUDICIAL_REFERRAL and only run with STAY_CASE=Yes
  const noStay: Array<[boolean, string]> = [
    ...noJudicialReferral,
    [c.stayCase !== yesNo.YES, 'Staying the case is switched off (set STAY_CASE=Yes to run it)'],
  ];
  // The mediation outcome, for a small claim the claimant's response took to mediation
  const noMediation: Array<[boolean, string]> = [
    noLitigantInPerson,
    [!c.claimantResponds || c.claimantOutcome.state !== caseStates.IN_MEDIATION, 'Skipping as the claimant\'s response did not take the claim to mediation'],
  ];
  // A small claim that mediation settled is stayed (CASE_STAYED), so it gets no directions order or anything after it
  const settledInMediation: [boolean, string] = [
    c.mediationSuccessful === yesNo.YES && c.claimantOutcome.state === caseStates.IN_MEDIATION,
    'Skipping as mediation settled the claim, which stayed the case (MEDIATION_SUCCESSFUL=Yes)',
  ];
  // The steps once the order has moved the claim to CASE_PROGRESSION: on the fast, intermediate and multi tracks after
  // the claimant's response took it to JUDICIAL_REFERRAL, and for a small claim after unsuccessful mediation
  const noCaseProgression: Array<[boolean, string]> = [
    noLitigantInPerson,
    [!c.claimantResponds || ![caseStates.JUDICIAL_REFERRAL, caseStates.IN_MEDIATION].includes(c.claimantOutcome.state), 'Skipping as the claimant\'s response did not take the claim to JUDICIAL_REFERRAL or mediation'],
    settledInMediation,
  ];

  // Asking for the legal adviser's small claims order to be reconsidered (REQUEST_FOR_RECONSIDERATION), once the order
  // has moved the claim to CASE_PROGRESSION, and the judge's decision on it
  const noReconsideration: Array<[boolean, string]> = [
    ...noCaseProgression,
    [c.requestForReconsideration === undefined, 'Reconsideration is switched off (set REQUEST_FOR_RECONSIDERATION=CLAIMANT, DEFENDANT_1 or DEFENDANT_2 to run it)'],
    [c.track !== claimTrack.SMALL, 'Skipping as only a legal adviser\'s small claims order can be reconsidered'],
  ];
  const reconsiderationRequesters: Record<RequestForReconsiderationBy, { label: string; user: SessionUserKey }> = {
    [RequestForReconsiderationBy.CLAIMANT]: { label: 'Claimant Solicitor', user: 'claimantSolicitor' },
    [RequestForReconsiderationBy.DEFENDANT_1]: { label: 'Defendant 1 Solicitor', user: 'respondent1Solicitor' },
    [RequestForReconsiderationBy.DEFENDANT_2]: { label: 'Defendant 2 Solicitor', user: 'respondent2Solicitor' },
  };
  const reconsiderationRequester = reconsiderationRequesters[c.requestForReconsideration ?? RequestForReconsiderationBy.CLAIMANT];

  // The states "Discontinue this claim" is offered in, and both "Settle this claim" events, which are also offered once
  // the final orders are issued (court staff can also settle a stayed case)
  const discontinuableStates = [
    caseStates.AWAITING_RESPONDENT_ACKNOWLEDGEMENT, caseStates.AWAITING_APPLICANT_INTENTION, caseStates.IN_MEDIATION,
    caseStates.JUDICIAL_REFERRAL, caseStates.CASE_PROGRESSION, caseStates.HEARING_READINESS,
    caseStates.PREPARE_FOR_HEARING_CONDUCT_HEARING, caseStates.DECISION_OUTCOME,
  ];
  const settleableStates = [...discontinuableStates, caseStates.All_FINAL_ORDERS_ISSUED];
  // The states "Case proceeds in Caseman" is offered in that the journey can reach (it is also offered in CASE_DISMISSED)
  const casemanStates = [
    caseStates.PENDING_CASE_ISSUED, caseStates.CASE_ISSUED, caseStates.AWAITING_CASE_DETAILS_NOTIFICATION,
    caseStates.JUDGMENT_REQUESTED, ...settleableStates, caseStates.CASE_STAYED,
  ];
  // civil-service does not let the claimant's solicitor settle or discontinue a claim against two defendants where
  // either is a litigant in person
  const twoDefendantsWithLitigantInPerson: [boolean, string] = [
    c.claimShape.defendants.length === 2 && c.claimShape.defendants.some((defendant) => defendant.solicitor === 'none'),
    'Skipping as the claimant\'s solicitor cannot settle or discontinue a claim against two defendants where one is a litigant in person',
  ];
  // Whether the claimant's discontinuance waits for court staff to validate it, once the claimant has discontinued
  let discontinuanceAwaitingValidation = false;

  // Default judgment (DEFAULT_JUDGMENT=Yes), and the steps it replaces: once judgment is asked for, the defendants'
  // steps and everything after them are skipped, apart from settling or discontinuing the claim
  const noDefaultJudgment: [boolean, string] = [c.defaultJudgment !== yesNo.YES, 'Default judgment is switched off (set DEFAULT_JUDGMENT=Yes to run it)'];
  const afterDefaultJudgment: [boolean, string] = [c.defaultJudgment === yesNo.YES, 'Skipping as the claimant asked for default judgment (DEFAULT_JUDGMENT=Yes)'];

  // Who makes the Standard Direction Order, and the work allocation directions task they claim for it: a judge on the
  // fast track, a legal adviser on the small claims track, apart from a flight delay small claim, which a judge gets
  // through "Initial Directions (Flight Delay)"
  const sdoUser: SessionUserKey = c.track === claimTrack.SMALL && !c.flightDelaySmallClaim ? 'legalAdviser' : 'judge';
  const sdoTask = c.track !== claimTrack.SMALL
    ? 'FastTrackDirections'
    : (c.flightDelaySmallClaim ? 'InitialDirectionFlightDelay' : 'LegalAdvisorSmallClaimsTrackDirections');

  const steps: JourneyStep[] = [
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

    // Adding a case note, done as early as possible: court staff can add one in any state, so straight after the claim
    // is issued. Only run with ADD_CASE_NOTE=Yes (default No).
    {
      name: 'ADD_CASE_NOTE',
      title: 'Hearing Centre Admin adds a case note.',
      user: 'hearingCentreAdmin',
      skipIf: [[c.addCaseNote !== yesNo.YES, 'Adding a case note is switched off (set ADD_CASE_NOTE=Yes to run it)']],
      run: async ({ page, storageState }) => {
        const note = `Case note added by the specified journey at ${new Date().toISOString()}`;
        const caseNote = new ui.AddCaseNote(page);
        if (ctx.useApi()) {
          await new api.AddCaseNote().submit(ctx.caseId, note);
          await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'ADD_CASE_NOTE');
          // The case page was opened before the note was added, so the saved notes are checked instead of the Notes tab
          const notes = (await ctx.testingEndpointHelper.getCaseData(ctx.caseId)).caseNotes ?? [];
          expect(notes.map((entry) => entry.value?.note), 'The case note was not saved').toContain(note);
        } else {
          await ctx.runEvent(page, storageState, async () => {
            await caseNote.submit(note);
          });
          await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'ADD_CASE_NOTE');
          await caseNote.verifyNoteShown(note);
        }
        // A case note does not change the claim's state
        await ctx.assertCaseState(caseStates.AWAITING_RESPONDENT_ACKNOWLEDGEMENT);
      },
    },


    // Default judgment (DEFAULT_JUDGMENT=Yes): the time for responding passes with no response. The response deadlines
    // are moved to yesterday through civil-service's testing support, as waiting for them is not practical.
    {
      name: 'MOVE_RESPONSE_DEADLINE',
      title: 'The time for the defendants to respond passes.',
      user: 'claimantSolicitor',
      skipIf: [noDefaultJudgment],
      run: async () => {
        await ctx.testingEndpointHelper.moveResponseDeadlinesToPast(ctx.caseId, c.claimShape.defendants.length as 1 | 2);
        await ctx.assertCaseState(caseStates.AWAITING_RESPONDENT_ACKNOWLEDGEMENT);
      },
    },

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

    // The hearing centre admin changes the legal representatives' email addresses with "Amend party details": Defendant
    // 1's solicitor's to the address they sign in with (the claim was created with a made-up one), and the claimant's
    // solicitor's to theirs. Only run with AMEND_PARTY_DETAILS=Yes, where Defendant 1 has a solicitor.
    {
      name: 'AMEND_PARTY_DETAILS',
      title: 'Hearing Centre Admin amends the legal representatives\' email addresses.',
      user: 'hearingCentreAdmin',
      skipIf: [
        [c.amendPartyDetails !== yesNo.YES, 'Amending party details is switched off (set AMEND_PARTY_DETAILS=Yes to run it)'],
        noDefendant1Solicitor,
      ],
      run: async ({ page, storageState }) => {
        const stateBefore = ctx.lastStateReached;
        const emails = { defendant1Solicitor: respondent1SolicitorCredentials.username, claimantSolicitor: claimantSolicitorCredentials.username };
        await ctx.submitEvent(page, storageState, {
          api: () => new api.AmendPartyDetails().submit(ctx.caseId, emails),
          ui: () => new ui.AmendPartyDetails(page).submit(emails),
        });
        const saved = await ctx.testingEndpointHelper.getCaseData(ctx.caseId);
        expect(saved, 'The amended email addresses were not saved').toMatchObject({
          specRespondentSolicitor1EmailAddress: emails.defendant1Solicitor,
          respondentSolicitor1EmailAddress: emails.defendant1Solicitor,
          applicantSolicitor1UserDetails: { email: emails.claimantSolicitor },
        });
        await ctx.assertCaseState(stateBefore);
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
      skipIf: [
        noLitigantInPerson,
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

    ...caseFlagSteps(),
    ...manageContactInformationSteps(),

    // Each solicitor adds unavailable dates for their parties, then the hearing centre admin adds some for a defendant,
    // in JUDICIAL_REFERRAL or IN_MEDIATION. Only run with ADD_UNAVAILABLE_DATES=Yes.
    ...addUnavailableDatesSteps(c, ctx, allDefendantsRepresented, c.claimantOutcome.state, [
      noLitigantInPerson,
      [!c.claimantResponds, 'Skipping as the claim went offline once the defendants responded'],
    ]),

    // The hearing centre admin stays the case once the claimant's response has taken it to JUDICIAL_REFERRAL, asks the
    // parties for an update and then lifts the stay. Lifting it takes the claim back to JUDICIAL_REFERRAL, so the
    // journey carries on to the judge's order. Only run with STAY_CASE=Yes.
    {
      name: 'STAY_CASE',
      title: 'Hearing Centre Admin stays the case.',
      user: 'hearingCentreAdmin',
      skipIf: noStay,
      run: async ({ page, storageState }) => {
        await ctx.submitEvent(page, storageState, {
          api: () => new api.StayCase().submit(ctx.caseId),
          ui: () => new ui.StayCase(page).submit(),
          expectState: caseStates.CASE_STAYED,
        });
      },
    },

    {
      name: 'MANAGE_STAY_REQUEST_UPDATE',
      title: 'Hearing Centre Admin asks the parties for an update on the stay.',
      user: 'hearingCentreAdmin',
      skipIf: noStay,
      run: async ({ page, storageState }) => {
        await ctx.submitEvent(page, storageState, {
          api: () => new api.ManageStay().requestUpdate(ctx.caseId),
          ui: () => new ui.ManageStay(page).requestUpdate(),
          expectState: caseStates.CASE_STAYED,
        });
      },
    },

    // The hearing centre admin sends a district judge a message and the judge replies, while the case is stayed with
    // STAY_CASE=Yes, otherwise in JUDICIAL_REFERRAL. Only run with SEND_AND_REPLY=Yes.
    ...sendAndReplySteps(c, ctx, c.stayCase === yesNo.YES ? caseStates.CASE_STAYED : caseStates.JUDICIAL_REFERRAL, noJudicialReferral),

    {
      name: 'LIFT_STAY',
      title: 'Hearing Centre Admin lifts the stay.',
      user: 'hearingCentreAdmin',
      skipIf: noStay,
      run: async ({ page, storageState }) => {
        await ctx.submitEvent(page, storageState, {
          api: () => new api.ManageStay().liftStay(ctx.caseId),
          ui: () => new ui.ManageStay(page).liftStay(),
          expectState: caseStates.JUDICIAL_REFERRAL,
        });
      },
    },

    // A small claim the claimant's response took to mediation: court staff record that mediation settled it
    // (MEDIATION_SUCCESSFUL=Yes), which stays the case, or that it did not, which takes it to JUDICIAL_REFERRAL for the
    // judge's directions
    {
      name: 'MEDIATION_SUCCESSFUL',
      title: 'Hearing Centre Admin records that mediation was successful.',
      user: 'hearingCentreAdmin',
      skipIf: [
        ...noMediation,
        [c.mediationSuccessful !== yesNo.YES, 'Successful mediation is switched off (set MEDIATION_SUCCESSFUL=Yes to run it)'],
      ],
      run: async ({ page, storageState }) => {
        await ctx.submitEvent(page, storageState, {
          api: () => new api.MediationSuccessful().submit(ctx.caseId),
          ui: () => new ui.MediationSuccessful(page).submit(),
          businessProcess: 'MEDIATION_SUCCESSFUL',
          expectState: caseStates.CASE_STAYED,
        });
      },
    },

    {
      name: 'MEDIATION_UNSUCCESSFUL',
      title: 'Hearing Centre Admin records that mediation was unsuccessful.',
      user: 'hearingCentreAdmin',
      skipIf: [
        ...noMediation,
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
    ...notSuitableSdoSteps(c.notSuitableSdo, ctx, sdoUser, sdoTask),

    // The Standard Direction Order (fast track and small claims) or a directions order (intermediate and multi track),
    // once the claim is in JUDICIAL_REFERRAL, which moves it to CASE_PROGRESSION. A small claim gets there after
    // unsuccessful mediation, and work allocation gives its directions task to a legal adviser rather than a judge,
    // apart from a flight delay claim's, which a judge gets and which has the flight delay directions.
    {
      name: 'CREATE_SDO',
      title: `${sdoUser === 'legalAdviser' ? 'Legal Adviser' : 'Judge'} makes a Standard Direction Order${c.disputeResolutionHearing === yesNo.YES ? ' for a dispute resolution hearing' : ''}${c.flightDelaySmallClaim ? ' with flight delay directions' : ''}.`,
      user: sdoUser,
      skipIf: [
        noLitigantInPerson,
        [!c.claimantResponds || ![caseStates.JUDICIAL_REFERRAL, caseStates.IN_MEDIATION].includes(c.claimantOutcome.state), 'Skipping as the claimant\'s response did not take the claim to JUDICIAL_REFERRAL or mediation'],
        settledInMediation,
        [c.track !== claimTrack.FAST && c.track !== claimTrack.SMALL, 'Skipping as the intermediate and multi tracks get a directions order instead'],
      ],
      run: async ({ page, storageState }) => {
        await ctx.runEvent(page, storageState, async () => {
          // Where work allocation is switched on, the directions task for the track is needed to make the order. It is
          // claimed through the API version too, as the UI would.
          await new WaTaskHelper(page).assignTaskForEvent(ctx.caseId, 'CREATE_SDO', sdoTask);
          if (!ctx.useApi()) {
            await new ui.CreateSdo(page).submit(ctx.caseId, c.track, false, c.disputeResolutionHearing === yesNo.YES, c.flightDelaySmallClaim);
          }
        });
        if (ctx.useApi()) {
          await new api.CreateSdo().submit(ctx.caseId, sdoUser, c.track, false, c.disputeResolutionHearing === yesNo.YES, c.flightDelaySmallClaim);
        }
        if (c.flightDelaySmallClaim) {
          await expectFlightDelayDirections(ctx);
        }
        if (c.disputeResolutionHearing === yesNo.YES) {
          await expectDisputeResolutionHearing(ctx);
        }
        await ctx.assertCaseState(caseStates.CASE_PROGRESSION);
      },
    },

    // A party's solicitor asks for the legal adviser's small claims order to be reconsidered
    // (REQUEST_FOR_RECONSIDERATION=CLAIMANT, DEFENDANT_1 or DEFENDANT_2), which civil-service allows within 7 days of the
    // order, and a judge decides it (RECONSIDERATION_DECISION, default UPHOLD). The claim stays in CASE_PROGRESSION, so
    // the journey carries on to the evidence.
    {
      name: 'REQUEST_FOR_RECONSIDERATION',
      title: `${reconsiderationRequester.label} asks for the order to be reconsidered.`,
      user: reconsiderationRequester.user,
      skipIf: noReconsideration,
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
      skipIf: noReconsideration,
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

    // Intermediate and multi track claims get no Standard Direction Order: the judge's task is to allocate the claim
    // to its track, which is done with a directions order made with "Make an order"
    {
      name: 'MAKE_DIRECTIONS_ORDER',
      title: 'Judge makes a directions order.',
      user: 'judge',
      skipIf: [
        ...noJudicialReferral,
        [c.track !== claimTrack.INTERMEDIATE && c.track !== claimTrack.MULTI, 'Skipping as the directions order is for the intermediate and multi tracks'],
      ],
      run: async ({ page, storageState }) => {
        await ctx.runEvent(page, storageState, async () => {
          // Where work allocation is switched on, the judge needs the task to allocate the claim to its track
          await new WaTaskHelper(page).assignTaskForEvent(
            ctx.caseId,
            'GENERATE_DIRECTIONS_ORDER',
            c.track === claimTrack.INTERMEDIATE ? 'allocateIntermediateTrack' : 'allocateMultiTrack',
          );
          if (!ctx.useApi()) {
            await new ui.MakeDirectionsOrder(page).submit();
          }
        });
        if (ctx.useApi()) {
          await new api.MakeDirectionsOrder().submit(ctx.caseId);
        }
        await ctx.assertCaseState(caseStates.CASE_PROGRESSION);
      },
    },

    // Each solicitor uploads evidence once the judge's order has moved the claim to CASE_PROGRESSION
    ...uploadEvidenceSteps(),

    // The hearing centre admin lists the trial once the evidence is in, or a small claim's hearing once its order is
    // made. This is done in place of HMC returning a LISTED hearing, and moves the claim to HEARING_READINESS for the
    // hearing fee.
    {
      name: 'CREATE_HEARING_NOTICE',
      title: c.hearingNoticeScheduler === yesNo.YES && api.AutomatedHearingNotice.isAvailable()
        ? 'HMC lists the trial and the automated hearing notice scheduler sends the hearing notice.'
        : 'Hearing Centre Admin creates a hearing notice.',
      user: 'hearingCentreAdmin',
      skipIf: noCaseProgression,
      run: async ({ page, storageState }) => {
        if (c.hearingNoticeScheduler === yesNo.YES && api.AutomatedHearingNotice.isAvailable()) {
          await runHearingNoticeScheduler(ctx, 'spec', c.track);
          return;
        }
        if (c.hearingNoticeScheduler === yesNo.YES) {
          console.warn('WARNING: HEARING_NOTICE_SCHEDULER=Yes needs a civil-service PR preview (ENV=preview PREVIEW_SERVICE=service), where HMC is WireMock. The hearing centre admin creates the hearing notice instead.');
        }
        await ctx.submitEvent(page, storageState, {
          api: () => new api.CreateHearingNotice().submit(ctx.caseId, c.track),
          ui: () => new ui.CreateHearingNotice(page).submit(c.track),
          expectState: caseStates.HEARING_READINESS,
        });
      },
    },

    // Listing the trial set a hearing fee, which the claimant's solicitor pays from the Service Request tab. Once it is
    // paid, HEARING_FEE_PAID moves the claim to PREPARE_FOR_HEARING_CONDUCT_HEARING.
    {
      name: 'PAY_HEARING_FEE',
      title: 'Claimant Solicitor pays the hearing fee.',
      user: 'claimantSolicitor',
      skipIf: noCaseProgression,
      run: async ({ page, storageState }) => {
        // Paid in the hearing fee's row of the Service Request tab, which also lists the claim fee
        await ctx.payFeeInUi(page, storageState, 'hearingFeePBADetails', c.paymentMethod);
        // The payment service tells civil-service about the payment, which can take a while. Where it cannot reach
        // civil-service the test tells it instead. Telling it both ways would update the case twice, and the late
        // update can clash with the next event (CCD rejects it with HTTP 409), so the test only steps in if the payment
        // service has not done it within a minute.
        const recordedByPaymentService = await ctx.testingEndpointHelper.waitForFeePaid(ctx.caseId, 'hearingFeePaymentDetails', 60);
        if (!recordedByPaymentService) {
          console.log('The payment service did not record the hearing fee payment, so the test does');
          await ctx.testingEndpointHelper.serviceRequestUpdateHearingFee(ctx.caseId);
        }
        // civil-service's scheduler would run HEARING_FEE_PAID later, so it is run now
        await ctx.testingEndpointHelper.triggerHearingFeePaid(ctx.caseId);
        await ctx.assertCaseState(caseStates.PREPARE_FOR_HEARING_CONDUCT_HEARING);
      },
    },

    // civil-service's trial ready check scheduler asks the parties to confirm they are ready for trial once a fast track
    // hearing is less than 3 weeks away. The hearing notice lists it weeks away, so the test runs TRIAL_READY_CHECK
    // itself. It records the check on the case (trialReadyChecked) and leaves the claim in
    // PREPARE_FOR_HEARING_CONDUCT_HEARING.
    {
      name: 'TRIAL_READY_CHECK',
      title: 'The parties are asked to confirm they are ready for trial.',
      user: 'claimantSolicitor',
      skipIf: [
        ...noCaseProgression,
        [c.track !== claimTrack.FAST, 'Skipping as the trial ready check is only made on the fast track'],
      ],
      run: async () => {
        await ctx.testingEndpointHelper.triggerTrialReadyCheck(ctx.caseId);
        await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'TRIAL_READY_CHECK');
        const caseData = await ctx.testingEndpointHelper.getCaseData(ctx.caseId);
        expect(caseData.trialReadyChecked, 'The trial ready check was not recorded on the case').toBe('Yes');
        await ctx.assertCaseState(caseStates.PREPARE_FOR_HEARING_CONDUCT_HEARING);
      },
    },

    // Each solicitor confirms the case is ready for trial. The CCD definition only offers this on the fast track, and
    // civil-service refuses it once the hearing is less than 3 weeks away; the hearing notice lists it about 8 weeks
    // ahead. The claim stays in PREPARE_FOR_HEARING_CONDUCT_HEARING.
    ...confirmTrialArrangementsSteps(),

    // The trial bundle, which a civil-service scheduler normally creates about 3 weeks before the hearing, is created
    // now. The scheduler leaves out intermediate and multi track claims, but small claims have a bundle too. Once the
    // bundle has been stitched into one document it shows on the Bundles tab.
    {
      name: 'CREATE_TRIAL_BUNDLE',
      title: 'Trial bundle is created and shown to the Claimant Solicitor.',
      user: 'claimantSolicitor',
      skipIf: [
        ...noCaseProgression,
        [c.track === claimTrack.INTERMEDIATE || c.track === claimTrack.MULTI, 'Skipping as civil-service does not create trial bundles for intermediate or multi track claims'],
      ],
      run: async ({ page, storageState }) => {
        await ctx.testingEndpointHelper.triggerTrialBundle(ctx.caseId);
        const bundleTitle = await ctx.testingEndpointHelper.waitForBundleStitched(ctx.caseId);
        await ctx.runEvent(page, storageState, async () => {
          await ctx.pageHelper.gotoAndWaitForXui(ctx.caseUrl());
          await ctx.tabsHelper.selectTab('Bundles');
          await expect(page.getByText(bundleTitle).first()).toBeVisible();
        });
        await ctx.assertCaseState(caseStates.PREPARE_FOR_HEARING_CONDUCT_HEARING);
      },
    },

    // Civil has no record of the hearing itself taking place. Once the hearing date has passed, a civil-service scheduler
    // runs MOVE_TO_DECISION_OUTCOME, on every track, which moves the claim to DECISION_OUTCOME to wait for the judge's
    // decision. The hearing is weeks away, so the test runs that event itself.
    {
      name: 'MOVE_TO_DECISION_OUTCOME',
      title: 'Hearing date passes and the claim moves to decision outcome.',
      user: 'judge',
      skipIf: noCaseProgression,
      run: async () => {
        await ctx.testingEndpointHelper.moveToDecisionOutcome(ctx.caseId);
        await ctx.assertCaseState(caseStates.DECISION_OUTCOME);
      },
    },

    // The judge's final order after the hearing, chosen with FINAL_ORDER: a free form or assisted order on the small
    // claims and fast tracks, an order uploaded from a template on the intermediate and multi tracks. None of them, without a further
    // hearing, changes the claim's state. The order's notifications are sent by the GENERATE_ORDER_NOTIFICATION
    // business process.
    {
      name: 'MAKE_FINAL_ORDER',
      title: `Judge makes a final order (${c.finalOrder}).`,
      user: 'judge',
      skipIf: noCaseProgression,
      run: async ({ page, storageState }) => {
        const ordersBefore = await ctx.testingEndpointHelper.countFinalOrders(ctx.caseId);
        await ctx.submitEvent(page, storageState, {
          api: () => new api.MakeFinalOrder().submit(ctx.caseId, c.finalOrder),
          ui: () => new ui.MakeFinalOrder(page).submit(c.finalOrder),
          businessProcess: 'GENERATE_ORDER_NOTIFICATION',
        });
        expect(await ctx.testingEndpointHelper.countFinalOrders(ctx.caseId), 'The final order was not added to the case').toBe(ordersBefore + 1);
        await ctx.assertCaseState(caseStates.DECISION_OUTCOME);
      },
    },

    // Court staff review the judge's order ("Order Made - Review case"). Confirming it is a final order, with no
    // obligation date and nothing left to do, closes the claim on any track: it moves to All_FINAL_ORDERS_ISSUED and the
    // CONFIRM_ORDER_REVIEW_FINAL_ORDER business process runs.
    {
      name: 'CONFIRM_ORDER_REVIEW',
      title: 'Hearing Centre Admin confirms the order review.',
      user: 'hearingCentreAdmin',
      skipIf: noCaseProgression,
      run: async ({ page, storageState }) => {
        await ctx.submitEvent(page, storageState, {
          api: () => new api.ConfirmOrderReview().submit(ctx.caseId),
          ui: () => new ui.ConfirmOrderReview(page).submit(),
          businessProcess: 'CONFIRM_ORDER_REVIEW_FINAL_ORDER',
          expectState: caseStates.All_FINAL_ORDERS_ISSUED,
        });
      },
    },
    ...judgmentsOnlineSteps(),

    // The claim is settled with "Settle this claim" once the rest of the journey has run, or where STOP_AT_STATE or
    // STOP_AFTER_TEST stops it (SETTLE_CLAIM). Each event is only offered in some states, so the step is skipped where
    // the journey ended in another.
    //
    // The claimant's solicitor marks the claim as paid in full (SETTLE_CLAIM=MARK_PAID_IN_FULL): civil-service stays
    // the case (CASE_STAYED) and tells the defendants. It is not offered where there are two defendants and either is a
    // litigant in person.
    {
      name: 'SETTLE_CLAIM_MARK_PAID_FULL',
      title: 'Claimant Solicitor marks the claim as paid in full.',
      user: 'claimantSolicitor',
      closesClaim: true,
      invalidIf: (stops) => c.settleClaim === SettleClaimReason.MARK_PAID_IN_FULL ? closingProblems('SETTLE_CLAIM=MARK_PAID_IN_FULL', stops, settleableStates, true) : [],
      skipIf: [
        [c.settleClaim !== SettleClaimReason.MARK_PAID_IN_FULL, 'Skipping as the claimant\'s solicitor does not settle the claim (set SETTLE_CLAIM=MARK_PAID_IN_FULL to run it)'],
      ],
      run: async ({ page, storageState, user }) => {
        test.skip(!settleableStates.includes(ctx.lastStateReached), `Skipping as the claim cannot be settled in ${ctx.lastStateReached}`);
        await ctx.submitEvent(page, storageState, {
          api: () => new api.SettleClaimMarkPaidFull().submit(ctx.caseId, user),
          ui: () => new ui.SettleClaimMarkPaidFull(page).submit(c.claimShape.claimants.length === 2),
          businessProcess: 'SETTLE_CLAIM_MARKED_PAID_IN_FULL',
          expectState: caseStates.CASE_STAYED,
        });
      },
    },

    // Court staff record that the claim settled after a judge's order or an approved consent order
    // (SETTLE_CLAIM=JUDGE_ORDER or CONSENT_ORDER), which moves it to CASE_SETTLED. Unlike the solicitor's event, it is
    // also offered while the case is stayed.
    {
      name: 'SETTLE_CLAIM',
      title: `Hearing Centre Admin records that the claim has settled${c.settleClaim === SettleClaimReason.JUDGE_ORDER || c.settleClaim === SettleClaimReason.CONSENT_ORDER ? ` (${c.settleClaim})` : ''}.`,
      user: 'hearingCentreAdmin',
      closesClaim: true,
      invalidIf: (stops) => c.settleClaim === SettleClaimReason.JUDGE_ORDER || c.settleClaim === SettleClaimReason.CONSENT_ORDER
        ? closingProblems(`SETTLE_CLAIM=${c.settleClaim}`, stops, [...settleableStates, caseStates.CASE_STAYED], false)
        : [],
      skipIf: [
        [
          c.settleClaim !== SettleClaimReason.JUDGE_ORDER && c.settleClaim !== SettleClaimReason.CONSENT_ORDER,
          'Skipping as court staff do not settle the claim (set SETTLE_CLAIM=JUDGE_ORDER or CONSENT_ORDER to run it)',
        ],
      ],
      run: async ({ page, storageState }) => {
        const reason = c.settleClaim as SettleClaimReason.JUDGE_ORDER | SettleClaimReason.CONSENT_ORDER;
        test.skip(![...settleableStates, caseStates.CASE_STAYED].includes(ctx.lastStateReached), `Skipping as the claim cannot be settled in ${ctx.lastStateReached}`);
        await ctx.submitEvent(page, storageState, {
          api: () => new api.SettleClaim().submit(ctx.caseId, reason),
          ui: () => new ui.SettleClaim(page).submit(reason),
          expectState: caseStates.CASE_SETTLED,
        });
      },
    },
    // The claimant's solicitor fully discontinues the claim with "Discontinue this claim" once the rest of the journey
    // has run (DISCONTINUE_CLAIM). It is only offered in some states, so the step is skipped where the journey ended in
    // another, and not where there are two defendants and either is a litigant in person. Without the court's
    // permission (NO_PERMISSION_NEEDED) civil-service discontinues the claim (CASE_DISCONTINUED). With a judge's
    // permission (PERMISSION_GRANTED) the claim stays where it is until court staff validate the discontinuance.
    {
      name: 'DISCONTINUE_CLAIM',
      title: `Claimant Solicitor discontinues the claim${c.discontinueClaim ? ` (${c.discontinueClaim})` : ''}.`,
      user: 'claimantSolicitor',
      closesClaim: true,
      invalidIf: (stops) => c.discontinueClaim !== undefined ? closingProblems(`DISCONTINUE_CLAIM=${c.discontinueClaim}`, stops, discontinuableStates, true) : [],
      skipIf: [
        [c.discontinueClaim === undefined, 'Discontinuing the claim is switched off (set DISCONTINUE_CLAIM=NO_PERMISSION_NEEDED or PERMISSION_GRANTED to run it)'],
      ],
      run: async ({ page, storageState, user }) => {
        const stateBefore = ctx.lastStateReached;
        test.skip(!discontinuableStates.includes(stateBefore), `Skipping as the claim cannot be discontinued in ${stateBefore}`);
        await ctx.submitEvent(page, storageState, {
          api: () => new api.DiscontinueClaim().submit(ctx.caseId, c.discontinueClaim, user),
          ui: () => new ui.DiscontinueClaim(page).submit(c.discontinueClaim),
        });
        const awaitingValidation = c.discontinueClaim === DiscontinueClaimType.PERMISSION_GRANTED;
        await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'DISCONTINUE_CLAIM_CLAIMANT');
        await ctx.assertCaseState(awaitingValidation ? stateBefore : caseStates.CASE_DISCONTINUED);
        discontinuanceAwaitingValidation = awaitingValidation;
      },
    },

    // Court staff check the order that gave the claimant permission to discontinue with "Validate discontinuance"
    // (DISCONTINUE_CLAIM=PERMISSION_GRANTED). Confirming the order gives permission discontinues the claim. Where work
    // allocation is switched on, the hearing centre admin needs the "Claim Discontinued - Validate discontinuance" task
    // (ValidateDiscontinuanceAdmin), which is claimed through the API version too, as the UI would.
    {
      name: 'VALIDATE_DISCONTINUANCE',
      title: 'Hearing Centre Admin validates the discontinuance.',
      user: 'hearingCentreAdmin',
      closesClaim: true,
      skipIf: [
        [c.discontinueClaim !== DiscontinueClaimType.PERMISSION_GRANTED, 'Skipping as the discontinuance did not need the court\'s permission (set DISCONTINUE_CLAIM=PERMISSION_GRANTED to run it)'],
      ],
      run: async ({ page, storageState }) => {
        test.skip(!discontinuanceAwaitingValidation, 'Skipping as the claimant did not discontinue the claim');
        await ctx.runEvent(page, storageState, async () => {
          await new WaTaskHelper(page).assignTaskForEvent(ctx.caseId, 'VALIDATE_DISCONTINUE_CLAIM_CLAIMANT', 'ValidateDiscontinuanceAdmin');
          if (!ctx.useApi()) {
            await new ui.ValidateDiscontinueClaim(page).submit();
          }
        });
        if (ctx.useApi()) {
          await new api.ValidateDiscontinueClaim().submit(ctx.caseId);
        }
        await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'VALIDATE_DISCONTINUE_CLAIM_CLAIMANT');
        await ctx.assertCaseState(caseStates.CASE_DISCONTINUED);
      },
    },

    // The hearing centre admin takes the claim offline with "Case proceeds in Caseman" once the rest of the journey has
    // run, or where STOP_AT_STATE or STOP_AFTER_TEST stops it (CASE_PROCEEDS_IN_CASEMAN=<reason for proceeding on
    // paper>), with today as the date it was transferred to Caseman. civil-service moves the claim to
    // PROCEEDS_IN_HERITAGE_SYSTEM. The step is skipped where the journey ended in a state the event is not offered in,
    // such as a claim that has already gone offline.
    {
      name: 'CASE_PROCEEDS_IN_CASEMAN',
      title: `Hearing Centre Admin takes the claim offline${c.caseProceedsInCaseman ? ` (${c.caseProceedsInCaseman})` : ''}.`,
      user: 'hearingCentreAdmin',
      closesClaim: true,
      invalidIf: (stops) => c.caseProceedsInCaseman !== undefined ? closingProblems(`CASE_PROCEEDS_IN_CASEMAN=${c.caseProceedsInCaseman}`, stops, casemanStates, false) : [],
      skipIf: [
        [c.caseProceedsInCaseman === undefined, 'Taking the claim offline is switched off (set CASE_PROCEEDS_IN_CASEMAN=APPLICATION, JUDGEMENT_REQUEST, CASE_SETTLED or OTHER to run it)'],
      ],
      run: async ({ page, storageState }) => {
        const reason = c.caseProceedsInCaseman as CaseProceedsInCasemanReason;
        test.skip(!casemanStates.includes(ctx.lastStateReached), `Skipping as the claim cannot be taken offline in ${ctx.lastStateReached}`);
        await ctx.submitEvent(page, storageState, {
          api: () => new api.CaseProceedsInCaseman().submit(ctx.caseId, reason, true),
          ui: () => new ui.CaseProceedsInCaseman(page).submit(reason, true),
          businessProcess: 'CASE_PROCEEDS_IN_CASEMAN',
          expectState: caseStates.PROCEEDS_IN_HERITAGE_SYSTEM,
        });
      },
    },
    // The hearing centre admin dismisses the case with "Dismiss case" once the rest of the journey has run, or where
    // STOP_AT_STATE or STOP_AFTER_TEST stops it (DISMISS_CASE=Yes), which moves it to CASE_DISMISSED and tells the
    // parties. It is offered in the same states as "Settle this claim" (not CASE_STAYED), so the step is skipped where the
    // journey ended in another.
    {
      name: 'DISMISS_CASE',
      title: 'Hearing Centre Admin dismisses the case.',
      user: 'hearingCentreAdmin',
      closesClaim: true,
      invalidIf: (stops) => c.dismissCase === yesNo.YES ? closingProblems('DISMISS_CASE=Yes', stops, settleableStates, false) : [],
      skipIf: [
        [c.dismissCase !== yesNo.YES, 'Dismissing the case is switched off (set DISMISS_CASE=Yes to run it)'],
      ],
      run: async ({ page, storageState }) => {
        test.skip(!settleableStates.includes(ctx.lastStateReached), `Skipping as the case cannot be dismissed in ${ctx.lastStateReached}`);
        await ctx.submitEvent(page, storageState, {
          api: () => new api.DismissCase().submit(ctx.caseId),
          ui: () => new ui.DismissCase(page).submit(),
          businessProcess: 'DISMISS_CASE',
          expectState: caseStates.CASE_DISMISSED,
        });
      },
    },
  ];

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
    if (settledInMediation[0]) {
      return caseStates.CASE_STAYED;
    }
    return undefined;
  }

  // The settings that cannot close the claim: two defendants where either is a litigant in person, which civil-service
  // does not allow the claimant's solicitor to settle or discontinue, or a journey that ends in a state the closing
  // event is not offered in
  function closingProblems(setting: string, stops: JourneyStops, offeredIn: caseStates[], claimantSolicitor: boolean): Array<[boolean, string]> {
    const endState = journeyEndState(stops);
    return [
      [
        claimantSolicitor && twoDefendantsWithLitigantInPerson[0],
        `${setting} cannot be used with CLAIM_TYPE=${c.claimType}: the claimant's solicitor cannot settle or discontinue a claim against two defendants where one is a litigant in person`,
      ],
      [
        endState !== undefined && !offeredIn.includes(endState),
        `${setting} cannot be used where the journey ends in ${endState}${stops.stopAtState ? ' (STOP_AT_STATE)' : ''}: it is only offered in ${offeredIn.join(', ')}`,
      ],
    ];
  }

  // Once default judgment is asked for, the defendants' steps and everything after them do not apply, apart from
  // settling or discontinuing the claim and the Judgments Online steps, which act on the default judgment
  const judgmentsOnlineStepNames = ['JUDGMENT_PAID_IN_FULL', 'REFER_JUDGE_DEFENCE_RECEIVED', 'SET_ASIDE_JUDGMENT'];
  const lastDefaultJudgmentStep = steps.map((step) => step.name).lastIndexOf('DEFAULT_JUDGMENT');
  steps.slice(lastDefaultJudgmentStep + 1)
    .filter((step) => !step.closesClaim && !judgmentsOnlineStepNames.includes(step.name))
    .forEach((step) => {
      step.skipIf = [...(step.skipIf ?? []), afterDefaultJudgment];
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
    const judgmentByAdmission = allDefendantsRepresented && c.claimantResponds
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
        skipIf: [noLitigantInPerson],
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
    const solicitors: Array<{ defendantNumber: 1 | 2; user: SessionUserKey; noSolicitor: [boolean, string] }> = [
      { defendantNumber: 1, user: 'respondent1Solicitor', noSolicitor: noDefendant1Solicitor },
      {
        defendantNumber: 2,
        user: 'respondent2Solicitor',
        // Defendant 2's own solicitor. civil-service only treats them as separate from Defendant 1's when both
        // defendants are represented, as in the unspecified journey.
        noSolicitor: [c.claimType !== claimTypes.ONE_VS_TWO_DIFF_SOL, 'Skipping as Defendant 2 has no separate solicitor'],
      },
    ];
    return solicitors.map((solicitor) => ({
      name: `INFORM_AGREED_EXTENSION_DEFENDANT${solicitor.defendantNumber}`,
      title: `Defendant ${solicitor.defendantNumber} Solicitor informs the court of an agreed extension.`,
      user: solicitor.user,
      skipIf: [
        solicitor.noSolicitor,
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
          noMediation.some(([skipped]) => skipped),
          `UPLOAD_MEDIATION_DOCUMENTS=Yes needs the claimant's response to take the small claim to mediation, with every defendant represented: ${noMediation.filter(([skipped]) => skipped).map(([, reason]) => reason).join('; ')}`,
        ],
      ],
      skipIf: [
        ...noMediation,
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
      skipIf: [
        ...noCaseProgression,
        ['defendant2' in solicitor && c.claimType !== claimTypes.ONE_VS_TWO_DIFF_SOL, 'Skipping as Defendant 2 has no separate solicitor'],
      ],
      run: async ({ page, storageState, user }) => {
        await ctx.submitEvent(page, storageState, {
          api: () => new api.UploadEvidence().submit(ctx.caseId, user, c.track),
          ui: () => new ui.UploadEvidence(page).submit(c.track),
          expectState: caseStates.CASE_PROGRESSION,
        });
      },
    }));
  }

  // One step per CASE_FLAGS flag, each a Create case flags event, then a Manage case flags event that makes the first
  // one inactive. They run once the claimant has responded, in whichever online state that left the claim (court staff
  // can flag a case in any of them). Flags court staff create are active whatever reference data's default status,
  // which is for flags requested from outside the court.
  function caseFlagSteps(): JourneyStep[] {
    const flags = caseFlagSpecs(c);
    const noCaseFlags: Array<[boolean, string]> = [
      noLitigantInPerson,
      [!c.claimantResponds, 'Skipping as the claim went offline once the defendants responded'],
      [c.claimantOutcome.state === caseStates.PROCEEDS_IN_HERITAGE_SYSTEM, 'Skipping as the claimant\'s response took the claim offline'],
      [flags.length === 0, 'Adding case flags is switched off (set CASE_FLAGS=representative, or a list such as CASE:CF0002,DEFENDANT_1:RA0012)'],
    ];
    const comment = (index: number, flag: CaseFlagSpec) => `Case flag ${index + 1} (${flag.code}) added by the specified journey`;

    const createSteps: JourneyStep[] = flags.map((flag, index) => ({
      name: `CREATE_CASE_FLAG_${index + 1}`,
      group: 'CREATE_CASE_FLAGS',
      title: `Hearing Centre Admin adds case flag ${flag.code} to ${flag.holder}.`,
      user: 'hearingCentreAdmin',
      skipIf: noCaseFlags,
      run: async ({ page, storageState }) => {
        const flagType = await caseFlagType(page, flag.holder === 'CASE' ? 'CASE' : 'PARTY', flag.code, flag.otherUnder);
        console.log(`Adding case flag ${flag.code} "${flagType.path.join(' > ')}" to ${holderLabel(c, flag.holder)}`);
        await ctx.submitEvent(page, storageState, {
          api: () => new api.CreateCaseFlag().submit(ctx.caseId, flag.holder, flagType, { ...flag, comment: comment(index, flag) }),
          ui: () => new ui.CreateCaseFlag(page).submit(holderLabel(c, flag.holder), flagType, { ...flag, comment: comment(index, flag) }),
        });
        const { field, index: entry } = holderFlagsField(flag.holder);
        const saved = (await ctx.testingEndpointHelper.getCaseFlagDetails(ctx.caseId, field, entry)).find((detail) => detail.flagComment === comment(index, flag));
        expect(saved, `Case flag ${flag.code} was not saved on ${field}${entry === undefined ? '' : `[${entry}]`}`).toBeDefined();
        expect(saved.flagCode).toBe(flag.code);
        expect(saved.status).toBe('Active');
        if (flag.otherDescription) {
          expect(saved.otherDescription).toBe(flag.otherDescription);
        }
        await ctx.assertCaseState(c.claimantOutcome.state);
      },
    }));

    const first = flags[0];
    const manageStep: JourneyStep = {
      name: 'MAKE_CASE_FLAG_INACTIVE',
      title: 'Hearing Centre Admin makes the first case flag inactive.',
      user: 'hearingCentreAdmin',
      skipIf: noCaseFlags,
      run: async ({ page, storageState }) => {
        const flagType = await caseFlagType(page, first.holder === 'CASE' ? 'CASE' : 'PARTY', first.code, first.otherUnder);
        const reason = 'Made inactive by the specified journey';
        await ctx.submitEvent(page, storageState, {
          api: () => new api.ManageCaseFlag().makeInactive(ctx.caseId, first.holder, first.code, reason),
          ui: () => new ui.ManageCaseFlag(page).makeInactive(holderLabel(c, first.holder), first.otherDescription ?? flagType.name, reason),
        });
        const { field, index: entry } = holderFlagsField(first.holder);
        const saved = (await ctx.testingEndpointHelper.getCaseFlagDetails(ctx.caseId, field, entry)).find((detail) => detail.flagCode === first.code);
        expect(saved?.status, `Case flag ${first.code} on ${field} was not made inactive`).toBe('Inactive');
        await ctx.assertCaseState(c.claimantOutcome.state);
      },
    };

    if (flags.length === 0) {
      // Without CASE_FLAGS the journey still lists one step, skipped with the reason, as it does for other switched-off steps
      return [{ name: 'CREATE_CASE_FLAGS', title: 'Hearing Centre Admin adds case flags.', user: 'hearingCentreAdmin', skipIf: noCaseFlags, run: async () => {} }];
    }
    return [...createSteps, manageStep];
  }

  // One step per MANAGE_CONTACT_INFORMATION entry, each a Manage Contact Information event as its user, checked against
  // the case data civil-service saved. They run once the claimant has responded and the claim is still online, but
  // civil-service only lets the admin run it while a claim waits in AWAITING_APPLICANT_INTENTION (a full admission paid
  // immediately), not a solicitor.
  function manageContactInformationSteps(): JourneyStep[] {
    const specs = mciSpecs(c);
    const noMci: Array<[boolean, string]> = [
      noLitigantInPerson,
      [!c.claimantResponds, 'Skipping as the claim went offline once the defendants responded'],
      [c.claimantOutcome.state === caseStates.PROCEEDS_IN_HERITAGE_SYSTEM, 'Skipping as the claimant\'s response took the claim offline'],
      [specs.length === 0, 'Managing contact information is switched off (set MANAGE_CONTACT_INFORMATION=representative, or a list such as admin:CLAIMANT_1,respondent1Solicitor:DEFENDANT_1)'],
    ];

    if (specs.length === 0) {
      // Without MANAGE_CONTACT_INFORMATION the journey still lists one step, skipped with the reason
      return [{ name: 'MANAGE_CONTACT_INFORMATION', title: 'Contact information is updated.', user: 'hearingCentreAdmin', skipIf: noMci, run: async () => {} }];
    }
    return specs.map((spec, index) => ({
      name: `MANAGE_CONTACT_INFORMATION_${index + 1}`,
      group: 'MANAGE_CONTACT_INFORMATION',
      title: `${mciUserLabel(spec)} updates the contact information of ${spec.party}.`,
      user: mciSessionUser(spec),
      skipIf: [
        ...noMci,
        [
          spec.user !== 'admin' && c.claimantOutcome.state === caseStates.AWAITING_APPLICANT_INTENTION,
          'Skipping as a solicitor cannot manage contact information while the claim waits in AWAITING_APPLICANT_INTENTION',
        ],
      ],
      run: async ({ page, storageState, user }) => {
        const change = mciChange(index, spec);
        await ctx.submitEvent(page, storageState, {
          api: () => new api.ManageContactInformation().submit(ctx.caseId, spec, change, user),
          ui: () => new ui.ManageContactInformation(page).submit(spec, change),
        });
        if (mciStartsBusinessProcess(spec.party)) {
          await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'MANAGE_CONTACT_INFORMATION');
        }
        const notSaved = mciChangeNotSavedReason(await ctx.testingEndpointHelper.getCaseData(ctx.caseId), spec, change);
        expect(notSaved, `Manage Contact Information for ${spec.party} was not saved: ${notSaved}`).toBeUndefined();
        await ctx.assertCaseState(c.claimantOutcome.state);
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
      skipIf: [
        ...noCaseProgression,
        [c.track !== claimTrack.FAST, 'Skipping as trial arrangements are only confirmed on the fast track'],
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
