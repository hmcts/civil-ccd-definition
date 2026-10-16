import BaseSchemaBuilderFactory from '../../../base/base-schema-builder-factory';
import HearingScheduledGaSchemaBuilder from './hearing-scheduled-ga/hearing-scheduled-ga-schema-builder';

export default class HearingCenterAdminGaSchemaBuilderFactory extends BaseSchemaBuilderFactory {
  get hearingScheduledGaSchemaBuilder() {
    return new HearingScheduledGaSchemaBuilder(this.testData);
  }
}
