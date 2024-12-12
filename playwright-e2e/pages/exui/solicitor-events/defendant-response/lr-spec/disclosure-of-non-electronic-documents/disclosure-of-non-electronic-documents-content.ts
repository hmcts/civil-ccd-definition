import { enterDirectionsProposedForDisclosure } from '../../../../../../../e2e/fragments/dq/disclosureOfNonElectrionicDocuments.page';

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

export const standardDisclosureButtons = (defendantNumber: number) => ({
  yes: {
    selector: `#respondent${defendantNumber}DQDisclosureOfNonElectronicDocuments_standardDirectionsRequired_Yes`,
    value: 'Yes',
  },
  no: {
    selector: `#respondent${defendantNumber}DQDisclosureOfNonElectronicDocuments_standardDirectionsRequired_No`,
    value: 'No',
  },
  enterDirectionsProposedForDisclosure: {
    selector: `#respondent${defendantNumber}DQDisclosureOfNonElectronicDocuments_bespokeDirections`,
  },
});
