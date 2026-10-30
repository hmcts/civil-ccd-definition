import { APIRequestContext, expect, request } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import moment from 'moment-business-days';

import { APIResponse } from 'playwright';
import { stringify } from 'node:querystring';
import { TokensHelper } from './TokensHelper.ts';
import { civilServiceUrl, ccdDataStoreApiBaseUrl, createCase, systemupdate, civilSystemUpdate, apiRetries, respondent1SolicitorCredentials, respondent2SolicitorCredentials, workAllocation } from '../civilConfig.ts';
import claimTypes from '../enums/claim-types.ts';
import CaseStates from '../enums/caseStates.ts';
import GaCaseStates from '../enums/gaCaseStates.ts';
import CaseType from '../enums/caseType.ts';
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
    // While the process is STARTED, Camunda is asked every incidentCheckSeconds whether one of its steps has failed for
    // good (an incident), so the test stops with the step's error rather than waiting for the timeout
    const incidentCheckSeconds = 15;
    let lastIncidentCheck = 0;
    let camundaReachable = true;
    await expect.poll(async () => {
      // A request that gets no answer in time, or a gateway answering with an error page, is treated as not finished
      // yet and asked again
      let response: APIResponse;
      try {
        response = await apiRequestContext.get(businessProcessUrl, {
          headers: this.getHeaders()
        });
      } catch (error) {
        console.log(`Business process for case ${caseId} did not answer (${(error as Error).message.split('\n')[0]}), asking again`);
        return 'UNAVAILABLE';
      }
      const body = await response.text();
      let data;
      try {
        data = JSON.parse(body);
      } catch {
        console.log(`Business process for case ${caseId} not readable (status ${response.status()}), asking again: ${body.slice(0, 80).replace(/\s+/g, ' ')}`);
        return 'UNAVAILABLE';
      }
      if (!response.ok() || !data?.businessProcess) {
        console.log(`Business process for case ${caseId} not available (status ${response.status()}), asking again`);
        return 'UNAVAILABLE';
      }
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
      if (status === 'STARTED' && processInstanceId && camundaReachable && Date.now() - lastIncidentCheck >= incidentCheckSeconds * 1000) {
        lastIncidentCheck = Date.now();
        const incident = await this.camundaIncident(processInstanceId);
        if (incident === undefined) {
          console.log(`Camunda (${workAllocation.camundaUrl}) could not be asked about failed steps, so case ${caseId} is only checked through its business process`);
          camundaReachable = false;
        } else if (incident) {
          throw new Error(`${camundaEvent} failed in Camunda for case ${caseId} at ${incident.activityId}: ${incident.incidentMessage}`
            + (incident.incidentType === 'failedExternalTask'
              ? `\nTo retry the step: curl -X PUT -H "Content-Type: application/json" -d '{"retries":1}' ${workAllocation.camundaUrl}/external-task/${incident.configuration}/retries`
              : ''));
        }
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

  // The oldest incident on a Camunda process instance, null if it has none, or undefined if Camunda cannot be asked
  // (on AAT its address is only reachable on the VPN). A step that fails in a called process also raises an incident
  // on the process that called it, so the business process's own instance is enough.
  private async camundaIncident(processInstanceId: string): Promise<{ activityId: string; incidentMessage: string; incidentType: string; configuration: string } | null | undefined> {
    const camunda = await request.newContext();
    try {
      const response = await camunda.get(`${workAllocation.camundaUrl}/incident?processInstanceId=${processInstanceId}&sortBy=incidentTimestamp&sortOrder=asc`, { timeout: 10000 });
      if (!response.ok()) {
        return undefined;
      }
      const incidents = await response.json();
      return Array.isArray(incidents) && incidents.length > 0 ? incidents[0] : null;
    } catch {
      return undefined;
    } finally {
      await camunda.dispose();
    }
  }

  // Waits until the case has no business process running (none, or the last one FINISHED). civil-service refuses to
  // start most events while one is running ("There is a technical issue causing a delay"). Through the UI the time
  // the pages take to load is usually enough, but API events follow each other straight away.
  async waitForNoOngoingBusinessProcess(caseId: string) {
    await this.getTokens(systemupdate);
    const businessProcessUrl = `${this.testingSupportUrl}/case/${caseId}/business-process`;
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      await expect.poll(async () => {
        try {
          const response = await apiRequestContext.get(businessProcessUrl, { headers: this.getHeaders() });
          if (!response.ok()) {
            return `HTTP ${response.status()}`;
          }
          const businessProcess = JSON.parse(await response.text()).businessProcess;
          return !businessProcess?.status || businessProcess.status === 'FINISHED'
            ? 'FINISHED'
            : `${businessProcess.camundaEvent} ${businessProcess.status}`;
        } catch (error) {
          return `UNAVAILABLE (${(error as Error).message.split('\n')[0]})`;
        }
      }, {
        intervals: apiRetries.intervals,
        timeout: apiRetries.timeout,
        message: `Case ${caseId} still has a business process running`,
      }).toBe('FINISHED');
    } finally {
      await apiRequestContext.dispose();
    }
  }

  // Checks the case's CCD state, read from civil-service's business process endpoint. The state is set by background
  // processing, so it is checked repeatedly until it matches or the retry timeout runs out. The environment's gateway
  // sometimes answers with an error page instead of JSON, which counts as one failed try rather than failing the step.
  async assertCaseState(caseId: string, expectedState: CaseStates | GaCaseStates) {
    await this.getTokens(systemupdate);
    const businessProcessUrl = `${this.testingSupportUrl}/case/${caseId}/business-process`;
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      await expect.poll(async () => {
        const response = await apiRequestContext.get(businessProcessUrl, { headers: this.getHeaders() });
        const body = await response.text();
        try {
          return JSON.parse(body).ccdState;
        } catch {
          console.log(`Case state check got HTTP ${response.status()} that is not JSON, trying again: ${body.slice(0, 100)}`);
          return `HTTP ${response.status()} (not JSON)`;
        }
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
  // issued (CREATE_CLAIM_AFTER_PAYMENT, or CREATE_CLAIM_SPEC_AFTER_PAYMENT for a specified claim). Used where the
  // payment service cannot reach civil-service.
  async serviceRequestUpdateClaimIssued(caseId: string, camundaEvent: string = 'CREATE_CLAIM_AFTER_PAYMENT') {
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
        await this.waitForCamundaProcessToFinish(caseId, camundaEvent);
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
  // Waits for civil-service to record the payment service's service request for a fee, and returns its reference.
  // pbaDetailsField is where the case keeps it, claimIssuedPBADetails for the claim fee or hearingFeePBADetails for the
  // hearing fee. The Service Request tab lists each service request by this reference.
  async waitForServiceRequestReference(caseId: string, pbaDetailsField: string, waitSeconds = apiRetries.timeout / 1000): Promise<string> {
    await this.getTokens(systemupdate);
    const caseUrl = `${this.testingSupportUrl}/case/${caseId}`;
    const apiRequestContext: APIRequestContext = await request.newContext();
    let reference: string | undefined;
    try {
      await expect.poll(async () => {
        const response = await apiRequestContext.get(caseUrl, { headers: this.getHeaders() });
        reference = (await response.json())[pbaDetailsField]?.serviceRequestReference;
        return reference;
      }, {
        intervals: [5000],
        timeout: waitSeconds * 1000,
        message: `civil-service did not record a service request in ${pbaDetailsField} for case ${caseId}`,
      }).toBeTruthy();
      console.log(`${pbaDetailsField} service request for case ${caseId}: ${reference}`);
      return reference;
    } finally {
      await apiRequestContext.dispose();
    }
  }

  // Waits for civil-service to record the fee as paid in paymentDetailsField, which can be a path such as
  // generalAppPBADetails.paymentDetails. Returns false if it has not within waitSeconds.
  async waitForFeePaid(caseId: string, paymentDetailsField: string, waitSeconds: number): Promise<boolean> {
    await this.getTokens(systemupdate);
    const caseUrl = `${this.testingSupportUrl}/case/${caseId}`;
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      await expect.poll(async () => {
        const response = await apiRequestContext.get(caseUrl, { headers: this.getHeaders() });
        const caseData = await response.json();
        return paymentDetailsField.split('.').reduce((value, key) => value?.[key], caseData)?.status;
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

  // Tells civil-service a general application's fee has been paid, as the payment service would. Used where the
  // payment service cannot reach civil-service. civil-service then runs INITIATE_GENERAL_APPLICATION_AFTER_PAYMENT.
  async serviceRequestUpdateGeneralApplication(applicationCaseId: string) {
    const { generalAppPBADetails } = await this.getCaseData(applicationCaseId);
    const amount = (Number(generalAppPBADetails?.fee?.calculatedAmountInPence ?? 0) / 100).toFixed(2);
    await this.getTokens(systemupdate);
    const apiRequestContext: APIRequestContext = await request.newContext();
    const paidAt = new Date().toISOString();
    try {
      const response = await apiRequestContext.put(`${civilServiceUrl}/service-request-update`, {
        headers: this.getHeaders(),
        data: {
          service_request_reference: generalAppPBADetails?.serviceRequestReference ?? '2020-1599477846963',
          ccd_case_number: applicationCaseId,
          service_request_amount: amount,
          service_request_status: 'Paid',
          payment: { amount, customer_reference: 'playwright-tests', date_created: paidAt, date_updated: paidAt, payment_reference: 'RC-1234-GENERAL-APP' },
        },
      });
      expect(response.ok(), `General application fee payment callback returned ${response.status()}: ${await response.text()}`).toBeTruthy();
      console.log(`General application fee payment callback sent for application ${applicationCaseId}`);
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

  // How many final orders the judge has issued on the case (finalOrderDocumentCollection)
  // The date and time by which the defendant (1 or 2) must respond to the claim (respondent1ResponseDeadline or
  // respondent2ResponseDeadline), as civil-service holds it
  async getResponseDeadline(caseId: string, defendantNumber: number): Promise<string | undefined> {
    await this.getTokens(systemupdate);
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      const response = await apiRequestContext.get(`${this.testingSupportUrl}/case/${caseId}`, { headers: this.getHeaders() });
      expect(response.ok(), `Reading case ${caseId} returned ${response.status()}`).toBeTruthy();
      const caseData = await response.json();
      return caseData[`respondent${defendantNumber}ResponseDeadline`];
    } finally {
      await apiRequestContext.dispose();
    }
  }

  // The flags held in a case data field: caseFlags or a party's own flags, or for a list of experts or witnesses the
  // flags of the entry at index
  async getCaseFlagDetails(caseId: string, field: string, index?: number): Promise<Array<Record<string, string>>> {
    await this.getTokens(systemupdate);
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      const response = await apiRequestContext.get(`${this.testingSupportUrl}/case/${caseId}`, { headers: this.getHeaders() });
      expect(response.ok(), `Reading case ${caseId} returned ${response.status()}`).toBeTruthy();
      const caseData = await response.json();
      const holder = index === undefined ? caseData[field] : caseData[field]?.[index]?.value;
      const flags = field === 'caseFlags' ? holder : holder?.flags;
      return (flags?.details ?? []).map((detail) => detail.value);
    } finally {
      await apiRequestContext.dispose();
    }
  }

  async countFinalOrders(caseId: string): Promise<number> {
    await this.getTokens(systemupdate);
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      const response = await apiRequestContext.get(`${this.testingSupportUrl}/case/${caseId}`, { headers: this.getHeaders() });
      expect(response.ok(), `Reading case ${caseId} returned ${response.status()}`).toBeTruthy();
      const caseData = await response.json();
      return (caseData.finalOrderDocumentCollection ?? []).length;
    } finally {
      await apiRequestContext.dispose();
    }
  }

  // Runs MOVE_TO_DECISION_OUTCOME as the civil system update user, which is what civil-service's decision outcome
  // scheduler does once a case's hearing date has passed. It moves the case from PREPARE_FOR_HEARING_CONDUCT_HEARING
  // to DECISION_OUTCOME, ready for the judge's final order.
  async moveToDecisionOutcome(caseId: string) {
    await this.runSystemEvent(caseId, 'MOVE_TO_DECISION_OUTCOME', 'Hearing date has passed');
  }

  // Runs TRIAL_READY_CHECK as the civil system update user, which is what civil-service's trial ready check scheduler
  // does each night for fast track cases whose hearing is coming up. It records that the parties have been asked to
  // confirm they are ready for trial (trialReadyChecked) and starts the TRIAL_READY_CHECK business process, which
  // creates the dashboard notifications for parties without a solicitor. The case's state does not change.
  // Uploads civil-service's test document as the user, for case data that needs a document (such as a litigation
  // friend's certificate of suitability). Returns the document as case data holds it (document_url,
  // document_binary_url, document_filename and document_hash).
  async uploadTestDocument(user): Promise<Record<string, string>> {
    await this.getTokens(user);
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      const response = await apiRequestContext.post(`${this.testingSupportUrl}/upload/test-document`, {
        headers: this.getHeaders(),
        data: {},
      });
      expect(response.ok(), `Uploading the test document returned ${response.status()}: ${await response.text()}`).toBeTruthy();
      return await response.json();
    } finally {
      await apiRequestContext.dispose();
    }
  }

  async triggerTrialReadyCheck(caseId: string) {
    await this.runSystemEvent(caseId, 'TRIAL_READY_CHECK', 'Trial ready check');
  }

  // Runs TRIAL_READY_NOTIFICATION as the civil system user, which is what civil-service's trial ready notification
  // scheduler does each night for fast track cases whose hearing is less than 6 weeks away. It records that the parties
  // have been told (trialReadyNotified) and starts the TRIAL_READY_NOTIFICATION business process, whose "Notify parties"
  // task emails each solicitor the solicitorTrialReady notification asking them to confirm they are ready for trial.
  async triggerTrialReadyNotification(caseId: string) {
    await this.runSystemEvent(caseId, 'TRIAL_READY_NOTIFICATION', 'Trial ready notification');
  }

  // The emails civil-service has sent for the case through GOV.UK Notify, each with Notify's notificationId, optionally
  // only those from one template. civil-service keeps them in memory where testing support is switched on, keyed by the
  // email's reference, which is built from the case's legacy reference (e.g. trial-ready-notification-000KA016).
  async getSentNotifications(caseId: string, templateId?: string): Promise<Array<{
    templateId: string; recipientEmail: string; reference: string; notificationId: string; sentAt: string;
  }>> {
    const { legacyCaseReference } = await this.getCaseData(caseId);
    expect(legacyCaseReference, `Case ${caseId} has no legacy case reference`).toBeTruthy();
    await this.getTokens(systemupdate);
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      const query = `caseId=${legacyCaseReference}${templateId ? `&templateId=${templateId}` : ''}`;
      const response = await apiRequestContext.get(`${this.testingSupportUrl}/notifications/sent?${query}`, { headers: this.getHeaders() });
      expect(response.ok(), `Reading the notifications sent for case ${caseId} returned ${response.status()}`).toBeTruthy();
      return await response.json();
    } finally {
      await apiRequestContext.dispose();
    }
  }

  // The case's data as civil-service holds it
  async getCaseData(caseId: string): Promise<Record<string, any>> {
    await this.getTokens(systemupdate);
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      const response = await apiRequestContext.get(`${this.testingSupportUrl}/case/${caseId}`, { headers: this.getHeaders() });
      expect(response.ok(), `Reading case ${caseId} returned ${response.status()}`).toBeTruthy();
      return await response.json();
    } finally {
      await apiRequestContext.dispose();
    }
  }

  // Changes the case's data through civil-service's testing support, which runs CCD's UPDATE_CASE_DATA event as the
  // system user with the given fields added to the case's data. Used to set up what the service would otherwise wait
  // for, such as a response deadline passing.
  async updateCaseData(caseId: string, data: Record<string, unknown>) {
    await this.getTokens(systemupdate);
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      const response = await apiRequestContext.put(`${this.testingSupportUrl}/case/${caseId}`, { headers: this.getHeaders(), data });
      expect(response.ok(), `Updating case ${caseId} returned ${response.status()}: ${await response.text()}`).toBeTruthy();
    } finally {
      await apiRequestContext.dispose();
    }
  }

  // Moves each defendant's response deadline to yesterday, as if the time for responding had passed with no
  // response, which default judgment needs. Yesterday rather than an hour ago, because civil-service only allows
  // default judgment on an unspecified claim from 5pm on the day the response was due. Checks the case saved them.
  async moveResponseDeadlinesToPast(caseId: string, defendants: 1 | 2) {
    const yesterday = moment().subtract(1, 'day').format('YYYY-MM-DDTHH:mm:ss');
    const deadlines: Record<string, string> = { respondent1ResponseDeadline: yesterday };
    if (defendants === 2) {
      deadlines.respondent2ResponseDeadline = yesterday;
    }
    await this.updateCaseData(caseId, deadlines);
    const caseData = await this.getCaseData(caseId);
    for (const [field, value] of Object.entries(deadlines)) {
      expect(String(caseData[field]).slice(0, 10), `${field} on case ${caseId} was not moved to ${value}`).toBe(value.slice(0, 10));
    }
    console.log(`Response deadlines on case ${caseId} moved to ${yesterday}: ${Object.keys(deadlines).join(', ')}`);
  }

  // Whether one of civil-service's feature toggles is switched on in this environment
  async isFeatureEnabled(toggle: string): Promise<boolean> {
    await this.getTokens(systemupdate);
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      const response = await apiRequestContext.get(`${this.testingSupportUrl}/feature-toggle/${toggle}`, { headers: this.getHeaders() });
      expect(response.ok(), `Checking feature toggle ${toggle} returned ${response.status()}`).toBeTruthy();
      // Jackson names the flag toggleEnabled or isToggleEnabled, depending on the getter civil-service has
      const body = await response.json();
      return (body.isToggleEnabled ?? body.toggleEnabled) === true;
    } finally {
      await apiRequestContext.dispose();
    }
  }

  // Runs a CCD event on the case as the civil system update user, as civil-service's schedulers do
  private async runSystemEvent(caseId: string, eventId: string, summary: string) {
    const { accessToken, s2sToken, uid } = await this.tokensHelper.getNonEventTokens(civilSystemUpdate);
    const eventToken = await this.tokensHelper.getEventToken(eventId, caseId, uid, accessToken, s2sToken);
    const eventUrl = `${ccdDataStoreApiBaseUrl}/caseworkers/${uid}/jurisdictions/${createCase.jurisdictionCode}`
      + `/case-types/${createCase.caseTypeCode}/cases/${caseId}/events`;
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      const response = await apiRequestContext.post(eventUrl, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          ServiceAuthorization: s2sToken,
        },
        data: {
          event: { id: eventId, summary, description: 'Run by playwright-tests' },
          event_token: eventToken,
          ignore_warning: false,
          data: {},
        },
      });
      expect(response.ok(), `${eventId} returned ${response.status()}: ${await response.text()}`).toBeTruthy();
      console.log(`${eventId} run for case ${caseId}`);
    } finally {
      await apiRequestContext.dispose();
    }
  }

  // Assigns each defendant's solicitor to the case, as the claim type has them. A defendant in skipDefendants (1 or 2)
  // is left alone, as a notice of change has already given the case to their solicitor.
  async assignDefendantLegalRepToCase(caseId: string, claimType: claimTypes, skipDefendants: number[] = []) {
    const assignCaseUrl = `${this.testingSupportUrl}/assign-case/${caseId}/`;
    const apiRequestContext: APIRequestContext = await request.newContext();
    const assign = async (defendantNumber: number, credentials, userKey: 'respondent1Solicitor' | 'respondent2Solicitor', caseRole: string) => {
      if (skipDefendants.includes(defendantNumber)) {
        console.log(`Not assigning Defendant ${defendantNumber}'s Legal Representative: a notice of change gave them the case`);
        return;
      }
      await this.getTokens(credentials);
      const response = await apiRequestContext.post(`${assignCaseUrl}${caseRole}`, {
        headers: this.getHeaders()
      });
      if (!response.ok()) {
        throw await this.assignmentError(response, claimType);
      }
      CaseUserRegistry.record(caseId, userKey);
    };
    try {
      if (claimType === claimTypes.ONE_VS_TWO_DIFF_SOL) {
        console.log('Assigning Defendant 1 Legal Representative to the claim...');
        await assign(1, respondent1SolicitorCredentials, 'respondent1Solicitor', 'RESPONDENTSOLICITORONE');
        console.log('Assigning Defendant 2 Legal Representative to the claim...');
        await assign(2, respondent2SolicitorCredentials, 'respondent2Solicitor', 'RESPONDENTSOLICITORTWO');
      }

      if (claimType == claimTypes.ONE_VS_TWO_LIP_LR) {
        console.log('Assigning Defendant 2 Legal Representative to the claim...');
        await assign(2, respondent2SolicitorCredentials, 'respondent2Solicitor', 'RESPONDENTSOLICITORTWO');
      }

      if (claimType == claimTypes.ONE_VS_TWO_LR_LIP || claimType == claimTypes.ONE_VS_ONE || claimType == claimTypes.TWO_VS_ONE || claimType == claimTypes.ONE_VS_TWO_SAME_SOL) {
        console.log('Assigning Defendant 1 Legal Representative to the claim...');
        await assign(1, respondent1SolicitorCredentials, 'respondent1Solicitor', 'RESPONDENTSOLICITORONE');
        // A solicitor representing both defendants also holds Defendant 2's role, as the earlier suites assign it:
        // without it they cannot answer Defendant 2's fields (an unspecified response that differs for each defendant)
        if (claimType === claimTypes.ONE_VS_TWO_SAME_SOL) {
          console.log('Assigning Defendant 1 Legal Representative to the claim as Defendant 2\'s too...');
          await assign(2, respondent1SolicitorCredentials, 'respondent1Solicitor', 'RESPONDENTSOLICITORTWO');
        }
      }
    }
    catch (error) {
      throw new Error(
        `An error occurred while trying to create the appeal: ${
          error instanceof Error ? error.message : error
        }`
      );
    } finally {
      await apiRequestContext.dispose();
    }
    console.log('Assignment successful. Continuing test...');
  }

  // How many times an event has been saved on a case (a claim unless another case type is given), from CCD's event
  // history. It is read with the user's own API token, which does not depend on their XUI session, so it works after
  // that session has ended.
  async countCaseEvents(user, caseId: string, eventId: string, caseType: CaseType = CaseType.CIVIL): Promise<number> {
    await this.getTokens(user);
    const url = `${ccdDataStoreApiBaseUrl}/caseworkers/${this.nonEventTokens.uid}/jurisdictions/${createCase.jurisdictionCode}/case-types/${caseType}/cases/${caseId}/events`;
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

  // The case IDs of a claim's general applications, oldest first. civil-service lists each application on its claim
  // (generalApplications), with a link to the application's own case once it has created it.
  async generalApplicationCaseIds(claimCaseId: string): Promise<string[]> {
    const { generalApplications } = await this.getCaseData(claimCaseId);
    return (generalApplications ?? [])
      .map((application) => application.value?.caseLink?.CaseReference)
      .filter((caseId): caseId is string => Boolean(caseId));
  }

  // Waits for civil-service to create the case of a general application just made on the claim, and returns its case
  // ID: the one linked from the claim that is not one of knownCaseIds, the claim's applications before it was made
  async waitForNewGeneralApplication(claimCaseId: string, knownCaseIds: string[]): Promise<string> {
    let newCaseId: string | undefined;
    await expect.poll(async () => {
      newCaseId = (await this.generalApplicationCaseIds(claimCaseId)).find((caseId) => !knownCaseIds.includes(caseId));
      return newCaseId;
    }, {
      intervals: apiRetries.intervals,
      timeout: apiRetries.timeout,
      message: `No new general application was linked to case ${claimCaseId}`,
    }).toBeDefined();
    console.log(`General application ${newCaseId} made on case ${claimCaseId}`);
    return newCaseId;
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
