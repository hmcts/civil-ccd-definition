import BasePageFactory from '../../../../base/base-page-factory';
import NotifyClaimCheckYourAnswersFragment from '../../fragments/notify-claim-check-your-answers/notify-claim-check-your-answers-fragment';
import NotifyClaimFragment from '../../fragments/notify-claim/notify-claim-fragment';
import NotifyClaimDefendant2Page from './notify-claim-lip-defendant/notify-claim-defendant-2-page';
import NotifyClaimCheckYourAnswersPage from './notify-claim-check-your-answers/notify-claim-check-your-answers-1-defendant-page';
import NotifyClaimDefendant1Page from './notify-claim-lip-defendant/notify-claim-defendant-1-page';

export default class NotifyClaimPageFactory extends BasePageFactory {
  get notifyClaimsPage() {
    const notifyClaimFragment = new NotifyClaimFragment(this.page);
    return new NotifyClaimDefendant1Page(notifyClaimFragment, this.page);
  }

  get notifyClaimsCheckYourAnswersPage() {
    const notifyClaimCheckYourAnswersFragment = new NotifyClaimCheckYourAnswersFragment(this.page);
    return new NotifyClaimCheckYourAnswersPage(notifyClaimCheckYourAnswersFragment, this.page);
  }

  get notifyClaimsDefendant2Page() {
    const notifyClaimFragment = new NotifyClaimFragment(this.page);
    return new NotifyClaimDefendant2Page(notifyClaimFragment, this.page);
  }
}
