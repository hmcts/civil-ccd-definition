const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const chai = require('chai');

chai.use(deepEqualInAnyOrder);
const {assert} = chai;

const apiRequest = require('./apiRequest.js');
const bulkClaimData = require('../fixtures/events/createBulkClaim.js');

const data = {
  CREATE_BULK_CLAIM: (customerId, amount) => bulkClaimData.bulkCreateClaimDto(customerId, amount),
};

module.exports = {

  /**
   * Creates a Bulk claim
   *
   * @param user user to create the claim
   * @return {Promise<void>}
   */
  createClaimFromSDTRequest: async (user) => {
    let createClaimData;

    createClaimData = data.CREATE_BULK_CLAIM('12345678', '87989');
    //==============================================================

    await apiRequest.setupTokens(user);
    const response_msg = await apiRequest.createBulkClaim('112345', createClaimData);
    assert.equal(response_msg.errorText, 'Unknown User, ');
    assert.equal(response_msg.errorCode, '001');
  },
};
