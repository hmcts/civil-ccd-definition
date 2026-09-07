import BaseDataBuilderFactory from '../../../base/base-data-builder-factory';
import HearingScheduledGaDataBuilder from './hearing-scheduled-ga/hearing-scheduled-ga-data-builder';

export default class HearingCenterAdminGaDataBuilderFactory extends BaseDataBuilderFactory {
  get hearingScheduledGaDataBuilder() {
    return new HearingScheduledGaDataBuilder(this.requestsFactory, this.testData);
  }
}
