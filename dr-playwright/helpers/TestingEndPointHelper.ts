import { APIRequestContext, expect, request } from '@playwright/test';
import path from 'path';
import fs from 'fs';

import { APIResponse } from 'playwright';
import { stringify } from 'node:querystring';
import { TokensHelper } from './TokensHelper.ts';
import { civilSystemUpdate } from '../../playwright-e2e/config/users/exui-users.ts';
import { civilServiceUrl, systemupdate, apiRetries } from '../civilConfig.ts';


export class TestingEndPointHelper {

  private tokensHelper: TokensHelper;
  private accessToken: string;
  private s2sToken: string;
  private uid: string;
  private eventToken: string;
  private user;
  private nonEventTokens;


  constructor() {
    this.tokensHelper = new TokensHelper();
  }

  async waitForCamundaProcessToFinish(caseId: string, camundaEventToCheckFor?: string) {
    await this.getTokens(systemupdate);

    const businessProcessUrl = `${civilServiceUrl}/testing-support/case/${caseId}/business-process`;
    // console.log('businessProcessUrl>>> ',businessProcessUrl);
    // console.log('accessToken>>> ',this.nonEventTokens.accessToken);
    // console.log('s2sToken>>> ',this.nonEventTokens.s2sToken);
    const apiRequestContext: APIRequestContext = await request.newContext();
    await expect.poll(async () => {
      const response = await apiRequestContext.get(businessProcessUrl, {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${this.nonEventTokens.accessToken}`,
          ServiceAuthorization: this.nonEventTokens.s2sToken
        }
      });
      const data = await response.json();
      let status = await data.businessProcess.status;
      const camundaEvent = await data.businessProcess.camundaEvent;

      if (camundaEventToCheckFor && camundaEvent !== camundaEventToCheckFor) {
        status = 'NOT_FOUND';
      }

      console.log('businessProcess>>> ', data.businessProcess);
      console.log('status>>> ', status);
      return status;
      },
      {
        // Wait x milliseconds between retries
        intervals: apiRetries.intervals,
        timeout: apiRetries.timeout,
        message: camundaEventToCheckFor ? 'The camunda event: '+ camundaEventToCheckFor +  ' did not start within the allowed timeframe' : '',
      }).toEqual('FINISHED');
  };

  async serviceRequestUpdateClaimIssued(caseId: string) {
    await this.getTokens(systemupdate);
    const serviceRequestUpdateClaimIssuedUrl = `${civilServiceUrl}/service-request-update-claim-issued`;
    const apiRequestContext: APIRequestContext = await request.newContext();

    const requestBody = {
      "service_request_reference": "2020-1599477846961",
      "ccd_case_number": caseId,
      "service_request_amount": 70.00,
      "service_request_status":"paid",
      "payment":
        {
          "payment_amount": 70.00,
          "payment_reference": "RC-1234",
          "payment_method": "by account",
          "case_reference":"example of case ref",
          "account_number":"PBA123"
        }
    };

    try {
      const response = await apiRequestContext.put(serviceRequestUpdateClaimIssuedUrl, {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${this.nonEventTokens.accessToken}`,
          ServiceAuthorization: this.nonEventTokens.s2sToken
        },
        data: requestBody
      });

      if (!response.ok()) {
        console.log(stringify(await response.json()));
        const errorText = await response.text();
        throw new Error(
          `Failed to create appeal: ${response.status()} - ${errorText}. Ensure your VPN is connected or check your URL/SECRET.`
        );
      } else {
        await this.waitForCamundaProcessToFinish(caseId);
      }
    }
    catch (error) {
      throw new Error(
        `An error occurred while trying to validate the page data: ${
          error instanceof Error ? error.message : error
        }`
      );
    };

  }

  private async getTokens(user) {
    this.nonEventTokens = await this.tokensHelper.getNonEventTokens(user);
  }

}
