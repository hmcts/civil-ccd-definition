export const subHeadingsDisclosureReports = {
  heading2: 'Disclosure report',
};

export const disclosureReportsform = {
  filedServedDisclosureReport: {
    legend:
      'Have you filed and served a disclosure report (Form N263) (see Civil Procedure Rules Part 31)? (Optional)',
    radioYes: {
      label: 'Yes',
      selector: '#applicant1DQDisclosureReport_disclosureFormFiledAndServed_Yes',
    },
    radioNo: {
      label: 'No',
      selector: '#applicant1DQDisclosureReport_disclosureFormFiledAndServed_No',
    },
  },
  agreedProposal: {
    legend:
      'Have you agreed a proposal in relation to disclosure that meets the overriding objective? (Optional)',
    radioYes: {
      label: 'Yes',
      selector: '#applicant1DQDisclosureReport_disclosureProposalAgreed_Yes',
    },
    radioNo: {
      label: 'No',
      selector: '#applicant1DQDisclosureReport_disclosureProposalAgreed_No',
    },
  },
  inputBox: {
    text: 'Please ensure this is contained within the proposed directions attached and specify the draft order number (Optional)',
    selector: '#applicant1DQDisclosureReport_draftOrderNumber',
  },
};
