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


};
