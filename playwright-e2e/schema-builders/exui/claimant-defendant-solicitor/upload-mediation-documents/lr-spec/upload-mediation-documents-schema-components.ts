import { z } from 'zod';
import { Party } from '../../../../../models/users/partys';
import partys from '../../../../../constants/users/partys';

const nonEmptyString = z.string().min(1);

const uploadedDocument = z.looseObject({
  category_id: nonEmptyString,
  document_url: nonEmptyString,
  upload_timestamp: nonEmptyString,
  document_binary_url: nonEmptyString,
  document_filename: nonEmptyString,
});

const mediationDocumentsReferred = (claimantDefendantSolicitorParty: Party) => {
  if (claimantDefendantSolicitorParty === partys.CLAIMANT_SOLICITOR_1)
    return {
      app1MediationDocumentsReferred: z.array(
        z.looseObject({
          id: nonEmptyString,
          value: z.looseObject({
            document: uploadedDocument,
            documentDate: nonEmptyString,
            documentType: nonEmptyString,
            documentUploadedDatetime: nonEmptyString,
          }),
        }),
      ).min(1),
    };

  else if (claimantDefendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1)
    return {
      res1MediationDocumentsReferred: z.array(
        z.looseObject({
          id: nonEmptyString,
          value: z.looseObject({
            document: uploadedDocument,
            documentDate: nonEmptyString,
            documentType: nonEmptyString,
            documentUploadedDatetime: nonEmptyString,
          }),
        }),
      ).min(1),
    };

  else if (claimantDefendantSolicitorParty === partys.DEFENDANT_SOLICITOR_2)
    return {
      res2MediationDocumentsReferred: z.array(
        z.looseObject({
          id: nonEmptyString,
          value: z.looseObject({
            document: uploadedDocument,
            documentDate: nonEmptyString,
            documentType: nonEmptyString,
            documentUploadedDatetime: nonEmptyString,
          }),
        }),
      ).min(1),
    };

  return {};
};

const mediationNonAttendanceDocs = (claimantDefendantSolicitorParty: Party) => {
  if (claimantDefendantSolicitorParty === partys.CLAIMANT_SOLICITOR_1)
    return {
      app1MediationNonAttendanceDocs: z.array(
        z.looseObject({
          id: nonEmptyString,
          value: z.looseObject({
            document: uploadedDocument,
            yourName: nonEmptyString,
            documentDate: nonEmptyString,
            documentUploadedDatetime: nonEmptyString,
          }),
        }),
      ).min(1),
    };

  else if (claimantDefendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1)
    return {
      res1MediationNonAttendanceDocs: z.array(
        z.looseObject({
          id: nonEmptyString,
          value: z.looseObject({
            document: uploadedDocument,
            yourName: nonEmptyString,
            documentDate: nonEmptyString,
            documentUploadedDatetime: nonEmptyString,
          }),
        }),
      ).min(1),
    };

  else if (claimantDefendantSolicitorParty === partys.DEFENDANT_SOLICITOR_2)
    return {
      res2MediationNonAttendanceDocs: z.array(
        z.looseObject({
          id: nonEmptyString,
          value: z.looseObject({
            document: uploadedDocument,
            yourName: nonEmptyString,
            documentDate: nonEmptyString,
            documentUploadedDatetime: nonEmptyString,
          }),
        }),
      ).min(1),
    };

  return {};
};

const uploadMediationDocumentsSchemaComponents = {
  mediationDocumentsReferred,
  mediationNonAttendanceDocs,
};

export default uploadMediationDocumentsSchemaComponents;
