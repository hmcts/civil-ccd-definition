import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import { heading, labels, formFields } from './respondent2-correspondence-address-content';

@AllMethodsStep()
export default class Respondent2CorrespondenceAddressPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectText(heading.postalAddressForRespondentSolicitor),
      super.expectText(labels.enterDifferentAddress),
    ]);
  }

  async clickYesForDifferentAddress() {
    await super.clickBySelector(formFields.specRespondent2CorrespondenceAddressRequiredYes);
  }

  async clickNoForDifferentAddress() {
    await super.clickBySelector(formFields.specRespondent2CorrespondenceAddressRequiredNo);
  }

  async submit() {
    await super.clickSubmit();
  }
}
