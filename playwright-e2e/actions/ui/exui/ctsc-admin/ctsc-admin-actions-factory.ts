import BasePageActionsFactory from '../../../../base/base-page-actions-factory';
import CtscAdminPageFactory from '../../../../pages/exui/ctcs-admin/ctsc-admin-page-factory';
import ManageCasesActions from './manage-cases-actions-spec';

export default class CtscAdminActionsFactory extends BasePageActionsFactory {
  get manageCasesActions() {
    return new ManageCasesActions(new CtscAdminPageFactory(this.page), this.testData);
  }
}
