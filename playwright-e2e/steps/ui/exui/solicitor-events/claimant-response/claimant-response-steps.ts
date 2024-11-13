import BaseSteps from '../../../../../base/base-steps';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import TestData from '../../../../../models/test-data';
import ClaimantResponsePageFactory from '../../../../../pages/exui/solicitor-events/claimant-response/claimant-response-page-factory';

@AllMethodsStep()
export default class ClaimantResponseSteps extends BaseSteps {
  private claimantResponsePageFactory: ClaimantResponsePageFactory;

  constructor(claimantResponsePageFactory: ClaimantResponsePageFactory, testData: TestData) {
    super(testData);
    this.claimantResponsePageFactory = claimantResponsePageFactory;
  }
}
