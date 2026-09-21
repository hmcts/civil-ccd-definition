import BaseDataBuilder from '../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import hearingScheduledGaDataBuilderComponents from './hearing-scheduled-ga-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class HearingScheduledGaDataBuilder extends BaseDataBuilder {
  async build() {
    return this.buildData();
  }

  protected async buildData() {
    return {
      ...hearingScheduledGaDataBuilderComponents.gaHearingNoticeApplication,
      ...hearingScheduledGaDataBuilderComponents.gaHearingNoticeDetail,
      ...hearingScheduledGaDataBuilderComponents.gaHearingNoticeInformation,
    };
  }
}
