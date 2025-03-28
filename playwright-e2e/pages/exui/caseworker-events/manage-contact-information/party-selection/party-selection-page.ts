import BasePage from '../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import * as PartySelectionContent from './party-selection-content.ts';

// max combos of defendants and claimants is 2 v 2 (org, company, lr, individual, etc)

@AllMethodsStep()
export default class PartySelectionPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async selectParty(party: string) {
    const selector = `#partyChosen_${PartySelectionContent.PartyLabels[party]}`;
    console.log(`Selecting party: ${selector}`);

    await super.clickBySelector(selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
