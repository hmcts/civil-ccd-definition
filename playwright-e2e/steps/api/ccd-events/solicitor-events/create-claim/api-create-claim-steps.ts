import BaseApiSteps from '../../../../../base/base-api-steps';
import { claimantSolicitorUser } from '../../../../../config/users/exui-users';
import CreateClaimDataBuilder from '../../../../../data-builders/ccd-events/exui/solicitor-events/create-claim/unspec/create-claim-data-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CaseState from '../../../../../enums/case-state';
import ccdEvents from '../../../../../constants/ccd-events';
import UserAssignedCasesHelper from '../../../../../helpers/user-assigned-cases-helper';
import TestData from '../../../../../models/test-data';
import RequestsFactory from '../../../../../requests/requests-factory';

@AllMethodsStep()
export default class ApiCreateClaimSteps extends BaseApiSteps {
  private createClaimDataBuilder: CreateClaimDataBuilder;

  constructor(
    createClaimDataBuilder: CreateClaimDataBuilder,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this.createClaimDataBuilder = createClaimDataBuilder;
  }

  async Create1v1Claim() {
    await this.setupUserData(claimantSolicitorUser);
    const { civilServiceRequests } = this.requestsFactory;
    const particularsOfClaimDocument =
      await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);
    const createClaimData = await this.createClaimDataBuilder.buildSmallTrack1v1(
      particularsOfClaimDocument,
    );

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
    await super.waitForFinishedBusinessProcess(claimantSolicitorUser, eventCaseData.id);
    await this.fetchAndSetCCDCaseData(claimantSolicitorUser, eventCaseData.id);
    UserAssignedCasesHelper.addAssignedCaseToUser(claimantSolicitorUser, this.ccdCaseData.id);
  }
}
