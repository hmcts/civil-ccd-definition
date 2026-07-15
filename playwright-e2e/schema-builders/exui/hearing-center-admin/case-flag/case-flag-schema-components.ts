import { z } from 'zod';

const nonEmptyString = z.string().min(1);

const caseFlags = {
  caseFlags: z.looseObject({
    details: z.array(
      z.looseObject({
        value: z.looseObject({
          name: nonEmptyString,
          flagCode: nonEmptyString,
          flagComment: nonEmptyString,
          hearingRelevant: nonEmptyString,
          status: nonEmptyString,
          dateTimeCreated: nonEmptyString,
          path: z.array(z.looseObject({ value: nonEmptyString })).min(1),
        }),
      }),
    ).min(1),
  }),
};

const applicant1Flags = {
  applicant1: z.looseObject({
    flags: z.looseObject({
      details: z.array(
        z.looseObject({
          value: z.looseObject({
            name: nonEmptyString,
            otherDescription: nonEmptyString,
            flagCode: nonEmptyString,
            flagComment: nonEmptyString,
            hearingRelevant: nonEmptyString,
            status: nonEmptyString,
            availableExternally: z.string().optional(),
            path: z.array(z.looseObject({ value: nonEmptyString })).min(1),
          }),
        }),
      ).min(1),
    }),
  }),
};
export default {
  caseFlags,
  applicant1Flags,
};
