import BaseExuiSteps from '../../../../../base/base-exui-steps';
import { Step } from '../../../../../decorators/test-steps';
import {
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
        await this.processResponseConfirmNameAddressDefendant1Page();
        await this.processResponseConfirmDetailsDefendant1Page();
        await this.processRespondentResponseTypeSpecDefendant1Page();
        await this.processDefenceRouteDefendant1Page();
        await this.processUploadDefendantResponseSpecDefendant1Page();
        await this.processHowToAddTimelineDefendant1Page();
        await this.processHowToAddTimelineUploadDefendant1Page();
        await this.processFileDirectionsQuestionaireDefendant1Page();
        await this.processFixedRecoverableCostsPageDefendant1();
        await this.processDisclosureOfElectronicDocumentsLRSpecDefendant1Page();
        await this.processDisclosureOfNonElectronicDocumentsLRSpecDefendant1Page();
        await this.processDisclosureReportDefendant1Page();
        await this.processExpertsDefendant1Page();
        await this.processWitnessesSpecDefendant1Page();
        await this.processLanguageDefendant1Page();
        await this.processHearingLRSpecDefendant1Page();
        await this.processRequestedCourtLRSpecDefendant1Page();
        await this.processHearingSupportDefendant1Page();
        await this.processVulnerabilityQuestionsSpecDefendant1Page();
        await this.processApplicationDefendant1Page();
        await this.processStatementOfTruthDefendantResponseDefendant1Page();
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
        await this.processResponseConfirmNameAddressDefendant1Page();
        await this.processResponseConfirmDetailsDefendant1Page();
        await this.processRespondentResponseTypeSpecDefendant1Page();
        await this.processDefenceRouteDefendant1Page();
        await this.processUploadDefendantResponseSpecDefendant1Page();
        await this.processHowToAddTimelineDefendant1Page();
        await this.processHowToAddTimelineUploadDefendant1Page();
        await this.processMediationDefendant1Page();
        await this.processSmallClaimExpertsDefendant1Page();
        await this.processSmallClaimWitnessesDefendant1Page();
        await this.processLanguageDefendant1Page();
        await this.processSmallClaimHearingDefendant1Page();
        await this.processRequestedCourtLRSpecDefendant1Page();
        await this.processHearingSupportDefendant1Page();
        await this.processVulnerabilityQuestionsSpecDefendant1Page();
        await this.processStatementOfTruthDefendantResponseDefendant1Page();
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
        await this.processResponseConfirmNameAddressDefendant1Page();
        await this.processResponseConfirmDetailsDefendant1Page();
        await this.processSingleResponse2v1Page();
        await this.processRespondentResponseTypeSpecDefendant1Page();
        await this.processDefenceRouteDefendant1Page();
        await this.processUploadDefendantResponseSpecDefendant1Page();
        await this.processHowToAddTimelineDefendant1Page();
        await this.processHowToAddTimelineUploadDefendant1Page();
        await this.processMediationDefendant1Page();
        await this.processSmallClaimExpertsDefendant1Page();
        await this.processSmallClaimWitnessesDefendant1Page();
        await this.processLanguageDefendant1Page();
        await this.processSmallClaimHearingDefendant1Page();
        await this.processRequestedCourtLRSpecDefendant1Page();
        await this.processHearingSupportDefendant1Page();
        await this.processVulnerabilityQuestionsSpecDefendant1Page();
        await this.processApplicationDefendant1Page();
        await this.processStatementOfTruthDefendantResponseDefendant1Page();
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
        await this.processResponseConfirmDetailsDefendant1Page();
        await this.processSingleResponsePage();
        await this.processRespondentResponseTypeSpecDefendant1Page();
        await this.processDefenceRouteDefendant1Page();
        await this.processUploadDefendantResponseSpecDefendant1Page();
        await this.processHowToAddTimelineDefendant1Page();
        await this.processHowToAddTimelineUploadDefendant1Page();
        await this.processMediationDefendant1Page();
        await this.processSmallClaimExpertsDefendant1Page();
        await this.processSmallClaimWitnessesDefendant1Page();
        await this.processLanguageDefendant1Page();
        await this.processSmallClaimHearingDefendant1Page();
        await this.processRequestedCourtLRSpecDefendant1Page();
        await this.processHearingSupportDefendant1Page();
        await this.processVulnerabilityQuestionsSpecDefendant1Page();
        await this.processStatementOfTruthDefendantResponseDefendant1Page();
        await this.processSubmitDefendantResponsePage();
        await this.processConfirm1v2SSDefendantResponseSpecPage();
      },
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantSolicitor1User,
      { verifySuccessEvent: false },
    );
  }

  @Step(classKey)
  async SmallTrack1v2DSFullDefenceDefendant1() {
    await super.retryExuiEvent(
      async () => {
        await this.processRespondentChecklistPage();
        await this.processResponseConfirmNameAddressDefendant1Page();
        await this.processResponseConfirmDetailsDefendant1Page();
        await this.processRespondentResponseTypeSpecDefendant1Page();
        await this.processDefenceRouteDefendant1Page();
        await this.processUploadDefendantResponseSpecDefendant1Page();
        await this.processHowToAddTimelineDefendant1Page();
        await this.processHowToAddTimelineUploadDefendant1Page();
        await this.processMediationDefendant1Page();
        await this.processSmallClaimExpertsDefendant1Page();
        await this.processSmallClaimWitnessesDefendant1Page();
        await this.processLanguageDefendant1Page();
        await this.processSmallClaimHearingDefendant1Page();
        await this.processRequestedCourtLRSpecDefendant1Page();
        await this.processHearingSupportDefendant1Page();
        await this.processVulnerabilityQuestionsSpecDefendant1Page();
        await this.processStatementOfTruthDefendantResponseDefendant1Page();
        await this.processSubmitDefendantResponsePage();
        await this.processConfirmDefendantResponseSpecPage();
      },
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantSolicitor1User,
      { verifySuccessEvent: false },
    );
  }

  @Step(classKey)
  async SmallTrack1v2DSFullDefenceDefendant2() {
    await super.retryExuiEvent(
      async () => {
        await this.processRespondentChecklistPage();
        await this.processResponseConfirmNameAddressDefendant2Page();
        await this.processResponseConfirmDetailsDefendant2Page();
        await this.processRespondentResponseTypeSpecDefendant2Page();
        await this.processDefenceRouteDefendant2Page();
        await this.processUploadDefendantResponseSpecDefendant2Page();
        await this.processHowToAddTimelineDefendant2Page();
        await this.processHowToAddTimelineUploadDefendant2Page();
        await this.processMediationDefendant2Page();
        await this.processSmallClaimExpertsDefendant2Page();
        await this.processSmallClaimWitnessesDefendant2Page();
        await this.processLanguageDefendant2Page();
        await this.processSmallClaimHearingDefendant2Page();
        await this.processRequestedCourtLRSpecDefendant2Page();
        await this.processHearingSupportDefendant2Page();
        await this.processVulnerabilityQuestionsSpecDefendant2Page();
        await this.processStatementOfTruthDefendantResponseDefendant2Page();
        await this.processSubmitDefendantResponsePage();
        await this.processConfirmDefendantResponseSpecPage();
      },
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantSolicitor2User,
      { verifySuccessEvent: false },
    );
  }

  private async processRespondentChecklistPage() {
    const { respondentChecklistPage } = this.defendantResponsePageFactory;
    await respondentChecklistPage.verifyContent();
    await respondentChecklistPage.submit();
  }

  private async processResponseConfirmNameAddressDefendant1Page() {
    const { responseConfirmNameAddressPage } = this.defendantResponsePageFactory;
    await responseConfirmNameAddressPage.verifyContent(this.ccdCaseData);
    await responseConfirmNameAddressPage.selectYesAddress(partys.DEFENDANT_1);
    await responseConfirmNameAddressPage.submit();
  }

  private async processResponseConfirmNameAddressDefendant2Page() {
    const { responseConfirmNameAddressPage } = this.defendantResponsePageFactory;
    await responseConfirmNameAddressPage.verifyContent(this.ccdCaseData);
    await responseConfirmNameAddressPage.selectYesAddress(
      partys.DEFENDANT_2,
      ClaimTrack.SMALL_CLAIM,
    );
    await responseConfirmNameAddressPage.submit();
  }

  private async processResponseConfirmNameAddress1v2Page() {
    const { responseConfirmNameAddress1v2Page } = this.defendantResponsePageFactory;
    await responseConfirmNameAddress1v2Page.verifyContent(this.ccdCaseData);
    await responseConfirmNameAddress1v2Page.selectYesAddress();
    await responseConfirmNameAddress1v2Page.submit();
  }

  private async processResponseConfirmDetailsDefendant1Page() {
    const { responseConfirmDetailsPage } = this.defendantResponsePageFactory;
    await responseConfirmDetailsPage.verifyContent();
    await responseConfirmDetailsPage.selectYesAddress(partys.DEFENDANT_1);
    await responseConfirmDetailsPage.submit();
  }

  private async processResponseConfirmDetailsDefendant2Page() {
    const { responseConfirmDetailsPage } = this.defendantResponsePageFactory;
    await responseConfirmDetailsPage.verifyContent();
    await responseConfirmDetailsPage.selectYesAddress(partys.DEFENDANT_2);
    await responseConfirmDetailsPage.submit();
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
    await singleResponse2v1Page.selectYes();
    await singleResponse2v1Page.submit();
  }

  private async processRespondentResponseTypeSpecDefendant1Page() {
    const { respondentResponseTypeSpecPage } = this.defendantResponsePageFactory;
    await respondentResponseTypeSpecPage.verifyContent(this.ccdCaseData);
    await respondentResponseTypeSpecPage.selectFullDefence(partys.DEFENDANT_1);
    await respondentResponseTypeSpecPage.submit();
  }

  private async processRespondentResponseTypeSpecDefendant2Page() {
    const { respondentResponseTypeSpecPage } = this.defendantResponsePageFactory;
    await respondentResponseTypeSpecPage.verifyContent(this.ccdCaseData);
    await respondentResponseTypeSpecPage.selectFullDefence(partys.DEFENDANT_2);
    await respondentResponseTypeSpecPage.submit();
  }

  private async processDefenceRouteDefendant1Page() {
    const { defenceRouteDefendant1Page } = this.defendantResponsePageFactory;
    await defenceRouteDefendant1Page.verifyContent(this.ccdCaseData);
    await defenceRouteDefendant1Page.selectDisputesClaim();
    await defenceRouteDefendant1Page.submit();
  }

  private async processDefenceRouteDefendant2Page() {
    const { defenceRouteDefendant2Page } = this.defendantResponsePageFactory;
    await defenceRouteDefendant2Page.verifyContent(this.ccdCaseData);
    await defenceRouteDefendant2Page.selectDisputesClaim();
    await defenceRouteDefendant2Page.submit();
  }

  private async processUploadDefendantResponseSpecDefendant1Page() {
    const { uploadDefendantResponseSpecDefendant1Page } = this.defendantResponsePageFactory;
    await uploadDefendantResponseSpecDefendant1Page.verifyContent(this.ccdCaseData);
    await uploadDefendantResponseSpecDefendant1Page.enterDisputeReason();
    await uploadDefendantResponseSpecDefendant1Page.submit();
  }

  private async processUploadDefendantResponseSpecDefendant2Page() {
    const { uploadDefendantResponseSpecDefendant2Page } = this.defendantResponsePageFactory;
    await uploadDefendantResponseSpecDefendant2Page.verifyContent(this.ccdCaseData);
    await uploadDefendantResponseSpecDefendant2Page.enterDisputeReason();
    await uploadDefendantResponseSpecDefendant2Page.submit();
  }

  private async processHowToAddTimelineDefendant1Page() {
    const { howToAddTimelineDefendant1Page } = this.defendantResponsePageFactory;
    await howToAddTimelineDefendant1Page.verifyContent(this.ccdCaseData);
    await howToAddTimelineDefendant1Page.selectUpload();
    await howToAddTimelineDefendant1Page.submit();
  }

  private async processHowToAddTimelineDefendant2Page() {
    const { howToAddTimelineDefendant2Page } = this.defendantResponsePageFactory;
    await howToAddTimelineDefendant2Page.verifyContent(this.ccdCaseData);
    await howToAddTimelineDefendant2Page.selectUpload();
    await howToAddTimelineDefendant2Page.submit();
  }

  private async processHowToAddTimelineUploadDefendant1Page() {
    const { howToAddTimelineUploadDefendant1Page } = this.defendantResponsePageFactory;
    await howToAddTimelineUploadDefendant1Page.verifyContent(this.ccdCaseData);
    await howToAddTimelineUploadDefendant1Page.uploadDoc();
    await howToAddTimelineUploadDefendant1Page.submit();
  }

  private async processHowToAddTimelineUploadDefendant2Page() {
    const { howToAddTimelineUploadDefendant2Page } = this.defendantResponsePageFactory;
    await howToAddTimelineUploadDefendant2Page.verifyContent(this.ccdCaseData);
    await howToAddTimelineUploadDefendant2Page.uploadDoc();
    await howToAddTimelineUploadDefendant2Page.submit();
  }

  private async processMediationDefendant1Page() {
    const { mediationDefendant1Page } = this.defendantResponsePageFactory;
    await mediationDefendant1Page.verifyContent(this.ccdCaseData);
    await mediationDefendant1Page.selectYes();
    await mediationDefendant1Page.submit();
  }

  private async processMediationDefendant2Page() {
    const { mediationDefendant2Page } = this.defendantResponsePageFactory;
    await mediationDefendant2Page.verifyContent(this.ccdCaseData);
    await mediationDefendant2Page.selectYes();
    await mediationDefendant2Page.submit();
  }

  private async processSmallClaimExpertsDefendant1Page() {
    const { smallClaimExpertsDefendant1Page } = this.defendantResponsePageFactory;
    await smallClaimExpertsDefendant1Page.verifyContent(this.ccdCaseData);
    await smallClaimExpertsDefendant1Page.selectYesExperts();
    await smallClaimExpertsDefendant1Page.enterExpertDetails();
    await smallClaimExpertsDefendant1Page.submit();
  }

  private async processSmallClaimExpertsDefendant2Page() {
    const { smallClaimExpertsDefendant2Page } = this.defendantResponsePageFactory;
    await smallClaimExpertsDefendant2Page.verifyContent(this.ccdCaseData);
    await smallClaimExpertsDefendant2Page.selectYesExperts();
    await smallClaimExpertsDefendant2Page.enterExpertDetails();
    await smallClaimExpertsDefendant2Page.submit();
  }

  private async processFileDirectionsQuestionaireDefendant1Page() {
    const { fileDirectionsQuestionaireDefendant1Page } = this.defendantResponsePageFactory;
    await fileDirectionsQuestionaireDefendant1Page.verifyContent(this.ccdCaseData);
    await fileDirectionsQuestionaireDefendant1Page.enterDetails();
    await fileDirectionsQuestionaireDefendant1Page.submit();
  }

  private async processFixedRecoverableCostsPageDefendant1() {
    const { fixedRecoverableCostsPageDefendant1 } = this.defendantResponsePageFactory;
    await fixedRecoverableCostsPageDefendant1.verifyContent(this.ccdCaseData);
    await fixedRecoverableCostsPageDefendant1.selectYes();
    await fixedRecoverableCostsPageDefendant1.submit();
  }

  private async processDisclosureOfElectronicDocumentsLRSpecDefendant1Page() {
    const { disclosureOfElectronicDocumentsLRSpecDefendant1Page } =
      this.defendantResponsePageFactory;
    await disclosureOfElectronicDocumentsLRSpecDefendant1Page.verifyContent(this.ccdCaseData);
    await disclosureOfElectronicDocumentsLRSpecDefendant1Page.enterDetails();
    await disclosureOfElectronicDocumentsLRSpecDefendant1Page.submit();
  }

  private async processDisclosureOfNonElectronicDocumentsLRSpecDefendant1Page() {
    const { disclosureOfNonElectronicDocumentsLRSpecDefendant1Page } =
      this.defendantResponsePageFactory;
    await disclosureOfNonElectronicDocumentsLRSpecDefendant1Page.verifyContent(this.ccdCaseData);
    await disclosureOfNonElectronicDocumentsLRSpecDefendant1Page.enterDetails();
    await disclosureOfNonElectronicDocumentsLRSpecDefendant1Page.submit();
  }

  private async processDisclosureReportDefendant1Page() {
    const { disclosureReportDefendant1Page } = this.defendantResponsePageFactory;
    await disclosureReportDefendant1Page.verifyContent(this.ccdCaseData);
    await disclosureReportDefendant1Page.enterDetails();
    await disclosureReportDefendant1Page.submit();
  }

  private async processExpertsDefendant1Page() {
    const { expertsDefendant1Page } = this.defendantResponsePageFactory;
    await expertsDefendant1Page.verifyContent(this.ccdCaseData);
    await expertsDefendant1Page.useExperts();
    await expertsDefendant1Page.addNewExpert();
    await expertsDefendant1Page.enterExpertDetails(partys.DEFENDANT_1_EXPERT_1);
    await expertsDefendant1Page.submit();
  }

  private async processSmallClaimWitnessesDefendant1Page() {
    const { smallClaimWitnessesDefendant1Page } = this.defendantResponsePageFactory;
    await smallClaimWitnessesDefendant1Page.verifyContent(this.ccdCaseData);
    await smallClaimWitnessesDefendant1Page.selectYes();
    await smallClaimWitnessesDefendant1Page.addWitness();
    await smallClaimWitnessesDefendant1Page.enterWitnessDetails();
    await smallClaimWitnessesDefendant1Page.submit();
  }

  private async processSmallClaimWitnessesDefendant2Page() {
    const { smallClaimWitnessesDefendant2Page } = this.defendantResponsePageFactory;
    await smallClaimWitnessesDefendant2Page.verifyContent(this.ccdCaseData);
    await smallClaimWitnessesDefendant2Page.selectYes();
    await smallClaimWitnessesDefendant2Page.addWitness();
    await smallClaimWitnessesDefendant2Page.enterWitnessDetails();
    await smallClaimWitnessesDefendant2Page.submit();
  }

  private async processWitnessesSpecDefendant1Page() {
    const { witnessesSpecDefendant1Page } = this.defendantResponsePageFactory;
    await witnessesSpecDefendant1Page.verifyContent(this.ccdCaseData);
    await witnessesSpecDefendant1Page.addWitnesses();
    await witnessesSpecDefendant1Page.enterWitnessDetails(partys.DEFENDANT_1_WITNESS_1);
    await witnessesSpecDefendant1Page.submit();
  }

  private async processLanguageDefendant1Page() {
    const { languageDefendant1Page } = this.defendantResponsePageFactory;
    await languageDefendant1Page.verifyContent(this.ccdCaseData);
    await languageDefendant1Page.selectEnglishAndWelsh();
    await languageDefendant1Page.submit();
  }

  private async processLanguageDefendant2Page() {
    const { languageDefendant2Page } = this.defendantResponsePageFactory;
    await languageDefendant2Page.verifyContent(this.ccdCaseData);
    await languageDefendant2Page.selectEnglishAndWelsh();
    await languageDefendant2Page.submit();
  }

  private async processSmallClaimHearingDefendant1Page() {
    const { smallClaimHearingDefendant1Page } = this.defendantResponsePageFactory;
    await smallClaimHearingDefendant1Page.verifyContent(this.ccdCaseData);
    await smallClaimHearingDefendant1Page.selectYesAvailabilityRequired();
    await smallClaimHearingDefendant1Page.addNewUnavailableDate();
    await smallClaimHearingDefendant1Page.selectSingleDate(1);
    await smallClaimHearingDefendant1Page.selectYesInterpreter();
    await smallClaimHearingDefendant1Page.selectYesInterpreter();
    await smallClaimHearingDefendant1Page.enterTypeOfInterpreter();
    await smallClaimHearingDefendant1Page.submit();
  }

  private async processSmallClaimHearingDefendant2Page() {
    const { smallClaimHearingDefendant2Page } = this.defendantResponsePageFactory;
    await smallClaimHearingDefendant2Page.verifyContent(this.ccdCaseData);
    await smallClaimHearingDefendant2Page.selectYesAvailabilityRequired();
    await smallClaimHearingDefendant2Page.addNewUnavailableDate();
    await smallClaimHearingDefendant2Page.selectSingleDate(1);
    await smallClaimHearingDefendant2Page.selectYesInterpreter();
    await smallClaimHearingDefendant2Page.selectYesInterpreter();
    await smallClaimHearingDefendant2Page.enterTypeOfInterpreter();
    await smallClaimHearingDefendant2Page.submit();
  }

  private async processHearingLRSpecDefendant1Page() {
    const { hearingLRSpecDefendant1Page } = this.defendantResponsePageFactory;
    await hearingLRSpecDefendant1Page.verifyContent(this.ccdCaseData);
    await hearingLRSpecDefendant1Page.selectYesAvailabilityRequired();
    await hearingLRSpecDefendant1Page.addNewUnavailableDate();
    await hearingLRSpecDefendant1Page.selectSingleDate(1);
    await hearingLRSpecDefendant1Page.submit();
  }

  private async processRequestedCourtLRSpecDefendant1Page() {
    const { requestedCourtLRSpecDefendant1Page } = this.defendantResponsePageFactory;
    await requestedCourtLRSpecDefendant1Page.verifyContent(this.ccdCaseData);
    await requestedCourtLRSpecDefendant1Page.selectCourtLocation();
    await requestedCourtLRSpecDefendant1Page.selectNoRemoteHearing();
    await requestedCourtLRSpecDefendant1Page.submit();
  }

  private async processRequestedCourtLRSpecDefendant2Page() {
    const { requestedCourtLRSpecDefendant2Page } = this.defendantResponsePageFactory;
    await requestedCourtLRSpecDefendant2Page.verifyContent(this.ccdCaseData);
    await requestedCourtLRSpecDefendant2Page.selectCourtLocation();
    await requestedCourtLRSpecDefendant2Page.selectNoRemoteHearing();
    await requestedCourtLRSpecDefendant2Page.submit();
  }

  private async processHearingSupportDefendant1Page() {
    const { hearingSupportDefendant1Page } = this.defendantResponsePageFactory;
    await hearingSupportDefendant1Page.verifyContent(this.ccdCaseData);
    await hearingSupportDefendant1Page.selectYes();
    await hearingSupportDefendant1Page.enterSupportRequirementsAdditional();
    await hearingSupportDefendant1Page.submit();
  }

  private async processHearingSupportDefendant2Page() {
    const { hearingSupportDefendant2Page } = this.defendantResponsePageFactory;
    await hearingSupportDefendant2Page.verifyContent(this.ccdCaseData);
    await hearingSupportDefendant2Page.selectYes();
    await hearingSupportDefendant2Page.enterSupportRequirementsAdditional();
    await hearingSupportDefendant2Page.submit();
  }

  private async processVulnerabilityQuestionsSpecDefendant1Page() {
    const { vulnerabilityQuestionsSpecDefendant1Page } = this.defendantResponsePageFactory;
    await vulnerabilityQuestionsSpecDefendant1Page.verifyContent(this.ccdCaseData);
    await vulnerabilityQuestionsSpecDefendant1Page.selectYes();
    await vulnerabilityQuestionsSpecDefendant1Page.enterVulnerabilityAdjustments();
    await vulnerabilityQuestionsSpecDefendant1Page.submit();
  }

  private async processVulnerabilityQuestionsSpecDefendant2Page() {
    const { vulnerabilityQuestionsSpecDefendant2Page } = this.defendantResponsePageFactory;
    await vulnerabilityQuestionsSpecDefendant2Page.verifyContent(this.ccdCaseData);
    await vulnerabilityQuestionsSpecDefendant2Page.selectYes();
    await vulnerabilityQuestionsSpecDefendant2Page.enterVulnerabilityAdjustments();
    await vulnerabilityQuestionsSpecDefendant2Page.submit();
  }

  private async processApplicationDefendant1Page() {
    const { applicationDefendant1Page } = this.defendantResponsePageFactory;
    await applicationDefendant1Page.verifyContent(this.ccdCaseData);
    await applicationDefendant1Page.selectYes();
    await applicationDefendant1Page.enterAdditionalInformation();
    await applicationDefendant1Page.submit();
  }

  private async processStatementOfTruthDefendantResponseDefendant1Page() {
    const { statementOfTruthDefendantResponseDefendant1Page } = this.defendantResponsePageFactory;
    await statementOfTruthDefendantResponseDefendant1Page.verifyContent(this.ccdCaseData);
    await statementOfTruthDefendantResponseDefendant1Page.enterDetails();
    await statementOfTruthDefendantResponseDefendant1Page.submit();
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
