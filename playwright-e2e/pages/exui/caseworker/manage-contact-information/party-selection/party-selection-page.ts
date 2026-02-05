import { Page } from '@playwright/test';
import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import { text, radioButtons } from './party-selection-content';
import { ClaimantDefendantPartyType } from '../../../../../models/claimant-defendant-party-types';
import partys from '../../../../../constants/partys';

@AllMethodsStep()
export default class PartySelectionPage extends ExuiPage(BasePage) {

  constructor(page: Page) {
    super(page);
  }

  async verifyContent(ccdCaseData: CCDCaseData, claimant1PartyType: ClaimantDefendantPartyType, defendant1PartyType: ClaimantDefendantPartyType) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),// Manage Contact Information // 1769-5957-6997-4443 // Claimant1 Individual v Defendant1 Company

      super.expectText(text.detailsUpdate), // Which details do you want to update?
      super.expectLabel(radioButtons.party.claimant1.label(partys.CLAIMANT_1, claimant1PartyType)), // CLAIMANT 1: Mx Claimant1 Individual
      super.expectLabel(radioButtons.party.claimant1LRIndividuals.label), // CLAIMANT 1: Individuals attending for the legal representative
      super.expectLabel(radioButtons.party.defendant1.label(partys.DEFENDANT_1, defendant1PartyType)), // DEFENDANT 1: Mx Defendant1 Company
      super.expectLabel(radioButtons.party.defendant1LRIndividuals.label), // DEFENDANT 1: Individuals attending for the legal representative
    ]);
  }

  async selectClaimant1() {
    await super.clickBySelector(radioButtons.party.claimant1.selector);
  }

  async selectClaimant1LRIndividuals() {
    await super.clickBySelector(radioButtons.party.claimant1LRIndividuals.selector);
  }

  async selectDefendant1() {
    await super.clickBySelector(radioButtons.party.defendant1.selector);
  }

  async selectDefendant1LRIndividuals() {
    await super.clickBySelector(radioButtons.party.defendant1LRIndividuals.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
