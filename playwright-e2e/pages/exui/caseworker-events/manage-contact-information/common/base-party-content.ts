// content specific to case id: 1733994380755104
enum PartyType {
  APPLICANT = 'applicant',
  RESPONDENT = 'respondent',
}
enum PartySize {
  INDIVIDUAL = 'individual',
  COMPANY = 'company',
}

enum Headers {
  APPLICANT_PARTY_1 = 'applicant1PartyTypeCompanyLabel',
  ORGANISATION_INDIVIDUALS = 'orgIndividualsLabel',
  LEGAL_REPRESENTATIVES = 'LROrgIndividualsLabel',
  WITNESSES = 'witnessesLabel',
  EXPERTS = 'expertsLabel',
  DEFENDANT_1_PARTY = 'defendant1PartyTypeIndividualLabel',
  DEFENDANT_2_PARTY = 'defendant2PartyTypeCompanyLabel',
}

// selector and label for h3, for example "Defendant: Sir John Doe"
export const h3 = (PartyNameManageContactLabel: PartyType, partyName: string) => {
  const applicantType =
    PartyNameManageContactLabel === PartyType.APPLICANT ? 'Claimant' : 'Defendant';

  return {
    selector: `#${PartyNameManageContactLabel}PartyNameManageContactLabel`,
    label: `${applicantType}: ${partyName}`,
  };
};

// selector and elements for text below h3 that contains a different list depending on party size
export const partyTypeText = (PartyTypeTextLabel: PartyType, partySize: PartySize) => {
  const partySizeTitleCase = partySize === PartySize.INDIVIDUAL ? 'Individual' : 'Company';

  const bulletPoints =
    partySize === PartySize.INDIVIDUAL ? ['First name', 'Last name'] : ['Company name'];

  // individual selector: #defendant1PartyTypeIndividualLabel
  // company selector: #applicant1PartyTypeCompanyLabel
  return {
    selector: `#${PartyTypeTextLabel}PartyType${partySizeTitleCase}Label`,
    content: {
      h3: 'Do you have a signed order from a judge?',
      p: ' You can only update the following details if a judge has given their permission to do so.',
      ul: {
        li: bulletPoints,
      },
    },
  };
};

export { PartyType, PartySize, Headers };

// add content for text at top of page: defendant1PartyTypeIndividualLabel or applicant1PartyTypeCompanyLabel
