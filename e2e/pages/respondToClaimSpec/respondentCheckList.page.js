const { I } = inject();

module.exports = {

  async claimTimelineTemplate() {
    await I.see('timeline template');
    await I.runAccessibilityTest();
    await I.clickContinue();
  },
};

//*[@id="specResponseCheckList"]/dt/ccd-markdown/div/markdown/p[3]/a
