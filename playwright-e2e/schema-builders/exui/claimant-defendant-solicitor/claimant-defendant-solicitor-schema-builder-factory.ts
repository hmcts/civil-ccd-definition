import BaseSchemaBuilderFactory from '../../../base/base-schema-builder-factory';
import AcknowledgeClaimSchemaBuilder from './acknowledge-claim/unspec/acknowledge-claim-schema-builder';
import AddDefendantLitigationFriendSchemaBuilder from './add-defendant-litigation-friend/unspec/add-defendant-litigation-friend-schema-builder';
import AddOrAmendClaimDocumentsSchemaBuilder from './add-or-amend-claim-documents/unspec/add-or-amend-claim-documents-schema-builder';
import ClaimantResponseSchemaBuilder from './claimant-response/unspec/claimant-response-schema-builder';
import ClaimantResponseSpecSchemaBuilder from './claimant-response/lr-spec/claimant-response-spec-schema-builder';
import CreateClaimSpecAfterPaymentSchemaBuilder from './create-claim-after-payment/lr-spec/create-claim-spec-after-payment-schema-builder';
import CreateClaimAfterPaymentSchemaBuilder from './create-claim-after-payment/unspec/create-claim-after-payment-schema-builder';
import CreateClaimSpecSchemaBuilder from './create-claim/lr-spec/create-claim-spec-schema-builder';
import CreateClaimSchemaBuilder from './create-claim/unspec/create-claim-schema-builder';
import DefaultJudgementSpecSchemaBuilder from './default-judgement/lr-spec/default-judgement-spec-schema-builder';
import DefaultJudgementSchemaBuilder from './default-judgement/unspec/default-judgement-schema-builder';
import DefendantResponseSchemaBuilder from './defendant-response/unspec/defendant-response-schema-builder';
import DefendantResponseSpecSchemaBuilder from './defendant-response/lr-spec/defendant-response-spec-schema-builder';
import DiscontinueClaimSchemaBuilder from './discontinue-claim/lr-spec/discontinue-claim-schema-builder';
import EvidenceUploadApplicantSchemaBuilder from './evidence-upload-applicant/unspec/evidence-upload-applicant-schema-builder';
import EvidenceUploadRespondentSchemaBuilder from './evidence-upload-respondent/unspec/evidence-upload-respondent-schema-builder';
import InformAgreedExtensionDateSchemaBuilder from './inform-agreed-extension-date/unspec/inform-agreed-extension-date-schema-builder';
import InformAgreedExtensionDateSpecSchemaBuilder from './inform-agreed-extension-date/lr-spec/inform-agreed-extension-date-spec-schema-builder';
import InitiateGeneralApplicationGaSchemaBuilder from '../../ga-exui/initiate-general-application-ga/initiate-general-application-ga-schema-builder';
import JudgmentPaidInFullSchemaBuilder from './judgment-paid-in-full/lr-spec/judgment-paid-in-full-schema-builder';
import ManageContactInformationSchemaBuilder from '../common/manage-contact-information/manage-contact-information-schema-builder';
import NoticeOfChangeSchemaBuilder from './notice-of-change/notice-of-change-schema-builder';
import NotifyClaimSchemaBuilder from './notify-claim/unspec/notify-claim-schema-builder';
import NotifyClaimDetailsSchemaBuilder from './notify-claim-details/unspec/notify-claim-details-schema-builder';
import SettleClaimSchemaBuilder from './settle-claim/lr-spec/settle-claim-schema-builder';
import RequestForReconsiderationSchemaBuilder from './request-for-reconsideration/lr-spec/request-for-reconsideration-schema-builder';
import UploadMediationDocumentsSchemaBuilder from './upload-mediation-documents/lr-spec/upload-mediation-documents-schema-builder';
import TrialReadinessSchemaBuilder from './trial-readiness/trial-readiness-schema-builder';
import InitiateGeneralApplicationSchemaBuilder from './initiate-general-application/initiate-general-application-schema-builder';

export default class ClaimantDefendantSolicitorSchemaBuilderFactory extends BaseSchemaBuilderFactory {
  get createClaimSchemaBuilder() {
    return new CreateClaimSchemaBuilder(this.testData);
  }

  get createClaimAfterPaymentSchemaBuilder() {
    return new CreateClaimAfterPaymentSchemaBuilder(this.testData);
  }

  get createClaimSpecAfterPaymentSchemaBuilder() {
    return new CreateClaimSpecAfterPaymentSchemaBuilder(this.testData);
  }

  get acknowledgeClaimSchemaBuilder() {
    return new AcknowledgeClaimSchemaBuilder(this.testData);
  }

  get addOrAmendClaimDocumentsSchemaBuilder() {
    return new AddOrAmendClaimDocumentsSchemaBuilder(this.testData);
  }

  get addDefendantLitigationFriendSchemaBuilder() {
    return new AddDefendantLitigationFriendSchemaBuilder(this.testData);
  }

  get notifyClaimSchemaBuilder() {
    return new NotifyClaimSchemaBuilder(this.testData);
  }

  get notifyClaimDetailsSchemaBuilder() {
    return new NotifyClaimDetailsSchemaBuilder(this.testData);
  }

  get createClaimSpecSchemaBuilder() {
    return new CreateClaimSpecSchemaBuilder(this.testData);
  }

  get defendantResponseSpecSchemaBuilder() {
    return new DefendantResponseSpecSchemaBuilder(this.testData);
  }

  get defendantResponseSchemaBuilder() {
    return new DefendantResponseSchemaBuilder(this.testData);
  }

  get evidenceUploadApplicantSchemaBuilder() {
    return new EvidenceUploadApplicantSchemaBuilder(this.testData);
  }

  get evidenceUploadRespondentSchemaBuilder() {
    return new EvidenceUploadRespondentSchemaBuilder(this.testData);
  }

  get claimantResponseSpecSchemaBuilder() {
    return new ClaimantResponseSpecSchemaBuilder(this.testData);
  }

  get claimantResponseSchemaBuilder() {
    return new ClaimantResponseSchemaBuilder(this.testData);
  }

  get defaultJudgementSchemaBuilder() {
    return new DefaultJudgementSchemaBuilder(this.testData);
  }

  get defaultJudgementSpecSchemaBuilder() {
    return new DefaultJudgementSpecSchemaBuilder(this.testData);
  }

  get judgmentPaidInFullSchemaBuilder() {
    return new JudgmentPaidInFullSchemaBuilder(this.testData);
  }

  get informAgreedExtensionDateSchemaBuilder() {
    return new InformAgreedExtensionDateSchemaBuilder(this.testData);
  }

  get informAgreedExtensionDateSpecSchemaBuilder() {
    return new InformAgreedExtensionDateSpecSchemaBuilder(this.testData);
  }

  get initiateGeneralApplicationSchemaBuilder() {
    return new InitiateGeneralApplicationSchemaBuilder(this.testData);
  }

  get initiateGeneralApplicationGaSchemaBuilder() {
    return new InitiateGeneralApplicationGaSchemaBuilder(this.testData);
  }

  get manageContactInformationSchemaBuilder() {
    return new ManageContactInformationSchemaBuilder(this.testData);
  }

  get noticeOfChangeSchemaBuilder() {
    return new NoticeOfChangeSchemaBuilder(this.testData);
  }

  get uploadMediationDocumentsSchemaBuilder() {
    return new UploadMediationDocumentsSchemaBuilder(this.testData);
  }

  get trialReadinessSchemaBuilder() {
    return new TrialReadinessSchemaBuilder(this.testData);
  }
  
  get settleClaimSchemaBuilder() {
    return new SettleClaimSchemaBuilder(this.testData);
  }

  get discontinueClaimSchemaBuilder() {
    return new DiscontinueClaimSchemaBuilder(this.testData);
  }

  get requestForReconsiderationSchemaBuilder() {
    return new RequestForReconsiderationSchemaBuilder(this.testData);
  }
}
