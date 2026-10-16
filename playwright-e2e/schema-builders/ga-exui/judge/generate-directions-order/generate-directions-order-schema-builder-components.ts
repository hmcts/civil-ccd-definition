import { z } from 'zod';

const assistedOrderWithoutFurtherHearing = {
  finalOrderSelection: z.literal('ASSISTED_ORDER'),
  assistedOrderMadeSelection: z.literal('Yes'),
  assistedOrderOrderedThatText: z.string().min(1),
  assistedCostTypes: z.literal('COSTS_IN_CASE'),
  assistedOrderGiveReasonsYesNo: z.literal('No'),
};

export default { assistedOrderWithoutFurtherHearing };
