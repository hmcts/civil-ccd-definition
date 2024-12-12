import BasePageFactory from '../../../../base/base-page-factory';
import CheckIfYouNeedToCompleteClaimTimelinePage from './lr-spec/check-if-you-need-to-complete-claim-timeline/check-if-you-need-to-complete-claim-timeline-page';
import ConfirmNameAndAddressPage from './confirm-name-and-address/confirm-name-and-address-page';
import DefendantsLegalRepsReferencePage from './lr-spec/defendants-legal-reps-reference/defendants-legal-reps-reference-page';
import RespondToClaimPage from './respond-to-claim/respond-to-claim-page';
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
import FileDirectionsQuestionnairePage from './lr-spec/file-directions-questionnaire/file-directions-questionnaire-page';
import FixedRecoverableCostsPage from './lr-spec/fixed-recoverable-costs/fixed-recoverable-costs-page';
import DisclosureOfElectronicDocumentsPage from './lr-spec/disclosure-of-electronic-documents/discloure-of-electronic-documents-page';
import DisclosureOfNonElectronicDocumentsPage from './lr-spec/disclosure-of-non-electronic-documents/disclosure-of-non-electronic-documents-page';
import DisclosureReportPage from './lr-spec/disclosure-report/disclosure-report-page';
import ApplicationPage from './lr-spec/application/application-page';
import IntendToFileSingleResponsePage from './lr-spec/intend-to-file-single-response/intend-to-file-single-response-page';
import SolicitorReferencesPage from './lr-spec/solicitor-references/solicitor-references-page';
import UploadDefencePage from './lr-spec/upload-defence/upload-defence-page';
import UploadDraftDirectionsPage from './lr-spec/upload-draft-directions/upload-draft-directions-page';
import FurtherInformationPage from './lr-spec/further-information/further-information-page';

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

  get fileDirectionsQuestionnairePage() {
    return new FileDirectionsQuestionnairePage(this.page);
  }

  get fixedRecoverableCostsPage() {
    return new FixedRecoverableCostsPage(this.page);
  }

  get disclosureOfElectronicDocumentsPage() {
    return new DisclosureOfElectronicDocumentsPage(this.page);
  }

  get disclosureOfNonElectronicDocumentsPage() {
    return new DisclosureOfNonElectronicDocumentsPage(this.page);
  }

  get disclosureReportPage() {
    return new DisclosureReportPage(this.page);
  }

  get applicationPage() {
    return new ApplicationPage(this.page);
  }

  get intendToFileSingleResponsePage() {
    return new IntendToFileSingleResponsePage(this.page);
  }

  get checkIfYouNeedToCompleteClaimTimelineDef2Page() {
    return new CheckIfYouNeedToCompleteClaimTimelinePage(this.page);
  }

  get confirmNameAndAddressDef2Page() {
    return new ConfirmNameAndAddressPage(this.page);
  }

  get defendantsLegalRepsReferenceDef2Page() {
    return new DefendantsLegalRepsReferencePage(this.page);
  }

  get respondToClaimDef2Page() {
    return new RespondToClaimPage(this.page);
  }

  get whyDoesDefendantNotOweMoneyDef2Page() {
    return new whyDoesDefendantNotOweMoneyPage(this.page);
  }

  get whyDoesDefendantDisputeClaimDef2Page() {
    return new WhyDoesDefendantDisputeClaimPage(this.page);
  }

  get howToAddClaimTimelineDef2Page() {
    return new HowToAddClaimTimelinePage(this.page);
  }

  get addTimelineOfEventsDef2Page() {
    return new AddTimelineOfEventsPage(this.page);
  }

  get mediationDef2Page() {
    return new MediationPage(this.page);
  }

  get mediationContactInformationDef2Page() {
    return new MediationContactInformationPage(this.page);
  }

  get mediationAvailabilityDef2Page() {
    return new MediationAvailabilityPage(this.page);
  }

  get useOfExpertDef2Page() {
    return new useOfExpertsPage(this.page);
  }

  get witnessesDef2Page() {
    return new WitnessesPage(this.page);
  }

  get welshLanguageDef2Page() {
    return new WelshLanguagePage(this.page);
  }

  get hearingAvailabilityDef2Page() {
    return new HearingAvailabilityPage(this.page);
  }

  get courtLocationDef2Page() {
    return new CourtLocationPage(this.page);
  }

  get supportWithAccessNeedsDef2Page() {
    return new SupportWithAccessNeedsPage(this.page);
  }

  get vulnerabilityQuestionsDef2Page() {
    return new VulnerabilityQuestionsPage(this.page);
  }

  get statementOfTruthDef2Page() {
    return new StatementOfTruthPage(this.page);
  }

  get fileDirectionsQuestionnaireDef2Page() {
    return new FileDirectionsQuestionnairePage(this.page);
  }

  get fixedRecoverableCostsDef2Page() {
    return new FixedRecoverableCostsPage(this.page);
  }

  get disclosureOfElectronicDocumentsDef2Page() {
    return new DisclosureOfElectronicDocumentsPage(this.page);
  }

  get disclosureOfNonElectronicDocumentsDef2Page() {
    return new DisclosureOfNonElectronicDocumentsPage(this.page);
  }

  get disclosureReportDef2Page() {
    return new DisclosureReportPage(this.page);
  }

  get applicationDef2Page() {
    return new ApplicationPage(this.page);
  }

  get intendToFileSingleResponseDef2Page() {
    return new IntendToFileSingleResponsePage(this.page);
  }

  get solicitorReferencePage() {
    return new SolicitorReferencesPage(this.page);
  }

  get uploadDefencePage() {
    return new UploadDefencePage(this.page);
  }

  get uploadDraftDirectionsPage() {
    return new UploadDraftDirectionsPage(this.page);
  }

  get furtherInformationPage() {
    return new FurtherInformationPage(this.page);
  }

  get solicitorReferenceDef2Page() {
    return new SolicitorReferencesPage(this.page);
  }

  get uploadDefenceDef2Page() {
    return new UploadDefencePage(this.page);
  }

  get uploadDraftDirectionsDef2Page() {
    return new UploadDraftDirectionsPage(this.page);
  }

  get furtherInformationDef2Page() {
    return new FurtherInformationPage(this.page);
  }
}
