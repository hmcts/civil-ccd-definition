import BasePageFactory from '../../../../base/base-page-factory';
import FinalOrderAssistedOrderPage from './final-order-assisted-order-page';
import FinalOrderDocPreviewPage from './final-order-doc-preview-page';
import FinalOrderSelectPage from './make-decision-final-order-select-page';
import MakeDecisionConfirmPage from './make-decision-confirm-page';
import MakeDecisionSubmitPage from './make-decision-submit-page';

export default class MakeDecisionPageFactory extends BasePageFactory {
  get selectPage() {
    return new FinalOrderSelectPage(this.page);
  }

  get assistedPage() {
    return new FinalOrderAssistedOrderPage(this.page);
  }

  get previewPage() {
    return new FinalOrderDocPreviewPage(this.page);
  }

  get checkAnswersPage() {
    return new MakeDecisionSubmitPage(this.page);
  }

  get confirmationPage() {
    return new MakeDecisionConfirmPage(this.page);
  }
}
