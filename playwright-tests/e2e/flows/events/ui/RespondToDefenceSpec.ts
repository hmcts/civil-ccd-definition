import { expect, Page } from '@playwright/test';
import moment from 'moment-business-days';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';
import yesNo from '../../../../enums/yesNo.ts';
import claimTypes from '../../../../enums/claim-types.ts';
import ClaimantSuggestedPayment from '../../../../enums/claimantSuggestedPayment.ts';
import { courts } from '../../../../fixtures/courts.ts';
import { claimantSolicitorCredentials } from '../../../../civilConfig.ts';

const eventId = 'CLAIMANT_RESPONSE_SPEC';

// The claimant's solicitor responding to the defence or admission of a specified claim (event CLAIMANT_RESPONSE_SPEC,
// "View and respond to defence"), once every response is in and the claim is in AWAITING_APPLICANT_INTENTION.
// After a full defence the claimant either proceeds with the claim, which asks for their directions questionnaire, or
// does not. After a 1v1 admission they accept or reject the amount admitted (part admission) and the date or repayment
// plan offered; rejecting the plan, they suggest how the defendant pays, and rejecting the amount, they answer the
// directions questionnaire. Accepting a plan, they ask for judgment: nothing paid yet and no fixed costs.
//
// Which pages show depends on the claim's track and on civil-service's mid-event callbacks, so, as in
// RespondToClaimSpec, each page XUI opens is looked up by its ID (the end of the URL) and answered by its handler below,
// until the check your answers page. A page with no handler fails the step, naming the page.
//
// A specified claim asks one proceed question whatever the parties: whether the claimant (both claimants in a 2v1
// claim) proceeds against the defendant (both defendants in a 1v2 claim). It is also all a 2v1 or 1v2SS claimant is asked
// about an admission.
export interface ClaimantSpecResponse {
  proceed: yesNo;
  acceptsAmount: yesNo;
  acceptsPlan: yesNo;
  suggestedPayment: ClaimantSuggestedPayment;
}

export class RespondToDefenceSpec {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(claimType: claimTypes, answers: ClaimantSpecResponse) {
    const { proceed, acceptsAmount, acceptsPlan, suggestedPayment } = answers;
    const yes = (selector: string) => this.page.locator(selector).click();
    // Clicks the first of the selectors that is showing: some questions are asked in a 2v1 claim's field instead
    const visible = async (...selectors: string[]) => {
      for (const selector of selectors) {
        const field = this.page.locator(selector);
        if (await field.isVisible()) {
          await field.click();
          return;
        }
      }
      throw new Error(`None of ${selectors.join(', ')} is showing`);
    };

    const handlers: Record<string, () => Promise<void>> = {
      // The proceed question, or after a 1v1 admission whether the claimant accepts the amount and the date or plan
      RespondentResponse: async () => {
        const amount = this.page.locator(`#applicant1AcceptAdmitAmountPaidSpec_${acceptsAmount}`);
        const fullAdmissionPlan = this.page.locator(`#applicant1AcceptFullAdmitPaymentPlanSpec_${acceptsPlan}`);
        if (await amount.isVisible()) {
          await amount.click();
          // The plan is only asked about once the amount is accepted, and not when it is paid immediately. XUI shows the
          // question a moment after the amount is answered, so it is waited for.
          const partAdmissionPlan = this.page.locator(`#applicant1AcceptPartAdmitPaymentPlanSpec_${acceptsPlan}`);
          const planAsked = acceptsAmount === yesNo.YES
            && await partAdmissionPlan.waitFor({ state: 'visible', timeout: 5000 }).then(() => true, () => false);
          if (planAsked) {
            await partAdmissionPlan.click();
          }
        } else if (await fullAdmissionPlan.isVisible()) {
          await fullAdmissionPlan.click();
        } else {
          await yes(claimType === claimTypes.TWO_VS_ONE
            ? `#applicant1ProceedWithClaimSpec2v1_${proceed}`
            : `#applicant1ProceedWithClaim_${proceed}`);
        }
      },
      // A full admission paid immediately: only when the defendant will pay is shown
      RespondentResponsePayImmediately: async () => {},

      // Rejecting the defendant's date or plan: how the claimant suggests the defendant pays instead (a date a month
      // away, or £100 a month starting in two months, as civil-service wants the first payment more than 30 days away)
      RespondentProposedRepayment: () => yes(`#applicant1RepaymentOptionForDefendantSpec-${suggestedPayment}`),
      PaymentDate: () => this.pageHelper.fillDate('paymentSetDate', moment().add(1, 'month')),
      SuggestInstalments: async () => {
        await this.page.locator('#applicant1SuggestInstalmentsPaymentAmountForDefendantSpec').fill('100');
        await yes('#applicant1SuggestInstalmentsRepaymentFrequencyForDefendantSpec-ONCE_ONE_MONTH');
        await this.pageHelper.fillDate('applicant1SuggestInstalmentsFirstRepaymentDateForDefendantSpec', moment().add(2, 'months'));
      },

      // Accepting the defendant's date or plan: the judgment asked for, with nothing paid yet and no fixed costs
      CcjPaymentPaidSome: () => yes('#ccjPaymentPaidSomeOption_No'),
      FixedCost: () => yes('#ccjJudgmentFixedCostOption_No'),
      CcjJudgmentSummary: async () => {},
      // The claimant's response to the defence, as a document
      ApplicantDefenceResponseDocument: () => this.pageHelper.uploadFile(
        this.page.locator('#applicant1DefenceResponseDocumentSpec_file'),
        './playwright-tests/documents/TEST_DOCUMENT_3.pdf',
      ),

      // Small claims: mediation (with CARM, contact details and availability; without it, a yes or no) and the small
      // claims directions questionnaire
      MediationContactInformation: async () => {
        await this.page.locator('#app1MediationContactInfo_firstName').fill('Mediation');
        await this.page.locator('#app1MediationContactInfo_lastName').fill('Claimant');
        await this.page.locator('#app1MediationContactInfo_emailAddress').fill('claimant.mediation@example.com');
        await this.page.locator('#app1MediationContactInfo_telephoneNumber').fill('07700900000');
      },
      MediationAvailability: () => yes('#app1MediationAvailability_isMediationUnavailablityExists_No'),
      Mediation: () => visible(
        '#applicant1ClaimMediationSpecRequired_hasAgreedFreeMediation_Yes',
        '#applicantMPClaimMediationSpecRequired_hasAgreedFreeMediation_Yes',
      ),
      DeterminationWithoutHearing: () => yes('#deterWithoutHearing_deterWithoutHearingYesNo_Yes'),
      SmallClaimExperts: () => visible('#applicant1ClaimExpertSpecRequired_No', '#applicantMPClaimExpertSpecRequired_No'),
      // Only the claimant gives evidence
      SmallClaimWitnesses: async () => {
        await this.page.locator('#applicant1ClaimWitnesses').fill('1');
        await yes('#applicant1DQWitnessesSmallClaim_witnessesToAppear_No');
      },

      // Fast, intermediate and multi track directions questionnaire
      FileDirectionsQuestionnaire: async () => {
        await this.page.locator('#applicant1DQFileDirectionsQuestionnaire_explainedToClient-CONFIRM').check();
        await yes('#applicant1DQFileDirectionsQuestionnaire_oneMonthStayRequested_No');
        await yes('#applicant1DQFileDirectionsQuestionnaire_reactionProtocolCompliedWith_Yes');
      },
      // These pages also show when the claimant does not proceed, but their questions only show when they do
      FixedRecoverableCosts: () => this.notSubjectToFixedRecoverableCosts('applicant1DQFixedRecoverableCosts'),
      FixedRecoverableCostsIntermediate: () => this.notSubjectToFixedRecoverableCosts('applicant1DQFixedRecoverableCostsIntermediate'),
      DisclosureOfElectronicDocuments: () => yes('#specApplicant1DQDisclosureOfElectronicDocuments_reachedAgreement_Yes'),
      DisclosureOfNonElectronicDocuments: () =>
        this.page.locator('#specApplicant1DQDisclosureOfNonElectronicDocuments_bespokeDirections').fill('No bespoke directions needed.'),
      DisclosureReport: async () => {
        await yes('#applicant1DQDisclosureReport_disclosureFormFiledAndServed_Yes');
        await yes('#applicant1DQDisclosureReport_disclosureProposalAgreed_Yes');
        await this.page.locator('#applicant1DQDisclosureReport_draftOrderNumber').fill('123');
      },
      Experts: () => yes('#applicant1DQExperts_expertRequired_No'),
      Witnesses: () => yes('#applicant1DQWitnesses_witnessesToAppear_No'),
      DraftDirections: () => this.pageHelper.uploadFile(this.page.locator('#applicant1DQDraftDirections'), './playwright-tests/documents/TEST_DOCUMENT_4.pdf'),
      Applications: () => yes('#applicant1DQFutureApplications_intentionToMakeFutureApplications_No'),

      // Every track
      Language: async () => {
        await yes('#applicant1DQLanguage_court-ENGLISH');
        await yes('#applicant1DQLanguage_documents-ENGLISH');
      },
      Hearing: () => visible('#applicant1DQHearingLRspec_unavailableDatesRequired_No', '#applicant1DQSmallClaimHearing_unavailableDatesRequired_No'),
      ApplicantCourtLocationLRspec: async () => {
        await this.page.locator('#applicant1DQRequestedCourt_responseCourtLocations').selectOption(courts.clerkenwell.longAddress);
        await this.page.locator('#applicant1DQRequestedCourt_reasonForHearingAtSpecificCourt').fill('Nearest court to the claimant.');
        await yes('#applicant1DQRemoteHearingLRspec_remoteHearingRequested_No');
      },
      HearingSupport: () => yes('#applicant1DQHearingSupport_supportRequirements_No'),
      VulnerabilityQuestions: () => yes('#applicant1DQVulnerabilityQuestions_vulnerabilityAdjustmentsRequired_No'),
      StatementOfTruth: async () => {
        await this.page.locator('input[id$="uiStatementOfTruth_name"]').fill(claimantSolicitorCredentials.name);
        await this.page.locator('input[id$="uiStatementOfTruth_role"]').fill('Solicitor');
      },
    };

    await this.pageHelper.selectNextStep('View and respond to defence');
    const pagesAnswered: string[] = [];
    for (let pageId = await this.currentPageId(); pageId !== 'submit'; pageId = await this.currentPageId()) {
      const answer = handlers[pageId];
      if (!answer) {
        throw new Error(`${eventId} showed page ${pageId}, which has no answers here (pages answered: ${pagesAnswered.join(', ')})`);
      }
      await answer();
      pagesAnswered.push(pageId);
      await this.pageHelper.continueToNextPage();
    }
    console.log(`${eventId} pages answered by the claimant's solicitor: ${pagesAnswered.join(', ')}`);

    await this.pageHelper.submitEvent();
    await expect(this.page.locator('#confirmation-header')).toBeVisible();
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }

  // The claim is not subject to the fixed recoverable costs regime, if the question is showing
  private async notSubjectToFixedRecoverableCosts(field: string) {
    const regime = this.page.locator(`#${field}_isSubjectToFixedRecoverableCostRegime_No`);
    if (await regime.isVisible()) {
      await regime.click();
      await this.page.locator(`#${field}_reasons`).fill('Not subject to fixed recoverable costs.');
    }
  }

  // The ID of the event page XUI is on, e.g. RespondentResponse, or submit for check your answers. The page is waited
  // for first, as XUI can still be on the previous URL straight after Continue.
  private async currentPageId(): Promise<string> {
    await expect(this.page).toHaveURL(new RegExp(`/trigger/${eventId}/[^/?#]+`));
    await this.page.getByRole('button', { name: /^(Continue|Submit)/ }).first().waitFor({ state: 'visible' });
    const lastSegment = new URL(this.page.url()).pathname.split('/').pop() ?? '';
    return lastSegment.startsWith(eventId) ? lastSegment.slice(eventId.length) : lastSegment;
  }
}
