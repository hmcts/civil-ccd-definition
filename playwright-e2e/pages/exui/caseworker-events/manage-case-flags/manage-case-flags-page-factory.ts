import BasePageFactory from '../../../../base/base-page-factory';
import ManageCaseFlagsPage from './manage-case-flags/manage-case-flags-page';

export default class ManageCaseFlagsPageFactory extends BasePageFactory {
  get manageCaseFlagsPage() {
    return new ManageCaseFlagsPage(this.page);
  }
}
