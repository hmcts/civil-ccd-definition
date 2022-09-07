const {I} = inject();

module.exports = {

  fields: function (party) {
    return {
      witnessesToAppear: {
        id: `#${party}DQWitnessesRequiredSpec_radio`,
        id2: `#${party}DQWitnesses_witnessesToAppear_radio`,
        id3: `#${party}DQWitnesses_witnessesToAppear_radio`,
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

  if(party === 'applicant1'){
    I.waitForElement(this.fields(party).witnessesToAppear.id3);
    await I.runAccessibilityTest();
    await within(this.fields(party).witnessesToAppear.id3, () => {
      I.click(this.fields(party).witnessesToAppear.options.no);
    });

   } else if (party === 'respondent1'){
      I.waitForElement(this.fields(party).witnessesToAppear.id);
      await I.runAccessibilityTest();
      await within(this.fields(party).witnessesToAppear.id, () => {
        I.click(this.fields(party).witnessesToAppear.options.no);
      });

    } else if(party === 'respondent2'){
      I.waitForElement(this.fields(party).witnessesToAppear.id2);
      await I.runAccessibilityTest();
      await within(this.fields(party).witnessesToAppear.id2, () => {
        I.click(this.fields(party).witnessesToAppear.options.no);
      });

    }
   await I.clickContinue();
  },
};