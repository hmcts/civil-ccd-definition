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
      this.ccdCaseData?.id
    );
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

  async RespondFastTrackFullDefence1v1() {
    await this.setupApiStep(defendantSolicitor1User);

    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const { defendantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseSpecDataBuilder.buildFastTrack1v1FullDefence();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantResponseEventData,
      CaseState.AWAITING_APPLICANT_INTENTION,
    );

    const { defendantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSpecSchemaBuilder.buildFastTrack1v1FullDefence(
        caseDataBeforeSubmission,
      );

    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }

  async RespondSmallTrackFullDefence1v1() {
    await this.setupApiStep(defendantSolicitor1User);

    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const { defendantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseSpecDataBuilder.buildSmallTrack1v1FullDefence();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantResponseEventData,
      CaseState.AWAITING_APPLICANT_INTENTION,
    );

    const { defendantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSpecSchemaBuilder.buildSmallTrack1v1FullDefence(
        caseDataBeforeSubmission,
      );

    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }

  async RespondFastTrackFullDefence2v1() {
    await this.setupApiStep(defendantSolicitor1User);

    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const { defendantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseSpecDataBuilder.buildFastTrack2v1FullDefence();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantResponseEventData,
      CaseState.AWAITING_APPLICANT_INTENTION,
    );

    const { defendantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSpecSchemaBuilder.buildFastTrack2v1FullDefence(
        caseDataBeforeSubmission,
      );

    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }

  async RespondFastTrackFullDefence1v2SS() {
    await this.setupApiStep(defendantSolicitor1User);

    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const { defendantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseSpecDataBuilder.buildFastTrack1v2SSFullDefence();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantResponseEventData,
      CaseState.AWAITING_APPLICANT_INTENTION,
    );

    const { defendantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSpecSchemaBuilder.buildFastTrack1v2SSFullDefence(
        caseDataBeforeSubmission,
      );

    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }

  async RespondSmallTrackFullDefence1v2SS() {
    await this.setupApiStep(defendantSolicitor1User);

    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);
    const { defendantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseSpecDataBuilder.buildSmallTrack1v2SSFullDefence();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantResponseEventData,
      CaseState.AWAITING_APPLICANT_INTENTION,
    );

    const { defendantResponseSpecSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSpecSchemaBuilder.buildSmallTrack1v2SSFullDefence(
        caseDataBeforeSubmission,
      );

    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }

}
