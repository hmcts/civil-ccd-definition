const {date, element} = require('../../api/dataHelper');

const calculatedClaimsTrackWOSum = {
  ClaimsTrack: {
    fastTrackJudgementDeductionValue: (data) => typeof data.value === 'string',
    smallClaimsJudgementDeductionValue:  (data) => typeof data.value === 'string',
    disposalHearingJudgementDeductionValue:  (data) => typeof data.value === 'string',
    smallClaimsHearing: (data) => {
      return typeof data.input1 === 'string' && typeof data.input2 === 'string';
    },
    disposalHearingDisclosureOfDocumentsToggle: (data) => Array.isArray(data),
    disposalHearingFinalDisposalHearing: (data) => {
      return typeof data.input === 'string' && data.date.match(/\d{4}-\d{2}-\d{2}/);
    },
    fastTrackBuildingDispute: (data) => {
      return typeof data.input1 === 'string'
        && typeof data.input2 === 'string'
        && typeof data.input3 === 'string'
        && typeof data.input4 === 'string';
    },
    fastTrackDisclosureOfDocuments: (data) => {
      return typeof data.input1 === 'string'
        && typeof data.input2 === 'string'
        && typeof data.input3 === 'string'
        && typeof data.input4 === 'string';
    },
    fastTrackSettlementToggle: (data) => Array.isArray(data),
    disposalHearingWitnessOfFactToggle: (data) => Array.isArray(data),
    fastTrackSchedulesOfLoss: (data) => {
      return typeof data.input1 === 'string'
        && typeof data.input2 === 'string'
        && typeof data.input3 === 'string';
    },
    disposalHearingNotes: (data) => {
      return typeof data.input === 'string';
    },
    smallClaimsMethod: (data) => typeof data === 'string',
    fastTrackWitnessOfFactToggle: (data) => Array.isArray(data),
    smallClaimsWitnessStatement: (data) => {
      return typeof data.input1 === 'string'
        && typeof data.text === 'string'
        && typeof data.input4 === 'string';
    },
    disposalHearingFinalDisposalHearingToggle: (data) => Array.isArray(data),
    fastTrackMethodInPerson: (data) => {
      return data.value.code && data.value.label && Array.isArray(data.list_items);
    },
    fastTrackDisclosureOfDocumentsToggle: (data) => Array.isArray(data),
    disposalHearingMedicalEvidenceToggle: (data) => Array.isArray(data),
    disposalHearingSchedulesOfLossToggle: (data) => Array.isArray(data),
    disposalHearingSchedulesOfLoss: (data) => {
      return typeof data.input1 === 'string'
        && typeof data.input2 === 'string'
        && typeof data.input3 === 'string'
        && typeof data.input4 === 'string';
    },
    fastTrackAltDisputeResolutionToggle: (data) => Array.isArray(data),
    fastTrackPersonalInjury: (data) => {
      return typeof data.input1 === 'string'
        && typeof data.input2 === 'string'
        && typeof data.input3 === 'string'
        && typeof data.input4 === 'string';
    },
    disposalHearingBundleToggle: (data) => Array.isArray(data),
    smallClaimsCreditHire: (data) => {
      return typeof data.input1 === 'string'
        && typeof data.input2 === 'string'
        && typeof data.input3 === 'string'
        && typeof data.input4 === 'string'
        && typeof data.input5 === 'string'
        && typeof data.input6 === 'string'
        && typeof data.input7 === 'string';
    },
    disposalHearingCostsToggle: (data) => Array.isArray(data),
    smallClaimsWitnessStatementToggle: (data) => Array.isArray(data),
    smallClaimsHearingToggle: (data) => Array.isArray(data),
    fastTrackMethodToggle: (data) => Array.isArray(data),
    disposalHearingBundle: (data) => {
      return typeof data.input === 'string';
    },
    fastTrackWitnessOfFact: (data) => {
      return typeof data.input1 === 'string'
        && typeof data.input4 === 'string'
        && typeof data.input5 === 'string'
        && typeof data.input7 === 'string'
        && typeof data.input8 === 'string'
        && typeof data.input9 === 'string';
    },
    fastTrackClinicalNegligence: (data) => {
      return typeof data.input1 === 'string'
        && typeof data.input2 === 'string'
        && typeof data.input3 === 'string'
        && typeof data.input4 === 'string';
    },
    fastTrackTrialToggle: (data) => Array.isArray(data),
    fastTrackNotes: (data) => {
      return typeof data.input === 'string';
    },
    disposalHearingMethodToggle: (data) => Array.isArray(data),
    disposalHearingMedicalEvidence: (data) => {
      return typeof data.input === 'string';
    },
    disposalHearingQuestionsToExperts: (data) => {
      return data.date.match(/\d{4}-\d{2}-\d{2}/);
    },
    fastTrackTrial: (data) => {
      return typeof data.input1 === 'string'
        && typeof data.input2 === 'string'
        && typeof data.input3 === 'string';
    },
    smallClaimsJudgesRecital: (data) => {
      return typeof data.input === 'string';
    },
    fastTrackCreditHire: (data) => {
      return typeof data.input1 === 'string'
        && typeof data.input2 === 'string'
        && typeof data.input3 === 'string'
        && typeof data.input4 === 'string'
        && typeof data.input5 === 'string'
        && typeof data.input6 === 'string'
        && typeof data.input7 === 'string'
        && typeof data.input8 === 'string';
    },
    smallClaimsMethodInPerson: (data) => {
      return data.value.code && data.value.label && Array.isArray(data.list_items);
    },
    smallClaimsNotes: (data) => {
      return typeof data.input === 'string';
    },
    fastTrackRoadTrafficAccident: (data) => {
      return typeof data.input === 'string';
    },
    disposalHearingJudgesRecital: (data) => {
      return typeof data.input === 'string';
    },
    disposalHearingMethodInPerson: (data) => {
      return data.value.code && data.value.label && Array.isArray(data.list_items);
    },
    fastTrackSchedulesOfLossToggle: (data) => Array.isArray(data),

    fastTrackMethod: (data) => typeof data === 'string',
    fastTrackJudgesRecital: (data) => {
      return typeof data.input === 'string';
    },
    fastTrackHousingDisrepair: (data) => {
      return typeof data.input1 === 'string'
        && typeof data.input2 === 'string'
        && typeof data.input3 === 'string'
        && typeof data.input4 === 'string';
    },
    disposalHearingDisclosureOfDocuments: (data) => {
      return typeof data.input1 === 'string'
        && typeof data.input2 === 'string';
    },
    smallClaimsRoadTrafficAccident:(data) => {
      return typeof data.input === 'string';
    },
    fastTrackCostsToggle: (data) => Array.isArray(data),
    smallClaimsDocumentsToggle: (data) => Array.isArray(data),
    fastTrackVariationOfDirectionsToggle: (data) => Array.isArray(data),
    disposalHearingWitnessOfFact: (data) => {
      return typeof data.input3 === 'string'
        && typeof data.input4 === 'string'
        && typeof data.input5 === 'string'
        && typeof data.input6 === 'string';
    },
    disposalHearingQuestionsToExpertsToggle: (data) => Array.isArray(data),
    smallClaimsDocuments: (data) => {
      return typeof data.input1 === 'string'
        && typeof data.input2 === 'string';
    },
    smallClaimsMethodToggle: (data) => Array.isArray(data),
    disposalHearingClaimSettlingToggle: (data) => Array.isArray(data)
  }
};

const calculatedClaimsTrackWSum = {
  ClaimsTrack: {...calculatedClaimsTrackWOSum.ClaimsTrack,
    drawDirectionsOrder: (data) => {
      return typeof data.judgementSum === 'string';
    }
  }
};

//Disposal Hearing
module.exports = {

  createSDODisposal: () => {
    const data = {
      valid: {
        SDO: {
          drawDirectionsOrderRequired: 'Yes',
          drawDirectionsOrder: {
            judgementSum: '20'
          }
        },
        ClaimsTrack: {
          drawDirectionsOrderSmallClaims: 'No'
        },
        OrderType: {
          orderType: 'DISPOSAL'
        },
        DisposalHearing: {
          disposalHearingJudgesRecital: {
            input: 'string'
          },
          disposalHearingDisclosureOfDocuments: {
            input1: 'string',
            date1: date(-1),
            input2: 'string',
            date2: date(-1)
          },
          disposalHearingWitnessOfFact: {
            input1: 'string',
            date1: date(1),
            input2: 'string',
            input3: 'string',
            date2: date(1),
            input4: 'string',
            input5: 'string',
            date3: date(1),
            input6: 'string'
          },
          disposalHearingMedicalEvidence: {
            input: 'string',
            date: date(1)
          },
          disposalHearingQuestionsToExperts: {
            date: date(1)
          },
          disposalHearingSchedulesOfLoss: {
            input1: 'string',
            date1: date(1),
            input2: 'string',
            date2: date(1),
            input3: 'string',
            date3: date(1),
            input4: 'string',
            date4: date(1)
          },
          disposalHearingFinalDisposalHearing: {
            input: 'string',
            date: date(1),
            time: 'FIFTEEN_MINUTES'
          },
          disposalHearingMethod: 'disposalHearingMethodTelephoneHearing',
          disposalHearingMethodTelephoneHearing: 'telephoneTheClaimant',
          disposalHearingBundle: {
            input: '',
            type: [
              'DOCUMENTS',
              'SUMMARY'
            ]
          },
          disposalHearingAddNewDirections: [
            element({
              directionComment: 'string1'
            }),
            element({
              directionComment: 'string2'
            })
          ],
          disposalHearingNotes: {
            input: 'string',
            date: date(1)
          }
        }
      },
      midEventData: {
        ClaimsTrack: {
          setSmallClaimsFlag: 'No',
          setFastTrackFlag: 'No'
        },
        OrderType: {
          // to trigger calculated
        },
        DisposalHearing: {
          // to trigger calculated
        }
      },
      calculated: calculatedClaimsTrackWSum
    };
    const disposalChecks = {
      fastTrackOrderWithoutJudgement: (d) => typeof d.input === 'string',
      disposalOrderWithoutHearing: (d) => typeof d.input === 'string',
      fastTrackHearingTime: (d) =>
        d.helpText1 === 'If either party considers that the time estimate is insufficient, they must inform the court within 7 days of the date of this order.'
        && d.helpText2 === 'Not more than seven nor less than three clear days before the trial, '
        + 'the claimant must file at court and serve an indexed and paginated bundle of documents which complies with the'
        + ' requirements of Rule 39.5 Civil Procedure Rules and which complies with requirements of PD32. '
        + 'The parties must endeavour to agree the contents of the bundle before it is filed. The bundle will include a case summary and a chronology.',
      disposalHearingHearingTime: (d) =>
        d.input === 'This claim will be listed for final disposal before a judge on the first available date after'
        && d.dateTo
    };
    data.calculated.OrderType = data.calculated.ClaimsTrack;
    data.calculated.DisposalHearing = {...data.calculated.ClaimsTrack,
      ...disposalChecks,
      setSmallClaimsFlag: (d) => d === data.midEventData.ClaimsTrack.setSmallClaimsFlag,
      setFastTrackFlag: (d) => d === data.midEventData.ClaimsTrack.setFastTrackFlag
    };
    data.calculated.ClaimsTrack = {...data.calculated.ClaimsTrack, ...disposalChecks};
    return data;
  },


//Small Claims WITH Sum of Damages

  createSDOSmall: () => {
    const data = {
      valid: {
        SDO: {
          drawDirectionsOrderRequired: 'Yes',
          drawDirectionsOrder: {
            judgementSum: '20'
          }
        },
        ClaimsTrack: {
          drawDirectionsOrderSmallClaims: 'Yes'
        },
        SmallClaims: {
          smallClaimsJudgesRecital: {
            input: 'string'
          },
          smallClaimsHearing: {
            input1: 'string',
            input2: 'string',
            time: 'THIRTY_MINUTES'
          },
          smallClaimsMethod: 'smallClaimsMethodTelephoneHearing',
          smallClaimsMethodTelephoneHearing: 'telephoneTheClaimant',
          smallClaimsDocuments: {
            input1: 'string',
            input2: 'string'
          },
          smallClaimsWitnessStatement: {
            input1: 'string',
            input2: '1',
            input3: '1',
            input4: 'string'
          },
          smallClaimsAddNewDirections: [
            element({
              directionComment: 'string'
            }),
            element({
              directionComment: 'string'
            })
          ],
          smallClaimsNotes: {
            input: 'string',
            date: date(1)
          }
        }
      },
      midEventData: {
        ClaimsTrack: {
          setSmallClaimsFlag: 'Yes',
          setFastTrackFlag: 'No'
        },
        SmallClaims: {
        }
      },
      calculated: calculatedClaimsTrackWSum
    };
    data.calculated.SmallClaims = {...data.calculated.ClaimsTrack,
      setSmallClaimsFlag: (d) => d === data.midEventData.ClaimsTrack.setSmallClaimsFlag,
      setFastTrackFlag: (d) => d === data.midEventData.ClaimsTrack.setFastTrackFlag
    };
    return data;
  },


  createLASDO: () => {
    const data = {
      valid: {
        SDO: {
          drawDirectionsOrderRequired: 'No',
          claimsTrack: 'smallClaimsTrack',
        },
        SmallClaims: {
          smallClaims: [

          ],
          smallClaimsJudgesRecital: {
            input: 'string'
          },
          smallClaimsHearing: {
            input1: 'string',
            input2: 'string',
            time: 'THIRTY_MINUTES'
          },
          smallClaimsMethod: 'smallClaimsMethodTelephoneHearing',
          smallClaimsMethodTelephoneHearing: 'telephoneTheClaimant',
          smallClaimsDocuments: {
            input1: 'string',
            input2: 'string'
          },
          smallClaimsWitnessStatement: {
            input1: 'string',
            input2: '1',
            input3: '1',
            input4: 'string'
          },
          smallClaimsAddNewDirections: [
            element({
              directionComment: 'string'
            }),
            element({
              directionComment: 'string'
            })
          ],
          smallClaimsNotes: {
            input: 'string',
            date: date(1)
          }
        }
      },
      midEventData: {
        ClaimsTrack: {
          setSmallClaimsFlag: 'Yes',
          setFastTrackFlag: 'No'
        },
        SmallClaims: {
        }
      },
      calculated: calculatedClaimsTrackWSum
    };
    data.calculated.SmallClaims = {...data.calculated.ClaimsTrack,
      setSmallClaimsFlag: (d) => d === data.midEventData.ClaimsTrack.setSmallClaimsFlag,
      setFastTrackFlag: (d) => d === data.midEventData.ClaimsTrack.setFastTrackFlag
    };
    return data;
  },


//Fast Track WITH Sum of damages

  createSDOFast: () => {
    const data = {
      valid: {
        SDO: {
          drawDirectionsOrderRequired: 'Yes',
          drawDirectionsOrder: {
            judgementSum: 20
          },
        },
        ClaimsTrack: {
          drawDirectionsOrderSmallClaims: 'No'
        },
        OrderType: {
          orderType: 'DECIDE_DAMAGES',
          orderTypeTrialAdditionalDirections: [
            'OrderTypeTrialAdditionalDirectionsBuildingDispute',
            'OrderTypeTrialAdditionalDirectionsClinicalNegligence',
            'OrderTypeTrialAdditionalDirectionsCreditHire',
            'OrderTypeTrialAdditionalDirectionsEmployersLiability',
            'OrderTypeTrialAdditionalDirectionsHousingDisrepair',
            'OrderTypeTrialAdditionalDirectionsPersonalInjury',
            'OrderTypeTrialAdditionalDirectionsRoadTrafficAccident',
          ]
        },
        FastTrack: {
          fastTrackJudgesRecital: {
            input: 'string'
          },
          fastTrackAllocation: {
            assignComplexityBand: 'Yes',
            band: 'BAND_2',
            reasons: 'reasons'
          },
          fastTrackDisclosureOfDocuments: {
            input1: 'string',
            date1: date(-1),
            input2: 'string',
            date2: date(-1),
            input3: 'string',
            input4: 'string',
            date3: date(-1)
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
            date: date(1),
            input9: 'string'
          },
          fastTrackSchedulesOfLoss: {
            input1: 'string',
            date1: date(1),
            input2: 'string',
            date2: date(1),
            input3: 'string'
          },
          fastTrackTrial: {
            input1: 'string',
            date1: date(1),
            date2: date(1),
            input2: 'string',
            input3: 'string',
            type: ['DOCUMENTS']
          },
          fastTrackMethod: 'fastTrackMethodTelephoneHearing',
          fastTrackMethodTelephoneHearing: 'telephoneTheClaimant',
          fastTrackBuildingDispute: {
            input1: 'string',
            input2: 'string',
            input3: 'string',
            date1: date(1),
            input4: 'string',
            date2: date(1)
          },
          fastTrackClinicalNegligence: {
            input1: 'string',
            input2: 'string',
            input3: 'string',
            input4: 'string'
          },
          fastTrackCreditHire: {
            input1: 'string',
            input2: 'string',
            date1: date(1),
            input3: 'string',
            input4: 'string',
            date2: date(1),
            input5: 'string',
            input6: 'string',
            date3: date(1),
            input7: 'string',
            date4: date(1),
            input8: 'string'
          },
          fastTrackHousingDisrepair: {
            input1: 'string',
            input2: 'string',
            input3: 'string',
            date1: date(1),
            input4: 'string',
            date2: date(1)
          },
          fastTrackPersonalInjury: {
            input1: 'string',
            date1: date(1),
            input2: 'string',
            date2: date(1),
            input3: 'string'
          },
          fastTrackRoadTrafficAccident: {
            input: 'string',
            date: date(1)
          },
          fastTrackAddNewDirections: [
            element({
              directionComment: 'string'
            }),
            element({
              directionComment: 'string'
            })
          ],
          fastTrackNotes: {
            input: 'string',
            date: date(1)
          },
          fastTrackHearingNotes: {
            input: 'Claimant\'s expert will be joining via Video\nRemaining hearing participants will attend in person'
          },
        }
      },
      midEventData: {
        ClaimsTrack: {
          setSmallClaimsFlag: 'No',
          setFastTrackFlag: 'No'
        },
        OrderType: {
          isSdoR2NewScreen: 'No',
          setSmallClaimsFlag: 'No',
          setFastTrackFlag: 'Yes'
        },
        FastTrack: {

        }
      },
      calculated: calculatedClaimsTrackWSum
    };
    data.calculated.OrderType = {...data.calculated.ClaimsTrack,
      orderTypeTrialAdditionalDirections: (d) => Array.isArray(d)
    };
    data.calculated.FastTrack = {...data.calculated.OrderType,
      setSmallClaimsFlag: (d) => d === data.midEventData.OrderType.setSmallClaimsFlag,
      setFastTrackFlag: (d) => d === data.midEventData.OrderType.setFastTrackFlag
    };
    return data;
  },

  createSDOFastInPerson: () => {
    const data = {
      valid: {
        SDO: {
          drawDirectionsOrderRequired: 'Yes',
          drawDirectionsOrder: {
            judgementSum: 20
          },
        },
        ClaimsTrack: {
          drawDirectionsOrderSmallClaims: 'No'
        },
        OrderType: {
          orderType: 'DECIDE_DAMAGES',
          orderTypeTrialAdditionalDirections: [
            'OrderTypeTrialAdditionalDirectionsBuildingDispute',
            'OrderTypeTrialAdditionalDirectionsClinicalNegligence',
            'OrderTypeTrialAdditionalDirectionsCreditHire',
            'OrderTypeTrialAdditionalDirectionsEmployersLiability',
            'OrderTypeTrialAdditionalDirectionsHousingDisrepair',
            'OrderTypeTrialAdditionalDirectionsPersonalInjury',
            'OrderTypeTrialAdditionalDirectionsRoadTrafficAccident',
          ]
        },
        FastTrack: {
          fastTrackJudgesRecital: {
            input: 'string'
          },
          fastTrackAllocation: {
            assignComplexityBand: 'Yes',
            band: 'BAND_2',
            reasons: 'reasons'
          },
          fastTrackDisclosureOfDocuments: {
            input1: 'string',
            date1: date(-1),
            input2: 'string',
            date2: date(-1),
            input3: 'string',
            input4: 'string',
            date3: date(-1)
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
            date: date(1),
            input9: 'string'
          },
          fastTrackSchedulesOfLoss: {
            input1: 'string',
            date1: date(1),
            input2: 'string',
            date2: date(1),
            input3: 'string'
          },
          fastTrackTrial: {
            input1: 'string',
            date1: date(1),
            date2: date(1),
            input2: 'string',
            input3: 'string',
            type: ['DOCUMENTS']
          },
          fastTrackMethod: 'fastTrackMethodInPerson',
          fastTrackBuildingDispute: {
            input1: 'string',
            input2: 'string',
            input3: 'string',
            date1: date(1),
            input4: 'string',
            date2: date(1)
          },
          fastTrackClinicalNegligence: {
            input1: 'string',
            input2: 'string',
            input3: 'string',
            input4: 'string'
          },
          fastTrackCreditHire: {
            input1: 'string',
            input2: 'string',
            date1: date(1),
            input3: 'string',
            input4: 'string',
            date2: date(1),
            input5: 'string',
            input6: 'string',
            date3: date(1),
            input7: 'string',
            date4: date(1),
            input8: 'string'
          },
          fastTrackHousingDisrepair: {
            input1: 'string',
            input2: 'string',
            input3: 'string',
            date1: date(1),
            input4: 'string',
            date2: date(1)
          },
          fastTrackPersonalInjury: {
            input1: 'string',
            date1: date(1),
            input2: 'string',
            date2: date(1),
            input3: 'string'
          },
          fastTrackRoadTrafficAccident: {
            input: 'string',
            date: date(1)
          },
          fastTrackAddNewDirections: [
            element({
              directionComment: 'string'
            }),
            element({
              directionComment: 'string'
            })
          ],
          fastTrackNotes: {
            input: 'string',
            date: date(1)
          },
          fastTrackHearingNotes: {
            input: 'Claimant\'s expert will be joining via Video\nRemaining hearing participants will attend in person'
          }
        }
      },
      midEventData: {
        ClaimsTrack: {
          setSmallClaimsFlag: 'No',
          setFastTrackFlag: 'No'
        },
        OrderType: {
          setSmallClaimsFlag: 'No',
          setFastTrackFlag: 'Yes'
        },
        FastTrack: {

        }
      },
      calculated: calculatedClaimsTrackWSum
    };
    data.calculated.OrderType = {...data.calculated.ClaimsTrack,
      orderTypeTrialAdditionalDirections: (d) => Array.isArray(d)
    };
    data.calculated.FastTrack = {...data.calculated.OrderType,
      setSmallClaimsFlag: (d) => d === data.midEventData.OrderType.setSmallClaimsFlag,
      setFastTrackFlag: (d) => d === data.midEventData.OrderType.setFastTrackFlag
    };
    return data;
  },

//Small Claims WITHOUT Sum of Damages

  createSDOSmallWODamageSum: () => {
    const data = {
      valid: {
        SDO: {
          drawDirectionsOrderRequired: 'No',
        },
        ClaimsTrack: {
          claimsTrack: 'smallClaimsTrack',
          smallClaims: [
            'smallClaimCreditHire',
            'smallClaimRoadTrafficAccident'
          ],
        },
        SmallClaims: {
          smallClaimsJudgesRecital: {
            input: 'string'
          },
          smallClaimsHearing: {
            input1: 'string',
            input2: 'string',
            time: 'THIRTY_MINUTES'
          },
          smallClaimsMethod: 'smallClaimsMethodTelephoneHearing',
          smallClaimsMethodTelephoneHearing: 'telephoneTheClaimant',
          smallClaimsDocuments: {
            input1: 'string',
            input2: 'string'
          },
          smallClaimsWitnessStatement: {
            input1: 'string',
            input2: '1',
            input3: '1',
            input4: 'string'
          },
          smallClaimsCreditHire: {
            input1: 'string',
            input2: 'string',
            date1: date(1),
            input3: 'string',
            input4: 'string',
            date2: date(1),
            input5: 'string',
            input6: 'string',
            date3: date(1),
            input7: 'string',
            date4: date(1),
            input11: 'string'
          },
          smallClaimsRoadTrafficAccident: {
            input: 'string'
          },
          smallClaimsAddNewDirections: [
            element({
              directionComment: 'string'
            }),
            element({
              directionComment: 'string'
            })
          ],
          smallClaimsNotes: {
            input: 'string',
            date: date(1)
          }
        }
      },
      midEventData: {
        ClaimsTrack: {
          setSmallClaimsFlag: 'Yes',
          setFastTrackFlag: 'No'
        },
        SmallClaims: {
        }
      },
      calculated: calculatedClaimsTrackWOSum
    };
    data.calculated.SmallClaims = {...data.calculated.ClaimsTrack,
      setSmallClaimsFlag: (d) => d === data.midEventData.ClaimsTrack.setSmallClaimsFlag,
      setFastTrackFlag: (d) => d === data.midEventData.ClaimsTrack.setFastTrackFlag
    };
    const disposalChecks = {
      fastTrackOrderWithoutJudgement: (d) => typeof d.input === 'string',
      disposalOrderWithoutHearing: (d) => typeof d.input === 'string',
      fastTrackHearingTime: (d) =>
        d.helpText1 === 'If either party considers that the time estimate is insufficient, they must inform the court within 7 days of the date of this order.'
        && d.helpText2 === 'Not more than seven nor less than three clear days before the trial, '
        + 'the claimant must file at court and serve an indexed and paginated bundle of documents which complies with the'
        + ' requirements of Rule 39.5 Civil Procedure Rules and which complies with requirements of PD32. '
        + 'The parties must endeavour to agree the contents of the bundle before it is filed. The bundle will include a case summary and a chronology.',
      disposalHearingHearingTime: (d) =>
        d.input === 'This claim will be listed for final disposal before a judge on the first available date after'
        && d.dateTo
    };
    data.calculated.ClaimsTrack = {
      ...data.calculated.ClaimsTrack,
      ...disposalChecks
    };
    data.calculated.SmallClaims = {
      ...data.calculated.SmallClaims,
      ...disposalChecks
    };
    return data;
  },

  //Small Claims WITHOUT Sum of Damages in person

  createSDOSmallWODamageSumInPerson: () => {
    const data = {
      valid: {
        SDO: {
          drawDirectionsOrderRequired: 'No',
        },
        ClaimsTrack: {
          claimsTrack: 'smallClaimsTrack',
          smallClaims: [
            'smallClaimCreditHire',
            'smallClaimRoadTrafficAccident'
          ],
        },
        SmallClaims: {
          smallClaimsJudgesRecital: {
            input: 'string'
          },
          smallClaimsHearing: {
            input1: 'string',
            input2: 'string',
            time: 'THIRTY_MINUTES'
          },
          smallClaimsMethod: 'smallClaimsMethodInPerson',
          smallClaimsDocuments: {
            input1: 'string',
            input2: 'string'
          },
          smallClaimsWitnessStatement: {
            input1: 'string',
            input2: '1',
            input3: '1',
            input4: 'string'
          },
          smallClaimsCreditHire: {
            input1: 'string',
            input2: 'string',
            date1: date(1),
            input3: 'string',
            input4: 'string',
            date2: date(1),
            input5: 'string',
            input6: 'string',
            date3: date(1),
            input7: 'string',
            date4: date(1),
            input11: 'string'
          },
          smallClaimsRoadTrafficAccident: {
            input: 'string'
          },
          smallClaimsAddNewDirections: [
            element({
              directionComment: 'string'
            }),
            element({
              directionComment: 'string'
            })
          ],
          smallClaimsNotes: {
            input: 'string',
            date: date(1)
          }
        }
      },
      midEventData: {
        ClaimsTrack: {
          setSmallClaimsFlag: 'Yes',
          setFastTrackFlag: 'No'
        },
        SmallClaims: {
        }
      },
      calculated: calculatedClaimsTrackWOSum
    };
    data.calculated.SmallClaims = {...data.calculated.ClaimsTrack,
      setSmallClaimsFlag: (d) => d === data.midEventData.ClaimsTrack.setSmallClaimsFlag,
      setFastTrackFlag: (d) => d === data.midEventData.ClaimsTrack.setFastTrackFlag
    };
    const disposalChecks = {
      fastTrackOrderWithoutJudgement: (d) => typeof d.input === 'string',
      disposalOrderWithoutHearing: (d) => typeof d.input === 'string',
      fastTrackHearingTime: (d) =>
        d.helpText1 === 'If either party considers that the time estimate is insufficient, they must inform the court within 7 days of the date of this order.'
        && d.helpText2 === 'Not more than seven nor less than three clear days before the trial, '
        + 'the claimant must file at court and serve an indexed and paginated bundle of documents which complies with the'
        + ' requirements of Rule 39.5 Civil Procedure Rules and which complies with requirements of PD32. '
        + 'The parties must endeavour to agree the contents of the bundle before it is filed. The bundle will include a case summary and a chronology.',
      disposalHearingHearingTime: (d) =>
        d.input === 'This claim will be listed for final disposal before a judge on the first available date after'
        && d.dateTo
    };
    data.calculated.ClaimsTrack = {
      ...data.calculated.ClaimsTrack,
      ...disposalChecks
    };
    data.calculated.SmallClaims = {
      ...data.calculated.SmallClaims,
      ...disposalChecks
    };
    return data;
  },

//Fast Track WITHOUT Sum of damages

  createSDOFastWODamageSum: () => {
    const data = {
      valid: {
        SDO: {
          drawDirectionsOrderRequired: 'Yes',
        },
        ClaimsTrack: {
          claimsTrack: 'fastTrack',
          drawDirectionsOrderSmallClaims: 'No',
          fastClaims: [
            'fastClaimBuildingDispute',
            'fastClaimClinicalNegligence',
            'fastClaimCreditHire',
            'fastClaimEmployersLiability',
            'fastClaimHousingDisrepair',
            'fastClaimPersonalInjury',
            'fastClaimRoadTrafficAccident'
          ]
        },
        OrderType: {
          orderType: 'DECIDE_DAMAGES'
        },
        FastTrack: {
          fastTrackJudgesRecital: {
            input: 'string'
          },
          fastTrackAllocation: {
            assignComplexityBand: 'Yes',
            band: 'BAND_2',
            reasons: 'reasons'
          },
          fastTrackDisclosureOfDocuments: {
            input1: 'string',
            date1: date(-1),
            input2: 'string',
            date2: date(-1),
            input3: 'string',
            input4: 'string',
            date3: date(-1)
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
            date: date(1),
            input9: 'string'
          },
          fastTrackSchedulesOfLoss: {
            input1: 'string',
            date1: date(1),
            input2: 'string',
            date2: date(1),
            input3: 'string'
          },
          fastTrackTrial: {
            input1: 'string',
            date1: date(1),
            date2: date(1),
            input2: 'string',
            input3: 'string',
            type: ['DOCUMENTS']
          },
          fastTrackMethod: 'fastTrackMethodTelephoneHearing',
          fastTrackMethodTelephoneHearing: 'telephoneTheClaimant',
          fastTrackBuildingDispute: {
            input1: 'string',
            input2: 'string',
            input3: 'string',
            date1: date(1),
            input4: 'string',
            date2: date(1)
          },
          fastTrackClinicalNegligence: {
            input1: 'string',
            input2: 'string',
            input3: 'string',
            input4: 'string'
          },
          fastTrackCreditHire: {
            input1: 'string',
            input2: 'string',
            date1: date(1),
            input3: 'string',
            input4: 'string',
            date2: date(1),
            input5: 'string',
            input6: 'string',
            date3: date(1),
            input7: 'string',
            date4: date(1),
            input8: 'string'
          },
          fastTrackHousingDisrepair: {
            input1: 'string',
            input2: 'string',
            input3: 'string',
            date1: date(1),
            input4: 'string',
            date2: date(1)
          },
          fastTrackPersonalInjury: {
            input1: 'string',
            date1: date(1),
            input2: 'string',
            date2: date(1),
            input3: 'string'
          },
          fastTrackRoadTrafficAccident: {
            input: 'string',
            date: date(1)
          },
          fastTrackAddNewDirections: [
            element({
              directionComment: 'string'
            }),
            element({
              directionComment: 'string'
            })
          ],
          fastTrackNotes: {
            input: 'string',
            date: date(1)
          }
        }
      },
      midEventData: {
        ClaimsTrack: {
          setSmallClaimsFlag: 'No',
          setFastTrackFlag: 'No'
        },
        OrderType: {
          setSmallClaimsFlag: 'No',
          setFastTrackFlag: 'Yes'
        },
        FastTrack: {

        }
      },
      calculated: calculatedClaimsTrackWOSum
    };
    data.calculated.OrderType = {...data.calculated.ClaimsTrack,
      orderTypeTrialAdditionalDirections: (d) => Array.isArray(d)
    };
    data.calculated.FastTrack = {...data.calculated.OrderType,
      setSmallClaimsFlag: (d) => d === data.midEventData.OrderType.setSmallClaimsFlag,
      setFastTrackFlag: (d) => d === data.midEventData.OrderType.setFastTrackFlag
    };
    return data;
  },

  //Fast track for spec
  //Fast Track WITHOUT Sum of damages

  createSDOFastTrackSpec: () => {

    const createSDO = {};
    createSDO.valid = {
      ...createSDO.valid,
        SDO: {
          drawDirectionsOrderRequired: 'Yes',
        },
        ClaimsTrack: {
          claimsTrack: 'fastTrack',
          drawDirectionsOrderSmallClaims: 'No',
          fastClaims: [
            'fastClaimBuildingDispute',
            'fastClaimClinicalNegligence',
            'fastClaimCreditHire',
            'fastClaimEmployersLiability',
            'fastClaimHousingDisrepair',
            'fastClaimPersonalInjury',
            'fastClaimRoadTrafficAccident'
          ]
        },
        OrderType: {
          orderType: 'DECIDE_DAMAGES'
        },
        FastTrack: {
          fastTrackJudgesRecital: {
            input: 'string'
          },
          fastTrackAllocation: {
            assignComplexityBand: 'Yes',
            band: 'BAND_2',
            reasons: 'reasons'
          },
          fastTrackDisclosureOfDocuments: {
            input1: 'string',
            date1: date(-1),
            input2: 'string',
            date2: date(-1),
            input3: 'string',
            input4: 'string',
            date3: date(-1)
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
            date: date(1),
            input9: 'string'
          },
          fastTrackSchedulesOfLoss: {
            input1: 'string',
            date1: date(1),
            input2: 'string',
            date2: date(1),
            input3: 'string'
          },
          fastTrackTrial: {
            input1: 'string',
            date1: date(1),
            date2: date(1),
            input2: 'string',
            input3: 'string',
            type: ['DOCUMENTS']
          },
          fastTrackMethod: 'fastTrackMethodTelephoneHearing',
          fastTrackMethodTelephoneHearing: 'telephoneTheClaimant',
          fastTrackBuildingDispute: {
            input1: 'string',
            input2: 'string',
            input3: 'string',
            date1: date(1),
            input4: 'string',
            date2: date(1)
          },
          fastTrackClinicalNegligence: {
            input1: 'string',
            input2: 'string',
            input3: 'string',
            input4: 'string'
          },
          fastTrackCreditHire: {
            input1: 'string',
            input2: 'string',
            date1: date(1),
            input3: 'string',
            input4: 'string',
            date2: date(1),
            input5: 'string',
            input6: 'string',
            date3: date(1),
            input7: 'string',
            date4: date(1),
            input8: 'string'
          },
          fastTrackHousingDisrepair: {
            input1: 'string',
            input2: 'string',
            input3: 'string',
            date1: date(1),
            input4: 'string',
            date2: date(1)
          },
          fastTrackPersonalInjury: {
            input1: 'string',
            date1: date(1),
            input2: 'string',
            date2: date(1),
            input3: 'string'
          },
          fastTrackRoadTrafficAccident: {
            input: 'string',
            date: date(1)
          },
          fastTrackAddNewDirections: [
            element({
              directionComment: 'string'
            }),
            element({
              directionComment: 'string'
            })
          ],
          fastTrackNotes: {
            input: 'string',
            date: date(1)
          }
        }
      };
    return createSDO;
  },

//Unsuitable for SDO

  createNotSuitableSDO: () => {
    return {
      valid: {
        NotSuitableSDO: {
          reasonNotSuitableSDO: {
            input: 'Too many problems.'
          }
        }
      }
    };
  },

  createSDOFastNIHL: () => {
    const data = {
      valid: {
        SDO: {
          drawDirectionsOrderRequired: 'No',
          drawDirectionsOrder: {
            judgementSum: 20
          },
        },
        ClaimsTrack: {
          claimsTrack: 'fastTrack',
          drawDirectionsOrderSmallClaims: 'No',
          fastClaims: [
            'fastClaimBuildingDispute',
            'fastClaimClinicalNegligence',
            'fastClaimCreditHire',
            'fastClaimEmployersLiability',
            'fastClaimHousingDisrepair',
            'fastClaimPersonalInjury',
            'fastClaimRoadTrafficAccident',
            'fastClaimNoiseInducedHearingLoss'
          ],
          setSmallClaimsFlag: 'No',
          setFastTrackFlag: 'Yes',
          isSdoR2NewScreen: 'Yes',
          sdoR2ImportantNotesTxt: 'This Order has been made without hearing. Each party has the right to apply to have this Order set aside or varied. Any such application must be received by the Court (together with the appropriate fee) by 4pm on',
          sdoR2ImportantNotesDate: date(+7),
          sdoFastTrackJudgesRecital: {
            input: 'Upon considering the statements of case and the information provided by the parties.'
          },
          sdoR2DisclosureOfDocuments: {
            standardDisclosureTxt: 'Standard disclosure shall be provided by the parties by uploading to the Digital Portal their list of documents by 4pm on',
            standardDisclosureDate: date(+28),
            inspectionTxt: 'Any request to inspect a document, or for a copy of a document, shall be made directly to the other party by 4pm on',
            inspectionDate: date(+42),
            requestsWillBeCompiledLabel: 'within 7 days of receipt.'
          },
          sdoR2WitnessesOfFact: {
            sdoStatementOfWitness: 'Each party must upload to the Digital Portal copies of the statements of all witnesses of fact on whom they intend to rely.',
            sdoWitnessDeadline: 'Witness statements shall be uploaded to the Digital Portal by 4pm on',
            sdoWitnessDeadlineDate: date(+70),
            sdoWitnessDeadlineText: 'Evidence will not be permitted at trial from a witness whose statement has not been uploaded in accordance with the Order, except with permission from the Court.',
            sdoR2RestrictWitness: {
              isRestrictWitness: 'No',
              restrictNoOfWitnessDetails: {
                partyIsCountedAsWitnessTxt: 'For this limitation, a party is counted as a witness.'
              }
            },
            sdoRestrictPages: {
              isRestrictPages: 'No',
              restrictNoOfPagesDetails: {
                witnessShouldNotMoreThanTxt: 'Each witness statement should be no more than',
                fontDetails: 'pages of A4 (including exhibits). Statements should be double spaced using a font size of 12.'
              }
            }
          },
          sdoR2ExpertEvidence: {
            sdoClaimantPermissionToRelyTxt: 'The Claimant has permission to rely upon the written expert evidence already uploaded to the Digital Portal with the particulars of claim.'
          },
          sdoR2AddendumReport: {
            sdoAddendumReportTxt: 'The Claimant may upload to the Digital Portal an addendum report from their expert ENT surgeon by 4pm on',
            sdoAddendumReportDate: date(+56)
          },
          sdoR2FurtherAudiogram: {
            sdoClaimantShallUndergoTxt: 'The Claimant shall undergo a single further audiogram at the written request of any Defendant. Such request to be made no later than 4pm on',
            sdoClaimantShallUndergoDate: date(+42),
            sdoServiceReportTxt: 'The further audiogram shall be arranged and paid for by the Defendant requesting it. The Defendant shall serve a copy of the further audiogram on the Claimant and upload to the Digital Portal by 4pm on',
            sdoServiceReportDate: date(+98)
          },
          sdoR2QuestionsClaimantExpert: {
            sdoDefendantMayAskTxt: 'The Defendant(s) may ask questions of the Claimant\'s expert which must be sent to the expert directly and uploaded to th Digital Portal by 4pm on',
            sdoDefendantMayAskDate: date(+126),
            sdoQuestionsShallBeAnsweredTxt: 'The questions shall be answered by the expert by',
            sdoQuestionsShallBeAnsweredDate: date(+147),
            sdoUploadedToDigitalPortalTxt: 'by the asking party within 7 days of receipt.',
            sdoApplicationToRelyOnFurther: {
              applicationToRelyOnFurtherDetails: {
                applicationToRelyDetailsDate: date(+161),
                applicationToRelyDetailsTxt: 'Any application by the Defendant for permission to rely on further expert medical evidence shall be made by 4pm on'
              },
              doRequireApplicationToRely: 'No'
            }
          },
          sdoR2PermissionToRelyOnExpert: {
            sdoPermissionToRelyOnExpertTxt: 'The Defendant has permission to rely on written expert evidence from a consultant ENT surgeon. Such report shall be uploaded to the Digital Portal by 4pm on',
            sdoPermissionToRelyOnExpertDate: date(+119),
            sdoJointMeetingOfExpertsTxt: 'The experts instructed by each party shall discuss their reports and shall prepare a schedule of agreement and disagreement which shall be provided to the parties by 4pm on',
            sdoJointMeetingOfExpertsDate: date(+147),
            sdoUploadedToDigitalPortalTxt: 'by the Claimant within 7 days of receipt.'
          },
          sdoR2EvidenceAcousticEngineer: {
            sdoEvidenceAcousticEngineerTxt: 'The parties have permission to rely on the jointly instructed written evidence of an expert acoustic engineer.',
            sdoInstructionOfTheExpertTxt: 'The expert shall be agreed and instructed by',
            sdoInstructionOfTheExpertDate: date(+42),
            sdoInstructionOfTheExpertTxtArea: 'If no expert has been instructed by the date the Claimant must apply to court by 4pm the following day for further directions.',
            sdoExpertReportTxt: 'The expert will report to the instructing parties by',
            sdoExpertReportDate: date(+280),
            sdoExpertReportDigitalPortalTxt: 'by the Claimant within 7 days of receipt.',
            sdoWrittenQuestionsTxt: 'Written questions may be posed by any party directly to the single jointly instructed expert by',
            sdoWrittenQuestionsDate: date(+294),
            sdoWrittenQuestionsDigitalPortalTxt: 'by the same date.',
            sdoRepliesTxt: 'send the answers to questions to the asking party by',
            sdoRepliesDate: date(+315),
            sdoRepliesDigitalPortalTxt: 'by that party within 7 days of receipt.',
            sdoServiceOfOrderTxt: 'A copy of this order must be served on the expert by the Claimant with the expert\'s instructions.'
          },
          sdoR2QuestionsToEntExpert: {
            sdoWrittenQuestionsTxt: 'The parties may put written questions of an ENT engineering expert for whom permission has been given by 4pm on',
            sdoWrittenQuestionsDate: date(+336),
            sdoWrittenQuestionsDigPortalTxt: 'and shall upload the same to the Digital Portal by the same date.\nSuch questions shall be limited to issues arising from the single jointly instructed expert engineer\'s report and any answers to questions.',
            sdoQuestionsShallBeAnsweredTxt: 'Such questions shall be answered by the ENT expert by',
            sdoQuestionsShallBeAnsweredDate: date(+350),
            sdoShallBeUploadedTxt: 'within 7 days of receipt.'
          },
          sdoR2ScheduleOfLoss: {
            isClaimForPecuniaryLoss: 'No',
            sdoR2ScheduleOfLossClaimantText: 'The Claimant must upload to the Digital Portal an up-to-date schedule of loss by 4pm on',
            sdoR2ScheduleOfLossClaimantDate: date(+364),
            sdoR2ScheduleOfLossDefendantText: 'In the event of a challenge to the updated schedule of loss, a defendant shall upload to the Digital Portal a counter-schedule by 4pm on',
            sdoR2ScheduleOfLossDefendantDate: date(+378),
            sdoR2ScheduleOfLossPecuniaryLossTxt: 'If there is a claim for future pecuniary loss and the parties have not already set out their case on periodical payments, they must do so in the respective schedule and counter-schedule.'
          },
          sdoR2UploadOfDocuments: {
            sdoUploadOfDocumentsTxt: 'Each party must upload to the Digital Portal copies of those documents on which they wish to rely at trial 21 days before the hearing.'
          },
          sdoR2Trial: {
            altHearingCourtLocationList: {
              list_items: [
                {
                  code: '000000',
                  label: 'Barnet Civil and Family Centre - St Mary\'s Court, Regents Park Road - N3 1BQ'
                },
                {
                  code: '111100',
                  label: 'Liverpool Civil and Family Court - 35, Vernon Street, City Square - L2 2BX'
                },
                {
                  code: '222200',
                  label: 'High Wycombe Law Courts - THE LAW COURTS, EASTON STREET - HP11 1LR'
                },
                {
                  code: '333300',
                  label: 'Central London County Court - THOMAS MORE BUILDING, ROYAL COURTS OF JUSTICE, STRAND, LONDON - WC2A 2LL'
                }
              ]
            },
            hearingCourtLocationList: {
              list_items: [
                {
                  code: '000000',
                  label: 'Barnet Civil and Family Centre - St Mary\'s Court, Regents Park Road - N3 1BQ'
                },
                {
                  code: 'OTHER_LOCATION',
                  label: 'Other location'
                }
              ],
            },
            physicalBundlePartyTxt: 'The Claimant shall deliver to the court a physical copy of the court generated bundle no later than 10 days before the trial.',
            sdoR2TrialFirstOpenDateAfter: {
              listFrom: date(+434)
            },
            sdoR2TrialWindow: {
              listFrom: date(+434),
              dateTo: date(+455)
            }

          }
        },
        SdoR2FastTrack: {
          sdoR2Trial: {
            altHearingCourtLocationList: {
              list_items: [
                {
                  code: '000000',
                  label: 'Barnet Civil and Family Centre - St Mary\'s Court, Regents Park Road - N3 1BQ'
                },
                {
                  code: '111100',
                  label: 'Liverpool Civil and Family Court - 35, Vernon Street, City Square - L2 2BX'
                },
                {
                  code: '222200',
                  label: 'High Wycombe Law Courts - THE LAW COURTS, EASTON STREET - HP11 1LR'
                },
                {
                  code: '333300',
                  label: 'Central London County Court - THOMAS MORE BUILDING, ROYAL COURTS OF JUSTICE, STRAND, LONDON - WC2A 2LL'
                }
              ]
            },
            hearingCourtLocationList: {
              list_items: [
                {
                  code: '000000',
                  label: 'Barnet Civil and Family Centre - St Mary\'s Court, Regents Park Road - N3 1BQ'
                },
                {
                  code: 'OTHER_LOCATION',
                  label: 'Other location'
                }
              ],
              value: {
                code: '000000',
                label: 'Barnet Civil and Family Centre - St Mary\'s Court, Regents Park Road - N3 1BQ'
              },
            },
            physicalBundlePartyTxt: 'The Claimant shall deliver to the court a physical copy of the court generated bundle no later than 10 days before the trial.',
            sdoR2TrialFirstOpenDateAfter: {
              listFrom: date(+434)
            },
            sdoR2TrialWindow: {
              listFrom: date(+434),
              dateTo: date(+455)
            }

          },
        }
      },
      midEventData: {
        ClaimsTrack: {
          setSmallClaimsFlag: 'No',
          setFastTrackFlag: 'Yes'
        },
        OrderType: {
          setSmallClaimsFlag: 'No',
          setFastTrackFlag: 'Yes'
        },
        FastTrack: {}
      },
      calculated: calculatedClaimsTrackWSum
    };
    data.calculated.OrderType = {
      ...data.calculated.ClaimsTrack,
      orderTypeTrialAdditionalDirections: (d) => Array.isArray(d)
    };
    data.calculated.FastTrack = {
      ...data.calculated.OrderType,
      setSmallClaimsFlag: (d) => d === data.midEventData.OrderType.setSmallClaimsFlag,
      setFastTrackFlag: (d) => d === data.midEventData.OrderType.setFastTrackFlag
    };
    return data;
  }
};
