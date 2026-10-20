import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import CCDCaseData from '../../../../models/ccd-case-data';
import ExuiPage from '../../mixin-pages/exui-page/exui-page';
import { subheadings, radioButtons } from './ga-with-or-without-notice-content';

@AllMethodsStep()
export default class GaWithOrWithoutNoticePage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(subheadings.informOtherParty),
      super.expectLabel(radioButtons.withNotice.yes.label),
      super.expectLabel(radioButtons.withNotice.no.label),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.withNotice.yes.selector);
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.withNotice.no.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
