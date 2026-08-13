import BasePage from '../../../../base/base-page';
import ExuiServiceRequestPage from '../../mixin-pages/exui-service-request-page/exui-service-request-page.ts';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { headings, subheadings, radioButtons, inputs } from './process-refund-content';

@AllMethodsStep()
export default class ProcessRefundPage extends ExuiServiceRequestPage(BasePage) {
  async verifyContent() {
    await super.expectHeading(headings.processRefund);
  }

  async selectFeeToBeRefunded() {
    await super.expectSubheading(subheadings.selectFeesToBeRefunded, { headingLevel: 3 });
    await super.clickBySelector(inputs.organisationFee.selector);
  }

  async selectReasonAmendedClaim() {
    await super.expectHeading(inputs.whyAreYouMakingThisRefund.label);
    await super.runVerifications([
      super.expectSelector(inputs.whyAreYouMakingThisRefund.amendedClaim.selector),
      super.expectSelector(inputs.whyAreYouMakingThisRefund.courtDiscretion.selector),
      super.expectSelector(inputs.whyAreYouMakingThisRefund.duplicateFeeCustomerError.selector),
      super.expectSelector(inputs.whyAreYouMakingThisRefund.feeNotDue.selector),
      super.expectSelector(inputs.whyAreYouMakingThisRefund.applicationRejected.selector),
      super.expectSelector(inputs.whyAreYouMakingThisRefund.duplicateFeeCourtError.selector),
      super.expectSelector(inputs.whyAreYouMakingThisRefund.applicationCaseWithdrawn.selector),
      super.expectSelector(inputs.whyAreYouMakingThisRefund.systemTechnicalErrorReason.selector),
    ]);
    await super.clickBySelector(inputs.whyAreYouMakingThisRefund.amendedClaim.selector);
  }

  async selectReasonSystemTechnicalError() {
    await super.expectHeading(inputs.whyAreYouMakingThisRefund.label);
    await super.clickBySelector(
      inputs.whyAreYouMakingThisRefund.systemTechnicalErrorReason.selector,
    );
  }

  async enterContactInformation() {
    await super.expectLegend(radioButtons.contactInformation.label);
    await super.inputText('test@hmcts.net', radioButtons.contactInformation.email.selector);
  }

  async submit() {
    await super.retryClickContinue();
  }
}
