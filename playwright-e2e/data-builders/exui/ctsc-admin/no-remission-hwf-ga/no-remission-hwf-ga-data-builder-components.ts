const noRemissionHwfGaDataBuilderComponents = {
  // noRemissionDetails is free text; noRemissionDetailsSummary is the HWFFeesSummaryType fixed list.
  refuseApplicationFee: () => ({
    hwfFeeType: 'APPLICATION',
    gaHwfDetails: {
      noRemissionDetails: 'Income and outgoings calculation does not meet the threshold',
      noRemissionDetailsSummary: 'FEES_REQUIREMENT_NOT_MET',
    },
  }),
};

export default noRemissionHwfGaDataBuilderComponents;
