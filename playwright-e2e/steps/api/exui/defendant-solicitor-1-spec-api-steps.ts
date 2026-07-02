import BaseApi from '../../../base/base-api';
import { defendantSolicitor1User } from '../../../config/users/exui-users';
import ccdEvents from '../../../constants/ccd-events/ccd-events';
import ClaimantDefendantSolicitorDataBuilderFactory from '../../../data-builders/exui/claimant-defendant-solicitor/claimant-defendant-solicitor-data-builder-factory';
import { AllMethodsStep } from '../../../decorators/test-steps';
import CaseRole from '../../../constants/cases/case-role';
import CaseState from '../../../constants/cases/case-state';
import UserAssignedCasesHelper from '../../../helpers/user-assigned-cases-helper';
import ZodHelper from '../../../helpers/zod-helper';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import ClaimantDefendantSolicitorSchemaBuilderFactory from '../../../schema-builders/exui/claimant-defendant-solicitor/claimant-defendant-solicitor-schema-builder-factory';

@AllMethodsStep()
export default class DefendantSolicitor1SpecApiSteps extends BaseApi {
  private claimantDefendantSolicitorDataBuilderFactory: ClaimantDefendantSolicitorDataBuilderFactory;
  private claimantDefendantSolicitorSchemaBuilderFactory: ClaimantDefendantSolicitorSchemaBuilderFactory;

  constructor(
    claimantDefendantSolicitorDataBuilderFactory: ClaimantDefendantSolicitorDataBuilderFactory,
    claimantDefendantSolicitorSchemaBuilderFactory: ClaimantDefendantSolicitorSchemaBuilderFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this.claimantDefendantSolicitorDataBuilderFactory =
      claimantDefendantSolicitorDataBuilderFactory;
    this.claimantDefendantSolicitorSchemaBuilderFactory =
      claimantDefendantSolicitorSchemaBuilderFactory;
  }

  async AssignCaseRoleToDefendant1() {
    await this.setupApiStep(defendantSolicitor1User);
    const { civilServiceRequests } = this.requestsFactory;
    await civilServiceRequests.assignCaseToDefendant(
      defendantSolicitor1User,
      CaseRole.RESPONDENT_SOLICITOR_ONE,
      this.ccdCaseData?.id,
    );
    await super.fetchAndSetCCDCaseData();
    UserAssignedCasesHelper.addAssignedCaseToUser(defendantSolicitor1User, this.ccdCaseData?.id);
  }

  async InformAgreedExtensionDateSpec() {
    await this.setupApiStep(defendantSolicitor1User);
    await super.fetchAndSetCCDCaseData();
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { informAgreedExtensionDateSpecDataBuilder } =
      this.claimantDefendantSolicitorDataBuilderFactory;
    const informAgreedExtensionDateEventData =
      await informAgreedExtensionDateSpecDataBuilder.buildDataDS1();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.INFORM_AGREED_EXTENSION_DATE_SPEC,
      informAgreedExtensionDateEventData,
      CaseState.AWAITING_RESPONDENT_ACKNOWLEDGEMENT,
    );

    const { informAgreedExtensionDateSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const informAgreedExtensionDateSchema =
      await informAgreedExtensionDateSpecSchemaBuilder.buildDataDS1(caseDataBeforeSubmission);
    ZodHelper.safeParse(informAgreedExtensionDateSchema, this.ccdCaseData);
  }

  async RespondFastFullDefence() {
    await this.setupApiStep(defendantSolicitor1User);

    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const { defendantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseSpecDataBuilder.buildDS1FastFullDefenceData();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantResponseEventData,
      CaseState.AWAITING_APPLICANT_INTENTION,
    );

    const { defendantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSpecSchemaBuilder.buildFast1v1FullDefence(
        caseDataBeforeSubmission,
      );

    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }

  async RespondSmallFullDefence() {
    await this.setupApiStep(defendantSolicitor1User);

    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const { defendantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseSpecDataBuilder.buildDS1SmallFullDefenceData();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantResponseEventData,
      CaseState.AWAITING_APPLICANT_INTENTION,
    );

    const { defendantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSpecSchemaBuilder.buildSmall1v1FullDefence(
        caseDataBeforeSubmission,
      );

    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }

  async RespondFastPartAdmitImmediately() {
    await this.setupApiStep(defendantSolicitor1User);

    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const { defendantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseSpecDataBuilder.buildDS1FastPartAdmitImmediatelyData();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantResponseEventData,
      CaseState.AWAITING_APPLICANT_INTENTION,
    );

    const { defendantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSpecSchemaBuilder.buildDS1FastPartAdmitImmediately(
        caseDataBeforeSubmission,
      );

    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }

  async RespondFullAdmitImmediately() {
    await this.setupApiStep(defendantSolicitor1User);

    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const { defendantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseSpecDataBuilder.buildDS1FullAdmitImmediatelyData();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantResponseEventData,
      CaseState.AWAITING_APPLICANT_INTENTION,
    );

    const { defendantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSpecSchemaBuilder.buildDS1FullAdmitImmediately(
        caseDataBeforeSubmission,
      );

    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }

  async RespondFullAdmitSetDate1v2SS() {
    await this.setupApiStep(defendantSolicitor1User);

    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const { defendantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseSpecDataBuilder.buildDS1FullAdmitSetDate1v2SSData();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantResponseEventData,
      CaseState.AWAITING_APPLICANT_INTENTION,
    );

    const { defendantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSpecSchemaBuilder.buildDS1FullAdmitSetDate1v2SS(
        caseDataBeforeSubmission,
      );

    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }

  async RespondFullAdmitRepayment2v1() {
    await this.setupApiStep(defendantSolicitor1User);

    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const { defendantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseSpecDataBuilder.buildDS1FullAdmitRepayment2v1Data();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantResponseEventData,
      CaseState.AWAITING_APPLICANT_INTENTION,
    );

    const { defendantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSpecSchemaBuilder.buildDS1FullAdmitRepayment2v1(
        caseDataBeforeSubmission,
      );

    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }

  async RespondSmallPartAdmitImmediately() {
    await this.setupApiStep(defendantSolicitor1User);

    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const { defendantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseSpecDataBuilder.buildDS1SmallPartAdmitImmediatelyData();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantResponseEventData,
      CaseState.AWAITING_APPLICANT_INTENTION,
    );

    const { defendantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSpecSchemaBuilder.buildDS1SmallPartAdmitImmediately(
        caseDataBeforeSubmission,
      );

    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }

  async RespondFastPartAdmitSetDate1v2SS() {
    await this.setupApiStep(defendantSolicitor1User);

    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const { defendantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseSpecDataBuilder.buildDS1FastPartAdmitSetDate1v2SSData();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantResponseEventData,
      CaseState.AWAITING_APPLICANT_INTENTION,
    );

    const { defendantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSpecSchemaBuilder.buildDS1FastPartAdmitSetDate1v2SS(
        caseDataBeforeSubmission,
      );

    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }

  async RespondSmallPartAdmitSetDate1v2SS() {
    await this.setupApiStep(defendantSolicitor1User);

    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const { defendantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseSpecDataBuilder.buildDS1SmallPartAdmitSetDate1v2SSData();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantResponseEventData,
      CaseState.AWAITING_APPLICANT_INTENTION,
    );

    const { defendantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSpecSchemaBuilder.buildDS1SmallPartAdmitSetDate1v2SS(
        caseDataBeforeSubmission,
      );

    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }

  async RespondFastPartAdmitRepayment2v1() {
    await this.setupApiStep(defendantSolicitor1User);

    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const { defendantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseSpecDataBuilder.buildDS1FastPartAdmitRepayment2v1Data();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantResponseEventData,
      CaseState.AWAITING_APPLICANT_INTENTION,
    );

    const { defendantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSpecSchemaBuilder.buildDS1FastPartAdmitRepayment2v1(
        caseDataBeforeSubmission,
      );

    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }

  async RespondSmallPartAdmitRepayment2v1() {
    await this.setupApiStep(defendantSolicitor1User);

    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const { defendantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseSpecDataBuilder.buildDS1SmallPartAdmitRepayment2v1Data();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantResponseEventData,
      CaseState.AWAITING_APPLICANT_INTENTION,
    );

    const { defendantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSpecSchemaBuilder.buildDS1SmallPartAdmitRepayment2v1(
        caseDataBeforeSubmission,
      );

    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }

  async RespondFastFullDefence2v1() {
    await this.setupApiStep(defendantSolicitor1User);

    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const { defendantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseSpecDataBuilder.buildDS1Fast2v1FullDefenceData();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantResponseEventData,
      CaseState.AWAITING_APPLICANT_INTENTION,
    );

    const { defendantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSpecSchemaBuilder.buildFast2v1FullDefence(
        caseDataBeforeSubmission,
      );

    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }

  async RespondFastFullDefence1v2SS() {
    await this.setupApiStep(defendantSolicitor1User);

    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const { defendantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseSpecDataBuilder.buildDS1FastFullDefence1v2SSData();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantResponseEventData,
      CaseState.AWAITING_APPLICANT_INTENTION,
    );

    const { defendantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSpecSchemaBuilder.buildFast1v2SSFullDefence(
        caseDataBeforeSubmission,
      );

    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }

  async RespondSmallFullDefence1v2SS() {
    await this.setupApiStep(defendantSolicitor1User);

    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const { defendantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseSpecDataBuilder.buildDS1SmallFullDefence1v2SSData();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantResponseEventData,
      CaseState.AWAITING_APPLICANT_INTENTION,
    );

    const { defendantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSpecSchemaBuilder.buildSmall1v2SSFullDefence(
        caseDataBeforeSubmission,
      );
    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }

  async RespondFastFullDefence1v2DS() {
    await this.setupApiStep(defendantSolicitor1User);

    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const { defendantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseSpecDataBuilder.buildDS1FastFullDefenceData();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantResponseEventData,
      CaseState.AWAITING_RESPONDENT_ACKNOWLEDGEMENT,
    );

    const { defendantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSpecSchemaBuilder.buildFast1v1FullDefence(
        caseDataBeforeSubmission,
      );

    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }

  async RespondSmallFullDefence1v2DS() {
    await this.setupApiStep(defendantSolicitor1User);

    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const { defendantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseSpecDataBuilder.buildDS1SmallFullDefenceData();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantResponseEventData,
      CaseState.AWAITING_RESPONDENT_ACKNOWLEDGEMENT,
    );

    const { defendantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSpecSchemaBuilder.buildSmall1v1FullDefence(
        caseDataBeforeSubmission,
      );

    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }
}
