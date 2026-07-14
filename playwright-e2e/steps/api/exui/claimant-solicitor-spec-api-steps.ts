import BaseApi from '../../../base/base-api';
import {
  claimantOrganisationSuperUser,
  claimantSolicitorUser,
} from '../../../config/users/exui-users';
import ccdEvents from '../../../constants/ccd-events/ccd-events';
import DJSpecType from '../../../constants/ccd-events/default-judgement/dj-spec-type';
import ClaimantDefendantSolicitorDataBuilderFactory from '../../../data-builders/exui/claimant-defendant-solicitor/claimant-defendant-solicitor-data-builder-factory';
import { AllMethodsStep } from '../../../decorators/test-steps';
import CaseState from '../../../constants/cases/case-state';
import DateHelper from '../../../helpers/date-helper';
import UserAssignedCasesHelper from '../../../helpers/user-assigned-cases-helper';
import ZodHelper from '../../../helpers/zod-helper';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import ClaimantDefendantSolicitorSchemaBuilderFactory from '../../../schema-builders/exui/claimant-defendant-solicitor/claimant-defendant-solicitor-schema-builder-factory';

@AllMethodsStep()
export default class ClaimantSolicitorSpecApiSteps extends BaseApi {
  private claimantDefendantSolicitorDataBuilderFactory: ClaimantDefendantSolicitorDataBuilderFactory;
  private claimantDefendantSolicitorSchemaBuilderFactory: ClaimantDefendantSolicitorSchemaBuilderFactory;

  constructor(
    claimantDefendantSolicitorDataBuilderFactory: ClaimantDefendantSolicitorDataBuilderFactory,
    claimantDefendantSolicitorSchemaBuilderFactory: ClaimantDefendantSolicitorSchemaBuilderFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this.claimantDefendantSolicitorDataBuilderFactory =
      claimantDefendantSolicitorDataBuilderFactory;
    this.claimantDefendantSolicitorSchemaBuilderFactory =
      claimantDefendantSolicitorSchemaBuilderFactory;
  }

  async CreateClaimSmallTrack1v1() {
    await this.setupUserData(claimantSolicitorUser);

    const { createClaimSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimEventData = await createClaimSpecDataBuilder.buildSmall1v1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM_SPEC,
      createClaimEventData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSpecSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSpecSchemaBuilder.buildSmall1v1();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimFast1v1() {
    await this.setupUserData(claimantSolicitorUser);

    const { createClaimSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimEventData = await createClaimSpecDataBuilder.buildFast1v1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM_SPEC,
      createClaimEventData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSpecSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSpecSchemaBuilder.buildFast1v1();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimFast2v1() {
    await this.setupUserData(claimantSolicitorUser);

    const { createClaimSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimEventData = await createClaimSpecDataBuilder.buildFast2v1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM_SPEC,
      createClaimEventData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSpecSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSpecSchemaBuilder.buildFast2v1();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimFast1v2SS() {
    await this.setupUserData(claimantSolicitorUser);

    const { createClaimSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimEventData = await createClaimSpecDataBuilder.buildFast1v2SS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM_SPEC,
      createClaimEventData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSpecSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSpecSchemaBuilder.buildFast1v2SS();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimFast1v2DS() {
    await this.setupUserData(claimantSolicitorUser);

    const { createClaimSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimEventData = await createClaimSpecDataBuilder.buildFast1v2DS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM_SPEC,
      createClaimEventData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSpecSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSpecSchemaBuilder.buildFast1v2DS();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimIntermediate1v1() {
    await this.setupUserData(claimantSolicitorUser);

    const { createClaimSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimEventData = await createClaimSpecDataBuilder.buildIntermediate1v1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM_SPEC,
      createClaimEventData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSpecSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSpecSchemaBuilder.buildIntermediate1v1();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimIntermediate1v2SS() {
    await this.setupUserData(claimantSolicitorUser);

    const { createClaimSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimEventData = await createClaimSpecDataBuilder.buildIntermediate1v2SS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM_SPEC,
      createClaimEventData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSpecSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSpecSchemaBuilder.buildIntermediate1v2SS();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimIntermediate1v2DS() {
    await this.setupUserData(claimantSolicitorUser);

    const { createClaimSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimEventData = await createClaimSpecDataBuilder.buildIntermediate1v2DS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM_SPEC,
      createClaimEventData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSpecSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSpecSchemaBuilder.buildIntermediate1v2DS();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimMulti1v1() {
    await this.setupUserData(claimantSolicitorUser);

    const { createClaimSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimEventData = await createClaimSpecDataBuilder.buildMulti1v1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM_SPEC,
      createClaimEventData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSpecSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSpecSchemaBuilder.buildMulti1v1();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimMulti2v1() {
    await this.setupUserData(claimantSolicitorUser);

    const { createClaimSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimEventData = await createClaimSpecDataBuilder.buildMulti2v1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM_SPEC,
      createClaimEventData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSpecSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSpecSchemaBuilder.buildMulti2v1();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimMulti1v2SS() {
    await this.setupUserData(claimantSolicitorUser);

    const { createClaimSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimEventData = await createClaimSpecDataBuilder.buildMulti1v2SS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM_SPEC,
      createClaimEventData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSpecSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSpecSchemaBuilder.buildMulti1v2SS();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimMulti1v2DS() {
    await this.setupUserData(claimantSolicitorUser);

    const { createClaimSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimEventData = await createClaimSpecDataBuilder.buildMulti1v2DS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM_SPEC,
      createClaimEventData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSpecSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSpecSchemaBuilder.buildMulti1v2DS();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimSmallTrack2v1() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimEventData = await createClaimSpecDataBuilder.buildSmall2v1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM_SPEC,
      createClaimEventData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSpecSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSpecSchemaBuilder.buildSmall2v1();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimSmallTrack1v2SS() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimEventData = await createClaimSpecDataBuilder.buildSmall1v2SS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM_SPEC,
      createClaimEventData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSpecSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSpecSchemaBuilder.buildSmall1v2SS();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimSmallTrack1v2DS() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimEventData = await createClaimSpecDataBuilder.buildSmall1v2DS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM_SPEC,
      createClaimEventData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSpecSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSpecSchemaBuilder.buildSmall1v2DS();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimSmallTrack1vLIP() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimEventData = await createClaimSpecDataBuilder.buildSmall1vLIP();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM_SPEC,
      createClaimEventData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSpecSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSpecSchemaBuilder.buildSmall1vLIP();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimSmallTrack1v2LIPs() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimEventData = await createClaimSpecDataBuilder.buildSmall1v2LIPs();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM_SPEC,
      createClaimEventData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSpecSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSpecSchemaBuilder.buildSmall1v2LIPs();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimSmallTrack1v2LRLIP() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimEventData = await createClaimSpecDataBuilder.buildSmall1v2LRLIP();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM_SPEC,
      createClaimEventData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSpecSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSpecSchemaBuilder.buildSmall1v2LRLIP();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimSmallTrack1v2LIPLR() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimEventData = await createClaimSpecDataBuilder.buildSmall1v2LIPLR();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM_SPEC,
      createClaimEventData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSpecSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSpecSchemaBuilder.buildSmall1v2LIPLR();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async MakePaymentForClaimIssue() {
    await this.setupApiStep(claimantSolicitorUser);
    const { serviceRequestDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const paidServiceRequestDTO = await serviceRequestDataBuilder.buildPaidServiceRequestDTO(
      'paid',
      this.ccdCaseData?.id,
    );
    const { civilServiceRequests } = this.requestsFactory;
    await civilServiceRequests.updatePaymentForClaimIssue(
      claimantSolicitorUser,
      paidServiceRequestDTO,
    );
    await super.waitForFinishedBusinessProcess(this.ccdCaseData?.id);
    await super.fetchAndSetCCDCaseData();
  }

  async MakePaymentForHearingFee() {
    await this.setupApiStep(claimantSolicitorUser);
    const { civilServiceRequests } = this.requestsFactory;
    await civilServiceRequests.triggerHearingFeePaid(claimantSolicitorUser, this.ccdCaseData?.id);
    await super.waitForFinishedBusinessProcess(this.ccdCaseData?.id);
    await super.fetchAndSetCCDCaseData();
  }

  async RespondFastFullDefenceProceed() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData = await claimantResponseSpecDataBuilder.buildFast();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantResponseEventData,
      CaseState.JUDICIAL_REFERRAL,
    );

    const { claimantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSpecSchemaBuilder.buildFast(caseDataBeforeSubmission);
    ZodHelper.safeParse(claimantResponseSchema, this.ccdCaseData);
  }

  async RespondIntermediateProceed() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData =
      await claimantResponseSpecDataBuilder.buildIntermediateProceed();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantResponseEventData,
      CaseState.JUDICIAL_REFERRAL,
    );

    const { claimantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSpecSchemaBuilder.buildIntermediateProceed(caseDataBeforeSubmission);
    ZodHelper.safeParse(claimantResponseSchema, this.ccdCaseData);
  }

  async RespondMultiProceed() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData = await claimantResponseSpecDataBuilder.buildMultiProceed();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantResponseEventData,
      CaseState.JUDICIAL_REFERRAL,
    );

    const { claimantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSpecSchemaBuilder.buildMultiProceed(caseDataBeforeSubmission);
    ZodHelper.safeParse(claimantResponseSchema, this.ccdCaseData);
  }

  async RespondMultiProceed1v2SS() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData =
      await claimantResponseSpecDataBuilder.buildMultiProceed1v2SS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantResponseEventData,
      CaseState.JUDICIAL_REFERRAL,
    );

    const { claimantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSpecSchemaBuilder.buildMultiProceed1v2SS(caseDataBeforeSubmission);
    ZodHelper.safeParse(claimantResponseSchema, this.ccdCaseData);
  }

  async RespondMultiProceed1v2DS() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData =
      await claimantResponseSpecDataBuilder.buildMultiProceed1v2DS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantResponseEventData,
      CaseState.JUDICIAL_REFERRAL,
    );

    const { claimantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSpecSchemaBuilder.buildMultiProceed1v2DS(caseDataBeforeSubmission);
    ZodHelper.safeParse(claimantResponseSchema, this.ccdCaseData);
  }

  async RespondFastPartAdmitProceed() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData =
      await claimantResponseSpecDataBuilder.buildFastPartAdmitProceed();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantResponseEventData,
    );

    const { claimantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSpecSchemaBuilder.buildFastPartAdmitProceed(caseDataBeforeSubmission);
    ZodHelper.safeParse(claimantResponseSchema, this.ccdCaseData);
  }

  async RespondIntermediatePartAdmitProceed() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData =
      await claimantResponseSpecDataBuilder.buildIntermediatePartAdmitProceed();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantResponseEventData,
    );

    const { claimantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSpecSchemaBuilder.buildIntermediatePartAdmitProceed(
        caseDataBeforeSubmission,
      );
    ZodHelper.safeParse(claimantResponseSchema, this.ccdCaseData);
  }

  async RespondMultiPartAdmitProceed() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData =
      await claimantResponseSpecDataBuilder.buildMultiPartAdmitProceed();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantResponseEventData,
    );

    const { claimantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSpecSchemaBuilder.buildMultiPartAdmitProceed(caseDataBeforeSubmission);
    ZodHelper.safeParse(claimantResponseSchema, this.ccdCaseData);
  }

  async RespondFullAdmitImmediately() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData =
      await claimantResponseSpecDataBuilder.buildFullAdmitImmediately();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantResponseEventData,
    );

    const { claimantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSpecSchemaBuilder.buildFullAdmitImmediately(caseDataBeforeSubmission);
    ZodHelper.safeParse(claimantResponseSchema, this.ccdCaseData);
  }

  async RespondFullAdmitSetDate() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData = await claimantResponseSpecDataBuilder.buildFullAdmitSetDate();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantResponseEventData,
    );

    const { claimantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSpecSchemaBuilder.buildFullAdmitSetDate(caseDataBeforeSubmission);
    ZodHelper.safeParse(claimantResponseSchema, this.ccdCaseData);
  }

  async RespondFullAdmitRepayment() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData =
      await claimantResponseSpecDataBuilder.buildFullAdmitRepayment();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantResponseEventData,
    );

    const { claimantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSpecSchemaBuilder.buildFullAdmitRepayment(caseDataBeforeSubmission);
    ZodHelper.safeParse(claimantResponseSchema, this.ccdCaseData);
  }

  async RespondSmallPartAdmitProceed() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData =
      await claimantResponseSpecDataBuilder.buildSmallPartAdmitProceed();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantResponseEventData,
    );

    const { claimantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSpecSchemaBuilder.buildSmallPartAdmitProceed(caseDataBeforeSubmission);
    ZodHelper.safeParse(claimantResponseSchema, this.ccdCaseData);
  }

  async RespondSmallFullDefenceProceed() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData = await claimantResponseSpecDataBuilder.buildSmall();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantResponseEventData,
      CaseState.IN_MEDIATION,
    );

    const { claimantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSpecSchemaBuilder.buildSmall(caseDataBeforeSubmission);
    ZodHelper.safeParse(claimantResponseSchema, this.ccdCaseData);
  }

  async RespondFastFullDefenceProceed2v1() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData = await claimantResponseSpecDataBuilder.buildFast2v1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantResponseEventData,
      CaseState.JUDICIAL_REFERRAL,
    );

    const { claimantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSpecSchemaBuilder.buildFast2v1(caseDataBeforeSubmission);
    ZodHelper.safeParse(claimantResponseSchema, this.ccdCaseData);
  }

  async RespondSmallFullDefenceProceed2v1() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData = await claimantResponseSpecDataBuilder.buildSmall2v1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantResponseEventData,
      CaseState.IN_MEDIATION,
    );

    const { claimantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSpecSchemaBuilder.buildSmall2v1(caseDataBeforeSubmission);
    ZodHelper.safeParse(claimantResponseSchema, this.ccdCaseData);
  }

  async RespondFastFullDefenceProceed1v2SS() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData = await claimantResponseSpecDataBuilder.buildFast1v2SS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantResponseEventData,
      CaseState.JUDICIAL_REFERRAL,
    );

    const { claimantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSpecSchemaBuilder.buildFast1v2SS(caseDataBeforeSubmission);
    ZodHelper.safeParse(claimantResponseSchema, this.ccdCaseData);
  }

  async RespondFastFullDefenceNotProceed1v2SS() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData =
      await claimantResponseSpecDataBuilder.buildFast1v2SSDoNotProceed();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantResponseEventData,
      CaseState.AWAITING_APPLICANT_INTENTION,
    );

    const { claimantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSpecSchemaBuilder.buildFastDoNotProceed1v2SS(caseDataBeforeSubmission);
    ZodHelper.safeParse(claimantResponseSchema, this.ccdCaseData);
  }

  async RespondSmallFullDefenceProceed1v2DS() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData = await claimantResponseSpecDataBuilder.buildSmall1v2DS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE_SPEC,
      claimantResponseEventData,
      CaseState.IN_MEDIATION,
    );

    const { claimantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSpecSchemaBuilder.buildSmall1v2DS(caseDataBeforeSubmission);
    ZodHelper.safeParse(claimantResponseSchema, this.ccdCaseData);
  }

  async EvidenceUploadFast() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { evidenceUploadApplicantDataBuilder } =
      this.claimantDefendantSolicitorDataBuilderFactory;
    const evidenceUploadApplicantData = await evidenceUploadApplicantDataBuilder.buildFast();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.EVIDENCE_UPLOAD_APPLICANT,
      evidenceUploadApplicantData,
      CaseState.CASE_PROGRESSION,
    );

    const { evidenceUploadApplicantSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const evidenceUploadApplicantSchema =
      await evidenceUploadApplicantSchemaBuilder.buildFast(caseDataBeforeSubmission);
    ZodHelper.safeParse(evidenceUploadApplicantSchema, this.ccdCaseData);
  }

  async EvidenceUploadSmallTrack() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { evidenceUploadApplicantDataBuilder } =
      this.claimantDefendantSolicitorDataBuilderFactory;
    const evidenceUploadApplicantData = await evidenceUploadApplicantDataBuilder.buildSmall();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.EVIDENCE_UPLOAD_APPLICANT,
      evidenceUploadApplicantData,
      CaseState.CASE_PROGRESSION,
    );

    const { evidenceUploadApplicantSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const evidenceUploadApplicantSchema =
      await evidenceUploadApplicantSchemaBuilder.buildSmallClaim(caseDataBeforeSubmission);
    ZodHelper.safeParse(evidenceUploadApplicantSchema, this.ccdCaseData);
  }

  async AmendRespondent1ResponseDeadline() {
    await this.setupApiStep(claimantOrganisationSuperUser);
    const newRespondent1Deadline = DateHelper.subtractFromToday({ days: 1 });
    const dateString = DateHelper.formatDateToString(newRespondent1Deadline, {
      outputFormat: 'YYYY-MM-DDTHH:MM:SS',
    });
    const respondent1Deadline = { respondent1ResponseDeadline: dateString };
    const { civilServiceRequests } = this.requestsFactory;
    await civilServiceRequests.updateCaseData(
      claimantOrganisationSuperUser,
      respondent1Deadline,
      this.ccdCaseData?.id,
    );
    await super.fetchAndSetCCDCaseData();
  }

  async DefaultJudgementSpec() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { defaultJudgementSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const requestDefaultJudgementSpecData = await defaultJudgementSpecDataBuilder.build();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.DEFAULT_JUDGEMENT_SPEC,
      requestDefaultJudgementSpecData,
    );

    const { defaultJudgementSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defaultJudgementSpecSchema =
      await defaultJudgementSpecSchemaBuilder.build(caseDataBeforeSubmission);
    ZodHelper.safeParse(defaultJudgementSpecSchema, this.ccdCaseData);
  }

  async DefaultJudgementSpec1v2() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { defaultJudgementSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const requestDefaultJudgementSpecData = await defaultJudgementSpecDataBuilder.build1v2SSNonDivergent();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.DEFAULT_JUDGEMENT_SPEC,
      requestDefaultJudgementSpecData,
      CaseState.PROCEEDS_IN_HERITAGE_SYSTEM,
    );

    const { defaultJudgementSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defaultJudgementSpecSchema =
      await defaultJudgementSpecSchemaBuilder.build(caseDataBeforeSubmission);
    ZodHelper.safeParse(defaultJudgementSpecSchema, this.ccdCaseData);
  }

  async AmendRespondent2ResponseDeadline() {
    await this.setupApiStep(claimantOrganisationSuperUser);
    const newRespondent2Deadline = DateHelper.subtractFromToday({ days: 1 });
    const dateString = DateHelper.formatDateToString(newRespondent2Deadline, {
      outputFormat: 'YYYY-MM-DDTHH:MM:SS',
    });
    const respondent2ResponseDeadline = { respondent2ResponseDeadline: dateString };
    const { civilServiceRequests } = this.requestsFactory;
    await civilServiceRequests.updateCaseData(
      claimantOrganisationSuperUser,
      respondent2ResponseDeadline,
      this.ccdCaseData?.id,
    );
    await super.fetchAndSetCCDCaseData();
  }
}
