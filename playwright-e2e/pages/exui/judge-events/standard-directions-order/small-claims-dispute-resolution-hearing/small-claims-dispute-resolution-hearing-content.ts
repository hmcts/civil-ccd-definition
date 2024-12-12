export const subheadings = {
  warning: 'Warning',
  judgesRecital: 'Judge’s recital',
  allocation: 'Allocation',
  disputeResolutionHearing: 'Dispute Resolution Hearing',
  legalReprentationForDRH: 'Legal representation for DRH',
  judgePowersAtDRH: 'Judges powers at DRH',
  paymentProtectionInsurance: 'Payment Protection Insurance (PPI)',
  witnessStatements: 'Witness statements',
  uploadOfDocuments: 'Upload of documents',
  addNewDirection: 'Add a new direction (Optional)',
  hearing: 'Hearing',
  welshLanguage: 'Use of the Welsh Language',
  importantNotes: 'Important notes',
};

export const paragraphs = {
  paragraph1: 'All dates should be in the format 16 4 2021',
  paragraph2:
    'You must comply with the terms imposed upon you by this Order otherwise your claim or the defence of it is liable to be struck out or some other sanction imposed. If you cannot comply, you are expected to make a formal application to the Court before any deadline imposed upon you expires.',
  paragraph3:
    'You are encouraged to try to settle the case with the other side. You may also contact the Small Claims Mediation Service to arrange an appointment. The service is free and can be contacted on 01604 795 511.',
  paragraph4: 'The claim is allocated to the Small Claims Track.',
  paragraph5:
    'The claim is listed for a Dispute Resolution Hearing before a District Judge on the date and at the time indicated on the Notice of Hearing which will follow separately. A Dispute Resolution Hearing is a preliminary hearing for the purposes of Civil Procedure Rule 27.6.',
  paragraph6:
    'If a party is legally represented at the dispute resolution hearing and the party is not also in attendance, they must have provided full instructions including as to settlement and be contactable so that meaningful negotiations can take place. Failure to have done so may result in the hearing being adjourned and a costs order being made against the party at fault.',
  paragraph7:
    'At the Dispute Resolution Hearing the Judge may:\n' +
    'a) Strike out the claim, the defence, and any counterclaim and/or any defence to counterclaim if the court finds that the statement of case discloses no reasonable grounds for bringing or defending the claim or if it is considered a party has no real prospect of success at a final hearing.\n' +
    'b) If a party fails to provide a contact number for the hearing, fails to attend the hearing, or fails to comply with the directions set out in this Order the court may strike out the claim, defence, and/or counterclaim.\n' +
    'c) Conduct mediation with the parties’ consent, to assist the parties to reach an agreed resolution of the claim so that the dispute can be resolved completely at the Dispute Resolution Hearing and/or identify the real issues in the dispute.\n' +
    'd) List any further hearing including final hearing and/or make an Order requiring the parties to take further steps prior to a further or final hearing and provide that if the same are not carried out, that the Statement of Case of any party in default will be struck out.\n' +
    'e) Make any other Order which the court considers appropriate.',
  paragraph8: 'Statements of witnesses',
  paragraph9: 'A witness statement must',
  paragraph10:
    'a) Start with the name of the case and the claim number;\n' +
    'b) State the full name and address of the witness;\n' +
    'c) Set out the witness’s evidence clearly in numbered paragraphs on numbered pages;\n' +
    'd) End with this paragraph: ‘I believe that the facts stated in this witness statement are true.I understand that proceedings for contempt of court may be brought against anyone who makes, or causes to be made,a false statement in a document verified by a statement of truth without an honest belief in its truth’;\n' +
    'e) Be signed by the witness and dated;\n' +
    'f) If a witness is unable to read the statement there must be a certificate that it has been read or interpreted to the witness by a suitably qualified person and at the final hearing there must be an independent interpreter who will not be provided by the Court.',
  paragraph11:
    'The Judge may refuse to allow a witness to give evidence or consider any statement of any witness whose statement has not been uploaded to the Digital Portal in accordance with the paragraphs above.',
  paragraph12:
    'A witness whose statement has been uploaded in accordance with the above must attend the hearing. If they do not attend,it will be for the Court to decide how much reliance, if any, to place on their evidence.',
  paragraph13:
    'If either party considers that the time estimate is insufficient, they must inform the court within 7 days of the date of this order.',
  paragraph14: 'Defendant(s) shall send to the claimant(s)',
  paragraph15:
    'send to the Claimant(s):\n' +
    'a) A schedule of the following amounts itemised by date;\n' +
    'i) PPI premium charged,\n' +
    'ii) Commission receivable by the Defendant(s),\n' +
    'iii) Rate of commission as a percentage of the premium charged,\n' +
    'iv) Totals and average commission rates, in respect of the whole period to which the claim relates,\n' +
    'v) Contractual interest associated with each such premium charged.\n' +
    'b) A copy of the credit agreement;\n' +
    'c) A copy of the PPI policy application and agreement;\n' +
    'd) Any cancellation notices;\n' +
    'e) Any correspondence in connection with a complaint by the Claimant(s);\n' +
    'f) A copy of any correspondence as to redress if not included in (e);\n' +
    'g) The amount, if any, of redress (under the FCA scheme or otherwise) and the date it was paid.\n\n' +
    'The parties shall endeavour to agree a calculation of the sums in issue and upload to the Digital Portal the agreed calculation. In default of agreement each party shall upload to the Digital Portal its own calculation not later than 7 days before any hearing. The calculation must show the amount which is intended to remove any unfairness from the relationship, broken down into:\n' +
    'a) The principal sum claimed;\n' +
    'b) The amount of contractual interest already paid on that sum;\n' +
    'c) The amount of discretionary interest sought under to Section 69 County Courts Act 1984, if claimed, at rates of 1%, 2%, 4% and 8% per annum.',
  paragraph16:
    'If any party is legally represented then when filing any witness evidence, the legal representatives must notify the Court in writing that:\n' +
    'a) they have advised their client of the entitlement of any party or witness to give evidence in the Welsh Language in accordance with the Welsh Language Act 1993 (which is not dependant on whether they are fluent in English)\n' +
    'b) instructions have been taken as to whether any party or witness will exercise that entitlement, in which case the legal representatives must so inform the Court so that arrangements can be made by the Court for instantaneous translation facilities to be made available without charge\n\n' +
    'Any unrepresented party or witness for such a party being entitled to give evidence in the Welsh Language in accordance with the principle of the Welsh Language Act 1993 must notify the Court when sending to the Court their witness evidence whether any party or witness will exercise that entitlement whereupon the Court will make arrangements for instantaneous translation facilities to be made available without charge.',
};

export const inputs = {
  judgesRecital: {
    selector: '#sdoR2SmallClaimsJudgesRecital_input',
  },
  witnessStatements: {
    statementOfWtinesses: {
      label: 'Statements of witnesses',
      selector: '#sdoR2SmallClaimsWitnessStatements_sdoStatementOfWitness',
    },
    numClaimantWitnesses: {
      label: 'Limit number of witnesses (claimant)',
      hintText: 'For example,4',
      selector:
        '#sdoR2SmallClaimsWitnessStatements_sdoR2SmallClaimsRestrictWitness_noOfWitnessClaimant',
    },
    numDefendantWitnesses: {
      label: 'Limit number of witnesses (defendant)',
      hintText: 'For example,4',
      selector:
        '#sdoR2SmallClaimsWitnessStatements_sdoR2SmallClaimsRestrictWitness_noOfWitnessDefendant',
    },
    partyIsCountedAsWitnessText: {
      selector:
        '#sdoR2SmallClaimsWitnessStatements_sdoR2SmallClaimsRestrictWitness_partyIsCountedAsWitnessTxt',
    },
    witnessShouldNotMoreThanText: {
      selector:
        '#sdoR2SmallClaimsWitnessStatements_sdoR2SmallClaimsRestrictPages_witnessShouldNotMoreThanTxt',
    },
    numPages: {
      label: 'Number of pages',
      hintText: 'For example,4',
      selector: '#sdoR2SmallClaimsWitnessStatements_sdoR2SmallClaimsRestrictPages_noOfPages',
    },
    fontDetails: {
      selector: '#sdoR2SmallClaimsWitnessStatements_sdoR2SmallClaimsRestrictPages_fontDetails',
    },
  },
  uploadOfDocuments: {
    label: 'Upload of documents to be relied upon',
    selector: '#sdoR2SmallClaimsUploadDoc_sdoUploadOfDocumentsTxt',
  },
  hearing: {
    listFrom: {
      label: 'List from',
      day: {
        label: 'Day',
        selector: "input[id='listFrom-day'] >> visible=true",
      },
      month: {
        label: 'Month',
        selector: "input[id='listFrom-month'] >> visible=true",
      },
      year: {
        label: 'Year',
        selector: "input[id='listFrom-year'] >> visible=true",
      },
    },
    dateTo: {
      label: 'Date to',
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
    bundleOfDocuments: {
      label: 'Bundle of documents',
      selector: '#sdoR2SmallClaimsHearing_sdoR2SmallClaimsBundleOfDocs_physicalBundlePartyTxt',
    },
    hearingNotes: {
      label1: 'Hearing notes',
      label2: 'This is only seen by the Listing Officer (Optional)',
      selector: '#sdoR2SmallClaimsHearing_hearingNotesTxt',
    },
    lengthOfHearing: {
      days: {
        label: 'Days',
        hintText: 'For example,2',
        selector: '#sdoR2SmallClaimsHearing_lengthListOther_trialLengthDays',
      },
      hours: {
        label: 'Hours',
        hintText: 'For example,4',
        selector: '#sdoR2SmallClaimsHearing_lengthListOther_trialLengthHours',
      },
      minutes: {
        label: 'Minutes',
        hintText: 'For example,2',
        selector: '#sdoR2SmallClaimsHearing_lengthListOther_trialLengthMinutes',
      },
    },
  },
  ppiDate: {
    label: 'The Defendant(s) shall by',
    day: {
      label: 'Day',
      selector: '#ppiDate-day',
    },
    month: {
      label: 'Month',
      selector: '#ppiDate-month',
    },
    year: {
      label: 'Year',
      selector: '#ppiDate-year',
    },
  },
  importantNotes: {
    notes: {
      selector: '#sdoR2SmallClaimsImpNotes_text',
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
  newDirection: {
    label: 'Enter the direction (Optional)',
    selector: '#sdoR2SmallClaimsAddNewDirection_0_directionComment',
  },
};

export const radioButtons = {
  witnessStatements: {
    restrictNumWitnesses: {
      label: 'Restrict number of witnesses',
      yes: {
        label: 'Yes',
        selector: '#sdoR2SmallClaimsWitnessStatements_isRestrictWitness_Yes',
      },
      no: {
        label: 'No',
        selector: '#sdoR2SmallClaimsWitnessStatements_isRestrictWitness_No',
      },
    },
    restrictNumPages: {
      label: 'Restrict number of pages',
      yes: {
        label: 'Yes',
        selector: '#sdoR2SmallClaimsWitnessStatements_isRestrictPages_Yes',
      },
      no: {
        label: 'No',
        selector: '#sdoR2SmallClaimsWitnessStatements_isRestrictPages_No',
      },
    },
  },
  hearing: {
    trialOnOptions: {
      label: 'A hearing will take place on',
      firstOpenDate: {
        label: 'First open date after',
        selector: '#sdoR2SmallClaimsHearing_trialOnOptions-OPEN_DATE',
      },
      hearingWindow: {
        label: 'Hearing window',
        selector: '#sdoR2SmallClaimsHearing_trialOnOptions-HEARING_WINDOW',
      },
    },
    lengthOfHearing: {
      label: 'Length of hearing',
      fifteenMins: {
        label: '15 minutes',
        selector: '#sdoR2SmallClaimsHearing_lengthList-FIFTEEN_MINUTES',
      },
      thirtyMins: {
        label: '30 minutes',
        selector: '#sdoR2SmallClaimsHearing_lengthList-THIRTY_MINUTES',
      },
      oneHour: {
        label: '1 hour',
        selector: '#sdoR2SmallClaimsHearing_lengthList-ONE_HOUR',
      },
      other: {
        label: 'Other',
        selector: '#sdoR2SmallClaimsHearing_lengthList-OTHER',
      },
    },
    hearingLocation: {
      label: 'Hearing location',
      court: {
        selector: 'sdoR2SmallClaimsHearing_hearingCourtLocationList_20262',
      },
      otherLocation: {
        label: 'Other location',
        selector: '#sdoR2SmallClaimsHearing_hearingCourtLocationList_OTHER_LOCATION',
      },
    },
    methodOfHearing: {
      label: 'Method of hearing',
      hintText:
        "If you want to include any extra information or want to request a certain hearing platform, please include this in the 'Hearing notes' section below",
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
    physicalHearingBundle: {
      label: 'Physical hearing bundle',
      no: {
        label: 'No',
        selector: '#sdoR2SmallClaimsHearing_physicalBundleOptions-NO',
      },
      party: {
        label: 'Party',
        selector: '#sdoR2SmallClaimsHearing_physicalBundleOptions-PARTY',
      },
    },
  },
};

export const checkboxes = {
  includePaymentProtectionInsurance: {
    label: 'Include in Order',
    selector: '#sdoR2SmallClaimsPPIToggle-INCLUDE',
  },
  includeWitnessStatements: {
    label: 'Include in Order',
    selector: '#sdoR2SmallClaimsWitnessStatementsToggle-INCLUDE',
  },
  includeUploadOfDocuments: {
    label: 'Include in Order',
    selector: '#sdoR2SmallClaimsUploadDocToggle-INCLUDE',
  },
  includeHearing: {
    label: 'Include in Order',
    selector: '#sdoR2SmallClaimsHearingToggle-INCLUDE',
  },
  includeWelshLanguage: {
    label: 'Include in Order',
    selector: '#sdoR2DrhUseOfWelshIncludeInOrderToggle-INCLUDE',
  },
};

export const buttons = {
  addNewDirection: {
    title: 'Add new',
    selector:
      "div[id='sdoR2SmallClaimsAddNewDirection'] button[class='button write-collection-add-item__top']",
  },
};
