import { Party } from '../../../../../../../models/partys';
import StringHelper from '../../../../../../../helpers/string-helper';

export const subheadings = { disclosureOfDocs: 'Disclosure of electronic documents' };

export const radioButtons = {
  disclosureOfElectronicDocs: {
    label:
      'Have you reached agreement, either using Electronic Documents Questionnaire in Practice Direction 31B or otherwise, about the scope and extent of disclosure of electronic documents on each side?',
    yes: {
      label: 'Yes',
      selector: (claimantDefendantParty: Party) =>
        `#spec${StringHelper.capitalise(claimantDefendantParty.oldKey)}DQDisclosureOfElectronicDocuments_reachedAgreement_Yes`,
    },
    no: {
      label: 'No',
      selector: (claimantDefendantParty: Party) =>
        `#spec${StringHelper.capitalise(claimantDefendantParty.oldKey)}DQDisclosureOfElectronicDocuments_reachedAgreement_No`,
    },
  },
  agreement: {
    label: 'Is such an agreement likely?',
    yes: {
      label: 'Yes',
      selector: (claimantDefendantParty: Party) =>
        `#spec${StringHelper.capitalise(claimantDefendantParty.oldKey)}DQDisclosureOfElectronicDocuments_agreementLikely_Yes`,
    },
    no: {
      label: 'No',
      selector: (claimantDefendantParty: Party) =>
        `#spec${StringHelper.capitalise(claimantDefendantParty.oldKey)}DQDisclosureOfElectronicDocuments_agreementLikely_No`,
    },
  },
};

export const inputs = {
  disagreementReason: {
    label: 'What are the issues?',
    selector: (claimantDefendantParty: Party) =>
      `#spec${StringHelper.capitalise(claimantDefendantParty.oldKey)}DQDisclosureOfElectronicDocuments_reasonForNoAgreement`,
  },
};
