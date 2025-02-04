import BaseExuiSteps from '../../../../base/base-exui-steps';
import { claimantSolicitorUser } from '../../../../config/users/exui-users';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ccdEvents from '../../../../constants/ccd-events';
import TestData from '../../../../models/test-data';
import ExuiDashboardPageFactory from '../../../../pages/exui/exui-dashboard/exui-dashboard-page-factory';
import NotifyClaimDetailsPageFactory from '../../../../pages/exui/solicitor-events/notify-claim-details/notify-claim-details-page-factory';
import RequestsFactory from '../../../../requests/requests-factory';

@AllMethodsStep()
export default class NotifyClaimDetailsSteps extends BaseExuiSteps {
  private notifyClaimDetailsPageFactory: NotifyClaimDetailsPageFactory;

  constructor(
    notifyClaimDetailsPageFactory: NotifyClaimDetailsPageFactory,
    exuiDashboardPageFactory: ExuiDashboardPageFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(exuiDashboardPageFactory, requestsFactory, testData);
    this.notifyClaimDetailsPageFactory = notifyClaimDetailsPageFactory;
  }

  async NotifyClaimDetails1v1() {
    await this.retryExuiEvent(
      async () => {
        await this.processUploadNotifyClaimDetailsPage();
        await this.processSubmitNotifyClaimDetailsPage();
        await this.processConfirmNotifyClaimDetailsPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
    );
  }

  async NotifyClaimDetails2v1() {
    await this.retryExuiEvent(
      async () => {
        await this.processUploadNotifyClaimDetailsPage();
        await this.processSubmitNotifyClaimDetailsPage();
        await this.processConfirmNotifyClaimDetailsPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
    );
  }

  async NotifyClaimDetails1v2SS() {
    await this.retryExuiEvent(
      async () => {
        await this.processUploadNotifyClaimDetailsPage();
        await this.processSubmitNotifyClaimDetailsPage();
        await this.processConfirmNotifyClaimDetailsPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
    );
  }

  async NotifyClaimDetails1v2DS() {
    await this.retryExuiEvent(
      async () => {
        await this.processSelectDefendantSolicitorPage();
        await this.processUploadNotifyClaimDetailsPage();
        await this.processSubmitNotifyClaimDetailsPage();
        await this.processConfirmNotifyClaimDetailsPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
    );
  }

  async NotifyClaimDetails1v1LIP() {
    await this.retryExuiEvent(
      async () => {
        await this.processCertificateOfService1NotifyClaimDetailsPage();
        await this.processSubmitNotifyClaimDetailsLIPPage();
        await this.processConfirmNotifyClaimDetailsCOSPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
    );
  }

  async NotifyClaimDetails1v2LIPS() {
    await this.retryExuiEvent(
      async () => {
        await this.processCertificateOfService1NotifyClaimDetailsPage();
        await this.processCertificateOfService2NotifyClaimDetailsPage();
        await this.processSubmitNotifyClaimDetailsCOSPage();
        await this.processConfirmNotifyClaimDetailsCOSPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
    );
  }

  async NotifyClaimDetails1v2LIPLR() {
    await this.retryExuiEvent(
      async () => {
        await this.processUploadNotifyClaimDetailsPage();
        await this.processCertificateOfService2NotifyClaimDetailsPage();
        await this.processSubmitNotifyClaimDetailsLIPLRPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
    );
  }

  private async processSelectDefendantSolicitorPage() {
    const { selectDefendantSolicitorPage } = this.notifyClaimDetailsPageFactory;
    await selectDefendantSolicitorPage.verifyContent(this.ccdCaseData);
    await selectDefendantSolicitorPage.selectBoth();
    await selectDefendantSolicitorPage.submit();
  }

  private async processUploadNotifyClaimDetailsPage() {
    const { uploadNotifyClaimDetailsPage } = this.notifyClaimDetailsPageFactory;
    await uploadNotifyClaimDetailsPage.verifyContent(this.ccdCaseData);
    await uploadNotifyClaimDetailsPage.uploadDocuments();
    await uploadNotifyClaimDetailsPage.submit();
  }

  private async processCertificateOfService1NotifyClaimDetailsPage() {
    const { certificateOfService1NotifyClaimDetailsPage } = this.notifyClaimDetailsPageFactory;
    await certificateOfService1NotifyClaimDetailsPage.verifyContent();
    await certificateOfService1NotifyClaimDetailsPage.fillDetails();
    await certificateOfService1NotifyClaimDetailsPage.submit();
  }

  private async processCertificateOfService2NotifyClaimDetailsPage() {
    const { certificateOfService2NotifyClaimDetailsPage } = this.notifyClaimDetailsPageFactory;
    await certificateOfService2NotifyClaimDetailsPage.verifyContent(this.ccdCaseData);
    await certificateOfService2NotifyClaimDetailsPage.fillDetails();
    await certificateOfService2NotifyClaimDetailsPage.submit();
  }

  private async processSubmitNotifyClaimDetailsLIPPage() {
    const { submitNotifyClaimDetailsLIPPage } = this.notifyClaimDetailsPageFactory;
    await submitNotifyClaimDetailsLIPPage.verifyContent(this.ccdCaseData);
    await submitNotifyClaimDetailsLIPPage.submit();
  }

  private async processSubmitNotifyClaimDetailsPage() {
    const { submitNotifyClaimDetailsPage } = this.notifyClaimDetailsPageFactory;
    await submitNotifyClaimDetailsPage.verifyContent(this.ccdCaseData);
    await submitNotifyClaimDetailsPage.submit();
  }

  private async processSubmitNotifyClaimDetailsCOSPage() {
    const { submitNotifyClaimDetailsCOSPage } = this.notifyClaimDetailsPageFactory;
    await submitNotifyClaimDetailsCOSPage.verifyContent(this.ccdCaseData);
    await submitNotifyClaimDetailsCOSPage.submit();
  }

  private async processSubmitNotifyClaimDetailsLIPLRPage() {
    const { submitNotifyClaimDetailsLIPLRPage } = this.notifyClaimDetailsPageFactory;
    await submitNotifyClaimDetailsLIPLRPage.verifyContent(this.ccdCaseData);
    await submitNotifyClaimDetailsLIPLRPage.submit();
  }

  private async processConfirmNotifyClaimDetailsPage() {
    const { confirmNotifyClaimDetailsPage } = this.notifyClaimDetailsPageFactory;
    await confirmNotifyClaimDetailsPage.verifyContent();
    await confirmNotifyClaimDetailsPage.submit();
  }

  private async processConfirmNotifyClaimDetailsCOSPage() {
    const { confirmNotifyClaimDetailsCOSPage } = this.notifyClaimDetailsPageFactory;
    await confirmNotifyClaimDetailsCOSPage.verifyContent();
    await confirmNotifyClaimDetailsCOSPage.submit();
  }
}
