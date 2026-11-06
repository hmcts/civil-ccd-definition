import BaseTestData from '../../../../../base/base-test-data';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import TestData from '../../../../../models/test-utils/test-data';
import MakeDecisionGaPageFactory from '../../../../../pages/ga-exui/judge/make-decision-ga/make-decision-ga-page-factory';

@AllMethodsStep()
export default class MakeDecisionGaActions extends BaseTestData {
  private pageFactory: MakeDecisionGaPageFactory;

  constructor(pageFactory: MakeDecisionGaPageFactory, testData: TestData) {
    super(testData);
    this.pageFactory = pageFactory;
  }

  async selectListForAHearing() {
    const { judicialDecisionPage } = this.pageFactory;
    await judicialDecisionPage.verifyContent(this.getGaCCDCaseData()!);
    await judicialDecisionPage.selectListForAHearing();
    await judicialDecisionPage.submit();
  }

  async enterHearingDetails() {
    const { judicialHearingDetailsScreenPage } = this.pageFactory;
    await judicialHearingDetailsScreenPage.verifyContent(this.getGaCCDCaseData()!);
    await judicialHearingDetailsScreenPage.enterDetails();
    await judicialHearingDetailsScreenPage.submit();
  }

  async enterDrawGeneralOrderDetails() {
    const { judicialHearingDetailsGeneralOrderScreenPage } = this.pageFactory;
    await judicialHearingDetailsGeneralOrderScreenPage.verifyContent(this.getGaCCDCaseData()!);
    await judicialHearingDetailsGeneralOrderScreenPage.selectOrderWithoutNotice();
    await judicialHearingDetailsGeneralOrderScreenPage.submit();
  }

  async previewOrderDocument() {
    const { judicialHearingDocPreviewPage } = this.pageFactory;
    await judicialHearingDocPreviewPage.verifyContent(this.getGaCCDCaseData()!);
    await judicialHearingDocPreviewPage.submit();
  }

  async submitDecision() {
    const { judicialHearingSubmitPage } = this.pageFactory;
    await judicialHearingSubmitPage.verifyContent(this.getGaCCDCaseData()!);
    await judicialHearingSubmitPage.submit();
  }

  async confirmDecision() {
    const { judicialHearingConfirmPage } = this.pageFactory;
    await judicialHearingConfirmPage.verifyContent(this.getGaCCDCaseData()!);
    await judicialHearingConfirmPage.submit();
  }
}
