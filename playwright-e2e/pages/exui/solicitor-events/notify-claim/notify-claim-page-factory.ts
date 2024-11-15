import BasePageFactory from '../../../../base/base-page-factory';
import NotifyClaimCheckYourAnswersFragment from '../../fragments/notify-claim-check-your-answers/notify-claim-check-your-answers-fragment';
import NotifyClaimFragment from '../../fragments/notify-claim/notify-claim-fragment';
import NotifyClaimUnrepresentedDefendant2Page from './notify-claim-unrepresented-defendants/notify-claim-unrepresented-defendant-2-page';
import NotifyClaimCheckYourAnswers1UnrepresentedDefendantPage from './notify-claim-check-your-answers-unrepesented-defendants/notify-claim-check-your-answers-1-unrepresented-defendant-page';
import NotifyClaimUnrepresentedDefendant1Page from './notify-claim-unrepresented-defendants/notify-claim-unrepresented-defendant-1-page';
import NotifyClaimRepresentedDefendantContinuePage from './notify-claim-continue-represented-defendants/notify-claim-continue-represented-defendants-page';
import NotifyClaimRepresentedDefendantSubmitPage from './notify-claim-submit-represented-defendants/notify-claim-submit-represented-defendants-page';

export default class NotifyClaimPageFactory extends BasePageFactory {
  get notifyClaimsPage() {
    const notifyClaimFragment = new NotifyClaimFragment(this.page);
    return new NotifyClaimUnrepresentedDefendant1Page(notifyClaimFragment, this.page);
  }

  get notifyClaimsCheckYourAnswersPage() {
    const notifyClaimCheckYourAnswersFragment = new NotifyClaimCheckYourAnswersFragment(this.page);
    return new NotifyClaimCheckYourAnswers1UnrepresentedDefendantPage(
      notifyClaimCheckYourAnswersFragment,
      this.page,
    );
  }

  get notifyClaimsDefendant2Page() {
    const notifyClaimFragment = new NotifyClaimFragment(this.page);
    return new NotifyClaimUnrepresentedDefendant2Page(notifyClaimFragment, this.page);
  }

  get notifyClaimsRepresentedDefendantContinuePage() {
    return new NotifyClaimRepresentedDefendantContinuePage(this.page);
  }

  get notifyClaimsRepresentedDefendantSubmitPage() {
    return new NotifyClaimRepresentedDefendantSubmitPage(this.page);
  }
}
