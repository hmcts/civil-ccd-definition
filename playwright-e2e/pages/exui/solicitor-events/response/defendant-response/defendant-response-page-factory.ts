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
import DisclosureOfElectronicDocumentsLRSpecPage from '../directions-questionaire/lr-spec/disclosure-of-electronic-documents-lr-spec/disclosure-of-electronic-documents-lr-spec-page';
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
import DefenceRouteDefendantSolicitor1Page from './lr-spec/defence-route/defence-route-page';
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

  get confirmDetailsDefendantSolicitor1Page() {
    const dateFragment = new DateFragment(this.page);
    return new ConfirmDetailsPage(
      this.page,
      dateFragment,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
    );
  }

  get confirmDetailsDefendantSolicitor2Page() {
    const dateFragment = new DateFragment(this.page);
    return new ConfirmDetailsPage(
      this.page,
      dateFragment,
      partys.DEFENDANT_2,
      partys.DEFENDANT_SOLICITOR_2,
    );
  }

  get confirmDetails1v2Page() {
    const dateFragment = new DateFragment(this.page);
    return new ConfirmDetails1v2Page(this.page, dateFragment);
  }

  get responseConfirmNameAddressDefendantSolicitor1Page() {
    return new ResponseConfirmNameAddressPage(
      this.page,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
    );
  }

  get responseConfirmNameAddressDefendantSolicitor2Page() {
    return new ResponseConfirmNameAddressPage(
      this.page,
      partys.DEFENDANT_2,
      partys.DEFENDANT_SOLICITOR_2,
    );
  }

  get responseConfirmNameAddress1v2Page() {
    return new ResponseConfirmNameAddress1v2Page(this.page);
  }

  get responseConfirmNameAddress1v2FastPage() {
    return new ResponseConfirmNameAddress1v2FastPage(this.page);
  }

  get responseConfirmDetailsDefendantSolicitor1Page() {
    const solicitorReferenceFragment = new SolicitorReferenceFragment(
      this.page,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
    );
    const dateFragment = new DateFragment(this.page);
    return new ResponseConfirmDetailsPage(
      this.page,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
      solicitorReferenceFragment,
      dateFragment,
    );
  }

  get responseConfirmDetailsDefendantSolicitor2Page() {
    const solicitorReferenceFragment = new SolicitorReferenceFragment(
      this.page,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
    );
    const dateFragment = new DateFragment(this.page);
    return new ResponseConfirmDetailsPage(
      this.page,
      partys.DEFENDANT_2,
      partys.DEFENDANT_SOLICITOR_2,
      solicitorReferenceFragment,
      dateFragment,
    );
  }

  get responseConfirmDetails1v2Page() {
    const solicitorReferenceFragment = new SolicitorReferenceFragment(
      this.page,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
    );
    const dateFragment = new DateFragment(this.page);
    return new ResponseConfirmDetails1v2Page(this.page, solicitorReferenceFragment, dateFragment);
  }

  get singleResponsePage() {
    return new SingleResponsePage(this.page);
  }

  get singleResponse2v1Page() {
    return new SingleResponse2v1Page(this.page);
  }

  get respondentResponseTypeDefendantSolicitor1Page() {
    return new RespondentResponseTypePage(
      this.page,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
    );
  }

  get respondentResponseTypeDefendantSolicitor2Page() {
    return new RespondentResponseTypePage(
      this.page,
      partys.DEFENDANT_2,
      partys.DEFENDANT_SOLICITOR_2,
    );
  }

  get respondentResponseType1v2SSPage() {
    return new RespondentResponseType1v2SSPage(this.page);
  }

  get respondentResponseType2v1Page() {
    return new RespondentResponseType2v1Page(this.page);
  }

  get respondentResponseTypeSpecDefendantSolicitor1Page() {
    return new RespondentResponseTypeSpecPage(
      this.page,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
    );
  }

  get respondentResponseTypeSpecDefendantSolicitor2Page() {
    return new RespondentResponseTypeSpecPage(
      this.page,
      partys.DEFENDANT_2,
      partys.DEFENDANT_SOLICITOR_2,
    );
  }

  get respondentResponseType1v2SpecPage() {
    return new RespondentResponseType1v2SpecPage(this.page);
  }

  get respondentResponseType2v1SpecPage() {
    return new RespondentResponseType2v1SpecPage(this.page);
  }

  get solicitorReferencesDefendantResponseDefendantSolicitor1Page() {
    const solicitorReferenceFragment = new SolicitorReferenceFragment(
      this.page,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
    );
    return new SolicitorReferencesDefendantResponsePage(
      this.page,
      solicitorReferenceFragment,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
    );
  }

  get solicitorReferencesDefendantResponseDefendantSolicitor2Page() {
    const solicitorReferenceFragment = new SolicitorReferenceFragment(
      this.page,
      partys.DEFENDANT_2,
      partys.DEFENDANT_SOLICITOR_2,
    );
    return new SolicitorReferencesDefendantResponsePage(
      this.page,
      solicitorReferenceFragment,
      partys.DEFENDANT_2,
      partys.DEFENDANT_SOLICITOR_2,
    );
  }

  get defenceRouteDefendantSolicitor1Page() {
    const dateFragment = new DateFragment(this.page);
    return new DefenceRouteDefendantSolicitor1Page(
      this.page,
      dateFragment,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
    );
  }

  get defenceRouteDefendantSolicitor2Page() {
    const dateFragment = new DateFragment(this.page);
    return new DefenceRouteDefendantSolicitor1Page(
      this.page,
      dateFragment,
      partys.DEFENDANT_2,
      partys.DEFENDANT_SOLICITOR_2,
    );
  }

  get uploadDefendantResponseDefendantSolicitor1Page() {
    return new UploadDefendantResponsePage(
      this.page,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
    );
  }

  get uploadDefendantResponseDefendantSolicitor2Page() {
    return new UploadDefendantResponsePage(
      this.page,
      partys.DEFENDANT_2,
      partys.DEFENDANT_SOLICITOR_2,
    );
  }

  get uploadDefendantResponseSpecDefendantSolicitor1Page() {
    return new UploadDefendantResponseSpecPage(
      this.page,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
    );
  }

  get uploadDefendantResponseSpecDefendantSolicitor2Page() {
    return new UploadDefendantResponseSpecPage(
      this.page,
      partys.DEFENDANT_2,
      partys.DEFENDANT_SOLICITOR_2,
    );
  }

  get howToAddTimelineDefendantSolicitor1Page() {
    return new HowToAddTimelinePage(this.page, partys.DEFENDANT_1, partys.DEFENDANT_SOLICITOR_1);
  }

  get howToAddTimelineDefendantSolicitor2Page() {
    return new HowToAddTimelinePage(this.page, partys.DEFENDANT_2, partys.DEFENDANT_SOLICITOR_2);
  }

  get howToAddTimelineManualDefendantSolicitor1Page() {
    const dateFragment = new DateFragment(this.page);
    return new HowToAddTimelineManualPage(
      this.page,
      dateFragment,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
    );
  }

  get howToAddTimelineManualDefendantSolicitor2Page() {
    const dateFragment = new DateFragment(this.page);
    return new HowToAddTimelineManualPage(
      this.page,
      dateFragment,
      partys.DEFENDANT_2,
      partys.DEFENDANT_SOLICITOR_2,
    );
  }

  get howToAddTimelineUploadDefendantSolicitor1Page() {
    return new HowToAddTimelineUploadPage(
      this.page,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
    );
  }

  get howToAddTimelineUploadDefendantSolicitor2Page() {
    return new HowToAddTimelineUploadPage(
      this.page,
      partys.DEFENDANT_2,
      partys.DEFENDANT_SOLICITOR_2,
    );
  }

  get mediationDefendantSolicitor1Page() {
    return new MediationPage(this.page, partys.DEFENDANT_1, partys.DEFENDANT_SOLICITOR_1);
  }

  get mediationDefendantSolicitor2Page() {
    return new MediationPage(this.page, partys.DEFENDANT_2, partys.DEFENDANT_SOLICITOR_2);
  }

  get mediationContactInformationDefendantSolicitor1Page() {
    return new MediationContactInformationPage(
      this.page,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
      partys.DEFENDANT_1_MEDIATION_FRIEND,
    );
  }

  get mediationContactInformationDefendantSolicitor2Page() {
    return new MediationContactInformationPage(
      this.page,
      partys.DEFENDANT_2,
      partys.DEFENDANT_SOLICITOR_2,
      partys.DEFENDANT_2_MEDIATION_FRIEND,
    );
  }

  get mediationAvailabilityDefendantSolicitor1Page() {
    const dateFragment = new DateFragment(this.page);
    return new MediationAvailabilityPage(
      this.page,
      dateFragment,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
    );
  }

  get mediationAvailabilityDefendantSolicitor2Page() {
    const dateFragment = new DateFragment(this.page);
    return new MediationAvailabilityPage(
      this.page,
      dateFragment,
      partys.DEFENDANT_2,
      partys.DEFENDANT_SOLICITOR_2,
    );
  }

  get fileDirectionsQuestionaireDefendantSolicitor1Page() {
    return new FileDirectionsQuestionnairePage(
      this.page,
      partys.DEFENDANT_SOLICITOR_1,
      partys.DEFENDANT_1,
    );
  }

  get fileDirectionsQuestionaireDefendantSolicitor2Page() {
    return new FileDirectionsQuestionnairePage(
      this.page,
      partys.DEFENDANT_SOLICITOR_2,
      partys.DEFENDANT_2,
    );
  }

  get fixedRecoverableCostsPageDefendantSolicitor1() {
    return new FixedRecoverableCostsPage(
      this.page,
      partys.DEFENDANT_SOLICITOR_1,
      partys.DEFENDANT_1,
    );
  }

  get fixedRecoverableCostsPageDefendantSolicitor2() {
    return new FixedRecoverableCostsPage(
      this.page,
      partys.DEFENDANT_SOLICITOR_2,
      partys.DEFENDANT_2,
    );
  }

  get disclosureOfElectronicDocumentsLRSpecDefendantSolicitor1Page() {
    return new DisclosureOfElectronicDocumentsLRSpecPage(
      this.page,
      partys.DEFENDANT_SOLICITOR_1,
      partys.DEFENDANT_1,
    );
  }

  get disclosureOfElectronicDocumentsLRSpecDefendantSolicitor2Page() {
    return new DisclosureOfElectronicDocumentsLRSpecPage(
      this.page,
      partys.DEFENDANT_SOLICITOR_2,
      partys.DEFENDANT_2,
    );
  }

  get disclosureOfNonElectronicDocumentsLRSpecDefendantSolicitor1Page() {
    return new DisclosureOfNonElectronicDocumentsLRSpecPage(
      this.page,
      partys.DEFENDANT_SOLICITOR_1,
      partys.DEFENDANT_1,
    );
  }

  get disclosureOfNonElectronicDocumentsLRSpecDefendantSolicitor2Page() {
    return new DisclosureOfNonElectronicDocumentsLRSpecPage(
      this.page,
      partys.DEFENDANT_SOLICITOR_2,
      partys.DEFENDANT_2,
    );
  }

  get disclosureOfNonElectronicDocumentsDefendantSolicitor1Page() {
    return new DisclosureOfNonElectronicDocumentsPage(
      this.page,
      partys.DEFENDANT_SOLICITOR_1,
      partys.DEFENDANT_1,
    );
  }

  get disclosureOfNonElectronicDocumentsDefendantSolicitor2Page() {
    return new DisclosureOfNonElectronicDocumentsPage(
      this.page,
      partys.DEFENDANT_SOLICITOR_2,
      partys.DEFENDANT_2,
    );
  }

  get disclosureReportDefendantSolicitor1Page() {
    return new DisclosureReportPage(this.page, partys.DEFENDANT_1, partys.DEFENDANT_SOLICITOR_1);
  }

  get disclosureReportDefendantSolicitor2Page() {
    return new DisclosureReportPage(this.page, partys.DEFENDANT_2, partys.DEFENDANT_SOLICITOR_2);
  }

  get smallClaimExpertsDefendantSolicitor1Page() {
    return new SmallClaimExpertsPage(
      this.page,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
      partys.DEFENDANT_1_EXPERT_1,
    );
  }

  get smallClaimExpertsDefendantSolicitor2Page() {
    return new SmallClaimExpertsPage(
      this.page,
      partys.DEFENDANT_2,
      partys.DEFENDANT_SOLICITOR_2,
      partys.DEFENDANT_2_EXPERT_1,
    );
  }

  get expertsDefendantSolicitor1Page() {
    return new ExpertPage(
      this.page,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
      partys.DEFENDANT_1_EXPERT_1,
    );
  }

  get expertsDefendantSolicitor2Page() {
    return new ExpertPage(
      this.page,
      partys.DEFENDANT_2,
      partys.DEFENDANT_SOLICITOR_2,
      partys.DEFENDANT_1_EXPERT_2,
    );
  }

  get smallClaimWitnessesDefendantSolicitor1Page() {
    return new SmallClaimWitnessesDefendantPage(
      this.page,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
      partys.DEFENDANT_1_WITNESS_1,
    );
  }

  get smallClaimWitnessesDefendantSolicitor2Page() {
    return new SmallClaimWitnessesDefendantPage(
      this.page,
      partys.DEFENDANT_2,
      partys.DEFENDANT_SOLICITOR_2,
      partys.DEFENDANT_2_WITNESS_1,
    );
  }

  get witnessesSpecDefendantSolicitor1Page() {
    return new WitnessesSpecPage(
      this.page,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
      partys.DEFENDANT_1_WITNESS_1,
    );
  }

  get witnessesSpecDefendantSolicitor2Page() {
    return new WitnessesSpecPage(
      this.page,
      partys.DEFENDANT_2,
      partys.DEFENDANT_SOLICITOR_2,
      partys.DEFENDANT_1_WITNESS_2,
    );
  }

  get witnessesDefendantSolicitor1Page() {
    return new WitnessesPage(
      this.page,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
      partys.DEFENDANT_1_WITNESS_1,
    );
  }

  get witnessesDefendantSolicitor2Page() {
    return new WitnessesPage(
      this.page,
      partys.DEFENDANT_2,
      partys.DEFENDANT_SOLICITOR_2,
      partys.DEFENDANT_1_WITNESS_2,
    );
  }

  get languageDefendantSolicitor1Page() {
    return new LanguagePage(this.page, partys.DEFENDANT_1, partys.DEFENDANT_SOLICITOR_1);
  }

  get languageDefendantSolicitor2Page() {
    return new LanguagePage(this.page, partys.DEFENDANT_2, partys.DEFENDANT_SOLICITOR_2);
  }

  get hearingDefendantSolicitor1Page() {
    const dateFragment = new DateFragment(this.page);
    return new HearingPage(
      this.page,
      dateFragment,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
    );
  }

  get hearingDefendantSolicitor2Page() {
    const dateFragment = new DateFragment(this.page);
    return new HearingPage(
      this.page,
      dateFragment,
      partys.DEFENDANT_2,
      partys.DEFENDANT_SOLICITOR_2,
    );
  }

  get smallClaimHearingDefendantSolicitor1Page() {
    const dateFragment = new DateFragment(this.page);
    return new SmallClaimHearingPage(
      this.page,
      dateFragment,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
    );
  }

  get smallClaimHearingDefendantSolicitor2Page() {
    const dateFragment = new DateFragment(this.page);
    return new SmallClaimHearingPage(
      this.page,
      dateFragment,
      partys.DEFENDANT_2,
      partys.DEFENDANT_SOLICITOR_2,
    );
  }

  get hearingLRSpecDefendantSolicitor1Page() {
    const dateFragment = new DateFragment(this.page);
    return new HearingLRSpecPage(
      this.page,
      dateFragment,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
    );
  }

  get hearingLRSpecDefendantSolicitor2Page() {
    const dateFragment = new DateFragment(this.page);
    return new HearingLRSpecPage(
      this.page,
      dateFragment,
      partys.DEFENDANT_2,
      partys.DEFENDANT_SOLICITOR_2,
    );
  }

  get draftDirectionsDefendantSolicitor1Page() {
    return new DraftDirectionsPage(this.page, partys.DEFENDANT_1, partys.DEFENDANT_SOLICITOR_1);
  }

  get draftDirectionsDefendantSolicitor2Page() {
    return new DraftDirectionsPage(this.page, partys.DEFENDANT_2, partys.DEFENDANT_SOLICITOR_2);
  }

  get requestedCourtDefendantSolicitor1Page() {
    const remoteHearingFragment = new RemoteHearingFragment(this.page, partys.DEFENDANT_1);
    return new RequestedCourtPage(
      this.page,
      remoteHearingFragment,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
    );
  }

  get requestedCourtDefendantSolicitor2Page() {
    const remoteHearingFragment = new RemoteHearingFragment(this.page, partys.DEFENDANT_2);
    return new RequestedCourtPage(
      this.page,
      remoteHearingFragment,
      partys.DEFENDANT_2,
      partys.DEFENDANT_SOLICITOR_2,
    );
  }

  get requestedCourtLRSpecDefendantSolicitor1Page() {
    const remoteHearingSpecFragment = new RemoteHearingSpecFragment(this.page, partys.DEFENDANT_1);
    return new RequestedCourtLRSpecPage(
      this.page,
      remoteHearingSpecFragment,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
    );
  }

  get requestedCourtLRSpecDefendantSolicitor2Page() {
    const remoteHearingSpecFragment = new RemoteHearingSpecFragment(this.page, partys.DEFENDANT_2);
    return new RequestedCourtLRSpecPage(
      this.page,
      remoteHearingSpecFragment,
      partys.DEFENDANT_2,
      partys.DEFENDANT_SOLICITOR_2,
    );
  }

  get hearingSupportDefendantSolicitor1Page() {
    return new HearingSupportPage(this.page, partys.DEFENDANT_1, partys.DEFENDANT_SOLICITOR_1);
  }

  get hearingSupportDefendantSolicitor2Page() {
    return new HearingSupportPage(this.page, partys.DEFENDANT_2, partys.DEFENDANT_SOLICITOR_2);
  }

  get vulnerabilityQuestionsDefendantSolicitor1Page() {
    return new VulnerabilityQuestionsPage(
      this.page,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
    );
  }

  get vulnerabilityQuestionsDefendantSolicitor2Page() {
    return new VulnerabilityQuestionsPage(
      this.page,
      partys.DEFENDANT_2,
      partys.DEFENDANT_SOLICITOR_2,
    );
  }

  get vulnerabilityQuestionsSpecDefendantSolicitor1Page() {
    return new VulnerabilityQuestionsSpecPage(
      this.page,
      partys.DEFENDANT_1,
      partys.DEFENDANT_SOLICITOR_1,
    );
  }

  get vulnerabilityQuestionsSpecDefendantSolicitor2Page() {
    return new VulnerabilityQuestionsSpecPage(
      this.page,
      partys.DEFENDANT_2,
      partys.DEFENDANT_SOLICITOR_2,
    );
  }

  get furtherInformationDefendantSolicitor1Page() {
    return new FurtherInformationPage(this.page, partys.DEFENDANT_1, partys.DEFENDANT_SOLICITOR_1);
  }

  get furtherInformationDefendantSolicitor2Page() {
    return new FurtherInformationPage(this.page, partys.DEFENDANT_2, partys.DEFENDANT_SOLICITOR_2);
  }

  get applicationDefendantSolicitor1Page() {
    return new ApplicationPage(this.page, partys.DEFENDANT_1, partys.DEFENDANT_SOLICITOR_1);
  }

  get applicationDefendantSolicitor2Page() {
    return new ApplicationPage(this.page, partys.DEFENDANT_2, partys.DEFENDANT_SOLICITOR_2);
  }

  get statementOfTruthDefendantResponseDefendantSolicitor1Page() {
    const statementofTruthFragment = new StatementOfTruthFragment(
      this.page,
      partys.DEFENDANT_SOLICITOR_1,
    );
    return new StatmentOfTruthDefendantResponsePage(this.page, statementofTruthFragment);
  }

  get statementOfTruthDefendantResponseDefendantSolicitor2Page() {
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
