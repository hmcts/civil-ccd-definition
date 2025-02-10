import TestData from '../../../../../models/test-data.ts';
import partys from '../../../../../constants/partys.ts';

import BaseAction from '../../../../../base/base-test-data.ts';
import DefendantResponsePageFactory from '../../../../../pages/exui/claimant-defendant-solicitor/response/defendant-response/defendant-response-page-factory.ts';

export default class DefendantResponseActions extends BaseAction {
  private defendantResponsePageFactory: DefendantResponsePageFactory;

  constructor(defendantResponsePageFactory: DefendantResponsePageFactory, testData: TestData) {
    super(testData);
    this.defendantResponsePageFactory = defendantResponsePageFactory;
  }

  async confirmDetailsPage() {
    const { confirmDetailsPage } = this.defendantResponsePageFactory;
    await confirmDetailsPage.verifyContent(this.ccdCaseData);
    await confirmDetailsPage.submit();
  }

  async singleResponsePage() {
    const { singleResponsePage } = this.defendantResponsePageFactory;
    await singleResponsePage.verifyContent(this.ccdCaseData);
    await singleResponsePage.selectYes();
    await singleResponsePage.submit();
  }

  async respondentResponseTypeDefendant1Page() {
    const { respondentResponseTypeDefendant1Page } = this.defendantResponsePageFactory;
    await respondentResponseTypeDefendant1Page.verifyContent(this.ccdCaseData);
    await respondentResponseTypeDefendant1Page.selectRejectAll();
    await respondentResponseTypeDefendant1Page.submit();
  }

  async respondentResponseType2v1Page() {
    const { respondentResponseType2v1Page } = this.defendantResponsePageFactory;
    await respondentResponseType2v1Page.verifyContent(this.ccdCaseData);
    await respondentResponseType2v1Page.selectRejectAll();
    await respondentResponseType2v1Page.submit();
  }

  async respondentResponseTypeDefendant2Page() {
    const { respondentResponseTypeDefendant2Page } = this.defendantResponsePageFactory;
    await respondentResponseTypeDefendant2Page.verifyContent(this.ccdCaseData);
    await respondentResponseTypeDefendant2Page.selectRejectAll();
    await respondentResponseTypeDefendant2Page.submit();
  }

  async solicitorReferencesDefendantResponseDefendant1Page() {
    const { solicitorReferencesDefendantResponseDefendant1Page } =
      this.defendantResponsePageFactory;
    await solicitorReferencesDefendantResponseDefendant1Page.verifyContent(this.ccdCaseData);
    await solicitorReferencesDefendantResponseDefendant1Page.enterReference();
    await solicitorReferencesDefendantResponseDefendant1Page.submit();
  }

  async solicitorReferencesDefendantResponseDefendant2Page() {
    const { solicitorReferencesDefendantResponseDefendant2Page } =
      this.defendantResponsePageFactory;
    await solicitorReferencesDefendantResponseDefendant2Page.verifyContent(this.ccdCaseData);
    await solicitorReferencesDefendantResponseDefendant2Page.enterReference();
    await solicitorReferencesDefendantResponseDefendant2Page.submit();
  }

  async uploadDefendantResponseDefendant1Page() {
    const { uploadDefendantResponseDefendant1Page } = this.defendantResponsePageFactory;
    await uploadDefendantResponseDefendant1Page.verifyContent(this.ccdCaseData);
    await uploadDefendantResponseDefendant1Page.uploadDefence();
    await uploadDefendantResponseDefendant1Page.submit();
  }

  async uploadDefendantResponseDefendant2Page() {
    const { uploadDefendantResponseDefendant2Page } = this.defendantResponsePageFactory;
    await uploadDefendantResponseDefendant2Page.verifyContent(this.ccdCaseData);
    await uploadDefendantResponseDefendant2Page.uploadDefence();
    await uploadDefendantResponseDefendant2Page.submit();
  }

  async fileDirectionsQuestionaireDefendant1Page() {
    const { fileDirectionsQuestionaireDefendant1Page } = this.defendantResponsePageFactory;
    await fileDirectionsQuestionaireDefendant1Page.verifyContent(this.ccdCaseData);
    await fileDirectionsQuestionaireDefendant1Page.enterDetails();
    await fileDirectionsQuestionaireDefendant1Page.submit();
  }

  async fileDirectionsQuestionaireDefendant2Page() {
    const { fileDirectionsQuestionaireDefendant2Page } = this.defendantResponsePageFactory;
    await fileDirectionsQuestionaireDefendant2Page.verifyContent(this.ccdCaseData);
    await fileDirectionsQuestionaireDefendant2Page.enterDetails();
    await fileDirectionsQuestionaireDefendant2Page.submit();
  }

  async fixedRecoverableCostsPageDefendant1() {
    const { fixedRecoverableCostsPageDefendant1 } = this.defendantResponsePageFactory;
    await fixedRecoverableCostsPageDefendant1.verifyContent(this.ccdCaseData);
    await fixedRecoverableCostsPageDefendant1.selectYes();
    await fixedRecoverableCostsPageDefendant1.submit();
  }

  async fixedRecoverableCostsPageDefendant2() {
    const { fixedRecoverableCostsPageDefendant2 } = this.defendantResponsePageFactory;
    await fixedRecoverableCostsPageDefendant2.verifyContent(this.ccdCaseData);
    await fixedRecoverableCostsPageDefendant2.selectYes();
    await fixedRecoverableCostsPageDefendant2.submit();
  }

  async disclosureOfNonElectronicDocumentsDefendant1Page() {
    const { disclosureOfNonElectronicDocumentsDefendant1Page } = this.defendantResponsePageFactory;
    await disclosureOfNonElectronicDocumentsDefendant1Page.verifyContent(this.ccdCaseData);
    await disclosureOfNonElectronicDocumentsDefendant1Page.enterDetails();
    await disclosureOfNonElectronicDocumentsDefendant1Page.submit();
  }

  async disclosureOfNonElectronicDocumentsDefendant2Page() {
    const { disclosureOfNonElectronicDocumentsDefendant2Page } = this.defendantResponsePageFactory;
    await disclosureOfNonElectronicDocumentsDefendant2Page.verifyContent(this.ccdCaseData);
    await disclosureOfNonElectronicDocumentsDefendant2Page.enterDetails();
    await disclosureOfNonElectronicDocumentsDefendant2Page.submit();
  }

  async expertsDefendant1Page() {
    const { expertsDefendant1Page } = this.defendantResponsePageFactory;
    await expertsDefendant1Page.verifyContent(this.ccdCaseData);
    await expertsDefendant1Page.useExperts();
    await expertsDefendant1Page.addNewExpert();
    await expertsDefendant1Page.enterExpertDetails(partys.CLAIMANT_EXPERT_1);
    await expertsDefendant1Page.submit();
  }

  async expertsDefendant2Page() {
    const { expertsDefendant2Page } = this.defendantResponsePageFactory;
    await expertsDefendant2Page.verifyContent(this.ccdCaseData);
    await expertsDefendant2Page.useExperts();
    await expertsDefendant2Page.addNewExpert();
    await expertsDefendant2Page.enterExpertDetails(partys.CLAIMANT_EXPERT_1);
    await expertsDefendant2Page.submit();
  }

  async witnessesDefendant1Page() {
    const { witnessesDefendant1Page } = this.defendantResponsePageFactory;
    await witnessesDefendant1Page.verifyContent(this.ccdCaseData);
    await witnessesDefendant1Page.selectYesWitnesses();
    await witnessesDefendant1Page.addWitness();
    await witnessesDefendant1Page.enterWitnessDetails(partys.DEFENDANT_1_WITNESS_1);
    await witnessesDefendant1Page.submit();
  }

  async witnessesDefendant2Page() {
    const { witnessesDefendant2Page } = this.defendantResponsePageFactory;
    await witnessesDefendant2Page.verifyContent(this.ccdCaseData);
    await witnessesDefendant2Page.selectYesWitnesses();
    await witnessesDefendant2Page.addWitness();
    await witnessesDefendant2Page.enterWitnessDetails(partys.DEFENDANT_1_WITNESS_1);
    await witnessesDefendant2Page.submit();
  }

  async languageDefendant1Page() {
    const { languageDefendant1Page } = this.defendantResponsePageFactory;
    await languageDefendant1Page.verifyContent(this.ccdCaseData);
    await languageDefendant1Page.selectEnglishAndWelsh();
    await languageDefendant1Page.submit();
  }

  async languageDefendant2Page() {
    const { languageDefendant2Page } = this.defendantResponsePageFactory;
    await languageDefendant2Page.verifyContent(this.ccdCaseData);
    await languageDefendant2Page.selectEnglishAndWelsh();
    await languageDefendant2Page.submit();
  }

  async hearingDefendant1Page() {
    const { hearingDefendant1Page } = this.defendantResponsePageFactory;
    await hearingDefendant1Page.verifyContent(this.ccdCaseData);
    await hearingDefendant1Page.selectYesAvailabilityRequired();
    await hearingDefendant1Page.addNewUnavailableDate();
    await hearingDefendant1Page.selectSingleDate(1);
    await hearingDefendant1Page.submit();
  }

  async hearingDefendant2Page() {
    const { hearingDefendant2Page } = this.defendantResponsePageFactory;
    await hearingDefendant2Page.verifyContent(this.ccdCaseData);
    await hearingDefendant2Page.selectYesAvailabilityRequired();
    await hearingDefendant2Page.addNewUnavailableDate();
    await hearingDefendant2Page.selectSingleDate(1);
    await hearingDefendant2Page.submit();
  }

  async draftDirectionsDefendant1Page() {
    const { draftDirectionsDefendant1Page } = this.defendantResponsePageFactory;
    await draftDirectionsDefendant1Page.verifyContent(this.ccdCaseData);
    await draftDirectionsDefendant1Page.uploadEvidence();
    await draftDirectionsDefendant1Page.submit();
  }

  async draftDirectionsDefendant2Page() {
    const { draftDirectionsDefendant2Page } = this.defendantResponsePageFactory;
    await draftDirectionsDefendant2Page.verifyContent(this.ccdCaseData);
    await draftDirectionsDefendant2Page.uploadEvidence();
    await draftDirectionsDefendant2Page.submit();
  }

  async requestedCourtDefendant1Page() {
    const { requestedCourtDefendant1Page } = this.defendantResponsePageFactory;
    await requestedCourtDefendant1Page.verifyContent(this.ccdCaseData);
    await requestedCourtDefendant1Page.selectCourtLocation();
    await requestedCourtDefendant1Page.enterPreferredCourtReason();
    await requestedCourtDefendant1Page.selectNoRemoteHearing();
    await requestedCourtDefendant1Page.submit();
  }

  async requestedCourtDefendant2Page() {
    const { requestedCourtDefendant2Page } = this.defendantResponsePageFactory;
    await requestedCourtDefendant2Page.verifyContent(this.ccdCaseData);
    await requestedCourtDefendant2Page.selectCourtLocation();
    await requestedCourtDefendant2Page.enterPreferredCourtReason();
    await requestedCourtDefendant2Page.selectNoRemoteHearing();
    await requestedCourtDefendant2Page.submit();
  }

  async hearingSupportDefendant1Page() {
    const { hearingSupportDefendant1Page } = this.defendantResponsePageFactory;
    await hearingSupportDefendant1Page.verifyContent(this.ccdCaseData);
    await hearingSupportDefendant1Page.selectYes();
    await hearingSupportDefendant1Page.enterSupportRequirementsAdditional();
    await hearingSupportDefendant1Page.submit();
  }

  async hearingSupportDefendant2Page() {
    const { hearingSupportDefendant2Page } = this.defendantResponsePageFactory;
    await hearingSupportDefendant2Page.verifyContent(this.ccdCaseData);
    await hearingSupportDefendant2Page.selectYes();
    await hearingSupportDefendant2Page.enterSupportRequirementsAdditional();
    await hearingSupportDefendant2Page.submit();
  }

  async vulnerabilityQuestionsDefendant1Page() {
    const { vulnerabilityQuestionsDefendant1Page } = this.defendantResponsePageFactory;
    await vulnerabilityQuestionsDefendant1Page.verifyContent(this.ccdCaseData);
    await vulnerabilityQuestionsDefendant1Page.selectYes();
    await vulnerabilityQuestionsDefendant1Page.enterVulnerabilityAdjustments();
    await vulnerabilityQuestionsDefendant1Page.submit();
  }

  async vulnerabilityQuestionsDefendant2Page() {
    const { vulnerabilityQuestionsDefendant2Page } = this.defendantResponsePageFactory;
    await vulnerabilityQuestionsDefendant2Page.verifyContent(this.ccdCaseData);
    await vulnerabilityQuestionsDefendant2Page.selectYes();
    await vulnerabilityQuestionsDefendant2Page.enterVulnerabilityAdjustments();
    await vulnerabilityQuestionsDefendant2Page.submit();
  }

  async furtherInformationDefendant1Page() {
    const { furtherInformationDefendant1Page } = this.defendantResponsePageFactory;
    await furtherInformationDefendant1Page.verifyContent(this.ccdCaseData);
    await furtherInformationDefendant1Page.selectYes();
    await furtherInformationDefendant1Page.enterFurtherInformation();
    await furtherInformationDefendant1Page.submit();
  }

  async furtherInformationDefendant2Page() {
    const { furtherInformationDefendant2Page } = this.defendantResponsePageFactory;
    await furtherInformationDefendant2Page.verifyContent(this.ccdCaseData);
    await furtherInformationDefendant2Page.selectYes();
    await furtherInformationDefendant2Page.enterFurtherInformation();
    await furtherInformationDefendant2Page.submit();
  }

  async statementOfTruthDefendantResponseDefendant1Page() {
    const { statementOfTruthDefendantResponseDefendant1Page } = this.defendantResponsePageFactory;
    await statementOfTruthDefendantResponseDefendant1Page.verifyContent(this.ccdCaseData);
    await statementOfTruthDefendantResponseDefendant1Page.enterDetails();
    await statementOfTruthDefendantResponseDefendant1Page.submit();
  }

  async statementOfTruthDefendantResponseDefendant2Page() {
    const { statementOfTruthDefendantResponseDefendant2Page } = this.defendantResponsePageFactory;
    await statementOfTruthDefendantResponseDefendant2Page.verifyContent(this.ccdCaseData);
    await statementOfTruthDefendantResponseDefendant2Page.enterDetails();
    await statementOfTruthDefendantResponseDefendant2Page.submit();
  }

  async submitDefendantResponsePage() {
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
