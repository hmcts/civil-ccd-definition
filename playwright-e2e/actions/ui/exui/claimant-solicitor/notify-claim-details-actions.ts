import BaseTestData from '../../../../base/base-test-data';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import TestData from '../../../../models/test-data';
import NotifyClaimDetailsPageFactory from '../../../../pages/exui/claimant-defendant-solicitor/notify-claim-details/notify-claim-details-page-factory';

@AllMethodsStep()
export default class NotifyClaimDetailsActions extends BaseTestData {
  private notifyClaimDetailsPageFactory: NotifyClaimDetailsPageFactory;

  constructor(notifyClaimDetailsPageFactory: NotifyClaimDetailsPageFactory, testData: TestData) {
    super(testData);
    this.notifyClaimDetailsPageFactory = notifyClaimDetailsPageFactory;
  }

  async selectDefendantSolicitorPage() {
    const { selectDefendantSolicitorPage } = this.notifyClaimDetailsPageFactory;
    await selectDefendantSolicitorPage.verifyContent(this.ccdCaseData);
    await selectDefendantSolicitorPage.selectBoth();
    await selectDefendantSolicitorPage.submit();
  }

  async uploadNotifyClaimDetailsPage() {
    const { uploadNotifyClaimDetailsPage } = this.notifyClaimDetailsPageFactory;
    await uploadNotifyClaimDetailsPage.verifyContent(this.ccdCaseData);
    await uploadNotifyClaimDetailsPage.uploadDocuments();
    await uploadNotifyClaimDetailsPage.submit();
  }

  async certificateOfService1NotifyClaimDetailsPage() {
    const { certificateOfService1NotifyClaimDetailsPage } = this.notifyClaimDetailsPageFactory;
    await certificateOfService1NotifyClaimDetailsPage.verifyContent();
    await certificateOfService1NotifyClaimDetailsPage.fillDetails();
    await certificateOfService1NotifyClaimDetailsPage.submit();
  }

  async certificateOfService2NotifyClaimDetailsPage() {
    const { certificateOfService2NotifyClaimDetailsPage } = this.notifyClaimDetailsPageFactory;
    await certificateOfService2NotifyClaimDetailsPage.verifyContent(this.ccdCaseData);
    await certificateOfService2NotifyClaimDetailsPage.fillDetails();
    await certificateOfService2NotifyClaimDetailsPage.submit();
  }

  async submitNotifyClaimDetailsLIPPage() {
    const { submitNotifyClaimDetailsLIPPage } = this.notifyClaimDetailsPageFactory;
    await submitNotifyClaimDetailsLIPPage.verifyContent(this.ccdCaseData);
    await submitNotifyClaimDetailsLIPPage.submit();
  }

  async submitNotifyClaimDetailsPage() {
    const { submitNotifyClaimDetailsPage } = this.notifyClaimDetailsPageFactory;
    await submitNotifyClaimDetailsPage.verifyContent(this.ccdCaseData);
    await submitNotifyClaimDetailsPage.submit();
  }

  async submitNotifyClaimDetailsCOSPage() {
    const { submitNotifyClaimDetailsCOSPage } = this.notifyClaimDetailsPageFactory;
    await submitNotifyClaimDetailsCOSPage.verifyContent(this.ccdCaseData);
    await submitNotifyClaimDetailsCOSPage.submit();
  }

  async submitNotifyClaimDetailsLIPLRPage() {
    const { submitNotifyClaimDetailsLIPLRPage } = this.notifyClaimDetailsPageFactory;
    await submitNotifyClaimDetailsLIPLRPage.verifyContent(this.ccdCaseData);
    await submitNotifyClaimDetailsLIPLRPage.submit();
  }

  async confirmNotifyClaimDetailsPage() {
    const { confirmNotifyClaimDetailsPage } = this.notifyClaimDetailsPageFactory;
    await confirmNotifyClaimDetailsPage.verifyContent();
    await confirmNotifyClaimDetailsPage.submit();
  }

  async confirmNotifyClaimDetailsCOSPage() {
    const { confirmNotifyClaimDetailsCOSPage } = this.notifyClaimDetailsPageFactory;
    await confirmNotifyClaimDetailsCOSPage.verifyContent();
    await confirmNotifyClaimDetailsCOSPage.submit();
  }
}
