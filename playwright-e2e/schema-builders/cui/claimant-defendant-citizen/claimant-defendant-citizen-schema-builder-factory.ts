import BaseSchemaBuilderFactory from '../../../base/base-schema-builder-factory';
import QueryManagementRaiseLipSchemaBuilder from '../common/query-management-raise/query-management-raise-schema-builder';
import ClaimantResponseCuiSchemaBuilder from './claimant-response-cui/claimant-response-cui-schema-builder';
import CreateClaimSpecAfterPaymentLipSchemaBuilder from './create-claim-spec-after-payment-lip/create-claim-spec-after-payment-lip-schema-builder';
import CreateLipClaimSchemaBuilder from './create-lip-claim/create-lip-claim-schema-builder';
import DefendantResponseCuiSchemaBuilder from './defendant-response-cui/defendant-response-cui-schema-builder';
import EvidenceUploadApplicantLipSchemaBuilder from './evidence-upload-applicant-lip/evidence-upload-applicant-lip-schema-builder';
import EvidenceUploadRespondentLipSchemaBuilder from './evidence-upload-respondent-lip/evidence-upload-respondent-lip-schema-builder';
import RequestForReconsiderationLipSchemaBuilder from './request-for-reconsideration-lip/request-for-reconsideration-lip-schema-builder';
import TrailReadinessLipSchemaBuilder from './trail-readiness-lip/trail-readiness-lip-schema-builder';

export default class ClaimantDefendantCitizenSchemaBuilderFactory extends BaseSchemaBuilderFactory {
  get createLipClaimSchemaBuilder() {
    return new CreateLipClaimSchemaBuilder(this.testData);
  }

  get createClaimSpecAfterPaymentLipSchemaBuilder() {
    return new CreateClaimSpecAfterPaymentLipSchemaBuilder(this.testData);
  }

  get defendantResponseCuiSchemaBuilder() {
    return new DefendantResponseCuiSchemaBuilder(this.testData);
  }

  get claimantResponseCuiSchemaBuilder() {
    return new ClaimantResponseCuiSchemaBuilder(this.testData);
  }

  get evidenceUploadApplicantLipSchemaBuilder() {
    return new EvidenceUploadApplicantLipSchemaBuilder(this.testData);
  }

  get evidenceUploadRespondentLipSchemaBuilder() {
    return new EvidenceUploadRespondentLipSchemaBuilder(this.testData);
  }

  get trailReadinessLipSchemaBuilder() {
    return new TrailReadinessLipSchemaBuilder(this.testData);
  }

  get requestForReconsiderationLipSchemaBuilder() {
    return new RequestForReconsiderationLipSchemaBuilder(this.testData);
  }

  get queryManagementRaiseLipSchemaBuilder() {
    return new QueryManagementRaiseLipSchemaBuilder(this.testData)
  }
}
