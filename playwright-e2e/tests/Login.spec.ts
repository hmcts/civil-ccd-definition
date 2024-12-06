import { civilAdminUser } from '../config/users/exui-users';
import ccdEvents from '../fixtures/ccd-events/events';
import { test } from '../playwright-fixtures/index';

test('Testing Login', async ({ IdamSteps, ExuiDashboardSteps, ApiUserSteps, ApiDataSteps, _requestsFactory, _exuiDashboardPageFactory, _notifyClaimPageFactory, _defendantResponsePageFactory }) => {
  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.DefendantSolicitor1Login();
  await ExuiDashboardSteps.GoToCaseList();

  const { ccdRequests } = _requestsFactory;
  const ccdCaseData = await ccdRequests.fetchCCDCaseData(1733397077867721, civilAdminUser);

  const { caseDetailsPage } = _exuiDashboardPageFactory;
  await caseDetailsPage.goToCaseDetails(1733397077867721);
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

  const { respondToClaimPage } = _defendantResponsePageFactory;
  await respondToClaimPage.verifyContent(ccdCaseData);
  await respondToClaimPage.selectDefendsDefendant1();
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

  const { disclosureOfElectronicDocumentsPage } = _defendantResponsePageFactory;
  await disclosureOfElectronicDocumentsPage.verifyContent(ccdCaseData);
  await disclosureOfElectronicDocumentsPage.selectYes(1);
  await disclosureOfElectronicDocumentsPage.submit();

  const { disclosureOfNonElectronicDocumentsPage } = _defendantResponsePageFactory;
  await disclosureOfNonElectronicDocumentsPage.verifyContent(ccdCaseData);
  await disclosureOfNonElectronicDocumentsPage.submit();

  const { disclosureReportPage } = _defendantResponsePageFactory;
  await disclosureReportPage.verifyContent(ccdCaseData);
  await disclosureReportPage.selectYesFiledAndServedRadioButtons(1);
  await disclosureReportPage.selectNoAgreedProposalRadioButtons(1);
  await disclosureReportPage.submit();

  const { useOfExpertPage } = _defendantResponsePageFactory;
  await useOfExpertPage.verifyContent(ccdCaseData);
  await useOfExpertPage.selectNoFastTrack();
  await useOfExpertPage.submit();

  const { witnessesPage } = _defendantResponsePageFactory;
  await witnessesPage.verifyContent(ccdCaseData);
  await witnessesPage.selectNoFastTrack();
  await witnessesPage.submit();

  const { welshLanguagePage } = _defendantResponsePageFactory;
  await welshLanguagePage.verifyContent(ccdCaseData);
  await welshLanguagePage.selectSpeakingEnglish();
  await welshLanguagePage.selectDocumentsEnglish();
  await welshLanguagePage.submit();

  const { hearingAvailabilityPage } = _defendantResponsePageFactory;
  await hearingAvailabilityPage.verifyContent(ccdCaseData);
  await hearingAvailabilityPage.selectNoAvailabilityFastTrack(1);
  await hearingAvailabilityPage.submit();

  const { courtLocationPage } = _defendantResponsePageFactory;
  await courtLocationPage.verifyContent(ccdCaseData);
  await courtLocationPage.selectCourtLocation();
  await courtLocationPage.selectNo();
  await courtLocationPage.submit();

  const { supportWithAccessNeedsPage } = _defendantResponsePageFactory;
  await supportWithAccessNeedsPage.verifyContent(ccdCaseData);
  await supportWithAccessNeedsPage.selectNo();
  await supportWithAccessNeedsPage.submit();

  const { vulnerabilityQuestionsPage } = _defendantResponsePageFactory;
  await vulnerabilityQuestionsPage.verifyContent(ccdCaseData);
  await vulnerabilityQuestionsPage.selectNo();
  await vulnerabilityQuestionsPage.submit();

  const { applicationPage } = _defendantResponsePageFactory;
  await applicationPage.verifyContent(ccdCaseData);
  await applicationPage.selectNo(1);
  await applicationPage.submit();

  const { statementOfTruthPage } = _defendantResponsePageFactory;
  await statementOfTruthPage.verifyContent(ccdCaseData);
  await statementOfTruthPage.enterName();
  await statementOfTruthPage.enterRole();
  await statementOfTruthPage.submit();

  await IdamSteps.DefendantSolicitor2Login();
  await ExuiDashboardSteps.GoToCaseList();

  await caseDetailsPage.goToCaseDetails(1733397077867721);
  await caseDetailsPage.retryChooseNextStep(ccdEvents.DEFENDANT_RESPONSE_SPEC);

  const { checkIfYouNeedToCompleteClaimTimelineDef2Page } = _defendantResponsePageFactory;
  await checkIfYouNeedToCompleteClaimTimelineDef2Page.verifyContent(ccdCaseData);
  await checkIfYouNeedToCompleteClaimTimelineDef2Page.submit();

  const { confirmNameAndAddressDef2Page } = _defendantResponsePageFactory;
  await confirmNameAndAddressDef2Page.verifyContent(ccdCaseData);
  await confirmNameAndAddressDef2Page.selectYesDefendant2FastTrack();
  await confirmNameAndAddressDef2Page.submit();

  const { defendantsLegalRepsReferenceDef2Page } = _defendantResponsePageFactory;
  await defendantsLegalRepsReferenceDef2Page.verifyContent(ccdCaseData);
  await defendantsLegalRepsReferenceDef2Page.selectYes1v2();
  await defendantsLegalRepsReferenceDef2Page.submit();

  const { respondToClaimDef2Page } = _defendantResponsePageFactory;
  await respondToClaimDef2Page.verifyContent(ccdCaseData);
  await respondToClaimDef2Page.selectDefendsDefendant2();
  await respondToClaimDef2Page.submit();

  const { whyDoesDefendantNotOweMoneyDef2Page } = _defendantResponsePageFactory;
  await whyDoesDefendantNotOweMoneyDef2Page.verifyContent(ccdCaseData);
  await whyDoesDefendantNotOweMoneyDef2Page.selectDisputesClaim1v2();
  await whyDoesDefendantNotOweMoneyDef2Page.submit();

  const { whyDoesDefendantDisputeClaimDef2Page } = _defendantResponsePageFactory;
  await whyDoesDefendantDisputeClaimDef2Page.verifyContent(ccdCaseData);
  await whyDoesDefendantDisputeClaimDef2Page.input1v2();
  await whyDoesDefendantDisputeClaimDef2Page.submit();

  const { howToAddClaimTimelineDef2Page } = _defendantResponsePageFactory;
  await howToAddClaimTimelineDef2Page.verifyContent(ccdCaseData);
  await howToAddClaimTimelineDef2Page.selectManually1v2();
  await howToAddClaimTimelineDef2Page.submit();

  const { addTimelineOfEventsDef2Page } = _defendantResponsePageFactory;
  await addTimelineOfEventsDef2Page.verifyContent(ccdCaseData);
  await addTimelineOfEventsDef2Page.submit();

  const { fileDirectionsQuestionnaireDef2Page } = _defendantResponsePageFactory;
  await fileDirectionsQuestionnaireDef2Page.verifyContent(ccdCaseData);
  await fileDirectionsQuestionnaireDef2Page.selectCheckBox1v2();
  await fileDirectionsQuestionnaireDef2Page.selectYesOneMonthStay1v2();
  await fileDirectionsQuestionnaireDef2Page.selectYesComplied1v2();
  await fileDirectionsQuestionnaireDef2Page.submit();

  const { fixedRecoverableCostsDef2Page } = _defendantResponsePageFactory;
  await fixedRecoverableCostsDef2Page.verifyContent(ccdCaseData);
  await fixedRecoverableCostsDef2Page.selectNo1v2();
  await fixedRecoverableCostsDef2Page.submit();

  const { disclosureOfElectronicDocumentsDef2Page } = _defendantResponsePageFactory;
  await disclosureOfElectronicDocumentsDef2Page.verifyContent(ccdCaseData);
  await disclosureOfElectronicDocumentsDef2Page.selectYes(2);
  await disclosureOfElectronicDocumentsDef2Page.submit();

  const { disclosureOfNonElectronicDocumentsDef2Page } = _defendantResponsePageFactory;
  await disclosureOfNonElectronicDocumentsDef2Page.verifyContent(ccdCaseData);
  await disclosureOfNonElectronicDocumentsDef2Page.submit();

  const { disclosureReportDef2Page } = _defendantResponsePageFactory;
  await disclosureReportDef2Page.verifyContent(ccdCaseData);
  await disclosureReportDef2Page.selectYesFiledAndServedRadioButtons(2);
  await disclosureReportDef2Page.selectNoAgreedProposalRadioButtons(2);
  await disclosureReportDef2Page.submit();

  const { useOfExpertDef2Page } = _defendantResponsePageFactory;
  await useOfExpertDef2Page.verifyContent(ccdCaseData);
  await useOfExpertDef2Page.selectNoFastTrack1v2();
  await useOfExpertDef2Page.submit();

  const { witnessesDef2Page } = _defendantResponsePageFactory;
  await witnessesDef2Page.verifyContent(ccdCaseData);
  await witnessesDef2Page.selectNoFastTrack1v2();
  await witnessesDef2Page.submit();

  const { welshLanguageDef2Page } = _defendantResponsePageFactory;
  await welshLanguageDef2Page.verifyContent(ccdCaseData);
  await welshLanguageDef2Page.selectSpeakingEnglish1v2();
  await welshLanguageDef2Page.selectDocumentsEnglish1v2();
  await welshLanguageDef2Page.submit();

  const { hearingAvailabilityDef2Page } = _defendantResponsePageFactory;
  await hearingAvailabilityDef2Page.verifyContent(ccdCaseData);
  await hearingAvailabilityDef2Page.selectNoAvailabilityFastTrack(2);
  await hearingAvailabilityDef2Page.submit();

  const { courtLocationDef2Page } = _defendantResponsePageFactory;
  await courtLocationDef2Page.verifyContent(ccdCaseData);
  await courtLocationDef2Page.selectCourtLocation1v2();
  await courtLocationDef2Page.selectNo1v2();
  await courtLocationDef2Page.submit();

  const { supportWithAccessNeedsDef2Page } = _defendantResponsePageFactory;
  await supportWithAccessNeedsDef2Page.verifyContent(ccdCaseData);
  await supportWithAccessNeedsDef2Page.selectNo1v2();
  await supportWithAccessNeedsDef2Page.submit();

  const { vulnerabilityQuestionsDef2Page } = _defendantResponsePageFactory;
  await vulnerabilityQuestionsDef2Page.verifyContent(ccdCaseData);
  await vulnerabilityQuestionsDef2Page.selectNo1v2();
  await vulnerabilityQuestionsDef2Page.submit();

  const { applicationDef2Page } = _defendantResponsePageFactory;
  await applicationDef2Page.verifyContent(ccdCaseData);
  await applicationDef2Page.selectYes(2);
  await applicationDef2Page.submit();

  const { statementOfTruthDef2Page } = _defendantResponsePageFactory;
  await statementOfTruthDef2Page.verifyContent(ccdCaseData);
  await statementOfTruthDef2Page.enterName();
  await statementOfTruthDef2Page.enterRole();
  await statementOfTruthDef2Page.submit();
});
