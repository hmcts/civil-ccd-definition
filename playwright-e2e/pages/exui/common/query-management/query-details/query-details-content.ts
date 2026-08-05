export const headings = {
  enterQueryDetails: 'Enter query details',
  queryDetails: 'Query details',
};

export const buttons = {
  addNew: {
    title: 'Add new',
    selector: "button[class='button write-collection-add-item__top']",
  },
};

export const inputs = {
  querySubject: {
    label: 'Query subject',
    hint: 'The subject should be a summary of your query',
    selector: '#subject',
  },
  queryDetail: {
    label: 'Query detail',
    hint: 'Include as many details as possible so case workers can respond to your query',
    selector: 'textarea#body',
  },
  hearingDate: {
    label: 'What is the date of the hearing?',
    selectorKey: 'hearingDate',
  },
  responseDetail: {
    label: 'Response detail',
    selector: 'textarea#body',
  },
  askFollowupQuestions: {
    label: 'Ask a follow-up question',
    selector: 'textarea#body',
  },
  closingTheQuery: {
    title: 'Closing the query',
    label: 'I want to close this query',
    hint: 'Closing this query means the parties can no longer send messages in this thread.',
    selector: '#closeQuery',
  },
  attachDocument: {
    selector: '#documentCollection_value',
  },
};

export const containers = {
  attachDocument: {
    selector: '#documentCollection_value',
  },
};

export const paragraphs = {
  queryDetails: {
    title: 'Query details',
    querySubject: 'Test query subject',
    queryBody: 'This is a test query message',
    isQueryHearingRelated: 'No',
    attachments: 'exampleDOC.docx',
  },
  response: {
    title: 'Response',
    responseDetail: 'Caseworker response to query',
  },
  followupQuery: {
    title: 'Follow up query',
    queryDetail: 'Claimant follow up query',
  },
  attachDocumentOptional: 'Attach a document to this query (Optional)',
};

export const radioButtons = {
  isQueryHearingRelated: {
    label: 'Is the query hearing related?',
    yes: {
      label: 'Yes',
      selector: `#isHearingRelated-yes`,
    },
    no: {
      label: 'No',
      selector: '#isHearingRelated-no',
    },
  },
};
