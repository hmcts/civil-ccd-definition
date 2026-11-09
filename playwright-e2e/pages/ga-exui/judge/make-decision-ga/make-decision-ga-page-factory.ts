import BasePageFactory from '../../../../base/base-page-factory';
import JudicialDecisionPage from './judicial-decision/judicial-decision-page';
import JudicialHearingDetailsScreenPage from './judicial-hearing-details-screen/judicial-hearing-details-screen-page';
import JudicialHearingDetailsGeneralOrderScreenPage from './judicial-hearing-details-general-order-screen/judicial-hearing-details-general-order-screen-page';
import JudicialHearingDocPreviewPage from './judicial-hearing-doc-preview/judicial-hearing-doc-preview-page';
import JudicialHearingSubmitPage from './judicial-hearing-submit/judicial-hearing-submit-page';
import JudicialHearingConfirmPage from './judicial-hearing-confirm/judicial-hearing-confirm-page';
export default class MakeDecisionGaPageFactory extends BasePageFactory {
  get judicialDecisionPage() {
    return new JudicialDecisionPage(this.page);
  }

  get judicialHearingDetailsScreenPage() {
    return new JudicialHearingDetailsScreenPage(this.page);
  }

  get judicialHearingDetailsGeneralOrderScreenPage() {
    return new JudicialHearingDetailsGeneralOrderScreenPage(this.page);
  }

  get judicialHearingDocPreviewPage() {
    return new JudicialHearingDocPreviewPage(this.page);
  }

  get judicialHearingSubmitPage() {
    return new JudicialHearingSubmitPage(this.page);
  }

  get judicialHearingConfirmPage() {
    return new JudicialHearingConfirmPage(this.page);
  }

}
