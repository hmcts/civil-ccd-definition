const {checkToggleEnabled} = require('../../../api/testingSupport');
const {PBAv3} = require('../../../fixtures/featureKeys');
const serviceRequest = require('../../../pages/createClaim/serviceRequest.page');
const apiRequest = require('./apiRequest.js');


async function payClaimFee(caseId) {
  const pbaV3 = await checkToggleEnabled(PBAv3);

  if (pbaV3) {
    console.log('PBAv3 flag set to true. Opening Service Request Tab and paying fee for case ', caseId);
    await serviceRequest.openServiceRequestTab();
    await serviceRequest.payFee(caseId);
    console.log('Fee paid for case ', caseId);
  }
  else {
    console.log('PBAv3 flag set to false.');
  }
}

async function markPaymentAsReceived(caseId, claimData) {
    const pbaV3 = await checkToggleEnabled(PBAv3);
    if (pbaV3) {
      console.log('PBAv3 flag set to true. Marking payment as received for case ', caseId);
      await apiRequest.paymentUpdate(caseId, '/service-request-update-claim-issued', claimData.serviceUpdateDto(caseId, 'paid'));
      console.log('Service request update sent to callback URL');
    }
    else {
      console.log('PBAv3 flag set to false.');
    }
}

module.exports = {
    payClaimFee,
    markPaymentAsReceived
};
