const config = require('../config.js');
const {element, date} = require('../api/dataHelper');
const {checkHnlLegalRepToggleEnabled} = require('../api/testingSupport');

module.exports = {
  removeHNLFieldsFromClaimData: (data) => {
    delete data.userInput.Claimant.applicant1['partyEmail'];
    delete data.userInput.Claimant.applicant1['partyPhone'];

    if( data.userInput.SecondClaimant) {
      delete data.userInput.SecondClaimant.applicant2['partyEmail'];
      delete data.userInput.SecondClaimant.applicant2['partyPhone'];
    }

    delete data.userInput.Defendant.respondent1['partyEmail'];
    delete data.userInput.Defendant.respondent1['partyPhone'];

    if (data.userInput.SecondDefendant) {
      delete data.userInput.SecondDefendant.respondent2['partyEmail'];
      delete data.userInput.SecondDefendant.respondent2['partyPhone'];
    }
  },

  removeHNLFieldsFromUnspecClaimData: (data) => {
    delete data.valid.Defendant.respondent1['partyEmail'];
    delete data.valid.Defendant.respondent1['partyPhone'];

    if (data.valid.SecondDefendant) {
      delete data.valid.SecondDefendant.respondent2['partyEmail'];
      delete data.valid.SecondDefendant.respondent2['partyPhone'];
    }
  },

  async replaceDQFieldsIfHNLFlagIsDisabled(data, solicitor, isDefendantResponse) {
    let isHNLEnabled = await checkHnlLegalRepToggleEnabled();
    // work around for the api  tests
    console.log(`Hearing selected in Env: ${config.runningEnv}`);

    if (!isHNLEnabled) {
      const party = `${isDefendantResponse === true ?
        'respondent' : 'applicant'}${solicitor === 'solicitorTwo' ? 2 : 1}DQ`;
      data = {
        ...data,
        valid: {
          ...data.valid,
          Witnesses: {
            [`${party}Witnesses`]: {
              witnessesToAppear: 'Yes',
              details: [
                element({
                  name: 'John Doe',
                  reasonForWitness: 'None'
                })
              ]
            }
          },
          Experts: {
            [`${party}Experts`]: {
              expertRequired: 'Yes',
              details: [
                element({
                  name: 'John Doe',
                  fieldOfExpertise: 'Science',
                  whyRequired: 'Reason',
                  estimatedCost: '100',
                })
              ]
            }
          },
          Hearing: {
            [`${party}Hearing`]: {
              hearingLength: 'MORE_THAN_DAY',
              hearingLengthDays: '5',
              unavailableDatesRequired: 'Yes',
              unavailableDates: [
                element({
                  date: date(10),
                  who: 'Foo Bar'
                })
              ]
            }
          }
        },
        invalid: {
          ...data.invalid,
          Hearing: {
            past: {
              [`${party}Hearing`]: {
                hearingLength: 'MORE_THAN_DAY',
                hearingLengthDays: 5,
                unavailableDatesRequired: 'Yes',
                unavailableDates: [
                  element({
                    date: date(-1),
                    who: 'Foo Bar'
                  })
                ]
              }
            },
            moreThanYear: {
              [`${party}Hearing`]: {
                hearingLength: 'MORE_THAN_DAY',
                hearingLengthDays: 5,
                unavailableDatesRequired: 'Yes',
                unavailableDates: [
                  element({
                    date: date(367),
                    who: 'Foo Bar'
                  })
                ]
              }
            }
          }
        }
      };
    }
    return data;
  },

  async replaceExpertsIfHNLFlagIsDisabled(defendantResponseData, solicitor) {
    let isHNLEnabled = await checkHnlLegalRepToggleEnabled();
    // work around for the api  tests
    console.log(`Experts selected in Env: ${config.runningEnv}`);
    if (!isHNLEnabled) {
      defendantResponseData = {
        ...defendantResponseData,
        valid: {
          ...defendantResponseData.valid,
          Experts: {
            [`respondent${solicitor === 'solicitorTwo' ? 2 : 1}DQExperts`]: {
              expertRequired: 'Yes',
              details: [
                element({
                  name: 'John Doe',
                  fieldOfExpertise: 'Science',
                  whyRequired: 'Reason',
                  estimatedCost: '100',
                })
              ]
            }
          }
        }
      };
    }
    return defendantResponseData;
  },
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
  replaceFieldsIfHNLToggleIsOffForClaimantResponseSpecSmallClaim: (claimantResponseData) => {
    claimantResponseData = {
      ...claimantResponseData,
      userInput: {
        ...claimantResponseData.userInput,
        HearingSupport: {},
        SmallClaimExperts: {
          applicant1ClaimExpertSpecRequired: 'No'
        },
        SmallClaimWitnesses: {
          applicant1ClaimWitnesses: '10'
        },
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
  replaceFieldsIfHNLToggleIsOffForClaimantResponseSpecFastClaim: (claimantResponseData) => {
    claimantResponseData = {
      ...claimantResponseData,
      userInput: {
        ...claimantResponseData.userInput,
        HearingSupport: {},
        Experts : {
          applicant1DQExperts: {
            expertRequired: 'No'
          }
        },
        Witnesses: {
          applicant1DQWitnesses: {
            witnessesToAppear: 'No'
          }
        },
        Language: {
          applicant1DQLanguage: {
            evidence: 'WELSH',
            court: 'WELSH',
            documents: 'WELSH'
          }
        },
      },
      midEventData: {
        ...claimantResponseData.midEventData,
        Experts: {
          ...claimantResponseData.midEventData.Experts,
          respondent1DQExperts: {
            expertRequired: 'No'
          }
        },
      }
    };
    return claimantResponseData;
  },
  replaceFieldsIfHNLToggleIsOffForDefendantSpecResponseSmallClaim: (defendantResponseData, solicitor) => {
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
          },
          SmallClaimWitnesses: {
            responseClaimWitnesses2: '10'
          },
          SmallClaimExperts: {
            responseClaimExpertSpecRequired2: 'No'
          },
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
          },
          SmallClaimWitnesses: {
            responseClaimWitnesses: '10'
          },
          SmallClaimExperts: {
            responseClaimExpertSpecRequired: 'No'
          },
        }
      };
    }
    return defendantResponseData;
  },
  replaceFieldsIfHNLToggleIsOffForDefendantSpecResponseFastClaim: (defendantResponseData, solicitor) => {
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
          },
          Experts : {
            respondent2DQExperts: {
              expertRequired: 'No',
            }
          },
          Witnesses: {
            respondent2DQWitnesses: {
              witnessesToAppear: 'No',
            }
          },
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
          },
          Experts : {
            respondent1DQExperts: {
              expertRequired: 'No',
            }
          },
          Witnesses: {
            respondent1DQWitnesses: {
              witnessesToAppear: 'No',
            }
          },
        }
      };
    }
    return defendantResponseData;
  }
};
