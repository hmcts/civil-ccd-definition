import { expect } from '@playwright/test';
import { envUrl } from '../../../civilConfig.ts';
import { CreateSpecifiedCase } from '../../flows/createSpecifiedCase.ts';
import { CreateClaimSpec } from '../../flows/events/api/CreateClaimSpec.ts';
import { InformAgreedExtensionDateSpec } from '../../flows/events/ui/InformAgreedExtensionDateSpec.ts';
import { InformAgreedExtensionDateSpec as ApiInformAgreedExtensionDateSpec } from '../../flows/events/api/InformAgreedExtensionDateSpec.ts';
import { RespondToClaimSpec } from '../../flows/events/ui/RespondToClaimSpec.ts';
import { RespondToClaimSpec as ApiRespondToClaimSpec } from '../../flows/events/api/RespondToClaimSpec.ts';
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
  ];

  function respondToClaimSteps(): JourneyStep[] {
    // Claims where every defendant has a solicitor. A litigant in person responds through the citizen service instead.
    const allDefendantsRepresented = [claimTypes.ONE_VS_ONE, claimTypes.TWO_VS_ONE, claimTypes.ONE_VS_TWO_SAME_SOL, claimTypes.ONE_VS_TWO_DIFF_SOL].includes(c.claimType);
    const noLitigantInPerson: [boolean, string] = [!allDefendantsRepresented, 'Skipping as a defendant is a litigant in person, who responds through the citizen service'];
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
}
