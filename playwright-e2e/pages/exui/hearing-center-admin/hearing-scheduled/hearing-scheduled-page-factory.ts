import BasePageFactory from '../../../../base/base-page-factory.ts';
import HearingNoticeSelectPage from './hearing-notice-select/hearing-notice-select-page.ts';
import ListingOrRelistingPage from './listing-or-relisting/listing-or-relisting-page.ts';
import HearingScheduledHearingDetailsPage from './hearing-scheduled-hearing-details/hearing-scheduled-hearing-details-page.ts';
import HearingScheduledHearingInformationPage from './hearing-scheduled-hearing-information/hearing-scheduled-hearing-information-page.ts';
import HearingScheduledSubmitPage from './hearing-scheduled-submit/hearing-scheduled-submit-page.ts';
import HearingScheduledConfirmPage from './hearing-scheduled-confirm/hearing-scheduled-confirm-page.ts';
import DateFragment from '../../fragments/date/date-fragment.ts';

export default class HearingScheduledPageFactory extends BasePageFactory {
  get hearingNoticeSelectPage() {
    return new HearingNoticeSelectPage(this.page);
  }
  get listingOrRelistingPage() {
    return new ListingOrRelistingPage(this.page);
  }
  get hearingScheduledHearingDetailsPage() {
    const dateFragment = new DateFragment(this.page);
    return new HearingScheduledHearingDetailsPage(this.page, dateFragment);
  }
  get hearingScheduledHearingInformationPage() {
    return new HearingScheduledHearingInformationPage(this.page);
  }
  get hearingScheduledSubmitPage() {
    return new HearingScheduledSubmitPage(this.page);
  }
  get hearingScheduledConfirmPage() {
    return new HearingScheduledConfirmPage(this.page);
  }
}
