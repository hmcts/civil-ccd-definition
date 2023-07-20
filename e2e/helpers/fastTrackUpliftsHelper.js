module.exports = {
  removeFixedRecoveryCostFieldsFromUnspecDefendantResponseData: (data) => {
    delete data.valid.FixedRecoverableCosts;
  }
};
