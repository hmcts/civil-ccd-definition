import BaseRequest from '../base/base-request';
import config from '../config/config';
import urls from '../config/urls';
import { AllMethodsStep } from '../decorators/test-steps';
import RequestOptions from '../models/api/request-options';
import CCDCaseData from '../models/ccd-case-data';
import User from '../models/users/user';
import ServiceAuthProviderRequests from './service-auth-provider-requests';
import CCDEvent from '../models/ccd-events/ccdEvent';
import CaseType from '../constants/cases/case-type';

@AllMethodsStep({ methodNamesToIgnore: ['getCCDDataStoreBaseUrl'] })
export default class CCDRequests extends ServiceAuthProviderRequests(BaseRequest) {
  private getCCDDataStoreBaseUrl({ userId, role }: User, caseType = CaseType.CIVIL) {
    return `${urls.ccdDataStore}/${role}s/${userId}/jurisdictions/${config.definition.jurisdiction}/case-types/${caseType}`;
  }

  async fetchCCDCaseData(
    user: User,
    caseId?: number,
    expectedStatus = 200,
    caseType = CaseType.CIVIL
  ) {
    console.log(`Fetching CCD case data, caseId: ${caseId}, user: ${user.name}`);
    const url = `${this.getCCDDataStoreBaseUrl(user, caseType)}/cases/${caseId}`;
    const requestOptions: RequestOptions = {
      headers: await super.getRequestHeaders(user),
    };
    const responseJson = await super.retryRequestJson(url, requestOptions, {
      expectedStatus,
    });
    console.log(`CCD case data fetched successfully, caseId: ${caseId}, user: ${user.name}`);
    return { id: responseJson.id, state: responseJson.state, ...responseJson.case_data };
  }

  async validatePageData(
    ccdEvent: CCDEvent,
    user: User,
    pageId: string,
    pageData: object,
    eventData: object,
    ccdEventToken: string,
    caseId?: number,
    caseType = CaseType.CIVIL,
  ): Promise<CCDCaseData> {
    console.log(`Validating page: ${pageId}...`);
    const url = `${this.getCCDDataStoreBaseUrl(user, caseType)}/validate?pageId=${ccdEvent.id}${pageId}`;
    const requestOptions: RequestOptions = {
      headers: await this.getRequestHeaders(user),
      body: {
        case_reference: caseId,
        data: pageData,
        event: { id: ccdEvent.id },
        event_data: eventData,
        event_token: ccdEventToken,
      },
      method: 'POST',
    };
    const responseJson = await super.retryRequestJson(url, requestOptions, {
      statusErrorMessage: async (responseJson, { url, status, expectedStatus }) =>
        this.getStatusErrorMessage(responseJson, { url, status, expectedStatus }),
    });
    console.log(`Page: ${pageId} validated successfully`);
    return responseJson.data;
  }

  async startEvent(user: User, ccdEvent: CCDEvent, caseId?: number, caseType = CaseType.CIVIL): Promise<{eventToken: string, startEventCaseData: CCDCaseData}> {
    console.log(
      `Starting event: ${ccdEvent.id}` +
        (typeof caseId !== 'undefined' ? `, caseId: ${caseId}` : '') + 
        `, user: ${user.name}`,
    );
    let url = this.getCCDDataStoreBaseUrl(user, caseType);
    if (caseId) {
      url += `/cases/${caseId}`;
    }
    url += `/event-triggers/${ccdEvent.id}/token`;

    const requestOptions: RequestOptions = {
      headers: await super.getRequestHeaders(user),
    };
    const response = await super.retryRequestJson(url, requestOptions, {
      statusErrorMessage: async (responseJson, { url, status, expectedStatus }) =>
        this.getStatusErrorMessage(responseJson, { url, status, expectedStatus }),
      verifyResponse: async (responseJson) => {
        await super.expectResponseJsonToHaveProperty('token', responseJson);
      },
    });
    console.log(
      `Event: ${ccdEvent.id} started successfully` + 
      (typeof caseId !== 'undefined' ? `, caseId: ${caseId}` : '') + 
        `, user: ${user.name}`,);
    return { eventToken: response.token, startEventCaseData: response.case_details.case_data };
  }

  async startEventError(user: User, ccdEvent: CCDEvent, caseId?: number, caseType = CaseType.CIVIL): Promise<string> {
    console.log(
      `Starting event expecting callback error: ${ccdEvent.id}` +
        (typeof caseId !== 'undefined' ? `, caseId: ${caseId}` : '') +
        `, user: ${user.name}`,
    );
    let url = this.getCCDDataStoreBaseUrl(user, caseType);
    if (caseId) {
      url += `/cases/${caseId}`;
    }
    url += `/event-triggers/${ccdEvent.id}/token`;

    const requestOptions: RequestOptions = {
      headers: await super.getRequestHeaders(user),
    };
    const response = await super.retryRequestJson(url, requestOptions, {
      expectedStatus: 422,
      statusErrorMessage: async (responseJson, { url, status, expectedStatus }) =>
        this.getStatusErrorMessage(responseJson, { url, status, expectedStatus }),
      verifyResponse: async (responseJson) => {
        await super.expectResponseJsonToHaveProperty('callbackErrors', responseJson);
      },
    });
    console.log(`Event: ${ccdEvent.id} returned callback error successfully, user: ${user.name}`);
    return response.callbackErrors[0];
  }

  async submitEvent(
    user: User,
    ccdEvent: CCDEvent,
    eventData: any,
    ccdEventToken: string,
    caseId?: number,
    caseType = CaseType.CIVIL
  ): Promise<CCDCaseData> {
    console.log(
      `Submitting event: ${ccdEvent.id}` +
        (typeof caseId !== 'undefined' ? `, caseId: ${caseId}` : '') +
        `, user: ${user.name}`,
    );
    let url = `${this.getCCDDataStoreBaseUrl(user, caseType)}/cases`;
    if (caseId) {
      url += `/${caseId}/events`;
    }
    const requestOptions: RequestOptions = {
      headers: await super.getRequestHeaders(user),
      body: {
        data: eventData,
        event: { id: ccdEvent.id },
        event_token: ccdEventToken,
      },
      method: 'POST',
    };
    const responseJson = await super.retryRequestJson(url, requestOptions, {
      expectedStatus: 201,
      statusErrorMessage: async (responseJson, { url, status, expectedStatus }) =>
        this.getStatusErrorMessage(responseJson, { url, status, expectedStatus }),
    });
    const caseData: CCDCaseData = { id: responseJson.id, ...responseJson.case_data };
    console.log(`Event: ${ccdEvent.id} submitted successfully, caseId: ${caseData.id}, user: ${user.name}`);
    return caseData;
  }

  private async getStatusErrorMessage(
    responseJson: any,
    {
      url,
      status,
      expectedStatus,
    }: {
      url: string;
      status: number;
      expectedStatus: number | number[];
    },
  ) {
    const expectedStatusMessage = Array.isArray(expectedStatus) ? expectedStatus.join(', ') : expectedStatus;
    if (status === 422) {
      let message =
        `Expected Status: ${expectedStatusMessage}, actual status: ${status}, url: ${url}, error: ${responseJson.error}, message: ${responseJson.message}`;

      if (responseJson.details?.field_errors?.length) {
        message += `, field errors: ${responseJson.details.field_errors
          .map((item: any) => `{id: ${item.id}, message: ${item.message}}`)
          .join(', ')}`;
      }

      return message;
    } 
    return `Expected Status: ${expectedStatusMessage}, actual status: ${status}, url: ${url}, message: ${responseJson.message}`;
  }
}
