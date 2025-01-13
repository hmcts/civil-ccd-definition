import Party from '../../../../../../../enums/party';

export const getDropdowns = {
  dropdown: {
    selector: (party: Party) => `#${party}DQRequestedCourt_responseCourtLocations`,
    options: [
      'Aberystwyth Justice Centre - Y Lanfa, Trefechan, Aberystwyth - SY23 1AS',
      'Aldershot Magistrates Court - 2 Wellington Avenue, Aldershot - GU11 1NY',
    ],
  },
};

export const getInputs = {
  preferredCourtReasonForm: {
    selector: (party: Party) => `#${party}DQRequestedCourt_reasonForHearingAtSpecificCourt`,
  },
  heldRemotelyReasonForm: {
    selector: (party: Party) => `#${party}DQRemoteHearingLRspec_reasonForRemoteHearing`,
  },
};

export const getRadioButtons = {
  radioYes: {
    selector: (party: Party) => `#${party}DQRemoteHearing_remoteHearingRequested_Yes`,
  },
  radioNo: {
    selector: (party: Party) => `#${party}DQRemoteHearing_remoteHearingRequested_No`,
  },
};
