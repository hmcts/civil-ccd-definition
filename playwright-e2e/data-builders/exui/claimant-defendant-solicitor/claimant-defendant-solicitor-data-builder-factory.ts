import BaseDataBuilderFactory from '../../../base/base-data-builder-factory';
import ClaimantResponseSpecDataBuilder from './claimant-response/lr-spec/claimant-response-spec-data-builder';
import DefendantResponseSpecDataBuilder from './defendant-response/lr-spec/defendant-response-spec-data-builder';
import CreateClaimSpecDataBuilder from './create-claim/lr-spec/create-claim-spec-data-builder';
import CreateClaimDataBuilder from './create-claim/unspec/create-claim-data-builder';
import InformAgreedExtensionDateSpecDataBuilder from './inform-agreed-extension-date/lr-spec/inform-agreed-extension-date-spec-data-builder';
import ServiceRequestDataBuilder from './service-request/service-request-data-builder';

export default class ClaimantDefendantSolicitorDataBuilderFactory extends BaseDataBuilderFactory {
  get createClaimDataBuilder() {
    return new CreateClaimDataBuilder(this.requestsFactory, this.testData);
  }

  get createClaimSpecDataBuilder() {
    return new CreateClaimSpecDataBuilder(this.requestsFactory, this.testData);
  }

  get defendantResponseSpecDataBuilder() {
    return new DefendantResponseSpecDataBuilder(this.requestsFactory, this.testData);
  }

  get claimantResponseSpecDataBuilder() {
    return new ClaimantResponseSpecDataBuilder(this.requestsFactory, this.testData);
  }

  get informAgreedExtensionDateSpecDataBuilder() {
    return new InformAgreedExtensionDateSpecDataBuilder(this.requestsFactory, this.testData);
  }

  get serviceRequestDataBuilder() {
    return new ServiceRequestDataBuilder(this.requestsFactory, this.testData);
  }
}
