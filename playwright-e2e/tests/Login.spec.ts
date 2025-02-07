import defendantResponseMultiClaimSpec from '../../e2e/fixtures/events/defendantResponseMultiClaimSpec';
import { civilAdminUser, defendantSolicitor1User } from '../config/users/exui-users';
import { test } from '../playwright-fixtures/index';

test(
  'Testing Login',
  { tag: '@debug' },
  async ({
    IdamSteps,
    ExuiDashboardSteps,
    ApiUserSteps,
    ApiDataSteps,
    _requestsFactory,
    _exuiDashboardPageFactory,
    _notifyClaimPageFactory,
    AddDefendantLitigationFriendSteps,
  }) => {
    await ApiUserSteps.SetupUserData(defendantSolicitor1User);
    // await ApiDataSteps.SetupBankHolidaysData();
    await IdamSteps.DefendantSolicitor1Login();
    // await ExuiDashboardSteps.GoToCaseDetails();
    await AddDefendantLitigationFriendSteps.Defendant1Journey();

    // const { ccdRequests } = _requestsFactory;
    // const ccdCaseData = await ccdRequests.fetchCCDCaseData(1732120625619001, civilAdminUser);

    // const { caseDetailsPage } = _exuiDashboardPageFactory;
    // await caseDetailsPage.goToCaseDetails(1732120625619001);
    // await caseDetailsPage.verifyContent(ccdCaseData);
    // await caseDetailsPage.retryChooseNextStep(ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM);

    // const { certificateOfService1NotifyClaimPage } = _notifyClaimPageFactory;
    // await certificateOfService1NotifyClaimPage.verifyContent(ccdCaseData);
    // await certificateOfService1NotifyClaimPage.fillDetails();
    // await certificateOfService1NotifyClaimPage.submit();

    // const { certificateOfService2NotifyClaimPage } = _notifyClaimPageFactory;
    // await certificateOfService2NotifyClaimPage.verifyContent(ccdCaseData);
    // await certificateOfService2NotifyClaimPage.fillDetails();
    // await certificateOfService2NotifyClaimPage.submit();

    // const { notifyClaimCOSSubmitPage } = _notifyClaimPageFactory;
    // await notifyClaimCOSSubmitPage.verifyContent(ccdCaseData);

    // await notifyClaimDetailsCOSSubmitPage.submit();
  },
);
