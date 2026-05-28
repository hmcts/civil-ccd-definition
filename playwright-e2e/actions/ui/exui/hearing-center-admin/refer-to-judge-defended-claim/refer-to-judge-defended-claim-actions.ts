import BaseTestData from '../../../../../base/base-test-data';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import TestData from '../../../../../models/test-utils/test-data';
import ReferToJudgeDefendedClaimPageFactory from '../../../../../pages/exui/hearing-center-admin/refer-to-judge-defended-claim/refer-to-judge-defended-claim-page-factory';

@AllMethodsStep()
export default class ReferToJudgeDefendedClaimActions extends BaseTestData {
  private referToJudgeDefendedClaimPageFactory: ReferToJudgeDefendedClaimPageFactory;

  constructor(
    referToJudgeDefendedClaimPageFactory: ReferToJudgeDefendedClaimPageFactory,
    testData: TestData,
  ) {
    super(testData);
    this.referToJudgeDefendedClaimPageFactory = referToJudgeDefendedClaimPageFactory;
  }

  async referToJudge() {
    const { referToJudgeDefendedClaimPage } = this.referToJudgeDefendedClaimPageFactory;
    await referToJudgeDefendedClaimPage.verifyContent(this.ccdCaseData);
    await referToJudgeDefendedClaimPage.selectConfirm();
    await referToJudgeDefendedClaimPage.submit();
  }
}
