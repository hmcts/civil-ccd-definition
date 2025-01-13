import BasePageFactory from '../../../../base/base-page-factory';
import partys from '../../../../constants/partys';
import CertificateOfServiceSubmitFragment from '../../fragments/certificate-of-service-submit/certificate-of-service-submit-fragment';
import CertificateOfServiceFragment from '../../fragments/certificate-of-service/certificate-of-service-fragment';
import AccessGrantedWarningPage from './access-granted-warning/access-granted-warning-page';
import DefendantSolicitorToNotifyPage from './defendant-solicitor-to-notify/defendant-solicitor-to-notify-page';
import NotifyClaimConfirmPage from './notify-claim-confirm/notify-claim-confirm-page';
import NotifyClaimCOSConfirmPage from './notify-claim-cos-confirm/notify-claim-cos-confirm-page';
import NotifyClaimCOSDefendant1Page from './notify-claim-cos-defendant-1/notify-claim-cos-defendant-1-page';
import NotifyClaimCOSDefendant2Page from './notify-claim-cos-defendant-2/notify-claim-cos-defendant-2-page';
import NotifyClaimCOSSubmitPage from './notify-claim-cos-submit/notify-claim-cos-submit-page';
import NotifyClaimSubmitPage from './notify-claim-submit/notify-claim-submit-page';

export default class NotifyClaimPageFactory extends BasePageFactory {
  get defendantSolicitorToNotify() {
    return new DefendantSolicitorToNotifyPage(this.page);
  }

  get accessGrantedWarningPage() {
    return new AccessGrantedWarningPage(this.page);
  }

  get notifyClaimSubmitPage() {
    return new NotifyClaimSubmitPage(this.page);
  }

  get notifyClaimConfirmPage() {
    return new NotifyClaimConfirmPage(this.page);
  }

  get notifyClaimCOSDefendant1Page() {
    const certificateOfServiceFragment = new CertificateOfServiceFragment(
      this.page,
      partys.DEFENDANT_1,
    );
    return new NotifyClaimCOSDefendant1Page(certificateOfServiceFragment, this.page);
  }

  get notifyClaimCOSDefendant2Page() {
    const certificateOfServiceFragment = new CertificateOfServiceFragment(
      this.page,
      partys.DEFENDANT_2,
    );
    return new NotifyClaimCOSDefendant2Page(certificateOfServiceFragment, this.page);
  }

  get notifyClaimCOSSubmitPage() {
    const certificateOfServiceSubmitFragment = new CertificateOfServiceSubmitFragment(this.page);
    return new NotifyClaimCOSSubmitPage(certificateOfServiceSubmitFragment, this.page);
  }

  get notifyClaimCOSConfirmPage() {
    return new NotifyClaimCOSConfirmPage(this.page);
  }
}
