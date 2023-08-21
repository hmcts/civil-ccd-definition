const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const chai = require('chai');

chai.use(deepEqualInAnyOrder);
const {assert} = chai;

const apiRequest = require('./apiRequest.js');
const bulkClaimData = require('../fixtures/events/createBulkClaim.js');

const data = {
  CREATE_BULK_CLAIM: (mpScenario, interest, customerId, amount, postcodeValidation) =>
    bulkClaimData.bulkCreateClaimDto(mpScenario, interest, customerId, amount, postcodeValidation),
};

module.exports = {

  /**
   * Creates a Bulk claim via SDT
   *
   * @param user user to create the claim
   * @param mpScenario
   * @param interest
   * @return {Promise<void>}
   */
  /* createClaimFromSDTRequest: async (user, mpScenario, interest) => {
    let createClaimData;

    createClaimData = data.CREATE_BULK_CLAIM(mpScenario, interest, '12345678', '87989');
    //==============================================================

    await apiRequest.setupTokens(user);
    const response_msg = await apiRequest.createBulkClaim('112345', createClaimData);
    assert.equal(response_msg.errorText, 'Unknown User, ');
    assert.equal(response_msg.errorCode, '001');
  }, */

  createClaimFromSDTRequestForPostCodeNagative: async (user, mpScenario, interest) => {
    let createClaimData;

    createClaimData = data.CREATE_BULK_CLAIM(mpScenario, interest, '12345678', '87989', '4DA');
    //==============================================================

    await apiRequest.setupTokens(user);
    const response_msg = await apiRequest.createBulkClaim('112345', createClaimData);
   assert.equal(response_msg.errorText, ' First defendant’s postcode is not in England or Wales, ');
   assert.equal(response_msg.errorCode, '008');
  },

  createClaimFromSDTRequestForPostCodePostive: async (user, mpScenario, interest) => {
    let createClaimData;

    createClaimData = data.CREATE_BULK_CLAIM(mpScenario, interest, '12345678', '87989', 'TW13 4DA');
    //==============================================================

    await apiRequest.setupTokens(user);
    const response_msg = await apiRequest.createBulkClaimForStatusCode201('112345', createClaimData);
  },
};
