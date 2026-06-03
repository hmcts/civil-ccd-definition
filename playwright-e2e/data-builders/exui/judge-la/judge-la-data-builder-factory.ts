import BaseDataBuilderFactory from '../../../base/base-data-builder-factory';
import CreateSdoDataBuilder from './create-sdo/create-sdo-data-builder';

export default class JudgeLADataBuilderFactory extends BaseDataBuilderFactory {
  get createSdoDataBuilder() {
    return new CreateSdoDataBuilder(this.requestsFactory, this.testData);
  }
}
