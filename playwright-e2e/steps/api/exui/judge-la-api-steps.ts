import BaseApi from '../../../base/base-api';
import { judgeRegion1User } from '../../../config/users/exui-users';
import CaseState from '../../../constants/cases/case-state';
import ccdEvents from '../../../constants/ccd-events/ccd-events';
import fastTrackDirectionsTask from '../../../constants/wa-tasks/fastTrackDirectionsTask';
import { AllMethodsStep } from '../../../decorators/test-steps';
import ZodHelper from '../../../helpers/zod-helper';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import JudgeLADataBuilderFactory from '../../../data-builders/exui/judge-la/judge-la-data-builder-factory';
import JudgeLASchemaBuilderFactory from '../../../schema-builders/exui/judge-la/judge-la-schema-builder-factory';

@AllMethodsStep()
export default class JudgeLAApiSteps extends BaseApi {
  private judgeLADataBuilderFactory: JudgeLADataBuilderFactory;
  private judgeLASchemaBuilderFactory: JudgeLASchemaBuilderFactory;

  constructor(
    judgeLADataBuilderFactory: JudgeLADataBuilderFactory,
    judgeLASchemaBuilderFactory: JudgeLASchemaBuilderFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this.judgeLADataBuilderFactory = judgeLADataBuilderFactory;
    this.judgeLASchemaBuilderFactory = judgeLASchemaBuilderFactory;
  }

  async CreateSdoFastTrack() {
    await this.setupApiStep(judgeRegion1User);
    const taskId = await super.retrieveAndAssignWATask(judgeRegion1User, fastTrackDirectionsTask);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { createSdoDataBuilder } = this.judgeLADataBuilderFactory;
    const createSdoData = await createSdoDataBuilder.buildFastSdo();

    await super.submitCCDEvent(
      judgeRegion1User,
      ccdEvents.CREATE_SDO,
      createSdoData,
      CaseState.CASE_PROGRESSION,
    );
    await this.completeWATask(judgeRegion1User, taskId);

    const { createSdoSchemaBuilder } = this.judgeLASchemaBuilderFactory;
    const createSdoSchema = await createSdoSchemaBuilder.buildCreateFast(caseDataBeforeSubmission);
    ZodHelper.safeParse(createSdoSchema, this.ccdCaseData);
  }
}
