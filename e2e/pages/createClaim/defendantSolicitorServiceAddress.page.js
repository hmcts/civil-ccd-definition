const { I } = inject();

const address = require('./../../fixtures/address.js');
const postcodeLookup = require('./../../fragments/addressPostcodeLookup');

module.exports = {

  fields: {
    respondentSolicitor1ServiceAddress_hasSolicitorServiceAddress: {
      id: '#respondentSolicitor1ServiceAddress_hasSolicitorServiceAddress',
      options: {
        yes: 'Yes',
        no: 'No'
      }
    }
  },

  async enterOrganisationServiceAddress() {
    I.waitForElement(this.fields.respondentSolicitor1ServiceAddress_hasSolicitorServiceAddress.id);
    await I.runAccessibilityTest();
    await within(this.fields.respondentSolicitor1ServiceAddress_hasSolicitorServiceAddress.id, () => {
      I.click(this.fields.respondentSolicitor1ServiceAddress_hasSolicitorServiceAddress.options.yes);
    });

    postcodeLookup.enterAddressManually(address)

    await I.clickContinue();
  }
};

