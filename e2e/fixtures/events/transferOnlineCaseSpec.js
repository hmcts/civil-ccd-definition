
const transferCase = () => {
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
  transferCase : (option) => {
    if (option === 'CHANGE_LOCATION') {
      return {
        userInput: transferCase()
      };
    } else {
      return {
        userInput: otherReasons()
      };
    }
  }
};
