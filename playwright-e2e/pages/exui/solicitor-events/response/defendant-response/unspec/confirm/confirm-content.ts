export const getText = {
  greenText: {
    text: (claimNumber: string) => `Claim number: ${claimNumber}`,
    selector: `div[id='confirmation-header'] ccd-markdown div h2`,
  },
  dateText: {
    text: (date: string) =>
      `The Claimant legal representative will get a notification to confirm you have provided the Defendant defence. You will be CC'ed. The Claimant has until ${date} to discontinue or proceed with this claim`,
    selector: `confirmation-body`,
  },
};
