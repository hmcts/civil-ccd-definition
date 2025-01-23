import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import {
  formFields,
  labels,
  paragraphs,
} from './correspondence-address-defendant-legal-representative-content.ts';

@AllMethodsStep()
export default class CorrespondenceAddressDefendantLegalRepresentativeSpecPage extends ExuiPage(
  BasePage,
) {
  async verifyContent() {
    await super.runVerifications([
      super.expectText(paragraphs.postalCorrespondenceInfo),
      super.expectText(labels.enterDifferentAddress),
      super.expectSelector(formFields.specApplicantCorrespondenceAddressRequired_Yes),
      super.expectSelector(formFields.specApplicantCorrespondenceAddressRequired_No),
    ]);
  }

  async clickYesForDifferentAddress() {
    await super.clickBySelector(formFields.specApplicantCorrespondenceAddressRequired_Yes);
  }

  async clickNoForDifferentAddress() {
    await super.clickBySelector(formFields.specApplicantCorrespondenceAddressRequired_No);
  }

  async submit() {
    await super.clickSubmit();
  }
}
