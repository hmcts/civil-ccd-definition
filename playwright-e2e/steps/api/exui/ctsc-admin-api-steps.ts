import BaseApi from '../../../base/base-api';
import { ctscAdminUser } from '../../../config/users/exui-users';
import ccdEvents from '../../../constants/ccd-events/ccd-events/ccd-events';
import respondToHearingQueryCtscTask from '../../../constants/wa-tasks/exui/respondToHearingQueryCtscTask';
import respondToQueryCtscTask from '../../../constants/wa-tasks/exui/respondToQueryCtscTask';
import CtscAdminDataBuilderFactory from '../../../data-builders/exui/ctsc-admin/ctsc-admin-data-builder-factory';
import { AllMethodsStep } from '../../../decorators/test-steps';
import ZodHelper from '../../../helpers/zod-helper';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import CtscAdminSchemaBuilderFactory from '../../../schema-builders/exui/ctsc-admin/ctsc-admin-schema-builder-factory';

@AllMethodsStep()
export default class CtscAdminApiSteps extends BaseApi {
  private ctscAdminDataBuilderFactory: CtscAdminDataBuilderFactory;
  private ctscAdminSchemaBuilderFactory: CtscAdminSchemaBuilderFactory;

  constructor(
    ctscAdminDataBuilderFactory: CtscAdminDataBuilderFactory,
    ctscAdminSchemaBuilderFactory: CtscAdminSchemaBuilderFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this.ctscAdminDataBuilderFactory = ctscAdminDataBuilderFactory;
    this.ctscAdminSchemaBuilderFactory = ctscAdminSchemaBuilderFactory;
  }

  async SendMessage() {
    await this.setupApiStep(ctscAdminUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { sendAndReplyDataBuilder } = this.ctscAdminDataBuilderFactory;
    const sendAndReplyData = await sendAndReplyDataBuilder.buildSendDistrictJudge();
    await super.submitCCDEvent(
      ctscAdminUser,
      ccdEvents.SEND_AND_REPLY,
      sendAndReplyData,
    );

    const { sendAndReplySchemaBuilder } = this.ctscAdminSchemaBuilderFactory;
    const sendAndReplySchema = await sendAndReplySchemaBuilder.build(caseDataBeforeSubmission);
    ZodHelper.safeParse(sendAndReplySchema, this.ccdCaseData);
  }

  async RespondToQuery() {
    await this.setupApiStep(ctscAdminUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { queryManagementRespondDataBuilder } = this.ctscAdminDataBuilderFactory;
    const queryManagementRespondData = await queryManagementRespondDataBuilder.buildQueryCtsc();
    await super.submitQmWaEvent(
      ctscAdminUser,
      respondToQueryCtscTask,
      ccdEvents.QUERY_MANAGEMENT_RESPOND,
      queryManagementRespondData,
    );
    const { queryManagementRespondSchemaBuilder } = this.ctscAdminSchemaBuilderFactory;
    const queryManagementRespondSchema =
      await queryManagementRespondSchemaBuilder.buildQueryCtsc(caseDataBeforeSubmission);
    ZodHelper.safeParse(queryManagementRespondSchema, this.ccdCaseData);
  }

  async RespondToHearingQuery() {
    await this.setupApiStep(ctscAdminUser);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { queryManagementRespondDataBuilder } = this.ctscAdminDataBuilderFactory;
    const queryManagementRespondData = await queryManagementRespondDataBuilder.buildQueryCtsc();
    await super.submitQmWaEvent(
      ctscAdminUser,
      respondToHearingQueryCtscTask,
      ccdEvents.QUERY_MANAGEMENT_RESPOND,
      queryManagementRespondData,
    );

    const { queryManagementRespondSchemaBuilder } = this.ctscAdminSchemaBuilderFactory;
    const queryManagementRespondSchema =
      await queryManagementRespondSchemaBuilder.buildQueryCtsc(caseDataBeforeSubmission);
    ZodHelper.safeParse(queryManagementRespondSchema, this.ccdCaseData);
  }
}
