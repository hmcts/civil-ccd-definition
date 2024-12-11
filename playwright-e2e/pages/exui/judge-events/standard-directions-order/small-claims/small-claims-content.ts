export const heading = 'Order details';

export const subheadings = {
  judgesRecital: "Judge's recital",
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
  welshLanguage: 'Use of the Welsh Language',
  judgementClaimSum: 'Judgment for the claimant for an sum to be decided by the court',
};

export const paragraphs = {
  paragraph1: 'The claim is allocated to the Small Claims Track.',
  paragraph2:
    'Warning: You must comply with the terms imposed upon you by this order otherwise your claim or the defence of it is liable to be struck out or some other sanction imposed. If you cannot comply, you are expected to make formal application to the court before any deadline imposed upon you expires.',
  paragraph3:
    'You are encouraged to try to settle the case with the other side. You may also contact the Small Claims Mediation Service to arrange a mediation appointment. The service is free and can be contacted on (01604) 795511.',
  paragraph4: 'A witness statement must',
  paragraph5:
    'a) Start with the name of the case and the claim number;\n' +
    'b) State the full name and address of the witness;\n' +
    'c) Set out the witness’s evidence clearly in numbered paragraphs on numbered pages;\n' +
    'd) End with this paragraph: ‘I believe that the facts stated in this witness statement are true.I understand that proceedings for contempt of court may be brought against anyone who makes, or causes to be made,a false statement in a document verified by a statement of truth without an honest belief in its truth’;\n' +
    'e) Be signed by the witness and dated;\n' +
    'f) If a witness is unable to read the statement there must be a certificate that it has been read or interpreted to the witness by a suitably qualified person and at the final hearing there must be an independent interpreter who will not be provided by the Court.\n\n' +
    'The Judge may refuse to allow a witness to give evidence or consider any statement of any witness whose statement has not been uploaded to the Digital Portal in accordance with the paragraphs above.\n\n' +
    'A witness whose statement has been uploaded in accordance with the above must attend the hearing. If they do not attend,it will be for the Court to decide how much reliance, if any, to place on their evidence.',
  paragraph6:
    'If any party is legally represented then when filing any witness evidence, the legal representatives must notify the Court in writing that:\n' +
    'a) they have advised their client of the entitlement of any party or witness to give evidence in the Welsh Language in accordance with the Welsh Language Act 1993 (which is not dependant on whether they are fluent in English)\n' +
    'b) instructions have been taken as to whether any party or witness will exercise that entitlement, in which case the legal representatives must so inform the Court so that arrangements can be made by the Court for instantaneous translation facilities to be made available without charge\n\n' +
    'Any unrepresented party or witness for such a party being entitled to give evidence in the Welsh Language in accordance with the principle of the Welsh Language Act 1993 must notify the Court when sending to the Court their witness evidence whether any party or witness will exercise that entitlement whereupon the Court will make arrangements for instantaneous translation facilities to be made available without charge.',
  paragraph7: 'Subject to a deduction of:',
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
    otherHours: {
      label: 'Hour(s)',
      selector: '#smallClaimsHearing_otherHours',
    },
    otherMinutes: {
      label: 'Minute(s)',
      selector: '#smallClaimsHearing_otherMinutes',
    },
    input: {
      selector: '#smallClaimsHearing_input2',
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
    statementOfWitnesses: {
      label: 'Statements of witnesses',
      selector: '#sdoR2SmallClaimsWitnessStatementOther_sdoStatementOfWitness',
    },
    numClaimantWitnesses: {
      label: 'Limit number of witnesses (claimant)',
      hintText: 'For example,4',
      selector:
        '#sdoR2SmallClaimsWitnessStatementOther_sdoR2SmallClaimsRestrictWitness_noOfWitnessClaimant',
    },
    numDefendantWitnesses: {
      label: 'Limit number of witnesses (defendant)',
      hintText: 'For example,4',
      selector:
        '#sdoR2SmallClaimsWitnessStatementOther_sdoR2SmallClaimsRestrictWitness_noOfWitnessDefendant',
    },
    partyIsCountedAsWitnessText: {
      selector:
        '#sdoR2SmallClaimsWitnessStatementOther_sdoR2SmallClaimsRestrictWitness_partyIsCountedAsWitnessTxt',
    },
    witnessShouldNotMoreThanText: {
      selector:
        '#sdoR2SmallClaimsWitnessStatementOther_sdoR2SmallClaimsRestrictPages_witnessShouldNotMoreThanTxt',
    },
    numPages: {
      label: 'Number of pages',
      hintText: 'For example,4',
      selector: '#sdoR2SmallClaimsWitnessStatementOther_sdoR2SmallClaimsRestrictPages_noOfPages',
    },
    fontDetails: {
      selector: '#sdoR2SmallClaimsWitnessStatementOther_sdoR2SmallClaimsRestrictPages_fontDetails',
    },
  },
  creditHire: {
    input1: {
      selector: '#smallClaimsCreditHire_input1',
    },
    input2: {
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
    input8: {
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
    selector: 'label[for="smallClaimsFlightDelayToggle-SHOW"]',
  },
  hearingTime: {
    label: 'Show/Remove',
    selector: 'label[for="smallClaimsHearingToggle-SHOW"]',
  },
  documents: {
    label: 'Show/Remove',
    selector: 'label[for="smallClaimsDocumentsToggle-SHOW"]',
  },
  witnessStatement: {
    label: 'Show/Remove',
    selector: 'label[for="smallClaimsWitnessStatementToggle-SHOW"]',
  },
  welshLanguage: {
    label: 'Show/Remove',
    selector: 'label[for="sdoR2SmallClaimsUseOfWelshToggle-SHOW"]',
  },
};

export const radioButtons = {
  hearingMethod: {
    label: 'Select an option below',
    inPerson: {
      label: 'In Person',
    },
    telephone: {
      label: 'Telephone',
    },
    video: {
      label: 'Video',
    },
  },
  hearingTime: {
    label: 'The time estimate is',
    thirtyMins: {
      label: '30 minutes',
      selector: '#smallClaimsHearing_time-THIRTY_MINUTES',
    },
    oneHour: {
      label: '1 hour',
      selector: '#smallClaimsHearing_time-ONE_HOUR',
    },
    oneHourThirtyMins: {
      label: '1.5 hours',
      selector: '#smallClaimsHearing_time-ONE_AND_HALF_HOUR',
    },
    twoHours: {
      label: '2 hours',
      selector: '#smallClaimsHearing_time-TWO_HOURS',
    },
    twohoursThirtyMins: {
      label: '2.5 hours',
      selector: '#smallClaimsHearing_time-TWO_AND_HALF_HOURS',
    },
    other: {
      label: 'Other',
      selector: '#smallClaimsHearing_time-OTHER',
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
