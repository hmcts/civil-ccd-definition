const {I} = inject();
const {checkToggleEnabled} = require('./../../api/testingSupport');
const config = require('./../../config');

module.exports = {

  fields: function (party) {
    return {
      witnessesToAppear: {
        id: `#${party}DQWitnesses_witnessesToAppear`,
        options: {
          yes: 'Yes',
          no: 'No'
        }
      },
      witnessDetails: {
        id: `#${party}DQWitnesses_details`,
        element: {
          firstName: `#${party}DQWitnesses_details_0_firstName`,
          lastName: `#${party}DQWitnesses_details_0_lastName`,
          emailAddress: `#${party}DQWitnesses_details_0_emailAddress`,
          phoneNumber: `#${party}DQWitnesses_details_0_phoneNumber`,
          reasonForWitness: `#${party}DQWitnesses_details_0_reasonForWitness`,
        }
      },
      witnessDetails_oldFields: {
        id: `#${party}DQWitnesses_details`,
        element: {
          name: `#${party}DQWitnesses_details_0_name`,
          reasonForWitness: `#${party}DQWitnesses_details_0_reasonForWitness`,
        }
      },
    };
  },

  async enterWitnessInformation(party) {
    I.waitForElement(this.fields(party).witnessesToAppear.id);
    await I.runAccessibilityTest();
    await within(this.fields(party).witnessesToAppear.id, () => {
      I.click(this.fields(party).witnessesToAppear.options.yes);
    });

    let isHNLEnabled = await checkToggleEnabled('hearing-and-listing-sdo');
    if (!isHNLEnabled) {
      await this.addWitnessOldFields(party);
    } else {
      await this.addWitness(party);
    }
    await I.clickContinue();
  },
  async addWitness(party) {
    await I.addAnotherElementToCollection();
    I.waitForElement(this.fields(party).witnessDetails.element.firstName);
    I.fillField(this.fields(party).witnessDetails.element.firstName, 'John');
    I.fillField(this.fields(party).witnessDetails.element.lastName, 'Smith');
    I.fillField(this.fields(party).witnessDetails.element.emailAddress, 'johnsmith@email.com');
    I.fillField(this.fields(party).witnessDetails.element.phoneNumber, '07821016453');
    I.fillField(this.fields(party).witnessDetails.element.reasonForWitness, 'Reason for witness');
  },
  async addWitnessOldFields(party) {
    await I.addAnotherElementToCollection();
    I.waitForElement(this.fields(party).witnessDetails_oldFields.element.name);
    I.fillField(this.fields(party).witnessDetails_oldFields.element.name, 'John Smith');
    I.fillField(this.fields(party).witnessDetails_oldFields.element.reasonForWitness, 'Reason for witness');
  },
};
