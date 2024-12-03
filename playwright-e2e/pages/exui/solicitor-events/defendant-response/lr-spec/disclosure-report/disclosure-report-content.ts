import exp from 'constants';

export const heading = 'Disclosure report';

export const filedAndServedRadioButtons = {
  label:
    'Have you filed and served a disclosure report (Form N263) (see Civil Procedure Rules Part 31)? (Optional)',
  yes: {
    label: 'Yes',
    selector: '#respondent1DQDisclosureReport_disclosureFormFiledAndServed_Yes',
  },
  no: {
    label: 'No',
    selector: '#respondent1DQDisclosureReport_disclosureFormFiledAndServed_No',
  },
};

export const agreedProposalRadioButtons = {
  label:
    'Have you agreed a proposal in relation to disclosure that meets the overriding objective? (Optional)',
  yes: {
    label: 'Yes',
    selector: '#respondent1DQDisclosureReport_disclosureProposalAgreed_Yes',
  },
  no: {
    label: 'No',
    selector: '#respondent1DQDisclosureReport_disclosureProposalAgreed_No',
  },
};
