import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import {
  expertDetailsForm,
  smallClaimExpertLegends,
  smallClaimExpertsRadioForm,
} from './claimant-response-spec-small-claim-experts-content';

@AllMethodsStep()
export default class ClaimantResponseSpecSmallClaimExpertsPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      // super.expectText(smallClaimExpertLegends.useAnExpert.text,
      //   {containerSelector:smallClaimExpertLegends.useAnExpert.containerSelector}),
      super.expectText(smallClaimExpertLegends.useAnExpert.text, { ignoreDuplicates: true }),
    ]);
  }

  async verifyExpertsDetails() {
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

  async smallClaimExpertsSelectYes() {
    await super.clickBySelector(smallClaimExpertsRadioForm.radioYes.selector);
  }

  async smallClaimExpertsSelectYes2v1() {
    await super.clickBySelector(smallClaimExpertsRadioForm.radioYes.selector2v1);
  }

  async fillSmallClaimExpertsDetails() {
    await super.inputText('James', expertDetailsForm.firstName.selector);
    await super.inputText('Bond', expertDetailsForm.lastName.selector);
    await super.inputText('07777777777', expertDetailsForm.phoneNumber.selector);
    await super.inputText('JamesBond@gmail.com', expertDetailsForm.emailAddress.selector);
    await super.inputText('Expert', expertDetailsForm.fieldOfExpertise.selector);
    await super.inputText('to provide insights', expertDetailsForm.whyRequired.selector);
    await super.inputText('500.00', expertDetailsForm.estimatedCost.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
