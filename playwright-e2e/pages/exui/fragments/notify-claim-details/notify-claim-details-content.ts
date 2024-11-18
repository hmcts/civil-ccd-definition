export const heading1 = 'Notify claim';
const getDefendantHeading = (defendantNumber: number) =>
  `Certificate of Service [defendant${defendantNumber}]`;

export const defendant1Heading = getDefendantHeading(1);
export const defendant2Heading = getDefendantHeading(2);

const getInputs = (defendantNumber: number) => ({
  dateOfService: {
    label: 'On what day did you serve?',
    day: {
      label: 'Day',
      selector: '#cosDateOfServiceForDefendant-day',
    },
    month: {
      label: 'Month',
      selector: '#cosDateOfServiceForDefendant-month',
    },
    year: {
      label: 'Year',
      selector: '#cosDateOfServiceForDefendant-year',
    },
  },
  dateDeemedServed: {
    label: 'The date of service is',
    day: {
      label: 'Day',
      selector: '#cosDateDeemedServedForDefendant-day',
    },
    month: {
      label: 'Month',
      selector: '#cosDateDeemedServedForDefendant-month',
    },
    year: {
      label: 'Year',
      selector: '#cosDateDeemedServedForDefendant-year',
    },
  },
  documentsServed: {
    label: 'What documents did you serve?',
    selector: `#cosNotifyClaimDetails${defendantNumber}_cosServedDocumentFiles`,
  },
  documentsServedLocation: {
    label: 'Where did you serve the documunts',
    selector: `#cosNotifyClaimDetails${defendantNumber}_cosRecipientServeLocation`,
  },
  notifyClaimRecipient: {
    label: 'Who did you serve the claim to?',
    selector: `#cosNotifyClaimDetails${defendantNumber}_cosRecipient`,
  },
  name: {
    label: 'Your name',
    selector: `#cosNotifyClaimDetails${defendantNumber}_cosSender`,
  },
  firm: {
    label: 'Your firm',
    selector: `#cosNotifyClaimDetails${defendantNumber}_cosSenderFirm`,
  },
  evidenceDocument: {
    label: 'Supporting evidence',
    selector: `#cosNotifyClaimDetails${defendantNumber}_cosEvidenceDocument_value`,
  },
});

export const defendant1Inputs = getInputs(1);
export const defendant2Inputs = getInputs(2);

const getDropdowns = (defendantNumber: number) => ({
  serveType: {
    label: 'How did you serve the documents?',
    selector: `#cosNotifyClaimDetails${defendantNumber}_cosRecipientServeType`,
    options: [
      'Personally handed it to or left it with',
      'Delivered to or left at permitted place',
      'Sent by first class post or another service which delivers on the next business day',
      'Other means permitted by the court',
    ],
  },
  locationType: {
    label: 'Select the type of location where you served the documents',
    selector: `#cosNotifyClaimDetails${defendantNumber}_cosRecipientServeLocationType`,
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
});

export const defendant1Dropdowns = getDropdowns(1);
export const defendant2Dropdowns = getDropdowns(2);

const getRadioButtons = (defendantNumber: number) => ({
  litigationFriend: {
    label: "litigation friend's",
    selector: `#cosNotifyClaimDetails${defendantNumber}_cosRecipientServeLocationOwnerType-FRIEND`,
  },
  solicitor: {
    label: "solicitor's",
    selector: `#cosNotifyClaimDetails${defendantNumber}_cosRecipientServeLocationOwnerType-SOLICITOR`,
  },
  defendant: {
    label: "defendant's",
    selector: `#cosNotifyClaimDetails${defendantNumber}_cosRecipientServeLocationOwnerType-DEFENDANT`,
  },
  claimant: {
    label: "claimant's",
    selector: `#cosNotifyClaimDetails${defendantNumber}_cosRecipientServeLocationOwnerType-CLAIMANT`,
  },
});

export const defendant1RadioButtons = getRadioButtons(1);
export const defendant2RadioButtons = getRadioButtons(2);

const getCheckboxes = (defendantNumber: number) => ({
  signedTrue: {
    label: 'I believe that the facts stated in the certificate are true',
    selector: `#cosNotifyClaimDetails${defendantNumber}_cosUISenderStatementOfTruthLabel-CERTIFIED`,
  },
});

export const defendant1Checkboxes = getCheckboxes(1);
export const defendant2Checkboxes = getCheckboxes(2);

const getButtons = (defendantNumber: number) => ({
  continue: {
    title: 'Continue',
    selector: "button[type='submit']",
  },
  addNewSupportingEvidence: {
    title: 'Add new',
    selector: `div[id='cosNotifyClaimDetails${defendantNumber}_cosEvidenceDocument'] button[class='button write-collection-add-item__top']`,
  },
});

export const defendant1Buttons = getButtons(1);
export const defendant2Buttons = getButtons(2);
