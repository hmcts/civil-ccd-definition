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

  // Pays the extra fee a judge or legal adviser asks for when they send an application made without notice to the other
  // side (MAKE_DECISION, "Send application to other party"), which leaves it in APPLICATION_ADD_PAYMENT. civil-service
  // keeps its service request in generalAppPBADetails.additionalPaymentServiceRef, and once the payment service tells
  // it, runs MODIFY_STATE_AFTER_ADDITIONAL_FEE_PAID (no business process), which sends the application to the other
  // side to respond (AWAITING_RESPONDENT_RESPONSE).
  async payAdditional(applicationCaseId: string, user: SessionUserKey) {
    const serviceRequestReference = await this.testingEndPointHelper.waitForServiceRequestReference(applicationCaseId, 'generalAppPBADetails', undefined, 'additionalPaymentServiceRef');
    await new PaymentHelper().payServiceRequestByPba(sessionUsers[user].credentials, applicationCaseId, serviceRequestReference, 'GeneralApplicationReference');
    const recordedByPaymentService = await this.testingEndPointHelper.waitForFeePaid(applicationCaseId, 'generalAppPBADetails.additionalPaymentDetails', 60);
    if (!recordedByPaymentService) {
      console.log('The payment service did not record the general application additional fee payment, so the test does');
      await this.testingEndPointHelper.serviceRequestUpdateGeneralApplication(applicationCaseId, true);
    }
  }
}
