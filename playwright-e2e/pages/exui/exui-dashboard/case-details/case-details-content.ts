import { CCDEvent } from '../../../../models/ccd/ccd-events';

export const tabs = {
  summary: {
    title: 'Summary',
    selector: "div[role='tab'] >> 'Summary'",
  },
  caseFile: {
    title: 'Case File',
    selector: "div[role='tab'] >> 'Case File'",
  },
  claimDetails: {
    title: 'Claim details',
    selector: "div[role='tab'] >> 'Claim details'",
  },
  history: {
    title: 'History',
    selector: "div[role='tab'] >> 'History'",
  },
  claimDocs: {
    title: 'Claim documents',
    selector: "div[role='tab'] >> 'Claim documents'",
  },
  listingNotes: {
    title: 'List notes',
    selector: "div[role='tab'] >> 'List notes'",
  },
  paymentHistory: {
    title: 'Payment History',
    selector: "div[role='tab'] >> 'Payment History'",
  },
  serviceRequest: {
    title: 'Service Request',
    selector: "div[role='tab'] >> 'Service Request'",
  },
  bundles: {
    title: 'Bundles',
    selector: "div[role='tab'] >> 'Bundles'",
  },
  caseFlags: {
    title: 'Case Flags',
    selector: "div[role='tab'] >> 'Case Flags'",
  },
};

export const dropdowns = {
  nextStep: {
    label: 'Next step',
    selector: '#next-step',
  },
};

export const buttons = {
  go: {
    title: 'go',
    selector: "button[type='submit']",
  },
};

export const containers = {
  eventHistory: {
    selector: '.EventLogTable',
  },
  errors: {
    selector: '#errors',
  },
  verifyDetails: {
    claimant1: {
      selector: '#case-viewer-field-read--applicant1'},
    claimant1Experts: {
      selector: '#case-viewer-field-read--applicant1DQExperts'},
    claimant1Witnesses: {
      selector: '#case-viewer-field-read--applicant1DQWitnesses'},
    claimant2: {
      selector: '#case-viewer-field-read--applicant2'},
    claimant2Experts: {
      selector: '#case-viewer-field-read--applicant2DQExperts'},
    claimant2Witnesses: {
      selector: '#case-viewer-field-read--applicant2DQWitnesses'},
    defendant1: {
      selector: '#case-viewer-field-read--respondent1DetailsForClaimDetailsTab'},
    defendant1Experts: {
      selector: '#case-viewer-field-read--respondent1DQExperts'},
    defendant1Witnesses: {
      selector: '#case-viewer-field-read--respondent1DQWitnesses'},
    respondent1LitigationFriend: {
      selector: '#case-viewer-field-read--respondent1LitigationFriend'},
    defendant2: {
      selector: '#case-viewer-field-read--respondent2DetailsForClaimDetailsTab'},
    defendant2Experts: {
      selector: '#case-viewer-field-read--respondent2DQExperts'},
    defendant2Witnesses: {
      selector: '#case-viewer-field-read--respondent2DQWitnesses'},
    defendant2LitigationFriend: {
      selector: '#case-viewer-field-read--respondent2LitigationFriend'},
  }
};

export const successBannerText = (formattedCaseId: string, ccdEvent: CCDEvent) =>
  `Case ${formattedCaseId} has been updated with event: ${ccdEvent.name}`;

export const caseFlagsNoticeText = (activeCaseFlags: number) =>
  `There ${activeCaseFlags === 1 ? 'is' : 'are'} ${activeCaseFlags} active flag${activeCaseFlags === 1 ? '' : 's'} on this case.`;

export const labels = {
  firstName: 'First name',
  lastName: 'Last name',
  dateOfBirth: 'Date of birth',
  email: 'Email',
  companyName: 'Name',
  building: 'Building and Street',
  addressLine2: 'Address Line 2',
  addressLine3: 'Address Line 3',
  postTown: 'Town or City',
  county: 'County',
  postCode: 'Postcode/Zipcode',
  country: 'Country',
};

