import partys from '../../../../constants/users/partys';
import CCDCaseData from '../../../../models/ccd-case-data';
import { Party } from '../../../../models/users/partys';

const reasonForReconsideration = 'The legal adviser overlooked some factors';

const requestForReviewComments = (party: Party): CCDCaseData => {
  if (party === partys.CLAIMANT_1) {
    return {
      requestForReviewCommentsClaimant: reasonForReconsideration,
    } as CCDCaseData;
  }

  if (party === partys.DEFENDANT_1) {
    return {
      requestForReviewCommentsDefendant: reasonForReconsideration,
    } as CCDCaseData;
  }

  return {};
};

const requestForReconsiderationLipDataBuilderComponents = {
  requestForReviewComments,
};

export default requestForReconsiderationLipDataBuilderComponents;
