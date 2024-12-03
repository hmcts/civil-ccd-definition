import BasePageFactory from '../../../../base/base-page-factory';
import CheckIfYouNeedToCompleteClaimTimelinePage from './lr-spec/check-if-you-need-to-complete-claim-timeline/check-if-you-need-to-complete-claim-timeline-page';
import ConfirmNameAndAddressPage from './lr-spec/confirm-name-and-address/confirm-name-and-address-page';
import DefendantsLegalRepsReferencePage from './lr-spec/defendants-legal-reps-reference/defendants-legal-reps-reference-page';
import RespondToClaimPage from './lr-spec/respond-to-claim/respond-to-claim-page';
import whyDoesDefendantNotOweMoneyPage from './lr-spec/why-does-defendant-not-owe-money/why-does-defendant-not-owe-money-page';
import HowToAddClaimTimelinePage from './lr-spec/how-to-add-claim-timeline/how-to-add-claim-timeline-page';
import AddTimelineOfEventsPage from './lr-spec/add-timeline-of-events/add-timeline-of-events-page';
import MediationContactInformationPage from './lr-spec/mediation-contact-info/mediation-contact-info-page';
import MediationAvailabilityPage from './lr-spec/mediation-availability/mediation-availability-page';
import useOfExpertsPage from './lr-spec/use-of-experts/use-of-experts-page';
import WitnessesPage from './lr-spec/witnesses/witnesses-page';
import WelshLanguagePage from './lr-spec/welsh-language/welsh-language-page';
import CourtLocationPage from './lr-spec/court-location/court-location-page';
import SupportWithAccessNeedsPage from './lr-spec/support-with-access-needs/support-with-access-needs-page';
import VulnerabilityQuestionsPage from './lr-spec/vulnerability-questions/vulnerability-questions-page';
import WhyDoesDefendantDisputeClaimPage from './lr-spec/why-does-defendant-dispute-claim/why-does-defendant-dispute-claim-page';
import MediationPage from './lr-spec/mediation/mediation-page';
import HearingAvailabilityPage from './lr-spec/hearing-availability/hearing-availability-page';
import StatementOfTruthPage from './lr-spec/statement-of-truth/statement-of-truth-page';

export default class DefendantResponsePageFactory extends BasePageFactory {
  get checkIfYouNeedToCompleteClaimTimelinePage() {
    return new CheckIfYouNeedToCompleteClaimTimelinePage(this.page);
  }

  get confirmNameAndAddressPage() {
    return new ConfirmNameAndAddressPage(this.page);
  }

  get defendantsLegalRepsReferencePage() {
    return new DefendantsLegalRepsReferencePage(this.page);
  }

  get respondToClaimPage() {
    return new RespondToClaimPage(this.page);
  }

  get whyDoesDefendantNotOweMoneyPage() {
    return new whyDoesDefendantNotOweMoneyPage(this.page);
  }

  get whyDoesDefendantDisputeClaimPage() {
    return new WhyDoesDefendantDisputeClaimPage(this.page);
  }

  get howToAddClaimTimelinePage() {
    return new HowToAddClaimTimelinePage(this.page);
  }

  get addTimelineOfEventsPage() {
    return new AddTimelineOfEventsPage(this.page);
  }

  get mediationPage() {
    return new MediationPage(this.page);
  }

  get mediationContactInformationPage() {
    return new MediationContactInformationPage(this.page);
  }

  get mediationAvailabilityPage() {
    return new MediationAvailabilityPage(this.page);
  }

  get useOfExpertPage() {
    return new useOfExpertsPage(this.page);
  }

  get witnessesPage() {
    return new WitnessesPage(this.page);
  }

  get welshLanguagePage() {
    return new WelshLanguagePage(this.page);
  }

  get hearingAvailabilityPage() {
    return new HearingAvailabilityPage(this.page);
  }

  get courtLocationPage() {
    return new CourtLocationPage(this.page);
  }

  get supportWithAccessNeedsPage() {
    return new SupportWithAccessNeedsPage(this.page);
  }

  get vulnerabilityQuestionsPage() {
    return new VulnerabilityQuestionsPage(this.page);
  }

  get statementOfTruthPage() {
    return new StatementOfTruthPage(this.page);
  }
}
