export const heading = 'Order details';

export const subheadings = {
  judgesRecital: 'Judge’s recital',
  allocation: 'Allocation',
  flightDelay: 'Flight Delay',
  relatedClaims: 'Related claims',
  legalArguments: 'Legal arguments',
  hearingTime: 'Hearing time',
  hearingMethod: 'Hearing Method',
  hearingNotes: 'Hearing notes (Optional)',
  importantNotes: 'Important notes',
  documents: 'Documents',
  witnessStatement: 'Witness Statement',
  creditHire: 'Credit hire',
  roadTrafficAccident: 'Road traffic accident',
  addNewDirection: 'Add a new direction (Optional)',
};

export const paragraphs = {
  paragraph1: 'The claim is allocated to the Small Claims Track.',
  paragraph2: 'Use of the Welsh Language',
  paragraph3:
    'Warning: You must comply with the terms imposed upon you by this order otherwise your claim or the defence of it is liable to be struck out or some other sanction imposed. If you cannot comply, you are expected to make formal application to the court before any deadline imposed upon you expires.',
  paragraph4:
    'You are encouraged to try to settle the case with the other side. You may also contact the Small Claims Mediation Service to arrange a mediation appointment. The service is free and can be contacted on (01604) 795511.',
};

export const witnessStatementContent = {
  paragraph1: 'A witness statement must',
  paragraph2:
    'a) Start with the name of the case and the claim number;\n' +
    'b) State the full name and address of the witness;\n' +
    'c) Set out the witness’s evidence clearly in numbered paragraphs on numbered pages;\n' +
    'd) End with this paragraph: ‘I believe that the facts stated in this witness statement are true.I understand that proceedings for contempt of court may be brought against anyone who makes, or causes to be made,a false statement in a document verified by a statement of truth without an honest belief in its truth’;\n' +
    'e) Be signed by the witness and dated;\n' +
    'f) If a witness is unable to read the statement there must be a certificate that it has been read or interpreted to the witness by a suitably qualified person and at the final hearing there must be an independent interpreter who will not be provided by the Court.\n\n' +
    'The Judge may refuse to allow a witness to give evidence or consider any statement of any witness whose statement has not been uploaded to the Digital Portal in accordance with the paragraphs above.\n\n' +
    'A witness whose statement has been uploaded in accordance with the above must attend the hearing. If they do not attend,it will be for the Court to decide how much reliance, if any, to place on their evidence.',
};

export const creditHireContent = {
  paragraph1:
    'A failure to comply with the paragraph above will result in the claimant being debarred from asserting impecuniosity at the final hearing',
  paragraph2: 'This statement must be uploaded to the Digital Portal by 4pm on',
};

export const inputs = {
  judgesRecital: {
    selector: '#smallClaimsJudgesRecital_input',
  },
  flightDelay: {
    relatedClaim: {
      selector: '#smallClaimsFlightDelay_relatedClaimsInput',
    },
    legalArduments: {
      selector: '#smallClaimsFlightDelay_legalDocumentsInput',
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
      label: 'Date from',
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
  hearingNotes: {
    hintText: 'This is only seen by the listing officer.',
    selector: '#sdoHearingNotes_input',
  },
  importantNotes: {
    selector: '#smallClaimsNotes_input',
  },
  documents: {
    input1: {
      selector: '#smallClaimsDocuments_input1',
    },
    input2: {
      selector: '#smallClaimsDocuments_input2',
    },
  },
  witnessStatement: {
    label: 'Statements of witnesses',
    selector: '#sdoR2SmallClaimsWitnessStatementOther_sdoStatementOfWitness',
  },
  creditHire: {
    input1: {
      selector: '#smallClaimsCreditHire_input1',
    },
    inpu2: {
      selector: '#smallClaimsCreditHire_input2',
    },
    input3: {
      selector: '#smallClaimsCreditHire_input3',
    },
    input4: {
      selector: '#smallClaimsCreditHire_input4',
    },
    input5: {
      selector: '#smallClaimsCreditHire_input5',
    },
    input6: {
      selector: '#smallClaimsCreditHire_input6',
    },
    input7: {
      selector: '#smallClaimsCreditHire_input7',
    },
    input11: {
      selector: '#smallClaimsCreditHire_input11',
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
  roadTrafficAccident: {
    selector: '#smallClaimsRoadTrafficAccident_input',
  },
  newDirection: {
    label: 'Enter the direction (Optional)',
    selector: '#smallClaimsAddNewDirections_0_directionComment',
  },
};

export const checkboxes = {
  flightDelay: {
    label: 'Show/Remove',
    selector: '#smallClaimsFlightDelayToggle-SHOW',
  },
  hearingTime: {
    label: 'Show/Remove',
    selector: '#smallClaimsHearingToggle-SHOW',
  },
  documents: {
    label: 'Show/Remove',
    selector: '#smallClaimsDocumentsToggle-SHOW',
  },
  witnessStatement: {
    label: 'Show/Remove',
    selector: '#smallClaimsWitnessStatementToggle-SHOW',
  },
};

export const radioButtons = {
  hearingMethod: {
    label: 'Select an option below',
    inPerson: {
      label: 'In Person',
      selector: '#hearingMethodValuesSmallClaims_eabf61f8-715a-4f46-a2ba-363ee07ab419',
    },
    telephone: {
      label: 'Telephone',
      selector: '#hearingMethodValuesSmallClaims_3e0dad80-3c94-4c62-8a02-724e0ef5ee9f',
    },
    video: {
      label: 'Video',
      selector: '#hearingMethodValuesSmallClaims_b361bf2e-a230-483e-a07e-6af5c2cc4a80',
    },
  },
  hearingTime: {
    label: 'The time estimate is',
    thirtyMins: {
      label: '30 minutes',
      selector: '#',
    },
    oneHour: {
      label: '1 hour',
      selector: '#smallClaimsHearing_time-THIRTY_MINUTES',
    },
    oneHourThirtyMins: {
      label: '1.5 hours',
      selector: '#smallClaimsHearing_time-ONE_HOUR',
    },
    twoHours: {
      label: '2 hours',
      selector: '#smallClaimsHearing_time-ONE_AND_HALF_HOUR',
    },
    twohoursThirtyMins: {
      label: '2.5 hours',
      selector: '#smallClaimsHearing_time-TWO_HOURS',
    },
    other: {
      label: 'Other',
      selector: '#smallClaimsHearing_time-TWO_AND_HALF_HOURS',
    },
  },
  witnessStatement: {
    restrictNumWitnesses: {
      label: 'Restrict number of witnesses',
      yes: {
        label: 'Yes',
        selector: '#sdoR2SmallClaimsWitnessStatementOther_isRestrictWitness_Yes',
      },
      no: {
        label: 'No',
        selector: '#sdoR2SmallClaimsWitnessStatementOther_isRestrictWitness_No',
      },
    },
    restrictNumPages: {
      label: 'Restrict number of pages',
      yes: {
        label: 'Yes',
        selector: '#sdoR2SmallClaimsWitnessStatementOther_isRestrictPages_Yes',
      },
      no: {
        label: 'No',
        selector: '#sdoR2SmallClaimsWitnessStatementOther_isRestrictPages_No',
      },
    },
  },
};

export const dropdowns = {
  hearingLocation: {
    label: 'This hearing will take place at:',
    selector: '#smallClaimsMethodInPerson',
  },
};

export const buttons = {
  addNewDirection: {
    title: 'Add new',
    selector:
      "div[id='smallClaimsAddNewDirections'] button[class='button write-collection-add-item__top']",
  },
};
