export const hearingTypeRadio = {
  inPerson: {
    label: 'In person',
    selector: '#hearingSupportRequirementsDJ_hearingType-IN_PERSON',
  },
  video: {
    label: 'Video conference hearing',
    selector: '#hearingSupportRequirementsDJ_hearingType-VIDEO_CONF',
  },
  telephone: {
    label: 'Telephone hearing',
    selector: '#hearingSupportRequirementsDJ_hearingType-TELEPHONE_HEARING',
    textAreaSelector: '#hearingSupportRequirementsDJ_hearingTypeTelephoneHearing',
  },
};

export const locationDropdown = {
  selector: '#hearingSupportRequirementsDJ_hearingTemporaryLocation',
  option: 'Aberystwyth Justice Centre - Y Lanfa, Trefechan, Aberystwyth - SY23 1AS',
};

export const input = {
  telephoneNumber: '#hearingSupportRequirementsDJ_hearingPreferredTelephoneNumber1',
  email: '#hearingSupportRequirementsDJ_hearingPreferredEmail',
};

export const cannotAttendRadio = {
  yes: {
    label: 'Yes',
    selector: '#hearingSupportRequirementsDJ_hearingUnavailableDates_Yes',
  },
  no: {
    label: 'No',
    selector: '#hearingSupportRequirementsDJ_hearingUnavailableDates_No',
  },
};

export const buttons = {
  title: 'Add new',
  selector: `div[id='hearingSupportRequirementsDJ_hearingDates'] button[class='button write-collection-add-item__top']`,
};

export const dateRange = {
  dayFrom: '#hearingUnavailableFrom-day',
  monthFrom: '#hearingUnavailableFrom-month',
  yearFrom: '#hearingUnavailableFrom-year',
  dateTo: '#hearingUnavailableUntil-day',
  monthTo: '#hearingUnavailableUntil-month',
  yearTo: '#hearingUnavailableUntil-year',
};

export const requireSupportRadio = {
  yes: {
    label: 'Yes',
    selector: '#hearingSupportRequirementsDJ_hearingSupportQuestion_Yes',
    textAreaSelector: '#hearingSupportRequirementsDJ_hearingSupportAdditional',
  },
  no: {
    label: 'No',
    selector: '#hearingSupportRequirementsDJ_hearingSupportQuestion_No',
  },
};
