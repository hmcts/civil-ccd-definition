import BaseApi from '../../../base/base-api';
import { judgeRegion1User } from '../../../config/users/exui-users';
import CaseState from '../../../constants/cases/case-state';
import ccdEvents from '../../../constants/ccd-events/ccd-events';
import fastTrackDirectionsTask from '../../../constants/wa-tasks/fastTrackDirectionsTask';
import intermediateTrackDirectionsTask from '../../../constants/wa-tasks/intermediateTrackDirectionsTask';
import nihlFastTrackDirectionsTask from '../../../constants/wa-tasks/nihlFastTrackDirectionsTask';
import multiTrackDirectionsTask from '../../../constants/wa-tasks/multiTrackDirectionsTask';
import reviewMessageFastJudicial from '../../../constants/wa-tasks/reviewMessageFastJudicial';
import smallClaimDirectionsTask from '../../../constants/wa-tasks/smallClaimDirectionsTask';
import summaryJudgmentDirectionsTask from '../../../constants/wa-tasks/summaryJudgmentDirectionsTask';
import { AllMethodsStep } from '../../../decorators/test-steps';
import ZodHelper from '../../../helpers/zod-helper';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import JudgeLADataBuilderFactory from '../../../data-builders/exui/judge-la/judge-la-data-builder-factory';
import JudgeLASchemaBuilderFactory from '../../../schema-builders/exui/judge-la/judge-la-schema-builder-factory';

@AllMethodsStep()
export default class JudgeApiSteps extends BaseApi {
  private judgeDataBuilderFactory: JudgeLADataBuilderFactory;
  private judgeSchemaBuilderFactory: JudgeLASchemaBuilderFactory;

  constructor(
    judgeDataBuilderFactory: JudgeLADataBuilderFactory,
    judgeSchemaBuilderFactory: JudgeLASchemaBuilderFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this.judgeDataBuilderFactory = judgeDataBuilderFactory;
    this.judgeSchemaBuilderFactory = judgeSchemaBuilderFactory;
  }

  async SdoFast() {
    await this.setupApiStep(judgeRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { createSdoDataBuilder } = this.judgeDataBuilderFactory;
    const createSdoData = await createSdoDataBuilder.buildFastSdo();

    await super.submitWAEvent(
      judgeRegion1User,
      fastTrackDirectionsTask,
      ccdEvents.CREATE_SDO,
      createSdoData,
      CaseState.CASE_PROGRESSION,
    );

    const { createSdoSchemaBuilder } = this.judgeSchemaBuilderFactory;
    const createSdoSchema = await createSdoSchemaBuilder.buildFastSdo(caseDataBeforeSubmission);
    ZodHelper.safeParse(createSdoSchema, this.ccdCaseData);
  }

  async SdoFastNIHL() {
    await this.setupApiStep(judgeRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { createSdoDataBuilder } = this.judgeDataBuilderFactory;
    const createSdoData = await createSdoDataBuilder.buildFastNIHLSdo();

    await super.submitWAEvent(
      judgeRegion1User,
      nihlFastTrackDirectionsTask,
      ccdEvents.CREATE_SDO,
      createSdoData,
      CaseState.CASE_PROGRESSION,
    );

    const { createSdoSchemaBuilder } = this.judgeSchemaBuilderFactory;
    const createSdoSchema = await createSdoSchemaBuilder.buildFastNIHLSdo(caseDataBeforeSubmission);
    ZodHelper.safeParse(createSdoSchema, this.ccdCaseData);
  }

  async SdoSmallTrackSum() {
    await this.setupApiStep(judgeRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { createSdoDataBuilder } = this.judgeDataBuilderFactory;
    const createSdoData = await createSdoDataBuilder.buildSmallSumSdo();

    await super.submitWAEvent(
      judgeRegion1User,
      smallClaimDirectionsTask,
      ccdEvents.CREATE_SDO,
      createSdoData,
      CaseState.CASE_PROGRESSION,
    );

    const { createSdoSchemaBuilder } = this.judgeSchemaBuilderFactory;
    const createSdoSchema = await createSdoSchemaBuilder.buildSmallSumSdo(caseDataBeforeSubmission);
    ZodHelper.safeParse(createSdoSchema, this.ccdCaseData);
  }

  async SdoSmallTrackNoSum() {
    await this.setupApiStep(judgeRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { createSdoDataBuilder } = this.judgeDataBuilderFactory;
    const createSdoData = await createSdoDataBuilder.buildSmallNoSumSdo();

    await super.submitWAEvent(
      judgeRegion1User,
      smallClaimDirectionsTask,
      ccdEvents.CREATE_SDO,
      createSdoData,
      CaseState.CASE_PROGRESSION,
    );

    const { createSdoSchemaBuilder } = this.judgeSchemaBuilderFactory;
    const createSdoSchema =
      await createSdoSchemaBuilder.buildSmallNoSumSdo(caseDataBeforeSubmission);
    ZodHelper.safeParse(createSdoSchema, this.ccdCaseData);
  }

  async SdoSmallTrackSumDRH() {
    await this.setupApiStep(judgeRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { createSdoDataBuilder } = this.judgeDataBuilderFactory;
    const createSdoData = await createSdoDataBuilder.buildSmallSumDRHSdo();

    await super.submitWAEvent(
      judgeRegion1User,
      smallClaimDirectionsTask,
      ccdEvents.CREATE_SDO,
      createSdoData,
      CaseState.CASE_PROGRESSION,
    );

    const { createSdoSchemaBuilder } = this.judgeSchemaBuilderFactory;
    const createSdoSchema =
      await createSdoSchemaBuilder.buildSmallSumDRHSdo(caseDataBeforeSubmission);
    ZodHelper.safeParse(createSdoSchema, this.ccdCaseData);
  }

  async SdoSmallTrackNoSumDRH() {
    await this.setupApiStep(judgeRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { createSdoDataBuilder } = this.judgeDataBuilderFactory;
    const createSdoData = await createSdoDataBuilder.buildSmallNoSumDRHSdo();

    await super.submitWAEvent(
      judgeRegion1User,
      smallClaimDirectionsTask,
      ccdEvents.CREATE_SDO,
      createSdoData,
      CaseState.CASE_PROGRESSION,
    );

    const { createSdoSchemaBuilder } = this.judgeSchemaBuilderFactory;
    const createSdoSchema =
      await createSdoSchemaBuilder.buildSmallNoSumDRHSdo(caseDataBeforeSubmission);
    ZodHelper.safeParse(createSdoSchema, this.ccdCaseData);
  }

  async SdoTrail() {
    await this.setupApiStep(judgeRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { createSdoDataBuilder } = this.judgeDataBuilderFactory;
    const createSdoData = await createSdoDataBuilder.buildTrailSdo();

    await super.submitWAEvent(
      judgeRegion1User,
      fastTrackDirectionsTask,
      ccdEvents.CREATE_SDO,
      createSdoData,
      CaseState.CASE_PROGRESSION,
    );

    const { createSdoSchemaBuilder } = this.judgeSchemaBuilderFactory;
    const createSdoSchema = await createSdoSchemaBuilder.buildTrailSdo(caseDataBeforeSubmission);
    ZodHelper.safeParse(createSdoSchema, this.ccdCaseData);
  }

  async SdoTrailNIHL() {
    await this.setupApiStep(judgeRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { createSdoDataBuilder } = this.judgeDataBuilderFactory;
    const createSdoData = await createSdoDataBuilder.buildTrailNIHLSdo();

    await super.submitWAEvent(
      judgeRegion1User,
      nihlFastTrackDirectionsTask,
      ccdEvents.CREATE_SDO,
      createSdoData,
      CaseState.CASE_PROGRESSION,
    );

    const { createSdoSchemaBuilder } = this.judgeSchemaBuilderFactory;
    const createSdoSchema =
      await createSdoSchemaBuilder.buildTrailNIHLSdo(caseDataBeforeSubmission);
    ZodHelper.safeParse(createSdoSchema, this.ccdCaseData);
  }

  async SdoDJDisposal() {
    await this.setupApiStep(judgeRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { sdoDJDataBuilder } = this.judgeDataBuilderFactory;
    const sdoDJData = await sdoDJDataBuilder.buildDisposalHearing();

    await super.submitWAEvent(
      judgeRegion1User,
      summaryJudgmentDirectionsTask,
      ccdEvents.STANDARD_DIRECTION_ORDER_DJ,
      sdoDJData,
      CaseState.CASE_PROGRESSION,
    );

    const { sdoDJSchemaBuilder } = this.judgeSchemaBuilderFactory;
    const sdoDJSchema = await sdoDJSchemaBuilder.buildDisposalHearing(caseDataBeforeSubmission);
    ZodHelper.safeParse(sdoDJSchema, this.ccdCaseData);
  }

  async SdoDJTrail() {
    await this.setupApiStep(judgeRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { sdoDJDataBuilder } = this.judgeDataBuilderFactory;
    const sdoDJData = await sdoDJDataBuilder.buildTrial();

    await super.submitWAEvent(
      judgeRegion1User,
      summaryJudgmentDirectionsTask,
      ccdEvents.STANDARD_DIRECTION_ORDER_DJ,
      sdoDJData,
      CaseState.CASE_PROGRESSION,
    );

    const { sdoDJSchemaBuilder } = this.judgeSchemaBuilderFactory;
    const sdoDJSchema = await sdoDJSchemaBuilder.buildTrial(caseDataBeforeSubmission);
    ZodHelper.safeParse(sdoDJSchema, this.ccdCaseData);
  }

  async GenerateDirectionsOrderAssistedOrder() {
    await this.setupApiStep(judgeRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { generateDirectionsOrderDataBuilder } = this.judgeDataBuilderFactory;
    const generateDirectionsOrderData =
      await generateDirectionsOrderDataBuilder.buildAssistedOrder();
    await super.submitCCDEvent(
      judgeRegion1User,
      ccdEvents.GENERATE_DIRECTIONS_ORDER,
      generateDirectionsOrderData,
    );

    const { generateDirectionsOrderSchemaBuilder } = this.judgeSchemaBuilderFactory;
    const generateDirectionsOrderSchema =
      await generateDirectionsOrderSchemaBuilder.buildAssistedOrder(caseDataBeforeSubmission);
    ZodHelper.safeParse(generateDirectionsOrderSchema, this.ccdCaseData);
  }

  async GenerateDirectionsOrderFreeFormOrder() {
    await this.setupApiStep(judgeRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { generateDirectionsOrderDataBuilder } = this.judgeDataBuilderFactory;
    const generateDirectionsOrderData =
      await generateDirectionsOrderDataBuilder.buildFreeFormOrder();
    await super.submitCCDEvent(
      judgeRegion1User,
      ccdEvents.GENERATE_DIRECTIONS_ORDER,
      generateDirectionsOrderData,
    );

    const { generateDirectionsOrderSchemaBuilder } = this.judgeSchemaBuilderFactory;
    const generateDirectionsOrderSchema =
      await generateDirectionsOrderSchemaBuilder.buildFreeFormOrder(caseDataBeforeSubmission);
    ZodHelper.safeParse(generateDirectionsOrderSchema, this.ccdCaseData);
  }

  async GenerateDirectionsOrderIntermediate() {
    await this.setupApiStep(judgeRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { generateDirectionsOrderDataBuilder } = this.judgeDataBuilderFactory;
    const generateDirectionsOrderData =
      await generateDirectionsOrderDataBuilder.buildIntermediateOrder();
    await super.submitWAEvent(
      judgeRegion1User,
      intermediateTrackDirectionsTask,
      ccdEvents.GENERATE_DIRECTIONS_ORDER,
      generateDirectionsOrderData,
      CaseState.CASE_PROGRESSION,
    );

    const { generateDirectionsOrderSchemaBuilder } = this.judgeSchemaBuilderFactory;
    const generateDirectionsOrderSchema =
      await generateDirectionsOrderSchemaBuilder.buildIntermediateOrder(caseDataBeforeSubmission);
    ZodHelper.safeParse(generateDirectionsOrderSchema, this.ccdCaseData);
  }

  async GenerateDirectionsOrderMulti() {
    await this.setupApiStep(judgeRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { generateDirectionsOrderDataBuilder } = this.judgeDataBuilderFactory;
    const generateDirectionsOrderData = await generateDirectionsOrderDataBuilder.buildMultiOrder();
    await super.submitWAEvent(
      judgeRegion1User,
      multiTrackDirectionsTask,
      ccdEvents.GENERATE_DIRECTIONS_ORDER,
      generateDirectionsOrderData,
      CaseState.CASE_PROGRESSION,
    );

    const { generateDirectionsOrderSchemaBuilder } = this.judgeSchemaBuilderFactory;
    const generateDirectionsOrderSchema =
      await generateDirectionsOrderSchemaBuilder.buildMultiOrder(caseDataBeforeSubmission);
    ZodHelper.safeParse(generateDirectionsOrderSchema, this.ccdCaseData);
  }

  async NotSuitableSdoChangeLocation() {
    await this.setupApiStep(judgeRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { notSuitableSdoDataBuilder } = this.judgeDataBuilderFactory;
    const notSuitableSdoData = await notSuitableSdoDataBuilder.buildChangeLocation();
    await super.submitCCDEvent(
      judgeRegion1User,
      ccdEvents.NOT_SUITABLE_SDO,
      notSuitableSdoData,
    );

    const { notSuitableSdoSchemaBuilder } = this.judgeSchemaBuilderFactory;
    const notSuitableSdoSchema =
      await notSuitableSdoSchemaBuilder.buildChangeLocation(caseDataBeforeSubmission);
    ZodHelper.safeParse(notSuitableSdoSchema, this.ccdCaseData);
  }

  async NotSuitableSdoOther() {
    await this.setupApiStep(judgeRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { notSuitableSdoDataBuilder } = this.judgeDataBuilderFactory;
    const notSuitableSdoData = await notSuitableSdoDataBuilder.buildOtherReasons();
    await super.submitCCDEvent(
      judgeRegion1User,
      ccdEvents.NOT_SUITABLE_SDO,
      notSuitableSdoData,
    );

    const { notSuitableSdoSchemaBuilder } = this.judgeSchemaBuilderFactory;
    const notSuitableSdoSchema =
      await notSuitableSdoSchemaBuilder.buildOtherReasons(caseDataBeforeSubmission);
    ZodHelper.safeParse(notSuitableSdoSchema, this.ccdCaseData);
  }

  async ReplyMessage() {
    await this.setupApiStep(judgeRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { sendAndReplyDataBuilder } = this.judgeDataBuilderFactory;
    const sendAndReplyData = await sendAndReplyDataBuilder.buildReply();
    await super.submitCCDEvent(
      judgeRegion1User,
      ccdEvents.SEND_AND_REPLY,
      sendAndReplyData,
    );

    const { sendAndReplySchemaBuilder } = this.judgeSchemaBuilderFactory;
    const sendAndReplySchema = await sendAndReplySchemaBuilder.build(caseDataBeforeSubmission);
    ZodHelper.safeParse(sendAndReplySchema, this.ccdCaseData);
  }
}
