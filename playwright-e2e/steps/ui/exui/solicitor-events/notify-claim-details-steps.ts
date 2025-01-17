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
        const { uploadDocumentsPage } = this.notifyClaimDetailsPageFactory;
        await uploadDocumentsPage.verifyContent(this.ccdCaseData);
        await uploadDocumentsPage.uploadDocuments();
        await uploadDocumentsPage.submit();

        const { notifyClaimDetailsSubmitPage } = this.notifyClaimDetailsPageFactory;
        await notifyClaimDetailsSubmitPage.verifyContent(this.ccdCaseData);
        await notifyClaimDetailsSubmitPage.submit();

        const { notifyClaimDetailsConfirmPage } = this.notifyClaimDetailsPageFactory;
        await notifyClaimDetailsConfirmPage.verifyContent();
        await notifyClaimDetailsConfirmPage.submit();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
      { retries: 0 },
    );
  }
}
