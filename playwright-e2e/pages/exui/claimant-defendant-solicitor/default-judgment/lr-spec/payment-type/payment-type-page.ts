import BasePage from '../../../../../../base/base-page.ts';
import partys from '../../../../../../constants/partys.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CaseDataHelper from '../../../../../../helpers/case-data-helper.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import { ClaimantDefendantPartyType } from '../../../../../../models/claimant-defendant-party-types.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import { subheadings, radioButtons } from './payment-type-content.ts';

@AllMethodsStep()
export default class PaymentTypePage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData, defendantPartyType: ClaimantDefendantPartyType) {
    const defendantData = CaseDataHelper.buildClaimantAndDefendantData(
      partys.DEFENDANT_1,
      defendantPartyType,
    );
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(subheadings.paymentType(defendantData.partyName)),
      super.expectText(radioButtons.paymentType.label),
      super.expectLabel(radioButtons.paymentType.immediately.label),
      super.expectLabel(radioButtons.paymentType.setDate.label),
      super.expectLabel(radioButtons.paymentType.repaymentPlan.label),
    ]);
  }

  async selectImmediatePayment() {
    await super.clickBySelector(radioButtons.paymentType.immediately.selector);
  }

  async selectSetPaymentDate() {
    await super.clickBySelector(radioButtons.paymentType.setDate.selector);
  }

  async selectRepaymentPlan() {
    await super.clickBySelector(radioButtons.paymentType.repaymentPlan.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
