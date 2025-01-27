import BasePageFactory from '../../../../../base/base-page-factory';
import partys from '../../../../../constants/partys';
import RemoteHearingSpecFragment from '../../../fragments/remote-hearing-spec/remote-hearing-spec-fragment';
import StatementOfTruthFragment from '../../../fragments/statement-of-truth/statement-of-truth-fragment';
import ExpertPage from '../directions-questionaire/common/experts/experts-page';
import FileDirectionsQuestionnairePage from '../directions-questionaire/common/file-directions-questionnaire/file-directions-questionnaire-page';
import FixedRecoverableCostsPage from '../directions-questionaire/common/fixed-recoverable-costs/fixed-recoverable-costs-page';
import HearingSupportPage from '../directions-questionaire/common/hearing-support/hearing-support-page';
import LanguagePage from '../directions-questionaire/common/language/language-page';
import WitnessesPage from '../directions-questionaire/common/witnesses/witnesses-page';
import ApplicantCourtLocationLRSpecPage from '../directions-questionaire/lr-spec/applicant-court-location-lr-spec/applicant-court-lr-spec-page';
import ApplicationPage from '../directions-questionaire/lr-spec/application/application-page';
import DisclosureOfElectronicDocumentsPage from '../directions-questionaire/lr-spec/disclosure-of-electronic-documents/discloure-of-electronic-documents-page';
import DisclosureOfNonElectronicDocumentsSpecPage from '../directions-questionaire/lr-spec/disclosure-of-non-electronic-documents-spec/disclosure-of-non-electronic-documents-spec-page';
import DisclosureReportPage from '../directions-questionaire/lr-spec/disclosure-report/disclosure-report-page';
import MediationContactInformationClaimantPage from '../mediation/mediation-contact-information/mediation-contact-information-page';
import MediationAvailabilityClaimantPage from '../mediation/mediation-availability/mediation-availability-page';
import HearingSpecPage from '../directions-questionaire/lr-spec/hearing-spec/hearing-spec-page';
import SmallClaimExpertsClaimantPage from '../directions-questionaire/lr-spec/small-claim-experts/small-claim-experts-claimant-page';
import SmallClaimWitnessesClaimantPage from '../directions-questionaire/lr-spec/small-claim-witnesses/small-claim-witnesses-claimant-page';
import VulnerabilityQuestionsSpecPage from '../directions-questionaire/lr-spec/vulnerability-questions-spec/vulnerability-questions-spec-page';
import DisclosureOfNonElectronicDocumentsPage from '../directions-questionaire/unspec/disclosure-of-non-electronic-documents/disclosure-of-non-electronic-documents-page';
import DraftDirectionsPage from '../directions-questionaire/unspec/draft-directions/draft-directions-page';
import FurtherInformationPage from '../directions-questionaire/unspec/further-information/further-information-page';
import HearingPage from '../directions-questionaire/unspec/hearing/hearing-page';
import VulnerabilityQuestionsPage from '../directions-questionaire/unspec/vulnerability-questions/vulnerability-questions-page';
import StatementOfTruthClaimantResponsePage from './common/statement-of-truth-claimant-response/statement-of-truth-claimant-response-page';
import SubmitClaimantResponsePage from './common/submit-claimant-response/submit-claimant-response-page';
import ConfirmClaimantResponseSpecPage from './lr-spec/confirm-claimant-response-spec/confirm-claimant-response-spec-page';
import DefenceResponseDocumentSpecPage from './lr-spec/defence-response-document-spec/defence-response-document-spec-page';
import RespondentResponse1v2DSSpecPage from './lr-spec/respondent-response-spec/respondent-response-1v2DS-spec-page';
import RespondentResponse1v2SSSpecPage from './lr-spec/respondent-response-spec/respondent-response-1v2SS-spec-page';
import RespondentResponse2v1SpecPage from './lr-spec/respondent-response-spec/respondent-response-2v1-spec-page';
import RespondentResponseSpecPage from './lr-spec/respondent-response-spec/respondent-response-spec-page';
import ConfirmClaimantResponsePage from './unspec/confirm-claimant-response/confirm-claimants-response-page';
import DefenceResponseDocument1v2Page from './unspec/defence-response-document/defence-response-document-1v2-page';
import DefenceResponseDocumentPage from './unspec/defence-response-document/defence-response-document-page';
import RespondentResponse1v2Page from './unspec/respondent-response/respondent-response-1v2-page';
import RespondentResponse2v1Page from './unspec/respondent-response/respondent-response-2v1-page';
import RespondentResponsePage from './unspec/respondent-response/respondent-response-page';
import MediationContactInformationPage from '../mediation/mediation-contact-information/mediation-contact-information-page';
import MediationAvailabilityPage from '../mediation/mediation-availability/mediation-availability-page';
import DateFragment from '../../../fragments/date/date-fragment';

export default class ClaimantResponsePageFactory extends BasePageFactory {
  get respondentResponsePage() {
    return new RespondentResponsePage(this.page);
  }

  get respondentResponse2v1Page() {
    return new RespondentResponse2v1Page(this.page);
  }

  get respondentResponse1v2Page() {
    return new RespondentResponse1v2Page(this.page);
  }

  get respondentResponseSpecPage() {
    return new RespondentResponseSpecPage(this.page);
  }

  get respondentResponse2v1SpecPage() {
    return new RespondentResponse2v1SpecPage(this.page);
  }

  get respondentResponse1v2SSSpecPage() {
    return new RespondentResponse1v2SSSpecPage(this.page);
  }

  get respondentResponse1v2DSSpecPage() {
    return new RespondentResponse1v2DSSpecPage(this.page);
  }

  get defenceResponseDocumentPage() {
    return new DefenceResponseDocumentPage(this.page);
  }

  get defenceResponseDocument1v2Page() {
    return new DefenceResponseDocument1v2Page(this.page);
  }

  get defenceResponseDocumentSpecPage() {
    return new DefenceResponseDocumentSpecPage(this.page);
  }

  get fileDirectionsQuestionairePage() {
    return new FileDirectionsQuestionnairePage(this.page, partys.CLAIMANT_1);
  }

  get fixedRecoverableCostsPage() {
    return new FixedRecoverableCostsPage(this.page, partys.CLAIMANT_1);
  }

  get disclosureOfElectronicDocumentsPage() {
    return new DisclosureOfElectronicDocumentsPage(this.page, partys.CLAIMANT_1);
  }

  get disclosureOfNonElectronicDocumentsPage() {
    return new DisclosureOfNonElectronicDocumentsPage(this.page, partys.CLAIMANT_1);
  }

  get disclosureOfNonElectronicDocumentsSpecPage() {
    return new DisclosureOfNonElectronicDocumentsSpecPage(this.page, partys.CLAIMANT_1);
  }

  get disclosureReportPage() {
    return new DisclosureReportPage(this.page, partys.CLAIMANT_1);
  }

  get mediationContactInformationPage() {
    return new MediationContactInformationPage(
      this.page,
      partys.CLAIMANT_1,
      partys.CLAIMANT_1_MEDIATION_FRIEND,
    );
  }

  get mediationAvailabilityPage() {
    const dateFragment = new DateFragment(this.page);
    return new MediationAvailabilityPage(
      this.page,
      dateFragment,
      partys.CLAIMANT_1_MEDIATION_FRIEND,
    );
  }

  get smallClaimExpertsClaimantPage() {
    return new SmallClaimExpertsClaimantPage(this.page);
  }

  get smallClaimWitnessesClaimantPage() {
    return new SmallClaimWitnessesClaimantPage(this.page);
  }

  get expertsPage() {
    return new ExpertPage(this.page, partys.CLAIMANT_1);
  }

  get witnessesPage() {
    return new WitnessesPage(this.page, partys.CLAIMANT_1);
  }

  get languagePage() {
    return new LanguagePage(this.page, partys.CLAIMANT_1);
  }

  get hearingPage() {
    const dateFragment = new DateFragment(this.page);
    return new HearingPage(this.page, dateFragment, partys.CLAIMANT_1);
  }

  get hearingSpecPage() {
    const dateFragment = new DateFragment(this.page);
    return new HearingSpecPage(this.page, dateFragment, partys.CLAIMANT_1);
  }

  get draftDirectionsPage() {
    return new DraftDirectionsPage(this.page, partys.CLAIMANT_1);
  }

  get applicantCourtLocationLRSpecPage() {
    const remoteHearingSpecFragment = new RemoteHearingSpecFragment(this.page, partys.CLAIMANT_1);
    return new ApplicantCourtLocationLRSpecPage(this.page, remoteHearingSpecFragment);
  }

  get vulnerabilityQuestionsPage() {
    return new VulnerabilityQuestionsPage(this.page, partys.CLAIMANT_1);
  }

  get vulnerabilityQuestionsSpecPage() {
    return new VulnerabilityQuestionsSpecPage(this.page, partys.CLAIMANT_1);
  }

  get hearingSupportPage() {
    return new HearingSupportPage(this.page, partys.CLAIMANT_1);
  }

  get furtherInformationPage() {
    return new FurtherInformationPage(this.page, partys.CLAIMANT_1);
  }

  get applicationPage() {
    return new ApplicationPage(this.page, partys.CLAIMANT_1);
  }

  get statementOfTruthClaimantResponsePage() {
    const statementofTruthFragment = new StatementOfTruthFragment(
      this.page,
      partys.CLAIMANT_SOLICITOR_1,
    );
    return new StatementOfTruthClaimantResponsePage(this.page, statementofTruthFragment);
  }

  get submitClaimantResponsePage() {
    return new SubmitClaimantResponsePage(this.page);
  }

  get confirmClaimantResponsePage() {
    return new ConfirmClaimantResponsePage(this.page);
  }

  get confirmClaimantResponseSpecPage() {
    return new ConfirmClaimantResponseSpecPage(this.page);
  }
}
