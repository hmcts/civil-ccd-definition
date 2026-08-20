import BaseDataBuilderFactory from '../../../base/base-data-builder-factory';
import AddCaseNoteDataBuilder from './add-case-note/add-case-note-data-builder';
import AmendPartyDetailsDataBuilder from './amend-party-details/amend-party-details-data-builder';
import ConfirmOrderReviewDataBuilder from './confirm-order-review/confirm-order-review-data-builder';
import EditJudgmentDataBuilder from './edit-judgment/edit-judgment-data-builder';
import ManageContactInformationDataBuilder from '../common/manage-contact-information/manage-contact-information-data-builder';
import MediationUnsuccessfulDataBuilder from './mediation-unsuccessful/mediation-unsuccessful-data-builder';
import RecordJudgmentDataBuilder from './record-judgment/record-judgment-data-builder';
import ReferJudgeDefenceReceivedDataBuilder from './refer-judge-defence-received/refer-judge-defence-received-data-builder';
import QueryManagementRaiseDataBuilder from '../common/query-management-raise/query-management-raise-data-builder';
import QueryManagementRespondDataBuilder from '../common/query-management-respond/query-management-respond-data-builder';
import SendAndReplyDataBuilder from '../common/send-and-reply/send-and-reply-data-builder';
import SetAsideOrderTypeDataBuilder from './set-aside-order-type/set-aside-order-type-data-builder';
import TransferOnlineCaseDataBuilder from './transfer-online-case/transfer-online-case-data-builder';
import CaseProceedsInCasemanDataBuilder from './case-proceeds-in-caseman/case-proceeds-in-caseman-data-builder'
import ValidateDiscontinueClaimClaimantDataBuilder from './validate-discontinue-claim-claimant/validate-discontinue-claim-claimant-data-builder';

export default class CaseworkerDataBuilderFactory extends BaseDataBuilderFactory {
  get addCaseNoteDataBuilder() {
    return new AddCaseNoteDataBuilder(this.requestsFactory, this.testData);
  }

  get amendPartyDetailsDataBuilder() {
    return new AmendPartyDetailsDataBuilder(this.requestsFactory, this.testData);
  }

  get confirmOrderReviewDataBuilder() {
    return new ConfirmOrderReviewDataBuilder(this.requestsFactory, this.testData);
  }

  get editJudgmentDataBuilder() {
    return new EditJudgmentDataBuilder(this.requestsFactory, this.testData);
  }

  get manageContactInformationDataBuilder() {
    return new ManageContactInformationDataBuilder(this.requestsFactory, this.testData);
  }

  get mediationUnsuccessfulDataBuilder() {
    return new MediationUnsuccessfulDataBuilder(this.requestsFactory, this.testData);
  }

  get recordJudgmentDataBuilder() {
    return new RecordJudgmentDataBuilder(this.requestsFactory, this.testData);
  }

  get referJudgeDefenceReceivedDataBuilder() {
    return new ReferJudgeDefenceReceivedDataBuilder(this.requestsFactory, this.testData);
  }

  get transferOnlineCaseDataBuilder() {
    return new TransferOnlineCaseDataBuilder(this.requestsFactory, this.testData);
  }

  get sendAndReplyDataBuilder() {
    return new SendAndReplyDataBuilder(this.requestsFactory, this.testData);
  }

  get queryManagementRaiseDataBuilder() {
    return new QueryManagementRaiseDataBuilder(this.requestsFactory, this.testData);
  }

  get queryManagementRespondDataBuilder() {
    return new QueryManagementRespondDataBuilder(this.requestsFactory, this.testData);
  }

  get caseProceedsInCasemanDataBuilder() {
    return new CaseProceedsInCasemanDataBuilder(this.requestsFactory, this.testData);
  }
  
  get setAsideOrderTypeDataBuilder() {
    return new SetAsideOrderTypeDataBuilder(this.requestsFactory, this.testData); 
  }
  
  get validateDiscontinueClaimClaimantDataBuilder() {
    return new ValidateDiscontinueClaimClaimantDataBuilder(this.requestsFactory, this.testData);
  }
}
