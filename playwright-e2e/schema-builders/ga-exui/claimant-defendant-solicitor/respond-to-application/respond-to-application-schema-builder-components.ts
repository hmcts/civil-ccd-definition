import { z } from 'zod';

const nonEmptyString = z.string().min(1);

const unavailableDate = z.looseObject({
  unavailableTrialDateFrom: nonEmptyString,
  unavailableTrialDateTo: nonEmptyString,
});

const gaHearingDetails = z.looseObject({
  generalAppHearingDays: nonEmptyString,
  generalAppHearingHours: nonEmptyString,
  generalAppHearingMinutes: nonEmptyString,
  generalAppUnavailableDates: z.array(z.looseObject({
    id: nonEmptyString,
    value: unavailableDate,
  })).min(1),
  hearingDate: nonEmptyString,
  HearingDetailsEmailID: nonEmptyString,
  HearingDetailsTelephoneNumber: nonEmptyString,
  HearingDuration: nonEmptyString,
  HearingPreferencesPreferredType: nonEmptyString,
  hearingYesorNo: nonEmptyString,
  ReasonForPreferredHearingType: nonEmptyString,
  respondentResponsePartyName: nonEmptyString,
  SupportRequirement: z.array(nonEmptyString).min(1),
  SupportRequirementLanguageInterpreter: nonEmptyString,
  SupportRequirementOther: nonEmptyString,
  SupportRequirementSignLanguage: nonEmptyString,
  TelephoneHearingPreferredType: nonEmptyString,
  trialDateFrom: nonEmptyString,
  trialDateTo: nonEmptyString,
  trialRequiredYesOrNo: nonEmptyString,
  unavailableTrialRequiredYesOrNo: nonEmptyString,
  vulnerabilityQuestion: nonEmptyString,
  vulnerabilityQuestionsYesOrNo: nonEmptyString,
});

const respondentsResponses = z.array(z.looseObject({
  id: nonEmptyString,
  value: z.looseObject({
    gaHearingDetails,
    gaRespondentDetails: nonEmptyString,
    generalAppRespondent1Representative: nonEmptyString,
  }),
})).min(1);

const documentLink = z.looseObject({
  category_id: nonEmptyString,
  document_binary_url: nonEmptyString,
  document_filename: nonEmptyString,
  document_url: nonEmptyString,
  upload_timestamp: nonEmptyString,
});

const gaDraftDocument = z.array(z.looseObject({
  id: nonEmptyString,
  value: z.looseObject({
    createdBy: nonEmptyString,
    createdDatetime: nonEmptyString,
    documentLink,
    documentName: nonEmptyString,
    documentSize: z.number(),
    documentType: nonEmptyString,
  }),
})).min(1);

export default {
  gaDraftDocument,
  respondentsResponses,
};
