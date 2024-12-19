import CaseDataHelper from '../../../../helpers/case-data-helper';
import { CCDEvent } from '../../../../models/ccd/ccd-events';

export const tabs = {
  summary: {
    title: 'Summary',
  },
  caseFile: {
    title: 'Case File',
  },
  claimDetails: {
    title: 'Claim details',
  },
  history: {
    title: 'History',
  },
  claimDocs: {
    title: 'Claim documents',
  },
  listingNotes: {
    title: 'List notes',
  },
  paymentHistory: {
    title: 'Payment History',
  },
  serviceRequest: {
    title: 'Service Request',
  },
  bundles: {
    title: 'Bundles',
  },
  caseFlags: {
    title: 'Case Flags',
  },
};

export const dropdowns = {
  nextStep: {
    label: 'Next step',
    selector: '#next-step',
    options: ['Claim notes'],
  },
  selectAction: {
    label: 'Select action',
    selector: '#next-step',
    options: ['Manage Documents', 'Add a case note'],
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
};

export const getSuccessBannerText = (caseId: number, ccdEvent: CCDEvent) =>
  `Case ${CaseDataHelper.formatCaseId(caseId)} has been updated with event: ${ccdEvent.name}`;
