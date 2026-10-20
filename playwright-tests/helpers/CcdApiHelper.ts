import { APIRequestContext, expect, request } from '@playwright/test';
import { ccdDataStoreApiBaseUrl, createCase } from '../civilConfig.ts';
import { TokensHelper } from './TokensHelper.ts';

// What CCD returns when an event is started: the token the event must be submitted with, and the case data as the
// event's about to start callback left it (for example the dynamic lists it fills in)
export interface StartedEvent {
  token: string;
  caseData: Record<string, any>;
}

// Runs CCD events through the CCD data store API as a user, the way XUI does when the event is submitted, but without
// going through the event's pages. CCD runs the event's about to submit and submitted callbacks as usual.
export class CcdApiHelper {
  private tokensHelper: TokensHelper;

  constructor() {
    this.tokensHelper = new TokensHelper();
  }

  // Starts the event on the case, or a case creation event when there is no case ID
  async startEvent(user, eventId: string, caseId?: string): Promise<StartedEvent> {
    const { accessToken, s2sToken, uid } = await this.tokensHelper.getNonEventTokens(user);
    const url = `${this.caseTypeUrl(uid)}${caseId ? `/cases/${caseId}` : ''}/event-triggers/${eventId}/token`;
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      const response = await apiRequestContext.get(url, { headers: this.getHeaders(accessToken, s2sToken) });
      expect(response.ok(), `Starting ${eventId} returned ${response.status()}: ${await response.text()}`).toBeTruthy();
      const body = await response.json();
      return { token: body.token, caseData: body.case_details?.case_data ?? {} };
    } finally {
      await apiRequestContext.dispose();
    }
  }

  // Submits the event with the given case data, and returns the case CCD saved. Without a case ID it creates the case.
  async submitEvent(user, eventId: string, eventToken: string, data: Record<string, any>, caseId?: string): Promise<Record<string, any>> {
    const { accessToken, s2sToken, uid } = await this.tokensHelper.getNonEventTokens(user);
    const url = `${this.caseTypeUrl(uid)}/cases${caseId ? `/${caseId}/events` : ''}`;
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      const response = await apiRequestContext.post(url, {
        headers: this.getHeaders(accessToken, s2sToken),
        data: {
          data,
          event: { id: eventId, summary: '', description: 'Submitted by playwright-tests' },
          event_token: eventToken,
          ignore_warning: false,
        },
      });
      expect(response.ok(), `Submitting ${eventId} returned ${response.status()}: ${await response.text()}`).toBeTruthy();
      return await response.json();
    } finally {
      await apiRequestContext.dispose();
    }
  }

  // CCD's case type ID is CIVIL (createCase.caseTypeCode is the label XUI shows, Civil)
  private caseTypeUrl(uid: string) {
    return `${ccdDataStoreApiBaseUrl}/caseworkers/${uid}/jurisdictions/${createCase.jurisdictionCode}/case-types/CIVIL`;
  }

  private getHeaders(accessToken: string, s2sToken: string) {
    return {
      'Content-Type': 'application/json',
      Accept: '*/*',
      Authorization: `Bearer ${accessToken}`,
      ServiceAuthorization: s2sToken,
    };
  }
}
