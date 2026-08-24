import BaseApi from '../../../../base/base-api';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import GaExuiDashboardPageFactory from '../../../../pages/ga-exui/ga-exui-dashboard/ga-exui-dashboard-page-factory';
import TestData from '../../../../models/test-utils/test-data';
import RequestsFactory from '../../../../requests/requests-factory';

@AllMethodsStep()
export default class GaExuiDashboardActions extends BaseApi {
  private gaExuiDashboardPageFactory: GaExuiDashboardPageFactory;

  constructor(
    gaExuiDashboardPageFactory: GaExuiDashboardPageFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this.gaExuiDashboardPageFactory = gaExuiDashboardPageFactory;
  }

  async goToGaCaseDetails() {
    const { gaCaseDetailsPage } = this.gaExuiDashboardPageFactory;
    await gaCaseDetailsPage.retryGoToGaCaseDetails(this.getGaCCDCaseData()!.id!)
    await gaCaseDetailsPage.verifyContent(this.getGaCCDCaseData()!); 
  }
}
