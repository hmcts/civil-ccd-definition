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

  const { checkIfYouNeedToCompleteClaimTimelinePage: defendantResponseCheckIfYouNeedToCompleteClaimTimelinePage } = _defendantResponsePageFactory;
  await defendantResponseCheckIfYouNeedToCompleteClaimTimelinePage.verifyContent(ccdCaseData);
  await defendantResponseCheckIfYouNeedToCompleteClaimTimelinePage.submit();

  const { confirmNameAndAddressPage: defendantResponseConfirmNameAndAddressPage } = _defendantResponsePageFactory;
  await defendantResponseConfirmNameAndAddressPage.verifyContent(ccdCaseData);
  await defendantResponseConfirmNameAndAddressPage.selectYes();
  await defendantResponseConfirmNameAndAddressPage.submit();

  const { defendantsLegalRepsReferencePage: defendantResponseDefendantsLegalRepsReferencePage } = _defendantResponsePageFactory;
  await defendantResponseDefendantsLegalRepsReferencePage.verifyContent(ccdCaseData);
  await defendantResponseDefendantsLegalRepsReferencePage.selectYes();
  await defendantResponseDefendantsLegalRepsReferencePage.submit();

  const { defendantResponseRespondToClaimPage } = _defendantResponsePageFactory;
  await defendantResponseRespondToClaimPage.verifyContent(ccdCaseData);
  await defendantResponseRespondToClaimPage.selectDefends();
  await defendantResponseRespondToClaimPage.submit();

  const { whyDoesDefendantNotOweMoneyPage: defendantResponseWhyDoesDefendantNotOweMoneyPage } = _defendantResponsePageFactory;
  await defendantResponseWhyDoesDefendantNotOweMoneyPage.verifyContent(ccdCaseData);
  await defendantResponseWhyDoesDefendantNotOweMoneyPage.selectDisputesClaim();
  await defendantResponseWhyDoesDefendantNotOweMoneyPage.submit();

  const { whyDoesDefendantDisputeClaimPage } = _defendantResponsePageFactory;
  await whyDoesDefendantDisputeClaimPage.verifyContent(ccdCaseData);
  await whyDoesDefendantDisputeClaimPage.submit();

  const { howToAddClaimTimelinePage: defendantResponseHowToAddClaimTimelinePage } = _defendantResponsePageFactory;
  await defendantResponseHowToAddClaimTimelinePage.verifyContent(ccdCaseData);
  await defendantResponseHowToAddClaimTimelinePage.selectManually();
  await defendantResponseHowToAddClaimTimelinePage.submit();

  const { addTimelineOfEventsPage: defendantResponseAddTimelineOfEventsPage } = _defendantResponsePageFactory;
  await defendantResponseAddTimelineOfEventsPage.verifyContent(ccdCaseData);
  await defendantResponseAddTimelineOfEventsPage.submit();

  const { mediationPage } = _defendantResponsePageFactory;
  await mediationPage.verifyContent(ccdCaseData);
  await mediationPage.selectYes();
  await mediationPage.submit();

  const { useOfExpertPage: defendantResponseUseOfExpertPage } = _defendantResponsePageFactory;
  await defendantResponseUseOfExpertPage.verifyContent(ccdCaseData);
  await defendantResponseUseOfExpertPage.selectNo();
  await defendantResponseUseOfExpertPage.submit();

  const { witnessesPage: defendantResponseWitnessesPage } = _defendantResponsePageFactory;
  await defendantResponseWitnessesPage.verifyContent(ccdCaseData);
  await defendantResponseWitnessesPage.selectNo();
  await defendantResponseWitnessesPage.submit();

  const { welshLanguagePage: defendantResponseWelshLanguagePage } = _defendantResponsePageFactory;
  await defendantResponseWelshLanguagePage.verifyContent(ccdCaseData);
  await defendantResponseWelshLanguagePage.selectSpeakingEnglish();
  await defendantResponseWelshLanguagePage.selectDocumentsEnglish();
  await defendantResponseWelshLanguagePage.submit();

  const { hearingAvailabilityPage: defendantResponseHearingAvailabilityPage } = _defendantResponsePageFactory;
  await defendantResponseHearingAvailabilityPage.verifyContent(ccdCaseData);
  await defendantResponseHearingAvailabilityPage.selectNoAvailability();
  await defendantResponseHearingAvailabilityPage.selectNoInterpreter();
  await defendantResponseHearingAvailabilityPage.submit();

  const { courtLocationPage: defendantResponseCourtLocationPage } = _defendantResponsePageFactory;
  await defendantResponseCourtLocationPage.verifyContent(ccdCaseData);
  await defendantResponseCourtLocationPage.selectCourtLocation();
  await defendantResponseCourtLocationPage.selectNo();
  await defendantResponseCourtLocationPage.submit();

  const { supportWithAccessNeedsPage: defendantResponseSupportWithAccessNeedsPage } = _defendantResponsePageFactory;
  await defendantResponseSupportWithAccessNeedsPage.verifyContent(ccdCaseData);
  await defendantResponseSupportWithAccessNeedsPage.selectNo();
  await defendantResponseSupportWithAccessNeedsPage.submit();

  const { vulnerabilityQuestionsPage: defendantResponseVulnerabilityQuestionsPage } = _defendantResponsePageFactory;
  await defendantResponseVulnerabilityQuestionsPage.verifyContent(ccdCaseData);
  await defendantResponseVulnerabilityQuestionsPage.selectNo();
  await defendantResponseVulnerabilityQuestionsPage.submit();

  const { statementOfTruthPage: defendantResponseStatementOfTruthPage } = _defendantResponsePageFactory;
  await defendantResponseStatementOfTruthPage.verifyContent(ccdCaseData);
  await defendantResponseStatementOfTruthPage.enterName();
  await defendantResponseStatementOfTruthPage.enterRole();
  await defendantResponseStatementOfTruthPage.submit();
});
