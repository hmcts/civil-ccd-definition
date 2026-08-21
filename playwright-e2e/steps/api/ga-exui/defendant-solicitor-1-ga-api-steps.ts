import BaseApi from '../../../base/base-api';
import { defendantSolicitor1User } from '../../../config/users/exui-users';
import GaCaseState from '../../../constants/cases/ga-case-states';
import gaCCDEvents from '../../../constants/ccd-events/ga-ccd-events/ga-ccd-events';
import ClaimantDefendantSolicitorGaDataBuilderFactory from '../../../data-builders/ga-exui/claimant-defendant-solicitor/claimant-defendant-solicitor-ga-data-builder-factory';
import { AllMethodsStep } from '../../../decorators/test-steps';
import ZodHelper from '../../../helpers/zod-helper';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import ClaimantDefendantSolicitorGaSchemaBuilderFactory from '../../../schema-builders/ga-exui/claimant-defendant-solicitor/claimant-defendant-solicitor-ga-schema-builder-factory';

@AllMethodsStep()
export default class DefendantSolicitor1GaApiSteps extends BaseApi {
  private claimantDefendantSolicitorGaDataBuilderFactory: ClaimantDefendantSolicitorGaDataBuilderFactory;
  private claimantDefendantSolicitorGaSchemaBuilderFactory: ClaimantDefendantSolicitorGaSchemaBuilderFactory;

  constructor(
    claimantDefendantSolicitorGaDataBuilderFactory: ClaimantDefendantSolicitorGaDataBuilderFactory,
    claimantDefendantSolicitorGaSchemaBuilderFactory: ClaimantDefendantSolicitorGaSchemaBuilderFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this.claimantDefendantSolicitorGaDataBuilderFactory = claimantDefendantSolicitorGaDataBuilderFactory;
    this.claimantDefendantSolicitorGaSchemaBuilderFactory = claimantDefendantSolicitorGaSchemaBuilderFactory;
  }

  async RespondToApplicationAgreed() {
    await this.setupApiStep(defendantSolicitor1User);
    const gaCaseDataBeforeSubmission = structuredClone(this.getGaCCDCaseData());

    const { respondToApplicationDataBuilder } = this.claimantDefendantSolicitorGaDataBuilderFactory;
    const respondToApplicationEventData = await respondToApplicationDataBuilder.buildDS1();

    await super.submitGaCCDEvent(
      defendantSolicitor1User,
      gaCCDEvents.RESPOND_TO_APPLICATION,
      respondToApplicationEventData,
      GaCaseState.APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION
    );

    const { respondToApplicationSchemaBuilder } = this.claimantDefendantSolicitorGaSchemaBuilderFactory;
    const respondToApplicationSchema =
      await respondToApplicationSchemaBuilder.build(gaCaseDataBeforeSubmission);
    ZodHelper.safeParse(respondToApplicationSchema, this.getGaCCDCaseData());
  }

  async RespondToJudgeAddInfo() {
    await this.setupApiStep(defendantSolicitor1User);
    const gaCaseDataBeforeSubmission = structuredClone(this.getGaCCDCaseData());

    const { respondToJudgeAdditionalInfoDataBuilder } = this.claimantDefendantSolicitorGaDataBuilderFactory;
    const respondToJudgeAdditionalInfoEventData =
      await respondToJudgeAdditionalInfoDataBuilder.buildDS1();

    await super.submitGaCCDEvent(
      defendantSolicitor1User,
      gaCCDEvents.RESPOND_TO_JUDGE_ADDITIONAL_INFO,
      respondToJudgeAdditionalInfoEventData,
      GaCaseState.AWAITING_ADDITIONAL_INFORMATION,
    );

    const { respondToJudgeAdditionalInfoSchemaBuilder } = this.claimantDefendantSolicitorGaSchemaBuilderFactory;
    const respondToJudgeAdditionalInfoSchema =
      await respondToJudgeAdditionalInfoSchemaBuilder.build(gaCaseDataBeforeSubmission);
    ZodHelper.safeParse(respondToJudgeAdditionalInfoSchema, this.getGaCCDCaseData());
  }
}
