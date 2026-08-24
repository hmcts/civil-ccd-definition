import BaseRequest from '../base/base-request';
import urls from '../config/urls';
import { AllMethodsStep } from '../decorators/test-steps';
import RequestOptions from '../models/api/request-options';
import StudRequestBody from '../models/wire-mock/stud-request-body';

@AllMethodsStep()
export default class WireMockRequests extends BaseRequest {
  private wiremockMappingsUrl = `${urls.wiremockUrl}/__admin/mappings`;

  async getStubs(): Promise<StudRequestBody[]> {
    console.log('Getting WireMock stubs...');
    const responseJson = await super.requestJson(this.wiremockMappingsUrl, {}, {
      verifyResponse: async (responseJson) => {
        await super.expectResponseJsonToHaveProperty('mappings', responseJson);
      },
    });
    console.log('WireMock stubs retrieved successfully.');
    return responseJson.mappings;
  }

  async updateStubById(stubId: string, mappingContent: StudRequestBody) {
    console.log(`Updating WireMock stub, stubId: ${stubId}...`);
    const requestOptions: RequestOptions = {
      headers: { 'Content-Type': 'application/json' },
      body: mappingContent,
      method: 'PUT',
    };
    await super.requestJson(`${this.wiremockMappingsUrl}/${stubId}`, requestOptions);
    console.log(`WireMock stub updated successfully, stubId: ${stubId}`);
  }

  async createStub(mappingContent: StudRequestBody) {
    console.log('Creating WireMock stub...');
    const requestOptions: RequestOptions = {
      headers: { 'Content-Type': 'application/json' },
      body: mappingContent,
      method: 'POST',
    };
    await super.requestJson(this.wiremockMappingsUrl, requestOptions, {
      expectedStatus: [200, 201],
    });
    console.log('WireMock stub created successfully.');
  }
}
