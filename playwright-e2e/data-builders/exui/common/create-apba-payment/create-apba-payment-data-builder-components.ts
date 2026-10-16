import { civilSystemUpdate } from "../../../../config/users/exui-users";
import ClaimTrack from "../../../../constants/cases/claim-track";
import CaseDataHelper from "../../../../helpers/case-data-helper";
import CivilServiceRequests from "../../../../requests/civil-service-requests";

export const createRefundablePaymentDto = async (caseId: number, claimTrack: ClaimTrack, civilServiceRequests: CivilServiceRequests) => {
  const fee = await civilServiceRequests.getClaimFeeData(civilSystemUpdate, CaseDataHelper.getClaimValue(claimTrack));
  const feeAmount = Number(fee.calculatedAmountInPence)/100

  return {
    account_number: 'PBA0088192',
    amount: feeAmount,
    case_reference: `${caseId}`,
    ccd_case_number: `${caseId}`,
    currency: 'GBP',
    customer_reference: 'string',
    description: 'string',
    fees: [
      {
        calculated_amount: feeAmount,
        code: fee.code,
        fee_amount: feeAmount,
        version: fee.version,
        volume: 1,
      },
    ],
    organisation_name: 'string',
    service: 'CIVIL',
    site_id: 'AAA7',
  };
};
