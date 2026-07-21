import { z } from 'zod';
import SdoDJType from '../../../../constants/ccd-events/sdo-dj/sdo-dj-type';

const caseManagementOrder = (sdoDJType: SdoDJType) => {
  if (sdoDJType === SdoDJType.DISPOSAL_HEARING) {
    return {
      caseManagementOrderSelection: z.string(),
    };
  }

  if (sdoDJType === SdoDJType.TRIAL) {
    return {
      caseManagementOrderSelection: z.string(),
      caseManagementOrderAdditional: z.array(z.string()),
    };
  }

  return {};
};

const disposalHearing = (sdoDJType: SdoDJType) => {
  if (sdoDJType === SdoDJType.DISPOSAL_HEARING) {
    return {
      disposalHearingJudgesRecitalDJ: z.looseObject({
        input: z.string(),
        judgeNameTitle: z.string(),
      }),
      disposalHearingDisclosureOfDocumentsDJ: z.looseObject({
        input: z.string(),
        date: z.string(),
      }),
      disposalHearingWitnessOfFactDJ: z.looseObject({
        input1: z.string(),
        date1: z.string(),
        input2: z.string(),
        input3: z.string(),
        date2: z.string(),
        input4: z.string(),
      }),
      disposalHearingMedicalEvidenceDJ: z.looseObject({
        input1: z.string(),
      }),
      disposalHearingQuestionsToExpertsDJ: z.looseObject({
        date: z.string(),
      }),
      disposalHearingSchedulesOfLossDJ: z.looseObject({
        input1: z.string(),
        date1: z.string(),
        input2: z.string(),
        date2: z.string(),
        input3: z.string(),
        date3: z.string(),
        inputText4: z.string(),
      }),
      disposalHearingFinalDisposalHearingTimeDJ: z.looseObject({
        input: z.string(),
        date: z.string(),
        time: z.string(),
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
        input: z.string(),
      }),
      sdoR2DisposalHearingWelshLanguageDJ: z.looseObject({
        description: z.string(),
      }),
      disposalHearingOrderMadeWithoutHearingDJ: z.looseObject({
        input: z.string(),
      }),
      disposalHearingAddNewDirectionsDJ: z.array(
        z.looseObject({
          id: z.string(),
          value: z.looseObject({
            directionComment: z.string(),
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
        input: z.string(),
        judgeNameTitle: z.string(),
      }),
      trialHearingDisclosureOfDocumentsDJ: z.looseObject({
        input1: z.string(),
        date1: z.string(),
        input2: z.string(),
        date2: z.string(),
        input3: z.string(),
      }),
      trialHearingWitnessOfFactDJ: z.looseObject({
        input1: z.string(),
        input2: z.string(),
        input3: z.string(),
        input4: z.string(),
        input5: z.string(),
        input6: z.string(),
        input7: z.string(),
        input8: z.string(),
        date1: z.string(),
        input9: z.string(),
      }),
      trialHearingSchedulesOfLossDJ: z.looseObject({
        input1: z.string(),
        date1: z.string(),
        input2: z.string(),
        date2: z.string(),
        input3: z.string(),
      }),
      trialHearingTimeDJ: z.looseObject({
        date1: z.string(),
        date2: z.string(),
        hearingTimeEstimate: z.string(),
        helpText1: z.string(),
        helpText2: z.string(),
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
        input: z.string(),
      }),
      sdoR2TrialWelshLanguageDJ: z.looseObject({
        description: z.string(),
      }),
      trialOrderMadeWithoutHearingDJ: z.looseObject({
        input: z.string(),
      }),
      trialBuildingDispute: z.looseObject({
        input1: z.string(),
        input2: z.string(),
        input3: z.string(),
        date1: z.string(),
        input4: z.string(),
        date2: z.string(),
      }),
      trialClinicalNegligence: z.looseObject({
        input1: z.string(),
        input2: z.string(),
        input3: z.string(),
        input4: z.string(),
      }),
      sdoDJR2TrialCreditHire: z.looseObject({
        input1: z.string(),
        input6: z.string(),
        date3: z.string(),
        input7: z.string(),
        date4: z.string(),
        input8: z.string(),
        sdoDJR2TrialCreditHireDetails: z.looseObject({
          input2: z.string(),
          input4: z.string(),
          input5: z.string(),
          date2: z.string(),
        }),
      }),
      trialHousingDisrepair: z.looseObject({
        clauseA: z.string(),
        clauseB: z.string(),
        firstReportDateBy: z.string(),
        clauseCBeforeDate: z.string(),
        jointStatementDateBy: z.string(),
        clauseCAfterDate: z.string(),
        clauseD: z.string(),
        clauseE: z.string(),
      }),
      trialPPI: z.looseObject({
        ppiDate: z.string(),
        text: z.string(),
      }),
      trialPersonalInjury: z.looseObject({
        input1: z.string(),
        input2: z.string(),
        date2: z.string(),
        input3: z.string(),
        date3: z.string(),
        input4: z.string(),
        date4: z.string(),
      }),
      trialRoadTrafficAccident: z.looseObject({
        input: z.string(),
        date1: z.string(),
      }),
      trialHearingAddNewDirectionsDJ: z.array(
        z.looseObject({
          id: z.string(),
          value: z.looseObject({
            directionComment: z.string(),
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
