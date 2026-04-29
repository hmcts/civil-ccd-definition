import BaseDataBuilderFactory from '../../../base/base-data-builder-factory';
import CreateClaimSpecDataBuilder from './create-claim/lr-spec/create-claim-spec-data-builder';
import CreateClaimDataBuilder from './create-claim/unspec/create-claim-data-builder';
import ServiceRequestDataBuilder from './service-request/service-request-data-builder';

export default class ClaimantDefendantSolicitorDataBuilderFactory extends BaseDataBuilderFactory {
  get createClaimDataBuilder() {
    return new CreateClaimDataBuilder(this.requestsFactory);
  }

  get createClaimSpecDataBuilder() {
    return new CreateClaimSpecDataBuilder(this.requestsFactory);
  }

  get serviceRequestDataBuilder() {
    return new ServiceRequestDataBuilder(this.requestsFactory);
  }
}
