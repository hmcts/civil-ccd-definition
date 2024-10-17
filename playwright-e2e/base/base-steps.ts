import TestData from '../models/test-data';

export default abstract class BaseSteps {
  private _testData: TestData;

  constructor(testData: TestData) {
    this._testData = testData;
  }

  protected get workerIndex() {
    return this._testData.workerIndex;
  }
}
