const {I} = inject();

module.exports = {
  fields: {
    employmentType: {
      id: '#defenceAdmitPartEmploymentTypeRequired_radio',
      options: {
        yes: 'Yes',
        no: 'No'
      },
    },
   unemployedType: {
           id: '#respondToClaimAdmitPartUnemployedLRspec_unemployedComplexTypeRequired',
           options: {
             unemployed: 'Unemployed',
             retired: 'Retired',
          },
    },
  },

  async selectRespondentEmploymentType() {
    await within(this.fields.employmentType.id, () => {
    I.click(this.fields.employmentType.options.no);
    });
    await I.click(this.fields.unemployedType.options.retired);
    await I.clickContinue();
  }
};
