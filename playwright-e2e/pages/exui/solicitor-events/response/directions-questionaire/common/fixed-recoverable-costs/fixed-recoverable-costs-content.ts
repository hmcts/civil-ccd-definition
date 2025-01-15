import { Party } from '../../../../../../../models/partys';

export const subheadings = {
  fixedRecoverableCosts: 'Fixed recoverable costs',
};

export const radioButtons = (party: Party) => ({
  fixedRecoverableCosts: {
    label:
      'Is this claim subject to the Fixed Recoverable Cost Regime requiring the court to determine a complexity band?',
    yes: {
      label: 'Yes',
      selector: `#${party.oldKey}DQFixedRecoverableCosts_isSubjectToFixedRecoverableCostRegime`,
    },
    no: {
      label: 'No',
      selector: `#${party.oldKey}DQFixedRecoverableCosts_isSubjectToFixedRecoverableCostRegime_No`,
    },
  },
  complexityBands: {
    label: 'Which complexity band do you believe this claim falls into?',
    band1: {
      label: 'Band 1: road traffic accident without personal injury; debt claims',
      selector: `#${party.oldKey}DQFixedRecoverableCosts_band-BAND_1`,
    },
  },
  complexityBandAgreed: {
    label: 'Has this complexity band been agreed with the other party?',
    yes: {
      label: 'Yes',
      selector: `#${party.oldKey}DQFixedRecoverableCosts_complexityBandingAgreed_Yes`,
    },
    no: {
      label: 'No',
      selector: `#${party.oldKey}DQFixedRecoverableCosts_complexityBandingAgreed_No`,
    },
  },
});

export const inputs = (party: Party) => ({
  fixedRecoverableCostsReason: {
    label: 'Please give your reasons (Optional)',
    selector: `#${party.oldKey}DQFixedRecoverableCosts_reasons`,
  },
});
