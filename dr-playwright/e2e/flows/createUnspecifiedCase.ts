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

export class CreateUnspecifiedCase {
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
      await this.page
        .locator(`#applicant${claimantNumber}LitigationFriend_firstName`)
        .fill(partyDetails.claimantLitigantFriend1.firstname);
      await this.page
        .locator(`#applicant${claimantNumber}LitigationFriend_lastName`)
        .fill(partyDetails.claimantLitigantFriend1.lastname);
      await this.page
        .locator(`#applicant${claimantNumber}LitigationFriend_emailAddress`)
        .fill(partyDetails.claimantLitigantFriend1.email);
      await this.page
        .locator(`#applicant${claimantNumber}LitigationFriend_phoneNumber`)
        .fill(partyDetails.claimantLitigantFriend1.phone);
      await this.page
        .locator(`#applicant${claimantNumber}LitigationFriend_hasSameAddressAsLitigant_${yesNo}`)
        .check();

      await this.buttonHelper.addNewButton.click();
      await this.page
        .locator(`#applicant${claimantNumber}LitigationFriend_certificateOfSuitability_0_document`)
        .setInputFiles('./dr-playwright/documents/TEST_DOCUMENT_1.pdf');
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
    await this.page
      .locator(`#respondent${defendantNumber}_individualFirstName`)
      .fill(defendantNumber === 1 ? partyDetails.defendant1.firstName : partyDetails.defendant2.firstName);
    await this.page
      .locator(`#respondent${defendantNumber}_individualLastName`)
      .fill(defendantNumber === 1 ? partyDetails.defendant1.lastName: partyDetails.defendant2.lastName);
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

  async setDescriptionOfClaim() {
    await this.page.locator('#detailsOfClaim').fill('Test description of claim');
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

    if (typeOfClaim == unspecClaimTypes.CLINICAL_NEGLIGENCE) {
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
    await this.page
      .locator('#uiStatementOfTruth_name')
      .fill(
        legalRepresentatives.legalRepresentative1.firstName +
          ' ' +
          legalRepresentatives.legalRepresentative1.lastName,
      );
    await this.page
      .locator('#uiStatementOfTruth_role')
      .fill(legalRepresentatives.legalRepresentative1.role);
    await this.buttonHelper.continueButton.click();
  }

  // setTribunalAppealReceived() - Legal Admin Journey
  //    async setTribunalAppealReceived() {
  //         const yesterday = moment().subtract(1, 'days');
  //
  //         await this.page.fill('#tribunalReceivedDate-day', yesterday.date().toString());
  //         await this.page.fill('#tribunalReceivedDate-month', (yesterday.month()+1).toString());
  //         await this.page.fill('#tribunalReceivedDate-year', yesterday.year().toString());
  //         // due to the auto-validation firing - the error message does not disappear until we physically move off of the last field
  //         // if we just try and click continue it stays on the tribunal page and the test fails - only happens in ICC
  //         await this.page.keyboard.press('Tab');
  //         await this.page.waitForSelector('.error-message', { state: 'hidden' });
  //         await this.buttonHelper.continueButton.click();
  //    }
  //
  //    // appellantInPerson() - Legal Admin Journey
  //    async appellantInPerson(yesNo: string = 'Yes', hasPostalAddress: string = 'Yes') {
  //         await this.page.check(`#appellantsRepresentation-${yesNo}`);
  //         if (yesNo === 'No') {
  //             await this.buttonHelper.continueButton.click();
  //             await this.page.fill('#appealWasNotSubmittedReason', 'Reason why appeal was not submitted on MyHMCTS');
  //
  //             await this.page.locator('button:text("Add new")').click();
  //             await this.page.locator('#appealNotSubmittedReasonDocuments_0_document').setInputFiles('./tests/documents/TEST_DOCUMENT_1.pdf');
  //             await this.page.fill('#appealNotSubmittedReasonDocuments_0_description', 'Supporting document test');
  //             await this.page.waitForSelector('.error-message', { state: 'hidden' });
  //             await this.buttonHelper.continueButton.click();
  //
  //             await this.page.fill('#legalRepCompanyPaperJ', legalRepresentative.company);
  //             await this.page.fill('#legalRepGivenName', legalRepresentative.name);
  //             await this.page.fill('#legalRepFamilyNamePaperJ', legalRepresentative.familyName);
  //             await this.page.fill('#legalRepEmail', legalRepresentative.email);
  //             await this.page.fill('#legalRepRefNumberPaperJ', legalRepresentative.reference);
  //             await this.buttonHelper.continueButton.click();
  //
  //             await this.page.check(`#legalRepHasAddress_${hasPostalAddress}`);
  //             await this.page.fill('#legalRepAddressUK_legalRepAddressUK_postcodeInput',  legalRepresentative.address.postcode);
  //             await this.page.click('//button[contains(text(), "Find address")]');
  //             await this.page.selectOption('#legalRepAddressUK_legalRepAddressUK_addressList', legalRepresentative.address.addressLine1 + ', ' + legalRepresentative.address.postTown); // First valid address
  //             await this.buttonHelper.continueButton.click();
  //         } else {
  //             await this.buttonHelper.continueButton.click();
  //         }
  //    }
  //
  //    async locationInUK(yesNo: string = 'Yes') {
  //       await this.page.check(`#appellantInUk_${yesNo}`);
  //       await this.buttonHelper.continueButton.click();
  //    }
  //
  //    //Out of country flow
  //     async outOfCountryDecision(appealDecision: string = 'refusalOfHumanRights', inTime: boolean = true): Promise<void> {
  //         const { page } = this;
  //         const inOutOfTimeDate = inTime
  //             ? moment().subtract(5, 'days')
  //             : moment().subtract(2, 'months');
  //         let currentUrl: string;
  //
  //         switch (appealDecision) {
  //             case 'refusalOfHumanRights':
  //                 await page.locator('#outOfCountryDecisionType-refusalOfHumanRights').click();
  //                 await this.buttonHelper.continueButton.click();
  //                 await this.page.waitForTimeout(2000);
  //                 currentUrl = page.url();
  //                 if (currentUrl.includes('startAppealentryClearanceDecision')) {
  //                     await page.locator('#gwfReferenceNumber').fill('123456789');
  //                     await page.locator('#dateEntryClearanceDecision-day').fill(inOutOfTimeDate.date().toString());
  //                     await page.locator('#dateEntryClearanceDecision-month').fill((inOutOfTimeDate.month() + 1).toString());
  //                     await page.locator('#dateEntryClearanceDecision-year').fill(inOutOfTimeDate.year().toString());
  //                     await this.buttonHelper.continueButton.click();
  //                 }
  //                 break;
  //             case 'refusalOfProtection':
  //                 await page.locator('#outOfCountryDecisionType-refusalOfProtection').click();
  //                 await this.buttonHelper.continueButton.click();
  //                 await this.page.waitForTimeout(2000);
  //                 currentUrl = page.url();
  //                 if (currentUrl.includes('startAppealdepartureDate')) {
  //                     await page.locator('#dateClientLeaveUk-day').fill(inOutOfTimeDate.date().toString());
  //                     await page.locator('#dateClientLeaveUk-month').fill((inOutOfTimeDate.month() + 1).toString());
  //                     await page.locator('#dateClientLeaveUk-year').fill(inOutOfTimeDate.year().toString());
  //                     // due to the auto-validation firing - the error message does not disappear until we physically move off of the last field
  //                     // if we just try and click continue it stays on the tribunal page and the test fails - only happens in ICC
  //                     await this.page.keyboard.press('Tab');
  //                     await this.buttonHelper.continueButton.click();
  //                     await this.setHomeOfficeDetails(inTime, 'decisionLetterReceivedDate');
  //                 }
  //                 break;
  //             case 'removalOfClient':
  //                 await page.locator('#outOfCountryDecisionType-removalOfClient').click();
  //                 await this.buttonHelper.continueButton.click();
  //                 await this.page.waitForTimeout(2000);
  //                 currentUrl = page.url();
  //                 if (currentUrl.includes('startAppealhomeOfficeDecision')) {
  //                     await this.setHomeOfficeDetails(inTime, 'decisionLetterReceivedDate');
  //                     await this.buttonHelper.continueButton.click();
  //                 }
  //                 break;
  //             case 'refusePermit':
  //                 await page.locator('#outOfCountryDecisionType-refusePermit').click();
  //                 await this.buttonHelper.continueButton.click();
  //                 await this.page.waitForTimeout(2000);
  //                 currentUrl = page.url();
  //                 if (currentUrl.includes('startAppealentryClearanceDecision')) {
  //                     await this.setEntryClearanceDecisionDate(inTime);
  //                 }
  //                 break;
  //         }
  //     }
  //
  //    // non-detained ICC
  //    async setOutOfCountryCircumstance(circumstance:string = 'entryClearanceDecision') {
  //        await this.page.locator(`#oocAppealAdminJ-${circumstance}`).check();
  //        await this.buttonHelper.continueButton.click();
  //    }
  //
  //    async setEntryClearanceDecisionDate(inTime: boolean = true) {
  //        const inOutOfTimeDate = inTime
  //            ? moment().subtract(5, 'days')
  //            : moment().subtract(2, 'months');
  //        await this.page.locator('#dateEntryClearanceDecision-day').fill(inOutOfTimeDate.date().toString());
  //        await this.page.locator('#dateEntryClearanceDecision-month').fill((inOutOfTimeDate.month() + 1).toString());
  //        await this.page.locator('#dateEntryClearanceDecision-year').fill(inOutOfTimeDate.year().toString());
  //        // due to the auto-validation firing - the error message does not disappear until we physically move off of the last field
  //        // if we just try and click continue it stays on the clearance decision page and the test fails - only happens in ICC
  //        await this.page.keyboard.press('Tab');
  //        await this.buttonHelper.continueButton.click();
  //    }
  //
  //    async inDetention(yesNo: string = 'Yes') {
  //       await this.page.check(`#appellantInDetention_${yesNo}`);
  //       await this.buttonHelper.continueButton.click();
  //    }
  //
  //    async setDetentionLocation(detentionLocation: string = 'immigrationRemovalCentre') {
  //      switch (detentionLocation) {
  //        case 'immigrationRemovalCentre':
  //            await this.page.check(`#detentionFacility-${detentionLocation}`);
  //            await this.buttonHelper.continueButton.click();
  //            await this.setDetentionCentre();
  //            break;
  //        case 'prison':
  //            await this.page.check(`#detentionFacility-${detentionLocation}`);
  //            await this.page.fill('#prisonNOMSNumber_prison', appellant.NOMSNumber);
  //            await this.buttonHelper.continueButton.click();
  //
  //            await this.page.selectOption('#prisonName', detentionFacility.prison.name);
  //            await this.buttonHelper.continueButton.click();
  //            break;
  //        case 'other':
  //            await this.page.check(`#detentionFacility-${detentionLocation}`);
  //            await this.page.fill('#otherDetentionFacilityName_other', detentionFacility.other.name);
  //            await this.buttonHelper.continueButton.click();
  //            break;
  //      }
  //    }
  //
  //     async setDetentionCentre() {
  //       await this.page.selectOption('#ircName', detentionFacility.immigrationRemovalCentre.name);
  //       await this.buttonHelper.continueButton.click();
  //    }
  //
  //    async setCustodialSentence(hasCustodialSentence: string = 'Yes') {
  //        await this.page.check(`#releaseDateProvided_${hasCustodialSentence}`);
  //
  //        if (hasCustodialSentence === 'Yes') {
  //            await this.page.fill('#releaseDate-day', appellant.custodialSentence.day.toString());
  //            await this.page.fill('#releaseDate-month', appellant.custodialSentence.month.toString());
  //            await this.page.fill('#releaseDate-year', appellant.custodialSentence.year.toString());
  //        }
  //        // due to the auto-validation firing - the error message does not disappear until we physically move off of the last field
  //        // if we just try and click continue it stays on the Custodial Sentence page and the test fails - only happens in ICC
  //        await this.page.keyboard.press('Tab');
  //        await this.buttonHelper.continueButton.click();
  //    }
  //
  //    async setBailApplication(bail: string = "No") {
  //        await this.page.check(`#hasPendingBailApplications-${bail}`);
  //        if (bail === 'Yes') {
  //            await this.page.fill('#bailApplicationNumber', appellant.bailApplicationNumber);
  //        }
  //        await this.buttonHelper.continueButton.click();
  //    }
  //
  //     async setHomeOfficeReferenceNumber(outOfCountry: boolean = false) {
  //         if (outOfCountry) {
  //             await this.page.fill('#gwfReferenceNumber','12345');
  //         } else {
  //             await this.page.fill('#homeOfficeReferenceNumber', '12345');
  //         }
  //
  //
  //         // due to the auto-validation firing - the error message does not disappear until we physically move off of the last field
  //         // if we just try and click continue it stays on the tribunal page and the test fails - only happens in ICC
  //         await this.page.keyboard.press('Tab');
  //         await this.page.waitForSelector('.error-message', { state: 'hidden' });
  //         await this.buttonHelper.continueButton.click();
  //     }
  //
  // // To be removed - still used in non-detained flows - they need updating
  //     async setHomeOfficeDetails(inTime: boolean = true, fieldPrefix: string = 'homeOfficeDecisionDate') {
  //         const homeOfficeLetterDate = inTime ? moment().subtract(5, 'days') : moment().subtract(20, 'days');
  //         await this.page.fill('#homeOfficeReferenceNumber', '12345');
  //         await this.page.fill(`#${fieldPrefix}-day`, homeOfficeLetterDate.date().toString());
  //         await this.page.fill(`#${fieldPrefix}-month`, (homeOfficeLetterDate.month() + 1).toString());
  //         await this.page.fill(`#${fieldPrefix}-year`, homeOfficeLetterDate.year().toString());
  //         // due to the auto-validation firing - the error message does not disappear until we physically move off of the last field
  //         // if we just try and click continue it stays on the tribunal page and the test fails - only happens in ICC
  //         await this.page.keyboard.press('Tab');
  //         await this.page.waitForSelector('.error-message', { state: 'hidden' });
  //         await this.buttonHelper.continueButton.click();
  //     }
  //
  //     async setHomeOfficeDecisionDate(inTime: boolean = true, fieldPrefix: string = 'homeOfficeDecisionDate') {
  //         const homeOfficeLetterDate = inTime ? moment().subtract(5, 'days') : moment().subtract(20, 'days');
  //         await this.page.fill(`#${fieldPrefix}-day`, homeOfficeLetterDate.date().toString());
  //         await this.page.fill(`#${fieldPrefix}-month`, (homeOfficeLetterDate.month() + 1).toString());
  //         await this.page.fill(`#${fieldPrefix}-year`, homeOfficeLetterDate.year().toString());
  //         // due to the auto-validation firing - the error message does not disappear until we physically move off of the last field
  //         // if we just try and click continue it stays on the tribunal page and the test fails - only happens in ICC
  //         await this.page.keyboard.press('Tab');
  //         await this.page.waitForSelector('.error-message', { state: 'hidden' });
  //         await this.buttonHelper.continueButton.click();
  //     }
  //
  //    async uploadNoticeOfDecision(documentType: string = 'TheNoticeOfDecisionDocs') {
  //         if (documentType === 'TheNoticeOfDecisionDocs') {
  //             await this.page.locator('#uploadTheNoticeOfDecisionDocs').getByText('Add new').click();
  //         } else {
  //             await this.page.locator('//*[@id="uploadRehydratedNod"]/div/button').click();
  //         }
  //
  //        // getting rate cap error message - waiting for 2 secs to stop this happening - will rewrite with hardcoded wait
  //         await this.page.waitForTimeout(2000); // waits for 2 seconds
  //         await this.page.locator(`#upload${documentType}_0_document`).setInputFiles('./tests/documents/TEST_DOCUMENT_1.pdf');
  //         await this.page.fill(`#upload${documentType}_0_description`, 'Test Notice of Decision document.');
  //         await this.page.waitForSelector('.error-message', { state: 'hidden' });
  //         await this.buttonHelper.continueButton.click();
  //     }
  //
  //    async setTypeOfAppeal(appealType: string = 'refusalOfEu') {
  //        await this.page.check(`#appealType-${appealType}`);
  //        await this.buttonHelper.continueButton.click();
  //    }
  //
  //    async setGroundsOfAppeal(appealType: string = 'refusalOfEu') {
  //         switch (appealType) {
  //             case 'refusalOfEu':
  //                 await this.page.check('#appealGroundsEuRefusal_values-appealGroundsEuRefusal');
  //                 break;
  //             case 'revocationOfProtection':
  //                 await this.page.check('#appealGroundsRevocation_values-revocationHumanitarianProtection');
  //                 break;
  //             case 'refusalOfHumanRights':
  //                 await this.page.check('#appealGroundsDecisionHumanRightsRefusal_values-humanRightsRefusal');
  //                 break;
  //             case 'deprivation':
  //                 await this.page.check('#appealGroundsDeprivation_values-disproportionateDeprivation');
  //                 break;
  //             case 'protection':
  //                 await this.page.check('#appealGroundsProtection_values-protectionHumanitarianProtection');
  //                 break;
  //            }
  //        await this.buttonHelper.continueButton.click();
  //    }
  //
  //
  //    // appellantDetails() - Legal Admin journey only
  //    async setAppellantContactDetails() {
  //        await this.page.fill('#internalAppellantMobileNumber', appellant.mobile);
  //        await this.page.fill('#internalAppellantEmail', appellant.email);
  //        await this.buttonHelper.continueButton.click();
  //    }
  //
  //    // appellant contact preference: non-detained journey only
  //    async setAppellantContactPreference(preference: 'Email' | 'Text') {
  //        await this.page.check(`#contactPreference-wants${preference}`);
  //        if (preference === 'Email') {
  //            await this.page.fill('#email', appellant.email);
  //        } else {
  //            await this.page.fill('#mobileNumber', appellant.mobile);
  //        }
  //
  //        await this.buttonHelper.continueButton.click();
  //
  //    }
  //
  //    async setAppellantAddressOutsideUK(hasPostalAddress: string = 'Yes') {
  //        await this.page.check(`#appellantHasFixedAddressAdminJ_${hasPostalAddress}`);
  //        await this.page.fill('#addressLine1AdminJ', appellant.outsideUKAddress.addressLine1);
  //        await this.page.fill('#addressLine2AdminJ', appellant.outsideUKAddress.addressLine2);
  //        await this.page.fill('#addressLine3AdminJ', appellant.outsideUKAddress.addressLine3);
  //        await this.page.fill('#addressLine4AdminJ', appellant.outsideUKAddress.addressLine4);
  //        await this.page.selectOption('#countryGovUkOocAdminJ',appellant.outsideUKAddress.country);
  //
  //        await this.buttonHelper.continueButton.click();
  //    }
  //
  //    // appellant address: non-detained journey and detained journey where facility is "Other"
  //    async setAppellantAddress(journeyType: string = "detained", hasPostalAddress: string = 'Yes') {
  //         if (journeyType !== 'detained') {
  //            await this.page.check(`#appellantHasFixedAddress_${hasPostalAddress}`);
  //        }
  //
  //        if (hasPostalAddress === 'Yes') {
  //            await this.page.getByText("I can't enter a UK postcode").click();
  //            await this.page.fill('#appellantAddress__detailAddressLine1', appellant.address.addressLine1);
  //            await this.page.fill('#appellantAddress__detailPostTown', appellant.address.postTown);
  //            await this.page.fill('#appellantAddress__detailPostCode', appellant.address.postcode);
  //            await this.page.fill('#appellantAddress__detailCountry', appellant.address.country);
  //        }
  //        await this.buttonHelper.continueButton.click();
  //    }
  //
  //     async setOutOfCountryAddress(hasAddress: 'Yes' | 'No' = 'Yes') {
  //         await this.page.locator(`#hasCorrespondenceAddress_${hasAddress}`).click();
  //         if (hasAddress === 'Yes') {
  //             await this.page.locator('#appellantOutOfCountryAddress').fill(outOfCountryAddress);
  //         }
  //         await this.buttonHelper.continueButton.click();
  //     }
  //
  //    async groundsOfAppeal() {
  //        await this.page.click('#appealGroundsEuRefusal_values-appealGroundsEuRefusal');
  //        await this.buttonHelper.continueButton.click();
  //    }
  //
  //    async setAppellantBasicDetails(minimalBasicDetails: boolean = false) {
  //        if (!minimalBasicDetails) {
  //            await this.page.fill('#appellantTitle', appellant.title);
  //        }
  //        await this.page.fill('#appellantGivenNames', appellant.givenNames);
  //        await this.page.fill('#appellantFamilyName', appellant.familyName);
  //        await this.page.fill('#appellantDateOfBirth-day', appellant.dob.day.toString());
  //        await this.page.fill('#appellantDateOfBirth-month', appellant.dob.month.toString());
  //        await this.page.fill('#appellantDateOfBirth-year', appellant.dob.year.toString());
  //        // due to the auto-validation firing - the error message does not disappear until we physically move off of the last field
  //        // if we just try and click continue it stays on the Appellant details page and the test fails
  //        await this.page.keyboard.press('Tab');
  //        await this.page.waitForSelector('.error-message', { state: 'hidden' });
  //        await this.buttonHelper.continueButton.click();
  //    }
  //
  //    async setNationality(hasNationality: boolean = true){
  //        if (hasNationality){
  //            await this.page.check('#appellantStateless-hasNationality');
  //            await this.page.click('button:text("Add new")');
  //            await this.page.selectOption('#appellantNationalities_0_code', 'Finland');
  //        } else {
  //            await this.page.check('#appellantStateless-hasNationality');
  //        }
  //        await this.buttonHelper.continueButton.click();
  //    }
  //
  //     async hasSponsor(isSponsored: string = 'No', sponsorComms: string = 'email', sponsorAuthorised: string = 'Yes'){
  //        await this.page.click(`#hasSponsor_${isSponsored}`);
  //        await this.buttonHelper.continueButton.click();
  //
  //        if (isSponsored === 'Yes') {
  //            await this.setSponsor(sponsorComms, sponsorAuthorised);
  //        }
  //    }
  //
  //    async setSponsor(emailSms: string, authorisation: string) {
  //        await this.page.fill('#sponsorGivenNames', sponsor.givenNames);
  //        await this.page.fill('#sponsorFamilyName', sponsor.familyName);
  //        await this.buttonHelper.continueButton.click();
  //        await this.page.getByText("I can't enter a UK postcode").click();
  //        await this.page.fill('#sponsorAddress__detailAddressLine1', sponsor.address.addressLine1);
  //        await this.page.fill('#sponsorAddress__detailPostTown', sponsor.address.postTown);
  //        await this.page.fill('#sponsorAddress__detailPostCode', sponsor.address.postcode);
  //        await this.page.fill('#sponsorAddress__detailCountry', sponsor.address.country);
  //        await this.buttonHelper.continueButton.click();
  //
  //        if (emailSms === 'email') {
  //            await this.page.check('#sponsorContactPreference-wantsEmail');
  //            await this.page.fill('#sponsorEmail', sponsor.email);
  //        } else {
  //            await this.page.check('#sponsorContactPreference-wantsSms');
  //            await this.page.fill('#sponsorMobileNumber', sponsor.mobile);
  //        }
  //        await this.buttonHelper.continueButton.click();
  //        await this.page.check(`#sponsorAuthorisation_${authorisation}`);
  //        await this.buttonHelper.continueButton.click();
  //    }
  //
  //    async hasDeportationOrder(hasDeportOrder: string = 'No') {
  //        await this.page.check(`#deportationOrderOptions_${hasDeportOrder}`);
  //        await this.buttonHelper.continueButton.click();
  //    }
  //
  //    async hasRemovalDirections(hasRemovalOrder: string = 'No') {
  //        await this.page.check(`#removalOrderOptions_${hasRemovalOrder}`);
  //
  //        if (hasRemovalOrder === 'Yes') {
  //            await this.page.fill('#removalOrderDate-day', appellant.removalDirections.date.day.toString());
  //            await this.page.fill('#removalOrderDate-month', appellant.removalDirections.date.month.toString());
  //            await this.page.fill('#removalOrderDate-year', appellant.removalDirections.date.year.toString());
  //            await this.page.fill('#removalOrderDate-hour', appellant.removalDirections.time.hour24.toString());
  //            await this.page.fill('#removalOrderDate-minute', appellant.removalDirections.time.minutesWithLeadingZero.toString());
  //            await this.page.fill('#removalOrderDate-second', appellant.removalDirections.time.secondsWithLeadingZero.toString());
  //        }
  //
  //        await this.buttonHelper.continueButton.click();
  //    }
  //
  //    // uploadAppealDocs() - For Legal Admin journey
  //    async uploadAppealDocs() {
  //        await this.page.locator('button:text("Add new")').click();
  //        // getting rate cap error message - waiting for 4 secs to stop this happening
  //        await this.page.waitForTimeout(4000); // waits for 4 seconds
  //        await this.page.locator('#uploadTheAppealFormDocs_0_document').setInputFiles('./tests/documents/TEST_DOCUMENT_2.pdf');
  //        await this.page.fill('#uploadTheAppealFormDocs_0_description', 'Test Notice of Decision document.');
  //        await this.page.waitForSelector('.error-message', { state: 'hidden' });
  //        await this.buttonHelper.continueButton.click();
  //    }
  //
  //    async hasNewMatters(hasMatters: string = 'No') {
  //        await this.page.check(`#hasNewMatters_${hasMatters}`);
  //
  //        if (hasMatters === 'Yes') {
  //            await this.page.fill('#newMatters', 'New matters test text.');
  //        }
  //
  //        await this.buttonHelper.continueButton.click();
  //    }
  //
  //    async hasOtherAppeals(otherAppeals: string = 'No') {
  //        await this.page.check(`#hasOtherAppeals-${otherAppeals}`);
  //
  //        if (otherAppeals != 'No') {
  //        // TODO: Needs other options added
  //        }
  //
  //        await this.buttonHelper.continueButton.click();
  //    }
  //
  //    async setLegalRepresentativeDetails() {
  //        await this.page.fill('#legalRepCompany', legalRepresentative.company);
  //        await this.page.fill('#legalRepName', legalRepresentative.name);
  //        await this.page.fill('#legalRepFamilyName', legalRepresentative.familyName);
  //        await this.page.fill('#legalRepMobilePhoneNumber', legalRepresentative.mobile);
  //        await this.page.fill('#legalRepReferenceNumber', legalRepresentative.reference);
  //        await this.buttonHelper.continueButton.click();
  //    }
  //
  //    async isHearingRequired(hearingRequired: boolean = true) {
  //        if (hearingRequired) {
  //            await this.page.check("//input[contains(@id,'decisionWithHearing')]")
  //        } else {
  //            await this.page.check("//input[contains(@id,decisionWithoutHearing')]")
  //        }
  //
  //        await this.buttonHelper.continueButton.click();
  //    }
  //
  //    async hasFeeRemission(feeRemission: string = 'No') {
  //        switch (feeRemission) {
  //            case 'No':
  //                await this.page.check('#remissionType-noRemission');
  //                break;
  //            case 'Yes':
  //                await this.page.check('#remissionType-hoWaiverRemission');
  //                await this.buttonHelper.continueButton.click();
  //                await this.page.check('#remissionClaim-section20');
  //                await this.buttonHelper.continueButton.click();
  //
  //                // getting rate cap error message - waiting for 2 secs to stop this happening - will rewrite to not use hardcoded timeout
  //                await this.page.waitForTimeout(2000); // waits for 2 seconds
  //                await this.page.locator('#section20Document').setInputFiles('./tests/documents/TEST_DOCUMENT_1.pdf');
  //                await this.page.waitForSelector('.error-message', { state: 'hidden' });
  //        }
  //
  //        await this.buttonHelper.continueButton.click();
  //    }
  //
  //    // Only valid for appeal type: Refusal of protection claim
  //    async setPayNowLater(nowLater: string = 'Now') {
  //        await this.page.check(`#paAppealTypePaymentOption-pay${nowLater}`);
  //        await this.buttonHelper.continueButton.click();
  //    }
  //
  //    async checkMyAnswers(skipCloseAndReturnCheck:boolean = false) {
  //         await this.buttonHelper.continueButton.click();
  //        if (!skipCloseAndReturnCheck || (skipCloseAndReturnCheck && !['preview', 'aat'].includes(runningEnv))) {
  //            await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  //        }
  //    }
  //
  //    // Rehydrate flow for Legal Admin
  //    async setSourceOfAppeal(source: string = 'paperForm') {
  //         await this.page.check(`#sourceOfAppeal-${source}`);
  //         await this.buttonHelper.continueButton.click();
  //    }
  //
  //     // Rehydrate flow for Legal Admin
  //     async setAriaReferenceNumber(storageStateFile?: string ) {
  //         // Before we enter the ARIA ref number into the field on the page we need to check the ARIA ref number
  //         // has not already been used as it is not possible to regenerate and check the validity of the ref number from the UI as
  //         // would need to hardcode waits.  The best way is to send the ref number to CCD (API) and see if we get a message back with an
  //         // error pertaining that the ref number is already in use.  In this case we generate a new and validate again until we get
  //         // a ref number that has not been used already.
  //         // If the return message is SUCCESS then we can use this ref number in the page and continue the journey
  //
  //         const eventName: string = 'startAppeal';
  //
  //         await this.ccdApiHelper.getNonEventTokens(legalOfficerAdminCredentials);
  //         await this.ccdApiHelper.startEvent(eventName, null);
  //
  //         let ariaRefNumber: string = await this.ccdApiHelper.getAriaReferenceNumber(eventName);
  //         await this.page.fill('#appealReferenceNumber', ariaRefNumber);
  //         await this.buttonHelper.continueButton.click();
  //     }
  //
  //     // Rehydrate flow for Legal Admin
  //     async isAppealOutOfTime(outOfTime: string = 'No') {
  //         await this.page.check(`#submissionOutOfTime_${outOfTime}`);
  //         await this.buttonHelper.continueButton.click();
  //     }
}
