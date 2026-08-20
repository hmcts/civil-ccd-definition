import BaseTestData from '../../../../../base/base-test-data';
import TestData from '../../../../../models/test-utils/test-data';
import MakeDecisionPageFactory from '../../../../../pages/ga-exui/judge/make-decision/make-decision-page-factory';

export default class MakeDecisionActions extends BaseTestData {
  private makeDecisionPageFactory: MakeDecisionPageFactory;

  constructor(makeDecisionPageFactory: MakeDecisionPageFactory, testData: TestData) {
    super(testData);
    this.makeDecisionPageFactory = makeDecisionPageFactory;
  }
}
