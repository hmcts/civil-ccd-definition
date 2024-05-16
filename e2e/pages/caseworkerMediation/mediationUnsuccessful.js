const {I} = inject();
module.exports = {
  fields: function() {
        return {
          mediationFailureReason: {
            id: '#unsuccessfulMediationReason',
            options: {
              one: 'Party withdraws from mediation',
              two: 'Appointment no agreement reached',
              three: 'Appointment not assigned'
            }
          },
        };
  },


 async selectMediationFailureReason() {

    I.waitForElement(this.fields().mediationFailureReason.id);
    await I.runAccessibilityTest();
    I.selectOption(this.fields().mediationFailureReason.id, this.fields().mediationFailureReason.options.one);

    await I.clickContinue();
  }
};

