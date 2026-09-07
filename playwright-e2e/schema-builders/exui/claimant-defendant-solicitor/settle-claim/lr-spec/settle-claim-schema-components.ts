import { z } from 'zod';
import ClaimType from '../../../../../constants/cases/claim-type';

const singleClaimant = (claimType: ClaimType) => {
  if (claimType !== ClaimType.TWO_VS_ONE) {
    return {
      markPaidConsent: z.literal('YES'),
    };
  }

  return {};
};

const multipleClaimant = (claimType: ClaimType) => {
  if (claimType === ClaimType.TWO_VS_ONE) {
    return {
      markPaidForAllClaimants: z.literal('Yes'),
    };
  }

  return {};
};

const settleClaimSchemaComponents = {
  singleClaimant,
  multipleClaimant,
};

export default settleClaimSchemaComponents;
