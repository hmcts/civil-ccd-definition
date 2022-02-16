const {I} = inject();

module.exports = {
  fields: {
    DefenceType: {
      id: '#specDefenceFullAdmittedRequired_radio',
      options: {
        yes: 'Yes',
        no: 'No'
      },
    },
  },

  async selectAdmitType(admitType) {
    // eslint-disable-next-line no-prototype-builtins
    if (!this.fields.DefenceType.options.hasOwnProperty(admitType)) {
      throw new Error(`Response type: ${admitType} does not exist`);
    }
    await I.waitForElement(this.fields.DefenceType.id);
    await I.runAccessibilityTest();
    await within(this.fields.DefenceType.id, () => {
    I.click(this.fields.DefenceType.options[admitType]);
    });
    await I.clickContinue();
  }
};
