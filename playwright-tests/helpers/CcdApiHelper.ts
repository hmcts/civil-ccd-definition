import { APIRequestContext, expect, request } from '@playwright/test';
import { ccdDataStoreApiBaseUrl, createCase } from '../civilConfig.ts';
import CaseType from '../enums/caseType.ts';
import { TestingEndPointHelper } from './TestingEndPointHelper.ts';
import { TokensHelper } from './TokensHelper.ts';

// What CCD returns when an event is started: the token the event must be submitted with, and the case data as the
// event's about to start callback left it (for example the dynamic lists it fills in)
export interface StartedEvent {
  token: string;
  caseData: Record<string, any>;
}

// One page of an event as XUI shows it: its page ID from the definition (without the event ID in front, e.g. CaseNote)
// and the answers given on it. answers can be worked out from the event's data so far, for example to pick from a
// dynamic list a mid event callback filled in. when says whether XUI shows the page, worked out from the event's data
// as it is once the pages before it have been answered (for example from flags an earlier page's callback set).
export interface EventPage {
  page: string;
  answers?: Record<string, any> | ((data: Record<string, any>) => Record<string, any>);
  when?: (data: Record<string, any>) => boolean;
}

// An event started the way XUI starts it (CCD's internal start event API): the token, the event's data as the about to
// start callback left it, the event's fields and its pages (ID, whether Continue runs a mid event callback)
interface StartedEventWithPages extends StartedEvent {
  fieldIds: string[];
  pages: Array<{ id: string; hasMidEvent: boolean; fieldIds: string[] }>;
}

// Runs CCD events through the CCD data store API as a user, the way XUI does when the event is submitted, but without
// going through the event's pages. CCD runs the event's about to submit and submitted callbacks as usual. The events
// are on a claim (CIVIL) unless another case type is given, such as a general application's.
export class CcdApiHelper {
  private tokensHelper: TokensHelper;

  constructor(private caseType: CaseType = CaseType.CIVIL) {
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
  // ignoreWarning submits it even if a callback returns warnings, as Ignore Warning and Continue does in XUI.
  async submitEvent(user, eventId: string, eventToken: string, data: Record<string, any>, caseId?: string, ignoreWarning = false): Promise<Record<string, any>> {
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
          ignore_warning: ignoreWarning,
        },
      });
      expect(response.ok(), `Submitting ${eventId} returned ${response.status()}: ${await response.text()}`).toBeTruthy();
      return await response.json();
    } finally {
      await apiRequestContext.dispose();
    }
  }

  // Goes through an event's pages the way XUI does, then submits it, for events whose pages need civil-service's mid
  // event callbacks (to fill in a list or generate a document, for example) or whose about to start callback fills in
  // what is submitted. Each page's answers are added to the event's data and, where the page has a mid event callback,
  // the page is validated as Continue does in XUI, which runs the callback and returns the event's data as it left it.
  // Only the event's own fields are submitted, as XUI does. The event is only started once the case has no business
  // process running, which civil-service requires. pages can be worked out from the event's data as the about
  // to start callback left it, where that decides which pages the user gets. Returns the case CCD saved.
  // onlyAnsweredPages submits only the fields on the pages answered, as XUI does, for events whose about to start
  // callback fills in fields on pages the user does not see, which civil-service would otherwise act on (such as the
  // other kinds of decision on a general application).
  async submitEventThroughPages(
    user,
    eventId: string,
    caseId: string,
    pages: EventPage[] | ((data: Record<string, any>) => EventPage[]),
    ignoreWarning = false,
    onlyAnsweredPages = false,
  ): Promise<Record<string, any>> {
    await new TestingEndPointHelper().waitForNoOngoingBusinessProcess(caseId);
    const started = await this.startEventWithPages(user, eventId, caseId);
    let data = { ...started.caseData };
    const answeredFieldIds = new Set<string>();
    for (const { page, answers, when } of typeof pages === 'function' ? pages(data) : pages) {
      if (when && !when(data)) {
        continue;
      }
      const pageId = `${eventId}${page}`;
      const definition = started.pages.find((p) => p.id === pageId);
      expect(definition, `${eventId} has no page ${page} (its pages are ${started.pages.map((p) => p.id.slice(eventId.length)).join(', ')})`).toBeDefined();
      definition.fieldIds.forEach((id) => answeredFieldIds.add(id));
      const pageAnswers = typeof answers === 'function' ? answers(data) : answers ?? {};
      data = { ...data, ...pageAnswers };
      if (definition.hasMidEvent) {
        data = { ...data, ...await this.validatePage(user, eventId, started.token, pageId, pageAnswers, data, caseId) };
      }
    }
    const payload = Object.fromEntries(started.fieldIds
      .filter((id) => !onlyAnsweredPages || answeredFieldIds.has(id))
      .filter((id) => data[id] !== undefined && data[id] !== null)
      .map((id) => [id, data[id]]));
    return this.submitEvent(user, eventId, started.token, payload, caseId, ignoreWarning);
  }

  // Starts the event on the case as XUI does, through CCD's internal API, which also gives the event's fields and pages
  private async startEventWithPages(user, eventId: string, caseId: string): Promise<StartedEventWithPages> {
    const { accessToken, s2sToken } = await this.tokensHelper.getNonEventTokens(user);
    const url = `${ccdDataStoreApiBaseUrl}/internal/cases/${caseId}/event-triggers/${eventId}?ignore-warning=false`;
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      const response = await apiRequestContext.get(url, {
        headers: {
          ...this.getHeaders(accessToken, s2sToken),
          Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-event-trigger.v2+json;charset=UTF-8',
          experimental: 'true',
        },
      });
      expect(response.ok(), `Starting ${eventId} returned ${response.status()}: ${await response.text()}`).toBeTruthy();
      const body = await response.json();
      const fields: Array<{ id: string; value: unknown }> = body.case_fields ?? [];
      return {
        token: body.event_token,
        caseData: Object.fromEntries(fields.map((field) => [field.id, field.value])),
        fieldIds: fields.map((field) => field.id),
        pages: (body.wizard_pages ?? []).map((page) => ({
          id: page.id,
          hasMidEvent: !!page.callback_url_mid_event,
          fieldIds: (page.wizard_page_fields ?? []).map((field) => field.case_field_id),
        })),
      };
    } finally {
      await apiRequestContext.dispose();
    }
  }

  // Validates one page of an event, as Continue does in XUI, which runs the page's mid event callback. pageData is what
  // was answered on the page and eventData everything the event holds so far. Returns the event's data as CCD and the
  // callback left it, and fails with the callback's errors if it rejects the page.
  private async validatePage(user, eventId: string, eventToken: string, pageId: string, pageData: Record<string, any>, eventData: Record<string, any>, caseId: string): Promise<Record<string, any>> {
    const { accessToken, s2sToken, uid } = await this.tokensHelper.getNonEventTokens(user);
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      const response = await apiRequestContext.post(`${this.caseTypeUrl(uid)}/validate?pageId=${pageId}`, {
        headers: this.getHeaders(accessToken, s2sToken),
        data: {
          data: pageData,
          event: { id: eventId },
          event_data: eventData,
          event_token: eventToken,
          ignore_warning: false,
          case_reference: caseId,
        },
      });
      expect(response.ok(), `Continue on ${pageId} returned ${response.status()}: ${await response.text()}`).toBeTruthy();
      return (await response.json()).data ?? {};
    } finally {
      await apiRequestContext.dispose();
    }
  }

  // CCD's case type ID, such as CIVIL (createCase.caseTypeCode is the label XUI shows, Civil)
  private caseTypeUrl(uid: string) {
    return `${ccdDataStoreApiBaseUrl}/caseworkers/${uid}/jurisdictions/${createCase.jurisdictionCode}/case-types/${this.caseType}`;
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
