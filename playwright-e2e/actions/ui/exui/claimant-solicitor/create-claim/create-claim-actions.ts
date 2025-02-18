import TestData from '../../../../../models/test-data';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BaseTestData from '../../../../../base/base-test-data';
import CreateClaimPageFactory from '../../../../../pages/exui/claimant-defendant-solicitor/create-claim/create-claim-page-factory';

@AllMethodsStep()
export default class CreateClaimActions extends BaseTestData {
  private createClaimPageFactory: CreateClaimPageFactory;

  constructor(createClaimPageFactory: CreateClaimPageFactory, testData: TestData) {
    super(testData);
    this.createClaimPageFactory = createClaimPageFactory;
  }

  async caseFilterPage() {
    const { caseFilterPage } = this.createClaimPageFactory;
    await caseFilterPage.verifyContent();
    await caseFilterPage.chooseUnSpec();
    await caseFilterPage.submit();
  }

  async eligibilityPage() {
    const { eligibilityPage } = this.createClaimPageFactory;
    await eligibilityPage.verifyContent();
    await eligibilityPage.submit();
  }

  async referencesPage() {
    const { referencesPage } = this.createClaimPageFactory;
    await referencesPage.verifyContent();
    await referencesPage.enterReferences();
    await referencesPage.submit();
  }

  async courtPage() {
    const { courtPage } = this.createClaimPageFactory;
    await courtPage.verifyContent();
    await courtPage.chooseCourtLocation();
    await courtPage.selectYesForRemoteHearing();
    await courtPage.submit();
  }

  async claimantPage() {
    const { claimantPage } = this.createClaimPageFactory;
    await claimantPage.verifyContent();
    await claimantPage.chooseIndividualAndEnterDetails();
    await claimantPage.submit();
  }

  async claimantLitigationFriendPage() {
    const { claimantLitigationFriendPage } = this.createClaimPageFactory;
    await claimantLitigationFriendPage.verifyContent();
    await claimantLitigationFriendPage.selectNo();
    // await claimantLitigationFriendPage.enterLitigationFriendDetails();
    await claimantLitigationFriendPage.submit();
  }

  async notificationsPage() {
    const { notificationsPage } = this.createClaimPageFactory;
    await notificationsPage.verifyContent();
    await notificationsPage.selectNo();
    await notificationsPage.submit();
  }

  async claimantSolicitorOrganisationPage() {
    const { claimantSolicitorOrganisationPage } = this.createClaimPageFactory;
    await claimantSolicitorOrganisationPage.verifyContent();
    await claimantSolicitorOrganisationPage.enterReference();
    await claimantSolicitorOrganisationPage.submit();
  }

  async claimantSolicitorServiceAddressPage() {
    const { claimantSolicitorServiceAddressPage } = this.createClaimPageFactory;
    await claimantSolicitorServiceAddressPage.verifyContent();
    await claimantSolicitorServiceAddressPage.selectYesAndEnterAddress();
    await claimantSolicitorServiceAddressPage.submit();
  }

  async addAnotherClaimantPage() {
    const { addAnotherClaimantPage } = this.createClaimPageFactory;
    await addAnotherClaimantPage.verifyContent();
    await addAnotherClaimantPage.selectYes();
    await addAnotherClaimantPage.submit();
  }

  async noAddAnotherClaimantPage() {
    const { addAnotherClaimantPage } = this.createClaimPageFactory;
    await addAnotherClaimantPage.verifyContent();
    await addAnotherClaimantPage.selectNo();
    await addAnotherClaimantPage.submit();
  }

  async secondClaimantPage() {
    const { secondClaimantPage } = this.createClaimPageFactory;
    await secondClaimantPage.verifyContent();
    await secondClaimantPage.chooseIndividualAndEnterDetails();
    await secondClaimantPage.submit();
  }

  async secondClaimantLitigationFriendPage() {
    const { secondClaimantLitigationFriendPage } = this.createClaimPageFactory;
    await secondClaimantLitigationFriendPage.verifyContent();
    await secondClaimantLitigationFriendPage.selectYes();
    await secondClaimantLitigationFriendPage.enterLitigationFriendDetails();
    await secondClaimantLitigationFriendPage.submit();
  }

  async defendantPage() {
    const { defendantPage } = this.createClaimPageFactory;
    await defendantPage.verifyContent();
    await defendantPage.chooseIndividualAndEnterDetails();
    await defendantPage.submit();
  }

  async legalRepresentationPage() {
    const { legalRepresentationPage } = this.createClaimPageFactory;
    await legalRepresentationPage.verifyContent();
    await legalRepresentationPage.selectYes();
    await legalRepresentationPage.submit();
  }

  async defendantSolicitorOrganisationPage() {
    const { defendantSolicitorOrganisationPage } = this.createClaimPageFactory;
    await defendantSolicitorOrganisationPage.verifyContent();
    await defendantSolicitorOrganisationPage.selectOrganisation();
    await defendantSolicitorOrganisationPage.submit();
  }

  async defendantSolicitorServiceAddressPage() {
    const { defendantSolicitorServiceAddressPage } = this.createClaimPageFactory;
    await defendantSolicitorServiceAddressPage.verifyContent();
    await defendantSolicitorServiceAddressPage.selectYesAndEnterAddress();
    await defendantSolicitorServiceAddressPage.submit();
  }

  async defendantSolicitorEmailPage() {
    const { defendantSolicitorEmailPage } = this.createClaimPageFactory;
    await defendantSolicitorEmailPage.verifyContent();
    await defendantSolicitorEmailPage.enterEmail();
    await defendantSolicitorEmailPage.submit();
  }

  async noAddAnotherDefendantPage() {
    const { addAnotherDefendantPage } = this.createClaimPageFactory;
    await addAnotherDefendantPage.verifyContent();
    await addAnotherDefendantPage.selectNo();
    await addAnotherDefendantPage.submit();
  }

  async addAnotherDefendantPage() {
    const { addAnotherDefendantPage } = this.createClaimPageFactory;
    await addAnotherDefendantPage.verifyContent();
    await addAnotherDefendantPage.selectYes();
    await addAnotherDefendantPage.submit();
  }

  async secondDefendantPage() {
    const { secondDefendantPage } = this.createClaimPageFactory;
    await secondDefendantPage.verifyContent();
    await secondDefendantPage.chooseIndividualAndEnterDetails();
    await secondDefendantPage.submit();
  }

  async defendant2RepresentedPages() {
    const { secondDefendantLegalRepresentationPage } = this.createClaimPageFactory;
    await secondDefendantLegalRepresentationPage.verifyContent();
    await secondDefendantLegalRepresentationPage.selectYes();
    await secondDefendantLegalRepresentationPage.submit();
  }

  async sameLegalRepresentativePage() {
    const { sameLegalRepresentativePage } = this.createClaimPageFactory;
    await sameLegalRepresentativePage.verifyContent();
    await sameLegalRepresentativePage.selectYes();
    await sameLegalRepresentativePage.submit();
  }

  async noSameLegalRepresentativePage() {
    const { sameLegalRepresentativePage } = this.createClaimPageFactory;
    await sameLegalRepresentativePage.verifyContent();
    await sameLegalRepresentativePage.selectNo();
    await sameLegalRepresentativePage.submit();
  }

  async secondDefendantSolicitorOrganisationPage() {
    const { secondDefendantSolicitorOrganisationPage } = this.createClaimPageFactory;
    await secondDefendantSolicitorOrganisationPage.verifyContent();
    await secondDefendantSolicitorOrganisationPage.selectOrganisation();
    await secondDefendantSolicitorOrganisationPage.submit();
  }

  async secondDefendantSolicitorServiceAddressPage() {
    const { secondDefendantSolicitorServiceAddressPage } = this.createClaimPageFactory;
    await secondDefendantSolicitorServiceAddressPage.verifyContent();
    await secondDefendantSolicitorServiceAddressPage.selectYesAndEnterAddress();
    await secondDefendantSolicitorServiceAddressPage.submit();
  }

  async secondDefendantSolicitorReferencePage() {
    const { secondDefendantSolicitorReferencePage } = this.createClaimPageFactory;
    await secondDefendantSolicitorReferencePage.verifyContent();
    await secondDefendantSolicitorReferencePage.enterReference();
    await secondDefendantSolicitorReferencePage.submit();
  }

  async secondDefendantSolicitorEmailPage() {
    const { secondDefendantSolicitorEmailPage } = this.createClaimPageFactory;
    await secondDefendantSolicitorEmailPage.verifyContent();
    await secondDefendantSolicitorEmailPage.enterEmail();
    await secondDefendantSolicitorEmailPage.submit();
  }

  async claimTypePage() {
    const { claimTypePage } = this.createClaimPageFactory;
    await claimTypePage.verifyContent();
    await claimTypePage.selectPersonalInjury();
    await claimTypePage.submit();
  }

  async personalInjuryTypePage() {
    const { personalInjuryType } = this.createClaimPageFactory;
    await personalInjuryType.verifyContent();
    await personalInjuryType.selectRoadAccident();
    await personalInjuryType.submit();
  }

  async detailsPage() {
    const { detailsPage } = this.createClaimPageFactory;
    await detailsPage.verifyContent();
    await detailsPage.enterDetails();
    await detailsPage.submit();
  }

  async uploadParticularsOfClaimPage() {
    const { uploadParticularsOfClaimPage } = this.createClaimPageFactory;
    await uploadParticularsOfClaimPage.verifyContent();
    await uploadParticularsOfClaimPage.selectNo();
    await uploadParticularsOfClaimPage.submit();
  }

  async claimValuePage() {
    const { claimValuePage } = this.createClaimPageFactory;
    await claimValuePage.verifyContent();
    await claimValuePage.enterClaimDetailsSmallTrack();
    await claimValuePage.submit();
  }

  async pbaNumberPage() {
    const { pbaNumberPage } = this.createClaimPageFactory;
    await pbaNumberPage.verifyContent();
    await pbaNumberPage.submit();
  }

  async fastTrackClaimPages() {
    const { claimValuePage } = this.createClaimPageFactory;
    await claimValuePage.verifyContent();
    await claimValuePage.enterClaimDetailsFastTrack();
    await claimValuePage.submit();

    const { pbaNumberPage } = this.createClaimPageFactory;
    await pbaNumberPage.verifyContent();
    await pbaNumberPage.submit();
  }

  async statementOfTruthCreateClaimPage() {
    const { statementOfTruthCreateClaimPage } = this.createClaimPageFactory;
    await statementOfTruthCreateClaimPage.verifyContent();
    await statementOfTruthCreateClaimPage.enterDetails();
    await statementOfTruthCreateClaimPage.submit();
  }

  async submitCreateClaimPage() {
    const { submitCreateClaimPage } = this.createClaimPageFactory;
    await submitCreateClaimPage.verifyContent();
    await submitCreateClaimPage.submit();
  }

  async confirmCreateClaimPage() {
    const { confirmCreateClaimPage } = this.createClaimPageFactory;
    await confirmCreateClaimPage.verifyContent();
    await confirmCreateClaimPage.submit();
  }
}
