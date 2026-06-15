import { APIRequestContext, expect, request } from '@playwright/test';
import path from 'path';
import fs from 'fs';

import { APIResponse } from 'playwright';
import { stringify } from 'node:querystring';
import { TokensHelper } from './TokensHelper.ts';
import { civilSystemUpdate } from '../../playwright-e2e/config/users/exui-users.ts';
import { civilServiceUrl, systemupdate, apiRetries, respondent1SolicitorCredentials, respondent2SolicitorCredentials } from '../civilConfig.ts';
import claimTypes from '../enums/claim-types.ts';


export class TestingEndPointHelper {

  private tokensHelper: TokensHelper;
  private accessToken: string;
  private s2sToken: string;
  private uid: string;
  private eventToken: string;
  private user;
  private nonEventTokens;
  private testingSupportUrl = `${civilServiceUrl}/testing-support`

  constructor() {
    this.tokensHelper = new TokensHelper();
  }

  async waitForCamundaProcessToFinish(caseId: string, camundaEventToCheckFor?: string) {
    await this.getTokens(systemupdate);

    const businessProcessUrl = `${this.testingSupportUrl}/case/${caseId}/business-process`;
    // console.log('businessProcessUrl>>> ',businessProcessUrl);
    // console.log('accessToken>>> ',this.nonEventTokens.accessToken);
    // console.log('s2sToken>>> ',this.nonEventTokens.s2sToken);
    const apiRequestContext: APIRequestContext = await request.newContext();
    await expect.poll(async () => {
      const response = await apiRequestContext.get(businessProcessUrl, {
        headers: this.getHeaders()
      });
      const data = await response.json();
      let status = await data.businessProcess.status;
      const camundaEvent = await data.businessProcess.camundaEvent;
      const processInstanceId = await data.businessProcess.processInstanceId;

      if (camundaEventToCheckFor && camundaEvent !== camundaEventToCheckFor) {
        status = 'NOT FOUND';
      }

      console.log( 'Waiting on event: ' + camundaEventToCheckFor + '. Current status is: ' + status);
      if (status === 'FINISHED') {
        console.log(`Event: ${camundaEventToCheckFor} has status of: ${status}. Continuing test...`);
      }
      return status;
      },
      {
        // Wait x milliseconds between retries
        intervals: apiRetries.intervals,
        timeout: apiRetries.timeout,
        message: camundaEventToCheckFor ? `The camunda event: ${camundaEventToCheckFor} did not start within the allowed timeframe` : '',
      }).toBe('FINISHED');
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
        headers: this.getHeaders(),
        data: requestBody
      });

      if (!response.ok()) {
        const errorText = await response.text();
        throw new Error(
          `Failed to create appeal: ${response.status()} - ${errorText}. Ensure your VPN is connected or check your URL/SECRET.`
        );
      } else {
        await this.waitForCamundaProcessToFinish(caseId, 'CREATE_CLAIM_AFTER_PAYMENT');
      }
    }
    catch (error) {
      throw new Error(
        `An error occurred while trying to create the appeal: ${
          error instanceof Error ? error.message : error
        }`
      );
    };
  }

  async assignDefendantLegalRepToCase(caseId: string, claimType: claimTypes) {
    const assignCaseUrl = `${this.testingSupportUrl}/assign-case/${caseId}/`;
    const apiRequestContext: APIRequestContext = await request.newContext();
    let response: APIResponse;
    try {
      if (claimType === claimTypes.ONE_VS_TWO_DIFF_SOL) {
        console.log('Assigning Defendant 1 Legal Representative to the claim...');
        await this.getTokens(respondent1SolicitorCredentials);

        response = await apiRequestContext.post(`${assignCaseUrl}RESPONDENTSOLICITORONE`, {
          headers: this.getHeaders()
        });
        if (response.ok()) {
          console.log('Assigning Defendant 2 Legal Representative to the claim...');
          await this.getTokens(respondent2SolicitorCredentials);
          response = await apiRequestContext.post(`${assignCaseUrl}RESPONDENTSOLICITORTWO`, {
            headers: this.getHeaders()
          });
          if (!response.ok()) {
            throw new Error(`An error occurred while trying to assign the case to the Defendant Legal Rep: ${claimType}`);
          }
        } else {
          throw new Error(`An error occurred while trying to assign the case to the Defendant Legal Rep: ${claimType}`);
        }
      }

      if (claimType == claimTypes.ONE_VS_TWO_LIP_LR) {
        console.log('Assigning Defendant 2 Legal Representative to the claim...');
        await this.getTokens(respondent2SolicitorCredentials);
        response = await apiRequestContext.post(`${assignCaseUrl}RESPONDENTSOLICITORTWO`, {
          headers: this.getHeaders()
        });
        if (!response.ok()) {
          throw new Error(`An error occurred while trying to assign the case to the Defendant Legal Rep: ${claimType}`);
        }
      }

      if (claimType == claimTypes.ONE_VS_TWO_LR_LIP || claimType == claimTypes.ONE_VS_ONE || claimType == claimTypes.TWO_VS_ONE || claimType == claimTypes.ONE_VS_TWO_SAME_SOL) {
        console.log('Assigning Defendant 1 Legal Representative to the claim...');
        await this.getTokens(respondent1SolicitorCredentials);
        response = await apiRequestContext.post(`${assignCaseUrl}RESPONDENTSOLICITORONE`, {
          headers: this.getHeaders()
        });
        if (!response.ok()) {
          throw new Error(`An error occurred while trying to assign the case to the Defendant Legal Rep: ${claimType}`);
        }
      }
    }
    catch (error) {
      throw new Error(
        `An error occurred while trying to create the appeal: ${
          error instanceof Error ? error.message : error
        }`
      );
    };
    console.log('Assignment successful. Continuing test...');
  }

  private getHeaders() {
    const headers = {
      "Content-Type": "application/json",
      Accept: "*/*",
      Authorization: `Bearer ${this.nonEventTokens.accessToken}`,
      ServiceAuthorization: this.nonEventTokens.s2sToken
    };
    return headers;
  }

  private async getTokens(user) {
    this.nonEventTokens = await this.tokensHelper.getNonEventTokens(user);
  }

}
