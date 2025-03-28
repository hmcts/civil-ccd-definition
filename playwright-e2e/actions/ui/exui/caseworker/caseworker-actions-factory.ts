import BasePageActionsFactory from '../../../../base/base-page-actions-factory';
import ManageDocumentsActions from "./manage-documents-actions.ts";
import ManageDocumentsPageFactory
  from "../../../../pages/exui/caseworker/manage-documents/manage-documents-page-factory.ts";

export default class CaseworkerActionsFactory extends BasePageActionsFactory {
  get manageDocumentsActions () {
    return new ManageDocumentsActions(new ManageDocumentsPageFactory(this.page), this.testData);
  }
}
