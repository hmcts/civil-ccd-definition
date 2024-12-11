export const heading = 'Disclosure of non-electronic documents (Optional)';

export const input = {
  label: 'What directions are proposed for disclosure? (Optional)',
  selector: '#specRespondent1DQDisclosureOfNonElectronicDocuments_bespokeDirections',
};

export const radioButtons = (defendantNumber: number) => ({
  yes: {
    selector: `#respondent${defendantNumber}DQDisclosureOfNonElectronicDocuments_directionsForDisclosureProposed_Yes`,
    value: 'Yes',
  },
  no: {
    selector: `#respondent${defendantNumber}DQDisclosureOfNonElectronicDocuments_directionsForDisclosureProposed_No`,
    value: 'No',
  },
});
