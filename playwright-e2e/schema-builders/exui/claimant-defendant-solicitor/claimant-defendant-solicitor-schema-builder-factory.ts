import ClaimantResponseSpecSchemaBuilder from './claimant-response/lr-spec/claimant-response-spec-schema-builder';
import CreateClaimSpecSchemaBuilder from './create-claim/lr-spec/create-claim-spec-schema-builder';
import CreateClaimSchemaBuilder from './create-claim/unspec/create-claim-schema-builder';
import DefendantResponseSpecSchemaBuilder from './defendant-response/lr-spec/defendant-response-spec-schema-builder';
import InformAgreedExtensionDateSpecSchemaBuilder from './inform-agreed-extension-date/lr-spec/inform-agreed-extension-date-spec-schema-builder';
import TestData from '../../../models/test-utils/test-data';

export default class ClaimantDefendantSolicitorSchemaBuilderFactory {
  private _testData: TestData;

  constructor(testData: TestData) {
    this._testData = testData;
  }

  private get testData() {
    return this._testData;
  }

  get createClaimSchemaBuilder() {
    return new CreateClaimSchemaBuilder(this.testData);
  }

  get createClaimSpecSchemaBuilder() {
    return new CreateClaimSpecSchemaBuilder(this.testData);
  }

  get defendantResponseSpecSchemaBuilder() {
    return new DefendantResponseSpecSchemaBuilder(this.testData);
  }

  get claimantResponseSpecSchemaBuilder() {
    return new ClaimantResponseSpecSchemaBuilder(this.testData);
  }

  get informAgreedExtensionDateSpecSchemaBuilder() {
    return new InformAgreedExtensionDateSpecSchemaBuilder(this.testData);
  }
}
