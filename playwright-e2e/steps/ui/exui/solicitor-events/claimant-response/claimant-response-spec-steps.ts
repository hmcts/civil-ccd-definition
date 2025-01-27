import BaseExuiSteps from '../../../../../base/base-exui-steps';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import TestData from '../../../../../models/test-data';
import ExuiDashboardPageFactory from '../../../../../pages/exui/exui-dashboard/exui-dashboard-page-factory';
import ClaimantResponsePageFactory from '../../../../../pages/exui/solicitor-events/response/claimant-response/claimant-response-page-factory';
import RequestsFactory from '../../../../../requests/requests-factory';
import ccdEvents from "../../../../../constants/ccd-events.ts";
import {civilAdminUser, claimantSolicitorUser} from "../../../../../config/users/exui-users.ts";
import partys from '../../../../../constants/partys.ts';

@AllMethodsStep()
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

  async ClaimantResponse1v1FastTrack() {
    await this.retryExuiEvent(
      async () => {

        await this.processClaimantResponseRepondentResponseSpecPage();
        await this.processClaimantResponseDefenceDocumentSpecPage();

        const { fileDirectionsQuestionairePage } = this.claimantResponsePageFactory
        await fileDirectionsQuestionairePage.verifyContent(this.ccdCaseData);
        await fileDirectionsQuestionairePage.enterDetails();
        await fileDirectionsQuestionairePage.submit();

        const { fixedRecoverableCostsPage } = this.claimantResponsePageFactory
        await fixedRecoverableCostsPage.verifyContent(this.ccdCaseData);
        await fixedRecoverableCostsPage.selectYes();
        await fixedRecoverableCostsPage.submit();

        const { disclosureOfElectronicDocumentsPage  } = this.claimantResponsePageFactory
        await disclosureOfElectronicDocumentsPage.verifyContent(this.ccdCaseData);
        await disclosureOfElectronicDocumentsPage.enterDetails();
        await disclosureOfElectronicDocumentsPage.submit();

        const { disclosureOfNonElectronicDocumentsSpecPage } = this.claimantResponsePageFactory
        await disclosureOfNonElectronicDocumentsSpecPage.verifyContent(this.ccdCaseData);
        await disclosureOfNonElectronicDocumentsSpecPage.enterDetails();
        await disclosureOfNonElectronicDocumentsSpecPage.submit();

        const { disclosureReportPage} = this.claimantResponsePageFactory
        await disclosureReportPage.verifyContent(this.ccdCaseData);
        await disclosureReportPage.enterDetails();
        await disclosureReportPage.submit();

        await this.processClaimantResponseExpertsPage();
        await this.processClaimantResponseWitnessesPage();
        await this.processClaimantResponseLanguagePage();
        await this.processClaimantResponseHearingSpecFastTrackPage();
        await this.processClaimantResponseApplicantCourtLocationLRSpecPage()
        await this.processClaimantResponseHearingSupportPage();
        await this.processClaimantResponseVulnerabilityQuestionsSpecPage();

        const { applicationPage } = this.claimantResponsePageFactory
        await applicationPage.verifyContent(this.ccdCaseData)
        await applicationPage.selectYes();
        await applicationPage.enterAdditionalInformation();
        await applicationPage.submit();

        await this.processClaimantResponseStatementOfTruthPage();
        await this.processClaimantResponseSubmitPage();
        await this.processClaimantResponseConfirmPage();

      },
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantSolicitorUser,
      { retries: 0},
    );
  }

  async ClaimantResponseSpec1v1SmallTrack() {
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
      { retries: 0 },
    );
  }

  async ClaimantResponse1v2SSSmallClaim() {
    await this.retryExuiEvent(
      async () => {

        const {respondentResponse1v2SSSpecPage} = this.claimantResponsePageFactory
        await respondentResponse1v2SSSpecPage.selectYes();
        await respondentResponse1v2SSSpecPage.submit();

        await this.processClaimantResponseDefenceDocumentSpecPage();
        await this.processClaimantResponseSmallClaimExperts();
        await this.processClaimantResponseSmallClaimWitnesses();
        await this.smallClaimSpec();


      },
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantSolicitorUser,
      {retries: 0},
    );
  }

  async ClaimantResponseSpec1v2DSSmallClaim() {
    await this.retryExuiEvent(
      async () => {

        const {respondentResponse1v2DSSpecPage} = this.claimantResponsePageFactory
        await respondentResponse1v2DSSpecPage.selectYes();
        await respondentResponse1v2DSSpecPage.submit();

        await this.processClaimantResponseDefenceDocumentSpecPage();
        await this.processClaimantResponseSmallClaimExperts();
        await this.processClaimantResponseSmallClaimWitnesses();
        await this.smallClaimSpec();

      },
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantSolicitorUser,
      {retries: 0},
    );
  }

  async ClaimantResponse2v1SmallClaim() {
    await this.retryExuiEvent(
      async () => {

        const {respondentResponse2v1SpecPage} = this.claimantResponsePageFactory
        await respondentResponse2v1SpecPage.selectYes();
        await respondentResponse2v1SpecPage.submit();

        await this.processClaimantResponseDefenceDocumentSpecPage();
        await this.processClaimantResponseSmallClaimExperts2v1();
        await this.processClaimantResponseSmallClaimWitnesses();
        await this.smallClaimSpec();


      },
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantSolicitorUser,
      {retries: 0},
    );
  }

  private async smallClaimSpec(){

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
    const {respondentResponseSpecPage} = this.claimantResponsePageFactory
    await respondentResponseSpecPage.selectYes();
    await respondentResponseSpecPage.submit();
  }

  private async processClaimantResponseDefenceDocumentSpecPage() {
    const { defenceResponseDocumentSpecPage } = this.claimantResponsePageFactory
    await defenceResponseDocumentSpecPage.uploadDoc();
    await defenceResponseDocumentSpecPage.submit();
  }

  private async processClaimantResponseExpertsPage(){
    const { expertsPage  } = this.claimantResponsePageFactory
    await expertsPage.verifyContent(this.ccdCaseData);
    await expertsPage.useExperts();
    await expertsPage.addNewExpert();
    await expertsPage.enterExpertDetails(partys.CLAIMANT_EXPERT_1);
    await expertsPage.submit();
  }

  private async processClaimantResponseSmallClaimExperts(){
    const { smallClaimExpertsClaimantPage } = this.claimantResponsePageFactory
    await smallClaimExpertsClaimantPage.verifyContent(this.ccdCaseData);
    await smallClaimExpertsClaimantPage.useExperts();
    await smallClaimExpertsClaimantPage.enterExpertDetails();
    await smallClaimExpertsClaimantPage.submit();
  }

  private async processClaimantResponseSmallClaimExperts2v1(){
    const { smallClaimExpertsClaimantPage } = this.claimantResponsePageFactory
    await smallClaimExpertsClaimantPage.verifyContent(this.ccdCaseData);
    await smallClaimExpertsClaimantPage.useExperts2v1();
    await smallClaimExpertsClaimantPage.enterExpertDetails();
    await smallClaimExpertsClaimantPage.submit();
  }

  private async processClaimantResponseWitnessesPage() {
    const {witnessesPage} = this.claimantResponsePageFactory
    await witnessesPage.verifyContent(this.ccdCaseData);
    await witnessesPage.addWitnesses();
    await witnessesPage.enterWitnessDetails(partys.CLAIMANT_WITNESS_1);
    await witnessesPage.submit();
  }

  private async processClaimantResponseSmallClaimWitnesses() {
    const { smallClaimWitnessesClaimantPage } = this.claimantResponsePageFactory
    await smallClaimWitnessesClaimantPage.verifyContent(this.ccdCaseData);
    await smallClaimWitnessesClaimantPage.selectYes();
    await smallClaimWitnessesClaimantPage.enterWitnessNumber();
    await smallClaimWitnessesClaimantPage.addWitness1v1();
    await smallClaimWitnessesClaimantPage.enterWitness1Details();
    await smallClaimWitnessesClaimantPage.submit();
  }

private async processClaimantResponseLanguagePage() {
    const { languagePage} = this.claimantResponsePageFactory
    await languagePage.verifyContent(this.ccdCaseData)
    await languagePage.selectEnglishAndWelsh();
    await languagePage.submit();
  }

  private async processClaimantResponseHearingSpecSmallClaimPage() {
    const { smallClaimHearingPage } = this.claimantResponsePageFactory
    await smallClaimHearingPage.verifyContent(this.ccdCaseData);
    await smallClaimHearingPage.selectYesAvailabilityRequired();
    await smallClaimHearingPage.addNewUnavailableDate();
    await smallClaimHearingPage.selectSingleDate(1);
    await smallClaimHearingPage.submit();
    await smallClaimHearingPage.submit();
  }

  private async processClaimantResponseHearingSpecFastTrackPage() {
    const { hearingSpecPage } = this.claimantResponsePageFactory
    await hearingSpecPage.verifyContentFasTrack1v1(this.ccdCaseData);
    await hearingSpecPage.selectYesAvailabilityRequiredFastTrack1v1();
    await hearingSpecPage.addNewUnavailableDateFastTrack();
    await hearingSpecPage.selectSingleDateFastTrack(1);
    await hearingSpecPage.submit();
    await hearingSpecPage.submit();
  }
  private async processClaimantResponseApplicantCourtLocationLRSpecPage() {
    const { applicantCourtLocationLRSpecPage } = this.claimantResponsePageFactory
    await applicantCourtLocationLRSpecPage.verifyContent(this.ccdCaseData);
    await applicantCourtLocationLRSpecPage.selectCourtLocation();
    await applicantCourtLocationLRSpecPage.selectNoRemoteHearing();
    await applicantCourtLocationLRSpecPage.submit();
  }

  private async processClaimantResponseHearingSupportPage() {
    const { hearingSupportPage } = this.claimantResponsePageFactory
    await hearingSupportPage.verifyContent(this.ccdCaseData);
    await hearingSupportPage.selectNo();
    await hearingSupportPage.submit();
  }

  private async processClaimantResponseVulnerabilityQuestionsSpecPage() {
    const { vulnerabilityQuestionsSpecPage } = this.claimantResponsePageFactory
    await vulnerabilityQuestionsSpecPage.verifyContent(this.ccdCaseData);
    await vulnerabilityQuestionsSpecPage.selectYes();
    await vulnerabilityQuestionsSpecPage.enterVulnerabilityAdjustments();
    await vulnerabilityQuestionsSpecPage.submit();
  }

  private async processClaimantResponseStatementOfTruthPage() {
    const { statementOfTruthClaimantResponsePage } = this.claimantResponsePageFactory
    await statementOfTruthClaimantResponsePage.verifyContent(this.ccdCaseData);
    await statementOfTruthClaimantResponsePage.enterDetails();
    await statementOfTruthClaimantResponsePage.submit();
  }

  private async processClaimantResponseSubmitPage() {
    const { submitClaimantResponsePage } = this.claimantResponsePageFactory
    await submitClaimantResponsePage.verifyContent(this.ccdCaseData);
    await submitClaimantResponsePage.submit();
  }

  private async processClaimantResponseConfirmPage() {
    const { confirmClaimantResponseSpecPage } = this.claimantResponsePageFactory
    await confirmClaimantResponseSpecPage.verifyContent(this.ccdCaseData);
    await confirmClaimantResponseSpecPage.submit();
  }
}
