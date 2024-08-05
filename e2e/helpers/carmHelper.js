const apiRequest = require('./../api/apiRequest.js');
const config = require('../config.js');
const testingSupport = require('./../api/testingSupport');

module.exports = {
  adjustCaseSubmittedDateForCarm: async (caseId, carmEnabled = false, isMintiEnabled = false) => {
    if (carmEnabled) {
      console.log('carm enabled, updating submitted date');
      await apiRequest.setupTokens(config.systemupdate);
      const submittedDate = {'submittedDate':'2024-11-10T15:59:50'};
      await testingSupport.updateCaseData(caseId, submittedDate);
      console.log('submitted date update to after carm date');
    } else if (!carmEnabled && !isMintiEnabled) {
      console.log('carm not enabled, minti not enabled updating submitted date');
      await apiRequest.setupTokens(config.systemupdate);
      const submittedDate = {'submittedDate':'2022-05-10T15:59:50'};
      await testingSupport.updateCaseData(caseId, submittedDate);
      console.log('submitted date update to before carm date');
    }
  },
};
