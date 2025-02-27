import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import { radioButtons } from './fixed-costs-on-entry-content.ts';

@AllMethodsStep()
export default class FixedCostsOnEntryPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(radioButtons.claimFixedCosts.label),
    ]);
  }

  async selectYesClaimFixedCosts() {
    await super.clickBySelector(radioButtons.claimFixedCosts.yes.selector);
  }

  async selectNoClaimFixedCosts() {
    await super.clickBySelector(radioButtons.claimFixedCosts.no.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
