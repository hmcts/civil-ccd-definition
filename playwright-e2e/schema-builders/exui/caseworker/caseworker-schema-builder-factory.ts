import BaseSchemaBuilderFactory from '../../../base/base-schema-builder-factory';
import AddCaseNoteSchemaBuilder from './add-case-note/add-case-note-schema-builder';
import AmendPartyDetailsSchemaBuilder from './amend-party-details/amend-party-details-schema-builder';
import ManageContactInformationSchemaBuilder from '../common/manage-contact-information/manage-contact-information-schema-builder';
import MediationUnsuccessfulSchemaBuilder from './mediation-unsuccessful/mediation-unsuccessful-schema-builder';
import SendAndReplySchemaBuilder from '../common/send-and-reply/send-and-reply-schema-builder';
import TransferOnlineCaseSchemaBuilder from './transfer-online-case/transfer-online-case-schema-builder';
import CaseProceedsInCasemanSchemaBuilder from './case-proceeds-in-caseman/case-proceeds-in-caseman-schema-builder'

export default class CaseworkerSchemaBuilderFactory extends BaseSchemaBuilderFactory {
  get addCaseNoteSchemaBuilder() {
    return new AddCaseNoteSchemaBuilder(this.testData);
  }

  get amendPartyDetailsSchemaBuilder() {
    return new AmendPartyDetailsSchemaBuilder(this.testData);
  }

  get manageContactInformationSchemaBuilder() {
    return new ManageContactInformationSchemaBuilder(this.testData);
  }

  get mediationUnsuccessfulSchemaBuilder() {
    return new MediationUnsuccessfulSchemaBuilder(this.testData);
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
}
