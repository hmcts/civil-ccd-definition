import TestData from '../../../../models/test-utils/test-data';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import BaseTestData from '../../../../base/base-test-data';
import CtscAdminPageFactory from '../../../../pages/exui/ctcs-admin/ctsc-admin-page-factory';

@AllMethodsStep()
export default class ManageCasesActions extends BaseTestData {
  private ctscAdminPageFactory: CtscAdminPageFactory;

  constructor(ctscAdminPageFactory: CtscAdminPageFactory, testData: TestData) {
    super(testData);
    this.ctscAdminPageFactory = ctscAdminPageFactory;
  }

  async mediationUnsuccessful() {
    const {
      mediationUnsuccessfulPage,
      mediationUnsuccessfulWorkAllocationPage,
      mediationUnsuccessfulCheckYourAnswersPage,
    } = this.ctscAdminPageFactory;
    await mediationUnsuccessfulPage.verifyContent(this.ccdCaseData);
    await mediationUnsuccessfulPage.selectAppointmentNoAgreement();
    await mediationUnsuccessfulPage.submit();
    await mediationUnsuccessfulWorkAllocationPage.verifyContent(this.ccdCaseData);
    await mediationUnsuccessfulWorkAllocationPage.submit();
    await mediationUnsuccessfulCheckYourAnswersPage.verifyContent(this.ccdCaseData);
    await mediationUnsuccessfulCheckYourAnswersPage.submit();
  }
}
