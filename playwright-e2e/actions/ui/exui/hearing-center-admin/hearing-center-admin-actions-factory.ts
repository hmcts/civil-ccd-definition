import BasePageActionsFactory from '../../../../base/base-page-actions-factory';
import CreateCaseFlagsPageFactory from '../../../../pages/exui/hearing-center-admin/create-case-flags/create-case-flags-page-factory';
import CreateCaseFlagsActions from './create-case-flags-actions';
import CreateCaseFlagsSpecActions from './create-case-flags-spec-actions';

export default class HearingCenterAdminActionsFactory extends BasePageActionsFactory {
  get createCaseFlagsActions() {
    return new CreateCaseFlagsActions(new CreateCaseFlagsPageFactory(this.page), this.testData);
  }

  get createCaseFlagsSpecActions() {
    return new CreateCaseFlagsSpecActions(new CreateCaseFlagsPageFactory(this.page), this.testData);
  }
}
