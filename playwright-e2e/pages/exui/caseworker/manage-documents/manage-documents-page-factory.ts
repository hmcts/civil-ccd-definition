import BasePageFactory from '../../../../base/base-page-factory';
import ManageDocumentAddDocumentsPage from "../manage-documents/manage-documents-add-documents/manage-document-add-documents-page.ts";
import ManageDocumentSubmitPage from "../manage-documents/manage-documents-submit/manage-documents-submit-page.ts";

export default class ManageDocumentsPageFactory extends BasePageFactory {
  get manageDocumentsAddDocumentsPage() {
    return new ManageDocumentAddDocumentsPage(this.page);
  }

  get manageDocumentsSubmitPage() {
    return new ManageDocumentSubmitPage(this.page);
  }
}
