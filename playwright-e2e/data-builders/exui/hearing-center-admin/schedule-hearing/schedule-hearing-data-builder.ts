import BaseDataBuilder from '../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import scheduleHearingDataBuilderComponents from './schedule-hearing-data-builder-components';

@AllMethodsStep()
export default class ScheduleHearingDataBuilder extends BaseDataBuilder {
  async buildData() {
    return {
      ...scheduleHearingDataBuilderComponents.hearingNoticeSelect,
      ...scheduleHearingDataBuilderComponents.listingOrRelisting,
      ...scheduleHearingDataBuilderComponents.hearingDetails,
      ...scheduleHearingDataBuilderComponents.hearingInformation,
    };
  }
}
