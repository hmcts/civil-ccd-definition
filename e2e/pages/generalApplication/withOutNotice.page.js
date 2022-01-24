const {I} = inject();

module.exports = {

  fields: {
    informOtherPartyWithNotice: {
      id: '#generalAppInformOtherParty_isWithNotice',
      options: {
        yes: 'Yes',
        no: 'No'
      }
    },
    reasonsForWithoutNotice: '#generalAppInformOtherParty_reasonsForWithoutNotice'
  },

  async selectNotice(noticeCheck) {
    I.waitForElement(this.fields.informOtherPartyWithNotice.id);
    if ('no' === noticeCheck) {
      I.click(this.fields.informOtherPartyWithNotice.options[noticeCheck]);
      await I.fillField(this.fields.reasonsForWithoutNotice, 'Test Reason for Without Notice');
    } else {
      I.click(this.fields.informOtherPartyWithNotice.options[noticeCheck]);
    }
    await I.clickContinue();
  }
};

