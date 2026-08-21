import BaseTestData from '../../../../../base/base-test-data';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import TestData from '../../../../../models/test-utils/test-data';
import RefundPageFactory from '../../../../../pages/exui/common/refunds/refund-page-factory';
@AllMethodsStep()
export default class RefundActions extends BaseTestData {
  private refundPageFactory: RefundPageFactory;

  constructor(refundPageFactory: RefundPageFactory, testData: TestData) {
    super(testData);
    this.refundPageFactory = refundPageFactory;
  }

  async review() {
    const { caseDetailsPage } = this.refundPageFactory;
    await caseDetailsPage.clickReview();
  }

  async issueRefund() {
    const { caseDetailsPage } = this.refundPageFactory;
    await caseDetailsPage.clickIssueRefund();
  }

  async selectFee() {
    const { processRefund1Page } = this.refundPageFactory;
    await processRefund1Page.verifyContent();
    await processRefund1Page.selectFeeToBeRefunded();
    await processRefund1Page.submit();
  }

  async selectAmendedClaim() {
    const { processRefund2Page } = this.refundPageFactory;
    await processRefund2Page.verifyContent();
    await processRefund2Page.selectReasonAmendedClaim();
    await processRefund2Page.submit();
  }

  async selectSystemTechnicalError() {
    const { processRefund2Page } = this.refundPageFactory;
    await processRefund2Page.verifyContent();
    await processRefund2Page.selectReasonSystemTechnicalError();
    await processRefund2Page.submit();
  }

  async enterContactInformation() {
    const { processRefund3Page } = this.refundPageFactory;
    await processRefund3Page.verifyContent();
    await processRefund3Page.enterContactInformation();
    await processRefund3Page.submit();
  }

  async processRefund() {
    const { refundListPage } = this.refundPageFactory;
    await refundListPage.verifyContent();
    await refundListPage.processRefund(this.ccdCaseData.id!);
  }

  async reviewRefund() {
    const { refundListPage } = this.refundPageFactory;
    await refundListPage.verifyContent();
    await refundListPage.reviewRefund(this.ccdCaseData.id!);
  }

  async changeRefundDetails() {
    const { refundDetailsPage } = this.refundPageFactory;
    await refundDetailsPage.verifyContent();
    await refundDetailsPage.changeRefundDetails();
  }

  async approve() {
    const { reviewRefundDetailsPage } = this.refundPageFactory;
    await reviewRefundDetailsPage.verifyContent();
    await reviewRefundDetailsPage.approve();
    await reviewRefundDetailsPage.submit();
  }

  async reject() {
    const { reviewRefundDetailsPage } = this.refundPageFactory;
    await reviewRefundDetailsPage.verifyContent();
    await reviewRefundDetailsPage.reject();
    await reviewRefundDetailsPage.submit();
  }

  async returnToCaseworker() {
    const { reviewRefundDetailsPage } = this.refundPageFactory;
    await reviewRefundDetailsPage.verifyContent();
    await reviewRefundDetailsPage.returnToCaseworker();
    await reviewRefundDetailsPage.submit();
  }

  async refundRequestSubmit() {
    const { refundSubmitPage } = this.refundPageFactory;
    await refundSubmitPage.verifyContent();
    await refundSubmitPage.submit();
  }

  async changeReason() {
    const { refundSubmitPage } = this.refundPageFactory;
    await refundSubmitPage.verifyContent();
    await refundSubmitPage.changeReason();
  }

  async refundConfirmSubmittedPage() {
    const { refundConfirmSubmittedPage } = this.refundPageFactory;
    await refundConfirmSubmittedPage.verifyContent();
  }

  async refundConfirmReturnedPage() {
    const { refundConfirmReturnedPage } = this.refundPageFactory;
    await refundConfirmReturnedPage.verifyContent();
  }

  async refundConfirmApprovedPage() {
    const { refundConfirmApprovedPage } = this.refundPageFactory;
    await refundConfirmApprovedPage.verifyContent();
  }

  async refundConfirmRejectedPage() {
    const { refundConfirmRejectedPage } = this.refundPageFactory;
    await refundConfirmRejectedPage.verifyContent();
  }
}
