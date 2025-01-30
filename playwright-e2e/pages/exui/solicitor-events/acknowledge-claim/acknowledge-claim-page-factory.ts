import BasePageFactory from '../../../../base/base-page-factory';
import partys from '../../../../constants/partys';
import DateFragment from '../../fragments/date/date-fragment';
import SolicitorReferenceFragment from '../../fragments/solicitor-reference/solicitor-reference-fragment';
import ConfirmAcknowledgeClaimPage from './unspec/confirm-acknowledge-claim/confirm-acknowledge-claim-page';
import ConfirmNameAndAddressPage from './unspec/confirm-name-and-address/confirm-name-and-address-page';
import ResponseIntention1v2SSPage from './unspec/response-intention/response-intention-1v2SS-page';
import ResponseIntention2v1Page from './unspec/response-intention/response-intention-2v1-page';
import ResponseIntentionPage from './unspec/response-intention/response-intention-page';
import SolicitorReferencesAcknowledgeClaimPage from './unspec/solicitor-references-acknowledge-claim/solicitor-references-acknowledge-claim-page';
import SubmitAcknowledgeClaimPage from './unspec/submit-acknowledge-claim/submit-acknowledge-claim-page';

export default class AcknowledgeClaimPageFactory extends BasePageFactory {
  get confirmNameAndAddressPage() {
    const dateFragment = new DateFragment(this.page);
    return new ConfirmNameAndAddressPage(this.page, dateFragment);
  }

  get responseIntensionDefendant1Page() {
    return new ResponseIntentionPage(this.page, partys.DEFENDANT_1);
  }

  get responseIntensionDefendant2Page() {
    return new ResponseIntentionPage(this.page, partys.DEFENDANT_2);
  }

  get responseIntention2v1Page() {
    return new ResponseIntention2v1Page(this.page);
  }

  get responseIntention1v2SSPage() {
    return new ResponseIntention1v2SSPage(this.page);
  }

  get solicitorReferencesAcknowledgeClaimDefendant1Page() {
    const solicitorReferenceFragment = new SolicitorReferenceFragment(
      this.page,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
    );
    return new SolicitorReferencesAcknowledgeClaimPage(
      this.page,
      solicitorReferenceFragment,
      partys.DEFENDANT_1,
    );
  }

  get solicitorReferencesAcknowledgeClaimDefendant2Page() {
    const solicitorReferenceFragment = new SolicitorReferenceFragment(
      this.page,
      partys.DEFENDANT_2,
      partys.DEFENDANT_SOLICITOR_2,
    );
    return new SolicitorReferencesAcknowledgeClaimPage(
      this.page,
      solicitorReferenceFragment,
      partys.DEFENDANT_2,
    );
  }

  get submitAcknowledgeClaimPage() {
    return new SubmitAcknowledgeClaimPage(this.page);
  }

  get confirmAcknowledgeClaimPage() {
    return new ConfirmAcknowledgeClaimPage(this.page);
  }
}
