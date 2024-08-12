const {url} = require('../config');
const restHelper = require('./restHelper');

const camundaUrl = `${url.camundaService}/engine-rest`;
const camundaMessageUrl = `${camundaUrl}/message`;
const headers = {'Content-Type': 'application/json'};

module.exports = {
    triggerProcess: async (processName, caseId, hearingId) => {
        console.log(`Triggering ${processName} process for case ${caseId}:...`);
        return restHelper.request(
            camundaMessageUrl, headers, {
                messageName: processName,
                businessKey: '1',
                processVariables: {
                    caseId: {value: `${caseId}`, 'type': 'String'},
                    hearingId: {value: `${hearingId}`, 'type': 'String'}
                }
            }, 'POST');
    }
};
