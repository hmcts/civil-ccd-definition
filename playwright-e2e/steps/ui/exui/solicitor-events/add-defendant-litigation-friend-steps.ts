import BaseExuiSteps from '../../../../base/base-exui-steps';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import TestData from '../../../../models/test-data';
import ExuiDashboardPageFactory from '../../../../pages/exui/exui-dashboard/exui-dashboard-page-factory';
import RequestsFactory from '../../../../requests/requests-factory';
import AddDefendantLitigationFriendPageFactory from '../../../../pages/exui/solicitor-events/add-defendant-litigation-friend/add-defendant-litigation-friend-page-factory';

@AllMethodsStep()
export default class AddDefendantLitigationFriendSteps extends BaseExuiSteps {
  private addDefendantLitigationFriendPageFactory: AddDefendantLitigationFriendPageFactory;

  constructor(
    addDefendantLitigationFriendPageFactory: AddDefendantLitigationFriendPageFactory,
    exuiDashboardPageFactory: ExuiDashboardPageFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(exuiDashboardPageFactory, requestsFactory, testData);
    this.addDefendantLitigationFriendPageFactory = addDefendantLitigationFriendPageFactory;
  }
}
