import BaseExuiSteps from '../../../../../base/base-exui-steps';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import TestData from '../../../../../models/test-data';
import ExuiDashboardPageFactory from '../../../../../pages/exui/exui-dashboard/exui-dashboard-page-factory';
import DefendantResponsePageFactory from '../../../../../pages/exui/solicitor-events/response/defendant-response/defendant-response-page-factory';
import RequestsFactory from '../../../../../requests/requests-factory';
import ccdEvents from '../../../../../constants/ccd-events.ts';
import partys from '../../../../../constants/partys.ts';
import {
  defendantSolicitor1User,
  defendantSolicitor2User,
} from '../../../../../config/users/exui-users.ts';

@AllMethodsStep()
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

  async FastTrackFullDefenceDefendant1() {
    await this.retryExuiEvent(
      async () => {
        await this.processConfirmDetailsPage();
        await this.processRespondentResponseTypeDefendant1Page();
        await this.processSolicitorReferencesDefendantResponseDefendant1Page();
        await this.processUploadDefendantResponseDefendant1Page();
        const {} = this.defendantResponsePageFactory;
        await this.processExpertsDefendant1Page();
        await this.processWitnessesDefendant1Page();
        await this.processLanguageDefendant1Page();
        await this.processHearingDefendant1Page();
        await this.processDraftDirectionsDefendant1Page();
        await this.processRequestedCourtDefendant1Page();
        await this.processHearingSupportDefendant1Page();
        await this.processVulnerabilityQuestionsDefendant1Page();
        await this.processFurtherInformationDefendant1Page();
        await this.processStatementOfTruthDefendantResponseDefendant1Page();
        await this.processSubmitDefendantResponsePage();
        await this.processConfirmDefendantResponsePage();
      },
      ccdEvents.DEFENDANT_RESPONSE,
      defendantSolicitor1User,
      { retries: 0 },
    );
  }

  async SmallTrackFullDefenceDefendant1() {
    await this.retryExuiEvent(
      async () => {
        await this.processConfirmDetailsPage();
        await this.processRespondentResponseTypeDefendant1Page();
        await this.processSolicitorReferencesDefendantResponseDefendant1Page();
        await this.processUploadDefendantResponseDefendant1Page();
        await this.processExpertsDefendant1Page();
        await this.processWitnessesDefendant1Page();
        await this.processLanguageDefendant1Page();
        await this.processHearingDefendant1Page();
        await this.processDraftDirectionsDefendant1Page();
        await this.processRequestedCourtDefendant1Page();
        await this.processHearingSupportDefendant1Page();
        await this.processVulnerabilityQuestionsDefendant1Page();
        await this.processFurtherInformationDefendant1Page();
        await this.processStatementOfTruthDefendantResponseDefendant1Page();
        await this.processSubmitDefendantResponsePage();
        await this.processConfirmDefendantResponsePage();
      },
      ccdEvents.DEFENDANT_RESPONSE,
      defendantSolicitor1User,
      { retries: 0 },
    );
  }

  async SmallTrackFullDefence1v2DSDefendant1() {
    await this.retryExuiEvent(
      async () => {
        await this.processConfirmDetailsPage();
        await this.processRespondentResponseTypeDefendant1Page();
        await this.processSolicitorReferencesDefendantResponseDefendant1Page();
        await this.processUploadDefendantResponseDefendant1Page();
        await this.processExpertsDefendant1Page();
        await this.processWitnessesDefendant1Page();
        await this.processLanguageDefendant1Page();
        await this.processHearingDefendant1Page();
        await this.processDraftDirectionsDefendant1Page();
        await this.processRequestedCourtDefendant1Page();
        await this.processHearingSupportDefendant1Page();
        await this.processVulnerabilityQuestionsDefendant1Page();
        await this.processFurtherInformationDefendant1Page();
        await this.processStatementOfTruthDefendantResponseDefendant1Page();
        await this.processSubmitDefendantResponsePage();
        await this.processConfirm1v2DSDefendantResponsePage();
      },
      ccdEvents.DEFENDANT_RESPONSE,
      defendantSolicitor1User,
      { retries: 0 },
    );
  }

  async SmallTrackFullDefence1v2DSDefendant2() {
    await this.retryExuiEvent(
      async () => {
        await this.processConfirmDetailsPage();
        await this.processRespondentResponseTypeDefendant2Page();
        await this.processSolicitorReferencesDefendantResponseDefendant2Page();
        await this.processUploadDefendantResponseDefendant2Page();
        await this.processExpertsDefendant2Page();
        await this.processWitnessesDefendant2Page();
        await this.processLanguageDefendant2Page();
        await this.processHearingDefendant2Page();
        await this.processDraftDirectionsDefendant2Page();
        await this.processRequestedCourtDefendant2Page();
        await this.processHearingSupportDefendant2Page();
        await this.processVulnerabilityQuestionsDefendant2Page();
        await this.processFurtherInformationDefendant2Page();
        await this.processStatementOfTruthDefendantResponseDefendant2Page();
        await this.processSubmitDefendantResponsePage();
        await this.processConfirmDefendantResponsePage();
      },
      ccdEvents.DEFENDANT_RESPONSE,
      defendantSolicitor2User,
      { retries: 0 },
    );
  }

  private async processConfirmDetailsPage() {
    const { confirmDetailsPage } = this.defendantResponsePageFactory;
    await confirmDetailsPage.verifyContent(this.ccdCaseData);
    await confirmDetailsPage.submit();
  }

  private async processRespondentResponseTypeDefendant1Page() {
    const { respondentResponseTypeDefendant1Page } = this.defendantResponsePageFactory;
    await respondentResponseTypeDefendant1Page.verifyContent(this.ccdCaseData);
    await respondentResponseTypeDefendant1Page.selectRejectAll();
    await respondentResponseTypeDefendant1Page.submit();
  }

  private async processSolicitorReferencesDefendantResponseDefendant1Page() {
    const { solicitorReferencesDefendantResponseDefendant1Page } =
      this.defendantResponsePageFactory;
    await solicitorReferencesDefendantResponseDefendant1Page.verifyContent(this.ccdCaseData);
    await solicitorReferencesDefendantResponseDefendant1Page.enterReference();
    await solicitorReferencesDefendantResponseDefendant1Page.submit();
  }

  private async processUploadDefendantResponseDefendant1Page() {
    const { uploadDefendantResponseDefendant1Page } = this.defendantResponsePageFactory;
    await uploadDefendantResponseDefendant1Page.verifyContent(this.ccdCaseData);
    await uploadDefendantResponseDefendant1Page.uploadDefence();
    await uploadDefendantResponseDefendant1Page.submit();
  }

  private async processExpertsDefendant1Page() {
    const { expertsDefendant1Page } = this.defendantResponsePageFactory;
    await expertsDefendant1Page.verifyContent(this.ccdCaseData);
    await expertsDefendant1Page.useExperts();
    await expertsDefendant1Page.addNewExpert();
    await expertsDefendant1Page.enterExpertDetails(partys.CLAIMANT_EXPERT_1);
    await expertsDefendant1Page.submit();
  }

  private async processWitnessesDefendant1Page() {
    const { witnessesDefendant1Page } = this.defendantResponsePageFactory;
    await witnessesDefendant1Page.verifyContent(this.ccdCaseData);
    await witnessesDefendant1Page.selectYesWitnesses();
    await witnessesDefendant1Page.addWitness();
    await witnessesDefendant1Page.enterWitnessDetails(partys.DEFENDANT_1_WITNESS_1);
    await witnessesDefendant1Page.submit();
  }

  private async processLanguageDefendant1Page() {
    const { languageDefendant1Page } = this.defendantResponsePageFactory;
    await languageDefendant1Page.verifyContent(this.ccdCaseData);
    await languageDefendant1Page.selectEnglishAndWelsh();
    await languageDefendant1Page.submit();
  }

  private async processHearingDefendant1Page() {
    const { hearingDefendant1Page } = this.defendantResponsePageFactory;
    await hearingDefendant1Page.verifyContent(this.ccdCaseData);
    await hearingDefendant1Page.selectYesAvailabilityRequired();
    await hearingDefendant1Page.addNewUnavailableDate();
    await hearingDefendant1Page.selectSingleDate(1);
    await hearingDefendant1Page.submit();
  }

  private async processDraftDirectionsDefendant1Page() {
    const { draftDirectionsDefendant1Page } = this.defendantResponsePageFactory;
    await draftDirectionsDefendant1Page.verifyContent(this.ccdCaseData);
    await draftDirectionsDefendant1Page.uploadEvidence();
    await draftDirectionsDefendant1Page.submit();
  }

  private async processRequestedCourtDefendant1Page() {
    const { requestedCourtDefendant1Page } = this.defendantResponsePageFactory;
    await requestedCourtDefendant1Page.verifyContent(this.ccdCaseData);
    await requestedCourtDefendant1Page.selectCourtLocation();
    await requestedCourtDefendant1Page.enterPreferredCourtReason();
    await requestedCourtDefendant1Page.selectNoRemoteHearing();
    await requestedCourtDefendant1Page.submit();
  }

  private async processHearingSupportDefendant1Page() {
    const { hearingSupportDefendant1Page } = this.defendantResponsePageFactory;
    await hearingSupportDefendant1Page.verifyContent(this.ccdCaseData);
    await hearingSupportDefendant1Page.selectYes();
    await hearingSupportDefendant1Page.enterSupportRequirementsAdditional();
    await hearingSupportDefendant1Page.submit();
  }

  private async processVulnerabilityQuestionsDefendant1Page() {
    const { vulnerabilityQuestionsDefendant1Page } = this.defendantResponsePageFactory;
    await vulnerabilityQuestionsDefendant1Page.verifyContent(this.ccdCaseData);
    await vulnerabilityQuestionsDefendant1Page.selectYes();
    await vulnerabilityQuestionsDefendant1Page.enterVulnerabilityAdjustments();
    await vulnerabilityQuestionsDefendant1Page.submit();
  }

  private async processFurtherInformationDefendant1Page() {
    const { furtherInformationDefendant1Page } = this.defendantResponsePageFactory;
    await furtherInformationDefendant1Page.verifyContent(this.ccdCaseData);
    await furtherInformationDefendant1Page.selectYes();
    await furtherInformationDefendant1Page.enterFurtherInformation();
    await furtherInformationDefendant1Page.submit();
  }

  private async processStatementOfTruthDefendantResponseDefendant1Page() {
    const { statementOfTruthDefendantResponseDefendant1Page } = this.defendantResponsePageFactory;
    await statementOfTruthDefendantResponseDefendant1Page.verifyContent(this.ccdCaseData);
    await statementOfTruthDefendantResponseDefendant1Page.enterDetails();
    await statementOfTruthDefendantResponseDefendant1Page.submit();
  }

  private async processRespondentResponseTypeDefendant2Page() {
    const { respondentResponseTypeDefendant2Page } = this.defendantResponsePageFactory;
    await respondentResponseTypeDefendant2Page.verifyContent(this.ccdCaseData);
    await respondentResponseTypeDefendant2Page.selectRejectAll();
    await respondentResponseTypeDefendant2Page.submit();
  }

  private async processSolicitorReferencesDefendantResponseDefendant2Page() {
    const { solicitorReferencesDefendantResponseDefendant2Page } =
      this.defendantResponsePageFactory;
    await solicitorReferencesDefendantResponseDefendant2Page.verifyContent(this.ccdCaseData);
    await solicitorReferencesDefendantResponseDefendant2Page.enterReference();
    await solicitorReferencesDefendantResponseDefendant2Page.submit();
  }

  private async processUploadDefendantResponseDefendant2Page() {
    const { uploadDefendantResponseDefendant2Page } = this.defendantResponsePageFactory;
    await uploadDefendantResponseDefendant2Page.verifyContent(this.ccdCaseData);
    await uploadDefendantResponseDefendant2Page.uploadDefence();
    await uploadDefendantResponseDefendant2Page.submit();
  }

  private async processExpertsDefendant2Page() {
    const { expertsDefendant2Page } = this.defendantResponsePageFactory;
    await expertsDefendant2Page.verifyContent(this.ccdCaseData);
    await expertsDefendant2Page.useExperts();
    await expertsDefendant2Page.addNewExpert();
    await expertsDefendant2Page.enterExpertDetails(partys.CLAIMANT_EXPERT_1);
    await expertsDefendant2Page.submit();
  }

  private async processWitnessesDefendant2Page() {
    const { witnessesDefendant2Page } = this.defendantResponsePageFactory;
    await witnessesDefendant2Page.verifyContent(this.ccdCaseData);
    await witnessesDefendant2Page.selectYesWitnesses();
    await witnessesDefendant2Page.addWitness();
    await witnessesDefendant2Page.enterWitnessDetails(partys.DEFENDANT_1_WITNESS_1);
    await witnessesDefendant2Page.submit();
  }

  private async processLanguageDefendant2Page() {
    const { languageDefendant2Page } = this.defendantResponsePageFactory;
    await languageDefendant2Page.verifyContent(this.ccdCaseData);
    await languageDefendant2Page.selectEnglishAndWelsh();
    await languageDefendant2Page.submit();
  }

  private async processHearingDefendant2Page() {
    const { hearingDefendant2Page } = this.defendantResponsePageFactory;
    await hearingDefendant2Page.verifyContent(this.ccdCaseData);
    await hearingDefendant2Page.selectYesAvailabilityRequired();
    await hearingDefendant2Page.addNewUnavailableDate();
    await hearingDefendant2Page.selectSingleDate(1);
    await hearingDefendant2Page.submit();
  }

  private async processDraftDirectionsDefendant2Page() {
    const { draftDirectionsDefendant2Page } = this.defendantResponsePageFactory;
    await draftDirectionsDefendant2Page.verifyContent(this.ccdCaseData);
    await draftDirectionsDefendant2Page.uploadEvidence();
    await draftDirectionsDefendant2Page.submit();
  }

  private async processRequestedCourtDefendant2Page() {
    const { requestedCourtDefendant2Page } = this.defendantResponsePageFactory;
    await requestedCourtDefendant2Page.verifyContent(this.ccdCaseData);
    await requestedCourtDefendant2Page.selectCourtLocation();
    await requestedCourtDefendant2Page.enterPreferredCourtReason();
    await requestedCourtDefendant2Page.selectNoRemoteHearing();
    await requestedCourtDefendant2Page.submit();
  }

  private async processHearingSupportDefendant2Page() {
    const { hearingSupportDefendant2Page } = this.defendantResponsePageFactory;
    await hearingSupportDefendant2Page.verifyContent(this.ccdCaseData);
    await hearingSupportDefendant2Page.selectYes();
    await hearingSupportDefendant2Page.enterSupportRequirementsAdditional();
    await hearingSupportDefendant2Page.submit();
  }

  private async processVulnerabilityQuestionsDefendant2Page() {
    const { vulnerabilityQuestionsDefendant2Page } = this.defendantResponsePageFactory;
    await vulnerabilityQuestionsDefendant2Page.verifyContent(this.ccdCaseData);
    await vulnerabilityQuestionsDefendant2Page.selectYes();
    await vulnerabilityQuestionsDefendant2Page.enterVulnerabilityAdjustments();
    await vulnerabilityQuestionsDefendant2Page.submit();
  }

  private async processFurtherInformationDefendant2Page() {
    const { furtherInformationDefendant2Page } = this.defendantResponsePageFactory;
    await furtherInformationDefendant2Page.verifyContent(this.ccdCaseData);
    await furtherInformationDefendant2Page.selectYes();
    await furtherInformationDefendant2Page.enterFurtherInformation();
    await furtherInformationDefendant2Page.submit();
  }

  private async processStatementOfTruthDefendantResponseDefendant2Page() {
    const { statementOfTruthDefendantResponseDefendant2Page } = this.defendantResponsePageFactory;
    await statementOfTruthDefendantResponseDefendant2Page.verifyContent(this.ccdCaseData);
    await statementOfTruthDefendantResponseDefendant2Page.enterDetails();
    await statementOfTruthDefendantResponseDefendant2Page.submit();
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
