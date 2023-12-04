const {I} = inject();

module.exports = {

  async flightDelayClaimConfirmationPageValidation() {
    I.waitForElement('#isFlightDelayClaimLbl');
    I.see('Is this claim for a flight delay?');
    I.see('Flight delay');
    I.see('Airline');
    I.see('Flight number');
    I.see('Scheduled date of flight');
    I.see('KLM');
  }
};

