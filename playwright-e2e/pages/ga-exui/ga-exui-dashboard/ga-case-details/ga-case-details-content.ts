import CCDEvent from "../../../../models/ccd-events/ccdEvent";

export const tabs = {
  tasks: {
    title: 'Tasks',
    selector: "div[role='tab'] >> 'Tasks'",
  },
  application: {
    title: 'Application',
    selector: "div[role='tab'] >> 'Application'",
  },
  applicationDocs: {
    title: 'Application Documents',
    selector: "div[role='tab'] >> 'Application Documents'",
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


export const successBannerText = (formattedCaseId: string, ccdEvent: CCDEvent) =>
  `Case ${formattedCaseId} has been updated with event: ${ccdEvent.name}`;
