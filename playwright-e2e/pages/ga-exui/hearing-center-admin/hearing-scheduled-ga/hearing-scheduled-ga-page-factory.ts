import BasePageFactory from '../../../../base/base-page-factory';
import HearingNoticeGaDetailPage from './hearing-notice-ga-detail/hearing-notice-ga-detail-page';
import HearingScheduledGaConfirmPage from './hearing-scheduled-ga-confirm/hearing-scheduled-ga-confirm-page';
import HearingScheduledGaSubmitPage from './hearing-scheduled-ga-submit/hearing-scheduled-ga-submit-page';
import HearingScheduledGaHearingDetailsPage from './hearing-scheduled-ga-hearing-details/hearing-scheduled-ga-hearing-details-page';
import HearingScheduledGaHearingInformationPage from './hearing-scheduled-ga-hearing-information/hearing-scheduled-ga-hearing-information-page';

export default class HearingScheduledGaPageFactory extends BasePageFactory {
  get hearingNoticeGaDetailPage() {
    return new HearingNoticeGaDetailPage(this.page);
  }

  get hearingScheduledGaHearingDetailsPage() {
    return new HearingScheduledGaHearingDetailsPage(this.page);
  }

  get hearingScheduledGaHearingInformationPage() {
    return new HearingScheduledGaHearingInformationPage(this.page);
  }

  get hearingScheduledGaSubmitPage() {
    return new HearingScheduledGaSubmitPage(this.page);
  }

  get hearingScheduledGaConfirmPage() {
    return new HearingScheduledGaConfirmPage(this.page);
  }
}
