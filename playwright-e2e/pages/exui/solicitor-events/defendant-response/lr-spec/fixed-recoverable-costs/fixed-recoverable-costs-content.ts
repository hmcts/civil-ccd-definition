export const heading = 'Fixed recoverable costs';

export const radioButtons = {
  label:
    'Is this claim subject to the Fixed Recoverable Cost Regime requiring the court to determine a complexity band?',
  yes: {
    label: 'Yes',
    selector: '#respondent1DQFixedRecoverableCosts_isSubjectToFixedRecoverableCostRegime',
  },
  no: {
    label: 'No',
    selector: '#respondent1DQFixedRecoverableCosts_isSubjectToFixedRecoverableCostRegime_No',
  },
};

export const radioButtonsMultiparty = (defendantNumber: number) => ({
  label:
    'Is this claim subject to the Fixed Recoverable Cost Regime requiring the court to determine a complexity band?',
  yes: {
    label: 'Yes',
    selector: `#respondent${defendantNumber}DQFixedRecoverableCosts_isSubjectToFixedRecoverableCostRegime_Yes`,
  },
  no: {
    label: 'No',
    selector: `#respondent${defendantNumber}DQFixedRecoverableCosts_isSubjectToFixedRecoverableCostRegime_No`,
  },
});

export const complexityBandButtons = (defendantNumber: number, bandNumber: number) => ({
  band: {
    selector: `#respondent${defendantNumber}DQFixedRecoverableCosts_band-BAND_${bandNumber}`,
  },
});

export const complexityBandAgreedButtons = (defendantNumber: number) => ({
  yes: {
    selector: `#respondent${defendantNumber}DQFixedRecoverableCosts_complexityBandingAgreed_Yes`,
  },
  no: {
    selector: `#respondent${defendantNumber}DQFixedRecoverableCosts_complexityBandingAgreed_No`,
  },
});

export const reasonInput = (defendantNumber: number) => ({
  selector: `#respondent${defendantNumber}DQFixedRecoverableCosts_reasons`,
});
