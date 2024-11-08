import BasePageFactory from '../../../../base/base-page-factory';
import ExtensionDateSpecPage from './lr-spec/extension-date-spec/extension-date-spec-page';
import InformAgreedExtensionDateConfirmSpecPage from './lr-spec/inform-agreed-extension-date-confirm-spec/inform-agreed-extension-date-confirm-spec-page';
import ExtensionDateUnspecPage from './unspec/extension-date-unspec/extension-date-unspec-page';

export default class InformAgreedExtensionDatePageFactory extends BasePageFactory {
  get extensionDateSpecPage() {
    return new ExtensionDateSpecPage(this.page);
  }

  get informAgreedExtensionDateConfirmSpecPage() {
    return new InformAgreedExtensionDateConfirmSpecPage(this.page);
  }

  get extensionDateUnspecPage() {
    return new ExtensionDateUnspecPage(this.page);
  }
}
