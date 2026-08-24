import BaseTestData from '../../../../../base/base-test-data';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import TestData from '../../../../../models/test-utils/test-data';
import HearingScheduledGaPageFactory from '../../../../../pages/ga-exui/hearing-center-admin/hearing-scheduled-ga/hearing-scheduled-ga-page-factory';

@AllMethodsStep()
export default class HearingScheduledGaActions extends BaseTestData {
  private hearingScheduledGaPageFactory: HearingScheduledGaPageFactory;

  constructor(hearingScheduledGaPageFactory: HearingScheduledGaPageFactory, testData: TestData) {
    super(testData);
    this.hearingScheduledGaPageFactory = hearingScheduledGaPageFactory;
  }

  async applicationDetails() {
    const { hearingNoticeGaDetailPage } = this.hearingScheduledGaPageFactory;
    await hearingNoticeGaDetailPage.verifyContent(this.getGaCCDCaseData()!);
    await hearingNoticeGaDetailPage.enterApplicationDetails();
    await hearingNoticeGaDetailPage.submit();
  }

  async hearingDetails() {
    const { hearingDetailsPage } = this.hearingScheduledGaPageFactory;
    await hearingDetailsPage.verifyContent(this.getGaCCDCaseData()!);
    await hearingDetailsPage.enterHearingDetails();
    await hearingDetailsPage.submit();
  }

  async hearingInformation() {
    const { hearingInformationPage } = this.hearingScheduledGaPageFactory;
    await hearingInformationPage.verifyContent(this.getGaCCDCaseData()!);
    await hearingInformationPage.enterInformation();
    await hearingInformationPage.submit();
  }

  async submitHearingNotice() {
    const { submitPage } = this.hearingScheduledGaPageFactory;
    await submitPage.verifyContent(this.getGaCCDCaseData()!);
    await submitPage.submit();
  }

  async confirmHearingNotice() {
    const { confirmPage } = this.hearingScheduledGaPageFactory;
    await confirmPage.verifyContent(this.getGaCCDCaseData()!);
  }
}
