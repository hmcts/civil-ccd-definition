import BaseDataBuilderFactory from '../../../base/base-data-builder-factory';
import AddCaseNoteDataBuilder from './add-case-note/add-case-note-data-builder';
import AmendPartyDetailsDataBuilder from './amend-party-details/amend-party-details-data-builder';
import ManageContactInformationDataBuilder from '../common/manage-contact-information/manage-contact-information-data-builder';
import MediationUnsuccessfulDataBuilder from './mediation-unsuccessful/mediation-unsuccessful-data-builder';
import SendAndReplyDataBuilder from '../common/send-and-reply/send-and-reply-data-builder';
import TransferOnlineCaseDataBuilder from './transfer-online-case/transfer-online-case-data-builder';
import ValidateDiscontinueClaimClaimantDataBuilder from './validate-discontinue-claim-claimant/validate-discontinue-claim-claimant-data-builder';

export default class CaseworkerDataBuilderFactory extends BaseDataBuilderFactory {
  get addCaseNoteDataBuilder() {
    return new AddCaseNoteDataBuilder(this.requestsFactory, this.testData);
  }

  get amendPartyDetailsDataBuilder() {
    return new AmendPartyDetailsDataBuilder(this.requestsFactory, this.testData);
  }

  get manageContactInformationDataBuilder() {
    return new ManageContactInformationDataBuilder(this.requestsFactory, this.testData);
  }

  get mediationUnsuccessfulDataBuilder() {
    return new MediationUnsuccessfulDataBuilder(this.requestsFactory, this.testData);
  }

  get transferOnlineCaseDataBuilder() {
    return new TransferOnlineCaseDataBuilder(this.requestsFactory, this.testData);
  }

  get sendAndReplyDataBuilder() {
    return new SendAndReplyDataBuilder(this.requestsFactory, this.testData);
  }

  get validateDiscontinueClaimClaimantDataBuilder() {
    return new ValidateDiscontinueClaimClaimantDataBuilder(this.requestsFactory, this.testData);
  }
}
