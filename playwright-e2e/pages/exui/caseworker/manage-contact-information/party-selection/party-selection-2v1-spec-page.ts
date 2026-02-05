import { Page } from '@playwright/test';
import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import { text, radioButtons } from './party-selection-content';
import { ClaimantDefendantPartyType } from '../../../../../models/claimant-defendant-party-types';
import partys from '../../../../../constants/partys';

@AllMethodsStep()
export default class PartySelection2v1SpecPage extends ExuiPage(BasePage) {

  constructor(page: Page) {
    super(page);
  }

 async verifyContent(ccdCaseData: CCDCaseData, claimant1PartyType: ClaimantDefendantPartyType, claimant2PartyType: ClaimantDefendantPartyType, defendant1PartyType: ClaimantDefendantPartyType) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(text.detailsUpdate),

      super.expectLabel(radioButtons.party.claimant1.label(partys.CLAIMANT_1, claimant1PartyType)),
      super.expectLabel(radioButtons.party.claimant2.label(partys.CLAIMANT_2, claimant2PartyType)),
      super.expectLabel(radioButtons.party.claimantsLRIndividuals.label),
      super.expectLabel(radioButtons.party.claimantsWitnesses.label),
      super.expectLabel(radioButtons.party.claimantsExperts.label),

      super.expectLabel(radioButtons.party.defendant1.label(partys.DEFENDANT_1, defendant1PartyType)),
      super.expectLabel(radioButtons.party.defendant1OrganisationIndividuals.label),
      super.expectLabel(radioButtons.party.defendant1LRIndividuals.label),
      super.expectLabel(radioButtons.party.defendant1Witnesses.label),
      super.expectLabel(radioButtons.party.defendant1Experts.label),
    ]);
  }

  async selectClaimant1() {
    await super.clickBySelector(radioButtons.party.claimant1.selector);
  }

  async selectClaimant2() {
    await super.clickBySelector(radioButtons.party.claimant2.selector);
  }

  async selectClaimantsLRIndiv() {
    await super.clickBySelector(radioButtons.party.claimantsLRIndividuals.selector);
  }

  async selectClaimantsWitnesses() {
    await super.clickBySelector(radioButtons.party.claimantsWitnesses.selector);
  }

  async selectClaimantsExperts() {
    await super.clickBySelector(radioButtons.party.claimantsExperts.selector);
  }

  async selectDefendant1() {
    await super.clickBySelector(radioButtons.party.defendant1.selector);
  }

  async selectDefendant1OrgIndividuals() {
    await super.clickBySelector(radioButtons.party.defendant1OrganisationIndividuals.selector);
  }

  async selectDefendant1LRIndividuals() {
    await super.clickBySelector(radioButtons.party.defendant1LRIndividuals.selector);
  }

  async selectDefendant1Experts() {
    await super.clickBySelector(radioButtons.party.defendant1Experts.selector);
  }

  async selectDefendant1Witnesses() {
    await super.clickBySelector(radioButtons.party.defendant1Witnesses.selector);
  }


  async submit() {
    await super.retryClickSubmit();
  }
}
