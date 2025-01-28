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

  async CreateClaim1v1() {
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
        await defendantPage.chooseCompanyAndEnterDetails();
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
}
