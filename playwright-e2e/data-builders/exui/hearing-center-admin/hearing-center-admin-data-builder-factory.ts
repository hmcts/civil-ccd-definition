import BaseDataBuilderFactory from '../../../base/base-data-builder-factory';
import DismissCaseDataBuilder from '../common/dismiss-case/dismiss-case-data-builder';
import CreateCaseFlagsDataBuilder from './create-case-flags/create-case-flags-data-builder';
import ManageCaseFlagsDataBuilder from './manage-case-flags/manage-case-flags-data-builder';
import ManageStayDataBuilder from './manage-stay/manage-stay-data-builder';
import ScheduleHearingDataBuilder from './schedule-hearing/schedule-hearing-data-builder';
import StayCaseDataBuilder from './stay-case/stay-case-data-builder';

export default class HearingCenterAdminDataBuilderFactory extends BaseDataBuilderFactory {
  get scheduleHearingDataBuilder() {
    return new ScheduleHearingDataBuilder(this.requestsFactory, this.testData);
  }

  get stayCaseDataBuilder() {
    return new StayCaseDataBuilder(this.requestsFactory, this.testData);
  }

  get manageStayDataBuilder() {
    return new ManageStayDataBuilder(this.requestsFactory, this.testData);
  }

  get createCaseFlagsDataBuilder() {
    return new CreateCaseFlagsDataBuilder(this.requestsFactory, this.testData);
  }

  get manageCaseFlagsDataBuilder() {
    return new ManageCaseFlagsDataBuilder(this.requestsFactory, this.testData);
  }

  get dismissCaseDataBuilder() {
    return new DismissCaseDataBuilder(this.requestsFactory, this.testData);
  }
}
