import { z } from 'zod';

const nonEmptyString = z.string().min(1);

const obligationDate = {
  obligationDatePresent: nonEmptyString,
};

const isFinalOrder = {
  isFinalOrder: nonEmptyString,
};

const nextSteps = {
  courtStaffNextSteps: nonEmptyString,
};

const confirmOrderReviewSchemaBuilderComponents = {
  obligationDate,
  isFinalOrder,
  nextSteps,
};

export default confirmOrderReviewSchemaBuilderComponents;
