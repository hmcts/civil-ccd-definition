const apiRequest = require('./apiRequest');
const {waitForFinishedBusinessProcess} = require('./testingSupport');
const {runningEnv} = require('../config');
const chai = require('chai');
const {expect} = chai;
const {
    followUpQueryMessage,
    queryResponseMessage,
    initialQueryMessage
} = require('../fixtures/queryMessages');

const RAISE_QUERY_EVENT = 'queryManagementRaiseQuery';
const RESPOND_QUERY_EVENT = 'queryManagementRespondQuery';

const assertQueryMessage = (actualQueryMessage, expectedQueryMessage) => {
    expect(actualQueryMessage.id).equal(expectedQueryMessage.id);
    expect(actualQueryMessage.createdOn).equal(expectedQueryMessage.createdOn);
    expect(actualQueryMessage.createdBy).equal(expectedQueryMessage.createdBy);
    expect(actualQueryMessage.body).equal(expectedQueryMessage.body);
    expect(actualQueryMessage.isHearingRelated).equal(expectedQueryMessage.isHearingRelated);
    expect(actualQueryMessage.hearingDate).equal(expectedQueryMessage.hearingDate);
};

const createQueryPayload = (caseData, queryType, newMessage) => {
    const queryPayload = {
        [queryType.collectionField]: caseData[queryType.collectionField] ? caseData[queryType.collectionField] : {
            partyName: queryType.partyName,
            caseMessages: []
        }
    };
    queryPayload[queryType.collectionField].caseMessages.push(newMessage);
    return queryPayload;
};

const triggerQueryEvent = async (caseId, event, queryType, newMessage) => {
    const updatedCaseData = await triggerCaseworkerEvent(caseId, event,
        (caseData) => createQueryPayload(caseData, queryType, newMessage));

    const actualQueryCollection = updatedCaseData[queryType.collectionField];
    const latestQueryMessage = actualQueryCollection.caseMessages[actualQueryCollection.caseMessages.length - 1].value;

    expect(actualQueryCollection.partyName).equal(queryType.partyName);
    assertQueryMessage(latestQueryMessage, newMessage.value);

    await waitForFinishedBusinessProcess(caseId);
    return latestQueryMessage;
};

const triggerCaseworkerEvent = async (caseId, event, queryPayloadCallback) => {
    const preEventData = await apiRequest.startEvent(event, caseId);
    const payload = queryPayloadCallback(preEventData);
    const response = await apiRequest.submitEvent(event, payload, caseId);
    return (await response.json()).case_data;
};

module.exports = {
    raiseQuery: async (caseId, user, queryType) => {
        console.log(`Raising a query as: ${user.email}`);
        await apiRequest.setupTokens(user);
        const newMessage = await initialQueryMessage(queryType.partyName, apiRequest.getTokens().userId);
        return await triggerQueryEvent(caseId, RAISE_QUERY_EVENT, queryType, newMessage);
    },
    respondToQuery: async (caseId, user, initialQueryMessage, queryType) => {
        console.log(`Responding to query as: ${user.email}`);
        await apiRequest.setupTokens(user);
        const newMessage = await queryResponseMessage(initialQueryMessage, apiRequest.getTokens().userId);
        await triggerQueryEvent(caseId, RESPOND_QUERY_EVENT, queryType, newMessage);
    },
    followUpOnQuery: async (caseId, user, initialQueryMessage, queryType) => {
        console.log(`Following up on query as: ${user.email}`);
        await apiRequest.setupTokens(user);
        const newMessage = await followUpQueryMessage(initialQueryMessage, apiRequest.getTokens().userId);
        await triggerQueryEvent(caseId, RAISE_QUERY_EVENT, queryType, newMessage);
    }
};
