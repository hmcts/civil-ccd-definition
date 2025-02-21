import BaseTestData from '../../../../../base/base-test-data';
import {AllMethodsStep} from '../../../../../decorators/test-steps';
import TestData from '../../../../../models/test-data';
import DefendantResponsePageFactory
  from '../../../../../pages/exui/claimant-defendant-solicitor/response/defendant-response/defendant-response-page-factory';

@AllMethodsStep()
export default class respondentResponseSpecActions extends BaseTestData {
  defendantResponsePageFactory: DefendantResponsePageFactory;

  constructor(defendantResponsePageFactory: DefendantResponsePageFactory, testData: TestData) {
    super(testData);
    this.defendantResponsePageFactory = defendantResponsePageFactory;
  }

  async processDefendantSolicitor1InitialPages() {
    await this.respondentChecklistPage();

    const {responseConfirmNameAddressDefendantSolicitor1Page} = this.defendantResponsePageFactory;
    await responseConfirmNameAddressDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await responseConfirmNameAddressDefendantSolicitor1Page.selectYesAddress();
    await responseConfirmNameAddressDefendantSolicitor1Page.submit();

    await this.responseConfirmDetailsDefendantSolicitor1Page();

  }

  async processDefendantSolicitor2InitialPages() {
    await this.respondentChecklistPage();

    const {responseConfirmNameAddressDefendantSolicitor2Page} = this.defendantResponsePageFactory;
    await responseConfirmNameAddressDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await responseConfirmNameAddressDefendantSolicitor2Page.selectYesAddress();
    await responseConfirmNameAddressDefendantSolicitor2Page.submit();

    const {responseConfirmDetailsDefendantSolicitor2Page} = this.defendantResponsePageFactory;
    await responseConfirmDetailsDefendantSolicitor2Page.verifyContent();
    await responseConfirmDetailsDefendantSolicitor2Page.selectYesAddress();
    await responseConfirmDetailsDefendantSolicitor2Page.submit();
  }

  async processDefendantSolicitor1InitialPages1v2SS() {
    await this.respondentChecklistPage();

    const {responseConfirmNameAddress1v2Page} = this.defendantResponsePageFactory;
    await responseConfirmNameAddress1v2Page.verifyContent(this.ccdCaseData);
    await responseConfirmNameAddress1v2Page.selectYesAddress();
    await responseConfirmNameAddress1v2Page.submit();

    await this.responseConfirmDetailsDefendantSolicitor1Page();

  }

  private async respondentChecklistPage() {
    const {respondentChecklistPage} = this.defendantResponsePageFactory;
    await respondentChecklistPage.verifyContent();
    await respondentChecklistPage.submit();
  }


  private async responseConfirmDetailsDefendantSolicitor1Page() {
    const {responseConfirmDetailsDefendantSolicitor1Page} = this.defendantResponsePageFactory;
    await responseConfirmDetailsDefendantSolicitor1Page.verifyContent();
    await responseConfirmDetailsDefendantSolicitor1Page.selectYesAddress();
    await responseConfirmDetailsDefendantSolicitor1Page.submit();
  }


  async singleResponsePage() {
    const {singleResponsePage} = this.defendantResponsePageFactory;
    await singleResponsePage.verifyContent(this.ccdCaseData);
    await singleResponsePage.selectYes();
    await singleResponsePage.submit();
  }

  async singleResponse2v1Page() {
    const {singleResponse2v1Page} = this.defendantResponsePageFactory;
    await singleResponse2v1Page.verifyContent(this.ccdCaseData);
    await singleResponse2v1Page.selectNo();
    await singleResponse2v1Page.submit();
  }

  async respondentResponseType2v1SpecPage() {
    const {respondentResponseType2v1SpecPage} = this.defendantResponsePageFactory;
    await respondentResponseType2v1SpecPage.verifyContent(this.ccdCaseData);
    await respondentResponseType2v1SpecPage.selectFullDefenceBothClaimants();
    await respondentResponseType2v1SpecPage.submit();
  }

  async respondentResponseTypeSpecDefendantSolicitor1Page() {
    const {respondentResponseTypeSpecDefendantSolicitor1Page} = this.defendantResponsePageFactory;
    await respondentResponseTypeSpecDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await respondentResponseTypeSpecDefendantSolicitor1Page.selectFullDefence();
    await respondentResponseTypeSpecDefendantSolicitor1Page.submit();
  }

  async respondentResponseTypeSpecDefendantSolicitor2Page() {
    const {respondentResponseTypeSpecDefendantSolicitor2Page} = this.defendantResponsePageFactory;
    await respondentResponseTypeSpecDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await respondentResponseTypeSpecDefendantSolicitor2Page.selectFullDefence();
    await respondentResponseTypeSpecDefendantSolicitor2Page.submit();
  }

  async defenceRouteDefendantSolicitor1Page() {
    const {defenceRouteDefendantSolicitor1Page} = this.defendantResponsePageFactory;
    await defenceRouteDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await defenceRouteDefendantSolicitor1Page.selectDisputesClaim();
    await defenceRouteDefendantSolicitor1Page.submit();
  }

  async defenceRouteDefendantSolicitor2Page() {
    const {defenceRouteDefendantSolicitor2Page} = this.defendantResponsePageFactory;
    await defenceRouteDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await defenceRouteDefendantSolicitor2Page.selectDisputesClaim();
    await defenceRouteDefendantSolicitor2Page.submit();
  }

  async uploadDefendantResponseSpecDefendantSolicitor1Page() {
    const {uploadDefendantResponseSpecDefendantSolicitor1Page} =
      this.defendantResponsePageFactory;
    await uploadDefendantResponseSpecDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await uploadDefendantResponseSpecDefendantSolicitor1Page.enterDisputeReason();
    await uploadDefendantResponseSpecDefendantSolicitor1Page.submit();
  }

  async uploadDefendantResponseSpecDefendantSolicitor2Page() {
    const {uploadDefendantResponseSpecDefendantSolicitor2Page} =
      this.defendantResponsePageFactory;
    await uploadDefendantResponseSpecDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await uploadDefendantResponseSpecDefendantSolicitor2Page.enterDisputeReason();
    await uploadDefendantResponseSpecDefendantSolicitor2Page.submit();
  }

  async processDefendantSolicitor2TimelinePages() {

    const {howToAddTimelineDefendantSolicitor2Page} = this.defendantResponsePageFactory;
    await howToAddTimelineDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await howToAddTimelineDefendantSolicitor2Page.selectUpload();
    await howToAddTimelineDefendantSolicitor2Page.submit();

    const {howToAddTimelineUploadDefendantSolicitor2Page} = this.defendantResponsePageFactory;
    await howToAddTimelineUploadDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await howToAddTimelineUploadDefendantSolicitor2Page.uploadDoc();
    await howToAddTimelineUploadDefendantSolicitor2Page.submit();
  }


  async processDefendantSolicitor1TimelinePages() {
    const {howToAddTimelineDefendantSolicitor1Page} = this.defendantResponsePageFactory;
    await howToAddTimelineDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await howToAddTimelineDefendantSolicitor1Page.selectUpload();
    await howToAddTimelineDefendantSolicitor1Page.submit();

    const {howToAddTimelineUploadDefendantSolicitor1Page} = this.defendantResponsePageFactory;
    await howToAddTimelineUploadDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await howToAddTimelineUploadDefendantSolicitor1Page.uploadDoc();
    await howToAddTimelineUploadDefendantSolicitor1Page.submit();
  }


  async mediationDefendantSolicitor1Page() {
    const {mediationDefendantSolicitor1Page} = this.defendantResponsePageFactory;
    await mediationDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await mediationDefendantSolicitor1Page.selectYes();
    await mediationDefendantSolicitor1Page.submit();
  }

  async mediationDefendantSolicitor2Page() {
    const {mediationDefendantSolicitor2Page} = this.defendantResponsePageFactory;
    await mediationDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await mediationDefendantSolicitor2Page.selectYes();
    await mediationDefendantSolicitor2Page.submit();
  }


  async processDefendantSolicitor1MediationPages() {
    const {mediationContactInformationDefendantSolicitor1Page} =
      this.defendantResponsePageFactory;
    await mediationContactInformationDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await mediationContactInformationDefendantSolicitor1Page.enterMediationContactDetails();
    await mediationContactInformationDefendantSolicitor1Page.submit();

    const {mediationAvailabilityDefendantSolicitor1Page} = this.defendantResponsePageFactory;
    await mediationAvailabilityDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await mediationAvailabilityDefendantSolicitor1Page.selectYes();
    await mediationAvailabilityDefendantSolicitor1Page.addNewUnavailableDate();
    await mediationAvailabilityDefendantSolicitor1Page.selectSingleDate();
    await mediationAvailabilityDefendantSolicitor1Page.submit();
  }

  async processDefendantSolicitor2MediationPages() {
    const {mediationContactInformationDefendantSolicitor2Page} =
      this.defendantResponsePageFactory;
    await mediationContactInformationDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await mediationContactInformationDefendantSolicitor2Page.enterMediationContactDetails();
    await mediationContactInformationDefendantSolicitor2Page.submit();

    const {mediationAvailabilityDefendantSolicitor2Page} = this.defendantResponsePageFactory;
    await mediationAvailabilityDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await mediationAvailabilityDefendantSolicitor2Page.selectNo();
    await mediationAvailabilityDefendantSolicitor2Page.submit();
  }


  async processDefendantSolicitor1FastTrackPages() {
    const {fileDirectionsQuestionaireDefendantSolicitor1Page} = this.defendantResponsePageFactory;
    await fileDirectionsQuestionaireDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await fileDirectionsQuestionaireDefendantSolicitor1Page.enterDetails();
    await fileDirectionsQuestionaireDefendantSolicitor1Page.submit();

    const {fixedRecoverableCostsPageDefendantSolicitor1} = this.defendantResponsePageFactory;
    await fixedRecoverableCostsPageDefendantSolicitor1.verifyContent(this.ccdCaseData);
    await fixedRecoverableCostsPageDefendantSolicitor1.selectYes();
    await fixedRecoverableCostsPageDefendantSolicitor1.submit();

    const {disclosureOfElectronicDocumentsLRSpecDefendantSolicitor1Page} =
      this.defendantResponsePageFactory;
    await disclosureOfElectronicDocumentsLRSpecDefendantSolicitor1Page.verifyContent(
      this.ccdCaseData,
    );
    await disclosureOfElectronicDocumentsLRSpecDefendantSolicitor1Page.enterDetails();
    await disclosureOfElectronicDocumentsLRSpecDefendantSolicitor1Page.submit();

    const {disclosureOfNonElectronicDocumentsLRSpecDefendantSolicitor1Page} =
      this.defendantResponsePageFactory;
    await disclosureOfNonElectronicDocumentsLRSpecDefendantSolicitor1Page.verifyContent(
      this.ccdCaseData,
    );
    await disclosureOfNonElectronicDocumentsLRSpecDefendantSolicitor1Page.enterDetails();
    await disclosureOfNonElectronicDocumentsLRSpecDefendantSolicitor1Page.submit();

    const {disclosureReportDefendantSolicitor1Page} = this.defendantResponsePageFactory;
    await disclosureReportDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await disclosureReportDefendantSolicitor1Page.enterDetails();
    await disclosureReportDefendantSolicitor1Page.submit();
  }


  async applicationDefendantSolicitor1Page() {
    const {applicationDefendantSolicitor1Page} = this.defendantResponsePageFactory;
    await applicationDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await applicationDefendantSolicitor1Page.selectYes();
    await applicationDefendantSolicitor1Page.enterAdditionalInformation();
    await applicationDefendantSolicitor1Page.submit();
  }


  async statementOfTruthDefendantResponseDefendantSolicitor2Page() {
    const {statementOfTruthDefendantResponseDefendantSolicitor2Page} =
      this.defendantResponsePageFactory;
    await statementOfTruthDefendantResponseDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await statementOfTruthDefendantResponseDefendantSolicitor2Page.enterDetails();
    await statementOfTruthDefendantResponseDefendantSolicitor2Page.submit();
  }


  async confirmDefendantResponseSpecPage() {
    const {confirmDefendantResponseSpecPage} = this.defendantResponsePageFactory;
    await confirmDefendantResponseSpecPage.verifyContent(this.ccdCaseData);
    await confirmDefendantResponseSpecPage.submit();
  }

  async confirm1v2SSDefendantResponseSpecPage() {
    const {confirm1v2SSDefendantResponseSpecPage} = this.defendantResponsePageFactory;
    await confirm1v2SSDefendantResponseSpecPage.verifyContent(this.ccdCaseData);
    await confirm1v2SSDefendantResponseSpecPage.submit();
  }

  async processDefendantSolicitor1FastTrackDQPages() {
    const {expertsDefendantSolicitor1Page: expertsDefendantSolicitor1Page} =
      this.defendantResponsePageFactory;
    await expertsDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await expertsDefendantSolicitor1Page.useExperts();
    await expertsDefendantSolicitor1Page.addNewExpert();
    await expertsDefendantSolicitor1Page.enterExpertDetails();
    await expertsDefendantSolicitor1Page.submit();

    const {witnessesSpecDefendantSolicitor1Page} = this.defendantResponsePageFactory;
    await witnessesSpecDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await witnessesSpecDefendantSolicitor1Page.addWitnesses();
    await witnessesSpecDefendantSolicitor1Page.enterWitnessDetails();
    await witnessesSpecDefendantSolicitor1Page.submit();

    await this.languageDefendantSolicitor1Page();

    const {hearingLRSpecDefendantSolicitor1Page} = this.defendantResponsePageFactory;
    await hearingLRSpecDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await hearingLRSpecDefendantSolicitor1Page.selectYesAvailabilityRequired();
    await hearingLRSpecDefendantSolicitor1Page.addNewUnavailableDate();
    await hearingLRSpecDefendantSolicitor1Page.selectSingleDate();
    await hearingLRSpecDefendantSolicitor1Page.submit();

    await this.requestedCourtLRSpecDefendantSolicitor1Page();
    await this.hearingSupportDefendantSolicitor1Page();
    await this.vulnerabilityQuestionsSpecDefendantSolicitor1Page();
  }

  async processDefendantSolicitor1SmallTrackDQPages() {
    const {smallClaimExpertsDefendantSolicitor1Page} = this.defendantResponsePageFactory;
    await smallClaimExpertsDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await smallClaimExpertsDefendantSolicitor1Page.selectYesExperts();
    await smallClaimExpertsDefendantSolicitor1Page.enterExpertDetails();
    await smallClaimExpertsDefendantSolicitor1Page.submit();

    const {smallClaimWitnessesDefendantSolicitor1Page} = this.defendantResponsePageFactory;
    await smallClaimWitnessesDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await smallClaimWitnessesDefendantSolicitor1Page.selectYes();
    await smallClaimWitnessesDefendantSolicitor1Page.addWitness();
    await smallClaimWitnessesDefendantSolicitor1Page.enterWitnessDetails();
    await smallClaimWitnessesDefendantSolicitor1Page.submit();

    await this.languageDefendantSolicitor1Page();

    const {smallClaimHearingDefendantSolicitor1Page} = this.defendantResponsePageFactory;
    await smallClaimHearingDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await smallClaimHearingDefendantSolicitor1Page.selectYesAvailabilityRequired();
    await smallClaimHearingDefendantSolicitor1Page.addNewUnavailableDate();
    await smallClaimHearingDefendantSolicitor1Page.selectSingleDate();
    await smallClaimHearingDefendantSolicitor1Page.selectYesInterpreter();
    await smallClaimHearingDefendantSolicitor1Page.enterTypeOfInterpreter();
    await smallClaimHearingDefendantSolicitor1Page.submit();

    await this.requestedCourtLRSpecDefendantSolicitor1Page();
    await this.hearingSupportDefendantSolicitor1Page();
    await this.vulnerabilityQuestionsSpecDefendantSolicitor1Page();
  }

  async processDefendantSolicitor2SmallTrackDQPages() {
    const {smallClaimExpertsDefendantSolicitor2Page} = this.defendantResponsePageFactory;
    await smallClaimExpertsDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await smallClaimExpertsDefendantSolicitor2Page.selectYesExperts();
    await smallClaimExpertsDefendantSolicitor2Page.enterExpertDetails();
    await smallClaimExpertsDefendantSolicitor2Page.submit();

    const {smallClaimWitnessesDefendantSolicitor2Page} = this.defendantResponsePageFactory;
    await smallClaimWitnessesDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await smallClaimWitnessesDefendantSolicitor2Page.selectYes();
    await smallClaimWitnessesDefendantSolicitor2Page.addWitness();
    await smallClaimWitnessesDefendantSolicitor2Page.enterWitnessDetails();
    await smallClaimWitnessesDefendantSolicitor2Page.submit();

    const {languageDefendantSolicitor2Page} = this.defendantResponsePageFactory;
    await languageDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await languageDefendantSolicitor2Page.selectEnglishAndWelsh();
    await languageDefendantSolicitor2Page.submit();

    const {smallClaimHearingDefendantSolicitor2Page} = this.defendantResponsePageFactory;
    await smallClaimHearingDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await smallClaimHearingDefendantSolicitor2Page.selectNoAvailabilityRequired();
    // await smallClaimHearingDefendantSolicitor2Page.selectYesAvailabilityRequired();
    // await smallClaimHearingDefendantSolicitor2Page.addNewUnavailableDate();
    // await smallClaimHearingDefendantSolicitor2Page.selectSingleDate();
    await smallClaimHearingDefendantSolicitor2Page.selectYesInterpreter();
    await smallClaimHearingDefendantSolicitor2Page.enterTypeOfInterpreter();
    await smallClaimHearingDefendantSolicitor2Page.submit();

    const {requestedCourtLRSpecDefendantSolicitor2Page} = this.defendantResponsePageFactory;
    await requestedCourtLRSpecDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await requestedCourtLRSpecDefendantSolicitor2Page.selectCourtLocation();
    await requestedCourtLRSpecDefendantSolicitor2Page.selectNoRemoteHearing();
    await requestedCourtLRSpecDefendantSolicitor2Page.submit();


    const {hearingSupportDefendantSolicitor2Page} = this.defendantResponsePageFactory;
    await hearingSupportDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await hearingSupportDefendantSolicitor2Page.selectYes();
    await hearingSupportDefendantSolicitor2Page.enterSupportRequirementsAdditional();
    await hearingSupportDefendantSolicitor2Page.submit();


    const {vulnerabilityQuestionsSpecDefendantSolicitor2Page} = this.defendantResponsePageFactory;
    await vulnerabilityQuestionsSpecDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await vulnerabilityQuestionsSpecDefendantSolicitor2Page.selectYes();
    await vulnerabilityQuestionsSpecDefendantSolicitor2Page.enterVulnerabilityAdjustments();
    await vulnerabilityQuestionsSpecDefendantSolicitor2Page.submit();
  }

  async processDefendantSolicitor1FinalPages() {
    const {statementOfTruthDefendantResponseDefendantSolicitor1Page} =
      this.defendantResponsePageFactory;
    await statementOfTruthDefendantResponseDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await statementOfTruthDefendantResponseDefendantSolicitor1Page.enterDetails();
    await statementOfTruthDefendantResponseDefendantSolicitor1Page.submit();

    const {submitDefendantResponsePage} = this.defendantResponsePageFactory;
    await submitDefendantResponsePage.verifyContent(this.ccdCaseData);
    await submitDefendantResponsePage.submit();
  }

  private async languageDefendantSolicitor1Page() {
    const {languageDefendantSolicitor1Page} = this.defendantResponsePageFactory;
    await languageDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await languageDefendantSolicitor1Page.selectEnglishAndWelsh();
    await languageDefendantSolicitor1Page.submit();
  }

  private async requestedCourtLRSpecDefendantSolicitor1Page() {
    const {requestedCourtLRSpecDefendantSolicitor1Page} = this.defendantResponsePageFactory;
    await requestedCourtLRSpecDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await requestedCourtLRSpecDefendantSolicitor1Page.selectCourtLocation();
    await requestedCourtLRSpecDefendantSolicitor1Page.selectNoRemoteHearing();
    await requestedCourtLRSpecDefendantSolicitor1Page.submit();
  }

  private async hearingSupportDefendantSolicitor1Page() {
    const {hearingSupportDefendantSolicitor1Page} = this.defendantResponsePageFactory;
    await hearingSupportDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await hearingSupportDefendantSolicitor1Page.selectYes();
    await hearingSupportDefendantSolicitor1Page.enterSupportRequirementsAdditional();
    await hearingSupportDefendantSolicitor1Page.submit();
  }

  private async vulnerabilityQuestionsSpecDefendantSolicitor1Page() {
    const {vulnerabilityQuestionsSpecDefendantSolicitor1Page} = this.defendantResponsePageFactory;
    await vulnerabilityQuestionsSpecDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await vulnerabilityQuestionsSpecDefendantSolicitor1Page.selectYes();
    await vulnerabilityQuestionsSpecDefendantSolicitor1Page.enterVulnerabilityAdjustments();
    await vulnerabilityQuestionsSpecDefendantSolicitor1Page.submit();
  }
}
