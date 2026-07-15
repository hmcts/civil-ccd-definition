import BaseSchemaBuilderFactory from '../../../base/base-schema-builder-factory';
import ScheduleHearingSchemaBuilder from './schedule-hearing/schedule-hearing-schema-builder';
import CaseFlagsSchemaBuilder from './case-flag/case-flag-schema-builder';

export default class HearingCenterAdminSchemaBuilderFactory extends BaseSchemaBuilderFactory {
  get scheduleHearingSchemaBuilder() {
    return new ScheduleHearingSchemaBuilder(this.testData);
  }

get caseFlagsSchemaBuilder() {
  return new CaseFlagsSchemaBuilder(this.testData);
}
}
