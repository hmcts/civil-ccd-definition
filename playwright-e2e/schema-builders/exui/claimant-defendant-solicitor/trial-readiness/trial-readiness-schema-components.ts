import { z } from 'zod';
import partys from '../../../../constants/users/partys';
import { Party } from '../../../../models/users/partys';

const nonEmptyString = z.string().min(1);

const confirmReadyClaimant = (solicitorParty: Party) => {
  if (solicitorParty === partys.CLAIMANT_SOLICITOR_1) {
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

  return {};
};

const trialReadinessSchemaComponents = {
  confirmReadyClaimant,
};

export default trialReadinessSchemaComponents;
