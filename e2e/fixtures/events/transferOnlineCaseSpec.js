const {listElement} = require("../../api/dataHelper");
const config = require("../../config");

const changeLocation = () => {
  return {
    TransferCase: {
      notSuitableSdoOptions: 'CHANGE_LOCATION',
      tocTransferCaseReason:{
        reasonForCaseTransferJudgeTxt: 'Reason for transferring case'
      }
    }
  };
};

const otherReasons = () => {
  return {
    TransferCase: {
      notSuitableSdoOptions: 'OTHER_REASONS',
      reasonNotSuitableSDO:{
        input: 'Other reason for not suitable SDO'
      }
    }
  };
};

module.exports = {
  notSuitableSDOspec : (option) => {
    if (option === 'CHANGE_LOCATION') {
      return {
        userInput: changeLocation()
      };
    } else {
      return {
        userInput: otherReasons()
      };
    }
  },

  transferCaseSpec : () => {
      return {
        userInput: {
          transferCourtLocationList: {
            list_items: [
              listElement(config.claimantSelectedCourt)
            ],
            value: listElement(config.liverpoolCourt)
          },
          reasonForTransfer: 'allocated court location is not appropriate'
        }
      };
  }
};
