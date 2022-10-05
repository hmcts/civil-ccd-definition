const {element} = require("../../api/dataHelper");
const {respondToClaim} = require("./defendantResponseSpec");

module.exports = {
  //ToDo: Take SmallClaimWitnesses data below and replace  SmallClaimWitnesses data in respondToClaimSpec.js when h&l toggled is removed
  respondToClaimHnL: (response = 'FULL_DEFENCE') => {
    const respondToClaim = respondToClaim(response);
    if(!respondToClaim.userInput.SmallClaimWitnesses) {
      return respondToClaim;
    }
    return {
      userInput: {
        ...respondToClaim.userInput,
        SmallClaimWitnesses: {
          respondent1DQWitnesses: {
            witnessesToAppear: 'Yes',
            details: [
              element({
                firstName: "Witness",
                lastName: "One",
                emailAddress: "test@email.com",
                phoneNumber: "07116778998",
                reasonForWitness: "Witnessed something"
              })
            ]
          }
        }
      }
    }
  }
}
