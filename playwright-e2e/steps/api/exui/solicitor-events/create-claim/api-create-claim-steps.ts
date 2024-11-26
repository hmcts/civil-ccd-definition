import BaseApiSteps from '../../../../../base/base-api-steps';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import TestData from '../../../../../models/test-data';
import RequestsFactory from '../../../../../requests/requests-factory';

@AllMethodsStep()
export default class ApiCreateClaimSteps extends BaseApiSteps {
  constructor(requestsFactory: RequestsFactory, testData: TestData) {
    super(requestsFactory, testData);
  }
}
