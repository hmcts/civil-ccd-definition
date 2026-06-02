import { z } from 'zod';
import { Document } from '../../../../../models/ccd-case-data';

const nonEmptyString = z.string().min(1);

const deadlines = {
  claimDismissedDeadline: nonEmptyString,
  respondent1ResponseDeadline: nonEmptyString,
  respondent2ResponseDeadline: nonEmptyString.optional(),
}

const defendantSolicitorNotifyClaimDetailsOptions = {
  defendantSolicitorNotifyClaimDetailsOptions: z.strictObject({
    value: z.strictObject({
      code: nonEmptyString,
      label: nonEmptyString,
    }),
    list_items: z.array(
      z.strictObject({
        code: nonEmptyString,
        label: nonEmptyString,
      })
    ).min(1)
  })
};

const notification = {
  claimDetailsNotificationDate: nonEmptyString,
};

const undefine = {
  // addLegalRepDeadlineRes1: z.undefined().optional(),
  // addLegalRepDeadlineRes2: z.undefined().optional(),
};

const servedDocumentFiles = (particularOfClaimDocumentBeforeSubmission: Document[]) => {
  if(!particularOfClaimDocumentBeforeSubmission) {
    return {
      servedDocumentFiles: z.looseObject({
        particularsOfClaimDocument: z.array(
          z.looseObject({
            value: z.looseObject({
              document_url: nonEmptyString,
              document_binary_url: nonEmptyString,
              document_filename: nonEmptyString,
            }),
          }),
        ).min(1),
      }),
    };
  }
  
  return {};
};

const notifyClaimDetailsSchemaBuilderComponents = {
  deadlines,
  defendantSolicitorNotifyClaimDetailsOptions,
  notification,
  servedDocumentFiles,
  undefine,
};

export default notifyClaimDetailsSchemaBuilderComponents;
