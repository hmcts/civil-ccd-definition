import TestData from '../../../../../models/test-data.ts';
import partys from '../../../../../constants/partys.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import BaseTestData from '../../../../../base/base-test-data.ts';
import ClaimantResponsePageFactory from '../../../../../pages/exui/claimant-defendant-solicitor/response/claimant-response/claimant-response-page-factory.ts';

@AllMethodsStep()
export default class ClaimantResponseActions extends BaseTestData {
  private claimantResponsePageFactory: ClaimantResponsePageFactory;

  constructor(claimantResponsePageFactory: ClaimantResponsePageFactory, testData: TestData) {
    super(testData);
    this.claimantResponsePageFactory = claimantResponsePageFactory;
  }

  async respondentResponsePage() {
    const { respondentResponsePage } = this.claimantResponsePageFactory;
    await respondentResponsePage.verifyContent(this.ccdCaseData);
    await respondentResponsePage.selectYes();
    await respondentResponsePage.submit();
  }

  async respondentResponse2v1Page() {
    const { respondentResponse2v1Page } = this.claimantResponsePageFactory;
    await respondentResponse2v1Page.verifyContent(this.ccdCaseData);
    await respondentResponse2v1Page.selectYesBothClaimants();
    await respondentResponse2v1Page.submit();
  }

  async respondentResponse1v2SSPage() {
    const { respondentResponse1v2SSPage } = this.claimantResponsePageFactory;
    await respondentResponse1v2SSPage.verifyContent(this.ccdCaseData);
    await respondentResponse1v2SSPage.selectYesBothDefendants();
    await respondentResponse1v2SSPage.submit();
  }

  async respondentResponse1v2DSPage() {
    const { respondentResponse1v2DSPage } = this.claimantResponsePageFactory;
    await respondentResponse1v2DSPage.verifyContent(this.ccdCaseData);
    await respondentResponse1v2DSPage.selectYesBothDefendants();
    await respondentResponse1v2DSPage.submit();
  }

  async defenceResponseDocument1v2Page() {
    const { defenceResponseDocument1v2Page } = this.claimantResponsePageFactory;
    await defenceResponseDocument1v2Page.verifyContent(this.ccdCaseData);
    await defenceResponseDocument1v2Page.uploadDocumentBothDefendants();
    await defenceResponseDocument1v2Page.submit();
  }

  async defenceResponseDocumentPage() {
    const { defenceResponseDocumentPage } = this.claimantResponsePageFactory;
    await defenceResponseDocumentPage.verifyContent(this.ccdCaseData);
    await defenceResponseDocumentPage.uploadDocument();
    await defenceResponseDocumentPage.submit();
  }

  async fileDirectionsQuestionairePage() {
    const { fileDirectionsQuestionairePage } = this.claimantResponsePageFactory;
    await fileDirectionsQuestionairePage.verifyContent(this.ccdCaseData);
    await fileDirectionsQuestionairePage.enterDetails();
    await fileDirectionsQuestionairePage.submit();
  }

  async fixedRecoverableCostsPage() {
    const { fixedRecoverableCostsPage } = this.claimantResponsePageFactory;
    await fixedRecoverableCostsPage.verifyContent(this.ccdCaseData);
    await fixedRecoverableCostsPage.selectYes();
    await fixedRecoverableCostsPage.submit();
  }

  async disclosureOfNonElectronicDocumentsPage() {
    const { disclosureOfNonElectronicDocumentsPage } = this.claimantResponsePageFactory;
    await disclosureOfNonElectronicDocumentsPage.verifyContent(this.ccdCaseData);
    await disclosureOfNonElectronicDocumentsPage.enterDetails();
    await disclosureOfNonElectronicDocumentsPage.submit();
  }

  async expertsPage() {
    const { expertsPage } = this.claimantResponsePageFactory;
    await expertsPage.verifyContent(this.ccdCaseData);
    await expertsPage.useExperts();
    await expertsPage.addNewExpert();
    await expertsPage.enterExpertDetails();
    await expertsPage.submit();
  }

  async witnessesPage() {
    const { witnessesPage } = this.claimantResponsePageFactory;
    await witnessesPage.verifyContent(this.ccdCaseData);
    await witnessesPage.selectYesWitnesses();
    await witnessesPage.addWitness();
    await witnessesPage.enterWitnessDetails();
    await witnessesPage.submit();
  }

  async languagePage() {
    const { languagePage } = this.claimantResponsePageFactory;
    await languagePage.verifyContent(this.ccdCaseData);
    await languagePage.selectEnglishAndWelsh();
    await languagePage.submit();
  }

  async hearingSmallClaimPage() {
    const { hearingPage } = this.claimantResponsePageFactory;
    await hearingPage.verifyContent(this.ccdCaseData);
    await hearingPage.selectYesAvailabilityRequired();
    await hearingPage.addNewUnavailableDate();
    await hearingPage.selectSingleDate();
    await hearingPage.submit();
  }

  async draftDirectionsPage() {
    const { draftDirectionsPage } = this.claimantResponsePageFactory;
    await draftDirectionsPage.verifyContent(this.ccdCaseData);
    await draftDirectionsPage.uploadEvidence();
    await draftDirectionsPage.submit();
  }

  async hearingSupportPage() {
    const { hearingSupportPage } = this.claimantResponsePageFactory;
    await hearingSupportPage.verifyContent(this.ccdCaseData);
    await hearingSupportPage.selectYes();
    await hearingSupportPage.enterSupportRequirementsAdditional();
    await hearingSupportPage.submit();
  }

  async futherInformationPage() {
    const { furtherInformationPage } = this.claimantResponsePageFactory;
    await furtherInformationPage.verifyContent(this.ccdCaseData);
    await furtherInformationPage.selectYes();
    await furtherInformationPage.enterFurtherInformation();
    await furtherInformationPage.submit();
  }

  async vulnerabilityQuestionsPage() {
    const { vulnerabilityQuestionsPage } = this.claimantResponsePageFactory;
    await vulnerabilityQuestionsPage.verifyContent(this.ccdCaseData);
    await vulnerabilityQuestionsPage.selectYes();
    await vulnerabilityQuestionsPage.enterVulnerabilityAdjustments();
    await vulnerabilityQuestionsPage.submit();
  }

  async statementOfTruthPage() {
    const { statementOfTruthClaimantResponsePage } = this.claimantResponsePageFactory;
    await statementOfTruthClaimantResponsePage.verifyContent(this.ccdCaseData);
    await statementOfTruthClaimantResponsePage.enterDetails();
    await statementOfTruthClaimantResponsePage.submit();
  }

  async submitPage() {
    const { submitClaimantResponsePage } = this.claimantResponsePageFactory;
    await submitClaimantResponsePage.verifyContent(this.ccdCaseData);
    await submitClaimantResponsePage.submit();
  }

  async confirmPage() {
    const { confirmClaimantResponsePage } = this.claimantResponsePageFactory;
    await confirmClaimantResponsePage.verifyContent(this.ccdCaseData);
    await confirmClaimantResponsePage.submit();
  }
}
