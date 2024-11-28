import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import {
  heading,
  subHeading,
  paragraphs,
  radioButtons,
} from './confirm-name-and-address-content.ts';

@AllMethodsStep()
export default class DefendantResponseConfirmNameAndAddressPage extends ExuiEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectHeading(heading),
      super.expectSubheading(subHeading),
      super.expectText(paragraphs.descriptionText1),
      super.expectText(paragraphs.descriptionText2),
      super.expectText(paragraphs.partyTypeText),
      super.expectText(paragraphs.nameText),
      super.expectText(paragraphs.emailText),
      super.expectText(paragraphs.phoneText),
      super.expectText(paragraphs.addressText),
      super.expectText(paragraphs.partyTypeText),
      super.expectText(paragraphs.nameText),
      super.expectText(paragraphs.emailText),
      super.expectText(paragraphs.addressText),
      super.expectLabel(radioButtons.text.label),
      super.expectLabel(radioButtons.radioYes.label),
      super.expectLabel(radioButtons.radioNo.label),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.radioYes.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
