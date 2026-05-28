import BaseTestData from '../../../../../base/base-test-data';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import TestData from '../../../../../models/test-utils/test-data';
import SetAsideJudgmentPageFactory from '../../../../../pages/exui/hearing-center-admin/set-aside-judgment/set-aside-judgment-page-factory';

@AllMethodsStep()
export default class SetAsideJudgmentSpecActions extends BaseTestData {
  private setAsideJudgmentPageFactory: SetAsideJudgmentPageFactory;

  constructor(setAsideJudgmentPageFactory: SetAsideJudgmentPageFactory, testData: TestData) {
    super(testData);
    this.setAsideJudgmentPageFactory = setAsideJudgmentPageFactory;
  }

  async orderFollowingApplication() {
    const { setAsideJudgmentPage, setAsideOrderTypePage, submitSetAsideJudgmentPage } =
      this.setAsideJudgmentPageFactory;

    await setAsideJudgmentPage.verifyContent(this.ccdCaseData);
    await setAsideJudgmentPage.selectJudgeOrder();
    await setAsideJudgmentPage.submit();

    await setAsideOrderTypePage.verifyContent(this.ccdCaseData);
    await setAsideOrderTypePage.fillOrderFollowingApplication();
    await setAsideOrderTypePage.submit();

    await submitSetAsideJudgmentPage.verifyContent(this.ccdCaseData);
    await submitSetAsideJudgmentPage.submit();
  }

  async orderFollowingDefenceReceived() {
    const { setAsideJudgmentPage, setAsideOrderTypePage, submitSetAsideJudgmentPage } =
      this.setAsideJudgmentPageFactory;

    await setAsideJudgmentPage.verifyContent(this.ccdCaseData);
    await setAsideJudgmentPage.selectJudgeOrder();
    await setAsideJudgmentPage.submit();

    await setAsideOrderTypePage.verifyContent(this.ccdCaseData);
    await setAsideOrderTypePage.fillOrderFollowingDefenceReceived();
    await setAsideOrderTypePage.submit();

    await submitSetAsideJudgmentPage.verifyContent(this.ccdCaseData);
    await submitSetAsideJudgmentPage.submit();
  }

  async orderJudgmentMadeInError() {
    const { setAsideJudgmentPage, submitSetAsideJudgmentPage } = this.setAsideJudgmentPageFactory;

    await setAsideJudgmentPage.verifyContent(this.ccdCaseData);
    await setAsideJudgmentPage.selectJudgmentError();
    await setAsideJudgmentPage.submit();

    await submitSetAsideJudgmentPage.verifyContent(this.ccdCaseData);
    await submitSetAsideJudgmentPage.submit();
  }
}
