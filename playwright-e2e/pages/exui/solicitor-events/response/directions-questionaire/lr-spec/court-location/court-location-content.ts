import Party from '../../../../../../../enums/party';

export const courtLocationDropdown = {
  label: 'Please select your preferred court hearing location',
  dropdown: {
    text: '--Select a value--',
    selector: '#respondToCourtLocation_responseCourtLocations',
    options: [
      'Aberystwyth Justice Centre - Y Lanfa, Trefechan, Aberystwyth - SY23 1AS',
      'Aldershot Magistrates Court - 2 Wellington Avenue, Aldershot - GU11 1NY',
    ],
  },
};

export const courtLocationDropdown1v2 = {
  label: 'Please select your preferred court hearing location',
  dropdown: {
    text: '--Select a value--',
    selector: '#respondToCourtLocation2_responseCourtLocations',
    options: [
      'Aberystwyth Justice Centre - Y Lanfa, Trefechan, Aberystwyth - SY23 1AS',
      'Aldershot Magistrates Court - 2 Wellington Avenue, Aldershot - GU11 1NY',
    ],
  },
};

export const courtLocationDropdownUnspecAndSpec2v1 = {
  label: 'Please select your preferred court hearing location',
  dropdown: {
    text: '--Select a value--',
    selector: (party: Party) => `#${party}DQRequestedCourt_responseCourtLocations`,
    options: [
      'Aberystwyth Justice Centre - Y Lanfa, Trefechan, Aberystwyth - SY23 1AS',
      'Aldershot Magistrates Court - 2 Wellington Avenue, Aldershot - GU11 1NY',
    ],
  },
};

export const reasonForm = {
  heading: 'Briefly explain your reasons (Optional)',
  selector: '#respondToCourtLocation_reasonForHearingAtSpecificCourt',
};

export const subHeading1v1 = 'Remote hearing';
export const subHeadingMultiDefendant = 'Remote Hearing';

export const remoteHearingRadioButtons = {
  text: {
    label: 'Do you want the hearing to be held remotely?',
    hint: 'This will be over telephone or video',
  },
  radioYes: {
    label: 'Yes',
    selector: (party: Party) => `#${party}DQRemoteHearingLRspec_remoteHearingRequested_Yes`,
  },
  radioNo: {
    label: 'No',
    selector: (party: Party) => `#${party}DQRemoteHearingLRspec_remoteHearingRequested_No`,
  },
};

export const remoteHearingRadioButtonsUnspecAndSpec2v1 = {
  text: {
    label: 'Do you want the hearing to be held remotely?',
    hint: 'This will be over telephone or video',
  },
  radioYes: {
    label: 'Yes',
    selector: (party: Party) => `#${party}DQRemoteHearing_remoteHearingRequested_Yes`,
  },
  radioNo: {
    label: 'No',
    selector: (party: Party) => `#${party}DQRemoteHearing_remoteHearingRequested_No`,
  },
};
