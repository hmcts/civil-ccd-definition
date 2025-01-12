import BaseApiSteps from '../../../../../base/base-api-steps';
import { claimantSolicitorUser } from '../../../../../config/users/exui-users';
import CreateClaimSpecDataBuilder from '../../../../../data-builders/ccd-events/exui/solicitor-events/create-claim/lr-spec/create-claim-spec-data-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CaseState from '../../../../../enums/case-state';
import CCDEvents from '../../../../../constants/ccd-events';
import UserAssignedCasesHelper from '../../../../../helpers/user-assigned-cases-helper';
import TestData from '../../../../../models/test-data';
import RequestsFactory from '../../../../../requests/requests-factory';

@AllMethodsStep()
export default class ApiCreateClaimSpecSteps extends BaseApiSteps {
  private createClaimSpecDataBuilder: CreateClaimSpecDataBuilder;

  constructor(
    createClaimSpecDataBuilder: CreateClaimSpecDataBuilder,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this.createClaimSpecDataBuilder = createClaimSpecDataBuilder;
  }

  async Create1v1Claim() {
    await this.setupUserData(claimantSolicitorUser);
    const createClaimEventData = await this.createClaimSpecDataBuilder.buildSmallTrack1v1();
    const { ccdRequests } = this.requestsFactory;
    const eventToken = await ccdRequests.startEvent(
      claimantSolicitorUser,
      CCDEvents.CREATE_CLAIM_SPEC,
    );
    const eventData = await super.validatePages(
      CCDEvents.CREATE_CLAIM_SPEC,
      createClaimEventData,
      claimantSolicitorUser,
      eventToken,
    );
    const eventCaseData = await ccdRequests.submitEvent(
      claimantSolicitorUser,
      CCDEvents.CREATE_CLAIM_SPEC,
      CaseState.PENDING_CASE_ISSUED,
      eventData,
      eventToken,
    );
    await super.waitForFinishedBusinessProcess(claimantSolicitorUser, eventCaseData.id);
    await this.fetchAndSetCCDCaseData(claimantSolicitorUser, eventCaseData.id);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData.id);
  }
}
