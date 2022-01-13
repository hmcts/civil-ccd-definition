const {I} = inject();
const { applicant1: claimant } = require('../fixtures/events/createClaim.js').createClaim.valid.Claimant;
const postcodeLookup = require('./addressPostcodeLookup');

module.exports = {
  fields: function (partyType) {
    return {
      type: {
        id: `#${partyType}_type`,
      },
      company: {
        name: `#${partyType}_companyName`
      },
      address: `#${partyType}_primaryAddress_primaryAddress`,
    };
  },

  async enterParty(partyType, address) {
    I.waitForElement(this.fields(partyType).type.id);
    await I.runAccessibilityTest();
    await within(this.fields(partyType).type.id, () => {
      I.click({id: `${partyType}_type-${claimant.type}`});
    });

    I.fillField(this.fields(partyType).company.name, claimant.companyName);

    await within(this.fields(partyType).address, () => {
      postcodeLookup.enterAddressManually(address);
    });

    await I.clickContinue();
  }
}
;

