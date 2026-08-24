import urls from '../../../../config/urls';
import ClaimTrack from '../../../../constants/cases/claim-track';
import HearingType from '../../../../constants/hearings/hearing-type';
import ServiceCode from '../../../../constants/hearings/service-code';
import DateHelper from '../../../../helpers/date-helper';
import CaseDataHelper from '../../../../helpers/case-data-helper';
import CCDCaseData from '../../../../models/ccd-case-data';
import partys from '../../../../constants/users/partys';
import claimantDefendantPartyTypes from '../../../../constants/users/claimant-defendant-party-types';
import { Party } from '../../../../models/users/partys';

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
    hearingType: `${ServiceCode.UNSPECIFIED}-${hearingType}`,
    hearingWindow: {},
    duration: 1800,
    hearingPriorityType: 'Standard',
    numberOfPhysicalAttendees: 10,
    hearingInWelshFlag: false,
    hearingLocations: hearingLocations(ccdCaseData),
    facilitiesRequired: ['14', '5'],
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
    categoryValue: `${ServiceCode.UNSPECIFIED}-${claimTrack}`,
  },
  {
    categoryType: 'caseSubType',
    categoryValue: `${ServiceCode.UNSPECIFIED}-${claimTrack}`,
    categoryParent: `${ServiceCode.UNSPECIFIED}-${claimTrack}`,
  },
];

const caseDetails = (ccdCaseData: CCDCaseData, claimTrack: ClaimTrack) => ({
  caseDetails: {
    hmctsServiceCode: ServiceCode.UNSPECIFIED,
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
  claimant: 'd968f061-2a72-44',
  claimantExpert1: '47888c92-ea47-43',
  claimantExpert2: 'e255bbad-3e5b-4a',
  claimantWitness1: '37e46d33-36c9-4e',
  claimantWitness2: '3c937f74-b81f-45',
  claimantLitigationFriend: '1f249c81-20f4-44',
  defendant: '6cf2fbeb-2a40-47',
  defendantExpert1: '70e0d776-51a9-4a',
  defendantExpert2: '4cbcaaa5-c584-45',
  defendantWitness1: 'c5ecf7f8-b4a0-4a',
  defendantWitness2: 'd8165fe8-7f27-4f',
  defendantLitigationFriend: '449fd6a7-14b2-47',
  defendantSolicitor: '79ZRSOU',
  claimantSolicitor: 'Q1KOKP2',
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

const litigationFriendParty = (partyID: string, party: Party) => {
  const partyData = CaseDataHelper.buildLitigationFriendData(party);

  return individualParty({
    partyID,
    partyRole: 'LIFR',
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
    expertParty(partyIds.claimantExpert2, partys.CLAIMANT_EXPERT_2),
    witnessParty(partyIds.claimantWitness1, partys.CLAIMANT_WITNESS_1),
    witnessParty(partyIds.claimantWitness2, partys.CLAIMANT_WITNESS_2),
    litigationFriendParty(partyIds.claimantLitigationFriend, partys.CLAIMANT_1_LITIGATION_FRIEND),
    claimantDefendantParty(partyIds.defendant, 'DEFE', partys.DEFENDANT_1, unavailableRanges),
    expertParty(partyIds.defendantExpert1, partys.DEFENDANT_1_EXPERT_1),
    expertParty(partyIds.defendantExpert2, partys.DEFENDANT_1_EXPERT_2),
    witnessParty(partyIds.defendantWitness1, partys.DEFENDANT_1_WITNESS_1),
    witnessParty(partyIds.defendantWitness2, partys.DEFENDANT_1_WITNESS_2),
    litigationFriendParty(partyIds.defendantLitigationFriend, partys.DEFENDANT_1_LITIGATION_FRIEND),
    organisationParty(partyIds.defendantSolicitor, 'Civil - Organisation 2'),
    organisationParty(partyIds.claimantSolicitor, 'Civil - Organisation 1'),
  ],
});

const attendee = (partyID: string, hearingSubChannel: string | null = 'INTER') => ({
  hearingSubChannel,
  partyID,
});

const attendees = [
  attendee(partyIds.claimantLitigationFriend),
  attendee(partyIds.claimantWitness1),
  attendee(partyIds.claimantWitness2),
  attendee(partyIds.defendantLitigationFriend),
  attendee(partyIds.claimantExpert1),
  attendee(partyIds.defendantWitness1),
  attendee(partyIds.defendant),
  attendee(partyIds.defendantExpert1),
  attendee(partyIds.defendantSolicitor, null),
  attendee(partyIds.claimantSolicitor, null),
  attendee(partyIds.defendantWitness2),
  attendee(partyIds.defendantExpert2),
  attendee(partyIds.claimant),
  attendee(partyIds.claimantExpert2),
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
