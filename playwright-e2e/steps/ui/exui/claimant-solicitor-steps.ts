import ClaimantSolicitorActionsFactory from '../../../actions/ui/exui/claimant-solicitor/claimant-solcitor-actions-factory';
import ExuiDashboardActions from '../../../actions/ui/exui/common/exui-dashboard-actions';
import IdamActions from '../../../actions/ui/idam/idam-actions';
import BaseExui from '../../../base/base-exui';
import { civilAdminUser, claimantSolicitorUser } from '../../../config/users/exui-users';
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

  async NotifyClaim1v1() {
    const { notifyClaimActions } = this.claimantSolicitorActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await notifyClaimActions.accessGrantedWarningPage();
        await notifyClaimActions.submitNotifyClaimPage();
      },
      async () => {
        await notifyClaimActions.confirmNotifyClaimPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }

  async NotifyClaim2v1() {
    const { notifyClaimActions } = this.claimantSolicitorActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await notifyClaimActions.accessGrantedWarningPage();
        await notifyClaimActions.submitNotifyClaimPage();
      },
      async () => {
        await notifyClaimActions.confirmNotifyClaimPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }

  async NotifyClaim1v2SS() {
    const { notifyClaimActions } = this.claimantSolicitorActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await notifyClaimActions.accessGrantedWarningPage();
        await notifyClaimActions.submitNotifyClaimPage();
      },
      async () => {
        await notifyClaimActions.confirmNotifyClaimPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }

  async NotifyClaim1v2DS() {
    const { notifyClaimActions } = this.claimantSolicitorActionsFactory;
    await this.retryExuiEvent(
      async () => {
        await notifyClaimActions.defendantSolicitorToNotifyPage();
        await notifyClaimActions.accessGrantedWarningPage();
        await notifyClaimActions.submitNotifyClaimPage();
      },
      async () => {
        await notifyClaimActions.confirmNotifyClaimPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }

  async NotifyClaim1v1LIP() {
    const { notifyClaimActions } = this.claimantSolicitorActionsFactory;
    await this.retryExuiEvent(
      async () => {
        await notifyClaimActions.certificateOfService1NotifyClaimPage();
        await notifyClaimActions.submitNotifyClaimPage();
      },
      async () => {
        await notifyClaimActions.confirmNotifyClaimCOSPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }
  async NotifyClaim1v2LIPS() {
    const { notifyClaimActions } = this.claimantSolicitorActionsFactory;
    await this.retryExuiEvent(
      async () => {
        await notifyClaimActions.certificateOfService1NotifyClaimPage();
        await notifyClaimActions.certificateOfService2NotifyClaimPage();
        await notifyClaimActions.submitNotifyClaimPage();
      },
      async () => {
        await notifyClaimActions.confirmNotifyClaimCOSPage();
      },
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      claimantSolicitorUser,
    );
  }

  async NotifyClaim1v1LIP1LR() {
    const { notifyClaimActions } = this.claimantSolicitorActionsFactory;
    await this.retryExuiEvent(
      async () => {
        await notifyClaimActions.accessGrantedWarningPage();
        await notifyClaimActions.certificateOfService2NotifyClaimPage();
        await notifyClaimActions.submitNotifyClaimPage();
      },
      async () => {
        await notifyClaimActions.confirmNotifyClaimCOSPage();
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
