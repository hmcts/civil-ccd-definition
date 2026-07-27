import { z } from 'zod';
import SdoDJType from '../../../../constants/ccd-events/sdo-dj/sdo-dj-type';

const nonEmptyString = z.string().min(1);

const caseManagementOrder = (sdoDJType: SdoDJType) => {
  if (sdoDJType === SdoDJType.DISPOSAL_HEARING) {
    return {
      caseManagementOrderSelection: nonEmptyString,
    };
  }

  if (sdoDJType === SdoDJType.TRIAL) {
    return {
      caseManagementOrderSelection: nonEmptyString,
      caseManagementOrderAdditional: z.array(nonEmptyString),
    };
  }

  return {};
};

const disposalHearing = (sdoDJType: SdoDJType) => {
  if (sdoDJType === SdoDJType.DISPOSAL_HEARING) {
    return {
      disposalHearingJudgesRecitalDJ: z.looseObject({
        input: nonEmptyString,
        judgeNameTitle: nonEmptyString,
      }),
      disposalHearingDisclosureOfDocumentsDJ: z.looseObject({
        input: nonEmptyString,
        date: nonEmptyString,
      }),
      disposalHearingWitnessOfFactDJ: z.looseObject({
        input1: nonEmptyString,
        date1: nonEmptyString,
        input2: nonEmptyString,
        input3: nonEmptyString,
        date2: nonEmptyString,
        input4: nonEmptyString,
      }),
      disposalHearingMedicalEvidenceDJ: z.looseObject({
        input1: nonEmptyString,
      }),
      disposalHearingQuestionsToExpertsDJ: z.looseObject({
        date: nonEmptyString,
      }),
      disposalHearingSchedulesOfLossDJ: z.looseObject({
        input1: nonEmptyString,
        date1: nonEmptyString,
        input2: nonEmptyString,
        date2: nonEmptyString,
        input3: nonEmptyString,
        date3: nonEmptyString,
        inputText4: nonEmptyString,
      }),
      disposalHearingFinalDisposalHearingTimeDJ: z.looseObject({
        input: nonEmptyString,
        date: nonEmptyString,
        time: nonEmptyString,
      }),
      hearingMethodValuesDisposalHearingDJ: z.looseObject({
        list_items: z.array(z.looseObject({})),
        value: z.looseObject({}),
      }),
      disposalHearingMethodInPersonDJ: z.looseObject({
        list_items: z.array(z.looseObject({})),
        value: z.looseObject({}),
      }),
      disposalHearingHearingNotesDJ: z.looseObject({
        input: nonEmptyString,
      }),
      sdoR2DisposalHearingWelshLanguageDJ: z.looseObject({
        description: nonEmptyString,
      }),
      disposalHearingOrderMadeWithoutHearingDJ: z.looseObject({
        input: nonEmptyString,
      }),
      disposalHearingAddNewDirectionsDJ: z.array(
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

const trailHearing = (sdoDJType: SdoDJType) => {
  if (sdoDJType === SdoDJType.TRIAL) {
    return {
      trialHearingJudgesRecitalDJ: z.looseObject({
        input: nonEmptyString,
        judgeNameTitle: nonEmptyString,
      }),
      trialHearingDisclosureOfDocumentsDJ: z.looseObject({
        input1: nonEmptyString,
        date1: nonEmptyString,
        input2: nonEmptyString,
        date2: nonEmptyString,
        input3: nonEmptyString,
      }),
      trialHearingWitnessOfFactDJ: z.looseObject({
        input1: nonEmptyString,
        input2: nonEmptyString,
        input3: nonEmptyString,
        input4: nonEmptyString,
        input5: nonEmptyString,
        input6: nonEmptyString,
        input7: nonEmptyString,
        input8: nonEmptyString,
        date1: nonEmptyString,
        input9: nonEmptyString,
      }),
      trialHearingSchedulesOfLossDJ: z.looseObject({
        input1: nonEmptyString,
        date1: nonEmptyString,
        input2: nonEmptyString,
        date2: nonEmptyString,
        input3: nonEmptyString,
      }),
      trialHearingTimeDJ: z.looseObject({
        date1: nonEmptyString,
        date2: nonEmptyString,
        hearingTimeEstimate: nonEmptyString,
        helpText1: nonEmptyString,
        helpText2: nonEmptyString,
      }),
      hearingMethodValuesTrialHearingDJ: z.looseObject({
        list_items: z.array(z.looseObject({})),
        value: z.looseObject({}),
      }),
      trialHearingMethodInPersonDJ: z.looseObject({
        list_items: z.array(z.looseObject({})),
        value: z.looseObject({}),
      }),
      trialHearingHearingNotesDJ: z.looseObject({
        input: nonEmptyString,
      }),
      sdoR2TrialWelshLanguageDJ: z.looseObject({
        description: nonEmptyString,
      }),
      trialOrderMadeWithoutHearingDJ: z.looseObject({
        input: nonEmptyString,
      }),
      trialBuildingDispute: z.looseObject({
        input1: nonEmptyString,
        input2: nonEmptyString,
        input3: nonEmptyString,
        date1: nonEmptyString,
        input4: nonEmptyString,
        date2: nonEmptyString,
      }),
      trialClinicalNegligence: z.looseObject({
        input1: nonEmptyString,
        input2: nonEmptyString,
        input3: nonEmptyString,
        input4: nonEmptyString,
      }),
      sdoDJR2TrialCreditHire: z.looseObject({
        input1: nonEmptyString,
        input6: nonEmptyString,
        date3: nonEmptyString,
        input7: nonEmptyString,
        date4: nonEmptyString,
        input8: nonEmptyString,
        sdoDJR2TrialCreditHireDetails: z.looseObject({
          input2: nonEmptyString,
          input4: nonEmptyString,
          input5: nonEmptyString,
          date2: nonEmptyString,
        }),
      }),
      trialHousingDisrepair: z.looseObject({
        clauseA: nonEmptyString,
        clauseB: nonEmptyString,
        firstReportDateBy: nonEmptyString,
        clauseCBeforeDate: nonEmptyString,
        jointStatementDateBy: nonEmptyString,
        clauseCAfterDate: nonEmptyString,
        clauseD: nonEmptyString,
        clauseE: nonEmptyString,
      }),
      trialPPI: z.looseObject({
        ppiDate: nonEmptyString,
        text: nonEmptyString,
      }),
      trialPersonalInjury: z.looseObject({
        input1: nonEmptyString,
        input2: nonEmptyString,
        date2: nonEmptyString,
        input3: nonEmptyString,
        date3: nonEmptyString,
        input4: nonEmptyString,
        date4: nonEmptyString,
      }),
      trialRoadTrafficAccident: z.looseObject({
        input: nonEmptyString,
        date1: nonEmptyString,
      }),
      trialHearingAddNewDirectionsDJ: z.array(
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

const orderPreview = {};

export default {
  caseManagementOrder,
  disposalHearing,
  trailHearing,
  orderPreview,
};
