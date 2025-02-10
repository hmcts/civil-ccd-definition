import test from 'node:test';
import ClaimantSolicitorActionsFactory from '../../../actions/ui/exui/claimant-solicitor/claimant-solcitor-actions-factory';
import ExuiDashboardActions from '../../../actions/ui/exui/common/exui-dashboard-actions';
import IdamActions from '../../../actions/ui/idam/idam-actions';
import BaseExuiSteps from '../../../base/base-exui-steps';
import { claimantSolicitorUser } from '../../../config/users/exui-users';
import ccdEvents from '../../../constants/ccd-events';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-data';

@AllMethodsStep()
export default class ClaimantSolicitorSpecSteps extends BaseExuiSteps {
  private claimantSolicitorActionsFactory: ClaimantSolicitorActionsFactory;

  constructor(
    exuiDashboardActions: ExuiDashboardActions,
    idamActions: IdamActions,
    claimantSolicitorActionsFactory: ClaimantSolicitorActionsFactory,
    testData: TestData,
  ) {
    super(exuiDashboardActions, idamActions, testData);
    this.claimantSolicitorActionsFactory = claimantSolicitorActionsFactory;
  }

  async Login() {
    await super.idamActions.exuiLogin(claimantSolicitorUser);
  }

  async CreateClaimFastTrack1v1() {
    await super.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { createClaimSpecActions } = this.claimantSolicitorActionsFactory;
        await createClaimSpecActions.caseFilterPage();
        await createClaimSpecActions.checklistPage();
        await createClaimSpecActions.eligibiltySpecPage();
        await createClaimSpecActions.referencesPage();
        await createClaimSpecActions.claimant1Page();
        await createClaimSpecActions.noAddClaimant2();
        await createClaimSpecActions.notificationsPage();
        await createClaimSpecActions.claimantSolicitorOrganisationPage();
        await createClaimSpecActions.specCorrespondenceAddressPage();
        await createClaimSpecActions.defendantPage();
        await createClaimSpecActions.legalRepresentationSpecPage();
        await createClaimSpecActions.defendantSolicitorOrganisationSpecPage();
        await createClaimSpecActions.defendantSolicitorEmailSpecPage();
        await createClaimSpecActions.respondentCorrespondenceAddressPage();
        await createClaimSpecActions.addDefendant2No();
        await createClaimSpecActions.flightDelayClaimPage();
        await createClaimSpecActions.detailsSpecPage();
        await createClaimSpecActions.uploadClaimDocumentPage();
        await createClaimSpecActions.claimTimeLineUploadPage();
        await createClaimSpecActions.evidenceListPage();
        await createClaimSpecActions.claimAmountFastTrackPage();
        await createClaimSpecActions.claimAmountDetailsFastTrackPage();
        await createClaimSpecActions.claimInterestPage();
        await createClaimSpecActions.interestSummaryFastTrackPage();
        await createClaimSpecActions.pbaNumberPage();
        await createClaimSpecActions.fixedCommencementCostsPage();
        await createClaimSpecActions.statementOfTruthCreateClaimPage();
        await createClaimSpecActions.submitCreateClaimPage();
        await createClaimSpecActions.confirmCreateClaimSpecPage();
      },
      ccdEvents.CREATE_CLAIM_SPEC,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async CreateClaimSmallTrack1v1() {
    await super.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { createClaimSpecActions } = this.claimantSolicitorActionsFactory;

        await createClaimSpecActions.caseFilterPage();
        await createClaimSpecActions.checklistPage();
        await createClaimSpecActions.eligibiltySpecPage();
        await createClaimSpecActions.referencesPage();
        await createClaimSpecActions.claimant1Page();
        await createClaimSpecActions.noAddClaimant2();
        await createClaimSpecActions.notificationsPage();
        await createClaimSpecActions.claimantSolicitorOrganisationPage();
        await createClaimSpecActions.specCorrespondenceAddressPage();
        await createClaimSpecActions.defendantPage();
        await createClaimSpecActions.legalRepresentationSpecPage();
        await createClaimSpecActions.defendantSolicitorOrganisationSpecPage();
        await createClaimSpecActions.defendantSolicitorEmailSpecPage();
        await createClaimSpecActions.respondentCorrespondenceAddressPage();
        await createClaimSpecActions.addDefendant2No();
        await createClaimSpecActions.flightDelayClaimPage();
        await createClaimSpecActions.detailsSpecPage();
        await createClaimSpecActions.uploadClaimDocumentPage();
        await createClaimSpecActions.claimTimeLineUploadPage();
        await createClaimSpecActions.evidenceListPage();
        await createClaimSpecActions.claimAmountSmallTrackPage();
        await createClaimSpecActions.claimAmountDetailsSmallTrackPage();
        await createClaimSpecActions.claimInterestPage();
        await createClaimSpecActions.claimInterestSummarySmallTrackPage();
        await createClaimSpecActions.pbaNumberPage();
        await createClaimSpecActions.fixedCommencementCostsPage();
        await createClaimSpecActions.statementOfTruthCreateClaimPage();
        await createClaimSpecActions.submitCreateClaimPage();
        await createClaimSpecActions.confirmCreateClaimSpecPage();
      },
      ccdEvents.CREATE_CLAIM_SPEC,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async CreateClaimSmallTrack2v1() {
    await super.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { createClaimSpecActions } = this.claimantSolicitorActionsFactory;

        await createClaimSpecActions.caseFilterPage();
        await createClaimSpecActions.checklistPage();
        await createClaimSpecActions.eligibiltySpecPage();
        await createClaimSpecActions.referencesPage();
        await createClaimSpecActions.claimant1Page();
        await createClaimSpecActions.addAnotherClaimantPage();
        await createClaimSpecActions.secondClaimantPage();
        await createClaimSpecActions.notificationsPage();
        await createClaimSpecActions.claimantSolicitorOrganisationPage();
        await createClaimSpecActions.specCorrespondenceAddressPage();
        await createClaimSpecActions.defendantPage();
        await createClaimSpecActions.legalRepresentationSpecPage();
        await createClaimSpecActions.defendantSolicitorOrganisationSpecPage();
        await createClaimSpecActions.defendantSolicitorEmailSpecPage();
        await createClaimSpecActions.respondentCorrespondenceAddressPage();
        await createClaimSpecActions.flightDelayClaimPage();
        await createClaimSpecActions.detailsSpecPage();
        await createClaimSpecActions.uploadClaimDocumentPage();
        await createClaimSpecActions.claimTimeLineUploadPage();
        await createClaimSpecActions.evidenceListPage();
        await createClaimSpecActions.claimAmountSmallTrackPage();
        await createClaimSpecActions.claimAmountDetailsSmallTrackPage();
        await createClaimSpecActions.claimInterestPage();
        await createClaimSpecActions.claimInterestSummarySmallTrackPage();
        await createClaimSpecActions.pbaNumberPage();
        await createClaimSpecActions.fixedCommencementCostsPage();
        await createClaimSpecActions.statementOfTruthCreateClaimPage();
        await createClaimSpecActions.submitCreateClaimPage();
        await createClaimSpecActions.confirmCreateClaimSpecPage();
      },
      ccdEvents.CREATE_CLAIM_SPEC,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async CreateClaimSmallTrack1v2SS() {
    await super.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { createClaimSpecActions } = this.claimantSolicitorActionsFactory;

        await createClaimSpecActions.caseFilterPage();
        await createClaimSpecActions.checklistPage();
        await createClaimSpecActions.eligibiltySpecPage();
        await createClaimSpecActions.referencesPage();
        await createClaimSpecActions.claimant1Page();
        await createClaimSpecActions.noAddClaimant2();
        await createClaimSpecActions.notificationsPage();
        await createClaimSpecActions.claimantSolicitorOrganisationPage();
        await createClaimSpecActions.specCorrespondenceAddressPage();
        await createClaimSpecActions.defendantPage();
        await createClaimSpecActions.legalRepresentationSpecPage();
        await createClaimSpecActions.defendantSolicitorOrganisationSpecPage();
        await createClaimSpecActions.defendantSolicitorEmailSpecPage();
        await createClaimSpecActions.respondentCorrespondenceAddressPage();
        await createClaimSpecActions.addDefendant2Yes();
        await createClaimSpecActions.secondDefendantPage();
        await createClaimSpecActions.legalRepresentationRespondent2Page();
        await createClaimSpecActions.sameLegalRepresentativeSmallClaimPage();
        await createClaimSpecActions.flightDelayClaimPage();
        await createClaimSpecActions.detailsSpecPage();
        await createClaimSpecActions.uploadClaimDocumentPage();
        await createClaimSpecActions.claimTimeLineUploadPage();
        await createClaimSpecActions.evidenceListPage();
        await createClaimSpecActions.claimAmountSmallTrackPage();
        await createClaimSpecActions.claimAmountDetailsSmallTrackPage();
        await createClaimSpecActions.claimInterestPage();
        await createClaimSpecActions.claimInterestSummarySmallTrackPage();
        await createClaimSpecActions.pbaNumberPage();
        await createClaimSpecActions.fixedCommencementCostsPage();
        await createClaimSpecActions.statementOfTruthCreateClaimPage();
        await createClaimSpecActions.submitCreateClaimPage();
        await createClaimSpecActions.confirmCreateClaimSpecPage();
      },
      ccdEvents.CREATE_CLAIM_SPEC,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async CreateClaimSmallTrack1v2DS() {
    await super.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { createClaimSpecActions } = this.claimantSolicitorActionsFactory;

        await createClaimSpecActions.caseFilterPage();
        await createClaimSpecActions.checklistPage();
        await createClaimSpecActions.eligibiltySpecPage();
        await createClaimSpecActions.referencesPage();
        await createClaimSpecActions.claimant1Page();
        await createClaimSpecActions.noAddClaimant2();
        await createClaimSpecActions.notificationsPage();
        await createClaimSpecActions.claimantSolicitorOrganisationPage();
        await createClaimSpecActions.specCorrespondenceAddressPage();
        await createClaimSpecActions.defendantPage();
        await createClaimSpecActions.legalRepresentationSpecPage();
        await createClaimSpecActions.defendantSolicitorOrganisationSpecPage();
        await createClaimSpecActions.defendantSolicitorEmailSpecPage();
        await createClaimSpecActions.respondentCorrespondenceAddressPage();
        await createClaimSpecActions.addDefendant2Yes();
        await createClaimSpecActions.secondDefendantPage();
        await createClaimSpecActions.legalRepresentationRespondent2Page();
        await createClaimSpecActions.differentLegalRepresentativeSmallClaimPage();
        await createClaimSpecActions.secondDefendantSolicitorOrganisationSpecPage();
        await createClaimSpecActions.secondDefendantSolicitorEmailSpecPage();
        await createClaimSpecActions.specRespondent2CorrespondenceAddressPage();
        await createClaimSpecActions.flightDelayClaimPage();
        await createClaimSpecActions.detailsSpecPage();
        await createClaimSpecActions.uploadClaimDocumentPage();
        await createClaimSpecActions.claimTimeLineUploadPage();
        await createClaimSpecActions.evidenceListPage();
        await createClaimSpecActions.claimAmountSmallTrackPage();
        await createClaimSpecActions.claimAmountDetailsSmallTrackPage();
        await createClaimSpecActions.claimInterestPage();
        await createClaimSpecActions.claimInterestSummarySmallTrackPage();
        await createClaimSpecActions.pbaNumberPage();
        await createClaimSpecActions.fixedCommencementCostsPage();
        await createClaimSpecActions.statementOfTruthCreateClaimPage();
        await createClaimSpecActions.submitCreateClaimPage();
        await createClaimSpecActions.confirmCreateClaimSpecPage();
      },
      ccdEvents.CREATE_CLAIM_SPEC,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async RespondFastTrackIntentToProceed1v1() {
    await super.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { claimantResponseSpecActions } = this.claimantSolicitorActionsFactory;
        await claimantResponseSpecActions.respondentResponseSpecPage();
        await claimantResponseSpecActions.defenceDocumentSpecPage();
        await claimantResponseSpecActions.fileDirectionsQuestionairePage();
        await claimantResponseSpecActions.fixedRecoverableCostsPage();
        await claimantResponseSpecActions.disclosureOfElectronicDocumentsPage();
        await claimantResponseSpecActions.disclosureOfNonElectronicDocumentsSpecPage();
        await claimantResponseSpecActions.disclosureReportPage();
        await claimantResponseSpecActions.expertsPage();
        await claimantResponseSpecActions.witnessesPage();
        await claimantResponseSpecActions.languagePage();
        await claimantResponseSpecActions.hearingSpecFastTrackPage();
        await claimantResponseSpecActions.applicantCourtLocationLRSpecPage();
        await claimantResponseSpecActions.hearingSupportPage();
        await claimantResponseSpecActions.vulnerabilityQuestionsSpecPage();
        await claimantResponseSpecActions.applicationsPage();
        await claimantResponseSpecActions.statementOfTruthPage();
        await claimantResponseSpecActions.submitPage();
        await claimantResponseSpecActions.confirmPage();
      },
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async RespondSmallClaimIntentToProceed1v1() {
    await super.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { claimantResponseSpecActions } = this.claimantSolicitorActionsFactory;
        await claimantResponseSpecActions.respondentResponseSpecPage();
        await claimantResponseSpecActions.defenceDocumentSpecPage();
        await claimantResponseSpecActions.mediationContactInformationPage();
        await claimantResponseSpecActions.mediationAvailabilityPage();
        await claimantResponseSpecActions.smallClaimExpertsPage();
        await claimantResponseSpecActions.smallClaimWitnessesPage();
        await claimantResponseSpecActions.languagePage();
        await claimantResponseSpecActions.hearingSpecSmallClaimPage();
        await claimantResponseSpecActions.applicantCourtLocationLRSpecPage();
        await claimantResponseSpecActions.hearingSupportPage();
        await claimantResponseSpecActions.vulnerabilityQuestionsSpecPage();
        await claimantResponseSpecActions.statementOfTruthPage();
        await claimantResponseSpecActions.submitPage();
        await claimantResponseSpecActions.confirmPage();
      },
      ccdEvents.CLAIMANT_RESPONSE,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async SmallClaimIntentToProceed2v1() {
    await super.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { claimantResponseSpecActions } = this.claimantSolicitorActionsFactory;
        await claimantResponseSpecActions.respondentResponse2v1SpecPage();
        await claimantResponseSpecActions.defenceDocumentSpecPage();
        await claimantResponseSpecActions.mediationContactInformationPage();
        await claimantResponseSpecActions.mediationAvailabilityPage();
        await claimantResponseSpecActions.smallClaimExpertsPage();
        await claimantResponseSpecActions.smallClaimWitnessesPage();
        await claimantResponseSpecActions.languagePage();
        await claimantResponseSpecActions.hearingSpecSmallClaimPage();
        await claimantResponseSpecActions.applicantCourtLocationLRSpecPage();
        await claimantResponseSpecActions.hearingSupportPage();
        await claimantResponseSpecActions.vulnerabilityQuestionsSpecPage();
        await claimantResponseSpecActions.statementOfTruthPage();
        await claimantResponseSpecActions.submitPage();
        await claimantResponseSpecActions.confirmPage();
      },
      ccdEvents.CLAIMANT_RESPONSE,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async SmallClaimIntentToProceed1v2SS() {
    await super.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { claimantResponseSpecActions } = this.claimantSolicitorActionsFactory;
        await claimantResponseSpecActions.respondentResponse1v2SSSpecPage();
        await claimantResponseSpecActions.defenceDocumentSpecPage();
        await claimantResponseSpecActions.mediationContactInformationPage();
        await claimantResponseSpecActions.mediationAvailabilityPage();
        await claimantResponseSpecActions.smallClaimExpertsPage();
        await claimantResponseSpecActions.smallClaimWitnessesPage();
        await claimantResponseSpecActions.languagePage();
        await claimantResponseSpecActions.hearingSpecSmallClaimPage();
        await claimantResponseSpecActions.applicantCourtLocationLRSpecPage();
        await claimantResponseSpecActions.hearingSupportPage();
        await claimantResponseSpecActions.vulnerabilityQuestionsSpecPage();
        await claimantResponseSpecActions.statementOfTruthPage();
        await claimantResponseSpecActions.submitPage();
        await claimantResponseSpecActions.confirmPage();
      },
      ccdEvents.CLAIMANT_RESPONSE,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async SmallClaimIntentToProceed1v2DS() {
    await super.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { claimantResponseSpecActions } = this.claimantSolicitorActionsFactory;
        await claimantResponseSpecActions.respondentResponse1v2DSSpecPage();
        await claimantResponseSpecActions.defenceDocumentSpecPage();
        await claimantResponseSpecActions.mediationContactInformationPage();
        await claimantResponseSpecActions.mediationAvailabilityPage();
        await claimantResponseSpecActions.smallClaimExpertsPage();
        await claimantResponseSpecActions.smallClaimWitnessesPage();
        await claimantResponseSpecActions.languagePage();
        await claimantResponseSpecActions.hearingSpecSmallClaimPage();
        await claimantResponseSpecActions.applicantCourtLocationLRSpecPage();
        await claimantResponseSpecActions.hearingSupportPage();
        await claimantResponseSpecActions.vulnerabilityQuestionsSpecPage();
        await claimantResponseSpecActions.statementOfTruthPage();
        await claimantResponseSpecActions.submitPage();
        await claimantResponseSpecActions.confirmPage();
      },
      ccdEvents.CLAIMANT_RESPONSE,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }
}
