const uuid = require('uuid');
const {element} = require('../api/dataHelper');
const {uploadDocument} = require('../api/testingSupport');

const addHours = (originalDateString, hours) => {
    return new Date(new Date(originalDateString).getTime() + 60 * 60 * 1000 * hours).toISOString().split('.')[0];
};

const initialQueryMessage = async (userName, userId) => element({
        id: uuid.v1(),
        body: `This query was raised by ${userName}.`,
        name: userName,
        subject: `${userName} Query`,
        createdBy: userId,
        createdOn: new Date().toISOString().split('.')[0],
        attachments: [element({...(await uploadDocument()), filename: 'query-attachment.pdf'})],
        hearingDate: '2026-01-01',
        isHearingRelated: 'Yes'
    }
);

const queryResponseMessage = async ({id, subject, isHearingRelated, hearingDate, createdOn}, userId) => element({
    id: uuid.v1(),
    body: 'Caseworker response to query.',
    name: 'Caseworker',
    subject,
    parentId: id,
    createdBy: userId,
    createdOn: addHours(createdOn, 3),
    attachments: [element({...(await uploadDocument()), filename: 'response-attachment.pdf'})],
    hearingDate,
    isHearingRelated,
});

const followUpQueryMessage = async ({id, subject, isHearingRelated, hearingDate, name, createdOn}, userId) => element({
    name,
    subject,
    id: uuid.v1(),
    body: `${name}'s follow up to caseworker response.`,
    parentId: id,
    createdBy: userId,
    createdOn: addHours(createdOn, 5),
    attachments: [element({...(await uploadDocument()), filename: 'follow-up-attachment.pdf'})],
    hearingDate,
    isHearingRelated,
});

module.exports = {initialQueryMessage, queryResponseMessage, followUpQueryMessage};
