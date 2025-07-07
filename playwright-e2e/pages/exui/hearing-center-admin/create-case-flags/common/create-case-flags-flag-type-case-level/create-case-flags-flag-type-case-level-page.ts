import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data';
import ExuiPage from '../../../../exui-page/exui-page';
import { heading, radioButtons } from './create-case-flags-flag-type-case-level-content';

@AllMethodsStep()
export default class CreateCaseFlagsFlagTypeCaseLevelPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectHeading(heading),
      super.expectLabel(radioButtons.complex.label),
      super.expectLabel(radioButtons.urgent.label),
      super.expectLabel(radioButtons.powerOfArrest.label),
      super.expectLabel(radioButtons.warrantOfArrest.label),
      super.expectLabel(radioButtons.welshFormsAndComs.label),
      super.expectLabel(radioButtons.other.label),
    ]);
  }

  async selectComplexCase() {
    await super.clickByLabel(radioButtons.complex.label);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
