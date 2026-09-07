import BaseRequest from '../base/base-request';
import urls from '../config/urls';
import { AllMethodsStep } from '../decorators/test-steps';
import RequestOptions from '../models/api/request-options';
import User from '../models/users/user';
import ServiceAuthProviderRequests from './service-auth-provider-requests';

export type NocAnswer = {
  question_id: string;
  value: string;
};

@AllMethodsStep()
export default class CaseAssignmentServiceRequests extends ServiceAuthProviderRequests(BaseRequest) {
  async getNocQuestions(caseId: number, user: User) {
    console.log(`Fetching NOC questions, caseId: ${caseId}`);
    const url = `${urls.caseAssignmentService}/noc/noc-questions?case_id=${caseId}`;
    const requestOptions: RequestOptions = {
      headers: await this.getRequestHeaders(user),
    };
    const responseJson = await super.retryRequestJson(url, requestOptions);
    console.log(`NOC questions fetched successfully, caseId: ${caseId}`);
    return responseJson;
  }

  async validateNocAnswers(caseId: number, answers: NocAnswer[], user: User) {
    console.log(`Validating NOC answers, caseId: ${caseId}`);
    const url = `${urls.caseAssignmentService}/noc/verify-noc-answers`;
    const requestOptions: RequestOptions = {
      headers: await this.getRequestHeaders(user),
      body: { case_id: caseId, answers },
      method: 'POST',
    };
    const responseJson = await super.retryRequestJson(url, requestOptions);
    console.log(`NOC answers validated successfully, caseId: ${caseId}`);
    return responseJson;
  }

  async submitNocRequest(caseId: number, answers: NocAnswer[], user: User) {
    console.log(`Submitting NOC request, caseId: ${caseId}`);
    const url = `${urls.caseAssignmentService}/noc/noc-requests`;
    const requestOptions: RequestOptions = {
      headers: await this.getRequestHeaders(user),
      body: { case_id: caseId, answers },
      method: 'POST',
    };
    const responseJson = await super.retryRequestJson(url, requestOptions, {
      expectedStatus: 201,
    });
    console.log(`NOC request submitted successfully, caseId: ${caseId}`);
    return responseJson;
  }
}
