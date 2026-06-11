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
  documentDisclosureList: documentArray,
  documentWitnessSummary: documentArray,
  documentJointStatement: documentArray,
  documentEvidenceForTrial: documentArray,
};

export default {
  documentUpload,
};
