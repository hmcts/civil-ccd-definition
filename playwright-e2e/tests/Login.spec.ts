import { civilAdminUser } from '../config/users/exui-users';
import ccdEvents from '../fixtures/ccd-events/events';
import { test } from '../playwright-fixtures/index';

test('Testing Login', async ({ IdamSteps, ExuiDashboardSteps, ApiUserSteps, ApiDataSteps, _requestsFactory, _exuiDashboardPageFactory, _notifyClaimPageFactory, _defendantResponsePageFactory }) => {
  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.DefendantSolicitor1Login();
  await ExuiDashboardSteps.GoToCaseList();

  const { ccdRequests } = _requestsFactory;
  const ccdCaseData = await ccdRequests.fetchCCDCaseData(1733742371498865, civilAdminUser);

  const { caseDetailsPage } = _exuiDashboardPageFactory;
  await caseDetailsPage.goToCaseDetails(1733742371498865);
  await caseDetailsPage.verifyContent(ccdCaseData);
  await caseDetailsPage.retryChooseNextStep(ccdEvents.DEFENDANT_RESPONSE_SPEC);

  const { checkIfYouNeedToCompleteClaimTimelinePage } = _defendantResponsePageFactory;
  await checkIfYouNeedToCompleteClaimTimelinePage.verifyContent(ccdCaseData);
  await checkIfYouNeedToCompleteClaimTimelinePage.submit();

  const { confirmNameAndAddressPage } = _defendantResponsePageFactory;
  await confirmNameAndAddressPage.verifyContent(ccdCaseData);
  await confirmNameAndAddressPage.selectYesDefendant1();
  await confirmNameAndAddressPage.submit();

  const { defendantsLegalRepsReferencePage } = _defendantResponsePageFactory;
  await defendantsLegalRepsReferencePage.verifyContent(ccdCaseData);
  await defendantsLegalRepsReferencePage.selectYes();
  await defendantsLegalRepsReferencePage.submit();

  const { intendToFileSingleResponsePage } = _defendantResponsePageFactory;
  await intendToFileSingleResponsePage.verifyContent(ccdCaseData);
  await intendToFileSingleResponsePage.selectYes2v1();
  await intendToFileSingleResponsePage.submit();

  const { respondToClaimPage } = _defendantResponsePageFactory;
  await respondToClaimPage.verifyContent(ccdCaseData);
  await respondToClaimPage.selectDefends(1);
  await respondToClaimPage.submit();

  const { whyDoesDefendantNotOweMoneyPage } = _defendantResponsePageFactory;
  await whyDoesDefendantNotOweMoneyPage.verifyContent(ccdCaseData);
  await whyDoesDefendantNotOweMoneyPage.selectDisputesClaim();
  await whyDoesDefendantNotOweMoneyPage.submit();

  const { whyDoesDefendantDisputeClaimPage } = _defendantResponsePageFactory;
  await whyDoesDefendantDisputeClaimPage.verifyContent(ccdCaseData);
  await whyDoesDefendantDisputeClaimPage.input1v1();
  await whyDoesDefendantDisputeClaimPage.submit();

  const { howToAddClaimTimelinePage } = _defendantResponsePageFactory;
  await howToAddClaimTimelinePage.verifyContent(ccdCaseData);
  await howToAddClaimTimelinePage.selectManually();
  await howToAddClaimTimelinePage.submit();

  const { addTimelineOfEventsPage } = _defendantResponsePageFactory;
  await addTimelineOfEventsPage.verifyContent(ccdCaseData);
  await addTimelineOfEventsPage.submit();

  const { mediationPage } = _defendantResponsePageFactory;
  await mediationPage.verifyContent(ccdCaseData);
  await mediationPage.selectNo();
  await mediationPage.submit();

  const { useOfExpertPage } = _defendantResponsePageFactory;
  await useOfExpertPage.verifyContent(ccdCaseData);
  await useOfExpertPage.selectNoSmallTrack();
  await useOfExpertPage.submit();

  const { witnessesPage } = _defendantResponsePageFactory;
  await witnessesPage.verifyContent(ccdCaseData);
  await witnessesPage.selectNoSmallTrack();
  await witnessesPage.submit();

  const { welshLanguagePage } = _defendantResponsePageFactory;
  await welshLanguagePage.verifyContent(ccdCaseData);
  await welshLanguagePage.selectSpeakingEnglish();
  await welshLanguagePage.selectDocumentsEnglish();
  await welshLanguagePage.submit();

  const { hearingAvailabilityPage } = _defendantResponsePageFactory;
  await hearingAvailabilityPage.verifyContent(ccdCaseData);
  await hearingAvailabilityPage.selectNoAvailabilitySmallTrack();
  await hearingAvailabilityPage.selectNoInterpreterSmallTack();
  await hearingAvailabilityPage.submit();

  const { courtLocationPage } = _defendantResponsePageFactory;
  await courtLocationPage.verifyContent(ccdCaseData);
  await courtLocationPage.selectCourtLocation();
  await courtLocationPage.selectNo(1);
  await courtLocationPage.submit();

  const { supportWithAccessNeedsPage } = _defendantResponsePageFactory;
  await supportWithAccessNeedsPage.verifyContent(ccdCaseData);
  await supportWithAccessNeedsPage.selectNo();
  await supportWithAccessNeedsPage.submit();

  const { vulnerabilityQuestionsPage } = _defendantResponsePageFactory;
  await vulnerabilityQuestionsPage.verifyContent(ccdCaseData);
  await vulnerabilityQuestionsPage.selectNo();
  await vulnerabilityQuestionsPage.submit();

  const { statementOfTruthPage } = _defendantResponsePageFactory;
  await statementOfTruthPage.verifyContent(ccdCaseData);
  await statementOfTruthPage.enterName();
  await statementOfTruthPage.enterRole();
  await statementOfTruthPage.submit();
});
