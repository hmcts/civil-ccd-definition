import BasePageFactory from '../../../../base/base-page-factory';
import CaseFilterPage from './common/case-filter/case-filter-page';

export default class CreateClaimPageFactory extends BasePageFactory {
  get caseFilterPage() {
    return new CaseFilterPage(this.page);
  }
}
