import BaseDataBuilderFactory from '../../../base/base-data-builder-factory';
import ScheduleHearingDataBuilder from './schedule-hearing/schedule-hearing-data-builder';
import CaseFlagsDataBuilder from './case-flag/case-flag-data-builder';

export default class HearingCenterAdminDataBuilderFactory extends BaseDataBuilderFactory {
  get scheduleHearingDataBuilder() {
    return new ScheduleHearingDataBuilder(this.requestsFactory, this.testData);
  }

  get caseFlagsDataBuilder() {
    return new CaseFlagsDataBuilder(this.requestsFactory, this.testData);
  }
}
