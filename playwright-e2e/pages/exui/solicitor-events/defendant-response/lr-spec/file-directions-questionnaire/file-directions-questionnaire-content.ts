export const heading = 'File directions questionnaire';

export const fileDirectionsCheckbox = (defendantNumber: number) => ({
  selector: `#respondent${defendantNumber}DQFileDirectionsQuestionnaire_explainedToClient-CONFIRM`,
});

export const oneMonthStayRadioButtons = (defendantNumber: number) => ({
  yes: {
    label: 'Yes',
    selector: `#respondent${defendantNumber}DQFileDirectionsQuestionnaire_oneMonthStayRequested_Yes`,
  },
  no: {
    label: 'No',
    selector: `#respondent${defendantNumber}QFileDirectionsQuestionnaire_oneMonthStayRequested_No`,
  },
});

export const compliedRadioButtons = (defendantNumber: number) => ({
  yes: {
    label: 'Yes',
    selector: `#respondent${defendantNumber}DQFileDirectionsQuestionnaire_reactionProtocolCompliedWith_Yes`,
  },
  no: {
    label: 'No',
    selector: `#respondent${defendantNumber}DQFileDirectionsQuestionnaire_reactionProtocolCompliedWith_No`,
  },
});

export const fileDirectionsCheckbox1v2 = {
  selector: '#respondent2DQFileDirectionsQuestionnaire_explainedToClient',
};
