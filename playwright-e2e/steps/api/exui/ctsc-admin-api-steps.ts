import BaseApi from '../../../base/base-api';
import { ctscAdminUser } from '../../../config/users/exui-users';
import CaseState from '../../../constants/cases/case-state';
import ccdEvents from '../../../constants/ccd-events/ccd-events/ccd-events';
import gaCCDEvents from '../../../constants/ccd-events/ga-ccd-events/ga-ccd-events';
import GaCaseState from '../../../constants/cases/ga-case-states';
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

    await this.runZodValidation(async () => {
      const { sendAndReplySchemaBuilder } = this.ctscAdminSchemaBuilderFactory;
      const sendAndReplySchema = await sendAndReplySchemaBuilder.build(caseDataBeforeSubmission);
      ZodHelper.safeParse(sendAndReplySchema, this.ccdCaseData);
    });
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
    await this.runZodValidation(async () => {
      const { queryManagementRespondSchemaBuilder } = this.ctscAdminSchemaBuilderFactory;
      const queryManagementRespondSchema =
        await queryManagementRespondSchemaBuilder.buildQueryCtsc(caseDataBeforeSubmission);
      ZodHelper.safeParse(queryManagementRespondSchema, this.ccdCaseData);
    });
  }

  /**
   * Refuses the Help with Fees application on a general application.
   *
   * NO_REMISSION_HWF_GA is one of the five events whose handler sets
   * BusinessProcess.readyGa(NOTIFY_APPLICANT_LIP_HWF), which starts GA_NOTIFY_HWF. That process was
   * moved onto the Notifier framework by DTSCCI-6726 and nothing reached it before this step.
   *
   * The assertion is the business process wait inside submitGaCCDEvent, not the state. The event's
   * PostConditionState is '*' so the state does not move, while the wait fails on a Camunda
   * incident, which is what the notify task raises if GaNotifierFactory cannot resolve the activity
   * id or CCD refuses NOTIFY_EVENT for the GENERALAPPLICATION case type.
   */
  async RefuseHelpWithFeesOnGA() {
    await this.setupApiStep(ctscAdminUser);

    const { noRemissionHwfGaDataBuilder } = this.ctscAdminDataBuilderFactory;
    await super.submitGaCCDEvent(
      ctscAdminUser,
      gaCCDEvents.NO_REMISSION_HWF_GA,
      await noRemissionHwfGaDataBuilder.buildApplicationFee(),
      { expectedState: GaCaseState.AWAITING_APPLICATION_PAYMENT },
    );
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

    await this.runZodValidation(async () => {
      const { queryManagementRespondSchemaBuilder } = this.ctscAdminSchemaBuilderFactory;
      const queryManagementRespondSchema =
        await queryManagementRespondSchemaBuilder.buildQueryCtsc(caseDataBeforeSubmission);
      ZodHelper.safeParse(queryManagementRespondSchema, this.ccdCaseData);
    });
  }
}
