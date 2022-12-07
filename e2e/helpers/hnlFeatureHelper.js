const {checkToggleEnabled} = require("./testingSupport");
const config = require("../config.js");
const {element} = require("../api/dataHelper");

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
  },

  async replaceExpertsIfHNLFlagIsDisabled(defendantResponseData, solicitor) {
    let isHNLEnabled = await checkToggleEnabled('hearing-and-listing-sdo');
    // work around for the api  tests
    console.log(`Experts selected in Env: ${config.runningEnv}`);
    if (!isHNLEnabled) {
      defendantResponseData = {
        ...defendantResponseData,
        valid: {
          ...defendantResponseData.valid,
          Experts: {
            [`respondent${solicitor === 'solicitorTwo' ? 2 : 1}DQExperts`]: {
              expertRequired: 'Yes',
              details: [
                element({
                  name: 'John Doe',
                  fieldOfExpertise: 'Science',
                  whyRequired: 'Reason',
                  estimatedCost: '100',
                })
              ]
            }
          }
        }
      };
    }
    return defendantResponseData;
  }
};
