import BaseApi from '../../../base/base-api';
import { defendantSolicitor2User } from '../../../config/users/exui-users';
import { AllMethodsStep } from '../../../decorators/test-steps';
import CaseRole from '../../../constants/cases/case-role';
import CaseState from '../../../constants/cases/case-state';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';
import DefendantResponseType from '../../../constants/ccd-events/ccd-events/defendant-response/defendant-response-type';
import ccdEvents from '../../../constants/ccd-events/ccd-events/ccd-events';
import partys from '../../../constants/users/partys';
import ClaimantDefendantSolicitorDataBuilderFactory from '../../../data-builders/exui/claimant-defendant-solicitor/claimant-defendant-solicitor-data-builder-factory';
import UserAssignedCasesHelper from '../../../helpers/user-assigned-cases-helper';
import ZodHelper from '../../../helpers/zod-helper';
import ClaimantDefendantSolicitorSchemaBuilderFactory from '../../../schema-builders/exui/claimant-defendant-solicitor/claimant-defendant-solicitor-schema-builder-factory';
import TestData from '../../../models/test-utils/test-data';
import DefendantResponseOptions from '../../../models/ccd-events/cui-ccd-events/defendant-response-options';
import RequestsFactory from '../../../requests/requests-factory';

@AllMethodsStep()
export default class DefendantSolicitor2ApiSteps extends BaseApi {
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
    await this.setupApiStep(defendantSolicitor2User);
    const { civilServiceRequests } = this.requestsFactory;
    await civilServiceRequests.assignCaseToDefendant(
      defendantSolicitor2User,
      CaseRole.RESPONDENT_SOLICITOR_TWO,
      this.ccdCaseData.id!,
    );
    await super.fetchAndSetCCDCaseData();
    UserAssignedCasesHelper.addAssignedCaseToUser(defendantSolicitor2User, this.ccdCaseData.id!);
  }

  async AcknowledgeClaimFullDefence() {
    await this.setupApiStep(defendantSolicitor2User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { acknowledgeClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const acknowledgeClaimData = await acknowledgeClaimDataBuilder.buildDataDS2FullDefence();
    await super.submitCCDEvent(
      defendantSolicitor2User,
      ccdEvents.ACKNOWLEDGE_CLAIM,
      acknowledgeClaimData,
      { expectedState: CaseState.AWAITING_RESPONDENT_ACKNOWLEDGEMENT },
    );

    await this.runZodValidation(async () => {
      const { acknowledgeClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
      const acknowledgeClaimSchema =
        await acknowledgeClaimSchemaBuilder.buildSchemaDS2FullDefence(caseDataBeforeSubmission);
      ZodHelper.safeParse(acknowledgeClaimSchema, this.ccdCaseData);
    });
  }

  async InformAgreedExtensionDate() {
    await this.setupApiStep(defendantSolicitor2User);
    await super.fetchAndSetCCDCaseData();
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { informAgreedExtensionDateDataBuilder } =
      this.claimantDefendantSolicitorDataBuilderFactory;
    const informAgreedExtensionDateEventData =
      await informAgreedExtensionDateDataBuilder.buildDataDS2();

    await super.submitCCDEvent(
      defendantSolicitor2User,
      ccdEvents.INFORM_AGREED_EXTENSION_DATE,
      informAgreedExtensionDateEventData,
      { expectedState: CaseState.AWAITING_RESPONDENT_ACKNOWLEDGEMENT },
    );

    await this.runZodValidation(async () => {
      const { informAgreedExtensionDateSchemaBuilder } =
        this.claimantDefendantSolicitorSchemaBuilderFactory;
      const informAgreedExtensionDateSchema =
        await informAgreedExtensionDateSchemaBuilder.buildSchemaDS2(caseDataBeforeSubmission);
      ZodHelper.safeParse(informAgreedExtensionDateSchema, this.ccdCaseData);
    });
  }

  async DefendantResponse(options: DefendantResponseOptions = {}) {
    const responseOptions: DefendantResponseOptions = {
      claimTrack: ClaimTrack.FAST_CLAIM,
      claimType: ClaimType.ONE_VS_ONE,
      responseType: DefendantResponseType.FULL_DEFENCE,
      defendantSolicitorParty: partys.DEFENDANT_SOLICITOR_2,
      ...options,
    };

    const expectedState = [ClaimType.TWO_VS_ONE, ClaimType.ONE_VS_TWO_SAME_SOL].includes(
      responseOptions.claimType!,
    )
      ? CaseState.AWAITING_APPLICANT_INTENTION
      : [CaseState.AWAITING_APPLICANT_INTENTION, CaseState.AWAITING_RESPONDENT_ACKNOWLEDGEMENT];

    await this.setupApiStep(defendantSolicitor2User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { defendantResponseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const defendantResponseEventData =
      await defendantResponseDataBuilder.buildDefendantResponse(responseOptions);

    await super.submitCCDEvent(
      defendantSolicitor2User,
      ccdEvents.DEFENDANT_RESPONSE,
      defendantResponseEventData,
      { expectedState },
    );

    await this.runZodValidation(async () => {
      const { defendantResponseSchemaBuilder } =
        this.claimantDefendantSolicitorSchemaBuilderFactory;
      const defendantResponseSchema = await defendantResponseSchemaBuilder.buildDefendantResponse(
        caseDataBeforeSubmission,
        responseOptions,
      );
      ZodHelper.safeParse(defendantResponseSchema, this.ccdCaseData);
    });
  }

  async NoticeOfChange() {
    await this.setupApiStep(defendantSolicitor2User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { noticeOfChangeDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const noticeOfChangeAnswers = await noticeOfChangeDataBuilder.buildDefendant2();
    await super.submitNocEvent(defendantSolicitor2User, undefined, noticeOfChangeAnswers);

    await this.runZodValidation(async () => {
      const { noticeOfChangeSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
      const noticeOfChangeSchema =
        await noticeOfChangeSchemaBuilder.buildDefendant2(caseDataBeforeSubmission);
      ZodHelper.safeParse(noticeOfChangeSchema, this.ccdCaseData);
    });
  }

  async RaiseLRQuery() {
    await this.setupApiStep(defendantSolicitor2User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { queryManagementRaiseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    await super.submitQmEvent(
      defendantSolicitor2User,
      ccdEvents.QUERY_MANAGEMENT_RAISE,
      await queryManagementRaiseDataBuilder.buildRaiseQueryDS2(),
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
    await this.setupApiStep(defendantSolicitor2User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { queryManagementRaiseDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    await super.submitQmEvent(
      defendantSolicitor2User,
      ccdEvents.QUERY_MANAGEMENT_RAISE,
      await queryManagementRaiseDataBuilder.buildFollowQueryDS2(),
    );

    await this.runZodValidation(async () => {
      const { queryManagementRaiseSchemaBuilder } =
        this.claimantDefendantSolicitorSchemaBuilderFactory;
      const queryManagementRaiseSchema =
        await queryManagementRaiseSchemaBuilder.buildFollowUpQuery(caseDataBeforeSubmission);
      ZodHelper.safeParse(queryManagementRaiseSchema, this.ccdCaseData);
    });
  }

  async InitiateGA() {
    await this.setupApiStep(defendantSolicitor2User);
    const caseDataBeforeSubmission = structuredClone(this.ccdCaseData);

    const { initiateGeneralApplicationDataBuilder } =
      this.claimantDefendantSolicitorDataBuilderFactory;
    const initiateGeneralApplicationData = await initiateGeneralApplicationDataBuilder.buildDS2();
    await super.submitCCDEvent(
      defendantSolicitor2User,
      ccdEvents.INITIATE_GENERAL_APPLICATION,
      initiateGeneralApplicationData,
    );

    await this.runZodValidation(async () => {
      const { initiateGeneralApplicationSchemaBuilder } =
        this.claimantDefendantSolicitorSchemaBuilderFactory;
      const initiateGeneralApplicationSchema =
        await initiateGeneralApplicationSchemaBuilder.buildDS2(caseDataBeforeSubmission);
      ZodHelper.safeParse(initiateGeneralApplicationSchema, this.ccdCaseData);

      const { initiateGeneralApplicationGaSchemaBuilder } =
        this.claimantDefendantSolicitorSchemaBuilderFactory;
      const initiateGeneralApplicationSpecGaSchema =
        await initiateGeneralApplicationGaSchemaBuilder.build();
      ZodHelper.safeParse(initiateGeneralApplicationSpecGaSchema, super.getGaCCDCaseData());
    });

    UserAssignedCasesHelper.addAssignedCaseToUser(
      defendantSolicitor2User,
      super.getGaCCDCaseData()?.id,
    );
  }
}
