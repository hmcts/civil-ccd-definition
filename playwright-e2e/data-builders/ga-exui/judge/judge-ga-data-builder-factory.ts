import BaseDataBuilderFactory from '../../../base/base-data-builder-factory';
import MakeDecisionDataBuilder from './make-decision/make-decision-data-builder';

export default class JudgeGaDataBuilderFactory extends BaseDataBuilderFactory {
  get makeDecisionDataBuilder() {
    return new MakeDecisionDataBuilder(this.requestsFactory, this.testData);
  }
}
