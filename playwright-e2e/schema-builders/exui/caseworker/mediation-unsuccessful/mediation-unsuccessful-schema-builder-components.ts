import { z } from 'zod';

const nonEmptyString = z.string().min(1);

const mediationUnsuccessful = {
  mediationUnsuccessfulReasonsMultiSelect: z.array(nonEmptyString).min(1),
};

export default {
  mediationUnsuccessful,
};
