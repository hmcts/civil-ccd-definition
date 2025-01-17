import BaseApiSteps from '../../base/base-api-steps';
import { claimantSolicitorUser } from '../../config/users/exui-users';
import ServiceRequestDataBuilder from '../../data-builders/service-request/service-request-data-builder';
import { AllMethodsStep } from '../../decorators/test-steps';
import TestData from '../../models/test-data';
import RequestsFactory from '../../requests/requests-factory';

@AllMethodsStep()
export default class ApiServiceRequestSteps extends BaseApiSteps {
  serviceRequestDataBuilder: ServiceRequestDataBuilder;

  constructor(
    serviceRequestDataBuilder: ServiceRequestDataBuilder,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this.serviceRequestDataBuilder = serviceRequestDataBuilder;
  }

  async MakePaymentForClaimIssue() {
    const paidServiceRequestDTO = await this.serviceRequestDataBuilder.buildPaidServiceRequestDTO(
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
}
