export const subheadings = {
  courtLocation: 'Court Location',
};

export const dropdowns = {
  courtLocationDropdown: {
    label: 'Please select your preferred court hearing location',
    selector: '#respondToCourtLocation_responseCourtLocations',
    options: [
      'Aberystwyth Justice Centre - Y Lanfa, Trefechan, Aberystwyth - SY23 1AS',
      'Aldershot Magistrates Court - 2 Wellington Avenue, Aldershot - GU11 1NY',
    ],
  },
};

export const inputs = {
  preferredCourtReason: {
    label: 'Briefly explain your reasons (Optional)',
    selector: '#respondToCourtLocation_reasonForHearingAtSpecificCourt',
  },
};
