import BasePageFactory from '../../../../base/base-page-factory.ts';
import EvidenceUploadPage from './evidence-upload/evidence-upload-page.ts';
import DocumentSelectionSmallClaimPage from './document-selection-small-claim/document-selection-small-claim-page.ts';
import DocumentUploadPage from './document-upload/document-upload-page.ts';
import EvidenceUploadSubmitPage from './evidence-upload-applicant-submit/evidence-upload-applicant-submit-page.ts';
import EvidenceUploadConfirmPage from './evidence-upload-applicant-confirm/evidence-upload-applicant-confirm-page.ts';

export default class EvidenceUploadPageFactory extends BasePageFactory {
  get evidenceUploadPage() {
    return new EvidenceUploadPage(this.page);
  }
  get documentSelectionSmallClaimPage() {
    return new DocumentSelectionSmallClaimPage(this.page);
  }
  get documentUploadPage() {
    return new DocumentUploadPage(this.page);
  }
  get evidenceUploadSubmitPage() {
    return new EvidenceUploadSubmitPage(this.page);
  }
  get evidenceUploadConfirmPage() {
    return new EvidenceUploadConfirmPage(this.page);
  }
}
