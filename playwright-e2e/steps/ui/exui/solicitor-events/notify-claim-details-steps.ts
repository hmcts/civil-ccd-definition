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

  async NotifyClaimDetails1v2() {
    //await this.fetchAndSetCCDCaseData(claimantSolicitorUser,  1738063916487635);
    await this.retryExuiEvent(
      async () => {
        const { selectDefendantSolicitorPage } = this.notifyClaimDetailsPageFactory;
        await selectDefendantSolicitorPage.verifyContent(this.ccdCaseData);
        await selectDefendantSolicitorPage.selectBoth();
        await selectDefendantSolicitorPage.submit();

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
}
