import HearingType from '../../../../constants/hearings/hearing-type';
import ServiceCode from '../../../../constants/hearings/service-code';
import DateHelper from '../../../../helpers/date-helper';
import CaseDataHelper from '../../../../helpers/case-data-helper';
import partys from '../../../../constants/users/partys';
import claimantDefendantPartyTypes from '../../../../constants/users/claimant-defendant-party-types';
import { Party } from '../../../../models/users/partys';
import urls from '../../../../config/urls';
import ClaimTrack from '../../../../constants/cases/claim-track';
import CCDCaseData from '../../../../models/ccd-case-data';
import { claimantSolicitorUser, defendantSolicitor1User } from '../../../../config/users/exui-users';

const generateHearingId = () => `${Math.floor(1000000000 + Math.random() * 9000000000)}`;

const today = () => DateHelper.getToday();

const receivedDateTime = () => today().toISOString();

const hearingDate = () => DateHelper.formatDateToString(DateHelper.addToToday({ days: 5 }), { outputFormat: 'YYYY-MM-DD' });

const unavailableRanges = [
  {
    unavailableFromDate: hearingDate(),
    unavailableToDate: hearingDate(),
    unavailabilityType: 'All Day',
  },
];

const requestDetails = (versionNumber: number) => ({
  requestDetails: {
    status: 'LISTED',
    timestamp: receivedDateTime(),
    versionNumber,
    hearingRequestID: generateHearingId(),
  },
});

const hearingLocations = (ccdCaseData: CCDCaseData) => [
  {
    locationType: 'court',
    locationId: ccdCaseData.caseManagementLocation?.baseLocation,
  },
];

const panelRequirements = {
  roleType: ['19'],
  authorisationTypes: [],
  authorisationSubType: [],
  panelPreferences: [],
  panelSpecialisms: [],
};

const hearingDetails = (hearingType: HearingType, ccdCaseData: CCDCaseData) => ({
  hearingDetails: {
    listingAutoChangeReasonCode: 'user-added-comments',
    hearingType: `${ServiceCode.SPECIFIED}-${hearingType}`,
    hearingWindow: {},
    duration: 1800,
    hearingPriorityType: 'Standard',
    numberOfPhysicalAttendees: 8,
    hearingInWelshFlag: false,
    hearingLocations: hearingLocations(ccdCaseData),
    facilitiesRequired: ['14'],
    listingComments: 'Additional instructions for the hearing',
    privateHearingRequiredFlag: false,
    panelRequirements,
    hearingIsLinkedFlag: false,
    hearingChannels: ['INTER'],
    autolistFlag: false,
  },
});

const caseCategories = (claimTrack: ClaimTrack) => [
  {
    categoryType: 'caseType',
    categoryValue: `${ServiceCode.SPECIFIED}-${claimTrack}`,
  },
  {
    categoryType: 'caseSubType',
    categoryValue: `${ServiceCode.SPECIFIED}-${claimTrack}`,
    categoryParent: `${ServiceCode.SPECIFIED}-${claimTrack}`,
  },
];

const caseDetails = (ccdCaseData: CCDCaseData, claimTrack: ClaimTrack) => ({
  caseDetails: {
    hmctsServiceCode: ServiceCode.SPECIFIED,
    caseRef: `${ccdCaseData.id}`,
    caseDeepLink: `${urls.manageCase}/${ccdCaseData.id}`,
    hmctsInternalCaseName: ccdCaseData.caseNameHmctsInternal,
    publicCaseName: ccdCaseData.caseNamePublic,
    caseAdditionalSecurityFlag: false,
    caseInterpreterRequiredFlag: false,
    caseCategories: caseCategories(claimTrack),
    caseManagementLocationCode: ccdCaseData.caseManagementLocation?.baseLocation,
    caserestrictedFlag: false,
    caseSLAStartDate: DateHelper.formatDateToString(today(), { outputFormat: 'YYYY-MM-DD' }),
  },
});

const partyIds = {
  claimant: '7be7e046-f0c8-4f',
  claimantExpert1: 'e3481ad3-86f7-47',
  claimantWitness1: 'ae9381dc-6ebb-42',
  claimantWitness2: '9c308880-3903-4e',
  defendant: '86602133-db26-44',
  defendantExpert1: '72d87d23-1840-47',
  defendantWitness1: 'a894fcb8-bbe5-4b',
  defendantWitness2: '54a2f0e5-b003-47',
  claimantSolicitor: 'Q1KOKP2',
  defendantSolicitor: '79ZRSOU',
};

const individualParty = ({
  partyID,
  partyRole,
  firstName,
  lastName,
  email,
  phone,
  unavailabilityRanges,
}: {
  partyID: string;
  partyRole: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  unavailabilityRanges?: typeof unavailableRanges;
}) => ({
  partyID,
  partyType: 'IND',
  partyRole,
  individualDetails: {
    title: null,
    firstName,
    lastName,
    preferredHearingChannel: 'INTER',
    interpreterLanguage: null,
    reasonableAdjustments: [],
    vulnerableFlag: false,
    vulnerabilityDetails: null,
    hearingChannelEmail: [email],
    hearingChannelPhone: [phone],
    relatedParties: [],
    custodyStatus: null,
    otherReasonableAdjustmentDetails: null,
  },
  ...(unavailabilityRanges ? { unavailabilityRanges } : {}),
});

const claimantDefendantParty = (
  partyID: string,
  partyRole: string,
  party: Party,
  unavailabilityRanges?: typeof unavailableRanges,
) => {
  const partyData = CaseDataHelper.buildClaimantAndDefendantData(party, claimantDefendantPartyTypes.INDIVIDUAL);

  return individualParty({
    partyID,
    partyRole,
    firstName: partyData.individualFirstName,
    lastName: partyData.individualLastName,
    email: partyData.partyEmail,
    phone: partyData.partyPhone,
    unavailabilityRanges,
  });
};

const expertParty = (partyID: string, party: Party) => {
  const partyData = CaseDataHelper.buildExpertData(party);

  return individualParty({
    partyID,
    partyRole: 'EXPR',
    firstName: partyData.firstName,
    lastName: partyData.lastName,
    email: partyData.emailAddress,
    phone: partyData.phoneNumber!,
  });
};

const witnessParty = (partyID: string, party: Party) => {
  const partyData = CaseDataHelper.buildWitnessData(party);

  return individualParty({
    partyID,
    partyRole: 'WITN',
    firstName: partyData.firstName,
    lastName: partyData.lastName,
    email: partyData.emailAddress,
    phone: partyData.phoneNumber!,
  });
};

const organisationParty = (partyID: string, name: string) => ({
  partyID,
  partyType: 'ORG',
  partyRole: 'LGRP',
  organisationDetails: {
    name,
    organisationType: 'ORG',
    cftOrganisationID: partyID,
  },
});

const partyDetails = () => ({
  partyDetails: [
    claimantDefendantParty(partyIds.claimant, 'CLAI', partys.CLAIMANT_1, unavailableRanges),
    expertParty(partyIds.claimantExpert1, partys.CLAIMANT_EXPERT_1),
    witnessParty(partyIds.claimantWitness1, partys.CLAIMANT_WITNESS_1),
    witnessParty(partyIds.claimantWitness2, partys.CLAIMANT_WITNESS_2),
    claimantDefendantParty(partyIds.defendant, 'DEFE', partys.DEFENDANT_1, unavailableRanges),
    expertParty(partyIds.defendantExpert1, partys.DEFENDANT_1_EXPERT_1),
    witnessParty(partyIds.defendantWitness1, partys.DEFENDANT_1_WITNESS_1),
    witnessParty(partyIds.defendantWitness2, partys.DEFENDANT_1_WITNESS_2),
    organisationParty(claimantSolicitorUser.orgId!, 'Civil - Organisation 1'),
    organisationParty(defendantSolicitor1User.orgId!, 'Civil - Organisation 2'),
  ],
});

const attendee = (partyID: string, hearingSubChannel: string | null = 'INTER') => ({
  hearingSubChannel,
  partyID,
});

const attendees = [
  attendee(partyIds.defendantWitness2),
  attendee(partyIds.defendantExpert1),
  attendee(partyIds.claimantSolicitor, null),
  attendee(partyIds.claimant),
  attendee(partyIds.defendant),
  attendee(partyIds.claimantWitness2),
  attendee(partyIds.defendantSolicitor, null),
  attendee(partyIds.defendantWitness1),
  attendee(partyIds.claimantWitness1),
  attendee(partyIds.claimantExpert1),
];

const hearingDaySchedule = (hearingStart: Date, hearingEnd: Date) => ({
  hearingStartDateTime: hearingStart.toISOString(),
  hearingEndDateTime: hearingEnd.toISOString(),
  hearingVenueId: '739514',
  hearingRoomId: 'Clerkenwell and Shoreditch Brentford Cases',
  hearingJudgeId: null,
  panelMemberIds: null,
  attendees,
  listAssistSessionID: null,
});

const hearingResponse = (versionNumber: number) => {
  const hearingStart = DateHelper.addToToday({ days: 5 });
  hearingStart.setUTCHours(9, 0, 0, 0);

  const hearingEnd = DateHelper.addToToday({ days: 5 });
  hearingEnd.setUTCHours(16, 0, 0, 0);

  return {
    hearingResponse: {
      hearingDaySchedule: [hearingDaySchedule(hearingStart, hearingEnd)],
      laCaseStatus: 'LISTED',
      listingStatus: 'FIXED',
      receivedDateTime: receivedDateTime(),
      requestVersion: versionNumber,
    },
  };
};

export default {
  caseDetails,
  hearingDetails,
  hearingResponse,
  partyDetails,
  requestDetails,
};
