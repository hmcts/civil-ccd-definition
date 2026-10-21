import { envUrl } from '../../../civilConfig.ts';
import { CreateSpecifiedCase } from '../../flows/createSpecifiedCase.ts';
import { CreateClaimSpec } from '../../flows/events/api/CreateClaimSpec.ts';
import yesNo from '../../../enums/yesNo.ts';
import caseStates from '../../../enums/caseStates.ts';
import PaymentMethod from '../../../enums/paymentMethod.ts';
import { CaseUserRegistry } from '../../../helpers/CaseUserRegistry.ts';
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
  ];
}
