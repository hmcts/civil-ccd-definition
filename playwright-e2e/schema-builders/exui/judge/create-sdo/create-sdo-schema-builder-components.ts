import { z } from 'zod';

const sdo = {
  drawDirectionsOrderRequired: z.string(),
  drawDirectionsOrder: z.looseObject({
    judgementSum: z.string(),
  }),
};

const claimsTrack = {
  drawDirectionsOrderSmallClaims: z.string(),
};

const orderType = {
  orderType: z.string(),
  orderTypeTrialAdditionalDirections: z.array(z.string()),
};

const fastTrack = {
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
    input2: z.string(),
    input3: z.string(),
  }),
  sdoR2FastTrackWitnessOfFact: z.looseObject({
    sdoStatementOfWitness: z.string(),
    sdoWitnessDeadline: z.string(),
    sdoWitnessDeadlineText: z.string(),
  }),
  fastTrackSchedulesOfLoss: z.looseObject({
    input1: z.string(),
    input2: z.string(),
    input3: z.string(),
  }),
  fastTrackTrial: z.looseObject({
    input1: z.string(),
    input2: z.string(),
    input3: z.string(),
  }),
  fastTrackMethod: z.string(),
  fastTrackMethodTelephoneHearing: z.string().optional(),
  fastTrackBuildingDispute: z.looseObject({
    input1: z.string(),
    input2: z.string(),
    input3: z.string(),
    input4: z.string(),
  }),
  fastTrackClinicalNegligence: z.looseObject({
    input1: z.string(),
    input2: z.string(),
    input3: z.string(),
    input4: z.string(),
  }),
  sdoR2FastTrackCreditHire: z.looseObject({
    input1: z.string(),
    input5: z.string(),
    input6: z.string(),
    input7: z.string(),
    input8: z.string(),
  }),
  fastTrackHousingDisrepair: z.looseObject({
    input1: z.string(),
    input2: z.string(),
    input3: z.string(),
    input4: z.string(),
  }),
  fastTrackPersonalInjury: z.looseObject({
    input1: z.string(),
    input2: z.string(),
    input3: z.string(),
  }),
  fastTrackRoadTrafficAccident: z.looseObject({
    input: z.string(),
  }),
  fastTrackAddNewDirections: z.array(z.looseObject({ directionComment: z.string() })),
  fastTrackNotes: z.looseObject({
    input: z.string(),
  }),
  fastTrackHearingNotes: z.looseObject({
    input: z.string(),
  }),
  setSmallClaimsFlag: z.string(),
  setFastTrackFlag: z.string(),
};

const smallClaims = {
  smallClaimsCreditHire: z.looseObject({
    input1: z.string(),
    input2: z.string(),
    input3: z.string(),
    input4: z.string(),
    input5: z.string(),
    input6: z.string(),
    input7: z.string(),
    input11: z.string(),
  }),
  sdoR2SmallClaimsUseOfWelshLanguage: z.looseObject({
    description: z.string(),
  }),
  sdoR2SmallClaimsWitnessStatementOther: z.looseObject({
    sdoStatementOfWitness: z.string(),
    isRestrictWitness: z.string(),
    isRestrictPages: z.string(),
    text: z.string(),
  }),
  smallClaimsDocuments: z.looseObject({
    input1: z.string(),
    input2: z.string(),
  }),
  smallClaimsFlightDelay: z.looseObject({
    relatedClaimsInput: z.string(),
    legalDocumentsInput: z.string(),
  }),
  smallClaimsHearing: z.looseObject({
    input1: z.string(),
    input2: z.string(),
    time: z.string(),
  }),
  smallClaimsHousingDisrepair: z.looseObject({
    clauseA: z.string(),
    clauseB: z.string(),
    clauseCBeforeDate: z.string(),
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
    list_items: z.array(z.looseObject({ code: z.string(), label: z.string() })),
    value: z.looseObject({
      code: z.string(),
      label: z.string(),
    }),
  }),
  smallClaimsNotes: z.looseObject({
    input: z.string(),
  }),
  smallClaimsPPI: z.looseObject({
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

const createSdoSchemaBuilderComponents = {
  sdo,
  claimsTrack,
  orderType,
  fastTrack,
  smallClaims,
};

export default createSdoSchemaBuilderComponents;
