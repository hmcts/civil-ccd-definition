const apiRequest = require('./../api/apiRequest.js');
const config = require('../config.js');
const testingSupport = require('./../api/testingSupport');
const chai = require('chai');
const {assert} = chai;

const MaxTrackAmounts = {
  SMALL_CLAIM:  10000,
  FAST_CLAIM: 25000,
  MULTI_CLAIM: 100000
}

const MintiMaxTrackAmounts = {
  SMALL_CLAIM:  10000,
  FAST_CLAIM: 25000,
  INTERMEDIATE_TRACK: 100000,
  MULTI_CLAIM: 10000000 // infinity
}

function getTrackByClaimAmount(claimAmount) {
  if (claimAmount <= MaxTrackAmounts.SMALL_CLAIM) {
    return "SMALL_CLAIM"
  } else if (claimAmount > MaxTrackAmounts.SMALL_CLAIM && claimAmount <= MaxTrackAmounts.FAST_CLAIM) {
    return "FAST_CLAIM"
  } else {
    return "MULTI_CLAIM"
  }
}

function getMintiTrackByClaimAmount(claimAmount) {
  if (claimAmount <= MintiMaxTrackAmounts.SMALL_CLAIM) {
    return "SMALL_CLAIM"
  } else if (claimAmount > MintiMaxTrackAmounts.SMALL_CLAIM && claimAmount <= MintiMaxTrackAmounts.FAST_CLAIM) {
    return "FAST_CLAIM"
  } else if (claimAmount > MintiMaxTrackAmounts.FAST_CLAIM && claimAmount <= MintiMaxTrackAmounts.INTERMEDIATE_TRACK) {
    return "INTERMEDIATE_TRACK"
  } else {
    return "MULTI_CLAIM"
  }
}

module.exports = {
  adjustCaseSubmittedDateForMinti: async (caseId, isMintiEnabled = false) => {
    if (isMintiEnabled) {
      console.log('multi Intermediate track is enabled');
      await apiRequest.setupTokens(config.systemupdate);
      const submittedDate = {'submittedDate':'2025-02-20T15:59:50'};
      await testingSupport.updateCaseData(caseId, submittedDate);
      console.log('submitted date update to after multi Intermediate track live date');
    } else {
      console.log('multi Intermediate track not enabled, updating submitted date');
      await apiRequest.setupTokens(config.systemupdate);
      const submittedDate = {'submittedDate':'2022-05-10T15:59:50'};
      await testingSupport.updateCaseData(caseId, submittedDate);
      console.log('submitted date update to before multi Intermediate track live date');
    }
  },
  assertTrackAfterClaimCreation: async (user, caseId, claimAmount, isMintiEnabled) => {
    const {case_data} = await apiRequest.fetchCaseDetails(user, caseId);
    let caseAllocatedTrack = case_data.allocatedTrack;
    if(isMintiEnabled){
      assert.equal(caseAllocatedTrack, getMintiTrackByClaimAmount(claimAmount));
    } else {
      assert.equal(caseAllocatedTrack, getTrackByClaimAmount(claimAmount));
    }
    console.log("Allocated track is " + caseAllocatedTrack);
  }
};
