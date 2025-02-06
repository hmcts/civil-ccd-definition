import BaseExuiSteps from '../../../../../base/base-exui-steps';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import TestData from '../../../../../models/test-data';
import ExuiDashboardPageFactory from '../../../../../pages/exui/exui-dashboard/exui-dashboard-page-factory';
import CreateClaimPageFactory from '../../../../../pages/exui/solicitor-events/create-claim/create-claim-page-factory';
import RequestsFactory from '../../../../../requests/requests-factory';
import ccdEvents from "../../../../../constants/ccd-events.ts";
import {claimantSolicitorUser} from "../../../../../config/users/exui-users.ts";

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
        await this.processClaimant1Pages();
        await this.processAddClaimant2No();
        await this.processClaimant1DetailsPages();
        await this.processDefendant1DetailsPages();
        await this.processAddDefendant2No();
        await this.processSpecClaimDetailsPages();
        await this.processFastTrack();
        await this.processCostPages();
        await this.processFinalPages();
      },
      ccdEvents.CREATE_CLAIM_SPEC,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async CreateClaim1v1SpecSmallClaim() {
    await super.retryExuiEvent(
      async () => {
        await this.processClaimant1Pages();
        await this.processAddClaimant2No();
        await this.processClaimant1DetailsPages();
        await this.processDefendant1DetailsPages();
        await this.processAddDefendant2No();
        await this.processSpecClaimDetailsPages();
        await this.processSmallTrack();
        await this.processCostPages();
        await this.processFinalPages();
      },
      ccdEvents.CREATE_CLAIM_SPEC,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async CreateClaim1v2SameSolicitorSpecSmallClaim() {
    await super.retryExuiEvent(
      async () => {
        await this.processClaimant1Pages();
        await this.processAddClaimant2No();
        await this.processClaimant1DetailsPages();
        await this.processDefendant1DetailsPages();
        await this.processAddDefendant2Yes();
        await this.processSameSolicitorSmallClaimPage();
        await this.processSpecClaimDetailsPages();
        await this.processSmallTrack();
        await this.processCostPages();
        await this.processFinalPages();
      },
      ccdEvents.CREATE_CLAIM_SPEC,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async CreateClaim1v2DifferentSolicitorSpecSmallClaim() {
    await super.retryExuiEvent(
      async () => {
        await this.processClaimant1Pages();
        await this.processAddClaimant2No();
        await this.processClaimant1DetailsPages();
        await this.processDefendant1DetailsPages();
        await this.processAddDefendant2Yes();
        await this.processDifferentSolicitorSmallClaimPage();
        await this.processSpecClaimDetailsPages();
        await this.processSmallTrack();
        await this.processCostPages();
        await this.processFinalPages();
      },
      ccdEvents.CREATE_CLAIM_SPEC,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  async CreateClaim2v1SpecSmallClaim() {
    await super.retryExuiEvent(
      async () => {
        await this.processClaimant1Pages();
        await this.processAddClaimant2Yes();
        await this.processClaimant1DetailsPages();
        await this.processDefendant1DetailsPages();
        await this.processSpecClaimDetailsPages();
        await this.processSmallTrack();
        await this.processCostPages();
        await this.processFinalPages();
      },
      ccdEvents.CREATE_CLAIM_SPEC,
      claimantSolicitorUser,
      { verifySuccessEvent: false },
    );
  }

  private async processClaimant1Pages ( ) {
    const { caseFilterPage } = this.createClaimPageFactory;
    await caseFilterPage.verifyContent();
    await caseFilterPage.chooseSpec();
    await caseFilterPage.submit();

    const { checkListPage } = this.createClaimPageFactory
    await checkListPage.verifyContent();
    await checkListPage.submit();

    const { eligibilitySpecPage } = this.createClaimPageFactory;
    await eligibilitySpecPage.verifyContent();
    await eligibilitySpecPage.submit();

    const { referencesPage } = this.createClaimPageFactory;
    await referencesPage.verifyContent();
    await referencesPage.enterReferences();
    await referencesPage.submit();

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

  private async processAddClaimant2Yes() {
    const { addAnotherClaimantPage } = this.createClaimPageFactory;
    await addAnotherClaimantPage.verifyContent();
    await addAnotherClaimantPage.selectYes();
    await addAnotherClaimantPage.submit();

    const {secondClaimantPage} = this.createClaimPageFactory;
    await secondClaimantPage.verifyContent();
    await secondClaimantPage.chooseIndividualAndEnterDetails();
    await secondClaimantPage.submit();
  }

  private async processClaimant1DetailsPages() {
    const { notificationsPage } = this.createClaimPageFactory;
    await notificationsPage.verifyContent();
    await notificationsPage.selectYes();
    await notificationsPage.submit();

    const { claimantSolicitorOrganisationPage } = this.createClaimPageFactory;
    await claimantSolicitorOrganisationPage.verifyContent();
    await claimantSolicitorOrganisationPage.selectOrganisation();
    await claimantSolicitorOrganisationPage.submit();

    const { specCorrespondenceAddressPage } = this.createClaimPageFactory;
    await specCorrespondenceAddressPage.verifyContent();
    await specCorrespondenceAddressPage.selectNo();
    await specCorrespondenceAddressPage.submit();
  }

  private async processDefendant1DetailsPages() {
    const { defendantPage } = this.createClaimPageFactory;
    await defendantPage.verifyContent();
    await defendantPage.chooseCompanyAndEnterDetails();
    await defendantPage.submit();

    const { legalRepresentationSpecPage} = this.createClaimPageFactory;
    await legalRepresentationSpecPage.verifyContent();
    await legalRepresentationSpecPage.selectYes();
    await legalRepresentationSpecPage.submit();

    const { defendantSolicitorOrganisationSpecPage} = this.createClaimPageFactory;
    await defendantSolicitorOrganisationSpecPage.verifyContent();
    await defendantSolicitorOrganisationSpecPage.selectOrganisation();
    await defendantSolicitorOrganisationSpecPage.submit();

    const { defendantSolicitorEmailSpecPage} = this.createClaimPageFactory;
    await defendantSolicitorEmailSpecPage.verifyContent();
    await defendantSolicitorEmailSpecPage.enterEmail();
    await defendantSolicitorEmailSpecPage.submit();

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

    const {secondDefendantPage} = this.createClaimPageFactory;
    await secondDefendantPage.verifyContent();
    await secondDefendantPage.chooseIndividualAndEnterDetails();
    await secondDefendantPage.submit();

    const { legalRepresentationRespondent2Page} = this.createClaimPageFactory;
    await legalRepresentationRespondent2Page.verifyContent();
    await legalRepresentationRespondent2Page.selectYes();
    await legalRepresentationRespondent2Page.submit();

  }
  private async processSameSolicitorSmallClaimPage() {
     const { sameLegalRepresentativePage} = this.createClaimPageFactory;
     await sameLegalRepresentativePage.verifyContent();
     await sameLegalRepresentativePage.selectYes();
     await sameLegalRepresentativePage.submit();
   }

  private async processDifferentSolicitorSmallClaimPage() {
    const { sameLegalRepresentativePage} = this.createClaimPageFactory;
    await sameLegalRepresentativePage.verifyContent();
    await sameLegalRepresentativePage.selectNo();
    await sameLegalRepresentativePage.submit();

    const { secondDefendantSolicitorOrganisationSpecPage } = this.createClaimPageFactory;
    await secondDefendantSolicitorOrganisationSpecPage.verifyContent();
    await secondDefendantSolicitorOrganisationSpecPage.selectOrganisation();
    await secondDefendantSolicitorOrganisationSpecPage.submit();

    const { secondDefendantSolicitorEmailSpecPage } = this.createClaimPageFactory;
    await secondDefendantSolicitorEmailSpecPage.verifyContent();
    await secondDefendantSolicitorEmailSpecPage.enterEmail();
    await secondDefendantSolicitorEmailSpecPage.submit();

    const { specRespondent2CorrespondenceAddressPage} = this.createClaimPageFactory;
    await specRespondent2CorrespondenceAddressPage.verifyContent();
    await specRespondent2CorrespondenceAddressPage.selectNo();
    await specRespondent2CorrespondenceAddressPage.submit();
  }

  private async processSpecClaimDetailsPages() {
    const { flightDelayClaimPage } = this.createClaimPageFactory;
    await flightDelayClaimPage.verifyContent();
    await flightDelayClaimPage.selectNo();
    await flightDelayClaimPage.submit();

    const { detailsSpecPage} = this.createClaimPageFactory;
    await detailsSpecPage.verifyContent();
    await detailsSpecPage.enterDetails();
    await detailsSpecPage.submit();

    const { uploadClaimDocumentPage} = this.createClaimPageFactory;
    await uploadClaimDocumentPage.verifyContent();
    await uploadClaimDocumentPage.selectUpload();
    await uploadClaimDocumentPage.submit();

    const { claimTimelineUploadPage} = this.createClaimPageFactory;
    await claimTimelineUploadPage.verifyContent();
    await claimTimelineUploadPage.uploadDocument();
    await claimTimelineUploadPage.submit();

    const { evidenceListPage} = this.createClaimPageFactory;
    await evidenceListPage.verifyContent();
    await evidenceListPage.addNew();
    await evidenceListPage.enterEvidence1Details();
    await evidenceListPage.submit();
  }

  private async processFastTrack() {
    const { claimAmountPage } = this.createClaimPageFactory;
    await claimAmountPage.verifyContent();
    await claimAmountPage.addNew();
    await claimAmountPage.enterClaimDetailsFastTrack();
    await claimAmountPage.submit();

    const { claimAmountDetailsPage } = this.createClaimPageFactory;
    await claimAmountDetailsPage.verifyContent();
    await claimAmountDetailsPage.verifyFastTrack();
    await claimAmountDetailsPage.submit();

    const { claimInterestPage} = this.createClaimPageFactory;
    await claimInterestPage.verifyContent();
    await claimInterestPage.selectNo();
    await claimInterestPage.submit();

    const { interestSummaryPage} = this.createClaimPageFactory;
    await interestSummaryPage.verifyContent();
    await interestSummaryPage.verifyFastTrack();
    await interestSummaryPage.submit();
  }

  private async processSmallTrack() {
    const { claimAmountPage } = this.createClaimPageFactory;
    await claimAmountPage.verifyContent();
    await claimAmountPage.addNew();
    await claimAmountPage.enterClaimDetailsSmallTrack();
    await claimAmountPage.submit();

    const { claimAmountDetailsPage } = this.createClaimPageFactory;
    await claimAmountDetailsPage.verifyContent();
    await claimAmountDetailsPage.verifySmallTrack();
    await claimAmountDetailsPage.submit();

    const { claimInterestPage} = this.createClaimPageFactory;
    await claimInterestPage.verifyContent();
    await claimInterestPage.selectNo();
    await claimInterestPage.submit();

    const { interestSummaryPage} = this.createClaimPageFactory;
    await interestSummaryPage.verifyContent();
    await interestSummaryPage.verifySmallTrack();
    await interestSummaryPage.submit();
  }

  private async processCostPages() {
    const {pbaNumberPage} = this.createClaimPageFactory;
    await pbaNumberPage.verifyContent();
    await pbaNumberPage.submit();

    const { fixedCommencementCostsPage} = this.createClaimPageFactory;
    await fixedCommencementCostsPage.verifyContent();
    await fixedCommencementCostsPage.selectYesAndEnterAmount();
    await fixedCommencementCostsPage.submit();
  }

  private async processFinalPages() {
    const { statementOfTruthCreateClaimPage} = this.createClaimPageFactory;
    await statementOfTruthCreateClaimPage.verifyContent();
    await statementOfTruthCreateClaimPage.enterDetails();
    await statementOfTruthCreateClaimPage.submit();

    const { submitCreateClaimPage} = this.createClaimPageFactory;
    await submitCreateClaimPage.verifyContent();
    await submitCreateClaimPage.submit();

    const { confirmCreateClaimSpecPage } = this.createClaimPageFactory;
    await confirmCreateClaimSpecPage.verifyContent(this.ccdCaseData);
    await confirmCreateClaimSpecPage.submit();
  }
}
