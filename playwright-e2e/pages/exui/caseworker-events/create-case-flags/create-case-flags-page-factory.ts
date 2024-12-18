import BasePageFactory from '../../../../base/base-page-factory';
import CreateCaseFlagsPage from './create-case-flags/create-case-flags-page';

export default class CreateCaseFlagsPageFactory extends BasePageFactory {
  get createCaseFlagsPage() {
    return new CreateCaseFlagsPage(this.page);
  }
}
