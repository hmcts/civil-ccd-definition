import { expect, test } from '@playwright/test';
import { envUrl } from '../../../civilConfig.ts';
import { CreateUnspecifiedCase } from '../../flows/createUnspecifiedCase.ts';
import * as ui from '../../flows/events/ui/index.ts';
import * as api from '../../flows/events/api/index.ts';
import { DirectionsQuestionnaireAnswers } from '../../flows/events/ui/DirectionsQuestionnaire.ts';
import yesNo from '../../../enums/yesNo.ts';
import claimTypes from '../../../enums/claim-types.ts';
import unspecClaimTypes from '../../../enums/unspecClaimTypes.ts';
import claimTrack from '../../../enums/track.ts';
import caseStates from '../../../enums/caseStates.ts';
import PaymentMethod from '../../../enums/paymentMethod.ts';
import { expectedLitigationFriendData, litigationFriendFor } from '../../flows/events/shared_api_ui/defendantLitigationFriendSpecs.ts';
import { sendAndReplySteps } from '../sendAndReplySteps.ts';
import { WaTaskHelper } from '../../../helpers/WaTaskHelper.ts';
import { CaseUserRegistry } from '../../../helpers/CaseUserRegistry.ts';
import { JourneyContext, JourneyStep, JourneyStops, withNeeds } from '../journeyRunner.ts';
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
import { withRefund } from '../refundSteps.ts';
import { addUnavailableDatesSteps } from '../addUnavailableDatesSteps.ts';
import { notSuitableSdoSteps, withNotSuitableSdo } from '../notSuitableSdoSteps.ts';
import { withDisputeResolutionHearing } from '../disputeResolutionHearing.ts';
import NotSuitableSdo from '../../../enums/notSuitableSdo.ts';
import { SessionUserKey } from '../../../helpers/SessionHelper.ts';
import { unspecifiedConfig, UnspecifiedConfig } from './unspecifiedConfig.ts';

// The steps of the unspecified journey, from creating the claim to the final order, in the order they run. Each step
// that does not apply to the journey's claim (see skipIf) is skipped. The notices of change (NOTICE_OF_CHANGE) are
// added after the NOTICE_OF_CHANGE_AFTER step (see noticeOfChangeSteps.ts), and a general application (GENERAL_APPLICATION)
// after the GENERAL_APPLICATION_AFTER step (see generalApplicationSteps.ts), and the queries (QUERY_MANAGEMENT) after
// the QUERY_MANAGEMENT_AFTER step (see queryManagementSteps.ts).
export function unspecifiedSteps(c: UnspecifiedConfig, ctx: JourneyContext): JourneyStep[] {
  const stepsFor = (config: UnspecifiedConfig) =>
    withRefund(config, ctx, withQueryManagement(config, ctx, withGeneralApplication(config, ctx, journeySteps(config, ctx))));
  return withNoticeOfChange(c, ctx, stepsFor(c), (claimType) =>
    stepsFor(unspecifiedConfig({ ...c.scenarioEnv, CLAIM_TYPE: claimType, NOTICE_OF_CHANGE: undefined })));
}

function journeySteps(c: UnspecifiedConfig, ctx: JourneyContext): JourneyStep[] {
  // Tracks which defendants have responded, so the expected state is right whichever responds first in claims where
  // they respond separately
  const defendantsResponded = new Set<number>();
  function expectedStateAfterResponse(defendantNumber: number): caseStates {
    defendantsResponded.add(defendantNumber);
    const waitingForOtherDefendant = c.separateResponseClaimTypes.includes(c.claimType) && defendantsResponded.size < 2;
    return waitingForOtherDefendant ? caseStates.AWAITING_RESPONDENT_ACKNOWLEDGEMENT : c.stateAfterAllResponses;
  }

  // The steps once the claim has its directions (c.facts.reachesCaseProgression) that are only made on the fast track
  const fastTrackOnly = (reason: string): [boolean, string] => [c.track !== claimTrack.FAST, reason];

  // Once the claim fee has been paid (through the UI or the API), the payment service tells civil-service, which then
  // issues the claim (CREATE_CLAIM_AFTER_PAYMENT). Where the payment service cannot reach civil-service the test tells
  // it instead. Telling it both ways would make civil-service try to issue the claim twice, so the test only steps in
  // if the payment service has not done it within a minute.
  async function waitForClaimIssued() {
    const recordedByPaymentService = await ctx.testingEndpointHelper.waitForFeePaid(ctx.caseId, 'claimIssuedPaymentDetails', 60);
    if (recordedByPaymentService) {
      await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'CREATE_CLAIM_AFTER_PAYMENT');
    } else {
      console.log('The payment service did not record the claim fee payment, so the test does');
      await ctx.testingEndpointHelper.serviceRequestUpdateClaimIssued(ctx.caseId);
    }
    await ctx.assertCaseState(caseStates.CASE_ISSUED);
  }

  // The directions questionnaire answers the responses share, through the UI or the API
  const dqAnswers: DirectionsQuestionnaireAnswers = {
    determinationWithoutHearing: c.determinationWithoutHearing,
    oneMonthStay: c.oneMonthStay,
    preActionProtocol: c.preActionProtocol,
    fixedRecoverableCosts: c.fixedRecoverableCosts,
    fixedRecoverableCostsBand: c.fixedRecoveryCostsBand,
    disclosure: yesNo.YES,
    noOfExperts: Number(c.noOfExperts),
    noOfWitnesses: Number(c.noOfWitnesses),
    language: c.language,
    unavailableDatesRequired: c.unavailableDatesRequired,
  };
  // The same answers as the arguments the UI's RespondToClaim and RespondToDefence take
  const directionsQuestionnaireAnswers = () => [
    dqAnswers.determinationWithoutHearing,
    dqAnswers.oneMonthStay,
    dqAnswers.preActionProtocol,
    dqAnswers.fixedRecoverableCosts,
    dqAnswers.fixedRecoverableCostsBand,
    dqAnswers.disclosure,
    dqAnswers.noOfExperts,
    dqAnswers.noOfWitnesses,
    dqAnswers.language,
    dqAnswers.unavailableDatesRequired,
  ] as const;

  // Whether the claimant's solicitor has uploaded the particulars of claim with "Add or amend claim documents", which
  // Notify claim details then shows instead of asking for them
  let particularsOfClaimUploaded = false;

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
      title: 'Claimant Solicitor creates ' + c.claimType + ' claim ',
      user: 'claimantSolicitor',
      run: async ({ page, storageState }) => {
        if (ctx.useApi()) {
          // One CCD API submit instead of the CREATE_CLAIM pages (API_UNTIL), then the claim fee is paid through the
          // payment service, as the UI's "Pay now" does
          const createClaim = new api.CreateClaim();
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
          return;
        }
        const pageHelper = ctx.pageHelper;
        // If the session ends before the claim is submitted, the claim is started again from the case list
        await ctx.runEvent(page, storageState, async () => {
          const createCase: CreateUnspecifiedCase = new CreateUnspecifiedCase(page);
          await ctx.createCasePage.createCase(c.caseType);
          await pageHelper.continueToNextPage(); //Summary
          const { claimants, defendants } = c.claimShape;
          await createCase.setReferences(defendants[0].solicitor !== 'none');
          await createCase.setCourt();
          await createCase.setClaimantType(claimants[0].type, 1);
          await createCase.setClaimantLitigantFriend(claimants[0].litigationFriend, 1);
          await createCase.setClaimantNotifications();
          await pageHelper.continueToNextPage(); //ClaimantSolicitorOrganisation
          await createCase.setClaimantServiceAddress();

          if (claimants.length === 2) {
            await createCase.setAnotherClaimant(yesNo.YES);
            await createCase.setClaimantType(claimants[1].type, 2);
            await createCase.setClaimantLitigantFriend(claimants[1].litigationFriend, 2);
          } else {
            await createCase.setAnotherClaimant(yesNo.NO);
          }

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
              await createCase.setSolicitorOrganisation(defendant.organisation.name);
              await createCase.setDefendantLegalRepresentativeCorrespondenceAddress(yesNo.NO, defendantNumber);
              if (defendantNumber === 2) {
                await createCase.setDefendant2LegalRepresentativeReference();
              }
              await createCase.setDefendantLegalRepresentativeEmail(defendantNumber);
            }
          }

          // A claim with two claimants cannot have a second defendant, so it is not asked for
          if (claimants.length === 1 && defendants.length === 1) {
            await createCase.setAnotherDefendant(yesNo.NO);
          }

          await createCase.setTypeOfClaim(c.typeOfClaim);

          if (c.typeOfClaim == unspecClaimTypes.PERSONAL_INJURY) {
            await createCase.setSubClaimType(c.typeOfClaimSubType);
          }

          if (
            c.typeOfClaim == unspecClaimTypes.HOUSING_DISREPAIR ||
            c.typeOfClaim == unspecClaimTypes.DAMAGES_AND_OTHER_REMEDY
          ) {
            await createCase.setOtherRemedy();
            await createCase.setHumanRights();
          }

          await createCase.setDescriptionOfClaim();
          await createCase.setUploadParticularsOfClaim();
          await createCase.setClaimValue(c.track, c.typeOfClaim);
          await pageHelper.continueToNextPage(); //Amount to pay - can do an assertion on amount by api to fee and pay to make sure fee is correct, if needed.
          await createCase.setStatementOfTruth(); //will be dependant upon case ie 1v1 etc
          await pageHelper.submitEvent(); //CYA
          await ctx.buttonHelper.closeAndReturnToCaseDetailsButton.click(); //Success
        }, envUrl);

        ctx.caseId = await pageHelper.grabCaseNumber();
        console.log('caseId>>>>>>>>>>>>>>>' + ctx.caseId + '<<<<<<<<<<<<<<<<<<<');
        CaseUserRegistry.record(ctx.caseId, 'claimantSolicitor');
        // Pay the claim fee, in its row of the Service Request tab
        await ctx.payFeeInUi(page, storageState, 'claimIssuedPBADetails', c.paymentMethod);
        await waitForClaimIssued();
      },
    },


    // The claimant's solicitor uploads the particulars of claim with "Add or amend claim documents" once the claim is
    // issued, which Notify claim details then serves. Only run with ADD_OR_AMEND_CLAIM_DOCUMENTS=Yes.
    {
      name: 'ADD_OR_AMEND_CLAIM_DOCUMENTS',
      title: 'Claimant Solicitor uploads the particulars of claim.',
      user: 'claimantSolicitor',
      skipIf: [[c.addOrAmendClaimDocuments !== yesNo.YES, 'Adding claim documents is switched off (set ADD_OR_AMEND_CLAIM_DOCUMENTS=Yes to run it)']],
      run: async ({ page, storageState }) => {
        await ctx.submitEvent(page, storageState, {
          api: () => new api.AddOrAmendClaimDocuments().submit(ctx.caseId),
          ui: () => new ui.AddOrAmendClaimDocuments(page).submit(),
        });
        const particulars = (await ctx.testingEndpointHelper.getCaseData(ctx.caseId)).servedDocumentFiles?.particularsOfClaimDocument ?? [];
        expect(particulars, 'The particulars of claim were not saved').toHaveLength(1);
        particularsOfClaimUploaded = true;
        await ctx.assertCaseState(caseStates.CASE_ISSUED);
      },
    },

    {
      name: 'NOTIFY_CLAIM',
      title: 'Claimant Solicitor undertakes event: Notify claim ',
      user: 'claimantSolicitor',
      run: async ({ page, storageState }) => {
        await ctx.submitEvent(page, storageState, {
          api: () => new api.NotifyClaim().notify(c, ctx.caseId),
          ui: () => new ui.NotifyClaim(page).notify(c.claimType, c.defendantsToNotifyClaim),
          businessProcess: 'NOTIFY_DEFENDANT_OF_CLAIM',
        });
        if (c.claimOfflineAfterNotifyClaim) {
          await ctx.assertCaseState(caseStates.PROCEEDS_IN_HERITAGE_SYSTEM);
          console.log('Notify claim -> claim went offline, later events are skipped');
        } else {
          await ctx.assertCaseState(caseStates.AWAITING_CASE_DETAILS_NOTIFICATION);
        }
      },
    },

    {
      name: 'NOTIFY_CLAIM_DETAILS',
      title: 'Claimant Solicitor undertakes event: Notify claim details ',
      user: 'claimantSolicitor',
      skipIf: [[c.claimOfflineAfterNotifyClaim, 'Claim went offline at Notify claim']],
      run: async ({ page, storageState }) => {
        await ctx.submitEvent(page, storageState, {
          api: () => new api.NotifyClaimDetails().notify(c, ctx.caseId),
          ui: () => new ui.NotifyClaimDetails(page).notify(c.claimType, c.defendantsToNotifyClaimDetails, particularsOfClaimUploaded),
          businessProcess: 'NOTIFY_DEFENDANT_OF_CLAIM_DETAILS',
        });
        if (c.claimOfflineAfterNotifyClaimDetails) {
          await ctx.assertCaseState(caseStates.PROCEEDS_IN_HERITAGE_SYSTEM);
          console.log('Notify claim details -> claim went offline, later events are skipped');
        } else {
          await ctx.assertCaseState(caseStates.AWAITING_RESPONDENT_ACKNOWLEDGEMENT);
          // The acknowledgements, which assign the defendants' solicitors, are skipped when the run stops here
          await ctx.assignDefendantSolicitorsIfStoppedAwaitingThem(c.claimType);
        }
      },
    },



    moveResponseDeadline(c, ctx),

    // The claimant's solicitor asks for default judgment against every defendant, with the damages decided at a
    // disposal hearing. The DEFAULT_JUDGEMENT business process notifies the defendants of the interim judgment, which
    // moves the claim to JUDICIAL_REFERRAL for the judge's directions.
    {
      name: 'DEFAULT_JUDGMENT',
      title: 'Claimant Solicitor requests default judgment.',
      user: 'claimantSolicitor',
      skipIf: [noDefaultJudgment],
      run: async ({ page, storageState, user }) => {
        await ctx.submitEvent(page, storageState, {
          api: () => new api.DefaultJudgment().submit(ctx.caseId, user),
          ui: () => new ui.DefaultJudgment(page).submit(c.claimShape.defendants.length === 2),
          businessProcess: 'DEFAULT_JUDGEMENT',
          expectState: caseStates.JUDICIAL_REFERRAL,
        });
      },
    },

    // The judge's directions after default judgment ("Directions Order (Judgment)"): a disposal hearing to decide the
    // damages, which moves the claim to CASE_PROGRESSION. Where work allocation is switched on, the judge needs the
    // "Directions after Judgment (Damages)" task, which is claimed through the API version too, as the UI would.
    {
      name: 'STANDARD_DIRECTION_ORDER_DJ',
      title: 'Judge makes a directions order after default judgment.',
      user: 'judge',
      skipIf: [noDefaultJudgment],
      run: async ({ page, storageState }) => {
        await ctx.runEvent(page, storageState, async () => {
          await new WaTaskHelper(page).assignTaskForEvent(ctx.caseId, 'STANDARD_DIRECTION_ORDER_DJ', 'summaryJudgmentDirections');
          if (!ctx.useApi()) {
            await new ui.StandardDirectionOrderDj(page).submit(ctx.caseId);
          }
        });
        if (ctx.useApi()) {
          await new api.StandardDirectionOrderDj().submit(ctx.caseId);
        }
        await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'STANDARD_DIRECTION_ORDER_DJ');
        await ctx.assertCaseState(caseStates.CASE_PROGRESSION);
      },
    },

    {
      name: 'ACKNOWLEDGE_CLAIM_DEFENDANT1',
      title: 'Defendant 1 Solicitor acknowledges claim.',
      user: 'respondent1Solicitor',
      needs: [c.facts.notOfflineAtNotify, c.facts.defendant1HasSolicitor],
      run: async ({ page, storageState, user }) => {
        await ctx.testingEndpointHelper.assignDefendantLegalRepToCase(ctx.caseId, c.claimType, [...ctx.defendantsGivenSolicitorByNoc]);
        if (ctx.useApi()) {
          await new api.AcknowledgeClaim().acknowledge(c, ctx.caseId, 1, user);
        } else {
          // The case page was opened before this solicitor was assigned to the case, so open it again now they can see it
          await ctx.pageHelper.gotoAndWaitForXui(ctx.caseUrl());
          await ctx.runEvent(page, storageState, async () => {
            await new ui.AcknowledgeClaim(page).acknowledge(c.claimType, c.respondent1ResponseIntention, c.respondent2ResponseIntention, 1, c.defendantType);
          });
        }
        await ctx.assertCaseState(caseStates.AWAITING_RESPONDENT_ACKNOWLEDGEMENT);
      },
    },

    {
      name: 'ACKNOWLEDGE_CLAIM_DEFENDANT2',
      title: 'Defendant 2 Solicitor acknowledges claim.',
      user: 'respondent2Solicitor',
      needs: [c.facts.notOfflineAtNotify, c.facts.defendant2HasOwnSolicitor],
      run: async ({ page, storageState, user }) => {
        if (c.claimType === claimTypes.ONE_VS_TWO_LIP_LR) {
          // Defendant 1's acknowledgement is skipped for this claim type (Defendant 1 is a LiP), so Defendant 2's
          // solicitor is assigned here
          await ctx.testingEndpointHelper.assignDefendantLegalRepToCase(ctx.caseId, c.claimType, [...ctx.defendantsGivenSolicitorByNoc]);
          if (!ctx.useApi()) {
            // The case page was opened before this solicitor was assigned to the case, so open it again now they can see it
            await ctx.pageHelper.gotoAndWaitForXui(ctx.caseUrl());
          }
        }
        await ctx.submitEvent(page, storageState, {
          api: () => new api.AcknowledgeClaim().acknowledge(c, ctx.caseId, 2, user),
          ui: () => new ui.AcknowledgeClaim(page).acknowledge(c.claimType, c.respondent1ResponseIntention, c.respondent2ResponseIntention, 2, c.defendantType),
          expectState: caseStates.AWAITING_RESPONDENT_ACKNOWLEDGEMENT,
        });
      },
    },

    // Each defendant's solicitor adds a litigation friend for the defendant they represent (one for both defendants
    // where they have the same solicitor). Only run with DEFENDANT_LITIGATION_FRIEND=Yes.
    ...addDefendantLitigationFriendSteps(),

    // Each defendant's solicitor informs the court of an agreed 28 day extension to respond, which moves their response
    // deadline back. Only run with INFORM_AGREED_EXTENSION=Yes.
    ...informAgreedExtensionSteps(),

    {
      name: 'RESPOND_TO_CLAIM_DEFENDANT1',
      title: 'Defendant 1 Solicitor responds to claim.',
      user: 'respondent1Solicitor',
      needs: [c.facts.notOfflineAtNotify, c.facts.defendant1HasSolicitor],
      run: async ({ page, storageState, user }) => {
        await ctx.submitEvent(page, storageState, {
          api: () => new api.RespondToClaim().submit(c, ctx.caseId, 1, dqAnswers, user),
          ui: () => new ui.RespondToClaim(page).submit(
            c.claimType,
            c.track,
            c.typeOfClaim as unspecClaimTypes,
            c.respondent1Response,
            c.respondent2Response,
            1,
            ...directionsQuestionnaireAnswers(),
          ),
        });
        // civil-service sets the state straight away but rejects the next event until the response's business
        // process (documents, notifications) has finished, which can take minutes on a busy environment
        await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'DEFENDANT_RESPONSE');
        await ctx.assertCaseState(expectedStateAfterResponse(1));
      },
    },

    {
      name: 'RESPOND_TO_CLAIM_DEFENDANT2',
      title: 'Defendant 2 Solicitor responds to claim.',
      user: 'respondent2Solicitor',
      needs: [c.facts.notOfflineAtNotify, c.facts.defendant2HasOwnSolicitor],
      run: async ({ page, storageState, user }) => {
        if (c.claimType === claimTypes.ONE_VS_TWO_LIP_LR) {
          // civil-service only treats the defendants as having separate solicitors when both are represented, so in a
          // 1v2LIPLR claim it handles Defendant 2's solicitor as Defendant 1's. The response is saved against Defendant 1
          // (respondent1ResponseDate) and multiPartyResponseTypeFlags is NOT_FULL_DEFENCE even for a full defence. As a
          // result the directions questionnaire pages are not displayed to Defendant 2's solicitor. Until civil-service
          // supports this, the response is skipped.
          console.warn(
            'WARNING: Defendant 2 Solicitor response NOT undertaken for 1v2LIPLR. civil-service records the response '
            + 'against Defendant 1 and skips the directions questionnaire and defence upload, so it cannot be tested.',
          );
          test.skip(true, '1v2LIPLR: civil-service does not support a response from Defendant 2 Solicitor when Defendant 1 is a LiP');
        }
        await ctx.submitEvent(page, storageState, {
          api: () => new api.RespondToClaim().submit(c, ctx.caseId, 2, dqAnswers, user),
          ui: () => new ui.RespondToClaim(page).submit(
            c.claimType,
            c.track,
            c.typeOfClaim as unspecClaimTypes,
            c.respondent1Response,
            c.respondent2Response,
            2,
            ...directionsQuestionnaireAnswers(),
          ),
          businessProcess: 'DEFENDANT_RESPONSE',
          expectState: expectedStateAfterResponse(2),
        });
      },
    },

    {
      name: 'RESPOND_TO_DEFENCE',
      title: 'Claimant Solicitor responds to defence.',
      user: 'claimantSolicitor',
      needs: [c.facts.claimantResponds],
      run: async ({ page, storageState, user }) => {
        await ctx.submitEvent(page, storageState, {
          api: () => new api.RespondToDefence().submit(c, ctx.caseId, dqAnswers, user),
          ui: () => new ui.RespondToDefence(page).submit(
            c.claimType,
            c.track,
            c.typeOfClaim as unspecClaimTypes,
            c.claimantProceed1,
            c.claimantProceed2,
            ...directionsQuestionnaireAnswers(),
          ),
          expectState: c.stateAfterClaimantResponse,
        });
      },
    },

    // The hearing centre admin adds the CASE_FLAGS flags once the claimant has responded, then makes the first inactive
    ...caseFlagSteps(c, ctx),

    // The admin and solicitors update contact details once the claimant has responded (MANAGE_CONTACT_INFORMATION)
    ...manageContactInformationSteps(c, ctx),

    // Each solicitor adds unavailable dates for their parties, then the hearing centre admin adds some for a defendant.
    // Only run with ADD_UNAVAILABLE_DATES=Yes.
    ...addUnavailableDatesSteps(c, ctx, c.defendant1SolicitorClaimTypes.includes(c.claimType), caseStates.JUDICIAL_REFERRAL, [
      ...c.facts.claimantResponds,
      [c.stateAfterClaimantResponse !== caseStates.JUDICIAL_REFERRAL, 'Skipping as the claimant did not proceed against every defendant, so the claim went offline'],
    ]),

    stayCase(c, ctx),

    manageStayRequestUpdate(c, ctx),

    // The hearing centre admin sends a district judge a message and the judge replies, while the case is stayed with
    // STAY_CASE=Yes, otherwise in JUDICIAL_REFERRAL. Only run with SEND_AND_REPLY=Yes.
    ...sendAndReplySteps(c, ctx, c.stayCase === yesNo.YES ? caseStates.CASE_STAYED : caseStates.JUDICIAL_REFERRAL, c.facts.reachesCaseProgression),

    liftStay(c, ctx),

    // The judge decides the claim is not suitable for a Standard Direction Order, and with CHANGE_LOCATION the hearing
    // centre admin transfers it to another hearing centre, whose directions task CREATE_SDO then uses (NOT_SUITABLE_SDO,
    // see notSuitableSdoSteps.ts)
    ...notSuitableSdoSteps(c.notSuitableSdo, ctx, sdoUser(c), sdoTask(c)),

    createSdo(c, ctx),

    makeDirectionsOrder(c, ctx),

    // Each solicitor uploads evidence once the Standard Direction Order has moved the claim to CASE_PROGRESSION
    ...uploadEvidenceSteps(),

    createHearingNotice(c, ctx),

    payHearingFee(c, ctx),

    trialReadyCheck(c, ctx),

    // Each solicitor confirms the case is ready for trial. This is only offered on the fast track and must be done more
    // than 3 weeks before the hearing, which the hearing notice lists about 8 weeks ahead. The claim stays in
    // PREPARE_FOR_HEARING_CONDUCT_HEARING.
    ...confirmTrialArrangementsSteps(),

    createTrialBundle(c, ctx),

    moveToDecisionOutcome(c, ctx),

    makeFinalOrder(c, ctx),

    confirmOrderReview(c, ctx),
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
      return caseStates.CASE_PROGRESSION;
    }
    if (c.notSuitableSdo === NotSuitableSdo.OTHER_REASONS) {
      return caseStates.PROCEEDS_IN_HERITAGE_SYSTEM;
    }
    const orderReview = steps.find((step) => step.name === 'CONFIRM_ORDER_REVIEW');
    if (!orderReview?.skipIf?.some(([skipped]) => skipped)) {
      return caseStates.All_FINAL_ORDERS_ISSUED;
    }
    return undefined;
  }


  // Once default judgment is asked for, the defendants' steps and everything after them do not apply, apart from
  // settling or discontinuing the claim
  const lastDefaultJudgmentStep = steps.map((step) => step.name).lastIndexOf('STANDARD_DIRECTION_ORDER_DJ');
  steps.slice(lastDefaultJudgmentStep + 1)
    .filter((step) => !step.closesClaim)
    .forEach((step) => {
      step.skipIf = [...(step.skipIf ?? []), ...c.facts.withoutDefaultJudgment];
    });

  withNotSuitableSdo(steps, c.notSuitableSdo);
  withDisputeResolutionHearing(steps, c);

  return steps;

  function addDefendantLitigationFriendSteps(): JourneyStep[] {
    const solicitors: Array<{ defendantNumber: 1 | 2; user: SessionUserKey; noSolicitor: [boolean, string] }> = [
      {
        defendantNumber: 1,
        user: 'respondent1Solicitor',
        noSolicitor: [!c.defendant1SolicitorClaimTypes.includes(c.claimType), 'Skipping as first defendant is a LiP'],
      },
      {
        defendantNumber: 2,
        user: 'respondent2Solicitor',
        noSolicitor: [
          c.claimType !== claimTypes.ONE_VS_TWO_DIFF_SOL,
          c.claimType === claimTypes.ONE_VS_TWO_SAME_SOL
            ? "Skipping as Defendant 1's solicitor added the litigation friend for both defendants"
            : 'Skipping as Defendant 2 has no separate solicitor',
        ],
      },
    ];
    return solicitors.map((solicitor) => ({
      name: `ADD_DEFENDANT_LITIGATION_FRIEND_DEFENDANT${solicitor.defendantNumber}`,
      title: `Defendant ${solicitor.defendantNumber} Solicitor adds a litigation friend.`,
      user: solicitor.user,
      needs: [c.facts.notOfflineAtNotify],
      skipIf: [
        solicitor.noSolicitor,
        [c.defendantLitigationFriend !== yesNo.YES, 'Adding a defendant litigation friend is switched off (set DEFENDANT_LITIGATION_FRIEND=Yes to run it)'],
      ],
      run: async ({ page, storageState, user }) => {
        const forWhom = litigationFriendFor(c.claimType, solicitor.defendantNumber);
        await ctx.submitEvent(page, storageState, {
          api: () => new api.AddDefendantLitigationFriend().submit(ctx.caseId, forWhom, user),
          ui: () => new ui.AddDefendantLitigationFriend(page).submit(forWhom),
          businessProcess: 'ADD_DEFENDANT_LITIGATION_FRIEND',
        });
        const saved = await ctx.testingEndpointHelper.getCaseData(ctx.caseId);
        expect(saved, `The litigation friend for ${forWhom} was not saved as it was entered`).toMatchObject(expectedLitigationFriendData(forWhom));
        await ctx.assertCaseState(caseStates.AWAITING_RESPONDENT_ACKNOWLEDGEMENT);
      },
    }));
  }

  function informAgreedExtensionSteps(): JourneyStep[] {
    const solicitors: Array<{ defendantNumber: number; user: SessionUserKey; noSolicitor: [boolean, string] }> = [
      {
        defendantNumber: 1,
        user: 'respondent1Solicitor',
        noSolicitor: [!c.defendant1SolicitorClaimTypes.includes(c.claimType), 'Skipping as first defendant is a LiP'],
      },
      {
        defendantNumber: 2,
        user: 'respondent2Solicitor',
        noSolicitor: [c.claimType !== claimTypes.ONE_VS_TWO_DIFF_SOL, 'Skipping as Defendant 2 has no separate solicitor'],
      },
    ];
    return solicitors.map((solicitor) => ({
      name: `INFORM_AGREED_EXTENSION_DEFENDANT${solicitor.defendantNumber}`,
      title: `Defendant ${solicitor.defendantNumber} Solicitor informs the court of an agreed extension.`,
      user: solicitor.user,
      needs: [c.facts.notOfflineAtNotify],
      skipIf: [
        solicitor.noSolicitor,
        [c.informAgreedExtension !== yesNo.YES, 'Informing of an agreed extension is switched off (set INFORM_AGREED_EXTENSION=Yes to run it)'],
      ],
      run: async ({ page, storageState, user }) => {
        const deadlineBefore = await ctx.testingEndpointHelper.getResponseDeadline(ctx.caseId, solicitor.defendantNumber);
        await ctx.submitEvent(page, storageState, {
          api: () => new api.InformAgreedExtensionDate().submit(ctx.caseId, solicitor.defendantNumber, user),
          ui: () => new ui.InformAgreedExtensionDate(page).submit(),
          businessProcess: 'INFORM_AGREED_EXTENSION_DATE',
        });
        const deadlineAfter = await ctx.testingEndpointHelper.getResponseDeadline(ctx.caseId, solicitor.defendantNumber);
        console.log(`Defendant ${solicitor.defendantNumber} response deadline moved from ${deadlineBefore} to ${deadlineAfter}`);
        expect(
          new Date(deadlineAfter).getTime(),
          `Defendant ${solicitor.defendantNumber}'s response deadline was not extended (before ${deadlineBefore}, after ${deadlineAfter})`,
        ).toBeGreaterThan(new Date(deadlineBefore).getTime());
        await ctx.assertCaseState(caseStates.AWAITING_RESPONDENT_ACKNOWLEDGEMENT);
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
          api: () => new api.UploadEvidence().submit(ctx.caseId, user, c.track),
          ui: () => new ui.UploadEvidence(page).submit(c.track),
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
        fastTrackOnly('Skipping as trial arrangements are only confirmed on the fast track'),
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
