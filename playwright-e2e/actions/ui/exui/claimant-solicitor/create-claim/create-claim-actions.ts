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

  async caseFilter() {
    const { caseFilterPage } = this.createClaimPageFactory;
    await caseFilterPage.verifyContent();
    await caseFilterPage.chooseUnSpec();
    await caseFilterPage.submit();
  }

  async eligibility() {
    const { eligibilityPage } = this.createClaimPageFactory;
    await eligibilityPage.verifyContent();
    await eligibilityPage.submit();
  }

  async references() {
    const { referencesPage } = this.createClaimPageFactory;
    await referencesPage.verifyContent();
    await referencesPage.enterReferences();
    await referencesPage.submit();
  }

  async court() {
    const { courtPage } = this.createClaimPageFactory;
    await courtPage.verifyContent();
    await courtPage.chooseCourtLocation();
    await courtPage.selectYesForRemoteHearing();
    await courtPage.submit();
  }

  async claimantDetails() {
    const { claimantPage } = this.createClaimPageFactory;
    await claimantPage.verifyContent();
    await claimantPage.chooseIndividualAndEnterDetails();
    await claimantPage.submit();

    const { claimantLitigationFriendPage } = this.createClaimPageFactory;
    await claimantLitigationFriendPage.verifyContent();
    await claimantLitigationFriendPage.selectNo();
    await claimantLitigationFriendPage.submit();

    const { notificationsPage } = this.createClaimPageFactory;
    await notificationsPage.verifyContent();
    await notificationsPage.selectNo();
    await notificationsPage.submit();

    const { claimantSolicitorOrganisationPage } = this.createClaimPageFactory;
    await claimantSolicitorOrganisationPage.verifyContent();
    await claimantSolicitorOrganisationPage.enterReference();
    await claimantSolicitorOrganisationPage.submit();

    const { claimantSolicitorServiceAddressPage } = this.createClaimPageFactory;
    await claimantSolicitorServiceAddressPage.verifyContent();
    await claimantSolicitorServiceAddressPage.selectYesAndEnterAddress();
    await claimantSolicitorServiceAddressPage.submit();
  }

  async addAnotherClaimant() {
    const { addAnotherClaimantPage } = this.createClaimPageFactory;
    await addAnotherClaimantPage.verifyContent();
    await addAnotherClaimantPage.selectYes();
    await addAnotherClaimantPage.submit();
  }

  async noAddAnotherClaimant() {
    const { addAnotherClaimantPage } = this.createClaimPageFactory;
    await addAnotherClaimantPage.verifyContent();
    await addAnotherClaimantPage.selectNo();
    await addAnotherClaimantPage.submit();
  }

  async secondClaimant() {
    const { secondClaimantPage } = this.createClaimPageFactory;
    await secondClaimantPage.verifyContent();
    await secondClaimantPage.chooseIndividualAndEnterDetails();
    await secondClaimantPage.submit();
  }

  async secondClaimantLitigationFriend() {
    const { secondClaimantLitigationFriendPage } = this.createClaimPageFactory;
    await secondClaimantLitigationFriendPage.verifyContent();
    await secondClaimantLitigationFriendPage.selectNo();
    await secondClaimantLitigationFriendPage.submit();
  }

  async defendantDetails() {
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
  }

  async noAddAnotherDefendant() {
    const { addAnotherDefendantPage } = this.createClaimPageFactory;
    await addAnotherDefendantPage.verifyContent();
    await addAnotherDefendantPage.selectNo();
    await addAnotherDefendantPage.submit();
  }

  async addAnotherDefendant() {
    const { addAnotherDefendantPage } = this.createClaimPageFactory;
    await addAnotherDefendantPage.verifyContent();
    await addAnotherDefendantPage.selectYes();
    await addAnotherDefendantPage.submit();
  }

  async secondDefendantSS() {
    await this.secondDefendant();
    await this.defendant2Represented();

    const { sameLegalRepresentativePage } = this.createClaimPageFactory;
    await sameLegalRepresentativePage.verifyContent();
    await sameLegalRepresentativePage.selectYes();
    await sameLegalRepresentativePage.submit();
  }

  async secondDefendantDSdetails() {
    await this.secondDefendant();
    await this.defendant2Represented();

    const { sameLegalRepresentativePage } = this.createClaimPageFactory;
    await sameLegalRepresentativePage.verifyContent();
    await sameLegalRepresentativePage.selectNo();
    await sameLegalRepresentativePage.submit();

    const { secondDefendantSolicitorOrganisationPage } = this.createClaimPageFactory;
    await secondDefendantSolicitorOrganisationPage.verifyContent();
    await secondDefendantSolicitorOrganisationPage.selectOrganisation();
    await secondDefendantSolicitorOrganisationPage.submit();

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
  }

  async fastTrackClaimDetails() {
    await this.claimType();
    await this.personalInjuryType();
    await this.details();
    await this.uploadParticularsOfClaim();

    const { claimValuePage } = this.createClaimPageFactory;
    await claimValuePage.verifyContent();
    await claimValuePage.enterClaimDetailsFastTrack();
    await claimValuePage.submit();

    await this.pbaNumber();
  }

  async smallTrackClaimDetails() {
    await this.claimType();
    await this.personalInjuryType();
    await this.details();
    await this.uploadParticularsOfClaim();

    const { claimValuePage } = this.createClaimPageFactory;
    await claimValuePage.verifyContent();
    await claimValuePage.enterClaimDetailsSmallTrack();
    await claimValuePage.submit();

    await this.pbaNumber();
  }

  async statementOfTruthCreateClaim() {
    const { statementOfTruthCreateClaimPage } = this.createClaimPageFactory;
    await statementOfTruthCreateClaimPage.verifyContent();
    await statementOfTruthCreateClaimPage.enterDetails();
    await statementOfTruthCreateClaimPage.submit();
  }

  async submitCreateClaim() {
    const { submitCreateClaimPage } = this.createClaimPageFactory;
    await submitCreateClaimPage.verifyContent();
    await submitCreateClaimPage.submit();
  }

  async confirmCreateClaim() {
    const { confirmCreateClaimPage } = this.createClaimPageFactory;
    await confirmCreateClaimPage.verifyContent();
    await confirmCreateClaimPage.submit();
  }

  private async secondDefendant() {
    const { secondDefendantPage } = this.createClaimPageFactory;
    await secondDefendantPage.verifyContent();
    await secondDefendantPage.chooseIndividualAndEnterDetails();
    await secondDefendantPage.submit();
  }

  private async defendant2Represented() {
    const { secondDefendantLegalRepresentationPage } = this.createClaimPageFactory;
    await secondDefendantLegalRepresentationPage.verifyContent();
    await secondDefendantLegalRepresentationPage.selectYes();
    await secondDefendantLegalRepresentationPage.submit();
  }

  private async claimType() {
    const { claimTypePage } = this.createClaimPageFactory;
    await claimTypePage.verifyContent();
    await claimTypePage.selectPersonalInjury();
    await claimTypePage.submit();
  }

  private async personalInjuryType() {
    const { personalInjuryType } = this.createClaimPageFactory;
    await personalInjuryType.verifyContent();
    await personalInjuryType.selectRoadAccident();
    await personalInjuryType.submit();
  }

  private async details() {
    const { detailsPage } = this.createClaimPageFactory;
    await detailsPage.verifyContent();
    await detailsPage.enterDetails();
    await detailsPage.submit();
  }

  private async uploadParticularsOfClaim() {
    const { uploadParticularsOfClaimPage } = this.createClaimPageFactory;
    await uploadParticularsOfClaimPage.verifyContent();
    await uploadParticularsOfClaimPage.selectNo();
    await uploadParticularsOfClaimPage.submit();
  }

  private async pbaNumber() {
    const { pbaNumberPage } = this.createClaimPageFactory;
    await pbaNumberPage.verifyContent();
    await pbaNumberPage.submit();
  }
}
