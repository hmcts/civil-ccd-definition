import BasePageFactory from '../../../../base/base-page-factory';
import NotifyClaimCheckYourAnswersFragment from '../../fragments/notify-claim-check-your-answers/notify-claim-check-your-answers-fragment';
import NotifyClaimFragment from '../../fragments/notify-claim/notify-claim-fragment';
import NotifyClaimUnrepresentedDefendant2Page from './notify-claim-unrepresented-defendants/notify-claim-unrepresented-defendant-2-page';
import NotifyClaimCheckYourAnswers1UnrepresentedDefendantPage from './notify-claim-check-your-answers-unrepresented-defendants/notify-claim-check-your-answers-1-unrepresented-defendant-page';
import NotifyClaimUnrepresentedDefendant1Page from './notify-claim-unrepresented-defendants/notify-claim-unrepresented-defendant-1-page';
import NotifyClaimRepresentedDefendantContinuePage from './notify-claim-continue-represented-defendants/notify-claim-continue-represented-defendants-page';
import NotifyClaimRepresentedDefendantSubmitPage from './notify-claim-submit-represented-defendants/notify-claim-submit-represented-defendants-page';
import NotifyClaimCheckYourAnswers2UnrepresentedDefendantsPage from './notify-claim-check-your-answers-unrepresented-defendants/notify-claim-check-your-answers-2-unrepresented-defendants-page';

export default class NotifyClaimPageFactory extends BasePageFactory {
  get notifyClaimsUnrepresentedDefendantPage1() {
    const notifyClaimFragment = new NotifyClaimFragment(this.page);
    return new NotifyClaimUnrepresentedDefendant1Page(notifyClaimFragment, this.page);
  }

  get notifyClaimsUnrepresentedDefendantPage2() {
    const notifyClaimFragment = new NotifyClaimFragment(this.page);
    return new NotifyClaimUnrepresentedDefendant2Page(notifyClaimFragment, this.page);
  }

  get notifyClaimsCheckYourAnswers1UnrepresentedDefendantPage() {
    const notifyClaimCheckYourAnswersFragment = new NotifyClaimCheckYourAnswersFragment(this.page);
    return new NotifyClaimCheckYourAnswers1UnrepresentedDefendantPage(
      notifyClaimCheckYourAnswersFragment,
      this.page,
    );
  }

  get notifyClaimsCheckYourAnswers2UnrepresentedDefendantsPage() {
    const notifyClaimCheckYourAnswersFragment = new NotifyClaimCheckYourAnswersFragment(this.page);
    return new NotifyClaimCheckYourAnswers2UnrepresentedDefendantsPage(
      notifyClaimCheckYourAnswersFragment,
      this.page,
    );
  }

  get notifyClaimsRepresentedDefendantContinuePage() {
    return new NotifyClaimRepresentedDefendantContinuePage(this.page);
  }

  get notifyClaimsRepresentedDefendantSubmitPage() {
    return new NotifyClaimRepresentedDefendantSubmitPage(this.page);
  }
}
