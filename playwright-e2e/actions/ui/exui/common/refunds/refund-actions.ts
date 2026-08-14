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
    const { serviceRequestPage } = this.refundPageFactory;
    await serviceRequestPage.verifyContent(this.ccdCaseData);
    await serviceRequestPage.clickReview();
  }

  async issueRefund() {
    const { serviceRequestPage } = this.refundPageFactory;
    await serviceRequestPage.verifyContent(this.ccdCaseData);
    await serviceRequestPage.clickIssueRefund();
  }

  async selectFee() {
    const { processRefundPage } = this.refundPageFactory;
    await processRefundPage.verifyContent();
    await processRefundPage.selectFeeToBeRefunded();
    await processRefundPage.submit();
  }

  async selectAmendedClaim() {
    const { processRefundPage } = this.refundPageFactory;
    await processRefundPage.verifyContent();
    await processRefundPage.selectReasonAmendedClaim();
    await processRefundPage.submit();
  }

  async selectSystemTechnicalError() {
    const { processRefundPage } = this.refundPageFactory;
    await processRefundPage.verifyContent();
    await processRefundPage.selectReasonSystemTechnicalError();
    await processRefundPage.submit();
  }

  async enterContactInformation() {
    const { processRefundPage } = this.refundPageFactory;
    await processRefundPage.verifyContent();
    await processRefundPage.enterContactInformation();
    await processRefundPage.submit();
  }

  async goToRefunds() {
    const { refundListPage } = this.refundPageFactory;
    await refundListPage.goToRefunds();
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
