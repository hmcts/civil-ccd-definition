import BasePageActionsFactory from '../../../../base/base-page-actions-factory';
import QueryManagementPageFactory from '../../../../pages/exui/common/query-management/query-management-page-factory';
import QueryManagementActions from '../common/query-management/query-management-actions';

export default class CtscAdminActionsFactory extends BasePageActionsFactory {
  get queryManagementActions() {
    return new QueryManagementActions(new QueryManagementPageFactory(this.page), this.testData);
  }
}
