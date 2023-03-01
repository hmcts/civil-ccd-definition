const {I} = inject();

module.exports = {

  fields: {
    pbaNumber: {
      id: '#pbaAccountNumber',
      options: {
        activeAccount1: 'PBA0088192',
        activeAccount2: 'PBA0078095'
      }
    },
    reviewLinks: '.govuk-table__body td a'
  },

  async verifyAdditionalPayment(caseNumber) {
    I.waitInUrl(caseNumber);
    I.seeNumberOfVisibleElements(this.fields.reviewLinks, 2);
    I.click(locate(this.fields.reviewLinks).last());
    I.see('Paid');
    I.see('General application (on notice)');
    I.see('Total fees to pay: £167.00');
  },

  async payFee(caseNumber) {
    I.waitInUrl(caseNumber);
    I.waitForText('Not paid', 8);
    I.see('Not paid');
    I.forceClick('Pay now');
    I.click({css: 'input#pbaAccount'});
    I.waitForElement(this.fields.pbaNumber.id);
    I.selectOption(this.fields.pbaNumber.id, this.fields.pbaNumber.options['activeAccount1']);
    I.fillField('pbaAccountRef', 'Test Test');
    I.click({css: 'div.govuk-form-group span'});
    I.click('Confirm payment');
    I.waitForText('Payment successful');
    I.click('View service requests');
  },

  async openServiceRequestTab() {
    let urlBefore = await I.grabCurrentUrl();
    I.refreshPage();
    I.waitForVisible(locate('div.mat-tab-label-content').withText('Service Request'), 6);

    await I.retryUntilUrlChanges(async () => {
      await I.forceClick(locate('div.mat-tab-label-content').withText('Service Request'));
      await I.waitForInvisible(locate(this.fields.spinner).withText('Loading'), 30);
    }, urlBefore);

  }
};
