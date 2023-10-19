
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
  notSuitableSDO : (option) => {
    if (option === 'CHANGE_LOCATION') {
      return {
        valid: transferCase()
      };
    } else {
      return {
        valid: otherReasons()
      };
    }
  }
};

module.exports = {
  transferOnlineCase : () => {
      return {
        valid: {
          TransferOnlineCase: {
            notSuitableSdoOptions: 'CHANGE_LOCATION',
            tocTransferCaseReason: {
              reasonForCaseTransferJudgeTxt: 'Reason for transferring case'
            }
          }
        }
      };
    }
};
