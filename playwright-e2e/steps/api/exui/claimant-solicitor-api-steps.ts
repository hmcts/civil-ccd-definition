import BaseApi from '../../../base/base-api';
import {
  claimantOrganisationSuperUser,
  claimantSolicitorUser,
} from '../../../config/users/exui-users';
import ccdEvents from '../../../constants/ccd-events';
import claimantDefendantPartyTypes from '../../../constants/claimant-defendant-party-types';
import ClaimantSolicitorDataBuilderFactory from '../../../data-builders/exui/claimant-solicitor/claimant-solicitor-data-builder-factory';
import { AllMethodsStep } from '../../../decorators/test-steps';
import CaseState from '../../../enums/case-state';
import DateHelper from '../../../helpers/date-helper';
import UserAssignedCasesHelper from '../../../helpers/user-assigned-cases-helper';
import TestData from '../../../models/test-data';
import RequestsFactory from '../../../requests/requests-factory';

@AllMethodsStep()
export default class ClaimantSolicitorApiSteps extends BaseApi {
  private claimantSolicitorDataBuilderFactory: ClaimantSolicitorDataBuilderFactory;

  constructor(
    claimantSolicitorDataBuilderFactory: ClaimantSolicitorDataBuilderFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this.claimantSolicitorDataBuilderFactory = claimantSolicitorDataBuilderFactory;
  }

  async CreateClaimSmallTrack1v1() {
    const { createClaimDataBuilder } = this.claimantSolicitorDataBuilderFactory;
    await this.setupUserData(claimantSolicitorUser);
    const createClaimData = await createClaimDataBuilder.buildSmallTrack1v1();

    const { ccdRequests } = this.requestsFactory;
    const eventToken = await ccdRequests.startEvent(claimantSolicitorUser, ccdEvents.CREATE_CLAIM);
    const eventData = await super.validatePages(
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      claimantSolicitorUser,
      eventToken,
    );
    const eventCaseData = await ccdRequests.submitEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      CaseState.PENDING_CASE_ISSUED,
      eventData,
      eventToken,
    );
    super.setClaimant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    super.setDefendant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    await super.waitForFinishedBusinessProcess(claimantSolicitorUser, eventCaseData.id);
    await this.fetchAndSetCCDCaseData(eventCaseData.id);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData.id);
  }

  async CreateClaimSmallTrack2v1() {
    const { createClaimDataBuilder } = this.claimantSolicitorDataBuilderFactory;

    await this.setupUserData(claimantSolicitorUser);
    const createClaimData = await createClaimDataBuilder.buildSmallTrack2v1();

    const { ccdRequests } = this.requestsFactory;
    const eventToken = await ccdRequests.startEvent(claimantSolicitorUser, ccdEvents.CREATE_CLAIM);
    const eventData = await super.validatePages(
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      claimantSolicitorUser,
      eventToken,
    );
    const eventCaseData = await ccdRequests.submitEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      CaseState.PENDING_CASE_ISSUED,
      eventData,
      eventToken,
    );
    super.setClaimant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    super.setClaimant2PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    super.setDefendant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    await super.waitForFinishedBusinessProcess(claimantSolicitorUser, eventCaseData.id);
    await this.fetchAndSetCCDCaseData(eventCaseData.id);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData.id);
  }

  async CreateClaimSmallTrack1v2SS() {
    const { createClaimDataBuilder } = this.claimantSolicitorDataBuilderFactory;

    await this.setupUserData(claimantSolicitorUser);
    const createClaimData = await createClaimDataBuilder.buildSmallTrack1v2SS();

    const { ccdRequests } = this.requestsFactory;
    const eventToken = await ccdRequests.startEvent(claimantSolicitorUser, ccdEvents.CREATE_CLAIM);
    const eventData = await super.validatePages(
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      claimantSolicitorUser,
      eventToken,
    );
    const eventCaseData = await ccdRequests.submitEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      CaseState.PENDING_CASE_ISSUED,
      eventData,
      eventToken,
    );
    super.setClaimant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    super.setDefendant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    super.setDefendant2PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    await super.waitForFinishedBusinessProcess(claimantSolicitorUser, eventCaseData.id);
    await this.fetchAndSetCCDCaseData(eventCaseData.id);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData.id);
  }

  async CreateClaimSmallTrack1v2DS() {
    const { createClaimDataBuilder } = this.claimantSolicitorDataBuilderFactory;
    await this.setupUserData(claimantSolicitorUser);
    const createClaimData = await createClaimDataBuilder.buildSmallTrack1v2DS();

    const { ccdRequests } = this.requestsFactory;
    const eventToken = await ccdRequests.startEvent(claimantSolicitorUser, ccdEvents.CREATE_CLAIM);
    const eventData = await super.validatePages(
      ccdEvents.CREATE_CLAIM,
      createClaimData,
      claimantSolicitorUser,
      eventToken,
    );
    const eventCaseData = await ccdRequests.submitEvent(
      claimantSolicitorUser,
      ccdEvents.CREATE_CLAIM,
      CaseState.PENDING_CASE_ISSUED,
      eventData,
      eventToken,
    );
    super.setClaimant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    super.setDefendant1PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    super.setDefendant2PartyType = claimantDefendantPartyTypes.INDIVIDUAL;
    await super.waitForFinishedBusinessProcess(claimantSolicitorUser, eventCaseData.id);
    await this.fetchAndSetCCDCaseData(eventCaseData.id);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData.id);
  }

  async MakePaymentForClaimIssue() {
    const { serviceRequestDataBuilder } = this.claimantSolicitorDataBuilderFactory;
    const paidServiceRequestDTO = await serviceRequestDataBuilder.buildPaidServiceRequestDTO(
      this.ccdCaseData.id,
      'paid',
    );
    const { civilServiceRequests } = this.requestsFactory;
    await civilServiceRequests.updatePaymentForClaimIssue(
      claimantSolicitorUser,
      paidServiceRequestDTO,
    );
    await super.waitForFinishedBusinessProcess(claimantSolicitorUser, this.ccdCaseData.id);
  }

  async AmendRespondent1ResponseDeadline() {
    await this.setupUserData(claimantOrganisationSuperUser);
    const newRespondent1Deadline = DateHelper.subtractFromToday({ days: 1 });
    const dateString = DateHelper.formatDateToString(newRespondent1Deadline, {
      outputFormat: 'YYYY-MM-DDTHH:MM:SS',
    });
    const respondent1Deadline = { respondent1ResponseDeadline: dateString };
    const { civilServiceRequests } = this.requestsFactory;
    await civilServiceRequests.updateCaseData(
      claimantOrganisationSuperUser,
      this.ccdCaseData.id,
      respondent1Deadline,
    );
    await super.fetchAndSetCCDCaseData();
  }

  async AmendRespondent2ResponseDeadline() {
    await this.setupUserData(claimantOrganisationSuperUser);
    const newRespondent2Deadline = DateHelper.subtractFromToday({ days: 1 });
    const dateString = DateHelper.formatDateToString(newRespondent2Deadline, {
      outputFormat: 'YYYY-MM-DDTHH:MM:SS',
    });
    const respondent2ResponseDeadline = { respondent2ResponseDeadline: dateString };
    const { civilServiceRequests } = this.requestsFactory;
    await civilServiceRequests.updateCaseData(
      claimantOrganisationSuperUser,
      this.ccdCaseData.id,
      respondent2ResponseDeadline,
    );
    await super.fetchAndSetCCDCaseData();
  }
}
