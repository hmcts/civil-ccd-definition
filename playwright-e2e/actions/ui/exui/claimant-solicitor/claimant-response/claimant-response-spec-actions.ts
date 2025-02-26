import TestData from '../../../../../models/test-data.ts';
import partys from '../../../../../constants/partys.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import BaseAction from '../../../../../base/base-test-data.ts';
import ClaimantResponsePageFactory from '../../../../../pages/exui/claimant-defendant-solicitor/response/claimant-response/claimant-response-page-factory.ts';

@AllMethodsStep()
export default class ClaimantResponseSpecActions extends BaseAction {
  private claimantResponsePageFactory: ClaimantResponsePageFactory;

  constructor(claimantResponsePageFactory: ClaimantResponsePageFactory, testData: TestData) {
    super(testData);
    this.claimantResponsePageFactory = claimantResponsePageFactory;
  }

  async respondentResponse2v1SpecPage() {
    const { respondentResponse2v1SpecPage } = this.claimantResponsePageFactory;
    await respondentResponse2v1SpecPage.verifyContent(this.ccdCaseData);
    await respondentResponse2v1SpecPage.selectYes();
    await respondentResponse2v1SpecPage.submit();
  }

  async respondentResponse1v2SSSpecPage() {
    const { respondentResponse1v2SSSpecPage } = this.claimantResponsePageFactory;
    await respondentResponse1v2SSSpecPage.selectYes();
    await respondentResponse1v2SSSpecPage.submit();
  }

  async respondentResponse1v2DSSpecPage() {
    const { respondentResponse1v2DSSpecPage } = this.claimantResponsePageFactory;
    await respondentResponse1v2DSSpecPage.verifyContent(this.ccdCaseData);
    await respondentResponse1v2DSSpecPage.selectYes();
    await respondentResponse1v2DSSpecPage.submit();
  }

  async respondentResponseSpecPage() {
    const { respondentResponseSpecPage } = this.claimantResponsePageFactory;
    await respondentResponseSpecPage.verifyContent(this.ccdCaseData);
    await respondentResponseSpecPage.selectYes();
    await respondentResponseSpecPage.submit();
  }

  async defenceDocumentSpecPage() {
    const { defenceResponseDocumentSpecPage } = this.claimantResponsePageFactory;
    await defenceResponseDocumentSpecPage.verifyContent(this.ccdCaseData);
    await defenceResponseDocumentSpecPage.uploadDoc();
    await defenceResponseDocumentSpecPage.submit();
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

  async disclosureOfElectronicDocumentsPage() {
    const { disclosureOfElectronicDocumentsPage } = this.claimantResponsePageFactory;
    await disclosureOfElectronicDocumentsPage.verifyContent(this.ccdCaseData);
    await disclosureOfElectronicDocumentsPage.enterDetails();
    await disclosureOfElectronicDocumentsPage.submit();
  }

  async disclosureOfNonElectronicDocumentsSpecPage() {
    const { disclosureOfNonElectronicDocumentsSpecPage } = this.claimantResponsePageFactory;
    await disclosureOfNonElectronicDocumentsSpecPage.verifyContent(this.ccdCaseData);
    await disclosureOfNonElectronicDocumentsSpecPage.enterDetails();
    await disclosureOfNonElectronicDocumentsSpecPage.submit();
  }

  async disclosureReportPage() {
    const { disclosureReportPage } = this.claimantResponsePageFactory;
    await disclosureReportPage.verifyContent(this.ccdCaseData);
    await disclosureReportPage.enterDetails();
    await disclosureReportPage.submit();
  }

  async mediationContactInformationPage() {
    const { mediationContactInformationPage } = this.claimantResponsePageFactory;
    await mediationContactInformationPage.verifyContent(this.ccdCaseData);
    await mediationContactInformationPage.enterMediationContactDetails();
    await mediationContactInformationPage.submit();
  }

  async mediationAvailabilityPage() {
    const { mediationAvailabilityPage } = this.claimantResponsePageFactory;
    await mediationAvailabilityPage.verifyContent(this.ccdCaseData);
    await mediationAvailabilityPage.selectYes();
    await mediationAvailabilityPage.addNewUnavailableDate();
    await mediationAvailabilityPage.selectSingleDate();
    await mediationAvailabilityPage.submit();
  }

  async expertsPage() {
    const { expertsPage } = this.claimantResponsePageFactory;
    await expertsPage.verifyContent(this.ccdCaseData);
    await expertsPage.useExperts();
    await expertsPage.addNewExpert();
    await expertsPage.enterExpertDetails();
    await expertsPage.submit();
  }

  async smallClaimExpertsPage() {
    const { smallClaimExpertsPage } = this.claimantResponsePageFactory;
    await smallClaimExpertsPage.verifyContent(this.ccdCaseData);
    await smallClaimExpertsPage.selectYesExperts();
    await smallClaimExpertsPage.enterExpertDetails();
    await smallClaimExpertsPage.submit();
  }

  async smallClaimExperts2v1Page() {
    const { smallClaimExperts2v1Page } = this.claimantResponsePageFactory;
    await smallClaimExperts2v1Page.verifyContent(this.ccdCaseData);
    await smallClaimExperts2v1Page.selectYesExperts();
    await smallClaimExperts2v1Page.enterExpertDetails();
    await smallClaimExperts2v1Page.submit();
  }

  async witnessesPage() {
    const { witnessesPage } = this.claimantResponsePageFactory;
    await witnessesPage.verifyContent(this.ccdCaseData);
    await witnessesPage.selectYesWitnesses();
    await witnessesPage.addWitness();
    await witnessesPage.enterWitnessDetails();
    await witnessesPage.submit();
  }

  async smallClaimWitnessesPage() {
    const { smallClaimWitnessesPage } = this.claimantResponsePageFactory;
    await smallClaimWitnessesPage.verifyContent(this.ccdCaseData);
    await smallClaimWitnessesPage.selectYes();
    await smallClaimWitnessesPage.addWitness();
    await smallClaimWitnessesPage.enterWitnessDetails();
    await smallClaimWitnessesPage.enterWitnessNumber();
    await smallClaimWitnessesPage.submit();
  }

  async languagePage() {
    const { languagePage } = this.claimantResponsePageFactory;
    await languagePage.verifyContent(this.ccdCaseData);
    await languagePage.selectEnglishAndWelsh();
    await languagePage.submit();
  }

  async hearingSpecSmallClaimPage() {
    const { hearingSpecPage } = this.claimantResponsePageFactory;
    await hearingSpecPage.verifyContent();
    await hearingSpecPage.selectYesUnavailabilityRequired();
    await hearingSpecPage.addNewUnavailableDate();
    await hearingSpecPage.selectSingleDate();
    await hearingSpecPage.submit();
  }

  async hearingSpecFastTrackPage() {
    const { hearingFastSpecPage } = this.claimantResponsePageFactory;
    await hearingFastSpecPage.verifyContent();
    await hearingFastSpecPage.selectYesUnavailabilityRequired();
    await hearingFastSpecPage.addNewUnavailableDate();
    await hearingFastSpecPage.selectSingleDateFastTrack();
    await hearingFastSpecPage.submit();
  }
  async applicantCourtLocationLRSpecPage() {
    const { applicantCourtLocationLRSpecPage } = this.claimantResponsePageFactory;
    await applicantCourtLocationLRSpecPage.verifyContent(this.ccdCaseData);
    await applicantCourtLocationLRSpecPage.selectCourtLocation();
    await applicantCourtLocationLRSpecPage.selectNoRemoteHearing();
    await applicantCourtLocationLRSpecPage.submit();
  }

  async hearingSupportPage() {
    const { hearingSupportPage } = this.claimantResponsePageFactory;
    await hearingSupportPage.verifyContent(this.ccdCaseData);
    await hearingSupportPage.selectYes();
    await hearingSupportPage.enterSupportRequirementsAdditional();
    await hearingSupportPage.submit();
  }

  async vulnerabilityQuestionsSpecPage() {
    const { vulnerabilityQuestionsSpecPage } = this.claimantResponsePageFactory;
    await vulnerabilityQuestionsSpecPage.verifyContent(this.ccdCaseData);
    await vulnerabilityQuestionsSpecPage.selectYes();
    await vulnerabilityQuestionsSpecPage.enterVulnerabilityAdjustments();
    await vulnerabilityQuestionsSpecPage.submit();
  }

  async applicationsPage() {
    const { applicationPage } = this.claimantResponsePageFactory;
    await applicationPage.verifyContent(this.ccdCaseData);
    await applicationPage.selectYes();
    await applicationPage.enterAdditionalInformation();
    await applicationPage.submit();
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
    const { confirmClaimantResponseSpecPage } = this.claimantResponsePageFactory;
    await confirmClaimantResponseSpecPage.verifyContent(this.ccdCaseData);
    await confirmClaimantResponseSpecPage.submit();
  }
}
