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
        await createClaimActions.caseFilterPage();
        await createClaimActions.eligibilityPage();
        await createClaimActions.referencesPage();
        await createClaimActions.courtPage();
        await createClaimActions.claimantPage();
        await createClaimActions.claimantLitigationFriendPage();
        await createClaimActions.notificationsPage();
        await createClaimActions.claimantSolicitorOrganisationPage();
        await createClaimActions.claimantSolicitorServiceAddressPage();
        await createClaimActions.noAddAnotherClaimantPage();
        await createClaimActions.defendantPage();
        await createClaimActions.legalRepresentationPage();
        await createClaimActions.defendantSolicitorOrganisationPage();
        await createClaimActions.defendantSolicitorServiceAddressPage();
        await createClaimActions.defendantSolicitorEmailPage();
        await createClaimActions.noAddAnotherDefendantPage();
        await createClaimActions.claimTypePage();
        await createClaimActions.personalInjuryTypePage();
        await createClaimActions.detailsPage();
        await createClaimActions.uploadParticularsOfClaimPage();
        await createClaimActions.fastTrackClaimPages();
        await createClaimActions.statementOfTruthCreateClaimPage();
        await createClaimActions.submitCreateClaimPage();
      },
      async () => {
        await createClaimActions.confirmCreateClaimPage();
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
        await createClaimActions.caseFilterPage();
        await createClaimActions.eligibilityPage();
        await createClaimActions.referencesPage();
        await createClaimActions.courtPage();
        await createClaimActions.claimantPage();
        await createClaimActions.claimantLitigationFriendPage();
        await createClaimActions.notificationsPage();
        await createClaimActions.claimantSolicitorOrganisationPage();
        await createClaimActions.claimantSolicitorServiceAddressPage();
        await createClaimActions.noAddAnotherClaimantPage();
        await createClaimActions.defendantPage();
        await createClaimActions.legalRepresentationPage();
        await createClaimActions.defendantSolicitorOrganisationPage();
        await createClaimActions.defendantSolicitorServiceAddressPage();
        await createClaimActions.defendantSolicitorEmailPage();
        await createClaimActions.noAddAnotherDefendantPage();
        await createClaimActions.claimTypePage();
        await createClaimActions.personalInjuryTypePage();
        await createClaimActions.detailsPage();
        await createClaimActions.uploadParticularsOfClaimPage();
        await createClaimActions.claimValuePage();
        await createClaimActions.pbaNumberPage();
        await createClaimActions.statementOfTruthCreateClaimPage();
        await createClaimActions.submitCreateClaimPage();
      },
      async () => {
        await createClaimActions.confirmCreateClaimPage();
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
        await createClaimActions.caseFilterPage();
        await createClaimActions.eligibilityPage();
        await createClaimActions.referencesPage();
        await createClaimActions.courtPage();
        await createClaimActions.claimantPage();
        await createClaimActions.claimantLitigationFriendPage();
        await createClaimActions.notificationsPage();
        await createClaimActions.claimantSolicitorOrganisationPage();
        await createClaimActions.claimantSolicitorServiceAddressPage();
        await createClaimActions.addAnotherClaimantPage();
        await createClaimActions.secondClaimantPage();
        await createClaimActions.secondClaimantLitigationFriendPage();
        await createClaimActions.defendantPage();
        await createClaimActions.legalRepresentationPage();
        await createClaimActions.defendantSolicitorOrganisationPage();
        await createClaimActions.defendantSolicitorServiceAddressPage();
        await createClaimActions.defendantSolicitorEmailPage();
        await createClaimActions.claimTypePage();
        await createClaimActions.personalInjuryTypePage();
        await createClaimActions.detailsPage();
        await createClaimActions.uploadParticularsOfClaimPage();
        await createClaimActions.claimValuePage();
        await createClaimActions.pbaNumberPage();
        await createClaimActions.statementOfTruthCreateClaimPage();
        await createClaimActions.submitCreateClaimPage();
      },
      async () => {
        await createClaimActions.confirmCreateClaimPage();
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
        await createClaimActions.caseFilterPage();
        await createClaimActions.eligibilityPage();
        await createClaimActions.referencesPage();
        await createClaimActions.courtPage();
        await createClaimActions.claimantPage();
        await createClaimActions.claimantLitigationFriendPage();
        await createClaimActions.notificationsPage();
        await createClaimActions.claimantSolicitorOrganisationPage();
        await createClaimActions.claimantSolicitorServiceAddressPage();
        await createClaimActions.noAddAnotherClaimantPage();
        await createClaimActions.defendantPage();
        await createClaimActions.legalRepresentationPage();
        await createClaimActions.defendantSolicitorOrganisationPage();
        await createClaimActions.defendantSolicitorServiceAddressPage();
        await createClaimActions.defendantSolicitorEmailPage();
        await createClaimActions.addAnotherDefendantPage();
        await createClaimActions.secondDefendantPage();
        await createClaimActions.defendant2RepresentedPages();
        await createClaimActions.sameLegalRepresentativePage();
        await createClaimActions.claimTypePage();
        await createClaimActions.personalInjuryTypePage();
        await createClaimActions.detailsPage();
        await createClaimActions.uploadParticularsOfClaimPage();
        await createClaimActions.claimValuePage();
        await createClaimActions.pbaNumberPage();
        await createClaimActions.statementOfTruthCreateClaimPage();
        await createClaimActions.submitCreateClaimPage();
      },
      async () => {
        await createClaimActions.confirmCreateClaimPage();
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
        await createClaimActions.caseFilterPage();
        await createClaimActions.eligibilityPage();
        await createClaimActions.referencesPage();
        await createClaimActions.courtPage();
        await createClaimActions.claimantPage();
        await createClaimActions.claimantLitigationFriendPage();
        await createClaimActions.notificationsPage();
        await createClaimActions.claimantSolicitorOrganisationPage();
        await createClaimActions.claimantSolicitorServiceAddressPage();
        await createClaimActions.noAddAnotherClaimantPage();
        await createClaimActions.defendantPage();
        await createClaimActions.legalRepresentationPage();
        await createClaimActions.defendantSolicitorOrganisationPage();
        await createClaimActions.defendantSolicitorServiceAddressPage();
        await createClaimActions.defendantSolicitorEmailPage();
        await createClaimActions.addAnotherDefendantPage();
        await createClaimActions.secondDefendantPage();
        await createClaimActions.defendant2RepresentedPages();
        await createClaimActions.noSameLegalRepresentativePage();
        await createClaimActions.secondDefendantSolicitorOrganisationPage();
        await createClaimActions.secondDefendantSolicitorServiceAddressPage();
        await createClaimActions.secondDefendantSolicitorReferencePage();
        await createClaimActions.secondDefendantSolicitorEmailPage();
        await createClaimActions.claimTypePage();
        await createClaimActions.personalInjuryTypePage();
        await createClaimActions.detailsPage();
        await createClaimActions.uploadParticularsOfClaimPage();
        await createClaimActions.claimValuePage();
        await createClaimActions.pbaNumberPage();
        await createClaimActions.statementOfTruthCreateClaimPage();
        await createClaimActions.submitCreateClaimPage();
      },
      async () => {
        await createClaimActions.confirmCreateClaimPage();
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

  async NotifyClaimDetails() {
    const { notifyClaimDetailsActions } = this.claimantSolicitorActionsFactory;
    await this.retryExuiEvent(
      async () => {
        await notifyClaimDetailsActions.uploadNotifyClaimDetails();
        await notifyClaimDetailsActions.submitNotifyClaimDetails();
      },
      async () => {
        await notifyClaimDetailsActions.confirmNotifyClaimDetails();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
    );
  }

  async NotifyClaimDetails1v2DS() {
    const { notifyClaimDetailsActions } = this.claimantSolicitorActionsFactory;
    await this.retryExuiEvent(
      async () => {
        await notifyClaimDetailsActions.selectDefendantSolicitor();
        await notifyClaimDetailsActions.uploadNotifyClaimDetails();
        await notifyClaimDetailsActions.submitNotifyClaimDetails();
      },
      async () => {
        await notifyClaimDetailsActions.confirmNotifyClaimDetails();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
    );
  }

  async NotifyClaimDetails1v1LIP() {
    const { notifyClaimDetailsActions } = this.claimantSolicitorActionsFactory;
    await this.retryExuiEvent(
      async () => {
        await notifyClaimDetailsActions.certificateOfService1NotifyClaimDetails();
        await notifyClaimDetailsActions.submitNotifyClaimDetailsLIP();
      },
      async () => {
        await notifyClaimDetailsActions.confirmNotifyClaimDetailsCOS();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
    );
  }

  async NotifyClaimDetails1v2LIPS() {
    const { notifyClaimDetailsActions } = this.claimantSolicitorActionsFactory;
    await this.retryExuiEvent(
      async () => {
        await notifyClaimDetailsActions.certificateOfService1NotifyClaimDetails();
        await notifyClaimDetailsActions.certificateOfService2NotifyClaimDetails();
        await notifyClaimDetailsActions.submitNotifyClaimDetailsCOS();
      },
      async () => {
        await notifyClaimDetailsActions.confirmNotifyClaimDetailsCOS();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
    );
  }

  async NotifyClaimDetails1v2LIPLR() {
    const { notifyClaimDetailsActions } = this.claimantSolicitorActionsFactory;
    await this.retryExuiEvent(
      async () => {
        await notifyClaimDetailsActions.uploadNotifyClaimDetails();
        await notifyClaimDetailsActions.certificateOfService2NotifyClaimDetails();
        await notifyClaimDetailsActions.submitNotifyClaimDetailsLIPLR();
      },
      async () => {
        await notifyClaimDetailsActions.confirmNotifyClaimDetailsCOS();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
    );
  }

  async RespondFastTrackIntentToProceed1v1() {
    const { claimantResponseActions } = this.claimantSolicitorActionsFactory;
    await this.retryExuiEvent(
      async () => {
        await claimantResponseActions.respondentResponse();
        await claimantResponseActions.defenceResponseDocument();
        await claimantResponseActions.dqFastTrack();
        await claimantResponseActions.statementOfTruth();
        await claimantResponseActions.submitClaimantResponse();
      },
      async () => {
        await claimantResponseActions.confirmClaimantResponse();
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
        await claimantResponseActions.respondentResponse();
        await claimantResponseActions.defenceResponseDocument();
        await claimantResponseActions.dqSmallTrack();
        await claimantResponseActions.statementOfTruth();
        await claimantResponseActions.submitClaimantResponse();
      },
      async () => {
        await claimantResponseActions.confirmClaimantResponse();
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
        await claimantResponseActions.respondentResponse2v1();
        await claimantResponseActions.defenceResponseDocument();
        await claimantResponseActions.dqSmallTrack();
        await claimantResponseActions.statementOfTruth();
        await claimantResponseActions.submitClaimantResponse();
      },
      async () => {
        await claimantResponseActions.confirmClaimantResponse();
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
        await claimantResponseActions.respondentResponse1v2();
        await claimantResponseActions.defenceResponseDocument1v2();
        await claimantResponseActions.dqSmallTrack();
        await claimantResponseActions.statementOfTruth();
        await claimantResponseActions.submitClaimantResponse();
      },
      async () => {
        await claimantResponseActions.confirmClaimantResponse();
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
        await claimantResponseActions.respondentResponse1v2();
        await claimantResponseActions.defenceResponseDocument1v2();
        await claimantResponseActions.dqSmallTrack();
        await claimantResponseActions.statementOfTruth();
        await claimantResponseActions.submitClaimantResponse();
      },
      async () => {
        await claimantResponseActions.confirmClaimantResponse();
      },
      ccdEvents.CLAIMANT_RESPONSE,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }
}
