export const subheadings = {
  orderHearingDetails: 'Order and hearing details',
  judgesRecital: "Judge's recital",
  judgementForClaimant:
    'There is a judgment for the claimant for an amount to be decided by the court',
  disclosureOfDocuments: 'Disclosure of documents',
  witnessOfFact: 'Witnesses of Fact',
  medicalEvidence: 'Medical evidence',
  questionsToExperts: 'Questions to experts',
  scheduleOfLoss: 'Schedules or counter-schedules of loss',
  hearingTime: 'Hearing time',
  hearingMethod: 'Hearing Method',
  disposalHearingBundle: 'Disposal hearing bundle',
  claimSettling: 'Claim Settling',
  costs: 'Costs',
  newDirection: 'Add a new direction (Optional)',
  hearingNotes: 'Hearing notes',
  welshLanguage: 'Use of the Welsh Language',
  importantNotes: 'Important notes',
};

export const paragraphs = {
  paragraph1:
    'Warning: you must comply with the terms imposed upon you by this order otherwise your claim or the defence of it is liable to be struck out or some other sanction imposed. If you cannot comply, you are expected to make formal application to the court before any deadline imposed upon you expires.',
  paragraph2: 'Subject to a deduction of:',
  paragraph3:
    'Any questions which are to be addressed to an expert must be sent to the expert directly and uploaded to the Digital Portal by 4pm on',
  paragraph4:
    'The answers to the questions shall be answered by the Expert within 14 days and uploaded to the Digital Portal within 21 days.',
  paragraph5:
    'If there is a claim for future pecuniary loss and the parties have not already set out their case on periodical payments, then they must do so in the respective schedule and counter-schedule.',
  paragraph6:
    'Each party must inform the court immediately if the case is settled, whether or not it is then possible to file a draft consent order to give effect to their agreement.',
  paragraph7: 'Costs in the case',
  paragraph8:
    'If any party is legally represented then when filing any witness evidence, the legal representatives must notify the Court in writing that:\n' +
    'a) they have advised their client of the entitlement of any party or witness to give evidence in the Welsh Language in accordance with the Welsh Language Act 1993 (which is not dependant on whether they are fluent in English)\n' +
    'b) instructions have been taken as to whether any party or witness will exercise that entitlement, in which case the legal representatives must so inform the Court so that arrangements can be made by the Court for instantaneous translation facilities to be made available without charge\n\n' +
    'Any unrepresented party or witness for such a party being entitled to give evidence in the Welsh Language in accordance with the principle of the Welsh Language Act 1993 must notify the Court when sending to the Court their witness evidence whether any party or witness will exercise that entitlement whereupon the Court will make arrangements for instantaneous translation facilities to be made available without charge.',
};

export const inputs = {
  judgesRecital: {
    selector: '#disposalHearingJudgesRecital_input',
  },
  disclosureOfDocuments: {
    input1: {
      selector: '#disposalHearingDisclosureOfDocuments_input1',
    },
    input2: {
      selector: '#disposalHearingDisclosureOfDocuments_input2',
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
        selector: '#dat1-year',
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
  witnessOfFact: {
    input3: {
      selector: '#disposalHearingWitnessOfFact_input3',
    },
    input4: {
      selector: '#disposalHearingWitnessOfFact_input4',
    },
    input5: {
      selector: '#disposalHearingWitnessOfFact_input5',
    },
    input6: {
      selector: '#disposalHearingWitnessOfFact_input6',
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
  medicalEvidence: {
    input: {
      selector: '#disposalHearingMedicalEvidence_input',
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
  questionsToExperts: {
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
  scheduleOfLoss: {
    input2: {
      selector: '#disposalHearingSchedulesOfLoss_input2',
    },
    input3: {
      selector: '#disposalHearingSchedulesOfLoss_input3',
    },
    input4: {
      selector: '#disposalHearingSchedulesOfLoss_input4',
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
  hearingTime: {
    input: {
      selector: '#disposalHearingHearingTime_input',
    },
    dateFrom: {
      date4: {
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
    },
    dateTo: {
      date4: {
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
    },
    otherHours: {
      label: 'Hours',
      selector: '#disposalHearingHearingTime_otherHours',
    },
    otherMinutes: {
      label: 'Minutes',
      selector: '#disposalHearingHearingTime_otherMinutes',
    },
  },
  disposalHearingBundle: {
    selector: '#disposalHearingBundle_input',
  },
  newDirection: {
    label: 'Enter the direction (Optional)',
    selector: '#disposalHearingAddNewDirections_0_directionComment',
  },
  hearingNotes: {
    label: 'This is only seen by the listing officer (Optional)',
    selector: '#disposalHearingHearingNotes',
  },
  importantNotes: {
    selector: '#disposalOrderWithoutHearing_input',
  },
};

export const radioButtons = {
  hearingTime: {
    label: 'The time estimate is',
    thirtyMins: {
      label: '30 minutes',
      selector: '#disposalHearingHearingTime_time-THIRTY_MINUTES',
    },
    fifteenMins: {
      label: '15 minutes',
      selector: '#disposalHearingHearingTime_time-FIFTEEN_MINUTES',
    },
    other: {
      label: 'Other',
      selector: '#disposalHearingHearingTime_time-OTHER',
    },
  },
  hearingMethod: {
    label: 'Select an option below',
    inPerson: {
      label: 'In Person',
      selector: '#hearingMethodValuesDisposalHearing_8aa44d97-d2ef-47dd-96b5-28640862932a',
    },
    telephone: {
      label: 'Telephone',
      selector: '#hearingMethodValuesDisposalHearing_7a9cbf73-6bde-44bf-b5b2-01e4e8b8e438',
    },
    video: {
      label: 'Video',
      selector: '#hearingMethodValuesDisposalHearing_a37c912c-bd77-4e57-88ca-e93ff0858c28',
    },
  },
};

export const checkboxes = {
  disclosureOfDocuments: {
    label: 'Show/Remove',
    selector: '#disposalHearingDisclosureOfDocumentsToggle-SHOW',
  },
  witnessesOfFact: {
    label: 'Show/Remove',
    selector: '#disposalHearingWitnessOfFactToggle-SHOW',
  },
  medicalEvidence: {
    label: 'Show/Remove',
    selector: '#disposalHearingMedicalEvidenceToggle-SHOW',
  },
  questionsToExperts: {
    label: 'Show/Remove',
    selector: '#disposalHearingQuestionsToExpertsToggle-SHOW',
  },
  scheduleOfLoss: {
    label: 'Show/Remove',
    selector: '#disposalHearingSchedulesOfLossToggle-SHOW',
  },
  hearingTime: {
    label: 'Show/Remove',
    selector: '#disposalHearingFinalDisposalHearingToggle-SHOW',
  },
  disposalHearingBundle: {
    toggle: {
      label: 'Show/Remove',
      selector: '#disposalHearingBundleToggle-SHOW',
    },
    bundleType: {
      label: 'Select bundle type',
      documents: {
        label: 'an indexed bundle of documents, with each page clearly numbered',
        selector: '#disposalHearingBundle_type-DOCUMENTS',
      },
      electronic: {
        label: 'an electronic bundle of digital documents',
        selector: '#disposalHearingBundle_type-ELECTRONIC',
      },
      summary: {
        label: 'a case summary containing no more than 500 words',
        selector: '#disposalHearingBundle_type-SUMMARY',
      },
    },
  },
  claimSettling: {
    label: 'Show/Remove',
    selector: '#disposalHearingClaimSettlingToggle-SHOW',
  },
  costs: {
    label: 'Show/Remove',
    selector: '#disposalHearingCostsToggle-SHOW',
  },
  welshLanguage: {
    label: 'Show/Remove',
    selector: '#sdoR2DisposalHearingUseOfWelshToggle-SHOW',
  },
};

export const dropdowns = {
  hearingMethod: {
    label: 'Select hearing location',
    selector: '#disposalHearingMethodInPerson',
  },
};

export const buttons = {
  addNewDirection: {
    title: 'Add new',
    selector:
      "div[id='disposalHearingAddNewDirections'] button[class='button write-collection-add-item__top']",
  },
};
