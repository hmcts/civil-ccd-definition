import { Party } from '../../../../../../../models/partys';

export const subheadings = {
  fileDQ: 'File directions questionnaire',
};

export const getCheckboxes = (party: Party) => ({
  fileDQConfirm: {
    label:
      'I confirm that I have explained to my client(s) that they must try to settle, the available options, and the possibility of costs sanctions if they refuse.',
    selector: `#${party.oldKey}DQFileDirectionsQuestionnaire_explainedToClient-CONFIRM`,
  },
});

export const radioButtons = (party: Party) => ({
  oneMonthStay: {
    label: 'Do you want a one-month stay to try to settle the claim?',
    yes: {
      label: 'yes',
      selector: `#${party.oldKey}DQFileDirectionsQuestionnaire_oneMonthStayRequested_Yes`,
    },
    no: {
      label: 'no',
      selector: `#${party.oldKey}DQFileDirectionsQuestionnaire_oneMonthStayRequested_No`,
    },
  },
  protocolComplied: {
    label: 'Have you complied with the pre-action protocol?',
    yes: {
      label: 'yes',
      selector: `#${party.oldKey}DQFileDirectionsQuestionnaire_reactionProtocolCompliedWith_Yes`,
    },
    no: {
      label: 'no',
      selector: `#${party.oldKey}DQFileDirectionsQuestionnaire_reactionProtocolCompliedWith_No`,
    },
  },
});

export const inputs = (party: Party) => ({
  noProtocolCompliedReason: {
    label: 'Explain why not',
    selector: `#${party.oldKey}DQFileDirectionsQuestionnaire_reactionProtocolNotCompliedWithReason`,
  },
});
