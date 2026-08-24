import BaseApi from '../../../base/base-api';
import { judgeRegion1User } from '../../../config/users/exui-users';
import GaCaseState from '../../../constants/cases/ga-case-states';
import gaCCDEvents from '../../../constants/ccd-events/ga-ccd-events/ga-ccd-events';
import judgeDecideOnApplicationFast from '../../../constants/wa-tasks/ga-exui/judgeDecideOnApplicationFast';
import JudgeGaDataBuilderFactory from '../../../data-builders/ga-exui/judge/judge-ga-data-builder-factory';
import { AllMethodsStep } from '../../../decorators/test-steps';
import ZodHelper from '../../../helpers/zod-helper';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import JudgeGaSchemaBuilderFactory from '../../../schema-builders/ga-exui/judge/judge-ga-schema-builder-factory';

@AllMethodsStep()
export default class JudgeGaApiSteps extends BaseApi {
  private judgeGaDataBuilderFactory: JudgeGaDataBuilderFactory;
  private judgeGaSchemaBuilderFactory: JudgeGaSchemaBuilderFactory;

  constructor(
    judgeGaDataBuilderFactory: JudgeGaDataBuilderFactory,
    judgeGaSchemaBuilderFactory: JudgeGaSchemaBuilderFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this.judgeGaDataBuilderFactory = judgeGaDataBuilderFactory;
    this.judgeGaSchemaBuilderFactory = judgeGaSchemaBuilderFactory;
  }

  async MakeDecisionAddInfo() {
    await this.setupApiStep(judgeRegion1User);
    const gaCaseDataBeforeSubmission = structuredClone(this.getGaCCDCaseData());

    const { makeDecisionDataBuilder } = this.judgeGaDataBuilderFactory;
    const makeDecisionData = await makeDecisionDataBuilder.buildAddInfo();

    await super.submitGaWaEvent(
      judgeRegion1User,
      judgeDecideOnApplicationFast,
      gaCCDEvents.MAKE_DECISION,
      makeDecisionData,
      { expectedState: GaCaseState.AWAITING_ADDITIONAL_INFORMATION },
    );

    const { makeDecisionSchemaBuilder } = this.judgeGaSchemaBuilderFactory;
    const makeDecisionSchema = await makeDecisionSchemaBuilder.buildAddInfo(gaCaseDataBeforeSubmission);
    ZodHelper.safeParse(makeDecisionSchema, this.getGaCCDCaseData());
  }

  async MakeADecisionListHearing() {
    await this.setupApiStep(judgeRegion1User);
    const gaCaseDataBeforeSubmission = structuredClone(this.getGaCCDCaseData());

    const { makeDecisionDataBuilder } = this.judgeGaDataBuilderFactory;
    const makeDecisionData = await makeDecisionDataBuilder.buildListHearing();

    await super.submitGaWaEvent(
      judgeRegion1User,
      judgeDecideOnApplicationFast,
      gaCCDEvents.MAKE_DECISION,
      makeDecisionData,
      { expectedState: GaCaseState.LISTING_FOR_A_HEARING },
    );

    const { makeDecisionSchemaBuilder } = this.judgeGaSchemaBuilderFactory;
    const makeDecisionSchema = await makeDecisionSchemaBuilder.buildListHearing(gaCaseDataBeforeSubmission);
    ZodHelper.safeParse(makeDecisionSchema, this.getGaCCDCaseData());
  }
}
