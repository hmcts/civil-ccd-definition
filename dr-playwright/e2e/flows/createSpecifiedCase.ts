import { expect, Page } from '@playwright/test';
import { courts } from '../../fixtures/courts.ts';
import { ButtonHelper } from '../../helpers/ButtonHelper';
import ClaimType from '../../enums/claim-type.ts';
import ClaimantDefendantTypes from '../../enums/claimantDefendantTypes.ts';
import { partyDetails } from '../../fixtures/partyDetails.ts';
import { LinkHelper } from '../../helpers/LinkHelper.ts';
import YesNo from '../../enums/yesNo.ts';
import { legalRepresentatives } from '../../fixtures/legalRepresentatives.ts';
import claimantDefendantTypes from '../../enums/claimantDefendantTypes.ts';
import unspecClaimTypes from '../../enums/unspecClaimTypes.ts';
import personalInjuryTypes from '../../enums/personalInjuryTypes.ts';
import claimTrack from '../../enums/claim-track.ts';

export class CreateSpecifiedCase {
  private buttonHelper: ButtonHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
  }

  async setReferences(claimType: string = ClaimType.ONE_VS_ONE) {
    if (claimType === ClaimType.ONE_VS_ONE) {
      await this.page
        .locator('#solicitorReferences_applicantSolicitor1Reference')
        .fill('ApplicantSolicitorReference');
      await this.page
        .locator('#solicitorReferences_respondentSolicitor1Reference')
        .fill('RespondentSolicitor1Reference');
    }
    await this.buttonHelper.continueButton.click();
  }

  async setCourt(remoteHearing: string = 'No', court: string = 'clerkenwell') {
    await this.page
      .locator('#courtLocation_applicantPreferredCourtLocationList')
      .selectOption(courts.clerkenwell.longAddress);
    await this.page
      .locator('#courtLocation_reasonForHearingAtSpecificCourt')
      .fill('Test description for reasons');
    await this.page
      .locator(`#applicant1DQRemoteHearing_remoteHearingRequested_${remoteHearing}`)
      .check();

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

  async setClaimantLitigantFriend(yesNo: YesNo = YesNo.NO, claimantNumber: number = 1) {
    await this.page.locator(`#applicant${claimantNumber}LitigationFriendRequired_${yesNo}`).check();
    if (yesNo === YesNo.YES) {
      await this.page.locator(`#applicant${claimantNumber}LitigationFriend_firstName`).fill(partyDetails.claimantLitigantFriend1.firstname);
      await this.page.locator(`#applicant${claimantNumber}LitigationFriend_lastName`).fill(partyDetails.claimantLitigantFriend1.lastname);
      await this.page.locator(`#applicant${claimantNumber}LitigationFriend_emailAddress`).fill(partyDetails.claimantLitigantFriend1.email);
      await this.page.locator(`#applicant${claimantNumber}LitigationFriend_phoneNumber`).fill(partyDetails.claimantLitigantFriend1.phone);
      await this.page.locator(`#applicant${claimantNumber}LitigationFriend_hasSameAddressAsLitigant_${yesNo}`).check();

      await this.buttonHelper.addNewButton.click();
      await this.page.locator(`#applicant${claimantNumber}LitigationFriend_certificateOfSuitability_0_document`).setInputFiles('./dr-playwright/documents/TEST_DOCUMENT_1.pdf');
      await this.page.waitForSelector('.error-message', { state: 'hidden' });
    }

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

  async setDefendantType(defendantType: string = ClaimantDefendantTypes.INDIVIDUAL, defendantNumber: number = 1) {
    await this.page.locator(`#respondent${defendantNumber}_type-${defendantType}`).click();
    await this.page.locator(`#respondent${defendantNumber}_individualTitle`).fill(defendantNumber === 1 ? partyDetails.defendant1.title : partyDetails.defendant2.title);
    await this.page.locator(`#respondent${defendantNumber}_individualFirstName`).fill(defendantNumber === 1 ? partyDetails.defendant1.firstName : partyDetails.defendant2.firstName);
    await this.page.locator(`#respondent${defendantNumber}_individualLastName`).fill(defendantNumber === 1 ? partyDetails.defendant1.lastName : partyDetails.defendant2.lastName);
    await this.page.locator(`#respondent${defendantNumber}_partyEmail`).fill(defendantNumber === 1 ? partyDetails.defendant1.email : partyDetails.defendant2.email);
    await this.page.locator(`#respondent${defendantNumber}_partyPhone`).fill(defendantNumber === 1 ? partyDetails.defendant1.phone : partyDetails.defendant2.phone);

    if (defendantNumber === 1) {
      await new LinkHelper(this.page).manualAddressDefendant1.click();
    } else {
      await new LinkHelper(this.page).manualAddressDefendant2.click();
    }

    await this.page
      .locator(`#respondent${defendantNumber}_primaryAddress__detailAddressLine1`)
      .fill(defendantNumber === 1 ? partyDetails.defendant1.address.addressLine1 : partyDetails.defendant2.address.addressLine1);
    await this.page
      .locator(`#respondent${defendantNumber}_primaryAddress__detailPostTown`)
      .fill(defendantNumber === 1 ? partyDetails.defendant1.address.postTown : partyDetails.defendant2.address.postTown);
    await this.page
      .locator(`#respondent${defendantNumber}_primaryAddress__detailCountry`)
      .fill(defendantNumber === 1 ? partyDetails.defendant1.address.country : partyDetails.defendant2.address.country);
    await this.page
      .locator(`#respondent${defendantNumber}_primaryAddress__detailPostCode`)
      .fill(defendantNumber === 1 ? partyDetails.defendant1.address.postcode : partyDetails.defendant2.address.postcode);

    await this.buttonHelper.continueButton.click();
  }

  async setDefendantLegallyRepresented(yesNo: YesNo = YesNo.YES, defendantNumber: number = 1) {
    await this.page.locator(`#respondent${defendantNumber}Represented_${yesNo}`).click();
    await this.buttonHelper.continueButton.click();
  }

  //Eventually we will pass the org as parameter - will be cleaner
  async setDefendantSolicitorOrganisation(organisationName: string = 'Civil - Organisation 2') {
    await expect(this.page.locator('#search-org-text')).toBeVisible();
    await this.page.locator('#search-org-text').fill('civil');

    const child = this.page.getByText(organisationName);
    const parent = this.page.getByRole('table').filter({ has: child });
    await parent.getByRole('link').click();
    await expect(this.page.locator('#organisation-selected-table')).toBeVisible();

    await this.buttonHelper.continueButton.click();
  }

  async setDefendantServiceAddress(yesNo: YesNo = YesNo.NO) {
    await this.page.locator(`#respondentSolicitor1ServiceAddressRequired_${yesNo}`).check();
    await this.buttonHelper.continueButton.click();
  }

  async setDefendantLegalRepresentativeAddress(yesNo: YesNo = YesNo.NO, defendantNumber: number = 1) {
    await this.page.locator(`#respondentSolicitor${defendantNumber}ServiceAddressRequired_${yesNo}`).check();
    await this.buttonHelper.continueButton.click();
  }

  async setDefendantLegalRepresentativeEmail(defendantNumber: number = 1) {
    await this.page
      .locator(`#respondentSolicitor${defendantNumber}EmailAddress`)
      .fill(defendantNumber === 1 ? legalRepresentatives.legalRepresentative1.email : legalRepresentatives.legalRepresentative2.email);
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

  async setDefendant2LegalRepresentativeReference() {
    await this.page.locator('#respondentSolicitor2Reference').fill('RespondentSolicitor2Reference')
    await this.buttonHelper.continueButton.click();
  }

  async setTypeOfClaim(claimType?: string) {
    await this.page.locator(`#claimTypeUnSpec-${claimType}`).check();
    if (claimType == unspecClaimTypes.OTHER) {
      await this.page.locator(`#claimTypeOther`).fill('Type of claim - Other - test text.');
    }
    await this.buttonHelper.continueButton.click();
  }

  async setSubClaimType(subClaimType) {
    await this.page.locator(`#personalInjuryType-${subClaimType}`).check();
    if (subClaimType == personalInjuryTypes.PERSONAL_INJURY_OTHER) {
      await this.page.locator('#personalInjuryTypeOther').fill('Personal Injury - other test text.');
    }
    await this.buttonHelper.continueButton.click();
  }

  async setOtherRemedy(yesNo: YesNo = YesNo.YES) {
    await this.page.locator(`#isClaimDeclarationAdded_${yesNo}`).check();
    await this.page.locator('#claimDeclarationDescription').fill('Other remedy narrative text.');
    await this.buttonHelper.continueButton.click();
  }

  async setDescriptionOfClaim(typeOfClaim) {
    await this.page.locator('#detailsOfClaim').fill('Test description of claim');
    await this.buttonHelper.continueButton.click();
  }

  async setHumanRights(yesNo: YesNo = YesNo.YES) {
    await this.page.locator(`#isHumanRightsActIssues_${yesNo}`).check();
    await this.buttonHelper.continueButton.click();
  }

  async setUploadParticularsOfClaim(yesNo: YesNo = YesNo.NO) {
    await this.page.locator(`#uploadParticularsOfClaim_${yesNo}`).check();
    await this.buttonHelper.continueButton.click();
  }

  async setClaimValue(track, typeOfClaim) {
    let claimAmount = '0';

    if (track == claimTrack.INTERMEDIATE_CLAIM) {
      claimAmount = '75000';
    }

    if (typeOfClaim == unspecClaimTypes.PERSONAL_INJURY || typeOfClaim == unspecClaimTypes.CLINICAL_NEGLIGENCE) {
      if (track == claimTrack.SMALL_CLAIM) {
        claimAmount = '500';
      } else if (track == claimTrack.FAST_CLAIM) {
        claimAmount = '20000';
      } else if (track == claimTrack.MULTI_CLAIM) {
        claimAmount = '50000';
      }
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

    await this.page.locator('#claimValue_statementOfValueInPennies').fill(claimAmount);
    await this.buttonHelper.continueButton.click();
  }

  async setStatementOfTruth() {
    await this.page.locator('#uiStatementOfTruth_name').fill(legalRepresentatives.legalRepresentative1.firstName + ' ' + legalRepresentatives.legalRepresentative1.lastName);
    await this.page.locator('#uiStatementOfTruth_role').fill(legalRepresentatives.legalRepresentative1.role);
    await this.buttonHelper.continueButton.click();
  }

}
