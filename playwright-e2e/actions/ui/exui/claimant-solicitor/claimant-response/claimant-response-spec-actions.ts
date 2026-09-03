import TestData from '../../../../../models/test-utils/test-data.ts';
import { Step } from '../../../../../decorators/test-steps.ts';
import BaseTestData from '../../../../../base/base-test-data.ts';
import ClaimantResponsePageFactory from '../../../../../pages/exui/claimant-defendant-solicitor/response/claimant-response/claimant-response-page-factory.ts';

const classKey = 'ClaimantResponseSpecActions';
export default class ClaimantResponseSpecActions extends BaseTestData {
  private claimantResponsePageFactory: ClaimantResponsePageFactory;

  constructor(claimantResponsePageFactory: ClaimantResponsePageFactory, testData: TestData) {
    super(testData);
    this.claimantResponsePageFactory = claimantResponsePageFactory;
  }

  @Step(classKey)
  async respondentResponse2v1Spec() {
    const { respondentResponse2v1SpecPage } = this.claimantResponsePageFactory;
    await respondentResponse2v1SpecPage.verifyContent(this.ccdCaseData);
    await respondentResponse2v1SpecPage.selectYes();
    await respondentResponse2v1SpecPage.submit();
  }

  @Step(classKey)
  async respondentResponse1v2SSSpec() {
    const { respondentResponse1v2SSSpecPage } = this.claimantResponsePageFactory;
    await respondentResponse1v2SSSpecPage.verifyContent(this.ccdCaseData);
    await respondentResponse1v2SSSpecPage.selectYes();
    await respondentResponse1v2SSSpecPage.submit();
  }

  @Step(classKey)
  async respondentResponse1v2DSSpec() {
    const { respondentResponse1v2DSSpecPage } = this.claimantResponsePageFactory;
    await respondentResponse1v2DSSpecPage.verifyContent(this.ccdCaseData);
    await respondentResponse1v2DSSpecPage.selectYes();
    await respondentResponse1v2DSSpecPage.submit();
  }

  @Step(classKey)
  async respondentResponseSpec() {
    const { respondentResponseSpecPage } = this.claimantResponsePageFactory;
    await respondentResponseSpecPage.verifyContent(this.ccdCaseData);
    await respondentResponseSpecPage.selectYes();
    await respondentResponseSpecPage.submit();
  }

  @Step(classKey)
  async defenceDocumentSpec() {
    const { defenceResponseDocumentSpecPage } = this.claimantResponsePageFactory;
    await defenceResponseDocumentSpecPage.verifyContent(this.ccdCaseData);
    await defenceResponseDocumentSpecPage.uploadDoc();
    await defenceResponseDocumentSpecPage.submit();
  }

  @Step(classKey)
  async mediationClaimantResponseSpec() {
    const { mediationContactInformationPage } = this.claimantResponsePageFactory;
    await mediationContactInformationPage.verifyContent(this.ccdCaseData);
    await mediationContactInformationPage.enterMediationContactDetails();
    await mediationContactInformationPage.submit();

    const { mediationAvailabilityPage } = this.claimantResponsePageFactory;
    await mediationAvailabilityPage.verifyContent(this.ccdCaseData);
    await mediationAvailabilityPage.selectYes();
    await mediationAvailabilityPage.addNewUnavailableDate();
    await mediationAvailabilityPage.selectSingleDate();
    await mediationAvailabilityPage.submit();
  }

  @Step(classKey)
  async determinationWithoutHearing() {
    const { determinationWithoutHearingPage } = this.claimantResponsePageFactory;
    await determinationWithoutHearingPage.verifyContent(this.ccdCaseData);
    await determinationWithoutHearingPage.selectYes();
    await determinationWithoutHearingPage.submit();
  }

  @Step(classKey)
  async smallClaimExperts2v1() {
    const { smallClaimExperts2v1Page } = this.claimantResponsePageFactory;
    await smallClaimExperts2v1Page.verifyContent(this.ccdCaseData);
    await smallClaimExperts2v1Page.selectYesExperts();
    await smallClaimExperts2v1Page.enterExpertDetails();
    await smallClaimExperts2v1Page.submit();
  }

  @Step(classKey)
  async smallClaimExperts() {
    const { smallClaimExpertsPage } = this.claimantResponsePageFactory;
    await smallClaimExpertsPage.verifyContent(this.ccdCaseData);
    await smallClaimExpertsPage.selectYesExperts();
    await smallClaimExpertsPage.enterExpertDetails();
    await smallClaimExpertsPage.submit();
  }

  @Step(classKey)
  async dqSmallTrack() {
    const { smallClaimWitnessesPage } = this.claimantResponsePageFactory;
    await smallClaimWitnessesPage.verifyContent(this.ccdCaseData);
    await smallClaimWitnessesPage.selectYes();
    await smallClaimWitnessesPage.addWitness();
    await smallClaimWitnessesPage.enterWitnessDetails();
    await smallClaimWitnessesPage.enterWitnessNumber();
    await smallClaimWitnessesPage.submit();

    await this.language();

    const { hearingSpecPage } = this.claimantResponsePageFactory;
    await hearingSpecPage.verifyContent();
    await hearingSpecPage.selectYesUnavailabilityRequired();
    await hearingSpecPage.addNewUnavailableDate();
    await hearingSpecPage.selectSingleDate();
    await hearingSpecPage.submit();

    await this.applicantCourtLocationLRSpec();
    await this.hearingSupport();
    await this.vulnerabilityQuestions();
  }

  @Step(classKey)
  async application() {
    const { applicationPage } = this.claimantResponsePageFactory;
    await applicationPage.verifyContent(this.ccdCaseData);
    await applicationPage.selectYes();
    await applicationPage.enterAdditionalInformation();
    await applicationPage.submit();
  }

  @Step(classKey)
  async dqFastTrack() {
    await this.fileDirectionsQuestionaire();
    await this.fixedRecoverableCosts();
    await this.disclosureOfElectronicDocuments();
    await this.disclosureOfNonElectronicDocumentsSpec();
    await this.disclosureReport();
    await this.experts();
    await this.witnesses();
    await this.language();
    await this.hearingFastSpec();
    await this.applicantCourtLocationLRSpec();
    await this.hearingSupport();
    await this.vulnerabilityQuestions();
  }

  @Step(classKey)
  async dqIntermediateTrack() {
    await this.fileDirectionsQuestionaire();
    await this.fixedRecoverableCostsIntermediate();
    await this.disclosureOfElectronicDocuments();
    await this.disclosureOfNonElectronicDocumentsSpec(false);
    await this.disclosureReport();
    await this.experts();
    await this.witnesses();
    await this.language();
    await this.hearingFastSpec();
    await this.draftDirections();
    await this.applicantCourtLocationLRSpec();
    await this.hearingSupport();
    await this.vulnerabilityQuestions();
    await this.applicationNo();
  }

  @Step(classKey)
  async dqMultiTrack() {
    await this.fileDirectionsQuestionaire();
    await this.disclosureOfElectronicDocuments();
    await this.disclosureOfNonElectronicDocumentsSpec();
    await this.disclosureReport();
    await this.experts();
    await this.witnesses();
    await this.language();
    await this.hearingFastSpec();
    await this.draftDirections();
    await this.applicantCourtLocationLRSpec();
    await this.hearingSupport();
    await this.vulnerabilityQuestions();
  }

  @Step(classKey)
  async dqMultiTrack1vLIP() {
    await this.fileDirectionsQuestionaire();
    await this.disclosureOfElectronicDocuments();
    await this.disclosureOfNonElectronicDocumentsSpec(false);
    await this.disclosureReport();
    await this.experts();
    await this.witnesses();
    await this.language();
    await this.hearingFastSpec();
    await this.draftDirections();
    await this.applicantCourtLocationLRSpec();
    await this.hearingSupport();
    await this.vulnerabilityQuestions();
    await this.applicationNo();
  }

  @Step(classKey)
  async statementOfTruthClaimantResponse() {
    const { statementOfTruthClaimantResponsePage } = this.claimantResponsePageFactory;
    await statementOfTruthClaimantResponsePage.verifyContent(this.ccdCaseData);
    await statementOfTruthClaimantResponsePage.enterDetails();
    await statementOfTruthClaimantResponsePage.submit();
  }

  @Step(classKey)
  async submitClaimantResponse() {
    const { submitClaimantResponsePage } = this.claimantResponsePageFactory;
    await submitClaimantResponsePage.verifyContent(this.ccdCaseData);
    await submitClaimantResponsePage.submit();
  }

  @Step(classKey)
  async confirm() {
    const { confirmClaimantResponseSpecPage } = this.claimantResponsePageFactory;
    await confirmClaimantResponseSpecPage.verifyContent(this.ccdCaseData);
    await confirmClaimantResponseSpecPage.submit();
  }

  private async fileDirectionsQuestionaire() {
    const { fileDirectionsQuestionairePage } = this.claimantResponsePageFactory;
    await fileDirectionsQuestionairePage.verifyContent(this.ccdCaseData);
    await fileDirectionsQuestionairePage.enterDetails();
    await fileDirectionsQuestionairePage.submit();
  }

  private async fixedRecoverableCosts() {
    const { fixedRecoverableCostsPage } = this.claimantResponsePageFactory;
    await fixedRecoverableCostsPage.verifyContent(this.ccdCaseData);
    await fixedRecoverableCostsPage.selectYes();
    await fixedRecoverableCostsPage.submit();
  }

  private async fixedRecoverableCostsIntermediate() {
    const { fixedRecoverableCostsIntermediatePage } = this.claimantResponsePageFactory;
    await fixedRecoverableCostsIntermediatePage.verifyContent(this.ccdCaseData);
    await fixedRecoverableCostsIntermediatePage.selectYes();
    await fixedRecoverableCostsIntermediatePage.submit();
  }

  private async disclosureOfElectronicDocuments() {
    const { disclosureOfElectronicDocumentsPage } = this.claimantResponsePageFactory;
    await disclosureOfElectronicDocumentsPage.verifyContent(this.ccdCaseData);
    await disclosureOfElectronicDocumentsPage.enterDetails();
    await disclosureOfElectronicDocumentsPage.submit();
  }

  private async disclosureOfNonElectronicDocumentsSpec(enterDetails = true) {
    const { disclosureOfNonElectronicDocumentsSpecPage } = this.claimantResponsePageFactory;
    await disclosureOfNonElectronicDocumentsSpecPage.verifyContent(this.ccdCaseData);
    if (enterDetails) {
      await disclosureOfNonElectronicDocumentsSpecPage.enterDetails();
    }
    await disclosureOfNonElectronicDocumentsSpecPage.submit();
  }

  private async disclosureReport() {
    const { disclosureReportPage } = this.claimantResponsePageFactory;
    await disclosureReportPage.verifyContent(this.ccdCaseData);
    await disclosureReportPage.enterDetails();
    await disclosureReportPage.submit();
  }

  private async experts() {
    const { expertsPage } = this.claimantResponsePageFactory;
    await expertsPage.verifyContent(this.ccdCaseData);
    await expertsPage.useExperts();
    await expertsPage.addNewExpert();
    await expertsPage.enterExpertDetails();
    await expertsPage.submit();
  }

  private async witnesses() {
    const { witnessesPage } = this.claimantResponsePageFactory;
    await witnessesPage.verifyContent(this.ccdCaseData);
    await witnessesPage.selectYesWitnesses();
    await witnessesPage.addWitness();
    await witnessesPage.enterWitnessDetails();
    await witnessesPage.submit();
  }

  private async hearingFastSpec() {
    const { hearingFastSpecPage } = this.claimantResponsePageFactory;
    await hearingFastSpecPage.verifyContent();
    await hearingFastSpecPage.selectYesUnavailabilityRequired();
    await hearingFastSpecPage.addNewUnavailableDate();
    await hearingFastSpecPage.selectSingleDateFastTrack();
    await hearingFastSpecPage.submit();
  }

  private async draftDirections() {
    const { draftDirectionsPage } = this.claimantResponsePageFactory;
    await draftDirectionsPage.verifyContent(this.ccdCaseData);
    await draftDirectionsPage.uploadEvidence();
    await draftDirectionsPage.submit();
  }

  private async applicationNo() {
    const { applicationPage } = this.claimantResponsePageFactory;
    await applicationPage.verifyContent(this.ccdCaseData);
    await applicationPage.selectNo();
    await applicationPage.submit();
  }

  private async language() {
    const { languagePage } = this.claimantResponsePageFactory;
    await languagePage.verifyContent(this.ccdCaseData);
    await languagePage.selectEnglishAndWelsh();
    await languagePage.submit();
  }

  private async applicantCourtLocationLRSpec() {
    const { applicantCourtLocationLRSpecPage } = this.claimantResponsePageFactory;
    await applicantCourtLocationLRSpecPage.verifyContent(this.ccdCaseData);
    await applicantCourtLocationLRSpecPage.selectCourtLocation();
    await applicantCourtLocationLRSpecPage.selectNoRemoteHearing();
    await applicantCourtLocationLRSpecPage.submit();
  }

  private async hearingSupport() {
    const { hearingSupportPage } = this.claimantResponsePageFactory;
    await hearingSupportPage.verifyContent(this.ccdCaseData);
    await hearingSupportPage.selectYes();
    await hearingSupportPage.enterSupportRequirementsAdditional();
    await hearingSupportPage.submit();
  }

  private async vulnerabilityQuestions() {
    const { vulnerabilityQuestionsSpecPage } = this.claimantResponsePageFactory;
    await vulnerabilityQuestionsSpecPage.verifyContent(this.ccdCaseData);
    await vulnerabilityQuestionsSpecPage.selectYes();
    await vulnerabilityQuestionsSpecPage.enterVulnerabilityAdjustments();
    await vulnerabilityQuestionsSpecPage.submit();
  }
}
