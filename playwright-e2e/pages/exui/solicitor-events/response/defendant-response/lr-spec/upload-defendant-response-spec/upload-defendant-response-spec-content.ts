import Party from '../../../../../../../enums/party';

export const subheadings = {
  uploadEvidence: 'Upload supporting evidence (optional)',
};

export const getInputs = (party: Party, defendantNumber?: number) => ({
  disputeReason: {
    label: '',
    selector: `#detailsOfWhyDoesYouDisputeTheClaim${defendantNumber ?? ''}`,
  },
  uploadEvidence: {
    label: '',
    selector: `#${party}SpecDefenceResponseDocument_file`,
  },
});
