export const subheadings = {
  airlineClaim: 'Is this an airline claim?',
};

export const radioButtons = {
  flightDelay: {
    yes: {
      label: 'Yes',
      selector: '#isFlightDelayClaim_Yes',
    },
    no: {
      label: 'No',
      selector: '#isFlightDelayClaim_No',
    },
  },
};

export const inputs = {
  airline: {
    selector: '#flightDelayDetails_airlineList',
  },
  flightNumber: {
    selector: '#flightDelayDetails_flightNumber',
  },
  dateOfFlight: {
    day: '#scheduledDate-day',
    month: '#scheduledDate-month',
    year: '#scheduledDate-year',
  },
};
