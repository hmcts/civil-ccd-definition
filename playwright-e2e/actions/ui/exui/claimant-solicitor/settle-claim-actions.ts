import BaseTestData from '../../../../base/base-test-data';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import TestData from '../../../../models/test-utils/test-data';
import SettleClaimPageFactory from '../../../../pages/exui/claimant-defendant-solicitor/settle-claim-mark-paid-full/settle-claim-page-factory';

@AllMethodsStep()
export default class SettleClaimActions extends BaseTestData {
  private settleClaimPageFactory: SettleClaimPageFactory;

  constructor(settleClaimPageFactory: SettleClaimPageFactory, testData: TestData) {
    super(testData);
    this.settleClaimPageFactory = settleClaimPageFactory;
  }

  async singleClaimant() {
    const { singleClaimantPage } = this.settleClaimPageFactory;
    await singleClaimantPage.verifyContent(this.ccdCaseData);
    await singleClaimantPage.selectYes();
    await singleClaimantPage.submit();
  }

  async multipleClaimants() {
    const { multipleClaimantsPage } = this.settleClaimPageFactory;
    await multipleClaimantsPage.verifyContent(this.ccdCaseData);
    await multipleClaimantsPage.selectYes();
    await multipleClaimantsPage.submit();
  }

  async consentOrderApproved() {
    const { settleClaimPage } = this.settleClaimPageFactory;
    await settleClaimPage.verifyContent(this.ccdCaseData);
    await settleClaimPage.selectConsentOrderApproved();
    await settleClaimPage.submit();
  }

  async settledFollowingJudgesOrder() {
    const { settleClaimPage } = this.settleClaimPageFactory;
    await settleClaimPage.verifyContent(this.ccdCaseData);
    await settleClaimPage.selectSettledFollowingJudgesOrder();
    await settleClaimPage.submit();
  }

  async submitSettleClaim() {
    const { submitSettleClaimPage } = this.settleClaimPageFactory;
    await submitSettleClaimPage.verifyContent(this.ccdCaseData);
    await submitSettleClaimPage.submit();
  }

  async confirmSettleClaimMarkPaidFull() {
    const { confirmSettleClaimMarkPaidFullPage } = this.settleClaimPageFactory;
    await confirmSettleClaimMarkPaidFullPage.verifyContent(this.ccdCaseData);
    await confirmSettleClaimMarkPaidFullPage.submit();
  }

  async confirmSettleClaim() {
    const { confirmSettleClaimPage } = this.settleClaimPageFactory;
    await confirmSettleClaimPage.verifyContent(this.ccdCaseData);
    await confirmSettleClaimPage.submit();
  }
}
