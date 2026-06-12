import BaseApi from '../../../base/base-api';
import { judgeRegion1User } from '../../../config/users/exui-users';
import CaseState from '../../../constants/cases/case-state';
import ccdEvents from '../../../constants/ccd-events/ccd-events';
import fastTrackDirectionsTask from '../../../constants/wa-tasks/fastTrackDirectionsTask';
import smallClaimDirectionsTask from '../../../constants/wa-tasks/smallClaimDirectionsTask'
import { AllMethodsStep } from '../../../decorators/test-steps';
import ZodHelper from '../../../helpers/zod-helper';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import JudgeDataBuilderFactory from '../../../data-builders/exui/judge/judge-data-builder-factory';
import JudgeSchemaBuilderFactory from '../../../schema-builders/exui/judge/judge-schema-builder-factory';

@AllMethodsStep()
export default class JudgeApiSteps extends BaseApi {
  private judgeDataBuilderFactory: JudgeDataBuilderFactory;
  private judgeSchemaBuilderFactory: JudgeSchemaBuilderFactory;

  constructor(
    judgeDataBuilderFactory: JudgeDataBuilderFactory,
    judgeSchemaBuilderFactory: JudgeSchemaBuilderFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this.judgeDataBuilderFactory = judgeDataBuilderFactory;
    this.judgeSchemaBuilderFactory = judgeSchemaBuilderFactory;
  }

  async SdoFastTrack() {
    await this.setupApiStep(judgeRegion1User);
    const taskId = await super.retrieveAndAssignWATask(judgeRegion1User, fastTrackDirectionsTask);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { createSdoDataBuilder } = this.judgeDataBuilderFactory;
    const createSdoData = await createSdoDataBuilder.buildFastTrackSdo();

    await super.submitCCDEvent(
      judgeRegion1User,
      ccdEvents.CREATE_SDO,
      createSdoData,
      CaseState.CASE_PROGRESSION,
    );
    await this.completeWATask(judgeRegion1User, taskId);

    const { createSdoSchemaBuilder } = this.judgeSchemaBuilderFactory;
    const createSdoSchema = await createSdoSchemaBuilder.buildFastTrackSdo(caseDataBeforeSubmission);
    ZodHelper.safeParse(createSdoSchema, this.ccdCaseData);
  }

  async SdoSmallTrackSum() {
    await this.setupApiStep(judgeRegion1User);
    const taskId = await super.retrieveAndAssignWATask(judgeRegion1User, smallClaimDirectionsTask);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { createSdoDataBuilder } = this.judgeDataBuilderFactory;
    const createSdoData = await createSdoDataBuilder.buildSmallTrackSumSdo();

    await super.submitCCDEvent(
      judgeRegion1User,
      ccdEvents.CREATE_SDO,
      createSdoData,
      CaseState.CASE_PROGRESSION,
    );
    await this.completeWATask(judgeRegion1User, taskId);

    const { createSdoSchemaBuilder } = this.judgeSchemaBuilderFactory;
    const createSdoSchema =
      await createSdoSchemaBuilder.buildSmallTrackSumSdo(caseDataBeforeSubmission);
    ZodHelper.safeParse(createSdoSchema, this.ccdCaseData);
  }

  async SdoTrail() {
    await this.setupApiStep(judgeRegion1User);
    const taskId = await super.retrieveAndAssignWATask(judgeRegion1User, fastTrackDirectionsTask);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { createSdoDataBuilder } = this.judgeDataBuilderFactory;
    const createSdoData = await createSdoDataBuilder.buildTrailSdo();

    await super.submitCCDEvent(
      judgeRegion1User,
      ccdEvents.CREATE_SDO,
      createSdoData,
      CaseState.CASE_PROGRESSION,
    );
    await this.completeWATask(judgeRegion1User, taskId);

    const { createSdoSchemaBuilder } = this.judgeSchemaBuilderFactory;
    const createSdoSchema = await createSdoSchemaBuilder.buildFastTrackSdo(caseDataBeforeSubmission);
    ZodHelper.safeParse(createSdoSchema, this.ccdCaseData);
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
}
