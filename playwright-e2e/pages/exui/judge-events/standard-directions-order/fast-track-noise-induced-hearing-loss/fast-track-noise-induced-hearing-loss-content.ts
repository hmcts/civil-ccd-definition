export const subheadings = {
  warning: 'Warning',
  judgesRecital: 'Judge’s recital',
  allocation: 'Allocation',
  altDisputeResolution: 'Alternative Dispute Resolution',
  variationOfDirections: 'Variation of directions',
  settlement: 'Settlement',
  disclosureOfDocuments: 'Disclosure of documents',
  witnessOfFact: 'Witnesses of Fact',
  expertEvidence: 'Expert Evidence',
  addendumReport: 'Addendum report',
  furtherAudiogram: 'Further audiogram',
  questionsClaimantExpert: "Questions of the Claimant's expert",
  permissionDefendantRelyExpertEvidence:
    'Permission for any Defendant to rely on expert evidence from a consultant ENT surgeon',
  evidenceExpertAcousticEngineer: 'Evidence of an expert acoustic engineer',
  questionsToEntExpert: 'Questions to ENT expert(s) after engineering evidence',
  scheduleOfLoss: 'Schedule of loss',
  uploadOfDocuments: 'Upload of documents',
  newDirection: 'Add a new direction',
  trial: 'Trial',
  welshLanguage: 'Use of the Welsh Language',
  importantNotes: 'Important notes',
};

export const paragraphs = {
  paragraph1: 'All dates should be in the format 16 4 2021',
  paragraph2:
    'You must comply with the terms imposed upon you by this Order otherwise your claim or the defence of it is liable to be struck out or some other sanction imposed. If you cannot comply, you are expected to make a formal application to the Court before any deadline imposed upon you expires.',
  paragraph3: 'The claim is allocated to the Fast Track.',
  paragraph4:
    'At all stages, the parties must consider settling this litigation by any means of Alternative Dispute Resolution. This includes round table conferences, early neutral evaluation, mediation and arbitration. Any party not engaging in any such means proposed by another must upload to the Digital Portal a witness statement giving reasons within 21 days of receipt of that proposal. That witness statement must not be shown to the trial judge until questions of costs arise.',
  paragraph5:
    'The parties may, by written agreement, extend time for compliance with a direction where that is permitted by CPR 3.8(4). Otherwise, the time for compliance with a direction may only be extended by making an application.',
  paragraph6:
    'Each party must inform the Court immediately if the case is settled whether or not it is then possible to upload to the Digital Portal a draft consent order to give effect to their agreement.',
  paragraph7: 'f. Expert may apply direct to the court for directions',
  paragraph8:
    'The expert may apply direct to the court for directions where necessary under Rule 35.14 of the Civil Procedure Rules.',
  paragraph9: 'g. Fees and expenses of the expert',
  paragraph10:
    'Unless the parties agree in writing or the Court orders otherwise, the fees and expenses of the expert shall be paid by the parties giving instructions for the report equally save that the costs of answering questions shall be paid by the party asking.',
  paragraph11:
    'If either party considers that the time estimate is insufficient, they must inform the court within 7 days of the date of this order.',
  paragraph12:
    'If any party is legally represented then when filing any witness evidence, the legal representatives must notify the Court in writing that:\n' +
    'a) they have advised their client of the entitlement of any party or witness to give evidence in the Welsh Language in accordance with the Welsh Language Act 1993 (which is not dependant on whether they are fluent in English)\n' +
    'b) instructions have been taken as to whether any party or witness will exercise that entitlement, in which case the legal representatives must so inform the Court so that arrangements can be made by the Court for instantaneous translation facilities to be made available without charge\n\n' +
    'Any unrepresented party or witness for such a party being entitled to give evidence in the Welsh Language in accordance with the principle of the Welsh Language Act 1993 must notify the Court when sending to the Court their witness evidence whether any party or witness will exercise that entitlement whereupon the Court will make arrangements for instantaneous translation facilities to be made available without charge.',
};

export const inputs = {
  judgesRecital: {
    selector: '#sdoFastTrackJudgesRecital_input',
  },
  disclosureOfDocuments: {
    standardDisclosure: {
      label: 'Standard disclosure',
      selector: '#sdoR2DisclosureOfDocuments_standardDisclosureTxt',
    },
    standardDisclosureDate: {
      day: {
        label: 'Day',
        selector: '#standardDisclosureDate-day',
      },
      month: {
        label: 'Month',
        selector: '#standardDisclosureDate-month',
      },
      year: {
        label: 'Year',
        selector: '#standardDisclosureDate-year',
      },
    },
    inspection: {
      label: 'Inspection',
      selector: '#sdoR2DisclosureOfDocuments_inspectionTxt',
    },
    inspectionDate: {
      day: {
        label: 'Day',
        selector: '#inspectionDate-day',
      },
      month: {
        label: 'Month',
        selector: '#inspectionDate-month',
      },
      year: {
        label: 'Year',
        selector: '#inspectionDate-year',
      },
    },
    requestWillBeCompiled: {
      label: 'Request will be compiled with',
      selector: '#sdoR2DisclosureOfDocuments_requestsWillBeCompiledLabel',
    },
  },
  witnessesOfFact: {
    statementOfWitnesses: {
      label: 'Statements of witnesses',
      selector: '#sdoR2WitnessesOfFact_sdoStatementOfWitness',
    },
    deadline: {
      label: 'Deadline',
      selector: '#sdoR2WitnessesOfFact_sdoWitnessDeadline',
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
      selector: '#sdoR2WitnessesOfFact_sdoWitnessDeadlineText',
    },
    numClaimantWitnesses: {
      label: 'Number of witnesses (claimant)',
      selector:
        '#sdoR2WitnessesOfFact_sdoR2RestrictWitness_restrictNoOfWitnessDetails_noOfWitnessClaimant',
    },
    numDefendantWitnesses: {
      label: 'Number of witnesses (defendant)',
      selector:
        '#sdoR2WitnessesOfFact_sdoR2RestrictWitness_restrictNoOfWitnessDetails_noOfWitnessDefendant',
    },
    partyCountedAsWitness: {
      selector:
        '#sdoR2WitnessesOfFact_sdoR2RestrictWitness_restrictNoOfWitnessDetails_partyIsCountedAsWitnessTxt',
    },
    witnessShouldNotMoreThanText: {
      selector:
        '#sdoR2WitnessesOfFact_sdoRestrictPages_restrictNoOfPagesDetails_witnessShouldNotMoreThanTxt',
    },
    numPages: {
      label: 'Number of pages',
      hintText: 'For example,4',
      selector: '#sdoR2WitnessesOfFact_sdoRestrictPages_restrictNoOfPagesDetails_noOfPages',
    },
    fontDetails: {
      selector: '#sdoR2WitnessesOfFact_sdoRestrictPages_restrictNoOfPagesDetails_fontDetails',
    },
  },
  expertEvidence: {
    label: "Claimant's permission to rely",
    selector: '#sdoR2ExpertEvidence_sdoClaimantPermissionToRelyTxt',
  },
  addendumReport: {
    addendumReportUpload: {
      label: 'Addendum report upload',
      selector: '#sdoR2AddendumReport_sdoAddendumReportTxt',
    },
    addendumReportDate: {
      day: {
        label: 'Day',
        selector: '#sdoAddendumReportDate-day',
      },
      month: {
        label: 'Month',
        selector: '#sdoAddendumReportDate-month',
      },
      year: {
        label: 'Year',
        selector: '#sdoAddendumReportDate-year',
      },
    },
  },
  furtherAudiogram: {
    shallUndergoText: {
      label: 'Claimant shall undergo a single further audiogram',
      selector: '#sdoR2FurtherAudiogram_sdoClaimantShallUndergoTxt',
    },
    serviceReportText: {
      label: 'Service of report',
      selector: '#sdoR2FurtherAudiogram_sdoServiceReportTxt',
    },
    shallUndergoDate: {
      day: {
        label: 'Day',
        selector: '#sdoClaimantShallUndergoDate-day',
      },
      month: {
        label: 'Month',
        selector: '#sdoClaimantShallUndergoDate-month',
      },
      year: {
        label: 'Year',
        selector: '#sdoClaimantShallUndergoDate-year',
      },
    },
    serviceReportDate: {
      day: {
        label: 'Day',
        selector: '#sdoServiceReportDate-day',
      },
      month: {
        label: 'Month',
        selector: '#sdoServiceReportDate-month',
      },
      year: {
        label: 'Year',
        selector: '#sdoServiceReportDate-year',
      },
    },
  },
  questionsClaimantExpert: {
    defendantMayAskText: {
      label: 'Defendant(s) may ask questions',
      selector: '#sdoR2QuestionsClaimantExpert_sdoDefendantMayAskTxt',
    },
    questionsShallBeAnsweredText: {
      label: 'Questions shall be answered by',
      selector: '#sdoR2QuestionsClaimantExpert_sdoQuestionsShallBeAnsweredTxt',
    },
    uploadToDigitalPortalText: {
      label: 'and uploaded to the Digital Portal',
      selector: '#sdoR2QuestionsClaimantExpert_sdoUploadedToDigitalPortalTxt',
    },
    defendantMayAskDate: {
      day: {
        label: 'Day',
        selector: '#sdoDefendantMayAskDate-day',
      },
      month: {
        label: 'Month',
        selector: '#sdoDefendantMayAskDate-month',
      },
      year: {
        label: 'Year',
        selector: '#sdoDefendantMayAskDate-year',
      },
    },
    questionsShallBeAnsweredDate: {
      day: {
        label: 'Day',
        selector: '#sdoQuestionsShallBeAnsweredDate-day',
      },
      month: {
        label: 'Month',
        selector: '#sdoQuestionsShallBeAnsweredDate-month',
      },
      year: {
        label: 'Year',
        selector: '#sdoQuestionsShallBeAnsweredDate-year',
      },
    },
    applicationToRelyDetailsText: {
      selector:
        '#sdoR2QuestionsClaimantExpert_sdoApplicationToRelyOnFurther_applicationToRelyOnFurtherDetails_applicationToRelyDetailsTxt',
    },
    applicationToRelyDetailsDate: {
      day: {
        label: 'Day',
        selector: '#applicationToRelyDetailsDate-day',
      },
      month: {
        label: 'Month',
        selector: '#applicationToRelyDetailsDate-month',
      },
      year: {
        label: 'Year',
        selector: '#applicationToRelyDetailsDate-year',
      },
    },
  },
  permissionDefendantRelyExpertEvidence: {
    permissionToRelyOnExpertText: {
      label: 'Permission to rely on expert evidence',
      selector: '#sdoR2PermissionToRelyOnExpert_sdoPermissionToRelyOnExpertTxt',
    },
    jointMeetingOfExpertsText: {
      label: 'Joint meeting of experts',
      selector: '#sdoR2PermissionToRelyOnExpert_sdoJointMeetingOfExpertsTxt',
    },
    uploadedToDigitalPortalText: {
      label: 'and uploaded to the Digital Portal',
      selector: '#sdoR2PermissionToRelyOnExpert_sdoUploadedToDigitalPortalTxt',
    },
    permissionToRelyOnExpertDate: {
      day: {
        label: 'Day',
        selector: '#sdoPermissionToRelyOnExpertDate-day',
      },
      month: {
        label: 'Month',
        selector: '#sdoPermissionToRelyOnExpertDate-month',
      },
      year: {
        label: 'Year',
        selector: '#sdoPermissionToRelyOnExpertDate-year',
      },
    },
    jointMeetingOfExpertsDate: {
      day: {
        label: 'Day',
        selector: '#sdoJointMeetingOfExpertsDate-day',
      },
      month: {
        label: 'Month',
        selector: '#sdoJointMeetingOfExpertsDate-month',
      },
      year: {
        label: 'Year',
        selector: '#sdoJointMeetingOfExpertsDate-year',
      },
    },
  },
  evidenceExpertAcousticEngineer: {
    evidenceAcousticEngineerText: {
      selector: '#sdoR2EvidenceAcousticEngineer_sdoEvidenceAcousticEngineerTxt',
    },
    instructionOfTheEvidence: {
      label: 'a. Instruction of the expert',
      selector: '#sdoR2EvidenceAcousticEngineer_sdoInstructionOfTheExpertTxt',
    },
    instructionOfTheEvidenceDate: {
      day: {
        label: 'Day',
        selector: '#sdoInstructionOfTheExpertDate-day',
      },
      month: {
        label: 'Month',
        selector: '#sdoInstructionOfTheExpertDate-month',
      },
      year: {
        label: 'Year',
        selector: '#sdoInstructionOfTheExpertDate-year',
      },
    },
    instructionOfTheEvidenceTextArea: {
      selector: '#sdoR2EvidenceAcousticEngineer_sdoInstructionOfTheExpertTxtArea',
    },
    expertReport: {
      label: 'b. Expert report',
      selector: '#sdoR2EvidenceAcousticEngineer_sdoExpertReportTxt',
    },
    expertReportDate: {
      day: {
        label: 'Day',
        selector: '#sdoExpertReportDate-day',
      },
      month: {
        label: 'Month',
        selector: '#sdoExpertReportDate-month',
      },
      year: {
        label: 'Year',
        selector: '#sdoExpertReportDate-year',
      },
    },
    expertReportDigitalPortal: {
      label: 'add the report uploaded to the Digital Portal',
      selector: '#sdoR2EvidenceAcousticEngineer_sdoExpertReportDigitalPortalTxt',
    },
    writtenQuestions: {
      label: 'c. Written questions',
      selector: '#sdoR2EvidenceAcousticEngineer_sdoWrittenQuestionsTxt',
    },
    writtenQuestionsDate: {
      day: {
        label: 'Day',
        selector: '#sdoWrittenQuestionsDate-day',
      },
      month: {
        label: 'Month',
        selector: '#sdoWrittenQuestionsDate-month',
      },
      year: {
        label: 'Year',
        selector: '#sdoWrittenQuestionsDate-year',
      },
    },
    writtenQuestionsDigitalPortal: {
      label: 'add the report uploaded to the Digital Portal',
      selector: '#sdoR2EvidenceAcousticEngineer_sdoWrittenQuestionsDigitalPortalTxt',
    },
    replies: {
      label1: 'd. Replies',
      label2: 'The expert shall',
      selector: '#sdoR2EvidenceAcousticEngineer_sdoRepliesTxt',
    },
    repliesDate: {
      day: {
        label: 'Day',
        selector: '#sdoRepliesDate-day',
      },
      month: {
        label: 'Month',
        selector: '#sdoRepliesDate-month',
      },
      year: {
        label: 'Year',
        selector: '#sdoRepliesDate-year',
      },
    },
    repliesDigitalPortal: {
      label: 'and the answers uploaded to the Digital Portal',
      selector: '#sdoR2EvidenceAcousticEngineer_sdoRepliesDigitalPortalTxt',
    },
    serviceOfOrder: {
      label: 'e. Service of order',
      selector: '#sdoR2EvidenceAcousticEngineer_sdoServiceOfOrderTxt',
    },
  },
  questionsToEntExpert: {
    writtenQuestions: {
      label: 'Written questions of any expert(s)',
      selector: '#sdoR2QuestionsToEntExpert_sdoWrittenQuestionsTxt',
    },
    writtenQuestionsDate: {
      day: {
        label: 'Day',
        selector: '#sdoWrittenQuestionsDate-day',
      },
      month: {
        label: 'Month',
        selector: '#sdoWrittenQuestionsDate-month',
      },
      year: {
        label: 'Year',
        selector: '#sdoWrittenQuestionsDate-year',
      },
    },
    writtenQuestionsDigitalPortal: {
      selector: '#sdoR2QuestionsToEntExpert_sdoWrittenQuestionsDigPortalTxt',
    },
    questionsShallBeAnswered: {
      label: 'Questions shall be answered by',
      selector: '#sdoR2QuestionsToEntExpert_sdoQuestionsShallBeAnsweredTxt',
    },
    questionsShallBeAnsweredDate: {
      day: {
        label: 'Day',
        selector: '#sdoQuestionsShallBeAnsweredDate-day',
      },
      month: {
        label: 'Month',
        selector: '#sdoQuestionsShallBeAnsweredDate-month',
      },
      year: {
        label: 'Year',
        selector: '#sdoQuestionsShallBeAnsweredDate-year',
      },
    },
    questionsShallBeAnsweredDigitalPortal: {
      label: 'and shall be uploaded by the party asking the questions to the Digital Portal',
      selector: '#sdoR2QuestionsToEntExpert_sdoShallBeUploadedTxt',
    },
  },
  scheduleOfLoss: {
    claimant: {
      label: 'Claimant',
      selector: '#sdoR2ScheduleOfLoss_sdoR2ScheduleOfLossClaimantText',
    },
    claimantDate: {
      day: {
        label: 'Day',
        selector: '#sdoR2ScheduleOfLossClaimantDate-day',
      },
      month: {
        label: 'Month',
        selector: '#sdoR2ScheduleOfLossClaimantDate-month',
      },
      year: {
        label: 'Year',
        selector: '#sdoR2ScheduleOfLossClaimantDate-year',
      },
    },
    defendant: {
      label: 'Defendant(s)',
      selector: '#sdoR2ScheduleOfLoss_sdoR2ScheduleOfLossDefendantText',
    },
    defendantDate: {
      day: {
        label: 'Day',
        selector: '#sdoR2ScheduleOfLossDefendantDate-day',
      },
      month: {
        label: 'Month',
        selector: '#sdoR2ScheduleOfLossDefendantDate-month',
      },
      year: {
        label: 'Year',
        selector: '#sdoR2ScheduleOfLossDefendantDate-year',
      },
    },
    percuniaryLoss: {
      selector: '#sdoR2ScheduleOfLoss_sdoR2ScheduleOfLossPecuniaryLossTxt',
    },
  },
  uploadOfDocuments: {
    label: 'Upload of documents to be relied upon',
    selector: '#sdoR2UploadOfDocuments_sdoUploadOfDocumentsTxt',
  },
  newDirection: {
    label: 'Enter the direction (Optional)',
    selector: '#sdoR2AddNewDirection_0_directionComment',
  },
  trial: {
    listFrom: {
      label: 'List from',
      day: {
        label: 'Day',
        selector: '#listFrom-day',
      },
      month: {
        label: 'Month',
        selector: '#listFrom-month',
      },
      year: {
        label: 'Year',
        selector: '#listFrom-year',
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
      selector: '#sdoR2Trial_physicalBundlePartyTxt',
    },
    hearingNotes: {
      label1: 'Hearing notes',
      label2: 'This is only seen by the listing officer (Optional)',
      selector: '#sdoR2Trial_hearingNotesTxt',
    },
    trialLengthDays: {
      label: 'Days',
      selector: '#sdoR2Trial_lengthListOther_trialLengthDays',
    },
    trialLengthHours: {
      label: 'Hours',
      selector: '#sdoR2Trial_lengthListOther_trialLengthHours',
    },
    trialLengthMinutes: {
      label: 'Minutes',
      selector: '#sdoR2Trial_lengthListOther_trialLengthMinutes',
    },
  },
  importantNotes: {
    importantNotesText: {
      selector: '#sdoR2ImportantNotesTxt',
    },
    importantNotesDate: {
      day: {
        label: 'Day',
        selector: '#sdoR2ImportantNotesDate-day',
      },
      month: {
        label: 'Month',
        selector: '#sdoR2ImportantNotesDate-month',
      },
      year: {
        label: 'Year',
        selector: '#sdoR2ImportantNotesDate-year',
      },
    },
  },
};

export const radioButtons = {
  witnessesOfFact: {
    restrictNumWitnesses: {
      label: 'Restrict number of witnesses',
      yes: {
        label: 'Yes',
        selector: '#sdoR2WitnessesOfFact_sdoR2RestrictWitness_isRestrictWitness_Yes',
      },
      no: {
        label: 'No',
        selector: '#sdoR2WitnessesOfFact_sdoR2RestrictWitness_isRestrictWitness_No',
      },
    },
    restrictNumPages: {
      label: 'Restrict number of pages',
      yes: {
        label: 'Yes',
        selector: '#sdoR2WitnessesOfFact_sdoRestrictPages_isRestrictPages_Yes',
      },
      no: {
        label: 'No',
        selector: '#sdoR2WitnessesOfFact_sdoRestrictPages_isRestrictPages_No',
      },
    },
  },
  questionsClaimantExpert: {
    label: 'Require application to rely on further medical evidence',
    yes: {
      label: 'Yes',
      selector:
        '#sdoR2QuestionsClaimantExpert_sdoApplicationToRelyOnFurther_doRequireApplicationToRely_Yes',
    },
    no: {
      label: 'No',
      selector:
        '#sdoR2QuestionsClaimantExpert_sdoApplicationToRelyOnFurther_doRequireApplicationToRely_No',
    },
  },
  scheduleOfLoss: {
    label: 'Claim for future pecuniary loss',
    yes: {
      label: 'Yes',
      selector: '#sdoR2ScheduleOfLoss_isClaimForPecuniaryLoss_Yes',
    },
    no: {
      label: 'No',
      selector: '#sdoR2ScheduleOfLoss_isClaimForPecuniaryLoss_No',
    },
  },
  trial: {
    trialOnOptions: {
      label: 'A trial will take place on',
      openDate: {
        label: 'First open date after',
        selector: '#sdoR2Trial_trialOnOptions-OPEN_DATE',
      },
      trialWindow: {
        label: 'Trial window',
        selector: '#sdoR2Trial_trialOnOptions-TRIAL_WINDOW',
      },
    },
    lengthOfTrial: {
      label: 'Length of trial',
      oneHour: {
        label: '1 hour',
        selector: '#sdoR2Trial_lengthList-ONE_HOUR',
      },
      oneHourThirtyMins: {
        label: '1.5 hours',
        selector: '#sdoR2Trial_lengthList-ONE_AND_HALF_HOUR',
      },
      twoHours: {
        label: '2 hours',
        selector: '#sdoR2Trial_lengthList-TWO_HOURS',
      },
      threeHours: {
        label: '3 hours',
        selector: '#sdoR2Trial_lengthList-THREE_HOURS',
      },
      fourHours: {
        label: '4 hours',
        selector: '#sdoR2Trial_lengthList-FOUR_HOURS',
      },
      fiveHours: {
        label: '5 hours',
        selector: '#sdoR2Trial_lengthList-FIVE_HOURS',
      },
      other: {
        label: 'Other',
        selector: '#sdoR2Trial_lengthList-OTHER',
      },
    },
    hearingLocation: {
      label1: 'Hearing location',
      label2: 'Select an option below',
      court: {
        selector: 'sdoR2Trial_hearingCourtLocationList_20262',
      },
      otherLocation: {
        label: 'Other location',
        selector: '#sdoR2Trial_hearingCourtLocationList_OTHER_LOCATION',
      },
    },
    methodOfHearing: {
      label: 'Method of hearing',
      hintText:
        'If you want to include any extra information or want to request a certain hearing platform, please include this in the Hearing notes section below',
      inPerson: {
        label: 'In Person',
        selector: '#sdoR2Trial_methodOfHearing_4b7299a5-1a24-4189-8d66-64addb46d2ed',
      },
      telephone: {
        label: 'Telephone',
        selector: '#sdoR2Trial_methodOfHearing_c800eeed-5e49-4e80-a396-0daf658b1176',
      },
      video: {
        label: 'Video',
        selector: '#sdoR2Trial_methodOfHearing_c0238969-d2f4-47c3-b6a1-833c9b2efde9',
      },
    },
    physicalTrialBundle: {
      label: 'Physical trial bundle',
      none: {
        label: 'None',
        selector: '#sdoR2Trial_physicalBundleOptions-NONE',
      },
      party: {
        label: 'Party',
        selector: '#sdoR2Trial_physicalBundleOptions-PARTY',
      },
    },
  },
};

export const checkboxes = {
  includeAltDisputeResolution: {
    label: 'Include in Order',
    selector: '#sdoAltDisputeResolution_includeInOrderToggle-INCLUDE',
  },
  includeVariationOfDirections: {
    label: 'Include in Order',
    selector: '#sdoVariationOfDirections_includeInOrderToggle-INCLUDE',
  },
  includeDisclosureOfDocuments: {
    label: 'Include in Order',
    selector: '#sdoR2DisclosureOfDocumentsToggle-INCLUDE',
  },
  includeWitnessOfFact: {
    label: 'Include in Order',
    selector: '#sdoR2SeparatorWitnessesOfFactToggle-INCLUDE',
  },
  includeExpertEvidence: {
    label: 'Include in Order',
    selector: '#sdoR2SeparatorExpertEvidenceToggle-INCLUDE',
  },
  includeAddendumReport: {
    label: 'Include in Order',
    selector: '#sdoR2SeparatorAddendumReportToggle-INCLUDE',
  },
  includeFurtherAudiogram: {
    label: 'Include in Order',
    selector: '#sdoR2SeparatorFurtherAudiogramToggle-INCLUDE',
  },
  includeQuestionsClaimantExpert: {
    label: 'Include in Order',
    selector: '#sdoR2SeparatorQuestionsClaimantExpertToggle-INCLUDE',
  },
  includePermissionDefendantRelyExpertEvidence: {
    label: 'Include in Order',
    selector: '#sdoR2SeparatorPermissionToRelyOnExpertToggle-INCLUDE',
  },
  includeEvidenceExpertAcousticEngineer: {
    label: 'Include in Order',
    selector: '#sdoR2SeparatorEvidenceAcousticEngineerToggle-INCLUDE',
  },
  includesQuestionsToEntExpert: {
    label: 'Include in Order',
    selector: '#sdoR2SeparatorQuestionsToEntExpertToggle-INCLUDE',
  },
  includeScheduleOfLoss: {
    label: 'Include in Order',
    selector: '#sdoR2ScheduleOfLossToggle-INCLUDE',
  },
  includeUploadOfDocuments: {
    label: 'Include in Order',
    selector: '#sdoR2SeparatorUploadOfDocumentsToggle-INCLUDE',
  },
  includeWelshLanguage: {
    label: 'Include in Order',
    selector: '#sdoR2NihlUseOfWelshIncludeInOrderToggle-INCLUDE',
  },
};

export const dropdowns = {
  trial: {
    label1: 'Alternative hearing location',
    label2: 'Select an option from the dropdown',
    selector: 'sdoR2Trial_altHearingCourtLocationList',
  },
};

export const buttons = {
  addNewDirection: {
    title: 'Add new',
    selector:
      "div[id='sdoR2AddNewDirection'] button[class='button write-collection-add-item__top']",
  },
};
