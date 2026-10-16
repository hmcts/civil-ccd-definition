import { z } from 'zod';

const nonEmptyString = z.string().min(1);

const generalAppTypeLR = z.looseObject({
  types: z.array(nonEmptyString).min(1),
});

const generalAppHearingDate = z.looseObject({
  hearingScheduledPreferenceYesNo: nonEmptyString,
  hearingScheduledDate: nonEmptyString,
});

const generalAppRespondentAgreement = z.looseObject({
  hasAgreed: nonEmptyString,
});

const generalAppUrgencyRequirement = z.looseObject({
  generalAppUrgency: nonEmptyString,
});

const generalAppInformOtherParty = z.looseObject({
  isWithNotice: nonEmptyString,
  reasonsForWithoutNotice: nonEmptyString,
});

const generalAppStatementOfTruth = z.looseObject({
  generalAppDetailsOfOrder: nonEmptyString,
  generalAppReasonsOfOrder: nonEmptyString,
  generalAppStatementOfTruthConsent: z.array(nonEmptyString).min(1),
  generalAppEvidenceDocument: z.array(
    z.looseObject({
      value: z.looseObject({
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
          createdDatetime: nonEmptyString,
        }),
      }),
    }),
  ).min(1),
  generalAppStatementOfTruth: z.looseObject({
    name: nonEmptyString,
    role: nonEmptyString,
  }),
});

const generalAppHearingDetails = z.looseObject({
  hearingYesorNo: nonEmptyString,
  hearingDate: nonEmptyString,
  trialRequiredYesOrNo: nonEmptyString,
  trialDateFrom: nonEmptyString,
  HearingPreferencesPreferredType: nonEmptyString,
  ReasonForPreferredHearingType: nonEmptyString,
  HearingPreferredLocation: z.looseObject({
    list_items: z.array(z.looseObject({})),
    value: z.looseObject({}),
  }),
  HearingDetailsTelephoneNumber: nonEmptyString,
  HearingDetailsEmailID: nonEmptyString,
  HearingDuration: nonEmptyString,
  generalAppUnavailableDates: z.array(
    z.looseObject({
      value: z.looseObject({
        unavailableTrialDateFrom: nonEmptyString,
        unavailableTrialDateTo: nonEmptyString,
      }),
    }),
  ).min(1),
  vulnerabilityQuestionsYesOrNo: nonEmptyString,
  vulnerabilityQuestion: nonEmptyString,
  SupportRequirement: z.array(nonEmptyString).min(1),
  SupportRequirementLanguageInterpreter: nonEmptyString,
  SupportRequirementOther: nonEmptyString,
  SupportRequirementSignLanguage: nonEmptyString,
});

const generalAppPBADetails = z.looseObject({
  fee: z.looseObject({
    code: nonEmptyString,
    version: nonEmptyString,
    calculatedAmountInPence: nonEmptyString,
  }),
  generalAppFeeToPayInText: nonEmptyString,
});

export default {
  generalAppTypeLR,
  generalAppHearingDate,
  generalAppRespondentAgreement,
  generalAppUrgencyRequirement,
  generalAppInformOtherParty,
  generalAppStatementOfTruth,
  generalAppHearingDetails,
  generalAppPBADetails,
};
