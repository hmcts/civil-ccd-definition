const {listElement } = require('../../api/dataHelper');
const courts = require('../../courts.js');

const createDJ = (responseType = 'DISPOSAL_HEARING', mpScenario = 'ONE_V_ONE') => {
    const userInput = {
        CPRAcceptance2Def: {
          CPRAcceptance2Def: {
            acceptance: ['CERTIFIED']
          }
        },
        hearingType: {
          hearingSelection: responseType == 'DISPOSAL_HEARING' ? 'DISPOSAL_HEARING' : 'TRIAL_HEARING',
          detailsOfDirection:'Draft order'
        },
        hearingSupportRequirementsDJ: {
          hearingSupportRequirementsDJ: {
            hearingType: 'IN_PERSON',
            hearingPreferredLocation: {
              value: {
                code: '00c98f7b-8cd5-44c0-9132-c2a173f89e0e',
                label: 'Central London County Court - THOMAS MORE BUILDING, ROYAL COURTS OF JUSTICE, STRAND, LONDON - WC2A 2LL'
              },
              list_items: courts.refDataList
            },
            hearingPreferredTelephoneNumber1: '07444552365',
            hearingPreferredEmail: 'test@gmail.com',
            hearingLengthEstimate: '15_MINUTES',
            hearingUnavailableDates: 'No',
          }
        },
        locationName : {
          locationName: 'Central London County Court'
        },
        caseManagementLocation: {
          caseManagementLocation: {
            region: '1',
            baseLocation: '20262'
          }
        }
    };
    switch (mpScenario) {
      case 'ONE_V_TWO_ONE_LEGAL_REP': {
        return {
          djDefendantDetails: {
            defendantDetails: {
              value: listElement('Both Defendants'),
              list_items: [
                listElement('Both Defendants')
              ]
            },
            bothDefendants: 'Both defendants'
          },
          ...userInput
        };
      }
      case 'ONE_V_TWO_TWO_LEGAL_REP': {
        return {
          djDefendantDetails: {
            defendantDetails: {
              value: listElement('Both Defendants'),
              list_items: [
                listElement('Both Defendants')
              ]
            },
            bothDefendants: 'Both defendants'
          },
          ...userInput
        };
      }
      case 'TWO_V_ONE':
      case 'ONE_V_ONE':
      default: {
        return {
          djDefendantDetails: {
            defendantDetails: {
              value: listElement('Sir John Doe'),
              list_items: [
                listElement('Sir John Doe')
              ]
            },
            bothDefendants: 'One'
          },
          ...userInput
        };
      }
    }
};

module.exports = {
  requestDJ: (djRequestType, mpScenario = 'ONE_V_ONE') => {
    return {
      valid: createDJ(djRequestType, mpScenario)
    };
  }
};
