import BaseExuiSteps from '../../../../base/base-exui-steps';
import { claimantSolicitorUser } from '../../../../config/users/exui-users';
import { Step } from '../../../../decorators/test-steps';
import ccdEvents from '../../../../constants/ccd-events';
import TestData from '../../../../models/test-data';
import ExuiDashboardPageFactory from '../../../../pages/exui/exui-dashboard/exui-dashboard-page-factory';
import NotifyClaimPageFactory from '../../../../pages/exui/solicitor-events/notify-claim/notify-claim-page-factory';
import RequestsFactory from '../../../../requests/requests-factory';

const classKey = 'NotifyClaimSteps';

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

  @Step(classKey)
  async NotifyClaim1v1() {
    await this.retryExuiEvent(
      async () => {
        await this.processAccessGrantedWarningPage();
        await this.processSubmitNotifyClaimPage();
        await this.processConfirmNotifyClaimPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }

  @Step(classKey)
  async NotifyClaim2v1() {
    await this.retryExuiEvent(
      async () => {
        await this.processAccessGrantedWarningPage();
        await this.processSubmitNotifyClaimPage();
        await this.processConfirmNotifyClaimPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }

  @Step(classKey)
  async NotifyClaim1v2SS() {
    await this.retryExuiEvent(
      async () => {
        await this.processDefendantSolicitorToNotifyPage();
        await this.processAccessGrantedWarningPage();
        await this.processSubmitNotifyClaimPage();
        await this.processConfirmNotifyClaimPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }

  @Step(classKey)
  async NotifyClaim1v2DS() {
    await this.retryExuiEvent(
      async () => {
        await this.processDefendantSolicitorToNotifyPage();
        await this.processAccessGrantedWarningPage();
        await this.processSubmitNotifyClaimPage();
        await this.processConfirmNotifyClaimPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }

  @Step(classKey)
  async NotifyClaim1v1LIP() {
    await this.retryExuiEvent(
      async () => {
        await this.processCertificateOfService1NotifyClaimPage();
        await this.processSubmitNotifyClaimPage();
        await this.processConfirmNotifyClaimCOSPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }

  @Step(classKey)
  async NotifyClaim1v2LIPS() {
    await this.retryExuiEvent(
      async () => {
        await this.processCertificateOfService1NotifyClaimPage();
        await this.processCertificateOfService2NotifyClaimPage();
        await this.processSubmitNotifyClaimPage();
        await this.processConfirmNotifyClaimCOSPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }

  @Step(classKey)
  async NotifyClaim1v1LIP1LR() {
    await this.retryExuiEvent(
      async () => {
        await this.processAccessGrantedWarningPage();
        await this.processCertificateOfService2NotifyClaimPage();
        await this.processSubmitNotifyClaimPage();
        await this.processConfirmNotifyClaimCOSPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }

  private async processDefendantSolicitorToNotifyPage() {
    const { defendantSolicitorToNotify } = this.notifyClaimPageFactory;
    await defendantSolicitorToNotify.verifyContent(this.ccdCaseData);
    await defendantSolicitorToNotify.selectBoth();
    await defendantSolicitorToNotify.submit();
  }

  private async processAccessGrantedWarningPage() {
    const { accessGrantedWarningPage } = this.notifyClaimPageFactory;
    await accessGrantedWarningPage.verifyContent(this.ccdCaseData);
    await accessGrantedWarningPage.submit();
  }

  private async processCertificateOfService1NotifyClaimPage() {
    const { certificateOfService1NotifyClaimPage } = this.notifyClaimPageFactory;
    await certificateOfService1NotifyClaimPage.verifyContent(this.ccdCaseData);
    await certificateOfService1NotifyClaimPage.fillDetails();
    await certificateOfService1NotifyClaimPage.submit();
  }

  private async processCertificateOfService2NotifyClaimPage() {
    const { certificateOfService2NotifyClaimPage } = this.notifyClaimPageFactory;
    await certificateOfService2NotifyClaimPage.verifyContent(this.ccdCaseData);
    await certificateOfService2NotifyClaimPage.fillDetails();
    await certificateOfService2NotifyClaimPage.submit();
  }

  private async processSubmitNotifyClaimPage() {
    const { submitNotifyClaimPage } = this.notifyClaimPageFactory;
    await submitNotifyClaimPage.verifyContent(this.ccdCaseData);
    await submitNotifyClaimPage.submit();
  }

  private async processConfirmNotifyClaimPage() {
    const { confirmNotifyClaimPage } = this.notifyClaimPageFactory;
    await confirmNotifyClaimPage.verifyContent();
    await confirmNotifyClaimPage.submit();
  }

  private async processConfirmNotifyClaimCOSPage() {
    const { confirmNotifyClaimCOSPage } = this.notifyClaimPageFactory;
    await confirmNotifyClaimCOSPage.verifyContent(this.ccdCaseData);
    await confirmNotifyClaimCOSPage.submit();
  }
}
