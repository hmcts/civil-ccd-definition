import BaseExuiSteps from '../../../../base/base-exui-steps';
import BaseSteps from '../../../../base/base-steps';
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

        const { notifyClaimSubmitPage } = this.notifyClaimPageFactory;
        await notifyClaimSubmitPage.verifyContent(this.ccdCaseData);
        await notifyClaimSubmitPage.submit();

        const { notifyClaimConfirmPage } = this.notifyClaimPageFactory;
        await notifyClaimConfirmPage.verifyContent();
        await notifyClaimConfirmPage.submit();
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

        const { notifyClaimSubmitPage } = this.notifyClaimPageFactory;
        await notifyClaimSubmitPage.verifyContent(this.ccdCaseData);
        await notifyClaimSubmitPage.submit();

        const { notifyClaimConfirmPage } = this.notifyClaimPageFactory;
        await notifyClaimConfirmPage.verifyContent();
        await notifyClaimConfirmPage.submit();
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

        const { notifyClaimSubmitPage } = this.notifyClaimPageFactory;
        await notifyClaimSubmitPage.verifyContent(this.ccdCaseData);
        await notifyClaimSubmitPage.submit();

        const { notifyClaimConfirmPage } = this.notifyClaimPageFactory;
        await notifyClaimConfirmPage.verifyContent();
        await notifyClaimConfirmPage.submit();
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

        const { notifyClaimSubmitPage } = this.notifyClaimPageFactory;
        await notifyClaimSubmitPage.verifyContent(this.ccdCaseData);
        await notifyClaimSubmitPage.submit();

        const { notifyClaimConfirmPage } = this.notifyClaimPageFactory;
        await notifyClaimConfirmPage.verifyContent();
        await notifyClaimConfirmPage.submit();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }

  async NotifyClaim1v1LIP() {
    await this.retryExuiEvent(
      async () => {
        const { notifyClaimCOSDefendant1Page } = this.notifyClaimPageFactory;
        await notifyClaimCOSDefendant1Page.verifyContent(this.ccdCaseData);
        await notifyClaimCOSDefendant1Page.fillDetails();
        await notifyClaimCOSDefendant1Page.submit();

        const { notifyClaimSubmitPage } = this.notifyClaimPageFactory;
        await notifyClaimSubmitPage.verifyContent(this.ccdCaseData);
        await notifyClaimSubmitPage.submit();

        const { notifyClaimCOSConfirmPage } = this.notifyClaimPageFactory;
        await notifyClaimCOSConfirmPage.verifyContent(this.ccdCaseData);
        await notifyClaimCOSConfirmPage.submit();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }

  async NotifyClaim1v2LIPS() {
    await this.retryExuiEvent(
      async () => {
        const { notifyClaimCOSDefendant1Page } = this.notifyClaimPageFactory;
        await notifyClaimCOSDefendant1Page.verifyContent(this.ccdCaseData);
        await notifyClaimCOSDefendant1Page.fillDetails();
        await notifyClaimCOSDefendant1Page.submit();

        const { notifyClaimCOSDefendant2Page } = this.notifyClaimPageFactory;
        await notifyClaimCOSDefendant2Page.verifyContent(this.ccdCaseData);
        await notifyClaimCOSDefendant2Page.fillDetails();
        await notifyClaimCOSDefendant2Page.submit();

        const { notifyClaimSubmitPage } = this.notifyClaimPageFactory;
        await notifyClaimSubmitPage.verifyContent(this.ccdCaseData);
        await notifyClaimSubmitPage.submit();

        const { notifyClaimCOSConfirmPage } = this.notifyClaimPageFactory;
        await notifyClaimCOSConfirmPage.verifyContent(this.ccdCaseData);
        await notifyClaimCOSConfirmPage.submit();
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

        const { notifyClaimCOSDefendant2Page } = this.notifyClaimPageFactory;
        await notifyClaimCOSDefendant2Page.verifyContent(this.ccdCaseData);
        await notifyClaimCOSDefendant2Page.fillDetails();
        await notifyClaimCOSDefendant2Page.submit();

        const { notifyClaimSubmitPage } = this.notifyClaimPageFactory;
        await notifyClaimSubmitPage.verifyContent(this.ccdCaseData);
        await notifyClaimSubmitPage.submit();

        const { notifyClaimCOSConfirmPage } = this.notifyClaimPageFactory;
        await notifyClaimCOSConfirmPage.verifyContent(this.ccdCaseData);
        await notifyClaimCOSConfirmPage.submit();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }
}
