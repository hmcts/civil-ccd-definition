import SdoType from '../../../../constants/ccd-events/sdo/sdo-type';
import DateHelper from '../../../../helpers/date-helper';
import CaseDataHelper from '../../../../helpers/case-data-helper';
import preferredCourts from '../../../../config/preferred-courts';
import partys from '../../../../constants/users/partys';

const formatDate = (date: Date) =>
  DateHelper.formatDateToString(date, { outputFormat: 'YYYY-MM-DD' });

const sdo = (sdoType: SdoType) => {
  if (sdoType === SdoType.TRAIL || sdoType === SdoType.SMALL_TRACK_SUM)
    return {
      SDO: {
        drawDirectionsOrderRequired: 'Yes',
        drawDirectionsOrder: {
          judgementSum: '100',
        },
      },
    };

  return {
    SDO: {
      drawDirectionsOrderRequired: 'No',
    },
  };
};

const claimsTrack = (sdoType: SdoType) => {
  if (sdoType === SdoType.FAST_TRACK)
    return {
      ClaimsTrack: {
        claimsTrack: 'fastTrack',
        trialAdditionalDirectionsForFastTrack: [
          'fastClaimBuildingDispute',
          'fastClaimClinicalNegligence',
          'fastClaimCreditHire',
          'fastClaimEmployersLiability',
          'fastClaimHousingDisrepair',
          'fastClaimPPI',
          'fastClaimPersonalInjury',
          'fastClaimRoadTrafficAccident',
        ],
      },
    };
  else if (sdoType === SdoType.TRAIL)
    return {
      ClaimsTrack: {
        drawDirectionsOrderSmallClaims: 'No',
      },
    };
  else if (sdoType === SdoType.SMALL_TRACK_SUM)
    return {
      ClaimsTrack: {
        drawDirectionsOrderSmallClaims: 'Yes',
        drawDirectionsOrderSmallClaimsAdditionalDirections: [
          'smallClaimCreditHire',
          'smallClaimFlightDelay',
          'smallClaimHousingDisrepair',
          'smallClaimPPI',
          'smallClaimRoadTrafficAccident',
        ],
      },
    };
  else if (sdoType === SdoType.SMALL_TRACK_NO_SUM)
    return {
      ClaimsTrack: {
        claimsTrack: 'smallClaimsTrack',
        smallClaims: [
          'smallClaimCreditHire',
          'smallClaimFlightDelay',
          'smallClaimHousingDisrepair',
          'smallClaimPPI',
          'smallClaimRoadTrafficAccident',
        ],
      },
    };

  return {};
};

const orderType = (sdoType: SdoType) => {
  if (sdoType === SdoType.TRAIL || sdoType === SdoType.DISPOSAL_HEARING)
    return {
      OrderType: {
        orderType: sdoType,
        trialAdditionalDirectionsForFastTrack: [
          'fastClaimBuildingDispute',
          'fastClaimClinicalNegligence',
          'fastClaimCreditHire',
          'fastClaimEmployersLiability',
          'fastClaimHousingDisrepair',
          'fastClaimPPI',
          'fastClaimPersonalInjury',
          'fastClaimRoadTrafficAccident',
        ],
      },
    };

  return {};
};

const fastTrack = (sdoType: SdoType) => {
  const claimantDefaultCourt = CaseDataHelper.setCodeToData(
    preferredCourts[partys.CLAIMANT_1.key].default,
  );
  const hearingMethodInPerson = CaseDataHelper.setCodeToData('In Person');

  if (sdoType === SdoType.FAST_TRACK || sdoType === SdoType.TRAIL)
    return {
      FastTrack: {
        isSdoR2NewScreen: 'No',
        setFastTrackFlag: 'Yes',
        hearingMethodValuesFastTrack: {
          list_items: [hearingMethodInPerson],
          value: hearingMethodInPerson,
        },
        fastTrackMethodInPerson: {
          list_items: [claimantDefaultCourt],
          value: claimantDefaultCourt,
        },
        fastTrackJudgesRecital: {
          input: 'string',
        },
        fastTrackAllocation: {
          assignComplexityBand: 'Yes',
          band: 'BAND_1',
          reasons: 'string',
        },
        fastTrackDisclosureOfDocuments: {
          input1: 'string',
          date1: formatDate(DateHelper.addToToday({ days: 14 })),
          input2: 'string',
          date2: formatDate(DateHelper.addToToday({ days: 21 })),
          input3: 'string',
        },
        sdoR2FastTrackWitnessOfFact: {
          sdoStatementOfWitness: 'string',
          sdoWitnessDeadline: 'string',
          sdoWitnessDeadlineDate: formatDate(DateHelper.addToToday({ days: 35 })),
          sdoWitnessDeadlineText: 'string',
          sdoR2RestrictWitness: {
            isRestrictWitness: 'No',
          },
          sdoRestrictPages: {
            isRestrictPages: 'No',
          },
        },
        fastTrackSchedulesOfLoss: {
          input1: 'string',
          date1: formatDate(DateHelper.addToToday({ days: 84 })),
          input2: 'string',
          date2: formatDate(DateHelper.addToToday({ days: 98 })),
          input3: 'string',
        },
        fastTrackHearingTime: {
          dateFrom: formatDate(DateHelper.addToToday({ days: 140 })),
          dateTo: formatDate(DateHelper.addToToday({ days: 203 })),
          hearingDuration: 'ONE_HOUR',
          helpText1: 'string',
        },
        fastTrackBuildingDispute: {
          input1: 'string',
          input2: 'string',
          input3: 'string',
          date1: formatDate(DateHelper.addToToday({ days: 70 })),
          input4: 'string',
          date2: formatDate(DateHelper.addToToday({ days: 84 })),
        },
        fastTrackClinicalNegligence: {
          input1: 'string',
          input2: 'string',
          input3: 'string',
          input4: 'string',
        },
        sdoR2FastTrackCreditHire: {
          input1: 'string',
          input5: 'string',
          input6: 'string',
          date3: formatDate(DateHelper.addToToday({ days: 56 })),
          input7: 'string',
          date4: formatDate(DateHelper.addToToday({ days: 70 })),
          input8: 'string',
          sdoR2FastTrackCreditHireDetails: {
            input2: 'string',
            input3: 'string',
            input4: 'string',
            date2: formatDate(DateHelper.addToToday({ days: 42 })),
          },
        },
        fastTrackHousingDisrepair: {
          clauseA: 'string',
          clauseB: 'string',
          firstReportDateBy: formatDate(DateHelper.addToToday({ days: 28 })),
          clauseCBeforeDate: 'string',
          jointStatementDateBy: formatDate(DateHelper.addToToday({ days: 56 })),
          clauseCAfterDate: 'string',
          clauseD: 'string',
          clauseE: 'string',
        },
        fastTrackPersonalInjury: {
          input1: 'string',
          input2: 'string',
          date2: formatDate(DateHelper.addToToday({ days: 49 })),
          input3: 'string',
          date3: formatDate(DateHelper.addToToday({ days: 63 })),
          input4: 'string',
          date4: formatDate(DateHelper.addToToday({ days: 70 })),
          date1: formatDate(DateHelper.addToToday({ days: 1 })),
        },
        fastTrackRoadTrafficAccident: {
          input: 'string',
          date: formatDate(DateHelper.addToToday({ days: 56 })),
        },
        fastTrackPPI: {
          ppiDate: formatDate(DateHelper.addToToday({ days: 28 })),
          text: 'string',
        },
        fastTrackAddNewDirections: [
          CaseDataHelper.setIdToData({
            directionComment: 'string',
          }),
        ],
        fastTrackHearingNotes: {
          input: 'string',
        },
        sdoR2FastTrackUseOfWelshLanguage: 'string',
        fastTrackOrderWithoutJudgement: {
          input: 'string',
        },
      },
    };
};

const smallClaims = (sdoType: SdoType) => {
  const claimantDefaultCourt = CaseDataHelper.setCodeToData(
    preferredCourts[partys.CLAIMANT_1.key].default,
  );
  const hearingMethodInPerson = CaseDataHelper.setCodeToData('In Person');

  if (sdoType === SdoType.SMALL_TRACK_SUM || sdoType === SdoType.SMALL_TRACK_NO_SUM) {
    return {
      SmallClaims: {
        smallClaimsPenalNotice:
          'string',
        smallClaimsJudgesRecital: {
          input: 'string',
        },
        smallClaimsJudgementDeductionValue: {
          value: '100.0%',
        },
        smallClaimsFlightDelay: {
          relatedClaimsInput: 'string',
          legalDocumentsInput: 'string',
        },
        smallClaimsHearing: {
          dateFrom: formatDate(DateHelper.addToToday({ days: 42 })),
          time: 'THIRTY_MINUTES',
          input2: 'string',
          input1: 'string',
        },
        hearingMethodValuesSmallClaims: {
          list_items: [hearingMethodInPerson],
          value: hearingMethodInPerson,
        },
        smallClaimsMethodInPerson: {
          list_items: [claimantDefaultCourt],
          value: claimantDefaultCourt,
        },
        sdoHearingNotes: {
          input: 'string',
        },
        sdoR2SmallClaimsUseOfWelshLanguage: {
          description: 'string',
        },
        smallClaimsNotes: {
          input: 'string',
          date: formatDate(DateHelper.addToToday({ days: 7 })),
        },
        smallClaimsDocuments: {
          input1: 'string',
          deadlineDate: formatDate(DateHelper.addToToday({ days: 28 })),
          input2: 'string',
        },
        sdoR2SmallClaimsWitnessStatementOther: {
          sdoStatementOfWitness: 'string',
          deadlineDate: formatDate(DateHelper.addToToday({ days: 28 })),
          isRestrictWitness: 'No',
          isRestrictPages: 'No',
          text: 'string',
        },
        smallClaimsCreditHire: {
          input1: 'string',
          input2: 'string',
          input3: 'string',
          input4: 'string',
          date2: formatDate(DateHelper.addToToday({ days: 42 })),
          input5: 'string',
          input6: 'string',
          date3: formatDate(DateHelper.addToToday({ days: 56 })),
          input7: 'string',
          date4: formatDate(DateHelper.addToToday({ days: 70 })),
          input11: 'string',
          date1: formatDate(DateHelper.addToToday({ days: 1 })),
        },
        smallClaimsRoadTrafficAccident: {
          input: 'string',
        },
        smallClaimsPPI: {
          ppiDate: formatDate(DateHelper.addToToday({ days: 28 })),
          text: 'string',
        },
        smallClaimsHousingDisrepair: {
          clauseA: 'string',
          clauseB: 'string',
          firstReportDateBy: formatDate(DateHelper.addToToday({ days: 28 })),
          clauseCBeforeDate: 'string',
          jointStatementDateBy: formatDate(DateHelper.addToToday({ days: 56 })),
          clauseCAfterDate: 'string',
          clauseD: 'string',
          clauseE: 'string',
        },
        smallClaimsAddNewDirections: [
          CaseDataHelper.setIdToData({
            directionComment: 'string',
          }),
        ],
      },
    };
  }

  return {};
};

const orderPreview = {
  OrderPreview: {},
};

const createSdoDataBuilderComponents = {
  sdo,
  claimsTrack,
  orderType,
  fastTrack,
  smallClaims,
  orderPreview,
};

export default createSdoDataBuilderComponents;
