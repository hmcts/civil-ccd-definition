import { expect, test } from '@playwright/test';
import { envUrl } from '../../../civilConfig.ts';
import { CreateUnspecifiedCase } from '../../flows/createUnspecifiedCase.ts';
import { CreateClaim } from '../../flows/events/api/CreateClaim.ts';
import { NotifyClaim as ApiNotifyClaim } from '../../flows/events/api/NotifyClaim.ts';
import { NotifyClaimDetails as ApiNotifyClaimDetails } from '../../flows/events/api/NotifyClaimDetails.ts';
import { AcknowledgeClaim as ApiAcknowledgeClaim } from '../../flows/events/api/AcknowledgeClaim.ts';
import { RespondToClaim as ApiRespondToClaim } from '../../flows/events/api/RespondToClaim.ts';
import { RespondToDefence as ApiRespondToDefence } from '../../flows/events/api/RespondToDefence.ts';
import { DirectionsQuestionnaireAnswers } from '../../flows/events/ui/DirectionsQuestionnaire.ts';
import yesNo from '../../../enums/yesNo.ts';
import claimTypes from '../../../enums/claim-types.ts';
import unspecClaimTypes from '../../../enums/unspecClaimTypes.ts';
import claimTrack from '../../../enums/track.ts';
import caseStates from '../../../enums/caseStates.ts';
import { PaymentPage } from '../../page-objects/pages/payment_page.ts';
import { NotifyClaim } from '../../flows/events/ui/NotifyClaim.ts';
import { NotifyClaimDetails } from '../../flows/events/ui/NotifyClaimDetails.ts';
import { AcknowledgeClaim } from '../../flows/events/ui/AcknowledgeClaim.ts';
import { RespondToClaim } from '../../flows/events/ui/RespondToClaim.ts';
import { RespondToDefence } from '../../flows/events/ui/RespondToDefence.ts';
import { CreateSdo } from '../../flows/events/ui/CreateSdo.ts';
import { UploadEvidence } from '../../flows/events/ui/UploadEvidence.ts';
import { CreateHearingNotice } from '../../flows/events/ui/CreateHearingNotice.ts';
import { ConfirmTrialArrangements } from '../../flows/events/ui/ConfirmTrialArrangements.ts';
import { MakeFinalOrder } from '../../flows/events/ui/MakeFinalOrder.ts';
import { ConfirmOrderReview } from '../../flows/events/ui/ConfirmOrderReview.ts';
import { AddCaseNote } from '../../flows/events/ui/AddCaseNote.ts';
import { StayCase } from '../../flows/events/ui/StayCase.ts';
import { ManageStay } from '../../flows/events/ui/ManageStay.ts';
import { InformAgreedExtensionDate } from '../../flows/events/ui/InformAgreedExtensionDate.ts';
import { WaTaskHelper } from '../../../helpers/WaTaskHelper.ts';
import { CaseUserRegistry } from '../../../helpers/CaseUserRegistry.ts';
import { CreateCaseFlag } from '../../flows/events/ui/CreateCaseFlag.ts';
import { ManageCaseFlag } from '../../flows/events/ui/ManageCaseFlag.ts';
import { caseFlagType } from '../../flows/caseFlags/caseFlagTypes.ts';
import { holderFlagsField, holderLabel } from '../../flows/caseFlags/caseFlagHolders.ts';
import { CaseFlagSpec, caseFlagSpecs } from '../../flows/caseFlags/caseFlagSpecs.ts';
import { JourneyContext, JourneyStep } from '../journeyRunner.ts';
import { SessionUserKey } from '../../../helpers/SessionHelper.ts';
import { UnspecifiedConfig } from './unspecifiedConfig.ts';

// The steps of the unspecified journey, from creating the claim to the final order, in the order they run. Each step
// that does not apply to the journey's claim (see skipIf) is skipped.
export function unspecifiedSteps(c: UnspecifiedConfig, ctx: JourneyContext): JourneyStep[] {
  // Tracks which defendants have responded, so the expected state is right whichever responds first in claims where
  // they respond separately
  const defendantsResponded = new Set<number>();
  function expectedStateAfterResponse(defendantNumber: number): caseStates {
    defendantsResponded.add(defendantNumber);
    const waitingForOtherDefendant = c.separateResponseClaimTypes.includes(c.claimType) && defendantsResponded.size < 2;
    return waitingForOtherDefendant ? caseStates.AWAITING_RESPONDENT_ACKNOWLEDGEMENT : c.stateAfterAllResponses;
  }

  const offlineAtNotify: [boolean, string] = [c.claimOfflineAfterNotifyClaimDetails, 'Claim went offline at Notify claim / Notify claim details'];
  const noSeparateDefendant2Solicitor: [boolean, string] = [!c.defendant2OwnSolicitorClaimTypes.includes(c.claimType), 'Skipping test as Defendant 2 has no separate solicitor'];
  const noClaimantResponse: Array<[boolean, string]> = [
    offlineAtNotify,
    [!c.claimantResponseClaimTypes.includes(c.claimType), 'Skipping as the claim has a litigant in person'],
    [c.stateAfterAllResponses !== caseStates.AWAITING_APPLICANT_INTENTION, 'Skipping as not every defendant entered a full defence, so the claim went offline'],
  ];
  // The stay steps, which need the claim to reach JUDICIAL_REFERRAL and only run with STAY_CASE=Yes
  const noStay: Array<[boolean, string]> = [
    ...noClaimantResponse,
    [c.stateAfterClaimantResponse !== caseStates.JUDICIAL_REFERRAL, 'Skipping as the claimant did not proceed against every defendant, so the claim went offline'],
    [c.stayCase !== yesNo.YES, 'Staying the case is switched off (set STAY_CASE=Yes to run it)'],
  ];
  // The steps from the Standard Direction Order on, which need the claim to reach JUDICIAL_REFERRAL on the fast track
  const noCaseProgression = (fastTrackReason = 'Skipping as the Standard Direction Order is only coded for the fast track'): Array<[boolean, string]> => [
    ...noClaimantResponse,
    [c.stateAfterClaimantResponse !== caseStates.JUDICIAL_REFERRAL, 'Skipping as the claimant did not proceed against every defendant, so the claim went offline'],
    [c.track !== claimTrack.FAST, fastTrackReason],
  ];

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

  return [
    {
      name: 'CREATE_CLAIM',
      title: 'Claimant Solicitor creates ' + c.claimType + ' claim ',
      user: 'claimantSolicitor',
      run: async ({ page, storageState }) => {
        if (ctx.useApi()) {
          // One CCD API submit instead of the CREATE_CLAIM pages (API_UNTIL), then the claim fee is paid through the
          // payment service, as the UI's "Pay now" does
          const createClaim = new CreateClaim();
          ctx.caseId = await createClaim.create(c);
          CaseUserRegistry.record(ctx.caseId, 'claimantSolicitor');
          await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'CREATE_SERVICE_REQUEST_CLAIM');
          await ctx.assertCaseState(caseStates.PENDING_CASE_ISSUED);
          await createClaim.payClaimFee(ctx.caseId);
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
        const serviceRequestReference = await ctx.testingEndpointHelper.waitForServiceRequestReference(ctx.caseId, 'claimIssuedPBADetails');
        await new PaymentPage(page).makePayment('PBA', serviceRequestReference);
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
        const note = `Case note added by the unspecified journey at ${new Date().toISOString()}`;
        const caseNote = new AddCaseNote(page);
        await ctx.runEvent(page, storageState, async () => {
          await caseNote.submit(note);
        });
        await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'ADD_CASE_NOTE');
        await caseNote.verifyNoteShown(note);
        // A case note does not change the claim's state
        await ctx.assertCaseState(caseStates.CASE_ISSUED);
      },
    },

    {
      name: 'NOTIFY_CLAIM',
      title: 'Claimant Solicitor undertakes event: Notify claim ',
      user: 'claimantSolicitor',
      run: async ({ page, storageState }) => {
        if (ctx.useApi()) {
          await new ApiNotifyClaim().notify(c, ctx.caseId);
        } else {
          await ctx.runEvent(page, storageState, async () => {
            await new NotifyClaim(page).notify(c.claimType, c.defendantsToNotifyClaim);
          });
        }
        await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'NOTIFY_DEFENDANT_OF_CLAIM');
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
        if (ctx.useApi()) {
          await new ApiNotifyClaimDetails().notify(c, ctx.caseId);
        } else {
          await ctx.runEvent(page, storageState, async () => {
            await new NotifyClaimDetails(page).notify(c.claimType, c.defendantsToNotifyClaimDetails);
          });
        }
        await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'NOTIFY_DEFENDANT_OF_CLAIM_DETAILS');
        if (c.claimOfflineAfterNotifyClaimDetails) {
          await ctx.assertCaseState(caseStates.PROCEEDS_IN_HERITAGE_SYSTEM);
          console.log('Notify claim details -> claim went offline, later events are skipped');
        } else {
          await ctx.assertCaseState(caseStates.AWAITING_RESPONDENT_ACKNOWLEDGEMENT);
        }
      },
    },

    {
      name: 'ACKNOWLEDGE_CLAIM_DEFENDANT1',
      title: 'Defendant 1 Solicitor acknowledges claim.',
      user: 'respondent1Solicitor',
      skipIf: [offlineAtNotify, [!c.defendant1SolicitorClaimTypes.includes(c.claimType), 'Skipping as first defendant is a LiP']],
      run: async ({ page, storageState }) => {
        await ctx.testingEndpointHelper.assignDefendantLegalRepToCase(ctx.caseId, c.claimType);
        if (ctx.useApi()) {
          await new ApiAcknowledgeClaim().acknowledge(c, ctx.caseId, 1);
        } else {
          // The case page was opened before this solicitor was assigned to the case, so open it again now they can see it
          await ctx.pageHelper.gotoAndWaitForXui(ctx.caseUrl());
          await ctx.runEvent(page, storageState, async () => {
            await new AcknowledgeClaim(page).acknowledge(c.claimType, c.respondent1ResponseIntention, c.respondent2ResponseIntention, 1, c.defendantType);
          });
        }
        await ctx.assertCaseState(caseStates.AWAITING_RESPONDENT_ACKNOWLEDGEMENT);
      },
    },

    {
      name: 'ACKNOWLEDGE_CLAIM_DEFENDANT2',
      title: 'Defendant 2 Solicitor acknowledges claim.',
      user: 'respondent2Solicitor',
      skipIf: [offlineAtNotify, noSeparateDefendant2Solicitor],
      run: async ({ page, storageState }) => {
        if (c.claimType === claimTypes.ONE_VS_TWO_LIP_LR) {
          // Defendant 1's acknowledgement is skipped for this claim type (Defendant 1 is a LiP), so Defendant 2's
          // solicitor is assigned here
          await ctx.testingEndpointHelper.assignDefendantLegalRepToCase(ctx.caseId, c.claimType);
          if (!ctx.useApi()) {
            // The case page was opened before this solicitor was assigned to the case, so open it again now they can see it
            await ctx.pageHelper.gotoAndWaitForXui(ctx.caseUrl());
          }
        }
        if (ctx.useApi()) {
          await new ApiAcknowledgeClaim().acknowledge(c, ctx.caseId, 2);
        } else {
          await ctx.runEvent(page, storageState, async () => {
            await new AcknowledgeClaim(page).acknowledge(c.claimType, c.respondent1ResponseIntention, c.respondent2ResponseIntention, 2, c.defendantType);
          });
        }
        await ctx.assertCaseState(caseStates.AWAITING_RESPONDENT_ACKNOWLEDGEMENT);
      },
    },

    // Each defendant's solicitor informs the court of an agreed 28 day extension to respond, which moves their response
    // deadline back. Only run with INFORM_AGREED_EXTENSION=Yes.
    ...informAgreedExtensionSteps(),

    {
      name: 'RESPOND_TO_CLAIM_DEFENDANT1',
      title: 'Defendant 1 Solicitor responds to claim.',
      user: 'respondent1Solicitor',
      skipIf: [offlineAtNotify, [!c.defendant1SolicitorClaimTypes.includes(c.claimType), 'Skipping as first defendant is a LiP']],
      run: async ({ page, storageState }) => {
        if (ctx.useApi()) {
          await new ApiRespondToClaim().submit(c, ctx.caseId, 1, dqAnswers);
        } else {
          await ctx.runEvent(page, storageState, async () => {
            await new RespondToClaim(page).submit(
              c.claimType,
              c.track,
              c.typeOfClaim as unspecClaimTypes,
              c.respondent1Response,
              c.respondent2Response,
              1,
              ...directionsQuestionnaireAnswers(),
            );
          });
        }
        await ctx.assertCaseState(expectedStateAfterResponse(1));
      },
    },

    {
      name: 'RESPOND_TO_CLAIM_DEFENDANT2',
      title: 'Defendant 2 Solicitor responds to claim.',
      user: 'respondent2Solicitor',
      skipIf: [offlineAtNotify, noSeparateDefendant2Solicitor],
      run: async ({ page, storageState }) => {
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
        if (ctx.useApi()) {
          await new ApiRespondToClaim().submit(c, ctx.caseId, 2, dqAnswers);
        } else {
          await ctx.runEvent(page, storageState, async () => {
            await new RespondToClaim(page).submit(
              c.claimType,
              c.track,
              c.typeOfClaim as unspecClaimTypes,
              c.respondent1Response,
              c.respondent2Response,
              2,
              ...directionsQuestionnaireAnswers(),
            );
          });
        }
        await ctx.assertCaseState(expectedStateAfterResponse(2));
      },
    },

    {
      name: 'RESPOND_TO_DEFENCE',
      title: 'Claimant Solicitor responds to defence.',
      user: 'claimantSolicitor',
      skipIf: noClaimantResponse,
      run: async ({ page, storageState }) => {
        if (ctx.useApi()) {
          await new ApiRespondToDefence().submit(c, ctx.caseId, dqAnswers);
        } else {
          await ctx.runEvent(page, storageState, async () => {
            await new RespondToDefence(page).submit(
              c.claimType,
              c.track,
              c.typeOfClaim as unspecClaimTypes,
              c.claimantProceed1,
              c.claimantProceed2,
              ...directionsQuestionnaireAnswers(),
            );
          });
        }
        await ctx.assertCaseState(c.stateAfterClaimantResponse);
      },
    },

    // The hearing centre admin adds the CASE_FLAGS flags once the claimant has responded, then makes the first inactive
    ...caseFlagSteps(),

    // The hearing centre admin stays the case once the claimant has responded, asks the parties for an update and then
    // lifts the stay. Lifting it takes the claim back to JUDICIAL_REFERRAL, so the journey carries on to the Standard
    // Direction Order. Only run with STAY_CASE=Yes.
    {
      name: 'STAY_CASE',
      title: 'Hearing Centre Admin stays the case.',
      user: 'hearingCentreAdmin',
      skipIf: noStay,
      run: async ({ page, storageState }) => {
        await ctx.runEvent(page, storageState, async () => {
          await new StayCase(page).submit();
        });
        await ctx.assertCaseState(caseStates.CASE_STAYED);
      },
    },

    {
      name: 'MANAGE_STAY_REQUEST_UPDATE',
      title: 'Hearing Centre Admin asks the parties for an update on the stay.',
      user: 'hearingCentreAdmin',
      skipIf: noStay,
      run: async ({ page, storageState }) => {
        await ctx.runEvent(page, storageState, async () => {
          await new ManageStay(page).requestUpdate();
        });
        await ctx.assertCaseState(caseStates.CASE_STAYED);
      },
    },

    {
      name: 'LIFT_STAY',
      title: 'Hearing Centre Admin lifts the stay.',
      user: 'hearingCentreAdmin',
      skipIf: noStay,
      run: async ({ page, storageState }) => {
        await ctx.runEvent(page, storageState, async () => {
          await new ManageStay(page).liftStay();
        });
        await ctx.assertCaseState(caseStates.JUDICIAL_REFERRAL);
      },
    },

    {
      name: 'CREATE_SDO',
      title: 'Judge makes a Standard Direction Order.',
      user: 'judge',
      skipIf: noCaseProgression(),
      run: async ({ page, storageState }) => {
        await ctx.runEvent(page, storageState, async () => {
          // Where work allocation is switched on, the judge needs the directions task to make the order. Noise induced
          // hearing loss claims get their own task.
          await new WaTaskHelper(page).assignTaskForEvent(ctx.caseId, 'CREATE_SDO', c.sdoTaskType);
          await new CreateSdo(page).submit(ctx.caseId, c.track, c.noiseInducedHearingLoss);
        });
        await ctx.assertCaseState(caseStates.CASE_PROGRESSION);
      },
    },

    // Each solicitor uploads evidence once the Standard Direction Order has moved the claim to CASE_PROGRESSION
    ...uploadEvidenceSteps(),

    // The hearing centre admin lists the trial once the evidence is in. This is done in place of HMC returning a LISTED
    // hearing, and moves the claim to HEARING_READINESS for the hearing fee.
    {
      name: 'CREATE_HEARING_NOTICE',
      title: 'Hearing Centre Admin creates a hearing notice.',
      user: 'hearingCentreAdmin',
      skipIf: noCaseProgression(),
      run: async ({ page, storageState }) => {
        await ctx.runEvent(page, storageState, async () => {
          await new CreateHearingNotice(page).submit(c.track);
        });
        await ctx.assertCaseState(caseStates.HEARING_READINESS);
      },
    },

    // Listing the trial set a hearing fee, which the claimant's solicitor pays from the Service Request tab. Once it is
    // paid, HEARING_FEE_PAID moves the claim to PREPARE_FOR_HEARING_CONDUCT_HEARING.
    {
      name: 'PAY_HEARING_FEE',
      title: 'Claimant Solicitor pays the hearing fee.',
      user: 'claimantSolicitor',
      skipIf: noCaseProgression(),
      run: async ({ page, storageState }) => {
        // Paid in the hearing fee's row of the Service Request tab, which can also list the claim fee
        const serviceRequestReference = await ctx.testingEndpointHelper.waitForServiceRequestReference(ctx.caseId, 'hearingFeePBADetails');
        await ctx.runEvent(page, storageState, async () => {
          await new PaymentPage(page).makePayment('PBA', serviceRequestReference);
        });
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
    // hearing is coming up. The hearing notice lists it weeks away, so the test runs TRIAL_READY_CHECK itself. It records
    // the check on the case (trialReadyChecked) and leaves the claim in PREPARE_FOR_HEARING_CONDUCT_HEARING.
    {
      name: 'TRIAL_READY_CHECK',
      title: 'The parties are asked to confirm they are ready for trial.',
      user: 'claimantSolicitor',
      skipIf: noCaseProgression('Skipping as the trial ready check is only made on the fast track'),
      run: async () => {
        await ctx.testingEndpointHelper.triggerTrialReadyCheck(ctx.caseId);
        await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'TRIAL_READY_CHECK');
        const caseData = await ctx.testingEndpointHelper.getCaseData(ctx.caseId);
        expect(caseData.trialReadyChecked, 'The trial ready check was not recorded on the case').toBe('Yes');
        await ctx.assertCaseState(caseStates.PREPARE_FOR_HEARING_CONDUCT_HEARING);
      },
    },

    // Each solicitor confirms the case is ready for trial. This is only offered on the fast track and must be done more
    // than 3 weeks before the hearing, which the hearing notice lists about 8 weeks ahead. The claim stays in
    // PREPARE_FOR_HEARING_CONDUCT_HEARING.
    ...confirmTrialArrangementsSteps(),

    // The trial bundle, which a civil-service scheduler normally creates about 3 weeks before the hearing, is created
    // now. Once it has been stitched into one document it shows on the Bundles tab.
    {
      name: 'CREATE_TRIAL_BUNDLE',
      title: 'Trial bundle is created and shown to the Claimant Solicitor.',
      user: 'claimantSolicitor',
      skipIf: noCaseProgression(),
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
    // runs MOVE_TO_DECISION_OUTCOME, which moves the claim to DECISION_OUTCOME to wait for the judge's decision. The
    // hearing is weeks away, so the test runs that event itself.
    {
      name: 'MOVE_TO_DECISION_OUTCOME',
      title: 'Hearing date passes and the claim moves to decision outcome.',
      user: 'judge',
      skipIf: noCaseProgression(),
      run: async () => {
        await ctx.testingEndpointHelper.moveToDecisionOutcome(ctx.caseId);
        await ctx.assertCaseState(caseStates.DECISION_OUTCOME);
      },
    },

    // The judge's final order after the hearing, chosen with FINAL_ORDER. A free form order, or an assisted order with
    // no further hearing, does not change the claim's state. The order's notifications are sent by the
    // GENERATE_ORDER_NOTIFICATION business process.
    {
      name: 'MAKE_FINAL_ORDER',
      title: `Judge makes a final order (${c.finalOrder}).`,
      user: 'judge',
      skipIf: noCaseProgression(),
      run: async ({ page, storageState }) => {
        const ordersBefore = await ctx.testingEndpointHelper.countFinalOrders(ctx.caseId);
        await ctx.runEvent(page, storageState, async () => {
          await new MakeFinalOrder(page).submit(c.finalOrder);
        });
        await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'GENERATE_ORDER_NOTIFICATION');
        expect(await ctx.testingEndpointHelper.countFinalOrders(ctx.caseId), 'The final order was not added to the case').toBe(ordersBefore + 1);
        await ctx.assertCaseState(caseStates.DECISION_OUTCOME);
      },
    },

    // Court staff review the judge's order ("Order Made - Review case"). Confirming it is a final order, with no
    // obligation date and nothing left to do, closes the claim: it moves to All_FINAL_ORDERS_ISSUED and the
    // CONFIRM_ORDER_REVIEW_FINAL_ORDER business process runs.
    {
      name: 'CONFIRM_ORDER_REVIEW',
      title: 'Hearing Centre Admin confirms the order review.',
      user: 'hearingCentreAdmin',
      skipIf: noCaseProgression(),
      run: async ({ page, storageState }) => {
        await ctx.runEvent(page, storageState, async () => {
          await new ConfirmOrderReview(page).submit();
        });
        await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'CONFIRM_ORDER_REVIEW_FINAL_ORDER');
        await ctx.assertCaseState(caseStates.All_FINAL_ORDERS_ISSUED);
      },
    },
  ];

  // One step per CASE_FLAGS flag, each a Create case flags event, then a Manage case flags event that makes the first
  // one inactive. Flags court staff create are active whatever reference data's default status, which is for flags
  // requested from outside the court.
  function caseFlagSteps(): JourneyStep[] {
    const flags = caseFlagSpecs(c);
    const noCaseFlags: Array<[boolean, string]> = [
      ...noClaimantResponse,
      [c.stateAfterClaimantResponse !== caseStates.JUDICIAL_REFERRAL, 'Skipping as the claimant did not proceed against every defendant, so the claim went offline'],
      [flags.length === 0, 'Adding case flags is switched off (set CASE_FLAGS=representative, or a list such as CASE:CF0002,DEFENDANT_1:RA0012)'],
    ];
    const comment = (index: number, flag: CaseFlagSpec) => `Case flag ${index + 1} (${flag.code}) added by the unspecified journey`;

    const createSteps: JourneyStep[] = flags.map((flag, index) => ({
      name: `CREATE_CASE_FLAG_${index + 1}`,
      group: 'CREATE_CASE_FLAGS',
      title: `Hearing Centre Admin adds case flag ${flag.code} to ${flag.holder}.`,
      user: 'hearingCentreAdmin',
      skipIf: noCaseFlags,
      run: async ({ page, storageState }) => {
        const flagType = await caseFlagType(page, flag.holder === 'CASE' ? 'CASE' : 'PARTY', flag.code, flag.otherUnder);
        console.log(`Adding case flag ${flag.code} "${flagType.path.join(' > ')}" to ${holderLabel(c, flag.holder)}`);
        await ctx.runEvent(page, storageState, async () => {
          await new CreateCaseFlag(page).submit(holderLabel(c, flag.holder), flagType, { ...flag, comment: comment(index, flag) });
        });
        const { field, index: entry } = holderFlagsField(flag.holder);
        const saved = (await ctx.testingEndpointHelper.getCaseFlagDetails(ctx.caseId, field, entry)).find((detail) => detail.flagComment === comment(index, flag));
        expect(saved, `Case flag ${flag.code} was not saved on ${field}${entry === undefined ? '' : `[${entry}]`}`).toBeDefined();
        expect(saved.flagCode).toBe(flag.code);
        expect(saved.status).toBe('Active');
        if (flag.otherDescription) {
          expect(saved.otherDescription).toBe(flag.otherDescription);
        }
        await ctx.assertCaseState(caseStates.JUDICIAL_REFERRAL);
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
        const reason = 'Made inactive by the unspecified journey';
        await ctx.runEvent(page, storageState, async () => {
          await new ManageCaseFlag(page).makeInactive(holderLabel(c, first.holder), first.otherDescription ?? flagType.name, reason);
        });
        const { field, index: entry } = holderFlagsField(first.holder);
        const saved = (await ctx.testingEndpointHelper.getCaseFlagDetails(ctx.caseId, field, entry)).find((detail) => detail.flagCode === first.code);
        expect(saved?.status, `Case flag ${first.code} on ${field} was not made inactive`).toBe('Inactive');
        await ctx.assertCaseState(caseStates.JUDICIAL_REFERRAL);
      },
    };

    if (flags.length === 0) {
      // Without CASE_FLAGS the journey still lists one step, skipped with the reason, as it does for other switched-off steps
      return [{ name: 'CREATE_CASE_FLAGS', title: 'Hearing Centre Admin adds case flags.', user: 'hearingCentreAdmin', skipIf: noCaseFlags, run: async () => {} }];
    }
    return [...createSteps, manageStep];
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
      skipIf: [
        offlineAtNotify,
        solicitor.noSolicitor,
        [c.informAgreedExtension !== yesNo.YES, 'Informing of an agreed extension is switched off (set INFORM_AGREED_EXTENSION=Yes to run it)'],
      ],
      run: async ({ page, storageState }) => {
        const deadlineBefore = await ctx.testingEndpointHelper.getResponseDeadline(ctx.caseId, solicitor.defendantNumber);
        await ctx.runEvent(page, storageState, async () => {
          await new InformAgreedExtensionDate(page).submit();
        });
        await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'INFORM_AGREED_EXTENSION_DATE');
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
      skipIf: [
        ...noCaseProgression(),
        ['defendant2' in solicitor && c.claimType !== claimTypes.ONE_VS_TWO_DIFF_SOL, 'Skipping as Defendant 2 has no separate solicitor'],
      ],
      run: async ({ page, storageState }) => {
        await ctx.runEvent(page, storageState, async () => {
          await new UploadEvidence(page).submit();
        });
        await ctx.assertCaseState(caseStates.CASE_PROGRESSION);
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
        ...noCaseProgression('Skipping as trial arrangements are only confirmed on the fast track'),
        ['defendant2' in solicitor && c.claimType !== claimTypes.ONE_VS_TWO_DIFF_SOL, 'Skipping as Defendant 2 has no separate solicitor'],
      ],
      run: async ({ page, storageState }) => {
        await ctx.runEvent(page, storageState, async () => {
          await new ConfirmTrialArrangements(page).submit();
        });
        await ctx.assertCaseState(caseStates.PREPARE_FOR_HEARING_CONDUCT_HEARING);
      },
    }));
  }
}
