const config = require('../../config.js');
const {date} = require('../../api/dataHelper');
const {listElement } = require('../../api/dataHelper');


const djOrderCaseManagementOrderSelection = (djOrderType = 'DISPOSAL_HEARING') => {
  if (djOrderType == 'DISPOSAL_HEARING') {
    return {
      caseManagementOrderSelection: 'DISPOSAL_HEARING',
    };
  } else {
     return {
      caseManagementOrderSelection: 'TRIAL_HEARING',
      caseManagementOrderAdditional: []
     };
  }
};

const createDJDirectionOrder = (djOrderType = 'DISPOSAL_HEARING', mpScenario = 'ONE_V_ONE') => {
    const userInput = (djOrderType = 'DISPOSAL_HEARING') => {
      if (djOrderType == 'DISPOSAL_HEARING') {
        return {
          ...disposalHearing
        };
      } else {
        return {
          ...trialHearing
        };
      }
    };

    const trialHearing = {
      trialHearing: {
        disposalHearingAddNewDirectionsDJ: [],
        disposalHearingJudgesRecitalDJ: {
          input: null,
          judgeNameTitle: null
        },
        disposalHearingNotesDJ: {
          date: null,
          input:null
        },
        disposalHearingOrderAndHearingDetailsDJ: {},
        trialHearingAddNewDirectionsDJ: [],
        trialHearingAlternativeDisputeDJToggle: ['SHOW'],
        trialHearingCostsToggle: ['SHOW'],
        trialHearingDisclosureOfDocumentsDJ: {
          date1: date(28),
          date2: date(28),
          date3: date(14),
          input1: 'string',
          input2: 'string',
          input3: 'string',
          input4: 'string',
          input5: 'string'
        },
        trialHearingDisclosureOfDocumentsDJToggle: ['SHOW'],
        trialHearingJudgesRecitalDJ: {
          input: 'string',
          judgeNameTitle: 'title'
        },
        trialHearingMethodDJ: 'disposalHearingMethodInPerson',
        trialHearingMethodInPersonDJ: {
          list_items: [
            listElement(config.djJudgeClaimantSelectedCourt)
          ],
          value: listElement(config.djJudgeClaimantSelectedCourt)
        },
        trialHearingNotesDJ: {
          date: date(28),
          input: 'string'
        },
        trialHearingSchedulesOfLossDJ: {
          date1: date(28),
          date2: date(28),
          date3: date(14),
          input1: 'string',
          input2: 'string',
          input3: 'string',
          input4: 'string'
        },
        trialHearingSchedulesOfLossDJToggle:['SHOW'],
        trialHearingTrialDJ: {
          date1: date(28),
          date2: date(28),
          input1: 'string',
          input2: 'string',
          input3: 'string',
          type: 'DOCUMENTS'
        },
        trialHearingTrialDJToggle: ['SHOW'],
        trialHearingVariationsDirectionsDJToggle: ['SHOW'],
        trialHearingWitnessOfFactDJ: {
          date1: date(28),
          input1: 'string',
          input2: 4,
          input3: 4,
          input4: 'string',
          input5: 'string',
          input6: 4,
          input7: 'string',
          input8: 'string',
          input9: 'string'
        },
        trialHearingWitnessOfFactDJToggle: ['SHOW']
      }
    };

    const disposalHearing = {
      disposalHearing : {
        disposalHearingAddNewDirectionsDJ: [],
        disposalHearingBundleDJ: {
          input: 'string',
          type: 'DOCUMENTS'
        },
        disposalHearingBundleDJToggle: ['SHOW'],
        disposalHearingClaimSettlingDJToggle: ['SHOW'],
        disposalHearingDisclosureOfDocumentsDJToggle: ['SHOW'],
        disposalHearingCostsDJToggle: ['SHOW'],
        disposalHearingDisclosureOfDocumentsDJ: {
          date: date(56),
          input: 'string'
        },
        disposalHearingFinalDisposalHearingDJ: {
          date: date(56),
          input: 'string',
          time: 'THIRTY_MINUTES'
        },
        disposalHearingFinalDisposalHearingDJToggle: ['SHOW'],
        disposalHearingJudgesRecitalDJ: {
          input: 'string',
          judgeNameTitle: 'title'
        },
        disposalHearingMedicalEvidenceDJ: {
          date1: date(28),
          input1: 'string'
        },
        disposalHearingMedicalEvidenceDJToggle: ['SHOW'],
        disposalHearingMethodDJ: 'disposalHearingMethodInPerson',
        disposalHearingMethodInPersonDJ: {
          list_items: [
            listElement(config.djJudgeClaimantSelectedCourt)
          ],
          value: listElement(config.djJudgeClaimantSelectedCourt)
        },
        disposalHearingNotesDJ: {
          date: date(7),
          input:'string'
        },
        disposalHearingOrderAndHearingDetailsDJ: {},
        disposalHearingQuestionsToExpertsDJToggle: ['SHOW'],
        disposalHearingQuestionsToExpertsDJ: {
          date: date(56)
        },
        disposalHearingSchedulesOfLossDJ: {
          date1: date(40),
          date2: date(80),
          date3: date(80),
          input1: 'string',
          input2: 'string',
          input3: 'string'
        },
        disposalHearingSchedulesOfLossDJToggle: ['SHOW'],
        disposalHearingWitnessOfFactDJ: {
          date1: date(28),
          date2: date(28),
          input1: 'string',
          input2: 'string',
          input3: 'string',
          input4: 'string'
        },
        disposalHearingWitnessOfFactDJToggle: ['SHOW']
      }
    };
    switch (mpScenario) {
      case 'ONE_V_TWO_TWO_LEGAL_REP':
      case 'ONE_V_TWO_ONE_LEGAL_REP': {
        return {
          djOrderCaseManagementOrderSelection: {
            applicantVRespondentText: 'Test Inc v Sir John Doe and Dr Foo Bar',
            ...djOrderCaseManagementOrderSelection(djOrderType)
          },
          ...userInput(djOrderType)
        };
      }
      case 'TWO_V_ONE':{
        return {
          djOrderCaseManagementOrderSelection: {
            applicantVRespondentText: 'Test Inc and Dr Jane Doe v Sir John Doe',
            ...djOrderCaseManagementOrderSelection(djOrderType)
          },
          ...userInput(djOrderType)
        };
      }
      case 'ONE_V_ONE':
      default: {
        return {
          djOrderCaseManagementOrderSelection: {
            applicantVRespondentText: 'Test Inc v Sir John Doe',
            ...djOrderCaseManagementOrderSelection(djOrderType)
          },
          ...userInput(djOrderType)
        };
      }
    }
};

module.exports = {
  judgeCreateOrder: (djOrderType, mpScenario = 'ONE_V_ONE') => {
    return {
      valid: createDJDirectionOrder(djOrderType, mpScenario)
    };
  }
};
