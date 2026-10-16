module.exports = {
    full: (type = 'application') => {
        return {
            hwfFeeType: type
        };
    },
    // No remission is the refusal outcome. It leaves the fee outstanding, so the case stays in
    // AWAITING_APPLICATION_PAYMENT, and it is one of the five events that start GA_NOTIFY_HWF.
    noRemission: (type = 'APPLICATION') => {
        const details = {
            noRemissionDetails: 'Income and outgoings calculation does not meet the threshold',
            noRemissionDetailsSummary: 'FEES_REQUIREMENT_NOT_MET',
        };
        return type === 'APPLICATION'
            ? { hwfFeeType: type, gaHwfDetails: details }
            : { hwfFeeType: type, additionalHwfDetails: details };
    },
    outcome: (type = 'APPLICATION') => {
        if (type === 'APPLICATION') {
            return {
                hwfFullRemissionGrantedForGa: 'Yes'
            };
        } else {
            return {
                hwfFullRemissionGrantedForAdditionalFee: 'Yes'
            };
        }
    },
};
