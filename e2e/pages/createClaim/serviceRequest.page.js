const {I} = inject();
const config = require('../../config');

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
    await I.see('Not paid');
    I.forceClick('Pay now');
    I.click({css: 'input#pbaAccount'});
    I.waitForElement(this.fields.pbaNumber.id);
    I.selectOption(this.fields.pbaNumber.id, this.fields.pbaNumber.options['activeAccount1']);
    I.fillField('pbaAccountRef', 'Test Test');
    I.click({css: 'div.govuk-form-group span'});
    I.click('Confirm payment');
    await I.waitForText('Payment successful');
    I.wait(5);
    I.click('View service requests');
  },

  async openServiceRequestTab() {
    let urlBefore = await I.grabCurrentUrl();
    if (['preview'].includes(config.runningEnv)) {
      await I.wait(5);
    } else {
      await I.wait(2);
    }
    await I.retryUntilUrlChanges(async () => {
      I.waitForElement(locate('div.mat-tab-label-content').withText('Service Request'), 60);
      await I.forceClick(locate('div.mat-tab-label-content').withText('Service Request'));
      await I.waitForInvisible(locate(this.fields.spinner).withText('Loading'), 30);
    }, urlBefore);

  }
};
