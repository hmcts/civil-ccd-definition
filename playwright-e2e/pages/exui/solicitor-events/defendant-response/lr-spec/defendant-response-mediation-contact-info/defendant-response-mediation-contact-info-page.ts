import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiEvent from '../../../exui-event/exui-event';
import {
  heading,
  paragraph,
  formFields,
} from './defendant-response-mediation-contact-info-content';

@AllMethodsStep()
export default class DefendantResponseMediationContactInfo extends ExuiEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectHeading(heading),
      super.expectText(paragraph.descriptiveText1),
      super.expectText(paragraph.descriptiveText2),
      super.expectFormFields(formFields),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
