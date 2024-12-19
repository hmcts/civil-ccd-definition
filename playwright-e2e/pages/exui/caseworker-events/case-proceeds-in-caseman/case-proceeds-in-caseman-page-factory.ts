import BasePageFactory from '../../../../base/base-page-factory';
import CaseProceedsInCasemanLRPage from './lr-spec/case-proceeds-in-caseman-lr/case-proceeds-in-caseman-lr-page';
import CaseProceedsInCasemanPage from './unspec/case-proceeds-in-caseman-page';

export default class CaseProceedsInCasemanPageFactory extends BasePageFactory {
  get caseProceedsInCasemanLRPage() {
    return new CaseProceedsInCasemanLRPage(this.page);
  }

  get caseProceedsInCasemanPage() {
    return new CaseProceedsInCasemanPage(this.page);
  }
}
