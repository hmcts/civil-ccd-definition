import BaseExuiSteps from '../../../../../base/base-exui-steps';
import { Step } from '../../../../../decorators/test-steps';
import TestData from '../../../../../models/test-data';
import ExuiDashboardPageFactory from '../../../../../pages/exui/exui-dashboard/exui-dashboard-page-factory';
import ClaimantResponsePageFactory from '../../../../../pages/exui/solicitor-events/response/claimant-response/claimant-response-page-factory';
import RequestsFactory from '../../../../../requests/requests-factory';
import ccdEvents from '../../../../../constants/ccd-events.ts';
import { claimantSolicitorUser } from '../../../../../config/users/exui-users.ts';
import partys from '../../../../../constants/partys.ts';

const classKey = 'ClaimantResponseSpecSteps';
export default class ClaimantResponseSpecSteps extends BaseExuiSteps {
  private claimantResponsePageFactory: ClaimantResponsePageFactory;

  constructor(
    claimantResponsePageFactory: ClaimantResponsePageFactory,
    exuiDashboardPageFactory: ExuiDashboardPageFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(exuiDashboardPageFactory, requestsFactory, testData);
    this.claimantResponsePageFactory = claimantResponsePageFactory;
  }

  @Step(classKey)
  async FastTrack1v1() {
    await this.retryExuiEvent(
      async () => {
        await this.processRespondentResponseSpecPage();
        await this.processDefenceDocumentSpecPage();

        const { fileDirectionsQuestionairePage } = this.claimantResponsePageFactory;
        await fileDirectionsQuestionairePage.verifyContent(this.ccdCaseData);
        await fileDirectionsQuestionairePage.enterDetails();
        await fileDirectionsQuestionairePage.submit();

        const { fixedRecoverableCostsPage } = this.claimantResponsePageFactory;
        await fixedRecoverableCostsPage.verifyContent(this.ccdCaseData);
        await fixedRecoverableCostsPage.selectYes();
        await fixedRecoverableCostsPage.submit();

        const { disclosureOfElectronicDocumentsPage } = this.claimantResponsePageFactory;
        await disclosureOfElectronicDocumentsPage.verifyContent(this.ccdCaseData);
        await disclosureOfElectronicDocumentsPage.enterDetails();
        await disclosureOfElectronicDocumentsPage.submit();

        const { disclosureOfNonElectronicDocumentsSpecPage } = this.claimantResponsePageFactory;
        await disclosureOfNonElectronicDocumentsSpecPage.verifyContent(this.ccdCaseData);
        await disclosureOfNonElectronicDocumentsSpecPage.enterDetails();
        await disclosureOfNonElectronicDocumentsSpecPage.submit();

        const { disclosureReportPage } = this.claimantResponsePageFactory;
        await disclosureReportPage.verifyContent(this.ccdCaseData);
        await disclosureReportPage.enterDetails();
        await disclosureReportPage.submit();

        await this.processExpertsPage();
        await this.processWitnessesPage();
        await this.processLanguagePage();
        await this.processHearingSpecFastTrackPage();
        await this.processApplicantCourtLocationLRSpecPage();
        await this.processHearingSupportPage();
        await this.processVulnerabilityQuestionsSpecPage();

        const { applicationPage } = this.claimantResponsePageFactory;
        await applicationPage.verifyContent(this.ccdCaseData);
        await applicationPage.selectYes();
        await applicationPage.enterAdditionalInformation();
        await applicationPage.submit();

        await this.processStatementOfTruthPage();
        await this.processSubmitPage();
        await this.processConfirmPage();
      },
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  @Step(classKey)
  async SmallTrack1v1() {
    await super.fetchAndSetCCDCaseData(claimantSolicitorUser, 1738225824664262);
    await this.retryExuiEvent(
      async () => {
        await this.processRespondentResponseSpecPage();
        await this.processDefenceDocumentSpecPage();

        await this.processSmallClaimExperts();
        await this.processSmallClaimWitnesses();
        await this.smallClaimSpec();
      },
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantSolicitorUser,
    );
  }

  async SmallTrack2v1() {
    await super.fetchAndSetCCDCaseData(claimantSolicitorUser, 1738225905209607);
    await this.retryExuiEvent(
      async () => {
        const { respondentResponse2v1SpecPage } = this.claimantResponsePageFactory;
        await respondentResponse2v1SpecPage.selectYes();
        await respondentResponse2v1SpecPage.submit();

        await this.processDefenceDocumentSpecPage();
        await this.processSmallClaimExperts2v1();
        await this.processSmallClaimWitnesses();
        await this.smallClaimSpec();
      },
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  @Step(classKey)
  async SmallTrack1v2SS() {
    await this.retryExuiEvent(
      async () => {
        const { respondentResponse1v2SSSpecPage } = this.claimantResponsePageFactory;
        await respondentResponse1v2SSSpecPage.selectYes();
        await respondentResponse1v2SSSpecPage.submit();

        await this.processDefenceDocumentSpecPage();
        await this.processSmallClaimExperts();
        await this.processSmallClaimWitnesses();
        await this.smallClaimSpec();
      },
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  @Step(classKey)
  async SmallTrack1v2DS() {
    await this.retryExuiEvent(
      async () => {
        const { respondentResponse1v2DSSpecPage } = this.claimantResponsePageFactory;
        await respondentResponse1v2DSSpecPage.selectYes();
        await respondentResponse1v2DSSpecPage.submit();

        await this.processDefenceDocumentSpecPage();
        await this.processSmallClaimExperts();
        await this.processSmallClaimWitnesses();
        await this.smallClaimSpec();
      },
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  private async smallClaimSpec() {
    await this.processLanguagePage();
    await this.processHearingSpecSmallClaimPage();
    await this.processApplicantCourtLocationLRSpecPage();
    await this.processHearingSupportPage();
    await this.processVulnerabilityQuestionsSpecPage();
    await this.processStatementOfTruthPage();
    await this.processSubmitPage();
    await this.processConfirmPage();
  }

  private async processRespondentResponseSpecPage() {
    const { respondentResponseSpecPage } = this.claimantResponsePageFactory;
    await respondentResponseSpecPage.selectYes();
    await respondentResponseSpecPage.submit();
  }

  private async processDefenceDocumentSpecPage() {
    const { defenceResponseDocumentSpecPage } = this.claimantResponsePageFactory;
    await defenceResponseDocumentSpecPage.uploadDoc();
    await defenceResponseDocumentSpecPage.submit();
  }

  private async processExpertsPage() {
    const { expertsPage } = this.claimantResponsePageFactory;
    await expertsPage.verifyContent(this.ccdCaseData);
    await expertsPage.useExperts();
    await expertsPage.addNewExpert();
    await expertsPage.enterExpertDetails(partys.CLAIMANT_EXPERT_1);
    await expertsPage.submit();
  }

  private async processSmallClaimExperts() {
    const { smallClaimExpertsPage } = this.claimantResponsePageFactory;
    await smallClaimExpertsPage.verifyContent(this.ccdCaseData);
    await smallClaimExpertsPage.selectYesExperts();
    await smallClaimExpertsPage.enterExpertDetails();
    await smallClaimExpertsPage.submit();
  }

  private async processSmallClaimExperts2v1() {
    const { smallClaimExperts2v1Page } = this.claimantResponsePageFactory;
    await smallClaimExperts2v1Page.verifyContent(this.ccdCaseData);
    await smallClaimExperts2v1Page.selectYesExperts();
    await smallClaimExperts2v1Page.enterExpertDetails();
    await smallClaimExperts2v1Page.submit();
  }

  private async processWitnessesPage() {
    const { witnessesPage } = this.claimantResponsePageFactory;
    await witnessesPage.verifyContent(this.ccdCaseData);
    await witnessesPage.addWitness();
    await witnessesPage.enterWitnessDetails(partys.CLAIMANT_WITNESS_1);
    await witnessesPage.submit();
  }

  private async processSmallClaimWitnesses() {
    const { smallClaimWitnessesPage } = this.claimantResponsePageFactory;
    await smallClaimWitnessesPage.verifyContent(this.ccdCaseData);
    await smallClaimWitnessesPage.selectYes();
    await smallClaimWitnessesPage.addWitness();
    await smallClaimWitnessesPage.enterWitnessDetails();
    await smallClaimWitnessesPage.enterWitnessNumber();
    await smallClaimWitnessesPage.submit();
  }

  private async processLanguagePage() {
    const { languagePage } = this.claimantResponsePageFactory;
    await languagePage.verifyContent(this.ccdCaseData);
    await languagePage.selectEnglishAndWelsh();
    await languagePage.submit();
  }

  private async processHearingSpecSmallClaimPage() {
    const { hearingSpecPage } = this.claimantResponsePageFactory;
    await hearingSpecPage.verifyContent();
    await hearingSpecPage.selectYesUnavailabilityRequired();
    await hearingSpecPage.addNewUnavailableDate();
    await hearingSpecPage.selectSingleDate(1);
    await hearingSpecPage.submit();
  }

  private async processHearingSpecFastTrackPage() {
    const { hearingFastSpecPage } = this.claimantResponsePageFactory;
    await hearingFastSpecPage.verifyContent();
    await hearingFastSpecPage.selectYesUnavailabilityRequired();
    await hearingFastSpecPage.addNewUnavailableDate();
    await hearingFastSpecPage.selectSingleDateFastTrack(1);
    await hearingFastSpecPage.submit();
  }
  private async processApplicantCourtLocationLRSpecPage() {
    const { applicantCourtLocationLRSpecPage } = this.claimantResponsePageFactory;
    await applicantCourtLocationLRSpecPage.verifyContent(this.ccdCaseData);
    await applicantCourtLocationLRSpecPage.selectCourtLocation();
    await applicantCourtLocationLRSpecPage.selectNoRemoteHearing();
    await applicantCourtLocationLRSpecPage.submit();
  }

  private async processHearingSupportPage() {
    const { hearingSupportPage } = this.claimantResponsePageFactory;
    await hearingSupportPage.verifyContent(this.ccdCaseData);
    await hearingSupportPage.selectYes();
    await hearingSupportPage.enterSupportRequirementsAdditional();
    await hearingSupportPage.submit();
  }

  private async processVulnerabilityQuestionsSpecPage() {
    const { vulnerabilityQuestionsSpecPage } = this.claimantResponsePageFactory;
    await vulnerabilityQuestionsSpecPage.verifyContent(this.ccdCaseData);
    await vulnerabilityQuestionsSpecPage.selectYes();
    await vulnerabilityQuestionsSpecPage.enterVulnerabilityAdjustments();
    await vulnerabilityQuestionsSpecPage.submit();
  }

  private async processStatementOfTruthPage() {
    const { statementOfTruthClaimantResponsePage } = this.claimantResponsePageFactory;
    await statementOfTruthClaimantResponsePage.verifyContent(this.ccdCaseData);
    await statementOfTruthClaimantResponsePage.enterDetails();
    await statementOfTruthClaimantResponsePage.submit();
  }

  private async processSubmitPage() {
    const { submitClaimantResponsePage } = this.claimantResponsePageFactory;
    await submitClaimantResponsePage.verifyContent(this.ccdCaseData);
    await submitClaimantResponsePage.submit();
  }

  private async processConfirmPage() {
    const { confirmClaimantResponseSpecPage } = this.claimantResponsePageFactory;
    await confirmClaimantResponseSpecPage.verifyContent(this.ccdCaseData);
    await confirmClaimantResponseSpecPage.submit();
  }
}
