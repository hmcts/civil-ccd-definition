import { Party } from '../../../../../../../models/partys';

export const heading = "Defendant's legal representative's reference (optional)";

export const inputs = {
  defendantSolicitorReference: {
    label: "Defendant's legal representative's reference (Optional)",
    selector: '#solicitorReferences_respondentSolicitor1Reference',
  },
  defendant1DateOfBirth: {
    label: "Defendant's date of birth (Optional)",
  },
  defendant2DateOfBirth: {
    label: "Second defendant's date of birth (Optional)",
  },
};

export const tableHeadings = {
  organisation: 'Organisation',
  reference: 'Reference',
};

export const radioButtons = {
  defendantAddress: {
    label: 'Is this address correct?',
    yes: {
      label: 'Yes',
      selector: (defendantParty: Party) => {
        if (defendantParty.number === 1) {
          return '#specAoSRespondentCorrespondenceAddressRequired_Yes';
        } else {
          return '#specAoSRespondent2CorrespondenceAddressRequired_Yes';
        }
      },
    },
    no: {
      label: 'No',
      selector: (defendantParty: Party) => {
        if (defendantParty.number === 1) {
          return '#specAoSRespondentCorrespondenceAddressRequired_No';
        } else {
          return '#specAoSRespondent2CorrespondenceAddressRequired_No';
        }
      },
    },
  },
};
