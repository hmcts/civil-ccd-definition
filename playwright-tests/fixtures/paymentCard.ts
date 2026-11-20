import { legalRepresentatives } from './legalRepresentatives.ts';
import { claimantSolicitorCredentials } from '../civilConfig.ts';

// The card a fee is paid with when PAYMENT_METHOD=CARD: a GOV.UK Pay test card, which is always accepted, in the
// claimant solicitor's name and at their organisation's address (Civil - Organisation 1)
const claimantSolicitor = legalRepresentatives.legalRepresentative1;

export const paymentCard = {
  number: '4444333322221111',
  expiryMonth: '12',
  expiryYear: '2032',
  securityCode: '000',
  nameOnCard: `${claimantSolicitor.firstName} ${claimantSolicitor.lastName}`,
  addressLine1: '38 Delisle Road',
  city: 'London',
  country: 'United Kingdom',
  postcode: 'SE28 0JE',
  email: claimantSolicitorCredentials.username,
};
