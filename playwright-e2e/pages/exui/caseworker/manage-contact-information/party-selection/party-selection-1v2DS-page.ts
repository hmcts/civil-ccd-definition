import { Page } from '@playwright/test';
import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import { text, radioButtons } from './party-selection-content';
import { ClaimantDefendantPartyType } from '../../../../../models/claimant-defendant-party-types';
import partys from '../../../../../constants/partys';

@AllMethodsStep()
export default class PartySelection1v2DSPage extends ExuiPage(BasePage) {

  constructor(page: Page) {
    super(page);
  }

  async verifyContent(ccdCaseData: CCDCaseData, claimant1PartyType: ClaimantDefendantPartyType, defendant1PartyType: ClaimantDefendantPartyType, defendant2PartyType: ClaimantDefendantPartyType) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(text.detailsUpdate),

      super.expectLabel(radioButtons.party.claimant1.label(partys.CLAIMANT_1, claimant1PartyType)),
      super.expectLabel(radioButtons.party.claimant1LRIndividuals.label),
      super.expectLabel(radioButtons.party.claimant1Witnesses.label),
      super.expectLabel(radioButtons.party.claimant1Experts.label),

      super.expectLabel(radioButtons.party.defendant1.label(partys.DEFENDANT_1, defendant1PartyType)),
      super.expectLabel(radioButtons.party.defendant1LitigationFriend.label),
      super.expectLabel(radioButtons.party.defendant1LRIndividuals.label),
      super.expectLabel(radioButtons.party.defendant1Witnesses.label),
      super.expectLabel(radioButtons.party.defendant1Experts.label),

      super.expectLabel(radioButtons.party.defendant2.label(partys.DEFENDANT_2, defendant2PartyType)),
      super.expectLabel(radioButtons.party.defendant2LitigationFriend.label),
      super.expectLabel(radioButtons.party.defendant2LRIndividuals.label),
      super.expectLabel(radioButtons.party.defendant2Witnesses.label),
      super.expectLabel(radioButtons.party.defendant2Experts.label)
    ]);
  }

  async selectClaimant1() {
    await super.clickBySelector(radioButtons.party.claimant1.selector);
  }

  async selectClaimant1LRIndiv() {
    await super.clickBySelector(radioButtons.party.claimant1LRIndividuals.selector);
  }

  async selectClaimant1Witnesses() {
    await super.clickBySelector(radioButtons.party.claimant1Witnesses.selector);
  }

  async selectClaimant1Experts() {
    await super.clickBySelector(radioButtons.party.claimant1Experts.selector);
  }

  async selectDefendant1() {
    await super.clickBySelector(radioButtons.party.defendant1.selector);
  }

  async selectDefendant1LitigationFriend() {
    await super.clickBySelector(radioButtons.party.defendant1LitigationFriend.selector);
  }

  async selectDefendant1LRIndividuals() {
    await super.clickBySelector(radioButtons.party.defendant1LRIndividuals.selector);
  }

  async selectDefendant1Witnesses() {
    await super.clickBySelector(radioButtons.party.defendant1Witnesses.selector);
  }

  async selectDefendant1Experts() {
    await super.clickBySelector(radioButtons.party.defendant1Experts.selector);
  }

  async selectDefendant2() {
    await super.clickBySelector(radioButtons.party.defendant2.selector);
  }

  async selectDefendant2LitigationFriend() {
    await super.clickBySelector(radioButtons.party.defendant2LitigationFriend.selector);
  }

  async selectDefendant2LRIndividuals() {
    await super.clickBySelector(radioButtons.party.defendant2LRIndividuals.selector);
  }

  async selectDefendant1Expert() {
    await super.clickBySelector(radioButtons.party.defendant1Experts.selector);
  }

  async selectDefendant2Witnesses() {
    await super.clickBySelector(radioButtons.party.defendant2Witnesses.selector);
  }

  async selectDefendant2Experts() {
    await super.clickBySelector(radioButtons.party.defendant2Experts.selector);
  }


  async submit() {
    await super.retryClickSubmit();
  }
}
