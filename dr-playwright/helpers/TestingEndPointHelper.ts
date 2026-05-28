import { APIRequestContext, expect, request } from '@playwright/test';
import path from 'path';
import fs from 'fs';

import { APIResponse } from 'playwright';
import { stringify } from 'node:querystring';
import { TokensHelper } from './TokensHelper.ts';
import { civilSystemUpdate } from '../../playwright-e2e/config/users/exui-users.ts';
import { civilServiceUrl, systemupdate } from '../civilConfig.ts';


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

  async waitForCamundaProcessToFinish(caseId: string) {
    await this.getTokens(systemupdate);
    const businessProcessUrl = `${civilServiceUrl}/testing-support/case/${caseId}/business-process`;
    // console.log('businessProcessUrl>>> ',businessProcessUrl);
    // console.log('accessToken>>> ',this.nonEventTokens.accessToken);
    // console.log('s2sToken>>> ',this.nonEventTokens.s2sToken);
    const apiRequestContext: APIRequestContext = await request.newContext();
    // await expect.poll(async () => {
    //   const response = await apiRequestContext.get(businessProcessUrl, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "*/*",
    //       Authorization: `Bearer ${this.nonEventTokens.accessToken}`,
    //       ServiceAuthorization: this.nonEventTokens.s2sToken
    //     }
    //   });
    //     response.json().businessProcess.status;
    // }).toEqual('FINISHED');

    try {
      const response = await apiRequestContext.get(businessProcessUrl, {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${this.nonEventTokens.accessToken}`,
          ServiceAuthorization: this.nonEventTokens.s2sToken
        }
      });
      console.log('response>>>> ', await response.json());
      if (!response.ok()) {
        throw new Error(
          `Failed to call testing endpoint for Camunda.`
        );
      }
      // verifyResponse: async (responseJson) => {
      //   //await super.expectResponseJsonToHaveProperty('businessProcess', responseJson);
      //   const businessProcess = responseJson.businessProcess;
      //   console.log(businessProcess.status);
      //   //await super.expectResponseJsonToHavePropertyValue(
      //   //  'businessProcess.status',
      //   //  'FINISHED',
      //   //  responseJson,
      //   //  {
      //   //   message:
      //   //    `Ongoing business process: ${businessProcess.camundaEvent}, caseId: ${caseId}, status: ${businessProcess.status},` +
      //   //   ` process instance: ${businessProcess.processInstanceId}, last finished activity: ${businessProcess.activityId}`,
      //   // },
      // }
      //return response;
    } catch (error) {
      throw new Error(
        `An error occurred while trying to call testing endpoint: ${error instanceof Error ? error.message : error}`
      );
    };
  };
   // civilSystemUpdate



  private async getTokens(user) {
    this.nonEventTokens = await this.tokensHelper.getNonEventTokens(user);
  }

}
