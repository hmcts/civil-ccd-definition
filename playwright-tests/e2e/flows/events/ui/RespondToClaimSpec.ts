import { expect, Page } from '@playwright/test';
import moment from 'moment-business-days';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';
import Timeline from '../../../../enums/timeline.ts';
import RespondentResponses from '../../../../enums/RespondentResponses.ts';
import AdmissionPaymentRoute from '../../../../enums/admissionPaymentRoute.ts';
import claimTypes from '../../../../enums/claim-types.ts';
import { courts } from '../../../../fixtures/courts.ts';
import { respondent1SolicitorCredentials, respondent2SolicitorCredentials } from '../../../../civilConfig.ts';

const eventId = 'DEFENDANT_RESPONSE_SPEC';

// A defendant's solicitor responding to a specified claim (event DEFENDANT_RESPONSE_SPEC, "Respond to claim"): a full
// defence disputing all of it, a full or part admission, or a counterclaim.
//
// Which of the event's pages show depends on the claim (who the parties are and its track) and on civil-service's
// mid-event callbacks, so rather than a fixed list the pages are answered as they come: each page XUI opens is looked up
// by its ID (the end of the URL) and answered by its handler below, until the check your answers page. A page with no
// handler fails the step, naming the page, rather than being skipped.
//
// The defendant's solicitor answers as Defendant 1 (respondent1 fields) unless they are Defendant 2's own solicitor in a
// 1v2 different solicitors claim (respondent2 fields). A solicitor representing both defendants gives one response for
// both when the responses are the same and one each otherwise, and a defendant sued by two claimants gives one response
// to both when they are the same and one to each claimant otherwise.
//
// A defendant who admits all or part of the claim says when they will pay (paymentRoute). Paying later than
// immediately, an individual or sole trader also gives their financial details: here they are retired, own their home,
// and have no partner, children, dependants, debts or court orders.
export interface SpecResponse {
  claimType: claimTypes;
  timeline: Timeline;
  // Each defendant's response; in a 2v1 claim respondent2Response is the response to Claimant 2
  respondent1Response: RespondentResponses;
  respondent2Response: RespondentResponses;
  paymentRoute: AdmissionPaymentRoute;
}

// The amount a defendant who admits part of the claim admits, in pounds
const partAdmittedAmount = '1000';

export class RespondToClaimSpec {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(defendantNumber: 1 | 2, response: SpecResponse) {
    const { claimType, timeline, respondent1Response, respondent2Response, paymentRoute } = response;
    // respondent1 or respondent2, and the suffix some fields use for Defendant 2 ('' or '2')
    const respondent = `respondent${defendantNumber}`;
    const suffix = defendantNumber === 1 ? '' : '2';
    const ownResponse = defendantNumber === 1 ? respondent1Response : respondent2Response;
    const sameResponses = respondent1Response === respondent2Response;
    const yes = (selector: string) => this.page.locator(selector).click();
    // Clicks each of the selectors that is showing: some admission questions are asked in Defendant 1's or Defendant 2's
    // fields depending on who the solicitor represents
    const visible = async (...selectors: string[]) => {
      for (const selector of selectors) {
        const field = this.page.locator(selector);
        if (await field.isVisible()) {
          await field.click();
        }
      }
    };

    const handlers: Record<string, () => Promise<void>> = {
      RespondentCheckList: async () => {},
      // The defendants' addresses as the claimant gave them, and the solicitor's details, are confirmed as correct
      ResponseConfirmNameAddress: () => this.confirmVisibleAddresses(),
      ResponseConfirmDetails: () => this.confirmVisibleAddresses(),
      SingleResponse: () => yes(`#respondentResponseIsSame_${sameResponses ? 'Yes' : 'No'}`),
      SingleResponse2v1: () => yes(`#defendantSingleResponseToBothClaimants_${sameResponses ? 'Yes' : 'No'}`),
      RespondentResponseTypeSpec: async () => {
        await yes(`#${respondent}ClaimResponseTypeForSpec-${ownResponse}`);
        // One solicitor for both defendants giving a response for each
        if (claimType === claimTypes.ONE_VS_TWO_SAME_SOL && !sameResponses) {
          await yes(`#respondent2ClaimResponseTypeForSpec-${respondent2Response}`);
        }
      },
      RespondentResponseTypeSpec2v1: async () => {
        await yes(`#claimant1ClaimResponseTypeForSpec-${respondent1Response}`);
        await yes(`#claimant2ClaimResponseTypeForSpec-${respondent2Response}`);
      },

      // Admissions: nothing has been paid yet, part of the claim is admitted, and when it will be paid
      defenceAdmittedPartRoute: async () => {
        await visible(
          '#specDefenceAdmittedRequired_No', '#specDefenceAdmitted2Required_No',
          '#specDefenceFullAdmittedRequired_No', '#specDefenceFullAdmitted2Required_No',
        );
        // The amount admitted shows once "not paid" is answered, for a part admission
        if ([respondent1Response, respondent2Response].includes(RespondentResponses.PART_ADMISSION)) {
          const owing = this.page.locator('#respondToAdmittedClaimOwingAmount, #respondToAdmittedClaimOwingAmount2').locator('visible=true');
          await owing.first().waitFor({ state: 'visible' });
          for (let i = 0; i < await owing.count(); i++) {
            await owing.nth(i).fill(partAdmittedAmount);
          }
        }
      },
      WhenWillClaimBePaid: async () => {
        await yes(`#defenceAdmitPartPaymentTimeRouteRequired${suffix}-${paymentRoute}`);
        if (paymentRoute === AdmissionPaymentRoute.BY_SET_DATE) {
          // XUI names a date's day, month and year boxes after the date field alone
          await this.pageHelper.fillDate('whenWillThisAmountBePaid', moment().add(1, 'month'));
        }
      },
      WhyDoesNotPayImmediately: () => this.page.locator('#responseToClaimAdmitPartWhyNotPayLRspec').fill('The defendant cannot pay all of it now.'),
      WhyDoesNotPayImmediatelyRespondent2: () => this.page.locator('#responseToClaimAdmitPartWhyNotPayLRspec2').fill('The defendant cannot pay all of it now.'),
      RepaymentPlan: () => this.repaymentPlan('respondent1RepaymentPlan'),
      RepaymentPlanRespondent2: () => this.repaymentPlan('respondent2RepaymentPlan'),

      // Financial details (an individual or sole trader admitting the claim and not paying immediately)
      FinancialDetailsPurpose: async () => {},
      FinancialDetailsPurpose2: async () => {},
      DefendantBankAccounts: async () => {},
      DefendantBankAccountsRespondent2: async () => {},
      DisabilityPremiumPayments: () => yes('#disabilityPremiumPayments_No'),
      DisabilityPremiumPaymentsRespondent2: () => yes('#disabilityPremiumPaymentsRespondent2_No'),
      defendantHomeOptions: () => yes('#respondent1DQHomeDetails_type-OWNED_HOME'),
      defendantHomeOptionsRespondent2: () => yes('#respondent2DQHomeDetails_type-OWNED_HOME'),
      DefendantPartnersAndDependents: () => this.partnersAndDependents('respondent1PartnerAndDependent'),
      Defendant2PartnersAndDependents: () => this.partnersAndDependents('respondent2PartnerAndDependent'),
      EmploymentDeclaration: async () => {
        await yes('#defenceAdmitPartEmploymentTypeRequired_No');
        await yes('#respondToClaimAdmitPartUnemployedLRspec_unemployedComplexTypeRequired-RETIRED');
      },
      EmploymentDeclarationRespondent2: async () => {
        await yes('#defenceAdmitPartEmploymentTypeRequiredRespondent2_No');
        await yes('#respondToClaimAdmitPartUnemployedLRspecRespondent2_unemployedComplexTypeRequired-RETIRED');
      },
      DetailsOfPayingMoneyRepaymentPlan: () => yes('#respondent1CourtOrderPaymentOption_No'),
      DetailsOfPayingMoneyRepaymentPlanRespondent2: () => yes('#respondent2CourtOrderPaymentOption_No'),
      DefendantDebts: () => yes('#respondent1LoanCreditOption_No'),
      DefendantDebtsRespondent2: () => yes('#respondent2LoanCreditOption_No'),
      DefendantIncomeExpenses: () => yes('#respondent1DQCarerAllowanceCredit_No'),
      DefendantIncomeExpensesFullAdmission: () => yes('#respondent1DQCarerAllowanceCreditFullAdmission_No'),
      DefendantIncomeExpensesRespondent2: () => yes('#respondent2DQCarerAllowanceCredit_No'),
      defenceRoute: () => yes(`#defenceRouteRequired${suffix}-DISPUTES_THE_CLAIM`),
      // Why the defendant disputes the claim (or the part they do not admit), in whichever defendant's field shows
      Upload: async () => {
        for (const [field, defendant] of [['#detailsOfWhyDoesYouDisputeTheClaim', 1], ['#detailsOfWhyDoesYouDisputeTheClaim2', 2]] as const) {
          if (await this.page.locator(field).isVisible()) {
            await this.page.locator(field).fill(`Defendant ${defendant} disputes the claim.`);
          }
        }
      },
      HowToAddTimeline: () => yes(`#specClaimResponseTimelineList${suffix}-${timeline}`),
      HowToAddTimelineManual: async () => {
        await this.page.locator(`#specResponseTimelineOfEvents${suffix}`).getByRole('button', { name: 'Add new' }).first().click();
        await this.pageHelper.fillDate('timelineDate', moment().subtract(1, 'month'));
        await this.page.locator(`#specResponseTimelineOfEvents${suffix}_0_timelineDescription`).fill(`Defendant ${defendantNumber}'s account of what happened.`);
      },
      HowToAddTimelineUpload: () => this.pageHelper.uploadFile(
        this.page.locator(defendantNumber === 1 ? '#specResponseTimelineDocumentFiles' : '#specResponsTimelineDocumentFiles2'),
        './playwright-tests/documents/TEST_DOCUMENT_2.pdf',
      ),

      // Small claims: mediation (with CARM, contact details and availability; without it, a yes or no) and the small
      // claims directions questionnaire
      MediationContactInformation: async () => {
        const contact = `#resp${defendantNumber}MediationContactInfo`;
        await this.page.locator(`${contact}_firstName`).fill('Mediation');
        await this.page.locator(`${contact}_lastName`).fill(`Contact${defendantNumber}`);
        await this.page.locator(`${contact}_emailAddress`).fill(`defendant${defendantNumber}.mediation@example.com`);
        await this.page.locator(`${contact}_telephoneNumber`).fill('07700900000');
      },
      MediationAvailability: () => yes(`#resp${defendantNumber}MediationAvailability_isMediationUnavailablityExists_No`),
      Mediation: () => yes(`#responseClaimMediationSpec${suffix}Required_Yes`),
      DeterminationWithoutHearing: () => yes(`#deterWithoutHearingRespondent${defendantNumber}_deterWithoutHearingYesNo_Yes`),
      SmallClaimExperts: () => yes(`#responseClaimExpertSpecRequired${suffix}_No`),
      SmallClaimWitnesses: () => yes(`#${respondent}DQWitnessesSmallClaim_witnessesToAppear_No`),
      SmaillClaimHearing: async () => {
        await yes(`#${respondent}DQHearingSmallClaim_unavailableDatesRequired_No`);
        await yes(`#SmallClaimHearingInterpreter${suffix}Required_No`);
      },

      // Fast, intermediate and multi track directions questionnaire
      FileDirectionsQuestionnaire: async () => {
        const fileDq = `#${respondent}DQFileDirectionsQuestionnaire`;
        await this.page.locator(`${fileDq}_explainedToClient-CONFIRM`).check();
        await yes(`${fileDq}_oneMonthStayRequested_No`);
        await yes(`${fileDq}_reactionProtocolCompliedWith_Yes`);
      },
      FixedRecoverableCosts: async () => {
        await yes(`#${respondent}DQFixedRecoverableCosts_isSubjectToFixedRecoverableCostRegime_No`);
        await this.page.locator(`#${respondent}DQFixedRecoverableCosts_reasons`).fill('Not subject to fixed recoverable costs.');
      },
      // Its fields only exist where the MINTI definition is deployed; without them the page has nothing to answer
      FixedRecoverableCostsIntermediate: async () => {
        const regime = this.page.locator(`#${respondent}DQFixedRecoverableCostsIntermediate_isSubjectToFixedRecoverableCostRegime_No`);
        if (await regime.isVisible()) {
          await regime.click();
          await this.page.locator(`#${respondent}DQFixedRecoverableCostsIntermediate_reasons`).fill('Not subject to fixed recoverable costs.');
        }
      },
      DisclosureOfElectronicDocumentsLRspec: () => yes(`#spec${capitalise(respondent)}DQDisclosureOfElectronicDocuments_reachedAgreement_Yes`),
      DisclosureOfNonElectronicDocumentsLRspec: () =>
        this.page.locator(`#spec${capitalise(respondent)}DQDisclosureOfNonElectronicDocuments_bespokeDirections`).fill('No bespoke directions needed.'),
      DisclosureReport: async () => {
        await yes(`#${respondent}DQDisclosureReport_disclosureFormFiledAndServed_Yes`);
        await yes(`#${respondent}DQDisclosureReport_disclosureProposalAgreed_Yes`);
        await this.page.locator(`#${respondent}DQDisclosureReport_draftOrderNumber`).fill('123');
      },
      Experts: () => yes(`#${respondent}DQExperts_expertRequired_No`),
      // Defendant 1's witnesses are a yes or no and a list; Defendant 2's own solicitor answers the shared witnesses field
      Witnesses: () => yes(defendantNumber === 1 ? '#respondent1DQWitnessesRequiredSpec_No' : '#respondent2DQWitnesses_witnessesToAppear_No'),
      HearingLRspec: () => yes(`#${respondent}DQHearingFastClaim_unavailableDatesRequired_No`),
      DraftDirections: () => this.pageHelper.uploadFile(this.page.locator(`#${respondent}DQDraftDirections`), './playwright-tests/documents/TEST_DOCUMENT_4.pdf'),
      Applications: () => yes(`#${respondent}DQFutureApplications_intentionToMakeFutureApplications_No`),

      // Every track
      Language: async () => {
        await yes(`#${respondent}DQLanguage_court-ENGLISH`);
        await yes(`#${respondent}DQLanguage_documents-ENGLISH`);
      },
      RequestedCourtLocationLRspec: async () => {
        await this.page.locator(`#respondToCourtLocation${suffix}_responseCourtLocations`).selectOption(courts.clerkenwell.longAddress);
        await this.page.locator(`#respondToCourtLocation${suffix}_reasonForHearingAtSpecificCourt`).fill('Nearest court to the defendant.');
        await yes(`#${respondent}DQRemoteHearingLRspec_remoteHearingRequested_No`);
      },
      HearingSupport: () => yes(`#${respondent}DQHearingSupport_supportRequirements_No`),
      VulnerabilityQuestions: () => yes(`#${respondent}DQVulnerabilityQuestions_vulnerabilityAdjustmentsRequired_No`),
      StatementOfTruth: async () => {
        const solicitor = defendantNumber === 1 ? respondent1SolicitorCredentials : respondent2SolicitorCredentials;
        await this.page.locator('input[id$="uiStatementOfTruth_name"]').fill(solicitor.name);
        await this.page.locator('input[id$="uiStatementOfTruth_role"]').fill('Solicitor');
      },
    };

    await this.pageHelper.selectNextStep('Respond to claim');
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
    console.log(`${eventId} pages answered by Defendant ${defendantNumber}'s solicitor: ${pagesAnswered.join(', ')}`);

    await this.pageHelper.submitEvent();
    await expect(this.page.locator('#confirmation-header')).toBeVisible();
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }

  // The ID of the event page XUI is on, e.g. RespondentCheckList, or submit for check your answers. The page is waited
  // for first, as XUI can still be on the previous URL straight after Continue.
  private async currentPageId(): Promise<string> {
    await expect(this.page).toHaveURL(new RegExp(`/trigger/${eventId}/[^/?#]+`));
    await this.page.getByRole('button', { name: /^(Continue|Submit)$/ }).first().waitFor({ state: 'visible' });
    const lastSegment = new URL(this.page.url()).pathname.split('/').pop() ?? '';
    return lastSegment.startsWith(eventId) ? lastSegment.slice(eventId.length) : lastSegment;
  }

  // The defendant's suggested repayment plan: £100 a month, starting in a month
  private async repaymentPlan(field: string) {
    await this.page.locator(`#${field}_paymentAmount`).fill('100');
    await this.page.locator(`#${field}_repaymentFrequency-ONCE_ONE_MONTH`).click();
    await this.pageHelper.fillDate('firstRepaymentDate', moment().add(1, 'month'));
  }

  // No partner, children or anyone else the defendant supports
  private async partnersAndDependents(field: string) {
    await this.page.locator(`#${field}_liveWithPartnerRequired_No`).click();
    await this.page.locator(`#${field}_haveAnyChildrenRequired_No`).click();
    await this.page.locator(`#${field}_supportedAnyoneFinancialRequired_No`).click();
  }

  // Answers Yes to every "Is this address correct?" question showing: which ones show depends on the claim (for example
  // Defendant 2's address too when one solicitor represents both)
  private async confirmVisibleAddresses() {
    const questions = this.page.locator('input[type="radio"][id$="AddressRequired_Yes"]:visible');
    for (let i = 0; i < await questions.count(); i++) {
      await questions.nth(i).click();
    }
  }
}

const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
