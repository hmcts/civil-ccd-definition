
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
  notSuitableSDO : (option) => {
    if (option === 'CHANGE_LOCATION') {
      return {
        valid: changeLocation()
      };
    } else {
      return {
        valid: otherReasons()
      };
    }
  },

  transferCase : () => {
      return {
        valid: {
          transferCourtLocationList: {
            value: {
              code: '8dfefcda-ffc6-480a-80b5-ccf0c0152b6c',
              label: 'Liverpool Civil and Family Court - 35, Vernon Street, City Square - L2 2BX'
            },
          list_items: [
            {
              code: '13f10d84-6f22-11ee-ae64-719def063ef9',
              label: 'Barnet Civil and Family Centre - St Mary\'s Court, Regents Park Road - N3 1BQ'
            }
            ]
          },
          reasonForTransfer: 'allocated court location is not appropriate'
        }
      };
    }
};
