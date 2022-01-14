const {I} = inject();
const { personalInjuryType } = require('../../fixtures/events/createClaim.js').createClaim
  .valid.PersonalInjuryType;

module.exports = {

  fields: {
    personalInjuryType: {
      id: '#personalInjuryType'
    },
  },
// personalInjuryType-ROAD_ACCIDENT
  async selectPersonalInjuryType() {
    I.waitForElement(this.fields.personalInjuryType.id);
    await I.runAccessibilityTest();
    await within(this.fields.personalInjuryType.id, () => {
      I.click({id: `personalInjuryType-${personalInjuryType}`});
    });
    await I.clickContinue();
  }
};

