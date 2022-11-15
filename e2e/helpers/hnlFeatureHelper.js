module.exports = {
  replaceFieldsIfHNLToggleIsOffForDefendantResponse: (defendantResponseData,solicitor) => {
    if (solicitor === 'solicitorTwo') {
      defendantResponseData = {
        ...defendantResponseData,
        valid: {
          ...defendantResponseData.valid,
          HearingSupport: {},
          Language: {
            respondent2DQLanguage: {
              evidence: 'WELSH',
              court: 'WELSH',
              documents: 'WELSH'
            }
          }
        }
      };
    } else {
      defendantResponseData = {
        ...defendantResponseData,
        valid: {
          ...defendantResponseData.valid,
          HearingSupport: {},
          Language: {
            respondent1DQLanguage: {
              evidence: 'WELSH',
              court: 'WELSH',
              documents: 'WELSH'
            }
          }
        }
      };
    }
    return defendantResponseData;
  },
  replaceFieldsIfHNLToggleIsOffForClaimantResponse: (claimantResponseData) => {
      claimantResponseData = {
        ...claimantResponseData,
        valid: {
          ...claimantResponseData.valid,
          HearingSupport: {},
          Language: {
            applicant1DQLanguage: {
              evidence: 'WELSH',
              court: 'WELSH',
              documents: 'WELSH'
            }
          }
        }
      };
    return claimantResponseData;
  },
  replaceFieldsIfHNLToggleIsOffForClaimantResponseSpec: (claimantResponseData) => {
    claimantResponseData = {
      ...claimantResponseData,
      userInput: {
        ...claimantResponseData.userInput,
        HearingSupport: {},
        Language: {
          applicant1DQLanguage: {
            evidence: 'WELSH',
            court: 'WELSH',
            documents: 'WELSH'
          }
        }
      }
    };
    return claimantResponseData;
  },
  replaceFieldsIfHNLToggleIsOffForDefendantSpecResponse: (defendantResponseData,solicitor) => {
    if (solicitor === 'solicitorTwo') {
      defendantResponseData = {
        ...defendantResponseData,
        userInput: {
          ...defendantResponseData.userInput,
          HearingSupport: {},
          Language: {
            respondent2DQLanguage: {
              evidence: 'WELSH',
              court: 'WELSH',
              documents: 'WELSH'
            }
          }
        }
      };
    } else {
      defendantResponseData = {
        ...defendantResponseData,
        userInput: {
          ...defendantResponseData.userInput,
          HearingSupport: {},
          Language: {
            respondent1DQLanguage: {
              evidence: 'WELSH',
              court: 'WELSH',
              documents: 'WELSH'
            }
          }
        }
      };
    }
    return defendantResponseData;
  },
};
