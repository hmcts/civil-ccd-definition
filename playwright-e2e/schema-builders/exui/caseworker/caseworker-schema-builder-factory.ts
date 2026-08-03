import BaseSchemaBuilderFactory from '../../../base/base-schema-builder-factory';
import AddCaseNoteSchemaBuilder from './add-case-note/add-case-note-schema-builder';
import AmendPartyDetailsSchemaBuilder from './amend-party-details/amend-party-details-schema-builder';
import ConfirmOrderReviewSchemaBuilder from './confirm-order-review/confirm-order-review-schema-builder';
import EditJudgmentSchemaBuilder from './edit-judgment/edit-judgment-schema-builder';
import ManageContactInformationSchemaBuilder from '../common/manage-contact-information/manage-contact-information-schema-builder';
import MediationUnsuccessfulSchemaBuilder from './mediation-unsuccessful/mediation-unsuccessful-schema-builder';
import RecordJudgmentSchemaBuilder from './record-judgment/record-judgment-schema-builder';
import ReferJudgeDefenceReceivedSchemaBuilder from './refer-judge-defence-received/refer-judge-defence-received-schema-builder';
import SendAndReplySchemaBuilder from '../common/send-and-reply/send-and-reply-schema-builder';
import SetAsideOrderTypeSchemaBuilder from './set-aside-order-type/set-aside-order-type-schema-builder';
import TransferOnlineCaseSchemaBuilder from './transfer-online-case/transfer-online-case-schema-builder';
import CaseProceedsInCasemanSchemaBuilder from './case-proceeds-in-caseman/case-proceeds-in-caseman-schema-builder'
import ValidateDiscontinueClaimClaimantSchemaBuilder from './validate-discontinue-claim-claimant/validate-discontinue-claim-claimant-schema-builder';

export default class CaseworkerSchemaBuilderFactory extends BaseSchemaBuilderFactory {
  get addCaseNoteSchemaBuilder() {
    return new AddCaseNoteSchemaBuilder(this.testData);
  }

  get amendPartyDetailsSchemaBuilder() {
    return new AmendPartyDetailsSchemaBuilder(this.testData);
  }

  get confirmOrderReviewSchemaBuilder() {
    return new ConfirmOrderReviewSchemaBuilder(this.testData);
  }

  get editJudgmentSchemaBuilder() {
    return new EditJudgmentSchemaBuilder(this.testData);
  }

  get manageContactInformationSchemaBuilder() {
    return new ManageContactInformationSchemaBuilder(this.testData);
  }

  get mediationUnsuccessfulSchemaBuilder() {
    return new MediationUnsuccessfulSchemaBuilder(this.testData);
  }

  get recordJudgmentSchemaBuilder() {
    return new RecordJudgmentSchemaBuilder(this.testData);
  }

  get referJudgeDefenceReceivedSchemaBuilder() {
    return new ReferJudgeDefenceReceivedSchemaBuilder(this.testData);
  }

  get transferOnlineCaseSchemaBuilder() {
    return new TransferOnlineCaseSchemaBuilder(this.testData);
  }

  get sendAndReplySchemaBuilder() {
    return new SendAndReplySchemaBuilder(this.testData);
  }

  get caseProceedsInCasemanSchemaBuilder() {
    return new CaseProceedsInCasemanSchemaBuilder(this.testData); 
  }
  
  get setAsideOrderTypeSchemaBuilder() {
    return new SetAsideOrderTypeSchemaBuilder(this.testData);
  }
  
  get validateDiscontinueClaimClaimantSchemaBuilder() {
    return new ValidateDiscontinueClaimClaimantSchemaBuilder(this.testData);
  }
}
