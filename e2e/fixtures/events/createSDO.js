const { date, element} = require('../../api/dataHelper');

//Disposal Hearing
module.exports = {

  createSDODisposal: () => {
    const responseData = {
      userInput: {
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
            date3: date(1),
            input5: 'string',
            input6: 'string'
          },
          disposalHearingMedicalEvidence: {
            input: '',
            date: date(1)
          },
          disposalHearingQuestionsToExperts: {
            date: date(1)
          },
          disposalHearingSchedulesOfLoss: {
            input1: 'string',
            date1: date(1),
            input2: 'string',
            date2: date(1)
          },
          disposalHearingFinalDisposalHearing: {
            input: 'string',
            date: date(1),
            time: 'FIFTEEN_MINUTES'
          },
          disposalHearingMethod: 'IN_PERSON',
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
      }
    };
  }
};

//Small Claims WITH Sum of Damages
module.exports = {

  createSDOSmall: () => {
    const responseData = {
      userInput: {
        SDO: {
          drawDirectionsOrderRequired: 'Yes',
          drawDirectionsOrder: {
            judgementSum: 20
          }
        },
        ClaimsTrack: {
          drawDirectionsOrderSmallClaims: 'Yes',
          drawDirectionsOrderSmallClaimsAdditionalDirections: [
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
            time: 'THIRTY_MINUTES',
            input2: 'string'
          },
          smallClaimsDocuments: {
            input1: 'string',
            date1: date(-1),
            input2: 'string',
            date2: date(-1)
          },
          smallClaimsWitnessStatement: {
            input1: 'string',
            input2: 'string',
            input3: 'string',
            input4: 'string',
          },
          disposalHearingSchedulesOfLoss: {
            input1: 'string',
            date1: date(1),
            input2: 'string',
            date2: date(1)
          },
          disposalHearingFinalDisposalHearing: {
            input: 'string',
            date: date(1),
            time: 'FIFTEEN_MINUTES'
          },
          disposalHearingMethod: 'IN_PERSON',
          disposalHearingMethodTelephoneHearing: 'telephoneTheClaimant',
          disposalHearingBundle: {
            input: '',
            type: [
              'DOCUMENTS',
              'SUMMARY'
            ]
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
            input8: 'string',
            input9: 'string',
            date5: date(1),
            input10: 'string',
            date6: date(1),
            input11: 'string',
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
      }
    };
  }
};

//Fast Track WITH Sum of damages
module.exports = {

  createSDOFast: () => {
    const responseData = {
      userInput: {
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
          fastTrackDisclosureOfDocuments: {
            input1: 'string',
            date1: date(-1),
            input2: 'string',
            date2: date(-1),
            input3: 'string',
            input4: 'string',
            date3: 'string'
          },
          fastTrackWitnessOfFact: {
            input1: 'string',
            input2: 'string',
            input3: 'string',
            input4: 'string',
            input5: 'string',
            input6: 'string',
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
            input3: 'string',
            input4: 'string',
            date3: date(1)
          },
          fastTrackTrial: {
            input1: 'string',
            date1: date(1),
            date2: date(1),
            input2: 'string',
            input3: 'string'
          },
          fastTrackMethod: 'IN_PERSON',
          fastTrackMethodTelephoneHearing: 'telephoneTheClaimant',
          fastTrackBuildingDispute:{
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
          fastTrackAddNewDirections:[
              element({
               directionComment: 'string'
              }),
              element({
               directionComment: 'string'
              })
          ],
          fastTrackNotes:{
              input: 'string',
              date: date(1)
          }
        }
      }
    };
  }
};

//Small Claims WITHOUT Sum of Damages
module.exports = {

  createSDOSmallWODamageSum: () => {
    const responseData = {
      userInput: {
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
            time: 'string',
            input2: 'string'
          },
          smallClaimsDocuments: {
            input1: 'string',
            date1: date(-1),
            input2: 'string',
            date2: date(-1)
          },
          smallClaimsWitnessStatement: {
            input1: 'string',
            input2: 'string',
            input3: 'string',
            input4: 'string',
          },
          disposalHearingSchedulesOfLoss: {
            input1: 'string',
            date1: date(1),
            input2: 'string',
            date2: date(1)
          },
          disposalHearingFinalDisposalHearing: {
            input: 'string',
            date: date(1),
            time: 'FIFTEEN_MINUTES'
          },
          disposalHearingMethod: 'IN_PERSON',
          disposalHearingMethodTelephoneHearing: 'telephoneTheClaimant',
          disposalHearingBundle: {
            input: 'string',
            type: [
              'DOCUMENTS',
              'SUMMARY'
            ]
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
            input8: 'string',
            input9: 'string',
            date5: date(1),
            input10: 'string',
            date6: date(1),
            input11: 'string',
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
      }
    };
  }
};

//Fast Track WITHOUT Sum of damages
module.exports = {

  createSDOFastWODamageSum: () => {
    const responseData = {
      userInput: {
        SDO: {
          drawDirectionsOrderRequired: 'Yes',
        },
        ClaimsTrack: {
          claimsTrack: 'fastTrack',
          fastClaims: [
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
          fastTrackDisclosureOfDocuments: {
            input1: 'string',
            date1: date(1),
            input2: 'string',
            date2: date(1),
            input3: 'string',
            input4: 'string',
            date3: date(1)
          },
          fastTrackWitnessOfFact: {
            input1: 'string',
            input2: 'string',
            input3: 'string',
            input4: 'string',
            input5: 'string',
            input6: 'string',
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
            input3: 'string',
            input4: 'string',
            date3: date(1)
          },
          fastTrackTrial: {
            input1: 'string',
            date1: date(1),
            date2: date(1),
            input2: 'string',
            input3: 'string'
          },
          fastTrackMethod: 'IN_PERSON',
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
            date1: 'string',
            input2: 'string',
            date2: 'string',
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
      }
    };
  }
};

//Unsuitable for SDO
module.exports = {

  createNotSuitableSDO: () => {
    const responseData = {
      userInput: {
        NotSuitableSDO: {
          reasonNotSuitableSDO: 'Too many problems.',
        }
      }
    };
  }
};
