import fs from 'node:fs';
import path from 'node:path';
import { expect, request } from '@playwright/test';
import { envUrl } from '../civilConfig.ts';
import { signInWithoutBrowser, SessionUserKey } from './SessionHelper.ts';

const mimeTypes: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

// Uploads a file as the user the way XUI's document upload does (XUI's documentsv2, which stores it in the case
// document service), for API events whose document must be a particular kind of file, such as a judge's completed order
// in Word. Other documents can be civil-service's test document (TestingEndPointHelper.uploadTestDocument). The user is
// signed in to XUI over HTTP for the upload, so it does not depend on the test's browser session. Returns the document
// as case data holds it.
export async function uploadDocumentThroughXui(user: SessionUserKey, filePath: string): Promise<Record<string, string>> {
  const state = await signInWithoutBrowser(user);
  expect(state, `Signing ${user} in to XUI to upload ${filePath} failed`).toBeDefined();
  const xsrfToken = state.cookies.find((cookie) => cookie.name === 'XSRF-TOKEN')?.value ?? '';
  const apiRequestContext = await request.newContext({ storageState: state });
  try {
    const response = await apiRequestContext.post(`${envUrl}/documentsv2`, {
      headers: { 'X-XSRF-TOKEN': xsrfToken },
      multipart: {
        files: { name: path.basename(filePath), mimeType: mimeTypes[path.extname(filePath)] ?? 'application/octet-stream', buffer: fs.readFileSync(filePath) },
        classification: 'PUBLIC',
        caseTypeId: 'CIVIL',
        jurisdictionId: 'CIVIL',
      },
    });
    expect(response.ok(), `Uploading ${filePath} as ${user} returned ${response.status()}: ${await response.text()}`).toBeTruthy();
    const [document] = (await response.json()).documents;
    return {
      document_url: document._links.self.href,
      document_binary_url: document._links.binary.href,
      document_filename: document.originalDocumentName,
      document_hash: document.hashToken,
    };
  } finally {
    await apiRequestContext.dispose();
  }
}
