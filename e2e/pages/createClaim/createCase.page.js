const {I} = inject();

module.exports = {

  fields: {
    jurisdiction: 'jurisdiction',
    caseType: 'case-type',
    event: 'event',
  },
  startButton: 'Start',

  async selectCaseType(jurisdiction) {
    I.waitForElement(`#cc-jurisdiction > option[value="${jurisdiction}"]`);
    I.selectOption(this.fields.jurisdiction, 'Civil');
    I.selectOption(this.fields.caseType, 'Civil');
    I.selectOption(this.fields.event, 'Create claim');
    await I.click(this.startButton);
  }
};

