const {I} = inject();

module.exports = {

  fields: {
    breathingSpaceReference: '#enterBreathing_reference',
    startDay: '#start-day',
    startMonth: '#start-month',
    startYear: '#start-year',
  },

  async enterBreathingSpaceDetails(breathingSpaceDetails) {
    const [type, start, reference] = breathingSpaceDetails;
    const [year, month, day] = start.split('-');

    await I.see('Reference Number (Optional)');
    await I.fillField(this.fields.breathingSpaceReference, reference);
    await I.see('When did it start? (Optional)');
    await I.see('This is the date Breathing Space started, not the date you received notification of it, for example,');

    await I.fillField(this.fields.startDay, day);
    await I.fillField(this.fields.startMonth, month);
    await I.fillField(this.fields.startYear, year);

    await I.click(type);
    await I.clickContinue();
  },
};

