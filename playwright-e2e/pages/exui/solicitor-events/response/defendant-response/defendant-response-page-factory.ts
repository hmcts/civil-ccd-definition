import BasePageFactory from '../../../../../base/base-page-factory';
import partys from '../../../../../constants/partys';
import DateFragment from '../../../fragments/date/date-fragment';
import RemoteHearingSpecFragment from '../../../fragments/remote-hearing-spec/remote-hearing-spec-fragment';
import RemoteHearingFragment from '../../../fragments/remote-hearing/remote-hearing-fragment';
import StatementOfTruthFragment from '../../../fragments/statement-of-truth/statement-of-truth-fragment';
import ExpertPage from '../directions-questionaire/common/experts/experts-page';
import FileDirectionsQuestionnairePage from '../directions-questionaire/common/file-directions-questionnaire/file-directions-questionnaire-page';
import FixedRecoverableCostsPage from '../directions-questionaire/common/fixed-recoverable-costs/fixed-recoverable-costs-page';
import HearingSupportPage from '../directions-questionaire/common/hearing-support/hearing-support-page';
import LanguagePage from '../directions-questionaire/common/language/language-page';
import ApplicationPage from '../directions-questionaire/lr-spec/application/application-page';
import DisclosureOfElectronicDocumentsLRSpecPage from '../directions-questionaire/lr-spec/disclosure-of-electronic-documents-lr-spec/discloure-of-electronic-documents-lr-spec-page';
import DisclosureOfNonElectronicDocumentsLRSpecPage from '../directions-questionaire/lr-spec/disclosure-of-non-electronic-documents-lr-spec/disclosure-of-non-electronic-documents-lr-spec-page';
import DisclosureReportPage from '../directions-questionaire/lr-spec/disclosure-report/disclosure-report-page';
import HearingLRSpecPage from '../directions-questionaire/lr-spec/hearing-lr-spec/hearing-lr-spec-page';
import RequestedCourtLRSpecPage from '../directions-questionaire/lr-spec/requested-court-lr-spec/requested-court-lr-spec-page';
import SmallClaimExpertsPage from '../directions-questionaire/lr-spec/small-claim-experts/small-claim-experts-page';
import SmallClaimHearingPage from '../directions-questionaire/lr-spec/small-claim-hearing/small-claim-hearing-page';
import SmallClaimWitnessesDefendantPage from '../directions-questionaire/lr-spec/small-claim-witnesses/small-claim-witnesses-page';
import VulnerabilityQuestionsSpecPage from '../directions-questionaire/lr-spec/vulnerability-questions-spec/vulnerability-questions-spec-page';
import DraftDirectionsPage from '../directions-questionaire/unspec/draft-directions/draft-directions-page';
import FurtherInformationPage from '../directions-questionaire/unspec/further-information/further-information-page';
import HearingPage from '../directions-questionaire/unspec/hearing/hearing-page';
import RequestedCourtPage from '../directions-questionaire/unspec/requested-court/requested-court-page';
import VulnerabilityQuestionsPage from '../directions-questionaire/unspec/vulnerability-questions/vulnerability-questions-page';
import SingleResponse2v1Page from './common/single-response-2v1/single-response-2v1-page';
import SingleResponsePage from './common/single-response/single-response-page';
import StatmentOfTruthDefendantResponsePage from './common/statement-of-truth-defendant-response/statement-of-truth-defendant-response-page';
import SubmitDefendantResponsePage from './common/submit-defendant-response/submit-defendant-response-page';
import Confirm1v2SSDefendantResponseSpecPage from './lr-spec/confirm-defendant-response-spec/confirm-1v2SS-defendant-response-spec-page';
import ConfirmDefendantResponseSpecPage from './lr-spec/confirm-defendant-response-spec/confirm-defendant-response-spec-page';
import DefenceRouteDefendant1Page from './lr-spec/defence-route/defence-route-page';
import HowToAddTimelineManualPage from './lr-spec/how-to-add-timeline-manual/how-to-add-timeline-manual-page';
import HowToAddTimelineUploadPage from './lr-spec/how-to-add-timeline-upload/how-to-add-timeline-upload-page';
import HowToAddTimelinePage from './lr-spec/how-to-add-timeline/how-to-add-timeline-page';
import MediationPage from './lr-spec/mediation/mediation-page';
import RespondentChecklistPage from './lr-spec/respondent-checklist/respondent-checklist-page';
import RespondentResponseType1v2SpecPage from './lr-spec/respondent-response-type-spec/respondent-response-type-1v2-spec-page';
import RespondentResponseTypeSpecPage from './lr-spec/respondent-response-type-spec/respondent-response-type-spec-page';
import ResponseConfirmDetails1v2Page from './lr-spec/response-confirm-details/response-confirm-details-1v2-page';
import ResponseConfirmDetailsPage from './lr-spec/response-confirm-details/response-confirm-details-page';
import ResponseConfirmNameAddress1v2FastPage from './lr-spec/response-confirm-name-address/response-confirm-name-address-1v2-fast-page';
import ResponseConfirmNameAddress1v2Page from './lr-spec/response-confirm-name-address/response-confirm-name-address-1v2-page ';
import ResponseConfirmNameAddressPage from './lr-spec/response-confirm-name-address/response-confirm-name-address-page';
import RespondentResponseType2v1SpecPage from './lr-spec/respondent-response-type-2v1-spec/respondent-response-type-2v1-spec-page';
import UploadDefendantResponseSpecPage from './lr-spec/upload-defendant-response-spec/upload-defendant-response-spec-page';
import Confirm1v2DSDefendantResponsePage from './unspec/confirm-defendant-response/confirm-1v2DS-defendant-response-page';
import ConfirmDefendantResponsePage from './unspec/confirm-defendant-response/confirm-defendant-response-page';
import ConfirmDetails1v2Page from './unspec/confirm-details/confirm-details-1v2-page';
import ConfirmDetailsPage from './unspec/confirm-details/confirm-details-page';
import RespondentResponseType1v2SSPage from './unspec/respondent-response-type/respondent-response-type-1v2SS-page';
import RespondentResponseType2v1Page from './unspec/respondent-response-type/respondent-response-type-2v1-page';
import RespondentResponseTypePage from './unspec/respondent-response-type/respondent-response-type-page';
import UploadDefendantResponsePage from './unspec/upload-defendant-response/upload-defendant-response-page';
import MediationContactInformationPage from '../mediation/mediation-contact-information/mediation-contact-information-page';
import MediationAvailabilityPage from '../mediation/mediation-availability/mediation-availability-page';
import WitnessesSpecPage from '../directions-questionaire/lr-spec/witnesses-spec/witnesses-spec-page';
import SolicitorReferencesDefendantResponsePage from './unspec/solicitor-references-defendant-response/solicitor-references-defendant-response-page';
import SolicitorReferenceFragment from '../../../fragments/solicitor-reference/solicitor-reference-fragment';
import WitnessesPage from '../directions-questionaire/common/witnesses/witnesses-page';
import DisclosureOfNonElectronicDocumentsPage from '../directions-questionaire/unspec/disclosure-of-non-electronic-documents/disclosure-of-non-electronic-documents-page';

export default class DefendantResponsePageFactory extends BasePageFactory {
  get respondentChecklistPage() {
    return new RespondentChecklistPage(this.page);
  }

  get confirmDetailsPage() {
    const dateFragment = new DateFragment(this.page);
    return new ConfirmDetailsPage(this.page, dateFragment);
  }

  get confirmDetails1v2Page() {
    const dateFragment = new DateFragment(this.page);
    return new ConfirmDetails1v2Page(this.page, dateFragment);
  }

  get responseConfirmNameAddressPage() {
    return new ResponseConfirmNameAddressPage(this.page);
  }

  get responseConfirmNameAddress1v2Page() {
    return new ResponseConfirmNameAddress1v2Page(this.page);
  }

  get responseConfirmNameAddress1v2FastPage() {
    return new ResponseConfirmNameAddress1v2FastPage(this.page);
  }

  get responseConfirmDetailsPage() {
    const dateFragment = new DateFragment(this.page);
    return new ResponseConfirmDetailsPage(this.page, dateFragment);
  }

  get responseConfirmDetails1v2Page() {
    const dateFragment = new DateFragment(this.page);
    return new ResponseConfirmDetails1v2Page(this.page, dateFragment);
  }

  get singleResponsePage() {
    return new SingleResponsePage(this.page);
  }

  get singleResponse2v1Page() {
    return new SingleResponse2v1Page(this.page);
  }

  get respondentResponseTypeDefendant1Page() {
    return new RespondentResponseTypePage(this.page, partys.DEFENDANT_1);
  }

  get respondentResponseTypeDefendant2Page() {
    return new RespondentResponseTypePage(this.page, partys.DEFENDANT_2);
  }

  get respondentResponseType1v2SSPage() {
    return new RespondentResponseType1v2SSPage(this.page);
  }

  get respondentResponseType2v1Page() {
    return new RespondentResponseType2v1Page(this.page);
  }

  get respondentResponseTypeSpecPage() {
    return new RespondentResponseTypeSpecPage(this.page);
  }

  get respondentResponseType1v2SpecPage() {
    return new RespondentResponseType1v2SpecPage(this.page);
  }

  get respondentResponseType2v1Spec() {
    return new RespondentResponseType2v1SpecPage(this.page);
  }

  get solicitorReferencesDefendantResponseDefendant1Page() {
    const solicitorReferenceFragment = new SolicitorReferenceFragment(
      this.page,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
    );
    return new SolicitorReferencesDefendantResponsePage(
      this.page,
      solicitorReferenceFragment,
      partys.DEFENDANT_1,
    );
  }

  get solicitorReferencesDefendantResponseDefendant2Page() {
    const solicitorReferenceFragment = new SolicitorReferenceFragment(
      this.page,
      partys.DEFENDANT_2,
      partys.DEFENDANT_SOLICITOR_2,
    );
    return new SolicitorReferencesDefendantResponsePage(
      this.page,
      solicitorReferenceFragment,
      partys.DEFENDANT_2,
    );
  }

  get defenceRouteDefendant1Page() {
    const dateFragment = new DateFragment(this.page);
    return new DefenceRouteDefendant1Page(this.page, dateFragment, partys.DEFENDANT_1);
  }

  get defenceRouteDefendant2Page() {
    const dateFragment = new DateFragment(this.page);
    return new DefenceRouteDefendant1Page(this.page, dateFragment, partys.DEFENDANT_2);
  }

  get uploadDefendantResponseDefendant1Page() {
    return new UploadDefendantResponsePage(this.page, partys.DEFENDANT_1);
  }

  get uploadDefendantResponseDefendant2Page() {
    return new UploadDefendantResponsePage(this.page, partys.DEFENDANT_2);
  }

  get uploadDefendantResponseSpecDefendant1Page() {
    return new UploadDefendantResponseSpecPage(this.page, partys.DEFENDANT_1);
  }

  get uploadDefendantResponseSpecDefendant2Page() {
    return new UploadDefendantResponseSpecPage(this.page, partys.DEFENDANT_2);
  }

  get howToAddTimelineDefendant1Page() {
    return new HowToAddTimelinePage(this.page, partys.DEFENDANT_1);
  }

  get howToAddTimelineDefendant2Page() {
    return new HowToAddTimelinePage(this.page, partys.DEFENDANT_2);
  }

  get howToAddTimelineManualDefendant1Page() {
    const dateFragment = new DateFragment(this.page);
    return new HowToAddTimelineManualPage(this.page, dateFragment, partys.DEFENDANT_1);
  }

  get howToAddTimelineManualDefendant2Page() {
    const dateFragment = new DateFragment(this.page);
    return new HowToAddTimelineManualPage(this.page, dateFragment, partys.DEFENDANT_2);
  }

  get howToAddTimelineUploadDefendant1Page() {
    return new HowToAddTimelineUploadPage(this.page, partys.DEFENDANT_1);
  }

  get howToAddTimelineUploadDefendant2Page() {
    return new HowToAddTimelineUploadPage(this.page, partys.DEFENDANT_2);
  }

  get mediationDefendant1Page() {
    return new MediationPage(this.page, partys.DEFENDANT_1);
  }

  get mediationDefendant2Page() {
    return new MediationPage(this.page, partys.DEFENDANT_2);
  }

  get mediationContactInformationDefendant1Page() {
    return new MediationContactInformationPage(
      this.page,
      partys.DEFENDANT_1,
      partys.DEFENDANT_1_MEDIATION_FRIEND,
    );
  }

  get mediationContactInformationDefendant2Page() {
    return new MediationContactInformationPage(
      this.page,
      partys.DEFENDANT_2,
      partys.DEFENDANT_2_MEDIATION_FRIEND,
    );
  }

  get mediationAvailabilityDefendant1Page() {
    const dateFragment = new DateFragment(this.page);
    return new MediationAvailabilityPage(
      this.page,
      dateFragment,
      partys.DEFENDANT_1_MEDIATION_FRIEND,
    );
  }

  get mediationAvailabilityDefendant2Page() {
    const dateFragment = new DateFragment(this.page);
    return new MediationAvailabilityPage(
      this.page,
      dateFragment,
      partys.DEFENDANT_2_MEDIATION_FRIEND,
    );
  }

  get fileDirectionsQuestionaireDefendant1Page() {
    return new FileDirectionsQuestionnairePage(this.page, partys.DEFENDANT_1);
  }

  get fileDirectionsQuestionaireDefendant2Page() {
    return new FileDirectionsQuestionnairePage(this.page, partys.DEFENDANT_2);
  }

  get fixedRecoverableCostsPageDefendant1() {
    return new FixedRecoverableCostsPage(this.page, partys.DEFENDANT_1);
  }

  get fixedRecoverableCostsPageDefendant2() {
    return new FixedRecoverableCostsPage(this.page, partys.DEFENDANT_2);
  }

  get disclosureOfElectronicDocumentsLRSpecDefendant1Page() {
    return new DisclosureOfElectronicDocumentsLRSpecPage(this.page, partys.DEFENDANT_1);
  }

  get disclosureOfElectronicDocumentsLRSpecDefendant2Page() {
    return new DisclosureOfElectronicDocumentsLRSpecPage(this.page, partys.DEFENDANT_2);
  }

  get disclosureOfNonElectronicDocumentsLRSpecDefendant1Page() {
    return new DisclosureOfNonElectronicDocumentsLRSpecPage(this.page, partys.DEFENDANT_1);
  }

  get disclosureOfNonElectronicDocumentsLRSpecDefendant2Page() {
    return new DisclosureOfNonElectronicDocumentsLRSpecPage(this.page, partys.DEFENDANT_2);
  }

  get disclosureOfNonElectronicDocumentsDefendant1Page() {
    return new DisclosureOfNonElectronicDocumentsPage(this.page, partys.DEFENDANT_1);
  }

  get disclosureOfNonElectronicDocumentsDefendant2Page() {
    return new DisclosureOfNonElectronicDocumentsPage(this.page, partys.DEFENDANT_2);
  }

  get disclosureReportDefendant1Page() {
    return new DisclosureReportPage(this.page, partys.DEFENDANT_1);
  }

  get disclosureReportDefendant2Page() {
    return new DisclosureReportPage(this.page, partys.DEFENDANT_2);
  }

  get smallClaimExpertsDefendant1Page() {
    return new SmallClaimExpertsPage(this.page, partys.DEFENDANT_1, partys.DEFENDANT_1_EXPERT_1);
  }

  get smallClaimExpertsDefendant2Page() {
    return new SmallClaimExpertsPage(this.page, partys.DEFENDANT_2, partys.DEFENDANT_2_EXPERT_1);
  }

  get expertsDefendant1Page() {
    return new ExpertPage(this.page, partys.DEFENDANT_1);
  }

  get expertsDefendant2Page() {
    return new ExpertPage(this.page, partys.DEFENDANT_2);
  }

  get smallClaimWitnessesDefendant1Page() {
    return new SmallClaimWitnessesDefendantPage(
      this.page,
      partys.DEFENDANT_1,
      partys.DEFENDANT_1_WITNESS_1,
    );
  }

  get smallClaimWitnessesDefendant2Page() {
    return new SmallClaimWitnessesDefendantPage(
      this.page,
      partys.DEFENDANT_2,
      partys.DEFENDANT_2_WITNESS_1,
    );
  }

  get witnessesSpecDefendant1Page() {
    return new WitnessesSpecPage(this.page, partys.DEFENDANT_1);
  }

  get witnessesSpecDefendant2Page() {
    return new WitnessesSpecPage(this.page, partys.DEFENDANT_2);
  }

  get witnessesDefendant1Page() {
    return new WitnessesPage(this.page, partys.DEFENDANT_1);
  }

  get witnessesDefendant2Page() {
    return new WitnessesPage(this.page, partys.DEFENDANT_2);
  }

  get languageDefendant1Page() {
    return new LanguagePage(this.page, partys.DEFENDANT_1);
  }

  get languageDefendant2Page() {
    return new LanguagePage(this.page, partys.DEFENDANT_2);
  }

  get hearingDefendant1Page() {
    const dateFragment = new DateFragment(this.page);
    return new HearingPage(this.page, dateFragment, partys.DEFENDANT_1);
  }

  get hearingDefendant2Page() {
    const dateFragment = new DateFragment(this.page);
    return new HearingPage(this.page, dateFragment, partys.DEFENDANT_2);
  }

  get smallClaimHearingDefendant1Page() {
    const dateFragment = new DateFragment(this.page);
    return new SmallClaimHearingPage(this.page, dateFragment, partys.DEFENDANT_1);
  }

  get smallClaimHearingDefendant2Page() {
    const dateFragment = new DateFragment(this.page);
    return new SmallClaimHearingPage(this.page, dateFragment, partys.DEFENDANT_2);
  }

  get hearingLRSpecDefendant1Page() {
    const dateFragment = new DateFragment(this.page);
    return new HearingLRSpecPage(this.page, dateFragment, partys.DEFENDANT_1);
  }

  get hearingLRSpecDefendant2Page() {
    const dateFragment = new DateFragment(this.page);
    return new HearingLRSpecPage(this.page, dateFragment, partys.DEFENDANT_2);
  }

  get draftDirectionsDefendant1Page() {
    return new DraftDirectionsPage(this.page, partys.DEFENDANT_1);
  }

  get draftDirectionsDefendant2Page() {
    return new DraftDirectionsPage(this.page, partys.DEFENDANT_2);
  }

  get requestedCourtDefendant1Page() {
    const remoteHearingFragment = new RemoteHearingFragment(this.page, partys.DEFENDANT_1);
    return new RequestedCourtPage(this.page, remoteHearingFragment, partys.DEFENDANT_1);
  }

  get requestedCourtDefendant2Page() {
    const remoteHearingFragment = new RemoteHearingFragment(this.page, partys.DEFENDANT_2);
    return new RequestedCourtPage(this.page, remoteHearingFragment, partys.DEFENDANT_2);
  }

  get requestedCourtLRSpecDefendant1Page() {
    const remoteHearingSpecFragment = new RemoteHearingSpecFragment(this.page, partys.DEFENDANT_1);
    return new RequestedCourtLRSpecPage(this.page, remoteHearingSpecFragment, partys.DEFENDANT_1);
  }

  get requestedCourtLRSpecDefendant2Page() {
    const remoteHearingSpecFragment = new RemoteHearingSpecFragment(this.page, partys.DEFENDANT_2);
    return new RequestedCourtLRSpecPage(this.page, remoteHearingSpecFragment, partys.DEFENDANT_2);
  }

  get hearingSupportDefendant1Page() {
    return new HearingSupportPage(this.page, partys.DEFENDANT_1);
  }

  get hearingSupportDefendant2Page() {
    return new HearingSupportPage(this.page, partys.DEFENDANT_2);
  }

  get vulnerabilityQuestionsDefendant1Page() {
    return new VulnerabilityQuestionsPage(this.page, partys.DEFENDANT_1);
  }

  get vulnerabilityQuestionsDefendant2Page() {
    return new VulnerabilityQuestionsPage(this.page, partys.DEFENDANT_2);
  }

  get vulnerabilityQuestionsSpecDefendant1Page() {
    return new VulnerabilityQuestionsSpecPage(this.page, partys.DEFENDANT_1);
  }

  get vulnerabilityQuestionsSpecDefendant2Page() {
    return new VulnerabilityQuestionsSpecPage(this.page, partys.DEFENDANT_2);
  }

  get furtherInformationDefendant1Page() {
    return new FurtherInformationPage(this.page, partys.DEFENDANT_1);
  }

  get furtherInformationDefendant2Page() {
    return new FurtherInformationPage(this.page, partys.DEFENDANT_2);
  }

  get applicationDefendant1Page() {
    return new ApplicationPage(this.page, partys.DEFENDANT_1);
  }

  get applicationDefendant2Page() {
    return new ApplicationPage(this.page, partys.DEFENDANT_2);
  }

  get statementOfTruthDefendantResponseDefendant1Page() {
    const statementofTruthFragment = new StatementOfTruthFragment(
      this.page,
      partys.DEFENDANT_SOLICITOR_1,
    );
    return new StatmentOfTruthDefendantResponsePage(this.page, statementofTruthFragment);
  }

  get statementOfTruthDefendantResponseDefendant2Page() {
    const statementofTruthFragment = new StatementOfTruthFragment(
      this.page,
      partys.DEFENDANT_SOLICITOR_2,
    );
    return new StatmentOfTruthDefendantResponsePage(this.page, statementofTruthFragment);
  }

  get submitDefendantResponsePage() {
    return new SubmitDefendantResponsePage(this.page);
  }

  get confirmDefendantResponsePage() {
    return new ConfirmDefendantResponsePage(this.page);
  }

  get confirm1v2DSDefendantResponsePage() {
    return new Confirm1v2DSDefendantResponsePage(this.page);
  }

  get confirmDefendantResponseSpecPage() {
    return new ConfirmDefendantResponseSpecPage(this.page);
  }

  get confirm1v2SSDefendantResponseSpecPage() {
    return new Confirm1v2SSDefendantResponseSpecPage(this.page);
  }
}
