import Party from '../../../../../../../enums/party';

export const subheadings = {
  report: 'Disclosure report',
};

export const getRadioButtons = (party: Party) => ({
  disclosureReportFilledAndServed: {
    label:
      'Have you filed and served a disclosure report (Form N263) (see Civil Procedure Rules Part 31)? (Optional)',
    yes: {
      label: 'Yes',
      selector: `#${party}DQDisclosureReport_disclosureFormFiledAndServed_Yes`,
    },
    no: {
      label: 'No',
      selector: `#${party}DQDisclosureReport_disclosureFormFiledAndServed_No`,
    },
  },
  disclosureProposalAgreed: {
    label:
      'Have you agreed a proposal in relation to disclosure that meets the overriding objective? (Optional)',
    yes: {
      label: 'Yes',
      selector: `#${party}DQDisclosureReport_disclosureProposalAgreed_Yes`,
    },
    no: {
      label: 'No',
      selector: `#${party}DQDisclosureReport_disclosureProposalAgreed_No`,
    },
  },
});

export const getInputs = (party: Party) => ({
  draftOrderNumber: {
    label:
      'Please ensure this is contained within the proposed directions attached and specify the draft order number (Optional)',
    selector: `#${party}DQDisclosureReport_draftOrderNumber`,
  },
});
