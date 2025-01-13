import { Party } from '../../../../../../../models/partys';

export const radioButtons = {
  defenceRoute: {
    hasPaid: {
      label: 'Has paid the amount claimed',
      selector: (party: Party) =>
        `#defenceRouteRequired${party.number === 1 ? '' : party.number}-HAS_PAID_THE_AMOUNT_CLAIMED`,
    },
    disputesClaim: {
      label: 'Disputes the claim',
      selector: (party: Party) =>
        `#defenceRouteRequired${party.number === 1 ? '' : party.number}-DISPUTES_THE_CLAIM`,
    },
  },
  amountPaid: {
    label: 'How was this amount paid?',
    creditCard: {
      label: 'Credit card',
      selector: (party: Party) =>
        `#respondToClaim${party.number === 1 ? '' : party.number}_howWasThisAmountPaid-CREDIT_CARD`,
    },
    cheque: {
      label: 'Cheque',
      selector: (party: Party) =>
        `#respondToClaim${party.number === 1 ? '' : party.number}_howWasThisAmountPaid-CHEQUE`,
    },
    bacs: {
      label: 'BACS',
      selector: (party: Party) =>
        `#respondToClaim${party.number === 1 ? '' : party.number}_howWasThisAmountPaid-BACS`,
    },
    other: {
      label: 'Other',
      selector: (party: Party) =>
        `#respondToClaim${party.number === 1 ? '' : party.number}_howWasThisAmountPaid-OTHER`,
    },
  },
};

export const inputs = {
  amountPaid: {
    label: 'How much was paid?',
    selector: (party: Party) =>
      `#respondToClaim${party.number === 1 ? '' : party.number}_howMuchWasPaid`,
  },
  amountPaidDate: {
    label: 'When was this amount paid?',
  },
  amountPaidOther: {
    label: 'Tell us how',
    selector: (party: Party) =>
      `#respondToClaim${party.number === 1 ? '' : party.number}_howWasThisAmountPaidOther`,
  },
};
