import { z } from 'zod';
import partys from '../../../../../constants/users/partys';
import { Party } from '../../../../../models/users/partys';

const nonEmptyString = z.string().min(1);

const requestForReconsideration = (claimantDefendantParty: Party) => {
  if (claimantDefendantParty === partys.CLAIMANT_SOLICITOR_1) {
    return {
      reasonForReconsiderationApplicant: z.looseObject({
        reasonForReconsiderationTxt: nonEmptyString,
      }),
    };
  } else if (claimantDefendantParty === partys.DEFENDANT_SOLICITOR_1) {
    return {
      reasonForReconsiderationRespondent1: z.looseObject({
        reasonForReconsiderationTxt: nonEmptyString,
      }),
    };
  } else if (claimantDefendantParty === partys.DEFENDANT_SOLICITOR_2) {
    return {
      reasonForReconsiderationRespondent2: z.looseObject({
        reasonForReconsiderationTxt: nonEmptyString,
      }),
    };
  }

  return {};
};

const requestForReconsiderationSchemaComponents = {
  requestForReconsideration,
};

export default requestForReconsiderationSchemaComponents;
