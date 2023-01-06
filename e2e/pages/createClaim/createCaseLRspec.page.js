const {I} = inject();

module.exports = {

  fields: {
    jurisdiction: 'jurisdiction',
    caseType: 'case-type',
    event: 'event',
  },
  startButton: 'Start',

   async createCaseSpecified(jurisdiction) {
        await I.waitForText('Reset');
        await I.waitForText('Create case');
        await I.retryUntilExists(async () => {
          await I.forceClick('Create case');
          await I.waitForText('Jurisdiction');
        }, `#cc-jurisdiction > option[value="${jurisdiction}"]`);

        await I.retryUntilExists(() => {
          I.selectOption(this.fields.jurisdiction, 'Civil');
          I.selectOption(this.fields.caseType, 'Civil');
          I.selectOption(this.fields.event, 'Create claim - Specified');
          I.click(this.startButton);
        }, 'ccd-markdown');
    }
};

