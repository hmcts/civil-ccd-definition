import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiEvent from '../../../exui-event/exui-event';
import {
  heading,
  subHeading,
  paragraphs,
  radioButtons,
} from './defendant-response-confirm-name-and-address-content.ts';

@AllMethodsStep()
export default class DefendantResponseConfirmNameAndAddressPage extends ExuiEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectHeading(heading),
      super.expectSubHeading(subHeading),
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
      super.expectText(radioButtons.label),
      super.expectRadioButton(radioButtons.yes),
      super.expectRadioButton(radioButtons.no),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
