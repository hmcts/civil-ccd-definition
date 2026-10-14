import { APIRequestContext, expect, request } from '@playwright/test';
import path from 'path';
import fs from 'fs';

import { APIResponse } from 'playwright';
import { stringify } from 'node:querystring';
import { TokensHelper } from './TokensHelper.ts';
import { civilSystemUpdate } from '../../playwright-e2e/config/users/exui-users.ts';
import { civilServiceUrl, ccdDataStoreApiBaseUrl, createCase, systemupdate, apiRetries, respondent1SolicitorCredentials, respondent2SolicitorCredentials } from '../civilConfig.ts';
import claimTypes from '../enums/claim-types.ts';
import CaseStates from '../enums/caseStates.ts';
import { CaseUserRegistry } from './CaseUserRegistry.ts';


export class TestingEndPointHelper {

  private tokensHelper: TokensHelper;
  private accessToken: string;
  private s2sToken: string;
  private uid: string;
  private eventToken: string;
  private user;
  private nonEventTokens;
  // The user the current tokens belong to
  private tokensUser;
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

  // Checks the case's CCD state, read from civil-service's business process endpoint. The state is set by background
  // processing, so it is checked repeatedly until it matches or the retry timeout runs out.
  async assertCaseState(caseId: string, expectedState: CaseStates) {
    await this.getTokens(systemupdate);
    const businessProcessUrl = `${this.testingSupportUrl}/case/${caseId}/business-process`;
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      await expect.poll(async () => {
        const response = await apiRequestContext.get(businessProcessUrl, { headers: this.getHeaders() });
        const data = await response.json();
        return data.ccdState;
      }, {
        intervals: apiRetries.intervals,
        timeout: apiRetries.timeout,
        message: `Expected case ${caseId} to be in state ${expectedState}`,
      }).toBe(expectedState);
      console.log(`Case ${caseId} is in state ${expectedState}`);
    } finally {
      await apiRequestContext.dispose();
    }
  }

  // Tells civil-service the claim fee has been paid, as the payment service would, and waits for the claim to be
  // issued (CREATE_CLAIM_AFTER_PAYMENT). Used where the payment service cannot reach civil-service.
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
          `Claim fee payment callback returned ${response.status()} - ${errorText}. Ensure your VPN is connected or check your URL/SECRET.`
        );
      } else {
        await this.waitForCamundaProcessToFinish(caseId, 'CREATE_CLAIM_AFTER_PAYMENT');
      }
    }
    catch (error) {
      throw new Error(
        `An error occurred while telling civil-service the claim fee was paid: ${
          error instanceof Error ? error.message : error
        }`
      );
    };
  }

  // Waits up to waitSeconds for civil-service to record a fee as paid, which it does when the payment service tells
  // it about the payment. paymentDetailsField is where the case keeps that fee's payment, claimIssuedPaymentDetails
  // for the claim fee or hearingFeePaymentDetails for the hearing fee. Returns whether it was recorded.
  async waitForFeePaid(caseId: string, paymentDetailsField: string, waitSeconds: number): Promise<boolean> {
    await this.getTokens(systemupdate);
    const caseUrl = `${this.testingSupportUrl}/case/${caseId}`;
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      await expect.poll(async () => {
        const response = await apiRequestContext.get(caseUrl, { headers: this.getHeaders() });
        const caseData = await response.json();
        return caseData[paymentDetailsField]?.status;
      }, {
        intervals: [5000],
        timeout: waitSeconds * 1000,
      }).toBe('SUCCESS');
      console.log(`${paymentDetailsField} for case ${caseId} is recorded as paid`);
      return true;
    } catch {
      return false;
    } finally {
      await apiRequestContext.dispose();
    }
  }

  // Tells civil-service the hearing fee has been paid, as the payment service would. Used where the payment service
  // cannot reach civil-service.
  async serviceRequestUpdateHearingFee(caseId: string) {
    await this.getTokens(systemupdate);
    const apiRequestContext: APIRequestContext = await request.newContext();
    const requestBody = {
      service_request_reference: '2020-1599477846962',
      ccd_case_number: caseId,
      service_request_amount: 545.00,
      service_request_status: 'Paid',
      payment: {
        payment_amount: 545.00,
        payment_reference: 'RC-1234-HEARING',
        payment_method: 'by account',
        case_reference: 'example of case ref',
        account_number: 'PBA0078095',
      },
    };
    try {
      const response = await apiRequestContext.put(`${civilServiceUrl}/service-request-update`, {
        headers: this.getHeaders(),
        data: requestBody,
      });
      expect(response.ok(), `Hearing fee payment callback returned ${response.status()}: ${await response.text()}`).toBeTruthy();
      console.log(`Hearing fee payment callback sent for case ${caseId}`);
    } finally {
      await apiRequestContext.dispose();
    }
  }

  // Runs HEARING_FEE_PAID, which a civil-service scheduler normally runs once the hearing fee has been paid. It moves
  // the case from HEARING_READINESS to PREPARE_FOR_HEARING_CONDUCT_HEARING.
  async triggerHearingFeePaid(caseId: string) {
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      const response = await apiRequestContext.get(`${this.testingSupportUrl}/${caseId}/trigger-hearing-fee-paid`);
      const result = await response.text();
      expect(response.ok() && result.includes('success'), `Triggering HEARING_FEE_PAID returned ${response.status()}: ${result}`).toBeTruthy();
      console.log(`HEARING_FEE_PAID triggered for case ${caseId}`);
    } finally {
      await apiRequestContext.dispose();
    }
  }

  // Creates the trial bundle, which a civil-service scheduler normally does about 3 weeks before the hearing
  // (event CREATE_BUNDLE). The bundle is stitched together afterwards, see waitForBundleStitched.
  async triggerTrialBundle(caseId: string) {
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      const response = await apiRequestContext.get(`${this.testingSupportUrl}/${caseId}/trigger-trial-bundle`);
      const result = await response.text();
      expect(response.ok() && result.includes('success'), `Triggering the trial bundle returned ${response.status()}: ${result}`).toBeTruthy();
      console.log(`Trial bundle triggered for case ${caseId}`);
    } finally {
      await apiRequestContext.dispose();
    }
  }

  // Waits for the case's newest bundle to be stitched into one document. The document service does this in the
  // background and then tells CCD (event asyncStitchingComplete), which sets the bundle's stitchStatus to DONE.
  // Returns the bundle's title.
  async waitForBundleStitched(caseId: string): Promise<string> {
    await this.getTokens(systemupdate);
    const caseUrl = `${this.testingSupportUrl}/case/${caseId}`;
    const apiRequestContext: APIRequestContext = await request.newContext();
    let title = '';
    try {
      await expect.poll(async () => {
        const response = await apiRequestContext.get(caseUrl, { headers: this.getHeaders() });
        const caseData = await response.json();
        const bundles = caseData.caseBundles ?? [];
        if (bundles.length === 0) {
          return 'NO BUNDLE';
        }
        const newest = bundles[bundles.length - 1].value;
        title = newest.title;
        console.log(`Bundle "${title}" stitch status: ${newest.stitchStatus}`);
        return newest.stitchStatus;
      }, {
        intervals: [5000],
        timeout: apiRetries.timeout,
        message: `The trial bundle for case ${caseId} was not stitched`,
      }).toBe('DONE');
    } finally {
      await apiRequestContext.dispose();
    }
    return title;
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
          CaseUserRegistry.record(caseId, 'respondent1Solicitor');
          console.log('Assigning Defendant 2 Legal Representative to the claim...');
          await this.getTokens(respondent2SolicitorCredentials);
          response = await apiRequestContext.post(`${assignCaseUrl}RESPONDENTSOLICITORTWO`, {
            headers: this.getHeaders()
          });
          if (!response.ok()) {
            throw await this.assignmentError(response, claimType);
          }
          CaseUserRegistry.record(caseId, 'respondent2Solicitor');
        } else {
          throw await this.assignmentError(response, claimType);
        }
      }

      if (claimType == claimTypes.ONE_VS_TWO_LIP_LR) {
        console.log('Assigning Defendant 2 Legal Representative to the claim...');
        await this.getTokens(respondent2SolicitorCredentials);
        response = await apiRequestContext.post(`${assignCaseUrl}RESPONDENTSOLICITORTWO`, {
          headers: this.getHeaders()
        });
        if (!response.ok()) {
          throw await this.assignmentError(response, claimType);
        }
        CaseUserRegistry.record(caseId, 'respondent2Solicitor');
      }

      if (claimType == claimTypes.ONE_VS_TWO_LR_LIP || claimType == claimTypes.ONE_VS_ONE || claimType == claimTypes.TWO_VS_ONE || claimType == claimTypes.ONE_VS_TWO_SAME_SOL) {
        console.log('Assigning Defendant 1 Legal Representative to the claim...');
        await this.getTokens(respondent1SolicitorCredentials);
        response = await apiRequestContext.post(`${assignCaseUrl}RESPONDENTSOLICITORONE`, {
          headers: this.getHeaders()
        });
        if (!response.ok()) {
          throw await this.assignmentError(response, claimType);
        }
        CaseUserRegistry.record(caseId, 'respondent1Solicitor');
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

  // How many times an event has been saved on a case, from CCD's event history. It is read with the user's own API
  // token, which does not depend on their XUI session, so it works after that session has ended.
  async countCaseEvents(user, caseId: string, eventId: string): Promise<number> {
    await this.getTokens(user);
    // CCD's case type ID is CIVIL (createCase.caseTypeCode is the label XUI shows, Civil)
    const url = `${ccdDataStoreApiBaseUrl}/caseworkers/${this.nonEventTokens.uid}/jurisdictions/${createCase.jurisdictionCode}/case-types/CIVIL/cases/${caseId}/events`;
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      const response = await apiRequestContext.get(url, { headers: this.getHeaders() });
      if (!response.ok()) {
        throw new Error(`Could not read the event history of case ${caseId} (HTTP ${response.status()}): ${await response.text().catch(() => '')}`);
      }
      const events: { id: string }[] = await response.json();
      return events.filter((event) => event.id === eventId).length;
    } finally {
      await apiRequestContext.dispose();
    }
  }

  // Removes all of the user's case roles on the given cases (civil-service wraps CCD's case assignment API)
  // Sends one batch of case IDs. The user's tokens are only fetched for their first batch and reused after that.
  async unassignUserFromCases(user, caseIds: string[]) {
    if (this.tokensUser !== user) {
      await this.getTokens(user);
    }
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      const response = await apiRequestContext.post(`${this.testingSupportUrl}/unassign-user`, {
        headers: this.getHeaders(),
        data: { caseIds },
      });
      if (!response.ok()) {
        const body = await response.text().catch(() => '<unable to read response body>');
        throw new Error(
          `Failed to unassign ${user.name} from cases [${caseIds.join(', ')}]\n` +
          `POST ${response.url()}\nStatus: ${response.status()} ${response.statusText()}\nBody: ${body}`
        );
      }
      console.log(`${user.name} unassigned from cases [${caseIds.join(', ')}]`);
    } finally {
      await apiRequestContext.dispose();
    }
  }

  private async assignmentError(response: APIResponse, claimType: claimTypes) {
    const body = await response.text().catch(() => '<unable to read response body>');
    return new Error(
      `An error occurred while trying to assign the case to the Defendant Legal Rep: ${claimType}\n` +
      `POST ${response.url()}\nStatus: ${response.status()} ${response.statusText()}\nBody: ${body}`
    );
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
    this.tokensUser = user;
  }

}
