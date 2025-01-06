export const subHeadings = {
  heading2: 'File directions questionnaire',
  containerSelector:
    "div[id='applicant1DQFileDirectionsQuestionnaire_applicant1DQFileDirectionsQuestionnaire'] h2[class='heading-h2 ng-star-inserted']",
};

export const fileDqForm = {
  checkbox: {
    text:
      'I confirm that I have explained to my client(s) that they must try to settle, ' +
      'the available options, and the possibility of costs sanctions if they refuse.',
    checkboxSelector: '#applicant1DQFileDirectionsQuestionnaire_explainedToClient-CONFIRM',
    containerSelector:
      "label[for='applicant1DQFileDirectionsQuestionnaire_explainedToClient-CONFIRM']",
  },
  legend1: 'Do you want a one-month stay to try to settle the claim?',
  legend2: 'Have you complied with the pre-action protocol?',
  monthStayedRequestedRadioYes: {
    label: 'Yes',
    selector: '#applicant1DQFileDirectionsQuestionnaire_oneMonthStayRequested_Yes',
    containerSelector:
      "div[id='applicant1DQFileDirectionsQuestionnaire_oneMonthStayRequested'] span[class='form-label ng-star-inserted']",
  },
  monthStayedRequestedRadioNo: {
    label: 'No',
    selector: '#applicant1DQFileDirectionsQuestionnaire_oneMonthStayRequested_No',
  },
  protocolCompliedRadioYes: {
    label: 'Yes',
    selector: '#applicant1DQFileDirectionsQuestionnaire_reactionProtocolCompliedWith_Yes',
    containerSelector:
      "div[id='applicant1DQFileDirectionsQuestionnaire_reactionProtocolCompliedWith'] span[class='form-label ng-star-inserted']",
  },
  protocolCompliedRadioNo: {
    label: 'No',
    selector: '#applicant1DQFileDirectionsQuestionnaire_reactionProtocolCompliedWith_No',
  },
};
