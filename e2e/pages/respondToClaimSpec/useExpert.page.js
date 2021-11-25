const {I} = inject();

module.exports = {
  fields: {
    useExpert: {
      id: '#responseClaimExpertSpecRequired_radio',
      options: {
        yes: 'Yes',
        no: 'No'
      },
      expertName: '#respondToClaim_experts_expertName',
      expertField: '#respondToClaim_experts_fieldofExpertise',
      cost: '#respondToClaim_experts_estimatedCost',
      },

  },

  async claimExpert(responseType) {
    I.waitForElement(this.fields.useExpert.id);
    await I.runAccessibilityTest();
    await within(this.fields.useExpert.id, () => {
    I.click(this.fields.useExpert.options[responseType]);
    if ('yes' === responseType) {
       //await I.fillField(this.fields.useExpert.expertName, 'john');
       // await I.fillField(this.fields.expertField, 'roofing expert');
       //await I.fillField(this.fields.cost, 2000);
       ////*[@id="responseClaimWitnesses"]
    }

    });

    await I.clickContinue();
  }
};

