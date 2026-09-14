import BaseApi from '../../../base/base-api';
import { defendantSolicitor1User } from '../../../config/users/exui-users';
import ccdEvents from '../../../constants/ccd-events/ccd-events/ccd-events';
import ClaimantDefendantSolicitorDataBuilderFactory from '../../../data-builders/exui/claimant-defendant-solicitor/claimant-defendant-solicitor-data-builder-factory';
import { AllMethodsStep } from '../../../decorators/test-steps';
import CaseRole from '../../../constants/cases/case-role';
import CaseState from '../../../constants/cases/case-state';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';
import DefenceAdmittedPartRouteSpec from '../../../constants/ccd-events/ccd-events/defendant-response-spec/defence-admitted-part-route-spec';
import DefenceRouteSpec from '../../../constants/ccd-events/ccd-events/defendant-response-spec/defence-route-spec';
import DefendantResponseSpecType from '../../../constants/ccd-events/ccd-events/defendant-response-spec/defendant-response-spec-type';
import PaymentTypeSpec from '../../../constants/ccd-events/ccd-events/defendant-response-spec/payment-type-spec';
import partys from '../../../constants/users/partys';
import UserAssignedCasesHelper from '../../../helpers/user-assigned-cases-helper';
import ZodHelper from '../../../helpers/zod-helper';
import DefendantResponseSpecOptions from '../../../models/ccd-events/cui-ccd-events/defendant-response-spec-options';
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
      { expectedState: CaseState.AWAITING_RESPONDENT_ACKNOWLEDGEMENT },
    );

    await this.runZodValidation(async () => {
      const { informAgreedExtensionDateSpecSchemaBuilder } =
        this.claimantDefendantSolicitorSchemaBuilderFactory;
      const informAgreedExtensionDateSchema =
        await informAgreedExtensionDateSpecSchemaBuilder.buildDataDS1(caseDataBeforeSubmission);
      ZodHelper.safeParse(informAgreedExtensionDateSchema, this.ccdCaseData);
    });
  }

  async DefendantResponse(options: DefendantResponseSpecOptions = {}) {
    const responseOptions: DefendantResponseSpecOptions = {
      claimTrack: ClaimTrack.FAST_CLAIM,
      claimType: ClaimType.ONE_VS_ONE,
      responseType: DefendantResponseSpecType.FULL_DEFENCE,
      defenceRoute: DefenceRouteSpec.DISPUTE,
      paymentType: PaymentTypeSpec.IMMEDIATELY,
      defenceAdmittedPartRoute: DefenceAdmittedPartRouteSpec.HAS_NOT_PAID,
      defendantSolicitorParty: partys.DEFENDANT_SOLICITOR_1,
      ...options,
    };

    const expectedState =
      responseOptions.responseType === DefendantResponseSpecType.FULL_DEFENCE
        ? [CaseState.AWAITING_APPLICANT_INTENTION, CaseState.AWAITING_RESPONDENT_ACKNOWLEDGEMENT]
        : responseOptions.responseType === DefendantResponseSpecType.COUNTER_CLAIM
          ? CaseState.PROCEEDS_IN_HERITAGE_SYSTEM
          : CaseState.AWAITING_APPLICANT_INTENTION;

    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { defendantResponseSpecDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseSpecDataBuilder.buildDefendantResponse(responseOptions);

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantResponseEventData,
      { expectedState },
    );

    await this.runZodValidation(async () => {
      const { defendantResponseSpecSchemaBuilder } =
        this.claimantDefendantSolicitorSchemaBuilderFactory;
      const defendantResponseSchema =
        await defendantResponseSpecSchemaBuilder.buildDefendantResponse(
          caseDataBeforeSubmission,
          responseOptions,
        );
      ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
    });
  }

  async EvidenceUploadFast() {
    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { evidenceUploadRespondentDataBuilder } =
      this.claimantDefendantSolicitorDataBuilderFactory;
    const evidenceUploadRespondentData = await evidenceUploadRespondentDataBuilder.buildDS1Fast();
    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.EVIDENCE_UPLOAD_RESPONDENT,
      evidenceUploadRespondentData,
      { expectedState: CaseState.CASE_PROGRESSION },
    );

    await this.runZodValidation(async () => {
      const { evidenceUploadRespondentSchemaBuilder } =
        this.claimantDefendantSolicitorSchemaBuilderFactory;
      const evidenceUploadRespondentSchema =
        await evidenceUploadRespondentSchemaBuilder.buildDS1Fast(caseDataBeforeSubmission);
      ZodHelper.safeParse(evidenceUploadRespondentSchema, this.ccdCaseData);
    });
  }

  async EvidenceUploadSmall() {
    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { evidenceUploadRespondentDataBuilder } =
      this.claimantDefendantSolicitorDataBuilderFactory;
    const evidenceUploadRespondentData = await evidenceUploadRespondentDataBuilder.buildDS1Small();
    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.EVIDENCE_UPLOAD_RESPONDENT,
      evidenceUploadRespondentData,
    );

    await this.runZodValidation(async () => {
      const { evidenceUploadRespondentSchemaBuilder } =
        this.claimantDefendantSolicitorSchemaBuilderFactory;
      const evidenceUploadRespondentSchema =
        await evidenceUploadRespondentSchemaBuilder.buildDS1SmallClaim(caseDataBeforeSubmission);
      ZodHelper.safeParse(evidenceUploadRespondentSchema, this.ccdCaseData);
    });
  }

  async UploadMediationDocuments() {
    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { uploadMediationDocumentsDataBuilder } =
      this.claimantDefendantSolicitorDataBuilderFactory;
    const uploadMediationDocumentsData = await uploadMediationDocumentsDataBuilder.buildDS1();
    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.UPLOAD_MEDIATION_DOCUMENTS,
      uploadMediationDocumentsData,
    );

    await this.runZodValidation(async () => {
      const { uploadMediationDocumentsSchemaBuilder } =
        this.claimantDefendantSolicitorSchemaBuilderFactory;
      const uploadMediationDocumentsSchema =
        await uploadMediationDocumentsSchemaBuilder.buildDS1(caseDataBeforeSubmission);
      ZodHelper.safeParse(uploadMediationDocumentsSchema, this.ccdCaseData);
    });
  }

  async RequestForReconsideration() {
    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { requestForReconsiderationDataBuilder } =
      this.claimantDefendantSolicitorDataBuilderFactory;
    const requestForReconsiderationData = await requestForReconsiderationDataBuilder.buildDS1();
    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.REQUEST_FOR_RECONSIDERATION,
      requestForReconsiderationData,
      { expectedState: CaseState.CASE_PROGRESSION },
    );

    await this.runZodValidation(async () => {
      const { requestForReconsiderationSchemaBuilder } =
        this.claimantDefendantSolicitorSchemaBuilderFactory;
      const requestForReconsiderationSchema =
        await requestForReconsiderationSchemaBuilder.buildDS1(caseDataBeforeSubmission);
      ZodHelper.safeParse(requestForReconsiderationSchema, this.ccdCaseData);
    });
  }

  async NoticeOfChangeD1() {
    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { noticeOfChangeDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const noticeOfChangeAnswers = await noticeOfChangeDataBuilder.buildDefendant1();
    await super.submitNocEvent(defendantSolicitor1User, undefined, noticeOfChangeAnswers);

    await this.runZodValidation(async () => {
      const { noticeOfChangeSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
      const noticeOfChangeSchema =
        await noticeOfChangeSchemaBuilder.buildDefendant1(caseDataBeforeSubmission);
      ZodHelper.safeParse(noticeOfChangeSchema, this.ccdCaseData);
    });
  }

  async RaiseLRQuery() {
    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { queryManagementRaiseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    await super.submitQmEvent(
      defendantSolicitor1User,
      ccdEvents.QUERY_MANAGEMENT_RAISE,
      await queryManagementRaiseDataBuilder.buildRaiseQueryDS1(),
    );

    await this.runZodValidation(async () => {
      const { queryManagementRaiseSchemaBuilder } =
        this.claimantDefendantSolicitorSchemaBuilderFactory;
      const queryManagementRaiseSchema =
        await queryManagementRaiseSchemaBuilder.buildRaiseQuery(caseDataBeforeSubmission);
      ZodHelper.safeParse(queryManagementRaiseSchema, this.ccdCaseData);
    });
  }

  async RaiseLRHearingQuery() {
    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { queryManagementRaiseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    await super.submitQmEvent(
      defendantSolicitor1User,
      ccdEvents.QUERY_MANAGEMENT_RAISE,
      await queryManagementRaiseDataBuilder.buildRaiseQueryHearingDS1(),
    );

    await this.runZodValidation(async () => {
      const { queryManagementRaiseSchemaBuilder } =
        this.claimantDefendantSolicitorSchemaBuilderFactory;
      const queryManagementRaiseSchema =
        await queryManagementRaiseSchemaBuilder.buildRaiseQuery(caseDataBeforeSubmission);
      ZodHelper.safeParse(queryManagementRaiseSchema, this.ccdCaseData);
    });
  }

  async FollowUpOnLRQuery() {
    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { queryManagementRaiseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    await super.submitQmEvent(
      defendantSolicitor1User,
      ccdEvents.QUERY_MANAGEMENT_RAISE,
      await queryManagementRaiseDataBuilder.buildFollowQueryDS1(),
    );

    await this.runZodValidation(async () => {
      const { queryManagementRaiseSchemaBuilder } =
        this.claimantDefendantSolicitorSchemaBuilderFactory;
      const queryManagementRaiseSchema =
        await queryManagementRaiseSchemaBuilder.buildFollowUpQuery(caseDataBeforeSubmission);
      ZodHelper.safeParse(queryManagementRaiseSchema, this.ccdCaseData);
    });
  }

  async InitiateGeneralApplication() {
    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { initiateGeneralApplicationDataBuilder } =
      this.claimantDefendantSolicitorDataBuilderFactory;
    const initiateGeneralApplicationData = await initiateGeneralApplicationDataBuilder.buildDS1();
    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.INITIATE_GENERAL_APPLICATION,
      initiateGeneralApplicationData,
    );

    await this.runZodValidation(async () => {
      const { initiateGeneralApplicationSchemaBuilder } =
        this.claimantDefendantSolicitorSchemaBuilderFactory;
      const initiateGeneralApplicationSchema =
        await initiateGeneralApplicationSchemaBuilder.buildDS1(caseDataBeforeSubmission);
      ZodHelper.safeParse(initiateGeneralApplicationSchema, this.ccdCaseData);
    });
    UserAssignedCasesHelper.addAssignedCaseToUser(
      defendantSolicitor1User,
      super.getGaCCDCaseIdFromParentCase(),
    );
  }
}
