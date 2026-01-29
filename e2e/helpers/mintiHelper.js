const apiRequest = require('./../api/apiRequest.js');
const config = require('../config.js');
const testingSupport = require('./../api/testingSupport');
const chai = require('chai');
const {assert} = chai;

const MaxTrackAmounts = {
  SMALL_CLAIM:  10000,
  FAST_CLAIM: 25000,
  MULTI_CLAIM: 100000
};

const MintiMaxTrackAmounts = {
  SMALL_CLAIM:  10000,
  FAST_CLAIM: 25000,
  INTERMEDIATE_CLAIM: 100000,
  MULTI_CLAIM: 10000000 // infinity
};

function getTrackByClaimAmount(claimAmount) {
  if (claimAmount <= MaxTrackAmounts.SMALL_CLAIM) {
    return 'SMALL_CLAIM';
  } else if (claimAmount > MaxTrackAmounts.SMALL_CLAIM && claimAmount <= MaxTrackAmounts.FAST_CLAIM) {
    return 'FAST_CLAIM';
  } else {
    return 'MULTI_CLAIM';
  }
}

function getMintiTrackByClaimAmount(claimAmount) {
  if (claimAmount <= MintiMaxTrackAmounts.SMALL_CLAIM) {
    return 'SMALL_CLAIM';
  } else if (claimAmount > MintiMaxTrackAmounts.SMALL_CLAIM && claimAmount <= MintiMaxTrackAmounts.FAST_CLAIM) {
    return 'FAST_CLAIM';
  } else if (claimAmount > MintiMaxTrackAmounts.FAST_CLAIM && claimAmount <= MintiMaxTrackAmounts.INTERMEDIATE_CLAIM) {
    return 'INTERMEDIATE_CLAIM';
  } else {
    return 'MULTI_CLAIM';
  }
}

function getCaseAllocatedTrack(case_data, isSpecCase) {
  if (isSpecCase) {
    return case_data.responseClaimTrack;
  } else {
    return case_data.allocatedTrack;
  }
}

module.exports = {
  

  getMintiTrackByClaimAmount(claimAmount) {
    if (claimAmount <= MintiMaxTrackAmounts.SMALL_CLAIM) {
      return 'SMALL_CLAIM';
    } else if (claimAmount > MintiMaxTrackAmounts.SMALL_CLAIM && claimAmount <= MintiMaxTrackAmounts.FAST_CLAIM) {
      return 'FAST_CLAIM';
    } else if (claimAmount > MintiMaxTrackAmounts.FAST_CLAIM && claimAmount <= MintiMaxTrackAmounts.INTERMEDIATE_CLAIM) {
      return 'INTERMEDIATE_CLAIM';
    } else {
      return 'MULTI_CLAIM';
    }
  },

  assertTrackAfterClaimCreation: async (user, caseId, claimAmount, isMintiEnabled, isSpecCase = false) => {
    const {case_data} = await apiRequest.fetchCaseDetails(user, caseId);
    let caseAllocatedTrack = getCaseAllocatedTrack(case_data, isSpecCase);
    assert.equal(caseAllocatedTrack, getMintiTrackByClaimAmount(claimAmount));
    console.log('Allocated track is ' + caseAllocatedTrack);
  }
};
