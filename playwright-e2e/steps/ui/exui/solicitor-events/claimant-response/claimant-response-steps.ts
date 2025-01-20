import BaseExuiSteps from '../../../../../base/base-exui-steps';
import BaseSteps from '../../../../../base/base-steps';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import TestData from '../../../../../models/test-data';
import ExuiDashboardPageFactory from '../../../../../pages/exui/exui-dashboard/exui-dashboard-page-factory';
import ClaimantResponsePageFactory from '../../../../../pages/exui/solicitor-events/response/claimant-response/claimant-response-page-factory';
import RequestsFactory from '../../../../../requests/requests-factory';
import ccdEvents from "../../../../../constants/ccd-events.ts";
import {civilAdminUser} from "../../../../../config/users/exui-users.ts";
import {Party} from "../../../../../models/partys.ts";

@AllMethodsStep()
export default class ClaimantResponseSteps extends BaseExuiSteps {
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
  }

  async ClaimantResponse1v1FastTrackUnspec() {
    await this.retryExuiEvent(
      async () => {

        await this.processClaimantResponseRespondentResponsePage();

        await this.processClaimantResponseDefenceResponseDocumentPage();

        const { fileDirectionsQuestionairePage } = this.claimantResponsePageFactory
        await fileDirectionsQuestionairePage.verifyContent(this.ccdCaseData);
        await fileDirectionsQuestionairePage.enterDetails();
        await fileDirectionsQuestionairePage.submit();

        const { fixedRecoverableCostsPage } = this.claimantResponsePageFactory
        await fixedRecoverableCostsPage.verifyContent(this.ccdCaseData);
        await fixedRecoverableCostsPage.selectYes();
        await fixedRecoverableCostsPage.submit();

        const { disclosureOfNonElectronicDocumentsPage } = this.claimantResponsePageFactory
        await disclosureOfNonElectronicDocumentsPage.verifyContent(this.ccdCaseData);
        await disclosureOfNonElectronicDocumentsPage.enterDetails();
        await disclosureOfNonElectronicDocumentsPage.submit();

        await this.processClaimantResponseExpertsPage();
        await this.processClaimantResponseWitnessesPage();
        await this.processClaimantResponseLanguagePage();
        await this.processClaimantResponseHearingPage();
        await this.processClaimantResponseDraftDirectionsPage();
        await this.processClaimantResponseHearingSupportPage();
        await this.processClaimantResponseVulnerabilityQuestionsPage();
        await this.processClaimantResponseFutherInformationPage();
        await this.processClaimantResponseStatementOfTruthPage();
        await this.processClaimantResponseSubmitPage();
        await this.processClaimantResponseConfirmPage();

      },
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      civilAdminUser,
      { retries: 1 },
    );
  }
  async ClaimantResponse1v1SmallClaimUnspec() {
    await this.retryExuiEvent(
      async () => {

        await this.processClaimantResponseRespondentResponsePage();
        await this.processClaimantResponseDefenceResponseDocumentPage();
        await this.processClaimantResponseExpertsPage();
        await this.processClaimantResponseWitnessesPage();
        await this.processClaimantResponseLanguagePage();
        await this.processClaimantResponseHearingPage();
        await this.processClaimantResponseDraftDirectionsPage();
        await this.processClaimantResponseHearingSupportPage();
        await this.processClaimantResponseVulnerabilityQuestionsPage();
        await this.processClaimantResponseFutherInformationPage();
        await this.processClaimantResponseStatementOfTruthPage();
        await this.processClaimantResponseSubmitPage();
        await this.processClaimantResponseConfirmPage();

      },
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      civilAdminUser,
      { retries: 1 },
    );
  }

  async ClaimantResponse1v2SSSmallClaimUnspec() {
    await this.retryExuiEvent(
      async () => {

        await this.processClaimantResponseRespondentResponse1v2Page();
        await this.processClaimantResponseDefenceResponseDocument1v2Page();
        await this.processClaimantResponseExpertsPage();
        await this.processClaimantResponseWitnessesPage();
        await this.processClaimantResponseLanguagePage();
        await this.processClaimantResponseHearingPage();
        await this.processClaimantResponseDraftDirectionsPage();
        await this.processClaimantResponseHearingSupportPage();
        await this.processClaimantResponseVulnerabilityQuestionsPage();
        await this.processClaimantResponseFutherInformationPage();
        await this.processClaimantResponseStatementOfTruthPage();
        await this.processClaimantResponseSubmitPage();
        await this.processClaimantResponseConfirmPage();

      },
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      civilAdminUser,
      { retries: 1 },
    );
  }

  async ClaimantResponse1v2DSSmallClaimUnspec() {
    await this.retryExuiEvent(
      async () => {

        await this.processClaimantResponseRespondentResponse1v2Page();
        await this.processClaimantResponseDefenceResponseDocument1v2Page();
        await this.processClaimantResponseExpertsPage();
        await this.processClaimantResponseWitnessesPage();
        await this.processClaimantResponseLanguagePage();
        await this.processClaimantResponseHearingPage();
        await this.processClaimantResponseDraftDirectionsPage();
        await this.processClaimantResponseHearingSupportPage();
        await this.processClaimantResponseVulnerabilityQuestionsPage();
        await this.processClaimantResponseFutherInformationPage();
        await this.processClaimantResponseStatementOfTruthPage();
        await this.processClaimantResponseSubmitPage();
        await this.processClaimantResponseConfirmPage();

      },
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      civilAdminUser,
      { retries: 1 },
    );
  }
  async ClaimantResponse2v1SmallClaimUnspec() {
    await this.retryExuiEvent(
      async () => {

        const {respondentResponse2v1Page} = this.claimantResponsePageFactory
        await respondentResponse2v1Page.verifyContent(this.ccdCaseData);
        await respondentResponse2v1Page.selectYesBothClaimants();
        await respondentResponse2v1Page.submit();

        await this.processClaimantResponseDefenceResponseDocumentPage();
        await this.processClaimantResponseExpertsPage();
        await this.processClaimantResponseWitnessesPage();
        await this.processClaimantResponseLanguagePage();
        await this.processClaimantResponseHearingPage();
        await this.processClaimantResponseDraftDirectionsPage();
        await this.processClaimantResponseHearingSupportPage();
        await this.processClaimantResponseVulnerabilityQuestionsPage();
        await this.processClaimantResponseFutherInformationPage();
        await this.processClaimantResponseStatementOfTruthPage();
        await this.processClaimantResponseSubmitPage();
        await this.processClaimantResponseConfirmPage();

      },
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      civilAdminUser,
      { retries: 1 },
    );
  }
  private async  processClaimantResponseRespondentResponsePage() {
    const { respondentResponsePage} = this.claimantResponsePageFactory
    await respondentResponsePage.selectYes();
    await respondentResponsePage.submit();
  }

  private async  processClaimantResponseRespondentResponse1v2Page() {
    const { respondentResponse1v2Page} = this.claimantResponsePageFactory
    await respondentResponse1v2Page.selectYesBothDefendants();
    await respondentResponse1v2Page.submit();
  }

  private async processClaimantResponseDefenceResponseDocumentPage() {
    const { defenceResponseDocumentPage } = this.claimantResponsePageFactory
    await defenceResponseDocumentPage.uploadDocument();
    await defenceResponseDocumentPage.submit();
  }

  private async processClaimantResponseDefenceResponseDocument1v2Page() {
    const { defenceResponseDocument1v2Page } = this.claimantResponsePageFactory
    await defenceResponseDocument1v2Page.uploadDocumentBothDefendants();
    await defenceResponseDocument1v2Page.submit();
  }

  private async processClaimantResponseExpertsPage(){
    const { expertsPage  } = this.claimantResponsePageFactory
    await expertsPage.verifyContent(this.ccdCaseData);
    await expertsPage.useExperts();
    await expertsPage.addNewExpert();
    await expertsPage.enterExpertDetails(this.expertParty);
    await expertsPage.submit();
  }

  private async processClaimantResponseWitnessesPage(){
    const {witnessesPage} = this.claimantResponsePageFactory
    await witnessesPage.verifyContent(this.ccdCaseData);
    //missing step to select yes witness is needed
    await witnessesPage.addWitnesses();
    await witnessesPage.enterWitnessDetails(this.witnessParty);
    await witnessesPage.submit();
  }

  private async processClaimantResponseLanguagePage() {
    const { languagePage} = this.claimantResponsePageFactory
    await languagePage.verifyContent(this.ccdCaseData)
    await languagePage.selectEnglishAndWelsh();
    await languagePage.submit();
  }

  private async processClaimantResponseHearingPage() {
    const { hearingPage } = this.claimantResponsePageFactory
    await hearingPage.verifyContent(this.ccdCaseData);
    await hearingPage.selectYesAvailabilityRequired();
    await hearingPage.selectSingleDate(4);
    await hearingPage.submit();
  }

  private async processClaimantResponseDraftDirectionsPage() {
    const { draftDirectionsPage } = this.claimantResponsePageFactory
    await draftDirectionsPage.verifyContent(this.ccdCaseData);
    await draftDirectionsPage.uploadEvidence();
    await draftDirectionsPage.submit();
  }

  private async processClaimantResponseHearingSupportPage() {
    const { hearingSupportPage } = this.claimantResponsePageFactory
    await hearingSupportPage.verifyContent(this.ccdCaseData);
    await hearingSupportPage.selectNo();
    await hearingSupportPage.submit();
  }

  private async processClaimantResponseVulnerabilityQuestionsPage() {
    const { vulnerabilityQuestionsPage } = this.claimantResponsePageFactory
    await vulnerabilityQuestionsPage.verifyContent(this.ccdCaseData);
    await vulnerabilityQuestionsPage.selectYes();
    await vulnerabilityQuestionsPage.enterVulnerabilityAdjustments();
    await vulnerabilityQuestionsPage.submit();
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
    const { claimantResponseConfirmPage } = this.claimantResponsePageFactory
    await claimantResponseConfirmPage.verifyContent(this.ccdCaseData);
    await claimantResponseConfirmPage.submit();

  }
  private async processClaimantResponseFutherInformationPage() {
    const { furtherInformationPage } = this.claimantResponsePageFactory
    await furtherInformationPage.verifyContent(this.ccdCaseData);
    await furtherInformationPage.selectYes();
    await furtherInformationPage.inputFurtherInformation();
    await furtherInformationPage.submit();
  }
}
