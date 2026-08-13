import BaseRequest from '../base/base-request';
import urls from '../config/urls';
import { AllMethodsStep } from '../decorators/test-steps';
import User from '../models/users/user';
import RequestOptions from '../models/api/request-options';
import ServiceAuthProviderRequests from './service-auth-provider-requests';

@AllMethodsStep()
export default class PaymentRequests extends ServiceAuthProviderRequests(BaseRequest) {
  async createRefundablePayment(user: User, caseId: number) {
    console.log(`Creating refundable payment, caseId: ${caseId}`);
    const requestOptions: RequestOptions = {
      headers: await super.getRequestHeaders(user),
      body: {
        account_number: 'PBA0088192',
        amount: 550,
        case_reference: `${caseId}`,
        ccd_case_number: `${caseId}`,
        currency: 'GBP',
        customer_reference: 'string',
        description: 'string',
        fees: [
          {
            calculated_amount: 550,
            code: 'FEE0209',
            fee_amount: 550,
            version: 3,
            volume: 1,
          },
        ],
        organisation_name: 'string',
        service: 'CIVIL',
        site_id: 'AAA7',
      },
      method: 'POST',
    };
    await super.retryRequest(`${urls.paymentApi}/credit-account-payments`, requestOptions, {
      expectedStatus: 201,
    });

    console.log(`Rolling back refundable payment date, caseId: ${caseId}`);
    await super.retryRequest(
      `${urls.paymentApi}/payments/ccd_case_reference/${caseId}/lag_time/25`,
      { headers: await super.getRequestHeaders(user), method: 'PATCH' },
      { expectedStatus: 204 },
    );
  }
}
