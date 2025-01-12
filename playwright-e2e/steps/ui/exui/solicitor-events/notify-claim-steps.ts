import BaseExuiSteps from '../../../../base/base-exui-steps';
import BaseSteps from '../../../../base/base-steps';
import { claimantSolicitorUser } from '../../../../config/users/exui-users';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import CCDEvents from '../../../../constants/ccd-events';
import TestData from '../../../../models/test-data';
import ExuiDashboardPageFactory from '../../../../pages/exui/exui-dashboard/exui-dashboard-page-factory';
import NotifyClaimPageFactory from '../../../../pages/exui/solicitor-events/notify-claim/notify-claim-page-factory';
import RequestsFactory from '../../../../requests/requests-factory';

@AllMethodsStep()
export default class NotifyClaimSteps extends BaseExuiSteps {
  private notifyClaimPageFactory: NotifyClaimPageFactory;

  constructor(
    notifyClaimPageFactory: NotifyClaimPageFactory,
    exuiDashboardPageFactory: ExuiDashboardPageFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(exuiDashboardPageFactory, requestsFactory, testData);
    this.notifyClaimPageFactory = notifyClaimPageFactory;
  }

  async NotifyClaim1v1() {
    await this.retryExuiEvent(
      async () => {
        const { accessGrantedWarningPage } = this.notifyClaimPageFactory;
        await accessGrantedWarningPage.verifyContent(this.ccdCaseData);
        await accessGrantedWarningPage.submit();

        const { notifyClaimSubmitPage } = this.notifyClaimPageFactory;
        await notifyClaimSubmitPage.verifyContent(this.ccdCaseData);
        await notifyClaimSubmitPage.submit();

        const { notifyClaimConfirmPage } = this.notifyClaimPageFactory;
        await notifyClaimConfirmPage.verifyContent();
        await notifyClaimConfirmPage.submit();
      },
      CCDEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }
}
