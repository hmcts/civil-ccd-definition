import BaseTestData from '../../../../../base/base-test-data.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import TestData from '../../../../../models/test-data.ts';
import CreateClaimPageFactory from '../../../../../pages/exui/claimant-defendant-solicitor/create-claim/create-claim-page-factory.ts';

@AllMethodsStep()
export default class CreateClaimSpecActions extends BaseTestData {
  private createClaimPageFactory: CreateClaimPageFactory;

  constructor(createClaimPageFactory: CreateClaimPageFactory, testData: TestData) {
    super(testData);
    this.createClaimPageFactory = createClaimPageFactory;
  }

  async caseFilterPage() {
    const { caseFilterPage } = this.createClaimPageFactory;
    await caseFilterPage.verifyContent();
    await caseFilterPage.chooseSpec();
    await caseFilterPage.submit();
  }

  async checklistPage() {
    const { checkListPage } = this.createClaimPageFactory;
    await checkListPage.verifyContent();
    await checkListPage.submit();
  }

  async eligibiltySpecPage() {
    const { eligibilitySpecPage } = this.createClaimPageFactory;
    await eligibilitySpecPage.verifyContent();
    await eligibilitySpecPage.submit();
  }

  async referencesPage() {
    const { referencesPage } = this.createClaimPageFactory;
    await referencesPage.verifyContent();
    await referencesPage.enterReferences();
    await referencesPage.submit();
  }

  async claimant1Page() {
    const { claimantPage } = this.createClaimPageFactory;
    await claimantPage.verifyContent();
    await claimantPage.chooseIndividualAndEnterDetails();
    await claimantPage.submit();
  }

  async noAddClaimant2() {
    const { addAnotherClaimantPage } = this.createClaimPageFactory;
    await addAnotherClaimantPage.verifyContent();
    await addAnotherClaimantPage.selectNo();
    await addAnotherClaimantPage.submit();
  }

  async addAnotherClaimantPage() {
    const { addAnotherClaimantPage } = this.createClaimPageFactory;
    await addAnotherClaimantPage.verifyContent();
    await addAnotherClaimantPage.selectYes();
    await addAnotherClaimantPage.submit();
  }

  async secondClaimantPage() {
    const { secondClaimantPage } = this.createClaimPageFactory;
    await secondClaimantPage.verifyContent();
    await secondClaimantPage.chooseIndividualAndEnterDetails();
    await secondClaimantPage.submit();
  }

  async notificationsPage() {
    const { notificationsPage } = this.createClaimPageFactory;
    await notificationsPage.verifyContent();
    await notificationsPage.selectYes();
    await notificationsPage.submit();
  }

  async claimantSolicitorOrganisationPage() {
    const { claimantSolicitorOrganisationPage } = this.createClaimPageFactory;
    await claimantSolicitorOrganisationPage.verifyContent();
    await claimantSolicitorOrganisationPage.enterReference();
    await claimantSolicitorOrganisationPage.selectOrganisation();
    await claimantSolicitorOrganisationPage.submit();
  }

  async specCorrespondenceAddressPage() {
    const { specCorrespondenceAddressPage } = this.createClaimPageFactory;
    await specCorrespondenceAddressPage.verifyContent();
    await specCorrespondenceAddressPage.selectYesAndEnterAddress();
    await specCorrespondenceAddressPage.submit();
  }

  async defendantPage() {
    const { defendantPage } = this.createClaimPageFactory;
    await defendantPage.verifyContent();
    await defendantPage.chooseCompanyAndEnterDetails();
    await defendantPage.submit();
  }

  async legalRepresentationSpecPage() {
    const { legalRepresentationSpecPage } = this.createClaimPageFactory;
    await legalRepresentationSpecPage.verifyContent();
    await legalRepresentationSpecPage.selectYes();
    await legalRepresentationSpecPage.submit();
  }

  async defendantSolicitorOrganisationSpecPage() {
    const { defendantSolicitorOrganisationSpecPage } = this.createClaimPageFactory;
    await defendantSolicitorOrganisationSpecPage.verifyContent();
    await defendantSolicitorOrganisationSpecPage.selectOrganisation();
    await defendantSolicitorOrganisationSpecPage.submit();
  }

  async defendantSolicitorEmailSpecPage() {
    const { defendantSolicitorEmailSpecPage } = this.createClaimPageFactory;
    await defendantSolicitorEmailSpecPage.verifyContent();
    await defendantSolicitorEmailSpecPage.enterEmail();
    await defendantSolicitorEmailSpecPage.submit();
  }

  async respondentCorrespondenceAddressPage() {
    const { specRespondentCorrespondenceAddressPage } = this.createClaimPageFactory;
    await specRespondentCorrespondenceAddressPage.verifyContent();
    await specRespondentCorrespondenceAddressPage.selectYesAndEnterAddress();
    await specRespondentCorrespondenceAddressPage.submit();
  }

  async addDefendant2No() {
    const { addAnotherDefendantPage } = this.createClaimPageFactory;
    await addAnotherDefendantPage.verifyContent();
    await addAnotherDefendantPage.selectNo();
    await addAnotherDefendantPage.submit();
  }

  async addDefendant2Yes() {
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

  async legalRepresentationRespondent2Page() {
    const { legalRepresentationRespondent2Page } = this.createClaimPageFactory;
    await legalRepresentationRespondent2Page.verifyContent();
    await legalRepresentationRespondent2Page.selectYes();
    await legalRepresentationRespondent2Page.submit();
  }

  async sameLegalRepresentativeSmallClaimPage() {
    const { sameLegalRepresentativePage } = this.createClaimPageFactory;
    await sameLegalRepresentativePage.verifyContent();
    await sameLegalRepresentativePage.selectYes();
    await sameLegalRepresentativePage.submit();
  }

  async differentLegalRepresentativeSmallClaimPage() {
    const { sameLegalRepresentativePage } = this.createClaimPageFactory;
    await sameLegalRepresentativePage.verifyContent();
    await sameLegalRepresentativePage.selectNo();
    await sameLegalRepresentativePage.submit();
  }

  async secondDefendantSolicitorOrganisationSpecPage() {
    const { secondDefendantSolicitorOrganisationSpecPage } = this.createClaimPageFactory;
    await secondDefendantSolicitorOrganisationSpecPage.verifyContent();
    await secondDefendantSolicitorOrganisationSpecPage.selectOrganisation();
    await secondDefendantSolicitorOrganisationSpecPage.submit();
  }

  async secondDefendantSolicitorEmailSpecPage() {
    const { secondDefendantSolicitorEmailSpecPage } = this.createClaimPageFactory;
    await secondDefendantSolicitorEmailSpecPage.verifyContent();
    await secondDefendantSolicitorEmailSpecPage.enterEmail();
    await secondDefendantSolicitorEmailSpecPage.submit();
  }

  async specRespondent2CorrespondenceAddressPage() {
    const { specRespondent2CorrespondenceAddressPage } = this.createClaimPageFactory;
    await specRespondent2CorrespondenceAddressPage.verifyContent();
    await specRespondent2CorrespondenceAddressPage.selectYesAndEnterAddress();
    await specRespondent2CorrespondenceAddressPage.submit();
  }

  async flightDelayClaimPage() {
    const { flightDelayClaimPage } = this.createClaimPageFactory;
    await flightDelayClaimPage.verifyContent();
    await flightDelayClaimPage.selectNo();
    await flightDelayClaimPage.submit();
  }

  async detailsSpecPage() {
    const { detailsSpecPage } = this.createClaimPageFactory;
    await detailsSpecPage.verifyContent();
    await detailsSpecPage.enterDetails();
    await detailsSpecPage.submit();
  }

  async uploadClaimDocumentPage() {
    const { uploadClaimDocumentPage } = this.createClaimPageFactory;
    await uploadClaimDocumentPage.verifyContent();
    await uploadClaimDocumentPage.selectUpload();
    await uploadClaimDocumentPage.submit();
  }

  async claimTimeLineUploadPage() {
    const { claimTimelineUploadPage } = this.createClaimPageFactory;
    await claimTimelineUploadPage.verifyContent();
    await claimTimelineUploadPage.uploadDocument();
    await claimTimelineUploadPage.submit();
  }

  async evidenceListPage() {
    const { evidenceListPage } = this.createClaimPageFactory;
    await evidenceListPage.verifyContent();
    await evidenceListPage.addNew();
    await evidenceListPage.enterEvidence1Details();
    await evidenceListPage.submit();
  }

  async claimAmountFastTrackPage() {
    const { claimAmountPage } = this.createClaimPageFactory;
    await claimAmountPage.verifyContent();
    await claimAmountPage.addNew();
    await claimAmountPage.enterClaimDetailsFastTrack();
    await claimAmountPage.submit();
  }

  async claimAmountDetailsFastTrackPage() {
    const { claimAmountDetailsPage } = this.createClaimPageFactory;
    await claimAmountDetailsPage.verifyContent();
    await claimAmountDetailsPage.verifyFastTrack();
    await claimAmountDetailsPage.submit();
  }

  async claimInterestPage() {
    const { claimInterestPage } = this.createClaimPageFactory;
    await claimInterestPage.verifyContent();
    await claimInterestPage.selectNo();
    await claimInterestPage.submit();
  }

  async interestSummaryFastTrackPage() {
    const { interestSummaryPage } = this.createClaimPageFactory;
    await interestSummaryPage.verifyContent();
    await interestSummaryPage.verifyFastTrack();
    await interestSummaryPage.submit();
  }

  async claimAmountSmallTrackPage() {
    const { claimAmountPage } = this.createClaimPageFactory;
    await claimAmountPage.verifyContent();
    await claimAmountPage.addNew();
    await claimAmountPage.enterClaimDetailsSmallTrack();
    await claimAmountPage.submit();
  }

  async claimAmountDetailsSmallTrackPage() {
    const { claimAmountDetailsPage } = this.createClaimPageFactory;
    await claimAmountDetailsPage.verifyContent();
    await claimAmountDetailsPage.verifySmallTrack();
    await claimAmountDetailsPage.submit();
  }

  async claimInterestSummarySmallTrackPage() {
    const { interestSummaryPage } = this.createClaimPageFactory;
    await interestSummaryPage.verifyContent();
    await interestSummaryPage.verifySmallTrack();
    await interestSummaryPage.submit();
  }

  async pbaNumberPage() {
    const { pbaNumberPage } = this.createClaimPageFactory;
    await pbaNumberPage.verifyContent();
    await pbaNumberPage.submit();
  }

  async fixedCommencementCostsPage() {
    const { fixedCommencementCostsPage } = this.createClaimPageFactory;
    await fixedCommencementCostsPage.verifyContent();
    await fixedCommencementCostsPage.selectYesAndEnterAmount();
    await fixedCommencementCostsPage.submit();
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

  async confirmCreateClaimSpecPage() {
    const { confirmCreateClaimSpecPage } = this.createClaimPageFactory;
    await confirmCreateClaimSpecPage.verifyContent(this.ccdCaseData);
    await confirmCreateClaimSpecPage.submit();
  }
}
