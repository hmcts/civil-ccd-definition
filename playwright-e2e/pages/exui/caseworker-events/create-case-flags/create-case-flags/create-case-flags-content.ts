export const flagsRadioButtons = (radioNumber: number) => ({
  radio: {
    selector: `#flag-location-${radioNumber}`,
  },
});

export const nextButton = `button[class='button button-primary']`;

export const flagTypeRadioButtons = (radioNumber: number) => ({
  radio: {
    selector: `#flag-type-${radioNumber}`,
  },
});

export const commentInput = '#flagComments';
