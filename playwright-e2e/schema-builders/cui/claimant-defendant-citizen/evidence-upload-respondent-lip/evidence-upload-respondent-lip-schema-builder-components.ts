import { z } from 'zod';

const nonEmptyString = z.string().min(1);

const documentUpload = z.looseObject({
  document_url: nonEmptyString,
  document_binary_url: nonEmptyString,
  document_filename: nonEmptyString,
});

const evidenceUploadRespondentLipSchemaBuilderComponents = {
  documentWitnessSummaryRes: z.array(
    z.looseObject({
      value: z.looseObject({
        witnessOptionName: nonEmptyString,
        witnessOptionUploadDate: nonEmptyString,
        witnessOptionDocument: documentUpload,
        createdDatetime: nonEmptyString,
      }),
    }),
  ).min(1),
  documentJointStatementRes: z.array(
    z.looseObject({
      value: z.looseObject({
        expertOptionName: nonEmptyString,
        expertOptionExpertises: nonEmptyString,
        expertOptionUploadDate: nonEmptyString,
        expertDocument: documentUpload,
        createdDatetime: nonEmptyString,
      }),
    }),
  ).min(1),
  documentAuthoritiesRes: z.array(
    z.looseObject({
      value: z.looseObject({
        documentUpload,
        createdDatetime: nonEmptyString,
      }),
    }),
  ).min(1),
  caseDocumentUploadDateRes: nonEmptyString,
};

export default evidenceUploadRespondentLipSchemaBuilderComponents;
