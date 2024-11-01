import BaseSteps from '../../../../base/base-steps';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import TestData from '../../../../models/test-data';
import NotifyClaimDetailsPageFactory from '../../../../pages/exui/solicitor-events/notify-claim-details/notify-claim-details-page-factory';

@AllMethodsStep()
export default class NotifyClaimSteps extends BaseSteps {
  private notifyClaimPageFactory: NotifyClaimDetailsPageFactory;

  constructor(notifyClaimPageFactory: NotifyClaimDetailsPageFactory, testData: TestData) {
    super(testData);
    this.notifyClaimPageFactory = notifyClaimPageFactory;
  }
}
