import partys from '../../../../constants/users/partys';
import CCDCaseData from '../../../../models/ccd-case-data';
import { Party } from '../../../../models/users/partys';

const confirmTrialReady = (party: Party): CCDCaseData => {
  if (party === partys.CLAIMANT_1) {
    return {
      trialReadyApplicant: 'Yes',
      applicantRevisedHearingRequirements: {
        revisedHearingRequirements: 'Yes',
        revisedHearingComments: 'Nothing Special',
      },
      applicantHearingOtherComments: {
        hearingOtherComments: 'Optional information....',
      },
    } as CCDCaseData;
  }

  if (party === partys.DEFENDANT_1) {
    return {
      trialReadyRespondent1: 'Yes',
      respondent1RevisedHearingRequirements: {
        revisedHearingRequirements: 'Yes',
        revisedHearingComments: 'Nothing Special',
      },
      respondent1HearingOtherComments: {
        hearingOtherComments: 'Optional information....',
      },
    } as CCDCaseData;
  }

  return {};
};

const trailReadinessDataBuilderComponents = {
  confirmTrialReady,
};

export default trailReadinessDataBuilderComponents;
