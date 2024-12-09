import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data';
import ExuiEvent from '../../../../exui-event/exui-event';
import { heading, paragraph, formFields } from './mediation-contact-info-content';

@AllMethodsStep()
export default class MediationContactInformationPage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectHeading(heading),
      super.expectText(paragraph.descriptiveText1),
      super.expectText(paragraph.descriptiveText2),
      super.expectInputValue(formFields.firstName.label, formFields.firstName.input),
      super.expectInputValue(formFields.lastName.label, formFields.lastName.input),
      super.expectInputValue(formFields.email.label, formFields.email.input),
      super.expectInputValue(formFields.telephone.label, formFields.telephone.input),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
