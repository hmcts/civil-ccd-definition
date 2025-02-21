import TestData from '../../../../../models/test-data.ts';

import BaseAction from '../../../../../base/base-test-data.ts';
import DefendantResponsePageFactory from '../../../../../pages/exui/claimant-defendant-solicitor/response/defendant-response/defendant-response-page-factory.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';

@AllMethodsStep()
export default class DefendantResponseActions extends BaseAction {
  private defendantResponsePageFactory: DefendantResponsePageFactory;

  constructor(defendantResponsePageFactory: DefendantResponsePageFactory, testData: TestData) {
    super(testData);
    this.defendantResponsePageFactory = defendantResponsePageFactory;
  }

  async confirmDetailsDefendantSolicitor1Page() {
    const { confirmDetailsDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await confirmDetailsDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await confirmDetailsDefendantSolicitor1Page.submit();
  }

  async confirmDetailsDefendantSolicitor2Page() {
    const { confirmDetailsDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await confirmDetailsDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await confirmDetailsDefendantSolicitor2Page.submit();
  }

  async singleResponsePage() {
    const { singleResponsePage } = this.defendantResponsePageFactory;
    await singleResponsePage.verifyContent(this.ccdCaseData);
    await singleResponsePage.selectYes();
    await singleResponsePage.submit();
  }

  async respondentResponseTypeDefendantSolicitor1Page() {
    const { respondentResponseTypeDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await respondentResponseTypeDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await respondentResponseTypeDefendantSolicitor1Page.selectRejectAll();
    await respondentResponseTypeDefendantSolicitor1Page.submit();
  }

  async respondentResponseTypeDefendantSolicitor2Page() {
    const { respondentResponseTypeDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await respondentResponseTypeDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await respondentResponseTypeDefendantSolicitor2Page.selectRejectAll();
    await respondentResponseTypeDefendantSolicitor2Page.submit();
  }

  async respondentResponseType2v1Page() {
    const { respondentResponseType2v1Page } = this.defendantResponsePageFactory;
    await respondentResponseType2v1Page.verifyContent(this.ccdCaseData);
    await respondentResponseType2v1Page.selectRejectAll();
    await respondentResponseType2v1Page.submit();
  }

  async solicitorReferencesDefendantResponseDefendantSolicitor1Page() {
    const { solicitorReferencesDefendantResponseDefendantSolicitor1Page } =
      this.defendantResponsePageFactory;
    await solicitorReferencesDefendantResponseDefendantSolicitor1Page.verifyContent(
      this.ccdCaseData,
    );
    await solicitorReferencesDefendantResponseDefendantSolicitor1Page.enterReference();
    await solicitorReferencesDefendantResponseDefendantSolicitor1Page.submit();
  }

  async solicitorReferencesDefendantResponseDefendantSolicitor2Page() {
    const { solicitorReferencesDefendantResponseDefendantSolicitor2Page } =
      this.defendantResponsePageFactory;
    await solicitorReferencesDefendantResponseDefendantSolicitor2Page.verifyContent(
      this.ccdCaseData,
    );
    await solicitorReferencesDefendantResponseDefendantSolicitor2Page.enterReference();
    await solicitorReferencesDefendantResponseDefendantSolicitor2Page.submit();
  }

  async uploadDefendantResponseDefendantSolicitor1Page() {
    const { uploadDefendantResponseDefendantSolicitor1Page } = this.defendantResponsePageFactory;
    await uploadDefendantResponseDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
    await uploadDefendantResponseDefendantSolicitor1Page.uploadDefence();
    await uploadDefendantResponseDefendantSolicitor1Page.submit();
  }

  async uploadDefendantResponseDefendantSolicitor2Page() {
    const { uploadDefendantResponseDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await uploadDefendantResponseDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await uploadDefendantResponseDefendantSolicitor2Page.uploadDefence();
    await uploadDefendantResponseDefendantSolicitor2Page.submit();
  }

  async processDefendantSolicitor1FastTrackPages() {
      const { fileDirectionsQuestionaireDefendantSolicitor1Page } = this.defendantResponsePageFactory;
      await fileDirectionsQuestionaireDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
      await fileDirectionsQuestionaireDefendantSolicitor1Page.enterDetails();
      await fileDirectionsQuestionaireDefendantSolicitor1Page.submit();

      const { fixedRecoverableCostsPageDefendantSolicitor1 } = this.defendantResponsePageFactory;
      await fixedRecoverableCostsPageDefendantSolicitor1.verifyContent(this.ccdCaseData);
      await fixedRecoverableCostsPageDefendantSolicitor1.selectYes();
      await fixedRecoverableCostsPageDefendantSolicitor1.submit();

      const { disclosureOfNonElectronicDocumentsDefendantSolicitor1Page } =
        this.defendantResponsePageFactory;
      await disclosureOfNonElectronicDocumentsDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
      await disclosureOfNonElectronicDocumentsDefendantSolicitor1Page.enterDetails();
      await disclosureOfNonElectronicDocumentsDefendantSolicitor1Page.submit();
  }


  async fileDirectionsQuestionaireDefendantSolicitor2Page() {
    const { fileDirectionsQuestionaireDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await fileDirectionsQuestionaireDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await fileDirectionsQuestionaireDefendantSolicitor2Page.enterDetails();
    await fileDirectionsQuestionaireDefendantSolicitor2Page.submit();
  }


  async fixedRecoverableCostsPageDefendantSolicitor2() {
    const { fixedRecoverableCostsPageDefendantSolicitor2 } = this.defendantResponsePageFactory;
    await fixedRecoverableCostsPageDefendantSolicitor2.verifyContent(this.ccdCaseData);
    await fixedRecoverableCostsPageDefendantSolicitor2.selectYes();
    await fixedRecoverableCostsPageDefendantSolicitor2.submit();
  }


  async disclosureOfNonElectronicDocumentsDefendantSolicitor2Page() {
    const { disclosureOfNonElectronicDocumentsDefendantSolicitor2Page } =
      this.defendantResponsePageFactory;
    await disclosureOfNonElectronicDocumentsDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await disclosureOfNonElectronicDocumentsDefendantSolicitor2Page.enterDetails();
    await disclosureOfNonElectronicDocumentsDefendantSolicitor2Page.submit();
  }

  async processDefendantSolicitor2DQPages() {
    const { expertsDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await expertsDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await expertsDefendantSolicitor2Page.useExperts();
    await expertsDefendantSolicitor2Page.addNewExpert();
    await expertsDefendantSolicitor2Page.enterExpertDetails();
    await expertsDefendantSolicitor2Page.submit();


    const { witnessesDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await witnessesDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await witnessesDefendantSolicitor2Page.selectYesWitnesses();
    await witnessesDefendantSolicitor2Page.addWitness();
    await witnessesDefendantSolicitor2Page.enterWitnessDetails();
    await witnessesDefendantSolicitor2Page.submit();


    const { languageDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await languageDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await languageDefendantSolicitor2Page.selectEnglishAndWelsh();
    await languageDefendantSolicitor2Page.submit();


    const { hearingDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await hearingDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await hearingDefendantSolicitor2Page.selectNoAvailabilityRequired();
    await hearingDefendantSolicitor2Page.submit();


    const { draftDirectionsDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await draftDirectionsDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await draftDirectionsDefendantSolicitor2Page.uploadEvidence();
    await draftDirectionsDefendantSolicitor2Page.submit();


    const { requestedCourtDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await requestedCourtDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await requestedCourtDefendantSolicitor2Page.selectCourtLocation();
    await requestedCourtDefendantSolicitor2Page.enterPreferredCourtReason();
    await requestedCourtDefendantSolicitor2Page.selectNoRemoteHearing();
    await requestedCourtDefendantSolicitor2Page.submit();


    const { hearingSupportDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await hearingSupportDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await hearingSupportDefendantSolicitor2Page.selectYes();
    await hearingSupportDefendantSolicitor2Page.enterSupportRequirementsAdditional();
    await hearingSupportDefendantSolicitor2Page.submit();


    const { vulnerabilityQuestionsDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await vulnerabilityQuestionsDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await vulnerabilityQuestionsDefendantSolicitor2Page.selectYes();
    await vulnerabilityQuestionsDefendantSolicitor2Page.enterVulnerabilityAdjustments();
    await vulnerabilityQuestionsDefendantSolicitor2Page.submit();


    const { furtherInformationDefendantSolicitor2Page } = this.defendantResponsePageFactory;
    await furtherInformationDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
    await furtherInformationDefendantSolicitor2Page.selectYes();
    await furtherInformationDefendantSolicitor2Page.enterFurtherInformation();
    await furtherInformationDefendantSolicitor2Page.submit();
    }

  async processDefendantSolicitor2FinalPages() {
      const { statementOfTruthDefendantResponseDefendantSolicitor2Page } =
        this.defendantResponsePageFactory;
      await statementOfTruthDefendantResponseDefendantSolicitor2Page.verifyContent(this.ccdCaseData);
      await statementOfTruthDefendantResponseDefendantSolicitor2Page.enterDetails();
      await statementOfTruthDefendantResponseDefendantSolicitor2Page.submit();

      await this.submitDefendantResponsePage();
  }

  async processDefendantSolicitor1DQPages(){
      const { expertsDefendantSolicitor1Page } = this.defendantResponsePageFactory;
      await expertsDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
      await expertsDefendantSolicitor1Page.useExperts();
      await expertsDefendantSolicitor1Page.addNewExpert();
      await expertsDefendantSolicitor1Page.enterExpertDetails();
      await expertsDefendantSolicitor1Page.submit();

      const { witnessesDefendantSolicitor1Page } = this.defendantResponsePageFactory;
      await witnessesDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
      await witnessesDefendantSolicitor1Page.selectYesWitnesses();
      await witnessesDefendantSolicitor1Page.addWitness();
      await witnessesDefendantSolicitor1Page.enterWitnessDetails();
      await witnessesDefendantSolicitor1Page.submit();

      const { languageDefendantSolicitor1Page } = this.defendantResponsePageFactory;
      await languageDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
      await languageDefendantSolicitor1Page.selectEnglishAndWelsh();
      await languageDefendantSolicitor1Page.submit();

      const { hearingDefendantSolicitor1Page } = this.defendantResponsePageFactory;
      await hearingDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
      await hearingDefendantSolicitor1Page.selectYesAvailabilityRequired();
      await hearingDefendantSolicitor1Page.addNewUnavailableDate();
      await hearingDefendantSolicitor1Page.selectSingleDate();
      await hearingDefendantSolicitor1Page.submit();

      const { draftDirectionsDefendantSolicitor1Page } = this.defendantResponsePageFactory;
      await draftDirectionsDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
      await draftDirectionsDefendantSolicitor1Page.uploadEvidence();
      await draftDirectionsDefendantSolicitor1Page.submit();

      const { requestedCourtDefendantSolicitor1Page } = this.defendantResponsePageFactory;
      await requestedCourtDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
      await requestedCourtDefendantSolicitor1Page.selectCourtLocation();
      await requestedCourtDefendantSolicitor1Page.enterPreferredCourtReason();
      await requestedCourtDefendantSolicitor1Page.selectNoRemoteHearing();
      await requestedCourtDefendantSolicitor1Page.submit();

      const { hearingSupportDefendantSolicitor1Page } = this.defendantResponsePageFactory;
      await hearingSupportDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
      await hearingSupportDefendantSolicitor1Page.selectYes();
      await hearingSupportDefendantSolicitor1Page.enterSupportRequirementsAdditional();
      await hearingSupportDefendantSolicitor1Page.submit();

      const { vulnerabilityQuestionsDefendantSolicitor1Page } = this.defendantResponsePageFactory;
      await vulnerabilityQuestionsDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
      await vulnerabilityQuestionsDefendantSolicitor1Page.selectYes();
      await vulnerabilityQuestionsDefendantSolicitor1Page.enterVulnerabilityAdjustments();
      await vulnerabilityQuestionsDefendantSolicitor1Page.submit();

      const { furtherInformationDefendantSolicitor1Page } = this.defendantResponsePageFactory;
      await furtherInformationDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
      await furtherInformationDefendantSolicitor1Page.selectYes();
      await furtherInformationDefendantSolicitor1Page.enterFurtherInformation();
      await furtherInformationDefendantSolicitor1Page.submit();
  }

  async processDefendantSolicitor1FinalPages(){
      const { statementOfTruthDefendantResponseDefendantSolicitor1Page } =
        this.defendantResponsePageFactory;
      await statementOfTruthDefendantResponseDefendantSolicitor1Page.verifyContent(this.ccdCaseData);
      await statementOfTruthDefendantResponseDefendantSolicitor1Page.enterDetails();
      await statementOfTruthDefendantResponseDefendantSolicitor1Page.submit();

      await this.submitDefendantResponsePage();
  }

  private async submitDefendantResponsePage() {
    const { submitDefendantResponsePage } = this.defendantResponsePageFactory;
    await submitDefendantResponsePage.verifyContent(this.ccdCaseData);
    await submitDefendantResponsePage.submit();
  }

  async confirmDefendantResponsePage() {
    const { confirmDefendantResponsePage } = this.defendantResponsePageFactory;
    await confirmDefendantResponsePage.verifyContent(this.ccdCaseData);
    await confirmDefendantResponsePage.submit();
  }

  async confirm1v2DSDefendantResponsePage() {
    const { confirm1v2DSDefendantResponsePage } = this.defendantResponsePageFactory;
    await confirm1v2DSDefendantResponsePage.verifyContent(this.ccdCaseData);
    await confirm1v2DSDefendantResponsePage.submit();
  }
}
