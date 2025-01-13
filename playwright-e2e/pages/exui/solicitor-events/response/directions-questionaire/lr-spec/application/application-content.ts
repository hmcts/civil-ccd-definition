import Party from '../../../../../../../enums/party';

export const getRadioButtons = {
  yes: {
    label: 'Yes',
    selector: (party: Party) =>
      `#${party}DQFutureApplications_intentionToMakeFutureApplications_Yes`,
  },
  no: {
    label: 'No',
    selector: (party: Party) =>
      `#${party}DQFutureApplications_intentionToMakeFutureApplications_No`,
  },
};

export const getForms = {
  whatForForm: {
    selector: (party: Party) => `#${party}DQFutureApplications_whatWillFutureApplicationsBeMadeFor`,
  },
  otherInformationForm: {
    selector: '#additionalInformationForJudge',
  },
};
