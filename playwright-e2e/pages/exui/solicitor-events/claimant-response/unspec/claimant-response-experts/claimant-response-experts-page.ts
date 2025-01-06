import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import {
  expertDetailsForm,
  expertSubHeadings,
  expertRadioButton,
  expertReportSent,
  joinExpertSuitableForm,
} from './claimant-response-experts-content';

@AllMethodsStep()
export default class ClaimantResponseExpertsPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(expertSubHeadings.heading2, {
        containerSelector: expertSubHeadings.containerSelector,
      }),
      super.expectText(expertRadioButton.text, { first: true }),
    ]);
  }

  async verifyExpertsDetails() {
    await super.clickBySelector(expertDetailsForm.addNewButton.selector),
      await super.runVerifications([
        super.expectLabel(expertDetailsForm.firstName.label),
        super.expectLabel(expertDetailsForm.lastName.label),
        super.expectLabel(expertDetailsForm.phoneNumber.label),
        super.expectLabel(expertDetailsForm.emailAddress.label),
        super.expectLabel(expertDetailsForm.fieldOfExpertise.label),
        super.expectLabel(expertDetailsForm.whyRequired.label),
        super.expectLabel(expertDetailsForm.estimatedCost.label),
      ]);
  }

  async expertsSelectYes() {
    await super.clickBySelector(expertRadioButton.radioYes.selector);
  }

  async jointExpertYes() {
    await super.expectText(joinExpertSuitableForm.text, { first: true });
    await super.clickBySelector(joinExpertSuitableForm.jointExpertSuitableYes.selector);
  }

  async sentExpertReportYes() {
    await super.expectText(expertReportSent.text, { first: true });
    await super.clickBySelector(expertReportSent.reportSentYes.selector);
  }

  async fillExpertsDetails() {
    await super.inputText('James', expertDetailsForm.firstName.selector);
    await super.inputText('Bond', expertDetailsForm.lastName.selector);
    await super.inputText('JamesBond@gmail.com', expertDetailsForm.emailAddress.selector);
    await super.inputText('07777777777', expertDetailsForm.phoneNumber.selector);
    await super.inputText('Expert', expertDetailsForm.fieldOfExpertise.selector);
    await super.inputText('to provide insights', expertDetailsForm.whyRequired.selector);
    await super.inputText('500.00', expertDetailsForm.estimatedCost.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
