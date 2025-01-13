import BasePageFactory from '../../../../base/base-page-factory';
import DateFragment from '../../fragments/date/date-fragment';
import ExtensionDateSpecPage from './lr-spec/extension-date-spec/extension-date-spec-page';
import InformAgreedExtensionDateConfirmSpecPage from './lr-spec/inform-agreed-extension-date-confirm-spec/inform-agreed-extension-date-confirm-spec-page';
import ExtensionDatePage from './unspec/extension-date/extension-date-page';
import InformAgreedExtensionDateConfirmPage from './unspec/inform-agreed-extension-date-confirm/inform-agreed-extension-date-confirm-page';

export default class InformAgreedExtensionDatePageFactory extends BasePageFactory {
  get extensionDateSpecPage() {
    const dateFragment = new DateFragment(this.page);
    return new ExtensionDateSpecPage(this.page, dateFragment);
  }

  get informAgreedExtensionDateConfirmSpecPage() {
    return new InformAgreedExtensionDateConfirmSpecPage(this.page);
  }

  get extensionDatePage() {
    return new ExtensionDatePage(this.page);
  }

  get informAgreedExtensionDateConfirmPage() {
    return new InformAgreedExtensionDateConfirmPage(this.page);
  }
}
