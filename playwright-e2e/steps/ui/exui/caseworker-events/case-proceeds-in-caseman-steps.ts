import BaseExuiSteps from '../../../../base/base-exui-steps';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import TestData from '../../../../models/test-data';
import CaseProceedsInCasemanPageFactory from '../../../../pages/exui/caseworker-events/case-proceeds-in-caseman/case-proceeds-in-caseman-page-factory';
import ExuiDashboardPageFactory from '../../../../pages/exui/exui-dashboard/exui-dashboard-page-factory';
import RequestsFactory from '../../../../requests/requests-factory';

@AllMethodsStep()
export default class CaseProceedsInCasemanSteps extends BaseExuiSteps {
  private caseProceedsInCasemanPageFactory: CaseProceedsInCasemanPageFactory;

  constructor(
    caseProceedsInCasemanPageFactory: CaseProceedsInCasemanPageFactory,
    exuiDashboardPageFactory: ExuiDashboardPageFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(exuiDashboardPageFactory, requestsFactory, testData);
    this.caseProceedsInCasemanPageFactory = caseProceedsInCasemanPageFactory;
  }
}
