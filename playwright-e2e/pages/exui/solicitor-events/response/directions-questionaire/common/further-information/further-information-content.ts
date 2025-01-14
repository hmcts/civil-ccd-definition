import Party from '../../../../../../../enums/party';

export const subheadings = {
 information : 'Further information'
};

export const getRadioButtons = (party : Party) => ({
  label : 'Do you intend to make any applications in the future?',
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
  label : 'Please provide any further information the Judge may need, ' +
    'including if you do not agree with the provisional track allocation of this claim (Optional)',
  selector: `#${party}DQFurtherInformation_otherInformationForJudge`,
});
