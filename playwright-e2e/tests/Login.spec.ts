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
    const ccdCaseData = await ccdRequests.fetchCCDCaseData(civilAdminUser, 1733927524184278);

    const { caseDetailsPage } = _exuiDashboardPageFactory;
    await caseDetailsPage.goToCaseDetails(1733927524184278);
    await caseDetailsPage.verifyContent(ccdCaseData);
    await caseDetailsPage.retryChooseNextStep(ccdEvents.DEFENDANT_RESPONSE);

    const { confirmNameAndAddressPage } = _defendantResponsePageFactory;
    await confirmNameAndAddressPage.verifyContent(ccdCaseData);
    await confirmNameAndAddressPage.submit();

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

    const { fileDirectionsQuestionnairePage } = _defendantResponsePageFactory;
    await fileDirectionsQuestionnairePage.verifyContent(ccdCaseData);
    await fileDirectionsQuestionnairePage.selectCheckBox(1);
    await fileDirectionsQuestionnairePage.selectYesOneMonthStay(1);
    await fileDirectionsQuestionnairePage.selectNoComplied(1);
    await fileDirectionsQuestionnairePage.submit();

    const { fixedRecoverableCostsPage } = _defendantResponsePageFactory;
    await fixedRecoverableCostsPage.verifyContent(ccdCaseData);
    await fixedRecoverableCostsPage.selectNo();
    await fixedRecoverableCostsPage.submit();

    const { disclosureOfNonElectronicDocumentsPage } = _defendantResponsePageFactory;
    await disclosureOfNonElectronicDocumentsPage.verifyContent(ccdCaseData);
    await disclosureOfNonElectronicDocumentsPage.selectNo(1);
    await disclosureOfNonElectronicDocumentsPage.submit();

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

    await IdamSteps.DefendantSolicitor2Login();
    await ExuiDashboardSteps.GoToCaseList();
    await caseDetailsPage.goToCaseDetails(1733927524184278);
    await caseDetailsPage.verifyContent(ccdCaseData);
    await caseDetailsPage.retryChooseNextStep(ccdEvents.DEFENDANT_RESPONSE);

    const { confirmNameAndAddressDef2Page } = _defendantResponsePageFactory;
    await confirmNameAndAddressDef2Page.verifyContent(ccdCaseData);
    await confirmNameAndAddressDef2Page.submit();

    const { respondToClaimDef2Page } = _defendantResponsePageFactory;
    await respondToClaimDef2Page.verifyContent(ccdCaseData);
    await respondToClaimDef2Page.selectsDefends2v1SpecAnd1v2Unspec(2);
    await respondToClaimDef2Page.submit();

    const { solicitorReferenceDef2Page } = _defendantResponsePageFactory;
    await solicitorReferenceDef2Page.verifyContent(ccdCaseData);
    await solicitorReferenceDef2Page.fillInputResp2();
    await solicitorReferenceDef2Page.submit();

    const { uploadDefenceDef2Page } = _defendantResponsePageFactory;
    await uploadDefenceDef2Page.verifyContent(ccdCaseData);
    await uploadDefenceDef2Page.uploadFile(2);
    await uploadDefenceDef2Page.submit();

    const { fileDirectionsQuestionnaireDef2Page } = _defendantResponsePageFactory;
    await fileDirectionsQuestionnaireDef2Page.verifyContent(ccdCaseData);
    await fileDirectionsQuestionnaireDef2Page.selectCheckBox(2);
    await fileDirectionsQuestionnaireDef2Page.selectYesOneMonthStay(2);
    await fileDirectionsQuestionnaireDef2Page.selectNoComplied(2);
    await fileDirectionsQuestionnaireDef2Page.submit();

    const { fixedRecoverableCostsDef2Page } = _defendantResponsePageFactory;
    await fixedRecoverableCostsDef2Page.verifyContent(ccdCaseData);
    await fixedRecoverableCostsDef2Page.selectNo1v2();
    await fixedRecoverableCostsDef2Page.submit();

    const { disclosureOfNonElectronicDocumentsDef2Page } = _defendantResponsePageFactory;
    await disclosureOfNonElectronicDocumentsDef2Page.verifyContent(ccdCaseData);
    await disclosureOfNonElectronicDocumentsDef2Page.selectNo(2);
    await disclosureOfNonElectronicDocumentsDef2Page.submit();

    const { useOfExpertDef2Page } = _defendantResponsePageFactory;
    await useOfExpertDef2Page.verifyContent(ccdCaseData);
    await useOfExpertDef2Page.selectNoFastTrack(2);
    await useOfExpertDef2Page.submit();

    const { witnessesDef2Page } = _defendantResponsePageFactory;
    await witnessesDef2Page.verifyContent(ccdCaseData);
    await witnessesDef2Page.selectNoUnpecAndFastTrack1v2(2);
    await witnessesDef2Page.submit();

    const { welshLanguageDef2Page } = _defendantResponsePageFactory;
    await welshLanguageDef2Page.verifyContent(ccdCaseData);
    await welshLanguageDef2Page.selectSpeakingEnglish1v2();
    await welshLanguageDef2Page.selectDocumentsEnglish1v2();
    await welshLanguageDef2Page.submit();

    const { hearingAvailabilityDef2Page } = _defendantResponsePageFactory;
    await hearingAvailabilityDef2Page.verifyContent(ccdCaseData);
    await hearingAvailabilityDef2Page.selectNoAvailabilityUnspecandSpec2v1(2);
    await hearingAvailabilityDef2Page.submit();

    const { uploadDraftDirectionsDef2Page } = _defendantResponsePageFactory;
    await uploadDraftDirectionsDef2Page.verifyContent(ccdCaseData);
    await uploadDraftDirectionsDef2Page.uploadFile(2);
    await uploadDraftDirectionsDef2Page.submit();

    const { courtLocationDef2Page } = _defendantResponsePageFactory;
    await courtLocationDef2Page.verifyContent(ccdCaseData);
    await courtLocationDef2Page.selectCourtLocationUnpecAndSpec2v1(2);
    await courtLocationDef2Page.selectNoUnspecAndSpec2v1(2);
    await courtLocationDef2Page.submit();

    const { supportWithAccessNeedsDef2Page } = _defendantResponsePageFactory;
    await supportWithAccessNeedsDef2Page.verifyContent(ccdCaseData, 2);
    await supportWithAccessNeedsDef2Page.selectNo(2);
    await supportWithAccessNeedsDef2Page.submit();

    const { vulnerabilityQuestionsDef2Page } = _defendantResponsePageFactory;
    await vulnerabilityQuestionsDef2Page.verifyContent(ccdCaseData, 2);
    await vulnerabilityQuestionsDef2Page.selectNo(2);
    await vulnerabilityQuestionsDef2Page.submit();

    const { furtherInformationDef2Page } = _defendantResponsePageFactory;
    await furtherInformationDef2Page.verifyContent(ccdCaseData);
    await furtherInformationDef2Page.selectNo(2);
    await furtherInformationDef2Page.submit();

    const { statementOfTruthDef2Page } = _defendantResponsePageFactory;
    await statementOfTruthDef2Page.verifyContent(ccdCaseData);
    await statementOfTruthDef2Page.enterName();
    await statementOfTruthDef2Page.enterRole();
    await statementOfTruthDef2Page.submit();
  },
);
