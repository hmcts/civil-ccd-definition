import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import { heading, yesNoRadioButtons } from './mediation-availability-content.ts';

@AllMethodsStep()
export default class MediationAvailabilityPage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(heading),
      super.expectText(yesNoRadioButtons.text.question),
      super.expectText(yesNoRadioButtons.text.hint),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(yesNoRadioButtons.radioYes.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
