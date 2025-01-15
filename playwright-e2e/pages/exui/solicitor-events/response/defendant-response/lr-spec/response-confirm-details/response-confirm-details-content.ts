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
  defendant1Address: {
    label: 'Is this address correct?',
    yes: {
      label: 'Yes',
      selector: '#specAoSRespondentCorrespondenceAddressRequired_Yes',
    },
    no: {
      label: 'No',
      selector: '#specAoSRespondentCorrespondenceAddressRequired_No',
    },
  },
  defendant2Address: {
    label: 'Is this address correct?',
    yes: {
      label: 'Yes',
      selector: '#specAoSRespondent2CorrespondenceAddressRequired_Yes',
    },
    no: {
      label: 'No',
      selector: '#specAoSRespondent2CorrespondenceAddressRequired_No',
    },
  },
};
