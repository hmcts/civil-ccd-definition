import BaseExuiSteps from '../../../../../base/base-exui-steps';
import { Step } from '../../../../../decorators/test-steps';
import TestData from '../../../../../models/test-data';
import ExuiDashboardPageFactory from '../../../../../pages/exui/exui-dashboard/exui-dashboard-page-factory';
import ClaimantResponsePageFactory from '../../../../../pages/exui/solicitor-events/response/claimant-response/claimant-response-page-factory';
import RequestsFactory from '../../../../../requests/requests-factory';
import ccdEvents from '../../../../../constants/ccd-events.ts';
import { civilAdminUser, claimantSolicitorUser } from '../../../../../config/users/exui-users.ts';
import partys from '../../../../../constants/partys.ts';

const classKey = 'ClaimantResponseSteps';

export default class ClaimantResponseSteps extends BaseExuiSteps {
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
  async FastTrackIntentToProceed1v1() {
    await this.retryExuiEvent(
      async () => {
        await this.processRespondentResponsePage();
        await this.processDefenceResponseDocumentPage();
        await this.processFileDirectionsQuestionairePage();
        await this.processFixedRecoverableCostsPage();
        await this.processDisclosureOfNonElectronicDocumentsSpecPage();
        await this.processExpertsPage();
        await this.processWitnessesPage();
        await this.processLanguagePage();
        await this.processHearingSmallClaimPage();
        await this.processDraftDirectionsPage();
        await this.processHearingSupportPage();
        await this.processVulnerabilityQuestionsPage();
        await this.processFutherInformationPage();
        await this.processStatementOfTruthPage();
        await this.processSubmitPage();
        await this.processConfirmPage();
      },
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      civilAdminUser,
      { verifySuccessEvent: false },
    );
  }

  @Step(classKey)
  async SmallClaimIntentToProceed1v1() {
    await this.retryExuiEvent(
      async () => {
        await this.processRespondentResponsePage();
        await this.processDefenceResponseDocumentPage();
        await this.processExpertsPage();
        await this.processWitnessesPage();
        await this.processLanguagePage();
        await this.processHearingSmallClaimPage();
        await this.processDraftDirectionsPage();
        await this.processHearingSupportPage();
        await this.processVulnerabilityQuestionsPage();
        await this.processFutherInformationPage();
        await this.processStatementOfTruthPage();
        await this.processSubmitPage();
        await this.processConfirmPage();
      },
      ccdEvents.CLAIMANT_RESPONSE,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  @Step(classKey)
  async SmallClaimIntentToProceed2v1() {
    await this.retryExuiEvent(
      async () => {
        await this.processRespondentResponse2v1PagePage();
        await this.processDefenceResponseDocumentPage();
        await this.processExpertsPage();
        await this.processWitnessesPage();
        await this.processLanguagePage();
        await this.processHearingSmallClaimPage();
        await this.processDraftDirectionsPage();
        await this.processHearingSupportPage();
        await this.processVulnerabilityQuestionsPage();
        await this.processFutherInformationPage();
        await this.processStatementOfTruthPage();
        await this.processSubmitPage();
        await this.processConfirmPage();
      },
      ccdEvents.CLAIMANT_RESPONSE,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  @Step(classKey)
  async SmallClaimIntentToProceed1v2SS() {
    await this.retryExuiEvent(
      async () => {
        await this.processRespondentResponse1v2Pages();
        await this.processDefenceResponseDocument1v2Page();
        await this.processExpertsPage();
        await this.processWitnessesPage();
        await this.processLanguagePage();
        await this.processHearingSmallClaimPage();
        await this.processDraftDirectionsPage();
        await this.processHearingSupportPage();
        await this.processVulnerabilityQuestionsPage();
        await this.processFutherInformationPage();
        await this.processStatementOfTruthPage();
        await this.processSubmitPage();
        await this.processConfirmPage();
      },
      ccdEvents.CLAIMANT_RESPONSE,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  @Step(classKey)
  async SmallClaimIntentToProceed1v2DS() {
    await this.retryExuiEvent(
      async () => {
        await this.processRespondentResponse1v2Pages();
        await this.processDefenceResponseDocument1v2Page();
        await this.processExpertsPage();
        await this.processWitnessesPage();
        await this.processLanguagePage();
        await this.processHearingSmallClaimPage();
        await this.processDraftDirectionsPage();
        await this.processHearingSupportPage();
        await this.processVulnerabilityQuestionsPage();
        await this.processFutherInformationPage();
        await this.processStatementOfTruthPage();
        await this.processSubmitPage();
        await this.processConfirmPage();
      },
      ccdEvents.CLAIMANT_RESPONSE,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  private async processRespondentResponsePage() {
    const { respondentResponsePage } = this.claimantResponsePageFactory;
    await respondentResponsePage.selectYes();
    await respondentResponsePage.submit();
  }

  private async processRespondentResponse2v1PagePage() {
    const { respondentResponse2v1Page } = this.claimantResponsePageFactory;
    await respondentResponse2v1Page.verifyContent(this.ccdCaseData);
    await respondentResponse2v1Page.selectYesBothClaimants();
    await respondentResponse2v1Page.submit();
  }

  private async processRespondentResponse1v2Pages() {
    const { respondentResponse1v2Page } = this.claimantResponsePageFactory;
    await respondentResponse1v2Page.selectYesBothDefendants();
    await respondentResponse1v2Page.submit();
  }

  private async processDefenceResponseDocument1v2Page() {
    const { defenceResponseDocument1v2Page } = this.claimantResponsePageFactory;
    await defenceResponseDocument1v2Page.uploadDocumentBothDefendants();
    await defenceResponseDocument1v2Page.submit();
  }

  private async processDefenceResponseDocumentPage() {
    const { defenceResponseDocumentPage } = this.claimantResponsePageFactory;
    await defenceResponseDocumentPage.uploadDocument();
    await defenceResponseDocumentPage.submit();
  }

  private async processFileDirectionsQuestionairePage() {
    const { fileDirectionsQuestionairePage } = this.claimantResponsePageFactory;
    await fileDirectionsQuestionairePage.verifyContent(this.ccdCaseData);
    await fileDirectionsQuestionairePage.enterDetails();
    await fileDirectionsQuestionairePage.submit();
  }

  private async processFixedRecoverableCostsPage() {
    const { fixedRecoverableCostsPage } = this.claimantResponsePageFactory;
    await fixedRecoverableCostsPage.verifyContent(this.ccdCaseData);
    await fixedRecoverableCostsPage.selectYes();
    await fixedRecoverableCostsPage.submit();
  }

  private async processDisclosureOfNonElectronicDocumentsSpecPage() {
    const { disclosureOfNonElectronicDocumentsSpecPage } = this.claimantResponsePageFactory;
    await disclosureOfNonElectronicDocumentsSpecPage.verifyContent(this.ccdCaseData);
    await disclosureOfNonElectronicDocumentsSpecPage.enterDetails();
    await disclosureOfNonElectronicDocumentsSpecPage.submit();
  }

  private async processExpertsPage() {
    const { expertsPage } = this.claimantResponsePageFactory;
    await expertsPage.verifyContent(this.ccdCaseData);
    await expertsPage.useExperts();
    await expertsPage.addNewExpert();
    await expertsPage.enterExpertDetails();
    await expertsPage.submit();
  }

  private async processWitnessesPage() {
    const { witnessesPage } = this.claimantResponsePageFactory;
    await witnessesPage.verifyContent(this.ccdCaseData);
    await witnessesPage.selectYesWitnesses();
    await witnessesPage.addWitness();
    await witnessesPage.enterWitnessDetails();
    await witnessesPage.submit();
  }

  private async processLanguagePage() {
    const { languagePage } = this.claimantResponsePageFactory;
    await languagePage.verifyContent(this.ccdCaseData);
    await languagePage.selectEnglishAndWelsh();
    await languagePage.submit();
  }

  private async processHearingSmallClaimPage() {
    const { hearingPage } = this.claimantResponsePageFactory;
    await hearingPage.verifyContent(this.ccdCaseData);
    await hearingPage.selectYesAvailabilityRequired();
    await hearingPage.addNewUnavailableDate();
    await hearingPage.selectSingleDate();
    await hearingPage.submit();
  }

  private async processDraftDirectionsPage() {
    const { draftDirectionsPage } = this.claimantResponsePageFactory;
    await draftDirectionsPage.verifyContent(this.ccdCaseData);
    await draftDirectionsPage.uploadEvidence();
    await draftDirectionsPage.submit();
  }

  private async processHearingSupportPage() {
    const { hearingSupportPage } = this.claimantResponsePageFactory;
    await hearingSupportPage.verifyContent(this.ccdCaseData);
    await hearingSupportPage.selectYes();
    await hearingSupportPage.enterSupportRequirementsAdditional();
    await hearingSupportPage.submit();
  }

  private async processFutherInformationPage() {
    const { furtherInformationPage } = this.claimantResponsePageFactory;
    await furtherInformationPage.verifyContent(this.ccdCaseData);
    await furtherInformationPage.selectYes();
    await furtherInformationPage.enterFurtherInformation();
    await furtherInformationPage.submit();
  }

  private async processVulnerabilityQuestionsPage() {
    const { vulnerabilityQuestionsPage } = this.claimantResponsePageFactory;
    await vulnerabilityQuestionsPage.verifyContent(this.ccdCaseData);
    await vulnerabilityQuestionsPage.selectYes();
    await vulnerabilityQuestionsPage.enterVulnerabilityAdjustments();
    await vulnerabilityQuestionsPage.submit();
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
    const { confirmClaimantResponsePage } = this.claimantResponsePageFactory;
    await confirmClaimantResponsePage.verifyContent(this.ccdCaseData);
    await confirmClaimantResponsePage.submit();
  }
}
