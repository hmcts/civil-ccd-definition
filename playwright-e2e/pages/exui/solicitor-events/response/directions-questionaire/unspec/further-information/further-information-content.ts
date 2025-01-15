import Party from '../../../../../../../enums/party';

export const heading = 'Further information';

export const radioButtons = {
  yes: {
    selector: (party: Party) => `#${party}DQFurtherInformation_futureApplications_Yes`,
  },
  no: {
    selector: (party: Party) => `#${party}DQFurtherInformation_futureApplications_No`,
  },
};

export const form = {
  whatForForm: {
    selector: (party: Party) => `#${party}DQFurtherInformation_reasonForFutureApplications`,
  },
  furtherInformationForm: {
    selector: (party: Party) => `#${party}DQFurtherInformation_otherInformationForJudge`,
  },
};
