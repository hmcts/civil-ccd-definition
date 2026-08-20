import GaCCDEvents from "../../../models/ccd-events/ga-ccd-events/ga-ccd-events";

const gaCCDEvents: GaCCDEvents = {
  INITIATE_GENERAL_APPLICATION_AFTER_PAYMENT: {
    id: 'INITIATE_GENERAL_APPLICATION_AFTER_PAYMENT',
    name: 'General App after Payment',
    description: 'Applicant response after payment',
    order: 0
  },
  RESPOND_TO_APPLICATION: {
    id: 'RESPOND_TO_APPLICATION',
    name: 'Respond to application',
    description: 'Applicant response',
    order: 2
  },
  MAKE_DECISION: {
    id: 'MAKE_DECISION',
    description: 'Judge makes decision',
    name: 'Make decision',
    order: 3
  },
  RESPOND_TO_JUDGE_ADDITIONAL_INFO: {
    id: 'RESPOND_TO_JUDGE_ADDITIONAL_INFO',
    description: 'Respond to Judge Additional Info',
    name: 'Respond to Judge Additional Info',
    order: 4
  }
};

export default gaCCDEvents;
