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

  async FastTrackFullDefenceDefendant1() {}

  async SmallTrackFullDefenceDefendant1() {
    await this.retryExuiEvent(
      async () => {
        const { confirmDetailsPage } = this.defendantResponsePageFactory;
        await confirmDetailsPage.verifyContent(this.ccdCaseData);
        await confirmDetailsPage.submit();

        const { respondentResponseTypeDefendant1Page } = this.defendantResponsePageFactory;
        await respondentResponseTypeDefendant1Page.verifyContent(this.ccdCaseData);
        await respondentResponseTypeDefendant1Page.selectRejectAll();
        await respondentResponseTypeDefendant1Page.submit();

        const { solicitorReferencesDefendantResponseDefendant1Page } =
          this.defendantResponsePageFactory;
        await solicitorReferencesDefendantResponseDefendant1Page.verifyContent(this.ccdCaseData);
        await solicitorReferencesDefendantResponseDefendant1Page.enterReference();
        await solicitorReferencesDefendantResponseDefendant1Page.submit();

        const { uploadDefendantResponseDefendant1Page } = this.defendantResponsePageFactory;
        await uploadDefendantResponseDefendant1Page.verifyContent(this.ccdCaseData);
        await uploadDefendantResponseDefendant1Page.uploadDefence();
        await uploadDefendantResponseDefendant1Page.submit();

        const { expertsDefendant1Page } = this.defendantResponsePageFactory;
        await expertsDefendant1Page.verifyContent(this.ccdCaseData);
        await expertsDefendant1Page.useExperts();
        await expertsDefendant1Page.addNewExpert();
        await expertsDefendant1Page.enterExpertDetails(partys.CLAIMANT_EXPERT_1);
        await expertsDefendant1Page.submit();

        const { witnessesDefendant1Page } = this.defendantResponsePageFactory;
        await witnessesDefendant1Page.verifyContent(this.ccdCaseData);
        await witnessesDefendant1Page.selectYesWitnesses();
        await witnessesDefendant1Page.addWitness();
        await witnessesDefendant1Page.enterWitnessDetails(partys.DEFENDANT_1_WITNESS_1);
        await witnessesDefendant1Page.submit();

        const { languageDefendant1Page } = this.defendantResponsePageFactory;
        await languageDefendant1Page.verifyContent(this.ccdCaseData);
        await languageDefendant1Page.selectEnglishAndWelsh();
        await languageDefendant1Page.submit();

        const { hearingDefendant1Page } = this.defendantResponsePageFactory;
        await hearingDefendant1Page.verifyContent(this.ccdCaseData);
        await hearingDefendant1Page.selectYesAvailabilityRequired();
        await hearingDefendant1Page.addNewUnavailableDate();
        await hearingDefendant1Page.selectSingleDate(1);
        await hearingDefendant1Page.submit();

        const { draftDirectionsDefendant1Page } = this.defendantResponsePageFactory;
        await draftDirectionsDefendant1Page.verifyContent(this.ccdCaseData);
        await draftDirectionsDefendant1Page.uploadEvidence();
        await draftDirectionsDefendant1Page.submit();

        const { requestedCourtDefendant1Page } = this.defendantResponsePageFactory;
        await requestedCourtDefendant1Page.verifyContent(this.ccdCaseData);
        await requestedCourtDefendant1Page.selectCourtLocation();
        await requestedCourtDefendant1Page.enterPreferredCourtReason();
        await requestedCourtDefendant1Page.selectNoRemoteHearing();
        await requestedCourtDefendant1Page.submit();

        const { hearingSupportDefendant1Page } = this.defendantResponsePageFactory;
        await hearingSupportDefendant1Page.verifyContent(this.ccdCaseData);
        await hearingSupportDefendant1Page.selectYes();
        await hearingSupportDefendant1Page.enterSupportRequirementsAdditional();
        await hearingSupportDefendant1Page.submit();

        const { vulnerabilityQuestionsDefendant1Page } = this.defendantResponsePageFactory;
        await vulnerabilityQuestionsDefendant1Page.verifyContent(this.ccdCaseData);
        await vulnerabilityQuestionsDefendant1Page.selectYes();
        await vulnerabilityQuestionsDefendant1Page.enterVulnerabilityAdjustments();
        await vulnerabilityQuestionsDefendant1Page.submit();

        const { furtherInformationDefendant1Page } = this.defendantResponsePageFactory;
        await furtherInformationDefendant1Page.verifyContent(this.ccdCaseData);
        await furtherInformationDefendant1Page.selectYes();
        await furtherInformationDefendant1Page.enterFurtherInformation();
        await furtherInformationDefendant1Page.submit();

        const { statementOfTruthDefendantResponseDefendant1Page } =
          this.defendantResponsePageFactory;
        await statementOfTruthDefendantResponseDefendant1Page.verifyContent(this.ccdCaseData);
        await statementOfTruthDefendantResponseDefendant1Page.enterDetails();
        await statementOfTruthDefendantResponseDefendant1Page.submit();

        const { submitDefendantResponsePage } = this.defendantResponsePageFactory;
        await submitDefendantResponsePage.verifyContent(this.ccdCaseData);
        await submitDefendantResponsePage.submit();

        const { confirmDefendantResponsePage } = this.defendantResponsePageFactory;
        await confirmDefendantResponsePage.verifyContent(this.ccdCaseData);
        await confirmDefendantResponsePage.submit();
      },
      ccdEvents.DEFENDANT_RESPONSE,
      defendantSolicitor1User,
      { retries: 0 },
    );
  }

  async SmallTrackFullDefence1v2DSDefendant1() {
    await this.retryExuiEvent(
      async () => {
        const { confirmDetailsPage } = this.defendantResponsePageFactory;
        await confirmDetailsPage.verifyContent(this.ccdCaseData);
        await confirmDetailsPage.submit();

        const { respondentResponseTypeDefendant1Page } = this.defendantResponsePageFactory;
        await respondentResponseTypeDefendant1Page.verifyContent(this.ccdCaseData);
        await respondentResponseTypeDefendant1Page.selectRejectAll();
        await respondentResponseTypeDefendant1Page.submit();

        const { solicitorReferencesDefendantResponseDefendant1Page } =
          this.defendantResponsePageFactory;
        await solicitorReferencesDefendantResponseDefendant1Page.verifyContent(this.ccdCaseData);
        await solicitorReferencesDefendantResponseDefendant1Page.enterReference();
        await solicitorReferencesDefendantResponseDefendant1Page.submit();

        const { uploadDefendantResponseDefendant1Page } = this.defendantResponsePageFactory;
        await uploadDefendantResponseDefendant1Page.verifyContent(this.ccdCaseData);
        await uploadDefendantResponseDefendant1Page.uploadDefence();
        await uploadDefendantResponseDefendant1Page.submit();

        const { expertsDefendant1Page } = this.defendantResponsePageFactory;
        await expertsDefendant1Page.verifyContent(this.ccdCaseData);
        await expertsDefendant1Page.useExperts();
        await expertsDefendant1Page.addNewExpert();
        await expertsDefendant1Page.enterExpertDetails(partys.CLAIMANT_EXPERT_1);
        await expertsDefendant1Page.submit();

        const { witnessesDefendant1Page } = this.defendantResponsePageFactory;
        await witnessesDefendant1Page.verifyContent(this.ccdCaseData);
        await witnessesDefendant1Page.selectYesWitnesses();
        await witnessesDefendant1Page.addWitness();
        await witnessesDefendant1Page.enterWitnessDetails(partys.DEFENDANT_1_WITNESS_1);
        await witnessesDefendant1Page.submit();

        const { languageDefendant1Page } = this.defendantResponsePageFactory;
        await languageDefendant1Page.verifyContent(this.ccdCaseData);
        await languageDefendant1Page.selectEnglishAndWelsh();
        await languageDefendant1Page.submit();

        const { hearingDefendant1Page } = this.defendantResponsePageFactory;
        await hearingDefendant1Page.verifyContent(this.ccdCaseData);
        await hearingDefendant1Page.selectYesAvailabilityRequired();
        await hearingDefendant1Page.addNewUnavailableDate();
        await hearingDefendant1Page.selectSingleDate(1);
        await hearingDefendant1Page.submit();

        const { draftDirectionsDefendant1Page } = this.defendantResponsePageFactory;
        await draftDirectionsDefendant1Page.verifyContent(this.ccdCaseData);
        await draftDirectionsDefendant1Page.uploadEvidence();
        await draftDirectionsDefendant1Page.submit();

        const { requestedCourtDefendant1Page } = this.defendantResponsePageFactory;
        await requestedCourtDefendant1Page.verifyContent(this.ccdCaseData);
        await requestedCourtDefendant1Page.selectCourtLocation();
        await requestedCourtDefendant1Page.enterPreferredCourtReason();
        await requestedCourtDefendant1Page.selectNoRemoteHearing();
        await requestedCourtDefendant1Page.submit();

        const { hearingSupportDefendant1Page } = this.defendantResponsePageFactory;
        await hearingSupportDefendant1Page.verifyContent(this.ccdCaseData);
        await hearingSupportDefendant1Page.selectYes();
        await hearingSupportDefendant1Page.enterSupportRequirementsAdditional();
        await hearingSupportDefendant1Page.submit();

        const { vulnerabilityQuestionsDefendant1Page } = this.defendantResponsePageFactory;
        await vulnerabilityQuestionsDefendant1Page.verifyContent(this.ccdCaseData);
        await vulnerabilityQuestionsDefendant1Page.selectYes();
        await vulnerabilityQuestionsDefendant1Page.enterVulnerabilityAdjustments();
        await vulnerabilityQuestionsDefendant1Page.submit();

        const { furtherInformationDefendant1Page } = this.defendantResponsePageFactory;
        await furtherInformationDefendant1Page.verifyContent(this.ccdCaseData);
        await furtherInformationDefendant1Page.selectYes();
        await furtherInformationDefendant1Page.enterFurtherInformation();
        await furtherInformationDefendant1Page.submit();

        const { statementOfTruthDefendantResponseDefendant1Page } =
          this.defendantResponsePageFactory;
        await statementOfTruthDefendantResponseDefendant1Page.verifyContent(this.ccdCaseData);
        await statementOfTruthDefendantResponseDefendant1Page.enterDetails();
        await statementOfTruthDefendantResponseDefendant1Page.submit();

        const { submitDefendantResponsePage } = this.defendantResponsePageFactory;
        await submitDefendantResponsePage.verifyContent(this.ccdCaseData);
        await submitDefendantResponsePage.submit();

        const { confirm1v2DSDefendantResponsePage } = this.defendantResponsePageFactory;
        await confirm1v2DSDefendantResponsePage.verifyContent(this.ccdCaseData);
        await confirm1v2DSDefendantResponsePage.submit();
      },
      ccdEvents.DEFENDANT_RESPONSE,
      defendantSolicitor1User,
      { retries: 0 },
    );
  }

  async SmallTrackFullDefence1v2DSDefendant2() {
    await this.retryExuiEvent(
      async () => {
        const { confirmDetailsPage } = this.defendantResponsePageFactory;
        await confirmDetailsPage.verifyContent(this.ccdCaseData);
        await confirmDetailsPage.submit();

        const { respondentResponseTypeDefendant2Page } = this.defendantResponsePageFactory;
        await respondentResponseTypeDefendant2Page.verifyContent(this.ccdCaseData);
        await respondentResponseTypeDefendant2Page.selectRejectAll();
        await respondentResponseTypeDefendant2Page.submit();

        const { solicitorReferencesDefendantResponseDefendant2Page } =
          this.defendantResponsePageFactory;
        await solicitorReferencesDefendantResponseDefendant2Page.verifyContent(this.ccdCaseData);
        await solicitorReferencesDefendantResponseDefendant2Page.enterReference();
        await solicitorReferencesDefendantResponseDefendant2Page.submit();

        const { uploadDefendantResponseDefendant2Page } = this.defendantResponsePageFactory;
        await uploadDefendantResponseDefendant2Page.verifyContent(this.ccdCaseData);
        await uploadDefendantResponseDefendant2Page.uploadDefence();
        await uploadDefendantResponseDefendant2Page.submit();

        const { expertsDefendant2Page } = this.defendantResponsePageFactory;
        await expertsDefendant2Page.verifyContent(this.ccdCaseData);
        await expertsDefendant2Page.useExperts();
        await expertsDefendant2Page.addNewExpert();
        await expertsDefendant2Page.enterExpertDetails(partys.CLAIMANT_EXPERT_1);
        await expertsDefendant2Page.submit();

        const { witnessesDefendant2Page } = this.defendantResponsePageFactory;
        await witnessesDefendant2Page.verifyContent(this.ccdCaseData);
        await witnessesDefendant2Page.selectYesWitnesses();
        await witnessesDefendant2Page.addWitness();
        await witnessesDefendant2Page.enterWitnessDetails(partys.DEFENDANT_1_WITNESS_1);
        await witnessesDefendant2Page.submit();

        const { languageDefendant2Page } = this.defendantResponsePageFactory;
        await languageDefendant2Page.verifyContent(this.ccdCaseData);
        await languageDefendant2Page.selectEnglishAndWelsh();
        await languageDefendant2Page.submit();

        const { hearingDefendant2Page } = this.defendantResponsePageFactory;
        await hearingDefendant2Page.verifyContent(this.ccdCaseData);
        await hearingDefendant2Page.selectYesAvailabilityRequired();
        await hearingDefendant2Page.addNewUnavailableDate();
        await hearingDefendant2Page.selectSingleDate(1);
        await hearingDefendant2Page.submit();

        const { draftDirectionsDefendant2Page } = this.defendantResponsePageFactory;
        await draftDirectionsDefendant2Page.verifyContent(this.ccdCaseData);
        await draftDirectionsDefendant2Page.uploadEvidence();
        await draftDirectionsDefendant2Page.submit();

        const { requestedCourtDefendant2Page } = this.defendantResponsePageFactory;
        await requestedCourtDefendant2Page.verifyContent(this.ccdCaseData);
        await requestedCourtDefendant2Page.selectCourtLocation();
        await requestedCourtDefendant2Page.enterPreferredCourtReason();
        await requestedCourtDefendant2Page.selectNoRemoteHearing();
        await requestedCourtDefendant2Page.submit();

        const { hearingSupportDefendant2Page } = this.defendantResponsePageFactory;
        await hearingSupportDefendant2Page.verifyContent(this.ccdCaseData);
        await hearingSupportDefendant2Page.selectYes();
        await hearingSupportDefendant2Page.enterSupportRequirementsAdditional();
        await hearingSupportDefendant2Page.submit();

        const { vulnerabilityQuestionsDefendant2Page } = this.defendantResponsePageFactory;
        await vulnerabilityQuestionsDefendant2Page.verifyContent(this.ccdCaseData);
        await vulnerabilityQuestionsDefendant2Page.selectYes();
        await vulnerabilityQuestionsDefendant2Page.enterVulnerabilityAdjustments();
        await vulnerabilityQuestionsDefendant2Page.submit();

        const { furtherInformationDefendant2Page } = this.defendantResponsePageFactory;
        await furtherInformationDefendant2Page.verifyContent(this.ccdCaseData);
        await furtherInformationDefendant2Page.selectYes();
        await furtherInformationDefendant2Page.enterFurtherInformation();
        await furtherInformationDefendant2Page.submit();

        const { statementOfTruthDefendantResponseDefendant2Page } =
          this.defendantResponsePageFactory;
        await statementOfTruthDefendantResponseDefendant2Page.verifyContent(this.ccdCaseData);
        await statementOfTruthDefendantResponseDefendant2Page.enterDetails();
        await statementOfTruthDefendantResponseDefendant2Page.submit();

        const { submitDefendantResponsePage } = this.defendantResponsePageFactory;
        await submitDefendantResponsePage.verifyContent(this.ccdCaseData);
        await submitDefendantResponsePage.submit();

        const { confirmDefendantResponsePage } = this.defendantResponsePageFactory;
        await confirmDefendantResponsePage.verifyContent(this.ccdCaseData);
        await confirmDefendantResponsePage.submit();
      },
      ccdEvents.DEFENDANT_RESPONSE,
      defendantSolicitor2User,
      { retries: 0 },
    );
  }
}
