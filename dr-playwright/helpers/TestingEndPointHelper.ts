import {APIRequestContext, request} from "@playwright/test";
import path from 'path';
import fs from 'fs';

import { APIResponse } from 'playwright';
import { stringify } from 'node:querystring';
import { TokensHelper } from './TokensHelper.ts';
import { civilSystemUpdate } from '../../playwright-e2e/config/users/exui-users.ts';
import { civilServiceUrl } from '../civilConfig.ts';


export class TestingEndPointHelper {

  private tokensHelper: TokensHelper;
  private accessToken: string;
  private s2sToken: string;
  private uid: string;
  private eventToken: string;

  constructor() {
    this.tokensHelper = new TokensHelper();
  }

  async hasCamundaProcessFinished(caseId: string) {
    const businessProcessUrl = `${civilServiceUrl}/case/${caseId}/business-process`;
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      const response = await apiRequestContext.post(businessProcessUrl, {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${this.accessToken}`,
          ServiceAuthorization: this.s2sToken
        }
      });

      if (!response.ok()) {
        throw new Error(
          `Failed to call testing endpoint for Camunda.`
        );
      }
      verifyResponse: async (responseJson) => {
        //await super.expectResponseJsonToHaveProperty('businessProcess', responseJson);
        const businessProcess = responseJson.businessProcess;
        console.log(businessProcess.status);
        //await super.expectResponseJsonToHavePropertyValue(
        //  'businessProcess.status',
        //  'FINISHED',
        //  responseJson,
        //  {
        //   message:
        //    `Ongoing business process: ${businessProcess.camundaEvent}, caseId: ${caseId}, status: ${businessProcess.status},` +
        //   ` process instance: ${businessProcess.processInstanceId}, last finished activity: ${businessProcess.activityId}`,
        // },
      }
      //return response;
    } catch (error) {
      throw new Error(
        `An error occurred while trying to call testing endpoint: ${error instanceof Error ? error.message : error}`
      );
    };
  };
   // civilSystemUpdate



  async getTokens(user) {
    this.tokensHelper.getNonEventTokens(user);
  }

}
