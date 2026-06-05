import { z } from 'zod';

const nonEmptyString = z.string().min(1);

const notification = {
  claimNotificationDate: nonEmptyString,
  claimDetailsNotificationDeadline: nonEmptyString,
};

const defendantSolicitorNotifyClaimOptions = {
  defendantSolicitorNotifyClaimOptions: z.strictObject({
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

const notifyClaimSchemaBuilderComponents = {
  notification,
  defendantSolicitorNotifyClaimOptions
};

export default notifyClaimSchemaBuilderComponents;
