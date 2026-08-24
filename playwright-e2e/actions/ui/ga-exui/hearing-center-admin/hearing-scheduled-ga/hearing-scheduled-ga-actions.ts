import BaseTestData from '../../../../../base/base-test-data';
import TestData from '../../../../../models/test-utils/test-data';
import HearingScheduledGaPageFactory from '../../../../../pages/ga-exui/hearing-center-admin/hearing-scheduled-ga/hearing-scheduled-ga-page-factory';

export default class HearingScheduledGaActions extends BaseTestData {
  private hearingScheduledGaPageFactory: HearingScheduledGaPageFactory;

  constructor(hearingScheduledGaPageFactory: HearingScheduledGaPageFactory, testData: TestData) {
    super(testData);
    this.hearingScheduledGaPageFactory = hearingScheduledGaPageFactory;
  }
}
