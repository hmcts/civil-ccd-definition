export const getText = {
  greenText: {
    text: (claimNumber: string) => `Claim number: ${claimNumber}`,
    selector: `div[id='confirmation-header'] ccd-markdown div h2`,
  },
  dateText: {
    text: (date: string) => `The claimant has until 4pm on ${date} to respond to your claim.`,
    selector: `confirmation-body`,
  },
};
