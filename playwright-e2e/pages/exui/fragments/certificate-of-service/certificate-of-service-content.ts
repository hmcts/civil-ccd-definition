import { Party } from '../../../../models/partys';

export const heading = (claimantParty: Party) =>
  `Certificate of Service [defendant${claimantParty.number}]`;

export const inputs = {
  dateOfService: {
    label: 'On what day did you serve?',
  },
  dateDeemedServed: {
    label: 'The date of service is',
  },
  documentsServed: {
    label: 'What documents did you serve?',
    selector: (claimantParty: Party) =>
      `#cosNotifyClaimDefendant${claimantParty.number}_cosServedDocumentFiles`,
  },
  documentsServedLocation: {
    label: 'Where did you serve the documunts',
    selector: (claimantParty: Party) =>
      `#cosNotifyClaimDefendant${claimantParty.number}_cosRecipientServeLocation`,
  },
  notifyClaimRecipient: {
    label: 'Who did you serve the claim to?',
    selector: (claimantParty: Party) =>
      `#cosNotifyClaimDefendant${claimantParty.number}_cosRecipient`,
  },
  statementOfTruth: {
    name: {
      label: 'Your name',
      selector: (claimantParty: Party) =>
        `#cosNotifyClaimDefendant${claimantParty.number}_cosSender`,
    },
    firm: {
      label: 'Your firm',
      selector: (claimantParty: Party) =>
        `#cosNotifyClaimDefendant${claimantParty.number}_cosSenderFirm`,
    },
  },
  evidenceDocument: {
    label: 'Supporting evidence',
    selector: (claimantParty: Party) =>
      `#cosNotifyClaimDetails${claimantParty.number}_cosEvidenceDocument_value`,
  },
};

export const dropdowns = {
  serveType: {
    label: 'How did you serve the documents?',
    selector: (claimantParty: Party) =>
      `#cosNotifyClaimDefendant${claimantParty.number}_cosRecipientServeType`,
    options: [
      'Personally handed it to or left it with',
      'Delivered to or left at permitted place',
      'Sent by first class post or another service which delivers on the next business day',
      'Other means permitted by the court',
    ],
  },
  locationType: {
    label: 'Select the type of location where you served the documents',
    selector: (claimantParty: Party) =>
      `#cosNotifyClaimDefendant${claimantParty.number}_cosRecipientServeLocationType`,
    options: [
      'Usual Residence',
      'Last known residence',
      'Place of business of the partnership/company/corporation within the jurisdiction with a connection to the claim',
      'Principal office of the company',
      'Principal office of the coropration',
      'Principal office of the partnership',
      'Last known principal place of business',
      'Principal place of business',
      'Place of business',
      'Email',
      'Other',
    ],
  },
};

export const radioButtons = {
  docsServed: {
    label: 'The location where you served the documents was the:',
    litigationFriend: {
      label: "litigation friend's",
      selector: (claimantParty: Party) =>
        `#cosNotifyClaimDefendant${claimantParty.number}_cosRecipientServeLocationOwnerType-FRIEND`,
    },
    solicitor: {
      label: "solicitor's",
      selector: (claimantParty: Party) =>
        `#cosNotifyClaimDefendant${claimantParty.number}_cosRecipientServeLocationOwnerType-SOLICITOR`,
    },
    defendant: {
      label: "defendant's",
      selector: (claimantParty: Party) =>
        `#cosNotifyClaimDefendant${claimantParty.number}_cosRecipientServeLocationOwnerType-DEFENDANT`,
    },
    claimant: {
      label: "claimant's",
      selector: (claimantParty: Party) =>
        `#cosNotifyClaimDefendant${claimantParty.number}_cosRecipientServeLocationOwnerType-CLAIMANT`,
    },
  },
};

export const checkboxes = {
  signedTrue: {
    label: 'I believe that the facts stated in the certificate are true',
    selector: (claimantParty: Party) =>
      `#cosNotifyClaimDefendant${claimantParty.number}_cosUISenderStatementOfTruthLabel-CERTIFIED`,
  },
};

export const buttons = {
  addNewSupportingEvidence: {
    title: 'Add new',
    selector: (claimantParty: Party) =>
      `div[id='cosNotifyClaimDetails${claimantParty.number}_cosEvidenceDocument'] button[class='button write-collection-add-item__top']`,
  },
};
