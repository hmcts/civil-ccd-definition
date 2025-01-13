import { Party } from '../../../../../../../models/partys';
import StringHelper from '../../../../../../../helpers/string-helper';

export const subheadings = { disclosureOfDocs: 'Disclosure of electronic documents' };

export const getRadioButtons = (party: Party) => {
  return {
    disclosureOfElectronicDocs: {
      label:
        'Have you reached agreement, either using Electronic Documents Questionnaire in Practice Direction 31B or otherwise, about the scope and extent of disclosure of electronic documents on each side?',
      yes: {
        label: 'Yes',
        selector: `#spec${StringHelper.capitalise(party)}DQDisclosureOfElectronicDocuments_reachedAgreement_Yes`,
      },
      no: {
        label: 'No',
        selector: `#spec${StringHelper.capitalise(party)}DQDisclosureOfElectronicDocuments_reachedAgreement_No`,
      },
    },
    agreement: {
      label: 'Is such an agreement likely?',
      yes: {
        label: 'Yes',
        selector: `#spec${StringHelper.capitalise(party)}DQDisclosureOfElectronicDocuments_agreementLikely_Yes`,
      },
      no: {
        label: 'No',
        selector: `#spec${StringHelper.capitalise(party)}DQDisclosureOfElectronicDocuments_agreementLikely_No`,
      },
    },
  };
};

export const getInputs = (party: Party) => ({
  disagreementReason: {
    label: 'What are the issues?',
    selector: `#spec${StringHelper.capitalise(party)}DQDisclosureOfElectronicDocuments_reasonForNoAgreement`,
  },
});
