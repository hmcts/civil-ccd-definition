const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const chai = require('chai');

chai.use(deepEqualInAnyOrder);
const {assert} = chai;

const apiRequest = require('./apiRequest.js');
const bulkClaimData = require('../fixtures/events/createBulkClaim.js');

const data = {
  CREATE_BULK_CLAIM: (customerId, amount, claimRef) => bulkClaimData.bulkCreateClaimDto(customerId, amount, claimRef),
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

    createClaimData = data.CREATE_BULK_CLAIM('15678908', '87989', '1568h8992334');
    //==============================================================

    await apiRequest.setupTokens(user);
    const response_msg = await apiRequest.createBulkClaim('112345', createClaimData);
    assert.equal(response_msg.errorText, 'Unknown User, ');
    assert.equal(response_msg.errorCode, '001');
  },
};
