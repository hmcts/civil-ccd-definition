
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

module.exports = {
  transferCase : () => {
    return {
      userInput : transferCase()
    };
  }
};
