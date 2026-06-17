import { z } from 'zod';

const nonEmptyString = z.string().min(1);

const finalOrderDocumentCollection = {
  finalOrderDocumentCollection: z.array(
    z.looseObject({
      id: nonEmptyString,
      value: z.looseObject({
        createdBy: nonEmptyString,
        documentLink: z.looseObject({
          category_id: nonEmptyString,
          document_url: nonEmptyString,
          upload_timestamp: nonEmptyString,
          document_filename: nonEmptyString,
          document_binary_url: nonEmptyString,
        }),
        documentName: nonEmptyString,
        documentSize: z.number(),
        documentType: nonEmptyString,
        createdDatetime: nonEmptyString,
      }),
    }),
  ).min(1),
};

export default {
  finalOrderDocumentCollection,
};
