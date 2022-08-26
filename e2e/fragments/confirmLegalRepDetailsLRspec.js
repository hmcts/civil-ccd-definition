const { I } = inject();

module.exports = {
  fields: {
    solicitor1Reference: {
      id: '#specAoSRespondentCorrespondenceAddressRequired_radio',
      options: {
        yes: 'Yes',
        no: 'No'
      }
    },
    solicitor2Reference: {
      id: '#specAoSRespondentCorrespondenceAddressRequired_radio',
      options: {
        yes: 'Yes',
        no: 'No'
      }
    }
  },

  async confirmDetails(twoDefendants) {
    I.waitForElement(this.fields.solicitor1Reference.id);
    await I.runAccessibilityTest();
    const options = this.fields.solicitor1Reference.options;
    await within(this.fields.solicitor1Reference.id, () => {
      I.click(options.yes);
    });

    if(twoDefendants){
      I.waitForElement(this.fields.solicitor2Reference.id);
      await I.runAccessibilityTest();
      const options2 = this.fields.solicitor2Reference.options;
      await within(this.fields.solicitor2Reference.id, () => {
        I.click(options2.yes);
      });
    }
    await I.clickContinue();
  }
};