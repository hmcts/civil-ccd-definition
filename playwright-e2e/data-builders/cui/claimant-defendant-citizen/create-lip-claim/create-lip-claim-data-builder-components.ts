import CaseDataHelper from '../../../../helpers/case-data-helper';
import ClaimTrack from '../../../../constants/cases/claim-track';
import partys from '../../../../constants/users/partys';
import { ClaimFee } from '../../../../models/ccd-case-data';
import { ClaimantDefendantPartyType } from '../../../../models/users/claimant-defendant-party-types';
import User from '../../../../models/users/user';
import DateHelper from '../../../../helpers/date-helper';

const formatDate = (date: Date) =>
  DateHelper.formatDateToString(date, { outputFormat: 'YYYY-MM-DD' });

const claimant1 = (claimantPartyType: ClaimantDefendantPartyType, claimantCitizenUser: User) => {
  const applicant1Data = CaseDataHelper.buildClaimantAndDefendantData(
    partys.CLAIMANT_1,
    claimantPartyType,
  );

  return {
    applicant1: {
      ...applicant1Data,
      partyEmail: claimantCitizenUser.email,
      partyName: undefined,
    },
    applicant1Represented: 'No',
  };
};

const defendant1 = (defendantPartyType: ClaimantDefendantPartyType, defendantCitizenUser: User) => {
  const respondent1Data = CaseDataHelper.buildClaimantAndDefendantData(
    partys.DEFENDANT_1,
    defendantPartyType,
  );

  return {
    respondent1: {
      ...respondent1Data,
      partyEmail: defendantCitizenUser.email,
      partyName: undefined
    },
    specRespondent1Represented: 'No',
  };
};

const claimAmount = (claimTrack: ClaimTrack) => {
  const totalClaimAmount = CaseDataHelper.getClaimValue(claimTrack);

  return {
    totalClaimAmount,
    claimAmountBreakup: [
      {
        id: '0',
        value: {
          claimAmount: JSON.stringify(totalClaimAmount * 100),
          claimReason: 'Reason for claim',
        },
      },
    ],
  };
};

const claimDetails = {
  detailsOfClaim: 'Details of claim',
};

const claimInterest = {
  claimInterest: 'No',
};

const claimantUserDetails = (claimantCitizenUser: User) => ({
  claimantUserDetails: {
    email: claimantCitizenUser.email,
    id: claimantCitizenUser.userId,
  },
});

const helpWithFees = {
  helpWithFees: {
    helpWithFee: 'No',
  },
};

const pcq = {
  pcqId: CaseDataHelper.getUuid(),
};

const claimant1AdditionalLipPartyDetails = (claimantPartyType: ClaimantDefendantPartyType) => {
  const { primaryAddress } = CaseDataHelper.buildClaimantAndDefendantData(
    partys.CLAIMANT_1,
    claimantPartyType,
  );

  return {
    applicant1AdditionalLipPartyDetails: {
      correspondenceAddress: primaryAddress,
    },
  };
};

const timelineOfEvents = {
  timelineOfEvents: [
    {
      id: '0',
      value: {
        timelineDate: formatDate(DateHelper.subtractFromToday({ years: 1 })),
        timelineDescription: 'Description of timeline event 1',
      },
    },
  ],
};

const flightDelay = {
  isFlightDelayClaim: 'No',
};

const claimFee = (fee: ClaimFee) => ({
  claimFee: fee,
});

const createClaimData = {
  claimant1,
  defendant1,
  claimAmount,
  claimDetails,
  claimInterest,
  claimantUserDetails,
  helpWithFees,
  pcq,
  claimant1AdditionalLipPartyDetails,
  timelineOfEvents,
  flightDelay,
  claimFee,
};

export default createClaimData;
