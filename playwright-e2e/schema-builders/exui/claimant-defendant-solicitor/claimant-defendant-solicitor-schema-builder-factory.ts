import CreateClaimSpecSchemaBuilder from './create-claim/lr-spec/create-claim-spec-schema-builder';
import CreateClaimSchemaBuilder from './create-claim/unspec/create-claim-schema-builder';

export default class ClaimantDefendantSolicitorSchemaBuilderFactory {
  get createClaimSchemaBuilder() {
    return new CreateClaimSchemaBuilder();
  }

  get createClaimSpecSchemaBuilder() {
    return new CreateClaimSpecSchemaBuilder();
  }
}
