const { I } = inject();

const address = require('./../../fixtures/address.js');
const postcodeLookup = require('./../../fragments/addressPostcodeLookup');

module.exports = {

  fields: {
    respondentSolicitor1ServiceAddress_hasServiceAddress: {
      id: '#respondentSolicitor1ServiceAddress_hasServiceAddress',
      options: {
        yes: 'Yes',
        no: 'No'
      }
    }
  },

  async enterOrganisationServiceAddress() {
    I.waitForElement(this.fields.respondentSolicitor1ServiceAddress_hasServiceAddress.id);
    await I.runAccessibilityTest();
    await within(this.fields.respondentSolicitor1ServiceAddress_hasServiceAddress.id, () => {
      I.click(this.fields.respondentSolicitor1ServiceAddress_hasServiceAddress.options.yes);
    });

    postcodeLookup.enterAddressManually(address);

    await I.clickContinue();
  }
};

