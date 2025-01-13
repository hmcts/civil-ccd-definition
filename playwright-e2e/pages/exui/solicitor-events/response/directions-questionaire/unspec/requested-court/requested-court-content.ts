import Party from '../../../../../../../enums/party';

export const getDropdowns = (party: Party) => ({
  dropdown: {
    selector: `#${party}DQRequestedCourt_responseCourtLocations`,
    options: [
      'Aberystwyth Justice Centre - Y Lanfa, Trefechan, Aberystwyth - SY23 1AS',
      'Aldershot Magistrates Court - 2 Wellington Avenue, Aldershot - GU11 1NY',
    ],
  },
});

export const getInputs = (party?: Party) => ({
  preferredCourtReasonForm: {
    selector: `#${party}DQRequestedCourt_reasonForHearingAtSpecificCourt`,
  },
  heldRemotelyReasonForm: {
    selector: `#${party}DQRemoteHearingLRspec_reasonForRemoteHearing`,
  },
});

export const getRadioButtons = (party: Party) => ({
  radioYes: {
    selector: `#${party}DQRemoteHearing_remoteHearingRequested_Yes`,
  },
  radioNo: {
    selector: `#${party}DQRemoteHearing_remoteHearingRequested_No`,
  },
});
