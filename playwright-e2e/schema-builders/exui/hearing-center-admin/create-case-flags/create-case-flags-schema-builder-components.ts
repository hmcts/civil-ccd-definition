import { z } from 'zod';

const caseFlags = {
  caseFlags: z.looseObject({
    details: z.array(z.looseObject({})).min(1),
  }),
};

const applicant1 = {
  applicant1: z.looseObject({
    flags: z.looseObject({
      details: z.array(z.looseObject({})).min(1),
    }),
  }),
};

const respondent1 = {
  respondent1: z.looseObject({
    flags: z.looseObject({
      details: z.array(z.looseObject({})).min(1),
    }),
  }),
};

export default {
  caseFlags,
  applicant1,
  respondent1,
};
