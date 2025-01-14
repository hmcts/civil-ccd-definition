import Party from '../../../../../../../enums/party';

export const subheadings = {
 supportNeeds: 'Support with access needs' };

export const getRadioButtons = (party: Party)  => ({
    text: {
      label: 'Does anyone require support for a court hearing ?',
    },
    radioYes: {
      label: 'Yes',
      selector: `#${party}DQHearingSupport_supportRequirements_Yes`,
    },
    radioNo: {
      label: 'No',
      selector: `#${party}DQHearingSupport_supportRequirements_No`,
    },
    supportRequirement: {
      label:
        'Please name all people who need support and the kind of ' +
        'support they will need. For example, Jane Smith: requires wheelchair access.',
      selector: `#${party}DQHearingSupport_supportRequirementsAdditional`,
    },
});

