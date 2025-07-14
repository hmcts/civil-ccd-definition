import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data';
import ExuiPage from '../../../../exui-page/exui-page';
import { heading, radioButtons, inputs } from './create-case-flags-reasonable-adjustment-content';

@AllMethodsStep()
export default class CreateCaseFlagsReasonableAdjustmentPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectHeading(heading),
      super.expectLabel(radioButtons.alternativeDocuments.label),
      super.expectLabel(radioButtons.forms.label),
      super.expectLabel(radioButtons.buildingAccess.label),
      super.expectLabel(radioButtons.hearingSupport.label),
      super.expectLabel(radioButtons.comfortDuringHearing.label),
      super.expectLabel(radioButtons.hearingRequest.label),
      super.expectLabel(radioButtons.communicating.label),
      super.expectLabel(radioButtons.other.label),
    ]);
  }

  async selectOther() {
    await super.clickByLabel(radioButtons.other.label);
    await super.inputText('New flag type', inputs.other.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
