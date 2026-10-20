import { randomUUID } from 'node:crypto';
import { APIRequestContext, expect, request } from '@playwright/test';
import { paymentApiBaseUrl } from '../civilConfig.ts';
import { TokensHelper } from './TokensHelper.ts';

// The PBA account the claimant solicitor pays from, as the UI's PaymentPage chooses it
const pbaAccount = 'PBA0078095';

// Pays fees through the payment service, as XUI's "Pay now" does from the Service Request tab
export class PaymentHelper {
  private tokensHelper = new TokensHelper();

  // Pays a service request from the user's organisation's PBA account. The payment service then tells civil-service
  // about the payment, as it does after a payment in the UI. Returns the payment's reference.
  async payServiceRequestByPba(user, serviceRequestReference: string, amountInPence: string | number, customerReference: string): Promise<string> {
    const { accessToken, s2sToken } = await this.tokensHelper.getNonEventTokens(user);
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      const response = await apiRequestContext.post(`${paymentApiBaseUrl}/service-request/${serviceRequestReference}/pba-payments`, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}`, ServiceAuthorization: s2sToken },
        data: {
          amount: Number(amountInPence) / 100,
          currency: 'GBP',
          customer_reference: customerReference,
          account_number: pbaAccount,
          idempotency_key: randomUUID(),
          organisation_name: 'Civil - Organisation 1',
        },
      });
      expect(response.ok(), `Paying service request ${serviceRequestReference} returned ${response.status()}: ${await response.text()}`).toBeTruthy();
      const payment = await response.json();
      console.log(`Service request ${serviceRequestReference} paid by PBA: ${payment.payment_reference} (${payment.status})`);
      return payment.payment_reference;
    } finally {
      await apiRequestContext.dispose();
    }
  }
}
