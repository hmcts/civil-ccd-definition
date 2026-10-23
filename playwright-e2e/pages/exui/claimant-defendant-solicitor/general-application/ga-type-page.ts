import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import CCDCaseData from '../../../../models/ccd-case-data';
import ExuiPage from '../../mixin-pages/exui-page/exui-page';
import { inputs } from './ga-type-content';

@AllMethodsStep()
export default class GaTypePage extends ExuiPage(BasePage) {

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectLabel(inputs.adjournAHearing.label),
      super.expectLabel(inputs.amendAStatementOfCase.label),
      super.expectLabel(inputs.extendTime.label),
      super.expectLabel(inputs.reliefFromSanctions.label),
      super.expectLabel(inputs.setAsideJudgment.label),
      super.expectLabel(inputs.settleByConsent.label),
      super.expectLabel(inputs.stayTheClaim.label),
      super.expectLabel(inputs.strikeOut.label),
      super.expectLabel(inputs.summaryJudgment.label),
      super.expectLabel(inputs.unlessOrder.label),
      super.expectLabel(inputs.varyPaymentTermsOfJudgment.label),
      super.expectLabel(inputs.varyOrder.label),
      super.expectLabel(inputs.other.label),
    ]);
  }

  async selectApplicationTypes() {
    await super.clickBySelector(inputs.strikeOut.selector);
    await super.clickBySelector(inputs.summaryJudgment.selector);
    await super.clickBySelector(inputs.stayTheClaim.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
