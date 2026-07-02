import BasePage from '../../../../../base/base-page';
import ExuiPage from '../../../mixin-pages/exui-page/exui-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd-case-data';
import { heading, radioButtons, checkboxes } from './hearing-facilities-content';

@AllMethodsStep()
export default class HearingFacilitiesPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectText(`${ccdCaseData.caseNamePublic}`, { exact: false }),
      super.expectHeading(heading),
      super.expectText(radioButtons.label),
      super.expectText(checkboxes.label, { exact: false }),
    ]);
  }

  async selectAdditionalFacilities() {
    await super.clickByLabel(checkboxes.laptop.label);
  }

  async updateAdditionalFacilities() {
    await super.clickByLabel(checkboxes.custodyCell.label);
  }

  async submit() {
    await super.clickContinue();
  }
}
