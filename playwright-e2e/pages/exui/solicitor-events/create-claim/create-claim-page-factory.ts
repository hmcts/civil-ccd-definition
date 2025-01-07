import BasePageFactory from '../../../../base/base-page-factory';
import CaseFilterPage from './common/case-filter/case-filter-page';
import CheckListSpecPage from './lr-spec/check-list-spec/checklist-spec-page';
import CreateClaimSpecEligibilityPage from './lr-spec/create-claim-eligibilty-spec/eligibility-spec-page.ts';
import CreateClaimSpecReferencesPage from './common/create-claim-references/references-spec-page.ts';
import CreateClaimSpecClaimantPage from './common/create-claim-claimant/claimant-spec-page.ts';
import AddAnotherClaimantPage from './common/create-claim-add-another-claimant/add-another-claimant-page.ts';
import NotificationsSpecPage from './common/create-claim-notifications/notifcations-spec-page.ts';
import SolicitorOrganisationSpecPage from './common/create-claim-claimant-solicitor-organisation/solicitor-organisation-spec-page.ts';
import CorrespondenceAddressSpecPage from './lr-spec/create-claim-correspondence-address-spec/correspondence-address-spec-page.ts';
import CreateClaimSpecDefendantPage from './common/create-claim-defendant/defendant-spec-page.ts';
import LegalRepresentationSpecPage from './lr-spec/create-claim-legal-representation-spec/legal-representation-spec-page.ts';
import AddAnotherDefendantPage from './common/create-claim-add-another-defendant/add-another-defendant-page.ts';
import FlightDelayClaimSpecPage from './lr-spec/create-claim-flight-delay-claim-spec/flight-delay-claim-spec-page.ts';
import DetailsSpecPage from './lr-spec/create-claim-details-spec/details-spec-page.ts';
import UploadClaimDocumentSpecPage from './lr-spec/create-claim-upload-claim-document-spec/upload-claim-document-spec-page.ts';
import ClaimTimelineUploadSpecPage from './lr-spec/create-claim-claim-timeline-upload-spec/claim-timeline-upload-spec-page.ts';
import ClaimTimelineSpecPage from './lr-spec/create-claim-claim-timeline-spec/claim-timeline-spec-page.ts';
import EvidenceListSpecPage from './lr-spec/create-claim-evidence-list-spec/evidence-list-spec-page.ts';
import ClaimAmountSpecPage from './lr-spec/create-claim-claim-amount-spec/claim-amount-spec-page.ts';
import ClaimAmountDetailsSpecPage from './lr-spec/create-claim-claim-amount-details-spec/claim-amount-details-spec-page.ts';
import ClaimInterestSpecPage from './lr-spec/create-claim-claim-interest-spec/claim-interest-spec-contenr.ts';
import InterestSummarySpecPage from './lr-spec/create-claim-interest-summary-spec/interest-summary-spec-page.ts';
import PbaNumberPage from './common/create-claim-pba-number/pba-number-page.ts';
import StatementOfTruthPage from './common/create-claim-statement-of-truth/statement-of-truth-page.ts';
import SubmitSpecPage from './lr-spec/create-claim-submit-spec/submit-spec-page.ts';
import EligibilityPage from './unspec/create-claim-eligibility/eligibility-page.ts';
import CourtPage from './unspec/create-claim-court/court-page.ts';
import ClaimantLitigationFriendPage from './unspec/create-claim-claimant-litigation-friend/claimant-litigation-friend-page.ts';
import ClaimantSolicitorServiceAddressPage from './unspec/create-claim-claimant-solicitor-service-address/claimant-solicitor-service-address-page.ts';
import LegalRepresentationPage from './unspec/create-claim-legal-representation/legal-representation-page.ts';
import ClaimTypePage from './unspec/create-claim-claim-type/claim-type-page.ts';
import PersonalInjuryTypePage from './unspec/create-claim-personal-injury-type/personal-injury-type-page.ts';
import CreateClaimDetailsPage from './unspec/create-claim-details/create-claim-details-page.ts';
import UploadParticularsOfClaimPage from './unspec/create-claim-upload-particulars-of-claim/upload-particulars-of-claim-page.ts';
import ClaimValuePage from './unspec/create-claim-claim-value/claim-value-page.ts';
import SubmitPage from './unspec/create-claim-submit/submit-page.ts';
import AddSecondClaimantPage from './common/create-claim-second-claimant/second-claimant-page.ts';
import DefendantSolicitorOrganisationSpecPage from './lr-spec/create-claim-defendant-solicitor-organisation-spec/defendant-solicitor-organisation-spec-page.ts';
import DefendantSolicitorEmailSpecPage from './lr-spec/create-claim-defendant-solicitor-email-spec/defendant-solicitor-email-spec-page.ts';
import CorrespondenceAddressDefendantLegalRepresentativeSpecPage from './lr-spec/create-claim-correspondence-address-defendant-legal-representative-spec/correspondence-address-defendant-legal-representative-spec-page.ts';
import AddSecondDefendantPage from './common/create-claim-second-defendant/second-defendant-spec-page.ts';
import LegalRepresentationRespondent2Page from './lr-spec/create-claim-legal-representation-respondent2/legal-representation-respondent2-page.ts';
import DefendantSameLegalRepresentativePage from './lr-spec/create-claim-defendant-same-legal-representative-spec/defendant-same-legal-representative-page.ts';
import SecondDefendantSolicitorOrganisationSpecPage from './lr-spec/create-claim-second-defendant-solicitor-organisation-spec/second-defendant-solicitor-organisation-page.ts';
import SecondDefendantSolicitorEmailSpecPage from './lr-spec/create-claim-second-defendant-solicitor-email-spec/second-defendant-solicitor-email-page.ts';
import Respondent2CorrespondenceAddressPage from './lr-spec/create-claim-respondent2-correspondence-address-spec/respondent2-correspondence-address-page.ts';

export default class CreateClaimPageFactory extends BasePageFactory {
  get caseFilterPage() {
    return new CaseFilterPage(this.page);
  }

  get checkListSpecPage() {
    return new CheckListSpecPage(this.page);
  }

  get createClaimSpecEligibilityPage() {
    return new CreateClaimSpecEligibilityPage(this.page);
  }

  get createClaimSpecReferencesPage() {
    return new CreateClaimSpecReferencesPage(this.page);
  }

  get createClaimSpecClaimantPage() {
    return new CreateClaimSpecClaimantPage(this.page);
  }

  get addAnotherClaimantSpecPage() {
    return new AddAnotherClaimantPage(this.page);
  }

  get notificationsSpecPage() {
    return new NotificationsSpecPage(this.page);
  }

  get solicitorOrganisationSpecPage() {
    return new SolicitorOrganisationSpecPage(this.page);
  }

  get correspondenceAddressSpecPage() {
    return new CorrespondenceAddressSpecPage(this.page);
  }

  get createClaimSpecDefendantPage() {
    return new CreateClaimSpecDefendantPage(this.page);
  }

  get LegalRepresentationSpecPage() {
    return new LegalRepresentationSpecPage(this.page);
  }

  get addAnotherDefendantSpecPage() {
    return new AddAnotherDefendantPage(this.page);
  }

  get flightDelayClaimSpecPage() {
    return new FlightDelayClaimSpecPage(this.page);
  }

  get detailsSpecPage() {
    return new DetailsSpecPage(this.page);
  }

  get uploadClaimDocumentSpecPage() {
    return new UploadClaimDocumentSpecPage(this.page);
  }

  get claimTimelineUploadSpecPage() {
    return new ClaimTimelineUploadSpecPage(this.page);
  }

  get claimTimelineSpecPage() {
    return new ClaimTimelineSpecPage(this.page);
  }

  get evidenceListSpecPage() {
    return new EvidenceListSpecPage(this.page);
  }

  get claimAmountSpecPage() {
    return new ClaimAmountSpecPage(this.page);
  }

  get claimAmountDetailsSpecPage() {
    return new ClaimAmountDetailsSpecPage(this.page);
  }

  get claimInterestSpecPage() {
    return new ClaimInterestSpecPage(this.page);
  }

  get interestSummarySpecPage() {
    return new InterestSummarySpecPage(this.page);
  }

  get pbaNumberSpecPage() {
    return new PbaNumberPage(this.page);
  }

  get statementOfTruthPage() {
    return new StatementOfTruthPage(this.page);
  }

  get submitSpecPage() {
    return new SubmitSpecPage(this.page);
  }

  get addSecondClaimantPage() {
    return new AddSecondClaimantPage(this.page);
  }

  get defendantSolicitorOrganisationSpecPage() {
    return new DefendantSolicitorOrganisationSpecPage(this.page);
  }

  get defendantSolicitorEmailSpecPage() {
    return new DefendantSolicitorEmailSpecPage(this.page);
  }

  get correspondenceAddressDefendantLegalRepresentativeSpecPage() {
    return new CorrespondenceAddressDefendantLegalRepresentativeSpecPage(this.page);
  }

  get addSecondDefendantPage() {
    return new AddSecondDefendantPage(this.page);
  }

  get legalRepresentationRespondent2Page() {
    return new LegalRepresentationRespondent2Page(this.page);
  }

  get defendantSameLegalRepresentativePage() {
    return new DefendantSameLegalRepresentativePage(this.page);
  }

  get secondDefendantSolicitorOrganisationSpecPage() {
    return new SecondDefendantSolicitorOrganisationSpecPage(this.page);
  }

  get secondDefendantSolicitorEmailSpecPage() {
    return new SecondDefendantSolicitorEmailSpecPage(this.page);
  }

  get respondent2CorrespondenceAddressPage() {
    return new Respondent2CorrespondenceAddressPage(this.page);
  }

  get eligibilityPage() {
    return new EligibilityPage(this.page);
  }

  get courtPage() {
    return new CourtPage(this.page);
  }

  get claimantLitigationFriendPage() {
    return new ClaimantLitigationFriendPage(this.page);
  }

  get claimantSolictorServiceAddressPage() {
    return new ClaimantSolicitorServiceAddressPage(this.page);
  }

  get legalRepresentationPage() {
    return new LegalRepresentationPage(this.page);
  }

  get claimTypePage() {
    return new ClaimTypePage(this.page);
  }

  get personalInjuryTypePage() {
    return new PersonalInjuryTypePage(this.page);
  }

  get claimDetailsPage() {
    return new CreateClaimDetailsPage(this.page);
  }

  get uploadParticularsOfClaimPage() {
    return new UploadParticularsOfClaimPage(this.page);
  }

  get claimValuePage() {
    return new ClaimValuePage(this.page);
  }

  get submitPage() {
    return new SubmitPage(this.page);
  }
}
