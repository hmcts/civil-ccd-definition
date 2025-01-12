import { Party } from '../../../../models/partys';

export const subheadings = {
  litigationFriendAddress: "Litigation friend's address",
  uploadcertificate: 'Upload the certificate of suitability',
};

export const inputs = {
  litigationFriendDetails: {
    firstName: {
      label: 'First name',
      selector: (party: Party) => `#${party.oldKey}_firstName`,
    },
    lastName: {
      label: 'Last Name',
      selector: (party: Party) => `#${party.oldKey}_lastName`,
    },
    email: {
      label: 'Email address (Optional)',
      selector: (party: Party) => `#${party.oldKey}_emailAddress`,
    },
    phoneNumber: {
      label: 'Phone number (Optional)',
      selector: (party: Party) => `#${party.oldKey}_phoneNumber`,
    },
  },
  certificateOfSuitability: {
    uploadDoc: {
      label: 'Document',
      selector: (party: Party) => `#${party.oldKey}_certificateOfSuitability_0_document`,
    },
  },
};

export const radioButtons = {
  address: {
    yes: {
      label: 'Yes',
      selector: (party: Party) => `#${party.oldKey}_hasSameAddressAsLitigant_Yes`,
    },
    no: {
      label: 'Yes',
      selector: (party: Party) => `#${party.oldKey}_hasSameAddressAsLitigant_No`,
    },
  },
};

export const buttons = {
  addNewCertificate: {
    title: 'Add new',
    selector: (party: Party) =>
      `div[id='${party.oldKey}_certificateOfSuitability'] button[type='button']`,
  },
};
