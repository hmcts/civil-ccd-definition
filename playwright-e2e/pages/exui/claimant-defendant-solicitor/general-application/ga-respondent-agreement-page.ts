import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import CCDCaseData from '../../../../models/ccd-case-data';
import ExuiPage from '../../mixin-pages/exui-page/exui-page';
import { subheadings, radioButtons } from './ga-respondent-agreement-content';

@AllMethodsStep()
export default class GaRespondentAgreementPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(subheadings.hasAgreed),
      super.expectLabel(radioButtons.hasAgreed.yes.label),
      super.expectLabel(radioButtons.hasAgreed.no.label),
    ]);
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.hasAgreed.no.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
