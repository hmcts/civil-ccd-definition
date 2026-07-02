import { AllMethodsStep } from '../../../../decorators/test-steps';
import BaseTestData from '../../../../base/base-test-data';
import TestData from '../../../../models/test-utils/test-data';
import RequestHearingPageFactory from '../../../../pages/exui/hearing-center-admin/request-hearing/request-hearing-page-factory';

@AllMethodsStep()
export default class RequestHearingActions extends BaseTestData {
  private requestHearingPageFactory: RequestHearingPageFactory;

  constructor(requestHearingPageFactory: RequestHearingPageFactory, testData: TestData) {
    super(testData);
    this.requestHearingPageFactory = requestHearingPageFactory;
  }

  async requestNewHearing() {
    const { hearingsPage } = this.requestHearingPageFactory;
    await hearingsPage.verifyContent();
    await hearingsPage.requestHearing();
  }

  async checkRequirements() {
    const { hearingRequirementsPage } = this.requestHearingPageFactory;
    await hearingRequirementsPage.verifyContent(this.ccdCaseData);
    await hearingRequirementsPage.submit();
  }

  async selectFacilities() {
    const { hearingFacilitiesPage } = this.requestHearingPageFactory;
    await hearingFacilitiesPage.verifyContent(this.ccdCaseData);
    await hearingFacilitiesPage.selectAdditionalFacilities();
    await hearingFacilitiesPage.submit();
  }

  async selectStage() {
    const { hearingStagePage } = this.requestHearingPageFactory;
    await hearingStagePage.verifyContent(this.ccdCaseData);
    await hearingStagePage.selectStage();
    await hearingStagePage.submit();
  }

  async selectAttendance() {
    const { hearingAttendancePage } = this.requestHearingPageFactory;
    await hearingAttendancePage.verifyContent(this.ccdCaseData);
    await hearingAttendancePage.selectAttendance();
    await hearingAttendancePage.submit();
  }

  async selectVenue() {
    const { hearingVenuePage } = this.requestHearingPageFactory;
    await hearingVenuePage.verifyContent(this.ccdCaseData);
    await hearingVenuePage.submit();
  }

  async selectJudge() {
    const { hearingJudgePage } = this.requestHearingPageFactory;
    await hearingJudgePage.verifyContent(this.ccdCaseData);
    await hearingJudgePage.selectJudges();
    await hearingJudgePage.submit();
  }

  async selectTiming() {
    const { hearingTimingPage } = this.requestHearingPageFactory;
    await hearingTimingPage.verifyContent(this.ccdCaseData);
    await hearingTimingPage.enterHearingLength();
    await hearingTimingPage.submit();
  }

  async enterAdditionalInstructions() {
    const { hearingAdditionalInstructionsPage } = this.requestHearingPageFactory;
    await hearingAdditionalInstructionsPage.verifyContent(this.ccdCaseData);
    await hearingAdditionalInstructionsPage.enterAdditionalInstructions();
    await hearingAdditionalInstructionsPage.submit();
  }

  async submitHearing() {
    const { hearingSubmitPage } = this.requestHearingPageFactory;
    await hearingSubmitPage.verifyContent(this.ccdCaseData);
    await hearingSubmitPage.submit();
  }

  async confirmHearing() {
    const { hearingConfirmPage } = this.requestHearingPageFactory;
    await hearingConfirmPage.verifyContent();
    await hearingConfirmPage.clickViewStatus();
  }

  async viewDetails() {
    const { hearingsPage } = this.requestHearingPageFactory;
    await hearingsPage.verifyContent();
    await hearingsPage.viewDetails();
  }

  async editHearing() {
    const { hearingViewSummaryPage } = this.requestHearingPageFactory;
    await hearingViewSummaryPage.verifyContent();
    await hearingViewSummaryPage.editHearing();
  }

  async changeAdditionalFacilities() {
    const { hearingEditSummaryPage } = this.requestHearingPageFactory;
    await hearingEditSummaryPage.verifyContent(this.ccdCaseData);
    await hearingEditSummaryPage.changeAdditionalFacilities();
  }

  async updateAdditionalFacilities() {
    const { hearingFacilitiesPage } = this.requestHearingPageFactory;
    await hearingFacilitiesPage.verifyContent(this.ccdCaseData);
    await hearingFacilitiesPage.updateAdditionalFacilities();
    await hearingFacilitiesPage.submit();
  }

  async changeJudgeTypes() {
    const { hearingEditSummaryPage } = this.requestHearingPageFactory;
    await hearingEditSummaryPage.verifyContent(this.ccdCaseData);
    await hearingEditSummaryPage.changeJudgeTypes();
  }

  async updateJudgeTypes() {
    const { hearingJudgePage } = this.requestHearingPageFactory;
    await hearingJudgePage.verifyContent(this.ccdCaseData);
    await hearingJudgePage.updateJudges();
    await hearingJudgePage.submit();
  }

  async changeAttendance() {
    const { hearingEditSummaryPage } = this.requestHearingPageFactory;
    await hearingEditSummaryPage.verifyContent(this.ccdCaseData);
    await hearingEditSummaryPage.changeAttendance();
  }

  async updateAttendance() {
    const { hearingAttendancePage } = this.requestHearingPageFactory;
    await hearingAttendancePage.verifyContent(this.ccdCaseData);
    await hearingAttendancePage.submit();
  }

  async changeTimings() {
    const { hearingEditSummaryPage } = this.requestHearingPageFactory;
    await hearingEditSummaryPage.verifyContent(this.ccdCaseData);
    await hearingEditSummaryPage.changeTiming();
  }

  async updateTimings() {
    const { hearingTimingPage } = this.requestHearingPageFactory;
    await hearingTimingPage.verifyContent(this.ccdCaseData);
    await hearingTimingPage.updateHearingLength();
    await hearingTimingPage.submit();
  }

  async changeAdditionalInstructions() {
    const { hearingEditSummaryPage } = this.requestHearingPageFactory;
    await hearingEditSummaryPage.verifyContent(this.ccdCaseData);
    await hearingEditSummaryPage.changeAdditionalInstructions();
  }

  async updateAdditionalInstructions() {
    const { hearingAdditionalInstructionsPage } = this.requestHearingPageFactory;
    await hearingAdditionalInstructionsPage.verifyContent(this.ccdCaseData);
    await hearingAdditionalInstructionsPage.enterUpdatedInstructions();
    await hearingAdditionalInstructionsPage.submit();
  }

  async submitUpdatedRequest() {
    const { hearingEditSummaryPage } = this.requestHearingPageFactory;
    await hearingEditSummaryPage.verifyContent(this.ccdCaseData);
    await hearingEditSummaryPage.submit();
  }

  async hearingChangeReason() {
    const { hearingChangeReasonPage } = this.requestHearingPageFactory;
    await hearingChangeReasonPage.verifyContent(this.ccdCaseData);
    await hearingChangeReasonPage.selectReasonPartyRequestedChange();
    await hearingChangeReasonPage.submit();
  }

  async cancelHearing() {
    const { hearingsPage } = this.requestHearingPageFactory;
    await hearingsPage.verifyContent();
    await hearingsPage.cancel();
  }

  async cancelHearingListedInError() {
    const { hearingCancelPage } = this.requestHearingPageFactory;
    await hearingCancelPage.verifyContent();
    await hearingCancelPage.selectListedInError();
    await hearingCancelPage.submit();
  }
}
