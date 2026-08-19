import { z } from 'zod';

const nonEmptyString = z.string().min(1);

const generalAppType = z.looseObject({
  types: z.array(nonEmptyString).min(1),
});

const generalAppPBADetails = z.looseObject({
});

const generalAppHearingDate = z.looseObject({
});

const generalAppRespondentAgreement = z.looseObject({
});

const generalAppUrgencyRequirement = z.looseObject({
});

const generalAppInformOtherParty = z.looseObject({
});

const generalAppStatementOfTruth = z.looseObject({
});

const generalAppHearingDetails = z.looseObject({
});

const generalApplications = {
  generalApplications: z.array(
    z.looseObject({
      id: nonEmptyString.optional(),
      value: z.looseObject({
        caseLink: z.looseObject({
          CaseReference: nonEmptyString,
        }),
        generalAppType: generalAppType,
        generalAppPBADetails: generalAppPBADetails,
        generalAppHearingDate: generalAppHearingDate,
        generalAppHearingDetails: generalAppHearingDetails,
        generalAppInformOtherParty: generalAppInformOtherParty,
        generalAppStatementOfTruth: generalAppStatementOfTruth,
        generalAppUrgencyRequirement: generalAppUrgencyRequirement,
        generalAppRespondentAgreement: generalAppRespondentAgreement,
      }),
    }),
  ).min(1),
};

const claimantGaAppDetails = {
  claimantGaAppDetails: z.array(z.looseObject({})).min(1).optional(),
};

const gaDocuments = {
  gaAddlDocStaff: z.array(z.looseObject({})).optional(),
  gaAddlDocClaimant: z.array(z.looseObject({})).optional(),
};

export default {
  generalApplications,
  claimantGaAppDetails,
  gaDocuments,
};
