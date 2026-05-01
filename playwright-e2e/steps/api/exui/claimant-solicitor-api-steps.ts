import BaseApi from '../../../base/base-api';
import {
  claimantOrganisationSuperUser,
  claimantSolicitorUser,
} from '../../../config/users/exui-users';
import ccdEvents from '../../../constants/ccd-events/ccd-events';
import claimantDefendantPartyTypes from '../../../constants/users/claimant-defendant-party-types';
import ClaimantDefendantSolicitorDataBuilderFactory from '../../../data-builders/exui/claimant-defendant-solicitor/claimant-defendant-solicitor-data-builder-factory';
import { AllMethodsStep } from '../../../decorators/test-steps';
import CaseState from '../../../constants/cases/case-state';
import DateHelper from '../../../helpers/date-helper';
import UserAssignedCasesHelper from '../../../helpers/user-assigned-cases-helper';
import ZodHelper from '../../../helpers/zod-helper';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import ClaimantDefendantSolicitorSchemaBuilderFactory from '../../../schema-builders/exui/claimant-defendant-solicitor/claimant-defendant-solicitor-schema-builder-factory';

@AllMethodsStep()
export default class ClaimantSolicitorApiSteps extends BaseApi {
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

  async CreateClaimSmallTrack1v1() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildSmallTrack1v1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildSmallTrack1v1();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);

    super.setClaimant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    super.setDefendant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimSmallTrack2v1() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildSmallTrack2v1();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildSmallTrack2v1();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);

    super.setClaimant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    super.setClaimant2PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    super.setDefendant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimSmallTrack1v2SS() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildSmallTrack1v2SS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildSmallTrack1v2SS();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);

    super.setClaimant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    super.setDefendant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    super.setDefendant2PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimSmallTrack1v2DS() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildSmallTrack1v2DS();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildSmallTrack1v2DS();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);

    super.setClaimant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    super.setDefendant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    super.setDefendant2PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimSmallTrack1vLIP() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildSmallTrack1vLIP();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildSmallTrack1vLIP();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);

    super.setClaimant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    super.setDefendant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimSmallTrack1v2LIPs() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildSmallTrack1v2LIPs();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildSmallTrack1v2LIPs();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);

    super.setClaimant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    super.setDefendant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    super.setDefendant2PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimSmallTrack1v2LRLIP() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildSmallTrack1v2LRLIP();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildSmallTrack1v2LRLIP();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);

    super.setClaimant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    super.setDefendant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    super.setDefendant2PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async CreateClaimSmallTrack1v2LIPLR() {
    await this.setupUserData(claimantSolicitorUser);
    const { createClaimDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const createClaimData = await createClaimDataBuilder.buildSmallTrack1v2LIPLR();
    await super.submitCCDEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      CaseState.PENDING_CASE_ISSUED,
    );

    const { createClaimSchemaBuilder } = this.claimantDefendantSolicitorSchemaBuilderFactory;
    const createClaimResponseSchema = await createClaimSchemaBuilder.buildSmallTrack1v2LIPLR();
    ZodHelper.safeParse(createClaimResponseSchema, this.ccdCaseData);

    super.setClaimant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    super.setDefendant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    super.setDefendant2PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData?.id);
  }

  async MakePaymentForClaimIssue() {
    await this.setupApiStep(claimantSolicitorUser);
    const { serviceRequestDataBuilder } = this.claimantDefendantSolicitorDataBuilderFactory;
    const paidServiceRequestDTO = await serviceRequestDataBuilder.buildPaidServiceRequestDTO(
      'paid',
      this.ccdCaseData?.id,
    );
    const { civilServiceRequests } = this.requestsFactory;
    await civilServiceRequests.updatePaymentForClaimIssue(
      claimantSolicitorUser,
      paidServiceRequestDTO,
    );
    await super.waitForFinishedBusinessProcess(this.ccdCaseData?.id);
  }

  async AmendRespondent1ResponseDeadline() {
    await this.setupApiStep(claimantOrganisationSuperUser);
    const newRespondent1Deadline = DateHelper.subtractFromToday({ days: 1 });
    const dateString = DateHelper.formatDateToString(newRespondent1Deadline, {
      outputFormat: 'YYYY-MM-DDTHH:MM:SS',
    });
    const respondent1Deadline = { respondent1ResponseDeadline: dateString };
    const { civilServiceRequests } = this.requestsFactory;
    await civilServiceRequests.updateCaseData(
      claimantOrganisationSuperUser,
      respondent1Deadline,
      this.ccdCaseData?.id,
    );
    await super.fetchAndSetCCDCaseData();
  }

  async AmendRespondent2ResponseDeadline() {
    await this.setupApiStep(claimantOrganisationSuperUser);
    const newRespondent2Deadline = DateHelper.subtractFromToday({ days: 1 });
    const dateString = DateHelper.formatDateToString(newRespondent2Deadline, {
      outputFormat: 'YYYY-MM-DDTHH:MM:SS',
    });
    const respondent2ResponseDeadline = { respondent2ResponseDeadline: dateString };
    const { civilServiceRequests } = this.requestsFactory;
    await civilServiceRequests.updateCaseData(
      claimantOrganisationSuperUser,
      respondent2ResponseDeadline,
      this.ccdCaseData?.id
    );
    await super.fetchAndSetCCDCaseData();
  }
}
