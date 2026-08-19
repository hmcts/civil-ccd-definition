import BaseApi from '../../../base/base-api';
import {
  claimantOrganisationSuperUser,
  claimantSolicitorUser,
  otherSolicitorUser1,
} from '../../../config/users/exui-users';
import ccdEvents from '../../../constants/ccd-events/ccd-events';
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
export default class ClaimantSolicitorApiSteps extends BaseApi {
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

  async CreateClaimSmall1v1() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildSmall1v1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildSmall1v1();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async NoticeOfChangeC1() {
    await this.setupApiStep(claimantSolicitorUser);

    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { noticeOfChangeDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const noticeOfChangeAnswers = await noticeOfChangeDataBuilder.buildClaimant1();
    await super.submitNocEvent(
      claimantSolicitorUser,
      undefined,
      noticeOfChangeAnswers,
    );

    const { noticeOfChangeSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const noticeOfChangeSchema =
      await noticeOfChangeSchemaBuilder.buildClaimant1(caseDataBeforeSubmission);
    ZodHelper.safeParse(noticeOfChangeSchema, this.ccdCaseData);
  }

  async CreateClaimFast1v1() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildFast1v1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildFast1v1();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimFastNIHL1v1() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildFastNIHL1v1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildFastNIHL1v1();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimFast1v2DS() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildFast1v2DS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildFast1v2DS();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimFast1v2SS() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildFast1v2SS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildFast1v2SS();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimFast2v1() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildFast2v1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildFast2v1();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimInter1v1() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildInter1v1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildInter1v1();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimInter1v2DS() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildInter1v2DS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildInter1v2DS();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimInter1v2SS() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildInter1v2SS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildInter1v2SS();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimInter2v1() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildInter2v1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildInter2v1();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimMulti1v1() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildMulti1v1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildMulti1v1();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimMulti2v1() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildMulti2v1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildMulti2v1();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimMulti1v2SS() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildMulti1v2SS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildMulti1v2SS();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimMulti1v2DS() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildMulti1v2DS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildMulti1v2DS();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimSmall2v1() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildSmall2v1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildSmall2v1();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimSmall1v2SS() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildSmall1v2SS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildSmall1v2SS();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimSmall1v2DS() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildSmall1v2DS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildSmall1v2DS();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimSmall1vLIP() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildSmall1vLIP();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildSmall1vLIP();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimSmall1v2LIPs() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildSmall1v2LIPs();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildSmall1v2LIPs();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimSmall1v2LRLIP() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildSmall1v2LRLIP();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildSmall1v2LRLIP();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimSmall1v2LIPLR() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildSmall1v2LIPLR();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildSmall1v2LIPLR();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async MakePaymentForClaimIssue() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { createClaimAfterPaymentDataBuilder } =
      this.claimantDefendantSolicitorDataBuilderFactory;
    const paidCreateClaimAfterPaymentDTO = await createClaimAfterPaymentDataBuilder.build(
      'paid',
      this.ccdCaseData?.id,
    );
    const { civilServiceRequests } = this.requestsFactory;
    await civilServiceRequests.updatePaymentForClaimIssue(
      claimantSolicitorUser,
      paidCreateClaimAfterPaymentDTO,
    );
    await super.waitForFinishedBusinessProcess(this.ccdCaseData?.id);
    await super.fetchAndSetCCDCaseData();

    const { createClaimAfterPaymentSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimAfterPaymentSchema =
      await createClaimAfterPaymentSchemaBuilder.build(caseDataBeforeSubmission);
    ZodHelper.safeParse(createClaimAfterPaymentSchema, this.ccdCaseData);
  }

  async MakePaymentForRefund() {
    await this.setupApiStep(claimantSolicitorUser);
    const { paymentRequests } = this.requestsFactory;
    await paymentRequests.createRefundablePayment(claimantSolicitorUser, this.ccdCaseData.id!);
  }

  async MakePaymentForHearingFee() {
    await this.setupApiStep(claimantSolicitorUser);
    const { civilServiceRequests } = this.requestsFactory;
    await civilServiceRequests.triggerHearingFeePaid(claimantSolicitorUser, this.ccdCaseData?.id);
    await super.waitForFinishedBusinessProcess(this.ccdCaseData?.id);
    await super.fetchAndSetCCDCaseData();
  }

  async AmendClaimDocuments() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { addOrAmendClaimDocumentsDataBuilder } =
      this.claimantDefendantSolicitorDataBuilderFactory;
    const addOrAmendClaimDocumentsData = await addOrAmendClaimDocumentsDataBuilder.buildData();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.ADD_OR_AMEND_CLAIM_DOCUMENTS,
      addOrAmendClaimDocumentsData,
      CaseState.CASE_ISSUED,
    );

    const { addOrAmendClaimDocumentsSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const addOrAmendClaimDocumentsSchema =
      await addOrAmendClaimDocumentsSchemaBuilder.buildSchema(caseDataBeforeSubmission);
    ZodHelper.safeParse(addOrAmendClaimDocumentsSchema, this.ccdCaseData);
  }

  async NotifyClaim() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { notifyClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const notifyClaimData = await notifyClaimDataBuilder.build();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      notifyClaimData,
      CaseState.AWAITING_CASE_DETAILS_NOTIFICATION,
    );

    const { notifyClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const notifyClaimSchema = await notifyClaimSchemaBuilder.buildSchema(caseDataBeforeSubmission);
    ZodHelper.safeParse(notifyClaimSchema, this.ccdCaseData);
  }

  async NotifyClaim1vLIP() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { notifyClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const notifyClaimData = await notifyClaimDataBuilder.build1vLIP();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      notifyClaimData,
      CaseState.AWAITING_CASE_DETAILS_NOTIFICATION,
    );

    const { notifyClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const notifyClaimSchema = await notifyClaimSchemaBuilder.build1vLIP(caseDataBeforeSubmission);
    ZodHelper.safeParse(notifyClaimSchema, this.ccdCaseData);
  }

  async NotifyClaim1v2LRLIP() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { notifyClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const notifyClaimData = await notifyClaimDataBuilder.build1v2LRLIP();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      notifyClaimData,
      CaseState.AWAITING_CASE_DETAILS_NOTIFICATION,
    );

    const { notifyClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const notifyClaimSchema =
      await notifyClaimSchemaBuilder.build1v2LRLIP(caseDataBeforeSubmission);
    ZodHelper.safeParse(notifyClaimSchema, this.ccdCaseData);
  }

  async NotifyClaim1v2LIPS() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { notifyClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const notifyClaimData = await notifyClaimDataBuilder.build1v2LIPS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM,
      notifyClaimData,
      CaseState.AWAITING_CASE_DETAILS_NOTIFICATION,
    );

    const { notifyClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const notifyClaimSchema = await notifyClaimSchemaBuilder.build1v2LIPS(caseDataBeforeSubmission);
    ZodHelper.safeParse(notifyClaimSchema, this.ccdCaseData);
  }

  async NotifyClaimDetails() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { notifyClaimDetailsDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const notifyClaimDetailsData = await notifyClaimDetailsDataBuilder.build();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      notifyClaimDetailsData,
      CaseState.AWAITING_RESPONDENT_ACKNOWLEDGEMENT,
    );

    const { notifyClaimDetailsSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const notifyClaimDetailsSchema =
      await notifyClaimDetailsSchemaBuilder.buildSchema(caseDataBeforeSubmission);
    ZodHelper.safeParse(notifyClaimDetailsSchema, this.ccdCaseData);
  }

  async NotifyClaimDetails1vLIP() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { notifyClaimDetailsDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const notifyClaimDetailsData = await notifyClaimDetailsDataBuilder.build1vLIP();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      notifyClaimDetailsData,
      CaseState.AWAITING_RESPONDENT_ACKNOWLEDGEMENT,
    );

    const { notifyClaimDetailsSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const notifyClaimDetailsSchema =
      await notifyClaimDetailsSchemaBuilder.build1vLIP(caseDataBeforeSubmission);
    ZodHelper.safeParse(notifyClaimDetailsSchema, this.ccdCaseData);
  }

  async NotifyClaimDetails1v2LRLIP() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { notifyClaimDetailsDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const notifyClaimDetailsData = await notifyClaimDetailsDataBuilder.build1v2LRLIP();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      notifyClaimDetailsData,
      CaseState.AWAITING_RESPONDENT_ACKNOWLEDGEMENT,
    );

    const { notifyClaimDetailsSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const notifyClaimDetailsSchema =
      await notifyClaimDetailsSchemaBuilder.build1v2LRLIP(caseDataBeforeSubmission);
    ZodHelper.safeParse(notifyClaimDetailsSchema, this.ccdCaseData);
  }

  async NotifyClaimDetails1v2LIPS() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { notifyClaimDetailsDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const notifyClaimDetailsData = await notifyClaimDetailsDataBuilder.build1v2LIPS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS,
      notifyClaimDetailsData,
      CaseState.AWAITING_RESPONDENT_ACKNOWLEDGEMENT,
    );

    const { notifyClaimDetailsSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const notifyClaimDetailsSchema =
      await notifyClaimDetailsSchemaBuilder.build1v2LIPS(caseDataBeforeSubmission);
    ZodHelper.safeParse(notifyClaimDetailsSchema, this.ccdCaseData);
  }

  async ManageContactInformation() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { manageContactInformationDataBuilder } =
      this.claimantDefendantSolicitorDataBuilderFactory;
    const manageContactInformationData = await manageContactInformationDataBuilder.buildClaimant();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.MANAGE_CONTACT_INFORMATION,
      manageContactInformationData,
    );

    const { manageContactInformationSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const manageContactInformationSchema =
      await manageContactInformationSchemaBuilder.build(caseDataBeforeSubmission);
    ZodHelper.safeParse(manageContactInformationSchema, this.ccdCaseData);
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

  async RespondFastProceed() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData = await claimantResponseDataBuilder.buildFastFullDefence1v1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE,
      claimantResponseEventData,
      CaseState.JUDICIAL_REFERRAL,
    );

    const { claimantResponseSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSchemaBuilder.buildFastFullDefence1v1(caseDataBeforeSubmission);
    ZodHelper.safeParse(claimantResponseSchema, this.ccdCaseData);
  }

  async RespondSmallProceed() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData = await claimantResponseDataBuilder.buildSmallFullDefence1v1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE,
      claimantResponseEventData,
      CaseState.JUDICIAL_REFERRAL,
    );

    const { claimantResponseSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSchemaBuilder.buildSmallFullDefence1v1(caseDataBeforeSubmission);
    ZodHelper.safeParse(claimantResponseSchema, this.ccdCaseData);
  }

  async RespondFastProceed2v1() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData = await claimantResponseDataBuilder.buildFastFullDefence2v1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE,
      claimantResponseEventData,
      CaseState.JUDICIAL_REFERRAL,
    );

    const { claimantResponseSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSchemaBuilder.buildFastFullDefence2v1(caseDataBeforeSubmission);
    ZodHelper.safeParse(claimantResponseSchema, this.ccdCaseData);
  }

  async RespondInterProceed2v1() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData =
      await claimantResponseDataBuilder.buildInterFullDefence2v1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE,
      claimantResponseEventData,
      CaseState.JUDICIAL_REFERRAL,
    );

    const { claimantResponseSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSchemaBuilder.buildInterFullDefence2v1(caseDataBeforeSubmission);
    ZodHelper.safeParse(claimantResponseSchema, this.ccdCaseData);
  }

  async RespondMultiProceed2v1() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData = await claimantResponseDataBuilder.buildMultiFullDefence2v1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE,
      claimantResponseEventData,
      CaseState.JUDICIAL_REFERRAL,
    );

    const { claimantResponseSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSchemaBuilder.buildMultiFullDefence2v1(caseDataBeforeSubmission);
    ZodHelper.safeParse(claimantResponseSchema, this.ccdCaseData);
  }

  async RespondFastProceed1v2SS() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData = await claimantResponseDataBuilder.buildFastProceed1v2SS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE,
      claimantResponseEventData,
      CaseState.JUDICIAL_REFERRAL,
    );

    const { claimantResponseSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSchemaBuilder.buildFastProceed1v2SS(caseDataBeforeSubmission);
    ZodHelper.safeParse(claimantResponseSchema, this.ccdCaseData);
  }

  async RespondInterProceed1v2DS() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData =
      await claimantResponseDataBuilder.buildInterProceed1v2DS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE,
      claimantResponseEventData,
      CaseState.JUDICIAL_REFERRAL,
    );

    const { claimantResponseSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSchemaBuilder.buildInterProceed1v2DS(caseDataBeforeSubmission);
    ZodHelper.safeParse(claimantResponseSchema, this.ccdCaseData);
  }

  async RespondInterProceed1v2SS() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData =
      await claimantResponseDataBuilder.buildInterProceed1v2SS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE,
      claimantResponseEventData,
      CaseState.JUDICIAL_REFERRAL,
    );

    const { claimantResponseSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSchemaBuilder.buildInterProceed1v2SS(caseDataBeforeSubmission);
    ZodHelper.safeParse(claimantResponseSchema, this.ccdCaseData);
  }

  async RespondMultiProceed1v2SS() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData = await claimantResponseDataBuilder.buildMultiProceed1v2SS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE,
      claimantResponseEventData,
      CaseState.JUDICIAL_REFERRAL,
    );

    const { claimantResponseSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSchemaBuilder.buildMultiProceed1v2SS(caseDataBeforeSubmission);
    ZodHelper.safeParse(claimantResponseSchema, this.ccdCaseData);
  }

  async RespondFastProceed1v2DS() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData = await claimantResponseDataBuilder.buildFastFullDefence1v2DS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE,
      claimantResponseEventData,
      CaseState.JUDICIAL_REFERRAL,
    );

    const { claimantResponseSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSchemaBuilder.buildFastFullDefence1v2DS(caseDataBeforeSubmission);
    ZodHelper.safeParse(claimantResponseSchema, this.ccdCaseData);
  }

  async RespondMultiProceed1v2DS() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData =
      await claimantResponseDataBuilder.buildMultiFullDefence1v2DS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE,
      claimantResponseEventData,
      CaseState.JUDICIAL_REFERRAL,
    );

    const { claimantResponseSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSchemaBuilder.buildMultiFullDefence1v2DS(caseDataBeforeSubmission);
    ZodHelper.safeParse(claimantResponseSchema, this.ccdCaseData);
  }

  async RespondInterProceed() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData =
      await claimantResponseDataBuilder.buildInterFullDefence1v1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE,
      claimantResponseEventData,
      CaseState.JUDICIAL_REFERRAL,
    );

    const { claimantResponseSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSchemaBuilder.buildInterFullDefence1v1(caseDataBeforeSubmission);
    ZodHelper.safeParse(claimantResponseSchema, this.ccdCaseData);
  }

  async RespondMultiProceed() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { claimantResponseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const claimantResponseEventData = await claimantResponseDataBuilder.buildMultiFullDefence1v1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CLAIMANT_RESPONSE,
      claimantResponseEventData,
      CaseState.JUDICIAL_REFERRAL,
    );

    const { claimantResponseSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const claimantResponseSchema =
      await claimantResponseSchemaBuilder.buildMultiFullDefence1v1(caseDataBeforeSubmission);
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

  async EvidenceUploadFast2v1() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { evidenceUploadApplicantDataBuilder } =
      this.claimantDefendantSolicitorDataBuilderFactory;
    const evidenceUploadApplicantData = await evidenceUploadApplicantDataBuilder.buildFast2v1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.EVIDENCE_UPLOAD_APPLICANT,
      evidenceUploadApplicantData,
      CaseState.CASE_PROGRESSION,
    );

    const { evidenceUploadApplicantSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const evidenceUploadApplicantSchema =
      await evidenceUploadApplicantSchemaBuilder.buildFast2v1(caseDataBeforeSubmission);
    ZodHelper.safeParse(evidenceUploadApplicantSchema, this.ccdCaseData);
  }

  async EvidenceUploadSmall() {
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

  async DefaultJudgement() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { defaultJudgementDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defaultJudgementData = await defaultJudgementDataBuilder.build1v1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.DEFAULT_JUDGEMENT,
      defaultJudgementData,
      CaseState.AWAITING_RESPONDENT_ACKNOWLEDGEMENT,
    );

    const { defaultJudgementSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defaultJudgementSchema =
      await defaultJudgementSchemaBuilder.build1v1(caseDataBeforeSubmission);
    ZodHelper.safeParse(defaultJudgementSchema, this.ccdCaseData);
  }

  async DefaultJudgement1v2SS() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { defaultJudgementDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defaultJudgementData = await defaultJudgementDataBuilder.build1v2SS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.DEFAULT_JUDGEMENT,
      defaultJudgementData,
      CaseState.AWAITING_RESPONDENT_ACKNOWLEDGEMENT,
    );

    const { defaultJudgementSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defaultJudgementSchema =
      await defaultJudgementSchemaBuilder.build1v2SS(caseDataBeforeSubmission);
    ZodHelper.safeParse(defaultJudgementSchema, this.ccdCaseData);
  }
  async CreateClaimFastOtherRemedy1v1() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildFast1v1OtherRemedy();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildFast1v1OtherRemedy();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimSmallOtherRemedy1v1() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildSmall1v1OtherRemedy();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildSmall1v1OtherRemedy();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async DefaultJudgementOtherRemedy() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { defaultJudgementDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defaultJudgementData = await defaultJudgementDataBuilder.buildOtherRemedy1v1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.DEFAULT_JUDGEMENT,
      defaultJudgementData,
      CaseState.AWAITING_RESPONDENT_ACKNOWLEDGEMENT,
    );

    const { defaultJudgementSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defaultJudgementSchema =
      await defaultJudgementSchemaBuilder.build1v1OtherRemedy(caseDataBeforeSubmission);
    ZodHelper.safeParse(defaultJudgementSchema, this.ccdCaseData);
  }

  async ConfirmTrialArrangements() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { trialReadinessDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const trialReadinessData = await trialReadinessDataBuilder.buildClaimant();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.TRIAL_READINESS,
      trialReadinessData,
    );

    const { trialReadinessSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const trialReadinessSchema =
      await trialReadinessSchemaBuilder.buildClaimant(caseDataBeforeSubmission);
    ZodHelper.safeParse(trialReadinessSchema, this.ccdCaseData);
  }
  
  async RaiseLRQuery() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { queryManagementRaiseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    await super.submitQmEvent(
      claimantSolicitorUser,
      ccdEvents.QUERY_MANAGEMENT_RAISE,
      await queryManagementRaiseDataBuilder.buildRaiseQueryCS(),
    );

    const { queryManagementRaiseSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const queryManagementRaiseSchema =
      await queryManagementRaiseSchemaBuilder.buildRaiseQuery(caseDataBeforeSubmission);
    ZodHelper.safeParse(queryManagementRaiseSchema, this.ccdCaseData);
  }

  async RaiseLRHearingQuery() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { queryManagementRaiseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    await super.submitQmEvent(
      claimantSolicitorUser,
      ccdEvents.QUERY_MANAGEMENT_RAISE,
      await queryManagementRaiseDataBuilder.buildRaiseQueryHearingCS(),
    );

    const { queryManagementRaiseSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const queryManagementRaiseSchema =
      await queryManagementRaiseSchemaBuilder.buildRaiseQuery(caseDataBeforeSubmission);
    ZodHelper.safeParse(queryManagementRaiseSchema, this.ccdCaseData);
  }

  async FollowUpOnLRQuery() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { queryManagementRaiseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    await super.submitQmEvent(
      claimantSolicitorUser,
      ccdEvents.QUERY_MANAGEMENT_RAISE,
      await queryManagementRaiseDataBuilder.buildFollowQueryCS(),
    );

    const { queryManagementRaiseSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const queryManagementRaiseSchema =
      await queryManagementRaiseSchemaBuilder.buildFollowUpQuery(caseDataBeforeSubmission);
    ZodHelper.safeParse(queryManagementRaiseSchema, this.ccdCaseData);
  }

  async InitiateGeneralApplication() {
    await this.setupApiStep(claimantSolicitorUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);


    const { initiateGeneralApplicationDataBuilder } =
      this.claimantDefendantSolicitorDataBuilderFactory;
    const initiateGeneralApplicationData =
      await initiateGeneralApplicationDataBuilder.buildCS1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.INITIATE_GENERAL_APPLICATION,
      initiateGeneralApplicationData,
    );

    const { initiateGeneralApplicationSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const initiateGeneralApplicationSchema =
      await initiateGeneralApplicationSchemaBuilder.buildCS1(caseDataBeforeSubmission);
    ZodHelper.safeParse(initiateGeneralApplicationSchema, this.ccdCaseData);

    const { initiateGeneralApplicationGaSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const initiateGeneralApplicationGaSchema =
      await initiateGeneralApplicationGaSchemaBuilder.build();
    ZodHelper.safeParse(initiateGeneralApplicationGaSchema, super.getGaCCDCaseData());
    
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, super.getGaCCDCaseIdFromParentCase());
  }
}
