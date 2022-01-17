const {I} = inject();

const servedDocuments = require('../../fragments/servedDocument');

module.exports = {

  fields: {
    generalAppDetailsOfOrder: '#generalAppDetailsOfOrder',
    generalAppReasonsOfOrder: '#generalAppReasonsOfOrder',
    consentAgreementCheckBox: '#generalAppStatementOfTruthConsent-ConsentAgreementCheckBox',
    reasonsForUrgency: '#generalAppUrgencyRequirement_reasonsForUrgency',
    statementOfTruth_name: '#generalAppStatementOfTruth_name',
    statementOfTruth_role: '#generalAppStatementOfTruth_role',
    supportingEvidenceDocumentFiles: {
      options: [
        '#generalAppEvidenceDocument'
      ]
    }
  },

  async enterApplicationDetails(file) {
    I.waitForElement(this.fields.generalAppDetailsOfOrder);
    await I.fillField(this.fields.generalAppDetailsOfOrder, 'test test test');
    await I.fillField(this.fields.generalAppReasonsOfOrder, 'test test test');
    await I.click(this.fields.consentAgreementCheckBox);
    await I.fillField(this.fields.statementOfTruth_name, 'John Smith');
    await I.fillField(this.fields.statementOfTruth_role, 'Solicitor');
    await servedDocuments.upload(file, this.fields.supportingEvidenceDocumentFiles.options);
    await I.clickContinue();
  }
};

