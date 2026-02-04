import BasePageActionsFactory from '../../../../base/base-page-actions-factory';
import CaseProceedsInCasemanPageFactory from '../../../../pages/exui/caseworker/case-proceeds-in-caseman/case-proceeds-in-caseman-page-factory.ts';
import CaseProceedsInCasemanActions from './case-proceeds-in-caseman-actions.ts';
import ManageDocumentsActions from './manage-documents-actions.ts';
import ManageDocumentsPageFactory from '../../../../pages/exui/caseworker/manage-documents/manage-documents-page-factory.ts';
import ManageContactInformationActions from './manage-contact-information-actions.ts';
import ManageContactInformationPageFactory from '../../../../pages/exui/caseworker/manage-contact-information/manage-contact-information-page-factory.ts';

export default class CaseworkerActionsFactory extends BasePageActionsFactory {

  get caseProceedsInCasemanActions() {
    return new CaseProceedsInCasemanActions(
      new CaseProceedsInCasemanPageFactory(this.page),
      this.testData,
    );
  }

  get manageDocumentsActions() {
    return new ManageDocumentsActions(
      new ManageDocumentsPageFactory(this.page),
      this.testData);
  }

  get manageContactInformationActions() {
    return new ManageContactInformationActions(
      new ManageContactInformationPageFactory(this.page),
      this.testData);
  }

}
