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
export default class ClaimantSolicitorSteps extends BaseExui {
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
    const { createClaimActions } = this.claimantSolicitorActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await createClaimActions.caseFilter();
        await createClaimActions.eligibility();
        await createClaimActions.references();
        await createClaimActions.court();
        await createClaimActions.claimantDetails();
        await createClaimActions.noAddAnotherClaimant();
        await createClaimActions.defendantDetails();
        await createClaimActions.noAddAnotherDefendant();
        await createClaimActions.fastTrackClaimDetails();
        await createClaimActions.statementOfTruthCreateClaim();
        await createClaimActions.submitCreateClaim();
      },
      async () => {
        await createClaimActions.confirmCreateClaim();
      },
      ccdEvents.CREATE_CLAIM,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }
  async CreateClaimSmallTrack1v1() {
    const { createClaimActions } = this.claimantSolicitorActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await createClaimActions.caseFilter();
        await createClaimActions.eligibility();
        await createClaimActions.references();
        await createClaimActions.court();
        await createClaimActions.claimantDetails();
        await createClaimActions.noAddAnotherClaimant();
        await createClaimActions.defendantDetails();
        await createClaimActions.noAddAnotherDefendant();
        await createClaimActions.smallTrackClaimDetails();
        await createClaimActions.statementOfTruthCreateClaim();
        await createClaimActions.submitCreateClaim();
      },
      async () => {
        await createClaimActions.confirmCreateClaim();
      },
      ccdEvents.CREATE_CLAIM,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }
  async CreateClaimSmallTrack2v1() {
    const { createClaimActions } = this.claimantSolicitorActionsFactory;
    await this.retryExuiEvent(
      async () => {
        await createClaimActions.caseFilter();
        await createClaimActions.eligibility();
        await createClaimActions.references();
        await createClaimActions.court();
        await createClaimActions.claimantDetails();
        await createClaimActions.addAnotherClaimant();
        await createClaimActions.secondClaimant();
        await createClaimActions.secondClaimantLitigationFriend();
        await createClaimActions.defendantDetails();
        await createClaimActions.smallTrackClaimDetails();
        await createClaimActions.statementOfTruthCreateClaim();
        await createClaimActions.submitCreateClaim();
      },
      async () => {
        await createClaimActions.confirmCreateClaim();
      },
      ccdEvents.CREATE_CLAIM,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async CreateClaimSmallTrack1v2SS() {
    const { createClaimActions } = this.claimantSolicitorActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await createClaimActions.caseFilter();
        await createClaimActions.eligibility();
        await createClaimActions.references();
        await createClaimActions.court();
        await createClaimActions.claimantDetails();
        await createClaimActions.noAddAnotherClaimant();
        await createClaimActions.defendantDetails();
        await createClaimActions.addAnotherDefendant();
        await createClaimActions.secondDefendantSS();
        await createClaimActions.smallTrackClaimDetails();
        await createClaimActions.statementOfTruthCreateClaim();
        await createClaimActions.submitCreateClaim();
      },
      async () => {
        await createClaimActions.confirmCreateClaim();
      },
      ccdEvents.CREATE_CLAIM,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async CreateClaimSmallTrack1v2DS() {
    const { createClaimActions } = this.claimantSolicitorActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await createClaimActions.caseFilter();
        await createClaimActions.eligibility();
        await createClaimActions.references();
        await createClaimActions.court();
        await createClaimActions.claimantDetails();
        await createClaimActions.noAddAnotherClaimant();
        await createClaimActions.defendantDetails();
        await createClaimActions.addAnotherDefendant();
        await createClaimActions.secondDefendantDSdetails();
        await createClaimActions.smallTrackClaimDetails();
        await createClaimActions.statementOfTruthCreateClaim();
        await createClaimActions.submitCreateClaim();
      },
      async () => {
        await createClaimActions.confirmCreateClaim();
      },
      ccdEvents.CREATE_CLAIM,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async NotifyClaim() {
    const { notifyClaimActions } = this.claimantSolicitorActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await notifyClaimActions.accessGrantedWarning();
        await notifyClaimActions.submitNotifyClaim();
      },
      async () => {
        await notifyClaimActions.confirmNotifyClaim();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }

  async NotifyClaim1v2DS() {
    const { notifyClaimActions } = this.claimantSolicitorActionsFactory;
    await this.retryExuiEvent(
      async () => {
        await notifyClaimActions.defendantSolicitorToNotify();
        await notifyClaimActions.accessGrantedWarning();
        await notifyClaimActions.submitNotifyClaim();
      },
      async () => {
        await notifyClaimActions.confirmNotifyClaim();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }

  async NotifyClaim1v1LIP() {
    const { notifyClaimActions } = this.claimantSolicitorActionsFactory;
    await this.retryExuiEvent(
      async () => {
        await notifyClaimActions.certificateOfService1NotifyClaim();
        await notifyClaimActions.submitNotifyClaim();
      },
      async () => {
        await notifyClaimActions.confirmNotifyClaimCOS();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }
  async NotifyClaim1v2LIPS() {
    const { notifyClaimActions } = this.claimantSolicitorActionsFactory;
    await this.retryExuiEvent(
      async () => {
        await notifyClaimActions.certificateOfService1NotifyClaim();
        await notifyClaimActions.certificateOfService2NotifyClaim();
        await notifyClaimActions.submitNotifyClaim();
      },
      async () => {
        await notifyClaimActions.confirmNotifyClaimCOS();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }

  async NotifyClaim1v1LIP1LR() {
    const { notifyClaimActions } = this.claimantSolicitorActionsFactory;
    await this.retryExuiEvent(
      async () => {
        await notifyClaimActions.accessGrantedWarning();
        await notifyClaimActions.certificateOfService2NotifyClaim();
        await notifyClaimActions.submitNotifyClaim();
      },
      async () => {
        await notifyClaimActions.confirmNotifyClaimCOS();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }

  async NotifyClaimDetails1v1() {
    const { notifyClaimDetailsActions } = this.claimantSolicitorActionsFactory;
    await this.retryExuiEvent(
      async () => {
        await notifyClaimDetailsActions.uploadNotifyClaimDetailsPage();
        await notifyClaimDetailsActions.submitNotifyClaimDetailsPage();
      },
      async () => {
        await notifyClaimDetailsActions.confirmNotifyClaimDetailsPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
    );
  }

  async NotifyClaimDetails2v1() {
    const { notifyClaimDetailsActions } = this.claimantSolicitorActionsFactory;
    await this.retryExuiEvent(
      async () => {
        await notifyClaimDetailsActions.uploadNotifyClaimDetailsPage();
        await notifyClaimDetailsActions.submitNotifyClaimDetailsPage();
      },
      async () => {
        await notifyClaimDetailsActions.confirmNotifyClaimDetailsPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
    );
  }

  async NotifyClaimDetails1v2SS() {
    const { notifyClaimDetailsActions } = this.claimantSolicitorActionsFactory;
    await this.retryExuiEvent(
      async () => {
        await notifyClaimDetailsActions.uploadNotifyClaimDetailsPage();
        await notifyClaimDetailsActions.submitNotifyClaimDetailsPage();
      },
      async () => {
        await notifyClaimDetailsActions.confirmNotifyClaimDetailsPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
    );
  }

  async NotifyClaimDetails1v2DS() {
    const { notifyClaimDetailsActions } = this.claimantSolicitorActionsFactory;
    await this.retryExuiEvent(
      async () => {
        await notifyClaimDetailsActions.selectDefendantSolicitorPage();
        await notifyClaimDetailsActions.uploadNotifyClaimDetailsPage();
        await notifyClaimDetailsActions.submitNotifyClaimDetailsPage();
      },
      async () => {
        await notifyClaimDetailsActions.confirmNotifyClaimDetailsPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
    );
  }

  async NotifyClaimDetails1v1LIP() {
    const { notifyClaimDetailsActions } = this.claimantSolicitorActionsFactory;
    await this.retryExuiEvent(
      async () => {
        await notifyClaimDetailsActions.certificateOfService1NotifyClaimDetailsPage();
        await notifyClaimDetailsActions.submitNotifyClaimDetailsLIPPage();
      },
      async () => {
        await notifyClaimDetailsActions.confirmNotifyClaimDetailsCOSPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
    );
  }

  async NotifyClaimDetails1v2LIPS() {
    const { notifyClaimDetailsActions } = this.claimantSolicitorActionsFactory;
    await this.retryExuiEvent(
      async () => {
        await notifyClaimDetailsActions.certificateOfService1NotifyClaimDetailsPage();
        await notifyClaimDetailsActions.certificateOfService2NotifyClaimDetailsPage();
        await notifyClaimDetailsActions.submitNotifyClaimDetailsCOSPage();
      },
      async () => {
        await notifyClaimDetailsActions.confirmNotifyClaimDetailsCOSPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
    );
  }

  async NotifyClaimDetails1v2LIPLR() {
    const { notifyClaimDetailsActions } = this.claimantSolicitorActionsFactory;
    await this.retryExuiEvent(
      async () => {
        await notifyClaimDetailsActions.uploadNotifyClaimDetailsPage();
        await notifyClaimDetailsActions.certificateOfService2NotifyClaimDetailsPage();
        await notifyClaimDetailsActions.submitNotifyClaimDetailsLIPLRPage();
      },
      async () => {
        await notifyClaimDetailsActions.confirmNotifyClaimDetailsCOSPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
    );
  }

  async RespondFastTrackIntentToProceed1v1() {
    const { claimantResponseActions } = this.claimantSolicitorActionsFactory;
    await this.retryExuiEvent(
      async () => {
        await claimantResponseActions.respondentResponsePage();
        await claimantResponseActions.defenceResponseDocumentPage();
        await claimantResponseActions.fileDirectionsQuestionairePage();
        await claimantResponseActions.fixedRecoverableCostsPage();
        await claimantResponseActions.disclosureOfNonElectronicDocumentsPage();
        await claimantResponseActions.expertsPage();
        await claimantResponseActions.witnessesPage();
        await claimantResponseActions.languagePage();
        await claimantResponseActions.hearingSmallClaimPage();
        await claimantResponseActions.draftDirectionsPage();
        await claimantResponseActions.hearingSupportPage();
        await claimantResponseActions.vulnerabilityQuestionsPage();
        await claimantResponseActions.futherInformationPage();
        await claimantResponseActions.statementOfTruthPage();
        await claimantResponseActions.submitPage();
      },
      async () => {
        await claimantResponseActions.confirmPage();
      },
      ccdEvents.CLAIMANT_RESPONSE,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async RespondSmallClaimIntentToProceed1v1() {
    const { claimantResponseActions } = this.claimantSolicitorActionsFactory;
    await this.retryExuiEvent(
      async () => {
        await claimantResponseActions.respondentResponsePage();
        await claimantResponseActions.defenceResponseDocumentPage();
        await claimantResponseActions.expertsPage();
        await claimantResponseActions.witnessesPage();
        await claimantResponseActions.languagePage();
        await claimantResponseActions.hearingSmallClaimPage();
        await claimantResponseActions.draftDirectionsPage();
        await claimantResponseActions.hearingSupportPage();
        await claimantResponseActions.vulnerabilityQuestionsPage();
        await claimantResponseActions.futherInformationPage();
        await claimantResponseActions.statementOfTruthPage();
        await claimantResponseActions.submitPage();
      },
      async () => {
        await claimantResponseActions.confirmPage();
      },
      ccdEvents.CLAIMANT_RESPONSE,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async RespondSmallClaimIntentToProceed2v1() {
    const { claimantResponseActions } = this.claimantSolicitorActionsFactory;
    await this.retryExuiEvent(
      async () => {
        await claimantResponseActions.respondentResponse2v1Page();
        await claimantResponseActions.defenceResponseDocumentPage();
        await claimantResponseActions.expertsPage();
        await claimantResponseActions.witnessesPage();
        await claimantResponseActions.languagePage();
        await claimantResponseActions.hearingSmallClaimPage();
        await claimantResponseActions.draftDirectionsPage();
        await claimantResponseActions.hearingSupportPage();
        await claimantResponseActions.vulnerabilityQuestionsPage();
        await claimantResponseActions.futherInformationPage();
        await claimantResponseActions.statementOfTruthPage();
        await claimantResponseActions.submitPage();
      },
      async () => {
        await claimantResponseActions.confirmPage();
      },
      ccdEvents.CLAIMANT_RESPONSE,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async RespondSmallClaimIntentToProceed1v2SS() {
    const { claimantResponseActions } = this.claimantSolicitorActionsFactory;
    await this.retryExuiEvent(
      async () => {
        await claimantResponseActions.respondentResponse1v2Page();
        await claimantResponseActions.defenceResponseDocument1v2Page();
        await claimantResponseActions.expertsPage();
        await claimantResponseActions.witnessesPage();
        await claimantResponseActions.languagePage();
        await claimantResponseActions.hearingSmallClaimPage();
        await claimantResponseActions.draftDirectionsPage();
        await claimantResponseActions.hearingSupportPage();
        await claimantResponseActions.vulnerabilityQuestionsPage();
        await claimantResponseActions.futherInformationPage();
        await claimantResponseActions.statementOfTruthPage();
        await claimantResponseActions.submitPage();
      },
      async () => {
        await claimantResponseActions.confirmPage();
      },
      ccdEvents.CLAIMANT_RESPONSE,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async RespondSmallClaimIntentToProceed1v2DS() {
    const { claimantResponseActions } = this.claimantSolicitorActionsFactory;
    await this.retryExuiEvent(
      async () => {
        await claimantResponseActions.respondentResponse1v2Page();
        await claimantResponseActions.defenceResponseDocument1v2Page();
        await claimantResponseActions.expertsPage();
        await claimantResponseActions.witnessesPage();
        await claimantResponseActions.languagePage();
        await claimantResponseActions.hearingSmallClaimPage();
        await claimantResponseActions.draftDirectionsPage();
        await claimantResponseActions.hearingSupportPage();
        await claimantResponseActions.vulnerabilityQuestionsPage();
        await claimantResponseActions.futherInformationPage();
        await claimantResponseActions.statementOfTruthPage();
        await claimantResponseActions.submitPage();
      },
      async () => {
        await claimantResponseActions.confirmPage();
      },
      ccdEvents.CLAIMANT_RESPONSE,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }
}
