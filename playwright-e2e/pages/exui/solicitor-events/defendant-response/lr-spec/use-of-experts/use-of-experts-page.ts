import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import { heading, useExpertRadioButtons, expertDetails } from './use-of-experts-content.ts';

@AllMethodsStep()
export default class UseOfExpertsPage extends ExuiEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectHeading(heading),
      super.expectText(useExpertRadioButtons.text.label),
      super.expectLabel(useExpertRadioButtons.radioYes.label),
      super.expectLabel(useExpertRadioButtons.radioNo.label),
      super.expectText(expertDetails.label),
      super.expectInputValue(
        expertDetails.fields.firstName.label,
        '#respondToClaimExperts_firstName',
      ),
      super.expectInputValue(
        expertDetails.fields.lastName.label,
        '#respondToClaimExperts_lastName',
      ),
      super.expectInputValue(
        expertDetails.fields.number.label,
        '#respondToClaimExperts_phoneNumber',
      ),
      super.expectInputValue(
        expertDetails.fields.email.label,
        '#respondToClaimExperts_emailAddress',
      ),
      super.expectInputValue(
        expertDetails.fields.fieldOfExpertise.label,
        '#respondToClaimExperts_fieldofExpertise',
      ),
      super.expectInputValue(
        expertDetails.fields.whyDoYouNeedExpert.label,
        '#respondToClaimExperts_whyRequired',
      ),
      super.expectInputValue(
        expertDetails.fields.estimateCost.label,
        '#respondToClaimExperts_estimatedCost',
      ),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(useExpertRadioButtons.radioYes.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
