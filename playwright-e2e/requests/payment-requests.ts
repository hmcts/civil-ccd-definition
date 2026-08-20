import BaseRequest from '../base/base-request';
import urls from '../config/urls';
import { AllMethodsStep } from '../decorators/test-steps';
import User from '../models/users/user';
import RequestOptions from '../models/api/request-options';
import ServiceAuthProviderRequests from './service-auth-provider-requests';

@AllMethodsStep()
export default class PaymentRequests extends ServiceAuthProviderRequests(BaseRequest) {
  async createAPBAPayment(user: User, caseId: number, refundablePaymentBody: any) {
    console.log(`Creating APBA payment, caseId: ${caseId}, user: ${user.name}`);
    const url = `${urls.paymentApi}/credit-account-payments`
    const requestOptions: RequestOptions = {
      headers: await super.getRequestHeaders(user),
      body: refundablePaymentBody,
      method: 'POST',
    };
    await super.retryRequest(url, requestOptions, {
      expectedStatus: 201,
    });
    console.log(`APBA payment successfully created, caseId: ${caseId}, user: ${user.name}`);
  }

  async rollbackPaymentDate(user: User, caseId: number) {
    console.log(`Rolling back payment date, caseId: ${caseId}, user: ${user.name}`);
    const url = `${urls.paymentApi}/payments/ccd_case_reference/${caseId}/lag_time/25`;
    const requestOptions: RequestOptions = {
      headers: await super.getRequestHeaders(user),
      method: 'PATCH'
    }
    await super.retryRequest(
      url,
      requestOptions,
      { expectedStatus: 204 },
    );
    console.log(`Payment date successfully rolled back, caseId: ${caseId}, user: ${user.name}`);
  }
}
