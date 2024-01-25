const {I} = inject();

module.exports = {

  fields: {
    viewEle: 'a[id^="link-view-or-edit"]',
    updateJudgeType: '#judgeTypes',
    deputyDistrictJudgeTypeEle: '//input[@value="24"]',
    updateHearingLength: '#hearingLength',
    hearingDurationHours: '#durationhours',
    amendReason: '#partyreq',
  },

  async clickOnUpdateHearing() {
    await I.seeElement(this.fields.viewEle);
    await I.click(this.fields.viewEle);
    await I.waitForText('View or edit hearing');
    await I.runAccessibilityTest();
    await I.see('WAITING TO BE LISTED');
  },

  async updateHearingValues() {
    await I.see('District Judge, Deputy District Judge- Fee-Paid');
    await I.click(this.fields.updateJudgeType);
    await I.waitForText('Do you want a specific judge?');
    await I.click(this.fields.deputyDistrictJudgeTypeEle);
    await I.runAccessibilityTest();
    await I.click('Continue');
    await I.see('District Judge');
    await I.dontSee('Deputy District Judge- Fee-Paid');
    await I.see('AMENDED');
    await I.see('2 Hours');
    await I.click(this.fields.updateHearingLength);
    await I.waitForText('Length of hearing');
    await I.clearField(this.fields.hearingDurationHours);
    await I.fillField(this.fields.hearingDurationHours, '3');
    await I.click('Continue');
    await I.see('3 Hours');
    await I.dontSee('2 Hours');

  },

  async submitUpdatedHearing() {
    await I.click('Submit updated request');
    await I.waitForText('Provide a reason for changing this hearing');
    await I.click(this.fields.amendReason);
    await I.runAccessibilityTest();
    await I.click('Submit change request');
    await I.see('Hearing request submitted');
    await I.click('view the status of this hearing in the hearings tab');
    await I.waitForText('Current and upcoming');
  },

  async verifyUpdatedHearingDetails() {
    await I.see('UPDATE REQUESTED');
    await I.click(this.fields.viewEle);
    await I.waitForText('View or edit hearing');
    await I.see('District Judge');
    await I.dontSee('Deputy District Judge- Fee-Paid');
    await I.see('3 Hours');
    await I.dontSee('2 Hours');
    await I.click('Back');
  },

};
