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

export const reasonForm = {
  heading: 'Briefly explain your reasons (Optional)',
  selector: '#respondToCourtLocation_reasonForHearingAtSpecificCourt',
};

export const subHeading = 'Remote hearing';

export const remoteHearingRadioButtons = {
  text: {
    label: 'Do you want the hearing to be held remotely?',
    hint: 'This will be over telephone or video',
  },
  radioYes: {
    label: 'Yes',
    selector: '#respondent1DQRemoteHearingLRspec_remoteHearingRequested_Yes',
  },
  radioNo: {
    label: 'No',
    selector: '#respondent1DQRemoteHearingLRspec_remoteHearingRequested_No',
  },
};
