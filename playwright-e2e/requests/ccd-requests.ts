import BaseRequest from '../base/base-request';
import config from '../config/config';
import urls from '../config/urls';
import { Step } from '../decorators/test-steps';
import RequestOptions from '../models/request-options';
import { TruthyParams } from '../decorators/truthy-params';
import CCDCaseData from '../models/ccd/ccd-case-data';
import User from '../models/user';
import ServiceAuthProviderRequests from './service-auth-provider-requests';
import { CCDEvent } from '../models/ccd/ccd-events';

const classKey = 'CCDRequests';
export default class CCDRequests extends ServiceAuthProviderRequests(BaseRequest) {
  private getCcdDataStoreBaseUrl({ userId, role }: User) {
    return `${urls.ccdDataStore}/${role}s/${userId}/jurisdictions/${config.definition.jurisdiction}/case-types/${config.definition.caseType}`;
  }

  private async getRequestHeaders({ accessToken }: User) {
    const civilS2sToken = await this.fetchCivilS2sToken();
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      ServiceAuthorization: civilS2sToken,
    };
  }

  @Step(classKey)
  @TruthyParams(classKey, 'caseId')
  async fetchCCDCaseData(caseId: number, user: User) {
    console.log(`Fetching CCD case data, id: ${caseId}...`);
    const url = `${this.getCcdDataStoreBaseUrl(user)}/cases/${caseId}`;
    const requestOptions: RequestOptions = {
      headers: await this.getRequestHeaders(user),
    };
    const responseJson = await super.retryRequestJson(url, requestOptions);
    console.log(`CCD case data fetched successfully, id: ${caseId}`);
    return { id: responseJson.id, ...responseJson.case_data };
  }

  @Step(classKey)
  async startEvent(ccdEvent: CCDEvent, user: User, caseId?: number) {
    console.log(
      `Starting event: ${ccdEvent.id}` +
        (typeof caseId !== 'undefined' ? ` caseId: ${caseId}` : ''),
    );
    let url = this.getCcdDataStoreBaseUrl(user);
    if (caseId) {
      url += `/cases/${caseId}`;
    }
    url += `/event-triggers/${ccdEvent.id}/token`;

    const requestOptions: RequestOptions = {
      headers: await this.getRequestHeaders(user),
    };
    const response = await super.retryRequestJson(url, requestOptions);
    console.log(`Event: ${ccdEvent.id} started successfully`);
    return response.token;
  }

  @Step(classKey)
  async submit(ccdEvent: CCDEvent, caseData: CCDCaseData, user: User, ccdEventToken: string) {
    console.log(
      `Submitting event: ${ccdEvent.id}` +
        (typeof caseData.id !== 'undefined' ? ` caseId: ${caseData.id}` : ''),
    );
    let url = `${this.getCcdDataStoreBaseUrl(user)}/cases`;
    if (caseData.id) {
      url += `/${caseData.id}/events`;
    }

    const requestOptions: RequestOptions = {
      headers: await this.getRequestHeaders(user),
      body: {
        data: caseData,
        event: { id: ccdEvent.id },
        event_data: caseData,
        event_token: ccdEventToken,
      },
      method: 'POST',
    };
    const responseJson = await super.retryRequestJson(url, requestOptions, { expectedStatus: 201 });
    console.log(`Event: ${ccdEvent.id} submitted successfully`);
    return responseJson;
  }
}
