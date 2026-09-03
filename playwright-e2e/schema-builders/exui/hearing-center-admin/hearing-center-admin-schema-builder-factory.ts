import BaseSchemaBuilderFactory from '../../../base/base-schema-builder-factory';
import DismissCaseSchemaBuilder from '../common/dismiss-case/dismiss-case-schema-builder';
import CreateCaseFlagsSchemaBuilder from './create-case-flags/create-case-flags-schema-builder';
import ManageCaseFlagsSchemaBuilder from './manage-case-flags/manage-case-flags-schema-builder';
import ManageStaySchemaBuilder from './manage-stay/manage-stay-schema-builder';
import QueryManagementRaiseSchemaBuilder from '../common/query-management-raise/query-management-raise-schema-builder';
import QueryManagementRespondSchemaBuilder from '../common/query-management-respond/query-management-respond-schema-builder';
import ScheduleHearingSchemaBuilder from './schedule-hearing/schedule-hearing-schema-builder';
import ServiceHearingValuesSpecSchemaBuilder from '../common/service-hearing-values/lr-spec/service-hearing-values-spec-schema-builder';
import ServiceHearingValuesSchemaBuilder from '../common/service-hearing-values/unspec/service-hearing-values-schema-builder';
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

  get queryManagementRaiseSchemaBuilder() {
    return new QueryManagementRaiseSchemaBuilder(this.testData);
  }

  get queryManagementRespondSchemaBuilder() {
    return new QueryManagementRespondSchemaBuilder(this.testData);
  }

  get serviceHearingValuesSpecSchemaBuilder() {
    return new ServiceHearingValuesSpecSchemaBuilder(this.testData);
  }

  get serviceHearingValuesSchemaBuilder() {
    return new ServiceHearingValuesSchemaBuilder(this.testData);
  }
}
