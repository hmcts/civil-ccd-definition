import BaseRequest from '../base/base-request';
import urls from '../config/urls';
import { AllMethodsStep } from '../decorators/test-steps';
import CaseRole from '../constants/cases/case-role';
import RespondentAgreed from '../constants/ccd-events/ccd-events/initiate-general-application/respondent-agreed';
import WithNotice from '../constants/ccd-events/ccd-events/initiate-general-application/with-notice';
import RequestOptions from '../models/api/request-options';
import CCDCaseData, { ClaimFee, UploadDocumentValue } from '../models/ccd-case-data';
import ServiceAuthProviderRequests from './service-auth-provider-requests';
import CaseState from '../constants/cases/case-state';
import GeneralApplicationFeeRequest from '../models/ccd-events/ccd-events/initiate-general-application/general-application-fee-request';
import User from '../models/users/user';
import GaCaseState from '../constants/cases/ga-case-states';

@AllMethodsStep()
export default class CivilServiceRequests extends ServiceAuthProviderRequests(BaseRequest) {
  private testingSupportUrl = `${urls.civilService}/testing-support`;

  async submitEventCitizen(
    user: User,
    payload: Record<string, any>,
    caseId: number | 'draft' = 'draft',
    expectedState?: CaseState,
  ): Promise<CCDCaseData> {
    console.log(`Submitting citizen event, event: ${payload.event}, caseId: ${caseId}, user: ${user.name}`);

    const url = `${urls.civilService}/cases/${caseId}/citizen/${user.userId}/event`;
    const requestOptions: RequestOptions = {
      headers: await super.getRequestHeaders(user),
      body: payload,
      method: 'POST',
    };

    const responseJson = await super.retryRequestJson(url, requestOptions, {
      statusErrorMessage: async (responseJson, { url, status, expectedStatus }) => {
        if(status === 404) {
          return await responseJson.text();
        } else if(status === 422) {
          let message =
            `Expected Status: ${expectedStatus}, actual status: ${status}, url: ${url}, error: ${responseJson.error}, message: ${responseJson.message}`;

          if (responseJson.details?.field_errors?.length) {
            message += `, field errors: ${responseJson.details.field_errors
              .map((item: any) => `{id: ${item.id}, message: ${item.message}}`)
              .join(', ')}`;
          }

          return message;
        }
      },
      verifyResponse: async (responseJson) => {
        await super.expectResponseJsonToHaveProperty('id', responseJson);
        await super.expectResponseJsonToHaveProperty('case_data', responseJson);
        if (expectedState) {
          await super.expectResponseJsonToHavePropertyValue(
            'state',
            expectedState,
            responseJson,
            { nonRetryable: true },
          );
        }
      },
    });

    console.log(`Citizen event submitted successfully, event: ${payload.event}, caseId: ${responseJson.id}, user: ${user.name}`);
    return {
      id: Number(responseJson.id),
      ...responseJson.case_data,
    };
  }

  async getClaimFeeData(user: User, amount: number): Promise<ClaimFee> {
    const roundedAmount = Number(amount.toFixed(2));
    console.log(`Getting claim fee data, amount: ${roundedAmount}`);
    const url = `${urls.civilService}/fees/claim/${roundedAmount}`;
    const requestOptions: RequestOptions = {
      headers: await super.getRequestHeaders(user),
    };

    const responseJson = await super.retryRequestJson(url, requestOptions, {
      verifyResponse: async (responseJson) => {
        await super.expectResponseJsonToHaveProperty('calculatedAmountInPence', responseJson);
        await super.expectResponseJsonToHaveProperty('code', responseJson);
        await super.expectResponseJsonToHaveProperty('version', responseJson);
      },
    });
    console.log(
      `Claim fee of ${responseJson.calculatedAmountInPence} retrieved based on claim amount ${roundedAmount} successfully`,
    );
    return responseJson;
  }

  async getGaClaimFeeData(
    user: User,
    {
      gaTypesLr,
      respondentAgreed,
      withNotice,
      hearingDate,
    }: GeneralApplicationFeeRequest,
  ): Promise<ClaimFee> {
    console.log(
      `Getting general application claim fee data, applicationTypes: ${gaTypesLr.join(', ')}`,
    );
    const url = `${urls.civilService}/fees/general-application`;
    const requestOptions: RequestOptions = {
      headers: await super.getRequestHeaders(user),
      body: {
        applicationTypes: gaTypesLr,
        withConsent: respondentAgreed === RespondentAgreed.YES,
        withNotice: withNotice === WithNotice.YES,
        ...(hearingDate ? { hearingDate } : {}),
      },
      method: 'POST',
    };

    const responseJson = await super.retryRequestJson(url, requestOptions, {
      verifyResponse: async (responseJson) => {
        await super.expectResponseJsonToHaveProperty('calculatedAmountInPence', responseJson);
        await super.expectResponseJsonToHaveProperty('code', responseJson);
        await super.expectResponseJsonToHaveProperty('version', responseJson);
      },
    });

    console.log('General application claim fee retrieved successfully.');
    return responseJson;
  }

  async uploadTestDocument(user: User): Promise<UploadDocumentValue> {
    console.log('Uploading test document...');
    const url = `${this.testingSupportUrl}/upload/test-document`;
    const requestOptions: RequestOptions = {
      headers: await super.getRequestHeaders(user),
      method: 'POST',
    };

    const responseJson = await super.retryRequestJson(url, requestOptions, {
      verifyResponse: async (responseJson) => {
        await super.expectResponseJsonToHaveProperty('document_url', responseJson);
        await super.expectResponseJsonToHaveProperty('document_binary_url', responseJson);
        await super.expectResponseJsonToHaveProperty('document_filename', responseJson);
      },
    });
    console.log('Test document uploaded sucessfully');
    return {
      document_url: responseJson.document_url,
      document_binary_url: responseJson.document_binary_url,
      document_filename: responseJson.document_filename,
    };
  }

  async waitForFinishedBusinessProcess(
    user: User,
    caseId?: number,
    expectedCaseState?: (CaseState | GaCaseState)[] | CaseState | GaCaseState,
  ) {
    console.log(`Waiting for business process to finish, caseId: ${caseId}`);
    const url = `${this.testingSupportUrl}/case/${caseId}/business-process`;
    const requestOptions: RequestOptions = {
      headers: await this.getRequestHeaders(user),
    };
    await super.retryRequestJson(url, requestOptions, {
      retries: 25,
      retryTimeInterval: 3000,
      verifyResponse: async (responseJson) => {
        await super.expectResponseJsonToHaveProperty('businessProcess', responseJson);
        await super.expectResponseJsonPropertyToBe(
          'businessProcess.status',
          'FINISHED',
          responseJson,
          {
            message:
              `Ongoing business process: ${responseJson.businessProcess.camundaEvent}, caseId: ${caseId}, status: ${responseJson.businessProcess.status},` +
              ` process instance: ${responseJson.businessProcess.processInstanceId}, last finished activity: ${responseJson.businessProcess.activityId}`,
          },
        );
        await super.expectResponseJsonToNotHaveProperty('incidentMessage', responseJson, {
          message: `Business process failed for case: ${caseId}, incident message: ${responseJson.incidentMessage}`,
        });
        if (expectedCaseState)
          await super.expectResponseJsonPropertyToBe(
            'ccdState',
            expectedCaseState,
            responseJson,
            { nonRetryable: true },
          );
      },
    });
    console.log(`Business process successfully finished, caseId: ${caseId}`);
  }

  async waitForGAFinishedBusinessProcess(user: User, caseId?: number) {
    console.log(`Waiting for general application business process to finish, caseId: ${caseId}`);
    const url = `${this.testingSupportUrl}/case/${caseId}/business-process/ga`;
    const requestOptions: RequestOptions = {
      headers: await this.getRequestHeaders(user),
    };
    await super.retryRequestJson(url, requestOptions, {
      retries: 30,
      retryTimeInterval: 5000,
      verifyResponse: async (responseJson) => {
        await super.expectResponseJsonToHaveProperty('businessProcess', responseJson);
        await super.expectResponseJsonToHavePropertyValue(
          'businessProcess.status',
          'FINISHED',
          responseJson,
          {
            message:
              `Ongoing general application business process: ${responseJson.businessProcess.camundaEvent}, caseId: ${caseId}, status: ${responseJson.businessProcess.status},` +
              ` process instance: ${responseJson.businessProcess.processInstanceId}, last finished activity: ${responseJson.businessProcess.activityId}`,
          },
        );
        await super.expectResponseJsonToNotHaveProperty('incidentMessage', responseJson, {
          message: `General application business process failed for case: ${caseId}, incident message: ${responseJson.incidentMessage}`,
        });
      },
    });
    console.log(`General application business process successfully finished, caseId: ${caseId}`);
  }

  async updatePaymentForClaimIssue(user: User, serviceRequestDTO: any) {
    console.log(
      `Updating payment for claim issue, caseId: ${serviceRequestDTO.ccd_case_number}...`,
    );
    const url = `${urls.civilService}/service-request-update-claim-issued`;
    const requestOptions: RequestOptions = {
      headers: await super.getRequestHeaders(user),
      body: serviceRequestDTO,
      method: 'PUT',
    };
    await super.retryRequest(url, requestOptions);
    console.log(
      `Payment for claim issue successfully updated, caseId: ${serviceRequestDTO.ccd_case_number}`,
    );
  }

  async updatePaymentForGaClaimIsue(user: User, serviceRequestDTO: any) {
    console.log(
      `Updating payment for general application, caseId: ${serviceRequestDTO.ccd_case_number}...`,
    );
    const url = `${urls.civilService}/service-request-update`;
    const requestOptions: RequestOptions = {
      headers: await super.getRequestHeaders(user),
      body: serviceRequestDTO,
      method: 'PUT',
    };
    await super.retryRequest(url, requestOptions);
    console.log(
      `Payment for general application successfully updated, caseId: ${serviceRequestDTO.ccd_case_number}`,
    );
  }

  async triggerHearingFeePaid(user: User, caseId?: number) {
    console.log(`Triggering hearing fee paid, caseId: ${caseId}...`);
    const url = `${this.testingSupportUrl}/${caseId}/trigger-hearing-fee-paid`;
    const requestOptions: RequestOptions = {
      headers: await super.getRequestHeaders(user),
      method: 'GET',
    };
    await super.retryRequest(url, requestOptions);
    console.log(`Hearing fee paid triggered successfully, caseId: ${caseId}`);
  }

  async assignCaseToDefendant(user: User, caseRole: CaseRole, caseId?: number) {
    console.log(`Assigning role: ${caseRole} to user: ${user.name}, caseId: ${caseId}`);
    const url = `${this.testingSupportUrl}/assign-case/${caseId}/${caseRole}`;
    const requestOptions: RequestOptions = {
      headers: await this.getRequestHeaders(user),
      method: 'POST',
    };
    await super.retryRequest(url, requestOptions);
    console.log(`Role: ${caseRole} successfully assigned to user: ${user.name}, caseId: ${caseId}`);
  }

  async unassignUserFromCases(user: User, caseIds: number[]) {
    console.log(`Unassigning cases from user: ${user.name}...`);
    const url = `${this.testingSupportUrl}/unassign-user`;
    const requestOptions: RequestOptions = {
      headers: await this.getRequestHeaders(user),
      body: {
        caseIds,
      },
      method: 'POST',
    };
    await super.retryRequest(url, requestOptions);
    caseIds.forEach((caseId) =>
      console.log(`User: ${user.name} unassigned from case [${caseId}] successfully`),
    );
  }

  async updateCaseData(user: User, caseData: CCDCaseData, caseId?: number) {
    console.log(`Updating case data, caseId: ${caseId}`);
    const url = `${this.testingSupportUrl}/case/${caseId}`;
    const requestOptions: RequestOptions = {
      headers: await this.getRequestHeaders(user),
      body: caseData,
      method: 'PUT',
    };
    await super.retryRequest(url, requestOptions);
    console.log(`Case data successfully updated, caseId: ${caseId}`);
  }
}
