import BaseExuiSteps from '../../../../../base/base-exui-steps';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import TestData from '../../../../../models/test-data';
import ExuiDashboardPageFactory from '../../../../../pages/exui/exui-dashboard/exui-dashboard-page-factory';
import CreateClaimPageFactory from '../../../../../pages/exui/solicitor-events/create-claim/create-claim-page-factory';
import RequestsFactory from '../../../../../requests/requests-factory';
import ccdEvents from '../../../../../constants/ccd-events';
import { claimantSolicitorUser } from '../../../../../config/users/exui-users';

@AllMethodsStep()
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

  async SmallTrack1v1() {
    await super.retryExuiEvent(
      async () => {
        const { caseFilterPage } = this.createClaimPageFactory;
        await caseFilterPage.verifyContent();
        await caseFilterPage.chooseUnSpec();
        await caseFilterPage.submit();

        const { eligibilityPage } = this.createClaimPageFactory;
        await eligibilityPage.verifyContent();
        await eligibilityPage.submit();

        const { referencesPage } = this.createClaimPageFactory;
        await referencesPage.verifyContent();
        await referencesPage.enterReferences();
        await referencesPage.submit();

        const { courtPage } = this.createClaimPageFactory;
        await courtPage.verifyContent();
        await courtPage.chooseCourtLocation();
        await courtPage.selectYesForRemoteHearing();
        await courtPage.submit();

        const { claimantPage } = this.createClaimPageFactory;
        await claimantPage.verifyContent();
        await claimantPage.chooseIndividualAndEnterDetails();
        await claimantPage.submit();

        const { claimantLitigationFriendPage } = this.createClaimPageFactory;
        await claimantLitigationFriendPage.verifyContent();
        await claimantLitigationFriendPage.selectYes();
        await claimantLitigationFriendPage.enterLitigationFriendDetails();
        await claimantLitigationFriendPage.submit();

        const { notificationsPage } = this.createClaimPageFactory;
        await notificationsPage.verifyContent();
        await notificationsPage.selectNo();
        await notificationsPage.submit();

        const { claimantSolicitorOrganisationPage } = this.createClaimPageFactory;
        await claimantSolicitorOrganisationPage.verifyContent();
        await claimantSolicitorOrganisationPage.selectOrganisation();
        await claimantSolicitorOrganisationPage.submit();

        const { claimantSolicitorServiceAddressPage } = this.createClaimPageFactory;
        await claimantSolicitorServiceAddressPage.verifyContent();
        await claimantSolicitorServiceAddressPage.selectYesAndEnterAddress();
        await claimantSolicitorServiceAddressPage.submit();

        const { addAnotherClaimantPage } = this.createClaimPageFactory;
        await addAnotherClaimantPage.verifyContent();
        await addAnotherClaimantPage.selectNo();
        await addAnotherClaimantPage.submit();

        const { defendantPage } = this.createClaimPageFactory;
        await defendantPage.verifyContent();
        await defendantPage.chooseIndividualAndEnterDetails();
        await defendantPage.submit();

        const { legalRepresentationPage } = this.createClaimPageFactory;
        await legalRepresentationPage.verifyContent();
        await legalRepresentationPage.selectYes();
        await legalRepresentationPage.submit();

        const { defendantSolicitorOrganisationPage } = this.createClaimPageFactory;
        await defendantSolicitorOrganisationPage.verifyContent();
        await defendantSolicitorOrganisationPage.selectOrganisation();
        await defendantSolicitorOrganisationPage.submit();

        const { defendantSolicitorServiceAddressPage } = this.createClaimPageFactory;
        await defendantSolicitorServiceAddressPage.verifyContent();
        await defendantSolicitorServiceAddressPage.selectYesAndEnterAddress();
        await defendantSolicitorServiceAddressPage.submit();

        const { defendantSolicitorEmailPage } = this.createClaimPageFactory;
        await defendantSolicitorEmailPage.verifyContent();
        await defendantSolicitorEmailPage.enterEmail();
        await defendantSolicitorEmailPage.submit();

        const { addAnotherDefendantPage } = this.createClaimPageFactory;
        await addAnotherDefendantPage.verifyContent();
        await addAnotherDefendantPage.selectNo();
        await addAnotherDefendantPage.submit();

        const { claimTypePage } = this.createClaimPageFactory;
        await claimTypePage.verifyContent();
        await claimTypePage.selectPersonalInjury();
        await claimTypePage.submit();

        const { personalInjuryType } = this.createClaimPageFactory;
        await personalInjuryType.verifyContent();
        await personalInjuryType.selectRoadAccident();
        await personalInjuryType.submit();

        const { detailsPage } = this.createClaimPageFactory;
        await detailsPage.verifyContent();
        await detailsPage.enterDetails();
        await detailsPage.submit();

        const { uploadParticularsOfClaimPage } = this.createClaimPageFactory;
        await uploadParticularsOfClaimPage.verifyContent();
        await uploadParticularsOfClaimPage.selectNo();
        await uploadParticularsOfClaimPage.submit();

        const { claimValuePage } = this.createClaimPageFactory;
        await claimValuePage.verifyContent();
        await claimValuePage.enterClaimDetailsSmallTrack();
        await claimValuePage.submit();

        const { pbaNumberPage } = this.createClaimPageFactory;
        await pbaNumberPage.verifyContent();
        await pbaNumberPage.submit();

        const { statementOfTruthCreateClaimPage } = this.createClaimPageFactory;
        await statementOfTruthCreateClaimPage.verifyContent();
        await statementOfTruthCreateClaimPage.enterDetails();
        await statementOfTruthCreateClaimPage.submit();

        const { submitCreateClaimPage } = this.createClaimPageFactory;
        await submitCreateClaimPage.verifyContent();
        await submitCreateClaimPage.submit();

        const { confirmCreateClaimPage } = this.createClaimPageFactory;
        await confirmCreateClaimPage.verifyContent();
        await confirmCreateClaimPage.submit();
      },
      ccdEvents.CREATE_CLAIM,
      claimantSolicitorUser,
      { retries: 0 },
    );
  }

  async SmallTrack2v1() {
    await super.retryExuiEvent(
      async () => {
        const { caseFilterPage } = this.createClaimPageFactory;
        await caseFilterPage.verifyContent();
        await caseFilterPage.chooseUnSpec();
        await caseFilterPage.submit();

        const { eligibilityPage } = this.createClaimPageFactory;
        await eligibilityPage.verifyContent();
        await eligibilityPage.submit();

        const { referencesPage } = this.createClaimPageFactory;
        await referencesPage.verifyContent();
        await referencesPage.enterReferences();
        await referencesPage.submit();

        const { courtPage } = this.createClaimPageFactory;
        await courtPage.verifyContent();
        await courtPage.chooseCourtLocation();
        await courtPage.selectYesForRemoteHearing();
        await courtPage.submit();

        const { claimantPage } = this.createClaimPageFactory;
        await claimantPage.verifyContent();
        await claimantPage.chooseIndividualAndEnterDetails();
        await claimantPage.submit();

        const { claimantLitigationFriendPage } = this.createClaimPageFactory;
        await claimantLitigationFriendPage.verifyContent();
        await claimantLitigationFriendPage.selectYes();
        await claimantLitigationFriendPage.enterLitigationFriendDetails();
        await claimantLitigationFriendPage.submit();

        const { notificationsPage } = this.createClaimPageFactory;
        await notificationsPage.verifyContent();
        await notificationsPage.selectNo();
        await notificationsPage.submit();

        const { claimantSolicitorOrganisationPage } = this.createClaimPageFactory;
        await claimantSolicitorOrganisationPage.verifyContent();
        await claimantSolicitorOrganisationPage.selectOrganisation();
        await claimantSolicitorOrganisationPage.submit();

        const { claimantSolicitorServiceAddressPage } = this.createClaimPageFactory;
        await claimantSolicitorServiceAddressPage.verifyContent();
        await claimantSolicitorServiceAddressPage.selectYesAndEnterAddress();
        await claimantSolicitorServiceAddressPage.submit();

        const { addAnotherClaimantPage } = this.createClaimPageFactory;
        await addAnotherClaimantPage.verifyContent();
        await addAnotherClaimantPage.selectYes();
        await addAnotherClaimantPage.submit();

        const { secondClaimantPage } = this.createClaimPageFactory;
        await secondClaimantPage.verifyContent();
        await secondClaimantPage.chooseIndividualAndEnterDetails();
        await secondClaimantPage.submit();

        const { secondClaimantLitigationFriendPage } = this.createClaimPageFactory;
        await secondClaimantLitigationFriendPage.verifyContent();
        await secondClaimantLitigationFriendPage.enterLitigationFriendDetails();
        await secondClaimantPage.submit();

        const { defendantPage } = this.createClaimPageFactory;
        await defendantPage.verifyContent();
        await defendantPage.chooseIndividualAndEnterDetails();
        await defendantPage.submit();

        const { legalRepresentationPage } = this.createClaimPageFactory;
        await legalRepresentationPage.verifyContent();
        await legalRepresentationPage.selectYes();
        await legalRepresentationPage.submit();

        const { defendantSolicitorOrganisationPage } = this.createClaimPageFactory;
        await defendantSolicitorOrganisationPage.verifyContent();
        await defendantSolicitorOrganisationPage.selectOrganisation();
        await defendantSolicitorOrganisationPage.submit();

        const { defendantSolicitorServiceAddressPage } = this.createClaimPageFactory;
        await defendantSolicitorServiceAddressPage.verifyContent();
        await defendantSolicitorServiceAddressPage.selectYesAndEnterAddress();
        await defendantSolicitorServiceAddressPage.submit();

        const { defendantSolicitorEmailPage } = this.createClaimPageFactory;
        await defendantSolicitorEmailPage.verifyContent();
        await defendantSolicitorEmailPage.enterEmail();
        await defendantSolicitorEmailPage.submit();

        const { addAnotherDefendantPage } = this.createClaimPageFactory;
        await addAnotherDefendantPage.verifyContent();
        await addAnotherDefendantPage.selectNo();
        await addAnotherDefendantPage.submit();

        const { claimTypePage } = this.createClaimPageFactory;
        await claimTypePage.verifyContent();
        await claimTypePage.selectPersonalInjury();
        await claimTypePage.submit();

        const { personalInjuryType } = this.createClaimPageFactory;
        await personalInjuryType.verifyContent();
        await personalInjuryType.selectRoadAccident();
        await personalInjuryType.submit();

        const { detailsPage } = this.createClaimPageFactory;
        await detailsPage.verifyContent();
        await detailsPage.enterDetails();
        await detailsPage.submit();

        const { uploadParticularsOfClaimPage } = this.createClaimPageFactory;
        await uploadParticularsOfClaimPage.verifyContent();
        await uploadParticularsOfClaimPage.selectNo();
        await uploadParticularsOfClaimPage.submit();

        const { claimValuePage } = this.createClaimPageFactory;
        await claimValuePage.verifyContent();
        await claimValuePage.enterClaimDetailsSmallTrack();
        await claimValuePage.submit();

        const { pbaNumberPage } = this.createClaimPageFactory;
        await pbaNumberPage.verifyContent();
        await pbaNumberPage.submit();

        const { statementOfTruthCreateClaimPage } = this.createClaimPageFactory;
        await statementOfTruthCreateClaimPage.verifyContent();
        await statementOfTruthCreateClaimPage.enterDetails();
        await statementOfTruthCreateClaimPage.submit();

        const { submitCreateClaimPage } = this.createClaimPageFactory;
        await submitCreateClaimPage.verifyContent();
        await submitCreateClaimPage.submit();

        const { confirmCreateClaimPage } = this.createClaimPageFactory;
        await confirmCreateClaimPage.verifyContent();
        await confirmCreateClaimPage.submit();
      },
      ccdEvents.CREATE_CLAIM,
      claimantSolicitorUser,
      { retries: 0 },
    );
  }

  async SmallTrack1v2SS() {
    await super.retryExuiEvent(
      async () => {
        const { caseFilterPage } = this.createClaimPageFactory;
        await caseFilterPage.verifyContent();
        await caseFilterPage.chooseUnSpec();
        await caseFilterPage.submit();

        const { eligibilityPage } = this.createClaimPageFactory;
        await eligibilityPage.verifyContent();
        await eligibilityPage.submit();

        const { referencesPage } = this.createClaimPageFactory;
        await referencesPage.verifyContent();
        await referencesPage.enterReferences();
        await referencesPage.submit();

        const { courtPage } = this.createClaimPageFactory;
        await courtPage.verifyContent();
        await courtPage.chooseCourtLocation();
        await courtPage.selectYesForRemoteHearing();
        await courtPage.submit();

        const { claimantPage } = this.createClaimPageFactory;
        await claimantPage.verifyContent();
        await claimantPage.chooseIndividualAndEnterDetails();
        await claimantPage.submit();

        const { claimantLitigationFriendPage } = this.createClaimPageFactory;
        await claimantLitigationFriendPage.verifyContent();
        await claimantLitigationFriendPage.selectYes();
        await claimantLitigationFriendPage.enterLitigationFriendDetails();
        await claimantLitigationFriendPage.submit();

        const { notificationsPage } = this.createClaimPageFactory;
        await notificationsPage.verifyContent();
        await notificationsPage.selectNo();
        await notificationsPage.submit();

        const { claimantSolicitorOrganisationPage } = this.createClaimPageFactory;
        await claimantSolicitorOrganisationPage.verifyContent();
        await claimantSolicitorOrganisationPage.selectOrganisation();
        await claimantSolicitorOrganisationPage.submit();

        const { claimantSolicitorServiceAddressPage } = this.createClaimPageFactory;
        await claimantSolicitorServiceAddressPage.verifyContent();
        await claimantSolicitorServiceAddressPage.selectYesAndEnterAddress();
        await claimantSolicitorServiceAddressPage.submit();

        const { addAnotherClaimantPage } = this.createClaimPageFactory;
        await addAnotherClaimantPage.verifyContent();
        await addAnotherClaimantPage.selectNo();
        await addAnotherClaimantPage.submit();

        const { defendantPage } = this.createClaimPageFactory;
        await defendantPage.verifyContent();
        await defendantPage.chooseIndividualAndEnterDetails();
        await defendantPage.submit();

        const { legalRepresentationPage } = this.createClaimPageFactory;
        await legalRepresentationPage.verifyContent();
        await legalRepresentationPage.selectYes();
        await legalRepresentationPage.submit();

        const { defendantSolicitorOrganisationPage } = this.createClaimPageFactory;
        await defendantSolicitorOrganisationPage.verifyContent();
        await defendantSolicitorOrganisationPage.selectOrganisation();
        await defendantSolicitorOrganisationPage.submit();

        const { defendantSolicitorServiceAddressPage } = this.createClaimPageFactory;
        await defendantSolicitorServiceAddressPage.verifyContent();
        await defendantSolicitorServiceAddressPage.selectYesAndEnterAddress();
        await defendantSolicitorServiceAddressPage.submit();

        const { defendantSolicitorEmailPage } = this.createClaimPageFactory;
        await defendantSolicitorEmailPage.verifyContent();
        await defendantSolicitorEmailPage.enterEmail();
        await defendantSolicitorEmailPage.submit();

        const { addAnotherDefendantPage } = this.createClaimPageFactory;
        await addAnotherDefendantPage.verifyContent();
        await addAnotherDefendantPage.selectYes();
        await addAnotherDefendantPage.submit();

        const { secondDefendantPage } = this.createClaimPageFactory;
        await secondDefendantPage.verifyContent();
        await secondDefendantPage.chooseIndividualAndEnterDetails();
        await secondDefendantPage.submit();

        const { secondDefendantLegalRepresentationPage } = this.createClaimPageFactory;
        await secondDefendantLegalRepresentationPage.verifyContent();
        await secondDefendantLegalRepresentationPage.selectYes();
        await secondDefendantLegalRepresentationPage.submit();

        const { sameLegalRepresentativePage } = this.createClaimPageFactory;
        await sameLegalRepresentativePage.verifyContent();
        await sameLegalRepresentativePage.selectYes();
        await sameLegalRepresentativePage.submit();

        const { claimTypePage } = this.createClaimPageFactory;
        await claimTypePage.verifyContent();
        await claimTypePage.selectPersonalInjury();
        await claimTypePage.submit();

        const { personalInjuryType } = this.createClaimPageFactory;
        await personalInjuryType.verifyContent();
        await personalInjuryType.selectRoadAccident();
        await personalInjuryType.submit();

        const { detailsPage } = this.createClaimPageFactory;
        await detailsPage.verifyContent();
        await detailsPage.enterDetails();
        await detailsPage.submit();

        const { uploadParticularsOfClaimPage } = this.createClaimPageFactory;
        await uploadParticularsOfClaimPage.verifyContent();
        await uploadParticularsOfClaimPage.selectNo();
        await uploadParticularsOfClaimPage.submit();

        const { claimValuePage } = this.createClaimPageFactory;
        await claimValuePage.verifyContent();
        await claimValuePage.enterClaimDetailsSmallTrack();
        await claimValuePage.submit();

        const { pbaNumberPage } = this.createClaimPageFactory;
        await pbaNumberPage.verifyContent();
        await pbaNumberPage.submit();

        const { statementOfTruthCreateClaimPage } = this.createClaimPageFactory;
        await statementOfTruthCreateClaimPage.verifyContent();
        await statementOfTruthCreateClaimPage.enterDetails();
        await statementOfTruthCreateClaimPage.submit();

        const { submitCreateClaimPage } = this.createClaimPageFactory;
        await submitCreateClaimPage.verifyContent();
        await submitCreateClaimPage.submit();

        const { confirmCreateClaimPage } = this.createClaimPageFactory;
        await confirmCreateClaimPage.verifyContent();
        await confirmCreateClaimPage.submit();
      },
      ccdEvents.CREATE_CLAIM,
      claimantSolicitorUser,
      { retries: 0 },
    );
  }

  async SmallTrack1v2DS() {
    await super.retryExuiEvent(
      async () => {
        const { caseFilterPage } = this.createClaimPageFactory;
        await caseFilterPage.verifyContent();
        await caseFilterPage.chooseUnSpec();
        await caseFilterPage.submit();

        const { eligibilityPage } = this.createClaimPageFactory;
        await eligibilityPage.verifyContent();
        await eligibilityPage.submit();

        const { referencesPage } = this.createClaimPageFactory;
        await referencesPage.verifyContent();
        await referencesPage.enterReferences();
        await referencesPage.submit();

        const { courtPage } = this.createClaimPageFactory;
        await courtPage.verifyContent();
        await courtPage.chooseCourtLocation();
        await courtPage.selectYesForRemoteHearing();
        await courtPage.submit();

        const { claimantPage } = this.createClaimPageFactory;
        await claimantPage.verifyContent();
        await claimantPage.chooseIndividualAndEnterDetails();
        await claimantPage.submit();

        const { claimantLitigationFriendPage } = this.createClaimPageFactory;
        await claimantLitigationFriendPage.verifyContent();
        await claimantLitigationFriendPage.selectYes();
        await claimantLitigationFriendPage.enterLitigationFriendDetails();
        await claimantLitigationFriendPage.submit();

        const { notificationsPage } = this.createClaimPageFactory;
        await notificationsPage.verifyContent();
        await notificationsPage.selectNo();
        await notificationsPage.submit();

        const { claimantSolicitorOrganisationPage } = this.createClaimPageFactory;
        await claimantSolicitorOrganisationPage.verifyContent();
        await claimantSolicitorOrganisationPage.selectOrganisation();
        await claimantSolicitorOrganisationPage.submit();

        const { claimantSolicitorServiceAddressPage } = this.createClaimPageFactory;
        await claimantSolicitorServiceAddressPage.verifyContent();
        await claimantSolicitorServiceAddressPage.selectYesAndEnterAddress();
        await claimantSolicitorServiceAddressPage.submit();

        const { addAnotherClaimantPage } = this.createClaimPageFactory;
        await addAnotherClaimantPage.verifyContent();
        await addAnotherClaimantPage.selectNo();
        await addAnotherClaimantPage.submit();

        const { defendantPage } = this.createClaimPageFactory;
        await defendantPage.verifyContent();
        await defendantPage.chooseIndividualAndEnterDetails();
        await defendantPage.submit();

        const { legalRepresentationPage } = this.createClaimPageFactory;
        await legalRepresentationPage.verifyContent();
        await legalRepresentationPage.selectYes();
        await legalRepresentationPage.submit();

        const { defendantSolicitorOrganisationPage } = this.createClaimPageFactory;
        await defendantSolicitorOrganisationPage.verifyContent();
        await defendantSolicitorOrganisationPage.selectOrganisation();
        await defendantSolicitorOrganisationPage.submit();

        const { defendantSolicitorServiceAddressPage } = this.createClaimPageFactory;
        await defendantSolicitorServiceAddressPage.verifyContent();
        await defendantSolicitorServiceAddressPage.selectYesAndEnterAddress();
        await defendantSolicitorServiceAddressPage.submit();

        const { defendantSolicitorEmailPage } = this.createClaimPageFactory;
        await defendantSolicitorEmailPage.verifyContent();
        await defendantSolicitorEmailPage.enterEmail();
        await defendantSolicitorEmailPage.submit();

        const { addAnotherDefendantPage } = this.createClaimPageFactory;
        await addAnotherDefendantPage.verifyContent();
        await addAnotherDefendantPage.selectYes();
        await addAnotherDefendantPage.submit();

        const { secondDefendantPage } = this.createClaimPageFactory;
        await secondDefendantPage.verifyContent();
        await secondDefendantPage.chooseIndividualAndEnterDetails();
        await secondDefendantPage.submit();

        const { secondDefendantLegalRepresentationPage } = this.createClaimPageFactory;
        await secondDefendantLegalRepresentationPage.verifyContent();
        await secondDefendantLegalRepresentationPage.selectYes();
        await secondDefendantLegalRepresentationPage.submit();

        const { sameLegalRepresentativePage } = this.createClaimPageFactory;
        await sameLegalRepresentativePage.verifyContent();
        await sameLegalRepresentativePage.selectNo();
        await sameLegalRepresentativePage.submit();

        const { secondDefendantSolicitorOrganisationPage } = this.createClaimPageFactory;
        await secondDefendantSolicitorOrganisationPage.verifyContent();
        await secondDefendantSolicitorOrganisationPage.selectOrganisation();
        await secondDefendantLegalRepresentationPage.submit();

        const { secondDefendantSolicitorServiceAddressPage } = this.createClaimPageFactory;
        await secondDefendantSolicitorServiceAddressPage.verifyContent();
        await secondDefendantSolicitorServiceAddressPage.selectYesAndEnterAddress();
        await secondDefendantSolicitorServiceAddressPage.submit();

        const { secondDefendantSolicitorReferencePage } = this.createClaimPageFactory;
        await secondDefendantSolicitorReferencePage.verifyContent();
        await secondDefendantSolicitorReferencePage.enterReference();
        await secondDefendantSolicitorReferencePage.submit();

        const { secondDefendantSolicitorEmailPage } = this.createClaimPageFactory;
        await secondDefendantSolicitorEmailPage.verifyContent();
        await secondDefendantSolicitorEmailPage.enterEmail();
        await secondDefendantSolicitorEmailPage.submit();

        const { claimTypePage } = this.createClaimPageFactory;
        await claimTypePage.verifyContent();
        await claimTypePage.selectPersonalInjury();
        await claimTypePage.submit();

        const { personalInjuryType } = this.createClaimPageFactory;
        await personalInjuryType.verifyContent();
        await personalInjuryType.selectRoadAccident();
        await personalInjuryType.submit();

        const { detailsPage } = this.createClaimPageFactory;
        await detailsPage.verifyContent();
        await detailsPage.enterDetails();
        await detailsPage.submit();

        const { uploadParticularsOfClaimPage } = this.createClaimPageFactory;
        await uploadParticularsOfClaimPage.verifyContent();
        await uploadParticularsOfClaimPage.selectNo();
        await uploadParticularsOfClaimPage.submit();

        const { claimValuePage } = this.createClaimPageFactory;
        await claimValuePage.verifyContent();
        await claimValuePage.enterClaimDetailsSmallTrack();
        await claimValuePage.submit();

        const { pbaNumberPage } = this.createClaimPageFactory;
        await pbaNumberPage.verifyContent();
        await pbaNumberPage.submit();

        const { statementOfTruthCreateClaimPage } = this.createClaimPageFactory;
        await statementOfTruthCreateClaimPage.verifyContent();
        await statementOfTruthCreateClaimPage.enterDetails();
        await statementOfTruthCreateClaimPage.submit();

        const { submitCreateClaimPage } = this.createClaimPageFactory;
        await submitCreateClaimPage.verifyContent();
        await submitCreateClaimPage.submit();

        const { confirmCreateClaimPage } = this.createClaimPageFactory;
        await confirmCreateClaimPage.verifyContent();
        await confirmCreateClaimPage.submit();
      },
      ccdEvents.CREATE_CLAIM,
      claimantSolicitorUser,
      { retries: 0 },
    );
  }
}
