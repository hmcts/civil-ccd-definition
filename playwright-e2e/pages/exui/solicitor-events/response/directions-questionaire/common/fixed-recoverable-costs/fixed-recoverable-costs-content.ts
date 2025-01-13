import Party from '../../../../../../../enums/party';

export const subheadings = {
  fixedRecoverableCosts: 'Fixed recoverable costs',
};

export const getRadioButtons = (party: Party) => ({
  fixedRecoverableCosts: {
    label:
      'Is this claim subject to the Fixed Recoverable Cost Regime requiring the court to determine a complexity band?',
    yes: {
      label: 'Yes',
      selector: `#${party}DQFixedRecoverableCosts_isSubjectToFixedRecoverableCostRegime`,
    },
    no: {
      label: 'No',
      selector: `#${party}DQFixedRecoverableCosts_isSubjectToFixedRecoverableCostRegime_No`,
    },
  },
  complexityBands: {
    label: 'Which complexity band do you believe this claim falls into?',
    band1: {
      label: 'Band 1: road traffic accident without personal injury; debt claims',
      selector: `#${party}DQFixedRecoverableCosts_band-BAND_1`,
    },
  },
  complexityBandAgreed: {
    label: 'Has this complexity band been agreed with the other party?',
    yes: {
      label: 'Yes',
      selector: `#${party}DQFixedRecoverableCosts_complexityBandingAgreed_Yes`,
    },
    no: {
      label: 'No',
      selector: `#${party}DQFixedRecoverableCosts_complexityBandingAgreed_No`,
    },
  },
});

export const getInputs = (party: Party) => ({
  fixedRecoverableCostsReason: {
    label: 'Please give your reasons (Optional)',
    selector: `#${party}DQFixedRecoverableCosts_reasons`,
  },
});
