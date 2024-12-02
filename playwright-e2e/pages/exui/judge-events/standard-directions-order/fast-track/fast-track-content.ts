export const heading = 'Order details';

export const subheadings = {
  judgesRecital: "Judge's recital",
  allocation: 'Allocation',
  altDisputeResolution: 'Alternative dispute resolution',
  variationOfDirections: 'Variation of directions',
  settlement: 'Settlement',
  disclosureOfDocuments: 'Disclosure of documents',
  witnessesOfFact: 'Witnesses of Fact',
  schedulesOfLoss: 'Schedules of loss',
  hearingTime: 'Hearing time',
  hearingMethod: 'Hearing Method',
  buildingDispute: 'Building dispute',
  clinicalNegligence: 'Clinical negligence',
  creditHire: 'Credit hire',
  employersLiability: "Employer's liability",
  housingDisrepair: 'Housing Disrepair',
  expertEvidence: 'Expert Evidence',
  roadTrafficAccident: 'Road traffic accident',
  newDirection: 'Add a new direction (Optional)',
  hearingNotes: 'Hearing notes',
  welshLanguage: 'Use of the Welsh Language',
  importantNotes: 'Important notes',
  judgementClaimSum:
    'There is a judgment for the claimant for an amount to be decided by the court',
};

export const paragraphs = {
  paragraph1:
    'Warning: You must comply with the terms imposed upon you by this order otherwise your claim or the defence of it is liable to be struck out or some other sanction imposed. If you cannot comply, you are expected to make formal application to the court before any deadline imposed upon you expires.',
  paragraph2:
    'For information on which complexity band the claim should be see CPR26.15 Table 1.\n' +
    'The claim is allocated to the Fast Track',
  paragraph3:
    'At all stages, the parties must consider settling this litigation by any means of Alternative Dispute Resolution. This includes round table conferences, early neutral evaluation, mediation and arbitration. Any party not engaging in any such means proposed by another must uploaded to the Digital Portal a witness statement giving reasons within 21 days of receipt of that proposal. That witness statement must not be shown to the trial judge until questions of costs arise.',
  paragraph4:
    'The parties may, by written agreement, extend time for compliance with a direction where that is permitted by CPR 3.8(4). Otherwise, the time for compliance with a direction may only be extended by making an application.',
  paragraph5:
    'Each party must inform the Court immediately if the case is settled whether or not it is then possible to upload to the Digital Portal a draft consent order to give effect to their agreement.',
  paragraph6:
    'A failure to comply with the paragraph above will result in the claimant being debarred from asserting impecuniosity at the final hearing',
  paragraph7:
    "Subject to any direction, ruling, or finding of the trial judge, any employer's accident report and Health and Safety Executive report with witness statements will be admissible in evidence.",
  paragraph8:
    'If any party is legally represented then when filing any witness evidence, the legal representatives must notify the Court in writing that:\n' +
    'a) they have advised their client of the entitlement of any party or witness to give evidence in the Welsh Language in accordance with the Welsh Language Act 1993 (which is not dependant on whether they are fluent in English)\n' +
    'b) instructions have been taken as to whether any party or witness will exercise that entitlement, in which case the legal representatives must so inform the Court so that arrangements can be made by the Court for instantaneous translation facilities to be made available without charge\n\n' +
    'Any unrepresented party or witness for such a party being entitled to give evidence in the Welsh Language in accordance with the principle of the Welsh Language Act 1993 must notify the Court when sending to the Court their witness evidence whether any party or witness will exercise that entitlement whereupon the Court will make arrangements for instantaneous translation facilities to be made available without charge.',
  paragraph9: 'Subject to a deduction of:',
  paragraph10: 'This statement must be uploaded to the Digital Portal by 4pm on',
};

export const inputs = {
  judgesRecital: {
    selector: '#fastTrackJudgesRecital_input',
  },
  allocationReasons: {
    label: 'because (Optional)',
    selector: '#fastTrackAllocation_reasons',
  },
  disclosureOfDocuments: {
    input1: {
      selector: '#fastTrackDisclosureOfDocuments_input1',
    },
    input2: {
      selector: '#fastTrackDisclosureOfDocuments_input1',
    },
    input3: {
      selector: '#fastTrackDisclosureOfDocuments_input1',
    },
    input4: {
      selector: '#fastTrackDisclosureOfDocuments_input1',
    },
    date1: {
      day: {
        label: 'Day',
        selector: '#date1-day',
      },
      month: {
        label: 'Month',
        selector: '#date1-month',
      },
      year: {
        label: 'Year',
        selector: '#date1-year',
      },
    },
    date2: {
      day: {
        label: 'Day',
        selector: '#date2-day',
      },
      month: {
        label: 'Month',
        selector: '#date2-month',
      },
      year: {
        label: 'Year',
        selector: '#date2-year',
      },
    },
    date3: {
      day: {
        label: 'Day',
        selector: '#date3-day',
      },
      month: {
        label: 'Month',
        selector: '#date3-month',
      },
      year: {
        label: 'Year',
        selector: '#date3-year',
      },
    },
  },
  witnessesOfFact: {
    statementsOfWitnesses: {
      label: 'Statements of witnesses',
      selector: '#sdoR2FastTrackWitnessOfFact_sdoStatementOfWitness',
    },
    deadline: {
      label: 'Deadline',
      selector: '#sdoR2FastTrackWitnessOfFact_sdoWitnessDeadline',
    },
    deadlineDate: {
      day: {
        label: 'Day',
        selector: '#sdoWitnessDeadlineDate-day',
      },
      month: {
        label: 'Month',
        selector: '#sdoWitnessDeadlineDate-month',
      },
      year: {
        label: 'Year',
        selector: '#sdoWitnessDeadlineDate-year',
      },
    },
    deadlineText: {
      selector: '#sdoR2FastTrackWitnessOfFact_sdoWitnessDeadlineText',
    },
    numClaimantWitnesses: {
      label: 'Limit number of witnesses (claimant)',
      hintText: 'For example,4',
      selector:
        '#sdoR2FastTrackWitnessOfFact_sdoR2RestrictWitness_restrictNoOfWitnessDetails_noOfWitnessClaimant',
    },
    numDefendantWitnesses: {
      label: 'Limit number of witnesses (defendant)',
      hintText: 'For example,4',
      selector:
        '#sdoR2FastTrackWitnessOfFact_sdoR2RestrictWitness_restrictNoOfWitnessDetails_noOfWitnessDefendant',
    },
    partyIsCountedAsWitnessText: {
      selector:
        '#sdoR2FastTrackWitnessOfFact_sdoR2RestrictWitness_restrictNoOfWitnessDetails_partyIsCountedAsWitnessTxt',
    },
    witnessShouldNotMoreThanText: {
      selector:
        '#sdoR2FastTrackWitnessOfFact_sdoRestrictPages_restrictNoOfPagesDetails_witnessShouldNotMoreThanTxt',
    },
    numPages: {
      label: 'Number of pages',
      hintText: 'For example,4',
      selector: '#sdoR2FastTrackWitnessOfFact_sdoRestrictPages_restrictNoOfPagesDetails_noOfPages',
    },
    fontDetails: {
      selector:
        '#sdoR2FastTrackWitnessOfFact_sdoRestrictPages_restrictNoOfPagesDetails_fontDetails',
    },
  },
  scheduleOfLoss: {
    input1: {
      selector: '#fastTrackSchedulesOfLoss_input1',
    },
    input2: {
      selector: '#fastTrackSchedulesOfLoss_input2',
    },
    input3: {
      selector: '#fastTrackSchedulesOfLoss_input3',
    },
    date1: {
      day: {
        label: 'Day',
        selector: '#date1-day',
      },
      month: {
        label: 'Month',
        selector: '#date1-month',
      },
      year: {
        label: 'Year',
        selector: '#date1-year',
      },
    },
    date2: {
      day: {
        label: 'Day',
        selector: '#date2-day',
      },
      month: {
        label: 'Month',
        selector: '#date2-month',
      },
      year: {
        label: 'Year',
        selector: '#date2-year',
      },
    },
  },
  hearingTime: {
    dateFrom: {
      label: 'Date from',
      day: {
        label: 'Day',
        selector: '#dateFrom-day',
      },
      month: {
        label: 'Month',
        selector: '#dateFrom-month',
      },
      year: {
        label: 'Year',
        selector: '#dateFrom-year',
      },
    },
    dateTo: {
      label: 'Date to (Optional)',
      day: {
        label: 'Day',
        selector: '#dateTo-day',
      },
      month: {
        label: 'Month',
        selector: '#dateTo-month',
      },
      year: {
        label: 'Year',
        selector: '#dateTo-year',
      },
    },
    helpText1: {
      selector: '#fastTrackHearingTime_helpText1',
    },
    helpText2: {
      selector: '#fastTrackHearingTime_helpText2',
    },
    otherHours: {
      label: 'Hours',
      selector: '#fastTrackHearingTime_otherHours',
    },
    otherMinutes: {
      label: 'Minutes',
      selector: '#fastTrackHearingTime_otherMinutes',
    },
  },
  buildingDispute: {
    input1: {
      hintText: 'Scott schedule',
      selector: '#fastTrackBuildingDispute_input1',
    },
    input2: {
      selector: '#fastTrackBuildingDispute_input2',
    },
    input3: {
      selector: '#fastTrackBuildingDispute_input1',
    },
    input4: {
      selector: '#fastTrackBuildingDispute_input4',
    },
    date1: {
      day: {
        label: 'Day',
        selector: '#date1-day',
      },
      month: {
        label: 'Month',
        selector: '#date1-month',
      },
      year: {
        label: 'Year',
        selector: '#date1-year',
      },
    },
    date2: {
      day: {
        label: 'Day',
        selector: '#date2-day',
      },
      month: {
        label: 'Month',
        selector: '#date2-month',
      },
      year: {
        label: 'Year',
        selector: '#date2-year',
      },
    },
  },
  clinicalNegliegence: {
    input1: {
      hintText: 'Retention of documents',
      selector: '#fastTrackClinicalNegligence_input1',
    },
    input2: {
      selector: '#fastTrackClinicalNegligence_input2',
    },
    input3: {
      selector: '#fastTrackClinicalNegligence_input3',
    },
    input4: {
      selector: '#fastTrackClinicalNegligence_input4',
    },
  },
  creditHire: {
    input1: {
      selector: '#sdoR2FastTrackCreditHire_input1',
    },
    input2: {
      selector: '#sdoR2FastTrackCreditHire_sdoR2FastTrackCreditHireDetails_input2',
    },
    input3: {
      selector: '#sdoR2FastTrackCreditHire_sdoR2FastTrackCreditHireDetails_input3',
    },
    input4: {
      selector: '#sdoR2FastTrackCreditHire_sdoR2FastTrackCreditHireDetails_input4',
    },
    input5: {
      selector: '#sdoR2FastTrackCreditHire_input5',
    },
    input6: {
      selector: '#sdoR2FastTrackCreditHire_input6',
    },
    input7: {
      selector: '#sdoR2FastTrackCreditHire_input7',
    },
    input8: {
      selector: '#sdoR2FastTrackCreditHire_input8',
    },
    date1: {
      day: {
        label: 'Day',
        selector: '#date1-day',
      },
      month: {
        label: 'Month',
        selector: '#date1-month',
      },
      year: {
        label: 'Year',
        selector: '#date1-year',
      },
    },
    date2: {
      day: {
        label: 'Day',
        selector: '#date2-day',
      },
      month: {
        label: 'Month',
        selector: '#date2-month',
      },
      year: {
        label: 'Year',
        selector: '#date2-year',
      },
    },
    date3: {
      day: {
        label: 'Day',
        selector: '#date3-day',
      },
      month: {
        label: 'Month',
        selector: '#date3-month',
      },
      year: {
        label: 'Year',
        selector: '#date3-year',
      },
    },
    date4: {
      day: {
        label: 'Day',
        selector: '#date4-day',
      },
      month: {
        label: 'Month',
        selector: '#date4-month',
      },
      year: {
        label: 'Year',
        selector: '#date4-year',
      },
    },
  },
  housingDisrepair: {
    input1: {
      hintText: 'Scott schedule',
      selector: '#fastTrackHousingDisrepair_input1',
    },
    input2: {
      selector: '#fastTrackHousingDisrepair_input2',
    },
    input3: {
      selector: '#fastTrackHousingDisrepair_input3',
    },
    input4: {
      selector: '#fastTrackHousingDisrepair_input4',
    },
    date1: {
      day: {
        label: 'Day',
        selector: '#date1-day',
      },
      month: {
        label: 'Month',
        selector: '#date1-month',
      },
      year: {
        label: 'Year',
        selector: '#date1-year',
      },
    },
    date2: {
      day: {
        label: 'Day',
        selector: '#date2-day',
      },
      month: {
        label: 'Month',
        selector: '#date2-month',
      },
      year: {
        label: 'Year',
        selector: '#date2-year',
      },
    },
  },
  expertEvidence: {
    input1: {
      selector: '#fastTrackPersonalInjury_input1',
    },
    input2: {
      selector: '#fastTrackPersonalInjury_input2',
    },
    input3: {
      selector: '#fastTrackPersonalInjury_input3',
    },
    input4: {
      selector: '#fastTrackPersonalInjury_input4',
    },
    date2: {
      day: {
        label: 'Day',
        selector: '#date2-day',
      },
      month: {
        label: 'Month',
        selector: '#date2-month',
      },
      year: {
        label: 'Year',
        selector: '#date2-year',
      },
    },
    date3: {
      day: {
        label: 'Day',
        selector: '#date3-day',
      },
      month: {
        label: 'Month',
        selector: '#date3-month',
      },
      year: {
        label: 'Year',
        selector: '#date3-year',
      },
    },
    date4: {
      day: {
        label: 'Day',
        selector: '#date4-day',
      },
      month: {
        label: 'Month',
        selector: '#date4-month',
      },
      year: {
        label: 'Year',
        selector: '#date4-year',
      },
    },
  },
  roadTrafficAccident: {
    input: {
      selector: '#fastTrackRoadTrafficAccident_input',
    },
    date: {
      day: {
        label: 'Day',
        selector: '#date-day',
      },
      month: {
        label: 'Month',
        selector: '#date-month',
      },
      year: {
        label: 'Year',
        selector: '#date-year',
      },
    },
  },
  hearingNotes: {
    label: 'This is only seen by the listing officer (Optional)',
    selector: '#fastTrackHearingNotes_input',
  },
  importantNotes: {
    selector: 'fastTrackOrderWithoutJudgement_input',
  },
  newDirection: {
    label: 'Enter the direction (Optional',
    selector: '#fastTrackAddNewDirections_0_directionComment',
  },
};

export const radioButtons = {
  allocation: {
    assignComplexityBand: {
      label: 'Do you assign a complexity band to the case?',
      yes: {
        label: 'Yes',
        selector: '#fastTrackAllocation_assignComplexityBand_Yes',
      },
      no: {
        label: 'No',
        selector: '#fastTrackAllocation_assignComplexityBand_No',
      },
    },
    allocationComplexity: {
      label: 'and the court assigns the claim to complexity',
      band1: {
        label: 'band 1: road traffic accident without personal injury; debt claims',
        selector: '#fastTrackAllocation_band-BAND_1',
      },
      band2: {
        label:
          'band 2: road traffic accident with personal injury covered by protocol; personal injury; package travel claims',
        selector: '#fastTrackAllocation_band-BAND_2',
      },
      band3: {
        label:
          'band 3: road traffic accident with personal injury but not covered by protocol; employer liability (accident): public liability (personal injury); housing disrepair; other money claims',
        selector: '#fastTrackAllocation_band-BAND_3',
      },
      band4: {
        label:
          'band 4: employer liability (disease, but not noise induced hearing loss) complex housing disrepair, property/building disputes; professional negligence; complex claims',
        selector: '#fastTrackAllocation_band-BAND_4',
      },
    },
  },
  witnessesOfFact: {
    restrictNumWitnesses: {
      label: 'Restrict number of witnesses',
      yes: {
        label: 'Yes',
        selector: '#sdoR2FastTrackWitnessOfFact_sdoR2RestrictWitness_isRestrictWitness_Yes',
      },
      no: {
        label: 'No',
        selector: '#sdoR2FastTrackWitnessOfFact_sdoR2RestrictWitness_isRestrictWitness_No',
      },
    },
    restrictNumPages: {
      label: 'Restrict number of pages',
      yes: {
        label: 'Yes',
        selector: '#sdoR2FastTrackWitnessOfFact_sdoRestrictPages_isRestrictPages_Yes',
      },
      no: {
        label: 'No',
        selector: '#sdoR2FastTrackWitnessOfFact_sdoRestrictPages_isRestrictPages_No',
      },
    },
  },
  hearingTime: {
    label: 'The time estimate is',
    oneHour: {
      label: '1 hour',
      selector: '#fastTrackHearingTime_hearingDuration-ONE_HOUR',
    },
    oneHourThirtyMins: {
      label: '1.5 hours',
      selector: '#fastTrackHearingTime_hearingDuration-ONE_AND_HALF_HOUR',
    },
    twoHours: {
      label: '2 hours',
      selector: '#fastTrackHearingTime_hearingDuration-TWO_HOURS',
    },
    threeHours: {
      label: '3 hours',
      selector: '#fastTrackHearingTime_hearingDuration-THREE_HOURS',
    },
    fourHours: {
      label: '4 hours',
      selector: '#fastTrackHearingTime_hearingDuration-FOUR_HOURS',
    },
    fiveHours: {
      label: '5 hours',
      selector: '#fastTrackHearingTime_hearingDuration-FIVE_HOURS',
    },
    other: {
      label: 'Other',
      selector: '#fastTrackHearingTime_hearingDuration-OTHER',
    },
  },
  hearingMethod: {
    label: 'Select an option below',
    inPerson: {
      label: 'In Person',
      selector: '#hearingMethodValuesFastTrack_c9bd150e-9549-448b-97ed-5bcaf956c0b4',
    },
    telephone: {
      label: 'Telephone',
      selector: '#hearingMethodValuesFastTrack_3ba2bc77-e4f5-4447-a0ab-6b228c0135eb',
    },
    video: {
      label: 'Video',
      selector: '#hearingMethodValuesFastTrack_3f4dfc92-1296-48c7-93e5-7d1d7f4dbe54',
    },
  },
};

export const checkboxes = {
  includeAltDisputeResolution: {
    label: 'Show/Remove',
    selector: '#fastTrackAltDisputeResolutionToggle-SHOW',
  },
  includeVariationOfDirections: {
    label: 'Show/Remove',
    selector: '#fastTrackVariationOfDirectionsToggle-SHOW',
  },
  includeSettlement: {
    label: 'Show/Remove',
    selector: '#fastTrackSettlementToggle-SHOW',
  },
  includeWitnessesOfFact: {
    label: 'Show/Remove',
    selector: '#fastTrackWitnessOfFactToggle-SHOW',
  },
  includeScheduleOfLoss: {
    label: 'Show/Remove',
    selector: '#fastTrackSchedulesOfLossToggle-SHOW',
  },
  includeHearingTime: {
    label: 'Show/Remove',
    selector: '#fastTrackTrialToggle-SHOW',
  },
  includeHearingTimeDateTo: {
    label: 'Show/Remove',
    selector: '#fastTrackHearingTime_dateToToggle-SHOW',
  },
  includeCreditHireDetails: {
    label: 'Add/Remove',
    selector: '#sdoR2FastTrackCreditHire_detailsShowToggle-ADD',
  },
  includeWelshLanguage: {
    label: 'Add/Remove',
    selector: '#sdoR2FastTrackUseOfWelshToggle-SHOW',
  },
};

export const dropdowns = {
  hearingMethod: {
    label: 'This hearing will take place at:',
    selector: '#fastTrackMethodInPerson',
  },
};

export const buttons = {
  addNewDirection: {
    title: 'Add new',
    selector:
      "div[id='fastTrackAddNewDirections'] button[class='button write-collection-add-item__top']",
  },
};
