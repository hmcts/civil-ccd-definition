import trackType from '../../../../enums/track.ts';
import { TestingEndPointHelper } from '../../../../helpers/TestingEndPointHelper.ts';
import { WireMockHelper, WireMockStub } from '../../../../helpers/WireMockHelper.ts';
import { workingDaysAfter } from '../../../../helpers/WorkingDayHelper.ts';

// civil-service's automated hearing notice scheduler, in place of the hearing centre admin's hearing notice. Only on a
// civil-service PR preview, where HMC is WireMock (WIREMOCK_URL): HMC is stubbed to return one LISTED trial for the
// case, the unspecified or specified scheduler is run, and it starts NOTIFY_HEARING_PARTIES for the hearing, which
// generates the hearing notice, charges the hearing fee and moves the claim to HEARING_READINESS. As playwright-e2e's
// api-tests/hearings tests do. Never on AAT: the scheduler handles every un-notified hearing HMC returns, so against the
// real HMC it would send notices on other teams' cases.
//
// WireMock is shared by everything running against the preview, and the un-notified hearings stub answers for every
// case, so a parallel run can replace it before the scheduler reads it. If no notice process starts for this hearing,
// the stubs are set again and the scheduler rerun.
const serviceCodes = { unspec: 'AAA7', spec: 'AAA6' };
const schedulerProcess = { unspec: 'UnspecAutomatedHearingNoticeScheduler', spec: 'SpecAutomatedHearingNoticeScheduler' };
// The Spring scheduler that can stand in for both Camunda ones, where civil-service's spring-scheduler-enabled toggle
// has it switched on (the Camunda ones then do nothing)
const springScheduler = 'AutomatedHearingNotice';
// Clerkenwell and Shoreditch County Court, as playwright-e2e's stubs use
const hearingVenueEpimms = '739514';
const attempts = 3;

export class AutomatedHearingNotice {
  private testingEndpointHelper = new TestingEndPointHelper();
  private wireMock = new WireMockHelper();

  static isAvailable(): boolean {
    return WireMockHelper.isAvailable();
  }

  // Lists a trial 40 working days (8 weeks) ahead, 10:00 to 11:00, as the hearing centre admin's notice does. Returns
  // the HMC hearing ID and the hearing date (YYYY-MM-DD).
  async run(caseId: string, journey: 'unspec' | 'spec', track: trackType): Promise<{ hearingId: string; hearingDate: string }> {
    const caseData = await this.testingEndpointHelper.getCaseData(caseId);
    const hearingDate = await workingDaysAfter(40);
    const hearingId = `${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const hearing = this.listedHearing(caseId, caseData, journey, track, hearingId, hearingDate);

    for (let attempt = 1; attempt <= attempts; attempt++) {
      await this.wireMock.upsertStubs(this.stubs(hearing, hearingId));
      await this.runScheduler(journey);
      const noticeVariables = `hearingId_eq_${hearingId}`;
      if (await this.testingEndpointHelper.waitForCamundaProcessCompleted({ definitionKey: 'NOTIFY_HEARING_PARTIES', variables: noticeVariables }, 90)) {
        console.log(`The ${journey} hearing notice scheduler sent the notice for HMC hearing ${hearingId} on case ${caseId} (hearing on ${hearingDate})`);
        return { hearingId, hearingDate };
      }
      console.warn(`No notice process started for HMC hearing ${hearingId} (attempt ${attempt} of ${attempts}); another run may have replaced the WireMock stubs`);
    }
    throw new Error(`The ${journey} hearing notice scheduler never started NOTIFY_HEARING_PARTIES for HMC hearing ${hearingId} on case ${caseId}`);
  }

  private async runScheduler(journey: 'unspec' | 'spec') {
    const springOn = await this.testingEndpointHelper.isFeatureEnabled('spring-scheduler-enabled').catch(() => false);
    if (springOn && (await this.testingEndpointHelper.springSchedulers()).includes(springScheduler)) {
      await this.testingEndpointHelper.runSpringScheduler(springScheduler);
      return;
    }
    const processId = await this.testingEndpointHelper.triggerCamundaProcess(schedulerProcess[journey]);
    await this.testingEndpointHelper.waitForCamundaProcessCompleted({ processInstanceId: processId });
  }

  private stubs(hearing: Record<string, unknown>, hearingId: string): WireMockStub[] {
    const json = { 'Content-Type': 'application/json' };
    return [
      { request: { method: 'GET', url: `/hearing/${hearingId}` }, response: { status: 200, headers: json, body: JSON.stringify(hearing) } },
      { request: { method: 'GET', urlPathPattern: '/unNotifiedHearings/.*' }, response: { status: 200, headers: json, body: JSON.stringify({ totalFound: 1, hearingIds: [hearingId] }) } },
      // No notice sent yet for any hearing, and HMC accepts being told the parties were notified
      { request: { method: 'GET', urlPathPattern: '/partiesNotified/.*' }, response: { status: 200, headers: json, body: JSON.stringify({ hearingID: '', responses: [] }) } },
      { request: { method: 'PUT', urlPathPattern: '/partiesNotified/.*' }, response: { status: 200, headers: json } },
    ];
  }

  // A LISTED trial (TRI, which needs a hearing fee) as HMC's GET /hearing/{id} returns it, for the claimant, defendant
  // and their solicitors' organisations
  private listedHearing(caseId: string, caseData: Record<string, any>, journey: 'unspec' | 'spec', track: trackType,
    hearingId: string, hearingDate: string): Record<string, unknown> {
    const serviceCode = serviceCodes[journey];
    const now = new Date().toISOString().slice(0, 19);
    const baseLocation = caseData.caseManagementLocation?.baseLocation;
    const party = (partyID: string, partyRole: string, firstName: string, lastName: string) => ({
      partyID,
      partyType: 'IND',
      partyRole,
      individualDetails: {
        firstName,
        lastName,
        preferredHearingChannel: 'INTER',
        reasonableAdjustments: [],
        vulnerableFlag: false,
        hearingChannelEmail: [],
        hearingChannelPhone: [],
        relatedParties: [],
      },
    });
    const organisation = (partyID: string, name: string) => ({
      partyID,
      partyType: 'ORG',
      partyRole: 'LGRP',
      organisationDetails: { name, organisationType: 'ORG', cftOrganisationID: partyID },
    });
    const parties = [
      party('claimant-1', 'CLAI', 'Claimant', 'One'),
      party('defendant-1', 'DEFE', 'Defendant', 'One'),
      organisation('Q1KOKP2', 'Civil - Organisation 1'),
      organisation('79ZRSOU', 'Civil - Organisation 2'),
    ];
    return {
      requestDetails: { status: 'LISTED', timestamp: now, versionNumber: 1, hearingRequestID: hearingId },
      hearingDetails: {
        hearingType: `${serviceCode}-TRI`,
        hearingWindow: {},
        duration: 60,
        hearingPriorityType: 'Standard',
        numberOfPhysicalAttendees: 2,
        hearingInWelshFlag: false,
        hearingLocations: [{ locationType: 'court', locationId: baseLocation }],
        privateHearingRequiredFlag: false,
        panelRequirements: { roleType: ['19'], authorisationTypes: [], authorisationSubType: [], panelPreferences: [], panelSpecialisms: [] },
        hearingIsLinkedFlag: false,
        hearingChannels: ['INTER'],
        autolistFlag: false,
      },
      caseDetails: {
        hmctsServiceCode: serviceCode,
        caseRef: caseId,
        hmctsInternalCaseName: caseData.caseNameHmctsInternal,
        publicCaseName: caseData.caseNamePublic,
        caseAdditionalSecurityFlag: false,
        caseInterpreterRequiredFlag: false,
        caseCategories: [
          { categoryType: 'caseType', categoryValue: `${serviceCode}-${track}` },
          { categoryType: 'caseSubType', categoryValue: `${serviceCode}-${track}`, categoryParent: `${serviceCode}-${track}` },
        ],
        caseManagementLocationCode: baseLocation,
        caserestrictedFlag: false,
        caseSLAStartDate: now.slice(0, 10),
      },
      partyDetails: parties,
      hearingResponse: {
        hearingDaySchedule: [{
          hearingStartDateTime: `${hearingDate}T10:00:00`,
          hearingEndDateTime: `${hearingDate}T11:00:00`,
          hearingVenueId: hearingVenueEpimms,
          hearingRoomId: null,
          hearingJudgeId: null,
          panelMemberIds: null,
          attendees: parties.map(({ partyID, partyType }) => ({ partyID, hearingSubChannel: partyType === 'IND' ? 'INTER' : null })),
          listAssistSessionID: null,
        }],
        laCaseStatus: 'LISTED',
        listingStatus: 'FIXED',
        receivedDateTime: now,
        requestVersion: 1,
      },
    };
  }
}
