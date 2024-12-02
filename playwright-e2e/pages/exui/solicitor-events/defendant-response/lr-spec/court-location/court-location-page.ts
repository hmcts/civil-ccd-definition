import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import {
  heading,
  subHeading,
  courtLocationDropdown,
  reasonForm,
  remoteHearingRadioButtons,
} from './court-location-content.ts';

@AllMethodsStep()
export default class CourtLocationPage extends ExuiEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectHeading(heading),
      super.expectText(courtLocationDropdown.label),
      super.expectDropdownOption(courtLocationDropdown.label, courtLocationDropdown.dropdown.text),
      super.expectInputValue(reasonForm.heading, reasonForm.selector, { timeout: 3000 }),
      super.expectText(subHeading),
      super.expectLabel(remoteHearingRadioButtons.radioYes.label),
      super.expectLabel(remoteHearingRadioButtons.radioNo.label),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(remoteHearingRadioButtons.radioYes.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
