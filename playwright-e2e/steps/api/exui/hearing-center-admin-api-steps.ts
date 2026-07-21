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
import caseFlag from "../../../models/ccd-events/case-flags/case-flag.ts";

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

  async CreateCaseFlags() {
    await this.setupApiStep(hearingCenterAdminRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { caseFlagsDataBuilder } = this.hearingCenterAdminDataBuilderFactory;
    const caseFlagsData = await caseFlagsDataBuilder.buildComplexCaseData();
    await super.submitCCDEvent(
      hearingCenterAdminRegion1User,
      ccdEvents.CREATE_CASE_FLAGS,
      caseFlagsData
    );

    const { caseFlagsSchemaBuilder } = this.hearingCenterAdminSchemaBuilderFactory;
    const caseFlagsSchema =
      await caseFlagsSchemaBuilder.buildSchema(caseDataBeforeSubmission);
    ZodHelper.safeParse(caseFlagsSchema, this.ccdCaseData);
  }

  async CreateApplicant1SpecialMeasureCaseFlag() {
    await this.setupApiStep(hearingCenterAdminRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { caseFlagsDataBuilder } = this.hearingCenterAdminDataBuilderFactory;
    const caseFlagsData = await caseFlagsDataBuilder.buildApplicant1SpecialMeasureData();
    await super.submitCCDEvent(
      hearingCenterAdminRegion1User,
      ccdEvents.CREATE_CASE_FLAGS,
      caseFlagsData,
    );

    const { caseFlagsSchemaBuilder } = this.hearingCenterAdminSchemaBuilderFactory;
    const caseFlagsSchema =
      await caseFlagsSchemaBuilder.buildApplicant1SpecialMeasureSchema(caseDataBeforeSubmission);
    ZodHelper.safeParse(caseFlagsSchema, this.ccdCaseData);
  }

  async UpdateCaseLevelComplexCaseFlag() {
    await this.setupApiStep(hearingCenterAdminRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { caseFlagsDataBuilder } = this.hearingCenterAdminDataBuilderFactory;
    const caseFlagsData = await caseFlagsDataBuilder.buildUpdateComplexCaseData(this.ccdCaseData);
    await super.submitCCDEvent(
      hearingCenterAdminRegion1User,
      ccdEvents.MANAGE_CASE_FLAGS,
      caseFlagsData,
    );

    const { caseFlagsSchemaBuilder } = this.hearingCenterAdminSchemaBuilderFactory;
    const caseFlagsSchema = await caseFlagsSchemaBuilder.buildSchema(caseDataBeforeSubmission);
    ZodHelper.safeParse(caseFlagsSchema, this.ccdCaseData);
  }

  async DeactivateCaseLevelComplexCaseFlag() {
    await this.setupApiStep(hearingCenterAdminRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { caseFlagsDataBuilder } = this.hearingCenterAdminDataBuilderFactory;
    const caseFlagsData = await caseFlagsDataBuilder.buildDeactivateComplexCaseData(this.ccdCaseData);
    await super.submitCCDEvent(
      hearingCenterAdminRegion1User,
      ccdEvents.MANAGE_CASE_FLAGS,
      caseFlagsData,
    );

    const { caseFlagsSchemaBuilder } = this.hearingCenterAdminSchemaBuilderFactory;
    const caseFlagsSchema = await caseFlagsSchemaBuilder.buildSchema(caseDataBeforeSubmission);
    ZodHelper.safeParse(caseFlagsSchema, this.ccdCaseData);
  }

  async UpdateApplicant1SpecialMeasureFlag() {
    await this.setupApiStep(hearingCenterAdminRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { caseFlagsDataBuilder } = this.hearingCenterAdminDataBuilderFactory;
    const caseFlagsData = await caseFlagsDataBuilder.buildUpdateApplicant1SpecialMeasureData(
      this.ccdCaseData,
    );
    await super.submitCCDEvent(
      hearingCenterAdminRegion1User,
      ccdEvents.MANAGE_CASE_FLAGS,
      caseFlagsData,
    );

    const { caseFlagsSchemaBuilder } = this.hearingCenterAdminSchemaBuilderFactory;
    const caseFlagsSchema =
      await caseFlagsSchemaBuilder.buildApplicant1SpecialMeasureSchema(caseDataBeforeSubmission);
    ZodHelper.safeParse(caseFlagsSchema, this.ccdCaseData);
  }

  async DeactivateApplicant1SpecialMeasureFlag() {
    await this.setupApiStep(hearingCenterAdminRegion1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { caseFlagsDataBuilder } = this.hearingCenterAdminDataBuilderFactory;
    const caseFlagsData = await caseFlagsDataBuilder.buildDeactivateApplicant1SpecialMeasureData(
      this.ccdCaseData,
    );
    await super.submitCCDEvent(
      hearingCenterAdminRegion1User,
      ccdEvents.MANAGE_CASE_FLAGS,
      caseFlagsData,
    );

    const { caseFlagsSchemaBuilder } = this.hearingCenterAdminSchemaBuilderFactory;
    const caseFlagsSchema =
      await caseFlagsSchemaBuilder.buildApplicant1SpecialMeasureSchema(caseDataBeforeSubmission);
    ZodHelper.safeParse(caseFlagsSchema, this.ccdCaseData);
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
}
