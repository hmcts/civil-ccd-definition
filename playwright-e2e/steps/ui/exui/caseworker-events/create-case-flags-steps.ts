import BaseExuiSteps from '../../../../base/base-exui-steps';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import TestData from '../../../../models/test-data';
import CreateCaseFlagsPageFactory from '../../../../pages/exui/caseworker-events/create-case-flags/create-case-flags-page-factory';
import ExuiDashboardPageFactory from '../../../../pages/exui/exui-dashboard/exui-dashboard-page-factory';
import RequestsFactory from '../../../../requests/requests-factory';

@AllMethodsStep()
export default class CreateCaseFlagsSteps extends BaseExuiSteps {
  private createCaseFlagsPageFactory: CreateCaseFlagsPageFactory;

  constructor(
    createCaseFlagsPageFactory: CreateCaseFlagsPageFactory,
    exuiDashboardPageFactory: ExuiDashboardPageFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(exuiDashboardPageFactory, requestsFactory, testData);
    this.createCaseFlagsPageFactory = createCaseFlagsPageFactory;
  }
}
