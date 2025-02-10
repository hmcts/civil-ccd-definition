import CaseworkerActionsFactory from '../../../actions/ui/exui/caseworker/caseworker-actions-factory';
import ExuiDashboardActions from '../../../actions/ui/exui/common/exui-dashboard-actions';
import IdamActions from '../../../actions/ui/idam/idam-actions';
import BaseExuiSteps from '../../../base/base-exui-steps';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-data';

@AllMethodsStep()
export default class CaseworkerSteps extends BaseExuiSteps {
  private caseworkerActionsFactory: CaseworkerActionsFactory;

  constructor(
    exuiDashboardActions: ExuiDashboardActions,
    idamActions: IdamActions,
    caseworkerActionsFactory: CaseworkerActionsFactory,
    testData: TestData,
  ) {
    super(exuiDashboardActions, idamActions, testData);
    this.caseworkerActionsFactory = caseworkerActionsFactory;
  }
}
