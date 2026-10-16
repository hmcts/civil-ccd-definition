import partys from "../../../../constants/users/partys";
import { Party } from "../../../../models/users/partys";

const confirmReadyClaimant = (solicitorParty: Party) => {
  if(solicitorParty === partys.CLAIMANT_SOLICITOR_1) {
    return {
      ConfirmReadyClaimant: {
        trialReadyApplicant: 'Yes',
        applicantRevisedHearingRequirements: {
          revisedHearingRequirements: 'Yes',
          revisedHearingComments: `Revised hearing comments - ${solicitorParty.key}`,
        },
        applicantHearingOtherComments: {
          hearingOtherComments: `Hearing other comments - ${solicitorParty.key}`,
        },
      }
    }
  }

  return {};
}

const trialReadinessDataBuilderComponents = {
  confirmReadyClaimant,
};

export default trialReadinessDataBuilderComponents;
