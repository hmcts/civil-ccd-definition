const {I} = inject();

module.exports = {

  fields: {
    liftBreathingSpaceReasonToLift: '#liftBreathing_reasonToLift',
    endDay: '#expectedEnd-day',
    endMonth: '#expectedEnd-month',
    endYear: '#expectedEnd-year',
  },

  async liftBreathingSpaceDetails(liftBreathingSpaceDetails) {
    const [end, reasonToLift] = liftBreathingSpaceDetails;
    const [year, month, day] = end.split('-');

    await I.see('When is the Breathing Space expected to end?');
    await I.see('This is the date that you have been instructed it will finish');

    await I.fillField(this.fields.endDay, day);
    await I.fillField(this.fields.endMonth, month);
    await I.fillField(this.fields.endYear, year);

    await I.see('Why is breathing space being lifted? (Optional)');
    await I.fillField(this.fields.liftBreathingSpaceReasonToLift, reasonToLift);

    await I.clickContinue();
  },
};

