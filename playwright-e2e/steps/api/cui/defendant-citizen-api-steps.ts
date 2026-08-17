import BaseApi from '../../../base/base-api';
import CaseState from '../../../constants/cases/case-state';
import ccdEvents from '../../../constants/ccd-events/ccd-events';
import ClaimantDefendantCitizenDataBuilderFactory from '../../../data-builders/cui/claimant-defendant-citizen/claimant-defendant-citizen-data-builder-factory';
import { AllMethodsStep } from '../../../decorators/test-steps';
import ZodHelper from '../../../helpers/zod-helper';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import ClaimantDefendantCitizenSchemaBuilderFactory from '../../../schema-builders/cui/claimant-defendant-citizen/claimant-defendant-citizen-schema-builder-factory';

@AllMethodsStep()
export default class DefendantCitizenApiSteps extends BaseApi {
  private claimantDefendantCitizenDataBuilderFactory: ClaimantDefendantCitizenDataBuilderFactory;
  private claimantDefendantCitizenSchemaBuilderFactory: ClaimantDefendantCitizenSchemaBuilderFactory;

  constructor(
    claimantDefendantCitizenDataBuilderFactory: ClaimantDefendantCitizenDataBuilderFactory,
    claimantDefendantCitizenSchemaBuilderFactory: ClaimantDefendantCitizenSchemaBuilderFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this.claimantDefendantCitizenDataBuilderFactory = claimantDefendantCitizenDataBuilderFactory;
    this.claimantDefendantCitizenSchemaBuilderFactory =
      claimantDefendantCitizenSchemaBuilderFactory;
  }

  async RespondSmallFullDefence() {
    await this.setupApiStep(this.defendantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const defendantResponseDataBuilder =
      this.claimantDefendantCitizenDataBuilderFactory.defendantResponseCuiDataBuilder;
    const defendantResponseSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.defendantResponseCuiSchemaBuilder;
    await this.submitCuiEvent(
      this.defendantCitizenUser,
      ccdEvents.DEFENDANT_RESPONSE_CUI,
      await defendantResponseDataBuilder.buildSmallFullDefence(),
      CaseState.AWAITING_APPLICANT_INTENTION,
    );
    ZodHelper.safeParse(
      await defendantResponseSchemaBuilder.buildSmallFullDefence(caseDataBeforeSubmission),
      this.ccdCaseData,
    );
  }

  async RespondFastFullDefence() {
    await this.setupApiStep(this.defendantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const defendantResponseDataBuilder =
      this.claimantDefendantCitizenDataBuilderFactory.defendantResponseCuiDataBuilder;
    const defendantResponseSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.defendantResponseCuiSchemaBuilder;
    await this.submitCuiEvent(
      this.defendantCitizenUser,
      ccdEvents.DEFENDANT_RESPONSE_CUI,
      await defendantResponseDataBuilder.buildFastFullDefence(),
      CaseState.AWAITING_APPLICANT_INTENTION,
    );
    ZodHelper.safeParse(
      await defendantResponseSchemaBuilder.buildFastFullDefence(caseDataBeforeSubmission),
      this.ccdCaseData,
    );
  }

  async RespondInterFullDefence() {
    await this.setupApiStep(this.defendantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const defendantResponseDataBuilder =
      this.claimantDefendantCitizenDataBuilderFactory.defendantResponseCuiDataBuilder;
    const defendantResponseSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.defendantResponseCuiSchemaBuilder;
    await this.submitCuiEvent(
      this.defendantCitizenUser,
      ccdEvents.DEFENDANT_RESPONSE_CUI,
      await defendantResponseDataBuilder.buildInterFullDefence(),
      CaseState.AWAITING_APPLICANT_INTENTION,
    );
    ZodHelper.safeParse(
      await defendantResponseSchemaBuilder.buildInterFullDefence(caseDataBeforeSubmission),
      this.ccdCaseData,
    );
  }

  async RespondMultiFullDefence() {
    await this.setupApiStep(this.defendantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const defendantResponseDataBuilder =
      this.claimantDefendantCitizenDataBuilderFactory.defendantResponseCuiDataBuilder;
    const defendantResponseSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.defendantResponseCuiSchemaBuilder;
    await this.submitCuiEvent(
      this.defendantCitizenUser,
      ccdEvents.DEFENDANT_RESPONSE_CUI,
      await defendantResponseDataBuilder.buildMultiFullDefence(),
      CaseState.AWAITING_APPLICANT_INTENTION,
    );
    ZodHelper.safeParse(
      await defendantResponseSchemaBuilder.buildMultiFullDefence(caseDataBeforeSubmission),
      this.ccdCaseData,
    );
  }

  async RespondSmallFullAdmitImmediately() {
    await this.setupApiStep(this.defendantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const defendantResponseDataBuilder =
      this.claimantDefendantCitizenDataBuilderFactory.defendantResponseCuiDataBuilder;
    const defendantResponseSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.defendantResponseCuiSchemaBuilder;
    await this.submitCuiEvent(
      this.defendantCitizenUser,
      ccdEvents.DEFENDANT_RESPONSE_CUI,
      await defendantResponseDataBuilder.buildSmallFullAdmitImmediately(),
      CaseState.AWAITING_APPLICANT_INTENTION,
    );
    ZodHelper.safeParse(
      await defendantResponseSchemaBuilder.buildSmallFullAdmitImmediately(caseDataBeforeSubmission),
      this.ccdCaseData,
    );
  }

  async RespondSmallFullAdmitSetDate() {
    await this.setupApiStep(this.defendantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const defendantResponseDataBuilder =
      this.claimantDefendantCitizenDataBuilderFactory.defendantResponseCuiDataBuilder;
    const defendantResponseSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.defendantResponseCuiSchemaBuilder;
    await this.submitCuiEvent(
      this.defendantCitizenUser,
      ccdEvents.DEFENDANT_RESPONSE_CUI,
      await defendantResponseDataBuilder.buildSmallFullAdmitSetDate(),
      CaseState.AWAITING_APPLICANT_INTENTION,
    );
    ZodHelper.safeParse(
      await defendantResponseSchemaBuilder.buildSmallFullAdmitSetDate(caseDataBeforeSubmission),
      this.ccdCaseData,
    );
  }

  async RespondSmallFullAdmitRepayment() {
    await this.setupApiStep(this.defendantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const defendantResponseDataBuilder =
      this.claimantDefendantCitizenDataBuilderFactory.defendantResponseCuiDataBuilder;
    const defendantResponseSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.defendantResponseCuiSchemaBuilder;
    await this.submitCuiEvent(
      this.defendantCitizenUser,
      ccdEvents.DEFENDANT_RESPONSE_CUI,
      await defendantResponseDataBuilder.buildSmallFullAdmitRepayment(),
      CaseState.AWAITING_APPLICANT_INTENTION,
    );
    ZodHelper.safeParse(
      await defendantResponseSchemaBuilder.buildSmallFullAdmitRepayment(caseDataBeforeSubmission),
      this.ccdCaseData,
    );
  }

  async RespondFastFullAdmitImmediately() {
    await this.setupApiStep(this.defendantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const defendantResponseDataBuilder =
      this.claimantDefendantCitizenDataBuilderFactory.defendantResponseCuiDataBuilder;
    const defendantResponseSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.defendantResponseCuiSchemaBuilder;
    await this.submitCuiEvent(
      this.defendantCitizenUser,
      ccdEvents.DEFENDANT_RESPONSE_CUI,
      await defendantResponseDataBuilder.buildFastFullAdmitImmediately(),
      CaseState.AWAITING_APPLICANT_INTENTION,
    );
    ZodHelper.safeParse(
      await defendantResponseSchemaBuilder.buildFastFullAdmitImmediately(caseDataBeforeSubmission),
      this.ccdCaseData,
    );
  }

  async RespondFastFullAdmitSetDate() {
    await this.setupApiStep(this.defendantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const defendantResponseDataBuilder =
      this.claimantDefendantCitizenDataBuilderFactory.defendantResponseCuiDataBuilder;
    const defendantResponseSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.defendantResponseCuiSchemaBuilder;
    await this.submitCuiEvent(
      this.defendantCitizenUser,
      ccdEvents.DEFENDANT_RESPONSE_CUI,
      await defendantResponseDataBuilder.buildFastFullAdmitSetDate(),
      CaseState.AWAITING_APPLICANT_INTENTION,
    );
    ZodHelper.safeParse(
      await defendantResponseSchemaBuilder.buildFastFullAdmitSetDate(caseDataBeforeSubmission),
      this.ccdCaseData,
    );
  }

  async RespondFastFullAdmitRepayment() {
    await this.setupApiStep(this.defendantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const defendantResponseDataBuilder =
      this.claimantDefendantCitizenDataBuilderFactory.defendantResponseCuiDataBuilder;
    const defendantResponseSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.defendantResponseCuiSchemaBuilder;
    await this.submitCuiEvent(
      this.defendantCitizenUser,
      ccdEvents.DEFENDANT_RESPONSE_CUI,
      await defendantResponseDataBuilder.buildFastFullAdmitRepayment(),
      CaseState.AWAITING_APPLICANT_INTENTION,
    );
    ZodHelper.safeParse(
      await defendantResponseSchemaBuilder.buildFastFullAdmitRepayment(caseDataBeforeSubmission),
      this.ccdCaseData,
    );
  }

  async RespondSmallPartAdmitImmediately() {
    await this.setupApiStep(this.defendantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const defendantResponseDataBuilder =
      this.claimantDefendantCitizenDataBuilderFactory.defendantResponseCuiDataBuilder;
    const defendantResponseSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.defendantResponseCuiSchemaBuilder;
    await this.submitCuiEvent(
      this.defendantCitizenUser,
      ccdEvents.DEFENDANT_RESPONSE_CUI,
      await defendantResponseDataBuilder.buildSmallPartAdmitImmediately(),
      CaseState.AWAITING_APPLICANT_INTENTION,
    );
    ZodHelper.safeParse(
      await defendantResponseSchemaBuilder.buildSmallPartAdmitImmediately(caseDataBeforeSubmission),
      this.ccdCaseData,
    );
  }

  async RespondSmallPartAdmitSetDate() {
    await this.setupApiStep(this.defendantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const defendantResponseDataBuilder =
      this.claimantDefendantCitizenDataBuilderFactory.defendantResponseCuiDataBuilder;
    const defendantResponseSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.defendantResponseCuiSchemaBuilder;
    await this.submitCuiEvent(
      this.defendantCitizenUser,
      ccdEvents.DEFENDANT_RESPONSE_CUI,
      await defendantResponseDataBuilder.buildSmallPartAdmitSetDate(),
      CaseState.AWAITING_APPLICANT_INTENTION,
    );
    ZodHelper.safeParse(
      await defendantResponseSchemaBuilder.buildSmallPartAdmitSetDate(caseDataBeforeSubmission),
      this.ccdCaseData,
    );
  }

  async RespondSmallPartAdmitRepayment() {
    await this.setupApiStep(this.defendantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const defendantResponseDataBuilder =
      this.claimantDefendantCitizenDataBuilderFactory.defendantResponseCuiDataBuilder;
    const defendantResponseSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.defendantResponseCuiSchemaBuilder;
    await this.submitCuiEvent(
      this.defendantCitizenUser,
      ccdEvents.DEFENDANT_RESPONSE_CUI,
      await defendantResponseDataBuilder.buildSmallPartAdmitRepayment(),
      CaseState.AWAITING_APPLICANT_INTENTION,
    );
    ZodHelper.safeParse(
      await defendantResponseSchemaBuilder.buildSmallPartAdmitRepayment(caseDataBeforeSubmission),
      this.ccdCaseData,
    );
  }

  async RespondFastPartAdmitImmediately() {
    await this.setupApiStep(this.defendantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const defendantResponseDataBuilder =
      this.claimantDefendantCitizenDataBuilderFactory.defendantResponseCuiDataBuilder;
    const defendantResponseSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.defendantResponseCuiSchemaBuilder;
    await this.submitCuiEvent(
      this.defendantCitizenUser,
      ccdEvents.DEFENDANT_RESPONSE_CUI,
      await defendantResponseDataBuilder.buildFastPartAdmitImmediately(),
      CaseState.AWAITING_APPLICANT_INTENTION,
    );
    ZodHelper.safeParse(
      await defendantResponseSchemaBuilder.buildFastPartAdmitImmediately(caseDataBeforeSubmission),
      this.ccdCaseData,
    );
  }

  async RespondFastPartAdmitSetDate() {
    await this.setupApiStep(this.defendantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const defendantResponseDataBuilder =
      this.claimantDefendantCitizenDataBuilderFactory.defendantResponseCuiDataBuilder;
    const defendantResponseSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.defendantResponseCuiSchemaBuilder;
    await this.submitCuiEvent(
      this.defendantCitizenUser,
      ccdEvents.DEFENDANT_RESPONSE_CUI,
      await defendantResponseDataBuilder.buildFastPartAdmitSetDate(),
      CaseState.AWAITING_APPLICANT_INTENTION,
    );
    ZodHelper.safeParse(
      await defendantResponseSchemaBuilder.buildFastPartAdmitSetDate(caseDataBeforeSubmission),
      this.ccdCaseData,
    );
  }

  async RespondFastPartAdmitRepayment() {
    await this.setupApiStep(this.defendantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const defendantResponseDataBuilder =
      this.claimantDefendantCitizenDataBuilderFactory.defendantResponseCuiDataBuilder;
    const defendantResponseSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.defendantResponseCuiSchemaBuilder;
    await this.submitCuiEvent(
      this.defendantCitizenUser,
      ccdEvents.DEFENDANT_RESPONSE_CUI,
      await defendantResponseDataBuilder.buildFastPartAdmitRepayment(),
      CaseState.AWAITING_APPLICANT_INTENTION,
    );
    ZodHelper.safeParse(
      await defendantResponseSchemaBuilder.buildFastPartAdmitRepayment(caseDataBeforeSubmission),
      this.ccdCaseData,
    );
  }

  async EvidenceUpload() {
    await this.setupApiStep(this.defendantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const evidenceUploadRespondentDataBuilder =
      this.claimantDefendantCitizenDataBuilderFactory.evidenceUploadRespondentLipDataBuilder;
    const evidenceUploadRespondentSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.evidenceUploadRespondentLipSchemaBuilder;
    await this.submitCuiEvent(
      this.defendantCitizenUser,
      ccdEvents.EVIDENCE_UPLOAD_RESPONDENT,
      await evidenceUploadRespondentDataBuilder.build(),
      CaseState.CASE_PROGRESSION,
    );
    ZodHelper.safeParse(
      await evidenceUploadRespondentSchemaBuilder.build(caseDataBeforeSubmission),
      this.ccdCaseData,
    );
  }

  async TrailReadiness() {
    await this.setupApiStep(this.defendantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const trialReadinessDataBuilder =
      this.claimantDefendantCitizenDataBuilderFactory.trailReadinessLipDataBuilder;
    const trialReadinessSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.trailReadinessLipSchemaBuilder;
    await this.submitCuiEvent(
      this.defendantCitizenUser,
      ccdEvents.TRIAL_READINESS,
      await trialReadinessDataBuilder.buildDefendant(),
    );
    ZodHelper.safeParse(
      await trialReadinessSchemaBuilder.buildDefendant(caseDataBeforeSubmission),
      this.ccdCaseData,
    );
  }

  async RequestForReconsideration() {
    await this.setupApiStep(this.defendantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const requestForReconsiderationDataBuilder =
      this.claimantDefendantCitizenDataBuilderFactory.requestForReconsiderationLipDataBuilder;
    const requestForReconsiderationSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.requestForReconsiderationLipSchemaBuilder;
    await this.submitCuiEvent(
      this.defendantCitizenUser,
      ccdEvents.REQUEST_FOR_RECONSIDERATION,
      await requestForReconsiderationDataBuilder.buildDefendant(),
      CaseState.CASE_PROGRESSION,
    );
    ZodHelper.safeParse(
      await requestForReconsiderationSchemaBuilder.buildDefendant(caseDataBeforeSubmission),
      this.ccdCaseData,
    );
  }

  async RaiseLipQuery() {
    await this.setupApiStep(this.defendantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { queryManagementRaiseLipDataBuilder } = this.claimantDefendantCitizenDataBuilderFactory;
    await super.submitQmEvent(
      this.defendantCitizenUser,
      ccdEvents.QUERY_MANAGEMENT_RAISE,
      await queryManagementRaiseLipDataBuilder.buildRaiseQueryDefendantLip(),
    );

    const { queryManagementRaiseLipSchemaBuilder } =
      this.claimantDefendantCitizenSchemaBuilderFactory;
    const queryManagementRaiseSchema =
      await queryManagementRaiseLipSchemaBuilder.buildRaiseQuery(caseDataBeforeSubmission);
    ZodHelper.safeParse(queryManagementRaiseSchema, this.ccdCaseData);
  }

  async RaiseLipHearingQuery() {
    await this.setupApiStep(this.defendantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { queryManagementRaiseLipDataBuilder } = this.claimantDefendantCitizenDataBuilderFactory;
    await super.submitQmEvent(
      this.defendantCitizenUser,
      ccdEvents.QUERY_MANAGEMENT_RAISE,
      await queryManagementRaiseLipDataBuilder.buildRaiseQueryHearingDefendantLip(),
    );

    const { queryManagementRaiseLipSchemaBuilder } =
      this.claimantDefendantCitizenSchemaBuilderFactory;
    const queryManagementRaiseSchema =
      await queryManagementRaiseLipSchemaBuilder.buildRaiseQuery(caseDataBeforeSubmission);
    ZodHelper.safeParse(queryManagementRaiseSchema, this.ccdCaseData);
  }

  async FollowUpOnLipQuery() {
    await this.setupApiStep(this.defendantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { queryManagementRaiseLipDataBuilder } = this.claimantDefendantCitizenDataBuilderFactory;
    await super.submitQmEvent(
      this.defendantCitizenUser,
      ccdEvents.QUERY_MANAGEMENT_RAISE,
      await queryManagementRaiseLipDataBuilder.buildFollowQueryDefendantLip(),
    );

    const { queryManagementRaiseLipSchemaBuilder } =
      this.claimantDefendantCitizenSchemaBuilderFactory;
    const queryManagementRaiseSchema =
      await queryManagementRaiseLipSchemaBuilder.buildFollowUpQuery(caseDataBeforeSubmission);
    ZodHelper.safeParse(queryManagementRaiseSchema, this.ccdCaseData);
  }
}
