import BasePageFactory from '../../../base/base-page-factory';
import ManageDocumentAddDocumentsPage from './manage-documents/manage-documents-add-documents/manage-document-add-documents-page';
import ManageDocumentSubmitPage from './manage-documents/manage-documents-submit/manage-documents-submit-page';

export default class JudgeEventsPageFactory extends BasePageFactory {
  get manageDocumentAddDocumentsPage() {
    return new ManageDocumentAddDocumentsPage(this.page);
  }

  get manageDocumentSubmitPage() {
    return new ManageDocumentSubmitPage(this.page);
  }
}
