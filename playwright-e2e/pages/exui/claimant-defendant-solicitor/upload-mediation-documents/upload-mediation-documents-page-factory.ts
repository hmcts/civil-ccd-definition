import BasePageFactory from '../../../../base/base-page-factory';
import DateFragment from '../../fragments/date/date-fragment';
import WhoIsDocumentForPage from './who-is-document-for/who-is-document-for-page';
import DocumentTypePage from './document-type/document-type-page';
import DocumentUploadPage from './document-upload/document-upload-page';
import ExplanationPage from './explanation/explanation-page';
import SubmitUploadMediationDocumentsPage from './submit-upload-mediation-documents/submit-upload-mediation-documents-page';
import ConfirmUploadMediationDocumentsPage from './confirm-upload-mediation-documents/confirm-upload-mediation-documents-page';

export default class UploadMediationDocumentsPageFactory extends BasePageFactory {
  get explanationPage() {
    return new ExplanationPage(this.page);
  }

  get whoIsDocumentForPage() {
    return new WhoIsDocumentForPage(this.page);
  }

  get documentTypePage() {
    return new DocumentTypePage(this.page);
  }

  get documentUploadPage() {
    return new DocumentUploadPage(this.page, new DateFragment(this.page));
  }

  get submitUploadMediationDocumentsPage() {
    return new SubmitUploadMediationDocumentsPage(this.page);
  }

  get confirmUploadMediationDocumentsPage() {
    return new ConfirmUploadMediationDocumentsPage(this.page);
  }
}
