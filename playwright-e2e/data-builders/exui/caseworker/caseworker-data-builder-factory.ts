import BaseDataBuilderFactory from '../../../base/base-data-builder-factory';
import AddCaseNoteDataBuilder from './add-case-note/add-case-note-data-builder';
import AmendPartyDetailsDataBuilder from './amend-party-details/amend-party-details-data-builder';

export default class CaseworkerDataBuilderFactory extends BaseDataBuilderFactory {
  get addCaseNoteDataBuilder() {
    return new AddCaseNoteDataBuilder(this.requestsFactory, this.testData);
  }

  get amendPartyDetailsDataBuilder() {
    return new AmendPartyDetailsDataBuilder(this.requestsFactory, this.testData);
  }
}
