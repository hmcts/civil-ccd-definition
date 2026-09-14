import { z } from 'zod';

const nonEmptyString = z.string().min(1);

const documentUpload = z.looseObject({
  document_url: nonEmptyString,
  document_binary_url: nonEmptyString,
  document_filename: nonEmptyString,
});

const evidenceUploadApplicantLipSchemaBuilderComponents = {
  documentForDisclosure: z.array(
    z.looseObject({
      value: z.looseObject({
        typeOfDocument: nonEmptyString,
        documentIssuedDate: nonEmptyString,
        documentUpload,
        createdDatetime: nonEmptyString,
      }),
    }),
  ).min(1),
  documentWitnessStatement: z.array(
    z.looseObject({
      value: z.looseObject({
        witnessOptionName: nonEmptyString,
        witnessOptionUploadDate: nonEmptyString,
        witnessOptionDocument: documentUpload,
        createdDatetime: nonEmptyString,
      }),
    }),
  ).min(1),
  documentExpertReport: z.array(
    z.looseObject({
      value: z.looseObject({
        expertOptionName: nonEmptyString,
        expertOptionExpertise: nonEmptyString,
        expertOptionUploadDate: nonEmptyString,
        expertDocument: documentUpload,
        createdDatetime: nonEmptyString,
      }),
    }),
  ).min(1),
  documentCaseSummary: z.array(
    z.looseObject({
      value: z.looseObject({
        documentUpload,
        createdDatetime: nonEmptyString,
      }),
    }),
  ).min(1),
  caseDocumentUploadDate: nonEmptyString,
};

export default evidenceUploadApplicantLipSchemaBuilderComponents;
