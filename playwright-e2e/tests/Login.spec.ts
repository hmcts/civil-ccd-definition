import { civilAdminUser } from '../config/users/exui-users';
import ccdEvents from '../fixtures/ccd-events/events';
import { test } from '../playwright-fixtures/index';

test('Testing Login', async ({ IdamSteps, ExuiDashboardSteps, ApiUserSteps, ApiDataSteps, _requestsFactory, _exuiDashboardPageFactory, _notifyClaimPageFactory, _defendantResponsePageFactory }) => {
  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.DefendantSolicitor1Login();
  await ExuiDashboardSteps.GoToCaseList();

  const { ccdRequests } = _requestsFactory;
  const ccdCaseData = await ccdRequests.fetchCCDCaseData(1732722291236679, civilAdminUser);

  const { caseDetailsPage } = _exuiDashboardPageFactory;
  await caseDetailsPage.goToCaseDetails(1732722291236679);
  await caseDetailsPage.verifyContent(ccdCaseData);
  await caseDetailsPage.retryChooseNextStep(ccdEvents.DEFENDANT_RESPONSE_SPEC);

  const { defendantResponseCheckIfYouNeedToCompleteClaimTimelinePage } = _defendantResponsePageFactory;
  await defendantResponseCheckIfYouNeedToCompleteClaimTimelinePage.verifyContent(ccdCaseData);
  await defendantResponseCheckIfYouNeedToCompleteClaimTimelinePage.submit();

  const { defendantResponseConfirmNameAndAddressPage } = _defendantResponsePageFactory;
  await defendantResponseConfirmNameAndAddressPage.verifyContent();
  await defendantResponseConfirmNameAndAddressPage.selectYes();
  await defendantResponseConfirmNameAndAddressPage.submit();

  const { defendantResponseDefendantsLegalRepsReferencePage } = _defendantResponsePageFactory;
  await defendantResponseDefendantsLegalRepsReferencePage.verifyContent();
  await defendantResponseDefendantsLegalRepsReferencePage.selectYes();
  await defendantResponseDefendantsLegalRepsReferencePage.submit();

  const { defendantResponseRespondToClaimPage } = _defendantResponsePageFactory;
  await defendantResponseRespondToClaimPage.verifyContent(ccdCaseData);
  await defendantResponseRespondToClaimPage.selectDefends();
  await defendantResponseRespondToClaimPage.submit();

  const { defendantResponseWhyDoesDefendantNotOweMoneyPage } = _defendantResponsePageFactory;
  await defendantResponseWhyDoesDefendantNotOweMoneyPage.verifyContent(ccdCaseData);
  await defendantResponseWhyDoesDefendantNotOweMoneyPage.selectHasPaid();
  await defendantResponseWhyDoesDefendantNotOweMoneyPage.fillInHasPaid();
  await defendantResponseWhyDoesDefendantNotOweMoneyPage.selectCreditCard();
  await defendantResponseWhyDoesDefendantNotOweMoneyPage.submit();

  const { defendantResponseHowToAddClaimTimelinePage } = _defendantResponsePageFactory;
  await defendantResponseHowToAddClaimTimelinePage.verifyContent(ccdCaseData);
  await defendantResponseHowToAddClaimTimelinePage.selectManually();
  await defendantResponseHowToAddClaimTimelinePage.submit();

  const { defendantResponseAddTimelineOfEventsPage } = _defendantResponsePageFactory;
  await defendantResponseAddTimelineOfEventsPage.verifyContent(ccdCaseData);
  await defendantResponseAddTimelineOfEventsPage.addNewEvent();
  await defendantResponseAddTimelineOfEventsPage.submit();

  // await notifyClaimDetailsCOSSubmitPage.submit();
});
