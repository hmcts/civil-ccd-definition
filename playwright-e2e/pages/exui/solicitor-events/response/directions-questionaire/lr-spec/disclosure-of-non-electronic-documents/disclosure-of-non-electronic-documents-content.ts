import { Party } from '../../../../../../../models/partys';

export const subheadings = { disclosureOfDocs: 'Disclosure of non-electronic documents' };

export const getRadioButtons = (party: Party) => ({
  disclosureOfElectronicDocs: {
    label: 'Do you want to propose directions for disclosure?',
    yes: {
      label: 'Yes',
      selector: `#${party}DQDisclosureOfNonElectronicDocuments_directionsForDisclosureProposed_Yes`,
    },
    no: {
      label: 'No',
      selector: `#${party}DQDisclosureOfNonElectronicDocuments_directionsForDisclosureProposed_No`,
    },
  },
  standardDisclosure: {
    label: 'Do you want standard disclosure?',
    yes: {
      label: 'Yes',
      selector: `#${party}DQDisclosureOfNonElectronicDocuments_standardDirectionsRequired_Yes`,
    },
    no: {
      label: 'No',
      selector: `#${party}DQDisclosureOfNonElectronicDocuments_standardDirectionsRequired_No`,
    },
  },
});

export const getInputs = (party: Party) => ({
  bespokeDirections: {
    label: 'What directions are proposed for disclosure?',
    selector: `#${party}DQDisclosureOfNonElectronicDocuments_bespokeDirections`,
  },
});
