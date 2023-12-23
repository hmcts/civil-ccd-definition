const {I} = inject();

module.exports = {

  fields: {
    applicant1OrgIndividuals: {
      id: '#applicant1OrgIndividuals',
      element: {
        firstName: `#applicant1OrgIndividuals_0_firstName`,
        lastName: `#applicant1OrgIndividuals_0_lastName`,
        emailAddress: `#applicant1OrgIndividuals_0_emailAddress`,
        phoneNumber: `#applicant1OrgIndividuals_0_phoneNumber`
      }
    },
  },

  async addOrgIndividuals() {
    I.waitForElement(this.fields.applicant1OrgIndividuals.id);
    await I.runAccessibilityTest();

    // TODO: it is failing here because add new button click is not working
    await I.addAnotherElementToCollection();

    I.waitForElement(this.fields.applicant1OrgIndividuals.element.firstName);
    I.fillField(this.fields.applicant1OrgIndividuals.element.firstName, 'Kendal');
    I.fillField(this.fields.applicant1OrgIndividuals.element.lastName, 'Bloom');
    I.fillField(this.fields.applicant1OrgIndividuals.element.emailAddress, 'kendalbloom@email.com');
    I.fillField(this.fields.applicant1OrgIndividuals.element.phoneNumber, '07821016453');
    await I.clickContinue();
  },
};
