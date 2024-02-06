const {I} = inject();
const config = require('./../../config');

module.exports = {
  fields: {
    courtLocation: {
      id: 'select[id$="courtLocation_applicantPreferredCourtLocationList"]',
      options: {
        claimantPreferredCourt: config.claimantSelectedCourt
      }
    },
    reasonForHearingAtSpecificCourt: '#courtLocation_reasonForHearingAtSpecificCourt',
    remoteHearingRequested: {
      id: '#applicant1DQRemoteHearing_remoteHearingRequested_radio',
      options: {
        yes: 'Yes',
        no: 'No'
      }
    },
    reasonForRemoteHearing: '#applicant1DQRemoteHearing_reasonForRemoteHearing'
  },


  async performRefunds() {

    I.waitForText('Paid');
    I.waitForText('£550.00');//Making sure that the Service Request page is loaded properly before proceeding...
    I.click('//tr[2]//a[.=\'Review\']'); //As the Second payment in I test is Paid and rolledback.
    I.click('//button[.=\'Issue refund\']');

    I.waitForText('Money Claims - Claim Amount - 10000.01 up to 200000 GBP. FEE AMOUNT = 5% of claim value');
    I.wait(1);
    I.see('Process refund','h1');
    I.see('Case reference:','h2');
    I.see('Payment reference:');
    I.see('Select fees to be refunded');
    I.see('Fee description');
    I.see('Money Claims - Claim Amount - 10000.01 up to 200000 GBP. FEE AMOUNT = 5% of claim value');
    I.see('Fee amount');
    I.see('Total paid');
    I.see('Quantity');
    I.see('Amount to refund');
    I.see('£550.00');
    I.click('[name=\'organisation\']');
    I.click('Continue');

    I.waitForText('System/technical error');
    I.waitForClickable('//select[@id=\'sort\']', 5);
    I.wait(2);
    I.see('Why are you making this refund?','h1');
    I.see('System/technical error');
    I.checkOption('//input[@id=\'Amended claim\']');
    I.click('Continue');

    I.wait(1);
    I.see('Process refund','h1');
    I.see('Case reference:','h2');
    I.see('Payment reference:');
    I.fillField('//input[@id=\'email\']','test@hmcts.net');
    I.click('Continue');

    I.wait(1);
    I.see('Payment reference');
    I.see('Payment amount');
    I.see('£550');
    I.see('Reason for refund');
    I.see('Amended claim');
    I.see('Refund amount');
    I.see('Send via');
    I.see('Email');
    I.see('test@hmcts.net');
    I.see('SendRefund');
    I.click('Submit refund');

    I.waitForText('A refund request for £550.00 has been created and will be passed to a team leader to approve.');
    I.wait(1);
    I.see('Refund submitted','h1');
    I.see('Refund reference:');

  },

};
