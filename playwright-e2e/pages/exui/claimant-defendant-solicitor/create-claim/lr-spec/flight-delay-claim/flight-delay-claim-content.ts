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

export const dropdowns = {
  airline: {
    label: 'Airline',
    selector: '#flightDelayDetails_airlineList',
    options: {
      klm: 'KLM'
    }
  },
};

export const inputs = {
  flightNumber: {
    label: 'Flight number',
    selector: '#flightDelayDetails_flightNumber',
  },
  dateOfFlight: {
    selectorKey: 'scheduledDate',
  },
};
