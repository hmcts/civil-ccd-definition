import BasePageFactory from '../../../../base/base-page-factory';
import FinalOrderAssistedOrderPage from './final-order-assisted-order/final-order-assisted-order-page';
import FinalOrderSelectGaPage from './final-order-select/final-order-select-ga-page';
import GenerateDirectionsOrderGaConfirmPage from './generate-directions-order-ga/generate-directions-order-ga-confirm-page';
import GenerateDirectionsOrderGaSubmitPage from './generate-directions-order-ga-submit/generate-directions-order-ga-submit-page';
import FinalOrderDocPreviewPage from './final-order-doc-preview/final-order-doc-preview-page';

export default class GenerateDirectionsOrderGaPageFactory extends BasePageFactory {
  get finalOrderSelectGaPage() {
    return new FinalOrderSelectGaPage(this.page);
  }

  get finalOrderAssistedPage() {
    return new FinalOrderAssistedOrderPage(this.page);
  }

  get finalOrderDocPreviewPage() {
    return new FinalOrderDocPreviewPage(this.page);
  }

  get generateDirectionsOrderGaSubmitPage() {
    return new GenerateDirectionsOrderGaSubmitPage(this.page);
  }

  get generateDirectionsOrderGaConfirmPage() {
    return new GenerateDirectionsOrderGaConfirmPage(this.page);
  }
}
