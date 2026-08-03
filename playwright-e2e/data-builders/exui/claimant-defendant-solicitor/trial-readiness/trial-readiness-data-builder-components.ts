const applicantTrialReady = () => ({
  TrialReadiness: {
    isApplicant1: 'Yes',
    hearingDurationTextApplicant: '55 minutes',
    trialReadyApplicant: 'Yes',
    applicantRevisedHearingRequirements: {
      revisedHearingRequirements: 'No',
    },
    applicantHearingOtherComments: {
      hearingOtherComments: 'Other Info',
    },
  },
});

const trialReadinessDataBuilderComponents = {
  applicantTrialReady,
};

export default trialReadinessDataBuilderComponents;
