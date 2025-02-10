import BaseExuiSteps from '../../../../../base/base-exui-steps';
import { Step } from '../../../../../decorators/test-steps';
import TestData from '../../../../../models/test-data';
import ExuiDashboardPageFactory from '../../../../../pages/exui/exui-dashboard/exui-dashboard-page-factory';
import DefendantResponsePageFactory from '../../../../../pages/exui/solicitor-events/response/defendant-response/defendant-response-page-factory';
import RequestsFactory from '../../../../../requests/requests-factory';
import ccdEvents from '../../../../../constants/ccd-events.ts';
import partys from '../../../../../constants/partys.ts';
import {
  civilAdminUser,
  defendantSolicitor1User,
  defendantSolicitor2User,
} from '../../../../../config/users/exui-users.ts';

const classKey = 'DefendantResponseSteps';
export default class DefendantResponseSteps extends BaseExuiSteps {
  private defendantResponsePageFactory: DefendantResponsePageFactory;

  constructor(
    defendantResponsePageFactory: DefendantResponsePageFactory,
    exuiDashboardPageFactory: ExuiDashboardPageFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(exuiDashboardPageFactory, requestsFactory, testData);
    this.defendantResponsePageFactory = defendantResponsePageFactory;
  }

  @Step(classKey)
  async FastTrackFullDefence1v1() {
    await this.retryExuiEvent(
      async () => {
        await this.processConfirmDetailsDefendantSolicitor1Page();
        await this.processRespondentResponseTypeDefendantSolicitor1Page();
        await this.processSolicitorReferencesDefendantResponseDefendantSolicitor1Page();
        await this.processUploadDefendantResponseDefendantSolicitor1Page();
        await this.processFileDirectionsQuestionaireDefendantSolicitor1Page();
        await this.processFixedRecoverableCostsPageDefendantSolicitor1();
        await this.processDisclosureOfNonElectronicDocumentsDefendantSolicitor1Page();
        await this.processExpertsDefendantSolicitor1Page();
        await this.processWitnessesDefendantSolicitor1Page();
        await this.processLanguageDefendantSolicitor1Page();
        await this.processHearingDefendantSolicitor1Page();
        await this.processDraftDirectionsDefendantSolicitor1Page();
        await this.processRequestedCourtDefendantSolicitor1Page();
        await this.processHearingSupportDefendantSolicitor1Page();
        await this.processVulnerabilityQuestionsDefendantSolicitor1Page();
        await this.processFurtherInformationDefendantSolicitor1Page();
        await this.processStatementOfTruthDefendantResponseDefendantSolicitor1Page();
        await this.processSubmitDefendantResponsePage();
        await this.processConfirmDefendantResponsePage();
      },
      ccdEvents.DEFENDANT_RESPONSE,
      defendantSolicitor1User,
      { retries: 0 },
    );
  }

  @Step(classKey)
  async SmallTrackFullDefence1v1() {
    await this.retryExuiEvent(
      async () => {
        await this.processConfirmDetailsDefendantSolicitor1Page();
        await this.processRespondentResponseTypeDefendantSolicitor1Page();
        await this.processSolicitorReferencesDefendantResponseDefendantSolicitor1Page();
        await this.processUploadDefendantResponseDefendantSolicitor1Page();
        await this.processExpertsDefendantSolicitor1Page();
        await this.processWitnessesDefendantSolicitor1Page();
        await this.processLanguageDefendantSolicitor1Page();
        await this.processHearingDefendantSolicitor1Page();
        await this.processDraftDirectionsDefendantSolicitor1Page();
        await this.processRequestedCourtDefendantSolicitor1Page();
        await this.processHearingSupportDefendantSolicitor1Page();
        await this.processVulnerabilityQuestionsDefendantSolicitor1Page();
        await this.processFurtherInformationDefendantSolicitor1Page();
        await this.processStatementOfTruthDefendantResponseDefendantSolicitor1Page();
        await this.processSubmitDefendantResponsePage();
        await this.processConfirmDefendantResponsePage();
      },
      ccdEvents.DEFENDANT_RESPONSE,
      defendantSolicitor1User,
      { retries: 0 },
    );
  }

  @Step(classKey)
  async SmallTrackFullDefence2v1() {
    await this.retryExuiEvent(
      async () => {
        await this.processConfirmDetailsDefendantSolicitor1Page();
        await this.processRespondentResponseType2v1Page();
        await this.processSolicitorReferencesDefendantResponseDefendantSolicitor1Page();
        await this.processUploadDefendantResponseDefendantSolicitor1Page();
        await this.processExpertsDefendantSolicitor1Page();
        await this.processWitnessesDefendantSolicitor1Page();
        await this.processLanguageDefendantSolicitor1Page();
        await this.processHearingDefendantSolicitor1Page();
        await this.processDraftDirectionsDefendantSolicitor1Page();
        await this.processRequestedCourtDefendantSolicitor1Page();
        await this.processHearingSupportDefendantSolicitor1Page();
        await this.processVulnerabilityQuestionsDefendantSolicitor1Page();
        await this.processFurtherInformationDefendantSolicitor1Page();
        await this.processStatementOfTruthDefendantResponseDefendantSolicitor1Page();
        await this.processSubmitDefendantResponsePage();
        await this.processConfirmDefendantResponsePage();
      },
      ccdEvents.DEFENDANT_RESPONSE,
      defendantSolicitor1User,
      { retries: 0 },
    );
  }

  @Step(classKey)
  async SmallTrackFullDefence1v2SS() {
    await this.retryExuiEvent(
      async () => {
        await this.processConfirmDetailsDefendantSolicitor1Page();
        await this.processSingleResponsePage();
        await this.processRespondentResponseTypeDefendantSolicitor1Page();
        await this.processSolicitorReferencesDefendantResponseDefendantSolicitor1Page();
        await this.processUploadDefendantResponseDefendantSolicitor1Page();
        await this.processExpertsDefendantSolicitor1Page();
        await this.processWitnessesDefendantSolicitor1Page();
        await this.processLanguageDefendantSolicitor1Page();
        await this.processHearingDefendantSolicitor1Page();
        await this.processDraftDirectionsDefendantSolicitor1Page();
        await this.processRequestedCourtDefendantSolicitor1Page();
        await this.processHearingSupportDefendantSolicitor1Page();
        await this.processVulnerabilityQuestionsDefendantSolicitor1Page();
        await this.processFurtherInformationDefendantSolicitor1Page();
        await this.processStatementOfTruthDefendantResponseDefendantSolicitor1Page();
        await this.processSubmitDefendantResponsePage();
        await this.processConfirmDefendantResponsePage();
      },
      ccdEvents.DEFENDANT_RESPONSE,
      defendantSolicitor1User,
      { retries: 0 },
    );
  }

  @Step(classKey)
  async SmallTrackFullDefence1v2DSDefendantSolicitor1() {
    await this.retryExuiEvent(
      async () => {
        await this.processConfirmDetailsDefendantSolicitor1Page();
        await this.processRespondentResponseTypeDefendantSolicitor1Page();
        await this.processSolicitorReferencesDefendantResponseDefendantSolicitor1Page();
        await this.processUploadDefendantResponseDefendantSolicitor1Page();
        await this.processExpertsDefendantSolicitor1Page();
        await this.processWitnessesDefendantSolicitor1Page();
        await this.processLanguageDefendantSolicitor1Page();
        await this.processHearingDefendantSolicitor1Page();
        await this.processDraftDirectionsDefendantSolicitor1Page();
        await this.processRequestedCourtDefendantSolicitor1Page();
        await this.processHearingSupportDefendantSolicitor1Page();
        await this.processVulnerabilityQuestionsDefendantSolicitor1Page();
        await this.processFurtherInformationDefendantSolicitor1Page();
        await this.processStatementOfTruthDefendantResponseDefendantSolicitor1Page();
        await this.processSubmitDefendantResponsePage();
        await this.processConfirm1v2DSDefendantResponsePage();
      },
      ccdEvents.DEFENDANT_RESPONSE,
      defendantSolicitor1User,
      { retries: 0 },
    );
  }

  @Step(classKey)
  async SmallTrackFullDefence1v2DSDefendantSolicitor2() {
    await this.retryExuiEvent(
      async () => {
        await this.processConfirmDetailsDefendantSolicitor2Page();
        await this.processRespondentResponseTypeDefendantSolicitor2Page();
        await this.processSolicitorReferencesDefendantResponseDefendantSolicitor2Page();
        await this.processUploadDefendantResponseDefendantSolicitor2Page();
        await this.processExpertsDefendantSolicitor2Page();
        await this.processWitnessesDefendantSolicitor2Page();
        await this.processLanguageDefendantSolicitor2Page();
        await this.processHearingDefendantSolicitor2Page();
        await this.processDraftDirectionsDefendantSolicitor2Page();
        await this.processRequestedCourtDefendantSolicitor2Page();
        await this.processHearingSupportDefendantSolicitor2Page();
        await this.processVulnerabilityQuestionsDefendantSolicitor2Page();
        await this.processFurtherInformationDefendantSolicitor2Page();
        await this.processStatementOfTruthDefendantResponseDefendantSolicitor2Page();
        await this.processSubmitDefendantResponsePage();
        await this.processConfirmDefendantResponsePage();
      },
      ccdEvents.DEFENDANT_RESPONSE,
      defendantSolicitor2User,
      { retries: 0 },
    );
  }

  private async processConfirmDetailsDefendantSolicitor1Page() {
    const { confirmDetailsDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await confirmDetailsDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await confirmDetailsDefendantSolicitor1Page.submit();
  }

  private async processConfirmDetailsDefendantSolicitor2Page() {
    const { confirmDetailsDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await confirmDetailsDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await confirmDetailsDefendantSolicitor2Page.submit();
  }

  private async processSingleResponsePage() {
    const { singleResponsePage } = this.defendantResponsePageFactory;
    await singleResponsePage.verifyContent(this.ccdCaseData);
    await singleResponsePage.selectYes();
    await singleResponsePage.submit();
  }

  private async processRespondentResponseTypeDefendantSolicitor1Page() {
    const { respondentResponseTypeDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await respondentResponseTypeDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await respondentResponseTypeDefendantSolicitor1Page.selectRejectAll();
    await respondentResponseTypeDefendantSolicitor1Page.submit();
  }

  private async processRespondentResponseType2v1Page() {
    const { respondentResponseType2v1Page } = this.defendantResponsePageFactory;
    await respondentResponseType2v1Page.verifyContent(this.ccdCaseData);
    await respondentResponseType2v1Page.selectRejectAll();
    await respondentResponseType2v1Page.submit();
  }

  private async processRespondentResponseTypeDefendantSolicitor2Page() {
    const { respondentResponseTypeDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await respondentResponseTypeDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await respondentResponseTypeDefendantSolicitor2Page.selectRejectAll();
    await respondentResponseTypeDefendantSolicitor2Page.submit();
  }

  private async processSolicitorReferencesDefendantResponseDefendantSolicitor1Page() {
    const { solicitorReferencesDefendantResponseDefendantSolicitor1Page } =
      this.defendantResponsePageFactory;
    await solicitorReferencesDefendantResponseDefendantSolicitor1Page.verifyContent(
      this.ccdCaseData,
    );
    await solicitorReferencesDefendantResponseDefendantSolicitor1Page.enterReference();
    await solicitorReferencesDefendantResponseDefendantSolicitor1Page.submit();
  }

  private async processSolicitorReferencesDefendantResponseDefendantSolicitor2Page() {
    const { solicitorReferencesDefendantResponseDefendantSolicitor2Page } =
      this.defendantResponsePageFactory;
    await solicitorReferencesDefendantResponseDefendantSolicitor2Page.verifyContent(
      this.ccdCaseData,
    );
    await solicitorReferencesDefendantResponseDefendantSolicitor2Page.enterReference();
    await solicitorReferencesDefendantResponseDefendantSolicitor2Page.submit();
  }

  private async processUploadDefendantResponseDefendantSolicitor1Page() {
    const { uploadDefendantResponseDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await uploadDefendantResponseDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await uploadDefendantResponseDefendantSolicitor1Page.uploadDefence();
    await uploadDefendantResponseDefendantSolicitor1Page.submit();
  }

  private async processUploadDefendantResponseDefendantSolicitor2Page() {
    const { uploadDefendantResponseDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await uploadDefendantResponseDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await uploadDefendantResponseDefendantSolicitor2Page.uploadDefence();
    await uploadDefendantResponseDefendantSolicitor2Page.submit();
  }

  private async processFileDirectionsQuestionaireDefendantSolicitor1Page() {
    const { fileDirectionsQuestionaireDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await fileDirectionsQuestionaireDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await fileDirectionsQuestionaireDefendantSolicitor1Page.enterDetails();
    await fileDirectionsQuestionaireDefendantSolicitor1Page.submit();
  }

  private async processFileDirectionsQuestionaireDefendantSolicitor2Page() {
    const { fileDirectionsQuestionaireDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await fileDirectionsQuestionaireDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await fileDirectionsQuestionaireDefendantSolicitor2Page.enterDetails();
    await fileDirectionsQuestionaireDefendantSolicitor2Page.submit();
  }

  private async processFixedRecoverableCostsPageDefendantSolicitor1() {
    const { fixedRecoverableCostsPageDefendantSolicitor1 } = this.defendantResponsePageFactory;
    await fixedRecoverableCostsPageDefendantSolicitor1.verifyContent(this.ccdCaseData);
    await fixedRecoverableCostsPageDefendantSolicitor1.selectYes();
    await fixedRecoverableCostsPageDefendantSolicitor1.submit();
  }

  private async processFixedRecoverableCostsPageDefendantSolicitor2() {
    const { fixedRecoverableCostsPageDefendantSolicitor2 } = this.defendantResponsePageFactory;
    await fixedRecoverableCostsPageDefendantSolicitor2.verifyContent(this.ccdCaseData);
    await fixedRecoverableCostsPageDefendantSolicitor2.selectYes();
    await fixedRecoverableCostsPageDefendantSolicitor2.submit();
  }

  private async processDisclosureOfNonElectronicDocumentsDefendantSolicitor1Page() {
    const { disclosureOfNonElectronicDocumentsDefendantSolicitor1Page } =
      this.defendantResponsePageFactory;
    await disclosureOfNonElectronicDocumentsDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await disclosureOfNonElectronicDocumentsDefendantSolicitor1Page.enterDetails();
    await disclosureOfNonElectronicDocumentsDefendantSolicitor1Page.submit();
  }

  private async processDisclosureOfNonElectronicDocumentsDefendantSolicitor2Page() {
    const { disclosureOfNonElectronicDocumentsDefendantSolicitor2Page } =
      this.defendantResponsePageFactory;
    await disclosureOfNonElectronicDocumentsDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await disclosureOfNonElectronicDocumentsDefendantSolicitor2Page.enterDetails();
    await disclosureOfNonElectronicDocumentsDefendantSolicitor2Page.submit();
  }

  private async processExpertsDefendantSolicitor1Page() {
    const { expertsDefendantSolicitor1Page: expertsDefendantSolicitor1Page } =
      this.defendantResponsePageFactory;
    await expertsDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await expertsDefendantSolicitor1Page.useExperts();
    await expertsDefendantSolicitor1Page.addNewExpert();
    await expertsDefendantSolicitor1Page.enterExpertDetails();
    await expertsDefendantSolicitor1Page.submit();
  }

  private async processExpertsDefendantSolicitor2Page() {
    const { expertsDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await expertsDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await expertsDefendantSolicitor2Page.useExperts();
    await expertsDefendantSolicitor2Page.addNewExpert();
    await expertsDefendantSolicitor2Page.enterExpertDetails();
    await expertsDefendantSolicitor2Page.submit();
  }

  private async processWitnessesDefendantSolicitor1Page() {
    const { witnessesDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await witnessesDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await witnessesDefendantSolicitor1Page.selectYesWitnesses();
    await witnessesDefendantSolicitor1Page.addWitness();
    await witnessesDefendantSolicitor1Page.enterWitnessDetails();
    await witnessesDefendantSolicitor1Page.submit();
  }

  private async processWitnessesDefendantSolicitor2Page() {
    const { witnessesDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await witnessesDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await witnessesDefendantSolicitor2Page.selectYesWitnesses();
    await witnessesDefendantSolicitor2Page.addWitness();
    await witnessesDefendantSolicitor2Page.enterWitnessDetails();
    await witnessesDefendantSolicitor2Page.submit();
  }

  private async processLanguageDefendantSolicitor1Page() {
    const { languageDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await languageDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await languageDefendantSolicitor1Page.selectEnglishAndWelsh();
    await languageDefendantSolicitor1Page.submit();
  }

  private async processLanguageDefendantSolicitor2Page() {
    const { languageDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await languageDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await languageDefendantSolicitor2Page.selectEnglishAndWelsh();
    await languageDefendantSolicitor2Page.submit();
  }

  private async processHearingDefendantSolicitor1Page() {
    const { hearingDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await hearingDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await hearingDefendantSolicitor1Page.selectYesAvailabilityRequired();
    await hearingDefendantSolicitor1Page.addNewUnavailableDate();
    await hearingDefendantSolicitor1Page.selectSingleDate();
    await hearingDefendantSolicitor1Page.submit();
  }

  private async processHearingDefendantSolicitor2Page() {
    const { hearingDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await hearingDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await hearingDefendantSolicitor2Page.selectYesAvailabilityRequired();
    await hearingDefendantSolicitor2Page.addNewUnavailableDate();
    await hearingDefendantSolicitor2Page.selectSingleDate();
    await hearingDefendantSolicitor2Page.submit();
  }

  private async processDraftDirectionsDefendantSolicitor1Page() {
    const { draftDirectionsDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await draftDirectionsDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await draftDirectionsDefendantSolicitor1Page.uploadEvidence();
    await draftDirectionsDefendantSolicitor1Page.submit();
  }

  private async processDraftDirectionsDefendantSolicitor2Page() {
    const { draftDirectionsDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await draftDirectionsDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await draftDirectionsDefendantSolicitor2Page.uploadEvidence();
    await draftDirectionsDefendantSolicitor2Page.submit();
  }

  private async processRequestedCourtDefendantSolicitor1Page() {
    const { requestedCourtDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await requestedCourtDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await requestedCourtDefendantSolicitor1Page.selectCourtLocation();
    await requestedCourtDefendantSolicitor1Page.enterPreferredCourtReason();
    await requestedCourtDefendantSolicitor1Page.selectNoRemoteHearing();
    await requestedCourtDefendantSolicitor1Page.submit();
  }

  private async processRequestedCourtDefendantSolicitor2Page() {
    const { requestedCourtDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await requestedCourtDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await requestedCourtDefendantSolicitor2Page.selectCourtLocation();
    await requestedCourtDefendantSolicitor2Page.enterPreferredCourtReason();
    await requestedCourtDefendantSolicitor2Page.selectNoRemoteHearing();
    await requestedCourtDefendantSolicitor2Page.submit();
  }

  private async processHearingSupportDefendantSolicitor1Page() {
    const { hearingSupportDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await hearingSupportDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await hearingSupportDefendantSolicitor1Page.selectYes();
    await hearingSupportDefendantSolicitor1Page.enterSupportRequirementsAdditional();
    await hearingSupportDefendantSolicitor1Page.submit();
  }

  private async processHearingSupportDefendantSolicitor2Page() {
    const { hearingSupportDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await hearingSupportDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await hearingSupportDefendantSolicitor2Page.selectYes();
    await hearingSupportDefendantSolicitor2Page.enterSupportRequirementsAdditional();
    await hearingSupportDefendantSolicitor2Page.submit();
  }

  private async processVulnerabilityQuestionsDefendantSolicitor1Page() {
    const { vulnerabilityQuestionsDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await vulnerabilityQuestionsDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await vulnerabilityQuestionsDefendantSolicitor1Page.selectYes();
    await vulnerabilityQuestionsDefendantSolicitor1Page.enterVulnerabilityAdjustments();
    await vulnerabilityQuestionsDefendantSolicitor1Page.submit();
  }

  private async processVulnerabilityQuestionsDefendantSolicitor2Page() {
    const { vulnerabilityQuestionsDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await vulnerabilityQuestionsDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await vulnerabilityQuestionsDefendantSolicitor2Page.selectYes();
    await vulnerabilityQuestionsDefendantSolicitor2Page.enterVulnerabilityAdjustments();
    await vulnerabilityQuestionsDefendantSolicitor2Page.submit();
  }

  private async processFurtherInformationDefendantSolicitor1Page() {
    const { furtherInformationDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await furtherInformationDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await furtherInformationDefendantSolicitor1Page.selectYes();
    await furtherInformationDefendantSolicitor1Page.enterFurtherInformation();
    await furtherInformationDefendantSolicitor1Page.submit();
  }

  private async processFurtherInformationDefendantSolicitor2Page() {
    const { furtherInformationDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await furtherInformationDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await furtherInformationDefendantSolicitor2Page.selectYes();
    await furtherInformationDefendantSolicitor2Page.enterFurtherInformation();
    await furtherInformationDefendantSolicitor2Page.submit();
  }

  private async processStatementOfTruthDefendantResponseDefendantSolicitor1Page() {
    const { statementOfTruthDefendantResponseDefendantSolicitor1Page } =
      this.defendantResponsePageFactory;
    await statementOfTruthDefendantResponseDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await statementOfTruthDefendantResponseDefendantSolicitor1Page.enterDetails();
    await statementOfTruthDefendantResponseDefendantSolicitor1Page.submit();
  }

  private async processStatementOfTruthDefendantResponseDefendantSolicitor2Page() {
    const { statementOfTruthDefendantResponseDefendantSolicitor2Page } =
      this.defendantResponsePageFactory;
    await statementOfTruthDefendantResponseDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await statementOfTruthDefendantResponseDefendantSolicitor2Page.enterDetails();
    await statementOfTruthDefendantResponseDefendantSolicitor2Page.submit();
  }

  private async processSubmitDefendantResponsePage() {
    const { submitDefendantResponsePage } = this.defendantResponsePageFactory;
    await submitDefendantResponsePage.verifyContent(this.ccdCaseData);
    await submitDefendantResponsePage.submit();
  }

  private async processConfirmDefendantResponsePage() {
    const { confirmDefendantResponsePage } = this.defendantResponsePageFactory;
    await confirmDefendantResponsePage.verifyContent(this.ccdCaseData);
    await confirmDefendantResponsePage.submit();
  }

  private async processConfirm1v2DSDefendantResponsePage() {
    const { confirm1v2DSDefendantResponsePage } = this.defendantResponsePageFactory;
    await confirm1v2DSDefendantResponsePage.verifyContent(this.ccdCaseData);
    await confirm1v2DSDefendantResponsePage.submit();
  }
}
