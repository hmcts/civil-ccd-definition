import { z } from 'zod';

const nonEmptyString = z.string().min(1);

const extensionDate = {
  respondentSolicitor1AgreedDeadlineExtension: nonEmptyString,
};

const informAgreedExtensionDateSchemaComponents = {
  extensionDate,
};

export default informAgreedExtensionDateSchemaComponents;
