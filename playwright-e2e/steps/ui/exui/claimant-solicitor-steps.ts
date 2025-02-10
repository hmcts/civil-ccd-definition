import ClaimantSolicitorActionsFactory from '../../../actions/ui/exui/claimant-solicitor/claimant-solcitor-actions-factory';
import ExuiDashboardActions from '../../../actions/ui/exui/common/exui-dashboard-actions';
import IdamActions from '../../../actions/ui/idam/idam-actions';
import BaseExuiSteps from '../../../base/base-exui-steps';
import { claimantSolicitorUser } from '../../../config/users/exui-users';
import ccdEvents from '../../../constants/ccd-events';
import { AllMethodsStep } from '../../../decorators/test-steps';

@AllMethodsStep()
export default class ClaimantSolcitorSteps extends BaseExuiSteps {
  private claimantSolicitorActionsFactory: ClaimantSolicitorActionsFactory;

  constructor(
    exuiDashboardActions: ExuiDashboardActions,
    idamActions: IdamActions,
    claimantSolicitorActionsFactory: ClaimantSolicitorActionsFactory,
  ) {
    super(exuiDashboardActions, idamActions);
    this.claimantSolicitorActionsFactory = claimantSolicitorActionsFactory;
  }

  async Login() {
    await super.idamActions.exuiLogin(claimantSolicitorUser);
  }

  async CreateClaimFastTrack1v1() {
    await super.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { createClaimActions } = this.claimantSolicitorActionsFactory;
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
        await createClaimActions.confirmCreateClaimPage();
      },
      ccdEvents.CREATE_CLAIM,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }
  async CreateClaimSmallTrack1v1() {
    await super.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { createClaimActions } = this.claimantSolicitorActionsFactory;
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
        await createClaimActions.confirmCreateClaimPage();
      },
      ccdEvents.CREATE_CLAIM,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }
  async CreateClaimSmallTrack2v1() {
    await this.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { createClaimActions } = this.claimantSolicitorActionsFactory;
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
        await createClaimActions.confirmCreateClaimPage();
      },
      ccdEvents.CREATE_CLAIM,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async CreateClaimSmallTrack1v2SS() {
    await super.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { createClaimActions } = this.claimantSolicitorActionsFactory;
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
        await createClaimActions.confirmCreateClaimPage();
      },
      ccdEvents.CREATE_CLAIM,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async CreateClaimSmallTrack1v2DS() {
    await super.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { createClaimActions } = this.claimantSolicitorActionsFactory;
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
        await createClaimActions.confirmCreateClaimPage();
      },
      ccdEvents.CREATE_CLAIM,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async NotifyClaim1v1() {
    await super.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { notifyClaimActions } = this.claimantSolicitorActionsFactory;
        await notifyClaimActions.accessGrantedWarningPage();
        await notifyClaimActions.submitNotifyClaimPage();
        await notifyClaimActions.confirmNotifyClaimPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }

  async NotifyClaim2v1() {
    await super.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { notifyClaimActions } = this.claimantSolicitorActionsFactory;
        await notifyClaimActions.accessGrantedWarningPage();
        await notifyClaimActions.submitNotifyClaimPage();
        await notifyClaimActions.confirmNotifyClaimPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }

  async NotifyClaim1v2SS() {
    await super.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { notifyClaimActions } = this.claimantSolicitorActionsFactory;
        await notifyClaimActions.accessGrantedWarningPage();
        await notifyClaimActions.submitNotifyClaimPage();
        await notifyClaimActions.confirmNotifyClaimPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }

  async NotifyClaim1v2DS() {
    await this.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { notifyClaimActions } = this.claimantSolicitorActionsFactory;
        await notifyClaimActions.defendantSolicitorToNotifyPage();
        await notifyClaimActions.accessGrantedWarningPage();
        await notifyClaimActions.submitNotifyClaimPage();
        await notifyClaimActions.confirmNotifyClaimPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }

  async NotifyClaim1v1LIP() {
    await this.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { notifyClaimActions } = this.claimantSolicitorActionsFactory;
        await notifyClaimActions.certificateOfService1NotifyClaimPage();
        await notifyClaimActions.submitNotifyClaimPage();
        await notifyClaimActions.confirmNotifyClaimCOSPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }
  async NotifyClaim1v2LIPS() {
    await this.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { notifyClaimActions } = this.claimantSolicitorActionsFactory;
        await notifyClaimActions.certificateOfService1NotifyClaimPage();
        await notifyClaimActions.certificateOfService2NotifyClaimPage();
        await notifyClaimActions.submitNotifyClaimPage();
        await notifyClaimActions.confirmNotifyClaimCOSPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }

  async NotifyClaim1v1LIP1LR() {
    await this.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { notifyClaimActions } = this.claimantSolicitorActionsFactory;
        await notifyClaimActions.accessGrantedWarningPage();
        await notifyClaimActions.certificateOfService2NotifyClaimPage();
        await notifyClaimActions.submitNotifyClaimPage();
        await notifyClaimActions.confirmNotifyClaimCOSPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }

  async NotifyClaimDetails1v1() {
    await this.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { notifyClaimDetailsActions } = this.claimantSolicitorActionsFactory;
        await notifyClaimDetailsActions.uploadNotifyClaimDetailsPage();
        await notifyClaimDetailsActions.submitNotifyClaimDetailsPage();
        await notifyClaimDetailsActions.confirmNotifyClaimDetailsPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
    );
  }

  async NotifyClaimDetails2v1() {
    await this.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { notifyClaimDetailsActions } = this.claimantSolicitorActionsFactory;
        await notifyClaimDetailsActions.uploadNotifyClaimDetailsPage();
        await notifyClaimDetailsActions.submitNotifyClaimDetailsPage();
        await notifyClaimDetailsActions.confirmNotifyClaimDetailsPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
    );
  }

  async NotifyClaimDetails1v2SS() {
    await this.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { notifyClaimDetailsActions } = this.claimantSolicitorActionsFactory;
        await notifyClaimDetailsActions.uploadNotifyClaimDetailsPage();
        await notifyClaimDetailsActions.submitNotifyClaimDetailsPage();
        await notifyClaimDetailsActions.confirmNotifyClaimDetailsPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
    );
  }

  async NotifyClaimDetails1v2DS() {
    await this.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { notifyClaimDetailsActions } = this.claimantSolicitorActionsFactory;
        await notifyClaimDetailsActions.selectDefendantSolicitorPage();
        await notifyClaimDetailsActions.uploadNotifyClaimDetailsPage();
        await notifyClaimDetailsActions.submitNotifyClaimDetailsPage();
        await notifyClaimDetailsActions.confirmNotifyClaimDetailsPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
    );
  }

  async NotifyClaimDetails1v1LIP() {
    await this.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { notifyClaimDetailsActions } = this.claimantSolicitorActionsFactory;
        await notifyClaimDetailsActions.certificateOfService1NotifyClaimDetailsPage();
        await notifyClaimDetailsActions.submitNotifyClaimDetailsLIPPage();
        await notifyClaimDetailsActions.confirmNotifyClaimDetailsCOSPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
    );
  }

  async NotifyClaimDetails1v2LIPS() {
    await this.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { notifyClaimDetailsActions } = this.claimantSolicitorActionsFactory;
        await notifyClaimDetailsActions.certificateOfService1NotifyClaimDetailsPage();
        await notifyClaimDetailsActions.certificateOfService2NotifyClaimDetailsPage();
        await notifyClaimDetailsActions.submitNotifyClaimDetailsCOSPage();
        await notifyClaimDetailsActions.confirmNotifyClaimDetailsCOSPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
    );
  }

  async NotifyClaimDetails1v2LIPLR() {
    await this.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { notifyClaimDetailsActions } = this.claimantSolicitorActionsFactory;
        await notifyClaimDetailsActions.uploadNotifyClaimDetailsPage();
        await notifyClaimDetailsActions.certificateOfService2NotifyClaimDetailsPage();
        await notifyClaimDetailsActions.submitNotifyClaimDetailsLIPLRPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      claimantSolicitorUser,
    );
  }

  async RespondFastTrackIntentToProceed1v1() {
    await this.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { claimantResponseActions } = this.claimantSolicitorActionsFactory;
        await claimantResponseActions.respondentResponsePage();
        await claimantResponseActions.defenceResponseDocumentPage();
        await claimantResponseActions.fileDirectionsQuestionairePage();
        await claimantResponseActions.fixedRecoverableCostsPage();
        await claimantResponseActions.disclosureOfNonElectronicDocumentsSpecPage();
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
        await claimantResponseActions.confirmPage();
      },
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async RespondSmallClaimIntentToProceed1v1() {
    await this.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { claimantResponseActions } = this.claimantSolicitorActionsFactory;
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
        await claimantResponseActions.confirmPage();
      },
      ccdEvents.CLAIMANT_RESPONSE,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async RespondSmallClaimIntentToProceed2v1() {
    await this.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { claimantResponseActions } = this.claimantSolicitorActionsFactory;
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
        await claimantResponseActions.confirmPage();
      },
      ccdEvents.CLAIMANT_RESPONSE,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async RespondSmallClaimIntentToProceed1v2SS() {
    await this.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { claimantResponseActions } = this.claimantSolicitorActionsFactory;
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
        await claimantResponseActions.confirmPage();
      },
      ccdEvents.CLAIMANT_RESPONSE,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async RespondSmallClaimIntentToProceed1v2DS() {
    await this.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { claimantResponseActions } = this.claimantSolicitorActionsFactory;

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
        await claimantResponseActions.confirmPage();
      },
      ccdEvents.CLAIMANT_RESPONSE,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }
}
