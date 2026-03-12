import BasePageFactory from '../../../../base/base-page-factory';
import NotSuitableSDOPage from './not-suitable-sdo/not-suitable-sdo-page';
import SubmitSdoNotSuitablePage from './submit-not-suitable-sdo/submit-not-suitable-sdo-page';
import ConfirmSdoNotSuitablePage from './confirm-not-suitable-sdo/confirm-not-suitable-sdo-page';

export default class StandardDirectionOrderNotSuitablePageFactory extends BasePageFactory {
  get notSuitableSDOPage() {
    return new NotSuitableSDOPage(this.page);
  }

  get submitSdoNotSuitablePage() {
    return new SubmitSdoNotSuitablePage(this.page);
  }

  get confirmSdoNotSuitablePage() {
    return new ConfirmSdoNotSuitablePage(this.page);
  }
}
