import ClaimTrack from '../../../../../../../enums/claim-track';
import { Party } from '../../../../../../../models/partys';

export const heading = 'Respond to claim';

export const radioButtons = {
  address: {
    label: 'Is this address correct?',
    yes: {
      label: 'Yes',
      selector: (defendantParty: Party, claimTrack?: ClaimTrack) => {
        if (defendantParty.number === 2 && claimTrack === ClaimTrack.FAST_CLAIM)
          return '#specAoSRespondent2HomeAddressRequired_Yes';
        else if (defendantParty.number === 2)
          return '#specAoSRespondent2CorrespondenceAddressRequired_Yes';
        else return '#specAoSApplicantCorrespondenceAddressRequired_Yes';
      },
    },
    no: {
      label: 'no',
      selector: (defendantParty: Party, claimTrack?: ClaimTrack) => {
        if (defendantParty.number === 2 && claimTrack === ClaimTrack.FAST_CLAIM)
          return '#specAoSRespondent2HomeAddressRequired_No';
        else if (defendantParty.number === 2)
          return '#specAoSRespondent2CorrespondenceAddressRequired_No';
        else return '#specAoSApplicantCorrespondenceAddressRequired_No';
      },
    },
  },
};
