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
      const { yes, no } = this.fields.addFlightDelayClaim.options;
      I.click(addAnotherDefendant ? yes : no);
    });

    await I.clickContinue();
  }
};

