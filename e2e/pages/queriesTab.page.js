const {I} = inject();

module.exports = {

  async verifyQueriesDetails() {
    I.waitInUrl('#Queries', 10);
    I.see('Query subject');
    I.see('Last submitted by');
    I.see('Last submission date');
    I.see('Last response date');
    I.see('Response status');
    I.see('Awaiting Response');
    I.see('Test query subject');
    I.click('Test query subject');
    I.waitForText('Query details');
    I.see('Your query is under review');
  },
  async verifyDetailsAsCaseWorker() {
    I.waitInUrl('#Queries', 10);
    I.see('Query subject');
    I.see('Last submitted by');
    I.see('Last submission date');
    I.see('Last response date');
    I.see('Response status');
    I.see('Awaiting Response');
    I.see('Test query subject');
    I.click('Test query subject');
    I.waitForText('Query details');
    I.see('Is the query hearing related?');
  },


};
