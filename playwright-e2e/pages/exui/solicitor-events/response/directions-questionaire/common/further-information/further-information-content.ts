import Party from '../../../../../../../enums/party';

export const subheadings = {
 information : 'Further information'
};

export const getRadioButtons = (party : Party) => ({
  yes: {
    selector: `#${party}DQFurtherInformation_futureApplications_Yes`,
  },
  no: {
    selector: `#${party}DQFurtherInformation_futureApplications_No`,
  },
});

export const getReasonForFutureApplications = (party : Party) => ({
  selector: `#${party}DQFurtherInformation_reasonForFutureApplications`,
});

export const getfurtherInformationForm = (party: Party) => ({
  selector: `#${party}DQFurtherInformation_otherInformationForJudge`,
});
