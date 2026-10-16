import { z } from 'zod';
import partys from '../../../../constants/users/partys';
import { Party } from '../../../../models/users/partys';

const nonEmptyString = z.string().min(1);

const requestForReviewComments = (party: Party) => {
  if (party === partys.CLAIMANT_1) {
    return {
      requestForReviewCommentsClaimant: nonEmptyString,
    };
  }

  if (party === partys.DEFENDANT_1) {
    return {
      requestForReviewCommentsDefendant: nonEmptyString,
    };
  }

  return {};
};

const requestForReconsiderationLipSchemaBuilderComponents = {
  requestForReviewComments,
};

export default requestForReconsiderationLipSchemaBuilderComponents;
