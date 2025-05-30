import PartyType from '../enums/party-types';
import Partys from '../models/partys';

const partys: Partys = {
  CLAIMANT_1: {
    key: 'claimant1',
    oldKey: 'applicant1',
    shortOldKey: 'app1',
    number: 1,
    partyType: PartyType.CLAIMANT,
    oldPartyType: PartyType.APPLICANT,
  },
  CLAIMANT_2: {
    key: 'claimant2',
    oldKey: 'applicant2',
    shortOldKey: 'app2',
    number: 2,
    partyType: PartyType.CLAIMANT,
    oldPartyType: PartyType.APPLICANT,
  },
  CLAIMANT_1_LITIGATION_FRIEND: {
    key: 'claimant1LitigationFriend',
    oldKey: 'applicant1LitigationFriend',
    number: 1,
    partyType: PartyType.LITIGATION_FRIEND,
  },
  CLAIMANT_2_LITIGATION_FRIEND: {
    key: 'claimant2LitigationFriend',
    oldKey: 'applicant2LitigationFriend',
    number: 2,
    partyType: PartyType.LITIGATION_FRIEND,
  },
  CLAIMANT_SOLICITOR_1: {
    key: 'claimantSolicitor1',
    oldKey: 'applicantSolicitor1',
    number: 1,
    partyType: PartyType.SOLICITOR,
  },
  CLAIMANT_EXPERT_1: {
    key: 'claimantExpert1',
    oldKey: 'applicant1Expert1',
    number: 1,
    partyType: PartyType.EXPERT,
  },
  CLAIMANT_EXPERT_2: {
    key: 'claimantExpert2',
    oldKey: 'applicant1Expert2',
    number: 2,
    partyType: PartyType.EXPERT,
  },
  CLAIMANT_1_MEDIATION_FRIEND: {
    key: 'claimantMediation1',
    oldKey: 'app1',
    number: 1,
    partyType: PartyType.MEDIATION_FRIEND,
  },
  CLAIMANT_WITNESS_1: {
    key: 'claimantWitness1',
    oldKey: 'applicantWitness1',
    number: 1,
    partyType: PartyType.WITNESS,
  },
  CLAIMANT_WITNESS_2: {
    key: 'claimantWitness2',
    oldKey: 'applicantWitness2',
    number: 1,
    partyType: PartyType.WITNESS,
  },
  DEFENDANT_1: {
    key: 'defendant1',
    oldKey: 'respondent1',
    shortOldKey: 'resp1',
    number: 1,
    partyType: PartyType.DEFENDANT,
    oldPartyType: PartyType.RESPONDENT,
  },
  DEFENDANT_2: {
    key: 'defendant2',
    oldKey: 'respondent2',
    shortOldKey: 'resp2',
    number: 2,
    partyType: PartyType.DEFENDANT,
    oldPartyType: PartyType.RESPONDENT,
  },
  DEFENDANT_1_LITIGATION_FRIEND: {
    key: 'defendant1LitigationFriend',
    oldKey: 'respondent1LitigationFriend',
    number: 1,
    partyType: PartyType.LITIGATION_FRIEND,
  },
  DEFENDANT_2_LITIGATION_FRIEND: {
    key: 'defendant2LitigationFriend',
    oldKey: 'respondent2LitigationFriend',
    number: 2,
    partyType: PartyType.LITIGATION_FRIEND,
  },
  DEFENDANT_SOLICITOR_1: {
    key: 'defendantSolicitor1',
    oldKey: 'respondentSolicitor1',
    number: 1,
    partyType: PartyType.SOLICITOR,
  },
  DEFENDANT_SOLICITOR_2: {
    key: 'defendantSolicitor2',
    oldKey: 'respondentSolicitor2',
    number: 2,
    partyType: PartyType.SOLICITOR,
  },
  DEFENDANT_1_EXPERT_1: {
    key: 'defendant1Expert1',
    oldKey: 'respondent1Expert1',
    number: 1,
    partyType: PartyType.EXPERT,
  },
  DEFENDANT_2_EXPERT_1: {
    key: 'defendant2Expert1',
    oldKey: 'respondent2Expert1',
    number: 1,
    partyType: PartyType.EXPERT,
  },
  DEFENDANT_1_EXPERT_2: {
    key: 'defendant1Expert2',
    oldKey: 'respondent1Expert2',
    number: 2,
    partyType: PartyType.EXPERT,
  },
  DEFENDANT_2_EXPERT_2: {
    key: 'defendant2Expert2',
    oldKey: 'respondent2Expert2',
    number: 2,
    partyType: PartyType.EXPERT,
  },
  DEFENDANT_1_WITNESS_1: {
    key: 'defendant1Witness1',
    oldKey: 'respondent1Witness1',
    number: 1,
    partyType: PartyType.WITNESS,
  },
  DEFENDANT_2_WITNESS_1: {
    key: 'defendant2Witness1',
    oldKey: 'respondent2Witness1',
    number: 1,
    partyType: PartyType.WITNESS,
  },
  DEFENDANT_1_WITNESS_2: {
    key: 'defendant1Witness2',
    oldKey: 'respondent1Witness2',
    number: 2,
    partyType: PartyType.WITNESS,
  },
  DEFENDANT_2_WITNESS_2: {
    key: 'defendant2Witness2',
    oldKey: 'respondent2Witness2',
    number: 2,
    partyType: PartyType.WITNESS,
  },
  DEFENDANT_1_MEDIATION_FRIEND: {
    key: 'defendant1Mediation',
    oldKey: 'resp1',
    number: 1,
    partyType: PartyType.MEDIATION_FRIEND,
  },
  DEFENDANT_2_MEDIATION_FRIEND: {
    key: 'defendant2Mediation',
    oldKey: 'resp2',
    number: 2,
    partyType: PartyType.MEDIATION_FRIEND,
  },
};

export default partys;
