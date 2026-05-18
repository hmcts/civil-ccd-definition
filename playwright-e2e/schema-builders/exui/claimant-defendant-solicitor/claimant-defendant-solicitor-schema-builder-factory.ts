import AcknowledgeClaimSchemaBuilder from './acknowledge-claim/unspec/acknowledge-claim-schema-builder';
import AddOrAmendClaimDocumentsSchemaBuilder from './add-or-amend-claim-documents/unspec/add-or-amend-claim-documents-schema-builder';
import ClaimantResponseSpecSchemaBuilder from './claimant-response/lr-spec/claimant-response-spec-schema-builder';
import CreateClaimSpecSchemaBuilder from './create-claim/lr-spec/create-claim-spec-schema-builder';
import CreateClaimSchemaBuilder from './create-claim/unspec/create-claim-schema-builder';
import DefendantResponseSpecSchemaBuilder from './defendant-response/lr-spec/defendant-response-spec-schema-builder';
import InformAgreedExtensionDateSpecSchemaBuilder from './inform-agreed-extension-date/lr-spec/inform-agreed-extension-date-spec-schema-builder';
import NotifyClaimSchemaBuilder from './notify-claim/unspec/notify-claim-schema-builder';
import NotifyClaimDetailsSchemaBuilder from './notify-claim-details/unspec/notify-claim-details-schema-builder';
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

  get acknowledgeClaimSchemaBuilder() {
    return new AcknowledgeClaimSchemaBuilder(this.testData);
  }

  get addOrAmendClaimDocumentsSchemaBuilder() {
    return new AddOrAmendClaimDocumentsSchemaBuilder(this.testData);
  }

  get notifyClaimSchemaBuilder() {
    return new NotifyClaimSchemaBuilder(this.testData);
  }

  get notifyClaimDetailsSchemaBuilder() {
    return new NotifyClaimDetailsSchemaBuilder(this.testData);
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
