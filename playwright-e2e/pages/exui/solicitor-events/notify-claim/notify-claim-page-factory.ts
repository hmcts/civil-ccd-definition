import BasePageFactory from '../../../../base/base-page-factory';
import NotifyClaimCheckYourAnswersFragment from '../../fragments/notify-claim-check-your-answers/notify-claim-check-your-answers-fragment';
import NotifyClaimFragment from '../../fragments/notify-claim/notify-claim-fragment';
import NotifyClaimDefendant2Page from './notify-claim-unrepresented-defendants/notify-claim-defendant-2-page';
import NotifyClaimCheckYourAnswers1DefendantPage from './notify-claim-check-your-answers/notify-claim-check-your-answers-1-defendant-page';
import NotifyClaimDefendant1Page from './notify-claim-unrepresented-defendants/notify-claim-defendant-1-page';
import NotifyClaimRepresentedDefendantContinuePage from './notify-claim-represented-defendants-continue/notify-claim-represented-defendants-continue-page';
import NotifyClaimRepresentedDefendantSubmitPage from './notify-claim-represented-defendants-submit/notify-claim-represented-defendants-submit-page';

export default class NotifyClaimPageFactory extends BasePageFactory {
  get notifyClaimsPage() {
    const notifyClaimFragment = new NotifyClaimFragment(this.page);
    return new NotifyClaimDefendant1Page(notifyClaimFragment, this.page);
  }

  get notifyClaimsCheckYourAnswersPage() {
    const notifyClaimCheckYourAnswersFragment = new NotifyClaimCheckYourAnswersFragment(this.page);
    return new NotifyClaimCheckYourAnswers1DefendantPage(
      notifyClaimCheckYourAnswersFragment,
      this.page,
    );
  }

  get notifyClaimsDefendant2Page() {
    const notifyClaimFragment = new NotifyClaimFragment(this.page);
    return new NotifyClaimDefendant2Page(notifyClaimFragment, this.page);
  }

  get notifyClaimsRepresentedDefendantContinuePage() {
    return new NotifyClaimRepresentedDefendantContinuePage(this.page);
  }

  get notifyClaimsRepresentedDefendantSubmitPage() {
    return new NotifyClaimRepresentedDefendantSubmitPage(this.page);
  }
}
