import BaseApi from '../../../base/base-api';
import CaseState from '../../../constants/cases/case-state';
import cuiCCDEvents from '../../../constants/ccd-events/cui-ccd-events/cui-ccd-events';
import ClaimantDefendantCitizenDataBuilderFactory from '../../../data-builders/cui/claimant-defendant-citizen/claimant-defendant-citizen-data-builder-factory';
import { AllMethodsStep } from '../../../decorators/test-steps';
import UserAssignedCasesHelper from '../../../helpers/user-assigned-cases-helper';
import ZodHelper from '../../../helpers/zod-helper';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import ClaimantDefendantCitizenSchemaBuilderFactory from '../../../schema-builders/cui/claimant-defendant-citizen/claimant-defendant-citizen-schema-builder-factory';

@AllMethodsStep()
export default class ClaimantCitizenApiSteps extends BaseApi {
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

  async CreateLipClaimSmall() {
    await this.setupUserData(this.claimantCitizenUser);
    const {createLipClaimDataBuilder} =
      this.claimantDefendantCitizenDataBuilderFactory;
    const createClaimSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.createLipClaimSchemaBuilder;
    await this.submitCuiEvent(
      this.claimantCitizenUser,
      cuiCCDEvents.CREATE_LIP_CLAIM,
      await createLipClaimDataBuilder.buildSmall(),
      CaseState.PENDING_CASE_ISSUED,
    );
    ZodHelper.safeParse(await createClaimSchemaBuilder.buildSmall(), this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(this.claimantCitizenUser, this.ccdCaseData?.id);
  }

  async CreateLipClaimFast() {
    await this.setupUserData(this.claimantCitizenUser);
    const {createLipClaimDataBuilder} =
      this.claimantDefendantCitizenDataBuilderFactory;
    const createClaimSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.createLipClaimSchemaBuilder;
    await this.submitCuiEvent(
      this.claimantCitizenUser,
      cuiCCDEvents.CREATE_LIP_CLAIM,
      await createLipClaimDataBuilder.buildFast(),
      CaseState.PENDING_CASE_ISSUED,
    );
    ZodHelper.safeParse(await createClaimSchemaBuilder.buildFast(), this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(this.claimantCitizenUser, this.ccdCaseData?.id);
  }

  async CreateLipClaimInter() {
    await this.setupUserData(this.claimantCitizenUser);
    const {createLipClaimDataBuilder} =
      this.claimantDefendantCitizenDataBuilderFactory;
    const createClaimSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.createLipClaimSchemaBuilder;
    await this.submitCuiEvent(
      this.claimantCitizenUser,
      cuiCCDEvents.CREATE_LIP_CLAIM,
      await createLipClaimDataBuilder.buildInter(),
      CaseState.PENDING_CASE_ISSUED,
    );
    ZodHelper.safeParse(await createClaimSchemaBuilder.buildInter(), this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(this.claimantCitizenUser, this.ccdCaseData?.id);
  }

  async CreateLipClaimMulti() {
    await this.setupUserData(this.claimantCitizenUser);
    const {createLipClaimDataBuilder} =
      this.claimantDefendantCitizenDataBuilderFactory;
    const createClaimSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.createLipClaimSchemaBuilder;
    await this.submitCuiEvent(
      this.claimantCitizenUser,
      cuiCCDEvents.CREATE_LIP_CLAIM,
      await createLipClaimDataBuilder.buildMulti(),
      CaseState.PENDING_CASE_ISSUED,
    );
    ZodHelper.safeParse(await createClaimSchemaBuilder.buildMulti(), this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(this.claimantCitizenUser, this.ccdCaseData?.id);
  }

  async MakePaymentForClaimIssue() {
    await this.setupApiStep(this.claimantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const createClaimSpecAfterPaymentDataBuilder =
      this.claimantDefendantCitizenDataBuilderFactory.createClaimSpecAfterPaymentLipDataBuilder;
    await this.submitCuiEvent(
      this.claimantCitizenUser,
      cuiCCDEvents.CREATE_CLAIM_SPEC_AFTER_PAYMENT,
      await createClaimSpecAfterPaymentDataBuilder.buildIssueClaim(),
    );

    await super.waitForFinishedBusinessProcess(this.ccdCaseData?.id);
    await super.fetchAndSetCCDCaseData();

    const createClaimSpecAfterPaymentSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.createClaimSpecAfterPaymentLipSchemaBuilder;
    const createClaimSpecAfterPaymentSchema =
      await createClaimSpecAfterPaymentSchemaBuilder.build(caseDataBeforeSubmission);
    ZodHelper.safeParse(createClaimSpecAfterPaymentSchema, this.ccdCaseData);
  }

  async RespondSmallRejectFullDefence() {
    await this.setupApiStep(this.claimantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const {claimantResponseCuiDataBuilder} =
      this.claimantDefendantCitizenDataBuilderFactory;
    const claimantResponseSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.claimantResponseCuiSchemaBuilder;
    await this.submitCuiEvent(
      this.claimantCitizenUser,
      cuiCCDEvents.CLAIMANT_RESPONSE_CUI,
      await claimantResponseCuiDataBuilder.buildSmallRejectFullDefence(),
      CaseState.IN_MEDIATION,
    );
    ZodHelper.safeParse(
      await claimantResponseSchemaBuilder.buildSmallRejectFullDefence(caseDataBeforeSubmission),
      this.ccdCaseData,
    );
  }

  async RespondSmallRejectPartAdmit() {
    await this.setupApiStep(this.claimantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const {claimantResponseCuiDataBuilder} =
      this.claimantDefendantCitizenDataBuilderFactory;
    const claimantResponseSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.claimantResponseCuiSchemaBuilder;
    await this.submitCuiEvent(
      this.claimantCitizenUser,
      cuiCCDEvents.CLAIMANT_RESPONSE_CUI,
      await claimantResponseCuiDataBuilder.buildSmallRejectPartAdmit(),
      CaseState.IN_MEDIATION,
    );
    ZodHelper.safeParse(
      await claimantResponseSchemaBuilder.buildSmallRejectPartAdmit(caseDataBeforeSubmission),
      this.ccdCaseData,
    );
  }

  async RespondFastRejectFullDefence() {
    await this.setupApiStep(this.claimantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const {claimantResponseCuiDataBuilder} =
      this.claimantDefendantCitizenDataBuilderFactory;
    const claimantResponseSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.claimantResponseCuiSchemaBuilder;
    await this.submitCuiEvent(
      this.claimantCitizenUser,
      cuiCCDEvents.CLAIMANT_RESPONSE_CUI,
      await claimantResponseCuiDataBuilder.buildFastRejectFullDefence(),
      CaseState.JUDICIAL_REFERRAL,
    );
    ZodHelper.safeParse(
      await claimantResponseSchemaBuilder.buildFastRejectFullDefence(caseDataBeforeSubmission),
      this.ccdCaseData,
    );
  }

  async RespondInterRejectFullDefence() {
    await this.setupApiStep(this.claimantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const {claimantResponseCuiDataBuilder} =
      this.claimantDefendantCitizenDataBuilderFactory;
    const claimantResponseSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.claimantResponseCuiSchemaBuilder;
    await this.submitCuiEvent(
      this.claimantCitizenUser,
      cuiCCDEvents.CLAIMANT_RESPONSE_CUI,
      await claimantResponseCuiDataBuilder.buildInterRejectFullDefence(),
    );
    ZodHelper.safeParse(
      await claimantResponseSchemaBuilder.buildInterRejectFullDefence(caseDataBeforeSubmission),
      this.ccdCaseData,
    );
  }

  async RespondMultiRejectFullDefence() {
    await this.setupApiStep(this.claimantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const {claimantResponseCuiDataBuilder} =
      this.claimantDefendantCitizenDataBuilderFactory;
    const claimantResponseSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.claimantResponseCuiSchemaBuilder;
    await this.submitCuiEvent(
      this.claimantCitizenUser,
      cuiCCDEvents.CLAIMANT_RESPONSE_CUI,
      await claimantResponseCuiDataBuilder.buildMultiRejectFullDefence(),
      CaseState.JUDICIAL_REFERRAL,
    );
    ZodHelper.safeParse(
      await claimantResponseSchemaBuilder.buildMultiRejectFullDefence(caseDataBeforeSubmission),
      this.ccdCaseData,
    );
  }

  async RespondSmallAcceptFullAdmitSetDateCCJ() {
    await this.setupApiStep(this.claimantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const {claimantResponseCuiDataBuilder} =
      this.claimantDefendantCitizenDataBuilderFactory;
    const claimantResponseSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.claimantResponseCuiSchemaBuilder;
    await this.submitCuiEvent(
      this.claimantCitizenUser,
      cuiCCDEvents.CLAIMANT_RESPONSE_CUI,
      await claimantResponseCuiDataBuilder.buildSmallAcceptFullAdmitSetDateCcj(),
      CaseState.All_FINAL_ORDERS_ISSUED,
    );
    ZodHelper.safeParse(
      await claimantResponseSchemaBuilder.buildSmallAcceptFullAdmitSetDateCcj(
        caseDataBeforeSubmission,
      ),
      this.ccdCaseData,
    );
  }

  async EvidenceUpload() {
    await this.setupApiStep(this.claimantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const {evidenceUploadApplicantLipDataBuilder} =
      this.claimantDefendantCitizenDataBuilderFactory;
    const evidenceUploadApplicantSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.evidenceUploadApplicantLipSchemaBuilder;
    await this.submitCuiEvent(
      this.claimantCitizenUser,
      cuiCCDEvents.EVIDENCE_UPLOAD_APPLICANT,
      await evidenceUploadApplicantLipDataBuilder.build(),
      CaseState.CASE_PROGRESSION,
    );
    ZodHelper.safeParse(
      await evidenceUploadApplicantSchemaBuilder.build(caseDataBeforeSubmission),
      this.ccdCaseData,
    );
  }

  async TrailReadiness() {
    await this.setupApiStep(this.claimantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const {trailReadinessLipDataBuilder} =
      this.claimantDefendantCitizenDataBuilderFactory;
    const trialReadinessSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.trailReadinessLipSchemaBuilder;
    await this.submitCuiEvent(
      this.claimantCitizenUser,
      cuiCCDEvents.TRIAL_READINESS,
      await trailReadinessLipDataBuilder.buildClaimant(),
    );
    ZodHelper.safeParse(
      await trialReadinessSchemaBuilder.buildClaimant(caseDataBeforeSubmission),
      this.ccdCaseData,
    );
  }

  async RequestForReconsideration() {
    await this.setupApiStep(this.claimantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const {requestForReconsiderationLipDataBuilder} =
      this.claimantDefendantCitizenDataBuilderFactory;
    const requestForReconsiderationSchemaBuilder =
      this.claimantDefendantCitizenSchemaBuilderFactory.requestForReconsiderationLipSchemaBuilder;
    await this.submitCuiEvent(
      this.claimantCitizenUser,
      cuiCCDEvents.REQUEST_FOR_RECONSIDERATION,
      await requestForReconsiderationLipDataBuilder.buildClaimant(),
      CaseState.CASE_PROGRESSION,
    );
    ZodHelper.safeParse(
      await requestForReconsiderationSchemaBuilder.buildClaimant(caseDataBeforeSubmission),
      this.ccdCaseData,
    );
  }

  async RaiseLipQuery() {
    await this.setupApiStep(this.claimantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { queryManagementRaiseLipDataBuilder } = this.claimantDefendantCitizenDataBuilderFactory;
    await super.submitQmEvent(
      this.claimantCitizenUser,
      cuiCCDEvents.QUERY_MANAGEMENT_RAISE,
      await queryManagementRaiseLipDataBuilder.buildRaiseQueryClaimantLip(),
    );

    const { queryManagementRaiseLipSchemaBuilder } =
      this.claimantDefendantCitizenSchemaBuilderFactory;
    const queryManagementRaiseSchema =
      await queryManagementRaiseLipSchemaBuilder.buildRaiseQuery(caseDataBeforeSubmission);
    ZodHelper.safeParse(queryManagementRaiseSchema, this.ccdCaseData);
  }

  async RaiseLipHearingQuery() {
    await this.setupApiStep(this.claimantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { queryManagementRaiseLipDataBuilder } = this.claimantDefendantCitizenDataBuilderFactory;
    await super.submitQmEvent(
      this.claimantCitizenUser,
      cuiCCDEvents.QUERY_MANAGEMENT_RAISE,
      await queryManagementRaiseLipDataBuilder.buildRaiseQueryHearingClaimantLip(),
    );

    const { queryManagementRaiseLipSchemaBuilder } =
      this.claimantDefendantCitizenSchemaBuilderFactory;
    const queryManagementRaiseSchema =
      await queryManagementRaiseLipSchemaBuilder.buildRaiseQuery(caseDataBeforeSubmission);
    ZodHelper.safeParse(queryManagementRaiseSchema, this.ccdCaseData);
  }

  async FollowUpOnLipQuery() {
    await this.setupApiStep(this.claimantCitizenUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { queryManagementRaiseLipDataBuilder } = this.claimantDefendantCitizenDataBuilderFactory;
    await super.submitQmEvent(
      this.claimantCitizenUser,
      cuiCCDEvents.QUERY_MANAGEMENT_RAISE,
      await queryManagementRaiseLipDataBuilder.buildFollowQueryClaimantLip(),
    );

    const { queryManagementRaiseLipSchemaBuilder } =
      this.claimantDefendantCitizenSchemaBuilderFactory;
    const queryManagementRaiseSchema =
      await queryManagementRaiseLipSchemaBuilder.buildFollowUpQuery(caseDataBeforeSubmission);
    ZodHelper.safeParse(queryManagementRaiseSchema, this.ccdCaseData);
  }
}
