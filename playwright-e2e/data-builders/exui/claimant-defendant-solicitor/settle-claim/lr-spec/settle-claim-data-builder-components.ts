import ClaimType from "../../../../../constants/cases/claim-type";

const singleClaimant = (claimType: ClaimType) => {
  if(claimType !== ClaimType.TWO_VS_ONE) {
    return {
      SingleClaimant: {
        markPaidConsent: 'YES'
      }
    }
  }

  return {};
}

const multipleClaimant = (claimType: ClaimType) => {
  if(claimType === ClaimType.TWO_VS_ONE) {
    return {
      MultipleClaimant: {
        markPaidForAllClaimants: 'Yes'
      }
    };
  }

  return {};
}

const settleClaimDataBuilderComponents = {
  singleClaimant,
  multipleClaimant
};

export default settleClaimDataBuilderComponents;
