import { randomUUID } from 'node:crypto';
import { APIRequestContext, expect, request } from '@playwright/test';
import { paymentApiBaseUrl } from '../civilConfig.ts';
import { TokensHelper } from './TokensHelper.ts';

// The PBA account the claimant solicitor pays from, as the UI's PaymentPage chooses it
const pbaAccount = 'PBA0078095';

// Pays fees through the payment service, as XUI's "Pay now" does from the Service Request tab
export class PaymentHelper {
  private tokensHelper = new TokensHelper();

  // Pays the whole of a case's service request from the user's organisation's PBA account. The amount is what the
  // payment service says is due on it (the total of its fees' amounts due), as "Pay now" shows, since a service request
  // can be for more than one fee: a claim with an other remedy pays the claim fee and the other remedy fee together.
  // The payment service then tells civil-service about the payment, as it does after a payment in the UI. Returns the
  // payment's reference.
  async payServiceRequestByPba(user, caseId: string, serviceRequestReference: string, customerReference: string): Promise<string> {
    const { accessToken, s2sToken } = await this.tokensHelper.getNonEventTokens(user);
    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}`, ServiceAuthorization: s2sToken };
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      const groups = await apiRequestContext.get(`${paymentApiBaseUrl}/cases/${caseId}/paymentgroups`, { headers });
      expect(groups.ok(), `Reading case ${caseId}'s service requests returned ${groups.status()}: ${await groups.text()}`).toBeTruthy();
      const group = (await groups.json()).payment_groups?.find((g) => g.payment_group_reference === serviceRequestReference);
      expect(group, `The payment service has no service request ${serviceRequestReference} for case ${caseId}`).toBeDefined();
      const amountDue = group.fees.reduce((total: number, fee) => total + Number(fee.amount_due), 0);
      const fees = group.fees.map((fee) => `${fee.code} £${fee.amount_due}`).join(' + ');

      const response = await apiRequestContext.post(`${paymentApiBaseUrl}/service-request/${serviceRequestReference}/pba-payments`, {
        headers,
        data: {
          amount: amountDue,
          currency: 'GBP',
          customer_reference: customerReference,
          account_number: pbaAccount,
          idempotency_key: randomUUID(),
          organisation_name: 'Civil - Organisation 1',
        },
      });
      expect(response.ok(), `Paying service request ${serviceRequestReference} (${fees}) returned ${response.status()}: ${await response.text()}`).toBeTruthy();
      const payment = await response.json();
      console.log(`Service request ${serviceRequestReference} (${fees}) paid by PBA: ${payment.payment_reference} (${payment.status})`);
      return payment.payment_reference;
    } finally {
      await apiRequestContext.dispose();
    }
  }
}
