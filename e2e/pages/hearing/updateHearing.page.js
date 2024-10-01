const {I} = inject();

module.exports = {

  fields: {
    viewEle: 'a[id^="link-view-or-edit"]',
    deputyDistrictJudgeTypeEle: '//input[@value="24"]',
    amendReason: '#partyreq',
    editHearingButton: '#edit-hearing',
    additionFacilitiesLink: '#additionalFacilitiesRequired',
    judgeTypesLink: '#judgeTypes',
    selectFacilities: '//input[@value="Laptop"]',
    districtJudgeTypeEle: '//input[@value="45"]',
    hearingLengthLink: '#hearingLength',
    hearingDurationHours: '#durationhours',
    viewHearingText: 'View hearing',
    editHearingText: 'Edit hearing',
    originalJudgeListSummary: 'Deputy District Judge- Fee-Paid, District Judge',
    updatedJudgeListSummary: 'Deputy District Judge- Fee-Paid',
    originalHearingLengthHoursSummary: '2 Hours',
    updatedHearingLengthHoursSummary: '3 Hours',
    originalAdditionalFacilitiesSummary: 'Laptop',
    amendedLabel: 'AMENDED',
    updateRequestedLabel: 'UPDATE REQUESTED',
  },

  async clickOnViewEditHearing() {
    await I.seeElement(this.fields.viewEle);
    await I.click(this.fields.viewEle);
    await I.runAccessibilityTest();
  },

  async clickOnEditHearing() {
    await I.waitForText(this.fields.viewHearingText);
    await I.click(this.fields.editHearingButton);
    await I.waitForText(this.fields.editHearingText);
    await I.runAccessibilityTest();
  },

  async updateHearingValues() {
    await I.click(this.fields.additionFacilitiesLink);
    await I.click(this.fields.selectFacilities);
    await I.clickContinue();
    await I.click(this.fields.judgeTypesLink);
    await I.waitForText('Select all judge types that apply');
    await I.click(this.fields.districtJudgeTypeEle);
    await I.clickContinue();
    await I.runAccessibilityTest();
    await I.waitForText(this.fields.editHearingText);
    await I.dontSee(this.fields.originalJudgeListSummary);
    await I.see(this.fields.updatedJudgeListSummary);
    await I.see(this.fields.amendedLabel);
    await I.see(this.fields.originalHearingLengthHoursSummary);
    await I.click(this.fields.hearingLengthLink);
    await I.waitForText('Length of hearing');
    await I.clearField(this.fields.hearingDurationHours);
    await I.fillField(this.fields.hearingDurationHours, '3');
    await I.clickContinue();
    await I.see(this.fields.updatedHearingLengthHoursSummary);
    await I.dontSee(this.fields.originalHearingLengthHoursSummary);
    await I.runAccessibilityTest();
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
    await I.see(this.fields.updateRequestedLabel);
    await this.clickOnViewEditHearing();
    await I.see(this.fields.originalAdditionalFacilitiesSummary);
    await I.dontSee(this.fields.originalJudgeListSummary);
    await I.see(this.fields.updatedJudgeListSummary);
    await I.see(this.fields.updatedHearingLengthHoursSummary);
    await I.dontSee(this.fields.originalHearingLengthHoursSummary);
    await I.click('Back');
  },

};
