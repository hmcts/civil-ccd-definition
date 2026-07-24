import ConfirmOrderGivesPermission from "../../../../constants/ccd-events/validate-discontinue-claim-claimant/confirm-order-gives-permission";

const validateDiscontinuance = (confirmOrderGivesPermission: ConfirmOrderGivesPermission) => {
  return {
    ValidateDiscontinuance: {
      confirmOrderGivesPermission: confirmOrderGivesPermission
    }
  };
};

const validateDiscontinueClaimClaimantDataBuilderComponents = {
  validateDiscontinuance,
};

export default validateDiscontinueClaimClaimantDataBuilderComponents;
