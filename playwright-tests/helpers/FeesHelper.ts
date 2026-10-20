import { APIRequestContext, expect, request } from '@playwright/test';
import { civilServiceUrl, feesRegisterApiBaseUrl } from '../civilConfig.ts';
import { TokensHelper } from './TokensHelper.ts';

// A fee as case data holds it (claimFee, otherRemedyFee)
export interface Fee {
  calculatedAmountInPence: string;
  code: string;
  version: string;
}

// Looks up the fees CREATE_CLAIM's Claim value page would work out (CreateClaimCallbackHandler.calculateFee), for
// creating a claim through the API, where that page's mid event callback is not run
export class FeesHelper {
  private tokensHelper = new TokensHelper();

  // The claim issue fee for a claim value, from civil-service's fees endpoint, which makes the same fees register
  // lookup as the Claim value page. It is asked for as the user creating the claim.
  async getClaimFee(user, amountInPounds: number): Promise<Fee> {
    const { accessToken, s2sToken } = await this.tokensHelper.getNonEventTokens(user);
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      const response = await apiRequestContext.get(`${civilServiceUrl}/fees/claim/${amountInPounds}`, {
        headers: { Authorization: `Bearer ${accessToken}`, ServiceAuthorization: s2sToken },
      });
      expect(response.ok(), `Looking up the claim fee for £${amountInPounds} returned ${response.status()}: ${await response.text()}`).toBeTruthy();
      const fee = await response.json();
      return { calculatedAmountInPence: String(fee.calculatedAmountInPence), code: fee.code, version: String(fee.version) };
    } finally {
      await apiRequestContext.dispose();
    }
  }

  // The "any other remedy" fee a housing disrepair or damages and other remedy claim also pays, looked up in the fees
  // register the way civil-service does (FeesClientService.lookupOtherRemedyFees and its otherRemediesFees settings)
  async getOtherRemedyFee(amountInPounds: number): Promise<Fee> {
    const params = new URLSearchParams({
      service: 'other',
      jurisdiction1: 'civil',
      jurisdiction2: 'civil',
      channel: 'default',
      event: 'issue',
      keyword: 'AnyOtherRemedy',
      amount_or_volume: String(amountInPounds),
    });
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      const response = await apiRequestContext.get(`${feesRegisterApiBaseUrl}/fees-register/fees/lookup?${params}`);
      expect(response.ok(), `Looking up the other remedy fee for £${amountInPounds} returned ${response.status()}: ${await response.text()}`).toBeTruthy();
      const fee = await response.json();
      return { calculatedAmountInPence: String(Math.round(fee.fee_amount * 100)), code: fee.code, version: String(fee.version) };
    } finally {
      await apiRequestContext.dispose();
    }
  }
}
