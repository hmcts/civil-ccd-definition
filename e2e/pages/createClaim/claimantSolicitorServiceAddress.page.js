const address = require('./../../fixtures/address.js');
const postcodeLookup = require('./../../fragments/addressPostcodeLookup');

const {I} = inject();

module.exports = {

  fields: {
    applicantSolicitor1ServiceAddress_hasSolicitorServiceAddress: {
      id: '#applicantSolicitor1ServiceAddress_hasSolicitorServiceAddress',
      options: {
        yes: 'Yes',
        no: 'No'
      }
    }
  },

  async enterOrganisationServiceAddress() {
    I.waitForElement(this.fields.applicantSolicitor1ServiceAddress_hasSolicitorServiceAddress.id);
    await I.runAccessibilityTest();
    await within(this.fields.applicantSolicitor1ServiceAddress_hasSolicitorServiceAddress.id, () => {
      I.click(this.fields.applicantSolicitor1ServiceAddress_hasSolicitorServiceAddress.options.yes);
    });

    postcodeLookup.enterAddressManually(address)

    await I.clickContinue();
  }
};

