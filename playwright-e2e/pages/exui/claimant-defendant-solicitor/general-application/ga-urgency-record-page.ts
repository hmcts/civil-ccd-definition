import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import CCDCaseData from '../../../../models/ccd-case-data';
import ExuiPage from '../../mixin-pages/exui-page/exui-page';
import { subheadings, radioButtons } from './ga-urgency-record-content';

@AllMethodsStep()
export default class GaUrgencyRecordPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(subheadings.isUrgent),
      super.expectLabel(radioButtons.urgent.yes.label),
      super.expectLabel(radioButtons.urgent.no.label),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.urgent.yes.selector);
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.urgent.no.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
