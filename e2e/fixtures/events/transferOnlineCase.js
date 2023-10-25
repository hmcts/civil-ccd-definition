const {listElement} = require("../../api/dataHelper");
const config = require("../../config");

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
  transferCase : () => {
    return {
      valid: {
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
