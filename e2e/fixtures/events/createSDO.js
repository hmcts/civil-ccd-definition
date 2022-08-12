//Disposal Hearing
module.exports = {

  createSDODisposal: () => {
    userInput = {
      SDO:{
        drawDirectionsOrderRequired: "Yes",
        drawDirectionsOrder: {
          judgementSum: 20
        },
      },
      ClaimsTrack = {
        drawDirectionsOrderSmallClaims: "No"
      },
      OrderType: {
        orderType: "DISPOSAL"
      },
      DisposalHearing: {
        disposalHearingJudgesRecital: {
         input: ""
        },
        disposalHearingDisclosureOfDocuments: {
         input1: "",
         date1: date(-1),
         input2: "",
         date2: date(-1)
        },
        disposalHearingWitnessOfFact: {
         input1: "",
         date1: date(1),
         input2: "",
         input3: "",
         date2: date(1),
         input4: "",
         date3: date(1),
         input5: "",
         input6: ""
        },
        disposalHearingMedicalEvidence: {
         input: "",
         date: date(1)
        },
        disposalHearingQuestionsToExperts: {
         date: date(1)
        },
        disposalHearingSchedulesOfLoss: {
         input1: "",
         date1: date(1),
         input2: "",
         date2: date(1)
        },
        disposalHearingFinalDisposalHearing: {
         input: "",
         date: date(1),
         time: "FIFTEEN_MINUTES"
        },
        disposalHearingMethod: "IN_PERSON",
        disposalHearingMethodTelephoneHearing: "telephoneTheClaimant",
        disposalHearingBundle: {
         input: "",
         type: [
          "DOCUMENTS",
          "SUMMARY"
         ]
        },
        disposalHearingAddNewDirections:[
         element({
          directionComment: ""
         }),
         element({
          directionComment: ""
         })
        ],
        disposalHearingNotes:{
         input: "",
         date: date(1)
        }
      }
    }
  }
}

//Small Claims WITH Sum of Damages
module.exports = {

  createSDOSmall: () => {
    userInput = {
      SDO: {
        drawDirectionsOrderRequired: "Yes",
        drawDirectionsOrder: {
          judgementSum: 20
        }
      },
      ClaimsTrack: {
        drawDirectionsOrderSmallClaims: "Yes",
        drawDirectionsOrderSmallClaimsAdditionalDirections: [
         "smallClaimCreditHire",
         "smallClaimRoadTrafficAccident"
        ],
       },
      SmallClaims: {
        smallClaimsJudgesRecital: {
          input: ""
        },
        smallClaimsHearing: {
          input1: "",
          time: "",
          input2: ""
        }
        smallClaimsDocuments: {
          input1: "",
          date1: date(-1),
          input2: "",
          date2: date(-1)
        },
        smallClaimsWitnessStatement: {
          input1: "",
          input2: "",
          input3: "",
          input4: "",
        },
        disposalHearingSchedulesOfLoss: {
          input1: "",
          date1: date(1),
          input2: "",
          date2: date(1)
        },
        disposalHearingFinalDisposalHearing: {
          input: "",
          date: date(1),
          time: "FIFTEEN_MINUTES"
        },
        disposalHearingMethod: "IN_PERSON",
        disposalHearingMethodTelephoneHearing: "telephoneTheClaimant",
        disposalHearingBundle: {
          input: "",
          type: [
            "DOCUMENTS",
            "SUMMARY"
          ]
        },
        smallClaimsCreditHire: {
          input1: "",
          input2: "",
          date1: date(1),
          input3: "",
          input4: "",
          date2: date(1),
          input5: "",
          input6: "",
          date3: date(1),
          input7: "",
          date4: date(1),
          input8: "",
          input9: "",
          date5: date(1),
          input10: "",
          date6: date(1),
          input11: "",
        },
        smallClaimsRoadTrafficAccident: {
          input: ""
        },
        smallClaimsAddNewDirections:[
          element({
            directionComment: ""
          }),
          element({
            directionComment: ""
          })
        ],
        smallClaimsNotes:{
          input: "",
          date: date(1)
        }
      }
    }
  }
}

//Fast Track WITH Sum of damages
module.exports = {

  createSDOFast: () => {
    userInput = {
      SDO: {
        drawDirectionsOrderRequired: "Yes",
          drawDirectionsOrder: {
          judgementSum: 20
        },
      },
      ClaimsTrack: {
        drawDirectionsOrderSmallClaims: "No"
      },
      OrderType: {
        orderType: "DECIDE_DAMAGES",
        orderTypeTrialAdditionalDirections: [
          "OrderTypeTrialAdditionalDirectionsBuildingDispute",
          "OrderTypeTrialAdditionalDirectionsClinicalNegligence",
          "OrderTypeTrialAdditionalDirectionsCreditHire",
          "OrderTypeTrialAdditionalDirectionsEmployersLiability",
          "OrderTypeTrialAdditionalDirectionsHousingDisrepair",
          "OrderTypeTrialAdditionalDirectionsPersonalInjury",
          "OrderTypeTrialAdditionalDirectionsRoadTrafficAccident",
        ]
      },
      FastTrack: {
        fastTrackJudgesRecital: {
          input: ""
        },
        fastTrackDisclosureOfDocuments: {
          input1: "",
          date1: date(-1),
          input2: "",
          date2: date(-1),
          input3: "",
          input4: "",
          date3: ""
        },
        fastTrackWitnessOfFact: {
          input1: "",
          input2: "",
          input3: "",
          input4: "",
          input5: "",
          input6: "",
          input7: "",
          input8: "",
          date: date(1),
          input9: ""
        },
        fastTrackSchedulesOfLoss: {
          input1: "",
          date1: date(1),
          input2: "",
          date2: date(1),
          input3: "",
          input4: "",
          date3: date(1)
        },
        fastTrackTrial: {
          input1: "",
          date1: date(1),
          date2: date(1),
          input2: "",
          input3: ""
        },
        fastTrackMethod: "IN_PERSON",
        fastTrackMethodTelephoneHearing: "telephoneTheClaimant",
        fastTrackBuildingDispute:{
          input1: "",
          input2: "",
          input3: "",
          date1: date(1),
          input4: "",
          date2: date(1)
        },
        fastTrackClinicalNegligence: {
          input1: "",
          input2: "",
          input3: "",
          input4: ""
        },
        fastTrackCreditHire: {
          input1: "",
          input2: "",
          date1: date(1),
          input3: "",
          input4: "",
          date2: date(1),
          input5: "",
          input6: "",
          date3: date(1),
          input7: ""
          date4: date(1),
          input8: ""
        },
        fastTrackHousingDisrepair: {
           input1: "",
           input2: "",
           input3: "",
           date1: date(1),
           input4: "",
           date2: date(1)
        },
        fastTrackPersonalInjury: {
            input1: "",
            date1: "",
            input2: "",
            date2: "",
            input3: ""
        },
        fastTrackRoadTrafficAccident: {
            input: "",
            date: date(1)
        },
        fastTrackAddNewDirections:[
            element({
             directionComment: ""
            }),
            element({
             directionComment: ""
            })
        ],
        fastTrackNotes:{
            input: "",
            date: date(1)
        }
      }
    }
  }
}

//Small Claims WITHOUT Sum of Damages
module.exports = {

  createSDOSmallWODamageSum: () => {
    userInput = {
      SDO: {
        drawDirectionsOrderRequired: "No",
      },
      ClaimsTrack: {
        claimsTrack: "smallClaimsTrack",
        smallClaims: [
         "smallClaimCreditHire",
         "smallClaimRoadTrafficAccident"
        ],
       },
      SmallClaims: {
        smallClaimsJudgesRecital: {
          input: ""
        },
        smallClaimsHearing: {
          input1: "",
          time: "",
          input2: ""
        }
        smallClaimsDocuments: {
          input1: "",
          date1: date(-1),
          input2: "",
          date2: date(-1)
        },
        smallClaimsWitnessStatement: {
          input1: "",
          input2: "",
          input3: "",
          input4: "",
        },
        disposalHearingSchedulesOfLoss: {
          input1: "",
          date1: date(1),
          input2: "",
          date2: date(1)
        },
        disposalHearingFinalDisposalHearing: {
          input: "",
          date: date(1),
          time: "FIFTEEN_MINUTES"
        },
        disposalHearingMethod: "IN_PERSON",
        disposalHearingMethodTelephoneHearing: "telephoneTheClaimant",
        disposalHearingBundle: {
          input: "",
          type: [
            "DOCUMENTS",
            "SUMMARY"
          ]
        },
        smallClaimsCreditHire: {
          input1: "",
          input2: "",
          date1: date(1),
          input3: "",
          input4: "",
          date2: date(1),
          input5: "",
          input6: "",
          date3: date(1),
          input7: "",
          date4: date(1),
          input8: "",
          input9: "",
          date5: date(1),
          input10: "",
          date6: date(1),
          input11: "",
        },
        smallClaimsRoadTrafficAccident: {
          input: ""
        },
        smallClaimsAddNewDirections:[
          element({
            directionComment: ""
          }),
          element({
            directionComment: ""
          })
        ],
        smallClaimsNotes:{
          input: "",
          date: date(1)
        }
      }
    }
  }
}

//Fast Track WITHOUT Sum of damages
module.exports = {

  createSDOFastWODamageSum: () => {
    userInput = {
      SDO: {
        drawDirectionsOrderRequired: "Yes",
      },
      ClaimsTrack: {
        claimsTrack: "fastTrack",
        fastClaims: [
                  "OrderTypeTrialAdditionalDirectionsBuildingDispute",
                  "OrderTypeTrialAdditionalDirectionsClinicalNegligence",
                  "OrderTypeTrialAdditionalDirectionsCreditHire",
                  "OrderTypeTrialAdditionalDirectionsEmployersLiability",
                  "OrderTypeTrialAdditionalDirectionsHousingDisrepair",
                  "OrderTypeTrialAdditionalDirectionsPersonalInjury",
                  "OrderTypeTrialAdditionalDirectionsRoadTrafficAccident",
                ]
      },
      FastTrack: {
        fastTrackJudgesRecital: {
          input: ""
        },
        fastTrackDisclosureOfDocuments: {
          input1: "",
          date1: date(-1),
          input2: "",
          date2: date(-1),
          input3: "",
          input4: "",
          date3: ""
        },
        fastTrackWitnessOfFact: {
          input1: "",
          input2: "",
          input3: "",
          input4: "",
          input5: "",
          input6: "",
          input7: "",
          input8: "",
          date: date(1),
          input9: ""
        },
        fastTrackSchedulesOfLoss: {
          input1: "",
          date1: date(1),
          input2: "",
          date2: date(1),
          input3: "",
          input4: "",
          date3: date(1)
        },
        fastTrackTrial: {
          input1: "",
          date1: date(1),
          date2: date(1),
          input2: "",
          input3: ""
        },
        fastTrackMethod: "IN_PERSON",
        fastTrackMethodTelephoneHearing: "telephoneTheClaimant",
        fastTrackBuildingDispute:{
          input1: "",
          input2: "",
          input3: "",
          date1: date(1),
          input4: "",
          date2: date(1)
        },
        fastTrackClinicalNegligence: {
          input1: "",
          input2: "",
          input3: "",
          input4: ""
        },
        fastTrackCreditHire: {
          input1: "",
          input2: "",
          date1: date(1),
          input3: "",
          input4: "",
          date2: date(1),
          input5: "",
          input6: "",
          date3: date(1),
          input7: ""
          date4: date(1),
          input8: ""
        },
        fastTrackHousingDisrepair: {
           input1: "",
           input2: "",
           input3: "",
           date1: date(1),
           input4: "",
           date2: date(1)
        },
        fastTrackPersonalInjury: {
            input1: "",
            date1: "",
            input2: "",
            date2: "",
            input3: ""
        },
        fastTrackRoadTrafficAccident: {
            input: "",
            date: date(1)
        },
        fastTrackAddNewDirections:[
            element({
             directionComment: ""
            }),
            element({
             directionComment: ""
            })
        ],
        fastTrackNotes:{
            input: "",
            date: date(1)
        }
      }
    }
  }
}
