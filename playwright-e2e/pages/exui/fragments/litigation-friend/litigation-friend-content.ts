import { Party } from '../../../../models/partys';

export const subheadings = {
  litigationFriendAddress: "Litigation friend's address",
  uploadcertificate: 'Upload the certificate of suitability',
};

export const inputs = {
  litigationFriendDetails: {
    firstName: {
      label: 'First name',
      selector: (litigationFriendParty: Party) => `#${litigationFriendParty.oldKey}_firstName`,
    },
    lastName: {
      label: 'Last Name',
      selector: (litigationFriendParty: Party) => `#${litigationFriendParty.oldKey}_lastName`,
    },
    email: {
      label: 'Email address (Optional)',
      selector: (litigationFriendParty: Party) => `#${litigationFriendParty.oldKey}_emailAddress`,
    },
    phoneNumber: {
      label: 'Phone number (Optional)',
      selector: (litigationFriendParty: Party) => `#${litigationFriendParty.oldKey}_phoneNumber`,
    },
  },
  certificateOfSuitability: {
    uploadDoc: {
      label: 'Document',
      selector: (litigationFriendParty: Party) =>
        `#${litigationFriendParty.oldKey}_certificateOfSuitability_0_document`,
    },
  },
};

export const radioButtons = {
  address: {
    yes: {
      label: 'Yes',
      selector: (litigationFriendParty: Party) =>
        `#${litigationFriendParty.oldKey}_hasSameAddressAsLitigant_Yes`,
    },
    no: {
      label: 'Yes',
      selector: (litigationFriendParty: Party) =>
        `#${litigationFriendParty.oldKey}_hasSameAddressAsLitigant_No`,
    },
  },
};

export const buttons = {
  addNewCertificate: {
    title: 'Add new',
    selector: (litigationFriendParty: Party) =>
      `div[id='${litigationFriendParty.oldKey}_certificateOfSuitability'] button[type='button']`,
  },
};
