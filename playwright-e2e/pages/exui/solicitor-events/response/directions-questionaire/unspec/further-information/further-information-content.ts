import Party from '../../../../../../../enums/party';

export const heading = 'Further information';

export const radioButtons = (party: Party) => ({
  yes: {
    selector: `#${party}DQFurtherInformation_futureApplications_Yes`,
  },
  no: {
    selector: `#${party}DQFurtherInformation_futureApplications_No`,
  },
});

export const form = (party: Party) => ({
  whatForForm: {
    selector: `#${party}DQFurtherInformation_reasonForFutureApplications`,
  },
  furtherInformationForm: {
    selector: `#${party}DQFurtherInformation_otherInformationForJudge`,
  },
});
