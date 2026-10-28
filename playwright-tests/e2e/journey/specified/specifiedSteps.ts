import { expect } from '@playwright/test';
import { envUrl } from '../../../civilConfig.ts';
import { CreateSpecifiedCase } from '../../flows/createSpecifiedCase.ts';
import { CreateClaimSpec } from '../../flows/events/api/CreateClaimSpec.ts';
import { InformAgreedExtensionDateSpec } from '../../flows/events/ui/InformAgreedExtensionDateSpec.ts';
import { InformAgreedExtensionDateSpec as ApiInformAgreedExtensionDateSpec } from '../../flows/events/api/InformAgreedExtensionDateSpec.ts';
import { RespondToClaimSpec } from '../../flows/events/ui/RespondToClaimSpec.ts';
import { RespondToClaimSpec as ApiRespondToClaimSpec } from '../../flows/events/api/RespondToClaimSpec.ts';
import { RespondToDefenceSpec } from '../../flows/events/ui/RespondToDefenceSpec.ts';
import { RespondToDefenceSpec as ApiRespondToDefenceSpec } from '../../flows/events/api/RespondToDefenceSpec.ts';
import { CreateSdo } from '../../flows/events/ui/CreateSdo.ts';
import { CreateSdo as ApiCreateSdo } from '../../flows/events/api/CreateSdo.ts';
import { AddCaseNote } from '../../flows/events/ui/AddCaseNote.ts';
import { AddCaseNote as ApiAddCaseNote } from '../../flows/events/api/AddCaseNote.ts';
import { StayCase } from '../../flows/events/ui/StayCase.ts';
import { StayCase as ApiStayCase } from '../../flows/events/api/StayCase.ts';
import { MediationSuccessful } from '../../flows/events/ui/MediationSuccessful.ts';
import { MediationSuccessful as ApiMediationSuccessful } from '../../flows/events/api/MediationSuccessful.ts';
import { MediationUnsuccessful } from '../../flows/events/ui/MediationUnsuccessful.ts';
import { MediationUnsuccessful as ApiMediationUnsuccessful } from '../../flows/events/api/MediationUnsuccessful.ts';
import { ManageStay } from '../../flows/events/ui/ManageStay.ts';
import { ManageStay as ApiManageStay } from '../../flows/events/api/ManageStay.ts';
import { CreateCaseFlag } from '../../flows/events/ui/CreateCaseFlag.ts';
import { CreateCaseFlag as ApiCreateCaseFlag } from '../../flows/events/api/CreateCaseFlag.ts';
import { ManageCaseFlag } from '../../flows/events/ui/ManageCaseFlag.ts';
import { ManageCaseFlag as ApiManageCaseFlag } from '../../flows/events/api/ManageCaseFlag.ts';
import { caseFlagType } from '../../flows/caseFlags/caseFlagTypes.ts';
import { holderFlagsField, holderLabel } from '../../flows/caseFlags/caseFlagHolders.ts';
import { CaseFlagSpec, caseFlagSpecs } from '../../flows/caseFlags/caseFlagSpecs.ts';
import { ManageContactInformation } from '../../flows/events/ui/ManageContactInformation.ts';
import { ManageContactInformation as ApiManageContactInformation } from '../../flows/events/api/ManageContactInformation.ts';
import {
  mciChange, mciChangeNotSavedReason, mciSessionUser, mciSpecs, mciStartsBusinessProcess, mciUserLabel,
} from '../../flows/events/shared_api_ui/manageContactInformationSpecs.ts';
import { MakeDirectionsOrder } from '../../flows/events/ui/MakeDirectionsOrder.ts';
import { MakeDirectionsOrder as ApiMakeDirectionsOrder } from '../../flows/events/api/MakeDirectionsOrder.ts';
import { UploadEvidence } from '../../flows/events/ui/UploadEvidence.ts';
import { UploadEvidence as ApiUploadEvidence } from '../../flows/events/api/UploadEvidence.ts';
import { CreateHearingNotice } from '../../flows/events/ui/CreateHearingNotice.ts';
import { CreateHearingNotice as ApiCreateHearingNotice } from '../../flows/events/api/CreateHearingNotice.ts';
import { ConfirmTrialArrangements } from '../../flows/events/ui/ConfirmTrialArrangements.ts';
import { ConfirmTrialArrangements as ApiConfirmTrialArrangements } from '../../flows/events/api/ConfirmTrialArrangements.ts';
import { MakeFinalOrder } from '../../flows/events/ui/MakeFinalOrder.ts';
import { MakeFinalOrder as ApiMakeFinalOrder } from '../../flows/events/api/MakeFinalOrder.ts';
import { ConfirmOrderReview } from '../../flows/events/ui/ConfirmOrderReview.ts';
import { ConfirmOrderReview as ApiConfirmOrderReview } from '../../flows/events/api/ConfirmOrderReview.ts';
import { WaTaskHelper } from '../../../helpers/WaTaskHelper.ts';
import claimTrack from '../../../enums/track.ts';
import yesNo from '../../../enums/yesNo.ts';
import claimTypes from '../../../enums/claim-types.ts';
import caseStates from '../../../enums/caseStates.ts';
import PaymentMethod from '../../../enums/paymentMethod.ts';
import { CaseUserRegistry } from '../../../helpers/CaseUserRegistry.ts';
import { SessionUserKey } from '../../../helpers/SessionHelper.ts';
import { workingDayAfter } from '../../../helpers/WorkingDayHelper.ts';
import { JourneyContext, JourneyStep } from '../journeyRunner.ts';
import { SpecifiedConfig } from './specifiedConfig.ts';

// The steps of the specified journey, in the order they run. Each step that does not apply to the journey's claim
// (see skipIf) is skipped.
export function specifiedSteps(c: SpecifiedConfig, ctx: JourneyContext): JourneyStep[] {
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

  return [
    {
      name: 'CREATE_CLAIM',
      title: 'Claimant Solicitor creates ' + c.claimType + ' specified claim ',
      user: 'claimantSolicitor',
      run: async ({ page, storageState }) => {
        if (ctx.useApi()) {
          // One CCD API submit instead of the CREATE_CLAIM_SPEC pages (API_UNTIL), then the claim fee is paid through
          // the payment service, as the UI's "Pay now" does
          const createClaim = new CreateClaimSpec();
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

          await createCase.setAirlineClaim(c.airlineClaim);
          await createCase.setDescriptionOfClaim();
          await createCase.setTimeline(c.timeline);
          await createCase.setEvidence();
          await createCase.setClaimAmount(c.track);
          await createCase.setInterest(c.interestRequired, c.interestType, c.interestRate);
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
        const caseNote = new AddCaseNote(page);
        if (ctx.useApi()) {
          await new ApiAddCaseNote().submit(ctx.caseId, note);
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

    // A specified claim has no Notify claim or Notify claim details: once it is issued it waits for the defendants'
    // responses. The defendants' solicitors are given access to it here, as the claimant's solicitor, so that their own
    // steps can open the case.
    {
      name: 'ASSIGN_DEFENDANT_SOLICITORS',
      title: 'Defendant solicitors are assigned to the claim.',
      user: 'claimantSolicitor',
      skipIf: [[!c.claimShape.defendants.some((defendant) => defendant.solicitor !== 'none'), 'Skipping as no defendant has a solicitor']],
      run: async () => {
        await ctx.testingEndpointHelper.assignDefendantLegalRepToCase(ctx.caseId, c.claimType);
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
      skipIf: [
        noLitigantInPerson,
        [!c.claimantResponds, 'Skipping as the claim went offline once the defendants responded'],
      ],
      run: async ({ page, storageState }) => {
        if (ctx.useApi()) {
          await new ApiRespondToDefenceSpec().submit(c, ctx.caseId);
        } else {
          await ctx.runEvent(page, storageState, async () => {
            await new RespondToDefenceSpec(page).submit(c.claimType, c.claimantResponse);
          });
        }
        await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, c.claimantOutcome.businessProcess);
        await ctx.assertCaseState(c.claimantOutcome.state);
      },
    },

    ...caseFlagSteps(),
    ...manageContactInformationSteps(),

    // The hearing centre admin stays the case once the claimant's response has taken it to JUDICIAL_REFERRAL, asks the
    // parties for an update and then lifts the stay. Lifting it takes the claim back to JUDICIAL_REFERRAL, so the
    // journey carries on to the judge's order. Only run with STAY_CASE=Yes.
    {
      name: 'STAY_CASE',
      title: 'Hearing Centre Admin stays the case.',
      user: 'hearingCentreAdmin',
      skipIf: noStay,
      run: async ({ page, storageState }) => {
        if (ctx.useApi()) {
          await new ApiStayCase().submit(ctx.caseId);
        } else {
          await ctx.runEvent(page, storageState, async () => {
            await new StayCase(page).submit();
          });
        }
        await ctx.assertCaseState(caseStates.CASE_STAYED);
      },
    },

    {
      name: 'MANAGE_STAY_REQUEST_UPDATE',
      title: 'Hearing Centre Admin asks the parties for an update on the stay.',
      user: 'hearingCentreAdmin',
      skipIf: noStay,
      run: async ({ page, storageState }) => {
        if (ctx.useApi()) {
          await new ApiManageStay().requestUpdate(ctx.caseId);
        } else {
          await ctx.runEvent(page, storageState, async () => {
            await new ManageStay(page).requestUpdate();
          });
        }
        await ctx.assertCaseState(caseStates.CASE_STAYED);
      },
    },

    {
      name: 'LIFT_STAY',
      title: 'Hearing Centre Admin lifts the stay.',
      user: 'hearingCentreAdmin',
      skipIf: noStay,
      run: async ({ page, storageState }) => {
        if (ctx.useApi()) {
          await new ApiManageStay().liftStay(ctx.caseId);
        } else {
          await ctx.runEvent(page, storageState, async () => {
            await new ManageStay(page).liftStay();
          });
        }
        await ctx.assertCaseState(caseStates.JUDICIAL_REFERRAL);
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
        if (ctx.useApi()) {
          await new ApiMediationSuccessful().submit(ctx.caseId);
        } else {
          await ctx.runEvent(page, storageState, async () => {
            await new MediationSuccessful(page).submit();
          });
        }
        await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'MEDIATION_SUCCESSFUL');
        await ctx.assertCaseState(caseStates.CASE_STAYED);
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
        if (ctx.useApi()) {
          await new ApiMediationUnsuccessful().submit(ctx.caseId);
        } else {
          await ctx.runEvent(page, storageState, async () => {
            await new MediationUnsuccessful(page).submit();
          });
        }
        await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'MEDIATION_UNSUCCESSFUL');
        await ctx.assertCaseState(caseStates.JUDICIAL_REFERRAL);
      },
    },

    // The Standard Direction Order (fast track and small claims) or a directions order (intermediate and multi track),
    // once the claim is in JUDICIAL_REFERRAL, which moves it to CASE_PROGRESSION. A small claim gets there after
    // unsuccessful mediation, and work allocation gives its directions task to a legal adviser rather than a judge.
    {
      name: 'CREATE_SDO',
      title: `${c.track === claimTrack.SMALL ? 'Legal Adviser' : 'Judge'} makes a Standard Direction Order.`,
      user: c.track === claimTrack.SMALL ? 'legalAdviser' : 'judge',
      skipIf: [
        noLitigantInPerson,
        [!c.claimantResponds || ![caseStates.JUDICIAL_REFERRAL, caseStates.IN_MEDIATION].includes(c.claimantOutcome.state), 'Skipping as the claimant\'s response did not take the claim to JUDICIAL_REFERRAL or mediation'],
        settledInMediation,
        [c.track !== claimTrack.FAST && c.track !== claimTrack.SMALL, 'Skipping as the intermediate and multi tracks get a directions order instead'],
      ],
      run: async ({ page, storageState }) => {
        const user = c.track === claimTrack.SMALL ? 'legalAdviser' : 'judge';
        await ctx.runEvent(page, storageState, async () => {
          // Where work allocation is switched on, the directions task for the track is needed to make the order. It is
          // claimed through the API version too, as the UI would.
          await new WaTaskHelper(page).assignTaskForEvent(ctx.caseId, 'CREATE_SDO', c.track === claimTrack.SMALL ? 'LegalAdvisorSmallClaimsTrackDirections' : 'FastTrackDirections');
          if (!ctx.useApi()) {
            await new CreateSdo(page).submit(ctx.caseId, c.track);
          }
        });
        if (ctx.useApi()) {
          await new ApiCreateSdo().submit(ctx.caseId, user, c.track);
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
            await new MakeDirectionsOrder(page).submit();
          }
        });
        if (ctx.useApi()) {
          await new ApiMakeDirectionsOrder().submit(ctx.caseId);
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
      title: 'Hearing Centre Admin creates a hearing notice.',
      user: 'hearingCentreAdmin',
      skipIf: noCaseProgression,
      run: async ({ page, storageState }) => {
        if (ctx.useApi()) {
          await new ApiCreateHearingNotice().submit(ctx.caseId, c.track);
        } else {
          await ctx.runEvent(page, storageState, async () => {
            await new CreateHearingNotice(page).submit(c.track);
          });
        }
        await ctx.assertCaseState(caseStates.HEARING_READINESS);
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
        if (ctx.useApi()) {
          await new ApiMakeFinalOrder().submit(ctx.caseId, c.finalOrder);
        } else {
          await ctx.runEvent(page, storageState, async () => {
            await new MakeFinalOrder(page).submit(c.finalOrder);
          });
        }
        await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'GENERATE_ORDER_NOTIFICATION');
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
        if (ctx.useApi()) {
          await new ApiConfirmOrderReview().submit(ctx.caseId);
        } else {
          await ctx.runEvent(page, storageState, async () => {
            await new ConfirmOrderReview(page).submit();
          });
        }
        await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'CONFIRM_ORDER_REVIEW_FINAL_ORDER');
        await ctx.assertCaseState(caseStates.All_FINAL_ORDERS_ISSUED);
      },
    },
  ];

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
      run: async ({ page, storageState }) => {
        if (ctx.useApi()) {
          await new ApiRespondToClaimSpec().submit(c, ctx.caseId, solicitor.defendantNumber);
        } else {
          await ctx.runEvent(page, storageState, async () => {
            await new RespondToClaimSpec(page).submit(solicitor.defendantNumber, {
              claimType: c.claimType,
              timeline: c.timeline,
              respondent1Response: c.respondent1Response,
              respondent2Response: c.respondent2Response,
              paymentRoute: c.admissionPaymentRoute,
              respondent1Employment: c.respondent1Employment,
              respondent2Employment: c.respondent2Employment,
            });
          });
        }
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
      run: async ({ page, storageState }) => {
        const deadlineBefore = await ctx.testingEndpointHelper.getResponseDeadline(ctx.caseId, solicitor.defendantNumber);
        // civil-service accepts a working day after the current deadline and no more than 28 days after it
        const extensionDate = await workingDayAfter(deadlineBefore, 14);
        if (ctx.useApi()) {
          await new ApiInformAgreedExtensionDateSpec().submit(ctx.caseId, solicitor.defendantNumber, extensionDate);
        } else {
          await ctx.runEvent(page, storageState, async () => {
            await new InformAgreedExtensionDateSpec(page).submit(solicitor.defendantNumber, extensionDate);
          });
        }
        await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'INFORM_AGREED_EXTENSION_DATE_SPEC');
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
      run: async ({ page, storageState }) => {
        if (ctx.useApi()) {
          await new ApiUploadEvidence().submit(ctx.caseId, solicitor.user, c.track);
        } else {
          await ctx.runEvent(page, storageState, async () => {
            await new UploadEvidence(page).submit(c.track);
          });
        }
        await ctx.assertCaseState(caseStates.CASE_PROGRESSION);
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
        if (ctx.useApi()) {
          await new ApiCreateCaseFlag().submit(ctx.caseId, flag.holder, flagType, { ...flag, comment: comment(index, flag) });
        } else {
          await ctx.runEvent(page, storageState, async () => {
            await new CreateCaseFlag(page).submit(holderLabel(c, flag.holder), flagType, { ...flag, comment: comment(index, flag) });
          });
        }
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
        if (ctx.useApi()) {
          await new ApiManageCaseFlag().makeInactive(ctx.caseId, first.holder, first.code, reason);
        } else {
          await ctx.runEvent(page, storageState, async () => {
            await new ManageCaseFlag(page).makeInactive(holderLabel(c, first.holder), first.otherDescription ?? flagType.name, reason);
          });
        }
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
      run: async ({ page, storageState }) => {
        const change = mciChange(index, spec);
        if (ctx.useApi()) {
          await new ApiManageContactInformation().submit(ctx.caseId, spec, change);
        } else {
          await ctx.runEvent(page, storageState, async () => {
            await new ManageContactInformation(page).submit(spec, change);
          });
        }
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
      run: async ({ page, storageState }) => {
        if (ctx.useApi()) {
          await new ApiConfirmTrialArrangements().submit(ctx.caseId, solicitor.user);
        } else {
          await ctx.runEvent(page, storageState, async () => {
            await new ConfirmTrialArrangements(page).submit();
          });
        }
        await ctx.assertCaseState(caseStates.PREPARE_FOR_HEARING_CONDUCT_HEARING);
      },
    }));
  }
}
