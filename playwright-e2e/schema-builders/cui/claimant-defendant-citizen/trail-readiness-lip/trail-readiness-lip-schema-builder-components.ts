import { z } from 'zod';
import partys from '../../../../constants/users/partys';
import { Party } from '../../../../models/users/partys';

const nonEmptyString = z.string().min(1);

const confirmTrialReady = (party: Party) => {
  if (party === partys.CLAIMANT_1) {
    return {
      trialReadyApplicant: nonEmptyString,
      applicantRevisedHearingRequirements: z.looseObject({
        revisedHearingRequirements: nonEmptyString,
        revisedHearingComments: nonEmptyString,
      }),
      applicantHearingOtherComments: z.looseObject({
        hearingOtherComments: nonEmptyString,
      }),
    };
  }

  if (party === partys.DEFENDANT_1) {
    return {
      trialReadyRespondent1: nonEmptyString,
      respondent1RevisedHearingRequirements: z.looseObject({
        revisedHearingRequirements: nonEmptyString,
        revisedHearingComments: nonEmptyString,
      }),
      respondent1HearingOtherComments: z.looseObject({
        hearingOtherComments: nonEmptyString,
      }),
    };
  }

  return {};
};

const trailReadinessSchemaBuilderComponents = {
  confirmTrialReady,
};

export default trailReadinessSchemaBuilderComponents;
