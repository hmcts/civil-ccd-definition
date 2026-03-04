const { I } = inject();

module.exports = {

  fields: {
    isHumanRightsActIssuesAdded: {
      id: '#isHumanRightsActIssues',
      options: {
        yes: '#isHumanRightsActIssues_Yes',
        no: '#isHumanRightsActIssues_No'
      }
    }
  },

  async humanRightsAct() {
    I.waitForElement(this.fields.isHumanRightsActIssuesAdded.id);
    await I.runAccessibilityTest();
    await within(this.fields.isHumanRightsActIssuesAdded.id, () => {
      I.click(this.fields.isHumanRightsActIssuesAdded.options.yes);
    });
    await I.clickContinue();
  }
};

