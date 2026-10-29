import { sessionUsers, SessionUserKey } from '../../../../helpers/SessionHelper.ts';
import { PaymentHelper } from '../../../../helpers/PaymentHelper.ts';
import { TestingEndPointHelper } from '../../../../helpers/TestingEndPointHelper.ts';

// Pays a general application's fee by PBA through the payment service, as the application's "Pay now" does in XUI,
// instead of its Service Request tab. The payment service then tells civil-service, which runs
// INITIATE_GENERAL_APPLICATION_AFTER_PAYMENT: an application made with notice waits for the other side's response,
// and one without notice or that they agreed to goes straight to the judge or legal adviser. Where the payment service
// cannot reach civil-service the test tells it instead, but only if the payment service has not done so within a
// minute, as telling it both ways would run the business process twice.
export class GeneralApplicationFee {
  private testingEndPointHelper = new TestingEndPointHelper();

  async pay(applicationCaseId: string, user: SessionUserKey) {
    const serviceRequestReference = await this.testingEndPointHelper.waitForServiceRequestReference(applicationCaseId, 'generalAppPBADetails');
    await new PaymentHelper().payServiceRequestByPba(sessionUsers[user].credentials, applicationCaseId, serviceRequestReference, 'GeneralApplicationReference');
    const recordedByPaymentService = await this.testingEndPointHelper.waitForFeePaid(applicationCaseId, 'generalAppPBADetails.paymentDetails', 60);
    if (!recordedByPaymentService) {
      console.log('The payment service did not record the general application fee payment, so the test does');
      await this.testingEndPointHelper.serviceRequestUpdateGeneralApplication(applicationCaseId);
    }
    await this.testingEndPointHelper.waitForCamundaProcessToFinish(applicationCaseId, 'INITIATE_GENERAL_APPLICATION_AFTER_PAYMENT');
  }
}
