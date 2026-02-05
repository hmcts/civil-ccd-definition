import { Page } from '@playwright/test';
import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import { text, radioButtons } from './party-selection-content';
import { ClaimantDefendantPartyType } from '../../../../../models/claimant-defendant-party-types';
import partys from '../../../../../constants/partys';

@AllMethodsStep()
export default class PartySelection1v2SSSpecPage extends ExuiPage(BasePage) {

  constructor(page: Page) {
    super(page);
  }

  async verifyContent(ccdCaseData: CCDCaseData, claimant1PartyType: ClaimantDefendantPartyType, defendant1PartyType: ClaimantDefendantPartyType, defendant2PartyType: ClaimantDefendantPartyType) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(text.detailsUpdate),

      super.expectLabel(radioButtons.party.claimant1.label(partys.CLAIMANT_1, claimant1PartyType)),
      super.expectLabel(radioButtons.party.claimant1LRIndividuals.label),

      super.expectLabel(radioButtons.party.defendant1.label(partys.DEFENDANT_1, defendant1PartyType)),
      super.expectLabel(radioButtons.party.defendant1OrganisationIndividuals.label),

      super.expectLabel(radioButtons.party.defendant2.label(partys.DEFENDANT_2, defendant2PartyType)),
      super.expectLabel(radioButtons.party.defendant2LRIndividuals.label),
      super.expectLabel(radioButtons.party.defendantsWitnesses.label),
      super.expectLabel(radioButtons.party.defendantsExperts.label),
    ]);
  }

  async selectClaimant1() {
    await super.clickBySelector(radioButtons.party.claimant1.selector);
  }

  async selectClaimant1LRIndiv() {
    await super.clickBySelector(radioButtons.party.claimant1LRIndividuals.selector);
  }

  async selectDefendant1() {
    await super.clickBySelector(radioButtons.party.defendant1.selector);
  }

  async selectDefendant1OrgIndividuals() {
    await super.clickBySelector(radioButtons.party.defendant1OrganisationIndividuals.selector);
  }

  async selectDefendant2() {
    await super.clickBySelector(radioButtons.party.defendant2.selector);
  }

  async selectDefendant2LRIndividuals() {
    await super.clickBySelector(radioButtons.party.defendant2LRIndividuals.selector);
  }

  async selectDefendantsWitnesses() {
    await super.clickBySelector(radioButtons.party.defendantsWitnesses.selector);
  }

  async selectDefendantsExperts() {
    await super.clickBySelector(radioButtons.party.defendantsExperts.selector);
  }



  async submit() {
    await super.retryClickSubmit();
  }
}
