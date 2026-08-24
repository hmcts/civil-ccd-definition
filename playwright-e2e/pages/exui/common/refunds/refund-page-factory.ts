import BasePageFactory from '../../../../base/base-page-factory';
import RefundListPage from './refund-list/refund-list-page';
import RefundSubmitPage from './refund-submit/refund-submit-page';
import RefundConfirmSubmittedPage from './refund-confirm/refund-confirm-submitted-page';
import RefundConfirmReturnedPage from './refund-confirm/refund-confirm-returned-page';
import RefundConfirmApprovedPage from './refund-confirm/refund-confirm-approved-page';
import RefundConfirmRejectedPage from './refund-confirm/refund-confirm-rejected-page';
import ReviewRefundDetailsPage from './review-refund-details/review-refund-details-page';
import RefundDetailsPage from './refund-details/refund-details-page';
import CaseDetailsPage from '../../exui-dashboard/case-details/case-details-page';
import ProcessRefund1Page from './process-refund/process-refund-1-page';
import ProcessRefund2Page from './process-refund/process-refund-2-page';
import ProcessRefund3Page from './process-refund/process-refund-3-page';
export default class RefundPageFactory extends BasePageFactory {
  get caseDetailsPage() {
    return new CaseDetailsPage(this.page);
  }

  get processRefund1Page() {
    return new ProcessRefund1Page(this.page);
  }

  get processRefund2Page() {
    return new ProcessRefund2Page(this.page);
  }


  get processRefund3Page() {
    return new ProcessRefund3Page(this.page);
  }

  get refundDetailsPage() {
    return new RefundDetailsPage(this.page);
  }

  get reviewRefundDetailsPage() {
    return new ReviewRefundDetailsPage(this.page);
  }

  get refundSubmitPage() {
    return new RefundSubmitPage(this.page);
  }

  get refundConfirmSubmittedPage() {
    return new RefundConfirmSubmittedPage(this.page);
  }

  get refundConfirmReturnedPage() {
    return new RefundConfirmReturnedPage(this.page);
  }

  get refundConfirmApprovedPage() {
    return new RefundConfirmApprovedPage(this.page);
  }

  get refundConfirmRejectedPage() {
    return new RefundConfirmRejectedPage(this.page);
  }

  get refundListPage() {
    return new RefundListPage(this.page);
  }
}
