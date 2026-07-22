import { z } from 'zod';

const nonEmptyString = z.string().min(1);

const defendantDetails = () => ({
  defendantDetails: z.looseObject({
    list_items: z.array(
      z.looseObject({
        code: nonEmptyString,
        label: nonEmptyString,
      }),
    ),
    value: z.looseObject({
      code: nonEmptyString,
      label: nonEmptyString,
    }),
  }),
});

const hearingType = () => ({
  hearingSelection: nonEmptyString,
  detailsOfDirection: nonEmptyString,
});

const hearingSupportRequirementsFieldDJ = () => ({
  hearingSupportRequirementsDJ: z.looseObject({
    hearingType: nonEmptyString,
    hearingTemporaryLocation: z.looseObject({
      list_items: z.array(
        z.looseObject({
          code: nonEmptyString,
          label: nonEmptyString,
        }),
      ),
      value: z.looseObject({
        code: nonEmptyString,
        label: nonEmptyString,
      }),
    }),
    hearingUnavailableDates: nonEmptyString,
    hearingDates: z.array(
      z.looseObject({
        value: z.looseObject({
          hearingUnavailableFrom: nonEmptyString,
          hearingUnavailableUntil: nonEmptyString,
        }),
      }),
    ),
    hearingSupportQuestion: nonEmptyString,
    hearingSupportAdditional: nonEmptyString,
    hearingPreferredEmail: nonEmptyString,
    hearingPreferredTelephoneNumber1: nonEmptyString,
  }),
});

const defaultJudgementSchemaComponents = {
  defendantDetails,
  hearingType,
  hearingSupportRequirementsFieldDJ,
};

export default defaultJudgementSchemaComponents;
