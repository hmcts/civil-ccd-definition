import BaseExuiSteps from '../../../../../base/base-exui-steps';
import { Step } from '../../../../../decorators/test-steps';
import {
  civilAdminUser,
  defendantSolicitor1User,
  defendantSolicitor2User,
} from '../../../../../config/users/exui-users';
import TestData from '../../../../../models/test-data';
import ccdEvents from '../../../../../constants/ccd-events';
import ExuiDashboardPageFactory from '../../../../../pages/exui/exui-dashboard/exui-dashboard-page-factory';
import DefendantResponsePageFactory from '../../../../../pages/exui/solicitor-events/response/defendant-response/defendant-response-page-factory';
import RequestsFactory from '../../../../../requests/requests-factory';
import partys from '../../../../../constants/partys';
import ClaimTrack from '../../../../../enums/claim-track';

const classKey = 'DefendantResponseSpecSteps';
export default class DefendantResponseSpecSteps extends BaseExuiSteps {
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
  async FastTrack1v1FullDefence() {
    await super.retryExuiEvent(
      async () => {
        await this.processRespondentChecklistPage();
        await this.processResponseConfirmNameAddressDefendantSolicitor1Page();
        await this.processResponseConfirmDetailsDefendantSolicitor1Page();
        await this.processRespondentResponseTypeSpecDefendantSolicitor1Page();
        await this.processDefenceRouteDefendantSolicitor1Page();
        await this.processUploadDefendantResponseSpecDefendantSolicitor1Page();
        await this.processHowToAddTimelineDefendantSolicitor1Page();
        await this.processHowToAddTimelineUploadDefendantSolicitor1Page();
        await this.processFileDirectionsQuestionaireDefendantSolicitor1Page();
        await this.processFixedRecoverableCostsPageDefendantSolicitor1();
        await this.processDisclosureOfElectronicDocumentsLRSpecDefendantSolicitor1Page();
        await this.processDisclosureOfNonElectronicDocumentsLRSpecDefendantSolicitor1Page();
        await this.processDisclosureReportDefendantSolicitor1Page();
        await this.processExpertsDefendantSolicitor1Page();
        await this.processWitnessesSpecDefendantSolicitor1Page();
        await this.processLanguageDefendantSolicitor1Page();
        await this.processHearingLRSpecDefendantSolicitor1Page();
        await this.processRequestedCourtLRSpecDefendantSolicitor1Page();
        await this.processHearingSupportDefendantSolicitor1Page();
        await this.processVulnerabilityQuestionsSpecDefendantSolicitor1Page();
        await this.processApplicationDefendantSolicitor1Page();
        await this.processStatementOfTruthDefendantResponseDefendantSolicitor1Page();
        await this.processSubmitDefendantResponsePage();
        await this.processConfirmDefendantResponseSpecPage();
      },
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantSolicitor1User,
      { verifySuccessEvent: false },
    );
  }

  @Step(classKey)
  async SmallTrack1v1FullDefence() {
    await super.retryExuiEvent(
      async () => {
        await this.processRespondentChecklistPage();
        await this.processResponseConfirmNameAddressDefendantSolicitor1Page();
        await this.processResponseConfirmDetailsDefendantSolicitor1Page();
        await this.processRespondentResponseTypeSpecDefendantSolicitor1Page();
        await this.processDefenceRouteDefendantSolicitor1Page();
        await this.processUploadDefendantResponseSpecDefendantSolicitor1Page();
        await this.processHowToAddTimelineDefendantSolicitor1Page();
        await this.processHowToAddTimelineUploadDefendantSolicitor1Page();
        await this.processMediationDefendantSolicitor1Page();
        await this.processSmallClaimExpertsDefendantSolicitor1Page();
        await this.processSmallClaimWitnessesDefendantSolicitor1Page();
        await this.processLanguageDefendantSolicitor1Page();
        await this.processSmallClaimHearingDefendantSolicitor1Page();
        await this.processRequestedCourtLRSpecDefendantSolicitor1Page();
        await this.processHearingSupportDefendantSolicitor1Page();
        await this.processVulnerabilityQuestionsSpecDefendantSolicitor1Page();
        await this.processStatementOfTruthDefendantResponseDefendantSolicitor1Page();
        await this.processSubmitDefendantResponsePage();
        await this.processConfirmDefendantResponseSpecPage();
      },
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantSolicitor1User,
      { verifySuccessEvent: false },
    );
  }

  @Step(classKey)
  async SmallTrack2v1FullDefence() {
    await super.retryExuiEvent(
      async () => {
        await this.processRespondentChecklistPage();
        await this.processResponseConfirmNameAddressDefendantSolicitor1Page();
        await this.processResponseConfirmDetailsDefendantSolicitor1Page();
        await this.processSingleResponse2v1Page();
        await this.processRespondentResponseType2v1SpecPage();
        await this.processDefenceRouteDefendantSolicitor1Page();
        await this.processUploadDefendantResponseSpecDefendantSolicitor1Page();
        await this.processHowToAddTimelineDefendantSolicitor1Page();
        await this.processHowToAddTimelineUploadDefendantSolicitor1Page();
        await this.processMediationDefendantSolicitor1Page();
        await this.processSmallClaimExpertsDefendantSolicitor1Page();
        await this.processSmallClaimWitnessesDefendantSolicitor1Page();
        await this.processLanguageDefendantSolicitor1Page();
        await this.processSmallClaimHearingDefendantSolicitor1Page();
        await this.processRequestedCourtLRSpecDefendantSolicitor1Page();
        await this.processHearingSupportDefendantSolicitor1Page();
        await this.processVulnerabilityQuestionsSpecDefendantSolicitor1Page();
        await this.processApplicationDefendantSolicitor1Page();
        await this.processStatementOfTruthDefendantResponseDefendantSolicitor1Page();
        await this.processSubmitDefendantResponsePage();
        await this.processConfirmDefendantResponseSpecPage();
      },
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantSolicitor1User,
      { verifySuccessEvent: false },
    );
  }

  @Step(classKey)
  async SmallTrack1v2SSFullDefence() {
    await super.retryExuiEvent(
      async () => {
        await this.processRespondentChecklistPage();
        await this.processResponseConfirmNameAddress1v2Page();
        await this.processResponseConfirmDetailsDefendantSolicitor1Page();
        await this.processSingleResponsePage();
        await this.processRespondentResponseTypeSpecDefendantSolicitor1Page();
        await this.processDefenceRouteDefendantSolicitor1Page();
        await this.processUploadDefendantResponseSpecDefendantSolicitor1Page();
        await this.processHowToAddTimelineDefendantSolicitor1Page();
        await this.processHowToAddTimelineUploadDefendantSolicitor1Page();
        await this.processMediationDefendantSolicitor1Page();
        await this.processSmallClaimExpertsDefendantSolicitor1Page();
        await this.processSmallClaimWitnessesDefendantSolicitor1Page();
        await this.processLanguageDefendantSolicitor1Page();
        await this.processSmallClaimHearingDefendantSolicitor1Page();
        await this.processRequestedCourtLRSpecDefendantSolicitor1Page();
        await this.processHearingSupportDefendantSolicitor1Page();
        await this.processVulnerabilityQuestionsSpecDefendantSolicitor1Page();
        await this.processStatementOfTruthDefendantResponseDefendantSolicitor1Page();
        await this.processSubmitDefendantResponsePage();
        await this.processConfirm1v2SSDefendantResponseSpecPage();
      },
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantSolicitor1User,
      { verifySuccessEvent: false },
    );
  }

  @Step(classKey)
  async SmallTrackFullDefence1v2DSDefendantSolicitor1() {
    await super.retryExuiEvent(
      async () => {
        await this.processRespondentChecklistPage();
        await this.processResponseConfirmNameAddressDefendantSolicitor1Page();
        await this.processResponseConfirmDetailsDefendantSolicitor1Page();
        await this.processRespondentResponseTypeSpecDefendantSolicitor1Page();
        await this.processDefenceRouteDefendantSolicitor1Page();
        await this.processUploadDefendantResponseSpecDefendantSolicitor1Page();
        await this.processHowToAddTimelineDefendantSolicitor1Page();
        await this.processHowToAddTimelineUploadDefendantSolicitor1Page();
        await this.processMediationDefendantSolicitor1Page();
        await this.processSmallClaimExpertsDefendantSolicitor1Page();
        await this.processSmallClaimWitnessesDefendantSolicitor1Page();
        await this.processLanguageDefendantSolicitor1Page();
        await this.processSmallClaimHearingDefendantSolicitor1Page();
        await this.processRequestedCourtLRSpecDefendantSolicitor1Page();
        await this.processHearingSupportDefendantSolicitor1Page();
        await this.processVulnerabilityQuestionsSpecDefendantSolicitor1Page();
        await this.processStatementOfTruthDefendantResponseDefendantSolicitor1Page();
        await this.processSubmitDefendantResponsePage();
        await this.processConfirmDefendantResponseSpecPage();
      },
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantSolicitor1User,
      { verifySuccessEvent: false, retries: 0 },
    );
  }

  @Step(classKey)
  async SmallTrackFullDefence1v2DSDefendantSolicitor2() {
    await super.retryExuiEvent(
      async () => {
        await this.processRespondentChecklistPage();
        await this.processResponseConfirmNameAddressDefendantSolicitor2Page();
        await this.processResponseConfirmDetailsDefendantSolicitor2Page();
        await this.processRespondentResponseTypeSpecDefendantSolicitor2Page();
        await this.processDefenceRouteDefendantSolicitor2Page();
        await this.processUploadDefendantResponseSpecDefendantSolicitor2Page();
        await this.processHowToAddTimelineDefendantSolicitor2Page();
        await this.processHowToAddTimelineUploadDefendantSolicitor2Page();
        await this.processMediationDefendantSolicitor2Page();
        await this.processSmallClaimExpertsDefendantSolicitor2Page();
        await this.processSmallClaimWitnessesDefendantSolicitor2Page();
        await this.processLanguageDefendantSolicitor2Page();
        await this.processSmallClaimHearingDefendantSolicitor2Page();
        await this.processRequestedCourtLRSpecDefendantSolicitor2Page();
        await this.processHearingSupportDefendantSolicitor2Page();
        await this.processVulnerabilityQuestionsSpecDefendantSolicitor2Page();
        await this.processStatementOfTruthDefendantResponseDefendantSolicitor2Page();
        await this.processSubmitDefendantResponsePage();
        await this.processConfirmDefendantResponseSpecPage();
      },
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantSolicitor2User,
      { verifySuccessEvent: false, retries: 0 },
    );
  }

  private async processRespondentChecklistPage() {
    const { respondentChecklistPage } = this.defendantResponsePageFactory;
    await respondentChecklistPage.verifyContent();
    await respondentChecklistPage.submit();
  }

  private async processResponseConfirmNameAddressDefendantSolicitor1Page() {
    const { responseConfirmNameAddressDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await responseConfirmNameAddressDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await responseConfirmNameAddressDefendantSolicitor1Page.selectYesAddress();
    await responseConfirmNameAddressDefendantSolicitor1Page.submit();
  }

  private async processResponseConfirmNameAddressDefendantSolicitor2Page() {
    const { responseConfirmNameAddressDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await responseConfirmNameAddressDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await responseConfirmNameAddressDefendantSolicitor2Page.selectYesAddress();
    await responseConfirmNameAddressDefendantSolicitor2Page.submit();
  }

  private async processResponseConfirmNameAddress1v2Page() {
    const { responseConfirmNameAddress1v2Page } = this.defendantResponsePageFactory;
    await responseConfirmNameAddress1v2Page.verifyContent(this.ccdCaseData);
    await responseConfirmNameAddress1v2Page.selectYesAddress();
    await responseConfirmNameAddress1v2Page.submit();
  }

  private async processResponseConfirmDetailsDefendantSolicitor1Page() {
    const { responseConfirmDetailsDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await responseConfirmDetailsDefendantSolicitor1Page.verifyContent();
    await responseConfirmDetailsDefendantSolicitor1Page.selectYesAddress();
    await responseConfirmDetailsDefendantSolicitor1Page.submit();
  }

  private async processResponseConfirmDetailsDefendantSolicitor2Page() {
    const { responseConfirmDetailsDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await responseConfirmDetailsDefendantSolicitor2Page.verifyContent();
    await responseConfirmDetailsDefendantSolicitor2Page.selectYesAddress();
    await responseConfirmDetailsDefendantSolicitor2Page.submit();
  }

  private async processSingleResponsePage() {
    const { singleResponsePage } = this.defendantResponsePageFactory;
    await singleResponsePage.verifyContent(this.ccdCaseData);
    await singleResponsePage.selectYes();
    await singleResponsePage.submit();
  }

  private async processSingleResponse2v1Page() {
    const { singleResponse2v1Page } = this.defendantResponsePageFactory;
    await singleResponse2v1Page.verifyContent(this.ccdCaseData);
    await singleResponse2v1Page.selectNo();
    await singleResponse2v1Page.submit();
  }

  private async processRespondentResponseType2v1SpecPage() {
    const { respondentResponseType2v1SpecPage } = this.defendantResponsePageFactory;
    await respondentResponseType2v1SpecPage.verifyContent(this.ccdCaseData);
    await respondentResponseType2v1SpecPage.selectFullDefenceBothClaimants();
    await respondentResponseType2v1SpecPage.submit();
  }

  private async processRespondentResponseTypeSpecDefendantSolicitor1Page() {
    const { respondentResponseTypeSpecDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await respondentResponseTypeSpecDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await respondentResponseTypeSpecDefendantSolicitor1Page.selectFullDefence();
    await respondentResponseTypeSpecDefendantSolicitor1Page.submit();
  }

  private async processRespondentResponseTypeSpecDefendantSolicitor2Page() {
    const { respondentResponseTypeSpecDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await respondentResponseTypeSpecDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await respondentResponseTypeSpecDefendantSolicitor2Page.selectFullDefence();
    await respondentResponseTypeSpecDefendantSolicitor2Page.submit();
  }

  private async processDefenceRouteDefendantSolicitor1Page() {
    const { defenceRouteDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await defenceRouteDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await defenceRouteDefendantSolicitor1Page.selectDisputesClaim();
    await defenceRouteDefendantSolicitor1Page.submit();
  }

  private async processDefenceRouteDefendantSolicitor2Page() {
    const { defenceRouteDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await defenceRouteDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await defenceRouteDefendantSolicitor2Page.selectDisputesClaim();
    await defenceRouteDefendantSolicitor2Page.submit();
  }

  private async processUploadDefendantResponseSpecDefendantSolicitor1Page() {
    const { uploadDefendantResponseSpecDefendantSolicitor1Page } =
      this.defendantResponsePageFactory;
    await uploadDefendantResponseSpecDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await uploadDefendantResponseSpecDefendantSolicitor1Page.enterDisputeReason();
    await uploadDefendantResponseSpecDefendantSolicitor1Page.submit();
  }

  private async processUploadDefendantResponseSpecDefendantSolicitor2Page() {
    const { uploadDefendantResponseSpecDefendantSolicitor2Page } =
      this.defendantResponsePageFactory;
    await uploadDefendantResponseSpecDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await uploadDefendantResponseSpecDefendantSolicitor2Page.enterDisputeReason();
    await uploadDefendantResponseSpecDefendantSolicitor2Page.submit();
  }

  private async processHowToAddTimelineDefendantSolicitor1Page() {
    const { howToAddTimelineDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await howToAddTimelineDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await howToAddTimelineDefendantSolicitor1Page.selectUpload();
    await howToAddTimelineDefendantSolicitor1Page.submit();
  }

  private async processHowToAddTimelineDefendantSolicitor2Page() {
    const { howToAddTimelineDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await howToAddTimelineDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await howToAddTimelineDefendantSolicitor2Page.selectUpload();
    await howToAddTimelineDefendantSolicitor2Page.submit();
  }

  private async processHowToAddTimelineUploadDefendantSolicitor1Page() {
    const { howToAddTimelineUploadDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await howToAddTimelineUploadDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await howToAddTimelineUploadDefendantSolicitor1Page.uploadDoc();
    await howToAddTimelineUploadDefendantSolicitor1Page.submit();
  }

  private async processHowToAddTimelineUploadDefendantSolicitor2Page() {
    const { howToAddTimelineUploadDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await howToAddTimelineUploadDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await howToAddTimelineUploadDefendantSolicitor2Page.uploadDoc();
    await howToAddTimelineUploadDefendantSolicitor2Page.submit();
  }

  private async processMediationDefendantSolicitor1Page() {
    const { mediationDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await mediationDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await mediationDefendantSolicitor1Page.selectYes();
    await mediationDefendantSolicitor1Page.submit();
  }

  private async processMediationDefendantSolicitor2Page() {
    const { mediationDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await mediationDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await mediationDefendantSolicitor2Page.selectYes();
    await mediationDefendantSolicitor2Page.submit();
  }

  private async processSmallClaimExpertsDefendantSolicitor1Page() {
    const { smallClaimExpertsDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await smallClaimExpertsDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await smallClaimExpertsDefendantSolicitor1Page.selectYesExperts();
    await smallClaimExpertsDefendantSolicitor1Page.enterExpertDetails();
    await smallClaimExpertsDefendantSolicitor1Page.submit();
  }

  private async processSmallClaimExpertsDefendantSolicitor2Page() {
    const { smallClaimExpertsDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await smallClaimExpertsDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await smallClaimExpertsDefendantSolicitor2Page.selectYesExperts();
    await smallClaimExpertsDefendantSolicitor2Page.enterExpertDetails();
    await smallClaimExpertsDefendantSolicitor2Page.submit();
  }

  private async processFileDirectionsQuestionaireDefendantSolicitor1Page() {
    const { fileDirectionsQuestionaireDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await fileDirectionsQuestionaireDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await fileDirectionsQuestionaireDefendantSolicitor1Page.enterDetails();
    await fileDirectionsQuestionaireDefendantSolicitor1Page.submit();
  }

  private async processFixedRecoverableCostsPageDefendantSolicitor1() {
    const { fixedRecoverableCostsPageDefendantSolicitor1 } = this.defendantResponsePageFactory;
    await fixedRecoverableCostsPageDefendantSolicitor1.verifyContent(this.ccdCaseData);
    await fixedRecoverableCostsPageDefendantSolicitor1.selectYes();
    await fixedRecoverableCostsPageDefendantSolicitor1.submit();
  }

  private async processDisclosureOfElectronicDocumentsLRSpecDefendantSolicitor1Page() {
    const { disclosureOfElectronicDocumentsLRSpecDefendantSolicitor1Page } =
      this.defendantResponsePageFactory;
    await disclosureOfElectronicDocumentsLRSpecDefendantSolicitor1Page.verifyContent(
      this.ccdCaseData,
    );
    await disclosureOfElectronicDocumentsLRSpecDefendantSolicitor1Page.enterDetails();
    await disclosureOfElectronicDocumentsLRSpecDefendantSolicitor1Page.submit();
  }

  private async processDisclosureOfNonElectronicDocumentsLRSpecDefendantSolicitor1Page() {
    const { disclosureOfNonElectronicDocumentsLRSpecDefendantSolicitor1Page } =
      this.defendantResponsePageFactory;
    await disclosureOfNonElectronicDocumentsLRSpecDefendantSolicitor1Page.verifyContent(
      this.ccdCaseData,
    );
    await disclosureOfNonElectronicDocumentsLRSpecDefendantSolicitor1Page.enterDetails();
    await disclosureOfNonElectronicDocumentsLRSpecDefendantSolicitor1Page.submit();
  }

  private async processDisclosureReportDefendantSolicitor1Page() {
    const { disclosureReportDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await disclosureReportDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await disclosureReportDefendantSolicitor1Page.enterDetails();
    await disclosureReportDefendantSolicitor1Page.submit();
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

  private async processSmallClaimWitnessesDefendantSolicitor1Page() {
    const { smallClaimWitnessesDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await smallClaimWitnessesDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await smallClaimWitnessesDefendantSolicitor1Page.selectYes();
    await smallClaimWitnessesDefendantSolicitor1Page.addWitness();
    await smallClaimWitnessesDefendantSolicitor1Page.enterWitnessDetails();
    await smallClaimWitnessesDefendantSolicitor1Page.submit();
  }

  private async processSmallClaimWitnessesDefendantSolicitor2Page() {
    const { smallClaimWitnessesDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await smallClaimWitnessesDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await smallClaimWitnessesDefendantSolicitor2Page.selectYes();
    await smallClaimWitnessesDefendantSolicitor2Page.addWitness();
    await smallClaimWitnessesDefendantSolicitor2Page.enterWitnessDetails();
    await smallClaimWitnessesDefendantSolicitor2Page.submit();
  }

  private async processWitnessesSpecDefendantSolicitor1Page() {
    const { witnessesSpecDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await witnessesSpecDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await witnessesSpecDefendantSolicitor1Page.addWitnesses();
    await witnessesSpecDefendantSolicitor1Page.enterWitnessDetails();
    await witnessesSpecDefendantSolicitor1Page.submit();
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

  private async processSmallClaimHearingDefendantSolicitor1Page() {
    const { smallClaimHearingDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await smallClaimHearingDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await smallClaimHearingDefendantSolicitor1Page.selectYesAvailabilityRequired();
    await smallClaimHearingDefendantSolicitor1Page.addNewUnavailableDate();
    await smallClaimHearingDefendantSolicitor1Page.selectSingleDate();
    await smallClaimHearingDefendantSolicitor1Page.selectYesInterpreter();
    await smallClaimHearingDefendantSolicitor1Page.selectYesInterpreter();
    await smallClaimHearingDefendantSolicitor1Page.enterTypeOfInterpreter();
    await smallClaimHearingDefendantSolicitor1Page.submit();
  }

  private async processSmallClaimHearingDefendantSolicitor2Page() {
    const { smallClaimHearingDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await smallClaimHearingDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await smallClaimHearingDefendantSolicitor2Page.selectYesAvailabilityRequired();
    await smallClaimHearingDefendantSolicitor2Page.addNewUnavailableDate();
    await smallClaimHearingDefendantSolicitor2Page.selectSingleDate();
    await smallClaimHearingDefendantSolicitor2Page.selectYesInterpreter();
    await smallClaimHearingDefendantSolicitor2Page.enterTypeOfInterpreter();
    await smallClaimHearingDefendantSolicitor2Page.submit();
  }

  private async processHearingLRSpecDefendantSolicitor1Page() {
    const { hearingLRSpecDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await hearingLRSpecDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await hearingLRSpecDefendantSolicitor1Page.selectYesAvailabilityRequired();
    await hearingLRSpecDefendantSolicitor1Page.addNewUnavailableDate();
    await hearingLRSpecDefendantSolicitor1Page.selectSingleDate();
    await hearingLRSpecDefendantSolicitor1Page.submit();
  }

  private async processRequestedCourtLRSpecDefendantSolicitor1Page() {
    const { requestedCourtLRSpecDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await requestedCourtLRSpecDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await requestedCourtLRSpecDefendantSolicitor1Page.selectCourtLocation();
    await requestedCourtLRSpecDefendantSolicitor1Page.selectNoRemoteHearing();
    await requestedCourtLRSpecDefendantSolicitor1Page.submit();
  }

  private async processRequestedCourtLRSpecDefendantSolicitor2Page() {
    const { requestedCourtLRSpecDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await requestedCourtLRSpecDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await requestedCourtLRSpecDefendantSolicitor2Page.selectCourtLocation();
    await requestedCourtLRSpecDefendantSolicitor2Page.selectNoRemoteHearing();
    await requestedCourtLRSpecDefendantSolicitor2Page.submit();
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

  private async processVulnerabilityQuestionsSpecDefendantSolicitor1Page() {
    const { vulnerabilityQuestionsSpecDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await vulnerabilityQuestionsSpecDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await vulnerabilityQuestionsSpecDefendantSolicitor1Page.selectYes();
    await vulnerabilityQuestionsSpecDefendantSolicitor1Page.enterVulnerabilityAdjustments();
    await vulnerabilityQuestionsSpecDefendantSolicitor1Page.submit();
  }

  private async processVulnerabilityQuestionsSpecDefendantSolicitor2Page() {
    const { vulnerabilityQuestionsSpecDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await vulnerabilityQuestionsSpecDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await vulnerabilityQuestionsSpecDefendantSolicitor2Page.selectYes();
    await vulnerabilityQuestionsSpecDefendantSolicitor2Page.enterVulnerabilityAdjustments();
    await vulnerabilityQuestionsSpecDefendantSolicitor2Page.submit();
  }

  private async processApplicationDefendantSolicitor1Page() {
    const { applicationDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await applicationDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await applicationDefendantSolicitor1Page.selectYes();
    await applicationDefendantSolicitor1Page.enterAdditionalInformation();
    await applicationDefendantSolicitor1Page.submit();
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

  private async processConfirmDefendantResponseSpecPage() {
    const { confirmDefendantResponseSpecPage } = this.defendantResponsePageFactory;
    await confirmDefendantResponseSpecPage.verifyContent(this.ccdCaseData);
    await confirmDefendantResponseSpecPage.submit();
  }

  private async processConfirm1v2SSDefendantResponseSpecPage() {
    const { confirm1v2SSDefendantResponseSpecPage } = this.defendantResponsePageFactory;
    await confirm1v2SSDefendantResponseSpecPage.verifyContent(this.ccdCaseData);
    await confirm1v2SSDefendantResponseSpecPage.submit();
  }
}
