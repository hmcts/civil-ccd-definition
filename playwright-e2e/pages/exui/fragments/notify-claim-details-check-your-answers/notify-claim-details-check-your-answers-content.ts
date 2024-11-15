export const heading1 = 'Notify Claim';
export const heading2 = 'Certificate of Service [defendant1]';

const getDefendantHeading = (defendantNumber: number) =>
  `Certificate of Service [defendant${defendantNumber}]`;

export const defendant1Heading = getDefendantHeading(1);
export const defendant2Heading = getDefendantHeading(2);

export const subheading1 = 'Check your answers';

export const table = {
  dateOfService: {
    label: 'On what day did you serve?',
  },
  dateDeemedServed: {
    label: 'The date of service is',
  },
  documentsServed: {
    label: 'What documents did you serve?',
    defendant1Answer: 'Test Documents 1',
    defendant2Answer: 'Test Documents 2',
  },
  notifyClaimRecipient: {
    label: 'Who did you serve the claim to?',
    defendant1Answer: 'Defendant 1',
    defendant2Answer: 'Defendant 2',
  },
  documentsServedLocation: {
    label: 'The location where you served the documents was the:',
    defendant1Answer: 'Test Address 1',
    defendant2Answer: 'Test Address 2',
  },
  serveType: {
    label: 'How did you serve the documents?',
    defendant1Answer: 'Personally handed it to or left it with',
    defendant2Answer: 'Personally handed it to or left it with',
  },
  locationType: {
    label: 'Select the type of location where you served the documents',
    defendant1Answer: 'Usual Residence',
    defendant2Answer: 'Usual Residence',
  },
  name: {
    label: 'Your name',
    defendant1Answer: 'Name 1',
    defendant2Answer: 'Name 2',
  },
  firm: {
    label: 'Your firm',
    defendant1Answer: 'Law firm 1',
    defendant2Answer: 'Law firm 2',
  },
  evidenceDocument: {
    label: 'Supporting evidence',
    defendant1Answer: 'test.pdf',
    defendant2Answer: 'fileupload.txt',
  },
};

export const buttons = {
  submit: {
    label: 'Submit',
    selector: "button[type='submit']",
  },
};