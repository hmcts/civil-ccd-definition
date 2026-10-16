export const heading = 'Intermediate Track';

export const subheading = 'Allocation';

export const paragraphs =
  'For information on which complexity band the claim should be in see CPR26.16 Table 2.';

export const radioButtons = {
  assignComplexityBand: {
    label: 'Do you assign a complexity band to the case?',
    yes: {
      label: 'Yes',
      selector: '#finalOrderIntermediateTrackComplexityBand_assignComplexityBand_Yes',
    },
    no: {
      label: 'No',
      selector: '#finalOrderIntermediateTrackComplexityBand_assignComplexityBand_No',
    },
  },
  complexityBand: {
    label: 'and the court assigns the claim to complexity',
    complexityBand1: {
      label:
        'band 1: claims where only one issue is in dispute and the hearing is expected to last for less than one day. For example, personal injury claims where either liability or the amount of money being claimed is disputed or defendant debt claims.',
      selector: '#finalOrderIntermediateTrackComplexityBand_band-BAND_',
    },
    complexityBand2: {
      label:
        'band 2: most other claims where more than one issue is in dispute. For example, personal injury where liability and the amount of money being claimed is disputed.',
      selector: '#finalOrderIntermediateTrackComplexityBand_band-BAND_2',
    },
    complexityBand3: {
      label:
        'band 3: any other claim where more than one issue is in dispute. For example, noise induced hearing loss or employer liability for diseases.',
      selector: '#finalOrderIntermediateTrackComplexityBand_band-BAND_3',
    },
    complexityBand4: {
      label:
        'band 4: any claim which is not suitable for bands 1 to 3. For example, complex personal injury claims with serious issues of fact or law.',
      selector: '#finalOrderIntermediateTrackComplexityBand_band-BAND_4',
    },
  },
};

export const inputs = {
  label: 'because (Optional)',
  selector: '#finalOrderIntermediateTrackComplexityBand_reasons',
};
