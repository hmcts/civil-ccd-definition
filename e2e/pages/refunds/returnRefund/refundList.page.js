const {I} = inject();

module.exports = {
  fields: {
    refundlist: {
      last_updated_tab: '//div[@class=\'mat-sort-header-content ng-tns-c12-1\']',
      process_refund_link: '//mat-row[1]//a[.=\'Process refund\']',
      review_refund_link : '//mat-row[1]//a[.=\'Review refund\']'
    }
  },


  async verifyAndChooseRefundFromRefundList(reviewRefundFlag = false) {

    I.waitForText('Refunds returned to caseworker');
    I.see('Refund list', 'h1');
    if (!reviewRefundFlag) {
      I.see('Refunds to be approved', 'h2');
    }
    I.see('Refunds returned to caseworker', 'h2');
    I.click(this.fields.refundlist.last_updated_tab);
    I.click(this.fields.refundlist.last_updated_tab);
    if (!reviewRefundFlag) {
      I.click(this.fields.refundlist.process_refund_link);
    } else {
      I.click(this.fields.refundlist.review_refund_link);
    }
  }
};
