import BaseDataBuilderFactory from '../../../base/base-data-builder-factory';
import ClaimantResponseCuiDataBuilder from './claimant-response-cui/claimant-response-cui-data-builder';
import CreateClaimSpecAfterPaymentLipDataBuilder from './create-claim-spec-after-payment-lip/create-claim-spec-after-payment-lip-data-builder';
import CreateLipClaimDataBuilder from './create-lip-claim/create-lip-claim-data-builder';
import DefendantResponseCuiDataBuilder from './defendant-response-cui/defendant-response-cui-data-builder';
import EvidenceUploadApplicantLipDataBuilder from './evidence-upload-applicant-lip/evidence-upload-applicant-lip-data-builder';
import EvidenceUploadRespondentLipDataBuilder from './evidence-upload-respondent-lip/evidence-upload-respondent-lip-data-builder';
import RequestForReconsiderationLipDataBuilder from './request-for-reconsideration-lip/request-for-reconsideration-lip-data-builder';
import TrailReadinessDataBuilder from './trail-readiness/trail-readiness-data-builder';

export default class ClaimantDefendantCitizenDataBuilderFactory extends BaseDataBuilderFactory {
  get createClaimDataBuilder() {
    return new CreateLipClaimDataBuilder(this.requestsFactory, this.testData);
  }

  get createClaimSpecAfterPaymentDataBuilder() {
    return new CreateClaimSpecAfterPaymentLipDataBuilder(this.requestsFactory, this.testData);
  }

  get defendantResponseDataBuilder() {
    return new DefendantResponseCuiDataBuilder(this.requestsFactory, this.testData);
  }

  get claimantResponseDataBuilder() {
    return new ClaimantResponseCuiDataBuilder(this.requestsFactory, this.testData);
  }

  get evidenceUploadApplicantDataBuilder() {
    return new EvidenceUploadApplicantLipDataBuilder(this.requestsFactory, this.testData);
  }

  get evidenceUploadRespondentDataBuilder() {
    return new EvidenceUploadRespondentLipDataBuilder(this.requestsFactory, this.testData);
  }

  get trailReadinessDataBuilder() {
    return new TrailReadinessDataBuilder(this.requestsFactory, this.testData);
  }

  get requestForReconsiderationDataBuilder() {
    return new RequestForReconsiderationLipDataBuilder(this.requestsFactory, this.testData);
  }
}
