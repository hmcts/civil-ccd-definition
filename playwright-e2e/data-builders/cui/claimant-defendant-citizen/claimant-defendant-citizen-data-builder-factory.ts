import BaseDataBuilderFactory from '../../../base/base-data-builder-factory';
import ClaimantResponseCuiDataBuilder from './claimant-response-cui/claimant-response-cui-data-builder';
import CreateClaimSpecAfterPaymentLipDataBuilder from './create-claim-spec-after-payment-lip/create-claim-spec-after-payment-lip-data-builder';
import CreateLipClaimDataBuilder from './create-lip-claim/create-lip-claim-data-builder';
import DefendantResponseCuiDataBuilder from './defendant-response-cui/defendant-response-cui-data-builder';
import EvidenceUploadApplicantLipDataBuilder from './evidence-upload-applicant-lip/evidence-upload-applicant-lip-data-builder';
import EvidenceUploadRespondentLipDataBuilder from './evidence-upload-respondent-lip/evidence-upload-respondent-lip-data-builder';
import QueryManagementRaiseLipDataBuilder from '../common/query-management-raise/query-management-raise-data-builder';
import RequestForReconsiderationLipDataBuilder from './request-for-reconsideration-lip/request-for-reconsideration-lip-data-builder';
import TrailReadinessLipDataBuilder from './trail-readiness-lip/trail-readiness-lip-data-builder';

export default class ClaimantDefendantCitizenDataBuilderFactory extends BaseDataBuilderFactory {
  get createLipClaimDataBuilder() {
    return new CreateLipClaimDataBuilder(this.requestsFactory, this.testData);
  }

  get createClaimSpecAfterPaymentLipDataBuilder() {
    return new CreateClaimSpecAfterPaymentLipDataBuilder(this.requestsFactory, this.testData);
  }

  get defendantResponseCuiDataBuilder() {
    return new DefendantResponseCuiDataBuilder(this.requestsFactory, this.testData);
  }

  get claimantResponseCuiDataBuilder() {
    return new ClaimantResponseCuiDataBuilder(this.requestsFactory, this.testData);
  }

  get evidenceUploadApplicantLipDataBuilder() {
    return new EvidenceUploadApplicantLipDataBuilder(this.requestsFactory, this.testData);
  }

  get evidenceUploadRespondentLipDataBuilder() {
    return new EvidenceUploadRespondentLipDataBuilder(this.requestsFactory, this.testData);
  }

  get trailReadinessLipDataBuilder() {
    return new TrailReadinessLipDataBuilder(this.requestsFactory, this.testData);
  }

  get requestForReconsiderationLipDataBuilder() {
    return new RequestForReconsiderationLipDataBuilder(this.requestsFactory, this.testData);
  }

  get queryManagementRaiseLipDataBuilder() {
    return new QueryManagementRaiseLipDataBuilder(this.requestsFactory, this.testData);
  }
}
