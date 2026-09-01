import BaseApi from '../../../base/base-api';
import {
  defendantSolicitor1User,
} from '../../../config/users/exui-users';
import ccdEvents from '../../../constants/ccd-events/ccd-events/ccd-events';
import CaseRole from '../../../constants/cases/case-role';
import CaseState from '../../../constants/cases/case-state';
import { AllMethodsStep } from '../../../decorators/test-steps';
import ClaimantDefendantSolicitorDataBuilderFactory from '../../../data-builders/exui/claimant-defendant-solicitor/claimant-defendant-solicitor-data-builder-factory';
import UserAssignedCasesHelper from '../../../helpers/user-assigned-cases-helper';
import ZodHelper from '../../../helpers/zod-helper';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import ClaimantDefendantSolicitorSchemaBuilderFactory from '../../../schema-builders/exui/claimant-defendant-solicitor/claimant-defendant-solicitor-schema-builder-factory';

@AllMethodsStep()
export default class DefendantSolicitor1ApiSteps extends BaseApi {
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

  async AssignCaseRole() {
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

  async NoticeOfChangeD1() {
    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { noticeOfChangeDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const noticeOfChangeAnswers = await noticeOfChangeDataBuilder.buildDefendant1();
    await super.submitNocEvent(
      defendantSolicitor1User,
      undefined,
      noticeOfChangeAnswers,
    );

    const { noticeOfChangeSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const noticeOfChangeSchema =
      await noticeOfChangeSchemaBuilder.buildDefendant1(caseDataBeforeSubmission);
    ZodHelper.safeParse(noticeOfChangeSchema, this.ccdCaseData);
  }

  async AcknowledgeClaimFullDefence() {
    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { acknowledgeClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const acknowledgeClaimData = await acknowledgeClaimDataBuilder.buildDataDS1FullDefence();
    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.ACKNOWLEDGE_CLAIM,
      acknowledgeClaimData,
      { expectedState: CaseState.AWAITING_RESPONDENT_ACKNOWLEDGEMENT },
    );

    const { acknowledgeClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const acknowledgeClaimSchema =
      await acknowledgeClaimSchemaBuilder.buildSchemaDS1FullDefence(caseDataBeforeSubmission);

    ZodHelper.safeParse(acknowledgeClaimSchema, this.ccdCaseData);
  }

  async AcknowledgeClaimFullDefence2v1() {
    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { acknowledgeClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const acknowledgeClaimData = await acknowledgeClaimDataBuilder.buildDataDS1FullDefence2v1();
    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.ACKNOWLEDGE_CLAIM,
      acknowledgeClaimData,
      { expectedState: CaseState.AWAITING_RESPONDENT_ACKNOWLEDGEMENT },
    );

    const { acknowledgeClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const acknowledgeClaimSchema =
      await acknowledgeClaimSchemaBuilder.buildSchemaDS1FullDefence2v1(caseDataBeforeSubmission);

    ZodHelper.safeParse(acknowledgeClaimSchema, this.ccdCaseData);
  }

  async AcknowledgeClaimFullDefence1v2SS() {
    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { acknowledgeClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const acknowledgeClaimData = await acknowledgeClaimDataBuilder.buildDataDS1FullDefence1v2SS();
    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.ACKNOWLEDGE_CLAIM,
      acknowledgeClaimData,
      { expectedState: CaseState.AWAITING_RESPONDENT_ACKNOWLEDGEMENT },
    );

    const { acknowledgeClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const acknowledgeClaimSchema =
      await acknowledgeClaimSchemaBuilder.buildSchemaDS1FullDefence1v2SS(caseDataBeforeSubmission);

    ZodHelper.safeParse(acknowledgeClaimSchema, this.ccdCaseData);
  }

  async InformAgreedExtensionDate() {
    await this.setupApiStep(defendantSolicitor1User);
    await super.fetchAndSetCCDCaseData();
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { informAgreedExtensionDateDataBuilder } =
      this.claimantDefendantSolicitorDataBuilderFactory;
    const informAgreedExtensionDateEventData =
      await informAgreedExtensionDateDataBuilder.buildDataDS1();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.INFORM_AGREED_EXTENSION_DATE,
      informAgreedExtensionDateEventData,
      { expectedState: CaseState.AWAITING_RESPONDENT_ACKNOWLEDGEMENT },
    );

    const { informAgreedExtensionDateSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const informAgreedExtensionDateSchema =
      await informAgreedExtensionDateSchemaBuilder.buildSchemaDS1(caseDataBeforeSubmission);
    ZodHelper.safeParse(informAgreedExtensionDateSchema, this.ccdCaseData);
  }

  async AddLitigationFriend() {
    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { addDefendantLitigationFriendDataBuilder } =
      this.claimantDefendantSolicitorDataBuilderFactory;
    const addDefendantLitigationFriendData =
      await addDefendantLitigationFriendDataBuilder.buildDataDS1();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.ADD_DEFENDANT_LITIGATION_FRIEND,
      addDefendantLitigationFriendData,
      { expectedState: CaseState.AWAITING_RESPONDENT_ACKNOWLEDGEMENT },
    );

    const { addDefendantLitigationFriendSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const addDefendantLitigationFriendSchema =
      await addDefendantLitigationFriendSchemaBuilder.buildSchemaDS1(caseDataBeforeSubmission);
    ZodHelper.safeParse(addDefendantLitigationFriendSchema, this.ccdCaseData);
  }

  async RespondFastFullDefence() {
    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { defendantResponseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData = await defendantResponseDataBuilder.buildDS1FastFullDefence();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE,
      defendantResponseEventData,
      { expectedState: [CaseState.AWAITING_APPLICANT_INTENTION, CaseState.AWAITING_RESPONDENT_ACKNOWLEDGEMENT] },
    );

    const { defendantResponseSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSchemaBuilder.buildDS1FastFullDefence(caseDataBeforeSubmission);
    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }

  async RespondSmallFullDefence() {
    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { defendantResponseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseDataBuilder.buildDS1SmallFullDefence1v1();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE,
      defendantResponseEventData,
      { expectedState: CaseState.AWAITING_APPLICANT_INTENTION },
    );

    const { defendantResponseSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSchemaBuilder.buildDS1SmallFullDefence1v1(caseDataBeforeSubmission);
    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }

  async RespondFastFullDefence2v1() {
    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { defendantResponseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseDataBuilder.buildDS1FastFullDefence2v1();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE,
      defendantResponseEventData,
      { expectedState: CaseState.AWAITING_APPLICANT_INTENTION },
    );

    const { defendantResponseSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSchemaBuilder.buildDS1FastFullDefence2v1(caseDataBeforeSubmission);
    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }

  async RespondInterFullDefence2v1() {
    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { defendantResponseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseDataBuilder.buildDS1InterFullDefence2v1();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE,
      defendantResponseEventData,
      { expectedState: CaseState.AWAITING_APPLICANT_INTENTION },
    );

    const { defendantResponseSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSchemaBuilder.buildDS1InterFullDefence2v1(
        caseDataBeforeSubmission,
      );
    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }

  async RespondMultiFullDefence2v1() {
    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { defendantResponseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseDataBuilder.buildDS1MultiFullDefence2v1();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE,
      defendantResponseEventData,
      { expectedState: CaseState.AWAITING_APPLICANT_INTENTION },
    );

    const { defendantResponseSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSchemaBuilder.buildDS1MultiFullDefence2v1(caseDataBeforeSubmission);
    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }

  async RespondFastFullDefence1v2SS() {
    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { defendantResponseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseDataBuilder.buildDS1FastFullDefence1v2SS();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE,
      defendantResponseEventData,
      { expectedState: CaseState.AWAITING_APPLICANT_INTENTION },
    );

    const { defendantResponseSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSchemaBuilder.buildDS1FastFullDefence1v2SS(caseDataBeforeSubmission);
    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }

  async RespondInterFullDefence1v2SS() {
    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { defendantResponseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseDataBuilder.buildDS1InterFullDefence1v2SS();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE,
      defendantResponseEventData,
      { expectedState: CaseState.AWAITING_APPLICANT_INTENTION },
    );

    const { defendantResponseSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSchemaBuilder.buildDS1InterFullDefence1v2SS(
        caseDataBeforeSubmission,
      );
    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }

  async RespondMultiFullDefence1v2SS() {
    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { defendantResponseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseDataBuilder.buildDS1MultiFullDefence1v2SS();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE,
      defendantResponseEventData,
      { expectedState: CaseState.AWAITING_APPLICANT_INTENTION },
    );

    const { defendantResponseSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSchemaBuilder.buildDS1MultiFullDefence1v2SS(caseDataBeforeSubmission);
    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }

  async RespondInterFullDefence() {
    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { defendantResponseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseDataBuilder.buildDS1InterFullDefence();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE,
      defendantResponseEventData,
      { expectedState: CaseState.AWAITING_APPLICANT_INTENTION },
    );

    const { defendantResponseSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSchemaBuilder.buildDS1InterFullDefence(
        caseDataBeforeSubmission,
      );
    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }

  async RespondInterFullDefence1v2DS() {
    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { defendantResponseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseDataBuilder.buildDS1InterFullDefence1v2DS();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE,
      defendantResponseEventData,
      { expectedState: CaseState.AWAITING_RESPONDENT_ACKNOWLEDGEMENT },
    );

    const { defendantResponseSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSchemaBuilder.buildDS1InterFullDefence1v2DS(
        caseDataBeforeSubmission,
      );
    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
  }

  async RespondMultiFullDefence() {
    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { defendantResponseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseDataBuilder.buildDS1MultiFullDefence();

    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.DEFENDANT_RESPONSE,
      defendantResponseEventData,
    );

    const { defendantResponseSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const defendantResponseSchema =
      await defendantResponseSchemaBuilder.buildDS1MultiFullDefence(caseDataBeforeSubmission);
    ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
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

    const { evidenceUploadRespondentSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const evidenceUploadRespondentSchema =
      await evidenceUploadRespondentSchemaBuilder.buildDS1Fast(caseDataBeforeSubmission);
    ZodHelper.safeParse(evidenceUploadRespondentSchema, this.ccdCaseData);
  }

  async EvidenceUploadFast1v2SS() {
    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { evidenceUploadRespondentDataBuilder } =
      this.claimantDefendantSolicitorDataBuilderFactory;
    const evidenceUploadRespondentData =
      await evidenceUploadRespondentDataBuilder.buildDS1Fast1v2SS();
    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.EVIDENCE_UPLOAD_RESPONDENT,
      evidenceUploadRespondentData,
      { expectedState: CaseState.CASE_PROGRESSION },
    );

    const { evidenceUploadRespondentSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const evidenceUploadRespondentSchema =
      await evidenceUploadRespondentSchemaBuilder.buildDS1Fast1v2SS(caseDataBeforeSubmission);
    ZodHelper.safeParse(evidenceUploadRespondentSchema, this.ccdCaseData);
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
      { expectedState: CaseState.CASE_PROGRESSION },
    );

    const { evidenceUploadRespondentSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const evidenceUploadRespondentSchema =
      await evidenceUploadRespondentSchemaBuilder.buildDS1SmallClaim(caseDataBeforeSubmission);
    ZodHelper.safeParse(evidenceUploadRespondentSchema, this.ccdCaseData);
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

    const { queryManagementRaiseSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const queryManagementRaiseSchema =
      await queryManagementRaiseSchemaBuilder.buildRaiseQuery(caseDataBeforeSubmission);
    ZodHelper.safeParse(queryManagementRaiseSchema, this.ccdCaseData);
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

    const { queryManagementRaiseSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const queryManagementRaiseSchema =
      await queryManagementRaiseSchemaBuilder.buildRaiseQuery(caseDataBeforeSubmission);
    ZodHelper.safeParse(queryManagementRaiseSchema, this.ccdCaseData);
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

    const { queryManagementRaiseSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const queryManagementRaiseSchema =
      await queryManagementRaiseSchemaBuilder.buildFollowUpQuery(caseDataBeforeSubmission);
    ZodHelper.safeParse(queryManagementRaiseSchema, this.ccdCaseData);
  }

  async InitiateGeneralApplication() {
    await this.setupApiStep(defendantSolicitor1User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { initiateGeneralApplicationDataBuilder } =
      this.claimantDefendantSolicitorDataBuilderFactory;
    const initiateGeneralApplicationData =
      await initiateGeneralApplicationDataBuilder.buildDS1();
    await super.submitCCDEvent(
      defendantSolicitor1User,
      ccdEvents.INITIATE_GENERAL_APPLICATION,
      initiateGeneralApplicationData,
    );

    const { initiateGeneralApplicationSchemaBuilder } =
      this.claimantDefendantSolicitorSchemaBuilderFactory;
    const initiateGeneralApplicationSchema =
      await initiateGeneralApplicationSchemaBuilder.buildDS1(caseDataBeforeSubmission);
    ZodHelper.safeParse(initiateGeneralApplicationSchema, this.ccdCaseData);
    UserAssignedCasesHelper.addAssignedCaseToUser(defendantSolicitor1User, super.getGaCCDCaseIdFromParentCase());
  }
}
