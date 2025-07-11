const uuid = require('uuid');
const {element} = require('../api/dataHelper');
const {uploadDocument} = require('../api/testingSupport');

const initialQueryMessage = async (messageSubject, username, userId, isHearingRelated) => element({
        id: uuid.v1(),
        body: `This query was raised by ${messageSubject}.`,
        name: username,
        subject: `${messageSubject} Query`,
        createdBy: userId,
        createdOn: new Date().toISOString(),
        attachments: [element({...(await uploadDocument(`${messageSubject}-query-attachment.pdf`)), filename: `${messageSubject}-query-attachment.pdf`})],
        isHearingRelated: isHearingRelated ? 'Yes' : 'No',
        ...(isHearingRelated ? {  hearingDate: '2026-01-01' } : {})
    }
);

const queryResponseMessage = async ({id, subject, isHearingRelated, hearingDate}, username, userId) => element({
    id: uuid.v1(),
    body: 'Caseworker response to query.',
    name: username,
    subject,
    parentId: id,
    createdBy: userId,
    createdOn: new Date().toISOString(),
    attachments: [element({...(await uploadDocument(`${subject}-response-attachment.pdf`)), filename: `${subject}-response-attachment.pdf`})],
    hearingDate,
    isHearingRelated,
});

const followUpQueryMessage = async ({id, subject, isHearingRelated, hearingDate, name}, userId) => element({
    name,
    subject,
    id: uuid.v1(),
    body: `${name}'s follow up to caseworker response.`,
    parentId: id,
    createdBy: userId,
    createdOn: new Date().toISOString(),
    attachments: [element({...(await uploadDocument(`${subject}-followup-attachment.pdf`)), filename:`${subject}-followup-attachment.pdf`})],
    hearingDate,
    isHearingRelated,
});

module.exports = {initialQueryMessage, queryResponseMessage, followUpQueryMessage};
