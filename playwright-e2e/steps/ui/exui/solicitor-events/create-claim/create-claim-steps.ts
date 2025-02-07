import BaseExuiSteps from '../../../../../base/base-exui-steps';
import { Step } from '../../../../../decorators/test-steps';
import TestData from '../../../../../models/test-data';
import ExuiDashboardPageFactory from '../../../../../pages/exui/exui-dashboard/exui-dashboard-page-factory';
import CreateClaimPageFactory from '../../../../../pages/exui/solicitor-events/create-claim/create-claim-page-factory';
import RequestsFactory from '../../../../../requests/requests-factory';
import ccdEvents from '../../../../../constants/ccd-events';
import { claimantSolicitorUser } from '../../../../../config/users/exui-users';

const classKey = 'CreateClaimSteps';
export default class CreateClaimSteps extends BaseExuiSteps {
  private createClaimPageFactory: CreateClaimPageFactory;

  constructor(
    createClaimPageFactory: CreateClaimPageFactory,
    exuiDashboardPageFactory: ExuiDashboardPageFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(exuiDashboardPageFactory, requestsFactory, testData);
    this.createClaimPageFactory = createClaimPageFactory;
  }

  @Step(classKey)
  async FastTrack1v1() {
    await super.retryExuiEvent(
      async () => {
        await this.processCaseFilterPage();
        await this.processEligibilityPage();
        await this.processReferencesPage();
        await this.processCourtPage();
        await this.processClaimantPage();
        await this.processClaimantLitigationFriendPage();
        await this.processNotificationsPage();
        await this.processClaimantSolicitorOrganisationPage();
        await this.processClaimantSolicitorServiceAddressPage();
        await this.processNoAddAnotherClaimantPage();
        await this.processDefendantPage();
        await this.processLegalRepresentationPage();
        await this.processDefendantSolicitorOrganisationPage();
        await this.processDefendantSolicitorServiceAddressPage();
        await this.processDefendantSolicitorEmailPage();
        await this.processNoAddAnotherDefendantPage();
        await this.processClaimTypePage();
        await this.processPersonalInjuryTypePage();
        await this.processDetailsPage();
        await this.processUploadParticularsOfClaimPage();
        await this.processFastTrackClaimPages();
        await this.processStatementOfTruthCreateClaimPage();
        await this.processSubmitCreateClaimPage();
        await this.processConfirmCreateClaimPage();
      },
      ccdEvents.CREATE_CLAIM,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  @Step(classKey)
  async SmallTrack1v1() {
    await super.retryExuiEvent(
      async () => {
        await this.processCaseFilterPage();
        await this.processEligibilityPage();
        await this.processReferencesPage();
        await this.processCourtPage();
        await this.processClaimantPage();
        await this.processClaimantLitigationFriendPage();
        await this.processNotificationsPage();
        await this.processClaimantSolicitorOrganisationPage();
        await this.processClaimantSolicitorServiceAddressPage();
        await this.processNoAddAnotherClaimantPage();
        await this.processDefendantPage();
        await this.processLegalRepresentationPage();
        await this.processDefendantSolicitorOrganisationPage();
        await this.processDefendantSolicitorServiceAddressPage();
        await this.processDefendantSolicitorEmailPage();
        await this.processNoAddAnotherDefendantPage();
        await this.processClaimTypePage();
        await this.processPersonalInjuryTypePage();
        await this.processDetailsPage();
        await this.processUploadParticularsOfClaimPage();
        await this.processClaimValuePage();
        await this.processPbaNumberPage();
        await this.processStatementOfTruthCreateClaimPage();
        await this.processSubmitCreateClaimPage();
        await this.processConfirmCreateClaimPage();
      },
      ccdEvents.CREATE_CLAIM,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  @Step(classKey)
  async SmallTrack2v1() {
    await super.retryExuiEvent(
      async () => {
        await this.processCaseFilterPage();
        await this.processEligibilityPage();
        await this.processReferencesPage();
        await this.processCourtPage();
        await this.processClaimantPage();
        await this.processClaimantLitigationFriendPage();
        await this.processNotificationsPage();
        await this.processClaimantSolicitorOrganisationPage();
        await this.processClaimantSolicitorServiceAddressPage();
        await this.processAddAnotherClaimantPage();
        await this.processSecondClaimantPage();
        await this.processSecondClaimantLitigationFriendPage();
        await this.processDefendantPage();
        await this.processLegalRepresentationPage();
        await this.processDefendantSolicitorOrganisationPage();
        await this.processDefendantSolicitorServiceAddressPage();
        await this.processDefendantSolicitorEmailPage();
        await this.processClaimTypePage();
        await this.processPersonalInjuryTypePage();
        await this.processDetailsPage();
        await this.processUploadParticularsOfClaimPage();
        await this.processClaimValuePage();
        await this.processPbaNumberPage();
        await this.processStatementOfTruthCreateClaimPage();
        await this.processSubmitCreateClaimPage();
        await this.processConfirmCreateClaimPage();
      },
      ccdEvents.CREATE_CLAIM,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  @Step(classKey)
  async SmallTrack1v2SS() {
    await super.retryExuiEvent(
      async () => {
        await this.processCaseFilterPage();
        await this.processEligibilityPage();
        await this.processReferencesPage();
        await this.processCourtPage();
        await this.processClaimantPage();
        await this.processClaimantLitigationFriendPage();
        await this.processNotificationsPage();
        await this.processClaimantSolicitorOrganisationPage();
        await this.processClaimantSolicitorServiceAddressPage();
        await this.processNoAddAnotherClaimantPage();
        await this.processDefendantPage();
        await this.processLegalRepresentationPage();
        await this.processDefendantSolicitorOrganisationPage();
        await this.processDefendantSolicitorServiceAddressPage();
        await this.processDefendantSolicitorEmailPage();
        await this.processAddAnotherDefendantPage();
        await this.processSecondDefendantPage();
        await this.processDefendant2RepresentedPages();
        await this.processSameLegalRepresentativePage();
        await this.processClaimTypePage();
        await this.processPersonalInjuryTypePage();
        await this.processDetailsPage();
        await this.processUploadParticularsOfClaimPage();
        await this.processClaimValuePage();
        await this.processPbaNumberPage();
        await this.processStatementOfTruthCreateClaimPage();
        await this.processSubmitCreateClaimPage();
        await this.processConfirmCreateClaimPage();
      },
      ccdEvents.CREATE_CLAIM,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  @Step(classKey)
  async SmallTrack1v2DS() {
    await super.retryExuiEvent(
      async () => {
        await this.processCaseFilterPage();
        await this.processEligibilityPage();
        await this.processReferencesPage();
        await this.processCourtPage();
        await this.processClaimantPage();
        await this.processClaimantLitigationFriendPage();
        await this.processNotificationsPage();
        await this.processClaimantSolicitorOrganisationPage();
        await this.processClaimantSolicitorServiceAddressPage();
        await this.processNoAddAnotherClaimantPage();
        await this.processDefendantPage();
        await this.processLegalRepresentationPage();
        await this.processDefendantSolicitorOrganisationPage();
        await this.processDefendantSolicitorServiceAddressPage();
        await this.processDefendantSolicitorEmailPage();
        await this.processAddAnotherDefendantPage();
        await this.processSecondDefendantPage();
        await this.processDefendant2RepresentedPages();
        await this.processNoSameLegalRepresentativePage();
        await this.processSecondDefendantSolicitorOrganisationPage();
        await this.processSecondDefendantSolicitorServiceAddressPage();
        await this.processSecondDefendantSolicitorReferencePage();
        await this.processSecondDefendantSolicitorEmailPage();
        await this.processClaimTypePage();
        await this.processPersonalInjuryTypePage();
        await this.processDetailsPage();
        await this.processUploadParticularsOfClaimPage();
        await this.processClaimValuePage();
        await this.processPbaNumberPage();
        await this.processStatementOfTruthCreateClaimPage();
        await this.processSubmitCreateClaimPage();
        await this.processConfirmCreateClaimPage();
      },
      ccdEvents.CREATE_CLAIM,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  private async processCaseFilterPage() {
    const { caseFilterPage } = this.createClaimPageFactory;
    await caseFilterPage.verifyContent();
    await caseFilterPage.chooseUnSpec();
    await caseFilterPage.submit();
  }

  private async processEligibilityPage() {
    const { eligibilityPage } = this.createClaimPageFactory;
    await eligibilityPage.verifyContent();
    await eligibilityPage.submit();
  }

  private async processReferencesPage() {
    const { referencesPage } = this.createClaimPageFactory;
    await referencesPage.verifyContent();
    await referencesPage.enterReferences();
    await referencesPage.submit();
  }

  private async processCourtPage() {
    const { courtPage } = this.createClaimPageFactory;
    await courtPage.verifyContent();
    await courtPage.chooseCourtLocation();
    await courtPage.selectYesForRemoteHearing();
    await courtPage.submit();
  }

  private async processClaimantPage() {
    const { claimantPage } = this.createClaimPageFactory;
    await claimantPage.verifyContent();
    await claimantPage.chooseIndividualAndEnterDetails();
    await claimantPage.submit();
  }

  private async processClaimantLitigationFriendPage() {
    const { claimantLitigationFriendPage } = this.createClaimPageFactory;
    await claimantLitigationFriendPage.verifyContent();
    await claimantLitigationFriendPage.selectYes();
    await claimantLitigationFriendPage.enterLitigationFriendDetails();
    await claimantLitigationFriendPage.submit();
  }

  private async processNotificationsPage() {
    const { notificationsPage } = this.createClaimPageFactory;
    await notificationsPage.verifyContent();
    await notificationsPage.selectNo();
    await notificationsPage.submit();
  }

  private async processClaimantSolicitorOrganisationPage() {
    const { claimantSolicitorOrganisationPage } = this.createClaimPageFactory;
    await claimantSolicitorOrganisationPage.verifyContent();
    await claimantSolicitorOrganisationPage.enterReference();
    await claimantSolicitorOrganisationPage.submit();
  }

  private async processClaimantSolicitorServiceAddressPage() {
    const { claimantSolicitorServiceAddressPage } = this.createClaimPageFactory;
    await claimantSolicitorServiceAddressPage.verifyContent();
    await claimantSolicitorServiceAddressPage.selectYesAndEnterAddress();
    await claimantSolicitorServiceAddressPage.submit();
  }

  private async processAddAnotherClaimantPage() {
    const { addAnotherClaimantPage } = this.createClaimPageFactory;
    await addAnotherClaimantPage.verifyContent();
    await addAnotherClaimantPage.selectYes();
    await addAnotherClaimantPage.submit();
  }

  private async processNoAddAnotherClaimantPage() {
    const { addAnotherClaimantPage } = this.createClaimPageFactory;
    await addAnotherClaimantPage.verifyContent();
    await addAnotherClaimantPage.selectNo();
    await addAnotherClaimantPage.submit();
  }

  private async processSecondClaimantPage() {
    const { secondClaimantPage } = this.createClaimPageFactory;
    await secondClaimantPage.verifyContent();
    await secondClaimantPage.chooseIndividualAndEnterDetails();
    await secondClaimantPage.submit();
  }

  private async processSecondClaimantLitigationFriendPage() {
    const { secondClaimantLitigationFriendPage } = this.createClaimPageFactory;
    await secondClaimantLitigationFriendPage.verifyContent();
    await secondClaimantLitigationFriendPage.selectYes();
    await secondClaimantLitigationFriendPage.enterLitigationFriendDetails();
    await secondClaimantLitigationFriendPage.submit();
  }

  private async processDefendantPage() {
    const { defendantPage } = this.createClaimPageFactory;
    await defendantPage.verifyContent();
    await defendantPage.chooseIndividualAndEnterDetails();
    await defendantPage.submit();
  }

  private async processLegalRepresentationPage() {
    const { legalRepresentationPage } = this.createClaimPageFactory;
    await legalRepresentationPage.verifyContent();
    await legalRepresentationPage.selectYes();
    await legalRepresentationPage.submit();
  }

  private async processDefendantSolicitorOrganisationPage() {
    const { defendantSolicitorOrganisationPage } = this.createClaimPageFactory;
    await defendantSolicitorOrganisationPage.verifyContent();
    await defendantSolicitorOrganisationPage.selectOrganisation();
    await defendantSolicitorOrganisationPage.submit();
  }

  private async processDefendantSolicitorServiceAddressPage() {
    const { defendantSolicitorServiceAddressPage } = this.createClaimPageFactory;
    await defendantSolicitorServiceAddressPage.verifyContent();
    await defendantSolicitorServiceAddressPage.selectYesAndEnterAddress();
    await defendantSolicitorServiceAddressPage.submit();
  }

  private async processDefendantSolicitorEmailPage() {
    const { defendantSolicitorEmailPage } = this.createClaimPageFactory;
    await defendantSolicitorEmailPage.verifyContent();
    await defendantSolicitorEmailPage.enterEmail();
    await defendantSolicitorEmailPage.submit();
  }

  private async processNoAddAnotherDefendantPage() {
    const { addAnotherDefendantPage } = this.createClaimPageFactory;
    await addAnotherDefendantPage.verifyContent();
    await addAnotherDefendantPage.selectNo();
    await addAnotherDefendantPage.submit();
  }

  private async processAddAnotherDefendantPage() {
    const { addAnotherDefendantPage } = this.createClaimPageFactory;
    await addAnotherDefendantPage.verifyContent();
    await addAnotherDefendantPage.selectYes();
    await addAnotherDefendantPage.submit();
  }

  private async processSecondDefendantPage() {
    const { secondDefendantPage } = this.createClaimPageFactory;
    await secondDefendantPage.verifyContent();
    await secondDefendantPage.chooseIndividualAndEnterDetails();
    await secondDefendantPage.submit();
  }

  private async processDefendant2RepresentedPages() {
    const { secondDefendantLegalRepresentationPage } = this.createClaimPageFactory;
    await secondDefendantLegalRepresentationPage.verifyContent();
    await secondDefendantLegalRepresentationPage.selectYes();
    await secondDefendantLegalRepresentationPage.submit();
  }

  private async processSameLegalRepresentativePage() {
    const { sameLegalRepresentativePage } = this.createClaimPageFactory;
    await sameLegalRepresentativePage.verifyContent();
    await sameLegalRepresentativePage.selectYes();
    await sameLegalRepresentativePage.submit();
  }

  private async processNoSameLegalRepresentativePage() {
    const { sameLegalRepresentativePage } = this.createClaimPageFactory;
    await sameLegalRepresentativePage.verifyContent();
    await sameLegalRepresentativePage.selectNo();
    await sameLegalRepresentativePage.submit();
  }

  private async processSecondDefendantSolicitorOrganisationPage() {
    const { secondDefendantSolicitorOrganisationPage } = this.createClaimPageFactory;
    await secondDefendantSolicitorOrganisationPage.verifyContent();
    await secondDefendantSolicitorOrganisationPage.selectOrganisation();
    await secondDefendantSolicitorOrganisationPage.submit();
  }

  private async processSecondDefendantSolicitorServiceAddressPage() {
    const { secondDefendantSolicitorServiceAddressPage } = this.createClaimPageFactory;
    await secondDefendantSolicitorServiceAddressPage.verifyContent();
    await secondDefendantSolicitorServiceAddressPage.selectYesAndEnterAddress();
    await secondDefendantSolicitorServiceAddressPage.submit();
  }

  private async processSecondDefendantSolicitorReferencePage() {
    const { secondDefendantSolicitorReferencePage } = this.createClaimPageFactory;
    await secondDefendantSolicitorReferencePage.verifyContent();
    await secondDefendantSolicitorReferencePage.enterReference();
    await secondDefendantSolicitorReferencePage.submit();
  }

  private async processSecondDefendantSolicitorEmailPage() {
    const { secondDefendantSolicitorEmailPage } = this.createClaimPageFactory;
    await secondDefendantSolicitorEmailPage.verifyContent();
    await secondDefendantSolicitorEmailPage.enterEmail();
    await secondDefendantSolicitorEmailPage.submit();
  }

  private async processClaimTypePage() {
    const { claimTypePage } = this.createClaimPageFactory;
    await claimTypePage.verifyContent();
    await claimTypePage.selectPersonalInjury();
    await claimTypePage.submit();
  }

  private async processPersonalInjuryTypePage() {
    const { personalInjuryType } = this.createClaimPageFactory;
    await personalInjuryType.verifyContent();
    await personalInjuryType.selectRoadAccident();
    await personalInjuryType.submit();
  }

  private async processDetailsPage() {
    const { detailsPage } = this.createClaimPageFactory;
    await detailsPage.verifyContent();
    await detailsPage.enterDetails();
    await detailsPage.submit();
  }

  private async processUploadParticularsOfClaimPage() {
    const { uploadParticularsOfClaimPage } = this.createClaimPageFactory;
    await uploadParticularsOfClaimPage.verifyContent();
    await uploadParticularsOfClaimPage.selectNo();
    await uploadParticularsOfClaimPage.submit();
  }

  private async processSmallTrackClaimPages() {
    const { claimValuePage } = this.createClaimPageFactory;
    await claimValuePage.verifyContent();
    await claimValuePage.enterClaimDetailsSmallTrack();
    await claimValuePage.submit();

    const { pbaNumberPage } = this.createClaimPageFactory;
    await pbaNumberPage.verifyContent();
    await pbaNumberPage.submit();
  }

  private async processClaimValuePage() {
    const { claimValuePage } = this.createClaimPageFactory;
    await claimValuePage.verifyContent();
    await claimValuePage.enterClaimDetailsSmallTrack();
    await claimValuePage.submit();
  }

  private async processPbaNumberPage() {
    const { pbaNumberPage } = this.createClaimPageFactory;
    await pbaNumberPage.verifyContent();
    await pbaNumberPage.submit();
  }

  private async processFastTrackClaimPages() {
    const { claimValuePage } = this.createClaimPageFactory;
    await claimValuePage.verifyContent();
    await claimValuePage.enterClaimDetailsFastTrack();
    await claimValuePage.submit();

    const { pbaNumberPage } = this.createClaimPageFactory;
    await pbaNumberPage.verifyContent();
    await pbaNumberPage.submit();
  }

  private async processStatementOfTruthCreateClaimPage() {
    const { statementOfTruthCreateClaimPage } = this.createClaimPageFactory;
    await statementOfTruthCreateClaimPage.verifyContent();
    await statementOfTruthCreateClaimPage.enterDetails();
    await statementOfTruthCreateClaimPage.submit();
  }

  private async processSubmitCreateClaimPage() {
    const { submitCreateClaimPage } = this.createClaimPageFactory;
    await submitCreateClaimPage.verifyContent();
    await submitCreateClaimPage.submit();
  }

  private async processConfirmCreateClaimPage() {
    const { confirmCreateClaimPage } = this.createClaimPageFactory;
    await confirmCreateClaimPage.verifyContent();
    await confirmCreateClaimPage.submit();
  }
}
