export const heading = 'Court location';

export const courtLocationDropdown = {
  label: 'Please select your preferred court hearing location',
  dropdown: {
    text: '--Select a value--',
    selector: '#respondToCourtLocation_responseCourtLocations',
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
