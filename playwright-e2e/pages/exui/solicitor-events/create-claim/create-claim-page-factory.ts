import BasePageFactory from '../../../../base/base-page-factory';
import CaseFilterPage from './common/case-filter/case-filter-page';
import SpecCorrespondenceAddressPage from './lr-spec/spec-correspondence-address/spec-correspondence-address-page.ts';
import EligibilitySpecPage from './lr-spec/eligibilty-spec/eligibility-spec-page.ts';
import ChecklistPage from './lr-spec/check-list/checklist-page.ts';
import EligibilityPage from './unspec/eligibility/eligibility-page.ts';
import ReferencesPage from './common/references/references-page.ts';
import ClaimantPage from './common/claimant/claimant-page.ts';
import partys from '../../../../constants/partys.ts';
import CourtPage from './unspec/court/court-page.ts';
import ClaimantLitigationFriendPage from './unspec/claimant-litigation-friend/claimant-litigation-friend-page.ts';
import NotificationsPage from './common/notifications/notifcations-page.ts';
import ClaimantSolicitorOrganisationPage from './common/claimant-solicitor-organisation/claimant-solicitor-organisation-page.ts';
import AddAnotherClaimantPage from './common/add-another-claimant/add-another-claimant-page.ts';
import CorrespondenceAddressFragment from '../../fragments/correspondence-address/correspondence-address-fragment.ts';
import SecondClaimantPage from './common/second-claimant/second-claimant-page.ts';
import ClaimantSolicitorServiceAddressPage from './unspec/claimant-solicitor-service-address/claimant-solicitor-service-address-page.ts';
import ServiceAddressFragment from '../../fragments/service-address/service-address-fragment.ts';
import DefendantPage from './common/defendant/defendant-page.ts';
import OrganisationFragment from '../../fragments/organisation/organisation-fragment.ts';
import LegalRepresentationSpecPage from './lr-spec/legal-representation-spec/legal-representation-spec-page.ts';
import LegalRepresentationPage from './unspec/legal-representation/legal-representation-page.ts';
import DefendantSolicitorOrganisationPage from './unspec/defendant-solicitor-organisation/defendant-solicitor-organisation-page.ts';
import DefendantSolicitorOrganisationSpecPage from './lr-spec/defendant-solicitor-organisation-spec/defendant-solicitor-organisation-spec-page.ts';
import UnRegisteredDefendantSolicitorOrganisationPage from './lr-spec/unregistered-defendant-solicitor-organisation/unregistered-defendant-solicitor-organisation-page.ts';
import UnregisteredSecondDefendantSolicitorOrganisationPage from './lr-spec/unregistered-second-defendant-solicitor-organisation/unregistered-second-defendant-solicitor-organisation-page.ts';
import AddAnotherDefendantPage from './common/add-another-defendant/add-another-defendant-page.ts';
import OrganisationRegisteredFragment from '../../fragments/organisation-registered/organisation-registered-fragment.ts';
import DefendantSolicitorServiceAddressPage from './unspec/defendant-solicitor-service-address/defendant-solicitor-service-address-page.ts';
import SpecRespondentCorrespondenceAddressPage from './lr-spec/spec-respondent-correspondence-address/spec-respondent-correspondence-address-page.ts';
import DefendantSolicitorEmailPage from './unspec/defendant-solicitor-email/defendant-solicitor-email-page.ts';
import DefendantSolicitorEmailSpecPage from './lr-spec/defendant-solicitor-email-spec/defendant-solicitor-email-spec-page.ts';
import SecondDefendantPage from './common/second-defendant/second-defendant-page.ts';
import SecondDefendantLegalRepresentationPage from './unspec/second-defendant-legal-representation/second-defendant-legal-representation-page.ts';
import LegalRepresentationRespondent2Page from './lr-spec/legal-representation-respondent-2/legal-representation-respondent-2-page.ts';
import SameLegalRepresentativePage from './common/same-legal-representative/same-legal-representative-page.ts';
import SecondDefendantSolicitorServiceAddressPage from './unspec/second-defendant-solicitor-service-address/second-defendant-solicitor-service-address-page.ts';
import SpecRespondent2CorrespondenceAddressPage from './lr-spec/respondent-2-correspondence-address-spec/respondent-2-correspondence-address-page.ts';
import SolicitorReferenceFragment from '../../fragments/solicitor-reference/solicitor-reference-fragment.ts';
import SecondDefendantSolicitorReferencePage from './unspec/second-defendant-solicitor-reference/second-defendant-solicitor-reference-page.ts';
import SecondDefendantSolicitorEmailPage from './unspec/second-defendant-solicitor-email/second-defendant-solicitor-email-page.ts';
import SecondDefendantSolicitorEmailSpecPage from './lr-spec/second-defendant-solicitor-email-spec/second-defendant-solicitor-email-spec-page.ts';
import ClaimTypePage from './unspec/claim-type/claim-type-page.ts';
import FlightDelayClaimPage from './lr-spec/flight-delay-claim/flight-delay-claim-page.ts';
import PersonalInjuryTypePage from './unspec/personal-injury-type/personal-injury-type-page.ts';
import DetailsPage from './unspec/details/details-page.ts';
import DetailsSpecPage from './lr-spec/details-spec/details-spec-page.ts';
import UploadCreateClaimPage from './unspec/upload-create-claim/upload-create-claim-page.ts';
import ParticularsOfClaimFragment from '../../fragments/particulars-of-claim/particulars-of-claim-fragment.ts';
import UploadClaimDocumentPage from './lr-spec/upload-claim-document/upload-claim-document-page.ts';
import ClaimTimelineUploadPage from './lr-spec/claim-timeline-upload/claim-timeline-upload-page.ts';
import ClaimTimelinePage from './lr-spec/claim-timeline/claim-timeline-page.ts';
import DateFragment from '../../fragments/date/date-fragment.ts';
import EvidenceListPage from './lr-spec/evidence-list/evidence-list-page.ts';
import ClaimValuePage from './unspec/claim-value/claim-value-page.ts';
import ClaimAmountPage from './lr-spec/claim-amount/claim-amount-page.ts';
import ClaimInterestPage from './lr-spec/claim-interest/claim-interest-page.ts';
import PbaNumberPage from './common/pba-number/pba-number-page.ts';
import FixedCommencementCostsPage from './lr-spec/fixed-commencement-costs/fixed-commencement-costs-page.ts';
import StatementOfTruthCreateClaimPage from './common/statement-of-truth-create-claim/statement-of-truth-create-claim-page.ts';
import StatementOfTruthFragment from '../../fragments/statement-of-truth/statement-of-truth-fragment.ts';
import SubmitCreateClaimPage from './common/submit-create-claim/submit-create-claim-page.ts';
import ConfirmCreateClaimSpecPage from './lr-spec/confirm-create-claim-spec/confirm-create-claim-spec-page.ts';
import ConfirmCreateClaimPage from './unspec/confirm-create-claim/confirm-create-claim-page.ts';
import RemoteHearingFragment from '../../fragments/remote-hearing/remote-hearing-fragment.ts';
import UploadParticularsOfClaimPage from './unspec/upload-particulars-of-claim/upload-particulars-of-claim-page.ts';
import SecondClaimantLitigationFriendPage from './unspec/second-claimant-litigation-friend/second-claimant-litigation-friend-page.ts';
import SecondDefendantSolicitorOrganisationPage from './unspec/second-defendant-solicitor-organisation/second-defendant-solicitor-organisation-page.ts';
import LitigationFriendFragment from '../../fragments/litigation-friend/litigation-friend-fragment.ts';
import BreakDownInterestPage from './lr-spec/break-down-interest/break-down-interest-page.ts';
import ClaimInterestOptionsPage from './lr-spec/claim-interest-options/claim-interest-options-page.ts';
import InterestClaimFromPage from './lr-spec/interest-claim-from/interest-claim-from-page.ts';
import InterestClaimUntilPage from './lr-spec/interest-claim-until/interest-claim-until-page.ts';
import InterestFromSpecificDate from './lr-spec/interest-from-specific-date/interest-from-specific-date-page.ts';
import SameRateInterestSelectionPage from './lr-spec/same-rate-interest-selection/same-rate-interest-selection-page.ts';
import UnregisteredOrganisationFragment from '../../fragments/unregistered-organisation/unregistered-organisation-fragment.ts';
import UnregisteredOrganisationAddressFragment from '../../fragments/unregistered-organisation-address/unregistered-organisation-address-fragment.ts';

export default class CreateClaimPageFactory extends BasePageFactory {
  get caseFilterPage() {
    return new CaseFilterPage(this.page);
  }

  get checkListPage() {
    return new ChecklistPage(this.page);
  }

  get eligibilityPage() {
    return new EligibilityPage(this.page);
  }

  get eligibilitySpecPage() {
    return new EligibilitySpecPage(this.page);
  }

  get referencesPage() {
    const claimantSolicitorReferenceFragment = new SolicitorReferenceFragment(
      this.page,
      partys.CLAIMANT_1,
      partys.CLAIMANT_SOLICITOR_1,
    );
    const defendantSolicitorReferenceFragment = new SolicitorReferenceFragment(
      this.page,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
    );
    return new ReferencesPage(
      this.page,
      claimantSolicitorReferenceFragment,
      defendantSolicitorReferenceFragment,
    );
  }

  get courtPage() {
    const remoteHearingFragment = new RemoteHearingFragment(this.page, partys.CLAIMANT_1);
    return new CourtPage(this.page, remoteHearingFragment);
  }

  get notificationsPage() {
    return new NotificationsPage(this.page);
  }

  get claimantPage() {
    return new ClaimantPage(this.page);
  }

  get addAnotherClaimantPage() {
    return new AddAnotherClaimantPage(this.page);
  }

  get secondClaimantPage() {
    return new SecondClaimantPage(this.page);
  }

  get secondClaimantLitigationFriendPage() {
    return new SecondClaimantLitigationFriendPage(this.page);
  }

  get claimantLitigationFriendPage() {
    const litigationFriendFragment = new LitigationFriendFragment(
      this.page,
      partys.CLAIMANT_1_LITIGATION_FRIEND,
    );
    return new ClaimantLitigationFriendPage(this.page, litigationFriendFragment);
  }

  get claimantSolicitorOrganisationPage() {
    const organisationFragment = new OrganisationFragment(this.page, partys.CLAIMANT_1);
    return new ClaimantSolicitorOrganisationPage(this.page, organisationFragment);
  }

  get claimantSolicitorServiceAddressPage() {
    const serviceAddressFragment = new ServiceAddressFragment(
      this.page,
      partys.CLAIMANT_1,
      partys.CLAIMANT_SOLICITOR_1,
    );
    return new ClaimantSolicitorServiceAddressPage(this.page, serviceAddressFragment);
  }

  get specCorrespondenceAddressPage() {
    const correspondenceAddressFragment = new CorrespondenceAddressFragment(
      this.page,
      partys.CLAIMANT_SOLICITOR_1,
    );
    return new SpecCorrespondenceAddressPage(this.page, correspondenceAddressFragment);
  }

  get defendantPage() {
    return new DefendantPage(this.page);
  }

  get legalRepresentationPage() {
    return new LegalRepresentationPage(this.page);
  }

  get legalRepresentationSpecPage() {
    return new LegalRepresentationSpecPage(this.page);
  }

  get defendantSolicitorOrganisationPage() {
    const organisationFragment = new OrganisationFragment(this.page, partys.DEFENDANT_1);
    return new DefendantSolicitorOrganisationPage(this.page, organisationFragment);
  }

  get defendantSolicitorOrganisationSpecPage() {
    const organisationRegisteredFragment = new OrganisationRegisteredFragment(
      this.page,
      partys.DEFENDANT_1,
    );
    const organisationFragment = new OrganisationFragment(this.page, partys.DEFENDANT_1);
    return new DefendantSolicitorOrganisationSpecPage(
      this.page,
      organisationRegisteredFragment,
      organisationFragment,
    );
  }

  get unregisteredDefendantSolicitorOrganisationPage() {
    const unregisteredOrganisationFragment = new UnregisteredOrganisationFragment(
      this.page,
      partys.DEFENDANT_SOLICITOR_1,
    );
    const unregisteredOrganisationAddressFragment = new UnregisteredOrganisationAddressFragment(
      this.page,
      partys.DEFENDANT_SOLICITOR_1,
    );
    return new UnRegisteredDefendantSolicitorOrganisationPage(
      this.page,
      unregisteredOrganisationFragment,
      unregisteredOrganisationAddressFragment,
    );
  }

  get unregisteredSecondDefendantSolicitorOrganisationPage() {
    const unregisteredOrganisationFragment = new UnregisteredOrganisationFragment(
      this.page,
      partys.DEFENDANT_SOLICITOR_2,
    );
    const unregisteredOrganisationAddressFragment = new UnregisteredOrganisationAddressFragment(
      this.page,
      partys.DEFENDANT_SOLICITOR_2,
    );
    return new UnregisteredSecondDefendantSolicitorOrganisationPage(
      this.page,
      unregisteredOrganisationFragment,
      unregisteredOrganisationAddressFragment,
    );
  }

  get defendantSolicitorServiceAddressPage() {
    const serviceAddressFragment = new ServiceAddressFragment(
      this.page,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
    );
    return new DefendantSolicitorServiceAddressPage(this.page, serviceAddressFragment);
  }

  get specRespondentCorrespondenceAddressPage() {
    const correspondenceAddressFragment = new CorrespondenceAddressFragment(
      this.page,
      partys.DEFENDANT_SOLICITOR_1,
    );
    return new SpecRespondentCorrespondenceAddressPage(this.page, correspondenceAddressFragment);
  }

  get defendantSolicitorEmailPage() {
    return new DefendantSolicitorEmailPage(this.page);
  }

  get defendantSolicitorEmailSpecPage() {
    return new DefendantSolicitorEmailSpecPage(this.page);
  }

  get addAnotherDefendantPage() {
    return new AddAnotherDefendantPage(this.page);
  }

  get secondDefendantPage() {
    return new SecondDefendantPage(this.page);
  }

  get secondDefendantLegalRepresentationPage() {
    return new SecondDefendantLegalRepresentationPage(this.page);
  }

  get legalRepresentationRespondent2Page() {
    return new LegalRepresentationRespondent2Page(this.page);
  }

  get sameLegalRepresentativePage() {
    return new SameLegalRepresentativePage(this.page);
  }

  get secondDefendantSolicitorOrganisationPage() {
    const organisationFragment = new OrganisationFragment(this.page, partys.DEFENDANT_2);
    return new SecondDefendantSolicitorOrganisationPage(this.page, organisationFragment);
  }

  get secondDefendantSolicitorOrganisationSpecPage() {
    const organisationRegisteredFragment = new OrganisationRegisteredFragment(
      this.page,
      partys.DEFENDANT_2,
    );
    const organisationFragment = new OrganisationFragment(this.page, partys.DEFENDANT_2);
    return new DefendantSolicitorOrganisationSpecPage(
      this.page,
      organisationRegisteredFragment,
      organisationFragment,
    );
  }

  get secondDefendantSolicitorServiceAddressPage() {
    const serviceAddressFragment = new ServiceAddressFragment(
      this.page,
      partys.DEFENDANT_2,
      partys.DEFENDANT_SOLICITOR_2,
    );
    return new SecondDefendantSolicitorServiceAddressPage(this.page, serviceAddressFragment);
  }

  get specRespondent2CorrespondenceAddressPage() {
    const correspondenceAddressFragment = new CorrespondenceAddressFragment(
      this.page,
      partys.DEFENDANT_SOLICITOR_1,
    );
    return new SpecRespondent2CorrespondenceAddressPage(this.page, correspondenceAddressFragment);
  }

  get secondDefendantSolicitorReferencePage() {
    const defendantSolicitorReferenceFragment = new SolicitorReferenceFragment(
      this.page,
      partys.DEFENDANT_2,
      partys.DEFENDANT_SOLICITOR_2,
    );
    return new SecondDefendantSolicitorReferencePage(
      this.page,
      defendantSolicitorReferenceFragment,
    );
  }

  get secondDefendantSolicitorEmailPage() {
    return new SecondDefendantSolicitorEmailPage(this.page);
  }

  get secondDefendantSolicitorEmailSpecPage() {
    return new SecondDefendantSolicitorEmailSpecPage(this.page);
  }

  get claimTypePage() {
    return new ClaimTypePage(this.page);
  }

  get flightDelayClaimPage() {
    return new FlightDelayClaimPage(this.page);
  }

  get personalInjuryType() {
    return new PersonalInjuryTypePage(this.page);
  }

  get detailsPage() {
    return new DetailsPage(this.page);
  }

  get detailsSpecPage() {
    return new DetailsSpecPage(this.page);
  }

  get uploadParticularsOfClaimPage() {
    return new UploadParticularsOfClaimPage(this.page);
  }

  get uploadCreateClaimPage() {
    const particularsOfClaimFragment = new ParticularsOfClaimFragment(this.page);
    return new UploadCreateClaimPage(this.page, particularsOfClaimFragment);
  }

  get uploadClaimDeocumentPage() {
    return new UploadClaimDocumentPage(this.page);
  }

  get claimTimelineUploadPage() {
    return new ClaimTimelineUploadPage(this.page);
  }

  get claimTimelinePage() {
    const dateFragment = new DateFragment(this.page);
    return new ClaimTimelinePage(this.page, dateFragment);
  }

  get evidenceListPage() {
    return new EvidenceListPage(this.page);
  }

  get claimValuePage() {
    return new ClaimValuePage(this.page);
  }

  get claimAmountPage() {
    return new ClaimAmountPage(this.page);
  }

  get claimInterestPage() {
    return new ClaimInterestPage(this.page);
  }

  get breakDownInterestPage() {
    return new BreakDownInterestPage(this.page);
  }

  get claimInterestOptionsPage() {
    return new ClaimInterestOptionsPage(this.page);
  }

  get interestClaimFromPage() {
    return new InterestClaimFromPage(this.page);
  }

  get interestClaimUntilPage() {
    return new InterestClaimUntilPage(this.page);
  }

  get interestFromSpecificDate() {
    return new InterestFromSpecificDate(this.page);
  }

  get sameRateInterestSelectionPage() {
    return new SameRateInterestSelectionPage(this.page);
  }

  get pbaNumberPage() {
    return new PbaNumberPage(this.page);
  }

  get fixedCommencementCostsPage() {
    return new FixedCommencementCostsPage(this.page);
  }

  get statementOfTruthCreateClaimPage() {
    const statementOfTruthFragment = new StatementOfTruthFragment(
      this.page,
      partys.CLAIMANT_SOLICITOR_1,
    );
    return new StatementOfTruthCreateClaimPage(this.page, statementOfTruthFragment);
  }

  get submitCreateClaimPage() {
    return new SubmitCreateClaimPage(this.page);
  }

  get confirmCreateClaimPage() {
    return new ConfirmCreateClaimPage(this.page);
  }

  get confirmCreateClaimSpecPage() {
    return new ConfirmCreateClaimSpecPage(this.page);
  }
}
