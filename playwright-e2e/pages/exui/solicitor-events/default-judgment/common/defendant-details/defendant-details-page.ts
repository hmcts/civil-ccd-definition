import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
// import { radioButtons } from './defendant-details-content';
import { Party } from '../../../../../../models/partys';
import { ClaimantDefendantPartyType } from '../../../../../../models/claimant-defendant-party-types';

@AllMethodsStep()
export default class DefendantDetailsPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([super.verifyHeadings()]);
  }

  party: Party;
  partyType: ClaimantDefendantPartyType;

  async selectDefendant() {
    // const partyData = await CaseDataHelper.buildClaimantAndDefendantData(this.party, this.partyType);
    // const identifier = partyData.partyIdentifier;
    // const labelSelector = `label[for=${identifier}]`;
    // await super.clickByLabel(labelSelector);
  }

  async submit() {
    await super.clickSubmit();
  }
}
