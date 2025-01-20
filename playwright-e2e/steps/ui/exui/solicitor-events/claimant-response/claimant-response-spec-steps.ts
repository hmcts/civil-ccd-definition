import BaseExuiSteps from '../../../../../base/base-exui-steps';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import TestData from '../../../../../models/test-data';
import ExuiDashboardPageFactory from '../../../../../pages/exui/exui-dashboard/exui-dashboard-page-factory';
import ClaimantResponsePageFactory from '../../../../../pages/exui/solicitor-events/response/claimant-response/claimant-response-page-factory';
import RequestsFactory from '../../../../../requests/requests-factory';
import ccdEvents from "../../../../../constants/ccd-events.ts";
import {civilAdminUser, claimantSolicitorUser} from "../../../../../config/users/exui-users.ts";
import {Party} from "../../../../../models/partys.ts";

@AllMethodsStep()
export default class ClaimantResponseSpecSteps extends BaseExuiSteps {
  private claimantResponsePageFactory: ClaimantResponsePageFactory;
  private exuiDashboardPageFactory: ExuiDashboardPageFactory
  private expertParty: Party
  private witnessParty: Party

  constructor(
    claimantResponsePageFactory: ClaimantResponsePageFactory,
    exuiDashboardPageFactory: ExuiDashboardPageFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(exuiDashboardPageFactory, requestsFactory, testData);
    this.claimantResponsePageFactory = claimantResponsePageFactory;
    this.exuiDashboardPageFactory = exuiDashboardPageFactory;
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

        await this.processClaimantResponseExpertsPage();
        await this.processClaimantResponseWitnessesPage();
        await this.processClaimantResponseLanguagePage();
        await this.processClaimantResponseHearingSpecPage();
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
      civilAdminUser,
      { retries: 1 },
    );
  }
  async ClaimantResponse1v1SmallTrack() {
    await this.retryExuiEvent(
      async () => {

        await this.processClaimantResponseRepondentResponseSpecPage();
        await this.processClaimantResponseDefenceDocumentSpecPage();

        await this.processClaimantResponseSmallClaimExperts();
        await this.processClaimantResponseSmallClaimWitnesses();

        await this.processClaimantResponseLanguagePage();
        await this.processClaimantResponseHearingSpecPage();
        await this.processClaimantResponseApplicantCourtLocationLRSpecPage();
        await this.processClaimantResponseHearingSupportPage();
        await this.processClaimantResponseVulnerabilityQuestionsSpecPage();
        await this.processClaimantResponseStatementOfTruthPage();
        await this.processClaimantResponseSubmitPage();
        await this.processClaimantResponseConfirmPage();

      },
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      civilAdminUser,
      { retries: 1 },
    );
  }

  async ClaimantResponse1v2SSSmallTrack() {
    await this.retryExuiEvent(
      async () => {

        const {respondentResponse1v2SSSpecPage} = this.claimantResponsePageFactory
        await respondentResponse1v2SSSpecPage.selectYes();
        await respondentResponse1v2SSSpecPage.submit();

        await this.processClaimantResponseDefenceDocumentSpecPage();
        await this.processClaimantResponseSmallClaimExperts();
        await this.processClaimantResponseSmallClaimWitnesses();
        await this.processClaimantResponseLanguagePage();
        await this.processClaimantResponseHearingSpecPage();
        await this.processClaimantResponseApplicantCourtLocationLRSpecPage();
        await this.processClaimantResponseHearingSupportPage();
        await this.processClaimantResponseVulnerabilityQuestionsSpecPage();
        await this.processClaimantResponseStatementOfTruthPage();
        await this.processClaimantResponseSubmitPage();
        await this.processClaimantResponseConfirmPage();

      },
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      civilAdminUser,
      {retries: 1},
    );
  }

  async ClaimantResponse1v2DSSmallTrack() {
    await this.retryExuiEvent(
      async () => {

        const {respondentResponse1v2DSSpecPage} = this.claimantResponsePageFactory
        await respondentResponse1v2DSSpecPage.selectYes();
        await respondentResponse1v2DSSpecPage.submit();

        await this.processClaimantResponseDefenceDocumentSpecPage();
        await this.processClaimantResponseSmallClaimExperts();
        await this.processClaimantResponseSmallClaimWitnesses();
        await this.processClaimantResponseLanguagePage();
        await this.processClaimantResponseHearingSpecPage();
        await this.processClaimantResponseApplicantCourtLocationLRSpecPage();
        await this.processClaimantResponseHearingSupportPage();
        await this.processClaimantResponseVulnerabilityQuestionsSpecPage();
        await this.processClaimantResponseStatementOfTruthPage();
        await this.processClaimantResponseSubmitPage();
        await this.processClaimantResponseConfirmPage();

      },
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      civilAdminUser,
      {retries: 1},
    );
  }

  async ClaimantResponse2v1SmallTrack() {
    await this.retryExuiEvent(
      async () => {

        const {respondentResponse2v1SpecPage} = this.claimantResponsePageFactory
        await respondentResponse2v1SpecPage.selectYes();
        await respondentResponse2v1SpecPage.submit();

        await this.processClaimantResponseDefenceDocumentSpecPage();
        await this.processClaimantResponseSmallClaimExperts();
        await this.processClaimantResponseSmallClaimWitnesses();
        await this.processClaimantResponseLanguagePage();
        await this.processClaimantResponseHearingSpecPage();
        await this.processClaimantResponseApplicantCourtLocationLRSpecPage();
        await this.processClaimantResponseHearingSupportPage();
        await this.processClaimantResponseVulnerabilityQuestionsSpecPage();
        await this.processClaimantResponseStatementOfTruthPage();
        await this.processClaimantResponseSubmitPage();
        await this.processClaimantResponseConfirmPage();

      },
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      civilAdminUser,
      {retries: 1},
    );
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
    // No 1v2 spec needed ? there is one for unspec
  }

  private async processClaimantResponseExpertsPage(){
    const { expertsPage  } = this.claimantResponsePageFactory
    await expertsPage.verifyContent(this.ccdCaseData);
    await expertsPage.useExperts();
    await expertsPage.addNewExpert();
    await expertsPage.enterExpertDetails(this.expertParty);
    await expertsPage.submit();
  }

  private async processClaimantResponseSmallClaimExperts(){
    const { claimantResponseSmallClaimExperts } = this.claimantResponsePageFactory
    await claimantResponseSmallClaimExperts.verifyContent(this.ccdCaseData);
    await claimantResponseSmallClaimExperts.useExperts();
    await claimantResponseSmallClaimExperts.enterExpertDetails();
    // no witness Party needed ?
    await claimantResponseSmallClaimExperts.submit();
  }

  private async processClaimantResponseWitnessesPage() {
    const {witnessesPage} = this.claimantResponsePageFactory
    await witnessesPage.verifyContent(this.ccdCaseData);
    //missing step to select yes witness is needed
    await witnessesPage.addWitnesses();
    await witnessesPage.enterWitnessDetails(this.witnessParty);
    await witnessesPage.submit();
  }

  private async processClaimantResponseSmallClaimWitnesses() {
    const { claimantResponseSmallClaimWitnesses } = this.claimantResponsePageFactory
    await claimantResponseSmallClaimWitnesses.verifyContent(this.ccdCaseData);
    await claimantResponseSmallClaimWitnesses.selectYes();
    await claimantResponseSmallClaimWitnesses.addWitness();
    await claimantResponseSmallClaimWitnesses.enterWitness1Details(this.witnessParty);
    await claimantResponseSmallClaimWitnesses.submit();
  }

private async processClaimantResponseLanguagePage() {
    const { languagePage} = this.claimantResponsePageFactory
    await languagePage.verifyContent(this.ccdCaseData)
    await languagePage.selectEnglishAndWelsh();
    await languagePage.submit();
  }
  private async processClaimantResponseHearingSpecPage() {
    const { hearingSpecPage } = this.claimantResponsePageFactory
    await hearingSpecPage.verifyContent(this.ccdCaseData);
    await hearingSpecPage.selectYesAvailabilityRequired();
    await hearingSpecPage.selectSingleDate(8);
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
    const { claimantResponseStatementOfTruthPage } = this.claimantResponsePageFactory
    await claimantResponseStatementOfTruthPage.verifyContent(this.ccdCaseData);
    await claimantResponseStatementOfTruthPage.enterDetails();
    await claimantResponseStatementOfTruthPage.submit();
  }

  private async processClaimantResponseSubmitPage() {
    const { claimantResponseSubmitPage } = this.claimantResponsePageFactory
    await claimantResponseSubmitPage.verifyContent(this.ccdCaseData);
    await claimantResponseSubmitPage.submit();
  }

  private async processClaimantResponseConfirmPage() {
    const { claimantResponseConfirmSpecPage } = this.claimantResponsePageFactory
    await claimantResponseConfirmSpecPage.verifyContent(this.ccdCaseData);
    await claimantResponseConfirmSpecPage.submit();
  }
}
