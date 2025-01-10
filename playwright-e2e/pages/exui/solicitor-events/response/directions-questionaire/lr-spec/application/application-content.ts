import Party from '../../../../../../../enums/party';

export const getRadioButtons = (party: Party) => ({
  yes: {
    label: 'Yes',
    selector: `#${party}DQFutureApplications_intentionToMakeFutureApplications_Yes`,
  },
  no: {
    label: 'No',
    selector: `#${party}DQFutureApplications_intentionToMakeFutureApplications_No`,
  },
});

export const getForms = (party?: Party) => ({
  whatForForm: {
    selector: `#${party}DQFutureApplications_whatWillFutureApplicationsBeMadeFor`,
  },
  otherInformationForm: {
    selector: '#additionalInformationForJudge',
  },
});
