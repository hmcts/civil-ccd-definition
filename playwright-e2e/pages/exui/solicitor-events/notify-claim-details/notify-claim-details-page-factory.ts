import BasePageFactory from '../../../../base/base-page-factory';
import NotifyClaimDetailsCheckYourAnswersFragment from '../../fragments/notify-claim-details-check-your-answers/notify-claim-details-check-your-answers-fragment';
import NotifyClaimDetailsFragment from '../../fragments/notify-claim-details/notify-claim-details-fragment';
import NotifyClaimDetailsCheckYourAnswers1UnrepresentedDefendantPage from './noitfy-claim-details-check-your-answers-unrepresented-defendants/notify-claim-details-check-your-answer-1-unrepresented-defendant';
import NotifyClaimDetailsCheckYourAnswers2UnrepresentedDefendantsPage from './noitfy-claim-details-check-your-answers-unrepresented-defendants/notify-claim-details-check-your-answer-2-unrepresented-defendants';
import NotifyClaimDetailsCheckYourAnswersRepresentedDefendantsPage from './notify-claim-details-check-your-answers-represented-defendants/notify-claim-details-check-your-answers-represented-defendants-page';
import NotifyClaimDetailsRepresentedDefendantsPage from './notify-claim-details-represented-defendants/notify-claim-details-represented-defendants-page';
import NotifyClaimDetailsUnreprentedDefendant1Page from './notify-claim-details-unrepresented-defendants/notify-claim-details-unrepresented-defendant-1-page';
import NotifyClaimDetailsUnreprentedDefendant2Page from './notify-claim-details-unrepresented-defendants/notify-claim-details-unrepresented-defendant-2-page';

export default class NotifyClaimDetailsPageFactory extends BasePageFactory {
  get notifyClaimDetailsRepresentedDefendantsPage() {
    return new NotifyClaimDetailsRepresentedDefendantsPage(this.page);
  }

  get notifyClaimDetailsCheckYourAnswersRepresentedDefendantsPage() {
    return new NotifyClaimDetailsCheckYourAnswersRepresentedDefendantsPage(this.page);
  }

  get notifyClaimDetailsUnrepresentedDefendant1Page() {
    const notifyClaimDetailsFragment = new NotifyClaimDetailsFragment(this.page);
    return new NotifyClaimDetailsUnreprentedDefendant1Page(notifyClaimDetailsFragment, this.page);
  }

  get notifyClaimDetailsUnrepresentedDefendant2Page() {
    const notifyClaimDetailsFragment = new NotifyClaimDetailsFragment(this.page);
    return new NotifyClaimDetailsUnreprentedDefendant2Page(notifyClaimDetailsFragment, this.page);
  }

  get notifyClaimDetailsCheckYourAnswers1UnrepresentedDefendant() {
    const notifyClaimDetailsCheckYourAnswersFragment =
      new NotifyClaimDetailsCheckYourAnswersFragment(this.page);
    return new NotifyClaimDetailsCheckYourAnswers1UnrepresentedDefendantPage(
      notifyClaimDetailsCheckYourAnswersFragment,
      this.page,
    );
  }

  get notifyClaimDetailsCheckYourAnswers2UnrepresentedDefendants() {
    const notifyClaimDetailsCheckYourAnswersFragment =
      new NotifyClaimDetailsCheckYourAnswersFragment(this.page);
    return new NotifyClaimDetailsCheckYourAnswers2UnrepresentedDefendantsPage(
      notifyClaimDetailsCheckYourAnswersFragment,
      this.page,
    );
  }
}
