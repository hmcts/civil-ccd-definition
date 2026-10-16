import { z } from 'zod';

const nonEmptyString = z.string().min(1);

const caseProceedsInCaseman = {
  claimProceedsInCaseman: z.strictObject({
    date: nonEmptyString,
    reason: nonEmptyString,
    other: nonEmptyString,
  }),
};

const caseProceedsInCasemanSchemaBuilderComponents = {
  caseProceedsInCaseman,
};

export default caseProceedsInCasemanSchemaBuilderComponents;
