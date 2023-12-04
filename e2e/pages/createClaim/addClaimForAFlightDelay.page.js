const {I} = inject();

module.exports = {

  fields: {
    addFlightDelayClaim: {
      id: '#isFlightDelayClaim',
      options: {
        yes: 'Yes',
        no: 'No'
      }
    },
  },

  async enteredFlightDelayClaim(addAnotherDefendant) {
    I.waitForElement(this.fields.addFlightDelayClaim.id);
    await I.runAccessibilityTest();
    await within(this.fields.addFlightDelayClaim.id, () => {
      const { no, yes } = this.fields.addFlightDelayClaim.options;
      I.click(addAnotherDefendant ? no : yes);
    });

    await I.clickContinue();
    I.waitForElement('#flightDelayDetails_airlineList');
    I.see('Flight delay');
    I.see('Airline');
    I.see('Flight number');
    I.see('Scheduled date of flight');
    I.see('For example, 16 04 2021');
    I.click('Continue');
    I.see('Airline is required');
    I.see('Flight number is required');
    I.see('Scheduled date of flight is required');
    I.selectOption('#flightDelayDetails_airlineList', 'KLM');
    I.fillField('#flightDelayDetails_flightNumber', 10001);
    I.click('Continue');
    I.fillField('#scheduledDate-day', 1);
    I.click('Continue');
    I.see('The data entered is not valid for Scheduled date of flight');
    I.fillField('#scheduledDate-month', 1);
    I.click('Continue');
    I.see('The data entered is not valid for Scheduled date of flight');
    I.fillField('#scheduledDate-year', 2035);
    I.click('Continue');
    I.waitForText('Scheduled date of flight must be today or in the past','5');
    I.fillField('#scheduledDate-year', 2023);
    await I.clickContinue();
  }
};

