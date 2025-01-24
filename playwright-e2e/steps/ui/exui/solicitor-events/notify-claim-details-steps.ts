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
        const { uploadNotifyClaimDetailsPage } = this.notifyClaimDetailsPageFactory;
        await uploadNotifyClaimDetailsPage.verifyContent(this.ccdCaseData);
        await uploadNotifyClaimDetailsPage.uploadDocuments();
        await uploadNotifyClaimDetailsPage.submit();

        const { submitNotifyClaimDetailsPage } = this.notifyClaimDetailsPageFactory;
        await submitNotifyClaimDetailsPage.verifyContent(this.ccdCaseData);
        await submitNotifyClaimDetailsPage.submit();

        const { confirmNotifyClaimDetailsPage } = this.notifyClaimDetailsPageFactory;
        await confirmNotifyClaimDetailsPage.verifyContent();
        await confirmNotifyClaimDetailsPage.submit();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
    );
  }

  async NotifyClaimDetails2v1() {
    await this.retryExuiEvent(
      async () => {
        const { uploadDocumentsPage } = this.notifyClaimDetailsPageFactory;
        await uploadDocumentsPage.verifyContent(this.ccdCaseData);
        await uploadDocumentsPage.uploadDocuments();
        await uploadDocumentsPage.submit();

        const { submitNotifyClaimDetailsPage } = this.notifyClaimDetailsPageFactory;
        await submitNotifyClaimDetailsPage.verifyContent(this.ccdCaseData);
        await submitNotifyClaimDetailsPage.submit();

        const { confirmNotifyClaimDetailsPage } = this.notifyClaimDetailsPageFactory;
        await confirmNotifyClaimDetailsPage.verifyContent();
        await confirmNotifyClaimDetailsPage.submit();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
      { retries: 0 },
    );
  }

  async NotifyClaimDetails1v2SS() {
    await this.retryExuiEvent(
      async () => {
        const { uploadDocumentsPage } = this.notifyClaimDetailsPageFactory;
        await uploadDocumentsPage.verifyContent(this.ccdCaseData);
        await uploadDocumentsPage.uploadDocuments();
        await uploadDocumentsPage.submit();

        const { submitNotifyClaimDetailsPage } = this.notifyClaimDetailsPageFactory;
        await submitNotifyClaimDetailsPage.verifyContent(this.ccdCaseData);
        await submitNotifyClaimDetailsPage.submit();

        const { confirmNotifyClaimDetailsPage } = this.notifyClaimDetailsPageFactory;
        await confirmNotifyClaimDetailsPage.verifyContent();
        await confirmNotifyClaimDetailsPage.submit();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
      { retries: 0 },
    );
  }

  async NotifyClaimDetails1v2DS() {
    await this.retryExuiEvent(
      async () => {
        const { selectDefendantSolicitorPage } = this.notifyClaimDetailsPageFactory;
        await selectDefendantSolicitorPage.verifyContent(this.ccdCaseData);
        await selectDefendantSolicitorPage.selectBoth();
        await selectDefendantSolicitorPage.submit();

        const { uploadDocumentsPage } = this.notifyClaimDetailsPageFactory;
        await uploadDocumentsPage.verifyContent(this.ccdCaseData);
        await uploadDocumentsPage.uploadDocuments();
        await uploadDocumentsPage.submit();

        const { submitNotifyClaimDetailsPage } = this.notifyClaimDetailsPageFactory;
        await submitNotifyClaimDetailsPage.verifyContent(this.ccdCaseData);
        await submitNotifyClaimDetailsPage.submit();

        const { confirmNotifyClaimDetailsPage } = this.notifyClaimDetailsPageFactory;
        await confirmNotifyClaimDetailsPage.verifyContent();
        await confirmNotifyClaimDetailsPage.submit();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
      { retries: 0 },
    );
  }

  async NotifyClaimDetails1v1LIP() {
    await this.retryExuiEvent(
      async () => {
        const { certificateOfService1NotifyClaimDetailsPage } = this.notifyClaimDetailsPageFactory;
        await certificateOfService1NotifyClaimDetailsPage.verifyContent();
        await certificateOfService1NotifyClaimDetailsPage.fillDetails();
        await certificateOfService1NotifyClaimDetailsPage.submit();

        const { submitNotifyClaimDetails_LIP_Page } = this.notifyClaimDetailsPageFactory;
        await submitNotifyClaimDetails_LIP_Page.verifyContent(this.ccdCaseData);
        await submitNotifyClaimDetails_LIP_Page.submit();

        const { confirmNotifyClaimDetailsCOSPage } = this.notifyClaimDetailsPageFactory;
        await confirmNotifyClaimDetailsCOSPage.verifyContent();
        await confirmNotifyClaimDetailsCOSPage.submit();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
      { retries: 0 },
    );
  }

  async NotifyClaimDetails1v2LIPS() {
    await this.retryExuiEvent(
      async () => {
        const { certificateOfService1NotifyClaimDetailsPage } = this.notifyClaimDetailsPageFactory;
        await certificateOfService1NotifyClaimDetailsPage.verifyContent();
        await certificateOfService1NotifyClaimDetailsPage.fillDetails();
        await certificateOfService1NotifyClaimDetailsPage.submit();

        const { certificateOfService2NotifyClaimDetailsPage } = this.notifyClaimDetailsPageFactory;
        await certificateOfService2NotifyClaimDetailsPage.verifyContent(this.ccdCaseData);
        await certificateOfService2NotifyClaimDetailsPage.fillDetails();
        await certificateOfService2NotifyClaimDetailsPage.submit();

        const { submitNotifyClaimDetailsCOSPage } = this.notifyClaimDetailsPageFactory;
        await submitNotifyClaimDetailsCOSPage.verifyContent(this.ccdCaseData);
        await submitNotifyClaimDetailsCOSPage.submit();

        const { confirmNotifyClaimDetailsCOSPage } = this.notifyClaimDetailsPageFactory;
        await confirmNotifyClaimDetailsCOSPage.verifyContent();
        await confirmNotifyClaimDetailsCOSPage.submit();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
      { retries: 0 },
    );
  }

  async NotifyClaimDetails1v1LIP1LR() {
    await this.retryExuiEvent(
      async () => {
        const { uploadDocumentsPage } = this.notifyClaimDetailsPageFactory;
        await uploadDocumentsPage.verifyContent(this.ccdCaseData);
        await uploadDocumentsPage.uploadDocuments();
        await uploadDocumentsPage.submit();

        const { certificateOfService2NotifyClaimDetailsPage } = this.notifyClaimDetailsPageFactory;
        await certificateOfService2NotifyClaimDetailsPage.verifyContent(this.ccdCaseData);
        await certificateOfService2NotifyClaimDetailsPage.fillDetails();
        await certificateOfService2NotifyClaimDetailsPage.submit();

        const { submitNotifyClaimDetails_LIP_LR_Page } = this.notifyClaimDetailsPageFactory;
        await submitNotifyClaimDetails_LIP_LR_Page.verifyContent(this.ccdCaseData);
        await submitNotifyClaimDetails_LIP_LR_Page.submit();

        const { confirmNotifyClaimDetailsCOSPage } = this.notifyClaimDetailsPageFactory;
        await confirmNotifyClaimDetailsCOSPage.verifyContent();
        await confirmNotifyClaimDetailsCOSPage.submit();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
      { retries: 0 },
    );
  }
}
