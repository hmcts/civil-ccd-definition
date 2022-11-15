module.exports = {
  replaceFieldsIfHNLToggleIsOffForDefendantResponse: (defendantResponseData,solicitor) => {
    if (solicitor === 'solicitorTwo') {
      defendantResponseData = {
        ...defendantResponseData,
        valid: {
          ...defendantResponseData.valid,
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
