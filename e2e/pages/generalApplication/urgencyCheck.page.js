const {I} = inject();

module.exports = {

  fields: {
    generalAppUrgencyRequirement: {
      id: '#generalAppUrgencyRequirement_generalAppUrgency',
      options: {
        yes: 'Yes',
        no: 'No'
      }
    },
    considerationDay: '#urgentAppConsiderationDate-day',
    considerationMonth: '#urgentAppConsiderationDate-month',
    considerationYear: '#urgentAppConsiderationDate-year',
    reasonsForUrgency: '#generalAppUrgencyRequirement_reasonsForUrgency',
    consentAgreementCheckBox: '#generalAppUrgencyRequirement_ConsentAgreementCheckBox-ConsentAgreementCheckBox'
  },

  async selectUrgencyRequirement(urgencyCheck) {
    I.waitForElement(this.fields.generalAppUrgencyRequirement.id);
    I.seeInCurrentUrl('INITIATE_GENERAL_APPLICATIONGAUrgencyRecordPage');
    if ('yes' === urgencyCheck) {
      I.click(this.fields.generalAppUrgencyRequirement.options[urgencyCheck]);
      await I.fillField(this.fields.considerationDay, 1);
      await I.fillField(this.fields.considerationMonth, 10);
      await I.fillField(this.fields.considerationYear, 2022);
      await I.fillField(this.fields.reasonsForUrgency, 'Test Reason for Urgency');
      await I.click(this.fields.consentAgreementCheckBox);
    } else {
      I.click(this.fields.generalAppUrgencyRequirement.options[urgencyCheck]);
    }
    await I.clickContinue();
  }
};

