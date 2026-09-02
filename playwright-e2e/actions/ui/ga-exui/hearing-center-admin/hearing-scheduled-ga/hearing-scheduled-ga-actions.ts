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

  async hearingNoticeGaDetails() {
    const { hearingNoticeGaDetailPage } = this.hearingScheduledGaPageFactory;
    await hearingNoticeGaDetailPage.verifyContent(this.getGaCCDCaseData()!);
    await hearingNoticeGaDetailPage.enterApplicationDetails();
    await hearingNoticeGaDetailPage.submit();
  }

  async hearingDetails() {
    const { hearingScheduledGaHearingDetailsPage } = this.hearingScheduledGaPageFactory;
    await hearingScheduledGaHearingDetailsPage.verifyContent(this.getGaCCDCaseData()!);
    await hearingScheduledGaHearingDetailsPage.enterHearingDetails();
    await hearingScheduledGaHearingDetailsPage.submit();
  }

  async hearingInformation() {
    const { hearingScheduledGaHearingInformationPage } = this.hearingScheduledGaPageFactory;
    await hearingScheduledGaHearingInformationPage.verifyContent(this.getGaCCDCaseData()!);
    await hearingScheduledGaHearingInformationPage.enterInformation();
    await hearingScheduledGaHearingInformationPage.submit();
  }

  async submitHearingNotice() {
    const { hearingScheduledGaSubmitPage } = this.hearingScheduledGaPageFactory;
    await hearingScheduledGaSubmitPage.verifyContent(this.getGaCCDCaseData()!);
    await hearingScheduledGaSubmitPage.submit();
  }

  async confirmHearingNotice() {
    const { hearingScheduledGaConfirmPage } = this.hearingScheduledGaPageFactory;
    await hearingScheduledGaConfirmPage.verifyContent(this.getGaCCDCaseData()!);
  }
}
