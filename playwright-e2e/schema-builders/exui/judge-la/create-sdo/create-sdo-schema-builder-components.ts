import { z } from 'zod';
import SdoType from '../../../../constants/ccd-events/sdo/sdo-type';

const nonEmptyString = z.string().min(1);

const sdo = (sdoType: SdoType) => {
  if (
    sdoType === SdoType.TRAIL ||
    sdoType === SdoType.SMALL_TRACK_SUM ||
    sdoType === SdoType.TRAIL_NIHL
  ) {
    return {
      drawDirectionsOrderRequired: nonEmptyString,
      drawDirectionsOrder: z.looseObject({
        judgementSum: nonEmptyString,
      }),
    };
  }

  return {
    drawDirectionsOrderRequired: nonEmptyString,
  };
};

const claimsTrack = (sdoType: SdoType) => {
  if (sdoType === SdoType.FAST_TRACK) {
    return {
      claimsTrack: nonEmptyString,
      fastClaims: z.array(nonEmptyString),
    };
  }

  if (sdoType === SdoType.FAST_TRACK_NIHL) {
    return {
      claimsTrack: nonEmptyString,
      fastClaims: z.array(nonEmptyString),
    };
  }

  if (sdoType === SdoType.TRAIL || sdoType === SdoType.TRAIL_NIHL) {
    return {
      drawDirectionsOrderSmallClaims: nonEmptyString,
    };
  }

  if (sdoType === SdoType.SMALL_TRACK_SUM || sdoType === SdoType.SMALL_TRACK_SUM_DRH) {
    return {
      drawDirectionsOrderSmallClaims: nonEmptyString,
      drawDirectionsOrderSmallClaimsAdditionalDirections: z.array(nonEmptyString),
    };
  }

  if (sdoType === SdoType.SMALL_TRACK_NO_SUM || sdoType === SdoType.SMALL_TRACK_NO_SUM_DRH) {
    return {
      claimsTrack: nonEmptyString,
      smallClaims: z.array(nonEmptyString),
    };
  }

  return {};
};

const orderType = (sdoType: SdoType) => {
  if (sdoType === SdoType.TRAIL || sdoType === SdoType.TRAIL_NIHL) {
    return {
      orderType: nonEmptyString,
      trialAdditionalDirectionsForFastTrack: z.array(nonEmptyString),
    };
  }

  if (sdoType === SdoType.DISPOSAL_HEARING) {
    return {
      orderType: nonEmptyString,
    };
  }

  return {};
};

const fastTrack = (sdoType: SdoType) => {
  if (sdoType === SdoType.FAST_TRACK || sdoType === SdoType.TRAIL) {
    return {
      fastTrackJudgesRecital: z.looseObject({
        input: nonEmptyString,
      }),
      fastTrackAllocation: z.looseObject({
        assignComplexityBand: nonEmptyString,
        band: nonEmptyString,
        reasons: nonEmptyString,
      }),
      fastTrackDisclosureOfDocuments: z.looseObject({
        input1: nonEmptyString,
        date1: nonEmptyString,
        input2: nonEmptyString,
        date2: nonEmptyString,
        input3: nonEmptyString,
      }),
      sdoR2FastTrackWitnessOfFact: z.looseObject({
        sdoStatementOfWitness: nonEmptyString,
        sdoWitnessDeadline: nonEmptyString,
        sdoWitnessDeadlineDate: nonEmptyString,
        sdoWitnessDeadlineText: nonEmptyString,
        sdoR2RestrictWitness: z.looseObject({
          isRestrictWitness: nonEmptyString,
        }),
        sdoRestrictPages: z.looseObject({
          isRestrictPages: nonEmptyString,
          restrictNoOfPagesDetails: z.looseObject({
            noOfPages: z.number(),
            fontDetails: nonEmptyString,
            witnessShouldNotMoreThanTxt: nonEmptyString,
          }),
        }),
      }),
      fastTrackSchedulesOfLoss: z.looseObject({
        input1: nonEmptyString,
        date1: nonEmptyString,
        input2: nonEmptyString,
        date2: nonEmptyString,
        input3: nonEmptyString,
      }),
      fastTrackTrial: z.looseObject({
        input1: nonEmptyString,
        date1: nonEmptyString,
        date2: nonEmptyString,
        input2: nonEmptyString,
        input3: nonEmptyString,
        type: z.array(nonEmptyString),
      }),
      fastTrackMethod: nonEmptyString,
      fastTrackMethodTelephoneHearing: nonEmptyString.optional(),
      fastTrackBuildingDispute: z.looseObject({
        input1: nonEmptyString,
        input2: nonEmptyString,
        input3: nonEmptyString,
        date1: nonEmptyString,
        input4: nonEmptyString,
        date2: nonEmptyString,
      }),
      fastTrackClinicalNegligence: z.looseObject({
        input1: nonEmptyString,
        input2: nonEmptyString,
        input3: nonEmptyString,
        input4: nonEmptyString,
      }),
      fastTrackCreditHire: z.looseObject({
        input1: nonEmptyString,
        input2: nonEmptyString,
        date1: nonEmptyString,
        input3: nonEmptyString,
        input4: nonEmptyString,
        date2: nonEmptyString,
        input5: nonEmptyString,
        input6: nonEmptyString,
        date3: nonEmptyString,
        input7: nonEmptyString,
        date4: nonEmptyString,
        input8: nonEmptyString,
      }),
      // fastTrackHousingDisrepair: z.looseObject({
      //   input1: nonEmptyString,
      //   input2: nonEmptyString,
      //   input3: nonEmptyString,
      //   date1: nonEmptyString,
      //   input4: nonEmptyString,
      //   date2: nonEmptyString,
      // }),
      fastTrackPersonalInjury: z.looseObject({
        input1: nonEmptyString,
        date1: nonEmptyString,
        input2: nonEmptyString,
        date2: nonEmptyString,
        input3: nonEmptyString,
      }),
      fastTrackRoadTrafficAccident: z.looseObject({
        input: nonEmptyString,
        date: nonEmptyString,
      }),
      fastTrackAddNewDirections: z.array(
        z.looseObject({
          id: nonEmptyString,
          value: z.looseObject({
            directionComment: nonEmptyString,
          }),
        }),
      ),
      fastTrackNotes: z.looseObject({
        input: nonEmptyString,
        date: nonEmptyString,
      }),
      fastTrackHearingNotes: z.looseObject({
        input: nonEmptyString,
      }),
      sdoR2FastTrackUseOfWelshLanguage: z.strictObject({
        description: nonEmptyString,
      }),
    };
  }

  return {};
};

const smallClaims = (sdoType: SdoType) => {
  if (sdoType === SdoType.SMALL_TRACK_SUM || sdoType === SdoType.SMALL_TRACK_NO_SUM) {
    return {
      smallClaimsPenalNotice: nonEmptyString,
      smallClaimsCreditHire: z.looseObject({
        input1: nonEmptyString,
        input2: nonEmptyString,
        input3: nonEmptyString,
        input4: nonEmptyString,
        input5: nonEmptyString,
        input6: nonEmptyString,
        input7: nonEmptyString,
        input11: nonEmptyString,
        date2: nonEmptyString,
        date3: nonEmptyString,
        date4: nonEmptyString,
      }),
      sdoR2SmallClaimsUseOfWelshLanguage: z.looseObject({
        description: nonEmptyString,
      }),
      sdoR2SmallClaimsWitnessStatementOther: z.looseObject({
        sdoStatementOfWitness: nonEmptyString,
        isRestrictWitness: nonEmptyString,
        isRestrictPages: nonEmptyString,
        text: nonEmptyString,
        deadlineDate: nonEmptyString,
      }),
      smallClaimsDocuments: z.looseObject({
        input1: nonEmptyString,
        input2: nonEmptyString,
        deadlineDate: nonEmptyString,
      }),
      smallClaimsFlightDelay: z.looseObject({
        relatedClaimsInput: nonEmptyString,
        legalDocumentsInput: nonEmptyString,
      }),
      smallClaimsHearing: z.looseObject({
        input1: nonEmptyString,
        time: nonEmptyString,
        input2: nonEmptyString,
        dateFrom: nonEmptyString,
      }),
      smallClaimsHousingDisrepair: z.looseObject({
        clauseA: nonEmptyString,
        clauseB: nonEmptyString,
        firstReportDateBy: nonEmptyString,
        clauseCBeforeDate: nonEmptyString,
        jointStatementDateBy: nonEmptyString,
        clauseCAfterDate: nonEmptyString,
        clauseD: nonEmptyString,
        clauseE: nonEmptyString,
      }),
      sdoHearingNotes: z.strictObject({ input: nonEmptyString }),
      hearingMethodValuesSmallClaims: z.looseObject({}),
      smallClaimsJudgementDeductionValue: z.looseObject({
        value: nonEmptyString,
      }),
      smallClaimsJudgesRecital: z.looseObject({
        input: nonEmptyString,
      }),
      smallClaimsMethod: nonEmptyString,
      smallClaimsMethodInPerson: z.looseObject({
        value: z.looseObject({
          code: nonEmptyString,
          label: nonEmptyString,
        }),
      }),
      smallClaimsNotes: z.looseObject({
        input: nonEmptyString,
        date: nonEmptyString,
      }),
      smallClaimsPPI: z.looseObject({
        ppiDate: nonEmptyString,
        text: nonEmptyString,
      }),
      smallClaimsRoadTrafficAccident: z.looseObject({
        input: nonEmptyString,
      }),
      smallClaimsAddNewDirections: z.array(
        z.looseObject({
          id: nonEmptyString,
          value: z.looseObject({
            directionComment: nonEmptyString,
          }),
        }),
      ),
    };
  }

  return {};
};

const sdoR2FastTrack = (sdoType: SdoType) => {
  if (sdoType === SdoType.FAST_TRACK_NIHL || sdoType === SdoType.TRAIL_NIHL) {
    return {
      sdoFastTrackJudgesRecital: z.looseObject({
        input: nonEmptyString,
      }),
      sdoR2DisclosureOfDocuments: z.looseObject({
        standardDisclosureTxt: nonEmptyString,
        standardDisclosureDate: nonEmptyString,
        inspectionTxt: nonEmptyString,
        inspectionDate: nonEmptyString,
        requestsWillBeCompiledLabel: nonEmptyString,
      }),
      sdoR2WitnessesOfFact: z.looseObject({
        sdoStatementOfWitness: nonEmptyString,
        sdoWitnessDeadline: nonEmptyString,
        sdoWitnessDeadlineDate: nonEmptyString,
        sdoWitnessDeadlineText: nonEmptyString,
        sdoR2RestrictWitness: z.looseObject({
          isRestrictWitness: nonEmptyString,
        }),
        sdoRestrictPages: z.looseObject({
          isRestrictPages: nonEmptyString,
        }),
      }),
      sdoR2ExpertEvidence: z.looseObject({
        sdoClaimantPermissionToRelyTxt: nonEmptyString,
      }),
      sdoR2AddendumReport: z.looseObject({
        sdoAddendumReportTxt: nonEmptyString,
        sdoAddendumReportDate: nonEmptyString,
      }),
      sdoR2FurtherAudiogram: z.looseObject({
        sdoClaimantShallUndergoTxt: nonEmptyString,
        sdoClaimantShallUndergoDate: nonEmptyString,
        sdoServiceReportTxt: nonEmptyString,
        sdoServiceReportDate: nonEmptyString,
      }),
      sdoR2QuestionsClaimantExpert: z.looseObject({
        sdoDefendantMayAskTxt: nonEmptyString,
        sdoDefendantMayAskDate: nonEmptyString,
        sdoQuestionsShallBeAnsweredTxt: nonEmptyString,
        sdoQuestionsShallBeAnsweredDate: nonEmptyString,
        sdoUploadedToDigitalPortalTxt: nonEmptyString,
        sdoApplicationToRelyOnFurther: z.looseObject({
          doRequireApplicationToRely: nonEmptyString,
        }),
      }),
      sdoR2PermissionToRelyOnExpert: z.looseObject({
        sdoPermissionToRelyOnExpertTxt: nonEmptyString,
        sdoPermissionToRelyOnExpertDate: nonEmptyString,
        sdoJointMeetingOfExpertsTxt: nonEmptyString,
        sdoJointMeetingOfExpertsDate: nonEmptyString,
        sdoUploadedToDigitalPortalTxt: nonEmptyString,
      }),
      sdoR2EvidenceAcousticEngineer: z.looseObject({
        sdoEvidenceAcousticEngineerTxt: nonEmptyString,
        sdoInstructionOfTheExpertTxt: nonEmptyString,
        sdoInstructionOfTheExpertDate: nonEmptyString,
        sdoInstructionOfTheExpertTxtArea: nonEmptyString,
        sdoExpertReportTxt: nonEmptyString,
        sdoExpertReportDate: nonEmptyString,
        sdoExpertReportDigitalPortalTxt: nonEmptyString,
        sdoWrittenQuestionsTxt: nonEmptyString,
        sdoWrittenQuestionsDate: nonEmptyString,
        sdoWrittenQuestionsDigitalPortalTxt: nonEmptyString,
        sdoRepliesTxt: nonEmptyString,
        sdoRepliesDate: nonEmptyString,
        sdoRepliesDigitalPortalTxt: nonEmptyString,
        sdoServiceOfOrderTxt: nonEmptyString,
      }),
      sdoR2QuestionsToEntExpert: z.looseObject({
        sdoWrittenQuestionsTxt: nonEmptyString,
        sdoWrittenQuestionsDate: nonEmptyString,
        sdoWrittenQuestionsDigPortalTxt: nonEmptyString,
        sdoQuestionsShallBeAnsweredTxt: nonEmptyString,
        sdoQuestionsShallBeAnsweredDate: nonEmptyString,
        sdoShallBeUploadedTxt: nonEmptyString,
      }),
      sdoR2ScheduleOfLoss: z.looseObject({
        sdoR2ScheduleOfLossClaimantText: nonEmptyString,
        sdoR2ScheduleOfLossClaimantDate: nonEmptyString,
        sdoR2ScheduleOfLossDefendantText: nonEmptyString,
        sdoR2ScheduleOfLossDefendantDate: nonEmptyString,
        isClaimForPecuniaryLoss: nonEmptyString,
      }),
      sdoR2UploadOfDocuments: z.looseObject({
        sdoUploadOfDocumentsTxt: nonEmptyString,
      }),
      sdoR2Trial: z.looseObject({
        trialOnOptions: nonEmptyString,
        lengthList: nonEmptyString,
        hearingCourtLocationList: z.looseObject({
          value: z.looseObject({}),
        }),
        methodOfHearing: z.looseObject({
          list_items: z.array(z.looseObject({})),
          value: z.looseObject({}),
        }),
        physicalBundleOptions: nonEmptyString,
        physicalBundlePartyTxt: nonEmptyString,
        sdoR2TrialFirstOpenDateAfter: z.looseObject({
          listFrom: nonEmptyString,
        }),
        hearingNotesTxt: nonEmptyString,
      }),
      sdoR2NihlUseOfWelshLanguage: z.looseObject({
        description: nonEmptyString,
      }),
      sdoR2ImportantNotesTxt: nonEmptyString,
      sdoR2ImportantNotesDate: nonEmptyString,
    };
  }

  return {};
};

const sdoR2SmallClaims = (sdoType: SdoType) => {
  if (sdoType === SdoType.SMALL_TRACK_SUM_DRH || sdoType === SdoType.SMALL_TRACK_NO_SUM_DRH) {
    return {
      sdoR2SmallClaimsJudgesRecital: z.looseObject({
        input: nonEmptyString,
      }),
      sdoR2SmallClaimsPPI: z.looseObject({
        ppiDate: nonEmptyString,
        text: nonEmptyString,
      }),
      sdoR2SmallClaimsWitnessStatements: z.looseObject({
        sdoStatementOfWitness: nonEmptyString,
        deadlineDate: nonEmptyString,
        isRestrictWitness: nonEmptyString,
        isRestrictPages: nonEmptyString,
        text: nonEmptyString,
      }),
      sdoR2SmallClaimsUploadDoc: z.looseObject({
        sdoUploadOfDocumentsTxt: nonEmptyString,
      }),
      sdoR2SmallClaimsHearing: z.looseObject({
        trialOnOptions: nonEmptyString,
        lengthList: nonEmptyString,
        hearingCourtLocationList: z.looseObject({
          list_items: z.array(z.looseObject({})),
          value: z.looseObject({}),
        }),
        methodOfHearing: z.looseObject({
          list_items: z.array(z.looseObject({})),
          value: z.looseObject({}),
        }),
        physicalBundleOptions: nonEmptyString,
        hearingNotesTxt: nonEmptyString,
        sdoR2SmallClaimsHearingFirstOpenDateAfter: z.looseObject({
          listFrom: nonEmptyString,
        }),
        sdoR2SmallClaimsBundleOfDocs: z.looseObject({
          physicalBundlePartyTxt: nonEmptyString,
        }),
      }),
      sdoR2DrhUseOfWelshLanguage: z.looseObject({
        description: nonEmptyString,
      }),
      sdoR2SmallClaimsImpNotes: z.looseObject({
        text: nonEmptyString,
        date: nonEmptyString,
      }),
    };
  }

  return {};
};

const orderPreview = {};

export default {
  sdo,
  claimsTrack,
  orderType,
  fastTrack,
  sdoR2FastTrack,
  sdoR2SmallClaims,
  smallClaims,
  orderPreview,
};
