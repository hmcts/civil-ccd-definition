import BasePageFactory from '../../../../base/base-page-factory';
import DefendantResponseCheckIfYouNeedToCompleteClaimTimelinePage from './lr-spec/check-if-you-need-to-complete-claim-timeline/check-if-you-need-to-complete-claim-timeline-page';
import DefendantResponseConfirmNameAndAddressPage from './lr-spec/confirm-name-and-address/confirm-name-and-address-page';
import DefendantResponseDefendantsLegalRepsReferencePage from './lr-spec/defendants-legal-reps-reference/defendants-legal-reps-reference-page';
import DefendantResponseRespondToClaimPage from './lr-spec/respond-to-claim/respond-to-claim-page';
import DefendantResponseWhyDoesDefendantNotOweMoneyPage from './lr-spec/why-does-defendant-not-owe-money/why-does-defendant-not-owe-money-page';
import DefendantResponseHowToAddClaimTimelinePage from './lr-spec/how-to-add-claim-timeline/how-to-add-claim-timeline-page';
import DefendantResponseAddTimelineOfEventsPage from './lr-spec/add-timeline-of-events/add-timeline-of-events-page';
import DefendantResponseMediationContactInformationPage from './lr-spec/mediation-contact-info/mediation-contact-info-page';
import DefendantResponseMediationAvailabilityPage from './lr-spec/mediation-availability/mediation-availability-page';
import DefendantResponseUseOfExpertsPage from './lr-spec/use-of-experts/use-of-experts-page';
import DefendantResponseWitnessesPage from './lr-spec/witnesses/witnesses-page';
import DefendantResponseWelshLanguagePage from './lr-spec/welsh-language/welsh-language-page';
import DefendantResponseCourtLocationPage from './lr-spec/court-location/court-location-page';
import DefendantResponseSupportWithAccessNeedsPage from './lr-spec/support-with-access-needs/support-with-access-needs-page';
import DefendantResponseVulnerabilityQuestionsPage from './lr-spec/vulnerability-questions/vulnerability-questions-page';

export default class DefendantResponsePageFactory extends BasePageFactory {
  get defendantResponseCheckIfYouNeedToCompleteClaimTimelinePage() {
    return new DefendantResponseCheckIfYouNeedToCompleteClaimTimelinePage(this.page);
  }

  get defendantResponseRespondToClaimPage() {
    return new DefendantResponseRespondToClaimPage(this.page);
  }

  get defendantResponseConfirmNameAndAddressPage() {
    return new DefendantResponseConfirmNameAndAddressPage(this.page);
  }

  get defendantResponseDefendantsLegalRepsReferencePage() {
    return new DefendantResponseDefendantsLegalRepsReferencePage(this.page);
  }

  get defendantResponseWhyDoesDefendantNotOweMoneyPage() {
    return new DefendantResponseWhyDoesDefendantNotOweMoneyPage(this.page);
  }

  get defendantResponseHowToAddClaimTimelinePage() {
    return new DefendantResponseHowToAddClaimTimelinePage(this.page);
  }

  get defendantResponseAddTimelineOfEventsPage() {
    return new DefendantResponseAddTimelineOfEventsPage(this.page);
  }

  get defendantResponseMediationContactInformationPage() {
    return new DefendantResponseMediationContactInformationPage(this.page);
  }

  get defendantResponseMediationAvailabilityPage() {
    return new DefendantResponseMediationAvailabilityPage(this.page);
  }

  get defendantResponseUseOfExpertPage() {
    return new DefendantResponseUseOfExpertsPage(this.page);
  }

  get defendantResponseWitnessesPage() {
    return new DefendantResponseWitnessesPage(this.page);
  }

  get defendantResponseWelshLanguagePage() {
    return new DefendantResponseWelshLanguagePage(this.page);
  }

  get defendantResponseCourtLocationPage() {
    return new DefendantResponseCourtLocationPage(this.page);
  }

  get defendantResponseSupportWithAccessNeedsPage() {
    return new DefendantResponseSupportWithAccessNeedsPage(this.page);
  }

  get defendantResponseVulnerabilityQuestionsPage() {
    return new DefendantResponseVulnerabilityQuestionsPage(this.page);
  }
}
