const {I} = inject();

module.exports = {
  fields: {
    hearingNoticeType: {
      id: '#hearingNoticeList',
      options: {
        smallClaims: '#hearingNoticeList-SMALL_CLAIMS',
        fastTrack: 'hearingNoticeList-FAST_TRACK_TRIAL',
        others: 'hearingNoticeList-OTHER',
      }
    }
  },

  async hearingType(trackType) {
     await I.runAccessibilityTest();
         if(trackType === 'smallClaims'){
            I.click(this.fields.hearingNoticeType.options.smallClaims);
            I.waitForElement(this.fields.hearingNoticeType.id);

          } else if(trackType === 'fastTrack'){
            I.click(this.fields.hearingNoticeType.options.fastTrack);
            I.waitForElement((this.fields.hearingNoticeType.id));

          }else {
             I.click(this.fields.hearingNoticeType.options.others);
             I.waitForElement((this.fields.hearingNoticeType.id));
          }

        await I.clickContinue();
  }

};
