import BaseSteps from '../../../../../base/base-steps';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import TestData from '../../../../../models/test-data';
import CreateClaimPageFactory from '../../../../../pages/exui/solicitor-events/create-claim/create-claim-page-factory';

@AllMethodsStep()
export default class CreateClaimSpecSteps extends BaseSteps {
  private createClaimPageFactory: CreateClaimPageFactory;

  constructor(createClaimPageFactory: CreateClaimPageFactory, testData: TestData) {
    super(testData);
    this.createClaimPageFactory = createClaimPageFactory;
  }
}
