import partys from '../../../../../constants/users/partys';
import { Party } from '../../../../../models/users/partys';

const requestForReconsideration = (claimantDefendantParty: Party) => {
  if (claimantDefendantParty === partys.CLAIMANT_SOLICITOR_1) {
    return {
      RequestForReconsideration: {
        reasonForReconsiderationApplicant: {
          reasonForReconsiderationTxt: `Reason for reconsideration - ${claimantDefendantParty.key}`,
        },
      },
    };
  } else if (claimantDefendantParty === partys.DEFENDANT_SOLICITOR_1) {
    return {
      RequestForReconsideration: {
        reasonForReconsiderationRespondent1: {
          reasonForReconsiderationTxt: `Reason for reconsideration - ${claimantDefendantParty.key}`,
        },
      },
    };
  } else if (claimantDefendantParty === partys.DEFENDANT_SOLICITOR_2) {
    return {
      RequestForReconsideration: {
        reasonForReconsiderationRespondent2: {
          reasonForReconsiderationTxt: `Reason for reconsideration - ${claimantDefendantParty.key}`,
        },
      },
    };
  }

  return {};
};

const requestForReconsiderationDataBuilderComponents = {
  requestForReconsideration,
};

export default requestForReconsiderationDataBuilderComponents;
