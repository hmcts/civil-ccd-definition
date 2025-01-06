import BasePage from '../../../../../../base/base-page';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../exui-page/exui-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import {
  heading2,
  HearingNavigationButtons,
  HearingRadioForm,
} from './claimant-response-hearing-support-content.ts';

@AllMethodsStep()
export default class ClaimantResponseHearingSupportPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectHeading(heading2),
      super.expectLabel(HearingRadioForm.text.label),
      super.expectLabel(HearingRadioForm.supportRequirement.label),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(HearingRadioForm.radioYes.selector);
  }

  async submit() {
    await super.clickBySelector(HearingNavigationButtons.continueButton.selector);
  }
}
