import BaseExuiSteps from '../../../../../base/base-exui-steps';
import BaseSteps from '../../../../../base/base-steps';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import TestData from '../../../../../models/test-data';
import ExuiDashboardPageFactory from '../../../../../pages/exui/exui-dashboard/exui-dashboard-page-factory';
import DefaultJudgmentPageFactory from '../../../../../pages/exui/solicitor-events/default-judgment/default-judgment-page-factory';
import RequestsFactory from '../../../../../requests/requests-factory';

@AllMethodsStep()
export default class DefaultJudgmentSpecSteps extends BaseExuiSteps {
  private defaultJudgmentPageFactory: DefaultJudgmentPageFactory;

  constructor(
    defaultJudgmentPageFactory: DefaultJudgmentPageFactory,
    exuiDashboardPageFactory: ExuiDashboardPageFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(exuiDashboardPageFactory, requestsFactory, testData);
    this.defaultJudgmentPageFactory = defaultJudgmentPageFactory;
  }
}
