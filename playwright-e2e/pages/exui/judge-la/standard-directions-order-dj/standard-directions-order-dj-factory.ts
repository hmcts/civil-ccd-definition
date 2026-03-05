import BasePageFactory from '../../../../base/base-page-factory';
import DateFragment from '../../fragments/date/date-fragment';
import CaseManagementOrderPage from './case-management-order/case-management-order-page';
import sdoDJDisposalHearingPage from './disposal-hearing-sdo-dj/disposal-hearing-sdo-dj-page';
import sdoDJSubmitPage from './submit-sdo-dj/submit-sdo-dj-page';
import sdoDJOrderPreviewPage from './order-preview-sdo-dj/order-preview-sdo-dj-page';
import sdoDJConfirmPage from './confirm-sdo-dj/confirm-sdo-dj-page';
import sdoDJTrialHearingPage from './trial-hearing-sdo-dj/trial-hearing-sdo-dj-page';

export default class StandardDirectionOrderDJPageFactory extends BasePageFactory {
  get caseManagementOrderPage() {
    return new CaseManagementOrderPage(this.page);
  }

  get sdoDJDisposalHearingPage() {
    const dateFragment = new DateFragment(this.page);
    return new sdoDJDisposalHearingPage(this.page, dateFragment);
  }

  get sdoDJTrialHearingPage() {
    const dateFragment = new DateFragment(this.page);
    return new sdoDJTrialHearingPage(this.page, dateFragment);
  }

  get sdoDJOrderPreviewPage() {
    return new sdoDJOrderPreviewPage(this.page);
  }

  get sdoDJSubmitPage() {
    return new sdoDJSubmitPage(this.page);
  }

  get sdoDJConfirmPage() {
    return new sdoDJConfirmPage(this.page);
  }
}
