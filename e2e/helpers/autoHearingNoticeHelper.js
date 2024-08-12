const {triggerProcess} = require('../api/camunda');
const {AUTOMATED_HEARING_NOTICE} = require('../fixtures/camundaProcesses');
const {createUpdateStub} = require('../api/wiremock');
const {listedHearing} = require('../fixtures/listedHearing');
const {waitForFinishedBusinessProcess} = require('../api/testingSupport');

const partiesNotifiedStubRequestBody = (hearingId) => ({
    request: {
        method: 'PUT',
        urlPath: `/partiesNotified/${hearingId}`
    },

    response: {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    }
});

const hearingStubRequestBody = (hearing, hearingId) => ({
    request: {
        method: 'GET',
        url: `/hearing/${hearingId}`
    },
    response: {
        status: 200,
        body: `${JSON.stringify(hearing)}`,
        headers: {
            'Content-Type': 'application/json'
        }
    }
});
const createHearing = async (caseId, hearingId, hearingType) => {
    const hearing = listedHearing(caseId, hearingId, hearingType);
    await createUpdateStub(hearingStubRequestBody(hearing, hearingId));
    await createUpdateStub(partiesNotifiedStubRequestBody(hearingId));
};

module.exports = {
    createTrialHearing: async (caseId, hearingId) => createHearing(caseId, hearingId, 'TRI'),
    createDisposalHearing: async (caseId, hearingId) => createHearing(caseId, hearingId, 'DIS'),
    createDisputeResolutionHearing: async (caseId, hearingId) => createHearing(caseId, hearingId, 'DRH'),
    triggerHearingNotice: async (caseId, hearingId) => {
        await triggerProcess(AUTOMATED_HEARING_NOTICE, caseId, hearingId);
        await waitForFinishedBusinessProcess(caseId);
    }
};
