import BaseSteps from './base-steps';
import TestData from '../types/test-data';

export default abstract class BaseApiSteps extends BaseSteps {

  constructor(isSetupTest: boolean, testData: TestData) {
    super(testData);
  }

}
