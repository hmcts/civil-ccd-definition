import BaseSchemaBuilderFactory from '../../../base/base-schema-builder-factory';
import DismissCaseSchemaBuilder from '../common/dismiss-case/dismiss-case-schema-builder';
import CreateCaseFlagsSchemaBuilder from './create-case-flags/create-case-flags-schema-builder';
import ManageCaseFlagsSchemaBuilder from './manage-case-flags/manage-case-flags-schema-builder';
import ManageStaySchemaBuilder from './manage-stay/manage-stay-schema-builder';
import ScheduleHearingSchemaBuilder from './schedule-hearing/schedule-hearing-schema-builder';
import StayCaseSchemaBuilder from './stay-case/stay-case-schema-builder';

export default class HearingCenterAdminSchemaBuilderFactory extends BaseSchemaBuilderFactory {
  get scheduleHearingSchemaBuilder() {
    return new ScheduleHearingSchemaBuilder(this.testData);
  }

  get stayCaseSchemaBuilder() {
    return new StayCaseSchemaBuilder(this.testData);
  }

  get manageStaySchemaBuilder() {
    return new ManageStaySchemaBuilder(this.testData);
  }

  get createCaseFlagsSchemaBuilder() {
    return new CreateCaseFlagsSchemaBuilder(this.testData);
  }

  get manageCaseFlagsSchemaBuilder() {
    return new ManageCaseFlagsSchemaBuilder(this.testData);
  }

  get dismissCaseSchemaBuilder() {
    return new DismissCaseSchemaBuilder(this.testData);
  }
}
