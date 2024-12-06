import { civilAdminUser } from '../config/users/exui-users';
import ccdEvents from '../fixtures/ccd-events/events';
import { test } from '../playwright-fixtures/index';

test('Testing Login', async ({ IdamSteps, ExuiDashboardSteps, ApiUserSteps, ApiDataSteps, _requestsFactory, _exuiDashboardPageFactory, _notifyClaimPageFactory, _defendantResponsePageFactory }) => {
  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.DefendantSolicitor1Login();
  await ExuiDashboardSteps.GoToCaseList();

  const { ccdRequests } = _requestsFactory;
  const ccdCaseData = await ccdRequests.fetchCCDCaseData(1733401351805256, civilAdminUser);

  const { caseDetailsPage } = _exuiDashboardPageFactory;
  await caseDetailsPage.goToCaseDetails(1733401351805256);
  await caseDetailsPage.verifyContent(ccdCaseData);
  await caseDetailsPage.retryChooseNextStep(ccdEvents.DEFENDANT_RESPONSE_SPEC);

  const { confirmNameAndAddressPage } = _defendantResponsePageFactory;
  await confirmNameAndAddressPage.verifyContent(ccdCaseData);
  await confirmNameAndAddressPage.submit();

  const { respondToClaimPage } = _defendantResponsePageFactory;
  await respondToClaimPage.verifyContent(ccdCaseData);
  await respondToClaimPage.selectsDefendsApplicant1();
  await respondToClaimPage.selectsDefendsApplicant2();
  await respondToClaimPage.submit();

  const { solicitorReferencePage } = _defendantResponsePageFactory;
  await solicitorReferencePage.verifyContent(ccdCaseData);
  await solicitorReferencePage.fillInput();
  await solicitorReferencePage.submit();

  const { uploadDefencePage } = _defendantResponsePageFactory;
  await uploadDefencePage.verifyContent(ccdCaseData);
  await uploadDefencePage.uploadFile();
  await uploadDefencePage.submit();

  const { fileDirectionsQuestionnairePage } = _defendantResponsePageFactory;
  await fileDirectionsQuestionnairePage.verifyContent(ccdCaseData);
  await fileDirectionsQuestionnairePage.selectCheckBox();
  await fileDirectionsQuestionnairePage.selectYesOneMonthStay();
  await fileDirectionsQuestionnairePage.selectYesComplied();
  await fileDirectionsQuestionnairePage.submit();

  const { fixedRecoverableCostsPage } = _defendantResponsePageFactory;
  await fixedRecoverableCostsPage.verifyContent(ccdCaseData);
  await fixedRecoverableCostsPage.selectNo();
  await fixedRecoverableCostsPage.submit();

  const { disclosureOfNonElectronicDocumentsPage } = _defendantResponsePageFactory;
  await disclosureOfNonElectronicDocumentsPage.verifyContent(ccdCaseData);
  await disclosureOfNonElectronicDocumentsPage.selectNo();
  await disclosureOfNonElectronicDocumentsPage.submit();

  const { useOfExpertPage } = _defendantResponsePageFactory;
  await useOfExpertPage.verifyContent(ccdCaseData);
  await useOfExpertPage.selectNoFastTrack();
  await useOfExpertPage.submit();

  const { witnessesPage } = _defendantResponsePageFactory;
  await witnessesPage.verifyContent(ccdCaseData);
  await witnessesPage.selectNoFastTrack1v2(1);
  await witnessesPage.submit();

  const { welshLanguagePage } = _defendantResponsePageFactory;
  await welshLanguagePage.verifyContent(ccdCaseData);
  await welshLanguagePage.selectSpeakingEnglish();
  await welshLanguagePage.selectDocumentsEnglish();
  await welshLanguagePage.submit();

  const { hearingAvailabilityPage } = _defendantResponsePageFactory;
  await hearingAvailabilityPage.verifyContent(ccdCaseData);
  await hearingAvailabilityPage.selectNoAvailability2v1();
  await hearingAvailabilityPage.submit();

  const { uploadDraftDirectionsPage } = _defendantResponsePageFactory;
  await uploadDraftDirectionsPage.verifyContent(ccdCaseData);
  await uploadDraftDirectionsPage.uploadFile();
  await uploadDraftDirectionsPage.submit();

  const { courtLocationPage } = _defendantResponsePageFactory;
  await courtLocationPage.verifyContent(ccdCaseData);
  await courtLocationPage.selectCourtLocation2v1();
  await courtLocationPage.selectNo2v1();
  await courtLocationPage.submit();

  const { supportWithAccessNeedsPage } = _defendantResponsePageFactory;
  await supportWithAccessNeedsPage.verifyContent(ccdCaseData);
  await supportWithAccessNeedsPage.selectNo();
  await supportWithAccessNeedsPage.submit();

  const { vulnerabilityQuestionsPage } = _defendantResponsePageFactory;
  await vulnerabilityQuestionsPage.verifyContent(ccdCaseData);
  await vulnerabilityQuestionsPage.selectNo();
  await vulnerabilityQuestionsPage.submit();

  const { furtherInformationPage } = _defendantResponsePageFactory;
  await furtherInformationPage.verifyContent(ccdCaseData);
  await furtherInformationPage.selectYes();
  await furtherInformationPage.inputFurtherInformation();
  await furtherInformationPage.submit();

  const { statementOfTruthPage } = _defendantResponsePageFactory;
  await statementOfTruthPage.verifyContent(ccdCaseData);
  await statementOfTruthPage.enterName();
  await statementOfTruthPage.enterRole();
  await statementOfTruthPage.submit();
});
