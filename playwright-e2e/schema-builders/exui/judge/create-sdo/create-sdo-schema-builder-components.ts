import { z } from 'zod';
import SdoType from '../../../../constants/ccd-events/sdo/sdo-type';

const sdo = (sdoType: SdoType) => {
  if(sdoType === SdoType.TRAIL || sdoType === SdoType.SMALL_TRACK_SUM) {
    return {
      drawDirectionsOrderRequired: z.string(),
      drawDirectionsOrder: z.looseObject({
        judgementSum: z.string(),
      }),
    };
  }

  return {
    drawDirectionsOrderRequired: z.string(),
  };
};

const claimsTrack = (sdoType: SdoType) => {
  if(sdoType === SdoType.FAST_TRACK) {
    return {
      claimsTrack: z.string(),
      trialAdditionalDirectionsForFastTrack: z.array(z.string()),
    };
  }

  if(sdoType === SdoType.TRAIL) {
    return {
      drawDirectionsOrderSmallClaims: z.string(),
    };
  }

  if(sdoType === SdoType.SMALL_TRACK_SUM) {
    return {
      drawDirectionsOrderSmallClaims: z.string(),
      drawDirectionsOrderSmallClaimsAdditionalDirections: z.array(z.string()),
    };
  }

  if(sdoType === SdoType.SMALL_TRACK_NO_SUM) {
    return {
      claimsTrack: z.string(),
      smallClaims: z.array(z.string()),
    };
  }

  return {};
};

const orderType = (sdoType: SdoType) => {
  if(sdoType === SdoType.TRAIL || sdoType === SdoType.DISPOSAL_HEARING) {
    return {
      orderType: z.string(),
      trialAdditionalDirectionsForFastTrack: z.array(z.string()),
    };
  }

  return {};
};

const fastTrack = (sdoType: SdoType) => {
  if(sdoType === SdoType.FAST_TRACK || sdoType === SdoType.TRAIL) {
    return {
      fastTrackJudgesRecital: z.looseObject({
        input: z.string(),
      }),
      fastTrackAllocation: z.looseObject({
        assignComplexityBand: z.string(),
        band: z.string(),
        reasons: z.string(),
      }),
      fastTrackDisclosureOfDocuments: z.looseObject({
        input1: z.string(),
        date1: z.string(),
        input2: z.string(),
        date2: z.string(),
        input3: z.string(),
      }),
      fastTrackWitnessOfFact: z.looseObject({
        input1: z.string(),
        input2: z.string(),
        input3: z.string(),
        input4: z.string(),
        input5: z.string(),
        input6: z.string(),
        input7: z.string(),
        input8: z.string(),
        date: z.string(),
        input9: z.string(),
      }),
      fastTrackSchedulesOfLoss: z.looseObject({
        input1: z.string(),
        date1: z.string(),
        input2: z.string(),
        date2: z.string(),
        input3: z.string(),
      }),
      fastTrackTrial: z.looseObject({
        input1: z.string(),
        date1: z.string(),
        date2: z.string(),
        input2: z.string(),
        input3: z.string(),
        type: z.array(z.string()),
      }),
      fastTrackMethod: z.string(),
      fastTrackMethodTelephoneHearing: z.string().optional(),
      fastTrackBuildingDispute: z.looseObject({
        input1: z.string(),
        input2: z.string(),
        input3: z.string(),
        date1: z.string(),
        input4: z.string(),
        date2: z.string(),
      }),
      fastTrackClinicalNegligence: z.looseObject({
        input1: z.string(),
        input2: z.string(),
        input3: z.string(),
        input4: z.string(),
      }),
      fastTrackCreditHire: z.looseObject({
        input1: z.string(),
        input2: z.string(),
        date1: z.string(),
        input3: z.string(),
        input4: z.string(),
        date2: z.string(),
        input5: z.string(),
        input6: z.string(),
        date3: z.string(),
        input7: z.string(),
        date4: z.string(),
        input8: z.string(),
      }),
      fastTrackHousingDisrepair: z.looseObject({
        input1: z.string(),
        input2: z.string(),
        input3: z.string(),
        date1: z.string(),
        input4: z.string(),
        date2: z.string(),
      }),
      fastTrackPersonalInjury: z.looseObject({
        input1: z.string(),
        date1: z.string(),
        input2: z.string(),
        date2: z.string(),
        input3: z.string(),
      }),
      fastTrackRoadTrafficAccident: z.looseObject({
        input: z.string(),
        date: z.string(),
      }),
      fastTrackAddNewDirections: z.array(z.looseObject({ directionComment: z.string() })),
      fastTrackNotes: z.looseObject({
        input: z.string(),
        date: z.string(),
      }),
      fastTrackHearingNotes: z.looseObject({
        input: z.string(),
      }),
    };
  }

  return {};
};

const smallClaims = (sdoType: SdoType) => {
  if(sdoType === SdoType.SMALL_TRACK_SUM || sdoType === SdoType.SMALL_TRACK_NO_SUM) {
    return {
      smallClaimsCreditHire: z.looseObject({
        input1: z.string(),
        input2: z.string(),
        input3: z.string(),
        input4: z.string(),
        input5: z.string(),
        input6: z.string(),
        input7: z.string(),
        input11: z.string(),
        date2: z.string(),
        date3: z.string(),
        date4: z.string(),
      }),
      sdoR2SmallClaimsUseOfWelshLanguage: z.looseObject({
        description: z.string(),
      }),
      sdoR2SmallClaimsWitnessStatementOther: z.looseObject({
        sdoStatementOfWitness: z.string(),
        isRestrictWitness: z.string(),
        isRestrictPages: z.string(),
        text: z.string(),
        deadlineDate: z.string(),
      }),
      smallClaimsDocuments: z.looseObject({
        input1: z.string(),
        input2: z.string(),
        deadlineDate: z.string(),
      }),
      smallClaimsFlightDelay: z.looseObject({
        relatedClaimsInput: z.string(),
        legalDocumentsInput: z.string(),
      }),
      smallClaimsHearing: z.looseObject({
        input1: z.string(),
        time: z.string(),
        input2: z.string(),
        dateFrom: z.string(),
      }),
      smallClaimsHousingDisrepair: z.looseObject({
        clauseA: z.string(),
        clauseB: z.string(),
        firstReportDateBy: z.string(),
        clauseCBeforeDate: z.string(),
        jointStatementDateBy: z.string(),
        clauseCAfterDate: z.string(),
        clauseD: z.string(),
        clauseE: z.string(),
      }),
      smallClaimsJudgementDeductionValue: z.looseObject({
        value: z.string(),
      }),
      smallClaimsJudgesRecital: z.looseObject({
        input: z.string(),
      }),
      smallClaimsMethod: z.string(),
      smallClaimsMethodInPerson: z.looseObject({
        list_items: z.array(
          z.looseObject({
            code: z.string(),
            label: z.string(),
          }),
        ),
        value: z.looseObject({
          code: z.string(),
          label: z.string(),
        }),
      }),
      smallClaimsNotes: z.looseObject({
        input: z.string(),
        date: z.string(),
      }),
      smallClaimsPPI: z.looseObject({
        ppiDate: z.string(),
        text: z.string(),
      }),
      smallClaimsRoadTrafficAccident: z.looseObject({
        input: z.string(),
      }),
      smallClaimsWitnessStatement: z.looseObject({
        input1: z.string(),
        input2: z.string(),
        input3: z.string(),
        input4: z.string(),
      }),
      smallClaimsAddNewDirections: z.array(z.looseObject({ directionComment: z.string() })),
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
  smallClaims,
  orderPreview,
};
