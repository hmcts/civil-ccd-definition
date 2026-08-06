import BaseApi from '../../../base/base-api';
import { hearingCenterAdminRegion1User } from '../../../config/users/exui-users';
import ccdEvents from '../../../constants/ccd-events/ccd-events';
import CaseState from '../../../constants/cases/case-state';
import scheduleAHearingFastTrack from '../../../constants/wa-tasks/scheduleAHearingFastTrack';
import scheduleAHearing from '../../../constants/wa-tasks/scheduleAHearing';
import { AllMethodsStep } from '../../../decorators/test-steps';
import DateHelper from '../../../helpers/date-helper';
import ZodHelper from '../../../helpers/zod-helper';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import HearingCenterAdminDataBuilderFactory from '../../../data-builders/exui/hearing-center-admin/hearing-center-admin-data-builder-factory';
import HearingCenterAdminSchemaBuilderFactory from '../../../schema-builders/exui/hearing-center-admin/hearing-center-admin-schema-builder-factory';

@AllMethodsStep()
export default class HearingCenterAdminApiSteps extends BaseApi {
  private hearingCenterAdminDataBuilderFactory: HearingCenterAdminDataBuilderFactory;
  private hearingCenterAdminSchemaBuilderFactory: HearingCenterAdminSchemaBuilderFactory;

  constructor(
    hearingCenterAdminDataBuilderFactory: HearingCenterAdminDataBuilderFactory,
    hearingCenterAdminSchemaBuilderFactory: HearingCenterAdminSchemaBuilderFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this.hearingCenterAdminDataBuilderFactory = hearingCenterAdminDataBuilderFactory;
    this.hearingCenterAdminSchemaBuilderFactory = hearingCenterAdminSchemaBuilderFactory;
  }

  async ScheduleHearingFastTrial() {
    await this.setupApiStep(hearingCenterAdminRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { scheduleHearingDataBuilder } = this.hearingCenterAdminDataBuilderFactory;
    const scheduleHearingData = await scheduleHearingDataBuilder.buildFast();
    await super.submitCCDEvent(
      hearingCenterAdminRegion1User,
      ccdEvents.HEARING_SCHEDULED,
      scheduleHearingData,
      CaseState.HEARING_READINESS,
    );

    const { scheduleHearingSchemaBuilder } = this.hearingCenterAdminSchemaBuilderFactory;
    const scheduleHearingSchema =
      await scheduleHearingSchemaBuilder.buildSchema(caseDataBeforeSubmission);
    ZodHelper.safeParse(scheduleHearingSchema, this.ccdCaseData);
  }

  async ScheduleHearingFastTrialWA() {
    await this.setupApiStep(hearingCenterAdminRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { scheduleHearingDataBuilder } = this.hearingCenterAdminDataBuilderFactory;
    const scheduleHearingData = await scheduleHearingDataBuilder.buildFast();
    await super.submitWAEvent(
      hearingCenterAdminRegion1User,
      scheduleAHearingFastTrack,
      ccdEvents.HEARING_SCHEDULED,
      scheduleHearingData,
      CaseState.HEARING_READINESS,
    );

    const { scheduleHearingSchemaBuilder } = this.hearingCenterAdminSchemaBuilderFactory;
    const scheduleHearingSchema =
      await scheduleHearingSchemaBuilder.buildSchema(caseDataBeforeSubmission);
    ZodHelper.safeParse(scheduleHearingSchema, this.ccdCaseData);
  }

  async ScheduleHearingSmallTrail() {
    await this.setupApiStep(hearingCenterAdminRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { scheduleHearingDataBuilder } = this.hearingCenterAdminDataBuilderFactory;
    const scheduleHearingData = await scheduleHearingDataBuilder.buildSmallClaim();
    await super.submitCCDEvent(
      hearingCenterAdminRegion1User,
      ccdEvents.HEARING_SCHEDULED,
      scheduleHearingData,
      CaseState.HEARING_READINESS,
    );

    const { scheduleHearingSchemaBuilder } = this.hearingCenterAdminSchemaBuilderFactory;
    const scheduleHearingSchema =
      await scheduleHearingSchemaBuilder.buildSchema(caseDataBeforeSubmission);
    ZodHelper.safeParse(scheduleHearingSchema, this.ccdCaseData);
  }

  async ScheduleHearingSmallTrailWA() {
    await this.setupApiStep(hearingCenterAdminRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { scheduleHearingDataBuilder } = this.hearingCenterAdminDataBuilderFactory;
    const scheduleHearingData = await scheduleHearingDataBuilder.buildSmallClaim();
    await super.submitWAEvent(
      hearingCenterAdminRegion1User,
      scheduleAHearing,
      ccdEvents.HEARING_SCHEDULED,
      scheduleHearingData,
      CaseState.HEARING_READINESS,
    );

    const { scheduleHearingSchemaBuilder } = this.hearingCenterAdminSchemaBuilderFactory;
    const scheduleHearingSchema =
      await scheduleHearingSchemaBuilder.buildSchema(caseDataBeforeSubmission);
    ZodHelper.safeParse(scheduleHearingSchema, this.ccdCaseData);
  }

  async AmendHearingDueDate() {
    await this.setupApiStep(hearingCenterAdminRegion1User);
    const hearingDueDate = {
      hearingDueDate: DateHelper.formatDateToString(DateHelper.subtractFromToday({ days: 1 }), {
        outputFormat: 'YYYY-MM-DD',
      }),
    };
    const { civilServiceRequests } = this.requestsFactory;
    await civilServiceRequests.updateCaseData(
      hearingCenterAdminRegion1User,
      hearingDueDate,
      this.ccdCaseData?.id,
    );
    await super.fetchAndSetCCDCaseData();
  }

  async StayCase() {
    await this.setupApiStep(hearingCenterAdminRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { stayCaseDataBuilder } = this.hearingCenterAdminDataBuilderFactory;
    const stayCaseData = await stayCaseDataBuilder.build();
    await super.submitCCDEvent(
      hearingCenterAdminRegion1User,
      ccdEvents.STAY_CASE,
      stayCaseData,
      CaseState.CASE_STAYED,
    );

    const { stayCaseSchemaBuilder } = this.hearingCenterAdminSchemaBuilderFactory;
    const stayCaseSchema = await stayCaseSchemaBuilder.build(caseDataBeforeSubmission);
    ZodHelper.safeParse(stayCaseSchema, this.ccdCaseData);
  }

  async ManageStayRequestUpdate() {
    await this.setupApiStep(hearingCenterAdminRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { manageStayDataBuilder } = this.hearingCenterAdminDataBuilderFactory;
    const manageStayData = await manageStayDataBuilder.buildRequestUpdate();
    await super.submitCCDEvent(
      hearingCenterAdminRegion1User,
      ccdEvents.MANAGE_STAY,
      manageStayData,
    );

    const { manageStaySchemaBuilder } = this.hearingCenterAdminSchemaBuilderFactory;
    const manageStaySchema = await manageStaySchemaBuilder.buildRequestUpdate(caseDataBeforeSubmission);
    ZodHelper.safeParse(manageStaySchema, this.ccdCaseData);
  }

  async ManageStayLiftStay() {
    await this.setupApiStep(hearingCenterAdminRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { manageStayDataBuilder } = this.hearingCenterAdminDataBuilderFactory;
    const manageStayData = await manageStayDataBuilder.buildLiftStay();
    await super.submitCCDEvent(
      hearingCenterAdminRegion1User,
      ccdEvents.MANAGE_STAY,
      manageStayData,
    );

    const { manageStaySchemaBuilder } = this.hearingCenterAdminSchemaBuilderFactory;
    const manageStaySchema = await manageStaySchemaBuilder.buildLiftStay(caseDataBeforeSubmission);
    ZodHelper.safeParse(manageStaySchema, this.ccdCaseData);
  }

  async DismissCase() {
    await this.setupApiStep(hearingCenterAdminRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { dismissCaseDataBuilder } = this.hearingCenterAdminDataBuilderFactory;
    const dismissCaseData = await dismissCaseDataBuilder.build();
    await super.submitCCDEvent(
      hearingCenterAdminRegion1User,
      ccdEvents.DISMISS_CASE,
      dismissCaseData,
      CaseState.CASE_DISMISSED,
    );

    const { dismissCaseSchemaBuilder } = this.hearingCenterAdminSchemaBuilderFactory;
    const dismissCaseSchema = await dismissCaseSchemaBuilder.build(caseDataBeforeSubmission);
    ZodHelper.safeParse(dismissCaseSchema, this.ccdCaseData);
  }

  async CreateCaseFlagCaseLevel() {
    await this.setupApiStep(hearingCenterAdminRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { createCaseFlagsDataBuilder } = this.hearingCenterAdminDataBuilderFactory;
    await super.submitCaseFlagsEvent(
      hearingCenterAdminRegion1User,
      ccdEvents.CREATE_CASE_FLAGS,
      await createCaseFlagsDataBuilder.buildCaseFlags(),
    );

    const { createCaseFlagsSchemaBuilder } = this.hearingCenterAdminSchemaBuilderFactory;
    const createCaseFlagsSchema =
      await createCaseFlagsSchemaBuilder.buildCaseFlags(caseDataBeforeSubmission);
    ZodHelper.safeParse(createCaseFlagsSchema, this.ccdCaseData);
  }

  async CreateCaseFlagClaimant1() {
    await this.setupApiStep(hearingCenterAdminRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { createCaseFlagsDataBuilder } = this.hearingCenterAdminDataBuilderFactory;
    await super.submitCaseFlagsEvent(
      hearingCenterAdminRegion1User,
      ccdEvents.CREATE_CASE_FLAGS,
      await createCaseFlagsDataBuilder.buildApplicant1(),
    );

    const { createCaseFlagsSchemaBuilder } = this.hearingCenterAdminSchemaBuilderFactory;
    const createCaseFlagsSchema =
      await createCaseFlagsSchemaBuilder.buildApplicant1(caseDataBeforeSubmission);
    ZodHelper.safeParse(createCaseFlagsSchema, this.ccdCaseData);
  }

  async CreateCaseFlagDefendant1() {
    await this.setupApiStep(hearingCenterAdminRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { createCaseFlagsDataBuilder } = this.hearingCenterAdminDataBuilderFactory;
    await super.submitCaseFlagsEvent(
      hearingCenterAdminRegion1User,
      ccdEvents.CREATE_CASE_FLAGS,
      await createCaseFlagsDataBuilder.buildRespondent1(),
    );

    const { createCaseFlagsSchemaBuilder } = this.hearingCenterAdminSchemaBuilderFactory;
    const createCaseFlagsSchema =
      await createCaseFlagsSchemaBuilder.buildRespondent1(caseDataBeforeSubmission);
    ZodHelper.safeParse(createCaseFlagsSchema, this.ccdCaseData);
  }

  async ManageCaseFlagCaseLevel() {
    await this.setupApiStep(hearingCenterAdminRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { manageCaseFlagsDataBuilder } = this.hearingCenterAdminDataBuilderFactory;
    await super.submitCaseFlagsEvent(
      hearingCenterAdminRegion1User,
      ccdEvents.MANAGE_CASE_FLAGS,
      await manageCaseFlagsDataBuilder.buildCaseFlags(),
    );

    const { manageCaseFlagsSchemaBuilder } = this.hearingCenterAdminSchemaBuilderFactory;
    const manageCaseFlagsSchema =
      await manageCaseFlagsSchemaBuilder.buildCaseFlags(caseDataBeforeSubmission);
    ZodHelper.safeParse(manageCaseFlagsSchema, this.ccdCaseData);
  }

  async ManageCaseFlagClaimant1() {
    await this.setupApiStep(hearingCenterAdminRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { manageCaseFlagsDataBuilder } = this.hearingCenterAdminDataBuilderFactory;
    await super.submitCaseFlagsEvent(
      hearingCenterAdminRegion1User,
      ccdEvents.MANAGE_CASE_FLAGS,
      await manageCaseFlagsDataBuilder.buildApplicant1(),
    );

    const { manageCaseFlagsSchemaBuilder } = this.hearingCenterAdminSchemaBuilderFactory;
    const manageCaseFlagsSchema =
      await manageCaseFlagsSchemaBuilder.buildApplicant1(caseDataBeforeSubmission);
    ZodHelper.safeParse(manageCaseFlagsSchema, this.ccdCaseData);
  }

  async ManageCaseFlagDefendant1() {
    await this.setupApiStep(hearingCenterAdminRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { manageCaseFlagsDataBuilder } = this.hearingCenterAdminDataBuilderFactory;
    await super.submitCaseFlagsEvent(
      hearingCenterAdminRegion1User,
      ccdEvents.MANAGE_CASE_FLAGS,
      await manageCaseFlagsDataBuilder.buildRespondent1(),
    );

    const { manageCaseFlagsSchemaBuilder } = this.hearingCenterAdminSchemaBuilderFactory;
    const manageCaseFlagsSchema =
      await manageCaseFlagsSchemaBuilder.buildRespondent1(caseDataBeforeSubmission);
    ZodHelper.safeParse(manageCaseFlagsSchema, this.ccdCaseData);
  }
}
