import BasePageFactory from '../../../../base/base-page-factory';
import CertificateOfServiceSubmitFragment from '../../fragments/certificate-of-service-submit/certificate-of-service-submit-fragment';
import CertificateOfServiceFragment from '../../fragments/certificate-of-service/certificate-of-service-fragment';
import NotifyClaimDetailsConfirmPage from './notify-claim-details-confirm/notify-claim-details-confirm-page';
import NotifyClaimDetailsCOSConfirmPage from './notify-claim-details-cos-confirm/notify-claim-details-cos-confirm-page';
import NotifyClaimDetailsCOSDefendant1Page from './notify-claim-details-cos-defendant-1/notify-claim-details-cos-defendant-1-page';
import NotifyClaimDetailsCOSDefendant2Page from './notify-claim-details-cos-defendant-2/notify-claim-details-cos-defendant-2-page';
import NotifyClaimDetailsCOSSubmitPage from './notify-claim-details-cos-submit/notify-claim-details-cos-submit-page';
import NotifyClaimDetailsSubmitPage from './notify-claim-details-submit/notify-claim-details-submit-page';
import SelectDefendantSolicitorPage from './select-defendant-solicitor/select-defendant-solicitor-page';
import UploadDocumentsPage from './upload-documents/upload-documents-page';

export default class NotifyClaimDetailsPageFactory extends BasePageFactory {
  get selectDefendantSolicitorPage() {
    return new SelectDefendantSolicitorPage(this.page);
  }

  get uploadDocumentsPage() {
    return new UploadDocumentsPage(this.page);
  }

  get notifyClaimDetailsSubmitPage() {
    return new NotifyClaimDetailsSubmitPage(this.page);
  }

  get notifyClaimDetailsConfirmPage() {
    return new NotifyClaimDetailsConfirmPage(this.page);
  }

  get notifyClaimDetailsCOSDefendant1Page() {
    const certificateOfServiceFragment = new CertificateOfServiceFragment(this.page);
    return new NotifyClaimDetailsCOSDefendant1Page(certificateOfServiceFragment, this.page);
  }

  get notifyClaimDetailsCOSDefendant2Page() {
    const certificateOfServiceFragment = new CertificateOfServiceFragment(this.page);
    return new NotifyClaimDetailsCOSDefendant2Page(certificateOfServiceFragment, this.page);
  }

  get notifyClaimDetailsCOSSubmitPage() {
    const certificateOfServiceSubmitFragment = new CertificateOfServiceSubmitFragment(this.page);
    return new NotifyClaimDetailsCOSSubmitPage(certificateOfServiceSubmitFragment, this.page);
  }

  get notifyClaimDetailsCOSConfirmPage() {
    return new NotifyClaimDetailsCOSConfirmPage(this.page);
  }
}
