import partys from '../../../../../constants/users/partys';
import { Party } from '../../../../../models/users/partys';

export const heading = 'Upload Your Documents';

export const subheadings = {
  disclosure: 'Disclosure',
  witnessEvidence: 'Witness evidence',
  expertEvidence: 'Expert evidence',
  trialDocuments: 'Trial Documents',
};

export const checkboxes = {
  witnessStatement: {
    label: 'Witness statement',
    selector: (claimantDefendantParty: Party) =>
      `#witnessSelectionEvidenceFastTrack${claimantDefendantParty === partys.CLAIMANT_1 ? '' : 'Res'}-WITNESS_STATEMENT`,
  },
  witnessSummary: {
    label: 'Witness summary',
    selector: (claimantDefendantParty: Party) =>
      `#witnessSelectionEvidenceFastTrack${claimantDefendantParty === partys.CLAIMANT_1 ? '' : 'Res'}-WITNESS_SUMMARY`,
  },
  expertsReport: {
    label: "Expert's report",
    selector: (claimantDefendantParty: Party) =>
      `#expertSelectionEvidenceFastTrack${claimantDefendantParty === partys.CLAIMANT_1 ? '' : 'Res'}-EXPERT_REPORT`,
  },
  authorities: {
    label: 'Authorities',
    selector: (claimantDefendantParty: Party) =>
      `#trialSelectionEvidenceFastTrack${claimantDefendantParty === partys.CLAIMANT_1 ? '' : 'Res'}-AUTHORITIES`,
  },
};
