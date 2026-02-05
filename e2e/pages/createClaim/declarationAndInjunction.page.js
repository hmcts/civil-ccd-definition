const { I } = inject();

let details = 'Details of the claim text for type OtherRemedy';

module.exports = {

  fields: {
    declarationAndInjunctionRequired: {
      id: '#isClaimDeclarationAdded',
      options: {
        yes: '#isClaimDeclarationAdded_Yes',
        no: '#isClaimDeclarationAdded_No'
      }
    },
    claimDeclarationDescription: '#claimDeclarationDescription'
  },

  async claimDeclaration(option) {
    I.waitForElement(this.fields.declarationAndInjunctionRequired.id);
    await I.runAccessibilityTest();
    await within(this.fields.declarationAndInjunctionRequired.id, () => {
      if(option === 'yes'){
        I.click(this.fields.declarationAndInjunctionRequired.options.yes);
        I.fillField(this.fields.claimDeclarationDescription, details);
      }else{
        I.click(this.fields.declarationAndInjunctionRequired.options.no);
      }
    });
    await I.clickContinue();
  }
};

