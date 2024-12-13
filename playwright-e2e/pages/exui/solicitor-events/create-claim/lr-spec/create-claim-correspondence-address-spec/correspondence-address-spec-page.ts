import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import { formFields, heading, labels, paragraphs } from './correspondence-address-spec-content';

@AllMethodsStep()
export default class CorrespondenceAddressSpecPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading.postalAddressForClaimantSolicitor),
      super.expectText(paragraphs.postalCorrespondenceInfo),
      super.expectText(labels.enterDifferentAddress),
      super.expectSelector(formFields.specApplicantCorrespondenceAddressRequired_Yes),
      super.expectSelector(formFields.specApplicantCorrespondenceAddressRequired_No),
    ]);
  }

  async clickNoForDifferentAddress() {
    await super.clickBySelector(formFields.specApplicantCorrespondenceAddressRequired_No);
  }

  async submit() {
    await super.clickSubmit();
  }
}
