import BaseExuiSteps from '../../../../../base/base-exui-steps';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import TestData from '../../../../../models/test-data';
import ExuiDashboardPageFactory from '../../../../../pages/exui/exui-dashboard/exui-dashboard-page-factory';
import CreateClaimPageFactory from '../../../../../pages/exui/solicitor-events/create-claim/create-claim-page-factory';
import RequestsFactory from '../../../../../requests/requests-factory';
import ccdEvents from "../../../../../constants/ccd-events.ts";
import {claimantSolicitorUser, defendantSolicitor1User} from "../../../../../config/users/exui-users.ts";

@AllMethodsStep()
export default class CreateClaimSpecSteps extends BaseExuiSteps {
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

  async CreateClaim1v1SpecFastTrack() {
    await super.retryExuiEvent(
      async () => {
        await this.processCaseFilterPage();
        await this.processChecklistPage();
        await this.processEligibiltySpecPage();
        await this.processReferencesPage();
        await this.processClaimant1Page();
        await this.processAddClaimant2No();
        await this.processNotificationsPage();
        await this.processClaimantSolicitorOrganisationPage();
        await this.processSpecCorrespondenceAddressPage();
        await this.processDefendantPage();
        await this.processLegalRepresentationSpecPage();
        await this.processDefendantSolicitorOrganisationSpecPage();
        await this.processDefendantSolicitorEmailSpecPage();
        await this.processRespondentCorrespondenceAddressPage();
        await this.processAddDefendant2No();
        await this.processFlightDelayClaimPage();
        await this.processDetailsSpecPage();
        await this.processUploadClaimDocumentPage();
        await this.processClaimTimeLineUploadPage();
        await this.processEvidenceListPage();
        await this.processClaimAmountFastTrackPage();
        await this.processClaimAmountDetailsFastTrackPage();
        await this.processClaimInterestPage();
        await this.processInterestSummaryFastTrackPage();
        await this.processPbaNumberPage();
        await this.processFixedCommencementCostsPage();
        await this.processStatementOfTruthCreateClaimPage() ;
        await this.processSubmitCreateClaimPage();
        await this.processConfirmCreateClaimSpecPage();
      },
      ccdEvents.CREATE_CLAIM_SPEC,
      defendantSolicitor1User,
      { verifySuccessEvent: false },
    );
  }

  async CreateClaim1v1SpecSmallClaim() {
    await super.retryExuiEvent(
      async () => {
        await this.processCaseFilterPage();
        await this.processChecklistPage();
        await this.processEligibiltySpecPage();
        await this.processReferencesPage();
        await this.processClaimant1Page();
        await this.processAddClaimant2No();
        await this.processNotificationsPage();
        await this.processClaimantSolicitorOrganisationPage();
        await this.processSpecCorrespondenceAddressPage();
        await this.processDefendantPage();
        await this.processLegalRepresentationSpecPage();
        await this.processDefendantSolicitorOrganisationSpecPage();
        await this.processDefendantSolicitorEmailSpecPage();
        await this.processRespondentCorrespondenceAddressPage();
        await this.processAddDefendant2No();
        await this.processFlightDelayClaimPage();
        await this.processDetailsSpecPage();
        await this.processUploadClaimDocumentPage();
        await this.processClaimTimeLineUploadPage();
        await this.processEvidenceListPage();
        await this.processClaimAmountSmallTrackPage();
        await this.processClaimAmountDetailsSmallTrackPage();
        await this.processClaimInterestPage();
        await this.processClaimInterestSummarySmallTrackPage();
        await this.processPbaNumberPage();
        await this.processFixedCommencementCostsPage();
        await this.processStatementOfTruthCreateClaimPage() ;
        await this.processSubmitCreateClaimPage();
        await this.processConfirmCreateClaimSpecPage();
      },
      ccdEvents.CREATE_CLAIM_SPEC,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async CreateClaim1v2SameSolicitorSpecSmallClaim() {
    await super.retryExuiEvent(
      async () => {
        await this.processCaseFilterPage();
        await this.processChecklistPage();
        await this.processEligibiltySpecPage();
        await this.processReferencesPage();
        await this.processClaimant1Page();
        await this.processAddClaimant2No();
        await this.processNotificationsPage();
        await this.processClaimantSolicitorOrganisationPage();
        await this.processSpecCorrespondenceAddressPage();
        await this.processDefendantPage();
        await this.processLegalRepresentationSpecPage();
        await this.processDefendantSolicitorOrganisationSpecPage();
        await this.processDefendantSolicitorEmailSpecPage();
        await this.processRespondentCorrespondenceAddressPage();
        await this.processAddDefendant2Yes();
        await this.processSecondDefendantPage();
        await this.processLegalRepresentationRespondent2Page();
        await this.processSameLegalRepresentativeSmallClaimPage();
        await this.processFlightDelayClaimPage();
        await this.processDetailsSpecPage();
        await this.processUploadClaimDocumentPage();
        await this.processClaimTimeLineUploadPage();
        await this.processEvidenceListPage();
        await this.processClaimAmountSmallTrackPage();
        await this.processClaimAmountDetailsSmallTrackPage();
        await this.processClaimInterestPage();
        await this.processClaimInterestSummarySmallTrackPage();
        await this.processPbaNumberPage();
        await this.processFixedCommencementCostsPage();
        await this.processStatementOfTruthCreateClaimPage() ;
        await this.processSubmitCreateClaimPage();
        await this.processConfirmCreateClaimSpecPage();
      },
      ccdEvents.CREATE_CLAIM_SPEC,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async CreateClaim1v2DifferentSolicitorSpecSmallClaim() {
    await super.retryExuiEvent(
      async () => {
        await this.processCaseFilterPage();
        await this.processChecklistPage();
        await this.processEligibiltySpecPage();
        await this.processReferencesPage();
        await this.processClaimant1Page();
        await this.processAddClaimant2No();
        await this.processNotificationsPage();
        await this.processClaimantSolicitorOrganisationPage();
        await this.processSpecCorrespondenceAddressPage();
        await this.processDefendantPage();
        await this.processLegalRepresentationSpecPage();
        await this.processDefendantSolicitorOrganisationSpecPage();
        await this.processDefendantSolicitorEmailSpecPage();
        await this.processRespondentCorrespondenceAddressPage();
        await this.processAddDefendant2Yes();
        await this.processSecondDefendantPage();
        await this.processLegalRepresentationRespondent2Page();
        await this.processDifferentLegalRepresentativeSmallClaimPage();
        await this.processSecondDefendantSolicitorOrganisationSpecPage();
        await this.processSecondDefendantSolicitorEmailSpecPage();
        await this.processSpecRespondent2CorrespondenceAddressPage();
        await this.processFlightDelayClaimPage();
        await this.processDetailsSpecPage();
        await this.processUploadClaimDocumentPage();
        await this.processClaimTimeLineUploadPage();
        await this.processEvidenceListPage();
        await this.processClaimAmountSmallTrackPage();
        await this.processClaimAmountDetailsSmallTrackPage();
        await this.processClaimInterestPage();
        await this.processClaimInterestSummarySmallTrackPage();
        await this.processPbaNumberPage();
        await this.processFixedCommencementCostsPage();
        await this.processStatementOfTruthCreateClaimPage() ;
        await this.processSubmitCreateClaimPage();
        await this.processConfirmCreateClaimSpecPage();
      },
      ccdEvents.CREATE_CLAIM_SPEC,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async CreateClaim2v1SpecSmallClaim() {
    await super.retryExuiEvent(
      async () => {
        await this.processCaseFilterPage();
        await this.processChecklistPage();
        await this.processEligibiltySpecPage();
        await this.processReferencesPage();
        await this.processClaimant1Page();
        await this.processAddAnotherClaimantPage();
        await this.processSecondClaimantPage()
        await this.processNotificationsPage();
        await this.processClaimantSolicitorOrganisationPage();
        await this.processSpecCorrespondenceAddressPage();
        await this.processDefendantPage();
        await this.processLegalRepresentationSpecPage();
        await this.processDefendantSolicitorOrganisationSpecPage();
        await this.processDefendantSolicitorEmailSpecPage();
        await this.processRespondentCorrespondenceAddressPage();
        await this.processFlightDelayClaimPage();
        await this.processDetailsSpecPage();
        await this.processUploadClaimDocumentPage();
        await this.processClaimTimeLineUploadPage();
        await this.processEvidenceListPage();
        await this.processClaimAmountSmallTrackPage();
        await this.processClaimAmountDetailsSmallTrackPage();
        await this.processClaimInterestPage();
        await this.processClaimInterestSummarySmallTrackPage();
        await this.processPbaNumberPage();
        await this.processFixedCommencementCostsPage();
        await this.processStatementOfTruthCreateClaimPage() ;
        await this.processSubmitCreateClaimPage();
        await this.processConfirmCreateClaimSpecPage();
      },
      ccdEvents.CREATE_CLAIM_SPEC,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  private async processCaseFilterPage( ) {
    const { caseFilterPage } = this.createClaimPageFactory;
    await caseFilterPage.verifyContent();
    await caseFilterPage.chooseSpec();
    await caseFilterPage.submit();

  }


  private async processChecklistPage() {
  const { checkListPage } = this.createClaimPageFactory
  await checkListPage.verifyContent();
  await checkListPage.submit();
  }

  private async processEligibiltySpecPage(){
    const { eligibilitySpecPage } = this.createClaimPageFactory;
    await eligibilitySpecPage.verifyContent();
    await eligibilitySpecPage.submit();
  }

  private async processReferencesPage(){
    const { referencesPage } = this.createClaimPageFactory;
    await referencesPage.verifyContent();
    await referencesPage.enterReferences();
    await referencesPage.submit();
  }

  private async processClaimant1Page() {
    const { claimantPage } = this.createClaimPageFactory;
    await claimantPage.verifyContent();
    await claimantPage.chooseIndividualAndEnterDetails();
    await claimantPage.submit();
  }

  private async processAddClaimant2No() {
    const { addAnotherClaimantPage } = this.createClaimPageFactory;
    await addAnotherClaimantPage.verifyContent();
    await addAnotherClaimantPage.selectNo();
    await addAnotherClaimantPage.submit();
  }

  private async processAddAnotherClaimantPage() {
    const { addAnotherClaimantPage } = this.createClaimPageFactory;
    await addAnotherClaimantPage.verifyContent();
    await addAnotherClaimantPage.selectYes();
    await addAnotherClaimantPage.submit();
  }

  private async processSecondClaimantPage(){
    const {secondClaimantPage} = this.createClaimPageFactory;
    await secondClaimantPage.verifyContent();
    await secondClaimantPage.chooseIndividualAndEnterDetails();
    await secondClaimantPage.submit();
  }

  private async processNotificationsPage() {
    const { notificationsPage } = this.createClaimPageFactory;
    await notificationsPage.verifyContent();
    await notificationsPage.selectYes();
    await notificationsPage.submit();
  }

  private async processClaimantSolicitorOrganisationPage() {
    const { claimantSolicitorOrganisationPage } = this.createClaimPageFactory;
    await claimantSolicitorOrganisationPage.verifyContent();
    await claimantSolicitorOrganisationPage.selectOrganisation();
    await claimantSolicitorOrganisationPage.submit();
  }

  private async processSpecCorrespondenceAddressPage(){
    const { specCorrespondenceAddressPage } = this.createClaimPageFactory;
    await specCorrespondenceAddressPage.verifyContent();
    await specCorrespondenceAddressPage.selectNo();
    await specCorrespondenceAddressPage.submit();
  }

  private async processDefendantPage() {
    const { defendantPage } = this.createClaimPageFactory;
    await defendantPage.verifyContent();
    await defendantPage.chooseCompanyAndEnterDetails();
    await defendantPage.submit();
  }

  private async processLegalRepresentationSpecPage(){
    const { legalRepresentationSpecPage} = this.createClaimPageFactory;
    await legalRepresentationSpecPage.verifyContent();
    await legalRepresentationSpecPage.selectYes();
    await legalRepresentationSpecPage.submit();
  }

  private async processDefendantSolicitorOrganisationSpecPage() {
    const { defendantSolicitorOrganisationSpecPage} = this.createClaimPageFactory;
    await defendantSolicitorOrganisationSpecPage.verifyContent();
    await defendantSolicitorOrganisationSpecPage.selectOrganisation();
    await defendantSolicitorOrganisationSpecPage.submit();
  }

  private async processDefendantSolicitorEmailSpecPage(){
    const { defendantSolicitorEmailSpecPage} = this.createClaimPageFactory;
    await defendantSolicitorEmailSpecPage.verifyContent();
    await defendantSolicitorEmailSpecPage.enterEmail();
    await defendantSolicitorEmailSpecPage.submit();

  }

  private async processRespondentCorrespondenceAddressPage() {
    const { specRespondentCorrespondenceAddressPage} = this.createClaimPageFactory;
    await specRespondentCorrespondenceAddressPage.verifyContent();
    await specRespondentCorrespondenceAddressPage.selectNo();
    await specRespondentCorrespondenceAddressPage.submit();

  }

  private async processAddDefendant2No() {
    const {addAnotherDefendantPage} = this.createClaimPageFactory;
    await addAnotherDefendantPage.verifyContent();
    await addAnotherDefendantPage.selectNo();
    await addAnotherDefendantPage.submit();
  }

  private async processAddDefendant2Yes() {
    const {addAnotherDefendantPage} = this.createClaimPageFactory;
    await addAnotherDefendantPage.verifyContent();
    await addAnotherDefendantPage.selectYes();
    await addAnotherDefendantPage.submit();
  }

  private async processSecondDefendantPage() {
    const {secondDefendantPage} = this.createClaimPageFactory;
    await secondDefendantPage.verifyContent();
    await secondDefendantPage.chooseIndividualAndEnterDetails();
    await secondDefendantPage.submit();
  }

  private async processLegalRepresentationRespondent2Page(){
    const { legalRepresentationRespondent2Page} = this.createClaimPageFactory;
    await legalRepresentationRespondent2Page.verifyContent();
    await legalRepresentationRespondent2Page.selectYes();
    await legalRepresentationRespondent2Page.submit();
  }


  private async processSameLegalRepresentativeSmallClaimPage() {
     const { sameLegalRepresentativePage} = this.createClaimPageFactory;
     await sameLegalRepresentativePage.verifyContent();
     await sameLegalRepresentativePage.selectYes();
     await sameLegalRepresentativePage.submit();
   }

  private async processDifferentLegalRepresentativeSmallClaimPage() {
    const { sameLegalRepresentativePage} = this.createClaimPageFactory;
    await sameLegalRepresentativePage.verifyContent();
    await sameLegalRepresentativePage.selectNo();
    await sameLegalRepresentativePage.submit();
  }

  private async processSecondDefendantSolicitorOrganisationSpecPage(){
    const { secondDefendantSolicitorOrganisationSpecPage } = this.createClaimPageFactory;
    await secondDefendantSolicitorOrganisationSpecPage.verifyContent();
    await secondDefendantSolicitorOrganisationSpecPage.selectOrganisation();
    await secondDefendantSolicitorOrganisationSpecPage.submit();
  }

  private async processSecondDefendantSolicitorEmailSpecPage() {
    const { secondDefendantSolicitorEmailSpecPage } = this.createClaimPageFactory;
    await secondDefendantSolicitorEmailSpecPage.verifyContent();
    await secondDefendantSolicitorEmailSpecPage.enterEmail();
    await secondDefendantSolicitorEmailSpecPage.submit();
  }

  private async processSpecRespondent2CorrespondenceAddressPage(){
    const { specRespondent2CorrespondenceAddressPage} = this.createClaimPageFactory;
    await specRespondent2CorrespondenceAddressPage.verifyContent();
    await specRespondent2CorrespondenceAddressPage.selectNo();
    await specRespondent2CorrespondenceAddressPage.submit();
  }

  private async processFlightDelayClaimPage() {
    const { flightDelayClaimPage } = this.createClaimPageFactory;
    await flightDelayClaimPage.verifyContent();
    await flightDelayClaimPage.selectNo();
    await flightDelayClaimPage.submit();
  }

  private async processDetailsSpecPage() {
    const { detailsSpecPage} = this.createClaimPageFactory;
    await detailsSpecPage.verifyContent();
    await detailsSpecPage.enterDetails();
    await detailsSpecPage.submit();
  }

  private async processUploadClaimDocumentPage(){
    const { uploadClaimDocumentPage} = this.createClaimPageFactory;
    await uploadClaimDocumentPage.verifyContent();
    await uploadClaimDocumentPage.selectUpload();
    await uploadClaimDocumentPage.submit();
  }

  private async processClaimTimeLineUploadPage(){
    const { claimTimelineUploadPage} = this.createClaimPageFactory;
    await claimTimelineUploadPage.verifyContent();
    await claimTimelineUploadPage.uploadDocument();
    await claimTimelineUploadPage.submit();
  }

  private async processEvidenceListPage() {
    const { evidenceListPage} = this.createClaimPageFactory;
    await evidenceListPage.verifyContent();
    await evidenceListPage.addNew();
    await evidenceListPage.enterEvidence1Details();
    await evidenceListPage.submit();
  }

  private async processClaimAmountFastTrackPage() {
    const { claimAmountPage } = this.createClaimPageFactory;
    await claimAmountPage.verifyContent();
    await claimAmountPage.addNew();
    await claimAmountPage.enterClaimDetailsFastTrack();
    await claimAmountPage.submit();
  }

  private async processClaimAmountDetailsFastTrackPage() {
    const { claimAmountDetailsPage } = this.createClaimPageFactory;
    await claimAmountDetailsPage.verifyContent();
    await claimAmountDetailsPage.verifyFastTrack();
    await claimAmountDetailsPage.submit();
  }

  private async processClaimInterestPage(){
    const { claimInterestPage} = this.createClaimPageFactory;
    await claimInterestPage.verifyContent();
    await claimInterestPage.selectNo();
    await claimInterestPage.submit();
  }

  private async processInterestSummaryFastTrackPage() {
    const { interestSummaryPage} = this.createClaimPageFactory;
    await interestSummaryPage.verifyContent();
    await interestSummaryPage.verifyFastTrack();
    await interestSummaryPage.submit();
  }

  private async processClaimAmountSmallTrackPage() {
    const { claimAmountPage } = this.createClaimPageFactory;
    await claimAmountPage.verifyContent();
    await claimAmountPage.addNew();
    await claimAmountPage.enterClaimDetailsSmallTrack();
    await claimAmountPage.submit();
  }

  private async processClaimAmountDetailsSmallTrackPage(){
    const { claimAmountDetailsPage } = this.createClaimPageFactory;
    await claimAmountDetailsPage.verifyContent();
    await claimAmountDetailsPage.verifySmallTrack();
    await claimAmountDetailsPage.submit();
  }

  private async processClaimInterestSummarySmallTrackPage() {
    const { interestSummaryPage} = this.createClaimPageFactory;
    await interestSummaryPage.verifyContent();
    await interestSummaryPage.verifySmallTrack();
    await interestSummaryPage.submit();
  }

  private async processPbaNumberPage() {
    const {pbaNumberPage} = this.createClaimPageFactory;
    await pbaNumberPage.verifyContent();
    await pbaNumberPage.submit();
  }

  private async processFixedCommencementCostsPage(){
    const { fixedCommencementCostsPage} = this.createClaimPageFactory;
    await fixedCommencementCostsPage.verifyContent();
    await fixedCommencementCostsPage.selectYesAndEnterAmount();
    await fixedCommencementCostsPage.submit();
  }

  private async processStatementOfTruthCreateClaimPage() {
    const { statementOfTruthCreateClaimPage} = this.createClaimPageFactory;
    await statementOfTruthCreateClaimPage.verifyContent();
    await statementOfTruthCreateClaimPage.enterDetails();
    await statementOfTruthCreateClaimPage.submit();
  }

  private async processSubmitCreateClaimPage() {
    const { submitCreateClaimPage} = this.createClaimPageFactory;
    await submitCreateClaimPage.verifyContent();
    await submitCreateClaimPage.submit();
  }

  private async processConfirmCreateClaimSpecPage() {
    const { confirmCreateClaimSpecPage } = this.createClaimPageFactory;
    await confirmCreateClaimSpecPage.verifyContent(this.ccdCaseData);
    await confirmCreateClaimSpecPage.submit();
  }
}
