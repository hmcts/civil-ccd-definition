import BaseExuiSteps from '../../../../base/base-exui-steps';
import { claimantSolicitorUser } from '../../../../config/users/exui-users';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ccdEvents from '../../../../constants/ccd-events';
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

        const { submitNotifyClaimPage } = this.notifyClaimPageFactory;
        await submitNotifyClaimPage.verifyContent(this.ccdCaseData);
        await submitNotifyClaimPage.submit();

        const { confirmNotifyClaimPage } = this.notifyClaimPageFactory;
        await confirmNotifyClaimPage.verifyContent();
        await confirmNotifyClaimPage.submit();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }

  async NotifyClaim2v1() {
    await this.retryExuiEvent(
      async () => {
        const { accessGrantedWarningPage } = this.notifyClaimPageFactory;
        await accessGrantedWarningPage.verifyContent(this.ccdCaseData);
        await accessGrantedWarningPage.submit();

        const { submitNotifyClaimPage } = this.notifyClaimPageFactory;
        await submitNotifyClaimPage.verifyContent(this.ccdCaseData);
        await submitNotifyClaimPage.submit();

        const { confirmNotifyClaimPage } = this.notifyClaimPageFactory;
        await confirmNotifyClaimPage.verifyContent();
        await confirmNotifyClaimPage.submit();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }

  async NotifyClaim1v2SS() {
    await this.retryExuiEvent(
      async () => {
        const { accessGrantedWarningPage } = this.notifyClaimPageFactory;
        await accessGrantedWarningPage.verifyContent(this.ccdCaseData);
        await accessGrantedWarningPage.submit();

        const { submitNotifyClaimPage } = this.notifyClaimPageFactory;
        await submitNotifyClaimPage.verifyContent(this.ccdCaseData);
        await submitNotifyClaimPage.submit();

        const { confirmNotifyClaimPage } = this.notifyClaimPageFactory;
        await confirmNotifyClaimPage.verifyContent();
        await confirmNotifyClaimPage.submit();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }

  async NotifyClaim1v2DS() {
    await this.retryExuiEvent(
      async () => {
        const { defendantSolicitorToNotify } = this.notifyClaimPageFactory;
        await defendantSolicitorToNotify.verifyContent(this.ccdCaseData);
        await defendantSolicitorToNotify.selectBoth();
        await defendantSolicitorToNotify.submit();

        const { accessGrantedWarningPage } = this.notifyClaimPageFactory;
        await accessGrantedWarningPage.verifyContent(this.ccdCaseData);
        await accessGrantedWarningPage.submit();

        const { submitNotifyClaimPage } = this.notifyClaimPageFactory;
        await submitNotifyClaimPage.verifyContent(this.ccdCaseData);
        await submitNotifyClaimPage.submit();

        const { confirmNotifyClaimPage } = this.notifyClaimPageFactory;
        await confirmNotifyClaimPage.verifyContent();
        await confirmNotifyClaimPage.submit();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }

  async NotifyClaim1v1LIP() {
    await this.retryExuiEvent(
      async () => {
        const { certificateOfService1NotifyClaimPage } = this.notifyClaimPageFactory;
        await certificateOfService1NotifyClaimPage.verifyContent(this.ccdCaseData);
        await certificateOfService1NotifyClaimPage.fillDetails();
        await certificateOfService1NotifyClaimPage.submit();

        const { submitNotifyClaimPage } = this.notifyClaimPageFactory;
        await submitNotifyClaimPage.verifyContent(this.ccdCaseData);
        await submitNotifyClaimPage.submit();

        const { confirmNotifyClaimCOSPage } = this.notifyClaimPageFactory;
        await confirmNotifyClaimCOSPage.verifyContent(this.ccdCaseData);
        await confirmNotifyClaimCOSPage.submit();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }

  async NotifyClaim1v2LIPS() {
    await this.retryExuiEvent(
      async () => {
        const { certificateOfService1NotifyClaimPage } = this.notifyClaimPageFactory;
        await certificateOfService1NotifyClaimPage.verifyContent(this.ccdCaseData);
        await certificateOfService1NotifyClaimPage.fillDetails();
        await certificateOfService1NotifyClaimPage.submit();

        const { certificateOfService2NotifyClaimPage } = this.notifyClaimPageFactory;
        await certificateOfService2NotifyClaimPage.verifyContent(this.ccdCaseData);
        await certificateOfService2NotifyClaimPage.fillDetails();
        await certificateOfService2NotifyClaimPage.submit();

        const { submitNotifyClaimPage } = this.notifyClaimPageFactory;
        await submitNotifyClaimPage.verifyContent(this.ccdCaseData);
        await submitNotifyClaimPage.submit();

        const { confirmNotifyClaimCOSPage } = this.notifyClaimPageFactory;
        await confirmNotifyClaimCOSPage.verifyContent(this.ccdCaseData);
        await confirmNotifyClaimCOSPage.submit();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }

  async NotifyClaim1v1LIP1LR() {
    await this.retryExuiEvent(
      async () => {
        const { accessGrantedWarningPage } = this.notifyClaimPageFactory;
        await accessGrantedWarningPage.verifyContent(this.ccdCaseData);
        await accessGrantedWarningPage.submit();

        const { certificateOfService2NotifyClaimPage } = this.notifyClaimPageFactory;
        await certificateOfService2NotifyClaimPage.verifyContent(this.ccdCaseData);
        await certificateOfService2NotifyClaimPage.fillDetails();
        await certificateOfService2NotifyClaimPage.submit();

        const { submitNotifyClaimPage } = this.notifyClaimPageFactory;
        await submitNotifyClaimPage.verifyContent(this.ccdCaseData);
        await submitNotifyClaimPage.submit();

        const { confirmNotifyClaimCOSPage } = this.notifyClaimPageFactory;
        await confirmNotifyClaimCOSPage.verifyContent(this.ccdCaseData);
        await confirmNotifyClaimCOSPage.submit();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }
}
