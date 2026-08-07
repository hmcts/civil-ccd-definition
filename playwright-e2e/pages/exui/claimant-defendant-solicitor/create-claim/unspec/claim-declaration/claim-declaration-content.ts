export const radioButtons = {
  addOtherRemedy: {
    label: 'Do you want to add an other remedy e.g. declaration, injunction, rescission?',
    hint: 'If you file an application for a non-money claim (other than a claim for possession of land or recovery of goods) and a claim for damages, both court fees must be paid. For example, county court fee (fee 1.5) plus relevant money claim fee (the court issued claim fee 1.1).',
    selector: 'isClaimDeclarationAdded',
  },
};

export const inputs = {
  description: {
    label: 'Describe the other remedy',
    selector: '#claimDeclarationDescription',
  },
};
