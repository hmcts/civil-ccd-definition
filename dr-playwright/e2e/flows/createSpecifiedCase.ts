import { expect, Page } from '@playwright/test';
import { courts } from '../../fixtures/courts.ts';
import { ButtonHelper } from '../../helpers/ButtonHelper';
import claimTypes from '../../enums/claim-types.ts';
import claimantDefendantTypes from '../../enums/claimantDefendantTypes.ts';
import { legalRepresentatives } from '../../fixtures/legalRepresentatives.ts';
import { partyDetails } from '../../fixtures/partyDetails.ts';
import { LinkHelper } from '../../helpers/LinkHelper.ts';
import YesNo from '../../enums/yesNo.ts';
import claimTrack from '../../enums/claim-track.ts';
import moment from 'moment/moment';

export class CreateSpecifiedCase {
  private buttonHelper: ButtonHelper;
  private monthAgo = moment().subtract(1, 'month');
  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
  }

  async setReferences(claimType: string = claimTypes.ONE_VS_ONE) {
    if (claimType === claimTypes.ONE_VS_ONE) {
      await this.page
        .locator('#solicitorReferences_applicantSolicitor1Reference')
        .fill('ApplicantSolicitorReference');
      await this.page
        .locator('#solicitorReferences_respondentSolicitor1Reference')
        .fill('RespondentSolicitor1Reference');
    }
    await this.buttonHelper.continueButton.click();
  }

  async setClaimantType(claimantType: string = 'INDIVIDUAL', claimantNumber: number = 1) {
    await this.page.locator(`#applicant${claimantNumber}_type-${claimantType}`).click();

    switch (claimantType) {
      case claimantDefendantTypes.INDIVIDUAL:
        await this.page
          .locator(`#applicant${claimantNumber}_individualTitle`)
          .fill(claimantNumber === 1 ? partyDetails.claimant1.title : partyDetails.claimant2.title);
        await this.page
          .locator(`#applicant${claimantNumber}_individualFirstName`)
          .fill(
            claimantNumber === 1
              ? partyDetails.claimant1.firstName
              : partyDetails.claimant2.firstName,
          );
        await this.page
          .locator(`#applicant${claimantNumber}_individualLastName`)
          .fill(
            claimantNumber === 1
              ? partyDetails.claimant1.lastName
              : partyDetails.claimant2.lastName,
          );
        await this.page
          .locator('#individualDateOfBirth-day')
          .fill(
            claimantNumber === 1 ? partyDetails.claimant1.DOB_day : partyDetails.claimant2.DOB_day,
          );
        await this.page
          .locator('#individualDateOfBirth-month')
          .fill(
            claimantNumber === 1
              ? partyDetails.claimant1.DOB_month
              : partyDetails.claimant2.DOB_month,
          );
        await this.page
          .locator('#individualDateOfBirth-year')
          .fill(
            claimantNumber === 1
              ? partyDetails.claimant1.DOB_year
              : partyDetails.claimant2.DOB_year,
          );
        await this.page
          .locator(`#applicant${claimantNumber}_partyPhone`)
          .fill(claimantNumber === 1 ? partyDetails.claimant1.phone : partyDetails.claimant2.phone);
        break;
      case claimantDefendantTypes.COMPANY:
        await this.page
          .locator(`#applicant${claimantNumber}_companyName`)
          .fill(
            claimantNumber === 1
              ? partyDetails.claimant1.companyName
              : partyDetails.claimant2.companyName,
          );
        break;
      case claimantDefendantTypes.ORGANISATION:
        await this.page
          .locator(`#applicant${claimantNumber}_organisationName`)
          .fill(
            claimantNumber === 1
              ? partyDetails.claimant1.organisationName
              : partyDetails.claimant2.organisationName,
          );
        break;
      case claimantDefendantTypes.SOLETRADER:
        await this.page
          .locator(`#applicant${claimantNumber}_soleTraderTitle`)
          .fill(claimantNumber === 1 ? partyDetails.claimant1.title : partyDetails.claimant2.title);
        await this.page
          .locator(`#applicant${claimantNumber}_soleTraderFirstName`)
          .fill(
            claimantNumber === 1
              ? partyDetails.claimant1.firstName
              : partyDetails.claimant2.firstName,
          );
        await this.page
          .locator(`#applicant${claimantNumber}_soleTraderLastName`)
          .fill(
            claimantNumber === 1
              ? partyDetails.claimant1.lastName
              : partyDetails.claimant2.lastName,
          );
        await this.page
          .locator(`#applicant${claimantNumber}_soleTraderTradingAs`)
          .fill(
            claimantNumber === 1
              ? partyDetails.claimant1.soleTraderTradingAs
              : partyDetails.claimant2.soleTraderTradingAs,
          );
        await this.page
          .locator('#soleTraderDateOfBirth-day')
          .fill(
            claimantNumber === 1 ? partyDetails.claimant1.DOB_day : partyDetails.claimant2.DOB_day,
          );
        await this.page
          .locator('#soleTraderDateOfBirth-month')
          .fill(
            claimantNumber === 1
              ? partyDetails.claimant1.DOB_month
              : partyDetails.claimant2.DOB_month,
          );
        await this.page
          .locator('#soleTraderDateOfBirth-year')
          .fill(
            claimantNumber === 1
              ? partyDetails.claimant1.DOB_year
              : partyDetails.claimant2.DOB_year,
          );
        await this.page
          .locator(`#applicant${claimantNumber}_partyPhone`)
          .fill(claimantNumber === 1 ? partyDetails.claimant1.phone : partyDetails.claimant2.phone);
    }

    await this.page
      .locator(`#applicant${claimantNumber}_partyEmail`)
      .fill(claimantNumber === 1 ? partyDetails.claimant1.email : partyDetails.claimant2.email);

    claimantNumber === 1
      ? await new LinkHelper(this.page).manualAddressClaimant1.click()
      : await new LinkHelper(this.page).manualAddressClaimant2.click();

    await this.page
      .locator(`#applicant${claimantNumber}_primaryAddress__detailAddressLine1`)
      .fill(
        claimantNumber === 1
          ? partyDetails.claimant1.address.addressLine1
          : partyDetails.claimant2.address.addressLine1,
      );
    await this.page
      .locator(`#applicant${claimantNumber}_primaryAddress__detailPostTown`)
      .fill(
        claimantNumber === 1
          ? partyDetails.claimant1.address.postTown
          : partyDetails.claimant2.address.postTown,
      );
    await this.page
      .locator(`#applicant${claimantNumber}_primaryAddress__detailCountry`)
      .fill(
        claimantNumber === 1
          ? partyDetails.claimant1.address.country
          : partyDetails.claimant2.address.country,
      );
    await this.page
      .locator(`#applicant${claimantNumber}_primaryAddress__detailPostCode`)
      .fill(
        claimantNumber === 1
          ? partyDetails.claimant1.address.postcode
          : partyDetails.claimant2.address.postcode,
      );

    await this.buttonHelper.continueButton.click();
  }

  async setClaimantNotifications(yesNo: YesNo = YesNo.YES) {
    await this.page.locator(`#applicantSolicitor1CheckEmail_correct_${yesNo}`).check();
    await this.buttonHelper.continueButton.click();
  }

  async setClaimantServiceAddress(yesNo: YesNo = YesNo.NO) {
    await this.page.locator(`#applicantSolicitor1ServiceAddressRequired_${yesNo}`).check();
    await this.buttonHelper.continueButton.click();
  }

  async setAnotherClaimant(yesNo: YesNo = YesNo.NO, claimantType: string = 'INDIVIDUAL') {
    await this.page.locator(`#addApplicant2_${yesNo}`).check();
    await this.buttonHelper.continueButton.click();
  }

  async setDefendantType(
    defendantType: string = claimantDefendantTypes.INDIVIDUAL,
    defendantNumber: number = 1,
  ) {
    await this.page.locator(`#respondent${defendantNumber}_type-${defendantType}`).click();
    await this.page
      .locator(`#respondent${defendantNumber}_individualTitle`)
      .fill(defendantNumber === 1 ? partyDetails.defendant1.title : partyDetails.defendant2.title);
    await this.page
      .locator(`#respondent${defendantNumber}_individualFirstName`)
      .fill(
        defendantNumber === 1
          ? partyDetails.defendant1.firstName
          : partyDetails.defendant2.firstName,
      );
    await this.page
      .locator(`#respondent${defendantNumber}_individualLastName`)
      .fill(
        defendantNumber === 1 ? partyDetails.defendant1.lastName : partyDetails.defendant2.lastName,
      );
    await this.page
      .locator(`#respondent${defendantNumber}_partyEmail`)
      .fill(defendantNumber === 1 ? partyDetails.defendant1.email : partyDetails.defendant2.email);
    await this.page
      .locator(`#respondent${defendantNumber}_partyPhone`)
      .fill(defendantNumber === 1 ? partyDetails.defendant1.phone : partyDetails.defendant2.phone);

    if (defendantNumber === 1) {
      await new LinkHelper(this.page).manualAddressDefendant1.click();
    } else {
      await new LinkHelper(this.page).manualAddressDefendant2.click();
    }

    await this.page
      .locator(`#respondent${defendantNumber}_primaryAddress__detailAddressLine1`)
      .fill(
        defendantNumber === 1
          ? partyDetails.defendant1.address.addressLine1
          : partyDetails.defendant2.address.addressLine1,
      );
    await this.page
      .locator(`#respondent${defendantNumber}_primaryAddress__detailPostTown`)
      .fill(
        defendantNumber === 1
          ? partyDetails.defendant1.address.postTown
          : partyDetails.defendant2.address.postTown,
      );
    await this.page
      .locator(`#respondent${defendantNumber}_primaryAddress__detailCountry`)
      .fill(
        defendantNumber === 1
          ? partyDetails.defendant1.address.country
          : partyDetails.defendant2.address.country,
      );
    await this.page
      .locator(`#respondent${defendantNumber}_primaryAddress__detailPostCode`)
      .fill(
        defendantNumber === 1
          ? partyDetails.defendant1.address.postcode
          : partyDetails.defendant2.address.postcode,
      );

    await this.buttonHelper.continueButton.click();
  }

  async setOrganisationRegisteredWithHMCTS(yesNo: YesNo = YesNo.YES, defendantNumber: number = 1) {
    await this.page.locator(`#respondent${defendantNumber}OrgRegistered_${yesNo}`).click();
    await this.page
      .locator(`#respondent${defendantNumber}OrganisationPolicy_OrgPolicyReference`)
      .fill(`Legal Representative Organisation Reference for defendant ${defendantNumber}`);
    await this.buttonHelper.continueButton.click();
  }

  async setDefendantLegallyRepresented(yesNo: YesNo = YesNo.YES, defendantNumber: number = 1) {
    await this.page.locator(`#specRespondent${defendantNumber}Represented_${yesNo}`).click();
    await this.buttonHelper.continueButton.click();
  }

  async setSolicitorOrganisation(organisationName: string = 'Civil - Organisation 1') {
   // await this.page
   //   .locator('#applicant1OrganisationPolicy_OrgPolicyReference').fill('Legal Representative Organisation Reference for applicant(s)');
    await expect(this.page.locator('#search-org-text')).toBeVisible();
    await this.page.locator('#search-org-text').fill('civil');

    const child = this.page.getByText(organisationName);
    const parent = this.page.getByRole('table').filter({ has: child });
    await parent.getByRole('link').click();
    await expect(this.page.locator('#organisation-selected-table')).toBeVisible();

    await this.buttonHelper.continueButton.click();
  }

  async setClaimantLegalRepresentativePostalAddress(yesNo: YesNo = YesNo.NO) {
    await this.page.locator(`#specApplicantCorrespondenceAddressRequired_${yesNo}`).check();
    await this.buttonHelper.continueButton.click();
  }

  async setDefendantLegalRepresentativeCorrespondenceAddress(
    yesNo: YesNo = YesNo.NO,
    defendantNumber: number = 1,
  ) {
    if (defendantNumber == 1) {
      await this.page.locator(`#specRespondentCorrespondenceAddressRequired_${yesNo}`).check();
    } else {
      await this.page
        .locator(`#specRespondent${defendantNumber}CorrespondenceAddressRequired_${yesNo}`)
        .check();
    }

    await this.buttonHelper.continueButton.click();
  }


  async setDefendantLegalRepresentativeEmail(defendantNumber: number = 1) {
    await this.page
      .locator(`#respondentSolicitor${defendantNumber}EmailAddress`)
      .fill(
        defendantNumber === 1
          ? legalRepresentatives.legalRepresentative1.email
          : legalRepresentatives.legalRepresentative2.email,
      );
    await this.buttonHelper.continueButton.click();
  }

  async setAnotherDefendant(yesNo: YesNo = YesNo.NO) {
    await this.page.locator(`#addRespondent2_${yesNo}`).check();
    await this.buttonHelper.continueButton.click();
  }

  async setSameLegalRepresentative(yesNo: YesNo = YesNo.YES) {
    await this.page.locator(`#respondent2SameLegalRepresentative_${yesNo}`).check();
    await this.buttonHelper.continueButton.click();
  }

  async setAirlineClaim(yesNo: YesNo = YesNo.YES) {
    await this.page.locator(`#isFlightDelayClaim_${yesNo}`).check();
    if (yesNo == YesNo.YES) {
      await this.page
        .locator(`#flightDelayDetails_airlineList`)
        .selectOption({ label: 'Jet2.com' });
      await this.page.locator('#flightDelayDetails_flightNumber').fill('ABC1234');
      await this.page.locator('#scheduledDate-day').fill(this.monthAgo.date().toString());
      await this.page.locator('#scheduledDate-month').fill((this.monthAgo.month() + 1).toString());
      await this.page.locator('#scheduledDate-year').fill(this.monthAgo.year().toString());
    }
    await this.buttonHelper.continueButton.click();
  }

  async setDescriptionOfClaim() {
    await this.page.locator('#detailsOfClaim').fill('Test description of claim');
    await this.page
      .locator('#specClaimDetailsDocumentFiles')
      .setInputFiles('./dr-playwright/documents/TEST_DOCUMENT_1.pdf');
    await this.page.waitForSelector('.error-message', { state: 'hidden' });
    await this.buttonHelper.continueButton.click();
  }

  async setTimeline(uploadManual: 'UPLOAD' | 'MANUAL') {
    await this.page.locator(`#specClaimTimelineList-${uploadManual}`).check();
    await this.buttonHelper.continueButton.click();
    if (uploadManual === 'MANUAL') {
      await this.buttonHelper.addNewButton.first().click();
      await this.page.locator('#timelineDate-day').fill(this.monthAgo.date().toString());
      await this.page.locator('#timelineDate-month').fill((this.monthAgo.month() + 1).toString());
      await this.page.locator('#timelineDate-year').fill(this.monthAgo.year().toString());
      await this.page
        .locator('#timelineOfEvents_0_timelineDescription')
        .fill('Test description of what happened.');
    } else {
      await this.page
        .locator('#specClaimTemplateDocumentFiles')
        .setInputFiles('./dr-playwright/documents/TEST_DOCUMENT_2.pdf');
      await this.page.waitForSelector('.error-message', { state: 'hidden' });
    }
    await this.buttonHelper.continueButton.click();
  }

  async setEvidence() {
    await this.buttonHelper.addNewButton.first().click();
    await this.page
      .locator(`#speclistYourEvidenceList_0_evidenceType`)
      .selectOption({ label: 'Statement of account' });
    await this.page
      .locator('#speclistYourEvidenceList_0_statementOfTruthEvidence')
      .fill('Test description of evidence.');
    await this.buttonHelper.continueButton.click();
  }

  async setClaimValue(track) {
    await this.buttonHelper.addNewButton.first().click();
    await this.page
      .locator('#claimAmountBreakup_0_claimReason')
      .fill('Test description of what the claimant(s) are claiming for.');

    let claimAmount = '0';

    if (track == claimTrack.INTERMEDIATE_CLAIM) {
      claimAmount = '75000';
    }

    if (claimAmount == '0') {
      switch (track) {
        case claimTrack.SMALL_CLAIM:
          claimAmount = '5000';
          break;
        case claimTrack.FAST_CLAIM:
          claimAmount = '20000';
          break;
        case claimTrack.MULTI_CLAIM:
          claimAmount = '50000';
          break;
      }
    }

    await this.page.locator('#claimAmountBreakup_0_claimAmount').fill(claimAmount);
    await this.buttonHelper.continueButton.click();
  }

  async setInterest(yesNo: YesNo = YesNo.NO) {
    await this.page.locator(`#claimInterest_${yesNo}`).check();
    await this.buttonHelper.continueButton.click();
  }

  async setInterestTypeAndRate(interestType: string = 'SAME_RATE_INTEREST', interestRate) {
    await this.page.locator(`#interestClaimOptions-${interestType}`).check();
    await this.buttonHelper.continueButton.click();

    if (interestType === 'SAME_RATE_INTEREST') {
      if (interestRate == '8') {
        await this.page
          .locator('#sameRateInterestSelection_sameRateInterestType-SAME_RATE_INTEREST_8_PC')
          .check();
      } else {
        await this.page
          .locator(
            '#sameRateInterestSelection_sameRateInterestType-SAME_RATE_INTEREST_DIFFERENT_RATE',
          )
          .check();
        await this.page.locator('#sameRateInterestSelection_differentRate').fill(interestRate);
        await this.page
          .locator('#sameRateInterestSelection_differentRateReason')
          .fill('Test description of why entitled to the interest rate amount.');
      }
      await this.buttonHelper.continueButton.click();
      await this.setInterestStartDate(YesNo.NO);
    } else {
      await this.page.locator('#breakDownInterestTotal').fill(interestRate);
      await this.page
        .locator('#breakDownInterestDescription')
        .fill('Description of how the amount was calculated');
      await this.buttonHelper.continueButton.click();
      await this.setInterestStartDate(YesNo.YES);
    }
  }

  async setInterestStartDate(specificDate: YesNo = YesNo.NO) {
    if (specificDate === YesNo.NO) {
      await this.page.locator('#interestClaimFrom-FROM_CLAIM_SUBMIT_DATE').check();
    } else {
      await this.page.locator('#interestClaimFrom-FROM_A_SPECIFIC_DATE').check();
      await this.buttonHelper.continueButton.click();
      await this.page
        .locator('#interestFromSpecificDate-day')
        .fill(this.monthAgo.date().toString());
      await this.page
        .locator('#interestFromSpecificDate-month')
        .fill((this.monthAgo.month() + 1).toString());
      await this.page
        .locator('#interestFromSpecificDate-year')
        .fill(this.monthAgo.year().toString());
      await this.page
        .locator('#interestFromSpecificDateDescription')
        .fill('Description of why claiming from this date.');
    }
    await this.buttonHelper.continueButton.click();
  }

  async setFixedCosts(yesNo: YesNo = YesNo.NO) {
    await this.page.locator(`#fixedCosts_claimFixedCosts_${yesNo}`).check();
    if (yesNo == YesNo.YES) {
      await this.page.locator('#fixedCosts_fixedCostAmount').fill('22500');
    }
    await this.buttonHelper.continueButton.click();
  }

  async setStatementOfTruth() {
    await this.page.locator('#uiStatementOfTruth_name').fill(legalRepresentatives.legalRepresentative1.firstName + ' ' + legalRepresentatives.legalRepresentative1.lastName);
    await this.page.locator('#uiStatementOfTruth_role').fill(legalRepresentatives.legalRepresentative1.role);
    await this.buttonHelper.continueButton.click();
  }
}
