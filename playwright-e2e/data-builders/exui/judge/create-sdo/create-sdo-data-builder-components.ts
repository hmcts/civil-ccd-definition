import DateHelper from '../../../../helpers/date-helper';

const formatDate = (date: Date) =>
  DateHelper.formatDateToString(date, { outputFormat: 'YYYY-MM-DD' });

const sdo = {
  SDO: {
    drawDirectionsOrderRequired: 'No',
  },
};

const claimsTrack = {
  ClaimTrack: {
    claimTrack: 'fastTrack',
    trialAdditionalDirectionsForFastTrack: [
      'fastClaimBuildingDispute',
      'fastClaimClinicalNegligence',
      'fastClaimCreditHire',
      'fastClaimEmployersLiability',
      'fastClaimHousingDisrepair',
      'fastClaimPPI',
      'fastClaimPersonalInjury',
      'fastClaimRoadTrafficAccident'
    ],
  },
};

const fastTrack = {
  FastTrack: {
    fastTrackJudgesRecital: {
      input: 'string',
    },
    fastTrackAllocation: {
      assignComplexityBand: 'Yes',
      band: 'BAND_2',
      reasons: 'reasons',
    },
    fastTrackDisclosureOfDocuments: {
      input1: 'string',
      date1: formatDate(DateHelper.subtractFromToday({ days: 1 })),
      input2: 'string',
      date2: formatDate(DateHelper.subtractFromToday({ days: 1 })),
      input3: 'string',
    },
    fastTrackWitnessOfFact: {
      input1: 'string',
      input2: '1',
      input3: '1',
      input4: 'string',
      input5: 'string',
      input6: '1',
      input7: 'string',
      input8: 'string',
      date: formatDate(DateHelper.addToToday({ days: 1 })),
      input9: 'string',
    },
    fastTrackSchedulesOfLoss: {
      input1: 'string',
      date1: formatDate(DateHelper.addToToday({ days: 1 })),
      input2: 'string',
      date2: formatDate(DateHelper.addToToday({ days: 1 })),
      input3: 'string',
    },
    fastTrackTrial: {
      input1: 'string',
      date1: formatDate(DateHelper.addToToday({ days: 1 })),
      date2: formatDate(DateHelper.addToToday({ days: 1 })),
      input2: 'string',
      input3: 'string',
      type: ['DOCUMENTS'],
    },
    fastTrackMethod: 'fastTrackMethodTelephoneHearing',
    fastTrackMethodTelephoneHearing: 'telephoneTheClaimant',
    fastTrackBuildingDispute: {
      input1: 'string',
      input2: 'string',
      input3: 'string',
      date1: formatDate(DateHelper.addToToday({ days: 1 })),
      input4: 'string',
      date2: formatDate(DateHelper.addToToday({ days: 1 })),
    },
    fastTrackClinicalNegligence: {
      input1: 'string',
      input2: 'string',
      input3: 'string',
      input4: 'string',
    },
    fastTrackCreditHire: {
      input1: 'string',
      input2: 'string',
      date1: formatDate(DateHelper.addToToday({ days: 1 })),
      input3: 'string',
      input4: 'string',
      date2: formatDate(DateHelper.addToToday({ days: 1 })),
      input5: 'string',
      input6: 'string',
      date3: formatDate(DateHelper.addToToday({ days: 1 })),
      input7: 'string',
      date4: formatDate(DateHelper.addToToday({ days: 1 })),
      input8: 'string',
    },
    fastTrackHousingDisrepair: {
      input1: 'string',
      input2: 'string',
      input3: 'string',
      date1: formatDate(DateHelper.addToToday({ days: 1 })),
      input4: 'string',
      date2: formatDate(DateHelper.addToToday({ days: 1 })),
    },
    fastTrackPersonalInjury: {
      input1: 'string',
      date1: formatDate(DateHelper.addToToday({ days: 1 })),
      input2: 'string',
      date2: formatDate(DateHelper.addToToday({ days: 1 })),
      input3: 'string',
    },
    fastTrackRoadTrafficAccident: {
      input: 'string',
      date: formatDate(DateHelper.addToToday({ days: 1 })),
    },
    fastTrackAddNewDirections: [
      {
        directionComment: 'string',
      },
      {
        directionComment: 'string',
      },
    ],
    fastTrackNotes: {
      input: 'string',
      date: formatDate(DateHelper.addToToday({ days: 1 })),
    },
    fastTrackHearingNotes: {
      input:
        "Claimant's expert will be joining via Video\nRemaining hearing participants will attend in person",
    },
  },
};

const undefine = {
  Undefine: {
    responseClaimTrack: undefined,
    smallClaimsFlightDelay: undefined,
    smallClaimsFlightDelayToggle: undefined,
    sdoR2SmallClaimsWitnessStatementOther: undefined,
    sdoR2FastTrackWitnessOfFact: undefined,
    sdoR2FastTrackCreditHire: undefined,
    sdoDJR2TrialCreditHire: undefined,
  },
};

const createSdoDataBuilderComponents = {
  sdo,
  claimsTrack,
  fastTrack,
  undefine,
};

export default createSdoDataBuilderComponents;
