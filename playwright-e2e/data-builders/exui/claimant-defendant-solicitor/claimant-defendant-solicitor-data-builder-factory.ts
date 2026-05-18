import BaseDataBuilderFactory from '../../../base/base-data-builder-factory';
import AcknowledgeClaimDataBuilder from './acknowledge-claim/unspec/acknowledge-claim-data-builder';
import AddOrAmendClaimDocumentsDataBuilder from './add-or-amend-claim-documents/unspec/add-or-amend-claim-documents-data-builder';
import ClaimantResponseSpecDataBuilder from './claimant-response/lr-spec/claimant-response-spec-data-builder';
import DefendantResponseSpecDataBuilder from './defendant-response/lr-spec/defendant-response-spec-data-builder';
import CreateClaimSpecDataBuilder from './create-claim/lr-spec/create-claim-spec-data-builder';
import CreateClaimDataBuilder from './create-claim/unspec/create-claim-data-builder';
import InformAgreedExtensionDateSpecDataBuilder from './inform-agreed-extension-date/lr-spec/inform-agreed-extension-date-spec-data-builder';
import NotifyClaimDataBuilder from './notify-claim/unspec/notify-claim-data-builder';
import NotifyClaimDetailsDataBuilder from './notify-claim-details/unspec/notify-claim-details-data-builder';
import ServiceRequestDataBuilder from './service-request/service-request-data-builder';

export default class ClaimantDefendantSolicitorDataBuilderFactory extends BaseDataBuilderFactory {
  get acknowledgeClaimDataBuilder() {
    return new AcknowledgeClaimDataBuilder(this.requestsFactory, this.testData);
  }

  get addOrAmendClaimDocumentsDataBuilder() {
    return new AddOrAmendClaimDocumentsDataBuilder(this.requestsFactory, this.testData);
  }

  get createClaimDataBuilder() {
    return new CreateClaimDataBuilder(this.requestsFactory, this.testData);
  }

  get createClaimSpecDataBuilder() {
    return new CreateClaimSpecDataBuilder(this.requestsFactory, this.testData);
  }

  get notifyClaimDataBuilder() {
    return new NotifyClaimDataBuilder(this.requestsFactory, this.testData);
  }

  get notifyClaimDetailsDataBuilder() {
    return new NotifyClaimDetailsDataBuilder(this.requestsFactory, this.testData);
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
