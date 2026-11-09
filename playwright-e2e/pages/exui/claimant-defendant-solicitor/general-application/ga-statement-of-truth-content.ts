export const inputs = {
  details: {
    label: 'What order do you want the court to make?',
    selector: '#generalAppDetailsOfOrder'
  },
  reasons: {
    label: 'Reasons for requesting this order',
    selector: '#generalAppReasonsOfOrder'
  },
  name: {
    label: 'Name',
    selector: '#generalAppStatementOfTruth_name'
  },
  role: {
    label: 'Role',
    selector: '#generalAppStatementOfTruth_role'
  },
  evidence: {
    label: 'Upload evidence (Optional)',
    selector: '#generalAppEvidenceDocument_value' },
};

export const checkboxes = {
  statementOfTruth: {
    label: 'The applicant believes that the facts stated above are true. I am authorised by the applicant to sign this statement. The Applicant understands that proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement in a document verified by a statement of truth without an honest belief in its truth.',
    selector: '#generalAppStatementOfTruthConsent-ConsentAgreementCheckBox',
  },
};

export const buttons = {
  addNewTop: {
    label: 'Add new',
    selector: "button[class='button write-collection-add-item__top']",
  }
};
