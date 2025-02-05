import BaseExuiSteps from '../../../../base/base-exui-steps';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import TestData from '../../../../models/test-data';
import ExuiDashboardPageFactory from '../../../../pages/exui/exui-dashboard/exui-dashboard-page-factory';
import AcknowledgeClaimPageFactory from '../../../../pages/exui/solicitor-events/acknowledge-claim/acknowledge-claim-page-factory';
import RequestsFactory from '../../../../requests/requests-factory';

@AllMethodsStep()
export default class AcknowledgeClaimSteps extends BaseExuiSteps {
  private acknowledgeClaimPageFactory: AcknowledgeClaimPageFactory;

  constructor(
    acknowledgeClaimPageFactory: AcknowledgeClaimPageFactory,
    exuiDashboardPageFactory: ExuiDashboardPageFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(exuiDashboardPageFactory, requestsFactory, testData);
    this.acknowledgeClaimPageFactory = acknowledgeClaimPageFactory;
  }
}
