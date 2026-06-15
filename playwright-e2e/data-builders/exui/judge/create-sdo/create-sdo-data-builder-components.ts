import SdoType from '../../../../constants/ccd-events/sdo/sdo-type';
import DateHelper from '../../../../helpers/date-helper';
import CaseDataHelper from '../../../../helpers/case-data-helper';
import preferredCourts from '../../../../config/preferred-courts';
import partys from '../../../../constants/users/partys';

const formatDate = (date: Date) =>
  DateHelper.formatDateToString(date, { outputFormat: 'YYYY-MM-DD' });

const sdo = (sdoType: SdoType) => {
  if(sdoType === SdoType.TRAIL || sdoType === SdoType.SMALL_TRACK_SUM)
    return {
      SDO: {
        drawDirectionsOrderRequired: 'Yes',
        drawDirectionsOrder: {
          judgementSum: '100'
        }
      }
    }
  
  return {
    SDO: {
      drawDirectionsOrderRequired: 'No',
    },
  };
};

const claimsTrack = (sdoType: SdoType) => {
  if(sdoType === SdoType.FAST_TRACK)
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
          'fastClaimRoadTrafficAccident'
        ],
      },
    };
  else if(sdoType === SdoType.TRAIL)
    return {
      ClaimsTrack: {
        drawDirectionsOrderSmallClaims: 'No',
      },
    };

  else if(sdoType === SdoType.SMALL_TRACK_SUM)
    return {
      ClaimsTrack: {
        drawDirectionsOrderSmallClaims: 'Yes',
        drawDirectionsOrderSmallClaimsAdditionalDirections: [
          'smallClaimCreditHire',
          'smallClaimFlightDelay',
          'smallClaimHousingDisrepair',
          'smallClaimPPI',
          'smallClaimRoadTrafficAccident',
        ]
      }
    }
   else if(sdoType === SdoType.SMALL_TRACK_NO_SUM)
    return {
      ClaimsTrack: {
        claimsTrack: 'smallClaimsTrack',
        smallClaims: [
          "smallClaimCreditHire",
          "smallClaimFlightDelay",
          "smallClaimHousingDisrepair",
          "smallClaimPPI",
          "smallClaimRoadTrafficAccident"
        ],
      },
    };

  return {};
}

const orderType = (sdoType: SdoType) => {
  if(sdoType === SdoType.TRAIL || sdoType === SdoType.DISPOSAL_HEARING) 
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
          'fastClaimRoadTrafficAccident'
        ],
      }
    };

  return {};
}

const fastTrack = (sdoType: SdoType) => {
  if(sdoType === SdoType.FAST_TRACK || sdoType === SdoType.TRAIL)
    return {
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
};

const smallClaims = (sdoType: SdoType) => {
  if (sdoType === SdoType.SMALL_TRACK_SUM || sdoType === SdoType.SMALL_TRACK_NO_SUM) {
    const claimantDefaultCourt = CaseDataHelper.setCodeToData(
      preferredCourts[partys.CLAIMANT_1.key].default,
    );

    return {
      SmallClaims: {
        smallClaimsCreditHire: {
          input1: 'string',
          input2: 'string',
          input3: 'string',
          input4: 'string',
          input5: 'string',
          input6: 'string',
          input7: 'string',
          input11: 'string',
          date2: formatDate(DateHelper.addToToday({ days: 1 })),
          date3: formatDate(DateHelper.addToToday({ days: 1 })),
          date4: formatDate(DateHelper.addToToday({ days: 1 })),
        },
        sdoR2SmallClaimsUseOfWelshLanguage: {
          description: 'string',
        },
        sdoR2SmallClaimsWitnessStatementOther: {
          sdoStatementOfWitness: 'string',
          isRestrictWitness: 'No',
          isRestrictPages: 'No',
          text: 'string',
          deadlineDate: formatDate(DateHelper.addToToday({ days: 1 })),
        },
        smallClaimsDocuments: {
          input1: 'string',
          input2: 'string',
          deadlineDate: formatDate(DateHelper.addToToday({ days: 1 })),
        },
        smallClaimsFlightDelay: {
          relatedClaimsInput: 'string',
          legalDocumentsInput: 'string',
        },
        smallClaimsHearing: {
          input1: 'string',
          time: 'THIRTY_MINUTES',
          input2: 'string',
          dateFrom: formatDate(DateHelper.addToToday({ days: 1 })),
        },
        smallClaimsHousingDisrepair: {
          clauseA: 'string',
          clauseB: 'string',
          firstReportDateBy: formatDate(DateHelper.addToToday({ days: 1 })),
          clauseCBeforeDate: 'string',
          jointStatementDateBy: formatDate(DateHelper.addToToday({ days: 1 })),
          clauseCAfterDate: 'string',
          clauseD: 'string',
          clauseE: 'string',
        },
        smallClaimsJudgementDeductionValue: {
          value: 'string',
        },
        smallClaimsJudgesRecital: {
          input: 'string',
        },
        smallClaimsMethod: 'smallClaimsMethodInPerson',
        smallClaimsMethodInPerson: {
          list_items: [claimantDefaultCourt],
          value: claimantDefaultCourt,
        },
        smallClaimsNotes: {
          input: 'string',
          date: formatDate(DateHelper.addToToday({ days: 1 })),
        },
        smallClaimsPPI: {
          ppiDate: formatDate(DateHelper.addToToday({ days: 1 })),
          text: 'string',
        },
        smallClaimsRoadTrafficAccident: {
          input: 'string',
        },
        smallClaimsWitnessStatement: {
          input1: 'string',
          input2: '1',
          input3: '1',
          input4: 'string',
        },
        smallClaimsAddNewDirections: [
          {
            directionComment: 'string',
          },
          {
            directionComment: 'string',
          },
        ],
      }
    };
  }

  return {};
};

const orderPreview = {
  OrderPreview: {}
}

const createSdoDataBuilderComponents = {
  sdo,
  claimsTrack,
  orderType,
  fastTrack,
  smallClaims,
  orderPreview,
};

export default createSdoDataBuilderComponents;
