import partys from '../../../../constants/users/partys';
import CaseDataHelper from '../../../../helpers/case-data-helper';
import { ClaimantDefendantPartyType } from '../../../../models/users/claimant-defendant-party-types';
import { Party } from '../../../../models/users/partys';

const nocAnswers = (
  claimantDefendantParty: Party,
  claimant1PartyType: ClaimantDefendantPartyType,
  claimant2PartyType: ClaimantDefendantPartyType,
  defendant1PartyType: ClaimantDefendantPartyType,
  defendant2PartyType: ClaimantDefendantPartyType,
) => {
  if(claimantDefendantParty === partys.CLAIMANT_1) {
    return [
      { 
        question_id: 'clientName', 
        value: CaseDataHelper.buildClaimantAndDefendantData(claimantDefendantParty, claimant1PartyType).partyName 
      },
    ];
  } else if(claimantDefendantParty === partys.CLAIMANT_2) {
    return [
      { 
        question_id: 'clientName', 
        value: CaseDataHelper.buildClaimantAndDefendantData(claimantDefendantParty, claimant2PartyType).partyName 
      },
    ];
  } else if(claimantDefendantParty === partys.DEFENDANT_1) {
    return [
      { 
        question_id: 'clientName', 
        value: CaseDataHelper.buildClaimantAndDefendantData(claimantDefendantParty, defendant1PartyType).partyName 
      },
    ];
  } else if(claimantDefendantParty === partys.DEFENDANT_2) {
    return [
      { 
        question_id: 'clientName', 
        value: CaseDataHelper.buildClaimantAndDefendantData(claimantDefendantParty, defendant2PartyType).partyName 
      },
    ];
  }
};

export default {
  nocAnswers,
};
