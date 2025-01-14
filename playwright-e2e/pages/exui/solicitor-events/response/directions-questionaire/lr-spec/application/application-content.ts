import { Party } from '../../../../../../../models/partys';

export const subheadings = {
  application: 'Application',
};

export const radioButtons = {
  application: {
    label: 'Do you intend to make any applications in the future?',
    yes: {
      label: 'Yes',
      selector: (party: Party) =>
        `#${party.oldKey}DQFutureApplications_intentionToMakeFutureApplications_Yes`,
    },
    no: {
      label: 'No',
      selector: (party: Party) =>
        `#${party.oldKey}DQFutureApplications_intentionToMakeFutureApplications_No`,
    },
  },
};

export const inputs = {
  whatFor: {
    label: 'What for?',
    selector: (party: Party) =>
      `#${party.oldKey}DQFutureApplications_whatWillFutureApplicationsBeMadeFor`,
  },
  otherInformation: {
    label: 'Provide any other information the judge may need (Optional)',
    selector: '#additionalInformationForJudge',
  },
};
