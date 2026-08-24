import BasePageFactory from '../../../../base/base-page-factory';
import MakeDecisionHearingDetailsPage from './make-decision-hearing-details-page';
import MakeDecisionHearingInformationPage from './make-decision-hearing-information-page';
import HearingNoticeGaDetailPage from './hearing-notice-ga-detail-page';
import HearingScheduledGaConfirmPage from './hearing-scheduled-ga-confirm-page';
import HearingScheduledGaSubmitPage from './hearing-scheduled-ga-submit-page';

export default class HearingScheduledGaPageFactory extends BasePageFactory {
  get hearingNoticeGaDetailPage() {
    return new HearingNoticeGaDetailPage(this.page);
  }

  get hearingDetailsPage() {
    return new MakeDecisionHearingDetailsPage(this.page);
  }

  get hearingInformationPage() {
    return new MakeDecisionHearingInformationPage(this.page);
  }

  get submitPage() {
    return new HearingScheduledGaSubmitPage(this.page);
  }

  get confirmPage() {
    return new HearingScheduledGaConfirmPage(this.page);
  }
}
