import BaseApi from '../../../base/base-api';
import { civilAdminUser, ctscAdminUser } from '../../../config/users/exui-users';
import ccdEvents from '../../../constants/ccd-events/ccd-events';
import CaseState from '../../../constants/cases/case-state';
import { AllMethodsStep } from '../../../decorators/test-steps';
import ZodHelper from '../../../helpers/zod-helper';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import CaseworkerDataBuilderFactory from '../../../data-builders/exui/caseworker/caseworker-data-builder-factory';
import CaseworkerSchemaBuilderFactory from '../../../schema-builders/exui/caseworker/caseworker-schema-builder-factory';

@AllMethodsStep()
export default class CaseworkerApiSteps extends BaseApi {
  private caseworkerDataBuilderFactory: CaseworkerDataBuilderFactory;
  private caseworkerSchemaBuilderFactory: CaseworkerSchemaBuilderFactory;

  constructor(
    caseworkerDataBuilderFactory: CaseworkerDataBuilderFactory,
    caseworkerSchemaBuilderFactory: CaseworkerSchemaBuilderFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this.caseworkerDataBuilderFactory = caseworkerDataBuilderFactory;
    this.caseworkerSchemaBuilderFactory = caseworkerSchemaBuilderFactory;
  }

  async AddCaseNote() {
    await this.setupApiStep(civilAdminUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { addCaseNoteDataBuilder } = this.caseworkerDataBuilderFactory;
    const addCaseNoteData = await addCaseNoteDataBuilder.buildData();
    await super.submitCCDEvent(
      civilAdminUser,
      ccdEvents.ADD_CASE_NOTE,
      addCaseNoteData,
      CaseState.CASE_ISSUED,
    );

    const { addCaseNoteSchemaBuilder } = this.caseworkerSchemaBuilderFactory;
    const addCaseNoteSchema = await addCaseNoteSchemaBuilder.buildData(caseDataBeforeSubmission);
    ZodHelper.safeParse(addCaseNoteSchema, this.ccdCaseData);
  }

  async AmendPartyDetails() {
    await this.setupApiStep(civilAdminUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { amendPartyDetailsDataBuilder } = this.caseworkerDataBuilderFactory;
    const amendPartyDetailsData = await amendPartyDetailsDataBuilder.buildData();
    await super.submitCCDEvent(
      civilAdminUser,
      ccdEvents.AMEND_PARTY_DETAILS,
      amendPartyDetailsData,
      CaseState.AWAITING_RESPONDENT_ACKNOWLEDGEMENT,
    );

    const { amendPartyDetailsSchemaBuilder } = this.caseworkerSchemaBuilderFactory;
    const amendPartyDetailsSchema = await amendPartyDetailsSchemaBuilder.buildData(caseDataBeforeSubmission);
    ZodHelper.safeParse(amendPartyDetailsSchema, this.ccdCaseData);
  }

  async MediationUnsuccessful() {
    await this.setupApiStep(civilAdminUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { mediationUnsuccessfulDataBuilder } = this.caseworkerDataBuilderFactory;
    const mediationUnsuccessfulData = await mediationUnsuccessfulDataBuilder.buildData();
    await super.submitCCDEvent(
      civilAdminUser,
      ccdEvents.MEDIATION_UNSUCCESSFUL,
      mediationUnsuccessfulData,
      CaseState.JUDICIAL_REFERRAL,
    );

    const { mediationUnsuccessfulSchemaBuilder } = this.caseworkerSchemaBuilderFactory;
    const mediationUnsuccessfulSchema =
      await mediationUnsuccessfulSchemaBuilder.buildData(caseDataBeforeSubmission);
    ZodHelper.safeParse(mediationUnsuccessfulSchema, this.ccdCaseData);
  }

  async ManageContactInformation() {
    await this.setupApiStep(civilAdminUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { manageContactInformationDataBuilder } = this.caseworkerDataBuilderFactory;
    const manageContactInformationData =
      await manageContactInformationDataBuilder.buildDS1LegalRepresentation();
    await super.submitCCDEvent(
      civilAdminUser,
      ccdEvents.MANAGE_CONTACT_INFORMATION,
      manageContactInformationData,
    );

    const { manageContactInformationSchemaBuilder } = this.caseworkerSchemaBuilderFactory;
    const manageContactInformationSchema =
      await manageContactInformationSchemaBuilder.buildDS1LegalRepresentation(
        caseDataBeforeSubmission,
      );
    ZodHelper.safeParse(manageContactInformationSchema, this.ccdCaseData);
  }

  async TransferOnlineCase() {
    await this.setupApiStep(civilAdminUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { transferOnlineCaseDataBuilder } = this.caseworkerDataBuilderFactory;
    const transferOnlineCaseData = await transferOnlineCaseDataBuilder.buildData();
    await super.submitCCDEvent(
      civilAdminUser,
      ccdEvents.TRANSFER_ONLINE_CASE,
      transferOnlineCaseData,
    );

    const { transferOnlineCaseSchemaBuilder } = this.caseworkerSchemaBuilderFactory;
    const transferOnlineCaseSchema =
      await transferOnlineCaseSchemaBuilder.buildData(caseDataBeforeSubmission);
    ZodHelper.safeParse(transferOnlineCaseSchema, this.ccdCaseData);
  }

  async SetAsideJudgmentError() {
    await this.setupApiStep(civilAdminUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { setAsideOrderTypeDataBuilder } = this.caseworkerDataBuilderFactory;
    const setAsideOrderTypeData = await setAsideOrderTypeDataBuilder.buildJudgementError();
    await super.submitCCDEvent(
      civilAdminUser,
      ccdEvents.SET_ASIDE_JUDGMENT,
      setAsideOrderTypeData,
    );

    const { setAsideOrderTypeSchemaBuilder } = this.caseworkerSchemaBuilderFactory;
    const setAsideOrderTypeSchema =
      await setAsideOrderTypeSchemaBuilder.buildJudgementError(caseDataBeforeSubmission);
    ZodHelper.safeParse(setAsideOrderTypeSchema, this.ccdCaseData);
  }

  async SetAsideJudgmentOrder() {
    await this.setupApiStep(civilAdminUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { setAsideOrderTypeDataBuilder } = this.caseworkerDataBuilderFactory;
    const setAsideOrderTypeData = await setAsideOrderTypeDataBuilder.buildJudgeOrder();
    await super.submitCCDEvent(
      civilAdminUser,
      ccdEvents.SET_ASIDE_JUDGMENT,
      setAsideOrderTypeData,
    );

    const { setAsideOrderTypeSchemaBuilder } = this.caseworkerSchemaBuilderFactory;
    const setAsideOrderTypeSchema =
      await setAsideOrderTypeSchemaBuilder.buildJudgeOrder(caseDataBeforeSubmission);
    ZodHelper.safeParse(setAsideOrderTypeSchema, this.ccdCaseData);
  }

  async ConfirmOrderReview() {
    await this.setupApiStep(civilAdminUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { confirmOrderReviewDataBuilder } = this.caseworkerDataBuilderFactory;
    const confirmOrderReviewData = await confirmOrderReviewDataBuilder.build();
    await super.submitCCDEvent(
      civilAdminUser,
      ccdEvents.CONFIRM_ORDER_REVIEW,
      confirmOrderReviewData,
    );

    const { confirmOrderReviewSchemaBuilder } = this.caseworkerSchemaBuilderFactory;
    const confirmOrderReviewSchema =
      await confirmOrderReviewSchemaBuilder.build(caseDataBeforeSubmission);
    ZodHelper.safeParse(confirmOrderReviewSchema, this.ccdCaseData);
  }

  async RecordJudgmentDeterMeansImmediately() {
    await this.setupApiStep(civilAdminUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { recordJudgmentDataBuilder } = this.caseworkerDataBuilderFactory;
    const recordJudgmentData = await recordJudgmentDataBuilder.buildDeterMeansImmediately();
    await super.submitCCDEvent(
      civilAdminUser,
      ccdEvents.RECORD_JUDGMENT,
      recordJudgmentData,
    );

    const { recordJudgmentSchemaBuilder } = this.caseworkerSchemaBuilderFactory;
    const recordJudgmentSchema =
      await recordJudgmentSchemaBuilder.buildDeterMeansImmediately(caseDataBeforeSubmission);
    ZodHelper.safeParse(recordJudgmentSchema, this.ccdCaseData);
  }

  async EditJudgmentDeterMeansSetDate() {
    await this.setupApiStep(civilAdminUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { editJudgmentDataBuilder } = this.caseworkerDataBuilderFactory;
    const editJudgmentData = await editJudgmentDataBuilder.buildDeterMeansSetDate();
    await super.submitCCDEvent(
      civilAdminUser,
      ccdEvents.EDIT_JUDGMENT,
      editJudgmentData,
    );

    const { editJudgmentSchemaBuilder } = this.caseworkerSchemaBuilderFactory;
    const editJudgmentSchema =
      await editJudgmentSchemaBuilder.buildDeterMeansSetDate(caseDataBeforeSubmission);
    ZodHelper.safeParse(editJudgmentSchema, this.ccdCaseData);
  }

  async ReferJudgeDefenceReceived() {
    await this.setupApiStep(civilAdminUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { referJudgeDefenceReceivedDataBuilder } = this.caseworkerDataBuilderFactory;
    const referJudgeDefenceReceivedData = await referJudgeDefenceReceivedDataBuilder.build();
    await super.submitCCDEvent(
      civilAdminUser,
      ccdEvents.REFER_JUDGE_DEFENCE_RECEIVED,
      referJudgeDefenceReceivedData,
    );

    const { referJudgeDefenceReceivedSchemaBuilder } = this.caseworkerSchemaBuilderFactory;
    const referJudgeDefenceReceivedSchema =
      await referJudgeDefenceReceivedSchemaBuilder.build(caseDataBeforeSubmission);
    ZodHelper.safeParse(referJudgeDefenceReceivedSchema, this.ccdCaseData);
  }
  
  async ValidateDiscontinueClaimYes() {
    await this.setupApiStep(civilAdminUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { validateDiscontinueClaimClaimantDataBuilder } = this.caseworkerDataBuilderFactory;
    const validateDiscontinueClaimClaimantData =
      await validateDiscontinueClaimClaimantDataBuilder.buildYesPermission();
    await super.submitCCDEvent(
      civilAdminUser,
      ccdEvents.VALIDATE_DISCONTINUE_CLAIM_CLAIMANT,
      validateDiscontinueClaimClaimantData,
      CaseState.CASE_DISCONTINUED,
    );

    const { validateDiscontinueClaimClaimantSchemaBuilder } =
      this.caseworkerSchemaBuilderFactory;
    const validateDiscontinueClaimClaimantSchema =
      await validateDiscontinueClaimClaimantSchemaBuilder.buildYesPermission(
        caseDataBeforeSubmission,
      );
    ZodHelper.safeParse(validateDiscontinueClaimClaimantSchema, this.ccdCaseData);
  }

  async ValidateDiscontinueClaimNo() {
    await this.setupApiStep(civilAdminUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { validateDiscontinueClaimClaimantDataBuilder } = this.caseworkerDataBuilderFactory;
    const validateDiscontinueClaimClaimantData =
      await validateDiscontinueClaimClaimantDataBuilder.buildNoPermission();
    await super.submitCCDEvent(
      civilAdminUser,
      ccdEvents.VALIDATE_DISCONTINUE_CLAIM_CLAIMANT,
      validateDiscontinueClaimClaimantData,
      CaseState.AWAITING_RESPONDENT_ACKNOWLEDGEMENT,
    );

    const { validateDiscontinueClaimClaimantSchemaBuilder } =
      this.caseworkerSchemaBuilderFactory;
    const validateDiscontinueClaimClaimantSchema =
      await validateDiscontinueClaimClaimantSchemaBuilder.buildNoPermission(
        caseDataBeforeSubmission,
      );
    ZodHelper.safeParse(validateDiscontinueClaimClaimantSchema, this.ccdCaseData);
  }

  async SendMessage() {
    await this.setupApiStep(ctscAdminUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { sendAndReplyDataBuilder } = this.caseworkerDataBuilderFactory;
    const sendAndReplyData = await sendAndReplyDataBuilder.buildSendDistrictJudge();
    await super.submitCCDEvent(
      ctscAdminUser,
      ccdEvents.SEND_AND_REPLY,
      sendAndReplyData,
    );

    const { sendAndReplySchemaBuilder } = this.caseworkerSchemaBuilderFactory;
    const sendAndReplySchema = await sendAndReplySchemaBuilder.build(caseDataBeforeSubmission);
    ZodHelper.safeParse(sendAndReplySchema, this.ccdCaseData);
  }

  async ReplyMessage() {
    await this.setupApiStep(civilAdminUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { sendAndReplyDataBuilder } = this.caseworkerDataBuilderFactory;
    const sendAndReplyData = await sendAndReplyDataBuilder.buildReply();
    await super.submitCCDEvent(
      civilAdminUser,
      ccdEvents.SEND_AND_REPLY,
      sendAndReplyData,
    );

    const { sendAndReplySchemaBuilder } = this.caseworkerSchemaBuilderFactory;
    const sendAndReplySchema = await sendAndReplySchemaBuilder.build(caseDataBeforeSubmission);
    ZodHelper.safeParse(sendAndReplySchema, this.ccdCaseData);
  }
}
