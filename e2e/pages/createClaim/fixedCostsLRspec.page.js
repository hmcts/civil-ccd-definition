const { I } = inject();
const config = require('../../config.js');

module.exports = {
  fields: {
    fixedCosts: {
      claimFixedCosts: '#fixedCosts_claimFixedCosts_Yes',
      fixedCostAmount: '#fixedCosts_fixedCostAmount'
    },
  },

  async addFixedCosts() {
    I.waitForElement(this.fields.fixedCosts.claimFixedCosts);
    await I.runAccessibilityTest();
    await I.click('Yes');
    I.fillField(this.fields.fixedCostAmount, '20000');
    await I.clickContinue();
  },
};
