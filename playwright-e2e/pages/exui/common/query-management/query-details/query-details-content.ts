export const headings = {
  enterQueryDetails: 'Enter query details',
  queryDetails: 'Query details',
};

export const buttons = {
  addNew: {
    title: 'Add new',
    selector: "button[class='button write-collection-add-item__top']",
  },
  backToQueryList: {
    title: 'Back to query list',
  },
  askFollowUpQuestion: {
    title: 'Ask a follow-up question',
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
};

export const containers = {
  queryDetails: {
    selector: 'table.query-details-table[aria-describedby="Details of the query"]',
  },
  querySenderName: {
    selector:
      'table.query-details-table[aria-describedby="Details of the query"] tbody tr:first-child',
  },
  response: {
    selector: 'table.query-details-table[aria-describedby="Response of the query"]',
  },
  followupQuery: {
    selector: 'table.query-details-table[aria-describedby="Follow-up of the response"]',
  },
  attachDocument: {
    selector: '#documentCollection_value',
  },
};

export const paragraphs = {
  queryDetails: {
    title: 'Query details',
    senderName: 'Solicitorone surname',
    lastSubmittedBy: 'Solicitorone surname',
    querySubject: 'Test query subject',
    queryBody: 'This is a test query message',
    isQueryHearingRelated: 'No',
    attachments: 'exampleDOC.docx',
  },
  hearingQuery: {
    queryBody: 'This is a test hearing query message',
  },
  offlineCaseError: 'If your case is offline, you cannot raise a query.',
  response: {
    title: 'Response',
    responseDetail: 'Caseworker response to query',
    closingTheQuery: 'Closing the query',
    attachments: 'exampleDOC.docx',
  },
  followupQuery: {
    title: 'Follow up query',
    lastSubmittedBy: 'Solicitorone surname',
    queryDetail: 'Claimant follow up query',
  },
  attachDocumentOptional: 'Attach a document to this query (Optional)',
  civilProcedureRule:
    'Queries and documents are shared with other parties in the case to meet Civil Procedure Rule 39.8 (opens in a new window). If you need a query to be private, send an email.',
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
