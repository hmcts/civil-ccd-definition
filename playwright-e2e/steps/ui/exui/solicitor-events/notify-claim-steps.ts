import BaseSteps from '../../../../base/base-steps';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import TestData from '../../../../models/test-data';
import NotifyClaimPageFactory from '../../../../pages/exui/solicitor-events/notify-claim/notify-claim-page-factory';

@AllMethodsStep()
export default class NotifyClaimSteps extends BaseSteps {
  private notifyClaimPageFactory: NotifyClaimPageFactory;

  constructor(notifyClaimPageFactory: NotifyClaimPageFactory, testData: TestData) {
    super(testData);
    this.notifyClaimPageFactory = notifyClaimPageFactory;
  }
}
