const apiRequest = require('./../api/apiRequest.js');
const config = require('../config.js');
const testingSupport = require('./../api/testingSupport');

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
    }
  },
};
