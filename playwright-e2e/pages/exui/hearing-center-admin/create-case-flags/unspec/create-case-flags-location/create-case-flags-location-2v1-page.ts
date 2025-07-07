import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data';
import { ClaimantDefendantPartyType } from '../../../../../../models/claimant-defendant-party-types';
import ExuiPage from '../../../../exui-page/exui-page';
import { radioButtons } from './create-case-flags-location-content';

@AllMethodsStep()
export default class CreateCaseFlagsLocation2v1Page extends ExuiPage(BasePage) {
  async verifyContent(
    ccdCaseData: CCDCaseData,
    claimant1PartyType: ClaimantDefendantPartyType,
    claimant2PartyType: ClaimantDefendantPartyType,
    defendant1PartyType: ClaimantDefendantPartyType,
  ) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectLabel(radioButtons.caseLevel.label),
      super.expectLabel(radioButtons.claimant1.label(claimant1PartyType)),
      // super.expectLabel(
      //   radioButtons.claimant1LitigationFriend.label,
      // ),
      super.expectLabel(radioButtons.claimant2.label(claimant2PartyType)),
      // super.expectLabel(
      //   radioButtons.claimant2LitigationFriend.label,
      // ),
      super.expectLabel(radioButtons.defendant1.label(defendant1PartyType)),
      super.expectLabel(radioButtons.defendant1LitigationFriend.label),
      super.expectLabel(radioButtons.claimantExpert1.label),
      super.expectLabel(radioButtons.defendant1Expert1.label),
      super.expectLabel(radioButtons.claimantWitness1.label),
      super.expectLabel(radioButtons.defendant1Witness1.label),
    ]);
  }

  async selectCaseLevel() {
    await super.clickByLabel(radioButtons.caseLevel.label);
  }

  async selectClaimant1(claimant1PartyType: ClaimantDefendantPartyType) {
    await super.clickByLabel(radioButtons.claimant1.label(claimant1PartyType));
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
