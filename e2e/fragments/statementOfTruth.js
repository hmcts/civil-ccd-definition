const {I} = inject();

module.exports = {

  fields: {
    claim: {
      name: '#uiStatementOfTruth_name',
      role: '#uiStatementOfTruth_role',    },
    respondent1DQ: {
      name: '#uiStatementOfTruth_name',
      role: '#uiStatementOfTruth_role',    },
    respondent2DQ: {
      name: '#uiStatementOfTruth_name',
      role: '#uiStatementOfTruth_role',    },
    applicant1DQ: {
      name: '#uiStatementOfTruth_name',
      role: '#uiStatementOfTruth_role',    }
  },

  async enterNameAndRole(type = '', name = 'John Smith', role = 'Solicitor') {
    I.waitForElement(this.fields[type].name);
    await I.runAccessibilityTest();
    I.fillField(this.fields[type].name, name);
    I.fillField(this.fields[type].role, role);
    await I.clickContinue();
  }
};
