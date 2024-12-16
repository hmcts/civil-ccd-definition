import BasePageFactory from '../../../../base/base-page-factory';
import ConfirmNameAndAddressPage from '../../fragments/confirm-name-and-address/confirm-name-and-address-page';
import SolicitorReferencesPage from '../../fragments/solicitor-references/solicitor-references-page';
import ResponseIntensionPage from './unspec/response-intention-page';

export default class AcknowledgeClaimPageFactory extends BasePageFactory {
  get confirmNameAndAddressPage() {
    return new ConfirmNameAndAddressPage(this.page);
  }

  get responseIntensionPage() {
    return new ResponseIntensionPage(this.page);
  }

  get solicitorReferencesPage() {
    return new SolicitorReferencesPage(this.page);
  }
}
