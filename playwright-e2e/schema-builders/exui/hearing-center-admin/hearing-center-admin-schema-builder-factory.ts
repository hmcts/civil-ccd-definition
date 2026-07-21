import BaseSchemaBuilderFactory from '../../../base/base-schema-builder-factory';
import DismissCaseSchemaBuilder from '../common/dismiss-case/dismiss-case-schema-builder';
import ManageStaySchemaBuilder from './manage-stay/manage-stay-schema-builder';
import ScheduleHearingSchemaBuilder from './schedule-hearing/schedule-hearing-schema-builder';
import CaseFlagsSchemaBuilder from './case-flag/case-flag-schema-builder';
import StayCaseSchemaBuilder from './stay-case/stay-case-schema-builder';

export default class HearingCenterAdminSchemaBuilderFactory extends BaseSchemaBuilderFactory {
  get scheduleHearingSchemaBuilder() {
    return new ScheduleHearingSchemaBuilder(this.testData);
  }

  get caseFlagsSchemaBuilder() {
    return new CaseFlagsSchemaBuilder(this.testData);
  }
  
  get stayCaseSchemaBuilder() {
    return new StayCaseSchemaBuilder(this.testData);
  }

  get manageStaySchemaBuilder() {
    return new ManageStaySchemaBuilder(this.testData);
  }

  get dismissCaseSchemaBuilder() {
    return new DismissCaseSchemaBuilder(this.testData);
  }
}
