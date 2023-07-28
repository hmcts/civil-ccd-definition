module.exports = {
  removeFixedRecoveryCostFieldsFromSpecClaimantResponseData: (data) => {
    delete data.userInput.FixedRecoverableCosts;
  },

  removeFastTrackAllocationFromSdoData: (data) => {
    delete data.valid.FastTrack.fastTrackAllocation;
  }
};
