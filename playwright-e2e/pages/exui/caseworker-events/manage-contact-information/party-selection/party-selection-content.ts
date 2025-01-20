// content specific to case id: 1733994380755104

enum PartyLabels {
  CLAIMANT_1 = 'CLAIMANT_1',
  ORGANISATION_INDIVIDUALS = 'CLAIMANT_1_ORGANISATION_INDIVIDUALS',
  CLAIMANT_1_LR_INDIVIDUAL = 'CLAIMANT_1_LR_INDIVIDUALS',
  CLAIMANT_1_WITNESSES = 'CLAIMANT_1_WITNESSES',
  CLAIMANT_1_EXPERTS = 'CLAIMANT_1_EXPERTS',
  DEFENDANT_1 = 'DEFENDANT_1',
  DEFENDANT_2 = 'DEFENDANT_2',
  DEFENDANT_2_ORGANISATION_INDIVIDUALS = 'DEFENDANT_2_ORGANISATION_INDIVIDUALS',
  DEFENDANT_1_LR_INDIVIDUALS = 'DEFENDANT_1_LR_INDIVIDUALS',
  DEFENDANT_1_WITNESSES = 'DEFENDANT_1_WITNESSES',
  DEFENDANT_1_EXPERTS = 'DEFENDANT_1_EXPERTS',
}

enum otherAttendeesList {
  LITIGATION_FRIEND = 'litigation friends',
  EXPERTS = 'experts',
  WITNESSES = 'witnesses',
}

export const heading = 'Manage Contact Information';

export const h3 = "Which party's contact information do you want to change?";

export const otherAttendeesText = 'This includes any other attendees linked to the party, such as:';

export const partySelectionH3 = 'Which details do you want to update?';

export const partyChosenFieldSet = {
  selector: '#partyChosen',
  label: 'Select party',
  radioButtons: {
    claimant1: {
      selector: '#partyChosen_CLAIMANT_1',
      label: 'CLAIMANT 1: Test Inc',
    },
    organisationIndividuals: {
      selector: '#partyChosen_CLAIMANT_1_ORGANISATION_INDIVIDUALS',
      label: 'CLAIMANT 1: Individuals attending for the organisation',
    },
    claimant1LrIndividuals: {
      selectors: '#partyChosen_CLAIMANT_1_LR_INDIVIDUALS',
      label: 'CLAIMANT 1: Individuals attending for the legal representative',
    },
    claimant1Witnesses: {
      selector: '#partyChosen_CLAIMANT_1_WITNESSES',
      label: 'CLAIMANT 1: Witnesses',
    },
    claimant1Experts: {
      selector: '#partyChosen_CLAIMANT_1_EXPERTS',
      label: 'CLAIMANT 1: Experts',
    },
    defendant1: {
      selectors: '#partyChosen_DEFENDANT_1',
      label: 'DEFENDANT 1: Sir John Doe',
    },
    defendant2: {
      selectors: '#partyChosen_DEFENDANT_2',
      label: 'DEFENDANT 2: Second Defendant',
    },
    defendant2OrganisationIndividuals: {
      selectors: '#partyChosen_DEFENDANT_2_ORGANISATION_INDIVIDUALS',
      label: 'DEFENDANT 2: Individuals attending for the organisation',
    },
    defendant1LrIndividuals: {
      selectors: '#partyChosen_DEFENDANT_1_LR_INDIVIDUALS',
      label: 'DEFENDANTS: Individuals attending for the legal representative',
    },
    defendant1Witnesses: {
      selectors: '#partyChosen_DEFENDANT_1_WITNESSES',
      label: 'DEFENDANTS: Witnesses',
    },
    defendant1Experts: {
      selectors: '#partyChosen_DEFENDANT_1_EXPERTS',
      label: 'DEFENDANTS: Experts',
    },
  },
};

export const buttons = {
  previous: {
    selector: 'button[type="button"] .button button-secondary',
    text: 'Previous',
  },
  continue: {
    selector: 'button[type="submit"] .button',
    text: 'Continue',
  },
};

export { PartyLabels, otherAttendeesList };
