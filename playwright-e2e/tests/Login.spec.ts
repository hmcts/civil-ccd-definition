import { civilAdminUser } from '../config/users/exui-users';
import ccdEvents from '../fixtures/ccd-events/events';
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
    _defendantResponsePageFactory,
  }) => {
    await ApiUserSteps.SetupUserData(civilAdminUser);
    // await ApiDataSteps.SetupBankHolidaysData();
    await IdamSteps.DefendantSolicitor1Login();
    await ExuiDashboardSteps.GoToCaseList();

    const { ccdRequests } = _requestsFactory;
    const ccdCaseData = await ccdRequests.fetchCCDCaseData(civilAdminUser, 1733931456118395);

    const { caseDetailsPage } = _exuiDashboardPageFactory;
    await caseDetailsPage.goToCaseDetails(1733931456118395);
    await caseDetailsPage.verifyContent(ccdCaseData);
    await caseDetailsPage.retryChooseNextStep(ccdEvents.DEFENDANT_RESPONSE);

    const { confirmNameAndAddressPage } = _defendantResponsePageFactory;
    await confirmNameAndAddressPage.verifyContent(ccdCaseData);
    await confirmNameAndAddressPage.enterDob(1, 1, 1990);
    await confirmNameAndAddressPage.submit();

    const { intendToFileSingleResponsePage } = _defendantResponsePageFactory;
    await intendToFileSingleResponsePage.verifyContent(ccdCaseData);
    await intendToFileSingleResponsePage.selectYes();
    await intendToFileSingleResponsePage.submit();

    const { respondToClaimPage } = _defendantResponsePageFactory;
    await respondToClaimPage.verifyContent(ccdCaseData);
    await respondToClaimPage.selectsDefends2v1SpecAnd1v2Unspec(1);
    await respondToClaimPage.submit();

    const { solicitorReferencePage } = _defendantResponsePageFactory;
    await solicitorReferencePage.verifyContent(ccdCaseData);
    await solicitorReferencePage.submit();

    const { uploadDefencePage } = _defendantResponsePageFactory;
    await uploadDefencePage.verifyContent(ccdCaseData);
    await uploadDefencePage.uploadFile(1);
    await uploadDefencePage.submit();

    const { useOfExpertPage } = _defendantResponsePageFactory;
    await useOfExpertPage.verifyContent(ccdCaseData);
    await useOfExpertPage.selectNoFastTrack(1);
    await useOfExpertPage.submit();

    const { witnessesPage } = _defendantResponsePageFactory;
    await witnessesPage.verifyContent(ccdCaseData);
    await witnessesPage.selectNoUnpecAndFastTrack1v2(1);
    await witnessesPage.submit();

    const { welshLanguagePage } = _defendantResponsePageFactory;
    await welshLanguagePage.verifyContent(ccdCaseData);
    await welshLanguagePage.selectSpeakingEnglish();
    await welshLanguagePage.selectDocumentsEnglish();
    await welshLanguagePage.submit();

    const { hearingAvailabilityPage } = _defendantResponsePageFactory;
    await hearingAvailabilityPage.verifyContent(ccdCaseData);
    await hearingAvailabilityPage.selectNoAvailabilityUnspecandSpec2v1(1);
    await hearingAvailabilityPage.submit();

    const { uploadDraftDirectionsPage } = _defendantResponsePageFactory;
    await uploadDraftDirectionsPage.verifyContent(ccdCaseData);
    await uploadDraftDirectionsPage.uploadFile(1);
    await uploadDraftDirectionsPage.submit();

    const { courtLocationPage } = _defendantResponsePageFactory;
    await courtLocationPage.verifyContent(ccdCaseData);
    await courtLocationPage.selectCourtLocationUnpecAndSpec2v1(1);
    await courtLocationPage.selectNoUnspecAndSpec2v1(1);
    await courtLocationPage.submit();

    const { supportWithAccessNeedsPage } = _defendantResponsePageFactory;
    await supportWithAccessNeedsPage.verifyContent(ccdCaseData, 1);
    await supportWithAccessNeedsPage.selectNo(1);
    await supportWithAccessNeedsPage.submit();

    const { vulnerabilityQuestionsPage } = _defendantResponsePageFactory;
    await vulnerabilityQuestionsPage.verifyContent(ccdCaseData, 1);
    await vulnerabilityQuestionsPage.selectNo(1);
    await vulnerabilityQuestionsPage.submit();

    const { furtherInformationPage } = _defendantResponsePageFactory;
    await furtherInformationPage.verifyContent(ccdCaseData);
    await furtherInformationPage.selectNo(1);
    await furtherInformationPage.submit();

    const { statementOfTruthPage } = _defendantResponsePageFactory;
    await statementOfTruthPage.verifyContent(ccdCaseData);
    await statementOfTruthPage.enterName();
    await statementOfTruthPage.enterRole();
    await statementOfTruthPage.submit();
  },
);
