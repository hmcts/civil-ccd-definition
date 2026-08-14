import BaseSchemaBuilderFactory from '../../../base/base-schema-builder-factory';
import ClaimantResponseCuiSchemaBuilder from './claimant-response-cui/claimant-response-cui-schema-builder';
import CreateClaimSpecAfterPaymentLipSchemaBuilder from './create-claim-spec-after-payment-lip/create-claim-spec-after-payment-lip-schema-builder';
import CreateLipClaimSchemaBuilder from './create-lip-claim/create-lip-claim-schema-builder';
import DefendantResponseCuiSchemaBuilder from './defendant-response-cui/defendant-response-cui-schema-builder';
import EvidenceUploadApplicantLipSchemaBuilder from './evidence-upload-applicant-lip/evidence-upload-applicant-lip-schema-builder';
import EvidenceUploadRespondentLipSchemaBuilder from './evidence-upload-respondent-lip/evidence-upload-respondent-lip-schema-builder';
import RequestForReconsiderationLipSchemaBuilder from './request-for-reconsideration-lip/request-for-reconsideration-lip-schema-builder';
import TrailReadinessSchemaBuilder from './trail-readiness/trail-readiness-schema-builder';

export default class ClaimantDefendantCitizenSchemaBuilderFactory extends BaseSchemaBuilderFactory {
  get createClaimSchemaBuilder() {
    return new CreateLipClaimSchemaBuilder(this.testData);
  }

  get createClaimSpecAfterPaymentSchemaBuilder() {
    return new CreateClaimSpecAfterPaymentLipSchemaBuilder(this.testData);
  }

  get defendantResponseSchemaBuilder() {
    return new DefendantResponseCuiSchemaBuilder(this.testData);
  }

  get claimantResponseSchemaBuilder() {
    return new ClaimantResponseCuiSchemaBuilder(this.testData);
  }

  get evidenceUploadApplicantSchemaBuilder() {
    return new EvidenceUploadApplicantLipSchemaBuilder(this.testData);
  }

  get evidenceUploadRespondentSchemaBuilder() {
    return new EvidenceUploadRespondentLipSchemaBuilder(this.testData);
  }

  get trailReadinessSchemaBuilder() {
    return new TrailReadinessSchemaBuilder(this.testData);
  }

  get requestForReconsiderationSchemaBuilder() {
    return new RequestForReconsiderationLipSchemaBuilder(this.testData);
  }
}
