import Party from '../../../../../../../enums/party';

export const subHeadings = {
 hearing1v1: 'Remote hearing',
 hearingMultiDefendant : 'Remote Hearing'
}

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

export const getCourtLocationDropdownUnspecAndSpec2v1 = (party : Party) => ({
  label: 'Please select your preferred court hearing location',
  dropdown: {
    text: '--Select a value--',
    selector: `#${party}DQRequestedCourt_responseCourtLocations`,
    options: [
      'Aberystwyth Justice Centre - Y Lanfa, Trefechan, Aberystwyth - SY23 1AS',
      'Aldershot Magistrates Court - 2 Wellington Avenue, Aldershot - GU11 1NY',
    ],
  },
});

export const reasonForm = {
  heading: 'Briefly explain your reasons (Optional)',
  selector: '#respondToCourtLocation_reasonForHearingAtSpecificCourt',
};


export const getRemoteHearingRadioButtons = (party : Party) => ({
  text: {
    label: 'Do you want the hearing to be held remotely?',
    hint: 'This will be over telephone or video',
  },
  radioYes: {
    label: 'Yes',
    selector: `#${party}DQRemoteHearingLRspec_remoteHearingRequested_Yes`,
  },
  radioNo: {
    label: 'No',
    selector: `#${party}DQRemoteHearingLRspec_remoteHearingRequested_No`,
  },
});

export const getRemoteHearingRadioButtonsUnspecAndSpec2v1 = (party : Party) => ({
  text: {
    label: 'Do you want the hearing to be held remotely?',
    hint: 'This will be over telephone or video',
  },
  radioYes: {
    label: 'Yes',
    selector: `#${party}DQRemoteHearing_remoteHearingRequested_Yes`,
  },
  radioNo: {
    label: 'No',
    selector: `#${party}DQRemoteHearing_remoteHearingRequested_No`,
  },
});
