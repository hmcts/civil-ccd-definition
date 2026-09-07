import CuiCCDEvents from '../../../models/ccd-events/cui-ccd-events/cui-ccd-events';

const cuiCCDEvents: CuiCCDEvents = {
  CREATE_LIP_CLAIM: {
    id: 'CREATE_LIP_CLAIM',
    name: 'Create LiP claim',
    description: 'Create LiP claim from citizen UI',
    order: 1,
  },
  CREATE_CLAIM_SPEC_AFTER_PAYMENT: {
    id: 'CREATE_CLAIM_SPEC_AFTER_PAYMENT',
    name: 'Case issued after payment',
    description: 'Move to case issued when fee paid',
  },
  DEFENDANT_RESPONSE_CUI: {
    id: 'DEFENDANT_RESPONSE_CUI',
    name: 'Respond to claim',
    description: 'Citizen defendant response to Specified claim',
    order: 6,
  },
  CLAIMANT_RESPONSE_CUI: {
    id: 'CLAIMANT_RESPONSE_CUI',
    name: 'View and respond to defence',
    description: 'Citizen claimant response to Specified claim',
    order: 7,
  },
  EVIDENCE_UPLOAD_APPLICANT: {
    id: 'EVIDENCE_UPLOAD_APPLICANT',
    name: 'Evidence upload applicant',
    description: 'Evidence upload applicant',
    order: 27,
  },
  EVIDENCE_UPLOAD_RESPONDENT: {
    id: 'EVIDENCE_UPLOAD_RESPONDENT',
    name: 'Evidence upload respondent',
    description: 'Evidence upload respondent',
    order: 28,
  },
  TRIAL_READINESS: {
    id: 'TRIAL_READINESS',
    name: 'Trial readiness',
    description: 'Confirm trial arrangements',
    order: 31,
  },
  REQUEST_FOR_RECONSIDERATION: {
    id: 'REQUEST_FOR_RECONSIDERATION',
    name: 'Request for reconsideration',
    description: 'Request for reconsideration check',
    order: 22,
  },
  QUERY_MANAGEMENT_RAISE: {
    id: 'queryManagementRaiseQuery',
    name: 'Raise a new query',
    description: 'Raise a new query',
    order: 31,
  },
  QUERY_MANAGEMENT_RESPOND: {
    id: 'queryManagementRespondQuery',
    name: 'Respond to a query',
    description: 'Respond to a query',
    order: 32,
  },
};

export default cuiCCDEvents;
