export const subHeading = {
  claimantHeading2: "Claimant's requested court",
  remoteHearingHeading2: 'Remote Hearing',
};

export const hearingLocationDropDown = {
  text: 'Please select your preferred court hearing location',
  hint: "Where the defendant is an individual or a sole trader, the case will be held at the defendant's preferred court.",
  selectValue: {
    label: 'Select Value',
    selector: '#applicant1DQRequestedCourt_responseCourtLocations',
    option: [
      'Manchester County And Family Court - 1 Bridge Street West - M60 9DJ',
      'Caernarfon Justice Centre - Llanberis Road - LL55 2DF',
      'Central London County Court - Thomas More Building, Royal Courts of Justice, Strand, London - WC2A 2LL',
    ],
  },
  reasons: {
    label: 'Briefly explain your reasons (Optional)',
    selector: '#applicant1DQRequestedCourt_reasonForHearingAtSpecificCourt',
  },
};

export const remoteHearing = {
  text: 'Do you want the hearing to be held remotely?',
  hint: 'This will be over telephone or video',
  radioYes: {
    label: 'Yes',
    selector: '#applicant1DQRemoteHearingLRspec_remoteHearingRequested_Yes',
  },
  radioNo: {
    label: 'No',
    selector: '#applicant1DQRemoteHearingLRspec_remoteHearingRequested_No',
  },
  remoteHearingReasons: {
    label: 'Briefly explain your reasons (Optional)',
    selector: '#applicant1DQRemoteHearingLRspec_reasonForRemoteHearing',
  },
};
