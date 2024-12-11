import CCDCaseData from '../models/ccd/ccd-case-data';
import TestData from '../models/test-data';

export default abstract class BaseSteps {
  private _testData: TestData;

  constructor(testData: TestData) {
    this._testData = testData;
  }

  protected get workerIndex() {
    return this._testData.workerIndex;
  }

  protected get ccdCaseData() {
    return this._testData.ccdCaseData;
  }

  protected set setCCDCaseData(ccdCaseData: CCDCaseData) {
    this._testData.ccdCaseData = ccdCaseData;
  }
}
