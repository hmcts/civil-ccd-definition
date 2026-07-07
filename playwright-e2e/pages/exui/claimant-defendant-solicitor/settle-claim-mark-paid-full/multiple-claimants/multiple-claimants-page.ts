import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd-case-data';
import ExuiPage from '../../../mixin-pages/exui-page/exui-page';
import { heading, radioButtons } from './multiple-claimants-content';

@AllMethodsStep()
export default class MultipleClaimantsPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectHeading(heading),
      super.expectLabel(radioButtons.relateToAllClaimants.yes.label),
      super.expectLabel(radioButtons.relateToAllClaimants.no.label),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.relateToAllClaimants.yes.selector);
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.relateToAllClaimants.no.selector);
    await super.clickByLabel(radioButtons.claimantRelatesTo.claimant2.label);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
