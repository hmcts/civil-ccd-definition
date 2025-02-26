import test from 'node:test';
import ClaimantSolicitorActionsFactory from '../../../actions/ui/exui/claimant-solicitor/claimant-solcitor-actions-factory';
import ExuiDashboardActions from '../../../actions/ui/exui/common/exui-dashboard-actions';
import IdamActions from '../../../actions/ui/idam/idam-actions';
import BaseExui from '../../../base/base-exui';
import { claimantSolicitorUser } from '../../../config/users/exui-users';
import ccdEvents from '../../../constants/ccd-events';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import {create} from "node:domain";

@AllMethodsStep()
export default class ClaimantSolicitorSpecSteps extends BaseExui {
  private claimantSolicitorActionsFactory: ClaimantSolicitorActionsFactory;

  constructor(
    exuiDashboardActions: ExuiDashboardActions,
    idamActions: IdamActions,
    claimantSolicitorActionsFactory: ClaimantSolicitorActionsFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(exuiDashboardActions, idamActions, requestsFactory, testData);
    this.claimantSolicitorActionsFactory = claimantSolicitorActionsFactory;
  }

  async Login() {
    await super.idamActions.exuiLogin(claimantSolicitorUser);
  }

  async CreateClaimFastTrack1v1() {
    const { createClaimSpecActions } = this.claimantSolicitorActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await createClaimSpecActions.caseFilter();
        await createClaimSpecActions.checklist();
        await createClaimSpecActions.eligibiltySpec();
        await createClaimSpecActions.references();
        await createClaimSpecActions.claimant();
        await createClaimSpecActions.noAddAnotherClaimant();
        await createClaimSpecActions.claimantDetails();
        await createClaimSpecActions.defendant();
        await createClaimSpecActions.defendantDetails();
        await createClaimSpecActions.noAddAnotherDefendant();
        await createClaimSpecActions.claimDetailsFastTrack();
        await createClaimSpecActions.statementOfTruthCreateClaim();
        await createClaimSpecActions.submitCreateClaim();
      },
      async () => {
        await createClaimSpecActions.confirmCreateClaimSpec();
      },
      ccdEvents.CREATE_CLAIM_SPEC,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async CreateClaimSmallTrack1v1() {
    const { createClaimSpecActions } = this.claimantSolicitorActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await createClaimSpecActions.caseFilter();
        await createClaimSpecActions.checklist();
        await createClaimSpecActions.eligibiltySpec();
        await createClaimSpecActions.references();
        await createClaimSpecActions.claimant();
        await createClaimSpecActions.noAddAnotherClaimant();
        await createClaimSpecActions.claimantDetails();
        await createClaimSpecActions.defendant();
        await createClaimSpecActions.defendantDetails();
        await createClaimSpecActions.noAddAnotherDefendant();
        await createClaimSpecActions.claimDetailsSmallTrack();
        await createClaimSpecActions.statementOfTruthCreateClaim();
        await createClaimSpecActions.submitCreateClaim();
      },
      async () => {
        await createClaimSpecActions.confirmCreateClaimSpec();
      },
      ccdEvents.CREATE_CLAIM_SPEC,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async CreateClaimSmallTrack2v1() {
    const { createClaimSpecActions } = this.claimantSolicitorActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await createClaimSpecActions.caseFilter();
        await createClaimSpecActions.checklist();
        await createClaimSpecActions.eligibiltySpec();
        await createClaimSpecActions.references();
        await createClaimSpecActions.claimant();
        await createClaimSpecActions.addAnotherClaimant();
        await createClaimSpecActions.secondClaimant();
        await createClaimSpecActions.claimantDetails();
        await createClaimSpecActions.defendant();
        await createClaimSpecActions.defendantDetails();
        await createClaimSpecActions.claimDetailsSmallTrack();
        await createClaimSpecActions.statementOfTruthCreateClaim();
        await createClaimSpecActions.submitCreateClaim();
      },
      async () => {
        await createClaimSpecActions.confirmCreateClaimSpec();
      },
      ccdEvents.CREATE_CLAIM_SPEC,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async CreateClaimSmallTrack1v2SS() {
    const { createClaimSpecActions } = this.claimantSolicitorActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await createClaimSpecActions.caseFilter();
        await createClaimSpecActions.checklist();
        await createClaimSpecActions.eligibiltySpec();
        await createClaimSpecActions.references();
        await createClaimSpecActions.claimant();
        await createClaimSpecActions.noAddAnotherClaimant();
        await createClaimSpecActions.claimantDetails();
        await createClaimSpecActions.defendant();
        await createClaimSpecActions.defendantDetails();
        await createClaimSpecActions.addAnotherDefendant();
        await createClaimSpecActions.secondDefendant();
        await createClaimSpecActions.secondDefedantSSDetails();
        await createClaimSpecActions.claimDetailsSmallTrack();
        await createClaimSpecActions.statementOfTruthCreateClaim();
        await createClaimSpecActions.submitCreateClaim();
      },
      async () => {
        await createClaimSpecActions.confirmCreateClaimSpec();
      },
      ccdEvents.CREATE_CLAIM_SPEC,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async CreateClaimSmallTrack1v2DS() {
    const { createClaimSpecActions } = this.claimantSolicitorActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await createClaimSpecActions.caseFilter();
        await createClaimSpecActions.checklist();
        await createClaimSpecActions.eligibiltySpec();
        await createClaimSpecActions.references();
        await createClaimSpecActions.claimant();
        await createClaimSpecActions.noAddAnotherClaimant();
        await createClaimSpecActions.claimantDetails();
        await createClaimSpecActions.defendant();
        await createClaimSpecActions.defendantDetails();
        await createClaimSpecActions.addAnotherDefendant();
        await createClaimSpecActions.secondDefendant();
        await createClaimSpecActions.secondDefendantDSDetails()
        await createClaimSpecActions.claimDetailsSmallTrack();
        await createClaimSpecActions.statementOfTruthCreateClaim();
        await createClaimSpecActions.submitCreateClaim();
      },
      async () => {
        await createClaimSpecActions.confirmCreateClaimSpec();
      },
      ccdEvents.CREATE_CLAIM_SPEC,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async RespondFastTrackIntentToProceed1v1() {
    const { claimantResponseSpecActions } = this.claimantSolicitorActionsFactory;
    await super.retryExuiEvent(
      async () => {
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
      },
      async () => {
        await claimantResponseSpecActions.confirmPage();
      },
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async RespondSmallClaimIntentToProceed1v1() {
    const { claimantResponseSpecActions } = this.claimantSolicitorActionsFactory;
    await super.retryExuiEvent(
      async () => {
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
      },
      async () => {
        await claimantResponseSpecActions.confirmPage();
      },
      ccdEvents.CLAIMANT_RESPONSE,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async RespondSmallClaimIntentToProceed2v1() {
    const { claimantResponseSpecActions } = this.claimantSolicitorActionsFactory;
    await super.retryExuiEvent(
      async () => {
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
      },
      async () => {
        await claimantResponseSpecActions.confirmPage();
      },
      ccdEvents.CLAIMANT_RESPONSE,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async RespondSmallClaimIntentToProceed1v2SS() {
    const { claimantResponseSpecActions } = this.claimantSolicitorActionsFactory;
    await super.retryExuiEvent(
      async () => {
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
      },
      async () => {
        await claimantResponseSpecActions.confirmPage();
      },
      ccdEvents.CLAIMANT_RESPONSE,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async RespondSmallClaimIntentToProceed1v2DS() {
    const { claimantResponseSpecActions } = this.claimantSolicitorActionsFactory;
    await super.retryExuiEvent(
      async () => {
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
      },
      async () => {
        await claimantResponseSpecActions.confirmPage();
      },
      ccdEvents.CLAIMANT_RESPONSE,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }
}
