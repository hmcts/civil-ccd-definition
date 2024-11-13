import BaseSteps from '../../../../../base/base-steps';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import TestData from '../../../../../models/test-data';
import DefendantResponsePageFactory from '../../../../../pages/exui/solicitor-events/defendant-response/defendant-response-page-factory';

@AllMethodsStep()
export default class DefendantResponseSteps extends BaseSteps {
  private defendantResponsePageFactory: DefendantResponsePageFactory;

  constructor(defendantResponsePageFactory: DefendantResponsePageFactory, testData: TestData) {
    super(testData);
    this.defendantResponsePageFactory = defendantResponsePageFactory;
  }
}
