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


  async returnRefundToCaseWorker() {

    I.waitForText('Action');
    I.see('Refund list', 'h1');
    I.see('Refunds returned to caseworker', 'h2');
    //I.selectOption('.mat-mdc-select-min-line, '100');
    I.click('//div[text()=\' Last updated\']');
    I.click('//div[text()=\' Last updated\']');
    I.click('//mat-row[1]//a[.=\'Review refund\']');

    I.see('Refund details', 'h2');
    I.see('Refund reference');
    I.see('Payment to be refunded');
    I.see('Reason for refund');
    I.see('Amended claim');
    I.see('Amount refunded');
    I.see('£550.00');

    I.see('Notifications sent','h2');
    I.see('Date and time');
    I.see('Sent to');
    I.see('Sent via');
    I.see('Actions');


    I.see('Refund status history','h2');
    I.see('Status');
    I.see('Date and time');
    I.see('Users');
    I.see('Notes');
    I.see('Update required');
    I.see('Sent for approval');
    I.click('Change refund details');

    I.see('Check your answers');
    I.see('Payment reference');
    I.see('Reason for return');
    I.see('Refund reference');
    I.see('Reason for refund');
    I.see('Amended claim');
    I.see('Refund amount');
    I.see('£550');
    I.see('Send to');
    I.see('Send via');
    I.see('Email');
    I.see('test@hmcts.net');
    I.see('Notification');
    I.see('SendRefund');
    I.click('//tr[4]//a[.=\'Change\']');

    //Same as Request Refund Reasons page.
    I.waitForText('System/technical error');
    I.waitForClickable('//select[@id=\'sort\']', 5);
    I.wait(2);
    I.see('Why are you making this refund?','h1');
    I.see('Amended claim');
    I.checkOption('//input[@id=\'System/technical error\']');
    I.click('Continue');

    //Same as Request Refund Check Your Answers page.
    I.wait(1);
    I.see('Payment reference');
    //I.see('Payment amount');
    I.see('£550');
    I.see('Reason for refund');
    I.see('System/technical error');
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
