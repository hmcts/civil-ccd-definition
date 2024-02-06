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

    I.waitForText('Refunds returned to caseworker');
    I.see('Refund list', 'h1');
    I.see('Refunds to be approved', 'h2');
    I.see('Refunds returned to caseworker', 'h2');
    //I.selectOption('.mat-mdc-select-min-line, '100');
    I.click('//div[text()=\' Last updated\']');
    I.click('//div[text()=\' Last updated\']');
    I.click('//mat-row[1]//a[.=\'Process refund\']');

    I.see('Review refund details', 'h1');
    I.see('Payment to be refunded');
    I.see('Reason for refund');
    I.see('Amended claim');
    I.see('Amount to be refunded');
    I.see('£550.00');
    I.see('Sent to');
    I.see('Test Inc');
    I.see('Sent via');
    I.see('Email');
    I.see('test@hmcts.net');
    I.see('Submitted by');
    I.see('Date submitted');
    I.see('Notification');
    I.see('SendRefund');

    I.see('What do you want to do with this refund?');
    I.see('Approve');
    I.see('Send to middle office');
    I.see('Reject');
    I.see('There is no refund due');
    I.see('Return to caseworker');
    I.see('Some information needs correcting');

    I.click('#refundAction-2');
    I.fillField('#sendmeback', 'Automation Test Comments');
    I.click('Submit');

    I.waitForText('Refund returned to caseworker', 'h1');
  },

  async approveRefund() {

    I.waitForText('Refunds returned to caseworker');
    I.see('Refund list', 'h1');
    I.see('Refunds to be approved', 'h2');
    I.see('Refunds returned to caseworker', 'h2');
    //I.selectOption('.mat-mdc-select-min-line, '100');
    I.click('//div[text()=\' Last updated\']');
    I.click('//div[text()=\' Last updated\']');
    I.click('//mat-row[1]//a[.=\'Process refund\']');

    I.see('Review refund details', 'h1');
    I.see('Payment to be refunded');
    I.see('Reason for refund');
    I.see('System/technical error');
    I.see('Amount to be refunded');
    I.see('£550.00');
    I.see('Sent to');
    I.see('Test Inc');
    I.see('Sent via');
    I.see('Email');
    I.see('test@hmcts.net');
    I.see('Submitted by');
    I.see('Date submitted');
    I.see('Notification');
    I.see('SendRefund');

    I.see('What do you want to do with this refund?');
    I.see('Approve');
    I.see('Send to middle office');
    I.see('Reject');
    I.see('There is no refund due');
    I.see('Return to caseworker');
    I.see('Some information needs correcting');

    I.click('#refundAction-0');
    I.click('Submit');

    I.waitForText('Refund approved', 'h1');
  },

  async rejectRefund() {

    I.waitForText('Refunds returned to caseworker');
    I.see('Refund list', 'h1');
    I.see('Refunds to be approved', 'h2');
    I.see('Refunds returned to caseworker', 'h2');
    //I.selectOption('.mat-mdc-select-min-line, '100');
    I.click('//div[text()=\' Last updated\']');
    I.click('//div[text()=\' Last updated\']');
    I.click('//mat-row[1]//a[.=\'Process refund\']');

    I.see('Review refund details', 'h1');
    I.see('Payment to be refunded');
    I.see('Reason for refund');
    I.see('System/technical error');
    I.see('Amount to be refunded');
    I.see('£550.00');
    I.see('Sent to');
    I.see('Test Inc');
    I.see('Sent via');
    I.see('Email');
    I.see('test@hmcts.net');
    I.see('Submitted by');
    I.see('Date submitted');
    I.see('Notification');
    I.see('SendRefund');

    I.see('What do you want to do with this refund?');
    I.see('Approve');
    I.see('Send to middle office');
    I.see('Reject');
    I.see('There is no refund due');
    I.see('Return to caseworker');
    I.see('Some information needs correcting');

    I.click('#refundAction-1');
    I.waitForText('Other');
    I.click('#refundRejectReason-0');
    I.click('Submit');

    I.waitForText('Refund rejected', 'h1');
  },


};
