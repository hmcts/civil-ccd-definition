const {I} = inject();
const postcodeLookup = require('./addressPostcodeLookup');
const {checkToggleEnabled} = require('../api/testingSupport');

module.exports = {
  fields: function (partyType) {
    return {
      type: {
        id: `#${partyType}_type`,
        options: {
          individual: 'Individual',
          company: 'Company',
          organisation: 'Organisation',
          soleTrader: 'Sole trader',
        }
      },
      company: {
        name: `#${partyType}_companyName`
      },
      email:  `#${partyType}_partyEmail`,
      address: `#${partyType}_primaryAddress_primaryAddress`
    };
  },

  async enterParty(partyType, address) {
    I.waitForElement(this.fields(partyType).type.id);
    await I.runAccessibilityTest();
    await within(this.fields(partyType).type.id, () => {
      I.click(this.fields(partyType).type.options.company);
    });

    I.fillField(this.fields(partyType).company.name, `Example ${partyType} company`);

    // ToDo: Remove remove toggle and remove if statement after hnl release
    const hnlEnabled = await checkToggleEnabled('hearing-and-listing-sdo');
    if(hnlEnabled) {
      I.fillField(this.fields(partyType).email, `${partyType}@example.com`);
    }
    //==============================================================

    await within(this.fields(partyType).address, () => {
      postcodeLookup.enterAddressManually(address);
    });

    await I.clickContinue();
  }
}
;

