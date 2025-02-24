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
      },
      async () => {
        await createClaimSpecActions.confirmCreateClaimSpecPage();
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
      },
      async () => {
        await createClaimSpecActions.confirmCreateClaimSpecPage();
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
      },
      async () => {
        await createClaimSpecActions.confirmCreateClaimSpecPage();
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
      },
      async () => {
        await createClaimSpecActions.confirmCreateClaimSpecPage();
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
      },
      async () => {
        await createClaimSpecActions.confirmCreateClaimSpecPage();
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
        await claimantResponseSpecActions.respondentResponseSpec();
        await claimantResponseSpecActions.defenceDocumentSpec();
        await claimantResponseSpecActions.dqFastTrackClaimantResponse();
        await claimantResponseSpecActions.claimantResponseFastTrackDQ();
        await claimantResponseSpecActions.applications();
        await claimantResponseSpecActions.statementOfTruthClaimantResponse();
        await claimantResponseSpecActions.submitClaimantResponse();
      },
      async () => {
        await claimantResponseSpecActions.confirm();
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
        await claimantResponseSpecActions.respondentResponseSpec();
        await claimantResponseSpecActions.defenceDocumentSpec();
        await claimantResponseSpecActions.mediationClaimantResponse();
        await claimantResponseSpecActions.claimantResponseSmallTrackDQ();
        await claimantResponseSpecActions.statementOfTruthClaimantResponse();
        await claimantResponseSpecActions.submitClaimantResponse();
      },
      async () => {
        await claimantResponseSpecActions.confirm();
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
        await claimantResponseSpecActions.respondentResponse2v1Spec();
        await claimantResponseSpecActions.defenceDocumentSpec();
        await claimantResponseSpecActions.mediationClaimantResponse();
        await claimantResponseSpecActions.claimantResponseSmallTrackDQ();
        await claimantResponseSpecActions.statementOfTruthClaimantResponse();
        await claimantResponseSpecActions.submitClaimantResponse();
      },
      async () => {
        await claimantResponseSpecActions.confirm();
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
        await claimantResponseSpecActions.respondentResponse1v2SSSpec();
        await claimantResponseSpecActions.defenceDocumentSpec();
        await claimantResponseSpecActions.mediationClaimantResponse();
        await claimantResponseSpecActions.claimantResponseSmallTrackDQ();
        await claimantResponseSpecActions.statementOfTruthClaimantResponse();
        await claimantResponseSpecActions.submitClaimantResponse();
      },
      async () => {
        await claimantResponseSpecActions.confirm();
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
        await claimantResponseSpecActions.respondentResponse1v2DSSpec();
        await claimantResponseSpecActions.defenceDocumentSpec();
        await claimantResponseSpecActions.mediationClaimantResponse();
        await claimantResponseSpecActions.claimantResponseSmallTrackDQ();
        await claimantResponseSpecActions.statementOfTruthClaimantResponse();
        await claimantResponseSpecActions.submitClaimantResponse();
      },
      async () => {
        await claimantResponseSpecActions.confirm();
      },
      ccdEvents.CLAIMANT_RESPONSE,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }
}
