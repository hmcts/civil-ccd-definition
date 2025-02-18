import BaseTestData from '../../../../base/base-test-data';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import TestData from '../../../../models/test-data';
import AcknowledgeClaimPageFactory from '../../../../pages/exui/claimant-defendant-solicitor/acknowledge-claim/acknowledge-claim-page-factory';

@AllMethodsStep()
export default class AcknowledgeClaimActions extends BaseTestData {
  private acknowledgeClaimPageFactory: AcknowledgeClaimPageFactory;

  constructor(acknowledgeClaimPageFactory: AcknowledgeClaimPageFactory, testData: TestData) {
    super(testData);
    this.acknowledgeClaimPageFactory = acknowledgeClaimPageFactory;
  }
}
