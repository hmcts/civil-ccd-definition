export const subHeadings = {
  heading2: 'Fixed Recoverable Costs',
};

export const complexityBandForm = {
  text: 'Is this claim subject to the Fixed Recoverable Cost Regime requiring the court to determine a complexity band?',
  bandText: 'Which complexity band do you believe this claim falls into?',
  recoverableCostRegimeRadioYes: {
    text: 'Yes',
    selector: '#applicant1DQFixedRecoverableCosts_isSubjectToFixedRecoverableCostRegime_Yes',
  },
  recoverableCostRegimeRadioNo: {
    text: 'No',
    selector: '#applicant1DQFixedRecoverableCosts_isSubjectToFixedRecoverableCostRegime_No',
  },
  band1: {
    text: 'Band 1: road traffic accident without personal injury; debt claims',
    selector: '#applicant1DQFixedRecoverableCosts_band-BAND_1',
  },
  band2: {
    text: 'Band 2: road traffic accident with personal injury covered by protocol; personal injury; package travel claims',
    selector: '#applicant1DQFixedRecoverableCosts_band-BAND_2',
  },
  band3: {
    text:
      'Band 3: road traffic accident with personal injury but not covered by protocol; ' +
      'employer liability (accident); public liability (personal injury); housing disrepair; other money claims',
    selector: '#applicant1DQFixedRecoverableCosts_band-BAND_3',
  },
  band4: {
    text:
      'Band 4: employer liability (disease, but not noise induced hearing loss); ' +
      'complex housing disrepair; property/building disputes; professional negligence; complex claims',
    selector: '#applicant1DQFixedRecoverableCosts_band-BAND_4',
  },
  complexityBandingAgreed: {
    text: 'Has this complexity band been agreed with the other party?',
    radioYes: {
      label: 'Yes',
      selector: '#applicant1DQFixedRecoverableCosts_complexityBandingAgreed_Yes',
    },
    radioNo: {
      label: 'No',
      selector: '#applicant1DQFixedRecoverableCosts_complexityBandingAgreed_No',
    },
  },
  textBox: {
    label: 'Please give your reasons (Optional)',
    selector: '#applicant1DQFixedRecoverableCosts_reasons',
  },
};
