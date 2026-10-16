import DateHelper from "../../../../helpers/date-helper";
import GaCCDCaseData from "../../../../models/ga-ccd-case-data";


const serviceRequestAmount = (gaCCDCaseData?: GaCCDCaseData): string => {
  const calculatedAmountInPence = Number(
    gaCCDCaseData?.generalAppPBADetails?.fee?.calculatedAmountInPence,
  );
  return (calculatedAmountInPence / 100).toFixed(2);
};

export const serviceUpdateDto = (gaCCDCaseData?: GaCCDCaseData) => {
  const paymentDate = DateHelper.getToday().toISOString();
  const amount = serviceRequestAmount(gaCCDCaseData);

  return {
    service_request_reference: '1234567890123',
    ccd_case_number: gaCCDCaseData?.id,
    service_request_amount: amount,
    service_request_status: 'Paid',
    payment: {
      amount: 0,
      customer_reference: '12345678',
      date_created: paymentDate,
      date_updated: paymentDate,
      payment_reference: '12345678',
    },
  };
};
