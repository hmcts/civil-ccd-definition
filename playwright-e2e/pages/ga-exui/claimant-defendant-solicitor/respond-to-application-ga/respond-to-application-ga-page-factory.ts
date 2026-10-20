import BasePageFactory from '../../../../base/base-page-factory';
import RespScreenPage from './resp-screen/resp-screen-page';
import RespHearingScreenPage from './resp-hearing-screen/resp-hearing-screen-page';
import RespondToApplicationSubmitPage from './respond-to-application-submit/respond-to-application-submit-page';
import RespondToApplicationConfirmPage from './respond-to-application-confirm/respond-to-application-confirm-page';

export default class RespondToApplicationGaPageFactory extends BasePageFactory {
  get respScreenPage() {
    return new RespScreenPage(this.page);
  }

  get respHearingScreenPage() {
    return new RespHearingScreenPage(this.page);
  }

  get submitPage() {
    return new RespondToApplicationSubmitPage(this.page);
  }

  get confirmPage() {
    return new RespondToApplicationConfirmPage(this.page);
  }
}
