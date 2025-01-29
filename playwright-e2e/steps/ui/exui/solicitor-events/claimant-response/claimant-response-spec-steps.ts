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
    await super.fetchAndSetCCDCaseData(claimantSolicitorUser, 1738083731000744);
    await this.retryExuiEvent(
      async () => {
        await this.processClaimantResponseRepondentResponseSpecPage();
        await this.processClaimantResponseDefenceDocumentSpecPage();

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

        await this.processClaimantResponseExpertsPage();
        await this.processClaimantResponseWitnessesPage();
        await this.processClaimantResponseLanguagePage();
        await this.processClaimantResponseHearingSpecFastTrackPage();
        await this.processClaimantResponseApplicantCourtLocationLRSpecPage();
        await this.processClaimantResponseHearingSupportPage();
        await this.processClaimantResponseVulnerabilityQuestionsSpecPage();

        const { applicationPage } = this.claimantResponsePageFactory;
        await applicationPage.verifyContent(this.ccdCaseData);
        await applicationPage.selectYes();
        await applicationPage.enterAdditionalInformation();
        await applicationPage.submit();

        await this.processClaimantResponseStatementOfTruthPage();
        await this.processClaimantResponseSubmitPage();
        await this.processClaimantResponseConfirmPage();
      },
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantSolicitorUser,
      { retries: 0 },
    );
  }

  @Step(classKey)
  async SmallTrack1v1() {
    await this.retryExuiEvent(
      async () => {
        await this.processClaimantResponseRepondentResponseSpecPage();
        await this.processClaimantResponseDefenceDocumentSpecPage();

        await this.processClaimantResponseSmallClaimExperts();
        await this.processClaimantResponseSmallClaimWitnesses();
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

        await this.processClaimantResponseDefenceDocumentSpecPage();
        await this.processClaimantResponseSmallClaimExperts();
        await this.processClaimantResponseSmallClaimWitnesses();
        await this.smallClaimSpec();
      },
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantSolicitorUser,
      { retries: 0 },
    );
  }

  @Step(classKey)
  async SmallTrack1v2DS() {
    await this.retryExuiEvent(
      async () => {
        const { respondentResponse1v2DSSpecPage } = this.claimantResponsePageFactory;
        await respondentResponse1v2DSSpecPage.selectYes();
        await respondentResponse1v2DSSpecPage.submit();

        await this.processClaimantResponseDefenceDocumentSpecPage();
        await this.processClaimantResponseSmallClaimExperts();
        await this.processClaimantResponseSmallClaimWitnesses();
        await this.smallClaimSpec();
      },
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantSolicitorUser,
      { retries: 0 },
    );
  }

  async SmallTrack2v1() {
    await this.retryExuiEvent(
      async () => {
        const { respondentResponse2v1SpecPage } = this.claimantResponsePageFactory;
        await respondentResponse2v1SpecPage.selectYes();
        await respondentResponse2v1SpecPage.submit();

        await this.processClaimantResponseDefenceDocumentSpecPage();
        await this.processClaimantResponseSmallClaimExperts2v1();
        await this.processClaimantResponseSmallClaimWitnesses();
        await this.smallClaimSpec();
      },
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantSolicitorUser,
      { retries: 0 },
    );
  }

  private async smallClaimSpec() {
    await this.processClaimantResponseLanguagePage();
    await this.processClaimantResponseHearingSpecSmallClaimPage();
    await this.processClaimantResponseApplicantCourtLocationLRSpecPage();
    await this.processClaimantResponseHearingSupportPage();
    await this.processClaimantResponseVulnerabilityQuestionsSpecPage();
    await this.processClaimantResponseStatementOfTruthPage();
    await this.processClaimantResponseSubmitPage();
    await this.processClaimantResponseConfirmPage();
  }

  private async processClaimantResponseRepondentResponseSpecPage() {
    const { respondentResponseSpecPage } = this.claimantResponsePageFactory;
    await respondentResponseSpecPage.selectYes();
    await respondentResponseSpecPage.submit();
  }

  private async processClaimantResponseDefenceDocumentSpecPage() {
    const { defenceResponseDocumentSpecPage } = this.claimantResponsePageFactory;
    await defenceResponseDocumentSpecPage.uploadDoc();
    await defenceResponseDocumentSpecPage.submit();
  }

  private async processClaimantResponseExpertsPage() {
    const { expertsPage } = this.claimantResponsePageFactory;
    await expertsPage.verifyContent(this.ccdCaseData);
    await expertsPage.useExperts();
    await expertsPage.addNewExpert();
    await expertsPage.enterExpertDetails(partys.CLAIMANT_EXPERT_1);
    await expertsPage.submit();
  }

  private async processClaimantResponseSmallClaimExperts() {
    const { smallClaimExpertsClaimantPage } = this.claimantResponsePageFactory;
    await smallClaimExpertsClaimantPage.verifyContent(this.ccdCaseData);
    await smallClaimExpertsClaimantPage.selectYesExperts();
    await smallClaimExpertsClaimantPage.enterExpertDetails();
    await smallClaimExpertsClaimantPage.submit();
  }

  private async processClaimantResponseSmallClaimExperts2v1() {
    const { smallClaimExpertsClaimantPage } = this.claimantResponsePageFactory;
    await smallClaimExpertsClaimantPage.verifyContent(this.ccdCaseData);
    await smallClaimExpertsClaimantPage.selectYesExperts();
    await smallClaimExpertsClaimantPage.enterExpertDetails();
    await smallClaimExpertsClaimantPage.submit();
  }

  private async processClaimantResponseWitnessesPage() {
    const { witnessesPage } = this.claimantResponsePageFactory;
    await witnessesPage.verifyContent(this.ccdCaseData);
    await witnessesPage.addWitnesses();
    await witnessesPage.enterWitnessDetails(partys.CLAIMANT_WITNESS_1);
    await witnessesPage.submit();
  }

  private async processClaimantResponseSmallClaimWitnesses() {
    const { smallClaimWitnessesClaimantPage } = this.claimantResponsePageFactory;
    await smallClaimWitnessesClaimantPage.verifyContent(this.ccdCaseData);
    await smallClaimWitnessesClaimantPage.selectYes();
    await smallClaimWitnessesClaimantPage.enterWitnessNumber();
    await smallClaimWitnessesClaimantPage.addWitness();
    await smallClaimWitnessesClaimantPage.enterWitness1Details();
    await smallClaimWitnessesClaimantPage.submit();
  }

  private async processClaimantResponseLanguagePage() {
    const { languagePage } = this.claimantResponsePageFactory;
    await languagePage.verifyContent(this.ccdCaseData);
    await languagePage.selectEnglishAndWelsh();
    await languagePage.submit();
  }

  private async processClaimantResponseHearingSpecSmallClaimPage() {
    const { hearingSpecPage } = this.claimantResponsePageFactory;
    await hearingSpecPage.verifyContent();
    await hearingSpecPage.selectYesUnavailabilityRequired();
    await hearingSpecPage.addNewUnavailableDate();
    await hearingSpecPage.selectSingleDate(1);
    await hearingSpecPage.submit();
  }

  private async processClaimantResponseHearingSpecFastTrackPage() {
    const { hearingFastSpecPage } = this.claimantResponsePageFactory;
    await hearingFastSpecPage.verifyContent(this.ccdCaseData);
    await hearingFastSpecPage.selectYesUnavailabilityRequired();
    await hearingFastSpecPage.addNewUnavailableDate();
    await hearingFastSpecPage.selectSingleDateFastTrack(1);
    await hearingFastSpecPage.submit();
  }
  private async processClaimantResponseApplicantCourtLocationLRSpecPage() {
    const { applicantCourtLocationLRSpecPage } = this.claimantResponsePageFactory;
    await applicantCourtLocationLRSpecPage.verifyContent(this.ccdCaseData);
    await applicantCourtLocationLRSpecPage.selectCourtLocation();
    await applicantCourtLocationLRSpecPage.selectNoRemoteHearing();
    await applicantCourtLocationLRSpecPage.submit();
  }

  private async processClaimantResponseHearingSupportPage() {
    const { hearingSupportPage } = this.claimantResponsePageFactory;
    await hearingSupportPage.verifyContent(this.ccdCaseData);
    await hearingSupportPage.selectNo();
    await hearingSupportPage.submit();
  }

  private async processClaimantResponseVulnerabilityQuestionsSpecPage() {
    const { vulnerabilityQuestionsSpecPage } = this.claimantResponsePageFactory;
    await vulnerabilityQuestionsSpecPage.verifyContent(this.ccdCaseData);
    await vulnerabilityQuestionsSpecPage.selectYes();
    await vulnerabilityQuestionsSpecPage.enterVulnerabilityAdjustments();
    await vulnerabilityQuestionsSpecPage.submit();
  }

  private async processClaimantResponseStatementOfTruthPage() {
    const { statementOfTruthClaimantResponsePage } = this.claimantResponsePageFactory;
    await statementOfTruthClaimantResponsePage.verifyContent(this.ccdCaseData);
    await statementOfTruthClaimantResponsePage.enterDetails();
    await statementOfTruthClaimantResponsePage.submit();
  }

  private async processClaimantResponseSubmitPage() {
    const { submitClaimantResponsePage } = this.claimantResponsePageFactory;
    await submitClaimantResponsePage.verifyContent(this.ccdCaseData);
    await submitClaimantResponsePage.submit();
  }

  private async processClaimantResponseConfirmPage() {
    const { confirmClaimantResponseSpecPage } = this.claimantResponsePageFactory;
    await confirmClaimantResponseSpecPage.verifyContent(this.ccdCaseData);
    await confirmClaimantResponseSpecPage.submit();
  }
}
