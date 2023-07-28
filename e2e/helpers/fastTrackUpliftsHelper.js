module.exports = {
  removeFixedRecoveryCostFieldsFromSpecClaimantResponseData: (data) => {
    delete data.userInput.FixedRecoverableCosts;
  },
  removeFixedRecoveryCostFieldsFromUnspecDefendantResponseData: (data) => {
    delete data.valid.FixedRecoverableCosts;
  }
};
