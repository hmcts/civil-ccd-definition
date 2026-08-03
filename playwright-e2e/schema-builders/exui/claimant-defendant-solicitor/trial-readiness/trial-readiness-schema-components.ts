import { z } from 'zod';

const applicantTrialReady = () => ({
  isApplicant1: z.literal('Yes'),
  hearingDurationTextApplicant: z.string(),
  trialReadyApplicant: z.literal('Yes'),
  applicantRevisedHearingRequirements: z.looseObject({
    revisedHearingRequirements: z.string(),
    revisedHearingComments: z.string().nullable().optional(),
  }),
  applicantHearingOtherComments: z.looseObject({
    hearingOtherComments: z.string(),
  }),
});

const trialReadinessSchemaComponents = {
  applicantTrialReady,
};

export default trialReadinessSchemaComponents;
