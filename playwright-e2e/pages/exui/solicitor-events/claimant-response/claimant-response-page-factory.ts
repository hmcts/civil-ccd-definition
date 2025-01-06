import BasePageFactory from '../../../../base/base-page-factory';
import ClaimantResponseSpecRespondentResponsePage from './lr-spec/claimant-respondent-spec-respondent-response/claimant-response-spec-respondent-response-page.ts';
import ClaimantResponseSpecApplicantDefenceResponseDocumentPage from './common/claimant-response-spec-applicant-defence-response-document/claimant-response-spec-applicant-defence-response-document-page.ts';
import ClaimantResponseSpecSmallClaimExpertsPage from './lr-spec/claimant-response-spec-small-claim-experts/claimant-response-spec-small-claim-experts-page.ts';
import ClaimantResponseSpecSmallClaimWitnessesPage from './lr-spec/claimant-response-spec-small-claim-witnesses/claimant-response-spec-small-claim-witnesses-page.ts';
import ClaimantResponseSpecLanguagePage from './lr-spec/claimant-response-spec-language/claimant-response-spec-language-page.ts';
import ClaimantResponseSpecHearingPage from './lr-spec/claimant-response-spec-hearing/claimant-response-spec-hearing-page.ts';
import ClaimantResponseSpecApplicationCourtLocationLRPage from './lr-spec/claimant-response-spec-application-court-location-LR/claimant-response-spec-application-court-location-LR-page.ts';
import ClaimantResponseSpecHearingSupportPage from './lr-spec/claimant-response-spec-hearing-support/claimant-response-spec-hearing-support-page.ts';
import ClaimantResponseSpecVulnerabilityQuestionsPage from './lr-spec/claimant-response-spec-vulnerability-questions/claimant-response-spec-vulnerability-questions-page.ts';
import ClaimantResponseSpecStatementOfTruthPage from './lr-spec/claimant-response-spec-statementOfTruth/claimant-response-spec-statementOfTruth-page.ts';
import ClaimantResponseSpecSubmitPage from './lr-spec/claimant-response-spec-submit/claimant-response-spec-submit-page.ts';
import ClaimantsResponseSpecConfirmPage from './lr-spec/claimant-response-spec-confirm/claimants-response-spec-confirm-page.ts';
import ClaimantResponseSpecMediationPage from './lr-spec/claimant-response-spec-mediation/claimant-response-spec-mediation-page.ts';
import ClaimantResponseRespondentResponseUnspecPage from './unspec/claimant-response-respondent-response/claimant-response-respondent-response-page.ts';
import ClaimantResponseSpecFileDqPage from './lr-spec/claimant-response-spec-file-dq/claimant-response-spec-file-dq-page.ts';
import ClaimantResponseSpecFixedRecoverableCostsPage from './lr-spec/claimant-response-spec-fixed-recoverable-costs/claimant-response-spec-fixed-recoverable-costs-page.ts';
import ClaimantResponseSpecDisclosureOfNonElectronicDocumentsPage from './lr-spec/claimant-response-spec-disclosureOfNonElectronicDocuments/claimant-response-spec-disclosureOfNonElectronicDocuments-page.ts';
import ClaimantResponseDisclosureOfNonElectronicDocumentsPage from './unspec/claimant-response-disclosureOfNonElectronicDocuments/claimant-response-disclosureOfNonElectronicDocuments-page.ts';
import ClaimantResponseExpertsPage from './unspec/claimant-response-experts/claimant-response-experts-page.ts';
import ClaimantResponseWitnessesPage from './unspec/claimant-response-witnesses/claimant-response-witnesses-page.ts';
import ClaimantResponseDraftDirectionsPage from './unspec/claimant-response-draft-directions/claimant-response-draft-directions-page.ts';
import ClaimantResponseFurtherInformationPage from './unspec/claimant-response-further-information/claimant-response-further-information-page.ts';
import ClaimantResponseSpecDisclosureofElectronicDocumentsPage from './lr-spec/claimant-response-spec-disclosureofElectronicDocuments/claimant-response-spec-disclosureofElectronicDocuments-page.ts';
import ClaimantResponseSpecDisclosureReportPage from './lr-spec/claimant-response-spec-disclosureReport/claimant-response-spec-disclosureReport-page.ts';
import ClaimantResponseSpecApplicationsPage from './lr-spec/claimant-response-spec-applications/claimant-response-spec-applications-page.ts';
export default class ClaimantResponsePageFactory extends BasePageFactory {
  get claimantResponseSpecRespondentResponsePage() {
    return new ClaimantResponseSpecRespondentResponsePage(this.page);
  }

  get claimantResponseSpecApplicantDefenceResponseDocumentPage() {
    return new ClaimantResponseSpecApplicantDefenceResponseDocumentPage(this.page);
  }

  get claimantResponseSpecSmallClaimExpertsPage() {
    return new ClaimantResponseSpecSmallClaimExpertsPage(this.page);
  }

  get claimantResponseSpecSmallClaimWitnessesPage() {
    return new ClaimantResponseSpecSmallClaimWitnessesPage(this.page);
  }

  get claimantResponseSpecLanguagePage() {
    return new ClaimantResponseSpecLanguagePage(this.page);
  }

  get claimantResponseSpecHearingPage() {
    return new ClaimantResponseSpecHearingPage(this.page);
  }

  get claimantResponseSpecApplicationCourtLocationLRPage() {
    return new ClaimantResponseSpecApplicationCourtLocationLRPage(this.page);
  }

  get claimantResponseSpecHearingSupportPage() {
    return new ClaimantResponseSpecHearingSupportPage(this.page);
  }

  get claimantResponseSpecVulnerabilityQuestionsPage() {
    return new ClaimantResponseSpecVulnerabilityQuestionsPage(this.page);
  }

  get claimantResponseSpecStatementOfTruthPage() {
    return new ClaimantResponseSpecStatementOfTruthPage(this.page);
  }

  get claimantResponseSpecSubmitPage() {
    return new ClaimantResponseSpecSubmitPage(this.page);
  }

  get claimantResponseSpecMediationPage() {
    return new ClaimantResponseSpecMediationPage(this.page);
  }

  get claimantResponseSpecConfirmPage() {
    return new ClaimantsResponseSpecConfirmPage(this.page);
  }

  get claimantResponseRespondentResponseUnspecPage() {
    return new ClaimantResponseRespondentResponseUnspecPage(this.page);
  }

  get claimantResponseSpecFileDqPage() {
    return new ClaimantResponseSpecFileDqPage(this.page);
  }

  get claimantResponseSpecFixedRecoverableCostsPage() {
    return new ClaimantResponseSpecFixedRecoverableCostsPage(this.page);
  }

  get claimantResponseExpertsPage() {
    return new ClaimantResponseExpertsPage(this.page);
  }

  get claimantResponseDisclosureOfNonElectronicDocumentsPage() {
    return new ClaimantResponseDisclosureOfNonElectronicDocumentsPage(this.page);
  }

  get claimantResponseWitnessesPage() {
    return new ClaimantResponseWitnessesPage(this.page);
  }
  get claimantResponseDraftDirectionsPage() {
    return new ClaimantResponseDraftDirectionsPage(this.page);
  }
  get claimantResponseFurtherInformationPage() {
    return new ClaimantResponseFurtherInformationPage(this.page);
  }

  get claimantResponseSpecDisclosureofElectronicDocumentsPage() {
    return new ClaimantResponseSpecDisclosureofElectronicDocumentsPage(this.page);
  }

  get claimantResponseSpecDisclosureOfNonElectronicDocumentsPage() {
    return new ClaimantResponseSpecDisclosureOfNonElectronicDocumentsPage(this.page);
  }

  get claimantResponseSpecDisclosureReportPage() {
    return new ClaimantResponseSpecDisclosureReportPage(this.page);
  }

  get claimantResponseSpecApplicationsPage() {
    return new ClaimantResponseSpecApplicationsPage(this.page);
  }
}
