import TestData from '../../../models/test-utils/test-data';
import AddCaseNoteSchemaBuilder from './add-case-note/add-case-note-schema-builder';
import AmendPartyDetailsSchemaBuilder from './amend-party-details/amend-party-details-schema-builder';

export default class CaseworkerSchemaBuilderFactory {
  private _testData: TestData;

  constructor(testData: TestData) {
    this._testData = testData;
  }

  private get testData() {
    return this._testData;
  }

  get addCaseNoteSchemaBuilder() {
    return new AddCaseNoteSchemaBuilder(this.testData);
  }

  get amendPartyDetailsSchemaBuilder() {
    return new AmendPartyDetailsSchemaBuilder(this.testData);
  }
}
