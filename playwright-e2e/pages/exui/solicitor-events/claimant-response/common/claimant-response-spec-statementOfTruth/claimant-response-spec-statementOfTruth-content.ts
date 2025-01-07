export const heading2 = 'Statement of truth';
export const paragraphs = {
  text1: 'The claimant believes that the facts stated in the response are true.',
  text2: 'I am duly authorised by the claimant to sign this statement.',
  text3:
    'The claimant understands that proceedings for contempt of court ' +
    'may be brought against anyone who makes, or causes to be made, ' +
    'a false statement in a document verified by a statement of truth without an honest belief in its truth.',
  text4: 'I believe that the facts stated are true',
  text5:
    'In order to verify the response to claim by a statement of truth ' +
    'please click “submit” on the next screen. Doing so will be taken as verifying the response by the above statement of truth.' +
    ' Alternatively, you will have the opportunity, on the next screen, to change any of the answers before clicking the “submit” button.',
};

export const paragraphsUnspec = {
  text1: 'The Claimant(s) believes that the facts stated in the brief details of claim are true.',
  text2: 'I am duly authorised by the Claimant(s) to sign this statement.',
  text3:
    'The Claimant(s) understands that proceedings for contempt of court may be brought against anyone who makes, ' +
    'or causes to be made, a false statement in a document verified by a statement of truth without an honest belief in its truth.',
  text4:
    'In order to verify the claim by a statement of truth please click "submit" on the next screen. ' +
    'Doing so will be taken as verifying the claim by the above statement of truth. ' +
    'Alternatively, you will have the opportunity, on the next screen, to change any of the answers before clicking the "submit" button.',
};
export const statementOfTruthForm = {
  fullName: {
    label: 'Full Name',
    selector: '#uiStatementOfTruth_name',
  },
  Role: {
    label: 'Role',
    selector: '#uiStatementOfTruth_role',
    containerSelector:
      "label[for='uiStatementOfTruth_role'] span[class='form-label ng-star-inserted']",
  },
};

export const statementOfTruthNavigationButtons = {
  previousButton: {
    label: 'Previous',
    selector: 'button.button-secondary:not([aria-label="Cancel upload"])',
  },
  continueButton: {
    label: 'Continue',
    selector: 'button[type="submit"]',
  },
};
