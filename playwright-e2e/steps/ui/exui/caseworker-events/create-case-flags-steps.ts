import BaseSteps from '../../../../base/base-steps';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import TestData from '../../../../models/test-data';
import CreateCaseFlagsPageFactory from '../../../../pages/exui/caseworker-events/create-case-flags/create-case-flags-page-factory';

@AllMethodsStep()
export default class CreateCaseFlagsSteps extends BaseSteps {
  private createCaseFlagsPageFactory: CreateCaseFlagsPageFactory;

  constructor(createCaseFlagsPageFactory: CreateCaseFlagsPageFactory, testData: TestData) {
    super(testData);
    this.createCaseFlagsPageFactory = createCaseFlagsPageFactory;
  }
}
