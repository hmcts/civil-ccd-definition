const apiRequest = require('./../api/apiRequest.js');
const config = require('../config.js');
const testingSupport = require('./../api/testingSupport');

module.exports = {
  adjustCaseSubmittedDateForCarm: async (caseId, carmEnabled = false, isMintiEnabled = 'FALSE') => {
    if (carmEnabled) {
      console.log('carm enabled, updating submitted date');
      await apiRequest.setupTokens(config.systemupdate);
      const submittedDate = {'submittedDate':'2024-08-10T15:59:50'};
      await testingSupport.updateCaseData(caseId, submittedDate);
      console.log('submitted date update to after carm date');
    }
    if (!carmEnabled) {
      console.log('carm not enabled, updating submitted date');
      await apiRequest.setupTokens(config.systemupdate);
      const submittedDate = {'submittedDate':'2022-05-10T15:59:50'};
      await testingSupport.updateCaseData(caseId, submittedDate);
      console.log('submitted date update to before carm date');
    }
    if (!carmEnabled && isMintiEnabled !== 'FALSE') {
      console.log('carm not enabled, multi Intermediate track is enabled');
      await apiRequest.setupTokens(config.systemupdate);
      const submittedDate = {'submittedDate':'2025-02-20T15:59:50'};
      await testingSupport.updateCaseData(caseId, submittedDate);
      console.log('submitted date update to after multi Intermediate track live date');
    }
  },
};
