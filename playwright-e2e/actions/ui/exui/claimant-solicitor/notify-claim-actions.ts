import TestData from '../../../../models/test-data';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import BaseTestData from '../../../../base/base-test-data';
import NotifyClaimPageFactory from '../../../../pages/exui/claimant-defendant-solicitor/notify-claim/notify-claim-page-factory';

@AllMethodsStep()
export default class NotifyClaimActions extends BaseTestData {
  private notifyClaimPageFactory: NotifyClaimPageFactory;

  constructor(notifyClaimPageFactory: NotifyClaimPageFactory, testData: TestData) {
    super(testData);
    this.notifyClaimPageFactory = notifyClaimPageFactory;
  }

  async defendantSolicitorToNotifyPage() {
    const { defendantSolicitorToNotify } = this.notifyClaimPageFactory;
    await defendantSolicitorToNotify.verifyContent(this.ccdCaseData);
    await defendantSolicitorToNotify.selectBoth();
    await defendantSolicitorToNotify.submit();
  }

  async accessGrantedWarningPage() {
    const { accessGrantedWarningPage } = this.notifyClaimPageFactory;
    await accessGrantedWarningPage.verifyContent(this.ccdCaseData);
    await accessGrantedWarningPage.submit();
  }

  async certificateOfService1NotifyClaimPage() {
    const { certificateOfService1NotifyClaimPage } = this.notifyClaimPageFactory;
    await certificateOfService1NotifyClaimPage.verifyContent(this.ccdCaseData);
    await certificateOfService1NotifyClaimPage.fillDetails();
    await certificateOfService1NotifyClaimPage.submit();
  }

  async certificateOfService2NotifyClaimPage() {
    const { certificateOfService2NotifyClaimPage } = this.notifyClaimPageFactory;
    await certificateOfService2NotifyClaimPage.verifyContent(this.ccdCaseData);
    await certificateOfService2NotifyClaimPage.fillDetails();
    await certificateOfService2NotifyClaimPage.submit();
  }

  async submitNotifyClaimPage() {
    const { submitNotifyClaimPage } = this.notifyClaimPageFactory;
    await submitNotifyClaimPage.verifyContent(this.ccdCaseData);
    await submitNotifyClaimPage.submit();
  }

  async confirmNotifyClaimPage() {
    const { confirmNotifyClaimPage } = this.notifyClaimPageFactory;
    await confirmNotifyClaimPage.verifyContent();
    await confirmNotifyClaimPage.submit();
  }

  async confirmNotifyClaimCOSPage() {
    const { confirmNotifyClaimCOSPage } = this.notifyClaimPageFactory;
    await confirmNotifyClaimCOSPage.verifyContent(this.ccdCaseData);
    await confirmNotifyClaimCOSPage.submit();
  }
}
