import partys from '../../../../../../constants/partys';
import CaseDataHelper from '../../../../../../helpers/case-data-helper';
import { ClaimantDefendantPartyType } from '../../../../../../models/claimant-defendant-party-types';

export const heading = 'Where should this flag be added?';

export const radioButtons = {
  caseLevel: {
    label: 'Case level',
  },
  claimant1: {
    label: (claimant1PartyType: ClaimantDefendantPartyType) =>
      `${
        CaseDataHelper.buildClaimantAndDefendantData(partys.CLAIMANT_1, claimant1PartyType)
          .partyName
      } (Claimant 1)`,
  },
  claimant2: {
    label: (claimant2PartyType: ClaimantDefendantPartyType) =>
      `${
        CaseDataHelper.buildClaimantAndDefendantData(partys.CLAIMANT_2, claimant2PartyType)
          .partyName
      } (Claimant 2)`,
  },
  defendant1: {
    label: (defendant1PartyType: ClaimantDefendantPartyType) =>
      `${
        CaseDataHelper.buildClaimantAndDefendantData(partys.DEFENDANT_1, defendant1PartyType)
          .partyName
      } (Defendant 1)`,
  },
  defendant2: {
    label: (defendant2PartyType: ClaimantDefendantPartyType) =>
      `${
        CaseDataHelper.buildClaimantAndDefendantData(partys.DEFENDANT_2, defendant2PartyType)
          .partyName
      } (Defendant 2)`,
  },
  claimantExpert1: {
    label: `${CaseDataHelper.buildExpertData(partys.CLAIMANT_EXPERT_1).partyName} (Claimant solicitor expert)`,
  },
  claimantExpert2: {
    label: `${CaseDataHelper.buildExpertData(partys.CLAIMANT_EXPERT_2).partyName} (Claimant solicitor expert)`,
  },
  defendant1Expert1: {
    label: `${CaseDataHelper.buildExpertData(partys.DEFENDANT_1_EXPERT_1).partyName} (Defendant solicitor 1 expert)`,
  },
  defendant1Expert2: {
    label: `${CaseDataHelper.buildExpertData(partys.DEFENDANT_1_EXPERT_2).partyName} (Defendant solicitor 1 expert)`,
  },
  defendant2Expert1: {
    label: `${CaseDataHelper.buildExpertData(partys.DEFENDANT_2_EXPERT_1).partyName} (Defendant solicitor 2 expert)`,
  },
  defendant2Expert2: {
    label: `${CaseDataHelper.buildExpertData(partys.DEFENDANT_2_EXPERT_2).partyName} (Defendant solicitor 2 expert)`,
  },
  claimantWitness1: {
    label: `${CaseDataHelper.buildWitnessData(partys.CLAIMANT_WITNESS_1).partyName} (Claimant solicitor witness)`,
  },
  claimantWitness2: {
    label: `${CaseDataHelper.buildWitnessData(partys.CLAIMANT_WITNESS_1).partyName} (Claimant solicitor witness)`,
  },
  defendant1Witness1: {
    label: `${CaseDataHelper.buildWitnessData(partys.DEFENDANT_1_WITNESS_1).partyName} (Defendant solicitor 1 witness)`,
  },
  defendant1Witness2: {
    label: `${CaseDataHelper.buildWitnessData(partys.DEFENDANT_1_WITNESS_2).partyName} (Defendant solicitor 1 witness)`,
  },
  defendant2Witness1: {
    label: `${CaseDataHelper.buildWitnessData(partys.DEFENDANT_2_WITNESS_1).partyName} (Defendant solicitor 2 witness)`,
  },
  defendant2Witness2: {
    label: `${CaseDataHelper.buildWitnessData(partys.DEFENDANT_2_WITNESS_2).partyName} (Defendant solicitor 2 witness)`,
  },
};
