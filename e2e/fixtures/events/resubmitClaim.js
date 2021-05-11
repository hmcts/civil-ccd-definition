const { listElement } = require('../../api/dataHelper');

const selectedPBA = listElement('PBA0088192');
module.exports = {
  valid: {
    ResubmitClaim: {
      applicantSolicitor1PbaAccounts: {
        list_items: [
          selectedPBA,
          listElement('PBA0078094')
        ],
        value: selectedPBA
      }
    }
  }
};
