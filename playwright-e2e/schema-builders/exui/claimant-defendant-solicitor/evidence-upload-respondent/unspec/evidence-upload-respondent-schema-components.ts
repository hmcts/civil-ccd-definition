import { z } from 'zod';

const nonEmptyString = z.string().min(1);

const documentArray = z.array(
  z.looseObject({
    id: nonEmptyString,
    value: z.looseObject({
      createdDatetime: nonEmptyString,
    }),
  }),
).min(1);

const documentUpload = {
  documentDisclosureListRes: documentArray,
  documentWitnessSummaryRes: documentArray,
  documentQuestionsRes: documentArray,
  documentAuthoritiesRes: documentArray,
};

export default {
  documentUpload,
};
