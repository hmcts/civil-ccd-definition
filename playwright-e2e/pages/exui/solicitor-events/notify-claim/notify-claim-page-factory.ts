import BasePageFactory from '../../../../base/base-page-factory';
import NotifyClaimFragment from '../../fragments/notify-claim/notify-claim-fragment';
import NotifyClaimCheckYourAnswersPage from './notify-claim-check-your-answers/notify-claim-check-your-answers-page';
import NotifyClaimDefendant1Page from './notify-claim-defendant-1/notify-claim-defendant-1-page';

export default class NotifyClaimPageFactory extends BasePageFactory {
  get notifyClaimsPage() {
    const notifyClaimFragment = new NotifyClaimFragment(this.page);
    return new NotifyClaimDefendant1Page(notifyClaimFragment, this.page);
  }
  get notifyClaimsCheckYourAnswersPage() {
    return new NotifyClaimCheckYourAnswersPage(this.page);
  }
}
