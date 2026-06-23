import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BaseTestData from '../../../../../base/base-test-data';
import TestData from '../../../../../models/test-utils/test-data';
import DiscontinueClaimPageFactory from '../../../../../pages/exui/claimant-defendant-solicitor/discontinue-claim/discontinue-claim-page-factory';

@AllMethodsStep()
export default class DiscontinueClaimSpecActions extends BaseTestData {
  private discontinueClaimPageFactory: DiscontinueClaimPageFactory;

  constructor(discontinueClaimPageFactory: DiscontinueClaimPageFactory, testData: TestData) {
    super(testData);
    this.discontinueClaimPageFactory = discontinueClaimPageFactory;
  }

  async selectBothClaimantsDiscontinuing() {
    const { multipleClaimantPage } = this.discontinueClaimPageFactory;
    await multipleClaimantPage.verifyContent(this.ccdCaseData);
    await multipleClaimantPage.selectBoth();
    await multipleClaimantPage.submit();
  }

  async selectPermissionNeededYes() {
    const { courtPermissionPage } = this.discontinueClaimPageFactory;
    await courtPermissionPage.verifyContent(this.ccdCaseData);
    await courtPermissionPage.selectPermissionRequiredYes();
    await courtPermissionPage.submit();
  }

  async selectPermissionNeededNo() {
    const { courtPermissionPage } = this.discontinueClaimPageFactory;
    await courtPermissionPage.verifyContent(this.ccdCaseData);
    await courtPermissionPage.selectPermissionRequiredNo();
    await courtPermissionPage.submit();
  }

  async selectPermissionGrantedYes() {
    const { permissionGrantedPage } = this.discontinueClaimPageFactory;
    await permissionGrantedPage.verifyContent(this.ccdCaseData);
    await permissionGrantedPage.selectPermissionGrantedYes();
    await permissionGrantedPage.submit();
  }

  async selectDiscontinueAgainstBothDefendantsYes() {
    const { discontinuingAgainstDefendantsPage } = this.discontinueClaimPageFactory;
    await discontinuingAgainstDefendantsPage.verifyContent(this.ccdCaseData);
    await discontinuingAgainstDefendantsPage.selectDiscontinuingAgainstBothDefendantsYes();
    await discontinuingAgainstDefendantsPage.submit();
  }

  async selectFullDiscontinuance() {
    const { discontinuanceTypePage } = this.discontinueClaimPageFactory;
    await discontinuanceTypePage.verifyContent(this.ccdCaseData);
    await discontinuanceTypePage.selectFullDiscontinuance();
    await discontinuanceTypePage.submit();
  }
  async submitDiscontinueClaimPage() {
    const { submitDiscontinueClaimPage } = this.discontinueClaimPageFactory;
    await submitDiscontinueClaimPage.verifyContent(this.ccdCaseData);
    await submitDiscontinueClaimPage.submit();
  }

  async confirmDiscontinueClaimPage() {
    const { confirmDiscontinueClaimPage } = this.discontinueClaimPageFactory;
    await confirmDiscontinueClaimPage.verifyContent(this.ccdCaseData);
    await confirmDiscontinueClaimPage.submit();
  }
}
