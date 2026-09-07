import BaseApi from '../../../base/base-api';
import { hearingCenterAdminRegion1User } from '../../../config/users/exui-users';
import GaCaseState from '../../../constants/cases/ga-case-states';
import gaCCDEvents from '../../../constants/ccd-events/ga-ccd-events/ga-ccd-events';
import scheduleApplicationHearingFast from '../../../constants/wa-tasks/ga-exui/scheduleApplicationHearingFast';
import HearingCenterAdminGaDataBuilderFactory from '../../../data-builders/ga-exui/hearing-center-admin/hearing-center-admin-ga-data-builder-factory';
import { AllMethodsStep } from '../../../decorators/test-steps';
import ZodHelper from '../../../helpers/zod-helper';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import HearingCenterAdminGaSchemaBuilderFactory from '../../../schema-builders/ga-exui/hearing-center-admin/hearing-center-admin-ga-schema-builder-factory';

@AllMethodsStep()
export default class HearingCenterAdminGaApiSteps extends BaseApi {
  private hearingCenterAdminGaDataBuilderFactory: HearingCenterAdminGaDataBuilderFactory;
  private hearingCenterAdminGaSchemaBuilderFactory: HearingCenterAdminGaSchemaBuilderFactory;

  constructor(
    hearingCenterAdminGaDataBuilderFactory: HearingCenterAdminGaDataBuilderFactory,
    hearingCenterAdminGaSchemaBuilderFactory: HearingCenterAdminGaSchemaBuilderFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this.hearingCenterAdminGaDataBuilderFactory = hearingCenterAdminGaDataBuilderFactory;
    this.hearingCenterAdminGaSchemaBuilderFactory = hearingCenterAdminGaSchemaBuilderFactory;
  }

  async HearingScheduledGa() {
    await this.setupApiStep(hearingCenterAdminRegion1User);
    const gaCaseDataBeforeSubmission = structuredClone(this.getGaCCDCaseData());

    const { hearingScheduledGaDataBuilder } = this.hearingCenterAdminGaDataBuilderFactory;
    const hearingScheduledGaData = await hearingScheduledGaDataBuilder.build();

    await super.submitGaWaEvent(
      hearingCenterAdminRegion1User,
      scheduleApplicationHearingFast,
      gaCCDEvents.HEARING_SCHEDULED_GA,
      hearingScheduledGaData,
      {expectedState: GaCaseState.HEARING_SCHEDULED},
    );

    const { hearingScheduledGaSchemaBuilder } = this.hearingCenterAdminGaSchemaBuilderFactory;
    const hearingScheduledGaSchema = await hearingScheduledGaSchemaBuilder.build(gaCaseDataBeforeSubmission);
    ZodHelper.safeParse(hearingScheduledGaSchema, this.getGaCCDCaseData());
  }
}
