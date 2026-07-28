import { z } from 'zod';
import ConfirmOrderGivesPermission
  from '../../../../constants/ccd-events/validate-discontinue-claim-claimant/confirm-order-gives-permission';

const validateDiscontinuance = (confirmOrderGivesPermission: ConfirmOrderGivesPermission) => ({
  confirmOrderGivesPermission: z.literal(confirmOrderGivesPermission),
});

const undefine = (confirmOrderGivesPermission: ConfirmOrderGivesPermission) => {
  if (confirmOrderGivesPermission === ConfirmOrderGivesPermission.YES) {
    return {
      respondent1NoticeOfDiscontinueCWViewDoc: z.undefined().optional(),
      applicant1NoticeOfDiscontinueCWViewDoc: z.undefined().optional(),
      respondent2NoticeOfDiscontinueCWViewDoc: z.undefined().optional()
    }
  }

  return {};
}

const validateDiscontinueClaimClaimantSchemaBuilderComponents = {
  validateDiscontinuance,
  undefine,
};

export default validateDiscontinueClaimClaimantSchemaBuilderComponents;
