import { Party } from '../../../../../../../models/partys';

export const subheadings = {
  uploadEvidence: 'Upload supporting evidence (optional)',
};

export const inputs = {
  disputeReason: {
    label: '',
    selector: (party: Party) =>
      `#detailsOfWhyDoesYouDisputeTheClaim${party.number === 1 ? '' : party.number}`,
  },
  uploadEvidence: {
    label: '',
    selector: (party: Party) => `#respondent${party.number}SpecDefenceResponseDocument_file`,
  },
};
