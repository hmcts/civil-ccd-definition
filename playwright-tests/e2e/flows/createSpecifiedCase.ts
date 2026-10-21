import { Page } from '@playwright/test';
import moment from 'moment/moment';
import { PageHelper } from '../../helpers/PageHelper.ts';
import { ButtonHelper } from '../../helpers/ButtonHelper.ts';
import YesNo from '../../enums/yesNo.ts';
import claimTrack from '../../enums/track.ts';
import Timeline from '../../enums/timeline.ts';
import { CreateUnspecifiedCase } from './createUnspecifiedCase.ts';
import { InterestType } from '../journey/specified/specifiedConfig.ts';

// The amount claimed, in pounds, that puts a specified claim on the track: small claims up to £10,000, fast track up to
// £25,000, intermediate track up to £100,000 and multi track above that. Used by the UI and the API to create claims.
export function specClaimAmountInPounds(track: claimTrack): number {
  switch (track) {
    case claimTrack.SMALL:
      return 5000;
    case claimTrack.INTERMEDIATE:
      return 75000;
    case claimTrack.MULTI:
      return 150000;
    default:
      return 20000;
  }
}

// The details the claim gives, shared by the UI and the API
export const specClaimText = {
  reference: 'ApplicantSolicitorReference',
  respondent1Reference: 'RespondentSolicitor1Reference',
  details: 'Test description of claim',
  timeline: 'Test description of what happened.',
  evidence: 'Test description of evidence.',
  amountReason: 'Test description of what the claimant(s) are claiming for.',
  interestRateReason: 'Test description of why entitled to the interest rate amount.',
  interestBreakdown: 'Description of how the amount was calculated',
  interestFromDate: 'Description of why claiming from this date.',
  fixedCommencementCostsInPounds: 225,
};

// The pages of CREATE_CLAIM_SPEC ("Create claim - Specified"), in the order XUI shows them. The party, organisation
// and statement of truth pages use the same fields as CREATE_CLAIM, so they are filled by CreateUnspecifiedCase.
export class CreateSpecifiedCase {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;
  private sharedPages: CreateUnspecifiedCase;
  private monthAgo = moment().subtract(1, 'month');

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
    this.sharedPages = new CreateUnspecifiedCase(this.page);
  }

  // Defendant 1's solicitor's reference is only entered when Defendant 1 has a solicitor
  async setReferences(defendant1HasSolicitor: boolean) {
    await this.page.locator('#solicitorReferences_applicantSolicitor1Reference').fill(specClaimText.reference);
    if (defendant1HasSolicitor) {
      await this.page.locator('#solicitorReferences_respondentSolicitor1Reference').fill(specClaimText.respondent1Reference);
    }
    await this.pageHelper.continueToNextPage();
  }

  async setClaimantType(claimantType: string, claimantNumber: number) {
    await this.sharedPages.setClaimantType(claimantType, claimantNumber);
  }

  async setAnotherClaimant(yesNo: YesNo) {
    await this.sharedPages.setAnotherClaimant(yesNo);
  }

  async setClaimantNotifications() {
    await this.sharedPages.setClaimantNotifications(YesNo.YES);
  }

  async setSolicitorOrganisation(organisationName: string) {
    await this.sharedPages.setSolicitorOrganisation(organisationName);
  }

  async setClaimantCorrespondenceAddress(yesNo: YesNo = YesNo.NO) {
    await this.page.locator(`#specApplicantCorrespondenceAddressRequired_${yesNo}`).check();
    await this.pageHelper.continueToNextPage();
  }

  async setDefendantType(defendantType: string, defendantNumber: number) {
    await this.sharedPages.setDefendantType(defendantType, defendantNumber);
  }

  async setDefendantLegallyRepresented(yesNo: YesNo, defendantNumber: number) {
    await this.page.locator(`#specRespondent${defendantNumber}Represented_${yesNo}`).check();
    await this.pageHelper.continueToNextPage();
  }

  // The defendant's solicitor's organisation is registered with HMCTS, and is found by the organisation search on the
  // same page
  async setDefendantSolicitorOrganisation(organisationName: string, defendantNumber: number) {
    await this.page.locator(`#respondent${defendantNumber}OrgRegistered_Yes`).check();
    await this.sharedPages.setSolicitorOrganisation(organisationName);
  }

  async setDefendantLegalRepresentativeEmail(defendantNumber: number) {
    await this.sharedPages.setDefendantLegalRepresentativeEmail(defendantNumber);
  }

  async setDefendantLegalRepresentativeCorrespondenceAddress(defendantNumber: number, yesNo: YesNo = YesNo.NO) {
    const field = defendantNumber === 1 ? 'specRespondentCorrespondenceAddressRequired' : 'specRespondent2CorrespondenceAddressRequired';
    await this.page.locator(`#${field}_${yesNo}`).check();
    await this.pageHelper.continueToNextPage();
  }

  async setAnotherDefendant(yesNo: YesNo) {
    await this.sharedPages.setAnotherDefendant(yesNo);
  }

  async setSameLegalRepresentative(yesNo: YesNo) {
    await this.sharedPages.setSameLegalRepresentative(yesNo);
  }

  async setAirlineClaim(yesNo: YesNo) {
    await this.page.locator(`#isFlightDelayClaim_${yesNo}`).check();
    if (yesNo == YesNo.YES) {
      await this.page.locator('#flightDelayDetails_airlineList').selectOption({ label: 'Jet2.com' });
      await this.page.locator('#flightDelayDetails_flightNumber').fill('ABC1234');
      await this.page.locator('#scheduledDate-day').fill(this.monthAgo.date().toString());
      await this.page.locator('#scheduledDate-month').fill((this.monthAgo.month() + 1).toString());
      await this.page.locator('#scheduledDate-year').fill(this.monthAgo.year().toString());
    }
    await this.pageHelper.continueToNextPage();
  }

  async setDescriptionOfClaim() {
    await this.page.locator('#detailsOfClaim').fill(specClaimText.details);
    await this.pageHelper.continueToNextPage();
  }

  // Whether the timeline is typed in or uploaded, then the timeline itself
  async setTimeline(timeline: Timeline) {
    await this.page.locator(`#specClaimTimelineList-${timeline}`).check();
    await this.pageHelper.continueToNextPage();
    if (timeline === Timeline.MANUAL) {
      await this.buttonHelper.addNewButton.first().click();
      await this.page.locator('#timelineDate-day').fill(this.monthAgo.date().toString());
      await this.page.locator('#timelineDate-month').fill((this.monthAgo.month() + 1).toString());
      await this.page.locator('#timelineDate-year').fill(this.monthAgo.year().toString());
      await this.page.locator('#timelineOfEvents_0_timelineDescription').fill(specClaimText.timeline);
    } else {
      await this.page.locator('#specClaimTemplateDocumentFiles').setInputFiles('./playwright-tests/documents/TEST_DOCUMENT_2.pdf');
      await this.page.waitForSelector('.error-message', { state: 'hidden' });
    }
    await this.pageHelper.continueToNextPage();
  }

  async setEvidence() {
    await this.buttonHelper.addNewButton.first().click();
    await this.page.locator('#speclistYourEvidenceList_0_evidenceType').selectOption({ label: 'Statement of account' });
    await this.page.locator('#speclistYourEvidenceList_0_statementOfTruthEvidence').fill(specClaimText.evidence);
    await this.pageHelper.continueToNextPage();
  }

  // The amount claimed, then the page that totals it
  async setClaimAmount(track: claimTrack) {
    await this.buttonHelper.addNewButton.first().click();
    await this.page.locator('#claimAmountBreakup_0_claimReason').fill(specClaimText.amountReason);
    await this.page.locator('#claimAmountBreakup_0_claimAmount').fill(String(specClaimAmountInPounds(track)));
    await this.pageHelper.continueToNextPage();
    await this.pageHelper.continueToNextPage(); // Amount claimed summary
  }

  // Whether interest is claimed, and if it is, how it is worked out and the date it is claimed from. It is claimed from
  // the date the claim is submitted, so the claim is not asked until when (that is only asked for a specific date).
  async setInterest(interestRequired: YesNo, interestType: InterestType, interestRate: string) {
    await this.page.locator(`#claimInterest_${interestRequired}`).check();
    await this.pageHelper.continueToNextPage();
    if (interestRequired === YesNo.NO) {
      return;
    }

    await this.page.locator(`#interestClaimOptions-${interestType}`).check();
    await this.pageHelper.continueToNextPage();
    if (interestType === InterestType.SAME_RATE) {
      if (interestRate === '8') {
        await this.page.locator('#sameRateInterestSelection_sameRateInterestType-SAME_RATE_INTEREST_8_PC').check();
      } else {
        await this.page.locator('#sameRateInterestSelection_sameRateInterestType-SAME_RATE_INTEREST_DIFFERENT_RATE').check();
        await this.page.locator('#sameRateInterestSelection_differentRate').fill(interestRate);
        await this.page.locator('#sameRateInterestSelection_differentRateReason').fill(specClaimText.interestRateReason);
      }
    } else {
      await this.page.locator('#breakDownInterestTotal').fill(interestRate);
      await this.page.locator('#breakDownInterestDescription').fill(specClaimText.interestBreakdown);
    }
    await this.pageHelper.continueToNextPage();

    await this.page.locator('#interestClaimFrom-FROM_CLAIM_SUBMIT_DATE').check();
    await this.pageHelper.continueToNextPage();
  }

  // The total amount claimed, with any interest, and the claim fee, which is paid with PBA after the claim is submitted
  async confirmTotalAndFee() {
    await this.pageHelper.continueToNextPage(); // Total amount claimed
    await this.pageHelper.continueToNextPage(); // Claim fee
  }

  async setFixedCommencementCosts(yesNo: YesNo) {
    await this.page.locator(`#fixedCosts_claimFixedCosts_${yesNo}`).check();
    if (yesNo == YesNo.YES) {
      await this.page.locator('#fixedCosts_fixedCostAmount').fill(String(specClaimText.fixedCommencementCostsInPounds));
    }
    await this.pageHelper.continueToNextPage();
  }

  async setStatementOfTruth() {
    await this.sharedPages.setStatementOfTruth();
  }
}
