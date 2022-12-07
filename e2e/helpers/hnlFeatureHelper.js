module.exports = {
  removeHNLFieldsFromClaimData: (data) => {
    delete data.userInput.Claimant.applicant1['partyEmail'];
    delete data.userInput.Claimant.applicant1['partyPhone'];

    if( data.userInput.SecondClaimant) {
      delete data.userInput.SecondClaimant.applicant2['partyEmail'];
      delete data.userInput.SecondClaimant.applicant2['partyPhone'];
    }

    delete data.userInput.Defendant.respondent1['partyEmail'];
    delete data.userInput.Defendant.respondent1['partyPhone'];

    if (data.userInput.SecondDefendant) {
      delete data.userInput.SecondDefendant.respondent2['partyEmail'];
      delete data.userInput.SecondDefendant.respondent2['partyPhone'];
    }
  },

  removeHNLFieldsFromUnspecClaimData: (data) => {
    delete data.valid.Defendant.respondent1['partyEmail'];
    delete data.valid.Defendant.respondent1['partyPhone'];

    if (data.valid.SecondDefendant) {
      delete data.valid.SecondDefendant.respondent2['partyEmail'];
      delete data.valid.SecondDefendant.respondent2['partyPhone'];
    }
  }
};
