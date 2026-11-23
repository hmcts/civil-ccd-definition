import { APIRequestContext, expect, request } from '@playwright/test';
import { wiremockUrl } from '../civilConfig.ts';

// A WireMock stub mapping, as WireMock's admin API takes it
export interface WireMockStub {
  request: { method: string; url?: string; urlPath?: string; urlPathPattern?: string };
  response: { status: number; body?: string; headers?: Record<string, string> };
}

// Sets up stubs on the WireMock that a civil-service PR preview points some of its services at, HMC included (see
// civil-service's Jenkinsfile_CNP, setPreviewUrls). WireMock only exists on those previews, so WIREMOCK_URL is only set
// there. Each stub replaces the one already there for the same method and URL, so a test's stubs do not pile up.
export class WireMockHelper {
  static isAvailable(): boolean {
    return Boolean(wiremockUrl);
  }

  async upsertStubs(stubs: WireMockStub[]) {
    if (!wiremockUrl) {
      throw new Error('WIREMOCK_URL is not set: WireMock is only on civil-service PR previews (ENV=preview PREVIEW_SERVICE=service)');
    }
    const mappingsUrl = `${wiremockUrl}/__admin/mappings`;
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      const existingResponse = await apiRequestContext.get(mappingsUrl);
      expect(existingResponse.ok(), `Reading WireMock's stubs returned ${existingResponse.status()}`).toBeTruthy();
      const existing: Array<WireMockStub & { id: string }> = (await existingResponse.json()).mappings ?? [];
      for (const stub of stubs) {
        const match = existing.find((mapping) => mapping.request.method === stub.request.method
          && WireMockHelper.stubUrl(mapping) === WireMockHelper.stubUrl(stub));
        const response = match
          ? await apiRequestContext.put(`${mappingsUrl}/${match.id}`, { data: stub })
          : await apiRequestContext.post(mappingsUrl, { data: stub });
        expect(response.ok(), `Setting the WireMock stub for ${stub.request.method} ${WireMockHelper.stubUrl(stub)} returned ${response.status()}: ${await response.text()}`).toBeTruthy();
      }
    } finally {
      await apiRequestContext.dispose();
    }
  }

  private static stubUrl(stub: WireMockStub): string | undefined {
    return stub.request.url ?? stub.request.urlPath ?? stub.request.urlPathPattern;
  }
}
