import partys from '../../../../../constants/users/partys';
import CaseDataHelper from '../../../../../helpers/case-data-helper';
import { ClaimantDefendantPartyType } from '../../../../../models/users/claimant-defendant-party-types';

export const heading = 'Select which respondent the document is for';

export const radioButtons = {
  label: 'Select one of the options',
  defendant1: {
    label: (defendant1PartyType: ClaimantDefendantPartyType) =>
      `Defendant 1 - ${CaseDataHelper.buildClaimantAndDefendantData(partys.DEFENDANT_1, defendant1PartyType).partyName}`,
  },
  defendant2: {
    label: (defendant2PartyType: ClaimantDefendantPartyType) =>
      `Defendant 2 - ${CaseDataHelper.buildClaimantAndDefendantData(partys.DEFENDANT_2, defendant2PartyType).partyName}`,
  },
  defendant1and2: {
    label: 'Defendant 1 and 2',
  },
};
