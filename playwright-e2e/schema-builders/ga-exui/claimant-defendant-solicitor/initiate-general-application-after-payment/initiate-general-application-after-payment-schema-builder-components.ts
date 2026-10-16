import { z } from 'zod';

const nonEmptyString = z.string().min(1);

const generalAppPBADetails = z.looseObject({
  fee: z.looseObject({
    code: nonEmptyString,
    version: nonEmptyString,
    calculatedAmountInPence: nonEmptyString,
  }),
  paymentDetails: z.looseObject({
    status: nonEmptyString,
    reference: nonEmptyString,
    customerReference: nonEmptyString,
  }),
  paymentSuccessfulDate: nonEmptyString,
  serviceRequestReference: nonEmptyString,
});

const initiateGeneralApplicationAfterPaymentSchemaBuilderComponents = {
  generalAppPBADetails,
};

export default initiateGeneralApplicationAfterPaymentSchemaBuilderComponents;
