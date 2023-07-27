module.exports = {
  removeFixedRecoveryCostFieldsFromSpecClaimantResponseData: (data) => {
    delete data.userInput.FixedRecoverableCosts;
  }
};
