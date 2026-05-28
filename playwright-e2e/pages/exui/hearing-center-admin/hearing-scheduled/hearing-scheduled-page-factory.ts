import BasePageFactory from '../../../../base/base-page-factory.ts';
import HearingNoticeSelectPage from './hearing-notice-select/hearing-notice-select-page.ts';
import ListingOrRelistingPage from './listing-or-relisting/listing-or-relisting-page.ts';
import HearingDetailsPage from './hearing-details/hearing-details-page.ts';
import HearingInformationPage from './hearing-information/hearing-information-page.ts';
import HearingScheduledSubmitPage from './hearing-scheduled-submit/hearing-scheduled-submit-page.ts';
import HearingScheduledConfirmPage from './hearing-scheduled-confirm/hearing-scheduled-confirm-page.ts';

export default class HearingScheduledPageFactory extends BasePageFactory {
  get hearingNoticeSelectPage() {
    return new HearingNoticeSelectPage(this.page);
  }
  get listingOrRelistingPage() {
    return new ListingOrRelistingPage(this.page);
  }
  get hearingDetailsPage() {
    return new HearingDetailsPage(this.page);
  }
  get hearingInformationPage() {
    return new HearingInformationPage(this.page);
  }
  get hearingScheduledSubmitPage() {
    return new HearingScheduledSubmitPage(this.page);
  }
  get hearingScheduledConfirmPage() {
    return new HearingScheduledConfirmPage(this.page);
  }
}
