const {I} = inject();

module.exports = {

  fields: function (party) {
    return {
      witnessesToAppear: {
        id: `#${party}DQWitnessesRequiredSpec_radio`,
        options: {
          yes: 'Yes',
          no: 'No'
        }
      },
      witnessDetails: {
        id: `#${party}DQWitnesses_details`,
        element: {
          name: `#${party}DQWitnessesDetailsSpec_0_name`,
          reasonForWitness: `#${party}DQWitnessesDetailsSpec_0_reasonForWitness`,
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

    await this.addWitness(party);
    await I.clickContinue();
  },

  async addWitness(party) {
    await I.addAnotherElementToCollection();
    I.waitForElement(this.fields(party).witnessDetails.element.name);
    I.fillField(this.fields(party).witnessDetails.element.name, 'John Smith');
    I.fillField(this.fields(party).witnessDetails.element.reasonForWitness, 'Reason for witness');
  },
};
