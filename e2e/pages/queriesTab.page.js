const { I } = inject();

module.exports = {

  async verifyQueriesDetails(hearing = false) {
    I.waitInUrl('#Queries', 10);
    I.see('Query subject');
    I.see('Last submitted by');
    I.see('Last submission date');
    I.see('Last response date');
    I.see('Response status');
    I.see('Awaiting Response');
    if (!hearing) {
      I.see('Test query subject');
      I.click('Test query subject');
      I.waitForText('Query details');
    }
    if (hearing) {
      I.see('Test Hearing query subject');
      I.click('Test Hearing query subject');
      I.waitForText('Query details');
      I.see('Is the query hearing related?');
      I.see('What is the date of the hearing?');
      I.see('Test Hearing query detail');
    }
    I.see('Your query is under review');
  },
  async verifyDetailsAsCaseWorker(hearing = false) {
    I.waitInUrl('#Queries', 10);
    I.see('Query subject');
    I.see('Last submitted by');
    I.see('Last submission date');
    I.see('Last response date');
    I.see('Response status');
    I.see('Awaiting Response');
    if (!hearing) {
      I.see('Test query subject');
      I.click('Test query subject');
      I.waitForText('Query details');
    }
    if (hearing) {
      I.see('Test Hearing query subject');
      I.click('Test Hearing query subject');
      I.waitForText('Query details');
      I.see('Is the query hearing related?');
      I.see('What is the date of the hearing?');
      I.see('Test Hearing query detail');
    }
    I.see('Is the query hearing related?');
  },

  async askFollowUpQuestion(party = false) {
    I.waitInUrl('#Queries', 10);
    I.see('Last submitted by');
    I.see('Last submission date');
    I.see('Last response date');
    I.see('Response status');
    I.see('Responded');
    I.see('Caseworker');
    if (party) {
      I.see('Claimant Query');
      I.click('Claimant Query');
      I.waitForText('Query details');
      I.see('Query details');
      I.see('This query was raised by Claimant.');
      I.see('TestFile.pdf');
      I.see('Caseworker response to query.');
    }
    I.click('Ask a follow-up question');
    I.waitForText('Attach a document to this query (Optional)');
    if (party) {
      I.fillField('textarea[id="body"]', 'Claimant follow up');
    }
    I.click('Continue');
  },

  async verifyFollowUpQuestion(party = false) {
    I.waitInUrl('#Queries', 10);
    I.see('Last submitted by');
    I.see('Last submission date');
    I.see('Last response date');
    I.see('Response status');
    I.see('Awaiting Response');
    if (party) {
      I.see('Claimant Query');
      I.click('Claimant Query');
      I.waitForText('Query details');
      I.see('Query details');
      I.see('This query was raised by Claimant.');
      I.see('TestFile.pdf');
      I.see('Caseworker response to query.');
      I.see('Follow up query');
      I.see('Query detail');
      I.see('Your query is under review');
    }
    I.see('Our team will read your query and will respond. Do not submit the same query more than once.');
  },

  async verifyFollowUpQuestionAsCourtStaff(party = false) {
    I.waitInUrl('#Queries', 10);
    I.see('Last submitted by');
    I.see('Last submission date');
    I.see('Last response date');
    I.see('Response status');
    I.see('Awaiting Response');
    if (party) {
      I.see('Claimant Query');
      I.click('Claimant Query');
      I.waitForText('Query details');
      I.see('Query details');
      I.see('This query was raised by Claimant.');
      I.see('TestFile.pdf');
      I.see('Caseworker response to query.');
      I.see('Follow up query');
      I.see('Query detail');
    }
  },

};
